
var CreateRoomNode_daYe510K = CreateRoomNode.extend({
    setKey:function()
    {
        this.localStorageKey.KEY_DY510K_laiziOption       = "_DAYE510K_laiziOption";     //花牌数量
        this.localStorageKey.KEY_DY510K_showHandCount            = "_DAYE510K_SHOW_COUNT";           //是否展示手牌 

        this.localStorageKey.KEY_DY510K_fourPure510K        = "_DAYE510K_fourPure510K";         // 4副纯510K 
        this.localStorageKey.KEY_DY510K_fourJokerCombination        = "_DAYE510K_fourJokerCombination";  //4王组合
        this.localStorageKey.KEY_DY510K_fourJokerHuaCard        = "_DAYE510K_fourJokerHuaCard";         // 4王+花

        this.localStorageKey.KEY_DY510K_diFen                 = "_DAYE510K_DIFEN";   
        this.localStorageKey.KEY_DY510K_useJiPaiQi    = "_DAYE510K_useJiPaiQi";      //七喜   
        this.localStorageKey.KEY_DY510K_fangHeShou    = "_DAYE510K_eightX";      //八喜
        this.localStorageKey.KEY_DY510K_catPartnerCards    = "_DAYE510K_catPartnerCards";      //pangugang 
        this.localStorageKey.KEY_DY510K_isCustomBaseScore = "_DAYE510K_isCustomBaseScore";

        this.setExtraKey({
            jieSuanDiFen: "_DAYE510K_jiesuandifen",
            tuoGuan: "DAYE510K_TUO_GUAN",          //托管
            trustWhole: "DAYE510K_TRUST_WHOLE",  //整局托管
            trustWay: "DAYE510K_TRUST_WAY"  //托管方式
        });

    },
    initAll:function(IsFriendCard)
    {
        if (!IsFriendCard)
            this.setKey();
        this.bgNode = ccs.load("bg_DaYe510K.json").node;
        this.addChild(this.bgNode);
        this.bg_node = this.bgNode.getChildByName("bg_chongYangDaGun").getChildByName("view");
        if(!this.bg_node) this.bg_node = this.bgNode.getChildByName("bg_chongYangDaGun");

        this.isAdjusted = false;
    },

    initPlayNode:function()
    {
        // if(MjClient.APP_TYPE.QXJSMJ == MjClient.getAppType())
        // {
        //     this._super();
        // }

        var _bg_Node = this.bg_node;
    
        var _playWay = _bg_Node.getChildByName("play_way");
        if (!_playWay) {
            _playWay = _bg_Node.getParent().getChildByName("play");
        }
        this._playNode_basescore_0 = _playWay.getChildByName("play_difen0");
        this._playNode_basescore_1 = _playWay.getChildByName("play_difen1");
        this._playNode_basescore_2 = _playWay.getChildByName("play_difen2");
        this._playNode_basescore_3 = _playWay.getChildByName("play_difen3");

        var _tempNode = this._playNode_basescore_3.getChildByName("text");
        MjClient._customBaseScoreNode = _tempNode;

        var callback = function(){
            MjClient._customBaseScoreNode = _tempNode;
            var _lay = MjClient.Scene.getChildByTag(783412509)
            if( _lay){
                _lay.removeFromParent();
                _lay = null;
            } 

            _lay = new CustomBaseScoreLayer();
            _lay.setTag(783412509);
            MjClient.Scene.addChild(_lay);
        };

        var nodeListfeng = [];
        nodeListfeng.push( this._playNode_basescore_0 );
        nodeListfeng.push( this._playNode_basescore_1 );
        nodeListfeng.push( this._playNode_basescore_2 );
        nodeListfeng.push( this._playNode_basescore_3 );
        this._playNode_basescore_list = nodeListfeng;

        this._playNode_basescore_radio = createRadioBoxForCheckBoxs(nodeListfeng,  function(index){
            this.radioBoxSelectCB(index, nodeListfeng[index], nodeListfeng);
            if(index == 3 ){
                callback();
            }
        }.bind(this));
        this.addListenerText(nodeListfeng,this._playNode_basescore_radio, function (index) {
                if(index == 3 ){
                    callback();
                }
            });

        var that = this;

        var _custom_bg = _playWay.getChildByName("custom_bg");
        _custom_bg.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    that._playNode_basescore_radio.selectItem(3)
                    that.radioBoxSelectCB(3, nodeListfeng[3], nodeListfeng);
                    callback();
                    break;
            }
        });

        //展示手牌
        this._playNode_showLeft_0 = _playWay.getChildByName("play_showLeft0");
        this._playNode_showLeft_1 = _playWay.getChildByName("play_showLeft1");
        var nodeListrule = [];
        nodeListrule.push( this._playNode_showLeft_0 );
        nodeListrule.push( this._playNode_showLeft_1 );

        this._playNode_showLeft_radio = createRadioBoxForCheckBoxs(nodeListrule, this.radioBoxSelectCB);
        this.addListenerText(nodeListrule,this._playNode_showLeft_radio);
        this.NodeList_showLeft = nodeListrule

        
        //花牌
        this._playNode_flowerCount_0 = _playWay.getChildByName("play_flowerCount0");
        this._playNode_flowerCount_1 = _playWay.getChildByName("play_flowerCount1");
        this._playNode_flowerCount_2 = _playWay.getChildByName("play_flowerCount2");
        var nodeListfan = [];
        nodeListfan.push( this._playNode_flowerCount_0 );
        nodeListfan.push( this._playNode_flowerCount_1 );
        nodeListfan.push( this._playNode_flowerCount_2 );

        this._playNode_flowerCount_radio = createRadioBoxForCheckBoxs(nodeListfan, this.radioBoxSelectCB);
        this.addListenerText(nodeListfan,this._playNode_flowerCount_radio);
        this.NodeList_laiziOption = nodeListfan;

        //旁观
        this._playNode_spectator0 = _playWay.getChildByName("paly_spectator0");
        this._playNode_spectator1 = _playWay.getChildByName("paly_spectator1");
        var _nodeList = [];
        _nodeList.push( this._playNode_spectator0 );
        _nodeList.push( this._playNode_spectator1 );

        this._playNode_spectator_radio = createRadioBoxForCheckBoxs(_nodeList, this.radioBoxSelectCB);
        this.addListenerText(_nodeList,this._playNode_spectator_radio);
        this.NodeList_spectator = _nodeList;


        this._playNode_7xi           = _playWay.getChildByName("play_7xi");
        this.addListenerText(this._playNode_7xi);
        this._playNode_7xi.addEventListener(this.clickCB, this._playNode_7xi);

        this._playNode_8xi           = _playWay.getChildByName("play_8xi");
        this.addListenerText(this._playNode_8xi);
        this._playNode_8xi.addEventListener(this.clickCB, this._playNode_8xi);


        // this._playNode_allJoker    = _playWay.getChildByName("play_allJoker");
        // this.addListenerText(this._playNode_allJoker);
        // this._playNode_allJoker.addEventListener(this.clickCB, this._playNode_allJoker);

        
        // this._play_Jokerandflower    = _playWay.getChildByName("play_Jokerandflower");
        // this.addListenerText(this._play_Jokerandflower);
        // this._play_Jokerandflower.addEventListener(this.clickCB, this._play_Jokerandflower);


        // this._play_510k    = _playWay.getChildByName("play_510k");
        // this.addListenerText(this._play_510k);
        // this._play_510k.addEventListener(this.clickCB, this._play_510k);

        this.difenAry = [0.1,0.2,0.3,0.4,0.5,1,2,3,4,5,6,7,8,9,10];
        this.initExtraPlayNode(_playWay);
    },

    initExtraPlayNode:function(_playWay){
        this._super(_playWay);

        for(var i = 0; i <this.trustWayNodeList.length; i++){
            if(this.trustWayNodeList[i]){
                this.trustWayNodeList[i].setVisible(false);
            }
        }
    },

    setPlayNodeCurrentSelect:function(isClub)
    {
        var isCustomBaseScore
        if (isClub){
            isCustomBaseScore = this.getBoolItem("isCustomBaseScore", false);
        }else{
            isCustomBaseScore = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_DY510K_isCustomBaseScore, false);
        }
        
        var _difen;

        if(!isCustomBaseScore){
            if (isClub)
                _difen = [5, 10, 20].indexOf(this.getNumberItem("diFen",5));
            else{
                _difen = [5, 10, 20].indexOf(util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_DY510K_diFen, 5));
            }
        }
        else{

            if(isClub){
                _difen = util.localStorageEncrypt.getNumberItem("diFen",30)
            }else{
                _difen = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_DY510K_diFen, 30)
            }

            MjClient._customValue[MjClient.createRoomNode._data.gameType] = _difen.toString();
            this._playNode_basescore_3.getChildByName("text").setString(_difen);
            _difen = 3;
        }
        
        this._playNode_basescore_radio.selectItem(_difen)
        this.radioBoxSelectCB(_difen, this._playNode_basescore_list[_difen], this._playNode_basescore_list);

        // 
        var value;
        if (isClub)
            value = this.getNumberItem("showHandCount", 0);
        else
            value = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_DY510K_showHandCount, 0);
        this._playNode_showLeft_radio.selectItem(value)
        this.radioBoxSelectCB(value, this.NodeList_showLeft[value], this.NodeList_showLeft);

        // 
        var _laiziOption;
        if (isClub)
            _laiziOption = this.getNumberItem("laiziOption", 0);
        else
            _laiziOption = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_DY510K_laiziOption, 0);
        this._playNode_flowerCount_radio.selectItem(_laiziOption)
        this.radioBoxSelectCB(_laiziOption, this.NodeList_laiziOption[_laiziOption], this.NodeList_laiziOption);

        //
        var value;
        if (isClub)
            value = this.getNumberItem("catPartnerCards", 0);
        else
            value = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_DY510K_catPartnerCards, 0);
        this._playNode_spectator_radio.selectItem(value)
        this.radioBoxSelectCB(value, this.NodeList_spectator[value], this.NodeList_spectator);

        var _7xi;
        if (isClub)
            _7xi = this.getBoolItem("fangHeShou", true);
        else
            _7xi = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_DY510K_fangHeShou, true);
        this._playNode_7xi.setSelected(_7xi);
        var text = this._playNode_7xi.getChildByName("text");
        this.radioTextColor(text,_7xi)


        var _8xi;
        if (isClub)
            _8xi = this.getBoolItem("useJiPaiQi", true);
        else
            _8xi = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_DY510K_useJiPaiQi, true);
        this._playNode_8xi.setSelected(_8xi);
        var text = this._playNode_8xi.getChildByName("text");
        this.radioTextColor(text,_8xi)

        // var _allJoker;
        // if (isClub)
        //     _allJoker = this.getBoolItem("fourJokerCombination", true);
        // else
        //     _allJoker = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_DY510K_fourJokerCombination, true);
        // this._playNode_allJoker.setSelected(_allJoker);
        // var text = this._playNode_allJoker.getChildByName("text");
        // this.radioTextColor(text, _allJoker);

        // var _selectcardsbyplayer;
        // if (isClub)
        //     _selectcardsbyplayer = this.getBoolItem("fourJokerHuaCard", true);
        // else
        //     _selectcardsbyplayer = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_DY510K_fourJokerHuaCard, true);
        // this._play_Jokerandflower.setSelected(_selectcardsbyplayer);
        // var text = this._play_Jokerandflower.getChildByName("text");
        // this.radioTextColor(text, _selectcardsbyplayer);

        // var _value;
        // if (isClub)
        //     _value = this.getBoolItem("fourPure510K", true);
        // else
        //     _value = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_DY510K_fourPure510K, true);
        // this._play_510k.setSelected(_value);
        // var text = this._play_510k.getChildByName("text");
        // this.radioTextColor(text, _value);

        this.setExtraPlayNodeCurrentSelect(isClub);
    },
    getSelectedPara:function()
    {
        var para = {};
        //if(this._nodeGPS) para.gps = this._nodeGPS.isSelected(); 
        para.gameType                               = MjClient.GAME_TYPE.DA_YE_510K;
        para.maxPlayer                              = 4;

        para.fangHeShou                                 = this._playNode_7xi.isSelected();
        para.useJiPaiQi                                 = this._playNode_8xi.isSelected();

        para.useJiPaiQi = false;//先屏蔽

        // para.fourJokerCombination                    = this._playNode_allJoker.isSelected();
        // para.fourJokerHuaCard                        = this._play_Jokerandflower.isSelected();
        // para.fourPure510K                            = this._play_510k.isSelected();

        para.showHandCount                           = this._playNode_showLeft_radio.getSelectIndex(); 
        para.laiziOption                              = this._playNode_flowerCount_radio.getSelectIndex(); 
        para.catPartnerCards                         = this._playNode_spectator_radio.getSelectIndex(); 
        para.diFen                                  = [5,10,20,-1][this._playNode_basescore_radio.getSelectIndex()];
        
        para.isCustomBaseScore                      = false;

        if(para.diFen == -1){
            para.diFen = parseInt(MjClient._customValue[MjClient.createRoomNode._data.gameType]);
            para.isCustomBaseScore = true;
        }

        if (!this._isFriendCard) {
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_DY510K_showHandCount, para.showHandCount);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_DY510K_laiziOption, para.laiziOption);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_DY510K_catPartnerCards, para.catPartnerCards);

            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_DY510K_useJiPaiQi, para.useJiPaiQi);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_DY510K_fangHeShou, para.fangHeShou);
            // util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_DY510K_fourJokerCombination, para.fourJokerCombination);
            // util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_DY510K_fourPure510K, para.fourPure510K);
            // util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_DY510K_fourJokerHuaCard, para.fourJokerHuaCard);

            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_DY510K_isCustomBaseScore, this._playNode_basescore_radio.getSelectIndex() == 3); 
            
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_DY510K_diFen, para.diFen); 
        }

        this.getExtraSelectedPara(para);

        cc.log("createara: " + JSON.stringify(para));
        return para;
    },
    setRoundNodeCurrentSelect:function()
    {
        this._super();
        if(MjClient.getAppType() != MjClient.APP_TYPE.QXXZMJ)
        {
            return;
        }
        var pPriceCfg = this.getPriceCfg();
        if(!pPriceCfg) return false;
        var selectItemNum = Object.keys(pPriceCfg).length;
        var _currentRoundState;

        if (this._isFriendCard && this.clubRule) {
            var roundNumObj = Object.keys(pPriceCfg).sort(function(a, b) {
                return a - b
            });
            _currentRoundState = roundNumObj.indexOf(this.clubRule.round + "");
            if (_currentRoundState != -1)
                _currentRoundState ++;
            else
                _currentRoundState = 2;
        }
        else {
            if (!this._isFriendCard){
				_currentRoundState = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_RondType, 2);
            }else{
                _currentRoundState = 2;
            }
            if(_currentRoundState > selectItemNum) _currentRoundState = selectItemNum;
            if(_currentRoundState == 3) _currentRoundState = 2;
        }

        for (var i=0; i<this.roundNodeArray.length && i<selectItemNum; i++)
        {
            var roundNode = this.roundNodeArray[i];
            if (cc.sys.isObjectValid(roundNode))
            {
                if (i+1 == _currentRoundState)
                {
                    roundNode.setSelected(true);
                    var text = roundNode.getChildByName("text");
                    this.selectedCB(text,true);
                }
                else
                {
                    roundNode.setSelected(false);
                }
            }
        }


        // 支付方式选项   默认选择_payWay
        var _payWay = 0;
        if (this._isFriendCard)
            _payWay = this.getNumberItem("payWay", 0);
        else
            _payWay = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_PayWay, 0);

        if(_payWay == 2 && MjClient.APP_TYPE.QXXZMJ === MjClient.getAppType())
        {
            _payWay = 0;
        }

        for (var i=0; i<this.payWayNodeArray.length; i++)
        {
            var payWayNode = this.payWayNodeArray[i];
            if (cc.sys.isObjectValid(payWayNode))
            {
                if (i == _payWay)
                {
                    payWayNode.setSelected(true);
                    var text = payWayNode.getChildByName("text");
                    this.selectedCB(text,true);
                }
                else
                {
                    payWayNode.setSelected(false);
                }
            }
        }

        cc.log("=======================xuzhou..=");
    }

});