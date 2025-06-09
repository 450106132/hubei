//当阳翻精 大结算
var GameOverLayer_dangYangFanJing = cc.Layer.extend({
    jsBind:{
        back:{
            text_roomId:{
                _run:function () {
                    this.ignoreContentAdaptWithSize(true);
                },
                _text: function(){
                    var sData=MjClient.data.sData;
                    var tData=sData.tData;
                    return "房间号:" + tData.tableid;
                }
            },
            text_roomInfo:{
                _run:function () {
                    this.ignoreContentAdaptWithSize(true);
                },
                _text: function(){
                    var sData=MjClient.data.sData;
                    var tData=sData.tData;
                    return tData.gameCnName + "    " + "第" + MjClient.playui.curRound + "/" + tData.roundAll + "局";
                }
            },
            text_startTime:{
                _run:function () {
                    this.ignoreContentAdaptWithSize(true);
                    var createTime;
                    if(createTime){
                        this.setString("开始" + "    " + MjClient.dateFormat(new Date(parseInt(createTime)), 'yyyy-MM-dd hh:mm:ss'));
                    }else{
                        this.setString("");
                    }
                },
            },
            text_endTime:{
                _run:function () {
                    this.ignoreContentAdaptWithSize(true);
                },
                _text: function(){
                    return "结束" + "    " + MjClient.roundEndTime;
                }
            },
            btn_share:{
                _event:{
                    captureScreen_OK:function(){
                        if (MjClient.endallui.capture_screen != true)
                            return;
                        MjClient.endallui.capture_screen = false;
                        var writePath = jsb.fileUtils.getWritablePath();
                        var textrueName = "wxcapture_screen.png";
                        var savepath = writePath+textrueName;
                        MjClient.shareImageToSelectedPlatform(savepath);
                        this.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(function()
                        {
                            this.setTouchEnabled(true);
                        }.bind(this))));
                        if(MjClient.Scene.getChildByName("shareCode")) MjClient.Scene.removeChildByName("shareCode");
                    }
                }
            },
        } 
    },
    ctor:function (jsFile) {
        this._super();
        jsFile = jsFile || 'endAll_huaPai.json';
        var endallui = ccs.load(jsFile);
        BindUiAndLogic(endallui.node,this.jsBind);
        this.addChild(endallui.node);
        MjClient.endallui = this;

        var sData = MjClient.data.sData;
        var tData = sData.tData;

        var img_block = endallui.node.getChildByName("img_block");
        setWgtLayout(img_block,[1,1],[0.5,0.5],[0,0],true);

        var _back = endallui.node.getChildByName("back");
        setWgtLayout(_back,[1,1],[0.5,0.5],[0,0]);

        var layout_player = _back.getChildByName("layout_player");

        var img_player1 = layout_player.getChildByName("img_player1");
        var img_player2 = layout_player.getChildByName("img_player2");
        for(var i = 0; i < MjClient.data.sData.tData.maxPlayer; i++){
            var pl = MjClient.playui.getUIPlayer(i);
            var player;
            if(pl.winall >= 0){
                player = img_player1.clone();
            }else{
                player = img_player2.clone();
            }
            this.setPlInfo(player, pl);
            layout_player.addChild(player);
            player.x = (layout_player.width - MjClient.data.sData.tData.maxPlayer * player.width) / 2 + (i + 0.5) * player.width;
        }
        img_player1.visible = false;
        img_player2.visible = false;

        var btn_back =  _back.getChildByName("btn_back");
        btn_back.addTouchEventListener(function(sender,Type){
            switch (Type)
            {
                case ccui.Widget.TOUCH_ENDED:
                    if(MjClient.Scene.getChildByName("shareCode")) MjClient.Scene.removeChildByName("shareCode");
                    var clubInfoTable = getClubInfoInTable();
                    if (clubInfoTable) {
                        if (!MjClient.FriendCard_main_ui)
                            MjClient.Scene.addChild(new FriendCard_main(clubInfoTable.clubId));
                    }
                    MjClient.gamenet.request("pkplayer.handler.LeaveGame",{},function(rtn){});
                    delete MjClient.data.sData;
                    delete MjClient.gameType;
                    postEvent("LeaveGame");
                    if (!MjClient.enterui && !MjClient.FriendCard_main_ui)
                        MjClient.Scene.addChild(new EnterRoomLayer());

                    if(MjClient.endallui){
                        MjClient.endallui.removeFromParent(true);
                        MjClient.endallui = null;
                    }
                    break;
                default :
                    break;
            }
        },this);

        var btn_share =  _back.getChildByName("btn_share");
        btn_share.visible = !MjClient.remoteCfg.guestLogin && !tData.matchId;
        btn_share.addTouchEventListener(function(sender,Type){
            switch (Type)
            {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.shareMultiPlatform(MjClient.systemConfig.sharePlatforms, function()
                    {
                        COMMON_UI.getShareCodeTexture(tData.tableInfoUrl,_back,function(){
                            if(MjClient.endallui && cc.sys.isObjectValid(MjClient.endallui)){
                                MjClient.endallui.capture_screen = true;
                            }
                            btn_share.setTouchEnabled(false);
                        });
                    });
                    break;
                default :
                    break;
            }
        },this);
    },
});

GameOverLayer_dangYangFanJing.prototype.setPlInfo = function (node, pl) {
    var text_name = node.getChildByName("text_name");
    text_name.setString(getNewName(unescape(pl.info.nickname)+""));

    var text_id = node.getChildByName("text_id");
    text_id.setString(pl.info.uid + "");

    var text_score = node.getChildByName("text_score");
    text_score.ignoreContentAdaptWithSize(true);
    text_score.setString((pl.winall >= 0 ? "+" : "") + pl.winall);

    MjClient.playui.setPlayerHead(node.getChildByName("img_head"), pl);
    MjClient.playui.setOffLine(node.getChildByName("img_head"), pl);
};
