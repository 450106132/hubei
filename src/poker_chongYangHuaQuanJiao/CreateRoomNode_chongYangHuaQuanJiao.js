
var CreateRoomNode_chongYangHuaQuanJiao = CreateRoomNode.extend({
    setKey:function()
    {

        this.localStorageKey.KEY_CYHQJ_fengDing            = "_CHONGYANGHUAQUANJIAO_FENGDING";           // 
  
        this.localStorageKey.KEY_CYHQJ_SAN_DA_HA_difen     = "_CHONGYANGHUAQUANJIAO_DIFEN";   

        this.setExtraKey({
            // jieSuanDiFen: "_CHONGYANGHUAQUANJIAO_jiesuandifen",
            // tuoGuan: "CHONGYANGHUAQUANJIAO_TUO_GUAN",          //托管
            // trustWhole: "CHONGYANGHUAQUANJIAO_TRUST_WHOLE",  //整局托管
            // trustWay: "CHONGYANGHUAQUANJIAO_TRUST_WAY"  //托管方式
        });

    },
    initAll:function(IsFriendCard)
    {
        if (!IsFriendCard)
            this.setKey();
        this.bgNode = ccs.load("bg_chongYangHuaQuanJiao.json").node;
        this.addChild(this.bgNode);
        this.bg_node = this.bgNode.getChildByName("bg_chongYangHuaQuanJiao").getChildByName("view");
        if(!this.bg_node) this.bg_node = this.bgNode.getChildByName("bg_chongYangHuaQuanJiao");

        this.isAdjusted = false;
    },

    initPlayNode:function()
    {

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

        //
        this._playNode_fengding0 = _playWay.getChildByName("play_fengding0");
        this._playNode_fengding1 = _playWay.getChildByName("play_fengding1");
        var nodeListrule = [];
        nodeListrule.push( this._playNode_fengding0 );
        nodeListrule.push( this._playNode_fengding1 );

        this._playNode_fengding_radio = createRadioBoxForCheckBoxs(nodeListrule, this.radioBoxSelectCB);
        this.addListenerText(nodeListrule,this._playNode_fengding_radio);
        this.NodeList_fengding = nodeListrule


        //this.difenAry = [0.1,0.2,0.3,0.4,0.5,1,2,3,4,5,6,7,8,9,10];
        this.initExtraPlayNode(_playWay);
    },
    setPlayNodeCurrentSelect:function(isClub)
    {
        var isCustomBaseScore
        if (isClub){
            isCustomBaseScore = this.getBoolItem("isCustomBaseScore", false);
        }else{
            isCustomBaseScore = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_CYHQJ_isCustomBaseScore, false);
        }
        
        var _difen;

        if(!isCustomBaseScore){
            if (isClub)
                _difen = [10, 20, 40].indexOf(this.getNumberItem("SAN_DA_HA_difen",10));
            else{
                _difen = [10, 20, 40].indexOf(util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_CYHQJ_SAN_DA_HA_difen, 10));
            }
        }
        else{

            if(isClub){
                _difen = util.localStorageEncrypt.getNumberItem("SAN_DA_HA_difen",10)
            }else{
                _difen = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_CYHQJ_SAN_DA_HA_difen, 10)
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
            value = this.getNumberItem("fengDing", 0);
        else
            value = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_CYHQJ_fengDing, 0);
        var _index = [0, 6].indexOf(value);

        this._playNode_fengding_radio.selectItem(_index)
        this.radioBoxSelectCB(_index, this.NodeList_fengding[_index], this.NodeList_fengding);


        this.setExtraPlayNodeCurrentSelect(isClub);
    },
    getSelectedPara:function()
    {
        var para = {};
        //if(this._nodeGPS) para.gps = this._nodeGPS.isSelected(); 
        para.gameType                               = MjClient.GAME_TYPE.CHONG_YANG_HUA_QUAN_JIAO;
        para.maxPlayer                              = 4;

        para.fengDing                           = [0, 6][this._playNode_fengding_radio.getSelectIndex()]; 

        para.SAN_DA_HA_difen                                  = [10,20,40,-1][this._playNode_basescore_radio.getSelectIndex()];
        
        para.isCustomBaseScore                      = false;

        if(para.SAN_DA_HA_difen == -1){
            para.SAN_DA_HA_difen = parseInt(MjClient._customValue[MjClient.createRoomNode._data.gameType]);
            para.isCustomBaseScore = true;
        }

        if (!this._isFriendCard) {
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_CYHQJ_fengDing, para.fengDing);

            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_CYHQJ_isCustomBaseScore, this._playNode_basescore_radio.getSelectIndex() == 3); 
            
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_CYHQJ_SAN_DA_HA_difen, para.SAN_DA_HA_difen); 
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