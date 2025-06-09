/**
 *  斗地主头像
 */
var PokerHeadNode_DoudizhuXuZhou = PokerHeadNode_Doudizhu.extend({});

// 房主icon
PokerHeadNode_DoudizhuXuZhou.prototype.createFangIcon = function () {
    this.fangTag = this.node.getChildByName("fangTag");
    var headFrame = this.node.getChildByName("headFrame");
    if (this.fangTag == null) {
        var sp = new cc.Sprite("playing/gameTable/fangzhu.png");
        sp.setScale(0.8);
        sp.setPosition(-5, 30);
        sp.setAnchorPoint(0, 0);
        sp.zIndex = 102;
        sp.setName("fangTag");
        this.fangTag = sp;
        this.node.addChild(sp, 110);
    }
    this.fangTag.visible = false;
};

PokerHeadNode_DoudizhuXuZhou.prototype.initHeadUI = function (off) {
    this.node.getChildByName("zhuang").visible = false;
    this.bgScore = this.node.getChildByName("score_bg");
    if (MjClient.data.sData.tData.fieldId) {
        if(MjClient.getGoldFiledType() == 1){
            this.bgScore.loadTexture("play/douzizhu_play_fen.png");

        }else{
            this.bgScore.loadTexture("game_picture/dating-1_75.png");
        }
    }
    this.textCoin = this.node.getChildByName("coin");
    this.textCoin.ignoreContentAdaptWithSize(true);
    this.textCoin.setScale(1.2);
    this.bgName = this.node.getChildByName("name_bg")
    this.bgName.zIndex = 101;
    this.textName = this.node.getChildByName("name");
    this.textName.zIndex = 103;
    this.textName.setScale(1.5);
    this.textName.ignoreContentAdaptWithSize(true);
    this.offLine = this.node.getChildByName("offline");
    this.offLine.zIndex = 99;
    this.imgTrust = this.node.getChildByName("imgTrust");
    this.imgTrust.zIndex = 100;
    this.iconDiZhu = this.node.getChildByName("icon_dizhu");
    this.nodeCardCount = this.node.getChildByName("tingCard");
    this._sprite_single = this.node.getChildByName("sprite_single");
    this.emoji = this.node.getChildByName("emoji");
    this.chatbg = this.node.getChildByName("chatbg");
    this.iconDiZhu.setPositionX((off == 1 ? -90.5 : 90.5));
    this.nodeCardCount.setPositionX((off == 1 ? -93 : 88.7));
    this._sprite_single.setPositionX((off==1 ?-93 : 88.7));
    this.chatbg.setPositionX((off == 1 ? -90 : 89));
    this.tiIcon = this.node.getChildByName("tiTagicon");
    if (this.tiIcon) {
        this.tiIcon.setPositionX(off == 3 ? 49 : -42.81);
        this.tiIcon.setPositionY(off == 3 ? 141.46 : 121.98);
    }
    if ((MjClient.MaxPlayerNum == 4 || MjClient.MaxPlayerNum == 2) && off == 2) {
        this.chatbg.setPositionY(100);
    }
    this.chatbg.setAnchorPoint((off == 1 ? 1 : 0), 0.5);
    var tmp = "playing/other/";
    this.chatbg.loadTexture((off == 1 ? (tmp + "chatbg_rd.png") : (tmp + "chatbg_ld.png")));
    if (off == 0) {
        this.emoji.setPosition(108, 142);
    } else if (off == 1) {
        this.emoji.setPosition(-111, 5);
    } else if (off == 2) {
        this.emoji.setPosition(114, -10);
    }
}
// 剩余牌数
PokerHeadNode_DoudizhuXuZhou.prototype.showCurrentLeftCardCount = function (pl, bShowHandCount) {
    if (!pl || !pl.handCount || pl.handCount <= 0) {
        this.nodeCardCount.visible = false;
        this._sprite_single.visible =false;
        return;
    }
    var tData = MjClient.data.sData.tData;
    if (tData.zhuang == -1) {
        this.nodeCardCount.visible = false;
        this._sprite_single.visible =false;
        return;
    }
    //this.nodeCardCount.visible = true;
    var textCount = this.nodeCardCount.getChildByName("Text_count");
    textCount.setString(pl.handCount);
    if (bShowHandCount) {
        this.nodeCardCount.getChildByName("unKnow").visible = false;
        textCount.visible = true;
    } else {
        this.nodeCardCount.getChildByName("unKnow").visible = true;
        textCount.visible = false;
    }
    var _sprite_single = this.node.getChildByName("sprite_single");
    _sprite_single.visible =pl.handCount == 1;
    this.nodeCardCount.visible=pl.handCount != 1;
    var shining = _sprite_single.getChildByName("shining");
    var alarm = _sprite_single.getChildByName("alarm");
    if (!shining.getActionByTag(51839)) {
        var fadeAction = cc.sequence(cc.FadeIn(0.6), cc.FadeOut(0.6)).repeatForever();
        fadeAction.setTag(51839);
        shining.runAction(fadeAction);

        var rotateAction = cc.sequence(cc.RotateTo(0.4,-15), cc.RotateTo(0.4,0)).repeatForever();
        alarm.runAction(rotateAction);
    }
}