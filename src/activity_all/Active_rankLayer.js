/**create by Lms
 * @DateTime:     2018-08-03 
 * @Description: Description 
 */


var Active_rankLayer = cc.Layer.extend({

    ctor: function() {
        this._super();
        var UI = ccs.load("ActiveRankLayer.json");
        this.addChild(UI.node);
        var self = this;
        this._data = null;
        this._closeCallback = null;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        this.node_top = UI.node.getChildByName("node_top");
        setWgtLayout(this.node_top, [1, 0.139], [0.5, 1], [0, 0]);

        this.node_left = UI.node.getChildByName("node_left");
        setWgtLayout(this.node_left, [0.625, 0.9], [0.31, 0.44], [0, 0]);

        this.node_right = UI.node.getChildByName("node_right");
        setWgtLayout(this.node_right, [0.39, 0.86], [0.797, 0.449], [0, 0]);

        var _closeBtn = this.node_top.getChildByName("close");
        _closeBtn.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                if (this._closeCallback)
                {
                    this._closeCallback();
                }
                this.removeFromParent();
            }
        }, this);

        this.reqRankData();

        this._bgView = this.node_left.getChildByName("bg_view");

        this._cellRank = this.node_left.getChildByName("cell_rank");
        this._cellRank.visible = false;
        this._rankListView = this._bgView.getChildByName("listView_rank");

        this._myRank = this.node_left.getChildByName("node_mine");
        this._myRank.visible = false;
        var _btnShare = this.node_right.getChildByName("btn_share");
        _btnShare.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                if (cc.sys.OS_WINDOWS == cc.sys.os) {
                    MjClient.wxShareImageToPYQ = true;
                    postEvent("WX_SHARE_SUCCESS", {
                        errCode: 0
                    });
                }

                var filePath = jsb.fileUtils.getWritablePath() + "update/res/" + "active_rank/share_bg.jpg";
                MjClient.native.wxShareImageToPYQ(filePath);
            }
        }, this);

        UIEventBind(null, _btnShare, "WX_SHARE_SUCCESS", function(data) {
            if (parseInt(data.errCode) == 0 && MjClient.wxShareImageToPYQ == true) {
                self.reqRankShare();
            }
            MjClient.wxShareImageToPYQ = false;

        });

        this._btnGet = this.node_right.getChildByName("btn_get");
        this._btnGet.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                this.reqGetPrize();
            }
        }, this);

        this._Text_desc = this.node_right.getChildByName("ListView_desc").getChildByName("Text_desc");
        


    },
   
    initRankList: function() {
        if (!cc.sys.isObjectValid(this) || !this._data) {
            return;
        }
        // this._data.mine.awardStatus = 2;
        if (this._data.mine.awardStatus == 0) {
            this._btnGet.setTouchEnabled(false);
            this._btnGet.loadTextureNormal("active_rank/btn_prize_0.png");
        }else if(this._data.mine.awardStatus == 1){
            this._btnGet.setTouchEnabled(true);
            this._btnGet.loadTextureNormal("active_rank/btn_prize.png");
        }else if (this._data.mine.awardStatus == 2) {
            this._btnGet.setTouchEnabled(false);
            this._btnGet.loadTextureNormal("active_rank/btn_prize_2.png");
        }

        this.initSelfInfo(this._data.mine);

        var _rankList = this._data.list;
        // for (var i = 0; i < 400; i++) {
        //     _rankList.push(_rankList[0]);
        // }
        COMMON_UI.listEncapsulation(this._rankListView, _rankList, 50, this.createCell.bind(this));
        
        var str_desc = "";
        if (MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ || MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG) {
            str_desc = "一、活动时间\n" + 
            "积分获得时间：" +  this._data.activityRange+"\n" +
            "奖励领取时间：" +  this._data.getAwardRange+"\n" +
            "二、活动规则\n" +
            "在活动时间内玩家按玩牌局数进行排名，采取积分制。打一局（一小局）得1积分以正常结束的小局为准，分享一次得10积分，（每日一次分享机会），未在规定时间内领取奖励视为放弃领奖。（因个别玩法规则不一样，积分计数规则不一样）集赞奖励在" + this._data.getAwardRange +"添加客服（ttian8555）领取元宝。\n" +
            "三、活动奖励\n" +
            "第一名奖励：113888礼券(价值390微波炉)\n" +
            "第二名奖励：75999礼券（价值250电饭煲）\n" +
            "第三名奖励：54999礼券（价值158豆浆机）\n" +
            "第四名奖励：39666礼券（价值99元榨汁机）\n" +
            "第五名奖励：31888礼券（价值69元平底锅）\n" +
            "第6-10名奖励：12999礼券 \n" +
            "第11-50名奖励：5999礼券 \n" +
            "第51-200名奖励：2599礼券 \n" +
            "第201-500名奖励：588礼券 \n" +
            "代理在活动期间分享活动海报至朋友圈并集赞38个，且在活动结束之前保留朋友圈，可获得888元宝。每个代理限领一次。活动解释权归官方所有";
        }else if(isJinZhongAPPType()){
            str_desc = "一、活动时间\n" + 
            "积分获得时间：" +  this._data.activityRange+"\n" +
            "奖励领取时间：" +  this._data.getAwardRange+"\n" +
            "二、活动规则\n" +
            "在活动时间内玩家按玩牌局数进行排名，采取积分制。打一局（一小局）得1积分以正常结束的小局为准，分享一次得10积分，（每日 一次分享机会），活动结束后领取奖励。\n" +
            "三、活动奖励\n" +
            "第一名奖励：180000礼券(价值1299冰箱)\n" +
            "第二名奖励：113888礼券（价值500吸尘器）\n" +
            "第三名奖励：75999礼券（价值268电饭煲）\n" +
            "第四名奖励：54999礼券（价值169元豆浆机）\n" +
            "第五名奖励：39666礼券（价值99元榨汁机）\n" +
            "第6-10名奖励：29888礼券（价值60元食用油）\n" +
            "第11-50名奖励：12588礼券（价值25元洗衣液）\n" +
            "第51-300名奖励：2599礼券\n" +
            "第301-500名奖励：588礼券\n" +
            "代理在活动期间将活动海报发至朋友圈并积赞58个可获得88元宝，且在活动结束之前保留朋友圈，每个代理限领一次。\n"+
            "四、奖励领取\n" +
            "活动结束后按照排名在活动页面进行领取，元宝、礼券以邮件的形式发放。活动结束后3天内未领取视为放弃。集赞奖励在活动结束后3天带截图内找客服领取。集赞奖励在" + this._data.getAwardRange +"添加客服（txing518888）领取元宝。\n";


        }

        this._Text_desc.setString(str_desc);


        
        
    },

    refreshHead: function(url, head) {
        head.needScale = 4;
        head.isMask = false;
        COMMON_UI.refreshHead(this,url,head);
    },

    createCell: function(oneData, rankNum) {
        if (!cc.sys.isObjectValid(this)) {
            return;
        }
        var copyNode = this._cellRank.clone();
        copyNode.visible = true;

        this.refreshHead(oneData.headimgurl, copyNode.getChildByName("nobody"));

        var _rankText = copyNode.getChildByName("Text_rank");
        _rankText.visible = false;
        _rankText.ignoreContentAdaptWithSize(true);

        var _rankImage = copyNode.getChildByName("image_rank");
        _rankImage.visible = false;
        var _pathIcon = "active_rank/di_";
        var rank = rankNum + 1;
        if (rank <= 3) {
            _rankImage.visible = true;
            _rankImage.loadTexture(_pathIcon + rank + "_ming.png");
            // 闪光效果
            var clipper = cc.ClippingNode.create();
            var sten = cc.Sprite.create(_pathIcon + rank + "_ming.png");
            var stenSize = sten.getContentSize();
            clipper.setContentSize(stenSize);
            clipper.setStencil(sten);
            clipper.setAlphaThreshold(0.5);
            sten.setPosition(stenSize.width / 2, stenSize.height / 2);
            _rankImage.addChild(clipper);
            var sprite = new cc.Sprite("active_rank/enter_3.png");
            clipper.addChild(sprite, 1);
            var repeatAction = cc.RepeatForever.create(cc.Sequence.create(
                cc.MoveTo.create(0.0, cc.p(-sten.width / 2, sten.height / 2)),
                cc.MoveTo.create(1.3, cc.p(sten.width + sten.width / 2, sten.height / 2)),
                cc.delayTime(0.8)));
            sprite.runAction(repeatAction); //进行向右移动的重复动作
        } else {
            _rankText.visible = true;
            _rankText.setString("" + rank);
        }


        var _Text_name = copyNode.getChildByName("Text_name");
        if (oneData.nickname) {
            var _nameStr = unescape(oneData.nickname);
            _Text_name.setString(getNewName(_nameStr, 6));
            _Text_name.ignoreContentAdaptWithSize(true);
        }

        var _Text_id = copyNode.getChildByName("Text_id");
        _Text_id.setString(oneData.userId);
        _Text_id.ignoreContentAdaptWithSize(true);

        var _Text_jifen = copyNode.getChildByName("Text_jifen");
        _Text_jifen.setString(oneData.value);
        _Text_jifen.ignoreContentAdaptWithSize(true);

        var _Text_lq = copyNode.getChildByName("Text_lq");
        _Text_lq.setString(oneData.award);
        _Text_lq.ignoreContentAdaptWithSize(true);

        return copyNode;
    },

    initSelfInfo: function(oneData) {
        if (!cc.sys.isObjectValid(this._myRank)) {
            return;
        }
        var copyNode = this._myRank;
        copyNode.visible = true;
        var headicon = copyNode.getChildByName("nobody");
        var url = oneData.headimgurl;
        if (!url) url = "active_rank/icon_head.png";
        cc.loader.loadImg(url, {
            isCrossOrigin: true
        }, function(err, texture) {
            if (!err && texture && cc.sys.isObjectValid(headicon)) {
                var headSprite = new cc.Sprite(texture);
                headSprite.setPosition(headicon.getContentSize().width / 2, headicon.getContentSize().height / 2);
                headSprite.setScale((headicon.getContentSize().width - 4) / headSprite.getContentSize().width);
                headicon.addChild(headSprite);
            }
        });

        var _rankText = copyNode.getChildByName("Text_rank");
        _rankText.visible = false;
        _rankText.ignoreContentAdaptWithSize(true);

        var _rankImage = copyNode.getChildByName("image_rank");
        _rankImage.visible = false;
        var _pathIcon = "active_rank/di_";
        var rank = oneData.ranking;
        if (rank == "未上榜") {
            _rankImage.visible = true;
            _rankImage.loadTexture("active_rank/icon_wsb.png");
        } else if (rank == 1) {
            _rankImage.visible = true;
            _rankImage.loadTexture(_pathIcon + "1_ming.png");
        } else if (rank == 2) {
            _rankImage.visible = true;
            _rankImage.loadTexture(_pathIcon + "2_ming.png");
        } else if (rank == 3) {
            _rankImage.visible = true;
            _rankImage.loadTexture(_pathIcon + "3_ming.png");
        } else {
            _rankText.visible = true;
            _rankText.setString("" + rank);
        }


        var _Text_name = copyNode.getChildByName("Text_name");
        if (oneData.nickname) {
            var _nameStr = unescape(oneData.nickname);
            _Text_name.setString(getNewName(_nameStr, 6));
            _Text_name.ignoreContentAdaptWithSize(true);
        }

        var _Text_id = copyNode.getChildByName("Text_id");
        _Text_id.setString(oneData.userId);
        _Text_id.ignoreContentAdaptWithSize(true);

        var _Text_jifen = copyNode.getChildByName("Text_jifen");
        _Text_jifen.setString(oneData.value);
        _Text_jifen.ignoreContentAdaptWithSize(true);

        var _Text_lq = copyNode.getChildByName("Text_lq");
        _Text_lq.setString(oneData.award);
        _Text_lq.ignoreContentAdaptWithSize(true);

    },
    reqRankData: function() {
        var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.userRanklist", {
                type: 1
            },
            function(rtn) {
                if (rtn.code == 0) {
                    self._data = rtn.data;
                    self.initRankList();
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
    reqRankShare: function() {
        var self = this;
        MjClient.gamenet.request("pkplayer.handler.activityShare", {
                source: 1
            },
            function(rtn) {
                if (rtn.code == 0) {
                    cc.log(" ===== activityShare ===   " + JSON.stringify(rtn));
                    self.reqRankData();
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
    reqGetPrize: function() {
        var self = this;
        cc.log(" =========  请求领取 ----- ");
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.ranklistAwardRecv", {
                source: 1
            },
            function(rtn) {
                if (rtn.code == 0) {
                    MjClient.showToast("领取成功");
                    self.reqRankData();
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

    },
});

