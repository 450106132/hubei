/***
 * 岳阳App，通用大结算文件   对应 endAll_maJiang.json
 * @type {void | Class | *}
 */
var majiang_gameOver_yueyang = majiang_gameOver.extend({

    jsBind:{

    },

    ctor: function(jsonFile){
        this._super(jsonFile);
    },

    getEndallStatisticsName: function () {
        if(MjClient.playui.getEndallStatisticsName) {
            return MjClient.playui.getEndallStatisticsName();
        }

        return ["zimoTotal", "dianpaoTotal", "jiepaoTotal", "angangTotal", "minggangTotal"];
    },

    getEndallStatisticsKey: function () {
        if(MjClient.playui.getEndallStatisticsKey) {
            return MjClient.playui.getEndallStatisticsKey();
        }
        
        return ["自摸次数", "点炮次数", "接炮次数", "暗杠次数", "明杠次数"];
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
                    if(pl.winall === 0 || pl.winall < maxWinScore){
                        this.loadTexture("gameOver/pjjs_10.png");
                    }else{
                        this.loadTexture("gameOver/pjjs_9.png");
                    }
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
                    var textFileName = pl.winall >= 0 ? "gameOver/pjjs_24.png" : "gameOver/pjjs_29.png";
                    this.setProperty(pl.winall + "", textFileName, 40, 58, "."); 
                },
                // 分数加减
                img_icon: {
                    _run : function(){
                        var fileName = pl.winall >= 0 ? "gameOver/over_add_icon.png" : "gameOver/over_sub_icon.png";
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
            img_fangzhu:{
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