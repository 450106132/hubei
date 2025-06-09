/**
 * Created by sking on 2017/5/8.
 */

var recommendLayer_active = cc.Layer.extend({
    _Text_had_person: null,
    _Text_had_money: null,
    ctor: function() {
        this._super();
        this._selectUiIndex = MjClient.isUseUIv3 && MjClient.isUseUIv3();
        if(this._selectUiIndex && (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP|| MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ)){
            var UI = ccs.load("RecommendLayer_active_3.0.json");
        }
        else {
            var UI = ccs.load("RecommendLayer_active.json");
        }
        this.addChild(UI.node);
        var that = this;
        this._recordList = null;
        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        var _back = UI.node.getChildByName("back");
        setWgtLayout(_back, [0.96, 0.81], [0.5, 0.50], [0, 0]);

        if(this._selectUiIndex && (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ)){
            var light = new cc.ParticleSystem("inviteReward_3.0/yanqingyouli.plist");
            light.setPosition(640, 500);
            light.setScale(1);
            _back.addChild(light);

            var animNode =createSpine("inviteReward_3.0/yaoqingyouli.json", "inviteReward_3.0/yaoqingyouli.atlas");
            animNode.setPosition(cc.p(175, 60));
            animNode.setAnimation(0, "animation", true);
            animNode.setScale(0.95);
            _back.addChild(animNode);
        }

        var _close = _back.getChildByName("close");
        _close.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Invite_Close", {uid:SelfUid()});
                that.removeFromParent();
            }
        }, this);

        //已经推荐的下载的人数
        var _Text_had_download = _back.getChildByName("Text_had_download");
        _Text_had_download.ignoreContentAdaptWithSize(true);
        _Text_had_download.setString("");

        //已经推荐并对战的人数
        var _Text_had_game = _back.getChildByName("Text_had_game");
        _Text_had_game.ignoreContentAdaptWithSize(true);
        _Text_had_game.setString("");

        //已经获取的元宝
        var _Text_had_money = _back.getChildByName("Text_had_money");
        _Text_had_money.ignoreContentAdaptWithSize(true);
        _Text_had_money.setString("");

        //已回归的好友人数
        var _Text_had_invite = _back.getChildByName("Text_had_invite");
        _Text_had_invite.ignoreContentAdaptWithSize(true);
        _Text_had_invite.setString("");

        if (MjClient.gamenet) {
            MjClient.gamenet.request("pkplayer.handler.getUserReferrerCount", {},
                function(rtn) {
                    cc.log("pkplayer.handler.getUserReferrerCount ----------- " + JSON.stringify(rtn));
                    if (rtn.code == 0) {
                        that._recordList = rtn.data.recordList;
                        if (cc.sys.isObjectValid(_Text_had_download)) _Text_had_download.setString("" + rtn.data.download);
                        if (cc.sys.isObjectValid(_Text_had_game)) _Text_had_game.setString("" + rtn.data.game);
                        if (cc.sys.isObjectValid(_Text_had_money)) _Text_had_money.setString("" + rtn.data.money);
                        if (cc.sys.isObjectValid(_Text_had_invite)) _Text_had_invite.setString("" + rtn.data.invite);
                    }
                });
        }

        //推荐
        var _Btn_recommed = _back.getChildByName("Btn_recommed");
        _Btn_recommed.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                var key = "Zhujiemian_Invite_InviteDownload";
                if(isYongZhouProject()){
                    key = "Tuijian_Xianghaoyoutuijian";
                }
                MjClient.native.umengEvent4CountWithProperty(key, {uid:SelfUid()});
                MjClient.block();
                MjClient.gamenet.request("pkplayer.handler.openBrowser", {
                    type: 3
                }, function(rtn) {
                    if (rtn.code == 0) {
                        var layer = null;
                        if(isYongZhouProject()){
                            layer = new shareNewLayer(rtn.data);
                        }else{
                            layer = new shareNewLayer(rtn.data, null, null, null, "inviteDownload");
                        }
                        MjClient.Scene.addChild(layer);
                    } else {
                        if (rtn.message)
                            MjClient.showToast(rtn.message);
                        else
                            MjClient.showToast("请求数据失败");
                    }
                    MjClient.unblock();
                });
            }
        });

        //邀请回归
        var _Btn_invite = _back.getChildByName("Btn_yaoqing");
        _Btn_invite.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                var key = "Zhujiemian_Invite_InviteBack";
                if(isYongZhouProject()){
                    key = "Tuijian_Yaoqinghaoyouhuigui";
                }
                MjClient.native.umengEvent4CountWithProperty(key, {uid:SelfUid()});
                MjClient.block();
                MjClient.gamenet.request("pkplayer.handler.openBrowser", {
                    type: 3
                }, function(rtn) {
                    if (rtn.code == 0) {
                        var pinfo = MjClient.data.pinfo;
                        var shareTitle = "您的好友" + unescape(pinfo.nickname ) + "，邀请您回来一起玩" + AppCnName[MjClient.getAppType()] + "，登录即送元宝现金，更多福利，等你回来~";
                        // var shareTitle = "老朋友，我在等你回来呢！"
                        var layer = null;
                        if(isYongZhouProject()){
                            layer = new shareNewLayer(rtn.data);
                        }else{
                            layer = new shareNewLayer(rtn.data, null, null, null, "inviteBack");
                        }
                        MjClient.Scene.addChild(layer);
                    } else {
                        if (rtn.message)
                            MjClient.showToast(rtn.message);
                        else
                            MjClient.showToast("请求数据失败");
                    }
                    MjClient.unblock();
                });
            }
        });

        var _Btn_record = _back.getChildByName("Btn_record");
        if (_Btn_record) {
            _Btn_record.addTouchEventListener(function(sender, type) {
                if (type == 2) { 
                    var key = "Zhujiemian_Invite_Detail";
                    if(isYongZhouProject()){
                        key = "Ttuijian_Chakanxiangqing";
                    }
                    MjClient.native.umengEvent4CountWithProperty(key, {uid:SelfUid()});
                    // cc.log(" ===== _Btn_record ");
                    // this._recordList = [{"userId":1000001,"time":"2018/07/23","award":2,"type":"推荐"},{"userId":1000003,"time":"2018/07/23","award":2,"type":"推荐"},{"userId":1000004,"time":"2018/07/23","award":2,"type":"推荐"},{"userId":1000005,"time":"2018/07/23","award":2,"type":"推荐"},{"userId":1000002,"time":"2018/07/23","award":2,"type":"推荐"},{"userId":1000007,"time":"2018/07/23","award":2,"type":"推荐"},{"userId":1000008,"time":"2018/07/23","award":2,"type":"推荐"},{"userId":1000009,"time":"2018/07/23","award":2,"type":"推荐"},{"userId":1000010,"time":"2018/07/23","award":2,"type":"推荐"},{"userId":1000011,"time":"2018/07/23","award":2,"type":"推荐"},{"userId":1000006,"time":"2018/07/23","award":2,"type":"推荐"}];
                    if (!this._recordList) return;
                    var layer = new recommendLayer_list(this._recordList);
                    if (MjClient.isUseUIv3 && MjClient.isUseUIv3())
                        layer = new recommendLayer_list_v3(this._recordList);

                    MjClient.Scene.addChild(layer);
                }
            }, this);
        }

    }
});


var recommendLayer_list = cc.Layer.extend({

    ctor: function(data) {
        this._super();
        var UI = ccs.load("RecommendLayer_activeList.json");
        this.addChild(UI.node);
        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);
        this._back = UI.node.getChildByName("back");
        setWgtLayout(this._back, [0.9, 0.9], [0.5, 0.5], [0, 0]);
        this._desc_txt = this._back.getChildByName("node_title");     
        this._desc_line = this._back.getChildByName("icon_line");

        this._cell = this._back.getChildByName("cell_prize");
        this._listView = this._back.getChildByName("ListView_Prize");
        this._cell.visible = false;

        this._nullTip_text = this._back.getChildByName("nullTip_text");
        this._nullTip_image = this._back.getChildByName("nullTip_image");
        if (this._nullTip_text) {
            this._nullTip_text.visible = false;
            this._nullTip_image.visible = false;
        }
        this.addItems(data);

        var _close = this._back.getChildByName("close");
        _close.addTouchEventListener(function(sender,type){
            if (type == 2) {
                this.removeFromParent();
            }
        },this);

    },
    addItems: function(data) {
        var dataList = data;
        this._listView.removeAllChildren();
        for (var i = 0; i < dataList.length; i++) {
            this._listView.pushBackCustomItem(this.createItem(dataList[i]));
        }

        if (data.length == 0) {
            if (this._nullTip_text) {
                this._nullTip_text.visible = true;
                this._nullTip_image.visible = true;
            } else {
                MjClient.showToast("已显示所有记录");
            }
            this._desc_line.visible = false;
            this._desc_txt.visible = false;
        }else{
            this._desc_line.visible = true;
            this._desc_txt.visible = true;
        }
    },
    createItem:function(oneData){
        if (!cc.sys.isObjectValid(this._cell)) return;
        var copyNode = this._cell.clone();
        copyNode.visible = true;

        var Text_id = copyNode.getChildByName("Text_id");
        Text_id.ignoreContentAdaptWithSize(true);
        Text_id.setString(oneData.userId);

        var Text_time = copyNode.getChildByName("Text_time");
        Text_time.ignoreContentAdaptWithSize(true);        
        // var _timeStr = MjClient.dateFormat(new Date(parseInt(oneData.createTime)), 'yyyy/MM/dd');
        Text_time.setString(oneData.time);
        var Text_prize = copyNode.getChildByName("Text_prize");
        Text_prize.ignoreContentAdaptWithSize(true); 
        Text_prize.setString(oneData.award + "元宝");

        var Text_type = copyNode.getChildByName("Text_type");
        Text_type.ignoreContentAdaptWithSize(true); 
        Text_type.setString(oneData.type);

        return copyNode;
    },
});

var recommendLayer_list_v3 = cc.Layer.extend({

    ctor: function(data) {
        this._super();
        var UI = ccs.load("RecommendLayer_activeList_3.0.json");
        this.addChild(UI.node);
        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);
        this._back = UI.node.getChildByName("back");
        setWgtLayout(this._back, [1, 1], [0.5, 0.5], [0, 0]);
        this._desc_txt = this._back.getChildByName("node_title");     
        this._desc_line = this._back.getChildByName("icon_line");

        this._cell = this._back.getChildByName("cell_prize");
        this._listView = this._back.getChildByName("ListView_Prize");
        this._cell.visible = false;

        this._nullTip_text = this._back.getChildByName("nullTip_text");
        this._nullTip_image = this._back.getChildByName("nullTip_image");
        if (this._nullTip_text) {
            this._nullTip_text.visible = false;
            this._nullTip_image.visible = false;
        }
        this.addItems(data);

        var _close = this._back.getChildByName("close");
        _close.addTouchEventListener(function(sender,type){
            if (type == 2) {
                this.removeFromParent();
            }
        },this);

    },
    addItems: function(data) {
        var dataList = data;
        this._listView.removeAllChildren();
        for (var i = 0; i < dataList.length; i++) {
            this._listView.pushBackCustomItem(this.createItem(dataList[i]));
        }

        if (data.length == 0) {
            if (this._nullTip_text) {
                this._nullTip_text.visible = true;
                this._nullTip_image.visible = true;
            } else {
                MjClient.showToast("已显示所有记录");
            }
            this._desc_line.visible = false;
            this._desc_txt.visible = false;
        }else{
            this._desc_line.visible = true;
            this._desc_txt.visible = true;
        }
    },
    createItem:function(oneData){
        if (!cc.sys.isObjectValid(this._cell)) return;
        var copyNode = this._cell.clone();
        copyNode.visible = true;

        var Text_id = copyNode.getChildByName("Text_id");
        Text_id.ignoreContentAdaptWithSize(true);
        Text_id.setString(oneData.userId);

        var Text_time = copyNode.getChildByName("Text_time");
        Text_time.ignoreContentAdaptWithSize(true);        
        // var _timeStr = MjClient.dateFormat(new Date(parseInt(oneData.createTime)), 'yyyy/MM/dd');
        Text_time.setString(oneData.time);
        var Text_prize = copyNode.getChildByName("Text_prize");
        Text_prize.ignoreContentAdaptWithSize(true); 
        Text_prize.setString(oneData.award + "元宝");

        var Text_type = copyNode.getChildByName("Text_type");
        Text_type.ignoreContentAdaptWithSize(true); 
        Text_type.setString(oneData.type);

        if(oneData.type == "未领取"){
            Text_type.setFontColor("#ff6f20");
        }else{
            Text_type.setFontColor("#38ae6f");
        }

        return copyNode;
    },
});