/**
 * Created by Administrator on 2017/6/21/021.
 */



MjClient.netCallBack = {
    MJReadyJiaGang: [0, function(d)
    {
    }],
    MJOuCard: [0, function(d)
    {
    }],
    MJJiaGang: [0, function(d)
    {
        console.log("---------call MJJiaGang=========");
        var sData = MjClient.data.sData;
        if(sData) {
            var pl = sData.players[d.uid.toString()];
            // if (pl) {
            //  pl.jiaGang = d.jiaGang;
            // }
        }
    }],
    loadWxHead: [/*0.01*/0, function (d) {
        var sData = MjClient.data.sData;
        if(sData) {
            var pl = sData.players[d.uid.toString()];
            if (pl) {
                pl.wxHeadImg = d.img;
            }
        }
    }]
    , MJChat: [0, function (d) {
        if (d.type == 4) {
            var sData = MjClient.data.sData;
            if (!sData || !sData.players[d.uid]) return;
            var pl = sData.players[d.uid];
            // var tData = sData.tData;
            // if (!pl.locationMsg) {
            //     var receiveCount = 0;
            //     for (var i = 0; i < tData.uids.length; i++) {
            //         var p = sData.players[tData.uids[i]];
            //         if (p && p.locationMsg) {
            //             receiveCount++;
            //         }
            //     }
            //     if (receiveCount == tData.uids.length) {

            //     }
            // }
            pl.locationMsg = d.msg;
        }
    }]
    , MJFight: [0, function (d) {
        var sData=MjClient.data.sData;
        if (!sData) return;
        var tData=sData.tData;

        //add by sking 2017.8.25
        var playerCount = 4;
        playerCount = parseInt(MjClient.data.sData.tData.maxPlayer);

        if(MjClient.gameType == MjClient.GAME_TYPE.HAI_AN_MJ ||
            MjClient.gameType == MjClient.GAME_TYPE.HAI_AN_BAI_DA ||
            MjClient.gameType == MjClient.GAME_TYPE.XUE_ZHAN ||
            MjClient.gameType == MjClient.GAME_TYPE.XUE_LIU )//海安玩法，3人玩法 会空一个位置，为了东朝着庄的位置
        {
            if(GameClass[MjClient.gameType] == MjClient.GAME_CLASS.MA_JIANG)
            {
                if(playerCount == 3 ) playerCount = 4;
            }
        }

        if (MjClient.playui && MjClient.playui.playChatAni) {
            var fromOff = (tData.uids.indexOf(d.uid) - tData.uids.indexOf(SelfUid()) + playerCount)%playerCount;
            var toOff = (tData.uids.indexOf(d.targetUid) - tData.uids.indexOf(SelfUid()) + playerCount)%playerCount;
            var kind = d.kind;
            var _props = util.localStorageEncrypt.getBoolItem("_InteractiveProps", true);
            if(_props) {
                MjClient.playui.playChatAni(fromOff, toOff, kind);
            }
        } 
        else if((isJinZhongAPPType() ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP )
            && d.targetUid == d.uid)
        {
            //山西,海安,南通点自己的时候发另外几家动画
            var kind = d.kind;
            var fromOff = (tData.uids.indexOf(d.uid) - tData.uids.indexOf(SelfUid()) + playerCount)%playerCount;
            var _props = util.localStorageEncrypt.getBoolItem("_InteractiveProps", true);
            var icount = 0;
            if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.DOU_DI_ZHU && MjClient.gameType != MjClient.GAME_TYPE.DOU_DI_ZHU_LIN_FEN) {
                // 山西斗地主(除临汾外)，都是三个人，并且方位是0、1、2
                icount = 3;
            } else {
                icount = playerCount;// > 4 ? playerCount: 4;
            }
            for(var i =  0;i < icount;i++)
            {
                if(i != fromOff)
                {
                    if(_props) playChatAni(fromOff,i,kind);
                }
            }
        } 
        else if(MjClient.getAppType() == MjClient.APP_TYPE.AYGUIZHOUMJ &&
        (MjClient.gameType == MjClient.GAME_TYPE.PAO_DE_KUAI_TY || 
        MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_GZ) )
        {
            var fromOff = (tData.uids.indexOf(d.uid) - tData.uids.indexOf(SelfUid()) + playerCount)%playerCount;
            var toOff = (tData.uids.indexOf(d.targetUid) - tData.uids.indexOf(SelfUid()) + playerCount)%playerCount;
            var kind = d.kind;
            var _props = util.localStorageEncrypt.getBoolItem("_InteractiveProps", true);
            if(_props) {
                playChatAni_guizhou(fromOff, toOff, kind);
            }            
        }
        else {
            var fromOff = (tData.uids.indexOf(d.uid) - tData.uids.indexOf(SelfUid()) + playerCount)%playerCount;
            var toOff = (tData.uids.indexOf(d.targetUid) - tData.uids.indexOf(SelfUid()) + playerCount)%playerCount;
            var kind = d.kind;
            var _props = util.localStorageEncrypt.getBoolItem("_InteractiveProps", true);
            
            if( MjClient.gameType == MjClient.GAME_TYPE.SHAN_XI_GAN_DENG_YAN ){
                if(playerCount == 3){
                    if ( toOff == 2 ){
                        toOff = 4;
                    }

                    if( fromOff == 2){
                        fromOff = 4; 
                    }
                }
            }
            
            if(_props) {
                playChatAni(fromOff,toOff,kind);
            }
        }
    }]
    , useInteractiveProp: [0, function (d) {
        var sData=MjClient.data.sData;
        if (!sData) return;
        var tData=sData.tData;

        //add by sking 2017.8.25
        var playerCount = 4;
        playerCount = parseInt(MjClient.data.sData.tData.maxPlayer);

        if(MjClient.gameType == MjClient.GAME_TYPE.HAI_AN_MJ ||
            MjClient.gameType == MjClient.GAME_TYPE.HAI_AN_BAI_DA ||
            MjClient.gameType == MjClient.GAME_TYPE.XUE_ZHAN ||
            MjClient.gameType == MjClient.GAME_TYPE.XUE_LIU )//海安玩法，3人玩法 会空一个位置，为了东朝着庄的位置
        {
            if(GameClass[MjClient.gameType] == MjClient.GAME_CLASS.MA_JIANG)
            {
                if(playerCount == 3 ) playerCount = 4;
            }
        }

        if (MjClient.playui && MjClient.playui.playChatAni) {
            var fromOff = (tData.uids.indexOf(d.uid) - tData.uids.indexOf(SelfUid()) + playerCount)%playerCount;
            var toOff = (tData.uids.indexOf(d.targetUid) - tData.uids.indexOf(SelfUid()) + playerCount)%playerCount;
            var kind = d.kind;
            var _props = util.localStorageEncrypt.getBoolItem("_InteractiveProps", true);
            if(_props) {
                MjClient.playui.playChatAni(fromOff, toOff, kind);
            }
        }
        else if((isJinZhongAPPType() ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP )
            && d.targetUid == d.uid)
        {
            //山西,海安,南通点自己的时候发另外几家动画
            var kind = d.kind;
            var fromOff = (tData.uids.indexOf(d.uid) - tData.uids.indexOf(SelfUid()) + playerCount)%playerCount;
            var _props = util.localStorageEncrypt.getBoolItem("_InteractiveProps", true);
            var icount = 0;
            if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.DOU_DI_ZHU && MjClient.gameType != MjClient.GAME_TYPE.DOU_DI_ZHU_LIN_FEN) {
                // 山西斗地主(除临汾外)，都是三个人，并且方位是0、1、2
                icount = 3;
            } else {
                icount = playerCount;// > 4 ? playerCount: 4;
            }
            for(var i =  0;i < icount;i++)
            {
                if(i != fromOff)
                {
                    if(_props) playChatAni(fromOff,i,kind);
                }
            }
        }
        else if(MjClient.getAppType() == MjClient.APP_TYPE.AYGUIZHOUMJ &&
            (MjClient.gameType == MjClient.GAME_TYPE.PAO_DE_KUAI_TY ||
            MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_GZ) )
        {
            var fromOff = (tData.uids.indexOf(d.uid) - tData.uids.indexOf(SelfUid()) + playerCount)%playerCount;
            var toOff = (tData.uids.indexOf(d.targetUid) - tData.uids.indexOf(SelfUid()) + playerCount)%playerCount;
            var kind = d.kind;
            var _props = util.localStorageEncrypt.getBoolItem("_InteractiveProps", true);
            if(_props) {
                playChatAni_guizhou(fromOff, toOff, kind);
            }
        }
        else {
            var fromOff = (tData.uids.indexOf(d.uid) - tData.uids.indexOf(SelfUid()) + playerCount)%playerCount;
            var toOff = (tData.uids.indexOf(d.targetUid) - tData.uids.indexOf(SelfUid()) + playerCount)%playerCount;
            var kind = d.kind;
            var _props = util.localStorageEncrypt.getBoolItem("_InteractiveProps", true);
            if(_props) {
                playChatAni(fromOff,toOff,kind);
            }
        }
    }],
    waitChooseCard:[0,function (d){
        MjClient.data.sData.tData.tState = TableState.waitChooseCard;
    }]
    , waitJiazhu: [0, function (d) {
        //cc.log(JSON.stringify(d), "等待加注。。。", JSON.stringify(d));
        MjClient.data.sData.tData.tState = TableState.waitJiazhu;
        if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_FU_LU_SHOU ||
            MjClient.gameType == MjClient.GAME_TYPE.FU_LU_SHOU_ER_SHI_ZHANG ) {
            //上一次飘分选择
            if(d.lastPiaoFens) {
                for(var uid in d.lastPiaoFens) {
                    MjClient.data.sData.players[uid].lastPiaoFen = d.lastPiaoFens[uid];
                }
            }
        }
        var sData = MjClient.data.sData;
        if (MjClient.gameType != MjClient.GAME_TYPE.CHANG_SHA) {
            if(d.uid){
                sData.players[d.uid].mjState = TableState.waitJiazhu;
            }else{
                for (var uid in sData.players) {
                    sData.players[uid].mjState = TableState.waitJiazhu;
                }
            }
        }
        var tData = sData.tData;
        if (MjClient.gameType == MjClient.GAME_TYPE.HU_BEI_JING_SHAN_MJ) {
            tData.lastWinner = d.lastWinner;
        }

        if (MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_BO_PI || MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_ZI_PAI || 
            MjClient.gameType == MjClient.GAME_TYPE.HY_SHI_HU_KA || MjClient.gameType == MjClient.GAME_TYPE.LENG_SHUI_JIANG_SHI_HU_DAO ||
            MjClient.gameType == MjClient.GAME_TYPE.XU_PU_PAO_HU_ZI || MjClient.gameType == MjClient.GAME_TYPE.DA_ZI_BO_PI) {
            for (var uid in sData.players) {
                sData.players[uid].jiachuiNum = -1;
            }
        }
        if(MjClient.gameType == MjClient.GAME_TYPE.XIN_NING_MA_JIANG || MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_MA_JIANG){
            for(var uid in d.jiachuiNums){
                sData.players[uid].jiachuiNum = d.jiachuiNums[uid];
            }
        }

        if(MjClient.gameType == MjClient.GAME_TYPE.XIN_NING_MA_JIANG && !cc.isUndefined(d.zhuang))//新宁麻将庄家信息在waitJiaZhu发过来了
            MjClient.data.sData.tData.zhuang = d.zhuang;

        if ((MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() === MjClient.APP_TYPE.QXSYDTZ) && GameClass[MjClient.gameType] == MjClient.GAME_CLASS.MA_JIANG) {
            resetEatActionAnim();
        }

        if (MjClient.gameType == MjClient.GAME_TYPE.TONG_CHENG_GE_ZI_PAI) {
            for (var uid in sData.players) {
                sData.players[uid].piaoFen = -1;
            }
        }
    }]
    ,selectChong:[0, function (d) {}]
    ,selectGuChou:[0, function (d) {
        var players = MjClient.data.sData.players;
        players[d.uid].guChouValue = d.guChouValue;
    }]
    , sendStartFlag: [1, function (d) {
        /*
        var players = MjClient.data.sData.players;
        var startHuNums = d.startHuNums;
        for (var uid in players) {
            var num = startHuNums[uid];
            players[uid].startHuNum = num;
            players[uid].startHuCards = [];
            if (num > 0) {
                players[uid].startHuCards = d.startHuCards[uid];
            }
        }
        */
    }]
    , FLSdoTrust: [0, function(d) {
        //cc.log("收到托管事件", JSON.stringify(d));
        var pl = MjClient.data.sData.players[d.uid];
        pl.isTuoGuan = d.isTuoGuan;
    }]
    , waitDingZhuang: [0, function (d) {
        MjClient.data.sData.tData.tState = TableState.waitDingZhuang;
    }]
    , payCash: [0, function (d) {
        if (d.eventName == "花杠")
        {
            playEffectInPlay("huaGang");
        }
    }],
    showCard: [0, function (d) {
        if (d.isJiang) {
            if (MjClient.data.sData && typeof(d.showCard) === "number") {
                MjClient.data.sData.tData.hunCard = d.showCard;
            }
            else if (MjClient.data.sData && typeof(d.showCard) === "object") {
                MjClient.data.sData.tData.hunCard = d.showCard[0];
                MjClient.data.sData.tData.hunCard2 = d.showCard[1];
            }
        }
    }],
    MJPinniu: [0, function (d) {
        var pl = getUIPlayer(0)
        if(d.uid == pl.info.uid)
        {
            pl.mjState = TableState.roundFinish;
        }
    }]
    , downAndPlayVoice: [0, function (d) {
        MjClient.downAndPlayVoiceMessageQueue = MjClient.downAndPlayVoiceMessageQueue || [];
        MjClient.downAndPlayVoiceMessageQueue.push(d);
        return -1;//不立即处理
    }]
    ,PKBaoFen: [0, function(d) {
        //cc.log("掂坨报分", JSON.stringify(d));
        MjClient.data.sData.tData.baoFenCards = d.baoFenCards;
    }]
    ,ZDTeamerHand: [0, function(d) {
        var pl = MjClient.data.sData.players[SelfUid()];
        pl.teamerHand = d.teamerHand;
    }]
    ,TZScore: [0,function(d){
        var sData = MjClient.data.sData;
        var tData = sData.tData;
        // 打筒子 清空上次的inc
        for (var uid in sData.players) {
            var p = sData.players[uid];
            p.inc = 0
        }
        for (var tid in sData.teams) {
            var team = sData.teams[tid];
            team.inc = 0;
        }

        var pl = sData.players[d.uid];
        if (pl) {
            pl.score_draw = d.score_draw;
            pl.score_spclType = d.score_spclType;
            pl.inc = d.inc;
        }

        var teams = MjClient.data.sData.teams;
        if (d.tid) {
            var team = teams[d.tid];
            team.score_draw = d.t_score_draw;
            team.score_spclType = d.t_score_spclType;
            team.inc = d.inc;
        }

        if (d.scores_spclType) {
            for (var uid in d.scores_spclType) {
                var p = sData.players[uid];
                p.score_spclType = d.scores_spclType[uid];
            }
        }

        if (d.t_scores_spclType) {
            for (var tid in d.t_scores_spclType) {
                var team = teams[tid];
                team.score_spclType = d.t_scores_spclType[tid];
            }
        }

        if (tData.gameType == MjClient.GAME_TYPE.DIAN_TUO) {
            if(tData.duZhanPlayer != -1 || tData.maxPlayer == 3 || tData.areaSelectMode.isSanFuPai){
                pl.t_score_draw = d.t_score_draw;
                return;
            } 
            // 刷新总分
            var team = sData.teams[pl.teamid]; 
            for (var i = 0; i < team.uids.length; i++) {
                sData.players[team.uids[i]].t_score_draw = d.t_score_draw;
            }
            // 刷新已得分的牌
            if (d.yiDeFenCards) {
                //pl.stats_draw = d.stats_draw;
                tData.yiDeFenCards = d.yiDeFenCards;
            }
        }
    }]
    ,TZTeam: [0, function(d){
        cc.log("TZTeam d.uids = ",JSON.stringify(d.uids));
        var sData = MjClient.data.sData;
        if(MjClient.gameType == MjClient.GAME_TYPE.DIAN_TUO){
            sData.tData.uids = d.uids;  
            sData.teams = d.teams;
        }else{
            //邵阳打筒子 霸炸弹
            for(var tid in d){
                if(tid != "A" && tid != "B"){
                    delete d[tid];
                }
            }
            sData.teams = d;
        }

        var players = sData.players;
        for(var tid in sData.teams){
            var team = sData.teams[tid];
            var uids = team.uids;
            for(var i = 0; i < uids.length; i++){
                var pl = players[uids[i]];
                pl.teamid = tid;
            }
        }
        cc.log("gggggggggggggggggggg = ",JSON.stringify(MjClient.data.sData.tData));
  
    }],
    TZJoinTeam: [0, function(d) {
        MjClient.data.sData.tData = d.tData;
    }],
    TZTrust: [0, function(d){
        var players = MjClient.data.sData.players;
        var pl = players[d.uid];
        pl.isTrust = d.isTrust;
        pl.trustTime = d.trustTime;
    }],
    locationApps : [0, function(d){
        var sData = MjClient.data.sData;
        if (!sData) return;
        var pl = sData.players[d.uid];
        pl.locationApps = d.locationApps;
    }],
    duZhanSelectRet: [0,function(d){
        MjClient.data.sData.tData.duZhanPlayer = d.duZhanPlayer;
        cc.log("duZhanSelectRet");
    }]
    ,refresh_goldfield_new_user:[0,function(d) {
        MjClient.data.goldfieldNewUser = d.data;
    }], 
    matchEnd:[0,function (d) {   //比赛结束
        if(MjClient.roundendui){
            MjClient.roundendui.removeFromParent(true);
            MjClient.roundendui = null;
        }
        if(MjClient.endoneui) {
            MjClient.endoneui.removeFromParent(true);
        }
        if(MjClient.endallui){
            MjClient.endallui.removeFromParent(true);
            MjClient.endallui = null;
        }
        if(!d.reward && (d.rank > 3 || d.rank < 1)){
            MjClient.Scene.addChild(new loseGameLayer(d));
        }else {
            MjClient.Scene.addChild(new winGameLayer(d));
        }
    }],
    initSceneData: [0, function (d) {
        delete MjClient.MJPutCache;
        delete MjClient.init_y; //为了解决打了扑克牌后，的位置只初始化麻将的了
        if(MjClient._initSceneDataHideBlock){
            cc.log("initSceneData取消遮罩")
            MjClient.unblock();
        }
        MjClient._initSceneDataHideBlock = false;
        //判断是否要清空忽略过胡，过杠
        if(MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ){
            var roomMsgValue = d.tData.tableid +":"+d.tData.roundNum;
            var saveRoomMsgValue = util.localStorageEncrypt.getStringItem("IGNORE_G_TIP","")
            if(saveRoomMsgValue.length > 0 && saveRoomMsgValue != roomMsgValue){
                util.localStorageEncrypt.setStringItem("IGNORE_G_TIP","");
            }
            saveRoomMsgValue = util.localStorageEncrypt.getStringItem("IGNORE_H_TIP","")
            if(saveRoomMsgValue.length > 0 && saveRoomMsgValue != roomMsgValue){
                util.localStorageEncrypt.setStringItem("IGNORE_H_TIP","");
            }
        }

        if(cc.sys.isObjectValid(MjClient.roundendui)){
            MjClient.roundendui.removeFromParent(true);
            MjClient.roundendui = null;
        }
        if(MjClient.endallui && cc.sys.isObjectValid(MjClient.endallui)){
            MjClient.endallui.removeFromParent(true);
            MjClient.endallui = null;
        }
        if (MjClient.goldMatchingui && cc.sys.isObjectValid(MjClient.goldMatchingui)) {
            MjClient.goldMatchingui.removeFromParent(true);
            MjClient.goldMatchingui = null;
        }
        if (MjClient.playui && cc.sys.isObjectValid(MjClient.playui) && MjClient.MaxPlayerNum != d.tData.maxPlayer) {
            cc.log("initSceneData: MjClient.MaxPlayerNum != d.tData.maxPlayer, restart playui");
            MjClient.playui.removeFromParent();
            MjClient.playui = null;
        }

        if(MjClient.delroomui){
            MjClient.delroomui.removeFromParent(true);
            delete MjClient.delroomui;
        }

        if(MjClient.endoneui && cc.sys.isObjectValid(MjClient.endoneui)){
            MjClient.endoneui.removeFromParent(true);
            MjClient.endoneui = null;
        }

        if(MjClient.ShowCardsLayer != null){
            MjClient.ShowCardsLayer.removeFromParent(true);
            MjClient.ShowCardsLayer = null;
        }

        MjClient.movingCard = null;
        MjClient.selectedCard = null;
        MjClient.JJHcanTingCards = null;//平江咋鸟全局数据没有重置，导致完其他有听牌的玩法出不了牌
        MjClient.clickTing = false;
        if (MjClient.getAppType() === MjClient.APP_TYPE.QXYYQP ||
            MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ ||
            MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ ||
            MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ || 
            MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ)
        {
            util.Timer.setServerTime(d.serverNow);
        }


        if(d.tData.maxPlayer)
        {
            MjClient.MaxPlayerNum = d.tData.maxPlayer;
            MjClient.MaxPlayerNum_changPai = d.tData.maxPlayer;
        }

        if((d.tData.gameType == MjClient.GAME_TYPE.HAI_AN_MJ ||
            d.tData.gameType == MjClient.GAME_TYPE.HAI_AN_BAI_DA) && MjClient.MaxPlayerNum != 2)//海安玩法，会空一个位置，为了东朝着庄的位置
        {
            MjClient.MaxPlayerNum = 4;
        }


        delete MjClient.data.inviteVipTable;
        if (d.tData.roundNum <= -2) {
            MjClient.leaveGame();
            return -1;
        }
        else {
            console.log("=====doomsky say:d.tData.gameType======", d.tData.gameType);
            if ((typeof d.tData.gameType) != 'undefined')
                MjClient.gameType = d.tData.gameType;
            // MjClient.majiang 保存当前游戏玩法
            switch (MjClient.gameType) {
                case MjClient.GAME_TYPE.LIAN_YUN_GANG:
                    MjClient.majiang = MjClient.majiang_lyg;
                    break;
                case MjClient.GAME_TYPE.SHU_YANG:
                    MjClient.majiang = MjClient.majiang_shuyang;
                    break;
                case MjClient.GAME_TYPE.GUAN_YUN:
                    MjClient.majiang = MjClient.majiang_guanyun;
                    break;
                case MjClient.GAME_TYPE.GUAN_NAN:
                    MjClient.majiang = MjClient.majiang_guannan;
                    break;
                case MjClient.GAME_TYPE.DONG_HAI:
                    MjClient.majiang = MjClient.majiang_donghai;
                    break;
                case MjClient.GAME_TYPE.NAN_JING:
                    MjClient.majiang = MjClient.majiang_nanjing;
                    break;
                case MjClient.GAME_TYPE.SU_QIAN:
                    MjClient.majiang = MjClient.majiang_suqian;
                    break;
                case MjClient.GAME_TYPE.NIU_NIU:
                    MjClient.majiang = MjClient.majiang_niuniu;
                    break;
                case MjClient.GAME_TYPE.HUAI_AN:
                    MjClient.majiang = MjClient.majiang_huaian;
                    break;
                case MjClient.GAME_TYPE.HA_HONGZHONG:
                    MjClient.majiang = MjClient.majiang_HAHZ;
                    break;
                case MjClient.GAME_TYPE.HA_14DUN:
                    MjClient.majiang = MjClient.majiang_HA14D;
                    break;
                case MjClient.GAME_TYPE.XIN_PU_HZ:
                    MjClient.majiang = MjClient.majiang_HZMJ;
                    break;
                case MjClient.GAME_TYPE.NTHZ:
                    MjClient.majiang = MjClient.majiang_NTHZ;
                    break;
                case MjClient.GAME_TYPE.XU_ZHOU:
                    MjClient.majiang = MjClient.majiang_xuzhou;
                    break;
                case MjClient.GAME_TYPE.TONG_HUA:
                    MjClient.majiang = MjClient.majiang_tonghua;
                    break;
                case MjClient.GAME_TYPE.CHANG_SHA:
                    MjClient.majiang = MjClient.majiang_changSha;
                    break;
                case MjClient.GAME_TYPE.XIANG_YIN_TUI_DAO_HU:
                    MjClient.majiang = MjClient.majiang_xiangyintuidaohu;
                    break;
                case MjClient.GAME_TYPE.PING_JIANG_ZHA_NIAO:
                    MjClient.majiang = MjClient.majiang_pingjiangzhaniao;
                    break;
                case MjClient.GAME_TYPE.TUAN_TUAN_ZHUAN:
                    MjClient.majiang = MjClient.majiang_tuantuanzhuan;
                    break;
                case MjClient.GAME_TYPE.PAO_DE_KUAI:
                    MjClient.majiang = MjClient.majiang_paodekuai;
                    break;
                case MjClient.GAME_TYPE.PAO_DE_KUAI_TY:
                    MjClient.majiang = MjClient.majiang_PaodekuaiTY;
                    break;
                case MjClient.GAME_TYPE.PAO_DE_KUAI_ELEVEN:
                    MjClient.majiang = MjClient.majiang_Paodekuai11;
                    break;
                case MjClient.GAME_TYPE.PAO_DE_KUAI_ZERO:
                    MjClient.majiang = MjClient.majiang_PaoDeKuaiZERO;
                    break;
                case MjClient.GAME_TYPE.PAO_DE_KUAI_JZ:
                    MjClient.majiang = MjClient.majiang_PaodekuaiJZ;
                    break;
                case MjClient.GAME_TYPE.PAO_DE_KUAI_HA:
                    MjClient.majiang = MjClient.majiang_PaodekuaiHuaian;
                    break;
                case MjClient.GAME_TYPE.PAO_DE_KUAI_HUAIAN_NEW:
                    MjClient.majiang = MjClient.majiang_PaodekuaiHuaianNew;
                    break;
                case MjClient.GAME_TYPE.PAO_DE_KUAI_LYG:
                    MjClient.majiang = MjClient.majiang_PaodekuaiLYG;
                    break;
                case MjClient.GAME_TYPE.PAO_DE_KUAI_XIANG_SHUI:
                    MjClient.majiang = MjClient.majiang_PaodekuaiXS;
                    break;
                case MjClient.GAME_TYPE.PAO_DE_KUAI_NT:
                    MjClient.majiang = MjClient.majiang_paodekuaiNT;
                    break;
                case MjClient.GAME_TYPE.PAO_DE_KUAI_HAIAN:
                    MjClient.majiang = MjClient.majiang_paodekuaiHaian;
                    break;
                case MjClient.GAME_TYPE.PAO_DE_KUAI_XU_ZHOU:
                    MjClient.majiang = MjClient.majiang_paodekuaiXuzhou;
                    break;
                case MjClient.GAME_TYPE.SAN_DA_HA:
                    MjClient.majiang = MjClient.poker_SanDaHa;
                    break;
                case MjClient.GAME_TYPE.CHONG_YANG_HUA_QUAN_JIAO:
                    MjClient.majiang = MjClient.poker_HuaQuanJiao;
                    break;
                case MjClient.GAME_TYPE.YONG_ZHOU_BAO_PAI:
                    MjClient.majiang = MjClient.poker_baoPaiYZ;
                    break;
                case MjClient.GAME_TYPE.XIANG_TAN_SAN_DA_HA:
                    MjClient.majiang = MjClient.poker_SanDaHaXiangTan;
                    break;
                case MjClient.GAME_TYPE.SAN_DA_HA_NEW:
                    MjClient.majiang = MjClient.poker_SanDaHaNew;
                    break;
                case MjClient.GAME_TYPE.LV_LIANG_DA_QI:
                    MjClient.majiang = MjClient.poker_DaQi;
                    break;
                case MjClient.GAME_TYPE.PAO_HU_ZI:
                    MjClient.majiang = MjClient.majiang_paohuzi;
                    break;
                case MjClient.GAME_TYPE.PAO_HU_ZI_ER:
                    MjClient.majiang = MjClient.majiang_paohuzi;
                    break;
                case MjClient.GAME_TYPE.PAO_HU_ZI_SR:
                    MjClient.majiang = MjClient.majiang_paohuzi;
                    break;
                case MjClient.GAME_TYPE.SI_YANG:
                    MjClient.majiang = MjClient.majiang_siyang;
                    break;
                case MjClient.GAME_TYPE.XIN_SI_YANG:
                    MjClient.majiang = MjClient.majiang_siyang_new;
                    break;
                case MjClient.GAME_TYPE.SI_YANG_HH:
                    MjClient.majiang = MjClient.majiang_siyanghh;
                    break;
                case MjClient.GAME_TYPE.YAN_CHENG_HH:
                    MjClient.majiang = MjClient.majiang_yanchenghh;
                    break;
                case MjClient.GAME_TYPE.RU_GAO:
                    MjClient.majiang = MjClient.majiang_rugao;
                    break;
                case MjClient.GAME_TYPE.GAN_YU:
                    MjClient.majiang = MjClient.majiang_ganyu;
                    break;
                case MjClient.GAME_TYPE.HUAI_AN_TTZ:
                    MjClient.majiang = MjClient.majiang_huaianTTZ;
                    break;
                case MjClient.GAME_TYPE.RU_GAO_MJH:
                    MjClient.majiang = MjClient.majiang_rugao_MJH;
                    break;
                case MjClient.GAME_TYPE.HUAI_AN_CC:
                    MjClient.majiang = MjClient.majiang_huaianCC;
                    break;
                case MjClient.GAME_TYPE.HZ_TUI_DAO_HU:
                    MjClient.majiang = MjClient.majiang_HZTDH;
                    break;
                case MjClient.GAME_TYPE.HUAI_AN_ERZ:
                    MjClient.majiang = MjClient.majiang_huaianERZ;
                    break;
                case MjClient.GAME_TYPE.LUO_DI_SAO:
                    MjClient.majiang = MjClient.majiang_paohuzi;
                    break;
                case MjClient.GAME_TYPE.DOU_DI_ZHU_NT:
                    MjClient.majiang = MjClient.doudizhu_nantong;
                    break;
                case MjClient.GAME_TYPE.HUAI_AN_DOU_DI_ZHU:
                    MjClient.majiang = MjClient.doudizhu_HuaiAn;
                    break;
                case MjClient.GAME_TYPE.LIAN_SHUI:
                    MjClient.majiang = MjClient.majiang_lianshui;
                    break;
                case MjClient.GAME_TYPE.TY_HONGZHONG:
                    MjClient.majiang = MjClient.majiang_TYHZ;
                    break;
                case MjClient.GAME_TYPE.ML_HONGZHONG:
                    MjClient.majiang = MjClient.majiang_MLHZ;
                    break;
                case MjClient.GAME_TYPE.ML_HONGZHONG_ZERO:
                    MjClient.majiang = MjClient.majiang_MLHZ_AI;
                    break;
                case MjClient.GAME_TYPE.NING_XIANG_MJ:
                    MjClient.majiang = MjClient.majiang_ningxiang;
                    break;
                case MjClient.GAME_TYPE.CHEN_ZHOU:
                    MjClient.majiang = MjClient.majiang_chenzhou;
                    break;
                case MjClient.GAME_TYPE.YUAN_JIANG_MJ:
                    MjClient.majiang = MjClient.majiang_yuanjiang;
                    break;
                case MjClient.GAME_TYPE.NAN_XIAN_MJ:
                    MjClient.majiang = MjClient.majiang_NAN_XIAN_MJ;
                    break;
                case MjClient.GAME_TYPE.MJ_ZHUO_XIA_ZI:
                    MjClient.majiang = MjClient.majiang_MJ_ZHUO_XIA_ZI;
                    break;
                case MjClient.GAME_TYPE.CHAO_GU_MJ:
                    MjClient.majiang = MjClient.majiang_CHAO_GU_MJ;
                    break;
                case MjClient.GAME_TYPE.WU_XUE_GE_BAN:
                    MjClient.majiang = MjClient.majiang_WuXueGeBan;
                    break;
                case MjClient.GAME_TYPE.DOU_DI_ZHU_TY:
                    MjClient.majiang = MjClient.doudizhu_tongyong;
                    break;
                case MjClient.GAME_TYPE.DOU_DI_ZHU_HBTY:
                    MjClient.majiang = MjClient.doudizhu_HBTY;
                    break;
                case MjClient.GAME_TYPE.DOU_DI_ZHU_QC:
                    MjClient.majiang = MjClient.doudizhu_QC;
                    break;    
                case MjClient.GAME_TYPE.TY_ZHUANZHUAN:
                    MjClient.majiang = MjClient.majiang_TYZZ;
                    break;
                case MjClient.GAME_TYPE.BAI_PU_LIN_ZI:
                    MjClient.majiang = MjClient.majiang_BPLZ;
                    break;
                case MjClient.GAME_TYPE.RU_GAO_SHUANG_JIANG:
                    MjClient.majiang = MjClient.majiang_rugao_SJ;
                    break;
                case  MjClient.GAME_TYPE.HAI_AN_MJ:
                    MjClient.majiang = MjClient.majiang_haian;
                    break;

                case  MjClient.GAME_TYPE.XUE_ZHAN:
                    MjClient.majiang = MjClient.majiang_xuezhanMJ;
                    break;
                case  MjClient.GAME_TYPE.XUE_LIU:
                    MjClient.majiang = MjClient.majiang_xueliu;
                    break;
                case  MjClient.GAME_TYPE.HAI_AN_BAI_DA:
                    MjClient.majiang = MjClient.majiang_haianbaida;
                    break;
                case  MjClient.GAME_TYPE.JIN_ZHONG_MJ:
                    MjClient.majiang = MjClient.majiang_jinzhong;
                    break;
                case MjClient.GAME_TYPE.DOU_DI_ZHU_JZ:
                    MjClient.majiang = MjClient.doudizhu_jinzhong;
                    break;
                case MjClient.GAME_TYPE.DOU_DI_ZHU_GZ:
                    MjClient.majiang = MjClient.doudizhu_guizhou;
                    break;
                case MjClient.GAME_TYPE.DOU_DI_ZHU_ZERO:
                    MjClient.majiang = MjClient.doudizhu_zero;
                    break;
                case MjClient.GAME_TYPE.DOU_DI_ZHU_DA_TONG:
                    MjClient.majiang = MjClient.doudizhu_DaTong;
                    break;
                case MjClient.GAME_TYPE.DOU_DI_ZHU_XIN_ZHOU:
                    MjClient.majiang = MjClient.doudizhu_xinzhou;
                    break;
                case MjClient.GAME_TYPE.DOU_DI_ZHU_HA:
                    MjClient.majiang = MjClient.doudizhu_haian;
                    break;
                case MjClient.GAME_TYPE.RU_DONG_SHUANG_JIANG:
                    MjClient.majiang = MjClient.majiang_rudong;
                    break;
                case MjClient.GAME_TYPE.JIN_ZHONG_KD:
                    MjClient.majiang = MjClient.majiang_koudian;
                    break;
                case MjClient.GAME_TYPE.YUN_CHENG_TIE_JIN:
                    MjClient.majiang = MjClient.majiang_yunchengtiejin;
                    break; 
                case MjClient.GAME_TYPE.HE_JIN_KUN_JIN:
                    MjClient.majiang = MjClient.majiang_hejinkunjin;
                    break;   
                case MjClient.GAME_TYPE.JING_LE_KOU_DIAN:
                    MjClient.majiang = MjClient.majiang_jingle;
                    break;
                case MjClient.GAME_TYPE.LV_LIANG_MA_JIANG:
                    MjClient.majiang = MjClient.majiang_lvliangmajiang;
                    break;
                case MjClient.GAME_TYPE.ZHUO_HAO_ZI:
                    MjClient.majiang = MjClient.majiang_zhuohaozi;
                    break;
                case MjClient.GAME_TYPE.RU_GAO_ER:
                    MjClient.majiang = MjClient.majiang_rugaoER;
                    break;
                case MjClient.GAME_TYPE.HY_SHI_HU_KA:
                    MjClient.majiang = MjClient.majiang_hengyang;
                    break;
                case MjClient.GAME_TYPE.JIN_ZHONG_TUI_DAO_HU:
                    MjClient.majiang = MjClient.majiang_tuidaohu;
                    break;
                case  MjClient.GAME_TYPE.LING_SHI_BIAN_LONG:
                    MjClient.majiang = MjClient.majiang_lingshibianlong;
                    break;
                case  MjClient.GAME_TYPE.LING_SHI_BAN_MO:
                    MjClient.majiang = MjClient.majiang_lingshibanmo;
                    break;
                case MjClient.GAME_TYPE.PING_YAO_KOU_DIAN:
                    MjClient.majiang = MjClient.majiang_pingyaokoudian;
                    break;
                case  MjClient.GAME_TYPE.PING_YAO_MA_JIANG:
                    MjClient.majiang = MjClient.majiang_pingyaomajiang;
                    break;
                case  MjClient.GAME_TYPE.JIE_XIU_1_DIAN_3:
                    MjClient.majiang = MjClient.majiang_jiexiuyidiansan;
                    break;
                case MjClient.GAME_TYPE.JIE_XIU_KOU_DIAN:
                    MjClient.majiang=MjClient.majiang_jiexiukoudian;
                    break;
                case MjClient.GAME_TYPE.JIN_ZHONG_GUAI_SAN_JIAO:
                    MjClient.majiang=MjClient.majiang_guaisanjiao;
                    break;
                case MjClient.GAME_TYPE.SHOU_YANG_QUE_KA:
                    MjClient.majiang=MjClient.majiang_shouyangqueka;
                    break;
                case MjClient.GAME_TYPE.LV_LIANG_KOU_DIAN:
                    MjClient.majiang=MjClient.majiang_lvliangkoudian;
                    break;
                case MjClient.GAME_TYPE.JIN_ZHONG_LI_SI:
                    MjClient.majiang=MjClient.majiang_jinzhonglisi;
                    break;
                case MjClient.GAME_TYPE.HONG_TONG_WANG_PAI:
                    MjClient.majiang=MjClient.majiang_hongtongwangpai;
                    break;
                case MjClient.GAME_TYPE.LIN_FEN_YING_SAN_ZUI:
                    MjClient.majiang=MjClient.majiang_linfenyingsanzui;
                    break;
                case MjClient.GAME_TYPE.DOU_DI_ZHU_LIN_FEN:
                    MjClient.majiang=MjClient.doudizhu_linfen;
                    break;
                case MjClient.GAME_TYPE.LIN_FEN_YI_MEN_ZI:
                    MjClient.majiang=MjClient.majiang_linfenyimenzi;
                    break;
                case MjClient.GAME_TYPE.FEN_XI_YING_KOU:
                    MjClient.majiang=MjClient.majiang_fenxiyingkou;
                    break;
                case MjClient.GAME_TYPE.JI_XIAN_1928_JIA_ZHANG:
                    MjClient.majiang=MjClient.majiang_linfenjixian;
                    break;
                case MjClient.GAME_TYPE.ML_HONG_ZI:
                    MjClient.majiang=MjClient.majiang_hongZi;
                    break;
                case MjClient.GAME_TYPE.YUE_YANG_WAI_HU_ZI:
                    MjClient.majiang=MjClient.majiang_YueYangWaiHuZi;
                    break;
                case MjClient.GAME_TYPE.YI_YANG_WAI_HU_ZI:
                    MjClient.majiang=MjClient.majiang_YiYangWaiHuZi;
                    break;
                case MjClient.GAME_TYPE.NAN_XIAN_GUI_HU_ZI:
                    MjClient.majiang=MjClient.majiang_nanXianGuiHuZi;
                    break;
                case MjClient.GAME_TYPE.YUAN_JIANG_GUI_HU_ZI:
                    MjClient.majiang=MjClient.majiang_yuanJiangGuiHuZi;
                    break;
                case MjClient.GAME_TYPE.JIANG_YONG_15Z:
                    MjClient.majiang = MjClient.majiang_paohuzi;
                    break;
                case MjClient.GAME_TYPE.XIANG_YIN_ZHUO_HONG_ZI:
                    MjClient.majiang=MjClient.majiang_xyHongZi;
                    break;
                case MjClient.GAME_TYPE.LIN_FEN_XIANG_NING_SHUAI_JIN:
                    MjClient.majiang=MjClient.majiang_xiangningshuaijin;
                    break;
                case MjClient.GAME_TYPE.LIN_FEN_KOU_DIAN_FENG_ZUI_ZI:
                    MjClient.majiang=MjClient.majiang_linfenkoudianfengzuizi;
                    break;
                case MjClient.GAME_TYPE.JIN_ZHONG_CAI_SHEN:
                    MjClient.majiang=MjClient.majiang_jinzhongcaishen;
                    break;
                case MjClient.GAME_TYPE.XIAO_YI_KOU_DIAN:
                    MjClient.majiang=MjClient.majiang_xiaoyikoudian;
                    break;
                case MjClient.GAME_TYPE.XU_ZHOU_PEI_XIAN:
                    MjClient.majiang = MjClient.majiang_xuzhoupeixian;
                    break;
                case MjClient.GAME_TYPE.DOU_DI_ZHU_LV_LIANG:
                    MjClient.majiang = MjClient.doudizhu_lvliang;
                    break;
                case MjClient.GAME_TYPE.FAN_SHI_XIA_YU:
                    MjClient.majiang = MjClient.majiang_fanshixiayu;
                    break;
                case MjClient.GAME_TYPE.DAI_XIAN_MA_JIANG:
                    MjClient.majiang = MjClient.majiang_daixianmajiang;
                    break;
                case MjClient.GAME_TYPE.YUE_YANG_HONG_ZHONG:
                    MjClient.majiang = MjClient.majiang_yueyanghongzhong;
                    break;
                case MjClient.GAME_TYPE.YUE_YANG_SAN_DA_HA:
                    MjClient.majiang = MjClient.PokerYueYangSanDaHa;
                    break;
                case MjClient.GAME_TYPE.WU_TAI_KOU_DIAN:
                    MjClient.majiang = MjClient.majiang_wutaikoudian;
                    break;
                case MjClient.GAME_TYPE.XIN_ZHOU_SAN_DA_ER:
                    MjClient.majiang = MjClient.poker_XinZhouSanDaEr;
                    break;
                case MjClient.GAME_TYPE.DA_NING_SHUAI_JIN:
                    MjClient.majiang = MjClient.majiang_daningshuaijin;
                    break;
                case MjClient.GAME_TYPE.YUE_YANG_FU_LU_SHOU:
                    MjClient.majiang = MjClient.majiang_fulushou;
                    break;
                case MjClient.GAME_TYPE.FU_LU_SHOU_ER_SHI_ZHANG:
                    MjClient.majiang = MjClient.majiang_fulushouErShi;
                    break;
                case MjClient.GAME_TYPE.FEN_YANG_QUE_MEN:
                    MjClient.majiang = MjClient.majiang_fenyangquemen;
                    break;
                case MjClient.GAME_TYPE.DA_TONG_GUAI_SAN_JIAO:
                    MjClient.majiang = MjClient.majiang_datongguaisanjiao;
                    break;
                case MjClient.GAME_TYPE.YY_AN_HUA_PAO_HU_ZI:
                    MjClient.majiang = MjClient.majiang_anhuapaohuzi;
                    break;
                case MjClient.GAME_TYPE.AN_HUA_PAO_HU_ZI:
                    MjClient.majiang = MjClient.majiang_hengyang;
                    break;
                case MjClient.GAME_TYPE.LUAN_GUA_FENG:
                    MjClient.majiang = MjClient.majiang_luanguafeng;
                    break;
                case MjClient.GAME_TYPE.AN_HUA_MA_JIANG:
                    MjClient.majiang = MjClient.majiang_anhuaMaJiang;
                    break;
                case MjClient.GAME_TYPE.AN_HUA_MA_JIANG_SW:
                    MjClient.majiang = MjClient.majiang_anhuaMaJiangSW;
                    break;
                case MjClient.GAME_TYPE.NING_XIANG_KAI_WANG:
                    MjClient.majiang = MjClient.majiang_ningXiangKaiWang;
                    break;
                case MjClient.GAME_TYPE.CHEN_ZHOU_ZI_PAI:
                    MjClient.majiang = MjClient.majiang_chenzhouzipai;
                    break;
                case MjClient.GAME_TYPE.GUI_YANG_ZI_PAI://桂阳字牌逻辑暂时用郴州 后面有差异再调整
                    MjClient.majiang = MjClient.majiang_chenzhouzipai;
                    break;
                case MjClient.GAME_TYPE.DA_TONG_ZHA_GU_ZI:
                    MjClient.majiang = MjClient.zhaguizi_datong;
                    break;
                case MjClient.GAME_TYPE.YUE_YANG_NIU_SHI_BIE:
                    MjClient.majiang = MjClient.majiang_NiuShiBieYueYang;
                    break;
                case MjClient.GAME_TYPE.ZHU_ZHOU_DA_MA_ZI:
                    MjClient.majiang = MjClient.majiang_DaMaZiZhuZhou;
                    break;
                case MjClient.GAME_TYPE.CHONG_YANG_DA_GUN:
                    MjClient.majiang = MjClient.majiang_PokerChongYangDaGun;
                    break;
                case MjClient.GAME_TYPE.DA_YE_DA_GONG:
                    MjClient.majiang = MjClient.majiang_PokerDaYeDaGong;
                    break;
                case MjClient.GAME_TYPE.TONG_SHAN_DA_GONG:
                    MjClient.majiang = MjClient.majiang_PokerTongShanDaGong;
                    break;
                case MjClient.GAME_TYPE.DA_YE_510K:
                    MjClient.majiang = MjClient.majiang_PokerDaYe510K;
                    break;
                case MjClient.GAME_TYPE.QIAN_JIANG_QIAN_FEN:
                    MjClient.majiang = MjClient.majiang_PokerQianJiangQianFen;
                    break;
                case MjClient.GAME_TYPE.QI_CHUN_DA_GONG:
                    MjClient.majiang = MjClient.majiang_PokerQiChunDaGong;
                    break;
                case MjClient.GAME_TYPE.NING_XIANG_PAO_HU_ZI:
                    MjClient.majiang = MjClient.majiang_ningxiangpaohuzi;
                    break;
                case MjClient.GAME_TYPE.YUE_YANG_PENG_HU:
                    MjClient.majiang = MjClient.majiang_yueYangPengHu;
                    break;
                case MjClient.GAME_TYPE.HY_LIU_HU_QIANG:
                    if(isYongZhouProject()){
                        MjClient.majiang = MjClient.majiang_hengyang;
                    }else{
                        MjClient.majiang = MjClient.majiang_liuHuQiang;
                    }
                    break;
                case MjClient.GAME_TYPE.TAO_JIANG_MA_JIANG:
                    MjClient.majiang = MjClient.majiang_taoJiang;
                    break;
                case MjClient.GAME_TYPE.YUE_YANG_YI_JIAO_LAI_YOU:
                    MjClient.majiang = MjClient.majiang_yiJiaoLaiYou;
                    break;
                case MjClient.GAME_TYPE.HU_BEI_YI_JIAO_LAI_YOU:
                    MjClient.majiang = MjClient.majiang_yiJiaoLaiYouHuBei;
                    break;
                case MjClient.GAME_TYPE.CHUO_XIA_ZI:
                    MjClient.majiang = MjClient.majiang_chuoXiaZi;
                    break;
                case MjClient.GAME_TYPE.HU_BEI_JING_SHAN_MJ:
                    MjClient.majiang = MjClient.majiang_jingshan;
                    break;
                case MjClient.GAME_TYPE.XIAO_GAN_KA_WU_XING:
                    MjClient.majiang = MjClient.majiang_xiaoGanKaWuXing;
                    break;
                case MjClient.GAME_TYPE.SUI_ZHOU_KA_WU_XING:
                    MjClient.majiang = MjClient.majiang_suiZhouKaWuXing;
                    break;
                case MjClient.GAME_TYPE.DA_YE_KAI_KOU_FAN:
                    MjClient.majiang = MjClient.majiang_daYeKaiKouFan;
                    break;
                case MjClient.GAME_TYPE.HONG_ZHONG_LAI_ZI_GANG:
                    MjClient.majiang = MjClient.majiang_hongZhongLaiZiGang;
                    break;
                case MjClient.GAME_TYPE.DIAN_TUO:
                    MjClient.majiang = MjClient.majiang_diantuo;
                    break;
                case MjClient.GAME_TYPE.YUE_YANG_DA_ZHA_DAN:
                    MjClient.majiang = MjClient.majiang_DaZhaDan;
                    break;
                case MjClient.GAME_TYPE.YI_YANG_MA_JIANG:
                    cc.log("------------yi yang ma jiang--------");
                    MjClient.majiang = MjClient.majiang_yiyangMJ;
                    break;
                case MjClient.GAME_TYPE.YUE_YANG_YUAN_JIANG_QIAN_FEN:
                    MjClient.majiang = MjClient.yueYangYuanJiangQianFen;
                    break;
                case MjClient.GAME_TYPE.CHEN_ZHOU_MAO_HU_ZI:
                    MjClient.majiang = MjClient.majiang_chenzhoumaohuzi;
                    break;
                case MjClient.GAME_TYPE.XIANG_XI_2710:
                    MjClient.majiang = MjClient.majiang_xiangXiRQS;
                    break;
                case MjClient.GAME_TYPE.CHANG_DE_PAO_HU_ZI:
                    MjClient.majiang = MjClient.majiang_changDePaoHuZi;
                    break;
                case MjClient.GAME_TYPE.YUAN_LING_PAO_HU_ZI:
                    MjClient.majiang = MjClient.majiang_yuanLingPaoHuZi;
                    break;
                case MjClient.GAME_TYPE.SHI_MEN_PAO_HU_ZI:
                    MjClient.majiang=MjClient.majiang_shiMenPaoHuZi;
                    break;
                case MjClient.GAME_TYPE.ZP_LY_CHZ:
                    if(isYongZhouProject()){
                        MjClient.majiang = MjClient.majiang_zplychz;
                    }else{
                        MjClient.majiang = MjClient.majiang_zplychz_lyg;
                    }
                    
                    break;
                case MjClient.GAME_TYPE.HAN_SHOU_PAO_HU_ZI:
                    MjClient.majiang = MjClient.majiang_hanshoupaohuzi;
                    break;
                case MjClient.GAME_TYPE.YUN_CHENG_FENG_HAO_ZI:
                    MjClient.majiang = MjClient.majiang_yunchengfenghaozi;
                    break;
                case MjClient.GAME_TYPE.DAO_ZHOU_MJ:
                    MjClient.majiang = MjClient.majiang_DZMaJiang;
                    break;
                case MjClient.GAME_TYPE.JI_SHAN_NIU_YE_ZI:
                    MjClient.majiang = MjClient.majiang_jishanniuyezi;
                    break;
                case MjClient.GAME_TYPE.YZ_PAO_DE_KUAI_TY:
                    MjClient.majiang = MjClient.majiang_PaoDeKuaiYZTY;
                    break;
                case MjClient.GAME_TYPE.WANG_DIAO_MA_JIANG:
                    MjClient.majiang = MjClient.majiang_WDMaJiang;
                    break;
                case MjClient.GAME_TYPE.JIANG_HUA_MJ:
                    MjClient.majiang = MjClient.majiang_JHMaJiang;
                    break;
                case MjClient.GAME_TYPE.YONG_ZHOU_MJ:
                    MjClient.majiang = MjClient.majiang_YZMaJiang;
                    break;
                case MjClient.GAME_TYPE.LEI_YANG_GMJ:
                    MjClient.majiang = MjClient.majiang_leiyangGMJ;
                    break;
                case MjClient.GAME_TYPE.HENG_YANG_CHANG_SHA:
                    MjClient.majiang = MjClient.majiang_hengyangChangSha;
                    break;
                case MjClient.GAME_TYPE.XIANG_XIANG_GAO_HU_ZI:
                    MjClient.majiang = MjClient.majiang_zplychz;
                    break;
                case MjClient.GAME_TYPE.XIANG_XIANG_PAO_HU_ZI: 
                    MjClient.majiang = MjClient.majiang_zplychz;
                    break;
                case MjClient.GAME_TYPE.XIANG_TAN_PAO_HU_ZI:
                    MjClient.majiang = MjClient.majiang_zplychz;
                    break;
                case MjClient.GAME_TYPE.LOU_DI_FANG_PAO_FA:
                    MjClient.majiang = MjClient.majiang_zplychz;
                    break;
                case MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA:
                    MjClient.majiang = MjClient.majiang_zplychz;
                    break;
                case MjClient.GAME_TYPE.HENG_YANG_FANG_PAO_FA:
                    MjClient.majiang = MjClient.majiang_zplychz;
                    break;
                case MjClient.GAME_TYPE.HUAI_HUA_HONG_GUAI_WAN:
                    MjClient.majiang = MjClient.majiang_zplychz;
                    break;
                case MjClient.GAME_TYPE.HUAIAN_TTZ:
                    MjClient.majiang = MjClient.majiang_huaianTTZ;
                    break;
                case MjClient.GAME_TYPE.HUAIAN_CC:
                    MjClient.majiang = MjClient.majiang_huaianCC;
                    break;
                case MjClient.GAME_TYPE.PAO_HU_ZI_King:
                    MjClient.majiang = MjClient.majiang_paohuzi;
                    break;
                case MjClient.GAME_TYPE.PAO_HU_ZI_SR_King:
                    MjClient.majiang = MjClient.majiang_paohuzi;
                    break;
                case MjClient.GAME_TYPE.PAO_HU_ZI_LR_King:
                    MjClient.majiang = MjClient.majiang_paohuzi;
                    break;
                case MjClient.GAME_TYPE.HUAI_HUA_MA_JIANG:
                    MjClient.majiang = MjClient.majiang_huaihuaMaJiang;
                    break;
                case MjClient.GAME_TYPE.XIANG_XIANG_HONG_ZHONG:
                    MjClient.majiang = MjClient.majiang_XXHZ;
                    break;
                case MjClient.GAME_TYPE.HENG_YANG_SHIWUHUXI:
                    MjClient.majiang = MjClient.majiang_hengyang;
                    break;
                case MjClient.GAME_TYPE.DA_TONG_ZI_SHAO_YANG:
                    MjClient.majiang = MjClient.majiang_DaTongZi;
                    break;
                case MjClient.GAME_TYPE.SHAO_YANG_BO_PI:
                    MjClient.majiang = MjClient.majiang_hengyang;
                    break;
                case MjClient.GAME_TYPE.DA_ZI_BO_PI:
                    MjClient.majiang = MjClient.majiang_hengyang;
                    break;
                case MjClient.GAME_TYPE.SHAO_YANG_ZI_PAI:
                    MjClient.majiang = MjClient.majiang_hengyang; 
                    break; 
                case MjClient.GAME_TYPE.SHAO_YANG_MA_JIANG:
                     MjClient.majiang = MjClient.majiang_SYMJ;
                    break;
                case MjClient.GAME_TYPE.XIN_NING_MA_JIANG:
                     MjClient.majiang = MjClient.majiang_XinNingMJ;
                    break;
                case MjClient.GAME_TYPE.LONG_HUI_BA_ZHA_DAN:
                    MjClient.majiang = MjClient.majiang_BaZhaDan;
                    break;
                case MjClient.GAME_TYPE.YONG_ZHOU_LAO_CHUO:
                    MjClient.majiang = MjClient.majiang_YongZhouLaoChuo;
                    break;
                case MjClient.GAME_TYPE.HY_ER_PAO_HU_ZI:
                    MjClient.majiang = MjClient.majiang_hengyang;
                    break;
                case MjClient.GAME_TYPE.BAN_BIAN_TIAN_ZHA:
                    MjClient.majiang = MjClient.majiang_BanBianTianZha;
                    break;
                case MjClient.GAME_TYPE.LENG_SHUI_JIANG_SHI_HU_DAO:
                    MjClient.majiang = MjClient.majiang_hengyang;
                    break;
                case MjClient.GAME_TYPE.HENG_YANG_SAN_DA_HA:
                    MjClient.majiang = MjClient.poker_HengYangSanDaHa;
                    break;
                case MjClient.GAME_TYPE.SHAO_YANG_SAN_DA_HA:
                    MjClient.majiang = MjClient.poker_ShaoYangSanDaHa;
                    break;
                case MjClient.GAME_TYPE.YONG_LI_SAN_DA_HA:
                    MjClient.majiang = MjClient.poker_YongLiSanDaHa;
                    break;
                case MjClient.GAME_TYPE.XIANG_XIANG_SAN_DA_HA:
                    MjClient.majiang = MjClient.PokerXiangXiangSanDaHa;
                    break;
                case MjClient.GAME_TYPE.XIANG_SHUI_MJ:
                    MjClient.majiang = MjClient.majiang_xiangshui;
                    break;
                case MjClient.GAME_TYPE.QU_TANG_23_ZHANG:
                    MjClient.majiang = MjClient.majiang_qutang_23zhang;
                    break;
                case MjClient.GAME_TYPE.AN_XIANG_WEI_MA_QUE:
                    MjClient.majiang = MjClient.majiang_anXiangWeiMaQue;
                    break;
                case  MjClient.GAME_TYPE.GUI_ZHOU_PU_DING_MJ:
                    MjClient.majiang = MjClient.majiang_guizhoupuding;
                    break;
                case  MjClient.GAME_TYPE.GUI_ZHOU_AN_SHUN_MJ:
                    MjClient.majiang = MjClient.majiang_guizhouAnShun;
                    break;
                case  MjClient.GAME_TYPE.GUI_ZHOU_SAN_DING_LIANG_FANG:
                    MjClient.majiang = MjClient.majiang_guizhouSanDingLiangFang;
                    break;
                case  MjClient.GAME_TYPE.GUI_ZHOU_LIANG_DING_LIANG_FANG:
                    MjClient.majiang = MjClient.majiang_guizhouLiangDingLiangFang;
                    break;
                case  MjClient.GAME_TYPE.GUI_ZHOU_SAN_DING_GUAI:
                    MjClient.majiang = MjClient.majiang_guizhouSanDingGuai;
                    break;
                case  MjClient.GAME_TYPE.GUI_ZHOU_ER_DING_GUAI:
                    MjClient.majiang = MjClient.majiang_guizhouSanDingGuai;
                    break;
                case  MjClient.GAME_TYPE.GUI_ZHOU_XMY_GUI_YANG_ZHUO_JI:
                    MjClient.majiang = MjClient.majiang_guizhouXMYGuiYangZhuoJi;
                    break;
                case  MjClient.GAME_TYPE.GUI_ZHOU_GUI_YANG_ZHUO_JI:
                    MjClient.majiang = MjClient.majiang_guizhouGuiYangZhuoJi;
                    break;
                case  MjClient.GAME_TYPE.GUI_ZHOU_MEN_HU_XUE_LIU:
                    MjClient.majiang = MjClient.majiang_guizhouMenHuXueLiu;
                    break;
                case MjClient.GAME_TYPE.XIANG_XI_96POKER:
                    MjClient.majiang = MjClient.majiang_96poker;
                    break;
                case MjClient.GAME_TYPE.XU_PU_LAO_PAI:
                    MjClient.majiang = MjClient.majiang_shuPuLaoPai;
                    break;
                case MjClient.GAME_TYPE.XU_PU_PAO_HU_ZI:
                    MjClient.majiang = MjClient.majiang_xuPuPaoHuZi;
                    break;
                case MjClient.GAME_TYPE.ER_REN_YI_FANG_MJ:
                    MjClient.majiang = MjClient.majiang_erRenYiFang;
                    break;
                case MjClient.GAME_TYPE.HONG_ZE_MA_JIANG:
                    MjClient.majiang = MjClient.majiang_HongZeMaJiang;
                    break;
                case MjClient.GAME_TYPE.SHAN_XI_GAN_DENG_YAN:
                    MjClient.majiang = MjClient.majiang_GanDengYan;
                    break;
                case MjClient.GAME_TYPE.YI_CHANG_XUE_LIU_MJ:
                    MjClient.majiang = MjClient.majiang_yiChangXueLiu;
                    break;
                case MjClient.GAME_TYPE.EN_SHI_MA_JIANG:
                    MjClient.majiang = MjClient.majiang_enShi;
                    break;
                case MjClient.GAME_TYPE.PAO_DE_KUAI_HBTY:
                    MjClient.majiang = MjClient.majiang_PaodekuaiHBTY;
                    break;
                case MjClient.GAME_TYPE.DA_YE_ZI_PAI:
                    MjClient.majiang = MjClient.majiang_daYeZiPai;
                    break;
                case MjClient.GAME_TYPE.DANG_YANG_FAN_JING:
                    MjClient.majiang = MjClient.majiang_dangYangFanJing;
                    break;
                case MjClient.GAME_TYPE.JING_ZHOU_MA_JIANG:
                    MjClient.majiang = MjClient.majiang_jingZhouMaJiang;
                    break;
                case MjClient.GAME_TYPE.CHONG_YANG_MJ:
                    MjClient.majiang = MjClient.majiang_chongYangMJ;
                    break;
                case MjClient.GAME_TYPE.HUANG_SHI_HH_MJ:
                    MjClient.majiang = MjClient.majiang_huangShiHHMJ;
                    break;
                case MjClient.GAME_TYPE.QI_CHUN_HH_MJ:
                    MjClient.majiang = MjClient.majiang_qiChunHHMJ;
                    break;
                case MjClient.GAME_TYPE.TONG_CHENG_MJ:
                    MjClient.majiang = MjClient.majiang_tongChengMaJiang;
                    break;
                case MjClient.GAME_TYPE.YI_CHANG_SHANG_DA_REN:
                    MjClient.majiang = MjClient.majiang_yiChangShangDaRen;
                    break;
                case MjClient.GAME_TYPE.HU_BEI_HUA_PAI:
                    MjClient.majiang = MjClient.majiang_huBeiHuaPai;
                    break;
                case MjClient.GAME_TYPE.YANG_XIN_MA_JIANG:
                    MjClient.majiang = MjClient.majiang_yangXin;
                    break;
                case MjClient.GAME_TYPE.TONG_SHAN_HH_MJ:
                    MjClient.majiang = MjClient.majiang_tongShanHuangHuang;
                    break;
                case MjClient.GAME_TYPE.JIANG_LING_HONGZHONG:
                    MjClient.majiang = MjClient.majiang_jiangLingHongZhong;
                    break;
                case MjClient.GAME_TYPE.SHI_SHOU_AI_HUANG:
                    MjClient.majiang = MjClient.majiang_shiShouAiHuang;
                    break;
                case MjClient.GAME_TYPE.QIAN_JIANG_HH_MJ:
                    MjClient.majiang = MjClient.majiang_qianJiangHHMJ;
                    break;
                case MjClient.GAME_TYPE.GONG_AN_HUA_PAI:
                    MjClient.majiang = MjClient.majiang_gongAnHuaPai;
                    break;
                case MjClient.GAME_TYPE.WU_XUE_MJ:
                    MjClient.majiang = MjClient.majiang_wuXueMJ;
                    break;
                case MjClient.GAME_TYPE.QI_CHUN_GD_MJ:
                    MjClient.majiang = MjClient.majiang_qiChunGuangDong;
                    break;
                case MjClient.GAME_TYPE.TONG_CHENG_GE_ZI_PAI:
                    MjClient.majiang = MjClient.majiang_tongChengGeZiPai;
                    break;
                case MjClient.GAME_TYPE.EN_SHI_SHAO_HU:
                    MjClient.majiang = MjClient.majiang_enShiShaoHu;
                    break;
                case MjClient.GAME_TYPE.QI_CHUN_HONG_ZHONG_GANG:
                    MjClient.majiang = MjClient.majiang_qiChunHongZhongGang;
                    break;
                case MjClient.GAME_TYPE.WU_XUE_510K:
                    MjClient.majiang = MjClient.poker_WuXue510K;
                    break;
            }

            MjClient.data.sData = d;

            //金币场使用用户信息的金币
            if(MjClient.data.sData.tData.fieldId) {
                var pl = getUIPlayer(0);
                if (pl){
                    pl.info.gold = MjClient.data.pinfo.gold;
                }
                if (!MjClient._LAST_FIELD){
                    MjClient._LAST_FIELD = {fieldId:MjClient.data.sData.tData.fieldId};
                }
            }

            if(MjClient.GAME_TYPE.EN_SHI_MA_JIANG == d.tData.gameType || MjClient.GAME_TYPE.QI_CHUN_HONG_ZHONG_GANG == d.tData.gameType){
                var sData = MjClient.data.sData;
                for(var uid in d.players){
                    var player = sData.players[uid];
                    if(!player.hasOwnProperty("mjPiZiGang")){
                        player.mjPiZiGang = [];
                    }
                }
            }
            if(MjClient.GAME_TYPE.DA_YE_KAI_KOU_FAN == d.tData.gameType ||
                MjClient.GAME_TYPE.HONG_ZHONG_LAI_ZI_GANG == d.tData.gameType){
                var sData = MjClient.data.sData;
                for(var uid in d.players){
                    var player = sData.players[uid];
                    if(!player.hasOwnProperty("rateGangList")){
                        player.mjPiZiGang = [];
                    }else {
                        player.mjPiZiGang = d.players[uid].rateGangList;
                    }
                }
            }

            //安化麻将重连回来听牌状态下摸到王牌不能过(宁乡开王麻将根据听的状态判断是否报听了)
            if(MjClient.gameType === MjClient.GAME_TYPE.AN_HUA_MA_JIANG || 
                MjClient.gameType === MjClient.GAME_TYPE.AN_HUA_MA_JIANG_SW ||
                MjClient.gameType === MjClient.GAME_TYPE.NING_XIANG_KAI_WANG || 
                MjClient.gameType === MjClient.GAME_TYPE.TAO_JIANG_MA_JIANG || 
                MjClient.gameType == MjClient.GAME_TYPE.YI_YANG_MA_JIANG)
            {
                var sData = MjClient.data.sData;
                if (sData) {
                    var tData = sData.tData;
                    for (var uid in d.players) {
                        var pl = sData.players[uid];
                        if (pl && pl.newSendCard && tData && tData.gangAddCard && tData.gangAddCard.length == 0) {
                            pl.newCd = pl.newSendCard;
                        }else if(pl && pl.newSendCard && tData && tData.gangAddCard && tData.gangAddCard.length != 0){
                            pl.newCd = 0;
                        }

                        if((MjClient.gameType === MjClient.GAME_TYPE.NING_XIANG_KAI_WANG || MjClient.gameType === MjClient.GAME_TYPE.TAO_JIANG_MA_JIANG
                            || MjClient.gameType === MjClient.GAME_TYPE.YI_YANG_MA_JIANG) && pl.tingStatus == 1){
                            pl.isTing = true;
                        }
                    }
                }
            }
            if(MjClient.gameType === MjClient.GAME_TYPE.HUAI_HUA_MA_JIANG || MjClient.gameType === MjClient.GAME_TYPE.JING_ZHOU_MA_JIANG){
                var sData = MjClient.data.sData;
                var pl = sData.players[sData.tData.uids[sData.tData.curPlayer]];
                if (pl) {
                    pl.newCd = pl.newSendCard;
                }
            }
            //获取服务器与本地的时间差
            MjClient.timeBetween = d.serverNow  - new Date().getTime();

            //初始化断线重连时间
            var sData = MjClient.data.sData;
            if (sData) {
                for (var uid in d.players) {
                    var PL = sData.players[uid];
                    if (PL) {

                        if(SelfUid() == uid) PL.onLine = true; //自己断线重连回来肯定是在先状态

                        if (!PL.onLine)
                        {
                            if(!PL.lastOffLineTime || PL.lastOffLineTime < 0) PL.lastOffLineTime = new Date().getTime();
                            PL.offLineTime = PL.lastOffLineTime - MjClient.timeBetween;//new Date().getTime();
                            if(!PL.offLineTime || PL.offLineTime < 0) PL.offLineTime = new Date().getTime();
                            //cc.log(uid + "= uid==============================PL.lastOffLineTime = " + PL.lastOffLineTime);
                        }
                        else {
                            delete PL.offLineTime;
                        }


                        if(d.players[uid].mjhandFour && d.players[uid].mjhandFour.length > 0)
                        {
                            PL.cardFourCount = d.players[uid].mjhandFour.length;
                            PL.mjhandFour = d.players[uid].mjhandFour;
                        }

                        PL.gangFourCounts = d.players[uid].gangFourCounts;
                        PL.pengFourCounts = d.players[uid].pengFourCounts;

                        if(PL.qiang)
                            PL.qiang = d.players[uid].qiang;

                    }
                }
            }

            d.serverNow -= Date.now();

            //清空客户端游戏场景的自身数据
            if (MjClient.data.c_Data)
                delete MjClient.data.c_Data;

            // 字牌初始化MjClient.HandCardArr数据
            if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_HU_ZI) {
                if (MjClient.majiang.sortCard) {
                    var pl = sData.players[SelfUid()];
                    var tData = sData.tData;
                    if (MjClient.gameType == MjClient.GAME_TYPE.DANG_YANG_FAN_JING ||
                        MjClient.gameType == MjClient.GAME_TYPE.YI_CHANG_SHANG_DA_REN) {
                        var isCurDraw = tData.putType == 1 && tData.curPlayer == tData.uids.indexOf(SelfUid());
                        MjClient.HandCardArr = MjClient.majiang.sortCard(pl.mjhand || [], isCurDraw);
                    } else if (MjClient.gameType == MjClient.GAME_TYPE.HU_BEI_HUA_PAI ||
                        MjClient.gameType == MjClient.GAME_TYPE.GONG_AN_HUA_PAI ||
                        MjClient.gameType == MjClient.GAME_TYPE.TONG_CHENG_GE_ZI_PAI) {
                        var isCurDraw = tData.putType == 1 && tData.curPlayer == tData.uids.indexOf(SelfUid());
                        MjClient.HandCardArr = MjClient.majiang.sortCard(pl.mjhand || [], pl.mjgang1 || [], isCurDraw);
                    } else {
                        MjClient.HandCardArr = MjClient.majiang.sortCard(pl.mjhand || [], 1);
                    }
                }
            }
            if (!MjClient.playui)
            {
                if (false && cc.sys.OS_WINDOWS != cc.sys.os)
                    sortSearchPath(MjClient.gameType);
                else
                    setSearchPath(MjClient.gameType);

                // 清空听牌数据
                MjClient.canTingCards = null;

                cc.log("MjClient.gameType    ",MjClient.gameType);
                //加载游戏界面
                switch(MjClient.gameType){
                    case MjClient.GAME_TYPE.SHU_YANG:
                        MjClient.Scene.addChild(new PlayLayer_shuyang());
                        break;
                    case  MjClient.GAME_TYPE.LIAN_YUN_GANG:
                        MjClient.Scene.addChild(new PlayLayer_LYG());
                        break;
                    case  MjClient.GAME_TYPE.GUAN_YUN:
                        MjClient.Scene.addChild(new PlayLayer_guanyun());
                        break;
                    case MjClient.GAME_TYPE.GUAN_NAN:
                        MjClient.Scene.addChild(new PlayLayer_guannan());
                        break;
                    case  MjClient.GAME_TYPE.DONG_HAI:
                        MjClient.Scene.addChild(new PlayLayer_donghai());
                        break;
                    case  MjClient.GAME_TYPE.NAN_JING:
                        MjClient.Scene.addChild(new PlayLayer_nanjing());
                        break;
                    case  MjClient.GAME_TYPE.SU_QIAN:
                        MjClient.Scene.addChild(new PlayLayer_suqian());
                        break;
                    case  MjClient.GAME_TYPE.NIU_NIU://牛牛
                        MjClient.Scene.addChild(new PlayLayer_niuniu());
                        break;
                    case  MjClient.GAME_TYPE.HUAI_AN:
                        MjClient.Scene.addChild(new PlayLayer_huaian());
                        break;
                    case  MjClient.GAME_TYPE.HA_HONGZHONG:
                        MjClient.Scene.addChild(new PlayLayer_HAHZ());
                        break;
                    case  MjClient.GAME_TYPE.HA_14DUN:
                        MjClient.Scene.addChild(new PlayLayer_HA14D());
                        break;
                    case MjClient.GAME_TYPE.XIN_PU_HZ:
                        MjClient.Scene.addChild(new PlayLayer_HZMJ);
                        break;
                    case MjClient.GAME_TYPE.NTHZ:
                        MjClient.Scene.addChild(new PlayLayer_NTHZ);
                        break;
                    case  MjClient.GAME_TYPE.XU_ZHOU:
                        MjClient.Scene.addChild(new PlayLayer_xuzhou());
                        break;
                    case  MjClient.GAME_TYPE.TONG_HUA:
                        MjClient.Scene.addChild(new PlayLayer_tonghua());
                        break;
                    case MjClient.GAME_TYPE.CHANG_SHA:
                        if (MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ
                           || MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP ||
                            MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ
                            ) {
                            MjClient.Scene.addChild(new majiang_panel_changSha());
                        }
                        // else if(MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP){
                        //     if (Number(SelfUid()) % 2 == 0) {
                        //         MjClient.Scene.addChild(new majiang_panel_changSha());
                        //     }else{
                        //         MjClient.Scene.addChild(new PlayLayer_changSha());
                        //     }
                        // }
                        else {
                            MjClient.Scene.addChild(new PlayLayer_changSha());
                        }
                        break;
                    case  MjClient.GAME_TYPE.XIANG_YIN_TUI_DAO_HU:
                            MjClient.Scene.addChild(new majiang_panel_xiangyintuidaohu());
                        break;
                    case  MjClient.GAME_TYPE.PING_JIANG_ZHA_NIAO:
                        //if (Number(SelfUid()) % 2 == 0) {
                           // MjClient.Scene.addChild(new majiang_panel_pingjiangzhaniao());
                        //}else{
                            MjClient.Scene.addChild(new PlayLayer_pingjiangzhaniao());
                        //}
                        break;
                    case  MjClient.GAME_TYPE.TUAN_TUAN_ZHUAN:
                        MjClient.Scene.addChild(new PlayLayer_tuantuanzhuan());
                        break;
                    case MjClient.GAME_TYPE.PAO_DE_KUAI:
                        MjClient.Scene.addChild(new PlayLayer_paodekuai());
                        break;
                    case MjClient.GAME_TYPE.PAO_DE_KUAI_TY:
                        if(typeof(GoldField_PlayLayer_PaoDeKuaiTY) != 'undefined' && MjClient.data.sData && MjClient.data.sData.tData && MjClient.data.sData.tData.fieldId){
                            cc.log("into GoldField_PlayLayer_PaoDeKuaiTY");
                            MjClient.Scene.addChild(new GoldField_PlayLayer_PaoDeKuaiTY());
                        }else{
                            MjClient.Scene.addChild(new PlayLayer_PaoDeKuaiTY());
                        }
                        break;
                        case MjClient.GAME_TYPE.PAO_DE_KUAI_ZERO:
                        MjClient.Scene.addChild(new PlayLayer_PaoDeKuaiZERO());
                        break;
                    case MjClient.GAME_TYPE.PAO_DE_KUAI_ELEVEN:
                        MjClient.Scene.addChild(new PlayLayer_PaoDeKuai11());
                        break;
                    case MjClient.GAME_TYPE.PAO_DE_KUAI_JZ:
                        MjClient.Scene.addChild(new PlayLayer_PaoDeKuaiJZ());
                        break;
                    case MjClient.GAME_TYPE.PAO_DE_KUAI_HA:
                        MjClient.Scene.addChild(new PlayLayer_PaoDeKuaiHuaian());
                        break;
                    case MjClient.GAME_TYPE.PAO_DE_KUAI_HBTY:
                        MjClient.Scene.addChild(new PlayLayer_PaoDeKuaiHBTY());
                        break;    
                    case  MjClient.GAME_TYPE.HY_SHI_HU_KA:
                        if(MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || 
                            MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ)
                        {
                            MjClient.Scene.addChild(new PlayLayer_ShiHuKa());
                        }else if(MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP){
                            MjClient.Scene.addChild(new PlayLayer_bdhyShiHuKa());
                        }else if(MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ){
                            MjClient.Scene.addChild(new playPanel_syShiHuKa());
                        }else if (MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) {
                            MjClient.Scene.addChild(new PlayLayer_ylShiHuKa());
                        }
                        else{
                            MjClient.Scene.addChild(new PlayLayer_hyShiHuKa());
                        }
                        break;
                    case MjClient.GAME_TYPE.PAO_DE_KUAI_HUAIAN_NEW:
                        MjClient.Scene.addChild(new PlayLayer_PaoDeKuaiHuaianNew());
                        break;
                    case MjClient.GAME_TYPE.PAO_DE_KUAI_XIANG_SHUI:
                        MjClient.Scene.addChild(new PlayLayer_PaoDeKuaiXS());
                        break;
                    case MjClient.GAME_TYPE.PAO_DE_KUAI_LYG:
                        MjClient.Scene.addChild(new PlayLayer_PaoDeKuaiLYG());
                        break;
                    case MjClient.GAME_TYPE.PAO_DE_KUAI_NT:
                        MjClient.Scene.addChild(new PlayLayer_paoDeKuaiNT());
                        break;
                    case MjClient.GAME_TYPE.PAO_DE_KUAI_HAIAN:
                        MjClient.Scene.addChild(new PlayLayer_paodekuaiHaian());
                        break;
                    case MjClient.GAME_TYPE.PAO_DE_KUAI_XU_ZHOU:
                        MjClient.Scene.addChild(new PlayLayer_paodekuaiXuzhou());
                        break;
                    case MjClient.GAME_TYPE.PAO_DE_KUAI_HBTY:
                        MjClient.Scene.addChild(new PlayLayer_paodekuaiHBTY());
                        break;
                    case MjClient.GAME_TYPE.CHONG_YANG_HUA_QUAN_JIAO:
                        MjClient.Scene.addChild(new PlayLayer_chongYangHuaQuanJiao());
                        break;    
                    case MjClient.GAME_TYPE.SAN_DA_HA:
                        MjClient.Scene.addChild(new PlayLayer_sanDaHa());
                        break;
                    case MjClient.GAME_TYPE.YONG_ZHOU_BAO_PAI:
                        MjClient.Scene.addChild(new PlayLayer_baoPaiYZ());
                        break;
                    case MjClient.GAME_TYPE.XIANG_TAN_SAN_DA_HA:
                        MjClient.Scene.addChild(new PlayLayer_sanDaHaXiangTan());
                        break;
                    case MjClient.GAME_TYPE.SAN_DA_HA_NEW:
                        MjClient.Scene.addChild(new PlayLayer_sanDaHaNew());
                        break;
                    case MjClient.GAME_TYPE.LV_LIANG_DA_QI:
                        MjClient.Scene.addChild(new PlayLayer_daQi());
                        break;
                    case  MjClient.GAME_TYPE.PAO_HU_ZI:
                        if(MjClient.APP_TYPE.QXSYDTZ == MjClient.getAppType()){
                            MjClient.Scene.addChild(new PlayPanel_cheHuZi());
                        }else{  
                            MjClient.Scene.addChild(new PlayLayer_paohuzi());
                        }
                        break;
                    case  MjClient.GAME_TYPE.PAO_HU_ZI_SR:
                        if(MjClient.APP_TYPE.QXSYDTZ == MjClient.getAppType()){
                            MjClient.Scene.addChild(new PlayPanel_cheHuZi());
                        }else{  
                            MjClient.Scene.addChild(new PlayLayer_paohuzi_SR());
                        }
                        break;
                    case  MjClient.GAME_TYPE.SI_YANG:
                        MjClient.Scene.addChild(new PlayLayer_siyang());
                        break;
                    case  MjClient.GAME_TYPE.XIN_SI_YANG:
                        MjClient.Scene.addChild(new PlayLayer_siyang_New());
                        break;
                    case  MjClient.GAME_TYPE.SI_YANG_HH:
                        MjClient.Scene.addChild(new PlayLayer_siyanghh());
                        break;
                    case  MjClient.GAME_TYPE.YAN_CHENG_HH:
                        MjClient.Scene.addChild(new PlayLayer_yanchenghh());
                        break;
                    case  MjClient.GAME_TYPE.RU_GAO:
                        MjClient.Scene.addChild(new PlayLayer_rugao());
                        break;
                    case  MjClient.GAME_TYPE.GAN_YU:
                        MjClient.Scene.addChild(new PlayLayer_ganyu());
                        break;
                    case MjClient.GAME_TYPE.HUAI_AN_TTZ:
                        MjClient.Scene.addChild(new PlayLayer_huaianTTZ);
                        break;
                    case  MjClient.GAME_TYPE.RU_GAO_MJH:
                        MjClient.Scene.addChild(new PlayLayer_rugaoMJH());
                        break;
                    case MjClient.GAME_TYPE.HUAI_AN_CC:
                        MjClient.Scene.addChild(new PlayLayer_huaianCC());
                        break;
                    case MjClient.GAME_TYPE.HZ_TUI_DAO_HU:
                        MjClient.Scene.addChild(new PlayLayer_HZTDH());
                        break;
                    case MjClient.GAME_TYPE.HUAI_AN_ERZ:
                        MjClient.Scene.addChild(new PlayLayer_huaianERZ());
                        break;
                    case MjClient.GAME_TYPE.LUO_DI_SAO:
                        if(MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ){
                            MjClient.Scene.addChild(new PlayPanel_luoDiSao);
                        }else{
                            MjClient.Scene.addChild(new PlayLayer_liuhusao);
                        }
                        break;
                    case MjClient.GAME_TYPE.DOU_DI_ZHU_NT:
                        MjClient.Scene.addChild(new PlayLayer_doudizhu());
                        break;
                    case MjClient.GAME_TYPE.HUAI_AN_DOU_DI_ZHU:
                        MjClient.Scene.addChild(new PlayLayer_doudizhuHuaiAn());
                        break;
                    case MjClient.GAME_TYPE.LIAN_SHUI:
                        MjClient.Scene.addChild(new PlayLayer_Lianshui());
                        break;
                    case  MjClient.GAME_TYPE.TY_HONGZHONG:
                        if (MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ) {
                            MjClient.Scene.addChild(new majiang_panel_SYHZ());
                        } else {
                            MjClient.Scene.addChild(new PlayLayer_TYHZ());
                        }
                        break;
                    case  MjClient.GAME_TYPE.ML_HONGZHONG:
                        //wj 添加湖北
                        if(MjClient.getAppType() === MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() === MjClient.APP_TYPE.HUBEIMJ){
                            MjClient.Scene.addChild(new majiang_panel_MLHZ());
                        }else{
                            MjClient.Scene.addChild(new PlayLayer_MLHZ());
                        }
                        break;
                    case  MjClient.GAME_TYPE.ML_HONGZHONG_ZERO:
                        if(typeof(GoldField_PlayLayer_MLHZ) != 'undefined' && MjClient.data.sData && MjClient.data.sData.tData && MjClient.data.sData.tData.fieldId){
                            cc.log("into GoldField_PlayLayer_MLHZ");
                            MjClient.Scene.addChild(new GoldField_PlayLayer_MLHZ());
                        }else{
                            MjClient.Scene.addChild(new PlayLayer_MLHZ_AI());
                        }

                        break;
                    case  MjClient.GAME_TYPE.NING_XIANG_MJ:
                        MjClient.Scene.addChild(new PlayLayer_ningxiang());
                        break;
                    case  MjClient.GAME_TYPE.NAN_XIAN_MJ:
                        MjClient.Scene.addChild(new PlayLayer_nanxian());
                        break;
                    case  MjClient.GAME_TYPE.YUAN_JIANG_MJ:
                        MjClient.Scene.addChild(new PlayLayer_yuanjiang());
                        break;
                    case  MjClient.GAME_TYPE.CHEN_ZHOU:
                        MjClient.Scene.addChild(new PlayLayer_chenzhou());
                        break;
                    case  MjClient.GAME_TYPE.MJ_ZHUO_XIA_ZI:
                        MjClient.Scene.addChild(new PlayLayer_zhuoxiazi());
                        break;
                    case  MjClient.GAME_TYPE.CHAO_GU_MJ:
                        MjClient.Scene.addChild(new PlayLayer_chaogu());
                        break;
                    case MjClient.GAME_TYPE.WU_XUE_GE_BAN:
                        MjClient.Scene.addChild(new PlayLayer_WuXueGeBan());
                        break;
                    case MjClient.GAME_TYPE.DOU_DI_ZHU_TY:
                        MjClient.Scene.addChild(new PlayLayer_doudizhuTongYong());
                        break;
                    case MjClient.GAME_TYPE.DOU_DI_ZHU_HBTY:
                        MjClient.Scene.addChild(new PlayLayer_doudizhuHBTY());
                        break;  
                    case MjClient.GAME_TYPE.DOU_DI_ZHU_QC:
                        MjClient.Scene.addChild(new PlayLayer_doudizhuQC());
                        break;                       
                    case  MjClient.GAME_TYPE.TY_ZHUANZHUAN:
                        if (MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ 
                             || MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP
                            ) {
                            MjClient.Scene.addChild(new majiang_panel_TYZZ());
                        }
                        else{
                            MjClient.Scene.addChild(new PlayLayer_TYZZ());
                        }
                        break;
                    case  MjClient.GAME_TYPE.BAI_PU_LIN_ZI:
                        MjClient.Scene.addChild(new PlayLayer_BPLZ());
                        break;
                    case  MjClient.GAME_TYPE.RU_GAO_SHUANG_JIANG:
                        MjClient.Scene.addChild(new PlayLayer_rugao_SJ());
                        break;
                    case  MjClient.GAME_TYPE.HAI_AN_MJ:
                        MjClient.Scene.addChild(new PlayLayer_haian());
                        break;
                    case  MjClient.GAME_TYPE.XUE_ZHAN:
                        MjClient.Scene.addChild(new PlayLayer_xuezhanMJ());
                        break;
                    case  MjClient.GAME_TYPE.XUE_LIU:
                        MjClient.Scene.addChild(new PlayLayer_xueliu());
                        break;
                    case  MjClient.GAME_TYPE.HAI_AN_BAI_DA:
                        MjClient.Scene.addChild(new PlayLayer_haianbaida());
                        break;
                    case  MjClient.GAME_TYPE.JIN_ZHONG_MJ:
                        MjClient.Scene.addChild(new PlayLayer_jinzhong());
                        break;
                    case MjClient.GAME_TYPE.DOU_DI_ZHU_JZ:
                        if(typeof(GoldField_PlayLayer_doudizhuJZ) != 'undefined' && MjClient.data.sData && MjClient.data.sData.tData && MjClient.data.sData.tData.fieldId){
                            cc.log("into GoldField_PlayLayer_doudizhuJZ");
                            MjClient.Scene.addChild(new GoldField_PlayLayer_doudizhuJZ());
                        }else{
                            MjClient.Scene.addChild(new PlayLayer_doudizhuJZ());
                        }
                        break;
                    case MjClient.GAME_TYPE.DOU_DI_ZHU_GZ:
                        MjClient.Scene.addChild(new PlayLayer_doudizhuGZ());
                        break;
                    case MjClient.GAME_TYPE.DOU_DI_ZHU_ZERO:
                        MjClient.Scene.addChild(new PlayLayer_doudizhuZERO());
                        break;
                    case MjClient.GAME_TYPE.DOU_DI_ZHU_DA_TONG:
                        MjClient.Scene.addChild(new PlayLayer_doudizhuDaTong());
                        break;
                    case MjClient.GAME_TYPE.DOU_DI_ZHU_XIN_ZHOU:
                        MjClient.Scene.addChild(new PlayLayer_doudizhuXinZhou());
                        break;
                    case MjClient.GAME_TYPE.DOU_DI_ZHU_HA:
                        MjClient.Scene.addChild(new PlayLayer_doudizhuHA());
                        break;
                    case  MjClient.GAME_TYPE.RU_DONG_SHUANG_JIANG:
                        MjClient.Scene.addChild(new PlayLayer_rudong());
                        break;
                    case  MjClient.GAME_TYPE.JIN_ZHONG_KD:
                        MjClient.Scene.addChild(new PlayLayer_koudian());
                        break;
                    case  MjClient.GAME_TYPE.YUN_CHENG_TIE_JIN:
                        MjClient.Scene.addChild(new PlayLayer_yunchengtiejin());
                        break;
                    case  MjClient.GAME_TYPE.HE_JIN_KUN_JIN:
                        MjClient.Scene.addChild(new PlayLayer_hejinkunjin());
                        break;
                    case  MjClient.GAME_TYPE.JING_LE_KOU_DIAN:
                        MjClient.Scene.addChild(new PlayLayer_jingle());
                        break;
                    case  MjClient.GAME_TYPE.LV_LIANG_MA_JIANG:
                        MjClient.Scene.addChild(new PlayLayer_lvliangmajiang());
                        break;
                    case  MjClient.GAME_TYPE.ZHUO_HAO_ZI:
                        MjClient.Scene.addChild(new PlayLayer_zhuohaozi());
                        break;
                    case  MjClient.GAME_TYPE.RU_GAO_ER:
                        MjClient.Scene.addChild(new PlayLayer_rugaoER());
                        break;
                    case  MjClient.GAME_TYPE.JIN_ZHONG_TUI_DAO_HU:
                        MjClient.Scene.addChild(new PlayLayer_tuidaohu());
                        break;
                    case  MjClient.GAME_TYPE.LING_SHI_BIAN_LONG:
                        MjClient.Scene.addChild(new PlayLayer_lingshibianlong());
                        break;
                    case  MjClient.GAME_TYPE.LING_SHI_BAN_MO:
                        MjClient.Scene.addChild(new PlayLayer_lingshibanmo());
                        break;
                    case  MjClient.GAME_TYPE.PING_YAO_KOU_DIAN:
                        MjClient.Scene.addChild(new PlayLayer_pingyaokoudian());
                        break;
                    case  MjClient.GAME_TYPE.PING_YAO_MA_JIANG:
                        MjClient.Scene.addChild(new PlayLayer_pingyaomajiang());
                        break;
                    case  MjClient.GAME_TYPE.JIE_XIU_1_DIAN_3:
                        MjClient.Scene.addChild(new PlayLayer_jiexiuyidiansan());
                        break;
                    case  MjClient.GAME_TYPE.JIE_XIU_KOU_DIAN:
                        MjClient.Scene.addChild(new PlayLayer_jiexiukoudian());
                        break;
                    case  MjClient.GAME_TYPE.JIN_ZHONG_GUAI_SAN_JIAO:
                        MjClient.Scene.addChild(new PlayLayer_guaisanjiao());
                        break;
                    case  MjClient.GAME_TYPE.SHOU_YANG_QUE_KA:
                        MjClient.Scene.addChild(new PlayLayer_shouyangqueka());
                        break;
                    case  MjClient.GAME_TYPE.LV_LIANG_KOU_DIAN:
                        MjClient.Scene.addChild(new PlayLayer_lvliangkoudian());
                        break;
                    case  MjClient.GAME_TYPE.JIN_ZHONG_LI_SI:
                        MjClient.Scene.addChild(new PlayLayer_jinzhonglisi());
                        break;
                    case  MjClient.GAME_TYPE.HONG_TONG_WANG_PAI:
                        MjClient.Scene.addChild(new PlayLayer_hongtongwangpai());
                        break;
                    case  MjClient.GAME_TYPE.LIN_FEN_YING_SAN_ZUI:
                        MjClient.Scene.addChild(new PlayLayer_linfenyingsanzui());
                        break;
                    case MjClient.GAME_TYPE.DOU_DI_ZHU_LIN_FEN:
                        MjClient.Scene.addChild(new PlayLayer_doudizhuLF());
                        break;
                    case MjClient.GAME_TYPE.LIN_FEN_YI_MEN_ZI:
                        MjClient.Scene.addChild(new PlayLayer_linfenyimenzi());
                        break;
                    case MjClient.GAME_TYPE.FEN_XI_YING_KOU:
                        MjClient.Scene.addChild(new PlayLayer_fenxiyingkou());
                        break;
                    case MjClient.GAME_TYPE.JI_XIAN_1928_JIA_ZHANG:
                        MjClient.Scene.addChild(new PlayLayer_linfenjixian());
                        break;
                    case MjClient.GAME_TYPE.ML_HONG_ZI:
                        MjClient.Scene.addChild(new playPanel_Hongzi());
                        // if(Number(SelfUid()) % 2 == 0){
                        //     MjClient.Scene.addChild(new PlayLayer_HongZi());
                        // }else{
                        //     MjClient.Scene.addChild(new playPanel_Hongzi());
                        // }
                        break;
                    case MjClient.GAME_TYPE.YUE_YANG_WAI_HU_ZI:
                        MjClient.Scene.addChild(new playLayer_yueYangWaiHuZi());
                        /*if(Number(SelfUid()) % 2 == 0){
                            MjClient.Scene.addChild(new playLayer_yueYangWaiHuZi());
                         }else{
                            MjClient.Scene.addChild(new PlayLayer_YueYangWaiHuZi());
                         }*/
                        break;
                    case MjClient.GAME_TYPE.YI_YANG_WAI_HU_ZI:
                        MjClient.Scene.addChild(new playLayer_yiYangWaiHuZi());
                        /*if(Number(SelfUid()) % 2 == 0){
                            MjClient.Scene.addChild(new playLayer_yiYangWaiHuZi());
                        }else{
                            MjClient.Scene.addChild(new PlayLayer_YiYangWaiHuZi());
                        }*/
                        break;
                    case MjClient.GAME_TYPE.NAN_XIAN_GUI_HU_ZI: 
                         MjClient.Scene.addChild(new playPanel_nanXianGuiHuZi());
                  

                        // MjClient.Scene.addChild(new PlayLayer_NanXianGuiHuZi());
                        break;
                    case MjClient.GAME_TYPE.YUAN_JIANG_GUI_HU_ZI:
                        if(MjClient.APP_TYPE.QXYYQP == MjClient.getAppType()){
                            MjClient.Scene.addChild(new PlayPanel_YuanJiangGuiHuZi());
                        }else
                            MjClient.Scene.addChild(new PlayLayer_YuanJiangGuiHuZi());
                        break;
                    case MjClient.GAME_TYPE.XIANG_YIN_ZHUO_HONG_ZI:
                        MjClient.Scene.addChild(new playPanel_xyHongZi);
                        break;
                    case MjClient.GAME_TYPE.LIN_FEN_XIANG_NING_SHUAI_JIN:
                        MjClient.Scene.addChild(new PlayLayer_xiangningshuaijin());
                        break;
                    case MjClient.GAME_TYPE.LIN_FEN_KOU_DIAN_FENG_ZUI_ZI:
                        MjClient.Scene.addChild(new PlayLayer_linfenkoudianfengzuizi());
                        break;
                    case MjClient.GAME_TYPE.JIN_ZHONG_CAI_SHEN:
                        MjClient.Scene.addChild(new PlayLayer_jinzhongcaishen());
                        break;
                    case MjClient.GAME_TYPE.XIAO_YI_KOU_DIAN:
                        MjClient.Scene.addChild(new PlayLayer_xiaoyikoudian());
                        break;
                    case MjClient.GAME_TYPE.XU_ZHOU_PEI_XIAN:
                        MjClient.Scene.addChild(new PlayLayer_xuzhoupeixian());
                        break;
                    case MjClient.GAME_TYPE.DOU_DI_ZHU_LV_LIANG:
                        MjClient.Scene.addChild(new PlayLayer_doudizhuLvLiang());
                        break;
                    case MjClient.GAME_TYPE.FAN_SHI_XIA_YU:
                        MjClient.Scene.addChild(new PlayLayer_fanshixiayu());
                        break;
                    case MjClient.GAME_TYPE.DAI_XIAN_MA_JIANG:
                        MjClient.Scene.addChild(new PlayLayer_daixian());
                        break;
                    case MjClient.GAME_TYPE.YUE_YANG_HONG_ZHONG:
                        if(MjClient.APP_TYPE.QXYYQP == MjClient.getAppType())
                            MjClient.Scene.addChild(new majiang_panel_yueYangHongZhong());
                        else
                            MjClient.Scene.addChild(new PlayLayer_yueyanghongzhong());
                        break;
                    case MjClient.GAME_TYPE.YUE_YANG_SAN_DA_HA:
                        MjClient.Scene.addChild(new PlayLayer_sanDaHaYueyang());
                        break;
                    case  MjClient.GAME_TYPE.WU_TAI_KOU_DIAN:
                        MjClient.Scene.addChild(new PlayLayer_wutaikoudian());
                        break;
                    case MjClient.GAME_TYPE.XIN_ZHOU_SAN_DA_ER:
                        MjClient.Scene.addChild(new PlayLayer_XinZhouSanDaEr());
                        break;
                    case MjClient.GAME_TYPE.DA_NING_SHUAI_JIN:
                        MjClient.Scene.addChild(new PlayLayer_daningshuaijin());
                        break;
                    case MjClient.GAME_TYPE.YUE_YANG_FU_LU_SHOU:
                    case MjClient.GAME_TYPE.FU_LU_SHOU_ER_SHI_ZHANG:
                        MjClient.Scene.addChild(new PlayLayer_fuLuShou);
                        break;
                    case MjClient.GAME_TYPE.FEN_YANG_QUE_MEN:
                        MjClient.Scene.addChild(new PlayLayer_fenyangquemen());
                        break;
                    case MjClient.GAME_TYPE.DA_TONG_GUAI_SAN_JIAO:
                        MjClient.Scene.addChild(new PlayLayer_datongguaisanjiao());
                        break;
                    case MjClient.GAME_TYPE.YY_AN_HUA_PAO_HU_ZI:
                        //金币场暂时走旧版
                        if (MjClient.data.sData.tData.fieldId) {
                            MjClient.Scene.addChild(new PlayLayer_ahPaoHuZi());
                        }else{
                            MjClient.Scene.addChild(new playPanel_ahPaoHuZi());
                        }
                        break;
                    case MjClient.GAME_TYPE.AN_HUA_PAO_HU_ZI:
                        MjClient.Scene.addChild(new playPanel_syAhPaoHuZi());
                        break;
                    case MjClient.GAME_TYPE.LUAN_GUA_FENG:
                        MjClient.Scene.addChild(new PlayLayer_luanguafeng());
                        break;
                    case MjClient.GAME_TYPE.AN_HUA_MA_JIANG:
                        // if (Number(SelfUid()) % 2 == 0) {
                            MjClient.Scene.addChild(new majiang_panel_anHuaQiWang());
                        // } else {
                            // MjClient.Scene.addChild(new PlayLayer_anhuaMaJiang());
                        // }
                        break;
                    case MjClient.GAME_TYPE.AN_HUA_MA_JIANG_SW:
                        MjClient.Scene.addChild(new PlayLayer_anhuaMaJiangSW());
                        break;
                    case MjClient.GAME_TYPE.NING_XIANG_KAI_WANG:
                        MjClient.Scene.addChild(new PlayLayer_ningXiangKaiWang());
                        break;
                    case MjClient.GAME_TYPE.CHEN_ZHOU_ZI_PAI:
                        MjClient.Scene.addChild(new playLayer_chenZhouZiPai());
                        break;
                    case MjClient.GAME_TYPE.GUI_YANG_ZI_PAI://桂阳字牌逻辑暂时用郴州 后面有差异再调整
                        MjClient.Scene.addChild(new playLayer_chenZhouZiPai());
                        break;
                    case MjClient.GAME_TYPE.DA_TONG_ZHA_GU_ZI:
                        MjClient.Scene.addChild(new PlayLayer_daTongZhaGuZi());
                        break;
                    case MjClient.GAME_TYPE.YUE_YANG_NIU_SHI_BIE:
                        MjClient.Scene.addChild(new PlayLayer_NiuShiBieYueYang());
                        break;
                    case MjClient.GAME_TYPE.ZHU_ZHOU_DA_MA_ZI:
                        MjClient.Scene.addChild(new PlayLayer_DaMaZiZhuZhou());
                        break;
                    case MjClient.GAME_TYPE.CHONG_YANG_DA_GUN:
                        MjClient.Scene.addChild(new PlayLayer_ChongYangDaGun());
                        break;
                    case MjClient.GAME_TYPE.DA_YE_DA_GONG:
                        MjClient.Scene.addChild(new PlayLayer_DaYeDaGong());
                        break;
                    case MjClient.GAME_TYPE.TONG_SHAN_DA_GONG:
                        MjClient.Scene.addChild(new PlayLayer_TongShanDaGong());
                        break;
                    case MjClient.GAME_TYPE.DA_YE_510K:
                        MjClient.Scene.addChild(new PlayLayer_DaYe510K());
                        break;
                    case MjClient.GAME_TYPE.QIAN_JIANG_QIAN_FEN:
                        MjClient.Scene.addChild(new PlayLayer_QianJiangQianFen());
                        break;
                    case MjClient.GAME_TYPE.QI_CHUN_DA_GONG:
                        MjClient.Scene.addChild(new PlayLayer_QiChunDaGong());
                        break;
                    case MjClient.GAME_TYPE.NING_XIANG_PAO_HU_ZI:
                        MjClient.Scene.addChild(new playLayer_ningXiangPaoHuZi());
                        break;
                    case MjClient.GAME_TYPE.YUE_YANG_PENG_HU:
                        MjClient.Scene.addChild(new PlayLayer_yueYangPengHu());
                        break;
                    case MjClient.GAME_TYPE.JIANG_YONG_15Z:
                        MjClient.Scene.addChild(new PlayLayer_jyShiWuZhang());
                        break;
                    case MjClient.GAME_TYPE.TAO_JIANG_MA_JIANG:
                        // if(parseInt(SelfUid())%2 == 0)
                        //     MjClient.Scene.addChild(new majiang_panel_taoJiang());
                        // else
                            MjClient.Scene.addChild(new PlayLayer_taoJiang());
                        break;
                    case MjClient.GAME_TYPE.YUE_YANG_YI_JIAO_LAI_YOU:
                        MjClient.Scene.addChild(new PlayLayer_yiJiaoLaiYou());
                        break;
                    case MjClient.GAME_TYPE.XIAO_GAN_KA_WU_XING:
                        MjClient.Scene.addChild(new majiang_panel_xiaoGanKaiWuXing());
                        break;
                    case MjClient.GAME_TYPE.SUI_ZHOU_KA_WU_XING:
                        MjClient.Scene.addChild(new majiang_panel_suiZhouKaiWuXing());
                        break;
                    case MjClient.GAME_TYPE.HU_BEI_JING_SHAN_MJ:
                        MjClient.Scene.addChild(new majiang_panel_jingshan());
                        break;
                    case MjClient.GAME_TYPE.DA_YE_KAI_KOU_FAN:
                        MjClient.Scene.addChild(new majiang_panel_daYeKaiKouFan());
                        break;
                    case MjClient.GAME_TYPE.HONG_ZHONG_LAI_ZI_GANG:
                        MjClient.Scene.addChild(new majiang_panel_hongZhongLaiZiGang());
                        break;
                    case MjClient.GAME_TYPE.HU_BEI_YI_JIAO_LAI_YOU:
                        MjClient.Scene.addChild(new majiang_panel_yiJiaoLaiYouHuBei());
                        break;
                    case MjClient.GAME_TYPE.CHUO_XIA_ZI:
                        MjClient.Scene.addChild(new majiang_panel_chuoXiaZi());
                        break;
                    case MjClient.GAME_TYPE.DIAN_TUO:
                        MjClient.Scene.addChild(new PlayLayer_dianTuo());
                        break;
                    case MjClient.GAME_TYPE.YUE_YANG_DA_ZHA_DAN:
                        MjClient.Scene.addChild(new PlayLayer_daZhaDan());
                        break;
                    case MjClient.GAME_TYPE.YI_YANG_MA_JIANG:
                        cc.log("------------yi yang ma jiang--------");
                        //MjClient.Scene.addChild(new PlayLayer_yiYangMJ());
                        MjClient.Scene.addChild(new playPanel_yiYangMaJiang());
                        break;
                    case MjClient.GAME_TYPE.YUE_YANG_YUAN_JIANG_QIAN_FEN:
                        cc.log("------------yi yang ma jiang--------");
                        MjClient.Scene.addChild(new PlayLayer_ruanjiangqianfen());
                        break;
                    case MjClient.GAME_TYPE.CHEN_ZHOU_MAO_HU_ZI:
                        MjClient.Scene.addChild(new playLayer_chenZhouMaoHuZi());
                        /*if(Number(SelfUid()) % 2 == 0){
                            MjClient.Scene.addChild(new playLayer_chenZhouMaoHuZi());
                        }else{
                            MjClient.Scene.addChild(new PlayLayer_chenZhouMaoHuZi());
                        }*/
                        break;
                    case MjClient.GAME_TYPE.XIANG_XI_2710:
                        MjClient.Scene.addChild(new PlayLayer_xiangXiRQS());
                        break;
                    case MjClient.GAME_TYPE.CHANG_DE_PAO_HU_ZI:
                        MjClient.Scene.addChild(new playPanel_changDePaoHuzi());
                        break;
                    case MjClient.GAME_TYPE.YUAN_LING_PAO_HU_ZI:
                        MjClient.Scene.addChild(new PlayLayer_yuanLingPaoHuZi());
                        break;
                    case MjClient.GAME_TYPE.SHI_MEN_PAO_HU_ZI:
                            MjClient.Scene.addChild(new playPanel_shiMenPaoHuzi());
                        break;
                    case MjClient.GAME_TYPE.ZP_LY_CHZ:
                        if(isYongZhouProject()){
                            MjClient.Scene.addChild(new PlayLayer_zplychz());
                        }else{
                            // if(Number(SelfUid()) % 2 == 0){
                            //     MjClient.Scene.addChild(new PlayLayer_zplychz_lyg());
                            // }else{
                            //     MjClient.Scene.addChild(new playPanel_zplychz_lyg());
                            // }
                            MjClient.Scene.addChild(new playPanel_zplychz_lyg());
                        }
                        
                        break;
                    case MjClient.GAME_TYPE.HAN_SHOU_PAO_HU_ZI:
                        MjClient.Scene.addChild(new playLayer_hanShouPaoHuZi());
                        break;
                    case MjClient.GAME_TYPE.YUN_CHENG_FENG_HAO_ZI:
                        MjClient.Scene.addChild(new PlayLayer_yunChengFengHaoZi());
                        break;
                    case MjClient.GAME_TYPE.DAO_ZHOU_MJ:
                        if(MjClient.getAppType() === MjClient.APP_TYPE.QXSYDTZ){
                            MjClient.Scene.addChild(new majiang_panel_daoZhou());
                        }else{
                            MjClient.Scene.addChild(new PlayLayer_DaozhouMJ());
                        }
                        break;
                    case MjClient.GAME_TYPE.JI_SHAN_NIU_YE_ZI:
                        MjClient.Scene.addChild(new PlayLayer_jiShanNiuYeZi());
                        break;
                    case MjClient.GAME_TYPE.YZ_PAO_DE_KUAI_TY:
                        MjClient.Scene.addChild(new PlayLayer_PaoDeKuaiYZTY());
                        break;
                    case MjClient.GAME_TYPE.WANG_DIAO_MA_JIANG:
                        if(MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ){
                            MjClient.Scene.addChild(new majiang_panel_wangdiaoMJ()); 
                        }else{
                            MjClient.Scene.addChild(new PlayLayer_WangDiaoMJ()); 
                        }  
                        break;
                    case  MjClient.GAME_TYPE.JIANG_HUA_MJ:
                        if(MjClient.getAppType() === MjClient.APP_TYPE.QXSYDTZ){
                            MjClient.Scene.addChild(new majiang_panel_jiangHua());
                        } else {
                            MjClient.Scene.addChild(new PlayLayer_jiangHuaMJ());
                        }
                        break;
                    case  MjClient.GAME_TYPE.YONG_ZHOU_MJ:
                        if(MjClient.getAppType() != MjClient.APP_TYPE.QXSYDTZ){
                            MjClient.Scene.addChild(new PlayLayer_yongZhouGMJ());
                        } else {
                            MjClient.Scene.addChild(new majiang_panel_yongZhouGMJ());
                        }
                        break;
                    case MjClient.GAME_TYPE.HZMJ:
                        MjClient.Scene.addChild(new PlayLayer_HZMJ);
                        break;
                    case MjClient.GAME_TYPE.LEI_YANG_GMJ:
                        MjClient.Scene.addChild(new PlayLayer_leiyangGMJ);
                        break;
                    case MjClient.GAME_TYPE.HENG_YANG_CHANG_SHA:
                        MjClient.Scene.addChild(new PlayLayer_hengyangChangSha());
                        break;
                    case  MjClient.GAME_TYPE.PAO_HU_ZI_ER:
                        if(MjClient.APP_TYPE.QXSYDTZ == MjClient.getAppType()){
                            MjClient.Scene.addChild(new PlayPanel_cheHuZi());
                        }else{
                            MjClient.Scene.addChild(new PlayLayer_paohuzi_ER());
                        }
                        break;
                    case  MjClient.GAME_TYPE.XIANG_XIANG_GAO_HU_ZI:    
                        if(MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ){
                            MjClient.Scene.addChild(new playPanel_xxGaoHuZi());
                        }else{
                            MjClient.Scene.addChild(new PlayLayer_xxGaoHuZi());
                        }
                        break;
                    case  MjClient.GAME_TYPE.XIANG_XIANG_PAO_HU_ZI:    
                        if(MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ){
                            MjClient.Scene.addChild(new playPanel_xiangxiangPHZ());
                        }else{
                            MjClient.Scene.addChild(new PlayLayer_xiangxiangPHZ());
                        }
                        break;
                    case  MjClient.GAME_TYPE.XIANG_TAN_PAO_HU_ZI:    
                        if(MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ){
                            MjClient.Scene.addChild(new playPanel_xiangTanPHZ());
                        }else{
                            MjClient.Scene.addChild(new PlayLayer_xiangtanPHZ());
                        }
                        break;
                    case  MjClient.GAME_TYPE.LOU_DI_FANG_PAO_FA:
                        MjClient.Scene.addChild(new PlayLayer_loudifpf());
                        break;
                    case  MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA:
                        var tData = MjClient.data.sData.tData;
                        if(tData.maxPlayer == 4){
                            MjClient.Scene.addChild(new playPanel_syLouDiFangPaoFa());
                        }else{
                            if(tData.fieldId) {
                                MjClient.Scene.addChild(new PlayLayer_SYloudifpf());
                            }else{
                                MjClient.Scene.addChild(new playPanel_syLouDiFangPaoFa());
                            }
                        }
                        break;
                    case  MjClient.GAME_TYPE.HENG_YANG_FANG_PAO_FA:
                        var tData = MjClient.data.sData.tData;
                        if(tData.maxPlayer == 4){
                            MjClient.Scene.addChild(new PlayLayer_HYFangPaoFaZuoXing());
                        }else{
                            MjClient.Scene.addChild(new PlayLayer_HYFangPaoFa());
                        }
                        break;
                    case  MjClient.GAME_TYPE.HUAI_HUA_HONG_GUAI_WAN:
                        MjClient.Scene.addChild(new playPanel_hhHongGuaiWan());
                        break;
                    case  MjClient.GAME_TYPE.PAO_HU_ZI_King:
                        if(MjClient.APP_TYPE.QXSYDTZ == MjClient.getAppType()){
                            MjClient.Scene.addChild(new PlayPanel_cheHuZi());
                        }else{
                            MjClient.Scene.addChild(new PlayLayer_paohuzi());
                        }
                        break;
                    case  MjClient.GAME_TYPE.PAO_HU_ZI_LR_King:
                        if(MjClient.APP_TYPE.QXSYDTZ == MjClient.getAppType()){
                            MjClient.Scene.addChild(new PlayPanel_cheHuZi());
                        }else{
                            MjClient.Scene.addChild(new PlayLayer_paohuzi_ER());
                        }
                        break;
                    case  MjClient.GAME_TYPE.PAO_HU_ZI_SR_King:
                            if(MjClient.APP_TYPE.QXSYDTZ == MjClient.getAppType()){
                                MjClient.Scene.addChild(new PlayPanel_cheHuZi());
                            }else{
                                MjClient.Scene.addChild(new PlayLayer_paohuzi_SR());
                            }
                        break;
                    case  MjClient.GAME_TYPE.HUAI_HUA_MA_JIANG:
                        // if (Number(SelfUid()) % 2 == 0) {
                            // MjClient.Scene.addChild(new majiang_panel_huaihuaMaJiang());
                        // } else {
                            MjClient.Scene.addChild(new PlayLayer_huaihuaMaJiang());
                        // // }
                        break;
                    case MjClient.GAME_TYPE.XIANG_XIANG_HONG_ZHONG:
                        MjClient.Scene.addChild(new PlayLayer_XXHZ());
                        break;
                    case  MjClient.GAME_TYPE.HY_LIU_HU_QIANG:
                        if(MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || 
                            MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ)
                        {
                            MjClient.Scene.addChild(new PlayLayer_LiuHuQiang());
                        }else if(MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || 
                            MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ){
                            MjClient.Scene.addChild(new playPanel_liuHuQiang());
                            /*if(Number(SelfUid()) % 2 == 0){
                                MjClient.Scene.addChild(new playPanel_liuHuQiang());
                            }else{
                                MjClient.Scene.addChild(new PlayLayer_liuHuQiang());
                            }*/
                        }else if(MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP){
                            MjClient.Scene.addChild(new PlayLayer_bdhyLiuHuQiang());
                        }else if(MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ){
                            MjClient.Scene.addChild(new playPanel_syLiuHuQiang());
                        }else{
                            MjClient.Scene.addChild(new PlayLayer_hyLiuHuQiang());
                        }
                        break;
                    case MjClient.GAME_TYPE.SHAO_YANG_MA_JIANG: 
                        MjClient.Scene.addChild(new majiang_panel_SYMJ());
                        break;
                    case MjClient.GAME_TYPE.HENG_YANG_SHIWUHUXI:
                        if(MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ){
                            MjClient.Scene.addChild(new playPanel_syShiWuHu());
                        }else{
                            MjClient.Scene.addChild(new PlayLayer_HYShiWuHu());
                        }
                        break;
                    case MjClient.GAME_TYPE.DA_TONG_ZI_SHAO_YANG:
                        MjClient.Scene.addChild(new PlayLayer_DaTongZi());
                        break;
                    case MjClient.GAME_TYPE.SHAO_YANG_BO_PI:
                        var tData = MjClient.data.sData.tData;
                        if (tData.areaSelectMode.zuoXing) {
                            MjClient.Scene.addChild(new playPanel_shaoYangBoPi());
                        } else if (tData.fieldId) {
                            if (tData.maxPlayer == 2) {
                                MjClient.Scene.addChild(new PlayLayer_syBoPiTwoPlayer());
                            } else {
                                MjClient.Scene.addChild(new PlayLayer_syBoPi());
                            }
                        } else {
                            //新版
                            MjClient.Scene.addChild(new playPanel_shaoYangBoPi());
                        }
                        break;
                    case MjClient.GAME_TYPE.DA_ZI_BO_PI:
                        MjClient.Scene.addChild(new playPanel_DaZiBoPi());
                        break;
                    case MjClient.GAME_TYPE.SHAO_YANG_ZI_PAI:
                        MjClient.Scene.addChild(new playPanel_syZiPai());
                        break;
                    case MjClient.GAME_TYPE.XIN_NING_MA_JIANG:
                        if(MjClient.APP_TYPE.QXSYDTZ == MjClient.getAppType())
                            MjClient.Scene.addChild(new majiang_panel_xinNing());
                        else
                            MjClient.Scene.addChild(new PlayLayer_XNMJ());
                        break;
                    case MjClient.GAME_TYPE.LONG_HUI_BA_ZHA_DAN:
                        MjClient.Scene.addChild(new PlayLayer_BaZhaDan());
                        break;
                    case MjClient.GAME_TYPE.YONG_ZHOU_LAO_CHUO:
                        MjClient.Scene.addChild(new PlayLayer_YongZhouLaoChuo());
                        break;
                    case MjClient.GAME_TYPE.HY_ER_PAO_HU_ZI:
                        if(MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ){
                            MjClient.Scene.addChild(new playPanel_syERenPaoHuZi());
                        }else{
                            MjClient.Scene.addChild(new PlayLayer_hyERenPaoHuZi());
                        }
                        break;
                    case MjClient.GAME_TYPE.BAN_BIAN_TIAN_ZHA:
                        MjClient.Scene.addChild(new PlayLayer_BanBianTianZha());
                        break;
                    case MjClient.GAME_TYPE.LENG_SHUI_JIANG_SHI_HU_DAO:
                        MjClient.Scene.addChild(new playPanel_syLSJShiHuDao());
                        break;
                    case MjClient.GAME_TYPE.HENG_YANG_SAN_DA_HA:
                        MjClient.Scene.addChild(new PlayLayer_sanDaHaHengYang());
                        break;
                    case MjClient.GAME_TYPE.SHAO_YANG_SAN_DA_HA:
                        MjClient.Scene.addChild(new PlayLayer_sanDaHaShaoYang());
                        break;
                    case MjClient.GAME_TYPE.YONG_LI_SAN_DA_HA:
                        MjClient.Scene.addChild(new PlayLayer_sanDaHaYongLi());
                        break;
                    case MjClient.GAME_TYPE.XIANG_XIANG_SAN_DA_HA:
                        MjClient.Scene.addChild(new PlayLayer_sanDaHaXiangXiang());
                        break;
                    case MjClient.GAME_TYPE.XIANG_SHUI_MJ:
                        MjClient.Scene.addChild(new PlayLayer_xiangshui());
                        break;
                    case MjClient.GAME_TYPE.QU_TANG_23_ZHANG:
                        MjClient.Scene.addChild(new PlayLayer_qutang_23zhang());
                        break;
                    case MjClient.GAME_TYPE.AN_XIANG_WEI_MA_QUE:
                        MjClient.Scene.addChild(new playLayer_anXiangWeiMaQue());
                        break;
                    case  MjClient.GAME_TYPE.GUI_ZHOU_PU_DING_MJ:
                        MjClient.Scene.addChild(new PlayLayer_guizhoupuding());
                        break;
                    case  MjClient.GAME_TYPE.GUI_ZHOU_AN_SHUN_MJ:
                        MjClient.Scene.addChild(new PlayLayer_guizhouAnShun());
                        break;
                    case  MjClient.GAME_TYPE.GUI_ZHOU_SAN_DING_LIANG_FANG:
                        MjClient.Scene.addChild(new PlayLayer_guizhouSanDingLiangFang());
                        break;
                    case  MjClient.GAME_TYPE.GUI_ZHOU_LIANG_DING_LIANG_FANG:
                        MjClient.Scene.addChild(new PlayLayer_guizhouLiangDingLiangFang());
                        break;
                    case  MjClient.GAME_TYPE.GUI_ZHOU_SAN_DING_GUAI:
                        MjClient.Scene.addChild(new PlayLayer_guizhouSanDingGuai());
                        break;
                    case  MjClient.GAME_TYPE.GUI_ZHOU_ER_DING_GUAI:
                        MjClient.Scene.addChild(new PlayLayer_guizhouSanDingGuai());
                        break;
                    case  MjClient.GAME_TYPE.GUI_ZHOU_XMY_GUI_YANG_ZHUO_JI:
                        MjClient.Scene.addChild(new PlayLayer_guizhouXMYGuiYangZhuoJi());
                        break;
                    case  MjClient.GAME_TYPE.GUI_ZHOU_GUI_YANG_ZHUO_JI:
                        MjClient.Scene.addChild(new PlayLayer_guizhouGuiYangZhuoJi());
                        break;
                    case  MjClient.GAME_TYPE.GUI_ZHOU_MEN_HU_XUE_LIU:
                        MjClient.Scene.addChild(new PlayLayer_guizhouMenHuXueLiu());
                        break;
                    case MjClient.GAME_TYPE.XIANG_XI_96POKER:
                        MjClient.Scene.addChild(new playPanel_96poker());
                        break;
                    case MjClient.GAME_TYPE.XU_PU_LAO_PAI:
                        MjClient.Scene.addChild(new PlayLayer_xuPuLaoPai());
                        break;
                    case MjClient.GAME_TYPE.XU_PU_PAO_HU_ZI:
                        MjClient.Scene.addChild(new playPanel_xuPuPaoHuZi());
                        break;
                    case MjClient.GAME_TYPE.ER_REN_YI_FANG_MJ:
                        MjClient.Scene.addChild(new majiang_panel_erRenYiFang());
                        break;
                    case  MjClient.GAME_TYPE.HONG_ZE_MA_JIANG:
                        MjClient.Scene.addChild(new majiang_panel_hongZeMaJiang());
                        break;
                    case MjClient.GAME_TYPE.SHAN_XI_GAN_DENG_YAN:
                        MjClient.Scene.addChild(new PlayLayer_ganDengYan());
                        break;
                    case MjClient.GAME_TYPE.YI_CHANG_XUE_LIU_MJ:
                        MjClient.Scene.addChild(new majiang_panel_yiChangXueLiu());
                        break;
                    case MjClient.GAME_TYPE.EN_SHI_MA_JIANG:
                        MjClient.Scene.addChild(new majiang_panel_enShi());
                        break;
                    case MjClient.GAME_TYPE.DA_YE_ZI_PAI:
                        MjClient.Scene.addChild(new playPanel_DaYeZiPai());
                        break;
                    case MjClient.GAME_TYPE.DANG_YANG_FAN_JING:
                        MjClient.Scene.addChild(new playPanel_dangYangFanJing());
                        break;
                    case MjClient.GAME_TYPE.YI_CHANG_SHANG_DA_REN: 
                        MjClient.Scene.addChild(new playPanel_yiChangShangDaRen());
                        break;
                    case MjClient.GAME_TYPE.JING_ZHOU_MA_JIANG:
                        MjClient.Scene.addChild(new majiang_panel_jingZhou());
                        break;
                    case MjClient.GAME_TYPE.CHONG_YANG_MJ:
                        MjClient.Scene.addChild(new majiang_panel_chongYangMJ());
                        break;
                    case MjClient.GAME_TYPE.HUANG_SHI_HH_MJ:
                        MjClient.Scene.addChild(new majiang_panel_huangShiHHMJ());
                        break;
                    case MjClient.GAME_TYPE.QI_CHUN_HH_MJ:
                        MjClient.Scene.addChild(new majiang_panel_qiChunHHMJ());
                        break;
                    case MjClient.GAME_TYPE.TONG_CHENG_MJ:
                        MjClient.Scene.addChild(new majiang_panel_tongChengMaJiang());
                        break;
                    case MjClient.GAME_TYPE.HU_BEI_HUA_PAI:
                        MjClient.Scene.addChild(new playPanel_huBeiHuaPai());
                        break;
                    case MjClient.GAME_TYPE.YANG_XIN_MA_JIANG:
                        MjClient.Scene.addChild(new majiang_panel_yangXin());
                        break;
                    case MjClient.GAME_TYPE.TONG_SHAN_HH_MJ:
                        MjClient.Scene.addChild(new majiang_panel_tongShanHuangHuangMaJiang());
                        break;
                    case MjClient.GAME_TYPE.JIANG_LING_HONGZHONG:
                        MjClient.Scene.addChild(new majiang_panel_jiangLingHongZhong());
                        break;
                    case MjClient.GAME_TYPE.SHI_SHOU_AI_HUANG:
                        MjClient.Scene.addChild(new majiang_panel_shiShouAiHuang());
                        break;
                    case MjClient.GAME_TYPE.QIAN_JIANG_HH_MJ:
                        MjClient.Scene.addChild(new majiang_panel_qianJiangHHMJ());
                        break;
                    case MjClient.GAME_TYPE.GONG_AN_HUA_PAI:
                        MjClient.Scene.addChild(new playPanel_gongAnHuaPai());
                        break;
                    case MjClient.GAME_TYPE.WU_XUE_MJ:
                        MjClient.Scene.addChild(new majiang_panel_wuXueMJ());
                        break;
                    case MjClient.GAME_TYPE.QI_CHUN_GD_MJ:
                        MjClient.Scene.addChild(new majiang_panel_qiChunGuangDong());
                        break;
                    case MjClient.GAME_TYPE.TONG_CHENG_GE_ZI_PAI:
                        MjClient.Scene.addChild(new playPanel_tongChengGeZiPai());
                        break;
                    case MjClient.GAME_TYPE.EN_SHI_SHAO_HU:
                        MjClient.Scene.addChild(new playPanel_enShiShaoHu());
                        break;
                    case MjClient.GAME_TYPE.QI_CHUN_HONG_ZHONG_GANG:
                        MjClient.Scene.addChild(new majiang_panel_qiChunHongZhongGang());
                        break;
                    case MjClient.GAME_TYPE.WU_XUE_510K:
                        MjClient.Scene.addChild(new PlayLayer_wuXue510K());
                        break;
                }

                // 默认过胡弹窗没弹过
                if(cc.sys.isObjectValid(MjClient.playui)){
                    util.localStorageEncrypt.setBoolItem(MjClient.guoHuHasBeenShown, false);
                }


                // 江苏, 山西, 湖南, 可以切换3D的麻将玩法，第一次进入房间，选择牌桌(金币场不弹2/3D选择)
                if(MjClient.rePlayVideo === -1)  // 表示正常游戏
                {
                    var sData = MjClient.data.sData;
                    var isGoldField = sData.tData.fieldId;
                    if(MjClient.playui && !cc.isUndefined(MjClient.gameType) && COMMON_UI3D.isCanChangTo3D() && !isGoldField)
                    {
                        var roomTableSwitch = new RoomTableSwitch();
                        roomTableSwitch.setName("roomTableSwitch");
                        var key = util.localStorageEncrypt.getBoolItem("canShowRoomTableSwitch", true);
                        if(key) MjClient.playui.addChild(roomTableSwitch, 100);
                    }
                }


                if(MjClient.rePlayVideo !== -1)
                {
                    MjClient.Scene.addChild(new replayUILayer());
                }

                //在江苏试调整
                //if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ
                //|| isJinZhongAPPType())
                {
                    if(MjClient.GoldHallLayer)
                    {
                        if(cc.sys.isObjectValid(MjClient.GoldHallLayer)){
                            MjClient.GoldHallLayer.removeFromParent();
                        }
                        MjClient.GoldHallLayer = null;
                    }
                    if(MjClient.homeui)
                    {
                        MjClient.homeui.removeFromParent();
                        MjClient.homeui = null;
                    }

                    if (MjClient.FriendCard_main_ui)
                    {
                        MjClient.FriendCard_main_ui.removeFromParent();
                        MjClient.FriendCard_main_ui = null;
                    }
                }

                //位置插件检测界面
                if(MjClient.APP_TYPE.BDHYZP == MjClient.getAppType() && MjClient.playui){
                    MjClient.playui.addChild(new LocationAppsLayer(), 5001);
                }else if(MjClient.rePlayVideo == -1 && (MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.APP_TYPE.QXSYDTZ == MjClient.getAppType()) && MjClient.playui && !MjClient.data.sData.tData.fieldId){
                    // ScanCheatLayer.pInstance = null;
                    // ScanCheatLayer.showStartOnce();
                }else if(MjClient.rePlayVideo == -1 && MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP && MjClient.playui && !MjClient.data.sData.tData.fieldId && GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_HU_ZI){
                    // ScanCheatLayer.pInstance = null;
                    // ScanCheatLayer.showStartOnce();
                }

            }
            else
            {
                cc.log("=================connect========== ");
                if(MjClient.endoneui)
                {
                    if (cc.sys.isObjectValid(MjClient.endoneui)) {
                        MjClient.endoneui.removeFromParent(true);
                    }
                    MjClient.endoneui = null;
                }

                for(var off = 0; off < 4; off++)
                {
                    if(getNode(off) && cc.sys.isObjectValid(getNode(off)))
                    {
                        var _ready = getNode(off).getChildByName("ready");
                        if (cc.sys.isObjectValid(_ready)) {
                            GetReadyVisible(_ready, off);
                        }
                    }
                }
            }
            postEvent("clearCardUI");
            postEvent("clearCardArr");


            var tData = MjClient.data.sData.tData;
            if(tData.fieldId && tData.redPacketInfo) {
                MjClient._redPacketInfo = tData.redPacketInfo;
                MjClient._redPacketInfo.currentTime = (sData.serverNow + Date.now());
            }
            if(tData.matchId){
                var readyLayer = new readyLayer_niuniu(function ()
                {
                    readyLayer.removeFromParent();
                });
                MjClient.playui.addChild(readyLayer, 500);
            }

            if (MjClient.putTypeSaved)
                delete MjClient.putTypeSaved;

            if (MjClient.gameType == MjClient.GAME_TYPE.PING_JIANG_ZHA_NIAO) 
            {
                if (tData.kaigangs && tData.kaigangs.length > 0) 
                {
                    if (tData.kaigangs[tData.kaigangs.length - 1].fan2) 
                    {
                        tData.lastPutCard = tData.kaigangs[tData.kaigangs.length - 1].card2;
                    }
                }
            }
            cc.log("断线重连  tData.lastPutCard ",tData.lastPutCard);
        }
        if(!MjClient._lastTableId || MjClient._lastTableId == ""){
            MjClient._lastTableId = util.localStorageEncrypt.getStringItem("_lastTableId");
        }
        if(!MjClient._lastTableId || MjClient._lastTableId != MjClient.data.sData.tData.tableid){
            //【联盟&亲友圈】玩家加入房间时，toast显示该房间的玩法昵称
            MjClient._lastTableId = MjClient.data.sData.tData.tableid;
            util.localStorageEncrypt.setStringItem("_lastTableId",(MjClient._lastTableId+""));
            var clubInfoTable = getClubInfoInTable();
            if(clubInfoTable && clubInfoTable.ruleName){
                MjClient.showToast("当前玩法："+unescape(clubInfoTable.ruleName))
            }
        }
        showVoteJiaShiTip({
            fromInitScene:true,
        });
        if (showMatchInfo) {
           showMatchInfo(); 
        }
    }]
    , removePlayer: [0, function (d) {
        var sData = MjClient.data.sData;
        if (!sData) return;

        if (isJinZhongAPPType() &&
            GameClass[MjClient.gameType] == MjClient.GAME_CLASS.MA_JIANG &&
            d.mjState != TableState.waitReady)
        {
            playEffect("player_leave_effect");
            var nickname = sData.players[d.uid].info.nickname;
            var msg = " 离开了房间";
            MjClient.showToastWithInfobyPos(nickname,msg,0.725);
        }
        if (MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP)
        {
            //if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.MA_JIANG)
            {
                playEffect("player_leave_effect");
                var nickname = sData.players[d.uid].info.nickname;
                var msg = " 离开了房间";
                MjClient.showToastWithInfobyPos(nickname,msg,0.725);
            }
        }

        delete sData.players[d.uid];
        sData.tData = d.tData;
        mylog(JSON.stringify(Object.keys(sData.players)));
    }]
    , addPlayer: [0, function (d) {
        cc.log("add player by sking -------------------");
        var sData = MjClient.data.sData;
        if (!sData) return;
        sData.players[d.player.info.uid] = d.player;
        sData.tData = d.tData;
        if (isJinZhongAPPType()
            //&& (MjClient.gameType == MjClient.GAME_TYPE.JIN_ZHONG_GUAI_SAN_JIAO || sData.tData.maxPlayer == 2)
            && GameClass[MjClient.gameType] == MjClient.GAME_CLASS.MA_JIANG )
        {
            cc.log("add player by sking --进入了房间-----------------");
            playEffect("player_join_effect");
            var nickname = d.player.info.nickname;
            var msg = " 进入了房间";
            MjClient.showToastWithInfobyPos(nickname,msg,0.725);
        }
        if (MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP)
        {
            //if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.MA_JIANG)
            {
                playEffect("player_join_effect");
                var nickname = d.player.info.nickname;
                var msg = " 进入了房间";
                MjClient.showToastWithInfobyPos(nickname,msg,0.725);
            }
        }
        cc.log('addPlayer++++:'+JSON.stringify(sData.players));
    }]
    , updateInfo: [0, function (info) {
        var pinfo = MjClient.data.pinfo;
        
        for (var pty in info) pinfo[pty] = info[pty];


        //不管乱来，只刷新money
        if (info &&(info.money || info.money == 0)){
            var pself = getUIPlayer(0);
            if (pself)
                pself.info.money= info.money;
        }

        //金币场使用用户信息的金币
        if (info && (info.gold || info.gold == 0)){
            if(MjClient.data.sData && MjClient.data.sData.tData && MjClient.data.sData.tData.fieldId){
                var pl = getUIPlayer(0);
                if (pl){
                    pl.info._preGold = pl.info.gold;
                    pl.info.gold = info.gold
                }
            }
        }
        cc.log("-----------------------updateInfo:"+JSON.stringify(info));
        cc.log("-----------------------MjClient.data.pinfo:"+JSON.stringify(MjClient.data.pinfo));
    }]
    , moveHead: [1, function () {

    }],
    field_reconnection: [0, function () {

    }],
    MJGenZhuang: [0, function (d) { 

    }], 
    mjhand: [0, function (d) {
        stopDoJiaShiAction();
        
        delete MjClient.MJPutCache;
        postEvent("clearCardUI");
        MjClient.isNoLiang = false;
        //cc.log("mjhand消息", JSON.stringify(d));
        var sData = MjClient.data.sData;
        var tData = d.tData;
        if (!sData) return;
        sData.tData = d.tData;

        // 默认过胡弹窗没弹过
        if(cc.sys.isObjectValid(MjClient.playui)){
            util.localStorageEncrypt.setBoolItem(MjClient.guoHuHasBeenShown, false);
        }

        //cc.log("d ================="+JSON.stringify(d));
        //cc.log("sData ==========="+JSON.stringify(sData.players));
        //cc.log("=============2222222222222222222=waitwant===========" + sData.tData.areaSelectMode["wanfa"]);

        if (GameClass[MjClient.gameType] === MjClient.GAME_CLASS.DOU_DI_ZHU)
        {
            sData.tData.zhuang = -1;
        }

        if(MjClient.gameType === MjClient.GAME_TYPE.CHANG_SHA ||
            MjClient.gameType === MjClient.GAME_TYPE.XIANG_YIN_TUI_DAO_HU ||
            MjClient.gameType === MjClient.GAME_TYPE.PING_JIANG_ZHA_NIAO ||
            MjClient.gameType === MjClient.GAME_TYPE.AN_HUA_MA_JIANG ||
            MjClient.gameType === MjClient.GAME_TYPE.AN_HUA_MA_JIANG_SW ||
            MjClient.gameType === MjClient.GAME_TYPE.NING_XIANG_KAI_WANG ||
            MjClient.gameType === MjClient.GAME_TYPE.TAO_JIANG_MA_JIANG ||
            MjClient.gameType === MjClient.GAME_TYPE.YI_YANG_MA_JIANG ||
            MjClient.gameType === MjClient.GAME_TYPE.HENG_YANG_CHANG_SHA)
        {
            sData.players[SelfUid()].linkZhuang = d.linkZhuang;
        }

        // if(MjClient.gameType === MjClient.GAME_TYPE.DOU_DI_ZHU_JZ
        //     // MjClient.gameType === MjClient.GAME_TYPE.DOU_DI_ZHU_DA_TONG||
        //     // MjClient.gameType === MjClient.GAME_TYPE.DOU_DI_ZHU_XIN_ZHOU)
        //     MjClient.data.sData.tData.minJiaofen = 0;
        // cc.log("netcallback--------------------"+JSON.stringify( MjClient.data.sData.tData));
        for (var uid in sData.players) {
            var pl = sData.players[uid];
            pl.mjpeng = [];
            pl.mjgang0 = [];
            pl.mjgang1 = [];
            pl.mjTeshuGang0 = [];
            pl.mjTeshuGang1 = [];
            pl.mjchi = [];
            pl.mjchiCard = [];
            pl.mjput = [];
            pl.pengchigang = [];
            pl.mjdesc1 = [];
            pl.mjflower = [];
            pl.jiazhuNum = 0;
            pl.haiDiLaoState = false;
            pl.skipPeng = [];
            pl.skipMingGang = [];
            pl.mjwei = [];
            pl.mjsort = [];
            pl.wangType = 0;
            pl.long = [];
            pl.mjHide = [];
            pl.isOuCard = false;
            pl.wangStatus = false;
            pl.isZiMoHu = false;
            pl.mustHu    = false;
            pl.putCount = 0;
            pl.putCardAfterTing = -1; //add by sking 2018 .1. 26
            pl.canNotPutCard = []; // 汨罗红字
            pl.isChunTian = false;
            pl.jiabei = 0;               // 曲塘23张加倍
            pl.isQuanHun = false;        // 曲塘23张是否全荤
            pl.isSelectedPower = false;  // 曲塘23张全荤权限
            pl.isNotAnGang = false;      // 曲塘23张开局补花不能暗杠
            pl.gumaiValue = -1; // 贵阳抓鸡估卖
            pl.huPaiTypeText = '';
            pl.handCount = 0;
            pl.skipGang = [];
            pl.touzi = false;
            pl.huCards = [];
            pl.huCardsInfo = [];
            pl.fgang = [];
            pl.gangScore = 0;
            pl.fengDong = false;
            pl.tingStatus = -1;
            pl.haiDiStatus = -1;
            pl.winone = 0;
            pl.linkZhuang = pl.linkZhuang || 0;
            pl.score_xi = 0;
            pl.score_rank = 0;
            pl.score_draw = 0;
            pl.alarmFlag = -2;
            pl.skipHuStatus = 0;
            pl.isBBHu = false;
            pl.isTingJJHu = false;
            pl.needTing = false;
            pl.jinMjPut = [];
            pl.jiangjianghuLists = [];
            pl.mjPiZiGang = [];//恩施麻将（一痞二癞）痞子杠和癞子杠,蕲春红中杠也使用这个字段存储痞子杠和癞子杠
            pl.genZhuangScore = 0//蕲春广东麻将跟庄分清零
            pl.curFanCount = 0;
			pl.liangCards = [];
            pl.anKe = [];
            pl.anKeNum = 0;
            pl.tingCards = [];
            //打筒子自动托管
            if(MjClient.gameType == MjClient.GAME_TYPE.DA_TONG_ZI_SHAO_YANG && !tData.areaSelectMode.isTrustWhole) {
                pl.isTrust = false;
                pl.trustTime = 0;
            }

            pl.selectPutState = -2; //大冶字牌 开朝出牌状态
            pl.putCardDir = [];     //大冶字牌 弃牌字典
            
            //托管标记 //该玩家处于全局托管，发牌后仍然是托管
            if (!(pl.trust && tData.areaSelectMode.isTrustWhole)) {
                pl.trust = false; 
            } 

            pl.tPutCard = false;
            pl.dirNumber = -1;
            pl.touziCount = 0;
            pl.que = -1;
            pl.chongJiCard = [];
            pl.isDoTianTing =  false;
            pl.isPass = false;
            pl.guChouValue = -1;
            pl.chongScore = 0;
            if (pl.zimoNode) {
                pl.zimoNode = null;
            }

            if (pl.zuiCount) {
                pl.zuiCount = 0;
            }
            if (pl.qingDui) {
                pl.qingDui = 0;
            }

            if(MjClient.gameType === MjClient.GAME_TYPE.YI_CHANG_XUE_LIU_MJ) {
                pl.puCards = [];
                pl.huanBefore = [];
                pl.huanAfter = [];
                pl.huCards = [];
                pl.huCardsInfo = [];
                pl.maxFan = 0;
            }

            if(MjClient.gameType === MjClient.GAME_TYPE.QIAN_JIANG_HH_MJ) {
                pl.huanBefore = [];
                pl.huanAfter = [];
            }

            if(MjClient.gameType === MjClient.GAME_TYPE.HUANG_SHI_HH_MJ ||
                MjClient.gameType === MjClient.GAME_TYPE.QI_CHUN_HH_MJ) {
                pl.liangCards = [];
                pl.gangCards = []; 
            }

            if (MjClient.gameType === MjClient.GAME_TYPE.QU_TANG_23_ZHANG) {
                pl.selectTime = 5;   // 选择是否加倍剩余时间
            }
            if (MjClient.gameType == MjClient.GAME_TYPE.XIANG_YIN_TUI_DAO_HU ||
                MjClient.gameType == MjClient.GAME_TYPE.CHEN_ZHOU ||
                MjClient.gameType == MjClient.GAME_TYPE.CHAO_GU_MJ ||
                MjClient.gameType == MjClient.GAME_TYPE.NING_XIANG_MJ ) 
            {
                pl.jiazhuNum = -1;
            }
            if (MjClient.gameType === MjClient.GAME_TYPE.DA_TONG_ZI_SHAO_YANG) {
                pl.handCount = d.tData.handCount;
            }

            if (MjClient.gameType === MjClient.GAME_TYPE.LONG_HUI_BA_ZHA_DAN) {
                pl.teamerHand = [];
            }

            if (MjClient.gameType === MjClient.GAME_TYPE.LONG_HUI_BA_ZHA_DAN ||
                MjClient.gameType === MjClient.GAME_TYPE.BAN_BIAN_TIAN_ZHA) {
                var tData = d.tData;
                pl.handCount = tData.handCount;
                if (tData.maxPlayer == 4 && tData.deckNum == 1 && tData.areaSelectMode.hasJoker) {
                    if (pl.info.uid == tData.uids[tData.zhuang] || pl.info.uid == tData.uids[(tData.zhuang + 1) % tData.maxPlayer])
                        pl.handCount++;
                }
                if (tData.maxPlayer == 4 && tData.deckNum == 3 && !tData.areaSelectMode.addJoker && !tData.areaSelectMode.noJoker) {
                    if (pl.info.uid == tData.uids[tData.zhuang] || pl.info.uid == tData.uids[(tData.zhuang + 1) % tData.maxPlayer])
                        pl.handCount++;
                }

                pl.teamerHand = [];
            }

            if (MjClient.gameType != MjClient.GAME_TYPE.SHAO_YANG_ZI_PAI && MjClient.gameType != MjClient.GAME_TYPE.SHAO_YANG_BO_PI
                && MjClient.gameType != MjClient.GAME_TYPE.HY_SHI_HU_KA && MjClient.gameType != MjClient.GAME_TYPE.LENG_SHUI_JIANG_SHI_HU_DAO 
                && MjClient.gameType != MjClient.GAME_TYPE.XU_PU_PAO_HU_ZI && MjClient.gameType != MjClient.GAME_TYPE.DA_ZI_BO_PI) {
                pl.jiachuiNum = -1; 
            }

            if (MjClient.gameType == MjClient.GAME_TYPE.ZP_LY_CHZ) {
                pl.isPutCardOnce = true;
                pl.canNotPutCard = [];
                pl.limitHuPutCard = [];
                pl.limitHuTypeList = [];
            }

            if(MjClient.gameType === MjClient.GAME_TYPE.XIANG_XI_2710){
                pl.skipArr  = [];
                pl.qiPai    = [];
                pl.fallArea = -1;
                pl.limitChiAndHuMatrix = [];
            }

            if(MjClient.gameType === MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA){
                pl.defeatState = -1;
            }

            if (MjClient.gameType === MjClient.GAME_TYPE.GUI_ZHOU_MEN_HU_XUE_LIU) {
                pl.menHuOfShow = [];
                pl.menHu = [];
                pl.menFlag = -1;
                pl.chongFengJi = [];
            }

            if (MjClient.gameType === MjClient.GAME_TYPE.GUI_ZHOU_GUI_YANG_ZHUO_JI) {
                pl.menHuOfShow = [];
                pl.menHu = [];
                pl.menFlag = -1;
                pl.chongFengJi = [];
            }

            if (MjClient.gameType === MjClient.GAME_TYPE.XIANG_XI_96POKER || MjClient.gameType == MjClient.GAME_TYPE.EN_SHI_SHAO_HU) {
                pl.mjputType = [];
                pl.mjtie = [];
                pl.renNum = 0;
                pl.oldMjSort = [];
            }

            if (typeof(pl.winall) == "undefined") {
                pl.winall = 0;
            }
            //pl.xuanfengGang = [];
            //pl.fristPutCard = true;
            pl.isTing = false;
            pl.isTianting = false;

            // 三打哈开局清空玩家留守花色
            if (MjClient.gameType == MjClient.GAME_TYPE.SAN_DA_HA && sData.tData.areaSelectMode["zhuangFuXianShou"]) {
                pl.liuShouColor = 4;
            }

            // 武穴隔板玩家隔反状态复位
            if (MjClient.gameType == MjClient.GAME_TYPE.WU_XUE_GE_BAN) {
                pl.geState = -1;
                pl.gaiPai = false;
            }

            if(MjClient.rePlayVideo == -1)
            {
                delete pl.mjhand;
            }

            pl.mjState = TableState.waitPut;
            if (uid == SelfUid()) {
                pl.mjhand = d.mjhand;
                // 字牌初始化MjClient.HandCardArr数据
                if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_HU_ZI) {
                    MjClient.HandCardArr = [];
                    if (MjClient.majiang.sortCard) {
                        if (MjClient.gameType == MjClient.GAME_TYPE.DANG_YANG_FAN_JING ||
                            MjClient.gameType == MjClient.GAME_TYPE.YI_CHANG_SHANG_DA_REN) {
                            //当阳翻精排序参数特殊
                            var isCurDraw = tData.putType == 1 && tData.curPlayer == tData.uids.indexOf(uid);
                            MjClient.HandCardArr = MjClient.majiang.sortCard(pl.mjhand || [], isCurDraw);
                        } else if (MjClient.gameType == MjClient.GAME_TYPE.HU_BEI_HUA_PAI ||
                            MjClient.gameType == MjClient.GAME_TYPE.GONG_AN_HUA_PAI ||
                            MjClient.gameType == MjClient.GAME_TYPE.TONG_CHENG_GE_ZI_PAI) {
                            var isCurDraw = tData.putType == 1 && tData.curPlayer == tData.uids.indexOf(SelfUid());
                            MjClient.HandCardArr = MjClient.majiang.sortCard(pl.mjhand || [], pl.mjgang1 || [], isCurDraw);
                        } else {
                            MjClient.HandCardArr = MjClient.majiang.sortCard(pl.mjhand || [], 1);
                        }
                    }
                }
                pl.tingListAfterPut = d.tingListAfterPut;
                pl.handCount = pl.mjhand.length;
                pl.mjpeng4 = [];
                pl.eatFlag = d.eatFlag;
                MjClient.clickTing = false;
                MjClient.movingCard = null;
                MjClient.selectedCard = null;
                if ("yingkou" in pl) {
                    pl.yingkou = -1;
                }

                if ("que" in pl)
                {
                    pl.que = -1;
                }
                else if(tData.ques)
                {
                    pl.que = tData.ques[pl.info.uid];
                }

                if (d.isInitHandAllBlack != undefined) {
                    pl.isInitHandAllBlack = d.isInitHandAllBlack;
                }
                if ("hunCard" in pl) {
                    pl.hunCard = -1;
                }
                if (pl.tingLists)
                {
                    pl.tingLists = {};
                }
                if (pl.jiangjianghuLists) 
                {
                    pl.jiangjianghuLists = {};
                }
                if (pl.gangList) 
                {
                    pl.gangList = {};
                }
            }
            if ("hunCard" in pl) {
                pl.hunCard = -1;
            }

            if (d.flowers && d.flowers[uid]) {
                pl.mjflower = d.flowers[uid];
            }
            //cc.log("==============jiazhu=============jiazhuNums = " + JSON.stringify(d.jiazhuNums));
            if (d.jiazhuNums && d.jiazhuNums[uid]) {
                pl.jiazhuNum = d.jiazhuNums[uid];
            }
            if (d.winalls) {
                pl.winall = d.winalls[uid];
            }

            if (d.piaoFen && d.piaoFen[uid] != null) {
                pl.piaoFen = d.piaoFen[uid];
            }

            if (tData.gameType == MjClient.GAME_TYPE.EN_SHI_SHAO_HU) {
                pl.canNotPutCard = d.canNotPutCard;
            }

            if (MjClient.gameType != MjClient.GAME_TYPE.SHAO_YANG_ZI_PAI && MjClient.gameType != MjClient.GAME_TYPE.SHAO_YANG_BO_PI
                && MjClient.gameType != MjClient.GAME_TYPE.DA_ZI_BO_PI && MjClient.gameType != MjClient.GAME_TYPE.HY_SHI_HU_KA) { // 坑啊 把它挪出来
                if (d.jiachuiNums && d.jiachuiNums[uid]) {
                    pl.jiazhuNum = d.jiachuiNums[uid];
                }
            }
            
            // 估卖
            if (MjClient.gameType == MjClient.GAME_TYPE.GUI_ZHOU_GUI_YANG_ZHUO_JI) {
                if (d.guMaiNums && d.guMaiNums[uid] != undefined) {
                    pl.gumaiValue = d.guMaiNums[uid];
                }
            }
            
            if (MjClient.gameType == MjClient.GAME_TYPE.XIN_NING_MA_JIANG ||
                MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_MA_JIANG ||
                MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_ZI_PAI ||
                MjClient.gameType == MjClient.GAME_TYPE.HY_SHI_HU_KA || 
                MjClient.gameType == MjClient.GAME_TYPE.LENG_SHUI_JIANG_SHI_HU_DAO ||
                MjClient.gameType == MjClient.GAME_TYPE.XU_PU_PAO_HU_ZI
            ) { // 每一小局加锤 回放需要此消息更新加锤状态
                if (d.jiachuiNums && d.jiachuiNums[uid] != undefined) {
                    pl.jiachuiNum = d.jiachuiNums[uid];
                }
            }

            if (MjClient.gameType === MjClient.GAME_TYPE.DA_TONG_ZI_SHAO_YANG || 
                MjClient.gameType === MjClient.GAME_TYPE.LONG_HUI_BA_ZHA_DAN ||
                MjClient.gameType === MjClient.GAME_TYPE.BAN_BIAN_TIAN_ZHA) {
                for (var tid in sData.teams) {
                    var team = sData.teams[tid];
                    team.score_draw = 0;
                }
            }

            if(MjClient.gameType == MjClient.GAME_TYPE.JIN_ZHONG_LI_SI )
            {
                pl.cardFourCount = 4; //晋中立四初始化牌张数为4
                if (d.mjhandFour){
                    pl.mjhandFour = d.mjhandFour;
                }

                //回放的时候
                if (d.mjhandFours && d.mjhandFours[uid]) {
                    pl.mjhandFour = d.mjhandFours[uid];
                }
            }

            //溆浦跑胡子箍臭
            if (MjClient.gameType == MjClient.GAME_TYPE.XU_PU_PAO_HU_ZI) {
                pl.isGuChou = false;
            }

            //乡宁摔金需重置摔金,一脚赖油重置撑的次数
            if (MjClient.gameType == MjClient.GAME_TYPE.LIN_FEN_XIANG_NING_SHUAI_JIN ) {
                pl.rate = 0;
            }

            if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_YI_JIAO_LAI_YOU ||
                MjClient.gameType == MjClient.GAME_TYPE.HU_BEI_YI_JIAO_LAI_YOU ||
                MjClient.gameType == MjClient.GAME_TYPE.CHUO_XIA_ZI)
            {
                pl.rate = 0;
                pl.skipGang = [];
            }
            if (MjClient.gameType == MjClient.GAME_TYPE.XIN_ZHOU_SAN_DA_ER) {
                pl.jiaoFen = 0;
            }

            //岳阳福禄寿添加招
            if (MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_FU_LU_SHOU 
                ||MjClient.gameType == MjClient.GAME_TYPE.FU_LU_SHOU_ER_SHI_ZHANG  ) {
                pl.mjzhao0 = [];        //他人送的招
                pl.mjzhao1 = [];        //自己摸的招
                //pl.lastPiaoFen = -1;    //上一局的飘分
                //pl.piaoFen = -1;        //选择的飘分
                pl.isTing = false;      //是否自动摸打状态
                pl.newSendCard = 0;        //新进的牌
                pl.isTuoGuan = false;       //是否托管
            }
            if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_WAI_HU_ZI || MjClient.gameType == MjClient.GAME_TYPE.YI_YANG_WAI_HU_ZI
                || MjClient.gameType == MjClient.GAME_TYPE.NAN_XIAN_GUI_HU_ZI || MjClient.gameType == MjClient.GAME_TYPE.YUAN_JIANG_GUI_HU_ZI || 
                MjClient.gameType == MjClient.GAME_TYPE.AN_XIANG_WEI_MA_QUE){
                pl.mjputType = [];//摸牌标志
                pl.isDead = false;
                pl.mjgang2 = [];
                pl.mjgang3 = [];
            }

            //掂坨 || 打炸弹
            if (MjClient.gameType == MjClient.GAME_TYPE.DIAN_TUO || MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_DA_ZHA_DAN) {
                pl.teamerHand = []; //队友手牌 
                pl.handCount = tData.handCount;
            }

            //安乡偎麻雀记录起手牌
            if (MjClient.gameType == MjClient.GAME_TYPE.AN_XIANG_WEI_MA_QUE) {
                pl.zheCards = [];
                pl.canNotPutCard = [];
                var dict = {};
                for (var i = 0; i < d.mjhand.length; i++) {
                    var cd = d.mjhand[i];
                    dict[cd] = dict[cd] ? dict[cd] + 1 : 1;
                }
                
                for(var c in dict){
                    if (dict[c] == 3) {
                        pl.canNotPutCard.push(Number(c));
                    }
                }
            }

            //公安花牌死手
            if (MjClient.gameType == MjClient.GAME_TYPE.GONG_AN_HUA_PAI) {
                pl.isDead = false;
            }
        }

        // 海安麻将先要骰子
        if(MjClient.gameType != MjClient.GAME_TYPE.HAI_AN_MJ &&
            MjClient.gameType != MjClient.GAME_TYPE.XUE_ZHAN &&
            MjClient.gameType != MjClient.GAME_TYPE.XUE_LIU  &&
            MjClient.gameType != MjClient.GAME_TYPE.CHANG_SHA &&
            MjClient.gameType != MjClient.GAME_TYPE.XIANG_YIN_TUI_DAO_HU &&
            MjClient.gameType != MjClient.GAME_TYPE.PING_JIANG_ZHA_NIAO &&
            MjClient.gameType != MjClient.GAME_TYPE.ML_HONGZHONG &&
            MjClient.gameType != MjClient.GAME_TYPE.ML_HONGZHONG_ZERO &&
            MjClient.gameType != MjClient.GAME_TYPE.CHEN_ZHOU &&
            MjClient.gameType != MjClient.GAME_TYPE.NING_XIANG_MJ &&
            MjClient.gameType != MjClient.GAME_TYPE.YUAN_JIANG_MJ &&
            MjClient.gameType != MjClient.GAME_TYPE.HU_BEI_JING_SHAN_MJ &&
            MjClient.gameType != MjClient.GAME_TYPE.DA_YE_KAI_KOU_FAN &&
            MjClient.gameType != MjClient.GAME_TYPE.HONG_ZHONG_LAI_ZI_GANG &&
            MjClient.gameType != MjClient.GAME_TYPE.XIN_ZHOU_SAN_DA_ER &&
            MjClient.gameType != MjClient.GAME_TYPE.YUE_YANG_YI_JIAO_LAI_YOU &&
            MjClient.gameType != MjClient.GAME_TYPE.HU_BEI_YI_JIAO_LAI_YOU &&
            MjClient.gameType != MjClient.GAME_TYPE.CHUO_XIA_ZI &&
            MjClient.gameType != MjClient.GAME_TYPE.XIAO_GAN_KA_WU_XING &&
            MjClient.gameType != MjClient.GAME_TYPE.SUI_ZHOU_KA_WU_XING &&
            MjClient.gameType != MjClient.GAME_TYPE.MJ_ZHUO_XIA_ZI &&
            MjClient.gameType != MjClient.GAME_TYPE.HENG_YANG_CHANG_SHA &&
            MjClient.getAppType() != MjClient.APP_TYPE.HUNANWANGWANG &&
            MjClient.getAppType() != MjClient.APP_TYPE.QXSYDTZ &&
            MjClient.getAppType() != MjClient.APP_TYPE.QXLYQP &&
            MjClient.getAppType() != MjClient.APP_TYPE.BDHYZP && 
            MjClient.GAME_CLASS.PAO_HU_ZI != GameClass[MjClient.gameType])
        {
            playEffect("shuffle");
        }

        if ("isTianting" in d) {
            cc.log("灌云天听", d.isTianting);
            sData.players[SelfUid()].isTianting = d.isTianting;
        }


        if (MjClient.gameType == MjClient.GAME_TYPE.HONG_TONG_WANG_PAI && sData.tData.areaSelectMode["wanfa"] == "duiwangdajiangbao") {
            tData.tState = TableState.waitWang;
            cc.log("==============waitwant===========" + sData.tData.areaSelectMode["wanfa"]);
        }

        if(MjClient.gameType === MjClient.GAME_TYPE.XIANG_XI_2710){
            tData.lastPutCard = -1;
        }

        if (MjClient.gameType == MjClient.GAME_TYPE.XUE_ZHAN) {
            tData.tState = TableState.waitSelect;
        }
        if (MjClient.gameType == MjClient.GAME_TYPE.XUE_LIU) {
            tData.tState = TableState.waitSelect;
        }

        if ((MjClient.gameType === MjClient.GAME_TYPE.GUI_ZHOU_PU_DING_MJ
            || MjClient.gameType === MjClient.GAME_TYPE.GUI_ZHOU_SAN_DING_GUAI
            || MjClient.gameType === MjClient.GAME_TYPE.GUI_ZHOU_ER_DING_GUAI
            || MjClient.gameType === MjClient.GAME_TYPE.GUI_ZHOU_XMY_GUI_YANG_ZHUO_JI
            )
            && tData.maxPlayer !== 4) { //2,3 人才用定缺
            tData.tState = TableState.waitSelect;
        }

        if (MjClient.gameType === MjClient.GAME_TYPE.GUI_ZHOU_GUI_YANG_ZHUO_JI && (tData.maxPlayer !== 4 && tData.areaSelectMode.dingque)) {
            tData.tState = TableState.waitSelect;
        }

        var pl = sData.players[SelfUid()];

        if (MjClient.gameType == MjClient.GAME_TYPE.ZP_LY_CHZ) {
            pl.isPutCardOnce = true;
            pl.canNotPutCard = [];
            pl.limitHuPutCard = [];
            pl.limitHuTypeList = [];
        }

        if(d.mjhandDatas){
            for(var uid in d.mjhandDatas){
                var obj = d.mjhandDatas[uid];
                var pl = sData.players[uid];
                if(pl){
                    pl.linkZhuang = obj.linkZhuang;
                    pl.dirNumber = obj.dirNumber;
                }
            }
        }
        if ("dirNumber" in d)//标记个人方位 0：东  1：南 2：西 3：北
        {
            pl.dirNumber = d.dirNumber;
        }
        // cc.log("after mjhand  ==========="+JSON.stringify(sData.players));

        if (MjClient.putTypeSaved)
            delete MjClient.putTypeSaved;
    }],
    MJPass: [0, function (d) {
        var sData = MjClient.data.sData;
        if (!sData) return;
        
        var tData = sData.tData;
        tData.haveTianTing = false;
        var pl = sData.players[SelfUid()];
        if(d.isDoTianTing){
            cc.log("==================mjpass d = " + JSON.stringify(d));
            if(d.uid == SelfUid())
            {
                pl.isDoTianTing = d.isDoTianTing;
            }
        }
        if(d.passTianTing) return; //贵州的app,特殊听牌流程

        if (!sData) return;
        pl.mjState = d.mjState;
        pl.skipPeng = d.skipPeng;
        pl.skipHu = d.skipHu;
        pl.isQiHu = d.isQiHu;
        //console.log("====isQiHu---", JSON.stringify(d));
        if(GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_HU_ZI){
            pl.passHu = (pl.eatFlag & 32);
        }

        if(MjClient.gameType == MjClient.GAME_TYPE.JING_ZHOU_MA_JIANG){//靖州麻将
            if(tData.hasOwnProperty("dengHuPlayers"))
                tData.dengHuPlayers = null;
        }
        
        if(GameClass[MjClient.gameType] == MjClient.GAME_CLASS.MA_JIANG){
            pl.passHu = (pl.eatFlag & 8);
        }
        if (MjClient.gameType == MjClient.GAME_TYPE.XU_PU_LAO_PAI) {
            pl.passHu = (pl.eatFlag & 8);
        }
        pl.eatFlag = 0;
        pl.isBBHu = false;

        if(MjClient.gameType === MjClient.GAME_TYPE.XIANG_XI_2710){
            pl.skipArr = d.skipArr;
            pl.limitChiAndHuMatrix = d.limitChiAndHuMatrix;
        }
        
        if (d.needTing) 
        {
            pl.needTing = d.needTing;
        }

        if ("isPass" in d) 
        {
            pl.isPass = d.isPass;
        }
        else
        {
            pl.isPass = false;
        }

        if(d.isDoTianTing) pl.isDoTianTing = d.isDoTianTing;

        if (pl.eatFlag & 32)
        {
            MjClient.showToast("您放弃了胡牌");
        }

        if (MjClient.gameType == MjClient.GAME_TYPE.CHANG_SHA || 
            MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_CHANG_SHA) {
            pl.eatFlag2 = 0;
            pl.eatFlag3 = 0;
            pl.eatFlag4 = 0;
        }
        else if (MjClient.gameType === MjClient.GAME_TYPE.XIANG_YIN_TUI_DAO_HU ||
            MjClient.gameType === MjClient.GAME_TYPE.PING_JIANG_ZHA_NIAO )
            pl.eatFlag2 = 0;

        
        if ("mjState" in d) 
        {
            pl.mjState = d.mjState;
        }
        if ("tState" in d) 
        {
            tData.tState = d.tState;
        }
        pl.wangType = 0;
        pl.wangStatus = false;
        pl.touzi = false;


        COMMON_UI.clearShowCurrentEatCards();
    }],
    MJSelectCard: [0, function (d) {
        cc.log("")
        var sData = MjClient.data.sData;
        if (!sData) return;
        var tData = sData.tData;
        sData.players[d.uid].hunCard = parseInt(d.card);
        tData.tState = d.tState;
    }],
    changeState: [0, function (d) {
        var sData = MjClient.data.sData;
        if (MjClient.gameType == MjClient.GAME_TYPE.NING_XIANG_MJ) 
        {   
            if (d.tState) 
            {
                sData.tData.tState = d.tState;
            }
        }
    }],
    MJPassQsHu: [0, function (d) {
        var sData = MjClient.data.sData;
        if (MjClient.gameType == MjClient.GAME_TYPE.NING_XIANG_MJ) 
        {         
            var pl = sData.players[d.passuid];
            if ("needTing" in d) 
            {
                pl.needTing = d.needTing;
            }
            if (d.tingCard) 
            {
                pl.tingCard = d.tingCard;
            }
            pl.mjState = d.mjState;
        }
    }],
    MJPassBaoTing: [0, function (d) {
        var sData = MjClient.data.sData;
        var pl = sData.players[d.passuid];
        if (d.uid == SelfUid() ) 
        {
            if ("eatFlag" in d) 
            {
                pl.eatFlag = d.eatFlag;
            }
        }
        if ("tingFinish" in d) 
        {
            pl.tingFinish = d.tingFinish;
        }
        if (MjClient.GAME_TYPE.YUAN_JIANG_MJ == MjClient.gameType ||
            MjClient.GAME_TYPE.NAN_XIAN_MJ == MjClient.gameType ||
            MjClient.gameType == MjClient.GAME_TYPE.NING_XIANG_MJ) 
        {
            pl.needTing = false;
        }

    }],
    zhuangflag: [0, function (d) {
        var sData = MjClient.data.sData;
        var pl = sData.players[d.uid];
        if (d.uid == SelfUid() && "eatFlag" in d) 
        {
            pl.eatFlag = d.eatFlag;
        }
    }]
    ,MJSelect: [0, function (d) {
        cc.log("d-------MJSelect--------",JSON.stringify(d));
        var sData = MjClient.data.sData;
        if (!sData) return;
        var tData = sData.tData;
        //sData.players[d.uid].que = parseInt(d.que);
        if (MjClient.GAME_TYPE.XUE_ZHAN === MjClient.gameType ||
            MjClient.GAME_TYPE.XUE_LIU === MjClient.gameType)
        {
            if (d.uid == SelfUid())
            {
                sData.players[SelfUid()].que = parseInt(d.que);
                sData.players[SelfUid()].eatFlag = d.eatFlag;
            }
            tData.tState = d.tState;
        }

        if(MjClient.gameType === MjClient.GAME_TYPE.GUI_ZHOU_PU_DING_MJ
            || MjClient.gameType === MjClient.GAME_TYPE.GUI_ZHOU_SAN_DING_GUAI
            || MjClient.gameType === MjClient.GAME_TYPE.GUI_ZHOU_ER_DING_GUAI
            || MjClient.gameType === MjClient.GAME_TYPE.GUI_ZHOU_XMY_GUI_YANG_ZHUO_JI
            || MjClient.gameType === MjClient.GAME_TYPE.GUI_ZHOU_GUI_YANG_ZHUO_JI){
            if (d.uid === SelfUid())
            {
                sData.players[SelfUid()].que = d.que;
                sData.players[SelfUid()].eatFlag = d.eatFlag;
            }
            tData.tState = d.tState;

        }
        if(MjClient.GAME_TYPE.LUAN_GUA_FENG == MjClient.gameType){
            if(d.liangfengInfo && d.uid == SelfUid()){
                if (d.tDataChanged) {
                    for (var k in d.tDataChanged) {
                        sData.tData[k] = d.tDataChanged[k];
                    }
                }
                else {
                    sData.tData = d;
                }

                var lp = sData.players[d.uid];
                lp.liangfengCount = lp.mjflower.length;
                lp.mjflower = d.liangfengInfo.mjflower;
                lp.buCards = d.liangfengInfo.buCards;


                if (d.eatFlag)
                {
                    lp.eatFlag = d.eatFlag;
                }

                if (lp.info.uid == SelfUid())
                {
                    if (d.liangfengInfo.mjflower) {
                        lp.mjflower = d.liangfengInfo.mjflower;
                        for (var i = 0; i < d.liangfengInfo.mjflower.length; i++) {
                            var p = lp.mjhand.indexOf(d.liangfengInfo.mjflower[i]);
                            if (p >= 0) {
                                lp.mjhand.splice(p, 1);
                            }
                        }
                    }
                    if (d.liangfengInfo.buCards)
                    {
                        for (var i = 0; i < d.liangfengInfo.buCards.length; i++) {
                            lp.mjhand.push(d.liangfengInfo.buCards[i]);
                        }
                    }
                }

            }
            var lp = sData.players[d.uid];
            lp.mjState = TableState.waitPut;
        }
    }]
    , PKPass: [0, function (d) {
        var sData = MjClient.data.sData;
        if (!sData) return;
        var tData = sData.tData;
        var pl = sData.players[SelfUid()];
        pl.mjState = d.mjState;

        if(MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_JZ ||
           MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_ZERO || 
           MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_GZ){
            //晋中斗地主不播
        }else if(MjClient.gameType == MjClient.GAME_TYPE.DIAN_TUO || 
            MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_DA_ZHA_DAN){

        } else {
            playEffectInPlay("pass");
        }

        if(MjClient.gameType == MjClient.GAME_TYPE.DIAN_TUO){
            if(tData.isFirstSingleCard == 1)
                tData.isFirstSingleCard = -1; 
        }

        if(MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI){
            pl.wangType = 0;
            pl.wangStatus = false;
        }

        if(MjClient.gameType == MjClient.GAME_TYPE.DA_TONG_ZI_SHAO_YANG){
            pl = sData.players[d.uid];
            if(pl){
                pl.trustTime = 0;
            }
        }

        if (MjClient.putTypeSaved)
            delete MjClient.putTypeSaved;
    }]
    , waitHaiDiLao: [0, function (d) {

    }]
    , MJSelectHaiDiLao:[0, function (d) {

    }]
    , waitBanbanhu:[0, function (d) {
        var sData = MjClient.data.sData;
        if (d.tDataChanged) {
            for (var k in d.tDataChanged) {
                sData.tData[k] = d.tDataChanged[k];
            }
        }
        if ("banbanhuList" in d) 
        {
            for (var i = 0; i < d.banbanhuList.length; i++) {
                var pl = sData.players[d.banbanhuList[i]];
                pl.isBBHu = true;
            }
        }

    }]
    , MJBBhu:[0, function (d) {
        var sData = MjClient.data.sData;
        var pl = sData.players[d.uid];
        sData.tData.cardNext = d.cardNext;
        pl.isBBHu = false;
        if (d.mjput) 
        {
            pl.mjput = d.mjput;
        }
        if (MjClient.gameType == MjClient.GAME_TYPE.PING_JIANG_ZHA_NIAO) 
        {
            if (d.clearBBHu) 
            {
                for (var i = 0; i < sData.tData.maxPlayer; i++) {
                    uid = sData.tData.uids[i];
                    var pl = sData.players[uid];
                    if (pl)
                    {
                        pl.isBBHu = false;
                    } 
                }
                
            }
        }
    }]
    , sendKaiGangCard: [1, function (d) {
        cc.log("=======================App.js sendKaiGangCard=================================" + JSON.stringify(d));
        var sData = MjClient.data.sData;
        if (!sData) return;
        var tData = sData.tData;
        tData.cardNext = d.cardNext;
        tData.lastPutCard = d.card1;
        tData.lastPutCard2 = d.card2;
        tData.lastPutCard3 = d.card3;
        tData.lastPutCard4 = d.card4;

        tData.tState = TableState.waitEat;
        tData.putType = d.putType;
        
        var pl = sData.players[d.uid];
        pl.skipPeng = d.skipPeng;
        pl.justPeng = 0;
        pl.mjput.push(d.card1);
        if (d.card2 != -1)
            pl.mjput.push(d.card2);
        if (d.card3 && d.card3 != -1)
            pl.mjput.push(d.card3);
        if (d.card4 && d.card4 != -1)
            pl.mjput.push(d.card4);

        if (MjClient.gameType == MjClient.GAME_TYPE.PING_JIANG_ZHA_NIAO) 
        {
            if ("kaigangs" in d) 
            {
                tData.kaigangs = d.kaigangs;
            }
            if (d.card2 != -1)
            {
                pl.mjput.pop();//平江扎鸟每次只放入一张，第二张在sendKaiGangCard2中放入
            }
            var kaigangData = tData.kaigangs[tData.kaigangs.length - 1];
            if (kaigangData.cards && kaigangData.fanIndex) 
            {
                tData.lastPutCard = kaigangData.cards[kaigangData.fanIndex];
            }
            tData.isKaigang = true;
            if ("isKaigang" in d) 
            {
                tData.isKaigang = d.isKaigang;
            }
            for(var uid in d.canEats) {
                sData.players[uid].canEat = d.canEats[uid];
            }
            
            //cc.log("已出牌   sendKaiGangCard",pl.mjput,d.card1,d.card2,d.uid);
        }

        pl.putType = 1;

        if (d.uid == SelfUid()) {
            pl.mjState = TableState.waitPut;
            MjClient.clickTing = false;
            MjClient.movingCard = null;
            MjClient.selectedCard = null;
            pl.skipHu = d.skipHu;
            pl.isQiHu = d.isQiHu;
            //console.log("====isQiHu---", JSON.stringify(d));
            if (MjClient.gameType == MjClient.GAME_TYPE.NING_XIANG_MJ){
                for(var uid in d.tingListAfterPut) {
                    sData.players[uid].tingListAfterPut = d.tingListAfterPut[uid];
                }
            }
            else{
                if ("tingListAfterPut" in d) 
                {
                    pl.tingListAfterPut = d.tingListAfterPut;
                }  
            }   
        }
        else {
            sData.players[SelfUid() + ""].mjState = TableState.waitEat;
        }

        for(var uid in d.eatFlags) {
            sData.players[uid].eatFlag = d.eatFlags[uid];
        }
        if (d.canKaiGangs) {
            for(var uid in d.canKaiGangs) {
                sData.players[uid].canKaiGang = d.canKaiGangs[uid];
            }
            
        }
        if (d.kaigangLists) {
            for(var uid in d.kaigangLists) {
                sData.players[uid].kaigangList = d.kaigangLists[uid];
            }
        }

        for(var uid in d.eatFlags2) {
            sData.players[uid].eatFlag2 = d.eatFlags2[uid];
        }

        if (d.eatFlags3) {
            for(var uid in d.eatFlags3) {
                sData.players[uid].eatFlag3 = d.eatFlags3[uid];
            }
        }

        if (d.eatFlags4) {
            for(var uid in d.eatFlags4) {
                sData.players[uid].eatFlag4 = d.eatFlags4[uid];
            }
        }

        if (d.skipHus) {
            for(var uid in d.skipHus) {
                sData.players[uid].skipHu = d.skipHus[uid];
            }
        }
        if ("putCount" in d) {
            pl.putCount = d.putCount;
        }
    }],
    sendKaiGangCard2: [1, function (d) {
        cc.log("=======================App.js sendKaiGangCard2=================================" + JSON.stringify(d));
        var sData = MjClient.data.sData;
        if (!sData) return;
        var tData = sData.tData;

        if (d.card2)
        tData.lastPutCard = d.card2;

        var pl = sData.players[d.uid];
        tData.tState = TableState.waitEat;
        tData.putType = d.putType;
        if ("cardNext" in d) 
        {
            tData.cardNext = d.cardNext;
        }
        if ("curPlayer" in d) 
        {
            tData.curPlayer = d.curPlayer;
        }
        if (MjClient.gameType == MjClient.GAME_TYPE.PING_JIANG_ZHA_NIAO) 
        {
            if ("kaigangs" in d) 
            {
                tData.kaigangs = d.kaigangs;
            }
            for(var uid in d.canEats) {
                sData.players[uid].canEat = d.canEats[uid];
            }
            var kaigangData = tData.kaigangs[tData.kaigangs.length - 1];
            if (kaigangData.cards && kaigangData.fanIndex) 
            {
                tData.lastPutCard = kaigangData.cards[kaigangData.fanIndex];
            }
            tData.isKaigang = true;
            if ("isKaigang" in d) 
            {
                tData.isKaigang = d.isKaigang;
            }
        }
        
        pl.skipPeng = d.skipPeng;
        if (tData.lastPutCard != -1)
            pl.mjput.push(tData.lastPutCard);
        pl.putType = 1;

        if (d.uid == SelfUid()) {
            pl.mjState = TableState.waitPut;
            MjClient.clickTing = false;
            MjClient.movingCard = null;
            MjClient.selectedCard = null;
            pl.skipHu = d.skipHu;
            pl.isQiHu = d.isQiHu;
            //console.log("====isQiHu---", JSON.stringify(d));
            if ("tingListAfterPut" in d) 
            {
                pl.tingListAfterPut = d.tingListAfterPut;
            }
            if (d.gangList) 
            {
                pl.gangList = d.gangList;
            }
        }
        else {
            sData.players[SelfUid() + ""].mjState = TableState.waitEat;
        }
/*
        for(var uid in d.eatFlags) {
            sData.players[uid].eatFlag = d.eatFlags[uid];
        }*/
/*        for(var uid in d.canKaiGangs) {
            sData.players[uid].canKaiGang = d.canKaiGangs[uid];
        }*/
        if (d.kaigangLists) {
            for(var uid in d.kaigangLists) {
                sData.players[uid].kaigangList = d.kaigangLists[uid];
            }
        }

        if (d.eatFlags) 
        {
            for(var uid in d.eatFlags) {
                sData.players[uid].eatFlag = d.eatFlags[uid];
            }
        }


/*        if (d.skipHus) {
            for(var uid in d.skipHus) {
                sData.players[uid].skipHu = d.skipHus[uid];
            }
        }
        if ("putCount" in d) {
            pl.putCount = d.putCount;
        }*/
    }]
    , MJPut: [0, function (d) {
        //cc.log("=======================App.js MJPut=================================" + JSON.stringify(d));
        var sData = MjClient.data.sData;
        if (!sData) return;
        var tData = sData.tData;
        tData.lastPutCard = d.card;
        if(GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_HU_ZI){
            tData.currCard = d.card;
        }
        tData.tState = TableState.waitEat;
        tData.putType = d.putType;
        if(MjClient.gameType === MjClient.GAME_TYPE.NING_XIANG_KAI_WANG){
            tData.firstCard = d.firstCard;
        }
        var pl = sData.players[d.uid];
        if(pl.buCards){
            pl.buCards = [];
        }
        if("allGangMul" in d){//一痞二赖的倍数
            pl.allGangMul = d.allGangMul;
        }

        if("taiZhuangState" in d){//一痞二癞抬庄
            pl.taiZhuangState = d.taiZhuangState;
        }

        if ("yingkou" in d) {
            pl.yingkou = d.yingkou;
        }

        if ("needTing" in pl) 
        {
            pl.needTing = false;
        }

        if("dengHuPlayers" in d){//靖州麻将等胡操作
            tData.dengHuPlayers = d.dengHuPlayers;
        }

        if (d.canEat) {
            sData.players[d.chiUid].canEat = d.canEat;
            // for(var uid in d.canEat) {
            //     sData.players[uid].canEat = d.canEat[uid];
            // }
        }
        var  pl_self = sData.players[SelfUid()];
        if ("isPass" in pl_self) 
        { 
            pl_self.isPass = false;
        } 

        pl.skipPeng = d.skipPeng;
        pl.skipGang = d.skipGang;

        if(d.skipMingGang){
            pl.skipMingGang = d.skipMingGang;
        }
        if(MjClient.playui && MjClient.playui.isNewFrameMaJiang){
            pl.isNew = false;
        }
        //贵州的天听逻辑
        tData.haveTianTing = false;
        if(d.haveTianTing) tData.haveTianTing = true;
        //安乡偎麻雀摸牌是否显示牌背
        if(MjClient.gameType == MjClient.GAME_TYPE.AN_XIANG_WEI_MA_QUE) {
            tData.isCurrCardHide = d.isCurrCardHide;
        }

        if ((MjClient.gameType == MjClient.GAME_TYPE.HU_BEI_YI_JIAO_LAI_YOU
            || MjClient.gameType == MjClient.GAME_TYPE.CHUO_XIA_ZI) && d.rate) {
            pl.rate = d.rate;
        }

        //pl.fristPutCard = d.fristPutCard;
        pl.mjput.push(d.card);

        if ((MjClient.gameType == MjClient.GAME_TYPE.HUANG_SHI_HH_MJ ||
            MjClient.gameType == MjClient.GAME_TYPE.QI_CHUN_HH_MJ) &&
            d.gangCard) {
            pl.gangCards.push(d.gangCard);
            pl.mjput.pop();
        }

        if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_WAI_HU_ZI || MjClient.gameType == MjClient.GAME_TYPE.YI_YANG_WAI_HU_ZI
            || MjClient.gameType == MjClient.GAME_TYPE.NAN_XIAN_GUI_HU_ZI || MjClient.gameType == MjClient.GAME_TYPE.YUAN_JIANG_GUI_HU_ZI ||
            MjClient.gameType == MjClient.GAME_TYPE.AN_XIANG_WEI_MA_QUE || MjClient.gameType == MjClient.GAME_TYPE.XIANG_XI_96POKER
            || MjClient.gameType == MjClient.GAME_TYPE.EN_SHI_SHAO_HU){
            pl.mjputType.push(0);
            cc.log("MJPut mjputType", " pl = " + JSON.stringify(pl));
        }
        if (MjClient.gameType == MjClient.GAME_TYPE.YUN_CHENG_TIE_JIN || MjClient.gameType == MjClient.GAME_TYPE.HE_JIN_KUN_JIN) 
        {
            if (d.card == tData.hunCard || d.card == tData.hunCard2) 
            {
                pl.jinMjPut.push(d.card);
            }
        }
        pl.putType = 1;
        pl.justPeng = 0;
        //pl.isTing = d.isTing;


        /*
            自动打牌，如果改成后台主动发给前端，非玩家主动操作的，不能把online直接设成true状态
         */
        if(MjClient.gameType != MjClient.GAME_TYPE.LIN_FEN_YI_MEN_ZI &&
            MjClient.gameType != MjClient.GAME_TYPE.LIN_FEN_YING_SAN_ZUI && GameClass[MjClient.gameType] != MjClient.GAME_CLASS.PAO_HU_ZI)
        {
            pl.onLine = true;
        }


        if(MjClient.gameType == MjClient.GAME_TYPE.DA_YE_KAI_KOU_FAN ||
            MjClient.gameType == MjClient.GAME_TYPE.HONG_ZHONG_LAI_ZI_GANG){//大冶开口番 红中癞子杠
            if(d.gangType == 1 || d.gangType == 2 || d.gangType == 3){//红中杠:1 发财杠:2 癞子杠:3
                pl.mjPiZiGang.push(d.card);
                pl.mjput.pop();
            }
        }

        if (MjClient.gameType == MjClient.GAME_TYPE.CHANG_SHA ||
            MjClient.gameType === MjClient.GAME_TYPE.XIANG_YIN_TUI_DAO_HU ||
            MjClient.gameType === MjClient.GAME_TYPE.PING_JIANG_ZHA_NIAO ||
            MjClient.gameType === MjClient.GAME_TYPE.HENG_YANG_CHANG_SHA)
        {
            tData.lastPutCard2 = null;
            tData.lastPutCard3 = null;
            tData.lastPutCard4 = null;
        }
        if (MjClient.gameType === MjClient.GAME_TYPE.PING_JIANG_ZHA_NIAO) 
        {
            tData.isKaigang = false;
        }

        //console.log("=====doomsky say:pl.mjhand====== , pl.ting", pl.mjhand);
        if(d.card < 111){ //补花在MJFlower播放
            if(MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
                MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ || MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ ||
                MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP ||
                MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP)
            {
                if ((MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
                    MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ || MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ ||
                    MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP) && d.uid == SelfUid() && 
                    GameClass[MjClient.gameType] == MjClient.GAME_CLASS.MA_JIANG) 
                { // 先行音效已播过，所以不再二次播放
                    if(MjClient.rePlayVideo != -1 ){
                        playEffectInPlay(d.card); 
                    }
                    else if (d.uid == SelfUid() && 
                        (MjClient.gameType == MjClient.GAME_TYPE.ML_HONGZHONG ||
                            MjClient.gameType == MjClient.GAME_TYPE.ML_HONGZHONG_ZERO||
                            MjClient.gameType == MjClient.GAME_TYPE.TY_HONGZHONG ||
                         MjClient.gameType == MjClient.GAME_TYPE.TY_ZHUANZHUAN ||
                        MjClient.gameType === MjClient.GAME_TYPE.YUE_YANG_HONG_ZHONG || 
                        MjClient.gameType === MjClient.GAME_TYPE.AN_HUA_MA_JIANG || 
                        MjClient.gameType === MjClient.GAME_TYPE.NING_XIANG_KAI_WANG || 
                        MjClient.gameType === MjClient.GAME_TYPE.TAO_JIANG_MA_JIANG || 
                         MjClient.gameType == MjClient.GAME_TYPE.XIANG_YIN_TUI_DAO_HU ||
                         MjClient.gameType == MjClient.GAME_TYPE.XIAO_GAN_KA_WU_XING ||
                         MjClient.gameType == MjClient.GAME_TYPE.SUI_ZHOU_KA_WU_XING ||
                         MjClient.gameType == MjClient.GAME_TYPE.CHANG_SHA ||
                         MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_YI_JIAO_LAI_YOU ||
                         MjClient.gameType == MjClient.GAME_TYPE.HU_BEI_JING_SHAN_MJ ||
                         MjClient.gameType == MjClient.GAME_TYPE.DA_YE_KAI_KOU_FAN ||
                         MjClient.gameType == MjClient.GAME_TYPE.HONG_ZHONG_LAI_ZI_GANG ||
                         MjClient.gameType == MjClient.GAME_TYPE.HU_BEI_YI_JIAO_LAI_YOU ||
                         MjClient.gameType == MjClient.GAME_TYPE.CHUO_XIA_ZI
                        )&& pl.tPutCard == true) 
                    {
                        //红中麻将 自动摸打时自己出牌声音在MJput时播放
                        playEffectInPlay(d.card);
                    }


                }
                else {
                    if (MjClient.gameClass == MjClient.GAME_CLASS.MA_JIANG ||
                        MjClient.gameClass == MjClient.GAME_CLASS.CHANG_PAI )
                    {
                        playEffect("give");
                    }
                    if (MjClient.gameType != MjClient.GAME_TYPE.XU_PU_PAO_HU_ZI &&
                        MjClient.gameType != MjClient.GAME_TYPE.XIANG_XI_96POKER) {  //这两个玩法音效的牌不一定 <111
                        playEffectInPlay(d.card);  
                    }
                }
            }else if (!(d.uid == SelfUid() && GameClass[MjClient.gameType] == MjClient.GAME_CLASS.MA_JIANG && MjClient.rePlayVideo == -1))//出牌前端先行，所有麻将中自己出的牌在PutOutCard中播放音效
            {
                var gameClass = GameClass[MjClient.gameType];
                if (gameClass == MjClient.GAME_CLASS.MA_JIANG ||
                    gameClass == MjClient.GAME_CLASS.CHANG_PAI )
                {
                    playEffect("give");
                }


                if(MjClient.gameType == MjClient.GAME_TYPE.JIN_ZHONG_MJ ||
                    MjClient.gameType == MjClient.GAME_TYPE.JIN_ZHONG_CAI_SHEN ||
                    MjClient.gameType == MjClient.GAME_TYPE.JIN_ZHONG_LI_SI ||
                    MjClient.gameType == MjClient.GAME_TYPE.JIN_ZHONG_TUI_DAO_HU ||
                    MjClient.gameType == MjClient.GAME_TYPE.JIN_ZHONG_KD ||
                    MjClient.gameType == MjClient.GAME_TYPE.YUN_CHENG_FENG_HAO_ZI ||
                    MjClient.gameType == MjClient.GAME_TYPE.YUN_CHENG_TIE_JIN ||
                    MjClient.gameType == MjClient.GAME_TYPE.HE_JIN_KUN_JIN ||
                    MjClient.gameType == MjClient.GAME_TYPE.LV_LIANG_MA_JIANG ||
                    MjClient.gameType == MjClient.GAME_TYPE.ZHUO_HAO_ZI ||
                    MjClient.gameType == MjClient.GAME_TYPE.LING_SHI_BIAN_LONG ||
                    MjClient.gameType == MjClient.GAME_TYPE.LING_SHI_BAN_MO ||
                    MjClient.gameType == MjClient.GAME_TYPE.PING_YAO_KOU_DIAN ||
                    MjClient.gameType == MjClient.GAME_TYPE.PING_YAO_MA_JIANG||
                    MjClient.gameType == MjClient.GAME_TYPE.JIE_XIU_1_DIAN_3||
                    MjClient.gameType == MjClient.GAME_TYPE.JIE_XIU_KOU_DIAN ||
                    MjClient.gameType == MjClient.GAME_TYPE.JIN_ZHONG_GUAI_SAN_JIAO||
                    MjClient.gameType == MjClient.GAME_TYPE.SHOU_YANG_QUE_KA ||
                    MjClient.gameType == MjClient.GAME_TYPE.LIN_FEN_YING_SAN_ZUI ||
                    MjClient.gameType == MjClient.GAME_TYPE.DAI_XIAN_MA_JIANG ||
                    MjClient.gameType == MjClient.GAME_TYPE.LIN_FEN_YI_MEN_ZI ||
                    MjClient.gameType == MjClient.GAME_TYPE.FEN_XI_YING_KOU ||
                    MjClient.gameType == MjClient.GAME_TYPE.LIN_FEN_KOU_DIAN_FENG_ZUI_ZI||
                    MjClient.gameType == MjClient.GAME_TYPE.WU_TAI_KOU_DIAN ||
                    MjClient.gameType == MjClient.GAME_TYPE.JI_XIAN_1928_JIA_ZHANG||
                    MjClient.gameType == MjClient.GAME_TYPE.LIN_FEN_XIANG_NING_SHUAI_JIN ||
                    MjClient.gameType == MjClient.GAME_TYPE.DA_NING_SHUAI_JIN ||
                    MjClient.gameType == MjClient.GAME_TYPE.FEN_YANG_QUE_MEN  ||
                    MjClient.gameType == MjClient.GAME_TYPE.JING_LE_KOU_DIAN
                )
                {
                    var putnum = pl.mjput.length - 1;
                    if(pl.putCardAfterTing >= 0 && pl.putCardAfterTing == putnum)
                    {
                        cc.log("----------盖住的牌不播声音------晋中麻将----");
                    }
                    else
                    {
                        playEffectInPlay(d.card);
                    }
                }
                else {
                    var putnum = pl.mjput.length - 1;
                    if(MjClient.gameType == MjClient.GAME_TYPE.XIAO_YI_KOU_DIAN &&
                        MjClient.data.sData.tData.areaSelectMode["anting"] &&
                        pl.putCardAfterTing >= 0 && pl.putCardAfterTing == putnum){

                    }else if(MjClient.gameType == MjClient.GAME_TYPE.NING_XIANG_KAI_WANG && pl.fengDong) {

                    }else if(MjClient.gameType === MjClient.GAME_TYPE.JI_SHAN_NIU_YE_ZI && !tData.areaSelectMode["tingPaiBuKou"] &&
                        pl.putCardAfterTing >= 0 && pl.putCardAfterTing === putnum){

                    } else{
                        playEffectInPlay(d.card);
                    }
                }
            }
            else if ( typeof(MjClient.majiang.isAutoPutOut) == "function" &&  MjClient.majiang.isAutoPutOut() && pl.isTing) 
            {
                playEffectInPlay(d.card);
            }
            else if (d.uid == SelfUid() && 
                (MjClient.gameType == MjClient.GAME_TYPE.ML_HONGZHONG 
                || MjClient.gameType == MjClient.GAME_TYPE.ML_HONGZHONG_ZERO 
                || MjClient.gameType == MjClient.GAME_TYPE.TY_HONGZHONG 
                || MjClient.gameType == MjClient.GAME_TYPE.TY_ZHUANZHUAN
                || MjClient.gameType == MjClient.GAME_TYPE.XIANG_YIN_TUI_DAO_HU
                || MjClient.gameType == MjClient.GAME_TYPE.CHAO_GU_MJ 
                || MjClient.gameType == MjClient.GAME_TYPE.NAN_XIAN_MJ
                || MjClient.gameType == MjClient.GAME_TYPE.CHEN_ZHOU
                || MjClient.gameType == MjClient.GAME_TYPE.YUAN_JIANG_MJ
                || MjClient.gameType == MjClient.GAME_TYPE.NING_XIANG_MJ
                || MjClient.gameType === MjClient.GAME_TYPE.AN_HUA_MA_JIANG  
                || MjClient.gameType === MjClient.GAME_TYPE.NING_XIANG_KAI_WANG  
                || MjClient.gameType === MjClient.GAME_TYPE.TAO_JIANG_MA_JIANG 
                || MjClient.gameType == MjClient.GAME_TYPE.PING_JIANG_ZHA_NIAO
                || MjClient.gameType == MjClient.GAME_TYPE.CHANG_SHA
                || MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_YI_JIAO_LAI_YOU
                || MjClient.gameType == MjClient.GAME_TYPE.HU_BEI_YI_JIAO_LAI_YOU
                || MjClient.gameType == MjClient.GAME_TYPE.CHUO_XIA_ZI
                || MjClient.gameType == MjClient.GAME_TYPE.HU_BEI_JING_SHAN_MJ
                || MjClient.gameType == MjClient.GAME_TYPE.DA_YE_KAI_KOU_FAN
                || MjClient.gameType == MjClient.GAME_TYPE.HONG_ZHONG_LAI_ZI_GANG
                || MjClient.gameType == MjClient.GAME_TYPE.XIAO_GAN_KA_WU_XING
                || MjClient.gameType == MjClient.GAME_TYPE.SUI_ZHOU_KA_WU_XING
                )&& pl.tPutCard == true) 
            {
                //红中麻将 自动摸打时自己出牌声音在MJput时播放
                playEffectInPlay(d.card);
            }
        }

        //湖北.湖北花牌.公安花牌别杠牌音效
        if(MjClient.gameType == MjClient.GAME_TYPE.HU_BEI_HUA_PAI ||
            MjClient.gameType == MjClient.GAME_TYPE.GONG_AN_HUA_PAI ||
            MjClient.gameType == MjClient.GAME_TYPE.TONG_CHENG_GE_ZI_PAI) {
            if (d.card == 357 || d.card == 142)
                playEffectInPlay(d.card);
        }

        //96扑克打牌声音播放
        if(MjClient.gameType == MjClient.GAME_TYPE.XIANG_XI_96POKER ||
           MjClient.gameType == MjClient.GAME_TYPE.XU_PU_PAO_HU_ZI) {
            playEffectInPlay(d.card);
        }

        //修复福禄寿回放手牌数据
        if( (MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_FU_LU_SHOU ||
            MjClient.gameType == MjClient.GAME_TYPE.FU_LU_SHOU_ER_SHI_ZHANG ) &&
            d.uid != SelfUid() &&  MjClient.rePlayVideo !== -1) {
            pl.mjhand.splice(pl.mjhand.indexOf(d.card), 1);
        }

        if( (MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_FU_LU_SHOU ||
            MjClient.gameType == MjClient.GAME_TYPE.FU_LU_SHOU_ER_SHI_ZHANG ) &&
            d.uid == SelfUid() &&  MjClient.rePlayVideo == -1) {
            pl.isGuoHu = false; 
        }

        if (d.uid == SelfUid()) {
            pl.mjhand.splice(pl.mjhand.indexOf(d.card), 1);
            pl.mjState = TableState.waitPut; // ?? todo waitCard
            MjClient.clickTing = false;
            MjClient.movingCard = null;
            MjClient.selectedCard = null;
            pl.skipHu = d.skipHu;
            pl.isQiHu = d.isQiHu;
            pl.tingListAfterPut = [];
            if (pl.tingLists && pl.tingLists[d.card]) {
                pl.tingListAfterPut = pl.tingLists[d.card];
            }
            if (pl.isTingJJHu) 
            {
                if (pl.jiangjianghuLists && pl.jiangjianghuLists[d.card]) {
                    pl.tingListAfterPut = pl.jiangjianghuLists[d.card];
                }
            }
            //console.log("====isQiHu---", JSON.stringify(d));
        }
        else {
            sData.players[SelfUid() + ""].mjState = TableState.waitEat;
        }
        if (d.eatFlags) {
            for(var uid in d.eatFlags) {
                sData.players[uid].eatFlag = d.eatFlags[uid];
            }
        }
        if (d.canKaiGangs) {
            for(var uid in d.canKaiGangs) {
                sData.players[uid].canKaiGang = d.canKaiGangs[uid];
            }
        }
        if (d.kaigangLists) {
            for(var uid in d.kaigangLists) {
                sData.players[uid].kaigangList = d.kaigangLists[uid];
            }
        }
        if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_WAI_HU_ZI || MjClient.gameType == MjClient.GAME_TYPE.YI_YANG_WAI_HU_ZI
            || MjClient.gameType == MjClient.GAME_TYPE.NAN_XIAN_GUI_HU_ZI || MjClient.gameType == MjClient.GAME_TYPE.YUAN_JIANG_GUI_HU_ZI){
            for(var uid in d.giveupChis) {
                sData.players[uid].giveupChis = d.giveupChis[uid];
            }
            pl.isDead = d.isDead;
            if(pl.isDead && pl.info.uid == SelfUid()){
                playEffectInPlay("sishou");
            }
            for(var uid in d.eatFlags) {
                if(d.eatFlags[uid] & 4){
                    sData.players[uid].piaoCards = d.piaoCards;
                }
                if(d.eatFlags[uid] & 64){
                    sData.players[uid].zhaCards = d.zhaCards;
                }
            }
        }

        if(MjClient.gameType == MjClient.GAME_TYPE.DANG_YANG_FAN_JING || 
           MjClient.gameType == MjClient.GAME_TYPE.YI_CHANG_SHANG_DA_REN ||
           MjClient.gameType == MjClient.GAME_TYPE.HU_BEI_HUA_PAI ||
           MjClient.gameType == MjClient.GAME_TYPE.GONG_AN_HUA_PAI ||
           MjClient.gameType == MjClient.GAME_TYPE.TONG_CHENG_GE_ZI_PAI) {
            for (var uid in d.liuCards) {
                sData.players[uid].liuCards = d.liuCards[uid]; //毛
            }
        }

        if (d.mustHus) {
            cc.log("==============mustHus = " + JSON.stringify(d.mustHus));
            for(var uid in d.mustHus) {
                sData.players[uid].mustHu = d.mustHus[uid];
            }
        }
        if (d.skipHus) {
            for(var uid in d.skipHus) {
                sData.players[uid].skipHu = d.skipHus[uid];
            }
        }
        if ("putCount" in d) {
            pl.putCount = d.putCount;
        }
        else
        {
            pl.putCount++; //按道理是要后端传给前端的
        }
        if (MjClient.gameType == MjClient.GAME_TYPE.GUAN_YUN || 
            MjClient.gameType == MjClient.GAME_TYPE.XIANG_SHUI_MJ)
        {
            sData.players[SelfUid() + ""].isTianting = false;
        }

        "limitHuTypeList" in d && (pl.limitHuTypeList = d.limitHuTypeList);
        if (MjClient.gameType === MjClient.GAME_TYPE.ZP_LY_CHZ) {
            pl.isPutCardOnce = true;
        }

        if(MjClient.gameType === MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA || 
            MjClient.gameType === MjClient.GAME_TYPE.HENG_YANG_FANG_PAO_FA ||
            MjClient.gameType === MjClient.GAME_TYPE.XIANG_XIANG_GAO_HU_ZI ||
            MjClient.gameType === MjClient.GAME_TYPE.XIANG_XIANG_PAO_HU_ZI ||
            MjClient.gameType === MjClient.GAME_TYPE.XIANG_TAN_PAO_HU_ZI ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ)
        {
            tData.isLastDraw = d.isLastDraw;
        }

        //立四麻将，其他三家需要知道，四张牌剩余多少张
        if (d.cardFourCount || d.cardFourCount == 0) {
            pl.cardFourCount = d.cardFourCount;
            cc.log(d.uid + " = d.uid ========PUT CARD ======== pl.cardFourCount = " + pl.cardFourCount);
        }

        if (d.mjhandFour) {
            pl.mjhandFour = d.mjhandFour;
            cc.log(" ========PUT CARD ======== pl.mjhandFour = " + pl.mjhandFour);
        }

        if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_PENG_HU){
            //报警标志
            for(var uid in d.alarmFlags) {
                sData.players[uid].alarmFlag = d.alarmFlags[uid];
            }
        }

        for (var index = 0; index < tData.maxPlayer; index++) {
            sData.players[tData.uids[index]].wangType = 0;
        }

        if(d.nextMsg && d.nextMsg.uid){
            var nextUid = d.nextMsg.uid;
            var nextPlayer = sData.players[nextUid + ""];
            nextPlayer.wangType = d.nextMsg.wangType;
        }
        if(MjClient.gameType == MjClient.GAME_TYPE.XIN_NING_MA_JIANG){
            pl.touzi = false;
        }
        if(MjClient.gameType == MjClient.GAME_TYPE.HUAI_HUA_MA_JIANG || MjClient.gameType == MjClient.GAME_TYPE.JING_ZHOU_MA_JIANG){
            tData.isFirstPut = false;
        }

        if(MjClient.gameType == MjClient.GAME_TYPE.XIANG_XI_2710){
            for (var uid in sData.players) {
                sData.players[uid].fallArea = -1;
            }
            
            if (d.uid == SelfUid()) {
                pl.limitChiAndHuMatrix = d.limitChiAndHuMatrix;
            }
        }

        if (MjClient.gameType === MjClient.GAME_TYPE.XIANG_TAN_PAO_HU_ZI) {
            pl.canNotPutCard = d.canNotPutCard;
        }

        if(MjClient.gameType == MjClient.GAME_TYPE.TY_ZHUANZHUAN || MjClient.gameType == MjClient.GAME_TYPE.TY_HONGZHONG 
            || MjClient.gameType == MjClient.GAME_TYPE.ML_HONGZHONG
            || MjClient.gameType == MjClient.GAME_TYPE.ML_HONGZHONG_ZERO 
            || MjClient.gameType == MjClient.GAME_TYPE.XIANG_YIN_TUI_DAO_HU
            || MjClient.gameType == MjClient.GAME_TYPE.MJ_ZHUO_XIA_ZI
            || MjClient.gameType == MjClient.GAME_TYPE.CHAO_GU_MJ 
            || MjClient.gameType == MjClient.GAME_TYPE.NAN_XIAN_MJ
            || MjClient.gameType == MjClient.GAME_TYPE.CHEN_ZHOU
            || MjClient.gameType == MjClient.GAME_TYPE.YUAN_JIANG_MJ
            || MjClient.gameType == MjClient.GAME_TYPE.NING_XIANG_MJ
            || MjClient.gameType == MjClient.GAME_TYPE.PING_JIANG_ZHA_NIAO
            ){
            for (var uid in sData.players) {
                sData.players[uid].isPass = false;
            }
        }


        if (d.chongJiCard) {
            pl.chongJiCard = d.chongJiCard;
        }
        d.chongFengJi && (pl.chongFengJi = d.chongFengJi);

        if(MjClient.gameType === MjClient.GAME_TYPE.GUI_ZHOU_MEN_HU_XUE_LIU){
            if(d.card) playEffectInPlay(d.card);
        }

        if(MjClient.gameType == MjClient.GAME_TYPE.TONG_CHENG_GE_ZI_PAI) {
            pl.canNotPutCard = []; //直接置空.解除所有不能打的牌
        }

        if(MjClient.gameType == MjClient.GAME_TYPE.QI_CHUN_GD_MJ){//蕲春广东麻将跟庄分
            if(d.genZhuangState && d.genZhuangScore){
                for(var uid in d.genZhuangScore){
                    var player = MjClient.data.sData.players[uid];
                    player.genZhuangScore = d.genZhuangScore[uid];
                }
            }
        }

        //cc.log(" ========PUT CARD ======== pl.putCount = " + pl.putCount);
        //console.log("=====doomsky say:JSON.stringify(pl.mjhand)======", JSON.stringify(pl.mjhand));
    }]
    , PKPut: [0, function (d) {
        var sData = MjClient.data.sData;
        if (!sData) return;
        var tData = sData.tData;
        if(GameClass[MjClient.gameType] == MjClient.GAME_CLASS.SAN_DA_HA) {
            tData.curPlayer = tData.uids.indexOf(d.uid); // 三打哈播声音需要
            if(d.autoSend) {
                d.card = MjClient.majiang.sortHandCards(d.card , tData.zhuPaiType);
                tData.isCanShuaiPai = d.isCanShuaiPai;

                if (d.fenPaiArr)
                    tData.fenPaiArr = d.fenPaiArr.slice();
            }

            // 庄报副
            if (d.zhuangBaoFu) {
                tData.zhuangBaoFu = d.zhuangBaoFu;
            }
            if (tData.zhuangBaoFu) {
                tData.wonderNum = d.wonderNum;
            }

            if (tData.areaSelectMode.allowHanLai) {
                // 玩家出牌，喊来标记消失
                var player = getUIPlayerByUID(d.uid);

                if (player)
                    player.hanlai = false;
            }
        }
        tData.lastPutCard = d.card;
        tData.putType = d.putType;


        if(d.totalScore || d.totalScore == 0)
            tData.totalScore = d.totalScore;
        var pl = sData.players[d.uid];
        if (MjClient.gameType == MjClient.GAME_TYPE.DA_TONG_ZI_SHAO_YANG) { // 打筒子记牌器
            pl.mjput.push(d.card);
            pl.trustTime = d.trustTime; //托管时间
        } else {
            pl.mjput = d.card;
        }
        pl.putType = 1;
        pl.handCount = d.handCount;
        pl.isChunTian = d.isChuntian;
        pl.onLine = true;

        if(MjClient.GAME_TYPE.DIAN_TUO == MjClient.gameType){
            if (d.kingList) {
                tData.kingList = d.kingList //有发才刷
            }   
            tData.isFirstSingleCard = d.isFirstSingleCard;   
            //sData.players[d.uid].score_xi = d.xiFen;
            tData.lastPutCardType = d.cardType;
            tData.bodyLen = d.bodyLen;

            //刷新每个人的喜分
            var xiFen = d.xiFen ? d.xiFen : [];
            for (var i = 0; i < xiFen.length; i++) {
                var xiData = xiFen[i];
                sData.players[xiData[0]].score_xi = xiData[1];
            } 
        } 

        if (d.uid == SelfUid()) {
            if(MjClient.GAME_TYPE.DA_TONG_ZHA_GU_ZI == MjClient.gameType || 
                MjClient.GAME_TYPE.YUE_YANG_YUAN_JIANG_QIAN_FEN == MjClient.gameType) {
                
                pl.mjhand = MjClient.majiang.checkPut(pl.mjhand, d.card, null , MjClient.data.sData.tData);
            }
            else if (MjClient.GAME_TYPE.SHAN_XI_GAN_DENG_YAN == MjClient.gameType || 
                MjClient.GAME_TYPE.DA_YE_510K == MjClient.gameType ||
                MjClient.GAME_TYPE.QIAN_JIANG_QIAN_FEN == MjClient.gameType ||
                MjClient.GAME_TYPE.QI_CHUN_DA_GONG == MjClient.gameType ||
                MjClient.GAME_TYPE.WU_XUE_510K == MjClient.gameType)
                pl.mjhand = MjClient.majiang.checkPut(pl.mjhand, d.card, null, tData.areaSelectMode);
            else
                pl.mjhand = MjClient.majiang.checkPut(pl.mjhand, d.card);

            pl.mjState = TableState.waitPut;
        }
        else {
            sData.players[SelfUid() + ""].mjState = TableState.waitEat;
        }

        if(d.putCardsRecord)
        {
            tData.putCardsRecord = d.putCardsRecord;
        }

        if(d.firstPutCardUid >= 0)
        {
            tData.firstPutCardUid = d.firstPutCardUid;
        }

        //打炸弹已出分牌
        if(d.scoreCards){
            tData.scoreCards = d.scoreCards;
        }
        if(d.cardType != undefined){
            tData.lastPutCardType = d.cardType;
        }
        tData.score_draw = d.score_draw;
        tData.stats_draw = d.stats_draw;
        tData.rank = d.rank;

        //春天音效
        if(d.isChuntian)
        {
            // pl.isChunTian = true;
            // playCardEffect(d.card, d.handCount,tData);
        }

        //播放出牌牌型音效
        if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_DA_ZHA_DAN  ){
            playSoundEffect_daZhaDan(d.card, d.uid);
        }else if(MjClient.gameType == MjClient.GAME_TYPE.DIAN_TUO){
            cc.log("播放掂坨音效", d.card, d.uid);
            playSoundEffect_dianTuo(d.card, d.uid);
        }else if (MjClient.gameType == MjClient.GAME_TYPE.DA_TONG_ZI_SHAO_YANG){
            playSoundEffect_daTongZi(d.card, d.uid);
        }else if (MjClient.gameType == MjClient.GAME_TYPE.LONG_HUI_BA_ZHA_DAN){
            playSoundEffect_BaZhaDan(d.card, d.uid);
        }else if (MjClient.gameType == MjClient.GAME_TYPE.BAN_BIAN_TIAN_ZHA){
            playSoundEffect_BanBianTianZha(d.card, d.uid);
        }else if (MjClient.gameType == MjClient.GAME_TYPE.YONG_ZHOU_LAO_CHUO){
            playSoundEffect_YongZhouLaoChuo(d.card, d.uid);
        }else{
            if(MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_JZ ||
                MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_ZERO || 
                MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_GZ){
                //晋中斗地主不播
            } else {
                if (MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_YUAN_JIANG_QIAN_FEN) {
                    if (tData.lastPutPlayer == tData.curPlayer || tData.lastPutPlayer == -1)  {
                        playCardEffect(d.card, d.handCount);
                    } else {
                        if (getRandomRange(0,100) < 25) {
                            playCardEffect(d.card, d.handCount);
                        } else {
                            playEffectInPlay("dani" + getRandomRange(1,3));
                        }
                    }
                } else {
                    playCardEffect(d.card, d.handCount);
                }
            }
        }

        // 三打哈 防止快速点击造成牌局桌面牌被清空
        if(GameClass[MjClient.gameType] == MjClient.GAME_CLASS.SAN_DA_HA) {
            tData.curPlayer = (tData.curPlayer + 1) % tData.maxPlayer;
        }

        //删除队友手牌
        if (MjClient.gameType == MjClient.GAME_TYPE.DIAN_TUO || 
            MjClient.gameType == MjClient.GAME_TYPE.LONG_HUI_BA_ZHA_DAN || 
            MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_DA_ZHA_DAN) {
            if (MjClient.rePlayVideo == -1) {
                var p = sData.players[SelfUid()];
                if ((tData.isDivideTeam || (MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_DA_ZHA_DAN && tData.baoType_sys == 2)) 
                    && p.mjhand.length == 0) {
                    var selfIndex = tData.uids.indexOf(p.info.uid);
                    var teamerUid = tData.uids[((selfIndex + 2) % tData.maxPlayer)];
                    if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_DA_ZHA_DAN){
                        teamerUid = p.friendUid;
                    }
                    if (d.uid == teamerUid) {
                        for (var i = 0; i < d.card.length; i++) {
                            p.teamerHand.splice(p.teamerHand.indexOf(d.card[i]), 1);
                        }
                    }
                }
            }
        }

        if (MjClient.gameType == MjClient.GAME_TYPE.SHAN_XI_GAN_DENG_YAN || 
            MjClient.gameType == MjClient.GAME_TYPE.WU_XUE_GE_BAN) {
            tData.laiziCards = d.laiziCards;
        }
    }]
    , changePosition: [0, function (d) {
        var sData = MjClient.data.sData;
        if (d.handCounts) {
            for (var uid in d.handCounts) {
                var pl = sData.players[uid];
                pl.handCount = d.handCounts[uid];
                //cc.log("NetCallBack=========pl.handCount =" + pl.handCount);
            }
        }
        if (d.uids) {
            sData.tData.uids = d.uids;
        }
    }]
    , newCard: [0, function (d) {
        var sData = MjClient.data.sData;
        if (!sData || !sData.players[SelfUid() + ""]) return;
        var pl = sData.players[SelfUid() + ""]; 
        var hands = pl.mjhand;
        pl.isNew = true;
        if (typeof(d) == "number") {
            d = {newCard: d};
        }

        pl.newCd = d.newCard; //---for ting pai
        pl.skipHu = false;
        pl.skipPeng = [];
        pl.tingLists = {};
        pl.justPeng = 0;

        if (d.tingLists) 
        {
            pl.tingLists = d.tingLists;
        }
        if (d.jiangjianghuLists) 
        {
            pl.jiangjianghuLists = d.jiangjianghuLists;
        }
        if ("needTing" in d) 
        {
            pl.needTing = d.needTing;
        }
        if (d.gangList) 
        {
            pl.gangList = d.gangList;
        }
        if (d.isNotAnGang) {
            pl.isNotAnGang = d.isNotAnGang;
        }
        if(d.wangType){
            pl.wangType = d.wangType;
        }



        MjClient.canTingCards = {};
        if (pl.tingLists)
        {
            for (var i in pl.tingLists) {
                MjClient.canTingCards[i] = 1;
            }
        }
        if (pl.gangList)
        {
            MjClient.gangCards = pl.gangList;
        }

/*        if (MjClient.GAME_TYPE.XUE_LIU == MjClient.gameType)
        {
            if (hands.length % 3 == 2)
            {
                var cardtag =  hands.pop();
                RemoveNodeBack(getNode(0),"mjhand",1,cardtag);
            }
        }
*/      
        if (hands && d.newCard > 0) {
            hands.push(d.newCard);
        }

        for (var uid in sData.players) {
            sData.players[uid].eatFlag = 0;
        }
        if (d.eatFlag) {
            pl.eatFlag = d.eatFlag;
        }
        if ("canKaiGang" in d) {
            pl.canKaiGang = d.canKaiGang;
        }
        if ("putCount" in d) {
            pl.putCount = d.putCount;
        }
        if ("kaigangList" in d) {
            pl.kaigangList = d.kaigangList;
        }
        if ("mustHu" in d) {
            pl.mustHu = d.mustHu;
        }
        if ("skipHuStatus" in d){
            pl.skipHuStatus = d.skipHuStatus;
        }
        if ("canGangHand" in d) {
            pl.canGangHand = d.canGangHand;
        }
        if("haoDiao" in d){
            pl.haoDiao = d.haoDiao;
        }

    }],
    waitPut: [0, function (d) {
        var sData = MjClient.data.sData; 
        if (!sData) return;
        var pl = sData.players[SelfUid() + ""];
        if (d.tDataChanged) {
            for (var k in d.tDataChanged) {
                sData.tData[k] = d.tDataChanged[k];
            }
        }
        else {
            sData.tData = d;
        }
        if (MjClient.gameType == MjClient.GAME_TYPE.PING_JIANG_ZHA_NIAO) 
        {
            if (d.clearBBHu) 
            {
                for (var i = 0; i < sData.tData.maxPlayer; i++) {
                    uid = sData.tData.uids[i];
                    var pl = sData.players[uid];
                    if (pl)
                    {
                        pl.isBBHu = false;
                    } 
                }
                
            }
        }

        if(sData.tData.curTrustTime != undefined){
            //邵阳打筒子 托管时间
            var uid = sData.tData.uids[d.curPlayer];
            var pl = sData.players[uid].trustTime = sData.tData.curTrustTime;
        }
        // 株洲牛十别新增players字段
        if (d.players) {
            for (var uid in d.players) {
                var pl = d.players[uid];
                var localPlayer = sData.players[uid];

                for (var pty in pl)
                    localPlayer[pty] = pl[pty];
            }
        }

        if(d.liangfengInfo == null){
            pl.buCards = [];
        }
        if (d.picture) 
        {
            var p = sData.players[d.uid];
            p.picture = d.picture;
        }


        if (MjClient.data.c_Data)
            MjClient.data.c_Data.autoPKPUT = false;

        //cc.log("=============waitput = " + JSON.stringify(sData.tData));

        if (sData.players[SelfUid() + ""])
            sData.players[SelfUid() + ""].mjState = TableState.waitPut;
        var tData = sData.tData;
        var pl = sData.players[tData.uids[tData.curPlayer]];
        if ("fengdui" in d) {
            pl.fengdui = d.fengdui;
        }
        if(MjClient.playui && MjClient.playui.isNewFrameMaJiang){
            pl.isNew = true;
        }
        if(d.liangfengInfo){
            var lp = sData.players[d.liangfengInfo.uid];
            if(d.liangfengInfo.mjState){
                lp.mjState = d.liangfengInfo.mjState;
            }
            else{

                lp.mjflower = d.liangfengInfo.mjflower;
                lp.liangfengCount = lp.mjflower.length;
                lp.buCards = d.liangfengInfo.buCards;
            }
        }
        if (d.liangfengInfo)
        {
            var curpl = sData.players[d.liangfengInfo.uid];
            if (curpl.info.uid == SelfUid())
            {
                if (d.liangfengInfo.mjflower) {
                    curpl.mjflower = d.liangfengInfo.mjflower;
                    for (var i = 0; i < d.liangfengInfo.mjflower.length; i++) {
                        var p = curpl.mjhand.indexOf(d.liangfengInfo.mjflower[i]);
                        if (p >= 0) {
                            curpl.mjhand.splice(p, 1);
                        }
                    }
                }
                if (d.liangfengInfo.buCards)
                {
                    for (var i = 0; i < d.liangfengInfo.buCards.length; i++) {
                        curpl.mjhand.push(d.liangfengInfo.buCards[i]);
                    }
                }
            }
        }
    }],
    showQiShouHu: [0, function (d) {
        cc.log("====================showQiShouHu" + JSON.stringify(d));
        var sData = MjClient.data.sData;
        if (!sData) return;

        if (d.tState)
            sData.tData.tState = d.tState;

        if (d.qiShouHus) {
            for(var uid in d.qiShouHus) {
                sData.players[uid].qiShouHu = d.qiShouHus[uid];
                sData.players[uid].mjState = d.mjStates[uid];
            }
        }
    }],
    passQiShouHu: [0, function (d) {
        cc.log("====================passQiShouHu" + JSON.stringify(d));
        var sData = MjClient.data.sData;
        if (!sData) return;

        if(d.isNoQsHu){
            sData.tData.tState = d.tState;
        }

        for (var uid in d.players) {
            var pl = d.players[uid];
            if(pl.mjState)
                sData.players[uid].mjState = pl.mjState;
        }

        sData.players[d.passuid].qiShouHu = [];
    }],
    doQiShouHu: [0, function (d) {
        cc.log("====================doQiShouHu" + JSON.stringify(d));
        var sData = MjClient.data.sData;
        if (!sData) return;
        if (MjClient.gameType == MjClient.GAME_TYPE.NINGXIANG) return;//宁乡麻将没有这些数据
        for (var uid in d.players) {
            var pl = d.players[uid];
            if(typeof pl.winall == 'number')
                sData.players[uid].winall = pl.winall;

            if(pl.mjState)
                sData.players[uid].mjState = pl.mjState;
            
        }   
        if (!sData.players[d.uid].qiShouHuDone) 
            sData.players[d.uid].qiShouHuDone = [];
        sData.players[d.uid].qiShouHuDone.push({name:d.qshuName, cards:d.showCards});     

        if (sData.players[d.uid].qiShouHu)
            delete sData.players[d.uid].qiShouHu[d.qshuName];

        if(d.tState){
            sData.tData.tState = d.tState;
        }
    }],
    MJTouchPutCard:[0, function (d) {
        var sData = MjClient.data.sData;
        if (!sData) return;
        var pl = sData.players[d.uid]
        if ("tPutCard" in d) 
        {
            pl.tPutCard = d.tPutCard;
        }

    }],
    MJChi: [0, function (d) {
        //console.log("-------MJChi ;;------");
        var sData = MjClient.data.sData;
        if (!sData) return;
        sData.players[d.cpginfo.id + ""].pengchigang = d.cpginfo.pengchigang;
        sData.tData = d.tData;

        var tData = sData.tData;
        var uids = tData.uids;
        var cds = d.mjchi;

        //徐州的白板会，当成癞子的点数
        if(MjClient.gameType == MjClient.GAME_TYPE.XU_ZHOU)
        {
            cds.sort(function (a, b) {

                if(a == 91)
                {
                    a = MjClient.data.sData.tData.hunCard;
                }
                if(b == 91)
                {
                    b = MjClient.data.sData.tData.hunCard;
                }

                return a - b
            });
        }
        else {
            if (MjClient.gameType != MjClient.GAME_TYPE.YONG_ZHOU_MJ && MjClient.gameType != MjClient.GAME_TYPE.JIANG_HUA_MJ &&
                MjClient.gameType != MjClient.GAME_TYPE.DAO_ZHOU_MJ)
            {
                 cds.sort(function (a, b) {
                return a - b
                 });
            }
          
        }



        playEffectInPlay("chi");
        var pl = sData.players[uids[tData.curPlayer]];
        var lp = sData.players[uids[d.from]];
        pl.mjchiCard = d.mjchiCard;
        pl.onLine = true;
        for (var i = 0; i < cds.length; i++) {
            pl.mjchi.push(cds[i]);
            pl.isNew = false;
            if (i == d.pos) {
                var mjput = lp.mjput;
                if (mjput.length > 0 && mjput[mjput.length - 1] == cds[i]) {
                    mjput.length = mjput.length - 1;
                    if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_WAI_HU_ZI || MjClient.gameType == MjClient.GAME_TYPE.YI_YANG_WAI_HU_ZI
                        || MjClient.gameType == MjClient.GAME_TYPE.NAN_XIAN_GUI_HU_ZI || MjClient.gameType == MjClient.GAME_TYPE.YUAN_JIANG_GUI_HU_ZI ||
                         MjClient.gameType == MjClient.GAME_TYPE.AN_XIANG_WEI_MA_QUE){
                        pl.mjputType.length = pl.mjputType.length - 1;
                        cc.log("MJChi mjputType", " pl = " + JSON.stringify(pl));
                    }
                }
                else if ((MjClient.gameType == MjClient.GAME_TYPE.CHANG_SHA || 
                    MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_CHANG_SHA) && tData.lastPutCard2) {
                    var cd = cds[i];
                    if (mjput.length >= 2 && mjput[mjput.length - 2] == cd && tData.lastPutCard2 > 0)
                        mjput.splice(mjput.length - 2, 1);
                    else if (mjput.length >= 3 && mjput[mjput.length - 3] == cd && tData.lastPutCard3 > 0)
                        mjput.splice(mjput.length - 3, 1);
                    else if (mjput.length >= 4 && mjput[mjput.length - 4] == cd && tData.lastPutCard4 > 0)
                        mjput.splice(mjput.length - 4, 1);
                    else
                        cc.log("eat error from");
                }
                else  mylog("eat error from");
            }
            else if (uids[tData.curPlayer] == SelfUid()) {
                pl.mjState = TableState.waitPut;
                var mjhand = pl.mjhand;
                var idx = mjhand.indexOf(cds[i]);
                if (idx >= 0) {
                    mjhand.splice(idx, 1);
                }
                else mylog("eat error to");
            }
        }
        if (uids[tData.curPlayer] == SelfUid()) 
        {
            if (d.tingLists) 
            {
                pl.tingLists = d.tingLists;
            }
            if (d.jiangjianghuLists) 
            {
                pl.jiangjianghuLists = d.jiangjianghuLists;
            }
            if (pl.tingListAfterPut) 
            {
                pl.tingListAfterPut = [];
            }
            if (d.gangList) 
            {
                pl.gangList = d.gangList;
            }
            if (d.kaigangList) 
            {
                pl.kaigangList = d.kaigangList;
            }
        }
        if ("canKaiGang" in d) {
            pl.canKaiGang = d.canKaiGang;
        }

        if (MjClient.gameType == MjClient.GAME_TYPE.TONG_HUA)
        {
            pl.eatFlag = d.cpginfo.eatFlag;
        }

        if (MjClient.gameType == MjClient.GAME_TYPE.CHANG_SHA || 
            MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_CHANG_SHA)
        {
            tData.lastPutCard2 = null;
            tData.lastPutCard3 = null;
            tData.lastPutCard4 = null;
        }

        //新版麻将框架eatFlag置0
        if (MjClient.playui.isNewFrameMaJiang) {
            pl.eatFlag = 0;
        }
    }],

    MJPeng: [0, function (d) {
        //cc.log("收到碰的消息");
        var sData = MjClient.data.sData;
        if (!sData) return;
        //福禄寿特殊处理
        if (MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_FU_LU_SHOU ||
            MjClient.gameType == MjClient.GAME_TYPE.FU_LU_SHOU_ER_SHI_ZHANG) {
            sData.tData = d.tData;
            playEffectInPlay("peng");

            var tData = sData.tData;
            var uids = tData.uids;
            var cd = tData.lastPutCard;
            var pl = sData.players[uids[tData.curPlayer]];
            var lp = sData.players[uids[d.from]];
            pl.mjpeng.push(cd);
            pl.onLine = true;
            pl.justPeng = cd;

            var mjput = lp.mjput;
            if (mjput.length > 0 && mjput[mjput.length - 1] == cd) {
                mjput.length = mjput.length - 1;
            }
            else  mylog("peng error from");
            if (uids[tData.curPlayer] == SelfUid()) {
                if (d.hua !== undefined) {
                    pl.hua = d.hua;
                }
                pl.mjState = TableState.waitPut;
                if (tData.gameType == MjClient.GAME_TYPE.ZP_LY_CHZ) {
                    pl.mjState = tData.tState;
                }
                pl.isNew = false;
                //pl.openDoorState = d.cpginfo.openDoorState;
                var mjhand = pl.mjhand;
                var idx = mjhand.indexOf(cd);
                if (idx >= 0) {
                    mjhand.splice(idx, 1);
                }
                else mylog("eat error to");
                idx = mjhand.indexOf(cd);
                if (idx >= 0) {
                    mjhand.splice(idx, 1);
                }
                else mylog("eat error to");
                if (mjhand.indexOf(cd) >= 0)  pl.mjpeng4.push(cd);
            } else {
                //福禄寿回放剔除碰的手牌
                if(MjClient.rePlayVideo != -1) {
                    var mjhand = pl.mjhand;
                    var idx = mjhand.indexOf(cd);
                    if (idx >= 0) {
                        mjhand.splice(idx, 1);
                    }
                    idx = mjhand.indexOf(cd);
                    if (idx >= 0) {
                        mjhand.splice(idx, 1);
                    }
                }
            }

            for (var uid in sData.players) {
                sData.players[uid].eatFlag = 0;
            }

            sData.players[d.id].eatFlag = d.eatFlag;
            if(d.eatFlag>0){// 吃后有杠操作继续显示杠
                sData.tData.tState = TableState.waitEat;
                pl.mjState = TableState.waitEat
            } 

            return;
        }

        //96扑克碰数据需要特殊处理
        if (MjClient.gameType == MjClient.GAME_TYPE.XIANG_XI_96POKER) {
            sData.tData = d.tData;
            var tData = sData.tData;
            var uids = tData.uids;
            var pl = sData.players[d.cpginfo.uid + ""];
            var fromPl = sData.players[uids[d.from]];
            if(!pl || !fromPl) 
                return;

            //因为96扑克的mjsort会一直变, 更新数据时先备份旧的mjsort, 刷UI时会用到
            pl.oldMjSort = pl.mjsort;
            pl.mjsort = d.cpginfo.mjsort;
            pl.canNotPutCard = d.canNotPutCard;

            pl.onLine = true;
            pl.mjState = d.tData.tState;

            //碰的数组插入
            pl.mjpeng.push(d.pengCards);

            //清理手牌
            if(d.cpginfo.uid == SelfUid()) {
                var mjhand = pl.mjhand;
                for(var i = 0; i < d.pengCards.length - 1; i++) {
                    var cd = d.pengCards[i];
                    var idx = mjhand.indexOf(cd);
                    if(cd >= 0) {
                        mjhand.splice(idx, 1);
                    }
                }
            }
            
            //清理打出的牌
            var mjput = fromPl.mjput;
            var cd = d.pengCards[d.pengCards - 1];
            if (mjput.length > 0 && mjput[mjput.length - 1] == cd) {
                mjput.length = mjput.length - 1;
                fromPl.mjputType.length = fromPl.mjputType.length - 1;
            }

            for (var uid in sData.players) {
                sData.players[uid].eatFlag = 0;
            }

            playEffectInPlay("peng");
            return;
        }

        sData.players[d.cpginfo.id + ""].pengchigang = d.cpginfo.pengchigang;
        sData.tData = d.tData;
        var tData = sData.tData;
        var uids = tData.uids;
        var cd = tData.lastPutCard;

        if (MjClient.gameType == MjClient.GAME_TYPE.CHANG_SHA ||
            MjClient.gameType === MjClient.GAME_TYPE.XIANG_YIN_TUI_DAO_HU ||
            MjClient.gameType === MjClient.GAME_TYPE.PING_JIANG_ZHA_NIAO ||
            MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_CHANG_SHA)
        {
            var peng = d.cpginfo.pengchigang.peng;
            cd = peng[peng.length - 1].card;
        }
        if(MjClient.gameType != MjClient.GAME_TYPE.YUE_YANG_PENG_HU){
            playEffectInPlay("peng");
        }
        var pl = sData.players[uids[tData.curPlayer]];
        var lp = sData.players[uids[d.from]];
        if("mjflower" in d){
            lp.mjflower = d.mjflower;
        }
        if ("canKaiGang" in d) {
            pl.canKaiGang = d.canKaiGang;
        }

        if (MjClient.gameType == MjClient.GAME_TYPE.XU_PU_PAO_HU_ZI ||
            MjClient.gameType == MjClient.GAME_TYPE.HU_BEI_HUA_PAI ||
            MjClient.gameType == MjClient.GAME_TYPE.GONG_AN_HUA_PAI ||
            MjClient.gameType == MjClient.GAME_TYPE.TONG_CHENG_GE_ZI_PAI) {
            //溆浦跑胡子需要整组数据 湖北花牌也是
            pl.mjpeng.push(d.cards);
        } else {
            pl.mjpeng.push(cd); 
        }
        
        pl.mjsort = d.cpginfo.mjsort;
        pl.isQiHu = d.cpginfo.isQiHu;
        pl.skipGang = d.cpginfo.skipGang;
        if(d.cpginfo.skipMingGang){
            pl.skipMingGang = d.cpginfo.skipMingGang;
        }
        pl.onLine = true;
        pl.justPeng = cd;
        if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_PENG_HU){
            pl.pengOrPaoCardByPut = d.cpginfo.pengOrPaoCardByPut;
            var num = pl.mjwei.length + pl.mjpeng.length + pl.mjgang0.length + pl.mjgang1.length;
            if(num == 3 || num == 4){
                playEffectInPlay("peng" + num);
            }else{
                playEffectInPlay("peng");
            }
        }

        var mjput = lp.mjput;
        if (mjput.length > 0 && mjput[mjput.length - 1] == cd && !(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_PENG_HU && tData.putType == 0)) {
            mjput.length = mjput.length - 1;
            if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_WAI_HU_ZI || MjClient.gameType == MjClient.GAME_TYPE.YI_YANG_WAI_HU_ZI
                || MjClient.gameType == MjClient.GAME_TYPE.NAN_XIAN_GUI_HU_ZI || MjClient.gameType == MjClient.GAME_TYPE.YUAN_JIANG_GUI_HU_ZI ||
                 MjClient.gameType == MjClient.GAME_TYPE.AN_XIANG_WEI_MA_QUE || MjClient.gameType == MjClient.GAME_TYPE.EN_SHI_SHAO_HU){
                lp.mjputType.length = lp.mjputType.length - 1;
                cc.log("MJPeng mjputType", " pl = " + JSON.stringify(pl));
            }
        }
        else if ((MjClient.gameType == MjClient.GAME_TYPE.CHANG_SHA || 
            MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_CHANG_SHA) && tData.lastPutCard2) {
            if (mjput.length >= 2 && mjput[mjput.length - 2] == cd && tData.lastPutCard2 > 0)
                mjput.splice(mjput.length - 2, 1);
            else if (mjput.length >= 3 && mjput[mjput.length - 3] == cd && tData.lastPutCard3 > 0)
                mjput.splice(mjput.length - 3, 1);
            else if (mjput.length >= 4 && mjput[mjput.length - 4] == cd && tData.lastPutCard4 > 0)
                mjput.splice(mjput.length - 4, 1);
            else
                cc.log("peng error from");
        }
        else  mylog("peng error from");
        if (uids[tData.curPlayer] == SelfUid()) {
            if (pl.eatFlag & 32)
            {
                MjClient.showToast("您放弃了胡牌");
            }
            if (d.hua !== undefined) {
                pl.hua = d.hua;
            }
            pl.mjState = TableState.waitPut;
            if (tData.gameType == MjClient.GAME_TYPE.ZP_LY_CHZ) {
                pl.mjState = tData.tState;
            }
            pl.isNew = false;
            //pl.openDoorState = d.cpginfo.openDoorState;
            if ("needTing" in d.cpginfo) 
            {
                pl.needTing = d.cpginfo.needTing;
            }
            if (d.tingLists) 
            {
                pl.tingLists = d.tingLists;
            }
            if (pl.tingListAfterPut) 
            {
                pl.tingListAfterPut = [];
            }
            if (d.jiangjianghuLists) 
            {
                pl.jiangjianghuLists = d.jiangjianghuLists;
            }
            if (d.gangList) 
            {
                pl.gangList = d.gangList;
            }
            if (d.kaigangList) 
            {
                pl.kaigangList = d.kaigangList;
            }
            else mylog("eat error to");
            var mjhand = pl.mjhand;
            if (MjClient.gameType == MjClient.GAME_TYPE.XU_PU_PAO_HU_ZI ||
                MjClient.gameType == MjClient.GAME_TYPE.HU_BEI_HUA_PAI ||
                MjClient.gameType == MjClient.GAME_TYPE.GONG_AN_HUA_PAI ||
                MjClient.gameType == MjClient.GAME_TYPE.TONG_CHENG_GE_ZI_PAI) {
                // 溆浦跑胡子额外处理
                var cards = d.cards.slice();
                var idx = cards.indexOf(cd);
                if (idx >= 0) {
                    cards.splice(idx, 1);
                }
                for (var i = 0; i < cards.length; i++) {
                    idx = mjhand.indexOf(cards[i]);
                    if (idx >= 0) {
                        mjhand.splice(idx, 1);
                    }
                }
            } else {
                var idx = mjhand.indexOf(cd);
                if (idx >= 0) {
                    mjhand.splice(idx, 1);
                }
                idx = mjhand.indexOf(cd);
                if (idx >= 0) {
                    mjhand.splice(idx, 1);
                }
                else mylog("eat error to");
                if (mjhand.indexOf(cd) >= 0)  pl.mjpeng4.push(cd);
            }
            
            if (MjClient.gameType == MjClient.GAME_TYPE.GUAN_YUN || 
            MjClient.gameType == MjClient.GAME_TYPE.XIANG_SHUI_MJ) {
                pl.isTianting = false;
            }
        }

        for(var uid in sData.players){
            sData.players[uid].wangType = 0;
            sData.players[uid].wangStatus = false;
        }

        //南京麻将的嘴
        if (d.zuiUid ) {
            pl.zuiUid = d.zuiUid;
        }
        if (d.zuiCount) {
            pl.zuiCount = d.zuiCount;
        }
        if (d.qingDui) {
            pl.qingDui = d.qingDui;
        }

        if (d.canNotPutCard) { // 汨罗红字
            pl.canNotPutCard = d.canNotPutCard;
        }

        for (var uid in sData.players) {
            sData.players[uid].eatFlag = 0;
        }

        if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_WAI_HU_ZI || MjClient.gameType == MjClient.GAME_TYPE.YI_YANG_WAI_HU_ZI
            || MjClient.gameType == MjClient.GAME_TYPE.NAN_XIAN_GUI_HU_ZI || MjClient.gameType == MjClient.GAME_TYPE.YUAN_JIANG_GUI_HU_ZI
            || MjClient.gameType == MjClient.GAME_TYPE.DANG_YANG_FAN_JING || MjClient.gameType == MjClient.GAME_TYPE.YI_CHANG_SHANG_DA_REN
            || MjClient.gameType == MjClient.GAME_TYPE.HU_BEI_HUA_PAI || MjClient.gameType == MjClient.GAME_TYPE.TONG_CHENG_GE_ZI_PAI){
            pl.eatFlag = d.eatFlags[pl.info.uid];
            if(pl.eatFlag != 0){
                pl.mjState = TableState.waitEat;
                pl.liuCards = d.liuCards;
                pl.piaoCards = d.piaoCards;
            }
            pl.isDead = d.isDead;
            if(pl.isDead && pl.info.uid == SelfUid()){
                playEffectInPlay("sishou");
            }
        }

        if (MjClient.gameType == MjClient.GAME_TYPE.GONG_AN_HUA_PAI) {
            pl.eatFlag = d.eatFlags[pl.info.uid];
            if(pl.eatFlag != 0){
                pl.mjState = TableState.waitEat;
                pl.liuCards = d.liuCards;
            }
        }

        if (d.cpginfo.cardFourCount) {
            pl.cardFourCount = d.cpginfo.cardFourCount;
        }

        if (d.cpginfo.mjhandFour) {
            pl.mjhandFour = d.cpginfo.mjhandFour;
        }

        if (d.cpginfo.pengFourCounts) {
            sData.players[uid].pengFourCounts = d.cpginfo.pengFourCounts;
        }

        if ("canGangHand" in d) {
            pl.canGangHand = d.canGangHand;
        }

        if (MjClient.gameType == MjClient.GAME_TYPE.CHANG_SHA ||
            MjClient.gameType === MjClient.GAME_TYPE.XIANG_YIN_TUI_DAO_HU ||
            MjClient.gameType === MjClient.GAME_TYPE.PING_JIANG_ZHA_NIAO ||
            MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_CHANG_SHA)
        {
            tData.lastPutCard2 = null;
            tData.lastPutCard3 = null;
            tData.lastPutCard4 = null;
        }
        if (MjClient.gameType === MjClient.GAME_TYPE.PING_JIANG_ZHA_NIAO) 
        {
            tData.isKaigang = false;
        }

        if(MjClient.gameType == MjClient.GAME_TYPE.AN_XIANG_WEI_MA_QUE) {
            pl.mjState = tData.tState;
            pl.isDead = d.isDead;
            //偎麻雀死手不播音效
            // if(pl.isDead && pl.info.uid == SelfUid()){
            //     playEffectInPlay("sishou");  
            // }
        }

        if(MjClient.gameType == MjClient.GAME_TYPE.XIANG_XI_2710){
            for (var uid in sData.players) {
                sData.players[uid].fallArea = -1;
            }
        }

        if(MjClient.gameType == MjClient.GAME_TYPE.SHI_SHOU_AI_HUANG && d.cpginfo.canKaHuPlayer != null){
            var kaHuPlayerUid = d.cpginfo.canKaHuPlayer;
            var kaHuPlayer = sData.players[kaHuPlayerUid];
            kaHuPlayer.eatFlag = 8;
            kaHuPlayer.mjState = TableState.waitEat;
            tData.tState = TableState.waitEat;
        }
    }]
    , MJGang: [0, function (d) {
        //cc.log("收到杠的消息", JSON.stringify(d));
        if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_FU_LU_SHOU ||
            MjClient.gameType == MjClient.GAME_TYPE.FU_LU_SHOU_ER_SHI_ZHANG) {
            //福禄寿协议内容严重不一样
            var sData = MjClient.data.sData;
            if (!sData) return;
            sData.tData = d.tData;
            var tData = sData.tData;
            var uids = tData.uids;
            var pl = sData.players[d.id + ""];
            pl.mjState = tData.tState;
            pl.isAnGang = d.isNew;  //isNew=true 表示暗杠
            pl.isTing = true;       //福禄寿只能杠一次，接到杠后进入听牌自动摸打状态

            //"杠"牌
            if(d.isNew) {
                if(d.mjgang1 && d.mjgang1 && d.mjgang1 > 0) {
                    pl.mjgang1.push(d.mjgang1);     //暗招
                }
            } else {
                if(d.mjgang0 && d.mjgang0 && d.mjgang0 > 0) {
                    pl.mjgang0.push(d.mjgang0);     //明招
                }
            }

            //修复招牌时不清除桌面的bug
            var lp = sData.players[uids[d.from]];
            var mjput = lp.mjput;
            var cd = tData.lastPutCard;
            if (mjput.length > 0 && mjput[mjput.length - 1] == cd) {
                mjput.length = mjput.length - 1;
            }

            //清理手牌中的杠牌
            var clearHandZhao = function(pai) {
                if(!pai)
                    return;
                pl.mjhand.splice(pl.mjhand.indexOf(pai), 1);
                pl.mjhand.splice(pl.mjhand.indexOf(pai), 1);
                pl.mjhand.splice(pl.mjhand.indexOf(pai), 1);
                if(pl.isAnGang) {
                    pl.mjhand.splice(pl.mjhand.indexOf(pai), 1);
                }
            };

            if(d.id == SelfUid()) {
                //播放声音
                playEffectInPlay("gang");
                clearHandZhao(d.isNew ? d.mjgang1[0] : d.mjgang0[0]);
                pl.mjState = TableState.waitCard;
            } else {
                if(MjClient.rePlayVideo != -1) {
                    clearHandZhao(d.isNew ? d.mjgang1[0] : d.mjgang0[0]);
                }
            }

            //所有人eatFlag置位0
            for (var uid in sData.players) {
                sData.players[uid].eatFlag = 0;
            }
            return;
        }
        if (d.card instanceof Array)
        {
            // 通化麻将，特殊的杠（旋风杠、瘸腿杠）会走到这里
            mylog("MJGang "+d.card+" "+d.gang+" "+d.from);

            var sData = MjClient.data.sData;
            sData.players[d.cpginfo.id + ""].pengchigang = d.cpginfo.pengchigang;
            var tData = sData.tData;
            var uids = tData.uids;

            var cd = d.card;
            var pl = sData.players[d.uid];
            pl.putType = d.cpginfo.putType;

            //pl.openDoorState = d.cpginfo.openDoorState;
            if (d.gang == 1) {
                pl.mjTeshuGang0.push(cd);
                if (d.uid == SelfUid()) {
                    for (var i = 1; i < cd.length; i ++)
                    {
                        pl.mjhand.splice(pl.mjhand.indexOf(cd[i]), 1);
                    }
                }

                var lp = sData.players[uids[d.from]];
                var mjput = lp.mjput;
                if (mjput.length > 0 && mjput[mjput.length - 1] == cd[0]) {
                    mjput.length = mjput.length - 1;
                }
                else  mylog("gang error from");
                pl.isNew = false;
            }
            else if (d.gang == 2) //中发白+中/发/白 补杠
            {
                for (var i = 0; i < pl.mjTeshuGang1.length; i++)
                {
                    var gang1 = pl.mjTeshuGang1[i];
                    if (gang1.length == 3 && gang1[0] == 71 && gang1[1] == 81 && gang1[2] == 91)
                    {
                        if (cd[0] == 71)
                            gang1.splice(0, 0, 71);
                        else if (cd[0] == 81)
                            gang1.splice(1, 0, 81);
                        else
                            gang1.splice(2, 0, 91);

                        if (d.uid == SelfUid())
                            pl.mjhand.splice(pl.mjhand.indexOf(cd[0]), 1);
                        break;
                    }
                }
            }
            else if (d.gang == 3) {
                pl.mjTeshuGang1.push(cd);
                if (d.uid == SelfUid()) {
                    for (var i = 0; i < cd.length; i ++)
                    {
                        pl.mjhand.splice(pl.mjhand.indexOf(cd[i]), 1);
                    }
                }
            }
            tData.curPlayer = tData.uids.indexOf(d.uid);
            tData.lastPutCard = cd[0];
            if (!tData.noBigWin || (d.gang == 2 && tData.canEatHu)) tData.putType = d.gang;

            tData.tState = d.tState || TableState.waitEat;
            if (d.uid == SelfUid()) {
                pl.mjState = TableState.waitCard;
            }
            else {
                if(tData.tState != TableState.waitLong)
                    sData.players[SelfUid() + ""].mjState = TableState.waitEat;
            }

            if (d.uid == SelfUid() && d.hua !== undefined) {
                pl.hua = d.hua;
            }

            if (d.eatFlags) {
                for(var uid in d.eatFlags) {
                    sData.players[uid].eatFlag = d.eatFlags[uid];
                }
            }

            if (d.mustHus) {
                for(var uid in d.mustHus) {
                    sData.players[uid].mustHu = d.mustHus[uid];
                }
            }

            if (d.gang == 1 || (cd.length == 3 && cd[0] == 71 && cd[1] == 81 && cd[2] == 91))
            {
                playEffectInPlay("mingDan");
            }
            else if (d.gang == 2)
            {
                if (cd[0] == 71)
                    playEffectInPlay("guoHongZhong");
                else if (cd[0] == 81)
                    playEffectInPlay("guoLvFa");
                else
                    playEffectInPlay("guoBaiBan");
            }
            else if (d.gang == 3)
            {
                playEffectInPlay("anDan");
            }
            if (d.eatFlags) {
                for(var uid in d.eatFlags) {
                    sData.players[uid].eatFlag = d.eatFlags[uid];
                }
            }
            return;
        }

        // mylog("MJGang "+d.card+" "+d.gang+" "+d.from);

        var sData = MjClient.data.sData;
        if (!sData) return;

        if (d.mustHus) {
            for(var uid in d.mustHus) {
                sData.players[uid].mustHu = d.mustHus[uid];
            }
        }
        if (d.gangFourCounts) {
            sData.players[uid].gangFourCounts = d.gangFourCounts;
            var pl = getUIPlayerByUID(uid);
             pl.gangFourCounts = d.gangFourCounts;
        }
        if (d.uid == SelfUid()) 
        {
            var pl = sData.players[d.uid];
            if ("kaigangList" in d) {
                pl.kaigangList = d.kaigangList;
            }
            if ("canKaiGang" in pl) {
                pl.canKaiGang = false;
            }
            if ("isBBHu" in pl) 
            {
                pl.isBBHu = false;
            }
        }


        sData.players[d.cpginfo.id + ""].pengchigang = d.cpginfo.pengchigang;
        var tData = sData.tData;
        var uids = tData.uids;

        var cd = d.card;
        var pl = sData.players[d.uid];
        pl.putType = d.cpginfo.putType;
        pl.onLine = true;
        //pl.openDoorState = d.cpginfo.openDoorState;
        if (d.gang == 1) {
            pl.mjgang0.push(cd);
            if (pl.anKeNum > 0 && pl.isTing) pl.anKeNum--;
            if (d.uid == SelfUid()) {
                pl.mjhand.splice(pl.mjhand.indexOf(cd), 1);
                pl.mjhand.splice(pl.mjhand.indexOf(cd), 1);
                if((MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_YI_JIAO_LAI_YOU 
                    || MjClient.gameType == MjClient.GAME_TYPE.HU_BEI_YI_JIAO_LAI_YOU
                    || MjClient.gameType == MjClient.GAME_TYPE.QIAN_JIANG_HH_MJ
                    || MjClient.gameType == MjClient.GAME_TYPE.CHUO_XIA_ZI) 
                    && tData.chaoTianCard && d.card == tData.chaoTianCard)
                {

                }
                else {
                    pl.mjhand.splice(pl.mjhand.indexOf(cd), 1);
                }
            }

            var lp = sData.players[uids[d.from]];
            var mjput = lp.mjput;
            if (mjput.length > 0 && mjput[mjput.length - 1] == cd) {
                mjput.length = mjput.length - 1;
            }
            else  mylog("gang error from");
            pl.isNew = false;
        }
        else if (d.gang == 2) {
            pl.mjgang0.push(cd);
            pl.mjpeng.splice(pl.mjpeng.indexOf(cd), 1);
            if (d.uid == SelfUid()) {
                if ((MjClient.gameType == MjClient.GAME_TYPE.CHANG_SHA ||
                    MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_CHANG_SHA ||
                    MjClient.gameType === MjClient.GAME_TYPE.XIANG_YIN_TUI_DAO_HU ||
                    MjClient.gameType === MjClient.GAME_TYPE.PING_JIANG_ZHA_NIAO )
                    && tData.lastPutCard2 && tData.uids[tData.curPlayer] == d.uid) // 长沙麻将开杠后再杠
                    ;
                else if(MjClient.gameType == MjClient.GAME_TYPE.NING_XIANG_KAI_WANG && d.card === tData.showCard){  //宁乡开王麻将借子开杠
                }
                else if(MjClient.gameType == MjClient.GAME_TYPE.HUAI_HUA_MA_JIANG && tData.areaSelectMode.touhougang && tData.touingUid != null){
                    
                }else if(MjClient.gameType == MjClient.GAME_TYPE.JING_ZHOU_MA_JIANG && tData.touingUid != null){

                }
                else{
                    pl.mjhand.splice(pl.mjhand.indexOf(cd), 1);
                }
            }
        }
        else if (d.gang == 3) {
            pl.mjgang1.push(cd);
            if (pl.anKeNum > 0 && pl.isTing) pl.anKeNum--;
            if (d.uid == SelfUid()) {
                pl.mjhand.splice(pl.mjhand.indexOf(cd), 1);
                pl.mjhand.splice(pl.mjhand.indexOf(cd), 1);
                pl.mjhand.splice(pl.mjhand.indexOf(cd), 1);

                if ((MjClient.gameType == MjClient.GAME_TYPE.CHANG_SHA ||
                    MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_CHANG_SHA ||
                    MjClient.gameType === MjClient.GAME_TYPE.XIANG_YIN_TUI_DAO_HU ||
                    MjClient.gameType === MjClient.GAME_TYPE.PING_JIANG_ZHA_NIAO)&& tData.lastPutCard2 && tData.uids[tData.curPlayer] == d.uid) // 长沙麻将开杠后再杠
                    ;
                else if((MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_YI_JIAO_LAI_YOU 
                    || MjClient.gameType == MjClient.GAME_TYPE.HU_BEI_YI_JIAO_LAI_YOU
                    || MjClient.gameType == MjClient.GAME_TYPE.QIAN_JIANG_HH_MJ
                    || MjClient.gameType == MjClient.GAME_TYPE.CHUO_XIA_ZI)
                     && tData.chaoTianCard && d.card == tData.chaoTianCard)
                {

                }
                else if(MjClient.gameType == MjClient.GAME_TYPE.HUAI_HUA_MA_JIANG && tData.areaSelectMode.touhougang && tData.touingUid != null){
                }else if(MjClient.gameType == MjClient.GAME_TYPE.JING_ZHOU_MA_JIANG && tData.touingUid != null){

                }else
                    pl.mjhand.splice(pl.mjhand.indexOf(cd), 1);
            }
        }


        if ((MjClient.gameType == MjClient.GAME_TYPE.CHANG_SHA || 
            MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_CHANG_SHA ||
        MjClient.gameType === MjClient.GAME_TYPE.XIANG_YIN_TUI_DAO_HU ) && tData.lastPutCard2) // 长沙麻将开杠后再杠
        {
            var mjput = sData.players[uids[tData.curPlayer]].mjput;
            if (mjput.length > 0 && mjput[mjput.length - 1] == cd)
            {
                mjput.length = mjput.length - 1;
            }
            else if (mjput.length >= 2 && mjput[mjput.length - 2] == cd && tData.lastPutCard2 > 0)
            {
                mjput.splice(mjput.length - 2, 1);
            }
            else if (mjput.length >= 3 && mjput[mjput.length - 3] == cd && tData.lastPutCard3 > 0)
            {
                mjput.splice(mjput.length - 3, 1);
            }
            else if (mjput.length >= 4 && mjput[mjput.length - 4] == cd && tData.lastPutCard4 > 0)
            {
                mjput.splice(mjput.length - 4, 1);
            }
            else
            {
                cc.log("mjGangCard --error--!!");
            }
        }
        if (MjClient.gameType == MjClient.GAME_TYPE.PING_JIANG_ZHA_NIAO && tData.kaigangs.length > 0) 
        {

            var mjput = sData.players[uids[tData.curPlayer]].mjput;
            //cc.log("已出牌    ",uids[tData.curPlayer],mjput,"  杠的牌 ",cd)
            if (mjput.length > 0 && mjput[mjput.length - 1] == cd)
            {
                mjput.length = mjput.length - 1;
            }
            else
            {
                cc.log("mjGangCard --error--!!");
            }
        }

        tData.curPlayer = tData.uids.indexOf(d.uid);
        tData.lastPutCard = cd;
        if (MjClient.gameType == MjClient.GAME_TYPE.CHANG_SHA||
            MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_CHANG_SHA ||
            MjClient.gameType === MjClient.GAME_TYPE.XIANG_YIN_TUI_DAO_HU ||
            MjClient.gameType === MjClient.GAME_TYPE.PING_JIANG_ZHA_NIAO )
        {
            tData.lastPutCard2 = null;
            tData.lastPutCard3 = null;
            tData.lastPutCard4 = null;
        }
        if (MjClient.gameType === MjClient.GAME_TYPE.PING_JIANG_ZHA_NIAO) 
        {
            tData.isKaigang = false;
        }

        if (!tData.noBigWin || (d.gang == 2 && tData.canEatHu)) tData.putType = d.gang;

        if (d.gang == 4) {//如皋长牌，龙是三张牌的杠
            if(MjClient.gameType == MjClient.GAME_TYPE.EN_SHI_MA_JIANG || MjClient.gameType == MjClient.GAME_TYPE.QI_CHUN_HONG_ZHONG_GANG){//一痞二癞的痞子杠和癞子杠
                if(d.cpginfo.gangType == 1 || d.cpginfo.gangType == 2){//痞子杠:1  癞子杠:2
                    pl.mjPiZiGang.push(d.card);
                    if(d.uid == SelfUid()){
                        pl.mjhand.splice(pl.mjhand.indexOf(d.card), 1);
                    }
                }
            }else{
                if (d.isFenggang)
                {
                    if (d.uid == SelfUid()) {
                        if (d.fgang) {
                            pl.fgang = d.fgang;
                        }
                        if (d.mjhand) {
                            pl.mjhand = d.mjhand;
                        }
                    }

                    var lp = sData.players[uids[d.from]];
                    var mjput = lp.mjput;
                    if (mjput.length > 0 && mjput[mjput.length - 1] == cd) {
                        mjput.length = mjput.length - 1;
                    }
                    else  mylog("gang error from");
                    pl.isNew = false;
                }
                else
                {
                    pl.mjgang1.push(cd);
                    if (d.uid == SelfUid()) {
                        pl.mjhand.splice(pl.mjhand.indexOf(cd), 1);
                        pl.mjhand.splice(pl.mjhand.indexOf(cd), 1);
                        pl.mjhand.splice(pl.mjhand.indexOf(cd), 1);
                    }
                    tData.tState = d.tState || TableState.waitPut;
                    if (d.uid == SelfUid()) {

                        pl.mjState = TableState.waitPut;
                    }
                    else {
                        if(tData.tState != TableState.waitLong)
                            sData.players[SelfUid() + ""].mjState = TableState.waitPut;
                    }
                }
            }  
        }
        if (d.gang == 5) {//如皋长牌，龙是2张牌的杠
            if (d.isFenggang)
            {
                cc.log("风杠");
                if (d.uid == SelfUid()) {
                    if (d.fgang) {
                        pl.fgang = d.fgang;
                    }
                    if (d.mjhand) {
                        cc.log("  暗杠风杠");
                        pl.mjhand = d.mjhand;
                    }
                }
            }
            else
            {
                pl.mjgang1.push(cd);
                if (d.uid == SelfUid()) {
                    pl.mjhand.splice(pl.mjhand.indexOf(cd), 1);
                    pl.mjhand.splice(pl.mjhand.indexOf(cd), 1);
                }
                tData.tState = TableState.waitPut;
                if (d.uid == SelfUid()) {
                    pl.mjState = TableState.waitPut;
                }
                else {
                    if(tData.tState != TableState.waitLong)
                        sData.players[SelfUid() + ""].mjState = TableState.waitPut;
                }
            }
        }
        else {
            tData.tState = d.tState || TableState.waitEat;
            if (d.uid == SelfUid()) {
                pl.mjState = TableState.waitCard;
            }
            else {
                if(tData.tState != TableState.waitLong)
                    sData.players[SelfUid() + ""].mjState = TableState.waitEat;
            }
        }
        if (d.uid == SelfUid() && d.hua !== undefined) {
            pl.hua = d.hua;
        }
        //南京麻将的嘴
        if (d.zuiUid ) {
            pl.zuiUid = d.zuiUid;
        }
        if (d.zuiCount) {
            pl.zuiCount = d.zuiCount;
        }
        if (d.qingDui) {
            pl.qingDui = d.qingDui;
        }
        if (d.eatFlags) {
            for(var uid in d.eatFlags) {
                sData.players[uid].eatFlag = d.eatFlags[uid];
            }
        }
        if(d.touzi){
            pl.touzi = d.touzi;
            pl.mjState = TableState.waitEat;
        }

        //一痞二癞的倍数
        if("allGangMul" in d.cpginfo){
            pl.allGangMul = d.cpginfo.allGangMul;
        }

        //蕲春红中杠番数
        if("curFanCount" in d.cpginfo){
            pl.curFanCount = d.cpginfo.curFanCount;
        }
        //console.log("=====doomsky say:pl.openDoorState======", pl.openDoorState);

        if (MjClient.getAppType() == MjClient.APP_TYPE.QXTHMJ)
        {
            if (tData.hunCard == d.card)
                playEffectInPlay("huangjinDan");
            else if (d.gang == 1)
                 playEffectInPlay("mingDan");
            else if (d.gang == 2)
                playEffectInPlay("guoDan");
            else
                playEffectInPlay("anDan");
        }
        else if(MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP)
        {
            if(tData.tState === TableState.waitLong)
            {
                if(MjClient.GAME_TYPE.QU_TANG_23_ZHANG === MjClient.gameType){    // 曲塘23张起手杠播杠音效
                    playEffectInPlay("gang");
                }else{
                    playEffectInPlay("long");
                }
            }
            else if(d.gang == 1 || d.gang == 2)
            {
                playEffectInPlay("gang");
            }
            else if (d.gang == 3)
            {
                playEffectInPlay("anGang");
            }
            else if(d.gang == 4 || d.gang == 5)
            {
                playEffectInPlay("anGang");
            }
        }
        else if ((MjClient.gameType == MjClient.GAME_TYPE.CHANG_SHA ||
            MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_CHANG_SHA ||
            MjClient.gameType === MjClient.GAME_TYPE.XIANG_YIN_TUI_DAO_HU ||
            MjClient.gameType === MjClient.GAME_TYPE.PING_JIANG_ZHA_NIAO ||
            MjClient.gameType == MjClient.GAME_TYPE.NING_XIANG_MJ)&& d.isKaiGang)
        {
            playEffectInPlay("kaiGang");
        }
        else if (MjClient.gameType == MjClient.GAME_TYPE.CHAO_GU_MJ) 
        {
            playEffectInPlay("gang");
        }
        else
        {
            if (d.gang == 1 || d.gang == 2)
            {
                playEffectInPlay("gang");
            }
            else if (d.gang == 3)
            {
                playEffectInPlay("anGang");
            }
            else if(d.gang == 4 || d.gang == 5)//用在南通长牌的“龙”
            {
                playEffectInPlay("anGang");
            }
        }


        if (d.tState) {
            sData.tData.tState = d.tState;
            if (d.tState == TableState.waitLong) {
                pl.long.push(d.card);
            }
        }


        if (d.plState && d.cpginfo.id == SelfUid()) {
            sData.players[SelfUid() + ""].mjState = d.plState;
        }

        if (MjClient.gameType == MjClient.GAME_TYPE.GUAN_YUN || 
            MjClient.gameType == MjClient.GAME_TYPE.XIANG_SHUI_MJ) {
            pl.isTianting = false;
        }

        if (d.cpginfo.cardFourCount) {
            pl.cardFourCount = d.cpginfo.cardFourCount;
        }

        if (d.cpginfo.mjhandFour) {
            pl.mjhandFour = d.cpginfo.mjhandFour;
        }

        //安化麻将杠后重置摸的牌
        if(MjClient.gameType == MjClient.GAME_TYPE.AN_HUA_MA_JIANG || MjClient.gameType == MjClient.GAME_TYPE.AN_HUA_MA_JIANG_SW ||
            MjClient.gameType == MjClient.GAME_TYPE.NING_XIANG_KAI_WANG){
            pl.newCd = 0;
            if(d.canBaotingNum != undefined){
                tData.canBaotingNum = d.canBaotingNum;
            }
        }

        if(MjClient.gameType === MjClient.GAME_TYPE.HUAI_HUA_MA_JIANG || MjClient.gameType === MjClient.GAME_TYPE.JING_ZHOU_MA_JIANG){
            tData.touingUid = null;
        }

        if(MjClient.gameType == MjClient.GAME_TYPE.SHI_SHOU_AI_HUANG && d.cpginfo.canKaHuPlayer != null){
            var kaHuPlayerUid = d.cpginfo.canKaHuPlayer;
            var kaHuPlayer = sData.players[kaHuPlayerUid];
            kaHuPlayer.eatFlag = 8;
            kaHuPlayer.mjState = TableState.waitEat;
            tData.tState = TableState.waitEat;
        }

        COMMON_UI.clearShowCurrentEatCards();
    }],
    //岳阳福禄寿添加"招"
    MJZhao: [0, function (d) {
        //cc.log("招牌咯", JSON.stringify(d));
        var sData = MjClient.data.sData;
        if (!sData) return;
        sData.tData = d.tData;
        var tData = sData.tData;
        var uids = tData.uids;
        var pl = sData.players[d.id + ""];
        pl.mjState = tData.tState;
        pl.isNew = d.isNew;  //isNew=true 表示暗招

        //"招"牌
        if(d.isNew) {
            if(d.mjzhao1 && d.mjzhao1 && d.mjzhao1 > 0) {
                pl.mjzhao1.push(d.mjzhao1);     //暗招
            }
        } else {
            if(d.mjzhao0 && d.mjzhao0 && d.mjzhao0 > 0) {
                pl.mjzhao0.push(d.mjzhao0);     //明招
            }
        }

        //修复招牌时不清除桌面的bug
        var lp = sData.players[uids[d.from]];
        var mjput = lp.mjput;
        var cd = tData.lastPutCard;
        if (mjput.length > 0 && mjput[mjput.length - 1] == cd) {
            mjput.length = mjput.length - 1;
        }

        //清理手牌中的杠牌
        var clearHandZhao = function(pai) {
            if(!pai)
                return;
            pl.mjhand.splice(pl.mjhand.indexOf(pai), 1);
            pl.mjhand.splice(pl.mjhand.indexOf(pai), 1);
            pl.mjhand.splice(pl.mjhand.indexOf(pai), 1);
            if(pl.isNew) {
                pl.mjhand.splice(pl.mjhand.indexOf(pai), 1);
            }
        };

        if(d.id == SelfUid()) {
            //播放声音
            playEffectInPlay("zhao");
            clearHandZhao(d.isNew ? d.mjzhao1 : d.mjzhao0);
            pl.mjState = TableState.waitCard;
        } else {
            if(MjClient.rePlayVideo != -1) {
                clearHandZhao(d.isNew ? d.mjzhao1 : d.mjzhao0);
            }
        }

        //所有人eatFlag置位0
        for (var uid in sData.players) {
            sData.players[uid].eatFlag = 0;
        }
    }],
    RGLong: [0, function (d) {
        var sData = MjClient.data.sData;
        if (!sData) return;
        var pl = sData.players[d.uid];
        pl.long = d.long;
        pl.gang1 = d.gang1;
    }],
    MJFlower: [0, function (d) {
        cc.log("------------------- app mjflower ------ " + d);
        playEffectInPlay("flower");
        var sData = MjClient.data.sData;
        if (!sData) return;
        var pl = sData.players[d.uid];
        if (d.uid == SelfUid()) {
            var idx = pl.mjhand.indexOf(d.card);
            if(idx >= 0)
            {
                pl.mjhand.splice(idx, 1);
            }
        }
        if (!pl.mjflower) {
            pl.mjflower = [];
        }
        if (d.eatFlags) {
            for(var uid in d.eatFlags) {
                sData.players[uid].eatFlag = d.eatFlags[uid];
            }
        }
        if (MjClient.gameType == MjClient.GAME_TYPE.LUAN_GUA_FENG)
        {
            sData.tData.tState = TableState.waitEat;
            sData.tData.lastPutCard = d.card;
            if (pl.buCards) {
                pl.buCards = [];
            }
            if (d.uid == SelfUid()) {
                pl.mjState = TableState.waitPut;
            }
            else {
                sData.players[SelfUid() + ""].mjState = TableState.waitEat;
            }
        }
        if (MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_YI_JIAO_LAI_YOU)
        {
            pl.rate = d.rate;
            pl.mjput.push(d.card);
        }

        //如皋麻将胡
        if (!d.firstFlower8) {
            pl.firstFlower8 = d.firstFlower8;
        }
        


        pl.mjflower.push(d.card);
        pl.putType = d.putType;
        console.log("=====doomsky say:pl.putType======", pl.putType);
        cc.log("pl--------------",pl.mjhand);
    }],
    MJTing:[0,function(d)
    {
        if(MjClient.gameType != MjClient.GAME_TYPE.CHANG_SHA ||
            MjClient.gameType != MjClient.GAME_TYPE.HENG_YANG_CHANG_SHA ||
            MjClient.gameType != MjClient.GAME_TYPE.XIANG_YIN_TUI_DAO_HU ||
            MjClient.gameType != MjClient.GAME_TYPE.PING_JIANG_ZHA_NIAO ){
            playEffectInPlay("ting");
        }
        if(MjClient.CheckPlayerCount(function(pl){return pl.isTing}) == 0)
        {
            if (MjClient.getAppType() != MjClient.APP_TYPE.QXTHMJ)
            {
                playMusic("bgFight_ting");
            }
        }
        if (MjClient.gameType == MjClient.GAME_TYPE.XIANG_YIN_TUI_DAO_HU)
        {
            playMusic("bgFightXYTDH");
        }
        var sData = MjClient.data.sData;
        if (!sData) return;
        var tData = sData.tData;
        var pl = sData.players[d.uid];
        pl.isTing = true;
        tData.haveTianTing = false;

        if (MjClient.gameType == MjClient.GAME_TYPE.PING_JIANG_ZHA_NIAO ) 
        {
            if ("isTingJJHu" in d) 
            {
                pl.isTingJJHu = d.isTingJJHu;
            }
            pl.isKaigang = false;
            if (d.isKaigang) 
            {
                pl.isKaigang = d.isKaigang;
            }
        }

        if (MjClient.gameType == MjClient.GAME_TYPE.XIAO_GAN_KA_WU_XING ||
            MjClient.gameType == MjClient.GAME_TYPE.SUI_ZHOU_KA_WU_XING) {
            pl.anKeNum = d.anKeNum;
            pl.tingCards = d.tingCards;
            pl.liangCards = d.liangCards;
        }

        if (d.uid == SelfUid()) 
        {
            if ("eatFlag" in d) 
            {
                pl.eatFlag = d.eatFlag;
            }
        }
        if ("tingFinish" in d) 
        { 
            pl.tingFinish = d.tingFinish;
        }
        if (MjClient.gameType == MjClient.GAME_TYPE.YUAN_JIANG_MJ ||
            MjClient.gameType == MjClient.GAME_TYPE.NAN_XIAN_MJ  ||
            MjClient.gameType == MjClient.GAME_TYPE.NING_XIANG_MJ ||
            MjClient.gameType == MjClient.GAME_TYPE.XIANG_SHUI_MJ) 
        {
            pl.needTing = false;
        }
        if("putCount" in d)
            pl.putCount = d.putCount;

        if(d.tingIndex >= 0 && (MjClient.gameType == MjClient.GAME_TYPE.GUAN_NAN || MjClient.gameType == MjClient.GAME_TYPE.SI_YANG ||  MjClient.gameType == MjClient.GAME_TYPE.HUAI_AN_ERZ)) {
            pl.tingIndex = d.tingIndex;
        }

        cc.log("mjting -------------- pl.putCount = " + pl.putCount);
        if(MjClient.gameType == MjClient.GAME_TYPE.LIAN_SHUI ||
            MjClient.gameType == MjClient.GAME_TYPE.GUAN_YUN || 
            MjClient.gameType == MjClient.GAME_TYPE.XIANG_SHUI_MJ)
        {
            var _cardCount = 0;
            if(tData.uids[tData.zhuang] == d.uid)
            {
                _cardCount = 1;
            }
            if(pl.mjgang1.length == 0 && pl.mjgang0.length == 0 && pl.mjpeng.length == 0 && pl.putCount <= _cardCount )//起手听牌不受张数限制
            {
                //起手听牌，天听
                cc.log("--起手听牌，天听---------天听");
                pl.isTianting = true;
            }
        }

    }],
    MJXuanFengGang: [0, function (d) {

        var sData = MjClient.data.sData;
        if (!sData) return;
        var tData = sData.tData;
        var pl = sData.players[d.cpginfo.id+ ""];
        //console.log("=====doomsky say:JSON.stringify(pl.xuanfengGang)======", JSON.stringify(pl.xuanfengGang));
        // pl.xuanfengGang = d.cpginfo.xuanfenggang;
        //pl.xuanfengGang.push(31);
        //console.log("=====doomsky say  2:JSON.stringify(pl.xuanfengGang)======", JSON.stringify(pl.xuanfengGang));
        // if (pl.xuanfengGang.length > 0)
        // {
        if (d.cpginfo.id == SelfUid()) {
            // for (var i = 0; i < pl.xuanfengGang.length; i++) {
            //  var card = pl.xuanfengGang[i];
            //  pl.mjhand.splice(pl.mjhand.indexOf(card), 1);
            pl.mjhand.splice(pl.mjhand.indexOf(31), 1);
            pl.mjhand.splice(pl.mjhand.indexOf(41), 1);
            pl.mjhand.splice(pl.mjhand.indexOf(51), 1);
            pl.mjhand.splice(pl.mjhand.indexOf(61), 1);
            // }
        }
        // }
        tData.curPlayer = tData.uids.indexOf(d.cpginfo.id);
        if (d.cpginfo.id == SelfUid()) {
            pl.mjState = TableState.waitCard;
        }
        else {
            sData.players[SelfUid() + ""].mjState = TableState.waitEat;
        }
        playEffectInPlay("gang");
    }],
    MJXuanFengPeng: [0, function (d) {

        var sData = MjClient.data.sData;
        if (!sData) return;
        var tData = sData.tData;
        var pl = sData.players[d.cpginfo.id+ ""];
        //console.log("=====doomsky say:JSON.stringify(pl.xuanfengPeng)======", JSON.stringify(pl.xuanfengGang));
        // pl.xuanfengGang = d.cpginfo.xuanfenggang;
        //pl.xuanfengGang.push(71);
        // if (pl.xuanfengGang.length > 0)
        // {
        if (d.cpginfo.id == SelfUid()) {
            //      for (var i = 0; i < pl.xuanfengGang.length; i++) {
            //          var card = pl.xuanfengGang[i];
            //          pl.mjhand.splice(pl.mjhand.indexOf(card), 1);
            pl.mjhand.splice(pl.mjhand.indexOf(71), 1);
            pl.mjhand.splice(pl.mjhand.indexOf(81), 1);
            pl.mjhand.splice(pl.mjhand.indexOf(91), 1);
            // }
        }
        // }
        tData.curPlayer = tData.uids.indexOf(d.cpginfo.id);
        if (d.cpginfo.id == SelfUid()) {
            pl.mjState = TableState.waitCard;
        }
        else {
            sData.players[SelfUid() + ""].mjState = TableState.waitEat;
        }
        playEffectInPlay("gang");
    }],
    MJHu:[0.5, function (d) {
        //处理自摸和点炮的音频
        //if (d.uid == SelfUid())
        {
            var sData = MjClient.data.sData;
            if (!sData) return;
            var tData = sData.tData;
            var pl = sData.players[d.uid];
            tData.curPlayer = tData.uids.indexOf(d.uid);
            if ("curPlayer" in d) 
            {
                tData.curPlayer = d.curPlayer;
            }
            pl.huWord = d.huWord; // 添加 不同胡的动画
            if ("huWords" in d) {
                pl.huWords = d.huWords;
            }
            
            if ("huCards" in d) {
                pl.huCards = d.huCards;
            }

            if ("huCardsInfo" in d) {
                pl.huCardsInfo = d.huCardsInfo;
            }

            pl.isBBHu = false;//平江扎鸟胡牌后板板胡判断改为false;
            if (d.qiangganghuInfo) {
                var gangPl = sData.players[d.qiangganghuInfo.uid];
                for (var k in d.qiangganghuInfo.changed) {
                    gangPl[k] = d.qiangganghuInfo.changed[k];
                }
            }
            if (d.mjputInfo) {
                var lp = sData.players[d.mjputInfo.uid];
                lp.mjput = d.mjputInfo.mjput;
            }
            if (d.zimoNode) {
                pl.zimoNode = d.zimoNode;
            }
            //自摸胡刪牌
            if (MjClient.GAME_TYPE.XUE_LIU == MjClient.gameType &&
                d.uid == SelfUid())
            {
                if (pl.mjhand.length % 3 == 2)
                {
                    var cardtag =  pl.mjhand.pop();
                    RemoveNodeBack(getNode(0),"mjhand",1,cardtag);
                }
            }
            pl.onLine = true;

            if (MjClient.GAME_TYPE.XUE_ZHAN == MjClient.gameType)
            {
                pl.isTing = true;
            }
            if (MjClient.GAME_TYPE.XUE_LIU == MjClient.gameType)
            {
                pl.isTing = true;
            }
            if (MjClient.GAME_TYPE.YI_CHANG_XUE_LIU_MJ === MjClient.gameType)
            {
                pl.isTing = true;
                var sData = MjClient.data.sData;
                var showScoreData = d.showScore;
                var eatFlagInfo = d.eatFlagInfo;
                sData.players[d.uid].eatFlag = d.eatFlag;
                sData.players[d.uid].mjhand = d.mjhand;
                sData.players[d.uid].huCards = d.huCards;
                sData.players[d.uid].huCardsInfo = d.huCardsInfo;
                for (var uid in sData.players) {
                    sData.players[uid].winall = showScoreData[uid].winall;
                    sData.players[uid].huScore = showScoreData[uid].huDesc.score;
                    sData.players[uid].eatFlag = eatFlagInfo[uid];
                }
            }
            if (MjClient.GAME_TYPE.PING_JIANG_ZHA_NIAO == MjClient.gameType ||
                MjClient.gameType == MjClient.GAME_TYPE.TONG_CHENG_GE_ZI_PAI) 
            {
                pl.eatFlag = 0;//海底胡之后刷新按钮
            }
            // 红字有人胡 所有玩家操作flag置0
            if (tData.gameType == MjClient.GAME_TYPE.ML_HONG_ZI ||
                 tData.gameType == MjClient.GAME_TYPE.XIANG_YIN_ZHUO_HONG_ZI ||
                 tData.gameType == MjClient.GAME_TYPE.YUE_YANG_WAI_HU_ZI ||
                 tData.gameType == MjClient.GAME_TYPE.YI_YANG_WAI_HU_ZI ||
                 tData.gameType == MjClient.GAME_TYPE.NAN_XIAN_GUI_HU_ZI ||
                 tData.gameType == MjClient.GAME_TYPE.YUAN_JIANG_GUI_HU_ZI ||
                 tData.gameType == MjClient.GAME_TYPE.YUE_YANG_FU_LU_SHOU ||
                 tData.gameType == MjClient.GAME_TYPE.FU_LU_SHOU_ER_SHI_ZHANG ||
                 tData.gameType == MjClient.GAME_TYPE.YY_AN_HUA_PAO_HU_ZI ||
                 tData.gameType == MjClient.GAME_TYPE.CHEN_ZHOU_ZI_PAI ||
                 tData.gameType == MjClient.GAME_TYPE.GUI_YANG_ZI_PAI ||
                 tData.gameType == MjClient.GAME_TYPE.NING_XIANG_PAO_HU_ZI ||
                 tData.gameType == MjClient.GAME_TYPE.YUE_YANG_PENG_HU ||
                 tData.gameType == MjClient.GAME_TYPE.CHEN_ZHOU_MAO_HU_ZI ||
                 tData.gameType == MjClient.GAME_TYPE.CHANG_DE_PAO_HU_ZI ||
                 tData.gameType == MjClient.GAME_TYPE.YUAN_LING_PAO_HU_ZI ||
                 tData.gameType == MjClient.GAME_TYPE.SHI_MEN_PAO_HU_ZI ||
                 tData.gameType == MjClient.GAME_TYPE.XIANG_XI_2710 ||
                 tData.gameType == MjClient.GAME_TYPE.HAN_SHOU_PAO_HU_ZI ||
                 tData.gameType == MjClient.GAME_TYPE.AN_XIANG_WEI_MA_QUE ||
                 tData.gameType == MjClient.GAME_TYPE.XIANG_XI_96POKER || 
                 tData.gameType == MjClient.GAME_TYPE.HY_LIU_HU_QIANG ||
                 tData.gameType == MjClient.GAME_TYPE.XU_PU_PAO_HU_ZI ||
                 tData.gameType == MjClient.GAME_TYPE.DANG_YANG_FAN_JING ||
                 tData.gameType == MjClient.GAME_TYPE.YI_CHANG_SHANG_DA_REN ||
                 tData.gameType == MjClient.GAME_TYPE.HU_BEI_HUA_PAI ||
                 tData.gameType == MjClient.GAME_TYPE.GONG_AN_HUA_PAI) {
                for (var uid in sData.players) {
                    sData.players[uid].eatFlag = 0;
                }
            }

            if(MjClient.gameType === MjClient.GAME_TYPE.QU_TANG_23_ZHANG){
                // d.huWord = quanhun, qinghu, zimo
                if(d.huWord) playEffectInPlay(d.huWord);
            }


            if (MjClient.playui.playHuEffect) {
                MjClient.playui.playHuEffect(d.winType, d.huWords);
            }
            // 长沙麻将开杠后， 自摸胡牌， tState 是 waitEat ，长沙麻将特需处理添加 胡牌类型 winType数据下发
            else if((
                MjClient.gameType == MjClient.GAME_TYPE.YI_CHANG_XUE_LIU_MJ ||
                MjClient.gameType == MjClient.GAME_TYPE.CHANG_SHA ||
                MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_CHANG_SHA ||
                MjClient.gameType === MjClient.GAME_TYPE.XIANG_YIN_TUI_DAO_HU ||
                MjClient.gameType === MjClient.GAME_TYPE.PING_JIANG_ZHA_NIAO )&& d.winType){
                // 长沙麻将自摸音效
                if(d.winType == 3){
                    playEffectInPlay("zimo");
                }else{
                    playEffectInPlay("fangpao");
                }

            }
            else if(MjClient.gameType == MjClient.GAME_TYPE.ML_HONG_ZI || MjClient.gameType == MjClient.GAME_TYPE.XIANG_YIN_ZHUO_HONG_ZI || MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_WAI_HU_ZI
                || MjClient.gameType == MjClient.GAME_TYPE.NAN_XIAN_GUI_HU_ZI|| MjClient.gameType == MjClient.GAME_TYPE.YI_YANG_WAI_HU_ZI || MjClient.gameType == MjClient.GAME_TYPE.YUAN_JIANG_GUI_HU_ZI) {
                if(d.huType == 0){
                    playEffectInPlay("zimoXiaoHu");
                }else{
                    playEffectInPlay("zimoDaHu");
                }
                if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_WAI_HU_ZI || MjClient.gameType == MjClient.GAME_TYPE.YI_YANG_WAI_HU_ZI
                    || MjClient.gameType == MjClient.GAME_TYPE.NAN_XIAN_GUI_HU_ZI || MjClient.gameType == MjClient.GAME_TYPE.YUAN_JIANG_GUI_HU_ZI){
                    playEffectInPlay("hu");
                }
            }
            else if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_FU_LU_SHOU || MjClient.gameType == MjClient.GAME_TYPE.FU_LU_SHOU_ER_SHI_ZHANG ||
                    MjClient.gameType == MjClient.GAME_TYPE.AN_XIANG_WEI_MA_QUE || MjClient.gameType == MjClient.GAME_TYPE.XIANG_XI_96POKER ||
                    MjClient.gameType == MjClient.GAME_TYPE.DANG_YANG_FAN_JING || MjClient.gameType == MjClient.GAME_TYPE.YI_CHANG_SHANG_DA_REN ||
                    MjClient.gameType == MjClient.GAME_TYPE.HU_BEI_HUA_PAI || MjClient.gameType == MjClient.GAME_TYPE.GONG_AN_HUA_PAI ||
                    MjClient.gameType == MjClient.GAME_TYPE.TONG_CHENG_GE_ZI_PAI || MjClient.gameType == MjClient.GAME_TYPE.EN_SHI_SHAO_HU) {
                playEffectInPlay("hu");
            }else if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_PENG_HU) {
                var sound_hu = ["hu", "shuanglong", "tianhu", "hu_dihu", "hu_penghu", "hu_saohu", "hu_paohu"];
                playEffectInPlay(sound_hu[d.huType]);

            }else if(MjClient.playui.isNewFrameMaJiang){   //新版麻将
                var handlewShandian = function(){
                    if(MjClient.playui.addLightEffect){
                        MjClient.playui.addLightEffect(d);   
                        return;
                    }
                    var paoNode = MjClient.lastCardposNode;//新增地点炮动画
                    if (cc.sys.isObjectValid(paoNode)) {
                        paoNode.setVisible(true);
                        cc.log(" ===========paoNode======== x: "+ paoNode.x + " -----y:"+ paoNode.y);
                        var projNode2 = createSpine("spine/dianpao/skeleton.json", "spine/dianpao/skeleton.atlas");
                        projNode2.setAnimation(0, 'idle', false);
                        projNode2.setPosition(50,100);
                        projNode2.setTimeScale(0.35);
                        projNode2.setScale(1.5);
                        paoNode.addChild(projNode2,999999);
                    } 
                    else {
                        cc.log('error  MjClient.lastCardposNode 非法对象')
                    }
                }

                if(MjClient.getAppType() === MjClient.APP_TYPE.AYGUIZHOUMJ)
                {
                    if("huWord" in d && (d.huWord.indexOf("zimo") >= 0 || d.huWord.indexOf("gangkai") >= 0)){
                        playEffectInPlay("zimo");
                    }else{
                        handlewShandian();
                        playEffectInPlay("fangpao");
                    }

                }else { 
                    if("huWord" in d && d.huWord.indexOf("zimo") >= 0){
                        if(getCurrentVoiceType() == 0)//普通话
                            playEffectInPlay("zimo");
                        else if("soundType" in d)
                            playEffectInPlay(d.soundType);
                    }else{
                        handlewShandian();
                        if(getCurrentVoiceType() == 0)//普通话
                            playEffectInPlay("fangpao");
                        else if("soundType" in d)
                            playEffectInPlay(d.soundType);
                    }
                }
            }else if(MjClient.gameType == MjClient.GAME_TYPE.TONG_CHENG_GE_ZI_PAI) {
                playEffectInPlay(tData.putType == 1 ? 'zimo' : 'hu');
            }else if(MjClient.gameType == MjClient.GAME_TYPE.YONG_ZHOU_LAO_CHUO ){
                var url = "yongZhouLaoChuo/nan/hu";
                var pl = MjClient.data.sData.players[d.uid];
                playEffect(url, false, pl.info.sex);
                var UIoff =  getUiOffByUid(d.uid);
                playCardAni_Hu(UIoff);
            }
            else {
                if((MjClient.gameType == MjClient.GAME_TYPE.LV_LIANG_MA_JIANG
                    || MjClient.gameType == MjClient.GAME_TYPE.ZHUO_HAO_ZI) && pl.huWord == "jiaotingdianpao"){
                    playEffectInPlay("hu");
                }
                //自摸
                else if((tData.tState == TableState.waitPut && pl.mjState == TableState.waitPut ) || pl.huWord == "zimo")
                {
                    if(pl.huWord == "wangchuang"){
                        playEffectInPlay("wangchuang");
                    }else if(pl.huWord == "wangdiao"){
                        playEffectInPlay("wangdiao");
                    }else{
                        playEffectInPlay("zimo");
                    }
                }
                else if(MjClient.gameType == MjClient.GAME_TYPE.FEN_XI_YING_KOU && pl.huWord == "gangshangkaihua")
                {
                    playEffectInPlay("gangshangkaihua");
                }
                else if(pl.huWord == "jiaotingdianpao")//晋中app叫听后点炮不算点炮
                {
                    playEffectInPlay("hu");
                }
                else if((MjClient.gameType == MjClient.GAME_TYPE.CHANG_DE_PAO_HU_ZI ||
                    MjClient.gameType == MjClient.GAME_TYPE.YUAN_LING_PAO_HU_ZI ||
                    MjClient.gameType == MjClient.GAME_TYPE.SHI_MEN_PAO_HU_ZI ||
                    MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_SHIWUHUXI ||
                        MjClient.gameType == MjClient.GAME_TYPE.HAN_SHOU_PAO_HU_ZI) && pl.huWord == "hu")//晋中app叫听后点炮不算点炮
                {
                    playEffectInPlay("hu");
                }
                else if (MjClient.gameType == MjClient.GAME_TYPE.CHAO_GU_MJ ||
                    MjClient.gameType == MjClient.GAME_TYPE.XU_PU_PAO_HU_ZI) 
                {
                    if ("huWord" in d) 
                    {
                        playEffectInPlay(d.huWord);
                    }
                    else
                    {
                        playEffectInPlay("hu");
                    }
                }
                else
                {
                    var addDianpaoAni = function(){
                        var paoNode = MjClient.lastCardposNode;//新增地点炮动画
                        if (cc.sys.isObjectValid(paoNode)) {
                            paoNode.setVisible(true);
                            cc.log(" ===========paoNode======== x: "+ paoNode.x + " -----y:"+ paoNode.y);
                            var projNode2 = createSpine("spine/dianpao/skeleton.json", "spine/dianpao/skeleton.atlas");
                            projNode2.setAnimation(0, 'idle', false);
                            projNode2.setPosition(50,100);
                            projNode2.setTimeScale(0.35);
                            projNode2.setScale(1.5);
                            paoNode.addChild(projNode2,999999);
                        } else {
                            cc.log('error  MjClient.lastCardposNode 非法对象')
                        }
                    };
                    if (MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ) {
                        MjClient.playui.scheduleOnce(function(){ // 延时0.1秒执行，保证 lastCardposNode 是最后胡的那张牌
                            addDianpaoAni();
                        }, 0.1);
                    }
                    else {
                        addDianpaoAni();
                    }
                    playEffectInPlay("fangpao");
                }
            }
        }
        //else
        //{
        //    playEffectInPlay("hu");
        //}

        if(MjClient.gameType === MjClient.GAME_TYPE.XU_PU_LAO_PAI){
            if(d.huWord){
                if(d.huWord === "dianpao"){
                    playEffectInPlay("jiepao");
                }

                if(d.huWord === "zimo"){
                    playEffectInPlay("zimo");
                }
            }
        }



        //if (d.uid == SelfUid())
        {
            var sData = MjClient.data.sData;
            if (!sData) return;
            var pl = sData.players[d.uid];
            pl.mjState = TableState.roundFinish;
        }

        COMMON_UI.clearShowCurrentEatCards();


        // 南通app和大宁摔金，不加胡牌倒牌效果
        if (MjClient.rePlayVideo === -1 && d.mjhand)
        {
            // 血流成河麻将如果还有剩余牌，状态不能改为roundFinish，不能倒牌
            if (MjClient.gameType === MjClient.GAME_TYPE.YI_CHANG_XUE_LIU_MJ) {
                if(MjClient.majiang.getAllCardsTotal() - tData.cardNext > 0) {
                    return;
                }
            }

            if (MjClient.playui.showMjhandBeforeEndOne) {
                //用于新版倒牌
                if(MjClient.playui.isZiMo && MjClient.playui.isZiMo(d.huWord)){
                    pl.isZiMo = true;
                }else{
                    pl.isZiMo = false;
                }
                var uidIndex = tData.uids.indexOf(d.uid);
                MjClient.data.sData.tData.tState = TableState.roundFinish;
                pl.mjhand = d.mjhand;
                var huPlayerNodeName = MjClient.playui.getNodeNameByIndex(uidIndex);
                MjClient.playui.showMjhandBeforeEndOne(huPlayerNodeName);
            } else if (MjClient.getAppType() !== MjClient.APP_TYPE.QXNTQP &&
                MjClient.GAME_TYPE.DA_NING_SHUAI_JIN !== MjClient.gameType &&
                MjClient.GAME_TYPE.XU_PU_LAO_PAI !== MjClient.gameType) {
                var off = getUiOffByUid(d.uid);
                var pl = sData.players[d.uid];
                pl.mjhand = d.mjhand;
                COMMON_UI.showMjhandBeforeEndOnePlayer(off);
            }
        }

        // 下面的判断是永州地区用于清掉Flag的，如果别的地区有需要，在增加app判断
        var isYongZhouApp = (MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP ||
            MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ ||
            MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP  ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ ||
            MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP)


        if ( isYongZhouApp && MjClient.gameType != MjClient.GAME_TYPE.SHAO_YANG_MA_JIANG
            && MjClient.gameType != MjClient.GAME_TYPE.LEI_YANG_GMJ
            && MjClient.gameType != MjClient.GAME_TYPE.TY_HONGZHONG
            && MjClient.gameType != MjClient.GAME_TYPE.XIANG_XIANG_HONG_ZHONG
            && MjClient.gameType != MjClient.GAME_TYPE.HUAI_HUA_MA_JIANG
            && MjClient.gameType != MjClient.GAME_TYPE.CHANG_SHA
            && MjClient.gameType != MjClient.GAME_TYPE.AN_HUA_MA_JIANG) {
            // 有人胡牌eatFlag置0（耒阳字牌添加）
            var sData = MjClient.data.sData;
            if (!sData) return;
            for (var uid in sData.players) {
                sData.players[uid].eatFlag = 0;
                sData.players[uid].wangType = 0;
                sData.players[uid].wangStatus = false;
            }
        }

        if(MjClient.gameType == MjClient.GAME_TYPE.XIANG_XI_2710){
            for (var uid in sData.players) {
                sData.players[uid].fallArea = -1;
            }
        }

        if(MjClient.gameType == MjClient.GAME_TYPE.SHI_SHOU_AI_HUANG && d.canKaHuPlayer != null){
            var kaHuPlayerUid = d.canKaHuPlayer;
            var kaHuPlayer = sData.players[kaHuPlayerUid];
            kaHuPlayer.eatFlag = 8;
            kaHuPlayer.mjState = TableState.waitEat;
            tData.tState = TableState.waitEat;
        }
    }],
    MJMenHu: [0.5, function(d) {
        var sData = MjClient.data.sData;
        var tData = sData.tData;

        var pl = sData.players[d.uid];
        pl.menHuOfShow = d.menHuOfShow;
        pl.menFlag = 1;
        d.menHu && (pl.menHu = d.menHu);

        if (tData.tState == TableState.waitPut) {
            if (d.uid == SelfUid()) {
                pl.mjhand.pop();
            }
        // } else if (tData.tState == TableState.waitEat && pl.mjState == TableState.waitEat) { // 字段没同步#
        } else if (tData.tState == TableState.waitEat) { 
            var lastPutPlayer = sData.players[tData.uids[d.from]];
            lastPutPlayer.mjput.pop();
        }

        for (var uid in sData.players) {
            var p = sData.players[uid];
            p.eatFlag = 0;
            p.mjState = TableState.waitCard;
        }
    }],
    WaitSelect:[0, function (d) {
        var sData = MjClient.data.sData;
        if (!sData) return;
        if ("tData" in d) 
        {
            sData.tData = d.tData;
        }
        if (d.info) 
        {
            for (var i in d.info) {
                var pl_now = sData.players[d.info[i].uid];
                pl_now.tingFinish = d.info[i].tingFinish;
            }
        }
    }],

    takecards:[0, function (d) {
        var sData = MjClient.data.sData;
        if (!sData) return;
        var pl = sData.players[SelfUid()];
        if ("addScoreCards" in d) 
        {
            pl.addScoreCards = d.addScoreCards;
        }
        if ("mjState" in d) 
        {
            pl.mjState = d.mjState;
        }
        if ("needTing" in d) 
        {
            pl.needTing = d.needTing;
        }
        if ("tingCard" in d) 
        {
            pl.tingCard = d.tingCard;
        }
        if ("tingFinish" in d) 
        {
            var pl_now = sData.players[d.uid];
            pl_now.tingFinish = d.tingFinish;
        }

        if (MjClient.gameType == MjClient.GAME_TYPE.YUAN_JIANG_MJ ||
            MjClient.gameType == MjClient.GAME_TYPE.NAN_XIAN_MJ ||
            MjClient.gameType == MjClient.GAME_TYPE.XIANG_SHUI_MJ) 
        {
            if (d.needTings) {
                for(var uid in d.needTings) {
                    sData.players[uid].needTing = d.needTings[uid];
                }
            }
        }
    }],

    roundEnd: [0, function (d)//数据
    {
        //cc.log("结束数据", JSON.stringify(d));
        if (MjClient.gameType == MjClient.GAME_TYPE.TUAN_TUAN_ZHUAN
            || MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_NT
            || MjClient.gameType == MjClient.GAME_TYPE.HUAI_AN_DOU_DI_ZHU
            || MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_HA
            || MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_TY
            || MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_HBTY
            || MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_QC
        )
        {
            playMusic("guandan/bgFight_guandan");
        }
        else if(MjClient.gameType == MjClient.GAME_TYPE.XIANG_YIN_TUI_DAO_HU)
        {
            playMusic("bgFightXYTDH");
        }
        else if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_DE_KUAI || MjClient.gameType == MjClient.GAME_TYPE.YZ_PAO_DE_KUAI_TY ||
             MjClient.gameType == MjClient.GAME_TYPE.WU_XUE_GE_BAN ){
            playMusic("bgFight_paodekuai");
        }else if(MjClient.gameType == MjClient.GAME_TYPE.ML_HONG_ZI ||
                 MjClient.gameType == MjClient.GAME_TYPE.XIANG_YIN_ZHUO_HONG_ZI ||
            MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_WAI_HU_ZI ||
            MjClient.gameType == MjClient.GAME_TYPE.YI_YANG_WAI_HU_ZI ||
            MjClient.gameType == MjClient.GAME_TYPE.NAN_XIAN_GUI_HU_ZI || MjClient.gameType == MjClient.GAME_TYPE.YUAN_JIANG_GUI_HU_ZI){
            playMusic("bgHongZi");
        } else if(MjClient.gameType == MjClient.GAME_TYPE.XIN_SI_YANG){
            playMusic("bgFight_xinsiyang");
        }else if (MjClient.gameType != MjClient.GAME_TYPE.NIU_NIU &&
            MjClient.getAppType() != MjClient.APP_TYPE.QXTHMJ &&
            MjClient.getAppType() != MjClient.APP_TYPE.HUNANWANGWANG &&
            MjClient.getAppType() != MjClient.APP_TYPE.QXSYDTZ)
        {
            playMusic("bgFight");
        }

        var sData = MjClient.data.sData;
        if (!sData) return;
        sData.tData = d.tData;
        //cc.log('========================xxxxxxxxxxxxxx:'+JSON.stringify(sData.tData))
        sData.serverTime = d.serverTime;

        if(!sData.serverTime)
        {
            sData.serverTime = new Date().getTime();
        }


        MjClient.roundEndTime = d.roundEndTime;
        MjClient.isDismiss = d.isDismiss;


        //GLog("==========麻将===========sData.serverNow = " + sData.serverNow);
        for (var uid in d.players) {
            var pl = d.players[uid];
            var plLocal = sData.players[uid];
            pl.skipHu = false;
            pl.isQiHu = false;
            pl.skipPeng = [];
            pl.tingLists = {};
            pl.isZiMoHu = false;
            // pl.score_draw = 0;
            pl.picture = -1;
            pl.mjState = TableState.roundFinish;
            if (!pl.onLine)
            {
                if(pl.lastOffLineTime) pl.offLineTime = pl.lastOffLineTime;//new Date().getTime();
            }
            else {
                delete pl.offLineTime;
            };

            if ("countHu" in d) 
            {
                pl.countHu = d.countHu;
            }

            for (var pty in pl)  plLocal[pty] = pl[pty];

            //宁乡开王麻将胡牌可以是两张
            if(pl.huGangCards){
                sData.players[uid].huGangCards = pl.huGangCards;
            }

            //一痞二癞封顶
            sData.players[uid].isFengDing = pl.isFengDing;
            //蕲春广东麻将跟庄分
            pl.genZhuangScore = 0;
        }

        if (d.cards) { // 耒阳 衡阳字牌
            sData.cards = d.cards;
        }
        MjClient.preZhuang = sData.tData.zhuang;
        if (sData.tData.winner >= 0) {
            if (sData.tData.winner == sData.tData.zhuang) {
                sData.players[sData.tData.uids[sData.tData.zhuang] + ""].linkZhuang += 1;

            } else if(sData.tData.zhuang >= 0 ){
                sData.players[sData.tData.uids[sData.tData.zhuang] + ""].linkZhuang = 0;
                sData.players[sData.tData.uids[sData.tData.winner] + ""].linkZhuang = 0;
                // if(sData.tData.gameType == MjClient.GAME_TYPE.SHEN_YANG)
                // {
                //  sData.tData.zhuang = sData.tData.winner;
                // }

            }
        } else if (sData.tData.zhuang >= 0) {
            cc.log("sData in  the roundEnd -----",JSON.stringify(sData));
            cc.log("sData.tData.zhuang----",sData.tData.zhuang);
            cc.log("sData.tData------",JSON.stringify(sData.tData));
            cc.log("uids players------------",sData.tData.uids[0] + "");
            sData.players[sData.tData.uids[sData.tData.zhuang] + ""].linkZhuang += 1;
        }
        if (d.playInfo && MjClient.data.playLog) {
            MjClient.data.playLog.logs.push(d.playInfo);
        }
        if( d.Qiang ){
            sData.tData.Qiang = d.Qiang;
        }
        if(d.cards){
            sData.cards = d.cards;
        }
        if(d.allSelect){
            sData.tData.allSelect = d.allSelect;
        }
        if(d.teams) {
            sData.teams = d.teams;
            if (MjClient.gameType === MjClient.GAME_TYPE.DA_TONG_ZI_SHAO_YANG || 
                MjClient.gameType === MjClient.GAME_TYPE.LONG_HUI_BA_ZHA_DAN ||
                MjClient.gameType === MjClient.GAME_TYPE.BAN_BIAN_TIAN_ZHA) {
                for (var tid in sData.teams) {
                    var team = sData.teams[tid];
                    team.score_draw = 0;
                }
            }
        }

        if(cc.sys.isObjectValid(MjClient.userInfoLayerUi))
        {
            MjClient.userInfoLayerUi.removeFromParent(true);
            delete MjClient.userInfoLayerUi;
        }

        if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_PENG_HU){
            for (var uid in sData.players) {
                var pl = sData.players[uid];
                pl.linkZhuang = d.players[uid].linkZhuang;
            }
        }

        if(MjClient.gameType === MjClient.GAME_TYPE.YI_CHANG_XUE_LIU_MJ) {
            var tData = MjClient.data.sData.tData;
            if(d.chaHuazhuData) {
                tData.chaHuazhuData = d.chaHuazhuData;
            }
            if(d.chaDajiaoData) {
                tData.chaDajiaoData = d.chaDajiaoData;
            }
            if(d.isChaHuaZhu && d.isChaDaJiao) {
                tData.isChaHuaZhu = d.isChaHuaZhu;
                tData.isChaDaJiao = d.isChaDaJiao;
            }
        }

        if (sData.tData.roundNum <= 0){
            //房间解散
            //清空缓冲池
            CommonPool.drainAllPools();
            //关闭聊天界面
            if(cc.sys.isObjectValid(MjClient.playerChatLayer)){
                MjClient.playerChatLayer.removeFromParent(true);
                delete MjClient.playerChatLayer;
                MjClient.playerChatLayer = null;
            }
        }

        //处理金币场连胜
        if (sData.tData.fieldId){
            var selfPl = getUIPlayer(0);
            var preWinTimes = util.localStorageEncrypt.getNumberItem("GOLD_FIELD_WIN_TIMES",0);
            util.localStorageEncrypt.setNumberItem("GOLD_FIELD_PRE_WIN_TIMES",preWinTimes);
            if(selfPl.winone < 0){
                util.localStorageEncrypt.setNumberItem("GOLD_FIELD_WIN_TIMES",0)
            }else{
                util.localStorageEncrypt.setNumberItem("GOLD_FIELD_WIN_TIMES",(preWinTimes+1));
            }
        }

        if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_DA_ZHA_DAN){
            sData.tData.score_draw = 0;
        }
        
        //王钓麻将小结算清除上局价值信息
        if(MjClient.gameType == MjClient.GAME_TYPE.WANG_DIAO_MA_JIANG){
            for(var uid in MjClient.data.sData.players){
                var currPlayer = MjClient.data.sData.players[uid];
                currPlayer.jiazhuNum = -1;
            }
        }

        //加时触发时的玩家提示
        doJiaShiActivityAfterRoundEnd();
    }],
    endRoom: [0, function (d) {
        //清空缓冲池
        CommonPool.drainAllPools();

        MjClient.endRoomMsg = d;

        //cc.log("endRoom--------------------------" + JSON.stringify(d));
        if (d.playInfo && MjClient.data.playLog) {
            MjClient.data.playLog.logs.push(d.playInfo);
        }

        if (d.winalls) {//郴州字牌、衡阳地区字牌 大结算翻倍
            for (var uid in d.winalls) {
                MjClient.data.sData.players[uid].winall = d.winalls[uid];
            }
        }
        if (d.winall2s) {//郴州字牌、衡阳地区字牌 大结算翻倍
            for (var uid in d.winall2s) {
                MjClient.data.sData.players[uid].winall2 = d.winall2s[uid];
            }
        }

        if (d.fenshus) { // 衡阳放炮罚 小结算阶段解散同步fenshu字段（低分翻倍）
            for (var uid in d.fenshus) {
                MjClient.data.sData.players[uid].fenshu = d.fenshus[uid];
            }
        }

        if (d.winScores) { // 邵阳剥皮 小结算阶段解散同步winScore字段（低分翻倍）
            for (var uid in d.winScores) {
                MjClient.data.sData.players[uid].winScore = d.winScores[uid];
            }
        }
        if (d.winScore2s) { // 邵阳剥皮 小结算阶段解散同步winScore2字段（低分翻倍）
            for (var uid in d.winScore2s) {
                MjClient.data.sData.players[uid].winScore2 = d.winScore2s[uid];
            }
        }

        //分数是否翻倍标志
        if(d.isFanBei){
            MjClient.data.sData.tData.isFanBei = d.isFanBei;
        }
        
        // 跑得快大结算翻倍更新winall
        if (d.players && MjClient.data.sData) {
            var sData = MjClient.data.sData;
            for (var uid in d.players) {
                var pl = d.players[uid];
                var plLocal = sData.players[uid];
                
                for (var pty in pl)  
                    plLocal[pty] = pl[pty];

                //离线
                MjClient.data.sData.serverTime = d.serverTime;
                if(pl.lastOffLineTime) pl.offLineTime = pl.lastOffLineTime;//new Date().getTime();
            }
        }
        
        if(d.playInfo && d.playInfo.now){
            MjClient.roundEndTime = d.playInfo.now;
        }

        if(d.reason == 6){
            //比赛场触发分数过低，自动解散房间
            var tData = MjClient.data.sData.tData;
            var namesStr = "";
            for(var key in tData.matchScoreLimitUser){
                namesStr += unescape(tData.matchScoreLimitUser[key].nickname) +"、";
            }
            if(namesStr.length > 0){
                namesStr = namesStr.substring(0,namesStr.length-1);
            }
            MjClient.showMsg(namesStr+"参赛积分小于房间解散分数，房间自动解散", function() {
                
            });
        }


    }]
    ,
    onlinePlayer: [0, function (d) {
        cc.log("-------online Player NetCallBack------"+JSON.stringify(d));
        var sData = MjClient.data.sData;
        if (sData&&sData.players[d.uid]) {

            if (sData.players[d.uid].onLine == true && d.onLine == false)
            {
                sData.players[d.uid].offLineTime = new Date().getTime();
            }
            else if (d.onLine == true)
            {
                delete sData.players[d.uid].offLineTime;
            }


            sData.players[d.uid].onLine = d.onLine;
            sData.players[d.uid].mjState = d.mjState;
        }


    }]
    , MJTick: [0, function (msg) {
        var sData = MjClient.data.sData;
        MjClient.lastMJTick = Date.now();
        if (sData) {
            var tickStr = "";
            for (var uid in msg.players) {
                var pl = msg.players[uid];
                tickStr += pl.tickType + "|";
                var PL = sData.players[uid];
                if (PL) {

                    if (pl.tickType < 0 || pl.mjTickAt + 10000 < msg.serverNow) {
                        if (PL.onLine)
                        {
                            if(!PL.offLineTime) PL.offLineTime = new Date().getTime();
                        }
                        PL.onLine = false;
                    }
                    else {
                        PL.onLine = true;
                        delete PL.offLineTime;
                    }
                }
            }
        }
    }]
    , playerStatusChange : [0, function (msg) {

        var sData = MjClient.data.sData;
        MjClient.lastMJTick = Date.now();
        if (sData) {
            for (var uid in sData.players) {
                var pl = sData.players[uid];

                if(msg.uids.indexOf(uid) >= 0)
                {
                    if (pl.onLine) //如果当前是在线
                    {
                        if(!msg.status && msg.uids.indexOf(uid) >= 0) //改为离线状态时
                        {
                            if(!pl.offLineTime) pl.offLineTime = new Date().getTime();
                        }
                    }

                    pl.onLine = msg.status;
                    if(pl.onLine)
                    {
                        delete pl.offLineTime;
                    }
                }
            }
        }
    }]
    , DelRoom: [0, function (dr) {
        if (dr.code && dr.code == -1) {
            if (dr.message)
                MjClient.showToast(dr.message);
            return;
        }

        var sData = MjClient.data.sData;
        if (!sData) return;
        sData.tData = dr.tData;
        var tData = sData.tData;
        for (var uid in dr.players) {
            var pl = dr.players[uid];
            sData.players[uid].delRoom = pl.delRoom;
        }
        if (dr.nouid.length >= 1) {
            MjClient.showMsg("玩家 " + GetNameByUid(dr.nouid) + " 不同意解散房间");
        }
    }]
    , DelRoomHePai: [0, function (dr) {
        var sData = MjClient.data.sData;
        if (!sData) return;
        sData.tData = dr.tData;
        var tData = sData.tData;
        for (var uid in dr.players) {
            var pl = dr.players[uid];
            sData.players[uid].delRoomHePai = pl.delRoomHePai;
        }
        if (dr.nouid.length >= 1) {
            MjClient.showMsg("玩家 " + GetNameByUid(dr.nouid) + " 不同意和牌");
        }
    }]
    , loadOther : [0, function (dr) {
        if(dr.uids != undefined)
        {
            for (var i = 0; i < dr.uids.length; i++)
            {
                var uid = dr.uids[i];
                if(uid == SelfUid())
                {
                   

                    //if(MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ)
                    //if(MjClient.gameType == MjClient.GAME_TYPE.LIAN_YUN_GANG)
                    if(MjClient.playui.jsBind.node_eat)
                        return; // 新版麻将不再这里处理
                    MjClient.showToast("等待其他玩家操作!");
                    var eat = MjClient.playui.jsBind.eat;
                    if (!eat.hu._node.visible)
                    {
                        eat.chi0._node.visible = false;
                        eat.chi1._node.visible = false;
                        eat.chi2._node.visible = false;
                        eat.peng._node.visible = false;
                        eat.gang0._node.visible = false;
                        eat.gang1._node.visible = false;
                        eat.gang2._node.visible = false;
                        eat.guo._node.visible = false;
                        eat.changeui.changeuibg._node.visible = false;
                        COMMON_UI.clearShowCurrentEatCards();
                        //eat.changeui_xuanfenggang._node.visible = false;
                        if (MjClient.gameType === MjClient.GAME_TYPE.HUAI_HUA_MA_JIANG) {
                            eat.touzi._node.visible = false;
                        }
                    }
                }
            }
        }

    }]
    , chiCount : [0, function (dr) {
        var pl;
        var sData = MjClient.data.sData;
        if (!sData) return;
        if(dr.cUid)
        {
            pl = sData.players[dr.cUid];
            if(dr.count == 2)
            {
                MjClient.showToast("你已经被" + unescape(pl.info.nickname) + "吃2次了");
            }
            else if(dr.count == 3)
            {
                MjClient.showToast("你已经被" + unescape(pl.info.nickname) + "吃3次，绑定三口关系");
            }
        }
        else if(dr.zUid) {
            pl = sData.players[dr.zUid];
            if(dr.count == 2)
            {
                MjClient.showToast("你已经吃了" + unescape(pl.info.nickname) + "2次了");
            }
            else if(dr.count == 3)
            {
                MjClient.showToast("你已经吃了" + unescape(pl.info.nickname) + "3次，绑定三口关系");
            }
        }


    }]
    , initAllHandcards : [0, function (d) {
        cc.log("MjClient.data.sData = "+ JSON.stringify(MjClient.data));
        if(!MjClient.data.sData) return;

        for(var uid in d) {
            var pl = MjClient.data.sData.players[uid];
            pl.mjhand = d[uid].mjhand;
            pl.dirNumber = d[uid].dirNumber;
            cc.log("_________________initAllHandcards_______________"+JSON.stringify(pl.mjhand));
        }
    }]
    , otherNewCard : [0, function (d) {
        if(!MjClient.data.sData) return;
        var pl = MjClient.data.sData.players[d.uid];
        if (pl && pl.mjhand) {
            pl.mjhand.push(d.newCard);
        }
        else {
            cc.log("otherNewCard数据错误", uid, pl && pl.mjhand);
        }
    }]
    , rechargeResult : [0, function (d) {//后端支付完成的回调
        MjClient.getRechargeLadder();
        if(d.message)
        {
            MjClient.showToast(d.message);
        }
        if (MjClient.homeui && MjClient.systemConfig.rankEnable == "true")
        {
            MjClient.homeui.gameRankLayer();
        }
    }]
    ,rematch:[0, function (msg) {
        cc.log("----------rematch-----------------"+JSON.stringify(msg));
        if (msg.code == 0 && msg.data && msg.data.vipTable && !MjClient.data.inviteVipTable)
        {
            if(MjClient.rePlayVideo !== -1) return; //回放不弹再来一局
            MjClient.data.inviteVipTable = msg.data.vipTable;
            MjClient.showMsg("["+ unescape(msg.data.owner.nickname) +"]邀请你再战一局，是否继续？", function () {
                MjClient.leaveGame(function()
                {
                    MjClient.joinGame(msg.data.vipTable);
                });
            }, function(){}, "1", MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP ? "nantongAgain" : "");
        }
    }],
    MJZhiTouZi:[2, function(d){
        var sData = MjClient.data.sData;
        if (!sData) return;
        var pl = sData.players[d.uid + ""];
        pl.eatFlag = 0;
        pl.mjState = TableState.waitCard;
        pl.touzi = false;
        pl.touziCount = pl.touziCount || 0;
        pl.touziCount++;
        pl.isTing = true;

        if (d.huEatFlag) 
        {
            if(cc.isNumber(d.huEatFlag))
            {
                pl.eatFlag = d.huEatFlag;
            }
            else if(typeof(d.huEatFlag) === "object")
            {
                for (var uid in sData.players) {
                    sData.players[uid].eatFlag = d.huEatFlag[uid];
                    sData.players[uid].mjState = TableState.waitEat;
                }
            }
           
            pl.isNew = true;
            pl.mjState = TableState.waitPut;
            sData.tData.tState = TableState.waitPut;
            sData.tData.addnewcard = d.addnewcard;
        }

        if(d.addnewcard){
            sData.tData.gangAddCard = d.addnewcard;
        }

        if(d.cardNext){
            sData.tData.cardNext = d.cardNext;
        }

        if(MjClient.gameType === MjClient.GAME_TYPE.NING_XIANG_KAI_WANG){
            sData.tData.firstCard = false;
        }

        if(MjClient.gameType === MjClient.GAME_TYPE.HUAI_HUA_MA_JIANG || MjClient.gameType === MjClient.GAME_TYPE.JING_ZHOU_MA_JIANG){
            sData.tData.touingUid = d.uid;
        }
    }],
    HZNewCard: [0.8, function(d) { //跑胡子发牌
        //cc.log("进牌...", JSON.stringify(d));
        var sData = MjClient.data.sData;
        if (!sData) return;
        sData.tData = d.tData;

        var eatFlags = d.eatFlags;
        for (var uid in sData.players) {
            sData.players[uid].eatFlag = eatFlags[uid];
        }

        var pl = sData.players[d.uid + ""];
        pl.isNew = true;
        pl.isQiHu = d.isQiHu;
        pl.isFirstDraw = d.isFirstDraw;
        pl.mjHide = d.mjHide;
        if (!d.isCommon) {
            pl.mjState = d.tData.tState;
        } else if (eatFlags[pl.uid] != 0) {
            pl.mjState = TableState.waitEat;
        } else {
            pl.mjState = TableState.waitCard;
        }
        if (pl.isQiHu) {
            pl.mjState = TableState.waitCard;
        }
        if (d.newCard) {
            var isShow = true;
            if (d.tData.gameType == MjClient.GAME_TYPE.LUO_DI_SAO ||
                d.tData.gameType == MjClient.GAME_TYPE.PAO_HU_ZI ||
                d.tData.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_King ||
                d.tData.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_SR ||
                d.tData.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_SR_King ||
                d.tData.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_ER ||
                d.tData.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_LR_King
            ) { // 永州地区字牌偎 提不读牌
                for (var uid in eatFlags) {
                    var eatFlag = eatFlags[uid];
                    if ((eatFlag & 8) || (eatFlag & 16)) {
                        isShow = false;
                    }
                }
            }

            if (sData.tData.isLastDraw && d.uid != SelfUid()) {
                isShow = false;
                //亮张可见
                if (MjClient.gameType == MjClient.GAME_TYPE.YI_YANG_WAI_HU_ZI ||
                    MjClient.gameType == MjClient.GAME_TYPE.AN_HUA_PAO_HU_ZI ||
                    MjClient.gameType == MjClient.GAME_TYPE.CHEN_ZHOU_ZI_PAI ||
                    MjClient.gameType == MjClient.GAME_TYPE.GUI_YANG_ZI_PAI ||
                    MjClient.gameType == MjClient.GAME_TYPE.NING_XIANG_PAO_HU_ZI ||
                    MjClient.gameType == MjClient.GAME_TYPE.CHEN_ZHOU_MAO_HU_ZI  ||
                    MjClient.gameType == MjClient.GAME_TYPE.CHANG_DE_PAO_HU_ZI  ||
                    MjClient.gameType == MjClient.GAME_TYPE.YUAN_LING_PAO_HU_ZI  ||
                    MjClient.gameType == MjClient.GAME_TYPE.SHI_MEN_PAO_HU_ZI ||
                    MjClient.gameType == MjClient.GAME_TYPE.XIANG_XI_2710  ||
                    MjClient.gameType == MjClient.GAME_TYPE.HAN_SHOU_PAO_HU_ZI ||
                    MjClient.gameType == MjClient.GAME_TYPE.XIANG_XI_96POKER){
                    isShow = true;
                }
            }

            // todo 湘潭跑胡子 暗偎选项 
            if(d.tData.gameType == MjClient.GAME_TYPE.XIANG_TAN_PAO_HU_ZI){
                if(eatFlags[pl.info.uid] & 8){
                    if(d.tData.areaSelectMode.mingwei || (d.tData.areaSelectMode.isShowChouWei && (d.skipPeng && d.skipPeng.indexOf(d.newCard) >= 0))){

                    }else{
                        isShow = false;
                    }
                }

                if(eatFlags[pl.info.uid] & 16){
                    if(d.tData.areaSelectMode.mingwei){

                    }else{
                        isShow = false;
                    }
                }
            }

            // todo 怀化红拐弯也有暗偎但不是选项
            if(d.tData.gameType == MjClient.GAME_TYPE.HUAI_HUA_HONG_GUAI_WAN){
                if(eatFlags[pl.info.uid] & 8){
                    if(d.skipPeng && d.skipPeng.indexOf(d.newCard) >= 0){

                    }else{
                        isShow = false;
                    }
                }
            }

            //福禄寿只有自己能看到,//按照产品要求，福禄寿去掉进牌声音
            if (MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_FU_LU_SHOU || MjClient.gameType == MjClient.GAME_TYPE.FU_LU_SHOU_ER_SHI_ZHANG) {
                isShow = false;//d.uid == SelfUid() ? true : false;
                pl.newSendCard = d.newCard;
            }

            // 十胡倒提牌后补牌，要求自己有声音
            if (d.tData.gameType == MjClient.GAME_TYPE.LENG_SHUI_JIANG_SHI_HU_DAO && d.isDrawCard && (SelfUid() != d.uid)) {
                isShow = false;
            }

            if (d.tData.gameType == MjClient.GAME_TYPE.YY_AN_HUA_PAO_HU_ZI ||
                d.tData.gameType == MjClient.GAME_TYPE.CHEN_ZHOU_ZI_PAI ||
                d.tData.gameType == MjClient.GAME_TYPE.GUI_YANG_ZI_PAI ||
                d.tData.gameType == MjClient.GAME_TYPE.NING_XIANG_PAO_HU_ZI ||
                d.tData.gameType == MjClient.GAME_TYPE.CHEN_ZHOU_MAO_HU_ZI  ||
                d.tData.gameType == MjClient.GAME_TYPE.CHANG_DE_PAO_HU_ZI  ||
                d.tData.gameType == MjClient.GAME_TYPE.YUAN_LING_PAO_HU_ZI  ||
                d.tData.gameType == MjClient.GAME_TYPE.SHI_MEN_PAO_HU_ZI  ||
                d.tData.gameType == MjClient.GAME_TYPE.NAN_XIAN_GUI_HU_ZI  ||
                d.tData.gameType == MjClient.GAME_TYPE.YUAN_JIANG_GUI_HU_ZI  ||
                d.tData.gameType == MjClient.GAME_TYPE.XIANG_XI_2710 ||
                d.tData.gameType == MjClient.GAME_TYPE.HAN_SHOU_PAO_HU_ZI ||
                d.tData.gameType == MjClient.GAME_TYPE.AN_HUA_PAO_HU_ZI){
                if ((d.isDrawCard || d.mjHide.indexOf(d.newCard) >= 0) && SelfUid() != d.uid){
                    isShow = false;
                }
            }

            if ((d.tData.gameType == MjClient.GAME_TYPE.YUE_YANG_PENG_HU || 
                d.tData.gameType == MjClient.GAME_TYPE.HY_LIU_HU_QIANG) && MjClient.rePlayVideo == -1){
                if ((pl.eatFlag & 8) && d.uid != SelfUid() && pl.mjHide.indexOf(d.newCard) >= 0){
                    isShow = false;
                }
            }

            if (isShow) {
                //新版在play里面播放
                if (MjClient.playui && MjClient.playui.checkDelayNewCard) {
                }else{
                    playEffectInPlay(d.newCard);
                }
                
            }

            if (d.uid == SelfUid() && !d.isCommon) {
                pl.mjhand.push(d.newCard);
            }

            if (d.isCommon) {
                pl.mjput.push(d.newCard);
            }

            if(MjClient.getAppType() != MjClient.APP_TYPE.QXYZQP &&
                MjClient.getAppType() != MjClient.APP_TYPE.QXXXGHZ &&
                MjClient.getAppType() != MjClient.APP_TYPE.QXSYDTZ &&
                MjClient.getAppType() != MjClient.APP_TYPE.HUNANWANGWANG &&
                MjClient.getAppType() != MjClient.APP_TYPE.BDHYZP &&
                MjClient.getAppType() != MjClient.APP_TYPE.QXLYQP)
            {
                if (MjClient.gameType != MjClient.GAME_TYPE.YUE_YANG_FU_LU_SHOU
                    && MjClient.gameType != MjClient.GAME_TYPE.LOU_DI_FANG_PAO_FA
                    && MjClient.gameType != MjClient.GAME_TYPE.XIANG_XIANG_PAO_HU_ZI
                    && MjClient.gameType != MjClient.GAME_TYPE.FU_LU_SHOU_ER_SHI_ZHANG
                    && MjClient.gameType != MjClient.GAME_TYPE.DANG_YANG_FAN_JING
                    && MjClient.gameType != MjClient.GAME_TYPE.YI_CHANG_SHANG_DA_REN 
                    && MjClient.gameType != MjClient.GAME_TYPE.HU_BEI_HUA_PAI
                    && MjClient.gameType != MjClient.GAME_TYPE.GONG_AN_HUA_PAI
                    && MjClient.gameType != MjClient.GAME_TYPE.TONG_CHENG_GE_ZI_PAI) {

                    if(!d.isCommon) pl.mjput.push(d.newCard);
                    
                    if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_WAI_HU_ZI || MjClient.gameType == MjClient.GAME_TYPE.YI_YANG_WAI_HU_ZI
                        || MjClient.gameType == MjClient.GAME_TYPE.NAN_XIAN_GUI_HU_ZI || MjClient.gameType == MjClient.GAME_TYPE.YUAN_JIANG_GUI_HU_ZI ||
                         MjClient.gameType == MjClient.GAME_TYPE.AN_XIANG_WEI_MA_QUE || MjClient.gameType == MjClient.GAME_TYPE.XIANG_XI_96POKER
                        || MjClient.gameType == MjClient.GAME_TYPE.EN_SHI_SHAO_HU){
                        pl.mjputType.push(1);
                        cc.log("HZNewCard mjputType", " pl = " + JSON.stringify(pl));
                    }
                }   
            }
        }
        if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_WAI_HU_ZI || MjClient.gameType == MjClient.GAME_TYPE.YI_YANG_WAI_HU_ZI
            || MjClient.gameType == MjClient.GAME_TYPE.NAN_XIAN_GUI_HU_ZI || MjClient.gameType == MjClient.GAME_TYPE.YUAN_JIANG_GUI_HU_ZI){
            for(var uid in d.giveupChis) {
                sData.players[uid].giveupChis = d.giveupChis[uid];
            }
            if(pl.eatFlag != 0){
                pl.mjState = TableState.waitEat;
                pl.liuCards = d.liuCards;

            }
            for(var uid in d.eatFlags) {
                if(d.eatFlags[uid] & 4){
                    sData.players[uid].piaoCards = d.piaoCards;
                }
                if(d.eatFlags[uid] & 64){
                    sData.players[uid].zhaCards = d.zhaCards;
                }
            }
        }

        if (MjClient.gameType == MjClient.GAME_TYPE.DANG_YANG_FAN_JING || 
            MjClient.gameType == MjClient.GAME_TYPE.YI_CHANG_SHANG_DA_REN ||
            MjClient.gameType == MjClient.GAME_TYPE.HU_BEI_HUA_PAI ||
            MjClient.gameType == MjClient.GAME_TYPE.GONG_AN_HUA_PAI ||
            MjClient.gameType == MjClient.GAME_TYPE.TONG_CHENG_GE_ZI_PAI) {
            for (var uid in d.liuCards) {
                sData.players[uid].liuCards = d.liuCards[uid]; //毛
            }
        }

        if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_PENG_HU){
            //报警标志
            for(var uid in d.alarmFlags) {
                sData.players[uid].alarmFlag = d.alarmFlags[uid];
            }
        }

        if(d.nextMsg && d.nextMsg.uid){
            var nextUid = d.nextMsg.uid;
            var nextPlayer = sData.players[nextUid + ""];
            nextPlayer.wangType = d.nextMsg.wangType;
        }

        if(MjClient.gameType == MjClient.GAME_TYPE.XIANG_XI_2710){
            for (var uid in sData.players) {
                if(sData.players[uid].fallArea == 1){
                    var lastNewCard = sData.players[uid].mjput.pop();
                    sData.players[uid].qiPai.push(lastNewCard);
                }
                sData.players[uid].fallArea = -1;

                // if (SelfUid() == uid) {
                //     sData.players[uid].skipArr = d.skipArr[uid];
                //     sData.players[uid].limitChiAndHuMatrix = d.limitChiAndHuMatrix[uid];
                // }
            }
            sData.players[d.uid + ""].fallArea = 1;
        }

        if(MjClient.gameType == MjClient.GAME_TYPE.XIANG_XI_96POKER) {
            if(d.renNums) {
                for(var uid in d.renNums) {
                    sData.players[uid].renNum = d.renNums[uid];
                }
            }
        }
    }],
    HZGangCard:[0.8,function (d) {
        cc.log("wxd...................HZGangCard:"+JSON.stringify(d));
        var sData = MjClient.data.sData;
        if (!sData) return;
        sData.tData = d.tData;
        var tData = sData.tData;
        var cpginfo = d.cpginfo;

        //96扑克杠牌特殊处理 走/开招/龙
        if(MjClient.gameType == MjClient.GAME_TYPE.XIANG_XI_96POKER) {
            var pl = sData.players[cpginfo.uid + ""];
            var fromPl = sData.players[tData.uids[d.from]];
            if(!pl || !fromPl) {
                return;
            }
            
            //因为96扑克的mjsort会一直变, 更新数据时先备份旧的mjsort, 刷UI时会用到
            pl.oldMjSort = pl.mjsort;
            pl.mjState = tData.tState;
            pl.mjsort = cpginfo.mjsort;
            pl.renNum = cpginfo.renNum;     //忍龙

            pl.mjgang0 = d.mjgang0;
            pl.mjgang1 = d.mjgang1;

            //清理手牌/桌面牌
            var mjhand = pl.mjhand;
            var mjput = fromPl.mjput;

            var delPutCards = function() {
                var cd = tData.lastPutCard;
                if(mjput.length > 0 && mjput[mjput.length - 1] == cd) {
                    mjput.length -= 1;
                    fromPl.mjputType.length -= 1;
                }
            }

            //半招变满招
            if(d.gang0Pos >= 0) {
                delPutCards();
            }else {
                var gangInfo = d.gangInfo;
                var ex = gangInfo.ex;

                var delHandCards = function(list) {
                    if(cpginfo.uid != SelfUid()) {
                        return;
                    }
                    for(var i = 0; i < list.length; i++) {
                        var cd = list[i];
                        var idx = mjhand.indexOf(cd);
                        if(idx >= 0) {
                            mjhand.splice(idx, 1);
                        }
                    }
                }

                if(d.isGangHand) {
                    //起手龙
                    delHandCards(gangInfo.gang);
                    if(ex && ex.length > 0) {
                        delHandCards(ex);
                    }        
                }else {                     //走/开招
                    //判断tiePos
                    if(gangInfo.tiePos >= 0) {
                        pl.mjtie.splice(gangInfo.tiePos, 1);
                    }else {
                        if(ex && ex.length > 0) {
                            delHandCards(ex);
                        }
                    }

                    //判断weiPos
                    if(gangInfo.weiPos >= 0) {
                        pl.mjwei.splice(gangInfo.weiPos, 1);
                    }else {
                        var list = gangInfo.gang.slice();
                        list.length -= 1;
                        delHandCards(list);
                    }

                    delPutCards();
                }
            }

            //eatflags
            var eatFlags = d.eatFlags;
            for(var uid in sData.players){
                if(eatFlags && eatFlags[uid]){
                    sData.players[uid].eatFlag = eatFlags[uid];
                }else{
                    sData.players[uid].eatFlag = 0;
                }
            }

            //播放音效
            if(d.gang0Pos >= 0) {
                playEffectInPlay("manzhao");
            }else {
                var gangInfo = d.gangInfo;
                var ex = gangInfo.ex;
                if(gangInfo.gang0Pos >= 0) {
                    var gang1 = pl.mjgang1[pl.mjgang1.length - 1];
                    if(MjClient.majiang.isShuangLongBaoZhu(sData, gang1)) {
                        playEffectInPlay("shuanglongxizhu");
                    }else {
                        playEffectInPlay("shuanglong"); 
                    }
                }else if(!ex || ex.length == 0) {
                    if(d.isGangHand) {
                        playEffectInPlay("long");
                    }else {
                        playEffectInPlay("zou");
                    }
                }else if(ex.length == 1) {
                    playEffectInPlay("banzhao");
                }else {
                    playEffectInPlay("manzhao");
                }
            }

            return;
        }

        var pl = sData.players[cpginfo.uid + ""];
        pl.mjState = tData.tState;
        pl.mjsort = cpginfo.mjsort;
        pl.isNew = false;
        pl.isQiHu = cpginfo.isQiHu;
        if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_PENG_HU){
            pl.pengOrPaoCardByPut = cpginfo.pengOrPaoCardByPut;
        }

        var eatFlags = d.eatFlags;
        for(var uid in sData.players){
            sData.players[uid].wangType = 0;
            sData.players[uid].wangStatus = false;
            if(eatFlags && eatFlags[uid]){
                sData.players[uid].eatFlag = eatFlags[uid];
            }else{
                sData.players[uid].eatFlag = 0;
            }
        }

        //溆浦跑胡子跑、提数据特殊处理
        if(MjClient.gameType == MjClient.GAME_TYPE.XU_PU_PAO_HU_ZI) {
            var paoTiNum = pl.mjgang0.length + pl.mjgang1.length;
            var cards = [];
            if (d.newCard > 300) {
                cards.push(d.newCard, d.newCard - 200, d.newCard - 200, d.newCard);
            } else {
                cards.push(d.newCard, d.newCard, d.newCard + 200, d.newCard + 200);
            }
            
            if(d.type == 2) {
                playEffectInPlay(paoTiNum > 0 ? "chongpao" : "pao");
                pl.mjgang0.push(d.newCard);   
                //跑牌
                var putCardPl = sData.players[tData.uids[d.from] + ""];
                if(putCardPl.mjput.length > 0 && putCardPl.mjput[putCardPl.mjput.length-1] == d.newCard){
                    putCardPl.mjput.length = putCardPl.mjput.length - 1;
                }

                var pos = d.pos;
                if(d.pos == 1){
                    if(cpginfo.uid == SelfUid()) {
                        cards.splice(cards.indexOf(d.newCard), 1);
                        pl.mjhand.splice(pl.mjhand.indexOf(cards[0]), 1);
                        pl.mjhand.splice(pl.mjhand.indexOf(cards[1]), 1);
                        pl.mjhand.splice(pl.mjhand.indexOf(cards[2]), 1);
                    }
                }
                else if(pos == 2) {
                    for (var i = 0; i < pl.mjwei.length; i++) {
                        if (pl.mjwei[i].indexOf(d.newCard) >= 0) {
                            pl.mjwei.splice(i, 1);
                            break;
                        }
                    }
                }else if(pos == 3) {
                    for (var i = 0; i < pl.mjpeng.length; i++) {
                        if (pl.mjpeng[i].indexOf(d.newCard) >= 0) {
                            pl.mjpeng.splice(i, 1);
                            break;
                        }
                    }
                }
            }
            else if(d.type == 1) {
                playEffectInPlay(paoTiNum > 0 ? "chongpao" : "ti");
                pl.mjgang1.push(d.newCard);
                var uid = cpginfo.uid;
                if(d.isGangHand) {
                    if(uid == SelfUid()) {
                        pl.mjhand.splice(pl.mjhand.indexOf(cards[0]),1);
                        pl.mjhand.splice(pl.mjhand.indexOf(cards[1]),1);
                        pl.mjhand.splice(pl.mjhand.indexOf(cards[2]),1);
                        pl.mjhand.splice(pl.mjhand.indexOf(cards[3]),1);
                    }                
                }else{ 
                    //提牌
                    pl.mjput.splice(pl.mjput.indexOf(d.newCard),1);
                    var fromWeiIdx = -1;
                    for (var i = 0; i < pl.mjwei.length; i++) {
                        if (pl.mjwei[i].indexOf(d.newCard) >= 0) {
                            fromWeiIdx = i;
                            break;
                        }
                    }
                    if(fromWeiIdx >= 0){
                        pl.mjwei.splice(fromWeiIdx, 1);
                    }else{
                        if(uid == SelfUid()) {
                            cards.splice(cards.indexOf(d.newCard), 1);
                            pl.mjhand.splice(pl.mjhand.indexOf(cards[0]), 1);
                            pl.mjhand.splice(pl.mjhand.indexOf(cards[1]), 1);
                            pl.mjhand.splice(pl.mjhand.indexOf(cards[2]), 1);
                        }
                    }
                }
            }
            return;
        }

        if(d.type == 2){
            if(MjClient.gameType == MjClient.GAME_TYPE.DA_YE_ZI_PAI){
                //todo 暂时没有声音资源
            }else {
                playEffectInPlay("pao");
            }
            
            pl.mjgang0.push(d.newCard);
            //跑牌
            var putCardPl = sData.players[tData.uids[d.from] + ""];
            if(putCardPl.mjput.length > 0 && putCardPl.mjput[putCardPl.mjput.length-1] == d.newCard && !(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_PENG_HU && tData.putType == 0)){
                putCardPl.mjput.length = putCardPl.mjput.length - 1;
            }

            var pos = d.pos;
            if(d.pos == 1){
                if(cpginfo.uid == SelfUid()){
                    pl.mjhand.splice(pl.mjhand.indexOf(d.newCard),1);
                    pl.mjhand.splice(pl.mjhand.indexOf(d.newCard),1);
                    pl.mjhand.splice(pl.mjhand.indexOf(d.newCard),1);
                }
            }
            else if(pos == 2){
                pl.mjwei.splice(pl.mjwei.indexOf(d.newCard),1);
            }else if(pos == 3){
                pl.mjpeng.splice(pl.mjpeng.indexOf(d.newCard),1);
            }
        }
        if(d.type == 1){
            if(d.isGangHand){
                var uid = cpginfo.uid;
                pl.mjgang1.push(d.newCard);
                if(uid == SelfUid()){
                    pl.mjhand.splice(pl.mjhand.indexOf(d.newCard),1);
                    pl.mjhand.splice(pl.mjhand.indexOf(d.newCard),1);
                    pl.mjhand.splice(pl.mjhand.indexOf(d.newCard),1);
                    pl.mjhand.splice(pl.mjhand.indexOf(d.newCard),1);
                }
                if(MjClient.GAME_TYPE.DA_YE_ZI_PAI != MjClient.gameType){
                    playEffectInPlay("ti");
                }
            }else{
                pl.wangType = 0;
                pl.wangStatus = false;
                if(MjClient.gameType == MjClient.GAME_TYPE.DA_YE_ZI_PAI){
                    //todo 暂时没有声音资源
                }else {
                    playEffectInPlay("ti");
                }
                
                pl.mjgang1.push(d.newCard);
                //提牌
                pl.mjput.splice(pl.mjput.indexOf(d.newCard),1);
                var uid = cpginfo.uid
                if(pl.mjwei.indexOf(d.newCard) >= 0){
                    pl.mjwei.splice(pl.mjwei.indexOf(d.newCard),1);
                }else{
                    if(uid == SelfUid()){
                        pl.mjhand.splice(pl.mjhand.indexOf(d.newCard),1);
                        pl.mjhand.splice(pl.mjhand.indexOf(d.newCard),1);
                        pl.mjhand.splice(pl.mjhand.indexOf(d.newCard),1);
                    }
                }
            }
        }

    }],
    HZLiuCard:[0,function (d) {
        cc.log("wxd...................HZLiuCard:"+JSON.stringify(d));
        var sData = MjClient.data.sData;
        if (!sData) return;
        sData.tData = d.tData;
        var tData = sData.tData;
        var cpginfo = d.cpginfo;
        var pl = sData.players[cpginfo.uid + ""];
        pl.mjState = tData.tState;
        pl.mjsort = cpginfo.mjsort;
        pl.isNew = false;
        pl.isQiHu = cpginfo.isQiHu;

        if (tData.isLastDraw && 
            (MjClient.gameType == MjClient.GAME_TYPE.DANG_YANG_FAN_JING ||
             MjClient.gameType == MjClient.GAME_TYPE.YI_CHANG_SHANG_DA_REN ||
             MjClient.gameType == MjClient.GAME_TYPE.HU_BEI_HUA_PAI ||
             MjClient.gameType == MjClient.GAME_TYPE.GONG_AN_HUA_PAI ||
             MjClient.gameType == MjClient.GAME_TYPE.TONG_CHENG_GE_ZI_PAI)) {
            //只清当前操作人的
            pl.eatFlag = 0;
            pl.liuCards = []; //先清理，如果还能溜，会在HZUpdateEatFlag消息中重置
        } else {
            for (var uid in sData.players) {
                sData.players[uid].eatFlag = 0;
            }
        }

        //湖北花牌杠牌特殊处理.音效TODO
        if (MjClient.gameType == MjClient.GAME_TYPE.HU_BEI_HUA_PAI ||
            MjClient.gameType == MjClient.GAME_TYPE.GONG_AN_HUA_PAI ||
            MjClient.gameType == MjClient.GAME_TYPE.TONG_CHENG_GE_ZI_PAI) {
            var lp = sData.players[tData.uids[d.from] + ""];
            var delHands = function(hand, arr) {
                for (var i = 0; i < arr.length; i++) {
                    var index = hand.indexOf(arr[i]);
                    if (index >= 0) {
                        hand.splice(index, 1);
                    }
                }
            }
            pl.mjgang0 = d.mjgang0;
            pl.mjgang1 = d.mjgang1;
            if (d.type == 0) {          //招
                lp.mjput.length -= 1;
                if (cpginfo.uid == SelfUid()) {
                    var arr = d.cards.slice();
                    var idx = arr.indexOf(tData.lastPutCard);
                    if (idx >= 0) {
                        arr.splice(idx, 1);
                    }
                    delHands(pl.mjhand, arr);
                }
                playEffectInPlay("zhao");
            } else if (d.type == 1) {   //贩 .如果是通城个子牌对应'滑'
                if (cpginfo.uid == SelfUid()) {
                    delHands(pl.mjhand, d.cards);
                }
                if (tData.putType == 0) {
                    //贩别人打出的牌
                    lp.mjput.length -= 1;
                }
                if (MjClient.gameType == MjClient.GAME_TYPE.TONG_CHENG_GE_ZI_PAI) {
                    playEffectInPlay("hua");
                } else {

                }
            } else if (d.type == 2) {   //扎4
                if (MjClient.gameType == MjClient.GAME_TYPE.TONG_CHENG_GE_ZI_PAI) {
                    playEffectInPlay("guan");
                }
            } else if (d.type == 3) {   //扎5
                //pl.mjgang1 = d.mjgang1;
            } else if (d.type == 4) {   //换扎.暂未做

            }
            return;
        }
        if(MjClient.gameType == MjClient.GAME_TYPE.EN_SHI_SHAO_HU){
            pl.mjgang0 = d.mjgang0;
            pl.mjgang1 = d.mjgang1;

            var cards = d.gangInfo.gang.concat(d.gangInfo.ex);
            if(cards.length > 4 && d.isDiToKua){
                cards.splice(cards.indexOf(tData.lastPutCard), 1);
            }
            var uid = cpginfo.uid;
            if(uid == SelfUid()){
                for(var i = 0; i < cards.length; i++){
                    var idx = pl.mjhand.indexOf(cards[i]);
                    if(idx >= 0){
                        pl.mjhand.splice(idx,1);
                    }
                }
            }
            if(d.canNotPutCard){
                pl.canNotPutCard = d.canNotPutCard;
            }
            var putCardPl = sData.players[tData.uids[d.from] + ""];
            if(putCardPl.mjput.length > 0 && !d.isBuKua){
                putCardPl.mjput.length = putCardPl.mjput.length - 1;
                putCardPl.mjputType.length = putCardPl.mjputType.length - 1;
            }
            return;
        }

        if(d.type == 2){
            if (MjClient.gameType == MjClient.GAME_TYPE.DANG_YANG_FAN_JING ||
                MjClient.gameType == MjClient.GAME_TYPE.YI_CHANG_SHANG_DA_REN) {
                playEffectInPlay("mao");
            } else {
                playEffectInPlay("piao");
            }
            pl.mjgang0.push(d.newCard);
            //跑牌
            var putCardPl = sData.players[tData.uids[d.from] + ""];
            if(putCardPl.mjput.length > 0 && putCardPl.mjput[putCardPl.mjput.length-1] == d.newCard){
                putCardPl.mjput.length = putCardPl.mjput.length - 1;
                if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_WAI_HU_ZI || MjClient.gameType == MjClient.GAME_TYPE.YI_YANG_WAI_HU_ZI
                    || MjClient.gameType == MjClient.GAME_TYPE.NAN_XIAN_GUI_HU_ZI || MjClient.gameType == MjClient.GAME_TYPE.YUAN_JIANG_GUI_HU_ZI){
                    putCardPl.mjputType.length = putCardPl.mjputType.length - 1;
                    cc.log("HZLiuCard mjputType", " putCardPl = " + JSON.stringify(putCardPl));
                }
            }
            var uid = tData.uids[tData.curPlayer];
            if(uid == SelfUid()){
                while(pl.mjhand.indexOf(d.newCard) >= 0){
                    pl.mjhand.splice(pl.mjhand.indexOf(d.newCard),1);
                }
            }
            while(pl.mjpeng.indexOf(d.newCard) >= 0){
                pl.mjpeng.splice(pl.mjpeng.indexOf(d.newCard),1);
            }
        }
        if(d.type == 3){
            // playEffectInPlay("zha");
            pl.mjgang3.push(d.newCard);
            //炸牌
            var putCardPl = sData.players[tData.uids[d.from] + ""];
            if(putCardPl.mjput.length > 0 && putCardPl.mjput[putCardPl.mjput.length-1] == d.newCard){
                putCardPl.mjput.length = putCardPl.mjput.length - 1;
                putCardPl.mjputType.length = putCardPl.mjputType.length - 1;
                cc.log("HZLiuCard putCardPl = " + JSON.stringify(putCardPl));
            }
            var uid = tData.uids[tData.curPlayer];
            if(uid == SelfUid()){
                while(pl.mjhand.indexOf(d.newCard) >= 0){
                    pl.mjhand.splice(pl.mjhand.indexOf(d.newCard),1);
                }
            }
        }
        if(d.type == 1){
            pl.wangType = 0;
            pl.wangStatus = false;
            if (MjClient.gameType == MjClient.GAME_TYPE.DANG_YANG_FAN_JING ||
                MjClient.gameType == MjClient.GAME_TYPE.YI_CHANG_SHANG_DA_REN) {
                playEffectInPlay("kaimao");
            } else {
                playEffectInPlay("liu");
            }
            //pl.mjgang1.push(d.newCard);
            //提牌
            if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_WAI_HU_ZI || MjClient.gameType == MjClient.GAME_TYPE.YI_YANG_WAI_HU_ZI
                || MjClient.gameType == MjClient.GAME_TYPE.NAN_XIAN_GUI_HU_ZI || MjClient.gameType == MjClient.GAME_TYPE.YUAN_JIANG_GUI_HU_ZI){
                if(pl.mjput.indexOf(d.newCard) >= 0){
                    pl.mjputType.splice(pl.mjput.indexOf(d.newCard),1);
                }
            }
            if(pl.mjput.indexOf(d.newCard) >= 0){
                pl.mjput.splice(pl.mjput.indexOf(d.newCard),1);
            }
            var uid = tData.uids[tData.curPlayer];
            if(MjClient.gameType == MjClient.GAME_TYPE.DANG_YANG_FAN_JING ||
               MjClient.gameType == MjClient.GAME_TYPE.YI_CHANG_SHANG_DA_REN){
                uid = cpginfo.uid;
            }
            cc.log("wxd...................pl:"+JSON.stringify(pl));
            if(pl.mjwei.indexOf(d.newCard) >= 0){
                if(d.isGangHand){
                    if(uid == SelfUid()){
                        pl.mjhand.splice(pl.mjhand.indexOf(d.newCard),1);
                    }
                }
                pl.mjwei.splice(pl.mjwei.indexOf(d.newCard),1);
                if(MjClient.gameType == MjClient.GAME_TYPE.YI_YANG_WAI_HU_ZI || MjClient.gameType == MjClient.GAME_TYPE.NAN_XIAN_GUI_HU_ZI || MjClient.gameType == MjClient.GAME_TYPE.YUAN_JIANG_GUI_HU_ZI){
                    pl.mjgang1.push(d.newCard);
                }else{
                    pl.mjgang0.push(d.newCard);
                }
            }else{
                if(uid == SelfUid()){
                    while(pl.mjhand.indexOf(d.newCard) >= 0){
                        pl.mjhand.splice(pl.mjhand.indexOf(d.newCard),1);
                    }
                }
                if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_WAI_HU_ZI && !d.isGangHand){
                    pl.mjgang0.push(d.newCard);
                }else{
                    if((MjClient.gameType == MjClient.GAME_TYPE.YI_YANG_WAI_HU_ZI ||MjClient.gameType == MjClient.GAME_TYPE.NAN_XIAN_GUI_HU_ZI
                        || MjClient.gameType == MjClient.GAME_TYPE.YUAN_JIANG_GUI_HU_ZI)&& d.liuType == 2){
                        pl.mjgang2.push(d.newCard);
                    }else{
                        pl.mjgang1.push(d.newCard);
                    }
                }
            }
        }
        pl.isDead = d.isDead;
        if(pl.isDead && pl.info.uid == SelfUid()){
            playEffectInPlay("sishou");
        }
    }],
    waitLiu: [0, function (d) {
        var sData = MjClient.data.sData;
        if (!sData) return;
        sData.tData = d.tData;

        var eatFlags = d.eatFlags;
        for (var uid in sData.players) {
            sData.players[uid].eatFlag = eatFlags[uid];
        }
        var pl = sData.players[sData.tData.uids[sData.tData.curPlayer] + ""];
        if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_WAI_HU_ZI || MjClient.gameType == MjClient.GAME_TYPE.YI_YANG_WAI_HU_ZI
            || MjClient.gameType == MjClient.GAME_TYPE.NAN_XIAN_GUI_HU_ZI || MjClient.gameType == MjClient.GAME_TYPE.YUAN_JIANG_GUI_HU_ZI){
            pl.eatFlag = d.eatFlags[pl.info.uid];
            if(pl.eatFlag != 0){
                pl.mjState = TableState.waitEat;
                pl.liuCards = d.liuCards;
                pl.piaoCards = d.piaoCards;
            }
        }
    }],
    HZWeiCard:[0,function(d) {//偎牌
        cc.log("wxd...................HZWeiCard:"+JSON.stringify(d));
        var sData = MjClient.data.sData;
        if (!sData) return;
        sData.tData = d.tData;
        var tData = d.tData;
        var uids = d.tData.uids;

        // 96扑克偎牌逻辑特殊处理
        if(MjClient.gameType == MjClient.GAME_TYPE.XIANG_XI_96POKER) {
            var pl = sData.players[d.cpginfo.uid + ""];
            var fromPl = sData.players[uids[d.from]];
            if(!pl || !fromPl)
                return;

            //因为96扑克的mjsort会一直变, 更新数据时先备份旧的mjsort, 刷UI时会用到
            pl.oldMjSort = pl.mjsort;
            pl.mjsort = d.cpginfo.mjsort;
            pl.canNotPutCard = d.canNotPutCard;

            pl.onLine = true;
            pl.mjState = d.tData.tState;

            //偎牌数据写入
            pl.mjwei.push(d.weiCards);

            //手牌清理
            if(d.cpginfo.uid == SelfUid()) {
                var mjhand = pl.mjhand;
                for(var i = 0; i < d.weiCards.length - 1; i++) {
                    var cd = d.weiCards[i];
                    var idx = mjhand.indexOf(cd);
                    if(cd >= 0) {
                        mjhand.splice(idx, 1);
                    }
                }
            }

            //弃牌清理
            var mjput = fromPl.mjput;
            var cd = d.weiCards[d.weiCards - 1];
            if (mjput.length > 0 && mjput[mjput.length - 1] == cd) {
                mjput.length = mjput.length - 1;
                fromPl.mjputType.length = fromPl.mjputType.length - 1;
            }

            for (var uid in sData.players) {
                sData.players[uid].eatFlag = 0;
            }

            playEffectInPlay("shao");
            return;
        }

        var pl = sData.players[uids[tData.curPlayer] + ""];
        pl.mjsort = d.mjsort;

        if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_PENG_HU){
            pl.alarmFlag = d.alarmFlag;
        }
        
        if(d.isHandWei){
            var uid = tData.uids[tData.curPlayer];
            if(uid == SelfUid()){
                var mjhand = pl.mjhand;
                mjhand.splice(mjhand.indexOf(d.newCard), 1);
                mjhand.splice(mjhand.indexOf(d.newCard), 1);
                mjhand.splice(mjhand.indexOf(d.newCard), 1);
            }
            pl.mjHide = d.mjHide;
            pl.mjwei.push(d.newCard);
            var num = pl.mjwei.length + pl.mjpeng.length + pl.mjgang0.length + pl.mjgang1.length;
            if(num == 3 || num == 4){
                playEffectInPlay("wei" + num);
            }else{
            playEffectInPlay("wei");
            }
            return;
        }

        var putCard = pl.mjput[pl.mjput.length-1];
        if (MjClient.gameType == MjClient.GAME_TYPE.XU_PU_PAO_HU_ZI) {
            // 溆浦跑胡子需要整组数据
            pl.mjwei.push(d.cards);
        } else {
            pl.mjwei.push(putCard);
        }

        pl.skipPeng = d.skipPeng;
        pl.mjput.length = pl.mjput.length - 1;
        if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_WAI_HU_ZI || MjClient.gameType == MjClient.GAME_TYPE.YI_YANG_WAI_HU_ZI
            || MjClient.gameType == MjClient.GAME_TYPE.NAN_XIAN_GUI_HU_ZI || MjClient.gameType == MjClient.GAME_TYPE.YUAN_JIANG_GUI_HU_ZI
            || MjClient.gameType == MjClient.GAME_TYPE.AN_XIANG_WEI_MA_QUE || MjClient.gameType == MjClient.GAME_TYPE.EN_SHI_SHAO_HU){
            pl.mjputType.length = pl.mjputType.length - 1;
            cc.log("HZWeiCard mjputType", " pl = " + JSON.stringify(pl));
        }
        pl.isQiHu = d.isQiHu;
        pl.wangType = 0;
        pl.wangStatus = false;

        if(pl.skipPeng.indexOf(putCard) < 0){
            if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_PENG_HU){
                var num = pl.mjwei.length + pl.mjpeng.length + pl.mjgang0.length + pl.mjgang1.length;
                if(num == 3 || num == 4){
                    playEffectInPlay("wei" + num);
                }else{
                    playEffectInPlay("wei");
                }
            }else{
                playEffectInPlay("wei");
            }
        }else{
            if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_PENG_HU){
                var num = pl.mjwei.length + pl.mjpeng.length + pl.mjgang0.length + pl.mjgang1.length;
                if(num == 3 || num == 4){
                    playEffectInPlay("wei" + num);
                }else{
                playEffectInPlay("wei"); //碰胡没有臭偎一说
                }
            }else if(MjClient.gameType == MjClient.GAME_TYPE.XU_PU_PAO_HU_ZI) {
                playEffectInPlay("wei");
            }else {
                playEffectInPlay("chouwei");
            }
        }

        var eatFlags = d.eatFlags;
        for(var uid in sData.players){
            sData.players[uid].wangType = 0;
            sData.players[uid].wangStatus = false;
            if(eatFlags && eatFlags[uid]){
                sData.players[uid].eatFlag = eatFlags[uid];
            }else{
                sData.players[uid].eatFlag = 0;
            }
        }

        pl.mjState = tData.tState;

        var uid = tData.uids[tData.curPlayer];
        if(uid == SelfUid()){
            var mjhand = pl.mjhand;
            if (MjClient.gameType == MjClient.GAME_TYPE.XU_PU_PAO_HU_ZI) {
                var cards = d.cards.slice();
                var idx = cards.indexOf(putCard);
                if (idx >= 0) {
                    cards.splice(idx, 1);
                }
                for (var i = 0; i < cards.length; i++) {
                    idx = mjhand.indexOf(cards[i]);
                    if (idx >= 0) {
                        mjhand.splice(idx, 1);
                    }
                }
            } else {
                mjhand.splice(mjhand.indexOf(putCard), 1);
                mjhand.splice(mjhand.indexOf(putCard), 1);
            }
        }

        if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_WAI_HU_ZI || MjClient.gameType == MjClient.GAME_TYPE.YI_YANG_WAI_HU_ZI
            || MjClient.gameType == MjClient.GAME_TYPE.NAN_XIAN_GUI_HU_ZI || MjClient.gameType == MjClient.GAME_TYPE.YUAN_JIANG_GUI_HU_ZI){
            pl.eatFlag = d.eatFlags[pl.info.uid];
            if(pl.eatFlag != 0){
                pl.mjState = TableState.waitEat;
                pl.liuCards = d.liuCards;
                pl.piaoCards = d.piaoCards;
            }
            pl.isDead = d.isDead;
            if(pl.isDead && pl.info.uid == SelfUid()){
                playEffectInPlay("sishou");
            }
            if(d.canNotPutCard){
                pl.canNotPutCard = d.canNotPutCard;
            }
        }

        if(MjClient.gameType == MjClient.GAME_TYPE.AN_XIANG_WEI_MA_QUE) {
            pl.isDead = d.isDead;
            //偎麻雀死手不播音效
            // if(pl.isDead && pl.info.uid == SelfUid()){
            //     playEffectInPlay("sishou");  
            // }
            if(d.canNotPutCard) {
                pl.canNotPutCard = d.canNotPutCard;
            }
        }
    }],
    HZChiCard:[0,function(d) {//吃牌
        cc.log("wxd...................HZChiCard:"+JSON.stringify(d));
        var sData = MjClient.data.sData;
        if (!sData) return;
        sData.tData = d.tData;

        var tData = sData.tData;
        var uids = tData.uids;
        var cpginfo = d.cpginfo;

        //96扑克吃牌逻辑需要特殊处理
        if(MjClient.gameType == MjClient.GAME_TYPE.XIANG_XI_96POKER) {
            var pl = sData.players[cpginfo.uid + ""];
            var fromPl = sData.players[uids[d.from]];
            if(!pl || !fromPl) {
                return;
            }

            //因为96扑克的mjsort会一直变, 更新数据时先备份旧的mjsort, 刷UI时会用到
            pl.oldMjSort = pl.mjsort;
            pl.mjsort = cpginfo.mjsort;
            pl.canNotPutCard = d.canNotPutCard;
            pl.mjchi = d.mjchi;

            pl.onLine = true;
            pl.mjState = d.tData.tState;

            var chiMsg = d.chiCards;

            //清理手牌/桌面牌
            if(chiMsg && chiMsg.eatCards) {
                var mjhand = pl.mjhand;
                //桌面招牌吃牌(半招->满招)走杠牌消息了
                // if(chiMsg.gang0Pos >= 0) {
                //     //桌面招牌触发吃牌(全招)
                //     var cd = chiMsg.eatCards[chiMsg.eatCards.length - 1];
                //     pl.mjgang0[chiMsg.gang0Pos].ex.push(cd);
                // } else 
                if(chiMsg.tiePos >= 0) {
                    //桌面贴牌触发吃牌
                    pl.mjtie.splice(chiMsg.tiePos, 1);
                } else if(cpginfo.uid == SelfUid()) {
                    //正常吃牌, 自己要删手牌
                    for (var i = 0; i < chiMsg.eatCards.length - 1; i++) {
                        var cd = chiMsg.eatCards[i];
                        var idx = mjhand.indexOf(cd);
                        if(idx >= 0) {
                            mjhand.splice(idx, 1);
                        }
                    }
                }
            }

            //清理打出的牌
            var mjput = fromPl.mjput;
            if(chiMsg && chiMsg.eatCards) {
                var cd = chiMsg.eatCards[chiMsg.eatCards.length - 1];
                if(mjput.length > 0 && mjput[mjput.length - 1] == cd) {
                    mjput.length -= 1;
                    fromPl.mjputType.length -= 1;
                }
            }

            for (var uid in sData.players) {
                sData.players[uid].eatFlag = 0;
            }

            playEffectInPlay("chi");
            return;
        }

        //湖北.通城个子牌.捡牌也使用了该协议.特殊处理
        if(MjClient.gameType == MjClient.GAME_TYPE.TONG_CHENG_GE_ZI_PAI) {
        var lp = sData.players[uids[d.from] + ""];
            var pl = sData.players[d.cpginfo.uid];
            pl.mjchi = d.mjchi;
            pl.mjchiCard = d.mjchiCard;
            if (d.cpginfo.uid == SelfUid() || MjClient.rePlayVideo != -1) {
                pl.mjhand.push(tData.lastPutCard);
            }
            lp.mjput.length -= 1;
            pl.eatFlag = d.eatFlags[pl.info.uid];
            if(pl.eatFlag != 0){
                pl.mjState = TableState.waitEat;
                pl.liuCards = d.liuCards;
            } else {
                pl.mjState = TableState.waitPut;
            }
            pl.mjsort = d.cpginfo.mjsort;
            pl.canNotPutCard = d.canNotPutCard;
            //音效.
            playEffectInPlay("jian");
            return;
        }

        var lp = sData.players[uids[d.from] + ""];
        var pl = sData.players[uids[tData.curPlayer] + ""];
        pl.mjState = TableState.waitPut;
        if (tData.gameType == MjClient.GAME_TYPE.ZP_LY_CHZ) {
            pl.mjState = tData.tState;
        }
        pl.mjsort = cpginfo.mjsort;
        pl.mjchiCard = d.mjchiCard;
        pl.mjchi = d.mjchi;
        pl.isNew = false;
        pl.isQiHu = cpginfo.isQiHu;

        //耒阳吃边打边
        if(d.canNotPutCard){
            pl.canNotPutCard = d.canNotPutCard;
        }
        if(d.limitHuPutCard){
            pl.limitHuPutCard = d.limitHuPutCard;
        }

        var eatAndBiCards = pl.mjchi[pl.mjchi.length-1];
        var eatCards = eatAndBiCards.eatCards;
        var biCards = eatAndBiCards.biCards;
        if(biCards){
            playEffectInPlay("bi");
        }else{
            playEffectInPlay("chi");
        }

        var lastCard = pl.mjchiCard[pl.mjchiCard.length - 1];
        var uid = tData.uids[tData.curPlayer];
        if(uid == SelfUid()){
            if (pl.eatFlag & 32)
            {
                MjClient.showToast("您放弃了胡牌");
            }
            var mjhand = pl.mjhand;
            var tmpEatCards = eatCards.slice();
            var eatCard = pl.mjchiCard[pl.mjchiCard.length-1];
            tmpEatCards.splice(tmpEatCards.indexOf(eatCard),1);
            for(var k = 0;k < tmpEatCards.length;k++){
                mjhand.splice(mjhand.indexOf(tmpEatCards[k]),1);
            }
            if(biCards){
                for(k = 0;k < biCards.length;k++){
                    var cardsArr = biCards[k];
                    for(var m = 0;m<cardsArr.length;m++){
                        mjhand.splice(mjhand.indexOf(cardsArr[m]),1);
                    }
                }
            }
        }

        var mjput = lp.mjput;
        if (mjput.length > 0 && mjput[mjput.length - 1] == lastCard) {
            mjput.length = mjput.length - 1;
            if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_WAI_HU_ZI || MjClient.gameType == MjClient.GAME_TYPE.YI_YANG_WAI_HU_ZI
                || MjClient.gameType == MjClient.GAME_TYPE.NAN_XIAN_GUI_HU_ZI || MjClient.gameType == MjClient.GAME_TYPE.YUAN_JIANG_GUI_HU_ZI ||
                 MjClient.gameType == MjClient.GAME_TYPE.AN_XIANG_WEI_MA_QUE || MjClient.gameType == MjClient.GAME_TYPE.EN_SHI_SHAO_HU){
                lp.mjputType.length = lp.mjputType.length - 1;
                cc.log("HZChiCard mjputType", " lp = " + JSON.stringify(lp));
            }
        }else{
            mylog("eat error from");
        }

        for (var uid in sData.players) {
            sData.players[uid].eatFlag = 0;
            sData.players[uid].wangType = 0;
            sData.players[uid].wangStatus = false;
        }
        if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_WAI_HU_ZI || MjClient.gameType == MjClient.GAME_TYPE.YI_YANG_WAI_HU_ZI
            || MjClient.gameType == MjClient.GAME_TYPE.NAN_XIAN_GUI_HU_ZI || MjClient.gameType == MjClient.GAME_TYPE.YUAN_JIANG_GUI_HU_ZI 
            || MjClient.gameType == MjClient.GAME_TYPE.DANG_YANG_FAN_JING || MjClient.gameType == MjClient.GAME_TYPE.YI_CHANG_SHANG_DA_REN) {
            pl.eatFlag = d.eatFlags[pl.info.uid];
            if (pl.eatFlag != 0) {
                pl.mjState = TableState.waitEat;
                pl.liuCards = d.liuCards;
                pl.piaoCards = d.piaoCards;
            }
            pl.isDead = d.isDead;
            if(pl.isDead && pl.info.uid == SelfUid()){
                playEffectInPlay("sishou");
            }
        }

        if(MjClient.gameType == MjClient.GAME_TYPE.XIANG_XI_2710){
            for (var uid in sData.players) {
                sData.players[uid].fallArea = -1;
            }
        }

        if(MjClient.gameType == MjClient.GAME_TYPE.AN_XIANG_WEI_MA_QUE) {
            pl.mjState = tData.tState;
            pl.isDead = d.isDead;
            //偎麻雀死手不播音效
            // if(pl.isDead && pl.info.uid == SelfUid()){
            //     playEffectInPlay("sishou");  
            // }
        }
    }],
    HZTieCard:[0,function(d) {
        var sData = MjClient.data.sData;
        sData.tData = d.tData;
        var tData = sData.tData;
        var pl = sData.players[d.cpginfo.uid + ""];
        var fromPl = sData.players[tData.uids[d.from]];
        if(!pl || !fromPl) {
            return;
        }

        pl.canNotPutCard = d.canNotPutCard;
        //因为96扑克的mjsort会一直变, 更新数据时先备份旧的mjsort, 刷UI时会用到
        pl.oldMjSort = pl.mjsort;
        pl.mjsort = d.cpginfo.mjsort;

        pl.onLine = true;
        pl.mjState = d.tData.tState;

        //贴牌数据写入
        pl.mjtie.push(d.tieCards);

        //清理手牌
        if(d.cpginfo.uid == SelfUid()) {
            var mjhand = pl.mjhand;
            for(var i = 0; i < d.tieCards.length - 1; i++) {
                var cd = d.tieCards[i];
                var idx = mjhand.indexOf(cd);
                if(cd >= 0) {
                    mjhand.splice(idx, 1);
                }
            }
        }
        
        //清理打出的牌
        var mjput = fromPl.mjput;
        var cd = d.tieCards[d.tieCards.length - 1];
        if (mjput.length > 0 && mjput[mjput.length - 1] == cd) {
            mjput.length = mjput.length - 1;
            fromPl.mjputType.length = fromPl.mjputType.length - 1;
        }

        for (var uid in sData.players) {
            sData.players[uid].eatFlag = 0;
        }

        playEffectInPlay("tie");
    }],
    MJGuChou:[0,function(d) {
        var sData = MjClient.data.sData;
        if (!sData || !d || !d.uid) 
            return;
        sData.players[d.uid].isGuChou = d.isGuChou
    }],
    MJShuffle:[1.7, function(d) {
    }],
    FLSChiCard:[0,function(d) {//吃牌
        //cc.log("wxd...................FLSChiCard:"+JSON.stringify(d));
        var sData = MjClient.data.sData;
        if (!sData) return;
        sData.tData = d.tData;

        var tData = sData.tData;
        var uids = tData.uids;
        //cc.log(JSON.stringify(sData), "总数居");

        var lp = sData.players[uids[d.from] + ""];
        var pl = sData.players[uids[tData.curPlayer] + ""];
        pl.mjState = TableState.waitPut;

        for (var uid in sData.players) {
            sData.players[uid].eatFlag = 0;
        }

        playEffectInPlay("chi");
        //刷新手牌
        if(d.mjchi.length >0 && d.uid == SelfUid()) {
            var mjhand = pl.mjhand;
            //清理当前列的手牌
            for(var i=0; i<d.mjchi.length; i++) {
                for(var j=0; j<mjhand.length; j++) {
                    if(mjhand[j] == d.mjchi[i] && d.mjchi[i] != d.tData.lastPutCard) {
                        mjhand.splice(j, 1);
                        break;
                    }
                }
            }
        } 
        if(d.uid != SelfUid() && MjClient.rePlayVideo != -1) {

            var mjhand = pl.mjhand;
            //回放清理非自己的当前列的手牌
            for(var i=0; i<d.mjchi.length; i++) {
                for(var j=0; j<mjhand.length; j++) {
                    if(mjhand[j] == d.mjchi[i] && d.mjchi[i] != d.tData.lastPutCard) {
                        mjhand.splice(j, 1);
                        break;
                    }
                }
            }
        }

        var mjput = lp.mjput;
        if (mjput.length > 0 && mjput[mjput.length - 1] == d.tData.lastPutCard) {
            mjput.length = mjput.length - 1;
        }else{
            mylog("eat error from");
        }

        for (var uid in sData.players) {
            sData.players[uid].eatFlag = 0;
        }

        pl.mjchi.push(d.mjchi);
        //cc.log("刷新后的手牌", JSON.stringify(pl.mjhand));

        sData.players[d.uid].eatFlag = d.eatFlag;
        if(d.eatFlag>0){// 吃后有杠操作继续显示杠
            sData.tData.tState = TableState.waitEat;
            pl.mjState = TableState.waitEat
        } 
    }],
    HZPickCard: [0.8, function(d) {
        var sData = MjClient.data.sData;
        if(!sData) return;
        var pl = sData.players[d.uid];
        if (pl.mjput.length > 0 && pl.mjput[pl.mjput.length - 1] == d.card) {
            pl.mjput.pop();
            if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_WAI_HU_ZI || MjClient.gameType == MjClient.GAME_TYPE.YI_YANG_WAI_HU_ZI
                || MjClient.gameType == MjClient.GAME_TYPE.NAN_XIAN_GUI_HU_ZI || MjClient.gameType == MjClient.GAME_TYPE.YUAN_JIANG_GUI_HU_ZI ||
                MjClient.gameType == MjClient.GAME_TYPE.AN_XIANG_WEI_MA_QUE || MjClient.gameType == MjClient.GAME_TYPE.EN_SHI_SHAO_HU){
                pl.mjputType.pop();
                cc.log("HZPickCard mjputType", " pl = " + JSON.stringify(pl));
            }
        }

        // if (d.uid == SelfUid()) {
        if (pl.mjhand) {
            pl.mjhand.push(d.card);
        }

        //红字
        if (MjClient.gameType == MjClient.GAME_TYPE.ML_HONG_ZI ||
            MjClient.gameType == MjClient.GAME_TYPE.XIANG_YIN_ZHUO_HONG_ZI)
        {

            pl.mjState = TableState.waitPut;
            sData.tData.tState = TableState.waitPut;
        }

    }],
    HZCheckRaise:[0,function (d) {
        var sData = MjClient.data.sData;
        if (!sData) return;
        var tData = sData.tData;
        tData.tState = d.mjState;
        if(MjClient.GAME_TYPE.YUE_YANG_PENG_HU == MjClient.gameType ||
            MjClient.GAME_TYPE.AN_XIANG_WEI_MA_QUE == MjClient.gameType ||
            MjClient.GAME_TYPE.YI_YANG_WAI_HU_ZI == MjClient.gameType ||
            MjClient.GAME_TYPE.YUE_YANG_WAI_HU_ZI == MjClient.gameType ||
            MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI ||
            MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_King ||
            MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_LR_King ||
            MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_ER ||
            MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_SR_King ||
            MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_SR ||
            MjClient.gameType == MjClient.GAME_TYPE.LUO_DI_SAO){
            tData.curPlayer = tData.zhuang;
        }
        if(MjClient.GAME_TYPE.XIANG_XI_2710 == MjClient.gameType)
        {
             tData.curPlayer = tData.zhuang;
        }
        if(d.beginHandCard)
        {
            tData.beginHandCard = d.beginHandCard;
        }

        if (d.jiazhuNums)
        {
            for(var uid in d.jiazhuNums){
                sData.players[uid].jiazhuNum = d.jiazhuNums[uid];
            }

        }

        if (d.jiachuiNums)
        {
            for(var uid in d.jiachuiNums){
                sData.players[uid].jiachuiNum = d.jiachuiNums[uid];
            }

        }

        if(tData.uids[tData.zhuang] == SelfUid()){
            sData.players[SelfUid().toString()].eatFlag = d.eatFlag;
            sData.players[SelfUid().toString()].mjState = d.mjState;
        }
        if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_WAI_HU_ZI || MjClient.gameType == MjClient.GAME_TYPE.YI_YANG_WAI_HU_ZI
            || MjClient.gameType == MjClient.GAME_TYPE.NAN_XIAN_GUI_HU_ZI || MjClient.gameType == MjClient.GAME_TYPE.YUAN_JIANG_GUI_HU_ZI) {
            var pl = sData.players[SelfUid().toString()];
            if (pl.eatFlag != 0) {
                pl.mjState = TableState.waitEat;
                pl.liuCards = d.liuCards;
                pl.piaoCards = d.piaoCards;
            }
            if(MjClient.gameType == MjClient.GAME_TYPE.YI_YANG_WAI_HU_ZI){
                tData.shenType = d.shenType;
                if(tData.shenType == 0){
                    playEffectInPlay("shuangshen");
                }else{
                    playEffectInPlay("danshen");
                }
            }
        }
        if(MjClient.gameType == MjClient.GAME_TYPE.AN_XIANG_WEI_MA_QUE) {
            for(var uid in d.eatFlags) {
                sData.players[uid].eatFlag = d.eatFlags[uid]; 
            }
            if(tData.uids[tData.zhuang] == SelfUid()) {
                sData.players[SelfUid().toString()].mjState = d.mjState;
            }
        }
        if(MjClient.gameType == MjClient.GAME_TYPE.XIANG_XI_96POKER) {
            tData.curPlayer = d.curPlayer;
            for(var uid in d.eatFlags) {
                sData.players[uid].eatFlag = d.eatFlags[uid]; 
            }
            if(tData.uids[tData.zhuang] == SelfUid()) {
                sData.players[SelfUid().toString()].mjState = d.mjState;
            }
        }
        // if (d.jiazhuNums && d.jiazhuNums[uid]) {
        //     pl.jiazhuNum = d.jiazhuNums[uid];
        // }
    }],
    HZUpdateEatFlag:[0.4,function (d) {
        //更新玩家eatFalg，目前只用于郴州桂阳字牌（选项选中：出牌后明龙）的更新
        var sData = MjClient.data.sData;
        if (!sData) return;
        var eatFlags = d.eatFlags;
        for(var uid in eatFlags){
            sData.players[uid].eatFlag = eatFlags[uid];
            if ((MjClient.gameType == MjClient.GAME_TYPE.DANG_YANG_FAN_JING ||
                 MjClient.gameType == MjClient.GAME_TYPE.YI_CHANG_SHANG_DA_REN ||
                 MjClient.gameType == MjClient.GAME_TYPE.HU_BEI_HUA_PAI ||
                 MjClient.gameType == MjClient.GAME_TYPE.GONG_AN_HUA_PAI ||
                 MjClient.gameType == MjClient.GAME_TYPE.TONG_CHENG_GE_ZI_PAI) && d.liuCards) {
                sData.players[uid].liuCards = d.liuCards[uid];
            }
        }
        if (MjClient.gameType == MjClient.GAME_TYPE.HU_BEI_HUA_PAI ||
            MjClient.gameType == MjClient.GAME_TYPE.GONG_AN_HUA_PAI ||
            MjClient.gameType == MjClient.GAME_TYPE.TONG_CHENG_GE_ZI_PAI) {
            sData.tData = d.tData;
        }
    }],
    HZAddCards:[0,function (d) {
        var sData = MjClient.data.sData;
        if (!sData) return;
        for(var uid in sData.players){
            if(Number(uid) == d.uid){
                var pl = sData.players[uid + ""];
                if(pl.mjhand){
                    for(var i = 0; i< d.cardList.length; i++){
                        pl.mjhand.push(d.cardList[i]);
                    }
                }
            }
        }
    }],
    HZCardNum:[0,function (d) {
        var sData = MjClient.data.sData;
        if (!sData) return;
        var tData = sData.tData;
        tData.cardNext = d.cardNext;
    }],
    HZWang:[0,function(d){
        cc.log("wxd...............HZWang:"+JSON.stringify(d));
        //王闯或者王钓
        var sData = MjClient.data.sData;
        if (!sData) return;
        sData.tData.curPlayer = d.curPlayer;
        sData.tData.tState = TableState.waitEat;
        var pl = sData.players[d.uid + ""];
        pl.eatFlag = 0;
        pl.mjState = TableState.waitEat;
        pl.wangType = d.wangType;
    }],
    HZWangChuang:[0,function(d){
        cc.log("wxd...............HZWangChuang:"+JSON.stringify(d));
        var sData = MjClient.data.sData;
        if (!sData) return;
        var pl = sData.players[d.uid + ""];
        pl.wangStatus = d.wangStatus;
        pl.wangType = d.type;
        if(pl.wangType == 1){
            playEffectInPlay("wangdiao");
        }else if(pl.wangType == 2){
            playEffectInPlay("wangchuang");
        }else if(pl.wangType == 4){
            playEffectInPlay("wangzha");
        }
    }],
    HZWangChuangShow:[0.8,function(d){
        var sData = MjClient.data.sData;
        if (!sData) return;
        var pl = sData.players[d.uid + ""];
        pl.wangStatus = d.wangStatus;
        pl.wangType = d.type;
        if(pl.wangType == 1){
            playEffectInPlay("wangdiao");
        }else if(pl.wangType == 2){
            playEffectInPlay("wangchuang");
        }else if(pl.wangType == 4){
            playEffectInPlay("wangzha");
        }
    }],
    MJPassWei:[0,function (d) {
        var eatFlags = d.eatFlags;
        var sData = MjClient.data.sData;
        var tData = sData.tData;
        for (var uid in sData.players) {
            sData.players[uid].eatFlag = eatFlags[uid];
        }
        tData.mjHideCard = d.mjHideCard;

    }],
    MJQiShouHu:[0,function(d){
        cc.log("wxd...............MJQiShouHu:"+JSON.stringify(d));
    }],
    refreshMyTables:[0,function(d) {
        MjClient.createRoomDatas = d;
    }],
    match_end:[0,function (d) {   //比赛结束
        cc.log("wxd...............match_end:"+JSON.stringify(d));
        delete MjClient.matchRank;
        if(MjClient.roundendui){
            MjClient.roundendui.removeFromParent(true);
            MjClient.roundendui = null;
        }
        if(MjClient.endoneui) {
            MjClient.endoneui.removeFromParent(true);
        }
        if(MjClient.endallui){
            MjClient.endallui.removeFromParent(true);
            MjClient.endallui = null;
        }
        if(d.awardInfo){
            MjClient.Scene.addChild(new winGameLayer(d));
        }else {
            MjClient.Scene.addChild(new loseGameLayer(d));
        }
    }],
    beTrust:[0,function (d) {       //比赛托管{uid: pl.uid}
        var sData = MjClient.data.sData;
        if(!sData){
            return;
        }
        sData.players[d.uid].trust = true;

        //打筒子整场托管
        if(MjClient.gameType == MjClient.GAME_TYPE.DA_TONG_ZI_SHAO_YANG) {
            sData.players[d.uid].isTrust = true;
            postEvent("TZTrust", {});
        }

    }],
    cancelTrust:[0, function(d){
        var sData = MjClient.data.sData;
        if(!sData){
            return;
        }
        sData.players[d.uid].trust = false;

        //打筒子整场托管
        if(MjClient.gameType == MjClient.GAME_TYPE.DA_TONG_ZI_SHAO_YANG) {
            sData.players[d.uid].isTrust = false;
            postEvent("TZTrust", {});
        }
    }],
    trustTime:[0, function(d){
        var sData = MjClient.data.sData;
        if(!sData){
            return;
        }
        sData.tData.trustEnd = d.trustEnd;
    }],
    trustTip:[0,function (d) {       //托管倒计时

    }],
    signUpInfo:[0,function (d) {        //报名等待人数更新

    }],
    leftTable:[0,function (d) {       //比赛剩余桌数

    }],
    selectDir_event:[0,function (d) {       //选方位
        var tData = MjClient.data.sData.tData;
        var sData = MjClient.data.sData;
        if (isJinZhongAPPType()
            && GameClass[MjClient.gameType] == MjClient.GAME_CLASS.MA_JIANG
            && tData.maxPlayer != 2 && d.uid != SelfUid())
        {
            playEffect("player_join_effect");
            var nickname = sData.players[d.uid].info.nickname;
            var msg = " 选好了座位"
            MjClient.showToastWithInfobyPos(nickname,msg,0.725);
        }
    }],
    novice_guide_user:[0,function(d)//玩家新手引导
    {
        MjClient.guide_info = d;
        MjClient.isNewUser = true;
    }
    ],
    novice_guide_member:[0,function(d)// 代理新手引导
    {
        MjClient.isNewMember = true;
    }
    ],
    waitReady:[0,function (d) {       //准备
        cc.log("----------------准备按钮--------------显示");
        var sData = MjClient.data.sData;
        if (!sData) return;
        var tData = sData.tData;
        tData.tState = TableState.waitReady;
        for(var uid in sData.players){
            sData.players[uid].mjState = TableState.waitReady;
        }
    }],
    waitBaoTing: [0, function(d) {
        var sData = MjClient.data.sData;
        if (!sData) {
            return;
        }
        var tData = sData.tData;
        tData.tState = TableState.waitBaoTing;
        var pl = sData.players[d.uid];
        pl.mjState = TableState.waitBaoTing;
    }],
    updateEatFlags: [0, function(d) {
        var sData = MjClient.data.sData;
        if (!sData) {
            return;
        }

        var tData = sData.tData;
        tData.tState = d.tState;
        for (var uid in d.eatFlags) {
            var pl = sData.players[uid];
            pl.eatFlag = d.eatFlags[uid];
            pl.mjState = TableState.waitCard;
            if (pl.eatFlag > 0) {
                if (tData.tState == TableState.waitEat) {
                    pl.mjState = TableState.waitEat;
                } else if (tData.tState == TableState.waitPut) { // 麻将自摸能胡
                    pl.mjState = TableState.waitPut;
                }
            }
        }
    }],
    matchWinnerBroadcast:[0,function (d) {    //比赛跑马灯
        cc.log("比赛界面广播", d);
    }],
    dismissMatch:[0,function (d) {      //比赛报名时间截止时

    }],
    match_enter:[0,function (d) {//在等待界面断线重连
        //cc.log("wxd...断线重连match_enter"+d);
        MjClient.gamenet.request("pkplayer.handler.matchEnter",{matchId:d},function(rtn){
            //cc.log("wxd pkplayer.handler.matchEnter:"+JSON.stringify(rtn))
            if(rtn.code == -1)
            {
                MjClient.showToast(rtn.message);
            }else if(rtn.code == 0){
                if(rtn.data.rank){
                    MjClient.matchRank = rtn.data.rank;
                }
                if(rtn.data.state == 0){
                    if(!MjClient.gemewaitingui) {
                        MjClient.Scene.addChild(new gameWaiteLayer(rtn.data));
                    }
                }else if(rtn.data.state == 1){
                    if(rtn.data.tableid){
                        MjClient.joinMatchGame(rtn.data.tableid,null,"match");
                    }
                }else if(rtn.data.state == 2){
                    var waiteLayer = new gameWaiteLayer(rtn.data);
                    MjClient.Scene.addChild(waiteLayer);
                    waiteLayer.addChild(new roundEndLayer(rtn.data));
                }
            }
        });
    }],
    match_wait:[0,function (d) {//比赛等待入场
        cc.log("wxd...断线重连match_wait"+JSON.stringify(d));
        var min = Math.ceil((d.info.startTime- d.serverTime)/1000/60);
        MjClient.showMsg("你报名的“"+d.info.title+"”将在"+min+"分钟后开始，请提前进入比赛", function () {
            MjClient.gamenet.request("pkplayer.handler.matchEnter",{matchId:d.info.matchId},function(rtn){
                //cc.log("wxd pkplayer.handler.matchEnter:"+JSON.stringify(rtn))
                if(rtn.code == 0){
                    MjClient.Scene.addChild(new gameWaiteLayer(rtn.data));
                }else {
                    MjClient.showToast(rtn.message);
                }
            });
        },function(){
            if(cc.sys.isObjectValid(MjClient.playgroundui)){
                MjClient.playgroundui.getPlayDetailData();
            }
            // MjClient.gamenet.request("pkplayer.handler.matchLeave",{matchId:d},function(rtn){
            //     if(rtn.code == -1)
            //     {
            //         MjClient.showToast(rtn.message);
            //     }else if(rtn.code == 0){
            //         //退赛成功
            //         cc.log("wxd..........离开比赛成功"+JSON.stringify(rtn));
            //     }
            // })
        }, "1");
    }],
    match_refresh_info:[0,function (d) {//刷新等待人数
        cc.log("wxd...刷新等待人数match_refresh_info"+JSON.stringify(d));
    }],
    match_state_refresh:[0,function (d) {//
        cc.log("wxd...进入比赛match_state_refresh"+JSON.stringify(d));
        if(d.tableid && d.state == 1){
            MjClient.joinMatchGame(d.tableid,null,"match");
        }
        if(d.rank){
            MjClient.matchRank = d.rank;
        }
    }],
    match_cancel:[0,function (d) {
        cc.log("wxd...比赛取消match_cancel"+JSON.stringify(d));
    }],
    match_list_refresh:[0, function (d) {//刷新比赛列表接口
        cc.log("wxd...比赛取消match_list_refresh"+JSON.stringify(d));
        if(cc.sys.isObjectValid(MjClient.playgroundui)){
            MjClient.playgroundui._playListData=d;
            MjClient.playgroundui.initPlay();
            if(MjClient.playgroundui._playListData.length == 0){
                //MjClient.showToast("没有比赛");
                MjClient.playgroundui.initPlayDetailNoSee();
            }
        }
    }],
    match_rank_refresh:[0,function (d) {
        if(d.rank){
            MjClient.matchRank = d.rank;
        }
    }],
    Qiangdizhu:[0,function (d) {    //抢地主发送服务器
        cc.log("强地主",JSON.stringify(d));
        if(MjClient.data.sData.tData.minJiaofen == undefined) {
            MjClient.data.sData.tData.minJiaofen = 0;
        }
        if(d.qiang>MjClient.data.sData.tData.minJiaofen)
        MjClient.data.sData.tData.minJiaofen = d.qiang;
        cc.log("强地主", d);
    }],
    waitJiaodizhu:[0,function (d) {   //轮到叫地主
        if ("minJiaofen" in d) {
            MjClient.data.sData.tData.minJiaofen = d.minJiaofen;
        }
        if ("hasJiao" in d) {
            MjClient.data.sData.tData.hasJiao = d.hasJiao;
        }

        cc.log("轮到叫地主", JSON.stringify(d));
    }],
    MJChuzi:[0,function(d) {
        var sData = MjClient.data.sData;
        var tData = sData.tData;
        if (d.mjState) {
            tData.tState = d.mjState;
        }

        if (d.chuZi != undefined) {
            sData.players[d.uid].chuZi = d.chuZi;
        }
    }],
    MJJiazhu:[0,function (d) {   //轮到叫地主
        if (MjClient.playui){
                clearSortData();
        }
 
        if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_FU_LU_SHOU ||
            MjClient.gameType == MjClient.GAME_TYPE.FU_LU_SHOU_ER_SHI_ZHANG ||
            MjClient.gameType == MjClient.GAME_TYPE.CHEN_ZHOU_ZI_PAI ||
            MjClient.gameType == MjClient.GAME_TYPE.GUI_YANG_ZI_PAI ||
            MjClient.gameType == MjClient.GAME_TYPE.CHEN_ZHOU_MAO_HU_ZI ||
            MjClient.gameType == MjClient.GAME_TYPE.CHANG_DE_PAO_HU_ZI ||
            MjClient.gameType == MjClient.GAME_TYPE.YUAN_LING_PAO_HU_ZI ||
            MjClient.gameType == MjClient.GAME_TYPE.SHI_MEN_PAO_HU_ZI ||
            MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_WAI_HU_ZI ||
            MjClient.gameType == MjClient.GAME_TYPE.XIANG_XI_2710 ||
            MjClient.gameType == MjClient.GAME_TYPE.HAN_SHOU_PAO_HU_ZI ||
            MjClient.gameType == MjClient.GAME_TYPE.TONG_CHENG_GE_ZI_PAI) {
            var sData = MjClient.data.sData;
            if (!sData) return;
            var tData = sData.tData;
            sData.players[d.uid].piaoFen = -1;
            if(d.piaoFen != undefined) {
                sData.players[d.uid].piaoFen = d.piaoFen;
                //sData.players[d.uid].lastPiaoFen = d.piaoFen;
            }
        }else {
            var sData = MjClient.data.sData;
            if (!sData) return;
            var tData = sData.tData;
            if (d.mjState) {
                tData.tState = d.mjState;
            }
            if (d.jiazhuNums)
            {
                for(var uid in d.jiazhuNums){
                    sData.players[uid].jiazhuNum = d.jiazhuNums[uid];
                    sData.players[uid].mjState = TableState.isReady;
                } 
            }
            // 防止d.jiazhuNum=0, pl接不到这个值
            if (!cc.isUndefined(d.jiazhuNum))
            {
                if (d.uid) 
                {
                    sData.players[d.uid].jiazhuNum = d.jiazhuNum;
                }
                if (d.mjState) 
                {
                    sData.players[d.uid].mjState = d.mjState;
                }
            }

            if (d.jiachuiNums)
            {
                for(var uid in d.jiachuiNums){
                    sData.players[uid].jiachuiNum = d.jiachuiNums[uid];
                    sData.players[uid].mjState = TableState.isReady;
                }

            }

            if (d.jiachuiNum != undefined) {
                sData.players[d.uid].jiachuiNum = d.jiachuiNum;
            }

            if(tData.uids[tData.zhuang] == SelfUid()){
                sData.players[SelfUid().toString()].eatFlag = d.eatFlag;
                sData.players[SelfUid().toString()].mjState = d.mjState;
            }
        }
    }],
    diCards:[0,function (d) {    //斗地主翻底牌
        cc.log("翻底牌", d);
        var tData = MjClient.data.sData.tData;
        MjClient.selectCards_card = [];
        MjClient.colloctionCurrentSelcetUIArray = [];
        setCardToNormalPos();
        clearSortData();
        tData.zhuang =  d.zhuang;
        if(d.zhuang == getPlayerIndex(0))
        {
            var tData = MjClient.data.sData.tData;
            var uids = tData.uids;
            var selfIndex = uids.indexOf(SelfUid());
            selfIndex = (d.zhuang + 4 - selfIndex) % 4;
            var pl = getUIPlayer(selfIndex);
            for (var j = 0; j < d.diCards.length; j++) {
                pl.mjhand.push(d.diCards[j]);
            }
        }
        else
        {
            if(MjClient.rePlayVideo != -1)//回放
            {
                var num = Math.max(MjClient.MaxPlayerNum, 4);
                for(var i = 0;i < num;i++)
                {
                    var pl = getUIPlayer(i);
                    if(pl && tData.uids[tData.zhuang] == pl.info.uid)
                    {
                        for (var j = 0; j < d.diCards.length; j++) {
                            pl.mjhand.push(d.diCards[j]);
                        }
                    }
                }
            }
        }
    }],
    waitLong:[0,function (d) {    //等待龙的操作
        cc.log("等待龙的操作", JSON.stringify(d));
        var sData = MjClient.data.sData;
        if (!sData) return;
        //sData.tData = d.tData;
        for (var uid in sData.players) {
            var pl = sData.players[uid];
            pl.mjState = TableState.waitLong;
        }

        sData.tData.tState = TableState.waitLong;
    }],
    buLongCards:[0,function (d) {    //龙后补牌
        cc.log("龙后补牌", JSON.stringify(d));
        var buCards = d.buCards;
        var sData = MjClient.data.sData;
        if (!sData) return;
        //sData.tData = d.tData;
        for (var uid in sData.players) {
            var pl = sData.players[uid];
            if(pl.mjhand && buCards[uid])
            {

                for(var i = 0;i < buCards[uid].length;i++)
                {
                    pl.mjhand.push(buCards[uid][i]);
                }
            }
        }


    }],
    s2c_sdhJiaoFen:[0, function (d) {  // 三打哈-叫分
        var tData = MjClient.data.sData.tData;
        if (d.tState)
            tData.tState = d.tState;
        if (d.mustJiao != null)
            tData.mustJiao = d.mustJiao;
        if (d.jiaoFen != 0)
        {
            tData.jiaoFen = d.jiaoFen;
            tData.isPaiFen = d.isPaiFen;
        }
        if (d.remainScore)
            tData.remainScore = d.remainScore;

        tData.jiaoFenPlayer = d.jiaoFenPlayer;
        if (d.nextPlayer != -1)
            tData.curPlayer = d.nextPlayer;

        if (tData.jiaoFenPlayer != null)
        {
            var pl = MjClient.data.sData.players[tData.uids[tData.jiaoFenPlayer]];
            pl.jiaoFen = d.jiaoFen;
            pl.isPaiFen = d.isPaiFen;
            pl.isLastJiao= d.isLastJiao;
            if(MjClient.gameType == MjClient.GAME_TYPE.XIN_ZHOU_SAN_DA_ER)
            {
                if(d.isLastJiao)
                {
                    pl.jiaoFen = d.jiaoFen;
                }
                else {
                    pl.jiaoFen = -1;
                }
            }
        }
    }],
    s2c_sdhJiaoZhu:[1, function (d) {  // 三打哈-叫主
        var tData = MjClient.data.sData.tData;
        if (d.tState)
            tData.tState = d.tState;
        tData.zhuPaiType = d.zhuPaiType;
        tData.curPlayer = d.jiaoZhuPlayer;
        tData.zhuang = tData.curPlayer;
    }],

    s2c_sdhSelectLiuShou:[1, function (d) {  // 三打哈-选择留守花色
        var player = getUIPlayerByUID(d.uid);

        if (player)
            player.liuShouColor = d.liuShouColor;
    }],

    s2c_sdhHanLai:[0, function (d) {  // 永州包牌-喊来
        var player = getUIPlayerByUID(d.uid);

        if (player)
            player.hanlai = true;
    }],

    waitJiaChui:[0, function (d) {  // 永州包牌-等待加锤
        var sData = MjClient.data.sData;

        sData.tData.tState = TableState.waitJiazhu;

        for (var uid in sData.players) {
            sData.players[uid].jiaChui = false;
            sData.players[uid].mjState = TableState.waitJiazhu;
        }
    }],

    s2c_jiaChui:[0, function (d) {  // 永州包牌-加锤
        var player = getUIPlayerByUID(d.uid);

        if (player)
        {
            player.jiaChui = d.jiaChui;
            player.mjState = TableState.isReady;
        }
    }],

    s2c_sdhMaiPai:[0, function (d) {   // 三打哈-埋牌
        var tData = MjClient.data.sData.tData;
        if (d.tState)
            tData.tState = d.tState;
        if (d.maiPaiArr == null)
            tData.maiPaiArr = [];
        else
            tData.maiPaiArr = d.maiPaiArr;
        if(d.isTouXiang)
            tData.isTouXiang = d.isTouXiang;

        tData.isCanTouXiang = d.isCanTouXiang;

        if(d.isSuccess)
            tData.maiPaiSuccess = d.isSuccess;

        if (tData.maiPaiArr.length != 0 && (!tData.isTouXiang || MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_SAN_DA_HA
            || MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_SAN_DA_HA || MjClient.gameType == MjClient.GAME_TYPE.YONG_LI_SAN_DA_HA))
            tData.tState = TableState.waitPut;
    }],
    s2c_sdhTouXiang:[0, function(d) {   // 三打哈-投降
    }],
    s2c_sdhZhuaFen:[0, function (d) {  // 三打哈-抓分

    }],
    s2c_dqJiaoZhu:[0, function (d) {  // 打七-叫主
        var tData = MjClient.data.sData.tData;
        tData.zhuType = d.zhuType;
        tData.zhuang = d.zhuang;
        tData.zhuPaiType = d.zhuPaiType;
        tData.curPlayer = d.zhuang;
        tData.zhuValue = d.card;
    }],
    s2c_dqDiCard:[0, function (d) {  // 打七-底牌
        var tData = MjClient.data.sData.tData;
        if (d.tState)
            tData.tState = d.tState;
        if (d.curPlayer)
            tData.curPlayer = d.curPlayer;
        tData.diPaiArr = d.diPaiArr;
    }],
    s2c_dqMaiPai:[0, function (d) {   // 打七-埋牌
        var tData = MjClient.data.sData.tData;
        if (d.tState)
            tData.tState = d.tState;
        tData.diPaiArr = d.diPaiArr;
    }],
    s2c_dqWaitJiaoZhu:[0, function (d) {   //打七等待叫主
        var tData = MjClient.data.sData.tData;
        if (d.tState)
            tData.tState = d.tState;
        if (d.curPlayer)
            tData.curPlayer = d.curPlayer;
        tData.zhuType = d.zhuType;
        tData.hasJiaoIdx = d.hasJiaoIdx;
    }],
    s2c_sdhWaitJiaoZhu:[0, function (d) {   //忻州三打二等待叫主
        var tData = MjClient.data.sData.tData;
        if (d.tState)
            tData.tState = d.tState;
        if (d.diPaiArr)
            tData.diPaiArr = d.diPaiArr;
        if (d.zhuang || d.zhuang == 0)
        {
            tData.zhuang = d.zhuang;
            tData.curPlayer = tData.zhuang;
        }



    }],
    s2c_sdhWaitChooseCard:[0, function (d) {   //忻州三打二等待选朋友
        var tData = MjClient.data.sData.tData;
        if (d.zhuang)
            tData.zhuang = d.zhuang;
        if(d.tState)
            tData.tState = d.tState
    }],
    s2c_sdhChooseCard:[0, function (d) {   //忻州三打二选朋友
        var tData = MjClient.data.sData.tData;
        if (d.tState)
            tData.tState = d.tState;
        if (d.card)
            tData.friendCard = d.card;
    }],
    s2c_TiQianOver:[0, function (d) {   //忻州三打二提前结束
       var tData = MjClient.data.sData.tData;
       tData.hasTiQianOver = d.hasTiQianOver;
       if(d.tiQianOverinfo)
           tData.tiQianOverinfo = d.tiQianOverinfo;
        tData.isAgreeOverList = d.isAgreeOverList;
    }],
    s2c_dqZhuaFen:[0, function (d) {//打七抓分
        var tData = MjClient.data.sData.tData;
        tData.playerScore = d.playerScore;
    }],
    s2cZhaGuZiJiaZhu:[0, function (d) {//扎股子亮三、扎股
        var tData = MjClient.data.sData.tData;
        tData.curPlayer = d.curPlayer;
        tData.tState = d.tState;
        tData.canJiaZhuType = d.canJiaZhuType;
        tData.jiaZhuData = d.jiaZhuData;
        tData.canTouXiang = d.canTouXiang;
        tData.totalJiaZhu = d.totalJiaZhu;
    }],
    red_packet_config:[0, function (d) {// 俱乐部用，红包局宣传数据
        MjClient._FriendCard_RedPackageConfig = d.data;
        FriendCard_Common.showRedPackageAd();
    }],
    club_refresh_room:[0, function (d) {      // club 刷新房间列表(服务器推送)  startQueueNetMsg var  handleData=dh[1](ed[1]);
        var record = 0;
        var keysStr = Object.keys(d).toString();
        for (var i = 0; i < MjClient.NetMsgQueue.length; i++) {
            var str =  MjClient.NetMsgQueue[i][0];
            if ("club_refresh_room" == str) {
                var keys2Str = Object.keys(MjClient.NetMsgQueue[i][1]).toString();
                if (keysStr == keys2Str) {
                    record ++;
                }
            }
        }
        // 判断是否存在多条数据 ，否 就执行，是 返回 -1，不执行，逻辑层有处理 直到最后一条才执行
        // （原结构如此：startQueueNetMsg ，var  handleData=dh[1](ed[1]);）
        if (record == 1) {
            return 1;
        }else{
            if (record <= 0) {
                cc.log(" Error : club_refresh_room is not exit !")
            }
            return -1;
        }
    }],
    club_update_room:[0, function (d) {      // club 更新联盟房间列表
    }],
 
    league_refresh_room:[0, function (d) {      // club 刷新联盟房间列表(服务器推送)  startQueueNetMsg var  handleData=dh[1](ed[1]);
        var record = 0;
        var keysStr = Object.keys(d).toString();
        for (var i = 0; i < MjClient.NetMsgQueue.length; i++) {
            var str =  MjClient.NetMsgQueue[i][0];
            if ("league_refresh_room" == str) {
                var keys2Str = Object.keys(MjClient.NetMsgQueue[i][1]).toString();
                if (keysStr == keys2Str) {
                    record ++;
                }
            }
        }
        // 判断是否存在多条数据 ，否 就执行，是 返回 -1，不执行，逻辑层有处理 直到最后一条才执行
        // （原结构如此：startQueueNetMsg ，var  handleData=dh[1](ed[1]);）
        if (record == 1) {
            return 1;
        }else{
            if (record <= 0) {
                cc.log(" Error : club_refresh_room is not exit !")
            }
            return -1;
        }
    }],

    league_update_room:[0, function (d) {      // club 更新联盟房间列表
    }],
    
    club_refresh_info:[0, function (d) {      // club 刷新亲友圈信息（服务器推送)

    }],
    club_update_info:[0, function (d) {      // club 更新亲友圈信息（服务器推送)

    }],
    league_refresh_info:[0, function (d) {      // club 刷新联盟亲友圈信息（服务器推送)
    }],
    league_update_info:[0, function (d) {      // club 更新联盟亲友圈信息（服务器推送)
    }],
    league_match_user:[0, function (d) {      // 联盟 比赛信息推送,解决进入亲友圈接口没有返回比赛信息的bug
    }],
    club_remove_player:[0, function (d) {      // club 被踢出亲友圈或亲友圈被解散（服务器推送)
        if (d)
            MjClient.showToast(d);
    }],
    league_remove_player:[0, function (d) {      // 联盟club 被踢出亲友圈或亲友圈被解散（服务器推送)
        if (d)
            MjClient.showToast(d);
    }],
    club_player_apply:[0, function (d) {        //club 亲友圈审核信息
        //进入游戏推的消息
        if (d.code == 0 && d.data && !d.data.userId)
        {
            for (var i = 0; i < d.data.length; i ++)
            {
                if (MjClient.clubPlayerApplyList.indexOf(d.data[i]) == -1)
                {
                    MjClient.clubPlayerApplyList.push(d.data[i]);
                }
            }
            if (d.message)
                MjClient.showToast(d.message);
        }
        //推过来的新数据
        if (d.code == 0 && d.data && d.data.userId)
        {
            if (MjClient.clubPlayerApplyList.indexOf(d.data.clubId) == -1)
            {
                MjClient.clubPlayerApplyList.push(d.data.clubId);
            }

            if(util.localStorageEncrypt.getBoolItem("clubIsShowShenhe" + d.data.clubId, true))
            {
                var layer = new Friendcard_popMsgShenhe(d.data);
                FriendCard_Common.PopUpMsgCount++;
                MjClient.Scene.addChild(layer,10000 - FriendCard_Common.PopUpMsgCount);
            }
            else if(d.message)
            {
                MjClient.showToast(d.message);
            }
        }
    }],
    club_adder_invite:[0, function (d) {        //club 亲友圈邀请审核信息
        //推过来的新数据
        if (d.code == 0 )
        {
            FriendCard_Common.PopUpMsgCount++;
            MjClient.Scene.addChild(new Friendcard_popMsgInvited(d.data), 10000 - FriendCard_Common.PopUpMsgCount);
        }
    }],
    league_adder_invite:[0, function (d) {        //联盟邀请审核信息
        //推过来的新数据
        if (d.code == 0 )
        {
            FriendCard_Common.PopUpMsgCount++;
            MjClient.Scene.addChild(new Friendcard_popMsgInvited(d.data), 10000 - FriendCard_Common.PopUpMsgCount);
        }
    }],
    user_invite_check:[0, function (d) {        //亲友圈、联盟 邀请未审核信息 服务端推送
        if (d.message)
        {
            MjClient.showMsg(d.message);
            postEvent("refresh_inviteShenhe_num", {num:d.data.nums});
        }
    }],
    user_store_order :[0, function (d) {        //club 亲友圈审核信息
        //推过来的新数据
        if(d && d.iselfAudit){
            MjClient.showToast("您有一笔免审核订单已经自动通过")
            return;
        }
        if (d.code == 0 && d.goodsData){
            var layer = new Friendcard_shop_shenhePopMsg(d);
            FriendCard_Common.PopUpMsgCount++;
            MjClient.Scene.addChild(layer,10000 - FriendCard_Common.PopUpMsgCount);
        }
        if(MjClient.systemConfig){
            MjClient.systemConfig.isNewDiamondOrder = 1;
        }
        postEvent("audit_diamond_order_seller",{isNewDiamondOrder:1})
    }],
    audit_diamond_order_buyer:[0, function (d) {//亲友圈商城订单处理通知买家
        if(d.status == 1){
            MjClient.showToast(d.message+"");
        }
    }],
    audit_diamond_order_seller:[0, function (d) {//亲友圈是否有待处理商城订单
        if(MjClient.systemConfig){
            MjClient.systemConfig.isNewDiamondOrder = d.isNewDiamondOrder
        }
    }],
    notify_in_club:[0, function (d) {//【联盟】设置比例提醒  和 比赛场权限更改提示
        if (cc.sys.isObjectValid(MjClient.FriendCard_main_ui)) {
            if (d.leagueAvatar || d.clubAvatar)
                MjClient.FriendCard_main_ui.addChild(new Friendcard_tipSetRatioDialog(d));
            else {
                var data = d;
                var title = data.leagueTitle ? "你的联盟：" + unescape(data.leagueTitle) : "你的俱乐部：" + unescape(data.clubTitle);
                var _id = data.leagueId ? data.leagueId : data.clubId;
                MjClient.showMsg(title + "(" + _id + ")" + "\n参赛名额被修改，请您对下级重新授权参赛名额！",
                    function () {
                    },
                    function () { });
                if(FriendCard_UI.FriendCard_Match_CheckRight){
                    MjClient.showToast("你的上级对你进行了新的授权,请重新打开页面设置");
                    FriendCard_UI.FriendCard_Match_CheckRight.removeFromParent();
                }
            }

        }
    }],
    league_rule_forbid_user:[0, function (d) {//【联盟】屏蔽名单
    }],
    club_rule_forbid_user:[0, function (d) {//【联盟】屏蔽名单
        
    }],
    fangka_extratime_draw:[0, function (d) {//亲友圈房卡加时抽奖

        if(cc.sys.isObjectValid(MjClient.friendCard_actLuckyDraw)){
            MjClient.friendCard_actLuckyDraw.removeFromParent();
        }
        MjClient._isNeedShowFriendCardActLuckyDraw = false;
        if(cc.sys.isObjectValid(MjClient.FriendCard_main_ui)){
            MjClient.FriendCard_main_ui.addChild(new FriendCard_actLuckyDraw());
        }else{
            MjClient._isNeedShowFriendCardActLuckyDraw = true;
        }
    }],
    fangka_extratime_hongbao:[0, function (d) {//亲友圈房卡加时抽红包
        MjClient._isNeedShowFriendCardActRedPackage = true
        MjClient._friendcard_redPackage_count = d.count;
        //开始监听展示抢红包
        showRedPackageStickDialog();
    }],
    club_fangkaju_hongbao_draw:[0, function (d) {//亲友圈房卡加抽到红包
        if(!MjClient._redPackageToastList){
            MjClient._redPackageToastList = [];
        }
        if(d.level <= 10 && d.level > 0){
            MjClient._redPackageToastList.push(d);
            FriendCard_UI.showAwardToast();
        }
    }],
    league_fangkaju_hongbao_draw:[0, function (d) {//联盟房卡加抽到红包
        if(!MjClient._redPackageToastList){
            MjClient._redPackageToastList = [];
        }
        if(d.level <= 10 && d.level > 0){
            MjClient._redPackageToastList.push(d);
            FriendCard_UI.showAwardToast();
        }
    }],
    league_player_apply:[0, function (d) {        //club 联盟亲友圈审核信息
        //进入游戏推的消息
        if (d.code == 0 && d.data && !d.data.userId)
        {
            for (var i = 0; i < d.data.length; i ++)
            {
                if (MjClient.clubPlayerApplyList.indexOf(d.data[i]) == -1)
                {
                    MjClient.clubPlayerApplyList.push(d.data[i]);
                }
            }
            if (d.message)
                MjClient.showToast(d.message);
        }
        //推过来的新数据
        if (d.code == 0 && d.data && d.data.userId)
        {
            if (MjClient.clubPlayerApplyList.indexOf(d.data.clubId) == -1)
            {
                MjClient.clubPlayerApplyList.push(d.data.clubId);
            }

            if(util.localStorageEncrypt.getBoolItem("clubIsShowShenhe" + d.data.clubId, true))
            {
                var layer = new Friendcard_popMsgShenhe(d.data);
                FriendCard_Common.PopUpMsgCount++;
                MjClient.Scene.addChild(layer,10000 - FriendCard_Common.PopUpMsgCount);
            }
            else if(d.message)
            {
                MjClient.showToast(d.message);
            }

        }
    }],
    cancel_club_player_apply:[0, function (d) {
        if (d.code == 0 && d.data)
        {
            for (var i = 0; i < d.data.length; i ++)
            {
                var index = MjClient.clubPlayerApplyList.indexOf(d.data[i]);
                if (index >= 0)
                    MjClient.clubPlayerApplyList.splice(index, 1);
            }
        }
    }],
    club_hide_status: [0, function(d) {
        if(cc.sys.isObjectValid(MjClient.FriendCard_main_ui)){
            
            var clubId = util.localStorageEncrypt.getNumberItem(FriendCard_Common.LocalKey.lastIntoClub, 0);
            if(clubId != d.clubId){
                d.leagueId = null;
            }else{
                if(d.clubHideStatus == 1 && d.message){
                    MjClient.showToast(d.message);
                }
            }
            postEvent("club_refresh_list",d)
        }else{
            if(d && d.clubHideStatus == 1){
                if(!MjClient._canNotBackToHallClubIds){
                    MjClient._canNotBackToHallClubIds = [];
                    MjClient._backToHallToLMClubIds = [];
                }
                MjClient._canNotBackToHallClubIds.push(d.clubId);
                MjClient._backToHallToLMClubIds.push(d.leagueId);
                
            }else if(d && d.clubHideStatus == 0){
                if(MjClient._canNotBackToHallClubIds){
                    var index = MjClient._canNotBackToHallClubIds.indexOf(d.clubId);
                    if(index >= 0){
                        MjClient._canNotBackToHallClubIds.splice(index,1);
                        MjClient._backToHallToLMClubIds.splice(index,1);
                    }
                }
            }
        }
    }],
    club_refresh_list: [0, function(d) {
        MjClient.Scene.runAction(cc.sequence(cc.delayTime(1.0), cc.callFunc(function() {
            MjClient.showToast("您的亲友圈申请已通过");
        })));
    }],
    club_invite_game: [0, function(d) {
        friendCard_yaoqingIntoGame(d);
    }],
    //联盟亲友圈
    league_refresh_list: [0, function(d) {
        // MjClient.Scene.runAction(cc.sequence(cc.delayTime(1.0), cc.callFunc(function() {
        //     MjClient.showToast("您的联盟亲友圈申请已通过");
        // })));
    }],
    //联盟亲友圈
    league_invite_game: [0, function(d) {
        friendCard_yaoqingIntoGame(d);
    }],
    // 联盟 被邀请联盟/俱乐部同意
    league_club_invite: [0, function(rtn) {
        if (rtn.code != 0) {
            FriendCard_Common.serverFailToast(rtn);
            return;
        }

        if (!MjClient.league_club_invite_list)
            MjClient.league_club_invite_list = [];

        if (rtn.list)
            MjClient.league_club_invite_list = MjClient.league_club_invite_list.concat(rtn.list); 
    }],
    // 俱乐部更新体力值
    club_update_user_mp: [0, function(d) {
    }],
    league_update_user_mp: [0, function(d) {
    }],
    redpoint_member_button: [0, function(d) {
    }],
    //比赛场
    redpoint_match_button: [0, function(d) {
    }],
    LeaveRoom:[0, function (d) {
        if(MjClient.setui)
        {
            MjClient.setui.removeFromParent(true);
            MjClient.setui = null;
        }
        var sData = MjClient.data.sData;
        var bmatchLeave = d.indexOf("您已被上级设置为禁止加入房间的团队，如有疑问，请联系会长或管理员！") != -1; //比赛禁玩限制提示语过滤
        var matchAllowLeave = sData && (sData.tData.tState == TableState.waitJoin || sData.tData.tState == TableState.waitReady || sData.tData.roundNum == -2) //比赛场牌局允许离开房间的条件
        if ( !bmatchLeave || matchAllowLeave){
            MjClient.showMsg(d + "", function() {
                if (sData) {
                    var clubInfoTable = getClubInfoInTable();
                    if (clubInfoTable)
                        MjClient.Scene.addChild(new FriendCard_main(clubInfoTable.clubId));
                    delete MjClient.data.sData;
                }
                delete MjClient.gameType;
                postEvent("LeaveGame");
            });
        }
    }],
    notification:[0, function (d) {
        if (d.logout === true) {
            MjClient.logout();
        }
        MjClient.showMsgTop(d.content);
    }],
    lotteryCanGet:[0,function(d){

    }],
    after_ready:[0,function(d){
        var sData = MjClient.data.sData;
        if (!sData) return;

        if(typeof(d.tState) != 'undefined') {
            sData.tData.tState = d.tState;
            for (var uid in sData.players) sData.players[uid].mjState = d.tState;
        }

        // 准备后的切牌操作
        if( sData.tData.tState == TableState.afterReady && d.actionName && d.actionName == 'qiepai' ) {
            cc.log("after_ready showPlayerShuffleView====",JSON.stringify(d))
            postEvent("showPlayerShuffleView",d);
        }
        if( sData.tData.tState == TableState.afterReady && d.actionName && d.actionName == 'qiepai_end' ) {
            cc.log("after_ready showPlayerShuffleAnim====",JSON.stringify(d))
            postEvent("showPlayerShuffleAnim",d);
        }
    }],
    select_shuffle_index:[0,function(d){

    }],
    refresh_mail_list:[0, function(d){
        MjClient.emailData = d;
    }],
    refresh_mission:[0, function(d){
        MjClient._GoldFuli = d.data;
    }],
    FreeBegin:[0, function(d){
        var sData = MjClient.data.sData;
        if (!sData) return;
        if (d.players) {
            for (var uid in d.players) {
                sData.players[uid].freeBegin = d.players[uid].freeBegin;
            }
        }

        if (d.tData)
            sData.tData = d.tData;
    }],
    enter_room:[0, function (d) {
        MjClient.joinGame(d.tableid, null,false,MjClient.gameType);
    }],
    PKWrongful:[0,function (d) {
        cc.log('不合法！')
    }],
    PKMingPai:[0,function (d) {
        cc.log('Nothing to do !')
    }],
    waitQiang:[0,function (d) {
        cc.log("waitQiang event");
        MjClient.data.sData.tData.tState = TableState.waitJiazhu;
    }],
    s2cQiangZhuang:[0,function (d) {
    }],
    partnerJieFeng:[0,function (d){

    }],
    partnerCards:[0,function (d){

    }],
    updatePlayerZhuaFen:[0,function (d){
        var UIoff =  getUiOffByUid(d.uid);
        var pl = getUIPlayer(UIoff);
        if(pl){
            pl.zhuaFen = d.zhuaFen;
        }
    }],
    playerXiFen:[0,function (d){
    }],
    updatePlayerXiFen:[0,function (d){
    }],
    updateRoundZhuaFen:[0,function (d){
    }],
    earlyTermination:[0,function (d){
    }],
    playerBieWang:[0,function (d){
        var UIoff =  getUiOffByUid(d.uid);
        var pl = getUIPlayer(UIoff);
        if(pl){
            pl.bieWang = true;
        }
    }],

    waitBaoxi:[0,function (d) {
        cc.log("waitBaoxi event");
        MjClient.data.sData.tData.tState = TableState.waitBaoXi;
    }],
    Baoxi:[0,function (d) {
        // 株洲打码子
        var sData = MjClient.data.sData;

        if (d.uid == 0)
            return;

        for (var uid in sData.players) {
            var localPlayer = sData.players[uid]; 
            if (uid == d.uid) {
                localPlayer.winall += d.score;

                if (SelfUid() == uid) {
                    localPlayer.xiCard = d.xiCard;

                    if (MjClient.majiang.setXiCards)
                        MjClient.majiang.setXiCards(d.xiCard);
                }
            } else
                localPlayer.winall -= d.score/(MjClient.MaxPlayerNum - 1);
        }
    }],
    TouXiang:[0,function (d) {
        cc.log("TouXiang event");
    }],
    initJiPaiQi:[0,function (d) {
        // 初始化记牌器
        if(MjClient.data.sData) {
            MjClient.data.sData.tData.jipaiqi = d.jipaiqi;

        } else {
            cc.log('initJiPaiQi error, MjClient.data.sData is null')
        }
    }],

    MJChangeLocationApp: [0, function(d) {
        var sData = MjClient.data.sData;
        if (!sData || !sData.players[d.uid]) return;
        var pl = sData.players[d.uid];
        pl.locationApps = d.appList;
    }],

    locationApps : [0, function(d){
        var sData = MjClient.data.sData;
        if (!sData) return;
        var pl = sData.players[d.uid];
        pl.locationApps = d.locationApps;
    }],

    putCardAfterGang:[0, function(d){  // 安化麻将打出骰后展示的麻将
        var sData = MjClient.data.sData;
        if (!sData) return;

        var tData = sData.tData;
        var pl = sData.players[d.uid];
        pl.mjput.push(d.card);
        tData.tState = TableState.waitEat;
        tData.gangAddCard = [];
        if (d.putCount) {
            pl.putCount = d.putCount;
        }

        var eatFlags = d.eatFlags;
        for (var uid in sData.players) {
            sData.players[uid].eatFlag = eatFlags[uid];
            sData.players[uid].mjState = TableState.waitEat;
        }

        if(MjClient.gameType === MjClient.GAME_TYPE.HUAI_HUA_MA_JIANG || MjClient.gameType == MjClient.GAME_TYPE.JING_ZHOU_MA_JIANG){
            tData.touingUid = null;
            tData.lastPutCard = d.card;
        }

        if(MjClient.gameType == MjClient.GAME_TYPE.JING_ZHOU_MA_JIANG){
            tData.isFirstPut = false;
        }
    }],
    MJGangScore:[0, function(d){
        var sData = MjClient.data.sData;
        if(!sData){
            return;
        }
        var scoreArr = d.scoreArr;
        for(var uid in scoreArr){
            sData.players[uid].gangScore = sData.players[uid].gangScore || 0;
            sData.players[uid].gangScore += scoreArr[uid];
        }
    }],
    MJCanBaoTing:[0, function (d) {  //可以起手报听
        var sData = MjClient.data.sData;
        if (!sData) return;
        var tData = sData.tData;
        var pl = sData.players[d.uid];
        if(d.tingStatus){
            pl.tingStatus = d.tingStatus;
        }else{
            tData.allPlayerTingFalg = d;
        }

        if(d.eatFlag && (d.eatFlag & 8) == 8){
            pl.eatFlag = d.eatFlag;
        }

        if(d.canBaotingNum){
            tData.canBaotingNum = d.canBaotingNum;
        }
    }],
    MJBaoTing:[0, function (d) {    // 起手报听
        if((d.isBaoTing || d.tingStatus == 1) && (MjClient.gameType != MjClient.GAME_TYPE.HUAI_HUA_MA_JIANG && MjClient.gameType != MjClient.GAME_TYPE.JING_ZHOU_MA_JIANG)){
            playEffectInPlay("ting",false,d.uid);
        }
        var sData = MjClient.data.sData;
        if (!sData) return;
        var tData = sData.tData;
        var pl = sData.players[d.uid];
        tData.canBaotingNum = d.canBaotingNum;
        pl.isTing = d.isBaoTing || d.tingStatus == 1;
        pl.tingStatus = d.tingStatus;
        if((MjClient.gameType == MjClient.GAME_TYPE.HUAI_HUA_MA_JIANG || MjClient.gameType == MjClient.GAME_TYPE.JING_ZHOU_MA_JIANG) && MjClient.APP_TYPE.QXSYDTZ == MjClient.getAppType()){
            pl.passHu = (pl.eatFlag & 8);
        }
        if (d.eatFlag) pl.eatFlag = d.eatFlag;

        if (MjClient.gameType === MjClient.GAME_TYPE.GUI_ZHOU_MEN_HU_XUE_LIU ||
            MjClient.gameType === MjClient.GAME_TYPE.GUI_ZHOU_GUI_YANG_ZHUO_JI) {
            pl.isTing = d.choice === 1;
            if (pl.isTing) {
                playEffectInPlay("ting");
            }
        }
    }],
    MJFengDong:[0, function(d){    //  宁乡开王麻将封东
        var sData = MjClient.data.sData;
        if (!sData) return;
        var pl = sData.players[d.uid];
        pl.fengDong = true;
        pl.putIndex = d.putIndex;
        sData.tData.canBaotingNum = d.canBaotingNum;
    }],
    PickHaiDiCard:[0, function(d){  //  宁乡开王麻将选择海底牌
    }],
    MJPickHaiDi:[0, function(d){
        var sData = MjClient.data.sData;
        if (!sData) return;
        var tData = sData.tData;
        var pl = sData.players[d.uid];
        pl.haiDiStatus = d.haiDiStatus;
        tData.curPlayer = d.curPlayer;
    }],
    MJOtherGang:[0, function(d){    //  宁乡开王麻将借子开杠
        var sData = MjClient.data.sData;
        if (!sData) return;
        var tData = sData.tData;
        var pl = sData.players[d.uid];
        pl.eatFlag = d.eatFlag;
        pl.mjState = d.tData.tState;
        pl.isNew = true;
        tData.cardNext = d.tData.cardNext;
        tData.putType = d.tData.putType;
        tData.tState = d.tData.tState;
        tData.curPlayer = d.tData.curPlayer;
    }],
    HZPickScore:[0,function(d){
        var sData = MjClient.data.sData;
        if (!sData) return;

        var pickScores = d.pickScores;
        for(var uid  in pickScores){
            var pl = sData.players[uid];
            pl.winone += pickScores[uid];
            pl.winone = revise(pl.winone);
        }
    }],
    HZAlarm:[0,function(d){
        var sData = MjClient.data.sData;
        if (!sData) return;

        var alarmFlags = d.alarmFlags;
        for(var uid  in alarmFlags){
            var pl = sData.players[uid];
            pl.alarmFlag = alarmFlags[uid];
            if(pl.alarmFlag == 1){
                playEffectInPlay("baojing");
        }
        }
        var p = sData.players[d.uid];
        if(d.canNotPutCard){
           p.canNotPutCard = d.canNotPutCard; 
        }
    }],
    startShuffleCards:[0,function(d){
        MjClient.data.sData.tData.curPlayer = d.curPlayer;
        MjClient.data.sData.tData.shuffler = d.curPlayer;
        MjClient.data.sData.tData.tState = TableState.waitShuffle;
        // 开始切牌
        cc.log("ssssss 切牌开始");
    }],
    endShuffleCards:[0,function(d){
        // 切牌结束
        cc.log("ssssss 切牌结束");
        cc.log(JSON.stringify(d));
    }],
    waitBao : [0, function(d){
        var sData = MjClient.data.sData;
        sData.tData.tState = TableState.waitBao
        var pl = sData.players[d.uid];
        pl.bao = -2;  // -3 无 -2 等待选择包牌 -1等待选择队友 0 选择不包 1选择包牌 
        sData.tData.curPlayer = sData.tData.uids.indexOf(pl.info.uid);
    }],
    waitFindFriend : [0, function(d){
        var sData = MjClient.data.sData;
        sData.tData.tState = TableState.waitBao
        var pl = sData.players[d.uid];
        pl.bao = -1;
        sData.tData.curPlayer = sData.tData.uids.indexOf(pl.info.uid);
    }],
    PKFindFriend : [0, function(d){
        var tData = MjClient.data.sData.tData;
        tData.friendCard = d.card;
        var pl = MjClient.data.sData.players[d.uid];
        pl.bao = 0;
    }],
    PKTeam : [0, function(d){
        var tData = MjClient.data.sData.tData;
        tData.baoType = d.baoType; //-1 未确定 0包 1暗包 2分组
        tData.baoUid = d.baoUid; // 包玩家uid
        var players = MjClient.data.sData.players;
        var len = d.friendUids;
        for(var uid in d.friendUids){
            var pl = players[uid];
            pl.friendUid = d.friendUids[uid];
        }
    }],
    PKBao : [0, function(d){
        var sData = MjClient.data.sData;
        var pl = sData.players[d.uid];
        pl.bao = d.bao; 

        if (d.bao == 1) {
            sData.tData.zhuang = sData.tData.uids.indexOf(pl.info.uid);
        }
    }],
    s2cYJQianFenDiCards :[0, function(d){
        var tData = MjClient.data.sData.tData;
        tData.diPaiArr = d.cards;
        tData.diPaiCount = d.cards.length;
    }],
    TZXi : [0, function(d){
        var tData = MjClient.data.sData.tData;
        var players = MjClient.data.sData.players;
        for(var uid in d.xiScores){
            var pl = players[uid];
            pl.score_xi = d.xiScores[uid];
        }
    }],
    MJWangZhua:[0.7, function(d){
        var sData = MjClient.data.sData;
        if (!sData) return;
        var pl = sData.players[d.uid + ""];
        pl.eatFlag = 0;
        pl.mjState = TableState.waitCard;
    }],
    userReportPush:[0,function (d) {      //举报推送信息
        cc.log("wxd===userReportPush===="+JSON.stringify(d));
    }],
    SelectedQuanHun:[0, function(){
        cc.log("SelectedQuanHun......")
    }],
    QuanHunToAllPlayer:[0, function (d) {
        var sData = MjClient.data.sData;
        var pl = sData.players[d.uid + ""];
        pl.isQuanHun = d.isQuanHun;
        pl.eatFlag = d.eatFlag;
    }],
    JiaBeiToAllPlayer:[0, function (d) {
        var sData = MjClient.data.sData;
        var pl = sData.players[d.uid + ""];
        pl.jiabei = d.jiabei;
        sData.tData.allSelect = d.allSelect;
    }],
    beDefeat:[0, function (d) {
        var sData = MjClient.data.sData;
        var tData = sData.tData;
        var pl = sData.players[d.uid + ""];
        if (tData.tState == TableState.waitPut && pl.mjState == TableState.waitPut) {
            tData.tState = TableState.waitCard;
            pl.mjState = TableState.waitCard;
        }
    }],
    exchangeMall:[0, function (d) {

    }],
    selectGuMai:[0, function (d) { // 贵阳抓鸡选择估卖
        var sData = MjClient.data.sData;
        var pl = sData.players[d.uid + ""];
        pl.gumaiValue = d.gumaiValue;
    }],
    playerMoneyChanged:[0, function (d) {
        var sData = MjClient.data.sData;
        if(!sData){
            return;
        }
        var off = getUiOffByUid(d.userId);
        var pl = getUIPlayer(off);
        pl.info.money = pl.info.money - d.count;
    }],
    selectTing:[0, function (d) {
        var sData = MjClient.data.sData;
        if(!sData){
            return;
        }
        var off = getUiOffByUid(d.uid);
        var pl = getUIPlayer(off);
        pl.isTing = d.isTing;
    }],

    //比赛场 相关 某人参加进来审核
    club_join_match:[0, function (d) {
        // cc.log(" ====== lms --- dddd  ",JSON.stringify(d));  

        var layer = new Friendcard_match_shenhePopMsg(d, 1);
        FriendCard_Common.PopUpMsgCount++;
        MjClient.Scene.addChild(layer,10000 - FriendCard_Common.PopUpMsgCount);

    }],

    league_join_match:[0, function (d) {
        // cc.log(" ====== lms --- dddd  ",JSON.stringify(d));  

        var layer = new Friendcard_match_shenhePopMsg(d, 1, true);
        FriendCard_Common.PopUpMsgCount++;
        MjClient.Scene.addChild(layer,10000 - FriendCard_Common.PopUpMsgCount);

    }],

    //比赛场 相关 某人退出比赛 (会长)
    club_quit_match:[0, function (d) {
        var layer = new Friendcard_match_shenhePopMsg(d, 0);
        FriendCard_Common.PopUpMsgCount++;
        MjClient.Scene.addChild(layer,10000 - FriendCard_Common.PopUpMsgCount);

    }],

    //比赛场 相关 某人退出比赛 (会长)
    league_quit_match:[0, function (d) {
        var layer = new Friendcard_match_shenhePopMsg(d, 0, true);
        FriendCard_Common.PopUpMsgCount++;
        MjClient.Scene.addChild(layer,10000 - FriendCard_Common.PopUpMsgCount);

    }],

    //league_match_aduit
    league_match_aduit:[0, function (d) {

    }],

    club_match_aduit:[0, function (d) {

    }],

    match_overdue_notice:[0, function (d) {

    }],
    league_transfer_creator_match:[0, function (d) {

    }],


    //比赛场 相关 某人退出比赛 （成员）
    club_audit_match:[0, function (d) {
        var str = "";
        switch (d.status) {
            case 0:
                str = "你的参赛还未审核";
                break;
            case 1:
                str = "你的参赛审核已被同意";
                break;
            case 2:
                str = "你的参赛审核已被拒绝";
                break;
            case 3:
                str = "你的退赛还未审核";
                break;
            case 4:
                str = "你的退赛审核已被同意";
                break;
            case 5:
                str = "你的退赛审核已被拒绝";
                break;
        }

        MjClient.showToast(str);

    }],

    //比赛场 相关 某人退出比赛 （成员）
    league_audit_match:[0, function (d) {
        var str = "";
        switch (d.status) {
            case 0:
                str = "你的参赛还未审核";
                break;
            case 1:
                str = "你的参赛审核已被同意";
                break;
            case 2:
                str = "你的参赛审核已被拒绝";
                break;
            case 3:
                str = "你的退赛还未审核";
                break;
            case 4:
                str = "你的退赛审核已被同意";
                break;
            case 5:
                str = "你的退赛审核已被拒绝";
                break;
            case 6://系统踢出
                return;
                break;
        }

        MjClient.showToast(str);

    }],
    voteExtraTime:[0, function (d) {
        //普通加时赛投票消息
        if(MjClient.data.sData && MjClient.data.sData.tData){

            var tData = MjClient.data.sData.tData;
            tData.extraTimeVote = d.extraTimeVote;
            var isAllAgree = true;
            var hasReject = false;
            var noChoiceNameStr = ""
            for(var i = 0 ; i < tData.uids.length; i++){
                var pl = MjClient.data.sData.players[tData.uids[i]+""];
                var votePlData =  tData.extraTimeVote[tData.uids[i]];
                if(votePlData && votePlData.vote != 1){
                    isAllAgree = false;
                }
                if(votePlData && votePlData.vote == -1){
                    noChoiceNameStr += (("玩家"+unescape(pl.info.nickname))+"、")
                }
                if(votePlData && votePlData.vote === 0){
                    hasReject = true;
                    if(pl){
                        MjClient.showToast("玩家"+unescape(pl.info.nickname)+"拒绝延长比赛");
                    }
                    
                    break;
                }
            }
            if(isAllAgree){
                tData.extraTimeVote.isEnd = true;
                MjClient.showToast("所有人同意，游戏进入加赛");
                if(cc.sys.isObjectValid(MjClient.VoteJiaShiView)){
                    MjClient.VoteJiaShiView.removeFromParent();
                }
                //去除准备按钮点击的遮罩
                if(cc.sys.isObjectValid(MjClient.endoneui) &&
                    cc.sys.isObjectValid(MjClient.endoneui._readyBtnLayout)){
                    cc.log("去除准备按钮点击的遮罩")
                    MjClient.endoneui._readyBtnLayout.removeFromParent();
                }
            }
            if (d.playInfo && MjClient.data.playLog) {
                MjClient.data.playLog.logs.push(d.playInfo);
            }
            if(d.playInfo){
                tData.extraTimeVote.isEnd = true;
                //展示大结算
                if(tData.roundNum > 0){
                    tData.roundNum = 0;
                }
                if(!hasReject){
                    //超时拒绝
                    if(noChoiceNameStr.length > 0){
                        noChoiceNameStr = noChoiceNameStr.substring(0,noChoiceNameStr.length-1);
                    }
                    MjClient.showToast(noChoiceNameStr+"选择超时，加时取消");
                }
                if(cc.sys.isObjectValid(MjClient.VoteJiaShiView)){
                    MjClient.VoteJiaShiView.removeFromParent();
                }
                //去除准备按钮点击的遮罩
                if(cc.sys.isObjectValid(MjClient.endoneui) &&
                    cc.sys.isObjectValid(MjClient.endoneui._readyBtnLayout)){
                    cc.log("去除准备按钮点击的遮罩")
                    MjClient.endoneui._readyBtnLayout.removeFromParent();
                }
                if(!cc.sys.isObjectValid(MjClient.endoneui) && !cc.sys.isObjectValid(MjClient.endallui)){
                    postEvent("endRoom",{
                        showEnd:true
                    });
                }else{
                    if(!cc.sys.isObjectValid(MjClient.endallui)){
                        //有小结算没有大结算,检测小结算关闭弹大结算
                        doShowEndAllAction();
                    }
                }
            }
        }

    }],
    user_growth_activity:[0, function (d) {
        if(!MjClient.growInfoData){
            MjClient.growInfoData = d;
        }

        for(var k in d ) MjClient.growInfoData[k] = d[k];
        
    }],

    s2cMJJiazhu: [0, function (d) {
        
    }],

    pkNewCard: [0, function (d) {
        var player = getUIPlayerByUID(d.uid);

        if (player && player.mjhand && d.newCards && d.newCards.length > 0) {
            player.mjhand = player.mjhand.concat(d.newCards);
            player.handCount = player.mjhand.length;
        }
    }],

    waitHuanPai: [0, function (d) {
        var sData = MjClient.data.sData;
        var tData = sData.tData;
        tData.tState = TableState.waitHuanPai;
        for (var uid in sData.players) {
            sData.players[uid].mjState = TableState.waitHuanPai;
        }
    }],

    MJHuanPai: [0, function (d) {
        var sData = MjClient.data.sData;
        if(sData.players[d.uid]) {
            sData.players[d.uid].mjhand = d.mjhand;
            sData.players[d.uid].huanBefore = d.huanBefore;   // 换之前的三张牌
        }
    }],

    MJHuanPaiFinish: [0, function (d) {
        MjClient.data.sData.tData = d.tData;
        var backData = d.backData;
        var player = MjClient.playui.getPlayerInfoByOff();
        player.mjhand = backData[player.info.uid].mjhand;
        player.huanAfter = backData[player.info.uid].huanAfter;   // 换之后的三张牌
        if(player.mjhand && player.mjhand.length === 14){
            player.eatFlag = d.eatFlag;
            player.mjState = d.tData.tState;
        }
    }],

    waitPuPai: [0, function (d) {
        if(d && d.tData) {
            MjClient.data.sData.tData = d.tData;
        }
    }],

    MJPuPai: [0, function (d) {
        var sData = MjClient.data.sData;
        if(sData.players[d.uid]) {
            sData.players[d.uid].mjhand = d.mjhand;
            sData.players[d.uid].puCards = d.puCards;
        }
    }],

    MJPuPaiFinish: [0, function (d) {
        MjClient.data.sData.tData = d.tData;
        MjClient.data.sData.tData.tState = TableState.waitPut;
        var player = MjClient.playui.getPlayerInfoByOff();
        if(player.mjhand && player.mjhand.length % 3 === 2){
            player.eatFlag = d.eatFlag;
            player.mjState = d.tData.tState;
        }
    }],

    user_treasure_activity:[0, function(d){
        MjClient.duoBaoPrizeData = d;
    }],

    waitGeFan: [0, function (d) {
        var sData = MjClient.data.sData;
        var tData = sData.tData;

        tData.tState = TableState.waitJiazhu;

        for (var uid in sData.players) {
            sData.players[uid].mjState = TableState.waitJiazhu;
        }

        tData.curPlayer = d.curPlayer;
        tData.geState = d.geState;
    }],

    s2cGeFan: [0, function (d) {
        var player = getUIPlayerByUID(d.uid);
        player.geState = d.geState;
    }],

    s2cDispatchDiCards: [0, function (d) {
        var tData = MjClient.data.sData.tData;
        var player = getUIPlayerByUID(d.uid);
        
        if (player && player.mjhand) {
            var diCardsLength = tData.diCards.length;
            var addCards = tData.diCards.slice(diCardsLength / 2 * d.part,diCardsLength / 2 * (d.part + 1));

            player.mjhand = player.mjhand.concat(addCards);
            player.handCount = player.mjhand.length;
        }

        if (d.gaiPaiUid) {
            player = getUIPlayerByUID(d.gaiPaiUid);
            player.gaiPai = true;
        }
    }],

    HZUpdateData: [0, function (d) {
        var sData = MjClient.data.sData;
        var tData = sData.tData;

        cc.log( "+++++++HZUpdateData", JSON.stringify(d));
        if(d.chuoCards){
            for (var uid in sData.players) {
                sData.players[uid].chuoCards = d.chuoCards[uid];
            }
        }
        
    }],

    HZSelectPut: [0, function(d) {
        var sData = MjClient.data.sData;
        if (!sData) return;
        sData.tData = d.tData;
        var tData = sData.tData;
        var pl = sData.players[d.uid];
        pl.mjState = tData.tState;
        pl.selectPutState = d.selectPutState;
    }],

    HZFanJiang: [0, function(d) {
        MjClient.data.sData.tData = d.tData;
    }],

    HZPutCardDir: [0, function(d) {
        var sData = MjClient.data.sData;
        if(sData) {
            for (var uid in sData.players) {
                if(d[uid]) {
                    sData.players[uid].putCardDir = d[uid];
                }
            }
        }
    }],
    waitVieGuan:[0,function (d) {
        cc.log('Nothing to do !')
    }],
    pkVieGuan:[0,function (d) {
        var sData = MjClient.data.sData;
        var tData = sData.tData;
        if (d.vieGuanState == 1)tData.areaSelectMode.firstHongTao3 = false;
        //cc.log('Nothing to do !')
    }],
    setLaizi:[0,function (d) {
        cc.log('Nothing to do !')
    }],
    //阳新麻将仰牌
    MJCanYangCard:[0, function(d){
        var sData = MjClient.data.sData;
        if(!sData) return;
        var tData = sData.tData;
        tData.canYangNum = d.canYangNum;
       
        var yangInfo = (d.yangInfo || {});
        for(var uid in yangInfo){
            sData.players[uid].yangStatus = yangInfo[uid];
        }

        if(d.canYangNum == 0){
            tData.cardNext += 1;
            tData.hunCard = d.hunCard;
            var zhuangPlayer = sData.players[tData.uids[tData.zhuang]];
            zhuangPlayer.eatFlag = d.eatFlag;
            zhuangPlayer.mjput = zhuangPlayer.mjput || [];
            var laiZiPi = tData.hunCard - 1;
            if(tData.hunCard > 30){
                if(tData.hunCard == 71){
                    laiZiPi = 91;
                }else{
                    laiZiPi = tData.hunCard - 10;
                }
            }else{
                var color = Math.floor(tData.hunCard / 10);
                var value = tData.hunCard % 10;
                value -= 1;
                if(value == 0) value = 9;
                laiZiPi = color * 10 + value;
            }
            zhuangPlayer.mjput.push(laiZiPi);
        }
    }],

    //阳新麻将玩家仰通知
    MJYangCard: [0, function(d){
        var sData = MjClient.data.sData;
        if(!sData) return;
        var tData = sData.tData;
        d = d || {};
        var yangPlayer = sData.players[d.uid];
        tData.canYangNum = d.canYangNum;
        if(yangPlayer.yangStatus > 0 && yangPlayer.yangStatus == d.mjchi.length / 3){
            yangPlayer.yangStatus = 0;
            for (var i = 0; i <  d.mjchi.length; i++){
                if(d.uid == SelfUid()){
                    yangPlayer.mjhand.splice(yangPlayer.mjhand.indexOf(d.mjchi[i]), 1);
                }
                if(i % 3 == 0){
                    yangPlayer.pengchigang["chi"] = yangPlayer.pengchigang["chi"] || [];
                    yangPlayer.pengchigang["chi"].push({pos: tData.uids.indexOf(yangPlayer.info.uid), card: d.mjchi[i]});
                }
            }
            yangPlayer.mjchi = yangPlayer.mjchi || [];
            yangPlayer.mjchi = yangPlayer.mjchi.concat(d.mjchi);
           
        }
        if(d.canYangNum == 0){
            tData.cardNext += 1;
            tData.hunCard = d.hunCard;
            var zhuangPlayer = sData.players[tData.uids[tData.zhuang]];
            zhuangPlayer.mjput = zhuangPlayer.mjput || [];
            zhuangPlayer.eatFlag = d.eatFlag;
            var laiZiPi = tData.hunCard - 1;
            if(tData.hunCard > 30){
                if(tData.hunCard == 71){
                    laiZiPi = 91;
                }else{
                    laiZiPi = tData.hunCard - 10;
                }
            }else{
                var color = Math.floor(tData.hunCard / 10);
                var value = tData.hunCard % 10;
                value -= 1;
                if(value == 0) value = 9;
                laiZiPi = color * 10 + value;
            }
            zhuangPlayer.mjput.push(laiZiPi);
        }
    }],

    waitLiangCard: [0, function (d) {
        if(d && d.tData) {
            MjClient.data.sData.tData = d.tData;
        }
    }],

    MJLiangPai: [0, function (d) {
        var sData = MjClient.data.sData;
        if(sData.players[d.uid]) {
            sData.players[d.uid].mjhand = d.mjhand;
            sData.players[d.uid].liangCards = d.liangCards;
        }
    }],

    MJLiangPaiFinish: [0, function (d) {
        var sData = MjClient.data.sData;
        sData.tData.tState = TableState.waitPut;
        for (var uid in sData.players) {
            sData.players[uid].mjState = TableState.waitPut;
        }
    }],
    //靖州麻将拦胡消息
    MJGrabHu: [0, function(d){
        var sData = MjClient.data.sData;
        var tData = sData.tData;
        
        tData.tState = TableState.waitEat;
        for(var i = 0, len = tData.uids.length; i < len; i++){
            var player = sData.players[tData.uids[i]];
            player.eatFlag = 0;
            player.mjState = TableState.waitCard;
            player["grabInfo"] = null;
        }

        var pl = sData.players[d.uid];
        var grabInfo = d.canGrabInfo;
        if(grabInfo && pl){
            tData.canGrabInfo = grabInfo;
            pl.mjState = TableState.waitEat;
            pl.eatFlag = 8;
        }
    }],
    //公安花牌捏牌.后续字牌玩法死手可以统一使用
    HZAutoSkip: [0, function(d) {
        var sData = MjClient.data.sData;
        var pl = sData.players[d.uid + ""];
        if (pl) {
            pl.isDead = d.isDead;
            pl.eatFlag = 0;
        }
    }],

    // 展示庄家癞子皮牌
    showLaiZiPi: [0, function (d) {

    }],

    // 卡字胡过
    MJKaHuPass: [0, function (d) {
        var sData = MjClient.data.sData;
        var uid = d.uid;
        var pl = sData.players[uid];
        pl.mjState = TableState.waitPut;
        sData.tData.tState = TableState.waitPut;
    }],

    waitFan: [0,function (d) {
        MjClient.data.sData.tData.tState = TableState.waitJiazhu;
    }],

    MJFan: [0, function (d) {
        var sData = MjClient.data.sData;
        var pl = sData.players[d.uid];
        pl.isFan = d.isFan;
    }],

    // 大结算 成长经验
    game_finished_incr_empirical:[0,function(d){
        MjClient.showToastEXP(d);
    }],

    //xdx
        //获取剩余牌数
        MJRestCard: [0, function (d) {

        }],
    
        //做牌
        MJGetCard: [0, function (d) {
    
        }],
    
        //查看他人手牌
        pkShowCard: [0, function (d) {
    
        }],
};