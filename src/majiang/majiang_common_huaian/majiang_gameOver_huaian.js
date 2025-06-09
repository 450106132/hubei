/***
 * 淮安App，通用大结算文件   对应 endAll_maJiang.json
 * @type {void | Class | *}
 */
var majiang_gameOver_huaian = majiang_gameOver.extend({

    jsBind:{
        back:{
            btn_continue:{
                _click:function(btn,eT){ 
                    MjClient.endallui.closeOverView();
                },
            }
        }
    },

    ctor: function(jsonFile){
        this._super(jsonFile);
    },

    getEndallStatisticsName: function () {
        if(MjClient.playui.getEndallStatisticsName) {
            return MjClient.playui.getEndallStatisticsName();
        }

        return ["zimoTotal", "dianpaoTotal", "angangTotal", "minggangTotal"];
    },

    getEndallStatisticsKey: function () {
        if(MjClient.playui.getEndallStatisticsKey) {
            return MjClient.playui.getEndallStatisticsKey();
        }
        
        return ["自摸次数", "点炮次数", "暗杠次数", "明杠次数"];
    },

    //@override 增加最佳炮手显示
    setGameOverLayer:function(node, off){
        var sData = MjClient.data.sData;
        var tData = sData.tData;
        var pl = MjClient.playui.getPlayerWithIndex(off);
        if(!pl) return node.setVisible(false);

        var maxWinScore = 0, maxDianPaoCount = 0, maxWinPlayer, maxLoseScore = 999999999, maxLosePlayer;  
        var uid, pi;   
        //计算所有人数据
        for (uid in sData.players) {
            pi = sData.players[uid];
            if(!pi){
                continue;
            }
            maxDianPaoCount = Math.max(maxDianPaoCount,pi.dianpaoTotal);
            if (maxWinScore < pi.winall) {
                maxWinScore = pi.winall;
                maxWinPlayer = uid;

            } else if (maxWinScore === pi.winall) {
                if (parseInt(uid) < parseInt(maxWinPlayer)) {
                    maxWinScore = pi.winall;
                    maxWinPlayer = uid;
                }
            }
            if (pi.winall < maxLoseScore) {
                maxLoseScore = pi.winall;
                maxLosePlayer = uid;
            } else if (pi.winall === maxLoseScore) {
                if (parseInt(uid) < parseInt(maxLosePlayer)) {
                    maxLoseScore = pi.winall;
                    maxLosePlayer = uid;
                }
            }
        }

        var paoScore = 9999, paoWang = null;
        for (uid in sData.players) {
            pi = sData.players[uid];
            if(!pi){
                continue;
            }
            if(maxDianPaoCount === pi.dianpaoTotal) {
                if(pi.winall <= paoScore) {
                    paoScore = pi.winall;
                    paoWang = pi;
                }
            }
        }

        var uibind={
            img_bg: {
                _run: function () {
                    this.visible = false;
                }
            },
            text_name:{
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                    this.setFontName("Arial");
                    this.setFontSize(this.getFontSize());
                },
                _text:function(){
                    return MjClient.playui.formatUserName(unescape(pl.info.nickname)+"", 7, true);
                }
            },
            text_id: {
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                },
                _text: function () {
                    return  "ID: " + pl.info.uid.toString();
                }
            },
            // 头像
            img_head: {
                _run:function(){
                    MjClient.endallui.addWxHeadToEndUI(this,off);   
                }
            },
            img_jieSanIcon: {
                _visible:function(){
                    return off === 0 && MjClient.isDismiss;
                }
            },
            text_score: {
                _run:function(){ 
                    this.ignoreContentAdaptWithSize(true);
                    var textFileName = pl.winall >= 0 ? "gameOver/pjjs_24_2.png" : "gameOver/pjjs_29_2.png";
                    this.setProperty(pl.winall + "", textFileName, 40, 51, "."); 
                },
                // 分数加减
                img_icon: {
                    _run : function(){
                        var fileName = pl.winall >= 0 ? "gameOver/pjjs_22.png" : "gameOver/pjjs_27.png";
                        this.loadTexture(fileName);
                    }
                }
            },
            // 大赢家
            img_bigWinner: {
                //最高得分  
                _run:function(){
                    if(pl.winall == 0 || pl.winall < maxWinScore){
                        this.setVisible(false);
                    }
                }
            },
            //房主
            img_fangZhu:{
                _run:function(){
                    this.visible = tData.owner === pl.info.uid;
                }
            },

            //最佳炮手
            img_paoShowIcon:{
                _visible:function(){
                    if(maxDianPaoCount == 0 || !paoWang)
                        return false;
                    return paoWang === pl; 
                }
            },

            text_scoreTips: {
                _visible: false,
                _run : function(){
                    if(!pl.isNeedFanBei) return;
                    node.getChildByName("text_score").y += 20;
                    this.visible = true;
                    this.setString("( " + pl.winall * 0.5 + " x2 )");
                    this.ignoreContentAdaptWithSize(true);
                    this.setTextColor(pl.winall < 0 ? cc.color(0x78,0xf7,0xff) : cc.color(0xf0,0xff,0x76));
                }
            }
        }; 
        BindUiAndLogic(node,uibind); 

        var sData = MjClient.data.sData;
        var playerNum = Object.keys(sData.players).length;
        if(pl.winall === 0 || pl.winall < maxWinScore){
            node.setBackGroundImage(playerNum == 2 ? "gameOver/gerenxinxi2_1.png" : "gerenxinxi_1.png");
        }else{
            node.setBackGroundImage(playerNum == 2 ? "gameOver/gerenxinxi2_3.png" : "gerenxinxi2_1.png");
        }

        var para = {};
        para.scale = 0.7;

        AddFangKaIcon(sData, node, tData, pl, maxWinScore, maxWinPlayer, maxLoseScore, maxLosePlayer, cc.p(15, 445), para);
        
        this.setRoomStatistics(node.getChildByName("layout_typeText"), pl);
        this.setUserOfflineWinGamePanel(node, pl);
    },

    //设置离线状态
    setUserOfflineWinGamePanel: function(node, pl){
        if(!pl || pl.onLine || MjClient.rePlayVideo !== -1) return;
        if(!cc.sys.isObjectValid(ccui.helper.seekWidgetByName(node, "img_head"))) return;
        var path = "gameOver/Z_offline.png";
        var posY = 0.6;
        var offLineNode = ccui.helper.seekWidgetByName(node, "offline");
        if(!offLineNode){
            offLineNode = new ccui.ImageView(path);
            offLineNode.setName("offline");
            var size = node.getChildByName("img_head").getContentSize();
            offLineNode.setPosition(cc.p(size.width/2, size.height/2));
            node.getChildByName("img_head").addChild(offLineNode);
        }
        offLineNode.zIndex = 99;

        var timeNode = ccui.helper.seekWidgetByName(offLineNode, "offLineTime");
        if(!cc.sys.isObjectValid(timeNode)){
            timeNode = new ccui.Text();
            timeNode.setFontName("fonts/lanting.TTF");
            timeNode.setName("offLineTime");
            timeNode.setFontSize(26);
            offLineNode.addChild(timeNode);
        }
        timeNode.setPosition(cc.p(offLineNode.getContentSize().width/2,offLineNode.getContentSize().height*posY));

        if (pl.lastOffLineTime){
            var showTime = (MjClient.data.sData.serverTime - pl.lastOffLineTime);
            if(showTime < 0){
                offLineNode.visible = false;
                showTime = 0;
            }
            timeNode.setString(MjClient.dateFormat(new Date(showTime),"mm:ss"));
        }else{
            timeNode.setString("");
        }
    }
});

// 设置玩家信息
majiang_gameOver_huaian.prototype.setEndUserInfo = function() {
    var backNode = MjClient.endallui.getChildByName("endAllUI").getChildByName("back");
    var playerInfo4View = backNode.getChildByName("info_4");
    var playerInfo3View = backNode.getChildByName("info_3");
    var playerInfo2View = backNode.getChildByName("info_2");
    playerInfo4View.visible = false;
    playerInfo3View.visible = false;
    playerInfo2View.visible = false;

    var sData = MjClient.data.sData;
    var playerNum = Object.keys(sData.players).length;
    var usedViewModel;
    if(playerNum == 2){
        usedViewModel = playerInfo2View;
    }else if(playerNum == 3){
        usedViewModel = playerInfo3View;
    }else if(playerNum == 4){
        usedViewModel = playerInfo4View;
    }

    var startPos = usedViewModel.getPosition();
    var itemWidth = usedViewModel.getContentSize().width;
    var itemMargin = [12, 16, 25][([4,3,2].indexOf(playerNum))];

    for(var i = 0; i < playerNum; i++){
        var item = usedViewModel.clone();
        item.visible = true;
        MjClient.endallui.setGameOverLayer(item, i);
        item.setPosition(cc.pAdd(startPos, cc.p(i * (itemWidth + itemMargin) , 0)));
        COMMON_UI.addGameOverNotSameClubUI(item, MjClient.playui.getPlayerWithIndex(i));
        backNode.addChild(item);
    }
};

// 设置房间统计内容
majiang_gameOver_huaian.prototype.setRoomStatistics = function(layout_typeText,pl) {
    var sData = MjClient.data.sData;
    var playerNum = Object.keys(sData.players).length;

    if(playerNum == 2){//二人的布局
        this.setRoomStatistics2Ren(layout_typeText, pl)
        return;
    }
    var infoType = this.getEndallStatisticsName();
    var infoName = this.getEndallStatisticsKey();

    var text_score = layout_typeText.getChildByName("text_score");
    var text_type = layout_typeText.getChildByName("text_type");
    var scoreSize = 28 * 1.2; // CSD中的高度 * 额外增加一点间距 
    for (var i = 0; i < infoType.length; i++) {
        var cloneName = text_type;
        var cloneScore = text_score;
        if(i != 0){
            cloneName = text_type.clone();
            cloneScore = text_score.clone();
            layout_typeText.addChild(cloneName);
            layout_typeText.addChild(cloneScore);
        } 
        cloneName.y -= scoreSize*i;
        cloneScore.y -= scoreSize*i;
        cloneName.ignoreContentAdaptWithSize(true);
        cloneScore.ignoreContentAdaptWithSize(true);
        var statistics = pl[ infoType[i] ];
        cloneScore.setTextColor(pl.winall < 0 ? cc.color("#00824C") : cc.color("#D3260E"));
        cloneScore.setString(statistics > 0 ? statistics : "0");
        cloneName.setString(infoName[i]);
    }
};

majiang_gameOver_huaian.prototype.setRoomStatistics2Ren = function(layout_typeText, pl){
    var infoType = this.getEndallStatisticsName();
    var infoName = this.getEndallStatisticsKey();
    
    var item = layout_typeText.getChildByName("item");
    var parentSize = layout_typeText.getContentSize();
    var posXPercent = [0.32, 0.80];
    for (var i = 0; i < infoType.length; i++) {
        var cloneitem = item;
        if(i != 0){
            cloneitem = item.clone();
            layout_typeText.addChild(cloneitem);
        }
        var itemPosX =  parentSize.width * posXPercent[i % 2];
        var itmePosY =  (0 - Math.floor(i / 2)) * (parentSize.height /2); 
        cloneitem.setPosition(cc.p(itemPosX, itmePosY));
        var text_score = cloneitem.getChildByName("text_score");
        var text_name = cloneitem.getChildByName("text_type");
        var statistics = pl[ infoType[i] ];
        text_score.setTextColor(pl.winall < 0 ? cc.color("#00824C") : cc.color("#D3260E"));
        text_score.setString(statistics > 0 ? statistics : "0");
        text_name.setString(infoName[i]);
    }
};

// 微信头像
majiang_gameOver_huaian.prototype.addWxHeadToEndUI = function(node, off) {
    var pl = MjClient.playui.getPlayerWithIndex(off);
    var img = "png/default_headpic.png";
    if (pl && pl.wxHeadImg) {
        img = pl.wxHeadImg;
        loadWxHead();
    } else { // 回放直接弹总结算 没有缓存头像
        cc.loader.loadImg(pl.info.headimgurl, {isCrossOrigin: true}, function(err, texture) {
            if (!err && texture) {
                img = texture;
                loadWxHead();
            }
        });
    }

    function loadWxHead() {
        var sp = new cc.Sprite(img);
        var frame = node;
        sp.setContentSize(frame.getContentSize());
        sp.setPosition(cc.p(frame.width * 0.5, frame.height * 0.5));
        frame.addChild(sp);
    }
};