/***
 * 湖北App，通用小结算文件   对应endOne_maJiang.json
 * @type {void | Class | *}
 */
var majiang_winGamePanel_xiaoGanKaiWuXing = majiang_winGamePanel_hubei.extend({
    ctor: function(){
        this._super("endOne_xiaoGanKaWuXing.json");
        var block = this.endOneJson.node.getChildByName("block");
    },
    setCloneImgTexture: function (infoBg, cloneInfoBg, idx) {
        var pl = MjClient.playui.getPlayerWithIndex(idx);
        //if(pl && pl.endOneData.huScore > 0) cloneInfoBg.loadTexture("common/bg_gameover_win.png");
    },
});
// 显示抓鸟内容
majiang_winGamePanel_xiaoGanKaiWuXing.prototype.showAddBird = function(back, tData){
    //显示抓鸟的牌
    var img_bridTips = back.getChildByName("img_bridTips");
    var cards = tData.maPai || [];
    var cardNode = img_bridTips.getChildByName(MjClient.playui.CsdDefaultCardType["EatCardFront"]);
    var countNode = img_bridTips.getChildByName("text_count");
    cardNode.visible = false;
    var slotwith = cardNode.width * cardNode.scale * 0.9;//0.05;

    var zhongCount = 0;
    for(var i = 0;i < cards.length;i++){
        var cloneNode = util.clone(cardNode);
        cloneNode.setName(MjClient.playui.HandleCardType["Chi"]);
        cloneNode.setTag(cards[i]);
        cloneNode.visible = true;
        cloneNode.setPosition(cc.p(cardNode.x + slotwith*i,cardNode.y));
        img_bridTips.addChild(cloneNode);
        MjClient.playui.setCardSprite(cloneNode, cards[i], true);
    }

    if(zhongCount == 0){
        countNode.setVisible(false);
    }else{
        var pos = cc.p(cardNode.x + slotwith * cards.length  - slotwith/2, cardNode.y);
        countNode.setPosition(pos);
        countNode.setString("+" + zhongCount);
    }
};
//获取小结算中单个玩家的牌型描述
majiang_winGamePanel_xiaoGanKaiWuXing.prototype.getCardTypeDesc = function(pl,sData){
    for (var i = 0; i < pl.mjdesc.length; i++) {
        var map = {1:"一",2:"二",3:"三",4:"四",5:"五",6:"六",7:"七",8:"八",
                    9:"九",71:"中",81:"发",91:"白"};
        var newStr = pl.mjdesc[i];
        var addStr = "";
        var index = -1;
        if (newStr.indexOf("出字") >= 0) {
            index = newStr.indexOf(":");
            if (pl.chuZi && pl.chuZi.length > 0) {
                for (var j = 0; j < pl.chuZi.length; j++) {
                    addStr += map[pl.chuZi[j]];
                }
            }
        }
        if (index != -1) {
            newStr = newStr.slice(0,index) + addStr + ":" + revise(Number(newStr.slice(index + 1)));
        }
        pl.mjdesc[i] = newStr;
    }
    var finalStr = "";
    for (var i = 0; i < pl.mjdesc.length; i++) {
        finalStr += pl.mjdesc[i];
        if (i != pl.mjdesc.length - 1 && pl.mjdesc[i] != "") {
            finalStr += ","
        }
    }
    return finalStr; 
};
// 设置单个玩家面板数据
majiang_winGamePanel_xiaoGanKaiWuXing.prototype.setEndOneUserUI = function (infoImg, off) {
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var pl = MjClient.playui.getPlayerWithIndex(off);
    if(!pl)return;

    infoImg.setVisible(true);
    infoImg = infoImg.getChildByName("layout_infoData");
     
    var img_zhuang = infoImg.getChildByName("img_zhuang");
    var zhuangIndex = (typeof MjClient.preZhuang != 'undefined') ? MjClient.preZhuang : tData.zhuang;
    img_zhuang.setVisible(tData.uids[zhuangIndex] == pl.info.uid);
    img_zhuang.zIndex=10;

    var uibind= {
        layout_infoData: {
            text_name: {
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                    this.setFontName("Arial");
                    this.setFontSize(this.getFontSize());
                    MjClient.endoneui.setUserNameAndIdColor(this, pl);
                },
                _text: function () {
                    var nameStr = unescape(pl.info.nickname ) + "";
                    return MjClient.playui.formatUserName(nameStr, 7, true);
                }
            },
            text_id: {
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                    MjClient.endoneui.setUserNameAndIdColor(this, pl);
                },
                _text: function () {
                    return "ID:" + pl.info.uid.toString();
                }
            },
            img_eatFrontCard: {_visible: false},
            img_eatBackCard: {_visible: false},
            img_handCard: {_visible: false},
            text_cardType: {
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                    MjClient.endoneui.setUserCardTypeDescColor(this, pl);
                },
                _text: function () {
                    return MjClient.endoneui.getCardTypeDesc(pl,sData);
                },
            },
            img_tingIcon:{
                _run: function(){
                    this.visible = false;
                    MjClient.endoneui.showTingIcon(pl,this);
                }
            },
            text_winNum: {
                _run:function(){
                    var countCopy = Number(pl.winone + pl.gangScore);
                    // 精度修正
                    countCopy = revise(countCopy);
                    var str = countCopy > 0 ? ("+" + countCopy) : ("" + countCopy);
                    var textUrl = pl.winone > 0 ? "common/zi_ying.png" : "common/zi_shu.png";
                    this.ignoreContentAdaptWithSize(true);
                    this.setString(str);
                    // 根据胜负分更换小结算得分切图
                    this.getVirtualRenderer().setCharMap(textUrl, 32, 43, "+".charCodeAt(0));
                }
            },
            img_huType: {
                _run: function () {
                    MjClient.endoneui.setGameOverPanelPlayerState(this, pl, true);
                }
            },
            img_piao: {
                _visible: false,
                _run: function () {
                    MjClient.endoneui.setPiaoFenIcon(this, pl);
                }
            },
            text_fan: {
                _visible: false,
                _run: function () {
                    this.ignoreContentAdaptWithSize(true);
                    if (pl.rate > 0) {
                        this.visible = true;
                    }
                },
                Text:{
                    _run:function(){
                        this.ignoreContentAdaptWithSize(true);
                        this.setString(pl.rate);
                    }
                }
            }
        }
    };

    BindUiAndLogic(infoImg.parent, uibind);
    this.addWxHeadToEndUI(infoImg.getChildByName("img_head"), off);
    this.showHandCard(pl, infoImg);
    MjClient.playui.setUserOfflineInWinGame(infoImg.getChildByName("img_head"), pl);
};