
var CreateRoomNode_qiChunDaGong = CreateRoomNode.extend({
    setKey:function()
    {
        this.localStorageKey.KEY_QICHUNDAGONG_showHandCount    = "_QICHUNDAGONG_SHOW_COUNT";           //是否展示手牌 
        this.localStorageKey.KEY_QICHUNDAGONG_catPartnerCards  = "_QICHUNDAGONG_catPartnerCards";

        this.setExtraKey({
            jieSuanDiFen: "_QICHUNDAGONG_jiesuandifen",
            tuoGuan: "QICHUNDAGONG_TUO_GUAN",          //托管
        });

    },
    initAll:function(IsFriendCard)
    {
        if (!IsFriendCard)
            this.setKey();
        this.bgNode = ccs.load("bg_qiChunDaGong.json").node;
        this.addChild(this.bgNode);
        this.bg_node = this.bgNode.getChildByName("bg_qiChunDaGong").getChildByName("view");
        if(!this.bg_node) this.bg_node = this.bgNode.getChildByName("bg_qiChunDaGong");

        this.isAdjusted = false;
    },

    initPlayNode:function()
    {
        var _bg_Node = this.bg_node;

        var _playWay = _bg_Node.getChildByName("play_way");
        if (!_playWay) {
            _playWay = _bg_Node.getParent().getChildByName("play");
        }

        //展示手牌
        this._playNode_showLeft_0 = _playWay.getChildByName("play_showLeft0");
        this._playNode_showLeft_1 = _playWay.getChildByName("play_showLeft1");
        var nodeListrule = [];
        nodeListrule.push( this._playNode_showLeft_0 );
        nodeListrule.push( this._playNode_showLeft_1 );

        this._playNode_showLeft_radio = createRadioBoxForCheckBoxs(nodeListrule, this.radioBoxSelectCB);
        this.addListenerText(nodeListrule,this._playNode_showLeft_radio);
        this.NodeList_showLeft = nodeListrule

        //旁观
        this._playNode_spectator0 = _playWay.getChildByName("paly_spectator0");
        this._playNode_spectator1 = _playWay.getChildByName("paly_spectator1");
        var _nodeList = [];
        _nodeList.push( this._playNode_spectator0 );
        _nodeList.push( this._playNode_spectator1 );

        this._playNode_spectator_radio = createRadioBoxForCheckBoxs(_nodeList, this.radioBoxSelectCB);
        this.addListenerText(_nodeList,this._playNode_spectator_radio);
        this.NodeList_spectator = _nodeList;
        
        this.initExtraPlayNode(_playWay);
    },

    setPlayNodeCurrentSelect:function(isClub)
    {
        var value;
        if (isClub)
            value = this.getNumberItem("showHandCount", 1);
        else
            value = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_QICHUNDAGONG_showHandCount, 1);
        this._playNode_showLeft_radio.selectItem(value)
        this.radioBoxSelectCB(value, this.NodeList_showLeft[value], this.NodeList_showLeft);

        var value;
        if (isClub)
            value = this.getNumberItem("catPartnerCards", 0);
        else
            value = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_QICHUNDAGONG_catPartnerCards, 0);
        this._playNode_spectator_radio.selectItem(value)
        this.radioBoxSelectCB(value, this.NodeList_spectator[value], this.NodeList_spectator);

        this.setExtraPlayNodeCurrentSelect(isClub);
    },
    getSelectedPara:function()
    {
        var para = {};
        para.gameType             = MjClient.GAME_TYPE.QI_CHUN_DA_GONG;
        para.maxPlayer            = 4;
        para.showHandCount        = this._playNode_showLeft_radio.getSelectIndex();  // 0: 不显示余牌  1: 显示余牌
        para.catPartnerCards      = this._playNode_spectator_radio.getSelectIndex(); // 0: 可看队友牌  1: 不可看

        if (!this._isFriendCard) {
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_QICHUNDAGONG_showHandCount, para.showHandCount);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_QICHUNDAGONG_catPartnerCards, para.catPartnerCards);
        }

        this.getExtraSelectedPara(para);

        cc.log("createara: " + JSON.stringify(para));
        return para;
    }
});