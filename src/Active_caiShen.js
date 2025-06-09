var Active_caiShen = cc.Layer.extend({
    ctor: function(data) {
        this._super();
        var UI = ccs.load("Active_caiShen.json");
        this.addChild(UI.node);
        this.data = data;
        var that = this;

        var block = UI.node.getChildByName("block");
        setWgtLayout(block, [1, 1], [0.5, 0.5], [0, 0], true);

        var back = UI.node.getChildByName("back");
        setWgtLayout(back, [0.928, 0.96], [0.49, 0.485], [0, 0]);
        this.back = back;

        var closeBtn = back.getChildByName("close");
        closeBtn.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                that.removeFromParent();
            }
        });

        var ruleBtn = back.getChildByName("btn_rule");
        ruleBtn.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                that.addChild(new CaiShenRule());
            }
        });

        this.prayImage = back.getChildByName("image_pray");
        this.prayBtn = back.getChildByName("btn_pray");
        this.prayBtn.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                that.showPrayList();
            }
        });

        this.rankImage = back.getChildByName("image_rank");
        this.rankBtn = back.getChildByName("btn_rank");
        this.rankBtn.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                that.showRankList();
            }
        });

        var yaoqingBtn = back.getChildByName("btn_yaoqing");
        yaoqingBtn.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                var shareTitle = "快来帮我祈福，助我领888元财神红包";
                if (MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ
                || MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP
                || MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ)
                {
                    shareTitle = "快来帮我祈福，助我领588元财神红包";
                }
                var shareContent = "牌友联盟棋牌，新年送礼，100W个红包人人有份儿~帮好友祈福，您也能领财神红包~";
                var layer = new shareLayer(that.data.helpURL, shareTitle, shareContent);
                MjClient.Scene.addChild(layer);
            }
        });

        var playingBtn = back.getChildByName("btn_playing");
        playingBtn.setEnabled(data.mineInfo.gameCount < 3);
        playingBtn.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                if (!MjClient.data.sData) {
                    postEvent("createRoom", {});
                } else {
                    MjClient.showMsg("房间已经创建,请直接加入房间。");
                }
            }
        });

        var prayCountText = back.getChildByName("text_prayCount");
        prayCountText.ignoreContentAdaptWithSize(true);
        prayCountText.setString(data.mineInfo.prayCount + "");

        var meRankText = back.getChildByName("text_meRank");
        meRankText.ignoreContentAdaptWithSize(true);
        if (!data.mineInfo.mineRank)
            meRankText.setString("没排名");
        else if (data.mineInfo.mineRank == 9999)
            meRankText.setString("58名外");
        else
            meRankText.setString(data.mineInfo.mineRank + "");

        var finishPrayCountText = back.getChildByName("text_finishPrayCount");
        finishPrayCountText.ignoreContentAdaptWithSize(true);
        finishPrayCountText.setString(data.mineInfo.prayCount + "/8");

        var finishPlayCountText = back.getChildByName("text_finishPlayCount");
        finishPlayCountText.ignoreContentAdaptWithSize(true);
        finishPlayCountText.setString(data.mineInfo.gameCount + "/3");

        this.listTitles = [];
        for (var i = 0; i < 3; i++) {
            this.listTitles[i] = this.back.getChildByName("text_title" + (i + 1));
            this.listTitles[i].ignoreContentAdaptWithSize(true);
        }
        this.rankScrollView = this.back.getChildByName("rankScrollView");
        this.prayScrollView = this.back.getChildByName("prayScrollView");

        this.showPrayList();

    },
    refreshHead: function(url, head) {
        cc.loader.loadImg(url ? url : "png/default_headpic.png", {
            isCrossOrigin: true
        }, function(err, texture) {
            if (err || !texture || !sys.isObjectValid(head))
                return;

            var sp = new cc.Sprite(texture);
            if (!sp)
                return;

            sp.setScale((head.width - 8) / sp.width);
            sp.setPosition(cc.p(head.width / 2, head.height / 2));
            head.addChild(sp);
        });
    },
    setPrayRankVisible: function(isShowPray) {
        this.prayBtn.setVisible(!isShowPray);
        this.rankImage.setVisible(!isShowPray);
        this.rankScrollView.setVisible(!isShowPray);

        this.rankBtn.setVisible(isShowPray);
        this.prayImage.setVisible(isShowPray);
        this.prayScrollView.setVisible(isShowPray);
    },
    showPrayList: function() {
        this.listTitles[0].setString("头像");
        this.listTitles[1].setString("昵称");
        this.listTitles[2].setString("祈福时间");

        this.setPrayRankVisible(true);
        if (this.prayScrollView.isInit)
            return;

        var tempItem = this.prayScrollView.getChildByName("prayItem");
        tempItem.setVisible(true);

        var qifuList = this.data.qifuList;
        var innerHeight = qifuList.length * tempItem.height;
        if (innerHeight < this.prayScrollView.height)
            innerHeight = this.prayScrollView.height;

        var y = innerHeight - tempItem.height;
        for (var i = 0; i < qifuList.length; i++) {
            var item = tempItem.clone();
            this.prayScrollView.addChild(item);
            item.y = y;
            y -= item.height;

            var head = item.getChildByName("image_head");
            this.refreshHead(qifuList[i].avatar, head);

            var nameText = item.getChildByName("text_name");
            nameText.ignoreContentAdaptWithSize(true);
            nameText.setString(getNewName(unescape(qifuList[i].nickname)));
            nameText.setFontName("Arial");
            nameText.setFontSize(nameText.getFontSize());

            var idText = item.getChildByName("text_id");
            if (qifuList[i].userId) {
                idText.ignoreContentAdaptWithSize(true);
                idText.setString("ID:" + qifuList[i].userId);
            } else {
                nameText.y = item.height / 2;
                idText.setVisible(false);
            }

            var prayTimeText = item.getChildByName("text_prayTime");
            prayTimeText.ignoreContentAdaptWithSize(true);
            var timeStr = MjClient.dateFormat(new Date(parseInt(qifuList[i].createTime)), 'MM月dd');
            prayTimeText.setString(timeStr);
        }

        this.prayScrollView.setInnerContainerSize(cc.size(this.prayScrollView.getInnerContainerSize().width, innerHeight));
        tempItem.setVisible(false);

        this.prayScrollView.isInit = true;

    },
    showRankList: function() {
        this.listTitles[0].setString("排名");
        this.listTitles[1].setString("昵称");
        this.listTitles[2].setString("祈福数量");

        this.setPrayRankVisible(false);
        if (this.rankScrollView.isInit)
            return;

        var tempItem = this.rankScrollView.getChildByName("rankItem");
        tempItem.setVisible(true);

        var rankList = this.data.rankList;
        var innerHeight = rankList.length * tempItem.height;
        if (innerHeight < this.rankScrollView.height)
            innerHeight = this.rankScrollView.height;

        var y = innerHeight - tempItem.height;
        for (var i = 0; i < rankList.length; i++) {
            var item = tempItem.clone();
            this.rankScrollView.addChild(item);
            item.y = y;
            y -= item.height;

            var rankImage = item.getChildByName("image_rank");
            var rankText = item.getChildByName("text_rank");
            if (i < 3) {
                rankText.setVisible(false);
                rankImage.loadTexture("active_caiShen/rank" + (i + 1) + ".png");
            } else {
                rankImage.setVisible(false);
                rankText.ignoreContentAdaptWithSize(true);
                rankText.setString("" + (i + 1));
            }

            var head = item.getChildByName("image_head");
            this.refreshHead(rankList[i].headimgurl, head);

            var nameText = item.getChildByName("text_name");
            nameText.ignoreContentAdaptWithSize(true);
            nameText.setString(getNewName(unescape(rankList[i].nickname)));
            nameText.setFontName("Arial");
            nameText.setFontSize(nameText.getFontSize());

            var idText = item.getChildByName("text_id");
            idText.ignoreContentAdaptWithSize(true);
            idText.setString("ID:" + rankList[i].userId);

            var prayNumText = item.getChildByName("text_prayNum");
            prayNumText.ignoreContentAdaptWithSize(true);
            prayNumText.setString(rankList[i].prayCount + "");
        }

        this.rankScrollView.setInnerContainerSize(cc.size(this.rankScrollView.getInnerContainerSize().width, innerHeight));
        tempItem.setVisible(false);

        this.rankScrollView.isInit = true;
    }
});

var CaiShenRule = cc.Layer.extend({
    ctor: function() {
        this._super();
        var UI = ccs.load("Active_caiShenRule.json");
        this.addChild(UI.node);
        var that = this;

        var block = UI.node.getChildByName("block");
        setWgtLayout(block, [1, 1], [0.5, 0.5], [0, 0], true);

        var back = UI.node.getChildByName("back");
        setWgtLayout(back, [0.828, 0.98], [0.5, 0.485], [0, 0]);
        this.back = back;

        var closeBtn = back.getChildByName("close");
        closeBtn.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                that.removeFromParent();
            }
        });

        var contentScrollView = back.getChildByName("contentScrollView");
        var contentStrs = this.getContentStrs();
        var content = [];
        for (var i = 0; i < 3; i++) {
            var title = contentScrollView.getChildByName("title" + (i + 1));
            title.ignoreContentAdaptWithSize(true);
            title.setString(contentStrs[i * 2]);
            if (i != 0)
                title.y = content[i - 1].y - content[i - 1].height - 80;

            var line = contentScrollView.getChildByName("line" + (i + 1));
            line.y = title.y - 30;

            content[i] = contentScrollView.getChildByName("content" + (i + 1));
            content[i].ignoreContentAdaptWithSize(false);
            content[i].getVirtualRenderer().setDimensions(750, -1);
            content[i].setString(contentStrs[i * 2 + 1]);
            content[i].height = content[i].getVirtualRenderer().height;
            content[i].y = line.y - 20;
        }

        var height = contentScrollView.height + content[2].height - content[2].y;
        contentScrollView.setInnerContainerSize(cc.size(contentScrollView.getInnerContainerSize().width, height));
        var children = contentScrollView.getChildren();
        for (var i = 0; i < children.length; i++) {
            children[i].y += height - contentScrollView.height;
        }
    },

    getContentStrs: function() {
        var gongzhonghao = "";
        var award = [];
        if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ) {
            gongzhonghao = "qxqipai";
            award = [888, 688, 588, 388, 288, 188, 88, 38];
        } else if (MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ) {
            gongzhonghao = "qxxuzhou";
            award = [588, 388, 288, 188, 88, 68, 38, 28];
        } else if (MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP) {
            gongzhonghao = "qxnantong";
            award = [588, 388, 288, 188, 128, 88, 68, 28];
        } else if (MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ) {
            gongzhonghao = "qxhuaian";
            award = [588, 388, 288, 188, 128, 88, 68, 28];
        } else if (MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP) {
            gongzhonghao = "qxyongzhou";
            award = [888, 688, 588, 388, 288, 188, 88, 38];
        } else if (MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP) {
            gongzhonghao = "qxleiyang";
            award = [888, 688, 588, 388, 288, 188, 88, 38];
        }


        var tipText = this.back.getChildByName("tipText");
        tipText.ignoreContentAdaptWithSize(true);
        tipText.setString("温馨提示：如有疑问，请咨询牌友联盟公众号（" + gongzhonghao + "）");

        return ["奖励说明",
            "奖励一\n\
牌友联盟财神红包，邀请8名亲友祈福并玩牌三局，即可获得\n\
（只有没玩过牌友联盟游戏的亲友才能帮您祈福哦）\n\
奖励二\n\
祈福排行榜奖励\n\
第1名奖励" + award[0] + "元红包\n\
第2名奖励" + award[1] + "元红包\n\
第3名奖励" + award[2] + "元红包\n\
第4名奖励" + award[3] + "元红包\n\
第5名奖励" + award[4] + "元红包\n\
第6名奖励" + award[5] + "元红包\n\
7-30名奖励" + award[6] + "元红包\n\
31-58名奖励" + award[7] + "元红包\n\
祈福次数最少达到30才能领取红包",

            "参与方式",
            "1、邀请8位亲友为自己祈福\n\
2、祈福完成后领取牌友联盟财神红包\n\
3、继续邀请亲友为自己祈福\n\
4、达到祈福排行榜前58名\n\
5、领取最高" + award[0] + "元祈福排行榜奖励",

            "活动规则",
            "1、活动期间每人可领取一个财神\n\
2、邀请8位亲友祈福后可领取财神红包，如果继续邀请好友祈福有机会获得祈福排行榜奖励，祈福次数无上限\n\
3、祈福排行榜前58名还能再获红包，活动结束后自行领取\n\
4、牌友联盟用户无法帮其他玩家祈福，只有非牌友联盟用户才能帮好友祈福\n\
5、帮助您祈福的好友也可获得一个财神红包，完成条件后即可领取财神红包\n\
6、红包奖励需关注微信公众号（" + gongzhonghao + "）领取\n"
        ];
    },
});