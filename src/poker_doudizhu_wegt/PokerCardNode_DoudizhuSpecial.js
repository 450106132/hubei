var PokerCardNode_DoudizhuSpecial = PokerCardNode_Doudizhu.extend({});

PokerCardNode_DoudizhuSpecial.prototype.setSpriteCard = function (node, cd, type) {
    if (MjClient.majiang && MjClient.majiang.removeLaiziSign)
        cd = MjClient.majiang.removeLaiziSign(cd);

    var cardvalue = node.getChildByName("value");
    var small = node.getChildByName("small");
    var big = node.getChildByName("big");
    var Rsmall = node.getChildByName("Rsmall");
    var Rvalue = node.getChildByName("Rvalue");
    var joker = node.getChildByName("joker");
    var path;
    cardvalue.ignoreContentAdaptWithSize(true);
    Rvalue.ignoreContentAdaptWithSize(true);
    var tmp;
    cardvalue.setScale(tmp = type == 0 ? 1 : 1);
    Rvalue.setScale(tmp = type == 0 ? 1 : 1);
    small.setScale(tmp = type == 0 ? 0.34 : 0.25);
    Rsmall.setScale(tmp = type == 0 ? 0.34 : 0.25);
    Rsmall.visible = (tmp = type == 0 ? false : true);
    Rvalue.visible = (tmp = type == 0 ? false : true);
    big.visible = (tmp = type == 0 ? true : false);
    path = (tmp = type == 0 ? "playing/cardPic2/" : "playing/cardPic6/");
    node.loadTexture(path + "baidi_poke.png");
    var cardType = Math.ceil(cd / 4);// A,2 ,3, 4, 。。。。 j ,Q .k
    var flowerType = cd % 4;// 0 黑桃 ，1 方块 ，2 梅花 ，3 红桃
    var isJoker = false;
    if (cd == 53 || cd == 54)//小王， 大王
    {
        isJoker = true;
    }
    if (!isJoker) {
        //小花
        big.loadTexture(path + "flower_" + flowerType + ".png");
        small.loadTexture(path + "flower_" + flowerType + ".png");
        Rsmall.loadTexture(path + "flower_" + flowerType + ".png");
        if (flowerType == 0 || flowerType == 2) {
            cardvalue.loadTexture(path + "hei_" + cardType + ".png");
            Rvalue.loadTexture(path + "hei_" + cardType + ".png");
        } else {
            cardvalue.loadTexture(path + "hong_" + cardType + ".png");
            Rvalue.loadTexture(path + "hong_" + cardType + ".png");
        }
        joker.visible = false;
        small.visible = true;
    } else {
        joker.loadTexture(tmp = cd == 53 ? (path + "xiaowang_hua.png") : (path + "dawang_hua.png"));
        cardvalue.loadTexture(tmp = cd == 53 ? (path + "joker_xiao.png") : (path + "joker_da.png"));
        Rvalue.loadTexture(tmp = cd == 53 ? (path + "joker_xiao.png") : (path + "joker_da.png"));
        joker.visible = true;
        big.visible = false;
        small.visible = false;
    }
    node.tag = cd;


}