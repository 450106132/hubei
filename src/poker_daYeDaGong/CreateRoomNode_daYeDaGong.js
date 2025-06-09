
var CreateRoomNode_daYeDaGong = CreateRoomNode.extend({
    setKey:function()
    {
        this.localStorageKey.KEY_DYDG_showHandCount            = "_DAYEDAGONG_SHOW_COUNT";           //是否展示手牌 
        this.localStorageKey.KEY_DYDG_diFen                 = "_DAYEDAGONG_DIFEN";   
        this.localStorageKey.KEY_DYDG_catPartnerCards    = "_DAYEDAGONG_catPartnerCards";      
        this.localStorageKey.KEY_DYDG_laiziPoint    = "_DAYEDAGONG_laiziPoint";       

        this.setExtraKey({
        });

    },
    initAll:function(IsFriendCard)
    {
        if (!IsFriendCard)
            this.setKey();
        this.bgNode = ccs.load("bg_DaYeDaGong.json").node;
        this.addChild(this.bgNode);
        this.bg_node = this.bgNode.getChildByName("bg_daYeDaGong").getChildByName("view");
        if(!this.bg_node) this.bg_node = this.bgNode.getChildByName("bg_daYeDaGong");

        this.isAdjusted = false;
    },

    initPlayNode:function()
    {
        var _bg_Node = this.bg_node;
    
        var _playWay = _bg_Node.getChildByName("play_way");
        if (!_playWay) {
            _playWay = _bg_Node.getParent().getChildByName("play");
        }


        this._playNode_laiziPoint0 = _playWay.getChildByName("paly_laiziPoint0");
        this._playNode_laiziPoint1 = _playWay.getChildByName("paly_laiziPoint1");
        var _nodeList = [];
        _nodeList.push( this._playNode_laiziPoint0 );
        _nodeList.push( this._playNode_laiziPoint1 );

        this._playNode_laiziPoint_radio = createRadioBoxForCheckBoxs(_nodeList, this.radioBoxSelectCB);
        this.addListenerText(_nodeList,this._playNode_laiziPoint_radio);
        this.NodeList_laiziPoint = _nodeList;


        this._playNode_catPartnerCards           = _playWay.getChildByName("play_catPartnerCards");
        this.addListenerText(this._playNode_catPartnerCards);
        this._playNode_catPartnerCards.addEventListener(this.clickCB, this._playNode_catPartnerCards);

        this._play_showHandCount    = _playWay.getChildByName("play_showHandCount");
        this.addListenerText(this._play_showHandCount);
        this._play_showHandCount.addEventListener(this.clickCB, this._play_showHandCount);

        this.initExtraPlayNode(_playWay);
    },
    setPlayNodeCurrentSelect:function(isClub)
    {
        //
        var value;
        if (isClub)
            value = this.getNumberItem("laiziPoint", 2);
        else
            value = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_DYDG_laiziPoint, 2);
        value = [2, 3].indexOf(value);
        this._playNode_laiziPoint_radio.selectItem(value)
        this.radioBoxSelectCB(value, this.NodeList_laiziPoint[value], this.NodeList_laiziPoint);

        var _catPartnerCards;
        if (isClub)
            _catPartnerCards = this.getBoolItem("catPartnerCards", true);
        else
            _catPartnerCards = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_DYDG_catPartnerCards, true);
        this._playNode_catPartnerCards.setSelected(_catPartnerCards);
        var text = this._playNode_catPartnerCards.getChildByName("text");
        this.radioTextColor(text,_catPartnerCards)

        
        if (isClub)
            _value = this.getBoolItem("showHandCount", true);
        else
            _value = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_DYDG_showHandCount, true);
        this._play_showHandCount.setSelected(_value);
        var text = this._play_showHandCount.getChildByName("text");
        this.radioTextColor(text, _value);

        this.setExtraPlayNodeCurrentSelect(isClub);
    },
    getSelectedPara:function()
    {
        var para = {};
        //if(this._nodeGPS) para.gps = this._nodeGPS.isSelected(); 
        para.gameType                               = MjClient.GAME_TYPE.DA_YE_DA_GONG;
        para.maxPlayer                              = 4;

        para.catPartnerCards                          = this._playNode_catPartnerCards.isSelected();
        para.showHandCount                            = this._play_showHandCount.isSelected();
        para.laiziPoint                             = [2, 3][this._playNode_laiziPoint_radio.getSelectIndex()]; 
        //para.diFen                                  = [1,3,5,-1][this._playNode_basescore_radio.getSelectIndex()];


        if (!this._isFriendCard) {
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_DYDG_laiziPoint, para.laiziPoint);

            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_DYDG_catPartnerCards, para.catPartnerCards);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_DYDG_showHandCount, para.showHandCount);
            
            //util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_DYDG_diFen, para.diFen);
        }

        this.getExtraSelectedPara(para);

        cc.log("createara: " + JSON.stringify(para));
        return para;
    },
    setRoundNodeCurrentSelect:function()
    {
        this._super();
    }

});