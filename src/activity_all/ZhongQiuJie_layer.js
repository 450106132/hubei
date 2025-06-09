/**create by Lms
 * @DateTime:     2018-08-03 
 * @Description: 中秋节 排行榜 活动 
 */
var Active_zhongQiuRank = cc.Layer.extend({

    ctor: function() {
        this._super();
        var UI = ccs.load("Act_zhongQiuRank.json");
        this.addChild(UI.node);
        var self = this;
        this._data = null;
        this._closeCallback = null;
        MjClient.ZhongQiuRank_ui = this;

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
                if (this._closeCallback) {
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

                var filePath = jsb.fileUtils.getWritablePath() + "update/res/" + "active_zhongQiuJie/participator_1.jpg";
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
                if (this._data.mine) {
                    cc.log(" ========= this._data.mine ",JSON.stringify(this._data.mine));
                    MjClient.Scene.addChild(new Active_zhongQiuBack(this._data.mine.award));
                }

                // this.reqGetPrize();
            }
        }, this);

        this._Text_desc = this.node_right.getChildByName("ListView_desc").getChildByName("Text_desc");



    },

    initRankList: function() {
        if (!cc.sys.isObjectValid(this) || !this._data) {
            return;
        }
        // this._data.mine.awardStatus = 2;
        if (this._data.mine && this._data.mine.awardStatus == 0) {
            this._btnGet.setTouchEnabled(false);
            this._btnGet.loadTextureNormal("active_zhongQiuJie/btn_prize_0.png");
        } else if (this._data.mine && this._data.mine.awardStatus == 1) {
            this._btnGet.setTouchEnabled(true);
            this._btnGet.loadTextureNormal("active_zhongQiuJie/btn_prize.png");
        } else if (this._data.mine && this._data.mine.awardStatus == 2) {
            this._btnGet.setTouchEnabled(false);
            this._btnGet.loadTextureNormal("active_zhongQiuJie/btn_prize_2.png");
        } else {
            this._btnGet.setTouchEnabled(false);
            this._btnGet.loadTextureNormal("active_zhongQiuJie/btn_prize_0.png");
        }
        this.initSelfInfo(this._data.mine);
        var _rankList = this._data.list;
        // for (var i = 0; i < 400; i++) {
        //     _rankList.push(_rankList[0]);
        // }
        COMMON_UI.listEncapsulation(this._rankListView, _rankList, 50, this.createCell.bind(this));
        var str_desc = "";
        var awardList = [];
        str_desc = "一、活动时间\n" +
            "团圆值获得时间：" + this._data.activityRange + "\n" +
            "奖励领取时间：" + this._data.getAwardRange + "\n" +
            "二、活动规则\n" +
            "团圆值：活跃人数（积分制）\n" +

            "在活动时间内计算代理所有亲友圈的活跃玩家（在活动时间内在代理亲友圈打过牌则视为活跃玩家），每个活跃玩家给代理+50团圆值，代理每天首次分享+100团圆值，每天一次机会。当团圆值一样时，根据时间先后进行排名。注：当玩家加入多个代理的亲友圈时，且在代理的亲友圈打过牌可视为多个代理的活跃玩家。\n" +
            "三、活动奖励\n";

        if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ || MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP || MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP) {
            var _wixin = "";
            if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP) {
                _wixin = "qixing231";
            } else if (MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP) {
                _wixin = "qixing528";
            } else if (MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP) {
                _wixin = "bdhengyang666";
            }
            awardList = [
                [39888, 888],
                [24999, 788],
                [19666, 688],
                [14999, 588],
                [10888, 388],
                [8888, 188],
                [5888, 88],
                [_wixin],
                [188, 188, 100, 88]
            ]; //岳阳 耒阳 衡阳

        } else if (MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ) {
            awardList = [
                [75999, 6888],
                [54999, 5888],
                [39666, 4888],
                [26666, 3888],
                [12888, 1888],
                [6588, 888],
                [],
                ["qixing69999"],
                [100, 1888, 50, 888],
                ["（限前100名可领。）"]
            ]; //湘乡

        } else if (MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ || MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG) {
            awardList = [
                [88888, 6888],
                [54999, 5888],
                [39666, 4888],
                [31999, 3888],
                [21888, 2888],
                [18888, 1888],
                [8888, 888],
                ["qixing202"],
                [188, 1888, 100, 888]
            ]; //邵阳
        } else if (MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ) {
            awardList = [
                [75999, 688],
                [54999, 588],
                [39666, 488],
                [0, 388],
                [0, 188],
                [],
                [],
                ["qixing237"],
                [100, 188, 50, 88],
                ["（限前100名可领。）"]
            ]; //
        } else if (isJinZhongAPPType()) {
            awardList = [
                [88888, 688],
                [54999, 588],
                [39666, 488],
                [31999, 388],
                [21888, 288],
                [18888, 188],
                [8888, 88],
                ["a15214671928"],
                [188, 188, 100, 88]
            ]; //晋中
        }
        str_desc += "第一名：" + awardList[0][0] + "礼券+" + awardList[0][1] + "元宝\n" +
            "第二名：" + awardList[1][0] + "礼券+" + awardList[1][1] + "元宝\n" +
            "第三名：" + awardList[2][0] + "礼券+" + awardList[2][1] + "元宝\n";
        if (awardList[3][1]) {
            if (awardList[3][0] > 0) {
                str_desc += "第4-10名：" + awardList[3][0] + "礼券+" + awardList[3][1] + "元宝\n";
            } else {
                str_desc += "第4-10名：" + awardList[3][1] + "元宝\n";
            }
        }
        if (awardList[4][1]) {
            if (awardList[4][0] > 0) {
                str_desc += "第11-20名：" + awardList[4][0] + "礼券+" + awardList[4][1] + "元宝\n";
            } else {
                str_desc += "第11-20名：" + awardList[4][1] + "元宝\n";
            }
        }
        if (awardList[5][1]) {
            if (awardList[5][0] > 0) {
                str_desc += "第21-50名：" + awardList[5][0] + "礼券+" + awardList[5][1] + "元宝\n";
            } else {
                str_desc += "第21-50名：" + awardList[5][1] + "元宝\n";
            }
        }
        if (awardList[6][0]) {
            str_desc += "第51-100名：" + awardList[6][0] + "礼券+" + awardList[6][1] + "元宝\n";
        }
        str_desc += "代理在活动时间内集赞达" + awardList[8][0] + "可额外获得" + awardList[8][1] + "元宝，集赞达" + awardList[8][2] + "个，可获得" + awardList[8][3] + "元宝。每个代理限领取一次，添加客服微信“" + awardList[7] + "”领取奖励。";
        if (awardList[9]) {
            str_desc += awardList[9];
        }
        str_desc += "\n四、奖励领取" +
            "\n活动结束后可在活动界面点击领取按钮，且分享至朋友圈即可领取奖励。元宝、礼券均以邮件的形式发放至邮箱。未在规定时间内领奖视为放弃领奖。";
        this._Text_desc.setString(str_desc);

    },
    refreshHead: function(url, head) {
        head.needScale = 4;
        head.isMask = false;
        COMMON_UI.refreshHead(this, url, head);
    },

    createCell: function(oneData, rankNum) {
        if (!cc.sys.isObjectValid(this)) {
            return;
        }
        var copyNode = this._cellRank.clone();
        copyNode.visible = true;

        // this.refreshHead(oneData.headimgurl, copyNode.getChildByName("nobody"));

        var _rankText = copyNode.getChildByName("Text_rank");
        _rankText.visible = false;
        _rankText.ignoreContentAdaptWithSize(true);

        var _rankImage = copyNode.getChildByName("image_rank");
        _rankImage.visible = false;
        var _pathIcon = "active_zhongQiuJie/di_";
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
            var sprite = new cc.Sprite("active_zhongQiuJie/enter_3.png");
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
        _Text_id.setString(oneData.memberId);
        _Text_id.ignoreContentAdaptWithSize(true);

        var _Text_jifen = copyNode.getChildByName("Text_jifen");
        _Text_jifen.setString(oneData.value);
        _Text_jifen.ignoreContentAdaptWithSize(true);

        var _Text_lq = copyNode.getChildByName("Text_lq");
        var _money = oneData.award.money;
        var _integral = oneData.award.integral;
        var _redpacket = oneData.award.redpacket;
        var _gold = oneData.award.gold;
        var str = "";
        if (_money) {
            str += _money + "元宝";
        }
        if (_integral) {
            if (str.length > 0) {
                str += "+";
            }
            str += _integral + "礼券";
        }
        if (_redpacket) {
            if (str.length > 0) {
                str += "+";
            }
            str += _redpacket + "现金红包";
        }

        if (_gold) {
            if (str.length > 0) {
                str += "+";
            }
            str += _gold + "金币";
        }
        _Text_lq.setString(str);
        _Text_lq.ignoreContentAdaptWithSize(true);

        return copyNode;
    },

    initSelfInfo: function(oneData) {
        if (!cc.sys.isObjectValid(this._myRank) || !oneData) {
            return;
        }

        var copyNode = this._myRank;
        copyNode.visible = true;

        var _rankText = copyNode.getChildByName("Text_rank");
        _rankText.visible = false;
        _rankText.ignoreContentAdaptWithSize(true);

        var _rankImage = copyNode.getChildByName("image_rank");
        _rankImage.visible = false;
        var _pathIcon = "active_zhongQiuJie/di_";
        var rank = oneData.ranking;
        if (rank == "未上榜" || rank == null) {
            _rankImage.visible = true;
            _rankImage.loadTexture("active_zhongQiuJie/icon_wsb.png");
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
        _Text_id.setString(oneData.memberId);
        _Text_id.ignoreContentAdaptWithSize(true);

        var _Text_jifen = copyNode.getChildByName("Text_jifen");
        _Text_jifen.setString(oneData.value || 0);
        _Text_jifen.ignoreContentAdaptWithSize(true);

        var _Text_lq = copyNode.getChildByName("Text_lq");
        var _money = oneData.award.money;
        var _integral = oneData.award.integral;
        var _redpacket = oneData.award.redpacket;
        var _gold = oneData.award.gold;
        var str = "";
        if (_money) {
            str += _money + "元宝";
        }
        if (_integral) {
            if (str.length > 0) {
                str += "+";
            }
            str += _integral + "礼券";
        }
        if (_redpacket) {
            if (str.length > 0) {
                str += "+";
            }
            str += _redpacket + "现金红包";
        }

        if (_gold) {
            if (str.length > 0) {
                str += "+";
            }
            str += _gold + "金币";
        }
        if (str == "") {
            str = 0;
        }
        _Text_lq.setString(str);
        _Text_lq.ignoreContentAdaptWithSize(true);

    },
    reqRankData: function() {
        var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.activityRanklist", {},
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
                source: 4
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
        MjClient.gamenet.request("pkplayer.handler.activityRanklistAwardRecv", {},
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
    setCloseCallback: function(callback) {

        this._closeCallback = callback;

    },
});


var Active_zhongQiuBack = cc.Layer.extend({
    ctor: function(data) {
        this._super();
        var UI = ccs.load("Act_zhongQiuRank_back.json");
        this.addChild(UI.node);
        var self = this;

        var block = UI.node.getChildByName("block");
        setWgtLayout(block, [1, 1], [0.5, 0.5], [0, 0], true);

        var back = UI.node.getChildByName("back");
        setWgtLayout(back, [1.5, 1.5], [0.5, 0.5], [0, 0]);
        this.back = back;

        var closeBtn = back.getChildByName("close");
        closeBtn.addTouchEventListener(function(sender, type) {
            if (type == 2) {

                self.removeFromParent();
            }
        });
        cc.log(" ====== data.money data.integral",data.money,data.integral);
        var text_yb = back.getChildByName("Image_1").getChildByName("Text_1");
        text_yb.setString("元宝X" + data.money);
        text_yb.ignoreContentAdaptWithSize(true);
        if (!data.integral) {
            back.getChildByName("Image_2").visible = false;
            back.getChildByName("Image_1").x += 100; 
        }else{
            var text_lq = back.getChildByName("Image_2").getChildByName("Text_1");
            text_lq.setString("礼券X" + data.integral);
            text_lq.ignoreContentAdaptWithSize(true);
        }
        

        var _btnShare = back.getChildByName("btn_share");
        _btnShare.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                if (cc.sys.OS_WINDOWS == cc.sys.os) {
                    MjClient.wxShareImageToPYQ = true;
                    postEvent("WX_SHARE_SUCCESS", {
                        errCode: 0
                    });
                }

                var filePath = jsb.fileUtils.getWritablePath() + "update/res/" + "active_zhongQiuJie/participator_1.jpg";
                MjClient.native.wxShareImageToPYQ(filePath);
            }
        }, this);

        UIEventBind(null, _btnShare, "WX_SHARE_SUCCESS", function(data) {
            if (parseInt(data.errCode) == 0 && MjClient.wxShareImageToPYQ == true) {
                MjClient.ZhongQiuRank_ui.reqGetPrize();
                self.removeFromParent();
            }
            MjClient.wxShareImageToPYQ = false;

        });


    },


});