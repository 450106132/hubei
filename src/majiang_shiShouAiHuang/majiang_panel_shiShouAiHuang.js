// 石首捱晃
var majiang_panel_shiShouAiHuang = majiang_panel_hubei.extend({
    jsonFile: "Play_shiShouAiHuang.json",
    ctor: function(){
        this._super(majiang_panel_shiShouAiHuang, this.jsonFile);
    },

    //override
    getJsBind: function(){
        var jsBind = {
            _event: {
                MJPut: function(msg) {
                    var selfUid = MjClient.playui.getSelfUid();
                    var unableKaZiHu = msg.unableKaZiHu;
                    if (unableKaZiHu[selfUid]) {
                        MjClient.showToast("卡字胡接炮需满足卡三张");
                    }
                },
                MJHu: function(msg) {
                    var selfUid = MjClient.playui.getSelfUid();
                    if (msg.canKaHuPlayer != null && selfUid == msg.canKaHuPlayer && selfUid != msg.uid) {
                        MjClient.playui.updatePlayerEatBtn();
                    }
                },
            }
        };
        return jsBind;
    }
});

// Override
majiang_panel_shiShouAiHuang.prototype.isShowTextPiao = function(){
    return false;
};

// Override [createEndOnePanel 创建小结算界面]
majiang_panel_shiShouAiHuang.prototype.createEndOnePanel = function(){
    return new majiang_winGamePanel_shiShouAiHuang();
};

// Override
majiang_panel_shiShouAiHuang.prototype.checkWhenTouchBegan = function(cardNode){
    if(MjClient.movingCard !== null && MjClient.movingCard != cardNode){
        return true;
    } 
    var handCount = this.getCardNodeCountByName(cardNode.getParent(), this.HandleCardType.Hand);

    if (handCount % 3 == 2 && !this.isTurnMe()) {
        MjClient.showToast("请等待其他玩家操作");
    }

    if(!(handCount % 3 == 2 && this.isTurnMe() || handCount % 3 == 1 && !this.isTurnMe())){
        return true;
    }

    // 自动摸打
    var player = MjClient.playui.getPlayerInfoByName("node_down");
    if (player.tPutCard && this.isTurnMe()) {
        if (!MjClient.Scene.ToastNodeArray || MjClient.Scene.ToastNodeArray.length == 0) {
            MjClient.showToast("出牌请先取消自动摸打");
        }
        return true;
    }

    return false;
};

// Override
majiang_panel_shiShouAiHuang.prototype.handleRoundEnd = function(){
    var tData = MjClient.data.sData.tData;
    var niaoCards = tData.mopai;
    var self = this;
    if(MjClient.playui.isInGame()) return;
    var showEndCards = function(){
        self.showBalanceLayer();
    };

    var action = cc.sequence(cc.delayTime(0.5),cc.callFunc(function(){
        self.showMjhandBeforeEndOne();
    }),cc.delayTime(0.5),cc.callFunc(showEndCards));
    action.setTag(1179);
    self.runAction(action);

    UIEventBind(null, this, "initSceneData", function(){
        self.stopActionByTag(1179);
    });
    UIEventBind(null, this, "LeaveGame", function(){
        self.stopActionByTag(1179); 
    });
};