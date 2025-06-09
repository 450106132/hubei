var roundRule_ziPai = cc.Layer.extend({
    rulesArr:null,
    jsBind:{
        layout_panel:{
            _layout: [[1, 0.51],[isIPhoneX() ? 0.045 : 0.015, 0.24],[0, 0]],
            img_title:{
                _run:function () {
                    this.zOrder = -1;
                }
            },
            list_rule:{
                text_rule:{
                    _visible:false
                },
                _run:function () {
                    MjClient.playui.roundRule.initRules(this);
                },
            },
            _event:{
                EZP_rule: function(){
                    this.visible = !this.visible;
                },
                initSceneData: function(eD) {
                    this.visible = MjClient.playui.roundRule.checkRuleVisible();
                },
                mjhand:function () {
                    if(MjClient.rePlayVideo == -1){
                        this.visible = false;
                    }else{
                        this.runAction(cc.sequence(cc.delayTime(3), cc.callFunc(()=>{
                            this.visible = false;
                        })));
                    }
                },
                startShuffleCards: function() {
                    this.visible = false;
                },
                waitJiazhu: function() {
                    this.visible = false;
                },
            }
        }
    },
    ctor:function (rulesArr) {
        this._super();
        this.rulesArr = this.transformRulesArr(rulesArr);
        var ui = ccs.load("roundRule_ziPai.json");
        MjClient.playui.roundRule = this;
        BindUiAndLogic(ui.node, this.jsBind);
        this.addChild(ui.node);
    }
});

roundRule_ziPai.prototype.transformRulesArr = function(rulesArr) {
    var tempRulesArr = [];
    for(var i = 0; i < rulesArr.length; i++){
        if(rulesArr[i].length > 10){
            tempRulesArr.push(rulesArr[i].slice(0, rulesArr[i].length / 2));
            tempRulesArr.push(rulesArr[i].slice(rulesArr[i].length / 2, rulesArr[i].length));
        }else{
            if(i == rulesArr.length - 1){
                tempRulesArr.push(rulesArr[i]);
            }else{
                if(rulesArr[i].length + rulesArr[i + 1].length > 10){
                    tempRulesArr.push(rulesArr[i]);
                }else{
                    tempRulesArr.push(rulesArr[i] + ", " + rulesArr[i + 1]);
                    i++;
                }
            }
        }
    }
    return tempRulesArr;
};

roundRule_ziPai.prototype.checkRuleVisible = function() {
    var tData = MjClient.data.sData.tData;
    if(MjClient.rePlayVideo != -1){
        return true;
    }
    if (tData.tState == TableState.waitJoin || tData.tState == TableState.waitReady || tData.tState == TableState.isReady) {
        return true;
    }
    return false;
};

roundRule_ziPai.prototype.initRules = function(node) {
    var text_rule = node.getChildByName("text_rule");
    for(var i = 0; i < this.rulesArr.length; i++){
        var item = text_rule.clone();
        item.visible = true;
        item.setString(this.rulesArr[i]);
        node.insertCustomItem(item,i);
    }
    node.setScrollBarEnabled(true);
};

//设置文本参数 param = {color:[], size:.., font:...}
roundRule_ziPai.prototype.setTextParams = function(obj) {
    if(!obj) {
        return;
    }
    var pnlList = this.jsBind._node.getChildByName("layout_panel").getChildByName("list_rule");
    var items = pnlList.getItems();
    for(var i = 0; i < items.length; i++) {
        var txt = items[i];
        if(obj.color) {
            txt.setColor(obj.color);
        }
        if(obj.size) {
            var oldRenderSize = txt.getVirtualRendererSize();
            txt.setFontSize(obj.size);
            //字体变大可能超高宽
            var size = txt.getVirtualRendererSize();
            if (size.height > oldRenderSize.height) {
                txt.height *= size.height / oldRenderSize.height;
                if (size.width > txt.width) {
                    //换行
                    txt.height *= 2;
                }
            }
        }
    }
}

roundRule_ziPai.getRoundRules = function () {
    var tData = MjClient.data.sData.tData;
    tData.areaSelectMode.appType = MjClient.getAppType();
    var areaSelectMode = JSON.parse(JSON.stringify(tData.areaSelectMode));
    var rulesArr = [];

    // 房卡房间的房间等级名称
    var fangkaRoomLevelName = FriendCard_Common.getFangkaRoomLevelName();
    if (fangkaRoomLevelName)
        rulesArr.push(fangkaRoomLevelName + "房间");

    for (var k in areaSelectMode) {
        var str = getGameCnDesc(tData.gameType, k, areaSelectMode[k], areaSelectMode);
        if(cc.isArray(str))
        {
            for(var i = 0; i < str.length; i++)
            {
                rulesArr.push(str[i]);
            }
        }
        else if (str) {
            rulesArr.push(str);
        }
    }
    return rulesArr;
};