/**create by Lms
 * @DateTime:     2018-08-03 
 * @Description: Description 
 */


var Active_rankNanTong = cc.Layer.extend({

    ctor: function() {
        this._super();
        var UI = ccs.load("ActiveRankLayer.json");
        this.addChild(UI.node);
        var self = this;
        this._data = null;
        this._closeCallback = null;

        this.back_1 = UI.node.getChildByName("back");
        if (isIPhoneX()) {
            setWgtLayout(this.back_1, [0.12, 0.59], [0.0373, 0.5], [0, 0]);
        }else{
            setWgtLayout(this.back_1, [0.12, 0.59], [0.0, 0.5], [0, 0]);
        }
        

        this.back_rank = UI.node.getChildByName("back_2");
        setWgtLayout(this.back_rank, [1, 1], [0.5, 0.5], [0, 0]);
        this.back_rank.visible = false;

        this.block_rank = UI.node.getChildByName("block");
        setWgtLayout(this.block_rank, [1, 1], [0.5, 0.5], [0, 0], true);
        this.block_rank.visible = false;
        this.block_rule = UI.node.getChildByName("block_0");
        setWgtLayout(this.block_rule, [1, 1], [0.5, 0.5], [0, 0], true);
        this.block_rule.visible = false;
        this.back_rule = UI.node.getChildByName("back_3");
        setWgtLayout(this.back_rule, [1, 1], [0.5, 0.5], [0, 0]);
        this.back_rule.visible = false;
        this.bg_view = this.back_rank.getChildByName("bg_view");
        this.back_1.setTouchEnabled(true);
        this.bg_view.setPosition(cc.p(-500, 360));
        this.back_1.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                this.bg_view.runAction(cc.sequence(cc.callFunc(function(){
                    self.back_rank.visible = true;
                    self.block_rank.visible = true;
                    self.back_rank.setTouchEnabled(false);
                }),cc.moveTo(0.75, cc.p(440, 360)),cc.delayTime(0.2),cc.callFunc(function(){
                    self.back_rank.setTouchEnabled(true);
                })));                
                this.reqRankPlayers();
            }
        }, this);

        this.bg_view.setTouchEnabled(true);
        this.back_rank.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                
                self.back_rank.setTouchEnabled(false);
                self.bg_view.runAction(cc.sequence(cc.moveTo(0.75, cc.p(-500, 360)), cc.callFunc(function() {
                    self.back_rank.visible = false;
                    self.block_rank.visible = false;
                })));
            }
        }, this);

        this.btn_close = this.bg_view.getChildByName("btn_close");
        this.btn_close.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                self.back_rank.setTouchEnabled(false);
                this.bg_view.runAction(cc.sequence(cc.moveTo(0.75, cc.p(-500, 360)), cc.callFunc(function() {
                    self.back_rank.visible = false;
                    self.block_rank.visible = false;
                })));

            }
        }, this);

        

        this.btn_wenhao = this.bg_view.getChildByName("btn_wenhao");
        this.btn_wenhao.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                self.back_rule.visible = true;
                self.block_rule.visible = true;

            }
        }, this);

        var btn_close_2 = this.back_rule.getChildByName("btn_close");
        btn_close_2.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                self.back_rule.visible = false;
                self.block_rule.visible = false;

            }
        }, this);

        var text_rule = this.back_rule.getChildByName("bg_2").getChildByName("listView_text").getChildByName("Text_1");
        var str = "规则：\n" +
            "1、玩家和亲友圈排行榜前10名月底可得到奖励。\n" +
            "2、玩家场次计算的是参与的所有场次，亲友圈场次统计亲友圈有效对局场次\n" +
            "3、奖励将在月底通过邮件发放，请及时领取。\n" +
            "若有疑问，请咨询客服微信号qixing237\n";

        text_rule.setString(str);

        this.node_players = this.bg_view.getChildByName("node_players");
        this.listView_rank = this.node_players.getChildByName("listView_rank");
        this.cell_rank = this.node_players.getChildByName("cell_rank");
        this.cell_rank.visible = false;

        this.node_friends = this.bg_view.getChildByName("node_friends");
        this.listView_rank_2 = this.node_friends.getChildByName("listView_rank_2");
        this.cell_rank_2 = this.node_friends.getChildByName("cell_rank_2");
        this.cell_rank_2.visible = false;

        this.node_mine = this.bg_view.getChildByName("node_mine");

        this.bg_switch = this.bg_view.getChildByName("bg_3");
        this.btn_players = this.bg_switch.getChildByName("btn_players");
        this.btn_friends = this.bg_switch.getChildByName("btn_friends");
        this.icon_friends = this.bg_switch.getChildByName("icon_friends");
        this.icon_players = this.bg_switch.getChildByName("icon_players");



        this.btn_players.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                this.switch_showView(true);
                this.reqRankPlayers();
            }
        }, this);

        this.btn_friends.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                this.switch_showView(false);
                this.reqRankFriends();

            }
        }, this);

        this.cell_head = this.back_1.getChildByName("cell_head");
        this.cell_head.visible = false;
        this.list_head = this.back_1.getChildByName("list_head");

        this.switch_showView(true);
        this.reqRank();

    },

    switch_showView: function(isbool) {
        this.btn_players.setTouchEnabled(!isbool);
        this.btn_friends.setTouchEnabled(isbool);
        this.btn_players.setOpacity(isbool ? 255 : 0);
        this.btn_friends.setOpacity(isbool ? 0 : 255);
        this.icon_players.visible = !isbool;
        this.icon_friends.visible = isbool;
        this.node_players.visible = isbool;
        this.node_friends.visible = !isbool;
    },


    initRankPlayersList: function() {
        if (!cc.sys.isObjectValid(this)) {
            return;
        }

        this.initSelfInfo(this._data.mine);
        var _rankList = this._data.list;
        this.listView_rank.removeAllItems();
        for (var i = 0; i < _rankList.length; i++) {
            var item = this.createCellPlayers(_rankList[i], i);
            this.listView_rank.pushBackCustomItem(item);
        }


    },

    initRankFriendsList: function() {
        
        if (!cc.sys.isObjectValid(this)) {
            return;
        }
        var _rankList = this._data_2.list;
        this.listView_rank_2.removeAllItems();
        for (var i = 0; i < _rankList.length; i++) {
            var item = this.createCellFriends(_rankList[i], i);
            this.listView_rank_2.pushBackCustomItem(item);
        }


    },

    initRank: function() {
        
        if (!cc.sys.isObjectValid(this)) {
            return;
        }
        var _rankList = this._data.list;
        this.list_head.removeAllItems();
        for (var i = 0; i < _rankList.length && i < 4; i++) {
            var item = this.createCellhead(_rankList[i], i);
            this.list_head.pushBackCustomItem(item);
        }


    },
    createCellhead: function(oneData, rankNum) {
        var copyNode = this.cell_head.clone();
        copyNode.visible = true;
        var headicon = copyNode.getChildByName("img_kaung");
        var url = oneData.headimgurl;
        if (!url) url = "png/default_headpic.png";
        cc.loader.loadImg(url, {
            isCrossOrigin: true
        }, function(err, texture) {
            if (!err && texture && cc.sys.isObjectValid(headicon)) {
                var headSprite = new cc.Sprite(texture);
                headSprite.setPosition(headicon.getContentSize().width / 2, headicon.getContentSize().height / 2);
                headSprite.setScale((headicon.getContentSize().width - 4) / headSprite.getContentSize().width);
                headicon.addChild(headSprite, -1);
            }
        });



        var _rankImage = copyNode.getChildByName("img_top");
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
        } 
        return copyNode;
    },

    createCellPlayers: function(oneData, rankNum) {
        var copyNode = this.cell_rank.clone();
        copyNode.visible = true;
        var headicon = copyNode.getChildByName("nobody");
        var url = oneData.headimgurl;
        if (!url) url = "png/default_headpic.png";
        cc.loader.loadImg(url, {
            isCrossOrigin: true
        }, function(err, texture) {
            if (!err && texture && cc.sys.isObjectValid(headicon)) {
                var headSprite = new cc.Sprite(texture);
                headSprite.setPosition(headicon.getContentSize().width / 2, headicon.getContentSize().height / 2);
                headSprite.setScale((headicon.getContentSize().width - 4) / headSprite.getContentSize().width);
                headicon.addChild(headSprite, -1);
            }
        });

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

    createCellFriends: function(oneData, rankNum) {
        var copyNode = this.cell_rank_2.clone();
        copyNode.visible = true;

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
        if (oneData.title) {
            var _nameStr = unescape(oneData.title);
            _Text_name.setString(getNewName(_nameStr, 6));
            _Text_name.ignoreContentAdaptWithSize(true);
        }

        var _Text_id = copyNode.getChildByName("Text_id");
        _Text_id.setString(oneData.clubId);
        _Text_id.ignoreContentAdaptWithSize(true);

        var _Text_jifen = copyNode.getChildByName("Text_jifen");
        _Text_jifen.setString(oneData.value);
        _Text_jifen.ignoreContentAdaptWithSize(true);

        var _Text_lq = copyNode.getChildByName("Text_lq");
        _Text_lq.setString(oneData.creatorAward);
        _Text_lq.ignoreContentAdaptWithSize(true);

        var _Text_lq2 = copyNode.getChildByName("Text_lq_0");
        _Text_lq2.setString(oneData.playerAward);
        _Text_lq2.ignoreContentAdaptWithSize(true);

        return copyNode;
    },

    initSelfInfo: function(oneData) {
        if (!cc.sys.isObjectValid(this.node_mine)) {
            return;
        }
        var copyNode = this.node_mine;
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
    reqRank: function() {
        var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.userRanklist", {
                type: 2
            },
            function(rtn) {
                if (rtn.code == 0) {
                    self._data = rtn.data;
                    self.initRank();
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
    reqRankPlayers: function() {
        var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.userRanklist", {
                type: 2
            },
            function(rtn) {
                if (rtn.code == 0) {
                    self._data = rtn.data;
                    self.initRankPlayersList();
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
    reqRankFriends: function() {
        var self = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.clubRanklist", {
                type: 2
            },
            function(rtn) {
                if (rtn.code == 0) {
                    self._data_2 = rtn.data;
                    self.initRankFriendsList();
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