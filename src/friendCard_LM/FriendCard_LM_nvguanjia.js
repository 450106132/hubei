/**
 * Created by cyc on 2017/11/21.
 */

// 联盟 - 亲友圈 - 女管家 - 使用独立UI
var Friendcard_LM_nvguanjia = cc.Layer.extend({
    ctor:function (data) {
        this._super();
        this.clubId = data.clubId;
        this.ruleIndex = data.ruleIndex || 0
        this.data = data.data || null;
        this.isCreator = data.isCreator;
        var node = ccs.load("friendcard_LM_nvguanjia.json").node;
        this.addChild(node);
        this.node = node;

        this.panel = node.getChildByName("Panel");
        setWgtLayout(node.getChildByName("Image_di"), [1, 1], [0.5, 0.5], [0, 0], true);
        setWgtLayout(node.getChildByName("Panel"), [1, 1], [0.5, 0.5], [0, 0]);

        popupAnm(this.panel)
        
        this.initNvguanjiaLayer();
    },
    initNvguanjiaLayer:function(){
        var that = this;
        var btn_set = this.panel.getChildByName("btn_set");
        var btn_gaojiSet = this.panel.getChildByName("btn_gaojiSet");
        var btn_guanli = this.panel.getChildByName("btn_guanli");
        var btn_huci = this.panel.getChildByName("btn_huci");
        var btn_yaoqingLM = this.panel.getChildByName("btn_yaoqingLM");
        var btn_stopPlayPlayer = this.panel.getChildByName("btn_stopPlayPlayer");

        if(FriendCard_Common.getSkinType() == 3){
            var img_heye = this.panel.getChildByName("img_heye");
            var starParticle2 =  new cc.ParticleSystem("Particle/qipao.plist");
            starParticle2.setPosition(img_heye.getContentSize().width/2, img_heye.getContentSize().height/2 - 20);
            img_heye.addChild(starParticle2);
        }

        var btn_isStopKaiFang = this.panel.getChildByName("btn_isStopKaiFang");
        if (this.data && this.data.info.createSwitch == 1) {
            btn_isStopKaiFang.setSelected(false)
        }
        else{
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
                MjClient.FriendCard_main_ui.addChild(new FriendCard_LM_info(that.data, MjClient.FriendCard_main_ui));
            }
        }, this);

        btn_gaojiSet.addTouchEventListener(function(sender, type){
            if (type == 2)
            {
                MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Renwu_Gaojishezhi", {uid:SelfUid()});
                MjClient.FriendCard_main_ui.addChild(new Friendcard_LM_gaojiSet(that.data,that.clubId));
            }
        }, this);

        if(btn_yaoqingLM)
        {            
            btn_yaoqingLM.addTouchEventListener(function(sender, type){
                if (type == 2)
                {
                    MjClient.FriendCard_main_ui.addChild(new FriendCard_LM_FindLayer(null, that.clubId));
                }
            }, this);  
        }
        if(btn_stopPlayPlayer)
        {            
            btn_stopPlayPlayer.addTouchEventListener(function(sender, type){
                if (type == 2)
                {
                    MjClient.FriendCard_main_ui.addChild(new Friendcard_LM_stopPlay(that.clubId));
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
                MjClient.FriendCard_main_ui.addChild(new Friendcard_LM_mutexLayer(that.clubId));
            }
        }, this);

       


        if(!this.isCreator)
        {
            btn_gaojiSet.visible = false;
            btn_set.visible = false;
            btn_yaoqingLM.visible = false;
            btn_isStopKaiFang.visible = false;
            btn_stopPlayPlayer.visible = false;
            btn_guanli.y = btn_set.y;
            btn_huci.y = btn_guanli.y

        }
        if(!FriendCard_Common.isLeader()){
            btn_yaoqingLM.visible = false;
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
    reqStop: function(createSwitch,clubId) {
        var that = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.leagueUpdate", {
                createSwitch:createSwitch,
                leagueId:clubId
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