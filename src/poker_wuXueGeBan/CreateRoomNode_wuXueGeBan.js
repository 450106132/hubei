
var CreateRoomNode_wuXueGeBan = CreateRoomNode.extend({
    setKey:function()
    {
        this.localStorageKey.KEY_WXGB_playerNumber       = "_WUXUEGEBAN_PLAYER_NUMBER";     //玩家数量
        this.localStorageKey.KEY_WXGB_fan                = "_WUXUEGEBAN_FAN";               //反
        this.localStorageKey.KEY_WXGB_hunShuiRule               = "_WUXUEGEBAN_RULE";           //浑水规则
        this.localStorageKey.KEY_WXGB_showHandCount            = "_WUXUEGEBAN_SHOW_COUNT";           //显示手牌张数
        this.localStorageKey.KEY_WXGB_singleJokerIsBomb         = "_WUXUEGEBAN_yingjiachu";         //单王算炸弹
        this.localStorageKey.KEY_WXGB_diFen                 = "_WUXUEGEBAN_DIFEN";   
        this.localStorageKey.KEY_WXGB_selectCardByPlayer    = "_WUXUEGEBAN_SELECT_CARD_TYPE";      //

        this.setExtraKey({
            jieSuanDiFen: "_WUXUEGEBAN_jiesuandifen"
        });

    },
    initAll:function(IsFriendCard)
    {
        if (!IsFriendCard)
            this.setKey();
        this.bgNode = ccs.load("bg_wuXueGeBan.json").node;
        this.addChild(this.bgNode);
        this.bg_node = this.bgNode.getChildByName("bg_wuXueGeBan").getChildByName("view");
        if(!this.bg_node) this.bg_node = this.bgNode.getChildByName("bg_wuXueGeBan");

        this.isAdjusted = false;
    },

    initPlayNode:function()
    {
        if(MjClient.APP_TYPE.QXJSMJ == MjClient.getAppType())
        {
            this._super();
        }

        var _bg_Node = this.bg_node;
    
        var _playWay = _bg_Node.getChildByName("play");
        if (!_playWay) {
            _playWay = _bg_Node.getParent().getChildByName("play");
        }
        this._playNode_basescore_0 = _playWay.getChildByName("play_difen0");
        this._playNode_basescore_1 = _playWay.getChildByName("play_difen1");
        this._playNode_basescore_2 = _playWay.getChildByName("play_difen2");

        var nodeListfeng = [];
        nodeListfeng.push( this._playNode_basescore_0 );
        nodeListfeng.push( this._playNode_basescore_1 );
        nodeListfeng.push( this._playNode_basescore_2 );

        this._playNode_basescore_radio = createRadioBoxForCheckBoxs(nodeListfeng, this.radioBoxSelectCB);
        this.addListenerText(nodeListfeng,this._playNode_basescore_radio);
        this._playNode_basescore_list = nodeListfeng;

        var that = this;

        //清浑水规则
        this._playNode_rule_0 = _playWay.getChildByName("play_rule0");
        this._playNode_rule_1 = _playWay.getChildByName("play_rule1");
        var nodeListrule = [];
        nodeListrule.push( this._playNode_rule_0 );
        nodeListrule.push( this._playNode_rule_1 );

        this._playNode_rule_radio = createRadioBoxForCheckBoxs(nodeListrule, this.radioBoxSelectCB);
        this.addListenerText(nodeListrule,this._playNode_rule_radio);

        
        ////可反
        this._playNode_fan_0 = _playWay.getChildByName("play_fan_0");
        this._playNode_fan_1 = _playWay.getChildByName("play_fan_1");
        var nodeListfan = [];
        nodeListfan.push( this._playNode_fan_0 );
        nodeListfan.push( this._playNode_fan_1 );

        this._playNode_fan_radio = createRadioBoxForCheckBoxs(nodeListfan, this.radioBoxSelectCB);
        this.addListenerText(nodeListfan,this._playNode_fan_radio);
        this._playNode_fan_radio_list = nodeListfan;


        this._playNode_showCount           = _playWay.getChildByName("play_showhandCount");
        this.addListenerText(this._playNode_showCount);
        this._playNode_showCount.addEventListener(this.clickCB, this._playNode_showCount);

        // this._playNode_fan    = _playWay.getChildByName("play_shifoufan");
        // this.addListenerText(this._playNode_fan);
        // this._playNode_fan.addEventListener(this.clickCB, this._playNode_fan);

        this._playNode_bombtype    = _playWay.getChildByName("play_wangsuanzhadan");
        this.addListenerText(this._playNode_bombtype);
        this._playNode_bombtype.addEventListener(this.clickCB, this._playNode_bombtype);

        
        this._play_select_card    = _playWay.getChildByName("play_select_card");
        this.addListenerText(this._play_select_card);
        this._play_select_card.addEventListener(this.clickCB, this._play_select_card);

        this.difenAry = [0.1,0.2,0.3,0.4,0.5,1,2,3,4,5,6,7,8,9,10];
        this.initExtraPlayNode(_playWay);
    },
    setPlayNodeCurrentSelect:function(isClub)
    {
        if(MjClient.APP_TYPE.QXJSMJ == MjClient.getAppType())
        {
            this._super();
        }

        var _difen;
        if (isClub)
            _difen = [3, 6, 15].indexOf(this.getNumberItem("diFen", 3));
        else{
            _difen = [3, 6, 15].indexOf(util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_WXGB_diFen, 3));
        }
        this._playNode_basescore_radio.selectItem(_difen)
        this.radioBoxSelectCB(_difen, this._playNode_basescore_list[_difen],this._playNode_basescore_list);

        // this._playNode_basescore_0.setSelected(false);
        // this._playNode_basescore_1.setSelected(false);
        // this._playNode_basescore_2.setSelected(false);

        // var list = [];
        // list.push(this._playNode_basescore_0);
        // list.push(this._playNode_basescore_1);
        // list.push(this._playNode_basescore_2);
        // var index = 0;

        // if(_difen == 0)
        // {
        //     this._playNode_basescore_0.setSelected(true);
        //     index = 0;
        // }
        // else if (_difen == 1)
        // {
        //     index = 1;
        //     this._playNode_basescore_1.setSelected(true);
        // }
        // else if (_difen == 2)
        // {
        //     index = 2;
        //     this._playNode_basescore_2.setSelected(true);
        // }
        // this.radioBoxSelectCB(index, list[index], list);


        var _rule;
        if (isClub)
            _rule = [0, 1].indexOf(this.getNumberItem("hunShuiRule", 1));
        else
            _rule = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_WXGB_hunShuiRule, 0);
        this._playNode_rule_0.setSelected(false);
        this._playNode_rule_1.setSelected(false);
        var listrule = [];
        listrule.push(this._playNode_rule_0);
        listrule.push(this._playNode_rule_1);
        var index = 0;
        if(_rule == 0 )
        {
            this._playNode_rule_0.setSelected(true);
            index = 0;
        }
        else if (_rule == 1)
        {
            index = 1;
            this._playNode_rule_1.setSelected(true);
        }
        this.radioBoxSelectCB(index, listrule[index], listrule);

        //
        var _fan;
        if (isClub)
            _rule = [0, 1].indexOf(this.getNumberItem("fan", 0));
        else
            _rule = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_WXGB_fan, 0);

        this._playNode_fan_radio.selectItem(_rule) 
        this.radioBoxSelectCB(_rule,this._playNode_fan_radio_list[_rule],this._playNode_fan_radio_list);

        // this._playNode_fan_0.setSelected(false);
        // this._playNode_fan_1.setSelected(false);
        // var _list = [];
        // _list.push(this._playNode_fan_0);
        // _list.push(this._playNode_fan_1);
        // var index = 0;
        // if(_rule == 0 )
        // {
        //     this._playNode_fan_0.setSelected(true);
        //     index = 0;
        // }
        // else if (_rule == 1)
        // {
        //     index = 1;
        //     this._playNode_fan_1.setSelected(true);
        // }
        // this.radioBoxSelectCB(index, _list[index], _list);

        var _handCount;
        if (isClub)
            _handCount = this.getBoolItem("showHandCount", false);
        else
            _handCount = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_WXGB_showHandCount, false);
        this._playNode_showCount.setSelected(_handCount);
        var text = this._playNode_showCount.getChildByName("text");
        this.radioTextColor(text,_handCount)
        
        // var _fan;
        // if (isClub)
        //     _fan = this.getBoolItem("fan", false);
        // else
        //     _fan = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_WXGB_fan, false);
        // this._playNode_fan.setSelected(_fan);
        // var text = this._playNode_fan.getChildByName("text");
        // this.radioTextColor(text, _fan)

        var _jokerisbomb;
        if (isClub)
            _jokerisbomb = this.getBoolItem("singleJokerIsBomb", false);
        else
            _jokerisbomb = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_WXGB_singleJokerIsBomb, false);
        this._playNode_bombtype.setSelected(_jokerisbomb);
        var text = this._playNode_bombtype.getChildByName("text");
        this.radioTextColor(text, _jokerisbomb);

        var _selectcardsbyplayer;
        if (isClub)
            _selectcardsbyplayer = this.getBoolItem("selectCardByPlayer", false);
        else
            _selectcardsbyplayer = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_WXGB_selectCardByPlayer, false);
        this._play_select_card.setSelected(_selectcardsbyplayer);
        var text = this._play_select_card.getChildByName("text");
        this.radioTextColor(text, _selectcardsbyplayer);

        this.setExtraPlayNodeCurrentSelect(isClub);
    },
    getSelectedPara:function()
    {
        var para = {};
        //if(this._nodeGPS) para.gps = this._nodeGPS.isSelected(); 
        para.gameType                               = MjClient.GAME_TYPE.WU_XUE_GE_BAN;
        para.maxPlayer                              = 3;
        para.showHandCount                          = this._playNode_showCount.isSelected();
        para.fan                                    = this._playNode_fan_radio.getSelectIndex(); 
        para.singleJokerIsBomb                      = this._playNode_bombtype.isSelected();
        para.selectCardByPlayer                     = this._play_select_card.isSelected();
        para.diFen                                  = [3,6,15][this._playNode_basescore_radio.getSelectIndex()];

        if(this._playNode_rule_0.isSelected())
        {
            para.hunShuiRule = 0;
        }
        else if(this._playNode_rule_1.isSelected())
        {
            para.hunShuiRule = 1;
        }

        // if(this._playNode_basescore_0.isSelected())
        // {
        //     para.diFen = 0;
        // }
        // else if(this._playNode_basescore_1.isSelected())
        // {
        //     para.diFen = 1;
        // }
        // else if(this._playNode_basescore_2.isSelected())
        // {
        //     para.diFen = 2;
        // }


        if (!this._isFriendCard) {
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_WXGB_fan, para.fan);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_WXGB_hunShuiRule, para.hunShuiRule);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_WXGB_showHandCount, para.showHandCount);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_WXGB_selectCardByPlayer, para.selectCardByPlayer);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_WXGB_singleJokerIsBomb, para.singleJokerIsBomb);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_WXGB_diFen, para.diFen); 
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