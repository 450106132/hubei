/**
 * Created by cyc on 2017/11/21.
 */

// 亲友圈-女管家
var Friendcard_nvguanjia = cc.Layer.extend({
    ctor:function (data) {
        this._super();
        this.clubId = data.clubId;
        this.ruleIndex = data.ruleIndex || 0
        this.data = data.data || null;
        this.isCreator = data.isCreator;
        var node = ccs.load("friendcard_nvguanjia.json").node;
        this.addChild(node);
        this.node = node;

        this.panel = node.getChildByName("Panel");
        setWgtLayout(node.getChildByName("Image_di"), [1, 1], [0.5, 0.5], [0, 0], true);
        setWgtLayout(node.getChildByName("Panel"), [1, 1], [0.5, 0.5], [0, 0]);

        this.initNvguanjiaLayer();
        popupAnm(this.panel)

    },
    initNvguanjiaLayer:function(){
        var that = this;
        var btn_set = this.panel.getChildByName("btn_set");
        var btn_gaojiSet = this.panel.getChildByName("btn_gaojiSet");
        var btn_yaoqing = this.panel.getChildByName("btn_yaoqing");
        btn_yaoqing.visible = false;//禁用邀请
        var btn_guanli = this.panel.getChildByName("btn_guanli");
        var btn_huci = this.panel.getChildByName("btn_huci");
        var btn_yaoqingLM = this.panel.getChildByName("btn_yaoqingLM");
        btn_yaoqingLM.visible = false;
        var btn_changeToFangkaClub = this.panel.getChildByName("btn_changeToFangkaClub");

        if(FriendCard_Common.getSkinType() == 3){
            var img_heye = this.panel.getChildByName("img_heye");
            var starParticle2 =  new cc.ParticleSystem("Particle/qipao.plist");
            starParticle2.setPosition(img_heye.getContentSize().width/2, img_heye.getContentSize().height/2 - 20);
            img_heye.addChild(starParticle2);
        }
        
        var btn_isStopKaiFang = this.panel.getChildByName("btn_isStopKaiFang");
        var btn_isShowShenhe = this.panel.getChildByName("btn_isShowShenhe");
        if(util.localStorageEncrypt.getBoolItem("clubIsShowShenhe" + this.clubId, true)){
            btn_isShowShenhe.setSelected(true);
        }
        else{
            btn_isShowShenhe.setSelected(false);
        }

        btn_isShowShenhe.addTouchEventListener(function(sender, type){
            if (type == 2)
            {
                btn_isShowShenhe.setTouchEnabled(false);
                this.runAction((cc.sequence(cc.delayTime(0.1), cc.callFunc(function(){
                    btn_isShowShenhe.setTouchEnabled(true);
                    util.localStorageEncrypt.setBoolItem("clubIsShowShenhe" + that.clubId, btn_isShowShenhe.isSelected());
                    if(btn_isShowShenhe.isSelected())
                    {
                         MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Renwu_Shenhetui_On", {uid:SelfUid()});
                    }
                    else
                    {
                         MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Renwu_Shenhetui_Off", {uid:SelfUid()});
                    }
                }))))
            }
        }, this);


        if (this.data && this.data.info.createSwitch == 1) {
            btn_isStopKaiFang.setSelected(false)
        }
        else
        {
            btn_isStopKaiFang.setSelected(true)
        }

        btn_isStopKaiFang.addTouchEventListener(function(sender, type){
            if (type == 2)
            {
                btn_isStopKaiFang.runAction(cc.sequence(cc.delayTime(0.1), cc.callFunc(function(){
                    var createSwitch = btn_isStopKaiFang.isSelected() ? 0 : 1 ;
                    if (createSwitch == 0) {
                        MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Renwu_Zantingkaifang_On", {uid:SelfUid()});

                        var uiPara = {}
                        uiPara.msg = "暂停后将不再开出新房间，已开打的房间\n不受影响。确定要暂停吗？";
                        uiPara.yes = function() {
                            that.reqStop(createSwitch,that.clubId); //createSwitch
                        },
                        uiPara.no = function() {
                            btn_isStopKaiFang.setSelected(false);
                        }
                        uiPara.close = function() {
                            btn_isStopKaiFang.setSelected(false);
                        }
                        MjClient.FriendCard_main_ui.addChild(new Friendcard_popUpMeg(uiPara))
                    }else{
                        MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Renwu_Zantingkaifang_Off", {uid:SelfUid()});
                        
                        that.reqStop(createSwitch,that.clubId);
                    }
                })));
            }
        }, this); 
        
        var btn_isHideClub = this.panel.getChildByName("btn_isHideClub");
        if(btn_isHideClub){
            btn_isHideClub.setSelected(false)
            btn_isHideClub.setTouchEnabled(false);
            if (this.data && this.data.info.clubHideStatus == 1) {
                btn_isHideClub.setSelected(true);
                btn_isHideClub.setTouchEnabled(true);
            }
            else if (this.data && this.data.info.clubHideStatus == 0) {
                btn_isHideClub.setTouchEnabled(true);
            }else if (this.data && this.data.info.clubHideStatus == 2) {
                btn_isHideClub.visible = false;
                btn_isStopKaiFang.x += 60;
                btn_isShowShenhe.x -= 60;
            }
            if(!this.isCreator && btn_isHideClub.visible){
                btn_isHideClub.visible = false;
                btn_isStopKaiFang.x += 60;
                btn_isShowShenhe.x -= 60;
            }
            btn_isHideClub.addTouchEventListener(function(sender, type){
                if (type == 2)
                {
                    btn_isHideClub.runAction(cc.sequence(cc.delayTime(0.1), cc.callFunc(function(){
                        var clubHideStatus = btn_isHideClub.isSelected() ? 1 : 0 ;
                        that.reqHideClub(clubHideStatus,that.clubId);
                    })));
                }
            }, this); 
        }
        this.panel.getChildByName("btn_close").addTouchEventListener(function(sender, type){
            if (type == 2)
            {
                MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Renwu_Close", {uid:SelfUid()});
                this.removeFromParent(true)
            }
        }, this);


        btn_set.addTouchEventListener(function(sender, type){
            if (type == 2)
            {
                MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Renwu_Shezhi", {uid:SelfUid()});
                MjClient.FriendCard_main_ui.addChild(new FriendCard_info(that.data, MjClient.FriendCard_main_ui));
            }
        }, this);

        btn_gaojiSet.addTouchEventListener(function(sender, type){
            if (type == 2)
            {
                MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Renwu_Gaojishezhi", {uid:SelfUid()});
                MjClient.FriendCard_main_ui.addChild(new Friendcard_gaojiSet(that.data,that.clubId));
            }
        }, this);

        // btn_yaoqing.addTouchEventListener(function(sender, type){
        //     if (type == 2)
        //     {
        //         MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Renwu_Yaoqing", {uid:SelfUid()});
        //         that.data.openType = "Renwu_"
        //         MjClient.FriendCard_main_ui.addChild(new FriendCard_yaoqing(that.data, that.ruleIndex));
        //     }
        // }, this);

        // //邀请联盟
        // if(btn_yaoqingLM)
        // {
        //     btn_yaoqingLM.visible = this.data.info.type == 1 && this.isCreator && FriendCard_Common.isOpenLM()
        //     btn_yaoqingLM.addTouchEventListener(function(sender, type){
        //         if (type == 2)
        //         {
        //             MjClient.FriendCard_main_ui.addChild(new FriendCard_LM_FindLayer(that.clubId, null));
        //         }
        //     }, this);  
        // }
        //元宝转房卡
        if(btn_changeToFangkaClub){
            btn_changeToFangkaClub.visible = (this.data.info.type === 0 && this.isCreator && FriendCard_Common.IsOpenRoomCardPay());
            btn_changeToFangkaClub.visible = false;//by verket
            btn_changeToFangkaClub.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    var uiPara = {}
                    uiPara.msg = "该操作会解散当前元宝亲友圈，\n并为您创建钻石亲友圈，是否确认？";
                    //uiPara.uiStyle = "friendcard_posUpMsg_daoshu";
                    uiPara.yes = function() {
                        MjClient.block();
                        MjClient.gamenet.request("pkplayer.handler.changeToFangkaClub", { clubId: that.clubId }, function (rtn) {
                            MjClient.unblock();
                            if (rtn.code == 0) {
                                that.removeFromParent(true)
                            }
                            else {
                                if (rtn.message) {
                                    MjClient.showToast(rtn.message);
                                }
                                else {
                                    MjClient.showToast("获取数据失败，请重试");
                                }
                            }
                        });
                    }
                    uiPara.no = function() {}
                    uiPara.close = function() {}
                    MjClient.FriendCard_main_ui.addChild(new Friendcard_popUpMeg(uiPara))
                    
                }
            }, this); 
        }


        btn_guanli.addTouchEventListener(function(sender, type){
            if (type == 2)
            {
                MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Renwu_Guanlijilu", {uid:SelfUid()});
                MjClient.FriendCard_main_ui.addChild(new FriendCard_managerRecordJZ(that.data));
            }
        }, this);

        btn_huci.addTouchEventListener(function(sender, type){
            if (type == 2)
            {
                MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Renwu_Huchimingdan", {uid:SelfUid()});
                MjClient.FriendCard_main_ui.addChild(new Friendcard_mutexLayer(that.clubId));
            }
        }, this);

       


        if(!this.isCreator)
        {
            if(FriendCard_Common.getSkinType() == 2)
            {
                btn_huci.visible = false;
                btn_gaojiSet.visible = false;
                btn_yaoqing.x = btn_gaojiSet.x
                btn_yaoqing.y = btn_gaojiSet.y
            }
            else if(FriendCard_Common.getSkinType() == 3)
            {
                btn_huci.visible = false;
                btn_gaojiSet.visible = false;
                btn_yaoqing.x = btn_gaojiSet.x
                btn_yaoqing.y = btn_gaojiSet.y
            }
            else
            {
                btn_huci.visible = false;
                btn_gaojiSet.visible = false;
                btn_set.y = btn_huci.y;
            }

        }


        if(FriendCard_Common.getSkinType() == 2)
        {
            var Image_bgNvguanjia = this.panel.getChildByName("Image_bgNvguanjia");
            var sanguang =  new cc.ParticleSystem("friendCards/nvguanjia/sanguang.plist");
            sanguang.setPosition(0,Image_bgNvguanjia.getContentSize().height/2);
            sanguang.setScale(0.2);
            Image_bgNvguanjia.addChild(sanguang,0);
        }

        // this.btn_shouqi.setRotation(-14/2);
        // this.btn_shouqi.addChild(starParticle1,0);
        // this.btn_shouqi.runAction(cc.sequence(cc.rotateBy(2,14).easing(cc.easeQuadraticActionInOut()), cc.rotateBy(2,-14).easing(cc.easeQuadraticActionInOut())).repeatForever()); 

    },
    reqHideClub: function(clubHideStatus,clubId) {
        var that = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.clubUpdateHideStatus", {
                clubHideStatus:clubHideStatus,
                clubId:clubId
            },
            function(rtn) {
                MjClient.unblock();
                if (rtn.code == 0) {
                    if (cc.sys.isObjectValid(that)){
                        if(clubHideStatus == 1){
                            that.removeFromParent();
                        }
                    }
                } else {
                    if (rtn.message) {
                        MjClient.showToast(rtn.message);
                        if (cc.sys.isObjectValid(that))
                            that.removeFromParent();
                    } else {
                        MjClient.showToast("修改失败");
                    }
                }
            }
        );
    },
    reqStop: function(createSwitch,clubId) {
        var that = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.clubUpdate", {
                createSwitch:createSwitch,
                clubId:clubId
            },
            function(rtn) {
                MjClient.unblock();
                if (rtn.code == 0) {
                } else {
                    if (rtn.message) {
                        MjClient.showToast(rtn.message);
                        if (cc.sys.isObjectValid(that))
                            that.removeFromParent();
                    } else {
                        MjClient.showToast("修改失败");
                    }
                }
            }
        );
    },
    onExit: function () {
        this._super();
    },
});