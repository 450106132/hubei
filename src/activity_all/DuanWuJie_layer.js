/**
 * @Author:      Lms
 * @Email:       lms_190865480@163.com
 * @QQ:       190865480
 * @DateTime:     2018-06-05 
 * @Description: 端午节活动 
 */



var DuanWuJieLayer = cc.Layer.extend({
    _closeCallback:null,
    ctor: function() {
        this._super();     
        
        var UI = ccs.load("DuanWuJie_main.json");
        this.addChild(UI.node);

        this._rankData = null;
        this._awardData = null;
        this._myteamData = null;
        this._rankNumber = 0;
        this._url_yaoqing = null;
        this._schedule = false;

        var self = this;
        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        this._back = UI.node.getChildByName("back");
        setWgtLayout(this._back, [1, 1], [0.5, 0.5], [0, 0]);

        var close = this._back.getChildByName("btn_close");
        close.addTouchEventListener(function(sender, type){
            if (type == 2) {
                this.removeFromParent();
            }
        },this);

        this.beijing_1 = _block.getChildByName("bg_main")
        if (this.beijing_1) {
            this.beijing_1.visible = false;
        }

        this.node_btn = this._back.getChildByName("node_btn");
        this.node_bisai = this._back.getChildByName("node_bisai");
        this.node_bisai_2 = this.node_bisai.getChildByName("node_bisai_2");
        this.node_team = this._back.getChildByName("node_team");
        this.node_jiangli = this._back.getChildByName("node_jiangli");
        this.node_get = this._back.getChildByName("node_get");
        this.node_bisai.setVisible(false);
        this.node_bisai_2.setVisible(false);
        this.node_team.setVisible(false);
        this.node_jiangli.setVisible(false);
        this.node_get.setVisible(false);

        var _txt= this.node_jiangli.getChildByName("ListView_jiangli").getChildByName("Text_jiangli");
        // _txt.ignoreContentAdaptWithSize(true);
        var _str = "";
        if (MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ || MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP || MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ ) {
            _str = "队长奖励\n" + "第一名—美的冰箱一台（价值988）\n" + "第二名—海尔洗衣机一台（价值600）\n" +
                "第三名—奥克斯空调扇一台（价值400）\n" + "第四名—美的豆浆机一台（价值200）\n" + "第五名—漫步者音箱一台（价值100）\n" +
                "六至十名奖励88元宝\n\n" + "划手奖励\n" + "第一名—2000元拼手气红包\n" + "第二名—1000元拼手气红包\n" +
                "第三名—600元拼手气红包\n" + "第四名—300元拼手气红包\n" + "第五名—150元拼手气红包\n" + "六至十名奖励每人神秘礼物一份\n";
        } else {
            _str = "队长奖励\n" + "第一名—美的冰箱一台（价值988）\n" + "第二名—海尔洗衣机一台（价值600）\n" +
                "第三名—奥克斯空调扇一台（价值400）\n" + "第四名—美的豆浆机一台（价值200）\n" + "第五名—漫步者音箱一台（价值100）\n" +
                "六至十名奖励188元宝\n\n" + "划手奖励\n" + "第一名—2000元拼手气红包\n" + "第二名—1000元拼手气红包\n" +
                "第三名—600元拼手气红包\n" + "第四名—300元拼手气红包\n" + "第五名—150元拼手气红包\n" + "六至十名奖励每人神秘礼物一份\n";
        }
        _txt.setString(_str);




        this.btn_bisai = this.node_btn.getChildByName("btn_bisai");
        this.btn_bisai.addTouchEventListener(function(sender, type){
            selectNum(1);
            this.reqBoatRank();
            

        },this);

        this.btn_team = this.node_btn.getChildByName("btn_team");
        this.btn_team.addTouchEventListener(function(sender, type){
            selectNum(2);
            this.reqMyTeam();
            
        },this);

        this.btn_wenhao = this.node_btn.getChildByName("btn_wenhao");
        this.btn_wenhao.addTouchEventListener(function(sender, type){
            if (type == 2) {
                // DuanWuJie_ruleLayer
                MjClient.Scene.addChild(new DuanWuJie_ruleLayer());
            }
        },this);


        this.btn_jiangli = this.node_btn.getChildByName("btn_jiangli");
        this.btn_jiangli.addTouchEventListener(function(sender, type){
            if (type == 2) {
                selectNum(3);
                
            }
        },this);


        this.btn_get = this.node_btn.getChildByName("btn_get");
        this.btn_get.addTouchEventListener(function(sender, type){
            if (type == 2) {
                selectNum(4);
                this.reqAwardRank();                
            }
        },this);
        

        var selectNum = function(number){
            this.node_bisai.setVisible(false);
            this.node_bisai_2.setVisible(false);
            this.node_team.setVisible(false);
            this.node_jiangli.setVisible(false);
            this.node_get.setVisible(false);
            this.btn_bisai.setBright(true);
            this.btn_bisai.setTouchEnabled(true);
            this.btn_team.setBright(true);
            this.btn_team.setTouchEnabled(true);
            this.btn_jiangli.setBright(true);
            this.btn_jiangli.setTouchEnabled(true);
            this.btn_get.setBright(true);
            this.btn_get.setTouchEnabled(true);
            if (this.beijing_1) {
                this.beijing_1.visible = false;
            }
            switch(number) {
                case 1:
                    if (this._rankData.list.length == 0 || this._myteamData.serverTime < this._myteamData.startTime) {
                        this.node_bisai_2.setVisible(true);
                    }

                    this.node_bisai.setVisible(true);
                    this.btn_bisai.setBright(false);
                    this.btn_bisai.setTouchEnabled(false);
                    break;
                case 2:
                    this.node_team.setVisible(true);
                    this.btn_team.setBright(false);
                    this.btn_team.setTouchEnabled(false);
                    if (this.beijing_1) {
                        this.beijing_1.visible = true;
                    }
                    break;
                case 3:
                    this.node_jiangli.setVisible(true);
                    this.btn_jiangli.setBright(false);
                    this.btn_jiangli.setTouchEnabled(false);
                    break;
                case 4:
                    this.node_get.setVisible(true);
                    this.btn_get.setBright(false);
                    this.btn_get.setTouchEnabled(false);
                    break;
            }
        }.bind(this);


        this._rankList = this.node_bisai.getChildByName("ListView_rank");
        this._cell_rank = this.node_bisai.getChildByName("cell_rank");
        this._cell_rank_1 = this.node_bisai.getChildByName("cell_rank_1");
        this._cell_rank.setVisible(false);
        this._cell_rank_1.setVisible(false);

        this._team_1 = this.node_team.getChildByName("Image_bg");
        this._team_2 = this.node_team.getChildByName("Image_bg_2");   
        this._team_2.setVisible(false);
        this._team_1.visible = false;

        

        this._btn_create = this._team_1.getChildByName("btn_create");
        this._btn_create.visible = false;
        this._btn_join = this._team_1.getChildByName("btn_join");
        this._btn_join.visible = false;
        this._btn_join.setTouchEnabled(false); //setTouchEnabled

        this._btn_create.addTouchEventListener(function(sender,type){
            if (type ==2) {
                // MjClient.showToast("创建创建");
                this.create_longzhouDUi();
            }
            
        },this);
        // this._btn_join.addTouchEventListener(function(sender,type){
        //     if (type ==2) {
        //         // MjClient.showToast("加入加入");
        //     }
            
        // },this);

        this._btn_yaoqing = this._team_2.getChildByName("btn_yaoqing");
        function _getName() {
            var pinfo = MjClient.data.pinfo;
            return unescape(pinfo.nickname );
        }
        var _diming = "牌友联盟";
        if (MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP ) {
            _diming = "北斗";
        }else if (MjClient.getAppType() == MjClient.APP_TYPE.TXJINZHONGMJ || MjClient.getAppType() == MjClient.APP_TYPE.DQSHANXIMJ) {
            _diming = "天星";
        }else if (MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ) {
            _diming = "天天";
        }else if(MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG){
            _diming = "旺旺";
        }
        this._btn_yaoqing.addTouchEventListener(function(sender,type){
            if (type ==2) {
                var name = _getName();
                cc.log(" =======this._myteamData.url",this._myteamData.url,name);
                MjClient.native.wxShareUrl(this._myteamData.url,
                                    name + "邀您加入龙舟队，一起赢大奖",
                                    "参加百人龙舟赛，拿" + _diming + "端午大礼包~~" );
                // MjClient.showToast("邀请邀请");
            }
            
        },this);

        this._getJiangli = this.node_get.getChildByName("btn_getjiangli");
        this._getJiangli.addTouchEventListener(function(sender,type){
            if (type == 2) {
                this.reqGetJiangli();
                // var emailLayer = new DuanWuJie_BackLayer(2); 
                // MjClient.Scene.addChild(emailLayer);
                 // DuanWuJie_BackLayer
            }
            
        },this);

        this._userList = this._team_2.getChildByName("ListView_ren");
        this._cell_user = this._team_2.getChildByName("cell_ren");
        this._cell_user.setVisible(false);
        this._cell_user = this._team_2.getChildByName("cell_ren");


        this._awardList = this.node_get.getChildByName("ListView_info");
        this._cell_award = this.node_get.getChildByName("cell_get");
        this._cell_award.setVisible(false);

        this.reqMyTeam();
        
        this.reqBoatRank();
        selectNum(2);

        this._text_wu = this.node_get.getChildByName("Text_wu");
        this._text_wu.ignoreContentAdaptWithSize(true);
        this._text_wu.setVisible(false);

        this.img_daojishi = this._team_2.getChildByName("img_daojishi");
        this._daojishi_txt1 = this.img_daojishi.getChildByName("Text_daojishi_1");
        this._daojishi_txt1.ignoreContentAdaptWithSize(true);
        this._daojishi_txt1.setString("");

        this._daojishi_txt2 = this.img_daojishi.getChildByName("Text_daojishi_2");
        this._daojishi_txt2.ignoreContentAdaptWithSize(true);
        this._daojishi_txt2.setString("");

        this._daojishi_txt3 = this.img_daojishi.getChildByName("Text_daojishi_3");
        this._daojishi_txt3.ignoreContentAdaptWithSize(true);
        this._daojishi_txt3.setString("");

        this.img_go = this._team_2.getChildByName("img_go");
        this._go_txt1 = this.img_go.getChildByName("Text_gomi");
        this._go_txt1.ignoreContentAdaptWithSize(true);
        this._go_txt1.setString("");

        this._go_txt2 = this.img_go.getChildByName("Text_godui");
        this._go_txt2.ignoreContentAdaptWithSize(true);
        this._go_txt2.setString("");

        // var _time =  self._myteamData.startTime - self._myteamData.serverTime;
        // cc.log(" ========= _time ",_time);
        // this.schedule(function(){
        //    _time -= 1000;
        //    var _timeStr = MjClient.dateFormat(new Date(parseInt(_time)), 'hh:mm:ss')
        //    self._daojishi_txt.setString(_timeStr);

        // },1)


    },
    create_longzhouDUi: function() {
        var dialog = ccs.load("DuanWuJie_myteam.json").node;
        setWgtLayout(dialog, [1, 1], [0, 0], [0, 0], true);

        var Image_di = dialog.getChildByName("Image_di");
        Image_di.addTouchEventListener(function(){
            // dialog.removeFromParent();
        });

        var _back = dialog.getChildByName("Image_bg");
        var _closeBtn = new ccui.Button("game_picture/btn_x_normal.png");
        _closeBtn.setPosition(cc.p(620,306));
        _back.addChild(_closeBtn);
        _closeBtn.addTouchEventListener(function(sender,type){
            if (type == 2) {
                dialog.removeFromParent();
            }
            
        });

        var image = dialog.getChildByName("Image_bg").getChildByName("Image");
        var textInput = new cc.EditBox(image.getContentSize(), new cc.Scale9Sprite("friendCards/int_playwords.png"));
        textInput.setFontColor(cc.color(0x40, 0x40, 0x40));
        textInput.setInputMode(cc.EDITBOX_INPUT_MODE_ANY);
        textInput.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
        textInput.setPlaceHolder("最多5个字");
        textInput.setPosition(image.getContentSize().width / 2, image.getContentSize().height / 2);
        image.addChild(textInput);

        var finishBtn = dialog.getChildByName("Image_bg").getChildByName("Button_finish");
        finishBtn.addTouchEventListener(function(sender, Type) {

            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    var name = textInput.getString();
                    if (!name || name.length > 5)
                        MjClient.showToast("输入1~5个字");
                    else{
                        this.reqCreateTeam(name);
                        dialog.removeFromParent();
                    }
                    
                    break;
                default:
                    break;
            }

        }, this);

        MjClient.Scene.addChild(dialog);
    },

    getBoatPostionX:function(number_1,number_2){
        // 185 ~ 630
        if (number_1 == 0) {
            return 185;
        }
       var num_1 =  number_2 / number_1;
       pos_x = 185 + (630 - 185)*num_1;
       return pos_x;
    },

    createItem_rank:function(oneData,number)
    {
        var self = this;
        if (number == 0) {
            this._rankNumber = oneData.count;
            var copyNode = this._cell_rank_1.clone();
        }else{
            var copyNode = this._cell_rank.clone();            
        }
        copyNode.visible = true;

        var Text_ming = copyNode.getChildByName("Text_ming");
        Text_ming.ignoreContentAdaptWithSize(true);
        Text_ming.setString(oneData.rank + "");

        var img_boat = copyNode.getChildByName("img_boat");

        var pos_x = this.getBoatPostionX(this._rankNumber,oneData.count)
        img_boat.setPositionX(pos_x);
        var bg_a = img_boat.getChildByName("bg_a");
        bg_a.getChildByName("Text_number").ignoreContentAdaptWithSize(true);
        bg_a.getChildByName("Text_number").setString("" + oneData.count);
        bg_a.getChildByName("Text_name").ignoreContentAdaptWithSize(true);
        bg_a.getChildByName("Text_name").setString("" + oneData.name);
        var bg_b = img_boat.getChildByName("bg_b");
        bg_b.getChildByName("Text_number").ignoreContentAdaptWithSize(true);
        bg_b.getChildByName("Text_name").ignoreContentAdaptWithSize(true);
        bg_b.getChildByName("Text_number").setString("" + oneData.count);
        bg_b.getChildByName("Text_name").setString("" + oneData.name);

        if (pos_x > 480) {
            bg_a.setVisible(false);
            bg_b.setVisible(true);
        }else{
            bg_a.setVisible(true);
            bg_b.setVisible(false);
        }
        
        var Text_mishu = copyNode.getChildByName("icon_flag").getChildByName("Text_mishu");
        Text_mishu.ignoreContentAdaptWithSize(true);
        var mishu = oneData.count / 5;
        Text_mishu.setString(mishu + "米");

        return copyNode;
    },
    addRankItem:function(){
        var _List = this._rankData.list;
        this._rankList.removeAllItems();
        for(var i = 0;i < _List.length ;i++)
        {
            if(cc.sys.isObjectValid(this._cell_rank)) {
                this._rankList.pushBackCustomItem(this.createItem_rank(_List[i],i));
            }
        }
        
        var Text_myming = this.node_bisai.getChildByName("Text_myming");
        var img_boat = this.node_bisai.getChildByName("img_boat");
        var Text_number = img_boat.getChildByName("bg_a").getChildByName("Text_number");
        var Text_name = img_boat.getChildByName("bg_a").getChildByName("Text_name");
        var Text_mishu = this.node_bisai.getChildByName("icon_flag").getChildByName("Text_mishu");
        Text_myming.ignoreContentAdaptWithSize(true);
        Text_number.ignoreContentAdaptWithSize(true);
        Text_name.ignoreContentAdaptWithSize(true);
        Text_mishu.ignoreContentAdaptWithSize(true);

        if (this._rankData.mineInfo) {
            var myInfo = this._rankData.mineInfo;
            Text_myming.setString(myInfo.rank);
            Text_number.setString(myInfo.count);
            Text_name.setString(myInfo.name);
            var mishu = myInfo.count / 5;
            Text_mishu.setString(mishu + "米");
            
        }else{
            Text_myming.setString("无");
            Text_number.setString("无");
            Text_name.setString("无");
            Text_mishu.setString("无");
        }

    },

    createItem_user:function(oneData,number)
    {
        var self = this;

        var copyNode = this._cell_user.clone();            

        copyNode.visible = true;

        var Text_name = copyNode.getChildByName("Text_name");
        Text_name.ignoreContentAdaptWithSize(true);
        Text_name.setString(getNewName_new(unescape(oneData.nickname)));

        var Text_chagnci = copyNode.getChildByName("Text_chagnci");
        Text_chagnci.ignoreContentAdaptWithSize(true);
        Text_chagnci.setString(unescape(oneData.count) + "场");

        var sp_bg = copyNode.getChildByName("sp_ren");

        var sprite_bg = new cc.Sprite("DuanWuJie/icon_head.png");
        sprite_bg.setPosition(sp_bg.getPosition());
        copyNode.addChild(sprite_bg);
        var imageUrl = oneData.headimgurl;
        cc.loader.loadImg(imageUrl ? imageUrl : "DuanWuJie/icon_head.png", {
            isCrossOrigin: true
        }, function(err, img) {
            if (err) {
                cc.log(err);
            } else if (img && cc.sys.isObjectValid(sprite_bg)) {
                sprite_bg.setTexture(img);
            }
        });

        return copyNode;
    },

    addUserItem:function(){
        var _List = this._userlistData.list;
        // for (var i = 0; i < 20; i++) {
        //     _List.push(_List[0]);
        // }
        this._userList.removeAllItems();
        for(var i = 0;i < _List.length ;i++)
        {
            if(cc.sys.isObjectValid(this._cell_user)) {
                this._userList.pushBackCustomItem(this.createItem_user(_List[i],i));
            }
        }

        var Text_ming = this._team_2.getChildByName("Text_ming");
        Text_ming.ignoreContentAdaptWithSize(true);
        Text_ming.setString(this._userlistData.count +"名");

        var Text_chang = this._team_2.getChildByName("Text_chang");
        Text_chang.ignoreContentAdaptWithSize(true);
        Text_chang.setString(this._userlistData.totalCount +"场");

        var Text_duiming = this._team_2.getChildByName("Text_duiming");
        Text_duiming.ignoreContentAdaptWithSize(true);
        Text_duiming.setString(this._myteamData.name +"的龙舟队");


    },

    createItem_award:function(oneData,number)
    {
        var self = this;

        var copyNode = this._cell_award.clone();            

        copyNode.visible = true;

        var Text_name = copyNode.getChildByName("Text_name");
        Text_name.ignoreContentAdaptWithSize(true);
        Text_name.setString(getNewName_new(unescape(oneData.nickname)));

        var Text_jiangli = copyNode.getChildByName("Text_jiangli");
        Text_jiangli.ignoreContentAdaptWithSize(true);
        Text_jiangli.setString(oneData.award);

        var Text_time = copyNode.getChildByName("Text_time");
        Text_time.ignoreContentAdaptWithSize(true);
        var time = MjClient.dateFormat(new Date(oneData.createTime), "MM/dd");
        Text_time.setString(time);

        var sp_bg = copyNode.getChildByName("sp_head");

        var sprite_bg = new cc.Sprite("DuanWuJie/icon_head.png");
        sprite_bg.setPosition(sp_bg.getPosition());
        copyNode.addChild(sprite_bg);
        var imageUrl = oneData.headimgurl;
        cc.loader.loadImg(imageUrl ? imageUrl : "DuanWuJie/icon_head.png", {
            isCrossOrigin: true
        }, function(err, img) {
            if (err) {
                cc.log(err);
            } else if (img && cc.sys.isObjectValid(sprite_bg)) {
                sprite_bg.setTexture(img);
            }
        });

        return copyNode;
    },

    addAwardItem:function(){
        var _List = this._awardData.list;
        // for (var i = 0; i < 20; i++) {
        //     _List.push(_List[0]);
        // }
        this._awardList.removeAllItems();
        for(var i = 0;i < _List.length ;i++)
        {
            if(cc.sys.isObjectValid(this._cell_user)) {
                this._awardList.pushBackCustomItem(this.createItem_award(_List[i],i));
            }
        }
        if (_List.length == 0) {
            this._text_wu.visible = true;
        }else{
            this._text_wu.visible = false;
        }

    },

    reqUserList:function(id){
        var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.dragonBoatUserList", {id:id},
            function(rtn) {
                 cc.log("pkplayer.handler.dragonBoatUserList ----------- " + JSON.stringify(rtn));
                if (rtn.code == 0) {
                   self._userlistData = rtn.data;
                   self.addUserItem();
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

    reqBoatRank:function(){
        var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.dragonBoatRank", {},
            function(rtn) {
                 cc.log("pkplayer.handler.dragonBoatRank ----------- " + JSON.stringify(rtn));
                if (rtn.code == 0) {
                   self._rankData = rtn.data;
                   self.addRankItem();
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

    reqAwardRank:function(){
        var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.dragonBoatAward", {},
            function(rtn) {
                 cc.log("pkplayer.handler.dragonBoatAward ----------- " + JSON.stringify(rtn));
                if (rtn.code == 0) {
                   self._awardData = rtn.data;
                   self.addAwardItem();
                } else {
                    if (rtn.message) {
                        self._text_wu.visible = true;
                        // MjClient.showToast(rtn.message);
                    } else {
                        MjClient.showToast("获取数据失败,请重新打开");
                    }
                }

                MjClient.unblock();
            }
        );
    },


    reqMyTeam:function(){
        var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.dragonBoatMine", {},
            function(rtn) {
                 cc.log("pkplayer.handler.dragonBoatMine ----------- " + JSON.stringify(rtn));
                if (rtn.code == 0) {
                   self._myteamData = rtn.data;
                   // lms
                   if (rtn.data.notEmpty) {
                        self._team_2.setVisible(true);
                        self._team_1.visible = false;
                        self.reqUserList(rtn.data.id);
                        
                   }else{
                        self._team_2.setVisible(false);
                        self._team_1.visible = true;

                   }

                   if (!rtn.data.id) {
                        self._btn_join.visible = !rtn.data.isLv1Member;
                        self._btn_create.visible = rtn.data.isLv1Member;
                        self.beijing_1.setBackGroundImage("DuanWuJie/bg_main.jpg");
                   }else{
                        self._btn_yaoqing.visible = rtn.data.isCaptain;
                        self.beijing_1.setBackGroundImage("DuanWuJie/bg_main_2.jpg");
                   }

                    var time =  self._myteamData.startTime - self._myteamData.serverTime;
                    var time_2 =  self._myteamData.endTime - self._myteamData.serverTime;
                    self._btn_yaoqing.setVisible(rtn.data.isCaptain && time_2>0);
                    var mushi_number = rtn.data.count / 5;
                    self._go_txt1.setString( mushi_number + "");
                    self._go_txt2.setString(rtn.data.percent + "%");
                    self.img_daojishi.setVisible(time>=0);
                    self.img_go.setVisible(time<0);
                    if (self.img_daojishi && !self._schedule) {
                        self._schedule = true;
                        self.schedule(function(){
                            time -= 1000;
                            time_2 -= 1000;
                            var day = parseInt(time / 1000 / 60 / 60 / 24);
                            var hour = parseInt(time / 1000 / 60 / 60 % 24);
                            var minute = parseInt(time / 1000 / 60 % 60);
                            var seconds = parseInt(time / 1000 % 60);
                            // hour = day * 24 + hour;
                            self._daojishi_txt1.setString(day + "");
                            self._daojishi_txt2.setString(hour + "");
                            self._daojishi_txt3.setString(minute + "");
                            self.img_daojishi.setVisible(time>=0);
                            self.img_go.setVisible(time<0);

                        },1)  
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

    reqCreateTeam:function(name){
        var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.dragonBoatCreate", {name:name},
            function(rtn) {
                 cc.log("pkplayer.handler.dragonBoatCreate ----------- " + JSON.stringify(rtn));
                if (rtn.code == 0) {
                   self.reqMyTeam();
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
    
    reqGetJiangli:function(){
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.dragonBoatAwardRecv", {},
            function(rtn) {
                 cc.log("pkplayer.handler.dragonBoatAwardRecv ----------- " + JSON.stringify(rtn));
                if (rtn.code == 0) {
                   var type = rtn.data.captainAward || rtn.data.userRecvType;
                   var number =  rtn.data.amount || 0;
                   var layer = new DuanWuJie_BackLayer(type, number); 
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



    setCloseCallback:function(callback)
    {
        this._closeCallback = callback;
    }

});


/**
 * @Author:      Lms
 * @Email:       lms_190865480@163.com
 * @QQ:       190865480
 * @DateTime:     2018-06-06 
 * @Description:  
 */

var DuanWuJie_ruleLayer = cc.Layer.extend({
    ctor: function() {
        this._super();
        var UI = ccs.load("DuanWujie_rule.json");
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
        // back.getChildByName("contentScrollView").setContentSize(800,900);
        var _txt = back.getChildByName("contentScrollView").getChildByName("content1");
        var _str = "1、活动期间每位代理（除预备代理）可创建1个龙舟\n" + "2、6月15日 00：00 — 6月18日 00：00 为准备时间\n" +
        "3、6月18日 00：00 — 6月21日 00：00 为比赛时间\n" + "4、根据龙舟上所有划手贡献的场次总和，按照5场为1米计算距离\n" + 
        "5、根据龙舟前进距离计算排名，第1—5名龙舟队长可得实物奖励，队员得红包奖励，6—10名龙舟队长可获得元宝奖励，队员可获得元宝和积分奖励\n" +
        "6、正式代理不能加入其他人的龙舟，只能自己创建龙舟，预备代理与玩家一样\n" +
        "7、每个正式代理只能创建一只龙舟，每位玩家只能加入一只龙舟\n" + "8、成功加入后不能退出或更换龙舟队\n" + 
        "9、龙舟行驶距离至少达到3000场才能领取奖励\n" + "10、活动结束后展示一天，未主动领取奖励则视为放弃\n";
        _txt.setString(_str);
        //tipText
        var _tip = back.getChildByName("tipText");
        _tip.ignoreContentAdaptWithSize(true);
        _tip.setString("温馨提示：如有疑问，请咨询公众号（" + MjClient.systemConfig.gongzhonghao + "）")
    },

    
});


/**
 * @Author:      Lms
 * @Email:       lms_190865480@163.com
 * @QQ:       190865480
 * @DateTime:     2018-06-07 
 * @Description: Description 
 */


var DuanWuJie_BackLayer = cc.Layer.extend({
    
    ctor: function(type, number) {
        this._super();
        var UI = ccs.load("DuanWuJie_Back.json");
        this.addChild(UI.node);
        var self = this;
        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        var _back = UI.node.getChildByName("back");
        setWgtLayout(_back, [1, 1], [0.5, 0.5], [0, 0]);

        var close = _back.getChildByName("close");
        close.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                self.removeFromParent();
            }
        }, this);
        for (var i = 1; i < 9; i++) {
            this["_luckyNode_" + i] = _back.getChildByName("lucky_" + i);
            this["_luckyNode_" + i].setVisible(false);
            this["_textMingci_" + i] = this["_luckyNode_" + i].getChildByName("Text_1");
            this["_textMingci_" + i].ignoreContentAdaptWithSize(true);
            this["_textGetdesc_" + i] = this["_luckyNode_" + i].getChildByName("Text_2");
            this["_textGetdesc_" + i].ignoreContentAdaptWithSize(true);
        }

        // var _txt2 = this._luckyNode_3.getChildByName("Text_2")
        // if (_txt2 && MjClient.luckyTableLayer_ui) {
        //     _txt2.setString("分享成功后，关注公众号(" + MjClient.systemConfig.gongzhonghao + ")领取");
        // }
        
        switch(type) {
            case 1:
                this._luckyNode_1.setVisible(true);
                this._textMingci_1.setString("恭喜你获得第一名奖励美的冰箱");
                this._textGetdesc_1.setString("请截图联系（" + MjClient.systemConfig.gongzhonghao + "）领取奖励");
                break;
            case 2:
                this._luckyNode_2.setVisible(true);
                this._textMingci_2.setString("恭喜你获得第二名奖励海尔洗衣机");
                this._textGetdesc_2.setString("请截图联系（" + MjClient.systemConfig.gongzhonghao + "）领取奖励");
                break;
            case 3:
                this._luckyNode_3.setVisible(true);
                this._textMingci_3.setString("恭喜你获得第三名奖励奥克斯空调扇");
                this._textGetdesc_3.setString("请截图联系（" + MjClient.systemConfig.gongzhonghao + "）领取奖励");
                break;
            case 4:
                this._luckyNode_4.setVisible(true);
                this._textMingci_4.setString("恭喜你获得第四名奖励美的豆浆机");
                this._textGetdesc_4.setString("请截图联系（" + MjClient.systemConfig.gongzhonghao + "）领取奖励");
                break;
            case 5:
                this._luckyNode_5.setVisible(true);
                this._textMingci_5.setString("恭喜你获得第五名奖励漫步者音箱");
                this._textGetdesc_5.setString("请截图联系（" + MjClient.systemConfig.gongzhonghao + "）领取奖励");
                break;
            case 6:
                this._luckyNode_6.setVisible(true);
                this._textMingci_6.setString("恭喜你获得第六名奖励");
                var text_num = this._luckyNode_6.getChildByName("Text_number");
                text_num.ignoreContentAdaptWithSize(true);
                text_num.setString(number + "元宝");
                text_num.x += 30;
                this._textGetdesc_6.setString("请截图联系（" + MjClient.systemConfig.gongzhonghao + "）领取奖励");
                break;
            case 7:
                this._luckyNode_7.setVisible(true);
                this._textMingci_7.setString("恭喜你获得 " + number + "元 现金红包");
                var text_num = this._luckyNode_7.getChildByName("Text_number");
                text_num.ignoreContentAdaptWithSize(true);
                text_num.setString(number);
                this._textGetdesc_7.setString("请关注（" + MjClient.systemConfig.gongzhonghao + "）领取红包奖励");
                break;
            case 8:
                this._luckyNode_8.setVisible(true);
                this._textMingci_8.setString("恭喜你获得"+ number +"礼券");
                this._textGetdesc_8.setString("奖励已经发放，请点进积分商城里面，注意查收");
                break;

        }

      
    },

});