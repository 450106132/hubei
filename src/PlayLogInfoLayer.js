/**
 * Created by Administrator on 2017/5/18/018.
 */
var tempPlayerValue = 6;
var updatelayer_itme_node;
var playLogInfoView;
var doBefore = {
    mjhand: function(msg) {
        var mjhandDatas = msg.extra.mjhandDatas;
        var mjhandData = mjhandDatas[SelfUid()];

         //postEvent("QueueNetMsg", ["initAllHandcards", mjhandDatas]); //直初始化手牌，不用事件，by sking
        if(mjhandDatas && MjClient.data.sData){
            for(var uid in mjhandDatas) {
                var pl = MjClient.data.sData.players[uid];
                pl.mjhand = mjhandDatas[uid].mjhand;
                pl.dirNumber = mjhandDatas[uid].dirNumber;
            }
        }
        MjClient.Scene.pushQueueNetMsg(["initAllHandcards", mjhandDatas]);

        var data = msg.data;
        if( mjhandData ){
            data.mjhand = mjhandData.mjhand;
            data.linkzuang = mjhandData.linkzuang;
            data.mjflower = mjhandData.mjflower;
        }
        return data;
    },
    logNewCard: function(msg) {
        var uid = msg.extra.uid;

        if (typeof(msg.data) == "number") {
            msg.data = {newCard: msg.data};
        }
        if (uid == SelfUid()) {
            //if (MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ
            //    || MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP
            //)
            {
                //使用新的事件循环机制
                MjClient.Scene.pushQueueNetMsg(["newCard", msg.data]);
            }
            //else
            //{
            //    postEvent("QueueNetMsg", ["newCard", msg.data]);
            //}
        }
        else {

            if(MjClient.data.sData.players[uid].mjhand)
            {
                // cc.log("logNewCard+++++++++++++++++++++++++++++++++++++回放摸新牌 = " + msg.data.newCard);
                // cc.log("logNewCard+++++++++++++++++++++++++++++++++++++pl.mjhand = " + JSON.stringify(MjClient.data.sData.players[uid].mjhand));
                // cc.log("logNewCard+++++++++++++++++++++++++++++++++++++pl.mjhand.length = " + MjClient.data.sData.players[uid].mjhand.length)

                //if (MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ
                //    || MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP
                //)
                {
                    //使用新的事件循环机制
                    MjClient.Scene.pushQueueNetMsg(["otherNewCard", {uid:uid, newCard:msg.data.newCard}]);
                }
                //else
                //{
                //    postEvent("QueueNetMsg", ["otherNewCard", {uid:uid, newCard:msg.data.newCard}]);
                //}
            }
            else
            {
                MjClient.showToast("回放发牌错误,error!");
            }
        }
        //cc.log("----------------------------------------other mjhand =  " + MjClient.data.sData.players[uid].mjhand);
        return null;//代表无后续分发事件
    },
    roundEnd: function(msg) {
        if (MjClient.rePlayVideo != MjClient.GAME_TYPE.NIU_NIU) {
            MjClient.replayui.visible = false;
        }
        return msg.data;
    },
    MJPass: function(msg) {
        var uid = msg.extra.uid;
        if (uid == SelfUid()) {
            var sData = MjClient.data.sData;
            var tData = sData.tData;
            var pl = sData.players[uid];
            // console.log("确定过胡吗？", pl.eatFlag, tData.tState, TableState.waitPut, TableState.waitEat);
            if (pl.eatFlag & 8 && (GameClass[MjClient.gameType] != MjClient.GAME_CLASS.PAO_HU_ZI)) {
                if (tData.tState == TableState.waitPut || tData.tState == TableState.waitEat) {
                    MjClient.showMsg("确定过胡吗？", function(){}, function(){}, "1");
                }
            }
            return msg.data;
        }
    }
};

/**************************/
(function(){
    var uiItem,uiList,msgCount,delay,update_tData,players;
    var playersArry=[];

    function sortLog(log)
    {
        var players = log.players;
        players.sort(function(p1, p2){
            return p2.winone - p1.winone;
        })
    }

    function BindLogItem(ui,item,num)
    {
        var _endTime = 0;
        if(playLogIfoArry[num-1]) {
            //cc.log("--------item---------- log = " + JSON.stringify(item));
            for (var i = 0; i < playLogIfoArry[num-1].length; i++) {
                // console.log("=====doomsky say:JSON.stringify(playLogIfoArry[num-1][i])======", JSON.stringify(playLogIfoArry[num-1][i]));
                if(playLogIfoArry[num-1][i].cmd == "roundEnd")
                {
                    for (var j = 0; j < tempPlayerValue; j++) {
                        if(item.players[j])
                        {
                            var _uid = item.players[j].uid;
                            if(!_endTime) _endTime = playLogIfoArry[num-1][i].data.roundEndTime;
                            // cc.log(_uid+"=====doomsky say:playLogIfoArry roundEndTime======", playLogIfoArry[num-1][i].data.roundEndTime);
                            // cc.log(" ========= playLogIfoArry[num-1][i].data.players[_uid].winone ",playLogIfoArry[num-1][i].data.players[_uid].winone);
                            // cc.log(_uid+"=====doomsky say:playLogIfoArry[num-1][i+1][][_uid].winone======", playLogIfoArry[num-1][i].data.players[_uid].winone);
                            var _playerUid = playLogIfoArry[num-1][i].data.players[_uid]
                            item.players[j].winone =_playerUid.winone;
                            if(_playerUid.qiShouHuScore)
                                item.players[j].winone += _playerUid.qiShouHuScore;
                            item.teams = playLogIfoArry[num-1][i].data.teams;
                        }
                    }
                }
            }
        }

        sortLog(item);

        var bind={
            time:{
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                },
                _text:function(){
                    // cc.log("======================playLogIfoArry - " + JSON.stringify(item));
                    // cc.log("======================playLogIfoArry[num-1][0].data.roundEndTime - " + playLogIfoArry[num-1][0].data.roundEndTime);
                    return _endTime
                }
            },
            tableid:{
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                },
                _text:function(){  return "房间ID:"+item.tableid }
            },
            player0:{
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                    if(item.players.length > 0){
                        if ((item.gametype == MjClient.GAME_TYPE.DA_TONG_ZI_SHAO_YANG || 
                            item.gametype == MjClient.GAME_TYPE.LONG_HUI_BA_ZHA_DAN) && 
                            item.players.length == 4 && item.players[0].teamid)
                        {
                            item.players[0].winone = item.teams[item.players[0].teamid].winone;
                        }
                        addPlayersInfo(this, item.players[0], "winone");
                    }
                    else
                        this.visible = false;
                },
            },
            player1:{
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                    if(item.players.length > 1){
                        if ((item.gametype == MjClient.GAME_TYPE.DA_TONG_ZI_SHAO_YANG || 
                            item.gametype == MjClient.GAME_TYPE.LONG_HUI_BA_ZHA_DAN) && 
                            item.players.length == 4 && item.players[1].teamid){
                            item.players[1].winone = item.teams[item.players[1].teamid].winone;
                        }
                        addPlayersInfo(this, item.players[1], "winone");
                    }
                    else
                        this.visible = false;
                },
            },
            player2:{
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                    if(item.players.length > 2){
                        if ((item.gametype == MjClient.GAME_TYPE.DA_TONG_ZI_SHAO_YANG || 
                            item.gametype == MjClient.GAME_TYPE.LONG_HUI_BA_ZHA_DAN) && 
                            item.players.length == 4 && item.players[2].teamid){
                            item.players[2].winone = item.teams[item.players[2].teamid].winone;
                        }
                        addPlayersInfo(this, item.players[2], "winone");
                    }
                    else
                        this.visible = false;
                },
            },
            player3:{
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                    if(item.players.length > 3){
                        if ((item.gametype == MjClient.GAME_TYPE.DA_TONG_ZI_SHAO_YANG || 
                            item.gametype == MjClient.GAME_TYPE.LONG_HUI_BA_ZHA_DAN) && 
                            item.players.length == 4 && item.players[3].teamid){
                            item.players[3].winone = item.teams[item.players[3].teamid].winone;
                        }
                        addPlayersInfo(this, item.players[3], "winone");
                    }
                    else
                        this.visible = false;
                },
            },
            line2:{
                _run:function(){
                    if(item.players.length <= 2) this.visible = false;
                },
            },
            player4:{
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                    if(item.players.length > 4)
                        addPlayersInfo(this, item.players[4], "winone");
                    else
                        this.visible = false;
                },
            },
            player5:{
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                    if(item.players.length > 5)
                        addPlayersInfo(this, item.players[5], "winone");
                    else
                        this.visible = false;
                },
            },
            line_shu3:{
                _run:function(){
                    if(item.players.length <= 2) this.visible = false;
                },
            },
            num:{
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                },
                _text:function(){return num+"";}
            },
            btnShare:{
                _run:function(){
                    // if (item.isClub) { // 亲友圈 屏蔽 分享
                    //     this.visible = false;
                    // }
                },
                _click:function () {
                    cc.log("wxd,,,,,,,,,,item,,,,,,,,,,"+JSON.stringify(item));
                    if (item.isClub) {
                        replayShare_friendCard(item.recordId, num, item.tableid,item.gametype);
                        MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Zhanji_Chakanzhanji_Fenxiang", {uid:SelfUid()});
                    }else{
                        MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Zhanji_Chakanzhanji_Share", {uid:SelfUid()});
                       replayShare(item.recordId, num, item.tableid,item.gametype); 
                    }
                    
                }
            },
            replay:{
                _click:function()
                {  
                    if (item.isClub) {
                        MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Zhanji_Chakanzhanji_Huikan", {uid:SelfUid()});
                    }
                    else{
                        MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Zhanji_Chakanzhanji_Huikan", {uid:SelfUid()});
                    }

                    var log_init = playLogIfoArry[num - 1][0];
                    var log_end = playLogIfoArry[num - 1][playLogIfoArry[num - 1].length - 1];

                    if (log_init.cmd != "initSceneData") {
                        for (var i = 1; i < playLogIfoArry[num - 1].length; i++) {
                            if (playLogIfoArry[num - 1][i].cmd == "initSceneData") {
                                log_init = playLogIfoArry[num - 1][i];
                                break;
                            }
                        }
                    }

                    var gameType = log_init.data.tData.gameType;
                    var isShowGameOver = false; // 是否先显示大结算
                    // console.log("MjClient.getAppType()@ ", MjClient.getAppType(), " ")
                    if ((MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ) && log_end.data.tData.roundNum <= 0) {
                        switch (gameType) {
                            //字牌
                            case MjClient.GAME_TYPE.SHAO_YANG_ZI_PAI:
                            case MjClient.GAME_TYPE.SHAO_YANG_BO_PI:
                            case MjClient.GAME_TYPE.HY_SHI_HU_KA:
                            case MjClient.GAME_TYPE.HY_LIU_HU_QIANG:
                            case MjClient.GAME_TYPE.AN_HUA_PAO_HU_ZI:
                            case MjClient.GAME_TYPE.LENG_SHUI_JIANG_SHI_HU_DAO:
                            case MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA:
                            case  MjClient.GAME_TYPE.HUAI_HUA_HONG_GUAI_WAN:
                            //打筒子
                            case  MjClient.GAME_TYPE.DA_TONG_ZI_SHAO_YANG:
                            case  MjClient.GAME_TYPE.LONG_HUI_BA_ZHA_DAN:
                            case  MjClient.GAME_TYPE.BAN_BIAN_TIAN_ZHA:
                            //麻将类
                            case  MjClient.GAME_TYPE.SHAO_YANG_MA_JIANG:
                            case  MjClient.GAME_TYPE.XIN_NING_MA_JIANG:
                            case  MjClient.GAME_TYPE.TY_ZHUANZHUAN:
                            case  MjClient.GAME_TYPE.TY_HONGZHONG:
                            case  MjClient.GAME_TYPE.CHANG_SHA:
                            case  MjClient.GAME_TYPE.HUAI_HUA_MA_JIANG:
                            case  MjClient.GAME_TYPE.AN_HUA_MA_JIANG:
                            //扑克类
                            case  MjClient.GAME_TYPE.YZ_PAO_DE_KUAI_TY:
                            case  MjClient.GAME_TYPE.DOU_DI_ZHU_TY: //add by Cena
                            case  MjClient.GAME_TYPE.DOU_DI_ZHU_HBTY:
                            case  MjClient.GAME_TYPE.DOU_DI_ZHU_QC: 
                                isShowGameOver = true;
                                break;
                            // case 
                        }
                    }

                    if (isShowGameOver) {
                        delete MjClient.data.sData;
                        MjClient.data.sData = log_init.data;
                        MjClient.MaxPlayerNum = MjClient.data.sData.tData.maxPlayer;
                        if (playLogIfoArry[num - 1][1] == "TZTeam") {
                            MjClient.netCallBack["TZTeam"][1](playLogIfoArry[num - 1][1].data);
                        }

                        //postEvent("QueueNetMsg", [log_end.cmd, log_end.data]);
                        // 使用新的事件循环机制
                        // MjClient.Scene.pushQueueNetMsg([log_end.cmd, log_end.data]);

                        MjClient.netCallBack["roundEnd"][1](log_end.data);

                        var gameOverLayer; // 对应APP 玩法的总结算界面
                        MjClient.gameType = gameType;
                        switch (gameType) { 
                            case MjClient.GAME_TYPE.HY_SHI_HU_KA:
                            case MjClient.GAME_TYPE.HY_LIU_HU_QIANG:
                            case MjClient.GAME_TYPE.SHAO_YANG_BO_PI:
                            case MjClient.GAME_TYPE.SHAO_YANG_ZI_PAI:
                            case MjClient.GAME_TYPE.AN_HUA_PAO_HU_ZI:
                            case MjClient.GAME_TYPE.LENG_SHUI_JIANG_SHI_HU_DAO:
                                gameOverLayer = new GameOverLayer_syZiPai();
                                gameOverLayer.replaySet();
                                break;
                            case MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA:
                                gameOverLayer = new GameOverLayer_syLoudi();
                                gameOverLayer.replaySet();
                                break;
                            case MjClient.GAME_TYPE.HUAI_HUA_HONG_GUAI_WAN:
                                gameOverLayer = new GameOverLayer_hhHongGuaiWan();
                                gameOverLayer.replaySet();
                                break;
                            case MjClient.GAME_TYPE.DA_TONG_ZI_SHAO_YANG:
                                MjClient.majiang = MjClient.majiang_DaTongZi;
                                gameOverLayer = new GameOverLayer_daTongZi();
                                MjClient.majiang = null;
                                gameOverLayer.replaySet();
                                break;
                            case MjClient.GAME_TYPE.LONG_HUI_BA_ZHA_DAN:
                                gameOverLayer = new GameOverLayer_BaZhaDan();
                                gameOverLayer.replaySet();
                                break;
                            case MjClient.GAME_TYPE.BAN_BIAN_TIAN_ZHA:
                                gameOverLayer = new GameOverLayer_BanBianTianZha();
                                gameOverLayer.replaySet();
                                break;
                            case  MjClient.GAME_TYPE.SHAO_YANG_MA_JIANG:
                            case  MjClient.GAME_TYPE.XIN_NING_MA_JIANG:
                            case  MjClient.GAME_TYPE.TY_ZHUANZHUAN:
                            case  MjClient.GAME_TYPE.TY_HONGZHONG:
                            case  MjClient.GAME_TYPE.CHANG_SHA:
                            case  MjClient.GAME_TYPE.HUAI_HUA_MA_JIANG:
                            case  MjClient.GAME_TYPE.AN_HUA_MA_JIANG:
                            case  MjClient.GAME_TYPE.YZ_PAO_DE_KUAI_TY:
                                gameOverLayer = new GameOverLayer();
                                gameOverLayer.replaySet();
                                break;
                            case  MjClient.GAME_TYPE.DOU_DI_ZHU_TY: //add by Cena
                            case  MjClient.GAME_TYPE.DOU_DI_ZHU_HBTY:
                            case  MjClient.GAME_TYPE.DOU_DI_ZHU_QC: 
                                gameOverLayer = new  GameOverLayer_doudizhu();
                                gameOverLayer.replaySet();
                                break;
                        }
                        MjClient.Scene.addChild(gameOverLayer);
                        MjClient.gameType = null;

                        MjClient.goOnReplay = function() { // 大结算继续回放回调
                            RePlaySelectRole(updatelayer_itme_node, num, playLogIfoArry);
                        };
                    } else {
                        RePlaySelectRole(updatelayer_itme_node, num, playLogIfoArry);
                    }
                }
            }
        };

        BindUiAndLogic(ui,bind);
    }

    function BindLogItem_anXiangWeiMaQue(ui,item,num)
    {
        var _endTime = 0;
        if(playLogIfoArry[num-1]) {
            for (var i = 0; i < playLogIfoArry[num-1].length; i++) {
                if(playLogIfoArry[num-1][i].cmd == "roundEnd")
                {
                    for (var j = 0; j < tempPlayerValue; j++) {
                        if(item.players[j])
                        {
                            var d = playLogIfoArry[num-1][i].data;
                            var _uid = item.players[j].uid;
                            if(!_endTime) _endTime = d.roundEndTime;
                            item.players[j].winone = d.players[_uid].winone;
                            item.players[j].winLiuZiScore = d.players[_uid].winLiuZiScore;
                            item.players[j].betLiuZiScore = d.players[_uid].betLiuZiScore;
                            item.players[j].isDouLiuZi = d.tData.areaSelectMode.isDouLiuZi;
                        }
                    }
                }
            }
        }

        sortLog(item);

        var bind={
            time:{
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                },
                _text:function(){
                    return _endTime
                }
            },
            tableid:{
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                },
                _text:function(){  return "房间ID:"+item.tableid }
            },
            player0:{
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                    if(item.players.length > 0){
                        addPlayersInfo(this, item.players[0], "winone", item.gametype);
                    }
                    else
                        this.visible = false;
                },
            },
            player1:{
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                    if(item.players.length > 1){
                        addPlayersInfo(this, item.players[1], "winone", item.gametype);
                    }
                    else
                        this.visible = false;
                },
            },
            player2:{
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                    if(item.players.length > 2){
                        addPlayersInfo(this, item.players[2], "winone", item.gametype);
                    }
                    else
                        this.visible = false;
                },
            },
            player3:{
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                    if(item.players.length > 3){
                        addPlayersInfo(this, item.players[3], "winone", item.gametype);
                    }
                    else
                        this.visible = false;
                },
            },
            line2:{
                _run:function(){
                    if(item.players.length <= 2) this.visible = false;
                },
            },
            player4:{
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                    if(item.players.length > 4)
                        addPlayersInfo(this, item.players[4], "winone");
                    else
                        this.visible = false;
                },
            },
            player5:{
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                    if(item.players.length > 5)
                        addPlayersInfo(this, item.players[5], "winone");
                    else
                        this.visible = false;
                },
            },
            line_shu3:{
                _run:function(){
                    if(item.players.length <= 2) this.visible = false;
                },
            },
            num:{
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                },
                _text:function(){return num+"";}
            },
            btnShare:{
                _run:function(){
                    // if (item.isClub) { // 亲友圈 屏蔽 分享
                    //     this.visible = false;
                    // }
                },
                _click:function () {
                    cc.log("wxd,,,,,,,,,,item,,,,,,,,,,"+JSON.stringify(item));
                    if (item.isClub) {
                        replayShare_friendCard(item.recordId, num, item.tableid,item.gametype);
                        MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Zhanji_Chakanzhanji_Fenxiang", {uid:SelfUid()});
                    }else{
                        MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Zhanji_Chakanzhanji_Share", {uid:SelfUid()});
                       replayShare(item.recordId, num, item.tableid,item.gametype); 
                    }
                    
                }
            },
            replay:{
                _click:function()
                {  
                    if (item.isClub) {
                        MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Zhanji_Chakanzhanji_Huikan", {uid:SelfUid()});
                    }
                    else{
                        MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Zhanji_Chakanzhanji_Huikan", {uid:SelfUid()});
                    }
                    RePlaySelectRole(updatelayer_itme_node, num, playLogIfoArry);
                }
            }
        };

        BindUiAndLogic(ui,bind);
    }

    function BindLogItem_nanjing(ui,item,num)
    {
        cc.log("--------item---------- log = " + JSON.stringify(item));
        for (var i = 0; i < playLogIfoArry[num-1].length; i++) {
            console.log("=====doomsky say:JSON.stringify(playLogIfoArry[num-1][i])======", JSON.stringify(playLogIfoArry[num-1][i]));
            if(playLogIfoArry[num-1][i].cmd == "roundEnd")
            {
                for (var j = 0; j < tempPlayerValue; j++) {
                    if(!item.players[j]) continue;
                    var _uid = item.players[j].uid;
                    cc.log(_uid+"=====doomsky say:playLogIfoArry[num-1][i+1][][_uid].winone======", playLogIfoArry[num-1][i].data.players[_uid].winone);
                    cc.log(_uid+"=====doomsky say:playLogIfoArry[num-1][i+1][][_uid].cashTotal======", playLogIfoArry[num-1][i].data.players[_uid].cashTotal);
                    item.players[j].winone =playLogIfoArry[num-1][i].data.players[_uid].winone;
                    item.players[j].cashTotal =playLogIfoArry[num-1][i].data.players[_uid].cashTotal;
                }
            }
        }

        sortLog(item);
        
        var bind={
            time:{
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                },
                _text:function(){  return item.now }
            },
            tableid:{
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                },
                _text:function(){  return "房间ID:"+item.tableid }
            },
            player0:{
                _run:function(){
                    this.setFontName("Arial");
                    this.setFontSize(this.getFontSize());
                    this.ignoreContentAdaptWithSize(true);
                },
                _text:function(){
                    return getNewName(unescape(item.players[0].nickname),8)+":"+ ((item.players[0].winone + item.players[0].cashTotal) || 0);
                }
            },
            player1:{
                _run:function(){
                    this.setFontName("Arial");
                    this.setFontSize(this.getFontSize());
                    this.ignoreContentAdaptWithSize(true);
                },
                _text:function(){  return getNewName(unescape(item.players[1].nickname),8)+":"+ ((item.players[1].winone + item.players[1].cashTotal) || 0); }
            },
            player2:{
                _run:function(){
                    this.setFontName("Arial");
                    this.setFontSize(this.getFontSize());
                    this.ignoreContentAdaptWithSize(true);
                },
                _text:function(){
                    if(!item.players[2]) return "";

                    return getNewName(unescape(item.players[2].nickname),8)+":"+ ((item.players[2].winone + item.players[2].cashTotal) || 0);
                }
            },
            player3:{
                _run:function(){
                    this.setFontName("Arial");
                    this.setFontSize(this.getFontSize());
                    this.ignoreContentAdaptWithSize(true);
                },
                _text:function(){
                    if(!item.players[3]) return "";

                    if(item.players.length > 3)
                        return getNewName(unescape(item.players[3].nickname),8)+":"+ ((item.players[3].winone + item.players[3].cashTotal) || 0);
                    else
                        return unescape("");
                }
            }
            ,num:{
                _run:function(){
                    this.setFontName("Arial");
                    this.setFontSize(this.getFontSize());
                    this.ignoreContentAdaptWithSize(true);
                },
                _text:function(){return num+"";}
            }
            ,btnShare:{
                _click:function () {
                    cc.log("wxd,,,,,,,,,,item,,,,,,,,,,"+JSON.stringify(item));
                    replayShare(item.recordId, num, item.tableid,item.gametype);
                }
            }
            , replay:{
                _click:function()
                {
                    // initReplayLayer();
                    // console.log("NUM = " + (num -1));
                    // createReplayLayer(playLogIfoArry[num-1]);
                    MjClient.block();
                    MjClient.rePlayVideo = item.gametype;
                    // if(MjClient.rePlayVideo == MjClient.GAME_TYPE.LIAN_YUN_GANG)
                    {
                        //this.setTouchEnabled(false);
                        initReplayLayer();
                        createReplayLayer(playLogIfoArry[num-1]);
                    }
                }
            }
        }


        BindUiAndLogic(ui,bind);
    }

    function BindLogItem_daTongZi(ui, item, num){
        for (var i = 0; i < playLogIfoArry[num-1].length; i++) {
            if(playLogIfoArry[num-1][i].cmd == "roundEnd")
            {
                for (var j = 0; j < tempPlayerValue; j++) {
                    if(item.players[j])
                    {
                        var _uid = item.players[j].uid;
                        item.players[j].winone =playLogIfoArry[num-1][i].data.players[_uid].winone;
                        item.teams = playLogIfoArry[num-1][i].data.teams;
                    }
                }
            }
        }

        function  findPlayerByUid(uid){
            for(var i = 0; i < item.players.length; i++){
                var pl = item.players[i];
                if(pl.uid == uid){
                    return pl;
                }
            }
        };



        var bind={
            time:{
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                },
                _text:function(){  return item.now }
            },
            tableid:{
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                },
                _text:function(){  return "房间ID:"+item.tableid }
            },
            player0:{
                _run:function(){
                    this.setFontName("Arial");
                    this.setFontSize(this.getFontSize());
                    this.ignoreContentAdaptWithSize(true);
                },
                _text:function(){
                    if(item.players.length == 4 && item.players[0].teamid){
                        return getNewName(unescape(item.players[0].nickname),5);
                    }else{
                        return getNewName(unescape(item.players[0].nickname),5)+":"+ (item.players[0].winone || 0);
                    }
                }
            },
            player1:{
                _run:function(){
                    this.setFontName("Arial");
                    this.setFontSize(this.getFontSize());
                    this.ignoreContentAdaptWithSize(true);
                    if(item.players.length == 4 && item.players[0].teamid){
                        this.x = 487.24;
                    }else{
                        this.x = 440.85;
                    }
                },
                _text:function(){  
                    if(item.players.length == 4 && item.players[0].teamid){
                        return getNewName(unescape(item.players[1].nickname),5);
                    }else{
                        return getNewName(unescape(item.players[1].nickname),5)+":"+ (item.players[1].winone || 0); 
                    }
                }
            },
            player2:{
                _run:function(){
                    this.setFontName("Arial");
                    this.setFontSize(this.getFontSize());
                    this.ignoreContentAdaptWithSize(true);
                },
                _text:function(){
                    if(item.players.length > 2)
                        if(item.players.length == 4 && item.players[0].teamid){
                            return getNewName(unescape(item.players[2].nickname),5);
                        }else{
                            return getNewName(unescape(item.players[2].nickname),5)+":"+ (item.players[2].winone || 0);
                        }
                    else
                        return unescape("");
                }
            },
            player3:{
                _run:function(){
                    this.setFontName("Arial");
                    this.setFontSize(this.getFontSize());
                    this.ignoreContentAdaptWithSize(true);
                    if(item.players.length == 4 && item.players[0].teamid){
                        this.x = 487.24;
                    }else{
                        this.x = 440.85;
                    }
                },
                _text:function(){
                    if(item.players.length > 3)
                        if(item.players.length == 4 && item.players[0].teamid){
                            return getNewName(unescape(item.players[3].nickname),5);
                        }else{
                            return getNewName(unescape(item.players[3].nickname),5)+":"+ (item.players[3].winone || 0);
                        }
                    else
                        return unescape("");
                }
            }
            ,num:{
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                },
                _text:function(){return num+"";}
            }
            ,btnShare:{
                _run:function(){
                    // if (item.isClub) { // 亲友圈 屏蔽 分享
                    //     this.visible = false;
                    // }
                },
                _click:function () {
                    cc.log("wxd,,,,,,,,,,item,,,,,,,,,,"+JSON.stringify(item));
                    if (item.isClub) {
                        replayShare_friendCard(item.recordId, num, item.tableid,item.gametype); 
                    }else{
                       replayShare(item.recordId, num, item.tableid,item.gametype); 
                    }
                }
            }
            ,replay:{
                _click:function()
                {
                    // initReplayLayer();
                    // console.log("NUM = " + (num -1));
                    // createReplayLayer(playLogIfoArry[num-1]);
                    MjClient.block();
                    MjClient.rePlayVideo = item.gametype;
                    // if(MjClient.rePlayVideo == MjClient.GAME_TYPE.LIAN_YUN_GANG)
                    {
                        //this.setTouchEnabled(false);
                        if (!MjClient.otherReplayUid && FriendCard_Common.club_roleId) {
                            MjClient.otherReplayUid = FriendCard_Common.club_roleId;
                        }
                        
                        initReplayLayer();
                        createReplayLayer(playLogIfoArry[num-1]);
                    }
                }
            }
            ,teamA:{
                _run : function(){

                    if(item.players.length == 4 && item.players[0].teamid){
                        this.visible = true;

                        var p0 = ui.getChildByName("player0");
                        var p2 = ui.getChildByName("player2");
                        var team = item.teams["A"];
                        var pArr = [p0, p2];
                        for(var i = 0; i < team.uids.length; i++){
                            var pl = findPlayerByUid([team.uids[i]]);
                            pArr[i].setString(getNewName(unescape(pl.nickname),5));
                            pArr[i].setFontName("Arial");
                            pArr[i].setFontSize(25);
                        }

                        var winAll = this.getChildByName("winAll");
                        winAll.setString(team.winone);


                    }else{
                        this.visible = false;
                    }
                }
            },
            teamB:{
                _run : function(){
                    if(item.players.length == 4 && item.players[0].teamid){
                        this.visible = true;
                        var p0 = ui.getChildByName("player1");
                        var p2 = ui.getChildByName("player3");
                        var team = item.teams["B"];
                        var pArr = [p0, p2];
                        for(var i = 0; i < team.uids.length; i++){
                            var pl = findPlayerByUid([team.uids[i]]);
                            pArr[i].setString(getNewName(unescape(pl.nickname),5));
                            pArr[i].setFontName("Arial");
                            pArr[i].setFontSize(25);
                        }

                        var winAll = this.getChildByName("winAll");
                        winAll.setString(team.winone);
                    }else{
                        this.visible = false;
                    }
                }
            }
        }

        BindUiAndLogic(ui,bind);
    }

    function initReplayLayer() {
        if(MjClient.data.sData){
            delete MjClient.data.sData;
        }
    }

    function createReplayLayer(msg)
    {
        var logMsg = JSON.parse(JSON.stringify(msg));

        cc.log("================createReplayLayer================= logMsg = " + JSON.stringify(logMsg));
        console.log("===================createReplayLayer=================");
		var msgStr = JSON.stringify(logMsg);
        for (var i = 0; i < msgStr.length;) // by cyc 改成for循环，log输出太长，在win32上会报错
        {
            if (i + 1024 < msgStr.length)
            {
                console.log(msgStr.substr(i, 1024));
                i += 1024;
            }
            else
            {
                console.log(msgStr.substr(i));
                break;
            }
        }
        
        replayController(updatelayer_itme_node, logMsg);
    }

    function replayController(node, logMsg)
    {
        updatelayer_itme_node = node;
        var runIndex = 0;
        var delay = 0.6;
        var callback = function (dt) {
            var msg = logMsg[runIndex];
            cc.log("-----------------replayController------------------" + JSON.stringify(msg));
            var data = msg.data;
            
            //岳阳碰胡子连庄数据
            if(msg.extra && msg.extra.mjhandDatas){
                data.mjhandDatas = msg.extra.mjhandDatas;
            }

            if (doBefore[msg.cmd]) { // 处理消息前的预操作
                data = doBefore[msg.cmd](msg);
            }
            if (data) {
                cc.log("步骤"+msg.cmd);
                if(logMsg[runIndex]&&playLogInfoItem.gametype ==MjClient.GAME_TYPE.LV_LIANG_DA_QI)
                {
                    node.unscheduleAllCallbacks();
                    if( logMsg[runIndex].cmd =='s2c_dqJiaoZhu')
                    {
                        delay=3;
                        node.schedule(callback, delay);
                    }
                    else {
                        delay=0.6;
                        node.schedule(callback, delay);
                    }
                }

                //if (MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ
                //    || MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP
                //)
                {
                    //使用新的事件循环机制
                    MjClient.Scene.pushQueueNetMsg([msg.cmd, data]);
                }
                //else
                //{
                //    postEvent("QueueNetMsg", [msg.cmd, data]);
                //}
            }
            runIndex++;
            if(runIndex >= logMsg.length){
                node.unscheduleAllCallbacks();
            }
            cc.log("replay controller : " + runIndex);
        }.bind(node);
        node.schedule(callback, delay);
    }

    function replayShare(recordId, round, tableid,name) {
        cc.log("wxd..........playbackShare..........11111");
        MjClient.block();
        MjClient.gamenet.request("pkcon.handler.playbackShare",{recordId: recordId, round: round},function(rtn){
            MjClient.unblock();
            cc.log("wxd..........playbackShare.........."+JSON.stringify(rtn));
            if(!rtn.code) {
                MjClient.myReplayCode = rtn.data;
                MjClient.native.doCopyToPasteBoard(GameCnName[name] + "\n回放码:[" + rtn.data + "]\n" + "房间号:" + tableid + "局数：" + round + "\n（复制此消息打开"+ AppCnName[MjClient.getAppType()] +"可直接查看该局回放）");
                MjClient.showMsg(rtn.data + "回放码复制成功，立即前往微信分享。打开微信后粘贴房间信息。", function(){
                    MjClient.native.openWeixin();
                });
            }else {
                MjClient.showToast(rtn.message);
            }
        });
    }
    function replayShare_friendCard(recordId, round, tableid,name) {
        cc.log("wxd..........playbackShare friendCard..........11111");
        MjClient.block();
        MjClient.gamenet.request("pkcon.handler.playbackShare",{recordId: recordId, round: round, source:1},function(rtn){
            MjClient.unblock();
            cc.log("wxd..........playbackShare friendCard .........."+JSON.stringify(rtn));
            if(!rtn.code) {
                MjClient.myReplayCode = rtn.data;
                MjClient.native.doCopyToPasteBoard(GameCnName[name] + "\n回放码:[" + rtn.data + "]\n" + "房间号:" + tableid + "局数：" + round + "\n（复制此消息打开"+ AppCnName[MjClient.getAppType()] +"可直接查看该局回放）");
                MjClient.showMsg(rtn.data + "回放码复制成功，立即前往微信分享。打开微信后粘贴房间信息。", function(){
                    MjClient.native.openWeixin();
                    if(MjClient.FriendCard_main_ui && cc.sys.isObjectValid(MjClient.FriendCard_main_ui)){
                        MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Zhanji_Chakanzhanji_Fenxiang_Sure", {uid:SelfUid()});
                    }
                });
            }else {
                MjClient.showToast(rtn.message);
            }
        });
    }

    playLogInfoLayer=cc.Layer.extend({
        jsBind:{
            block:
            {
                _layout:[[1,1],[0.5,0.5],[0,0],true],
            },
            item:{
                _visible:false
                ,_run:function()
                {
                    uiItem=this;
                    uiItem.visible=false;
                    updatelayer_itme_node = this;
                }
            },
            back:{
                _layout:[[0.95,0.95],[0.5,0.5],[0,-0.02],false],
                list:{
                    _run:function(){
                        uiList=this;
                    }
                },
                yes: {
                    // _layout:[[0,0.1],[0,1],[1,-0.6]]
                    _click:function()
                    {
                        if(MjClient.FriendCard_main_ui && cc.sys.isObjectValid(MjClient.FriendCard_main_ui)){
                            MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Zhanji_Guanbi", {uid:SelfUid()});
                        }else{
                            MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Zhanji_Chakanzhanji_Close", {uid:SelfUid()});
                        }
                        if (playLogInfoView) {
                            playLogInfoView.removeFromParent(true);
                            playLogInfoView = null;
                        }
                        
                        playLogIfoArry = [];
                        MjClient.otherReplayUid = null;
                    }
                },
                play:{
                    // _layout:[[0,0.06],[0.5,1],[0,-0.8]]
                },
                _event:
                {
                    playLog:function()
                    {
                        uiList.removeAllItems();
                        // cc.log("++++++ playLogInfoItem ：", JSON.stringify(playLogInfoItem));
                        // cc.log("++++++ playLogIfoArry ：", JSON.stringify(playLogIfoArry))
                        for(var i=0;i<playLogIfoArry.length;i++)
                        {
                            var item=uiItem.clone();
                            item.visible=true;
                            //item.scale=uiList.width/item.width*0.9;
                            uiList.insertCustomItem(item,0);

                            if (playLogInfoItem.gametype == MjClient.GAME_TYPE.NAN_JING)
                            {
                                BindLogItem_nanjing(item,playLogInfoItem,i+1);
                            }else if (playLogInfoItem.gametype == MjClient.GAME_TYPE.DA_TONG_ZI_SHAO_YANG || 
                                playLogInfoItem.gametype == MjClient.GAME_TYPE.LONG_HUI_BA_ZHA_DAN)
                            {
                                // BindLogItem_daTongZi(item,playLogInfoItem,i+1);
                                BindLogItem(item,playLogInfoItem,i+1);
                            }else if (playLogInfoItem.gametype == MjClient.GAME_TYPE.AN_XIANG_WEI_MA_QUE) {
                                BindLogItem_anXiangWeiMaQue(item, playLogInfoItem, i+1);
                            }
                            else
                            {
                                
                                BindLogItem(item,playLogInfoItem,i+1);
                            }
                            if((i + 1) == playLogIfoArry.length){
                                //最后一局处要显示出【玩家昵称+积分不足】的提示
                                if(playLogInfoItem.scoreNeedEnough && playLogInfoItem.matchScoreLimitUser){
                                    var scoreNotEnoughNames = "";
                                    for(var key in playLogInfoItem.matchScoreLimitUser){
                                        if(playLogInfoItem.matchScoreLimitUser[key].score <= 0){
                                            scoreNotEnoughNames += (getPlayerName(unescape(playLogInfoItem.matchScoreLimitUser[key].nickname), 5) +"、");
                                        }
                                    }
                                    if(scoreNotEnoughNames.length > 0){
                                        scoreNotEnoughNames = scoreNotEnoughNames.substring(0,scoreNotEnoughNames.length-1);
                                        scoreNotEnoughNames += "\n积分不足";
                                    }

                                    var textTableId = item.getChildByName("tableid");
                                    if(scoreNotEnoughNames && scoreNotEnoughNames.length >0 && textTableId){
                                        var textScoreNotEnough = textTableId.clone();
                                        textScoreNotEnough.setFontSize(textScoreNotEnough.getFontSize() -8);
                                        textScoreNotEnough.setAnchorPoint(cc.p(0,textTableId.getAnchorPoint().y));
                                        textScoreNotEnough.y = textTableId.y;
                                        textScoreNotEnough.x = textTableId.x + textTableId.width * (1 - textTableId.getAnchorPoint().x);
                                        textScoreNotEnough.x += 20;
                                        textScoreNotEnough.setString(scoreNotEnoughNames);
                                        textTableId.getParent().addChild(textScoreNotEnough);
                                    }
                                }
                            }

                        }
                    }
                }
            }
        },
        replayController: replayController,
        ctor:function () {
            this._super();
            if (MjClient.isUseUIv3 && MjClient.isUseUIv3() && MjClient.isFriendCardUseUIv3())
                var web = ccs.load("PlayLogInfo_3.0.json");
            else
                var web = ccs.load("PlayLogInfo.json");
            BindUiAndLogic(web.node,this.jsBind);
            var playLog=MjClient.data.playLog;
            if(!playLog) 
                MjClient.getPlayLog();
            else {
                this.jsBind.back._event.playLog();
            }
            var _back = web.node.getChildByName("back");
            if (MjClient.getAppType() == MjClient.APP_TYPE.DQSHANXIMJ) {
                setWgtLayout(_back, [0.95, 0.95], [0.5, 0.5], [0, 0]);
            }
            else if(isJinZhongAPPType() || MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP) {
                setWgtLayout(_back, [1, 1], [0.5, 0.5], [0, 0]);
            }
            else if (MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ) {
                if (MjClient.isUseUIv3 && MjClient.isUseUIv3())
                    setWgtLayout(_back, [_back.width/1280, _back.height/720], [0.5, 0.5], [0, 0]);
                else
                    setWgtLayout(_back, [0.9, 0.9], [0.5, 0.45], [0, 0]);
            }
            else if (MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) {
                setWgtLayout(_back, [0.9, 0.9], [0.5, 0.4836], [0, 0]);
            }
            var _suizi = _back.getChildByName("suizi");
            //穗子动画
            if(_suizi) 
                COMMON_UI.suiziAni(_suizi,8);
            else
                COMMON_UI.popDialogAni(_back);

            this.addChild(web.node);
            playLogInfoView=this;
        },
        onExit:function()
        {
            this._super();
            MjClient.otherReplayUid = null;
        }
    });
})();



/****
 *游戏内重播，选择角色重播
 */

//记录重播，需要保留的数据
var replayData = replayData || {};

var RePlaySelectRole = function(node, num, playLogIfoArry) {

    var selectUI = null;
    if(FriendCard_Common.getSkinType() == 2 && MjClient.FriendCard_main_ui) {
        selectUI = ccs.load("friendcard_PlayLogInfo.json").node;
    } else {
        if (MjClient.isUseUIv3 && MjClient.isUseUIv3() && MjClient.isFriendCardUseUIv3())
            selectUI = ccs.load("PlayLogRole_3.0.json").node;
        else
            selectUI = ccs.load("PlayLogRole.json").node;
    }

    var _back = selectUI.getChildByName("back");
    var _block = selectUI.getChildByName("block");
    setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);
    setWgtLayout(_back, [_back.width/1280, _back.height/720], [0.5, 0.5], [0, 0]);

    MjClient.Scene.addChild(selectUI);
    var logMsg = playLogIfoArry[num - 1];
    var players;
    var tData;
    for (var i = 0; i < logMsg.length; i++) {
        if (logMsg[i].cmd == "initSceneData") {
            players = logMsg[i].data.players;
            tData = logMsg[i].data.tData;
            replayData.players =  players;
            replayData.currentRound = (num - 1) < 0 ? 0 : (num - 1);
            break;
        }
    }

    var _scrollView_select = _back.getChildByName("scrollView_select");
    var _cell_select = _back.getChildByName("cell_select");
    _cell_select.visible = false;
    _scrollView_select.setScrollBarAutoHideTime(0);
    _scrollView_select.setScrollBarEnabled(false);


    var close = _back.getChildByName("close");
    close.addTouchEventListener(function(sender, type) {
        if (type == 2) {
            selectUI.removeFromParent();
            if(MjClient.FriendCard_main_ui && cc.sys.isObjectValid(MjClient.FriendCard_main_ui)){
                MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Zhanji_Chakanzhanji_Huikan_Close", {uid:SelfUid()});
            }
            // if(isYongZhouProject()){
                MjClient.rePlayVideo = -1;
                MjClient.otherReplayUid = null;
                replayData = {};
            // }
        }
    });


    if((MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP|| MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) && MjClient.FriendCard_main_ui)
    {
        closeBtnAddLight(close);
    }
    else
    {
        var Text_2 = _back.getChildByName("Text_2");
        if(Text_2){
            Text_2.ignoreContentAdaptWithSize(true);
            Text_2.setString("选择回放视角");
        }
    }
   
    var createSelectItem = function(oneData) {
        var copyNode = _cell_select.clone();
        copyNode.visible = true;
        var Text_name = copyNode.getChildByName("Text_name");
        Text_name.ignoreContentAdaptWithSize(true);
        var userId = oneData.info.uid; 
        var _name = getNewName_new(unescape(players[userId].info.nickname), 6);
        Text_name.setString(_name);
        Text_name.setFontName("Arial");
        Text_name.setFontSize(Text_name.getFontSize());

        
        var Text_id = copyNode.getChildByName("Text_id");
        Text_id.ignoreContentAdaptWithSize(true);
        Text_id.setString("ID:" + userId);

        var sp_bg = copyNode.getChildByName("img_head");
        
        var imageUrl = players[userId].info.headimgurl;
         if((MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ) && MjClient.FriendCard_main_ui)
        {
            sp_bg.isMask = true;
            COMMON_UI.refreshHead(this,imageUrl,sp_bg)
        }
        else
        {
            var sprite_bg = new cc.Sprite("png/default_headpic.png");
            sprite_bg.setPosition(sp_bg.getPosition());
            copyNode.addChild(sprite_bg);
            sprite_bg.setScale(sp_bg.width * sp_bg.scaleX / sprite_bg.width * 0.94);
            cc.log(" === userId", userId, players[userId]); 

            cc.loader.loadImg(imageUrl ? imageUrl : "png/default_headpic.png", {
                isCrossOrigin: true
            }, function(err, img) {
                if (err) {
                    cc.log(err);
                } else if (img && cc.sys.isObjectValid(sprite_bg)) {
                    sprite_bg.setTexture(img);
                    sprite_bg.setScale(sp_bg.width * sp_bg.scaleX / sprite_bg.width * 0.94);
                }
            });
        }
        

        var btn_yes = copyNode.getChildByName("btn_yes");
        btn_yes.setTag(userId);
        btn_yes.addTouchEventListener(function(sender, type) {
            var RoleNum = sender.getTag();
            if (type == 2) {
                CheckUpdateResourceClass(GameClass[tData.gameType], function () {
                    if (!cc.sys.isObjectValid(node)) {
                        return;
                    }
                    MjClient.block();
                    MjClient.rePlayVideo = tData.gameType;
                    MjClient.otherReplayUid = RoleNum;
                    replayData.currentUid = RoleNum;
                    replayData.prePlayVideo = tData.gameType;
                    delete MjClient.data.sData;
                    // var data = JSON.stringify(playLogIfoArry[num - 1]);
                    // playLogInfoLayer.prototype.replayController(node, JSON.parse(data));
                    cc.log("======================replayRedioByRoleUid=num = " + num);
                    replayRedioByRoleUid(replayData.currentUid);

                    //回放完了后，不删除选择回放视角的界面，根据产品的最新需求，remarked by sking 2019.10.29
                    // if (cc.sys.isObjectValid(selectUI)) {
                    //     selectUI.removeFromParent();
                    // }

                    if(MjClient.FriendCard_main_ui && cc.sys.isObjectValid(MjClient.FriendCard_main_ui)){
                        MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Zhanji_Chakanzhanji_Huikan_Sure", {uid:SelfUid()});
                    }
                });
            }
        });
        return copyNode;
    };

    for (var key in players) {
        _scrollView_select.pushBackCustomItem(createSelectItem(players[key]));
    }
}


//回放重播
var replayRedioByRoleUid = function(replayRoleUid)
{
    cc.log("========================00000000000000=replayData.currentRound = "+ replayData.currentRound);
    cc.log("========================000000000000001111=replayRoleUid = "+ replayRoleUid);
    cc.log("========================0000000000000022222222=MjClient.otherReplayRound = "+ MjClient.otherReplayRound);
    MjClient.unblock();
    MjClient.block();
    if(updatelayer_itme_node && !MjClient.otherReplayRound)
    {
        MjClient.rePlayVideo    = replayData.prePlayVideo; //gameType
        MjClient.otherReplayUid = replayRoleUid;
        delete MjClient.data.sData;
        var data = JSON.stringify(playLogIfoArry[replayData.currentRound]);
        playLogInfoLayer.prototype.replayController(updatelayer_itme_node, JSON.parse(data));
    }
    else {
        //用播放码播放，他人的回放
        MjClient.rePlayVideo    = replayData.prePlayVideo; //gameType
        MjClient.otherReplayUid = replayRoleUid;
        delete MjClient.data.sData;
        var data = JSON.stringify(playLogIfoArry[MjClient.otherReplayRound - 1]);
        var scene = cc.director.getRunningScene();
        playLogInfoLayer.prototype.replayController(scene.replayControllerNode, JSON.parse(data));
    }
}