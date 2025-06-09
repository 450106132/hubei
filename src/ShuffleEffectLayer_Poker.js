var ShuffleEffectLayer_Poker = cc.Layer.extend({
    jsBind: {
        _event: {
            mjhand: function(eD) {
                MjClient.playui.removeShuffleNode();
            }
        },
        back: {
            _layout: [[1, 1],[0.5, 0.5],[0, 0]],
        },
        effectNode : {
            _layout: [[1, 0],[0.5, 0.5],[0, 0]],
        }
    },
	ctor : function(){
        this._super();

        var node = ccs.load("shuffleEffect_poker.json").node;
        this.addChild(node);
        BindUiAndLogic(node, this.jsBind);

        this.effectNode = node.getChildByName("effectNode");
        this.msgTxt = this.effectNode.getChildByName("msgTxt");
	},

    playEffect : function(uid) {
        var sData = MjClient.data.sData;
        var pl = sData.players[uid];
        if(pl) {
            this.effectNode.removeChildByTag(923);

            this.msgTxt.setString(unescape(pl.info.nickname) + "正在洗牌...");
            var spineNode = createSpine("spine/shuffle_poker/pukepai.json", "spine/shuffle_poker/pukepai.atlas");
            spineNode.setAnimation(0, "animation", false);
            spineNode.setPosition(640,360);
            spineNode.setTag(923);
            //spineNode.setTimeScale(1.5);
            this.effectNode.addChild(spineNode);
        }
    }
});