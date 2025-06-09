var TrustLayer_ziPai = cc.Layer.extend({
    jsBind:{
        block:{
            _layout:[[1,1],[0.5,0.5],[0,0],true]
        },
        back:{
            _layout:[[1,1],[0.5,0.5],[0,0],true],
            trustBtn:{
                _click:function(){
                    // 所有牌局结束，发了也没用，直接关掉
                    if (MjClient.data.sData.tData.roundNum <= 0 && cc.sys.isObjectValid(MjClient.playui.trustLayer)) {
                        MjClient.playui.trustLayer.visible = false;
                    } else {
                        MjClient.gamenet.request("pkroom.handler.tableMsg", {
                            cmd: "cancelTrust"
                        });
                    }
                }
            },

            _event : {
                TZTrust : function(){
                    
                },
                PKPut: function(eD) {
                    
                },
                mjhand: function(eD) {
                    
                },
                initSceneData: function(eD) {
                    
                }
            }
        },
    },

    ctor : function(){
        this._super();

        var jsonFile = "trustLayer.json";
        var uiNode = ccs.load(jsonFile);
        this.addChild(uiNode.node);
        this._uiNode = uiNode.node
        BindUiAndLogic(uiNode.node,this.jsBind);
    }
});