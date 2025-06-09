/**
 *  斗地主头像
 */
var PokerHeadNode_Doudizhuhaian = PokerHeadNode_Doudizhu.extend({});



PokerHeadNode_Doudizhuhaian.prototype.initHeadUI = function (off) {
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
    this.emoji = this.node.getChildByName("emoji");
    this.chatbg = this.node.getChildByName("chatbg");
    this.iconDiZhu.setPositionX((off == 1 ? -90.5 : 90.5));
    this.nodeCardCount.setPositionX((off == 1 ? -93 : 88.7));
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
PokerHeadNode_Doudizhuhaian.prototype.showCurrentLeftCardCount = function (pl, bShowHandCount) {
    if (!pl || !pl.handCount || pl.handCount <= 0) {
        this.nodeCardCount.visible = false;
        return;
    }
    var tData = MjClient.data.sData.tData;
    if (tData.zhuang == -1) {
        this.nodeCardCount.visible = false;
        return;
    }
    this.nodeCardCount.visible = true;
    var textCount = this.nodeCardCount.getChildByName("Text_count");
    textCount.setString(pl.handCount);
    if (bShowHandCount) {
        this.nodeCardCount.getChildByName("unKnow").visible = false;
        textCount.visible = true;
    } else {
        this.nodeCardCount.getChildByName("unKnow").visible = true;
        textCount.visible = false;
    }
    var imgSingle = this.nodeCardCount.getChildByName("sprite_single");
    imgSingle.visible = pl.handCount == 1;
    if (pl.handCount == 1) { // 报单
        var func1 = function () {
            imgSingle.setTexture("playing/paodekuaiTable/baodan.png");
        }
        var func2 = function () {
            imgSingle.setTexture("playing/paodekuaiTable/baodan_s.png");
        }
        imgSingle.runAction(cc.repeatForever(
            cc.sequence(cc.callFunc(func1, imgSingle), cc.delayTime(0.5), cc.callFunc(func2, imgSingle), cc.delayTime(0.5))));
    }
}