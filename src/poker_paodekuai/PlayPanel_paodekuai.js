/**
 * Created by Administrator on 2017/3/9.
 */

var PlayLayer_paodekuai = PlayLayer_PDK.extend({
    getJsBind: function() {
        return {
            wait: {
                _run:function() {
                    this.visible = true;
                },
                getRoomNum: {
                    _run:function(){
                        setWgtLayout(this, [0.18, 0.18],[0.8, 0.16],[0, 0]);
                    },
                    _visible:function()
                    {
                        return !MjClient.remoteCfg.guestLogin;
                    },
                    _click: function() {
                        getPlayingRoomInfo(1);
                        MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Fuzhifangjianxinxi", {uid:SelfUid(), gameType:MjClient.gameType});

                    }
                },
                wxinvite: {
                    _layout: [
                        [0.18, 0.18],[0.8, 0.3],[0, 0]
                    ],
                    _click: function() {
                        MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Yaoqingweixinhaoyou", {uid:SelfUid(), gameType:MjClient.gameType});

                        getPlayingRoomInfo(2);
                    },
                    _visible:function()
                    {
                        return !MjClient.remoteCfg.guestLogin;
                    }
                },
                delroom: {
                    _run:function(){
                        // if (isIPhoneX()) {
                        //     setWgtLayout(this, [0.11, 0.11],[0.1, 0.45],[0, 0]);
                        // }
                        // else {
                        //     setWgtLayout(this, [0.11, 0.11],[0.05, 0.45],[0, 0]);
                        // }
                    },
                    _click: function() {
                        MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Jiesanfangjian", {uid:SelfUid(), gameType:MjClient.gameType});

                        MjClient.delRoom(true);
                    },
                    _event: {
                        waitReady: function() {
                            this.visible = true;
                        }
                    }
                },
                backHomebtn: {
                    _run:function(){
                        // if (isIPhoneX()) {
                        //     setWgtLayout(this, [0.11, 0.11],[0.1, 0.6],[0, 0]);
                        // }
                        // else {
                        //     setWgtLayout(this, [0.11, 0.11], [0.05, 0.6], [0, 0]);
                        // }
                    },
                    _click: function(btn) {
                        MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Likaifangjian", {uid:SelfUid(), gameType:MjClient.gameType});

                        var sData = MjClient.data.sData;
                        if (sData) {
                            if (IsRoomCreator()) {
                                MjClient.showMsg("返回大厅房间仍然保留\n赶快去邀请好友吧",
                                    function() {
                                        MjClient.leaveGame();
                                    },
                                    function() {});
                            } else {
                                MjClient.showMsg("确定要退出房间吗？",
                                    function() {
                                        MjClient.leaveGame();
                                    },
                                    function() {});
                            }
                        }

                    },
                    _event: {
                        waitReady: function() {
                            this.visible = true;
                        }
                    }
                },
                _event: {
                    onlinePlayer: function() {
                        if( IsAllPlayerReadyState() ) {
                            this.getChildByName('delroom').visible = false;
                            this.getChildByName('backHomebtn').visible = false;
                        } 
                    },
                    initSceneData: function(eD) {
                        var isWaitReady = eD.tData.tState == TableState.waitReady;
                        this.getChildByName('getRoomNum').visible = IsInviteVisible() && !MjClient.remoteCfg.guestLogin;
                        this.getChildByName('wxinvite').visible = IsInviteVisible() && !MjClient.remoteCfg.guestLogin;
                        this.getChildByName('delroom').visible = IsInviteVisible() || isWaitReady;
                        this.getChildByName('backHomebtn').visible = IsInviteVisible() || isWaitReady;
                    },
                    addPlayer: function(eD) {
                        var isWaitReady = eD.tData.tState == TableState.waitReady;
                        console.log(">>>>>> play add player >>>>");
                        this.getChildByName('getRoomNum').visible = IsInviteVisible() && !MjClient.remoteCfg.guestLogin;
                        this.getChildByName('wxinvite').visible = IsInviteVisible() && !MjClient.remoteCfg.guestLogin;
                        this.getChildByName('delroom').visible = IsInviteVisible() || isWaitReady;
                        this.getChildByName('backHomebtn').visible = IsInviteVisible() || isWaitReady;
                    },
                    removePlayer: function(eD) {
                        var isWaitReady = eD.tData.tState == TableState.waitReady;
                        this.getChildByName('getRoomNum').visible = !MjClient.remoteCfg.guestLogin;
                        this.getChildByName('wxinvite').visible = !MjClient.remoteCfg.guestLogin;
                        this.getChildByName('delroom').visible = IsInviteVisible() || isWaitReady;
                        this.getChildByName('backHomebtn').visible = IsInviteVisible() || isWaitReady;
                    }
                }
            },
        }
    },
    ctor: function() {
        this._super(res.Play_paodekuai_json);

        if(MjClient.getAppType() ==  MjClient.APP_TYPE.QXJSMJ)
        {
            MJ_setWaitBtn(GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_DE_KUAI);
        }
        else {
            // 俱乐部返回大厅功能：by_jcw
            addClub_BackHallBtn(true);
        }

        MJ_setReadyBtn(PKPassConfirmToServer_card);
        // 在亲友圈房间中添加邀请亲友圈牌有一起对局
        addClubYaoqingBtn();

        return true;
    }
});

/**
 * 拼接游戏玩法及付费信息
 * @function
 * @return {String}
 */
PlayLayer_paodekuai.prototype.getGameInfoString = function(param)
{
    var tData = MjClient.data.sData.tData;
    var str = "";

    if (param != "roundInfo")
        str += MjClient.MaxPlayerNum == 3 ? "三人玩," : "两人玩,";
    str += tData.areaSelectMode.isZhaDanFanBei ? "炸弹翻倍," : "";
    str += tData.areaSelectMode.mustPutHongTaoSan ? "先出红桃三," : "";
    str += tData.areaSelectMode.isPlayerShuffle == 1 ? "手动切牌," : "系统切牌,";

    if (typeof(tData.areaSelectMode.fengDing) == "number") {
        switch (tData.areaSelectMode.fengDing)
        {
            case 1:
                str += "30/32分封顶,";
                break;
            case 2:
                str += "60/64分封顶,";
                break;
        }
    }
    
    str += tData.areaSelectMode.mustPut ? "能管必管," : "";
    if (param != "roundInfo") 
        str += tData.areaSelectMode.showCardNumber ? "显示牌数," : "";

    if(tData.areaSelectMode.fanBei == 1)
    {
        str += "小于" + tData.areaSelectMode.fanBeiScore + "分翻倍,";
    }

    if(tData.areaSelectMode.trustTime > 0)
    {
        str += Math.floor(tData.areaSelectMode.trustTime/60) + "分钟,";
    }

    if (param != "roundInfo")
    {
        switch (tData.areaSelectMode.payWay)
        {
            case 0:
                str += "房主付";
                break;
            case 1:
                str += "AA付";
                break;
            case 2:
                str += "大赢家付";
                break;
        }
    }

    if (str.charAt(str.length - 1) == ",")
        str = str.substring(0, str.length - 1);
    


    //比赛场
    var BSStr = "";
    if(tData.matchId){
        BSStr = ",10秒出牌";
        str += BSStr;
        str = GameCnName[MjClient.gameType]+","+str;
    }
    return str;
};

PlayLayer_paodekuai.prototype.reLoadOptBtnRes = function() {
    //出牌按钮
    if(this._btnPutCard) this._btnPutCard.loadTextures("playing/paodekuaiTable_new/chupai.png", null, "playing/paodekuaiTable_new/chupai_2.png");
    //提示按钮  
    if(this._btnHimt) this._btnHimt.loadTextures("playing/paodekuaiTable_new/tishi.png", null, "playing/paodekuaiTable_new/tishi_s.png");
     //不出按钮   
    if(this._btnNoPut) this._btnNoPut.loadTextures("playing/paodekuaiTable_new/buchu.png", null, "playing/paodekuaiTable_new/buchu_s.png");
}