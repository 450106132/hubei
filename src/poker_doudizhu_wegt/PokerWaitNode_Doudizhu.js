/**
 * Created by Administrator on 2018-10-09.
 */
var PokerWaitNode_Doudizhu = cc.Node.extend({
    node: null,
    btnTagList: { btn_wxinvite: 1, btn_clubinvite: 2, btn_cpRoomNum: 3, btn_backHome: 4, btn_delroom: 5, btn_backhall: 6 },
    posYAryy: [0.08, 0.22, 0.36],
    ctor: function () {
        this._super();
        var csbNode = ccs.load(res.Doudizhu_WaitNode_json);
        this.node = csbNode.node;
        this.nodes = [];
        this.loadButton();
        this.initClickEvent();
    },
    loadButton: function () {
        var btn_cpRoomNum = this.node.getChildByName("btn_cpRoomNum");
        btn_cpRoomNum.visible = !MjClient.remoteCfg.guestLogin;
        this.nodes.push(btn_cpRoomNum);

        var btn_clubinvite = this.node.getChildByName("btn_clubinvite");
        btn_clubinvite.visible = (getClubInfoInTable() && !MjClient.remoteCfg.guestLogin);
        this.nodes.push(btn_clubinvite);

        var btn_wxinvite = this.node.getChildByName("btn_wxinvite");
        btn_wxinvite.visible = !MjClient.remoteCfg.guestLogin;
        this.nodes.push(btn_wxinvite);

        var btn_backHome = this.node.getChildByName("btn_backHome");
        btn_backHome.visible = true;

        var btn_delroom = this.node.getChildByName("btn_delroom");
        btn_delroom.visible = IsRoomCreator();

        //俱乐部返回大厅功能
        var btn_backhall = this.node.getChildByName("btn_backhall");
        btn_backhall.visible = (getClubInfoInTable() && !MjClient.remoteCfg.guestLogin);

        var curIndex = 0;
        for (var i = 0; i < this.nodes.length; i++) {
            var node = this.nodes[i];
            if (node.visible) {
                setWgtLayout(node, [0.18, 0.18], [0.81, this.posYAryy[curIndex]], [0, 0]);
                curIndex += 1;
            }
        }
        setWgtLayout(btn_backHome, [0.11, 0.11], [isIPhoneX() ? 0.10 : 0.05, 0.6], [0, 0]);
        setWgtLayout(btn_delroom, [0.11, 0.11], [isIPhoneX() ? 0.10 : 0.05, 0.45], [0, 0]);
        setWgtLayout(btn_backhall, [0.11, 0.11], [isIPhoneX() ? 0.103 : 0.054, 0.76], [0, 0]);
    },
    selfDefineDisplayFriendButtons: function(startPosX, startPosY, GapX, GapY) {
        var curIndex = 0;
        var offset = 0;
        if (!(getClubInfoInTable() && !MjClient.remoteCfg.guestLogin)) {
            offset = (1 - 2 * startPosX - GapX)/2;
        }
        for (var i = this.nodes.length - 1; i >= 0; i--) {
            var node = this.nodes[i];
            if (node.visible) {
                setWgtLayout(node, [0.18, 0.18], [startPosX + (curIndex * GapX) + offset, startPosY + (curIndex * GapY)], [0, 0]);
                curIndex += 1;
                this.addBubbleAndFlashEffect(node);
            }
        }
    },
    addBubbleAndFlashEffect: function (node) {
        if (node.name != "btn_wxinvite") {
            return ;
        }
        if(!node.getChildByName("bubleText")) {
            var _bubbleText = new ccui.ImageView("playing/other/qipao_kaizhuo.png");
            _bubbleText.loadTexture("playing/other/qipao_kaizhuo1.png");
            _bubbleText.setAnchorPoint(0.5, 0);
            _bubbleText.setPosition(cc.p(node.getContentSize().width/2, node.getContentSize().height));
            var text = new ccui.Text();
            text.setFontName("fonts/lanting.TTF");
            text.setString("邀请好友马上开桌");
            text.setColor(cc.color("#343535"));
            text.setFontSize(26);
            text.setAnchorPoint(0.5, 0.5);
            text.setPosition(cc.p(_bubbleText.getContentSize().width/2, _bubbleText.getContentSize().height/2 + 10));
            _bubbleText.addChild(text);
            node.addChild(_bubbleText);
            var _seq = cc.sequence(cc.scaleTo(0.5, 1.2), cc.scaleTo(0.3, 1)).repeatForever();
            _bubbleText.runAction(_seq);
        }

        // 闪光效果
        var clipper = cc.ClippingNode.create();
        var sten = cc.Sprite.create("playing/gameTable/yaoqing_09.png");
        var stenSize = sten.getContentSize();
        clipper.setContentSize(stenSize);
        clipper.setStencil(sten);
        clipper.setAlphaThreshold(0.5);
        sten.setPosition(stenSize.width / 2, stenSize.height / 2);
        node.addChild(clipper);
        var sprite = new cc.Sprite("playing/other/saoguang.png");
        clipper.addChild(sprite, 1);
        var repeatAction = cc.RepeatForever.create(cc.Sequence.create(
            cc.MoveTo.create(0.0, cc.p(-sten.width / 2, sten.height / 2)),
            cc.MoveTo.create(1.3, cc.p(sten.width + sten.width / 2, sten.height / 2)),
            cc.delayTime(0.8)));
        sprite.runAction(repeatAction);//进行向右移动的重复动作
    },
    btnEventListener: function (sender, type) {
        var tag = sender.getTag();
        if (tag == this.btnTagList.btn_clubinvite) {
            var tData = MjClient.data.sData.tData;
            var clubInfoTable = getClubInfoInTable();
            MjClient.Scene.addChild(new FriendCard_yaoqingMember(clubInfoTable.clubId, tData.tableid, unescape(clubInfoTable.clubTitle)));
            MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Yaoqingpaiyou", { uid: SelfUid(), gameType: MjClient.gameType });

        } else if (tag == this.btnTagList.btn_wxinvite || tag == this.btnTagList.btn_cpRoomNum) {
            var num = tag == this.btnTagList.btn_cpRoomNum ? 1 : 2;
            getPlayingRoomInfo(num);
            MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Yaoqingweixinhaoyou", { uid: SelfUid(), gameType: MjClient.gameType });

        } else if (tag == this.btnTagList.btn_backHome) {
            showTipsAndLeaveGame();
        } else if (tag == this.btnTagList.btn_delroom) {
            MjClient.delRoom(true);
        } else if (tag == this.btnTagList.btn_backhall) {
            onClickBackHallBtn();
        }
    },
    btnBindCallBack: function (parent, str, tag, callback) {
        var tmpNode = parent.getChildByName(str);
        tmpNode.tag = tag;
        tmpNode.addTouchEventListener(callback);
    },
    initClickEvent: function () {
        var btnCallback = function (sender, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                this.btnEventListener(sender, type);
            }
        }
        var btnList = ["btn_wxinvite", "btn_clubinvite", "btn_cpRoomNum", "btn_backHome", "btn_delroom", "btn_backhall"];
        for (var i = 0; i < btnList.length; i++) {
            this.btnBindCallBack(this.node, btnList[i], this.btnTagList[btnList[i]], btnCallback.bind(this));
        }
    },
    setVisible: function (bVisible) {
        this.node.visible = bVisible;
    }
});
