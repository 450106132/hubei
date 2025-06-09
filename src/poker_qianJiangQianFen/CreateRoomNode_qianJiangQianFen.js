
var CreateRoomNode_qianJiangQianFen = CreateRoomNode.extend({
    setKey:function()
    {
        this.localStorageKey.KEY_QianJiangQianFen_showHandCount            = "_QianJiangQianFen_SHOW_COUNT";           //是否展示手牌

        this.localStorageKey.KEY_QianJiangQianFen_biDa        = "_QianJiangQianFen_biDa";         // 4副纯510K
        this.localStorageKey.KEY_QianJiangQianFen_chun510kYa4Zha        = "_QianJiangQianFen_chun510kYa4Zha ";  //纯510k压4炸
        this.localStorageKey.KEY_QianJiangQianFen_shuangWangKeZha       = "_QianJiangQianFen_shuangWangKeZha";         // 双王可炸

        this.localStorageKey.KEY_QianJiangQianFen_diFen                 = "_QianJiangQianFen_DIFEN";
        this.localStorageKey.KEY_QianJiangQianFen_xiaJiaBaoShuangDuiZiXuZuiDa    = "_QianJiangQianFen_xiaJiaBaoShuangDuiZiXuZuiDa";      //下家报双对子必须最大
        this.localStorageKey.KEY_QianJiangQianFen_daiXiFen    = "_QianJiangQianFen_daiXiFen";      //带喜分
        this.localStorageKey.KEY_QianJiangQianFen_zongZha    = "_QianJiangQianFen_zongZha";      //总炸
        this.setExtraKey({
            jieSuanDiFen: "_QianJiangQianFen_jiesuandifen",
            tuoGuan: "QianJiangQianFen_TUO_GUAN",          //托管
            trustWhole: "QianJiangQianFen_TRUST_WHOLE",  //整局托管
            trustWay: "QianJiangQianFen_TRUST_WAY"  //托管方式
        });

    },
    initAll:function(IsFriendCard)
    {
        if (!IsFriendCard)
            this.setKey();
        this.bgNode = ccs.load("bg_qianJiangQianFen.json").node;
        this.addChild(this.bgNode);
        this.bg_node = this.bgNode.getChildByName("bg_qianJiangQIanFen").getChildByName("view");
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


        this._playNode_biDa          = _playWay.getChildByName("play_biDa");
        this.addListenerText(this._playNode_biDa);
        this._playNode_biDa.addEventListener(this.clickCB, this._playNode_biDa);

        this._playNode_chun510kYa4Zha           = _playWay.getChildByName("play_chun510kYa4Zha");
        this.addListenerText(this._playNode_chun510kYa4Zha);
        this._playNode_chun510kYa4Zha.addEventListener(this.clickCB, this._playNode_chun510kYa4Zha);

        this._playNode_shuangWangKeZha           = _playWay.getChildByName("play_shuangWangKeZha");
        this.addListenerText(this._playNode_shuangWangKeZha);
        this._playNode_shuangWangKeZha.addEventListener(this.clickCB, this._playNode_shuangWangKeZha);

        this._playNode_baoShuangXuZuiDa           = _playWay.getChildByName("play_baoShuangXuZuiDa");
        this.addListenerText(this._playNode_baoShuangXuZuiDa);
        this._playNode_baoShuangXuZuiDa.addEventListener(this.clickCB, this._playNode_baoShuangXuZuiDa);

        this._playNode_daiXiFen           = _playWay.getChildByName("play_daiXiFen");
        this.addListenerText(this._playNode_daiXiFen);
        this._playNode_daiXiFen.addEventListener(this.clickCB, this._playNode_daiXiFen);

        this._playNode_zongZha           = _playWay.getChildByName("play_zongZha");
        this.addListenerText(this._playNode_zongZha);
        this._playNode_zongZha.addEventListener(this.clickCB, this._playNode_zongZha);

        this.initExtraPlayNode(_playWay);

        // 底分
        this._zhuIdx = 1;
        this._ZhuNum = this.bg_node.getParent().getChildByName("txt_fen");
        if (this._ZhuNum) {
            this._ZhuNum.setString(this._zhuIdx);
            this._Button_sub = this.bg_node.getParent().getChildByName("btn_sub");
            this._Button_sub.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    if (this._zhuIdx <= 1) {
                        return;
                    }
                    this._zhuIdx--;
                    this._ZhuNum.setString(this._zhuIdx);
                    this._Button_add.setTouchEnabled(true);
                    this._Button_add.setBright(true);
                    this.setRoomCardModeFree(this._zhuIdx);
                }
            }, this);
            this._Button_add = this.bg_node.getParent().getChildByName("btn_add");
            this._Button_add.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    if (this._zhuIdx >= 100) {
                        return
                    }
                    this._zhuIdx++;
                    this._ZhuNum.setString(this._zhuIdx);
                    this._Button_sub.setTouchEnabled(true);
                    this._Button_sub.setBright(true);
                    this.setRoomCardModeFree(this._zhuIdx);
                }
            }, this);
        }
    },


    setPlayNodeCurrentSelect:function(isClub)
    {
        // 底分
        if (isClub)
            this._zhuIdx = this.getNumberItem("diFen", 1);
        else
            this._zhuIdx = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_QianJiangQianFen_diFen, 1);
        if (this._ZhuNum)
            this._ZhuNum.setString(this._zhuIdx);

        // 
        var value;
        if (isClub)
            value = this.getNumberItem("showHandCount", 0);
        else
            value = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_QianJiangQianFen_showHandCount, 0);
        this._playNode_showLeft_radio.selectItem(value)
        this.radioBoxSelectCB(value, this.NodeList_showLeft[value], this.NodeList_showLeft);

        // 
        var biDa;
        if (isClub)
            biDa = this.getNumberItem("biDa", 1);
        else
            biDa = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_QianJiangQianFen_biDa, 1);
        this._playNode_biDa.setSelected(biDa);
        var text = this._playNode_biDa.getChildByName("text");
        this.radioTextColor(text,biDa);

        var chun510kYa4Zha;
        if (isClub)
            chun510kYa4Zha = this.getNumberItem("f510kYa4", 0);
        else
            chun510kYa4Zha = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_QianJiangQianFen_chun510kYa4Zha, 0);
        this._playNode_chun510kYa4Zha.setSelected(chun510kYa4Zha);
        var text = this._playNode_chun510kYa4Zha.getChildByName("text");
        this.radioTextColor(text,chun510kYa4Zha);

        var shuangWangZha;
        if (isClub)
            shuangWangZha = this.getNumberItem("shuangWangKeZha", 0);
        else
            shuangWangZha = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_QianJiangQianFen_shuangWangKeZha, 0);
        this._playNode_shuangWangKeZha.setSelected(shuangWangZha);
        var text = this._playNode_shuangWangKeZha.getChildByName("text");
        this.radioTextColor(text,shuangWangZha);


        var xiaJiaBaoShuangDuiZiXuZuiDa;
        if (isClub)
            xiaJiaBaoShuangDuiZiXuZuiDa = this.getNumberItem("baoShuangDingDa", 0);
        else
            xiaJiaBaoShuangDuiZiXuZuiDa = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_QianJiangQianFen_xiaJiaBaoShuangDuiZiXuZuiDa, 0);
        this._playNode_baoShuangXuZuiDa.setSelected(xiaJiaBaoShuangDuiZiXuZuiDa);
        var text = this._playNode_baoShuangXuZuiDa.getChildByName("text");
        this.radioTextColor(text,xiaJiaBaoShuangDuiZiXuZuiDa);

        var daiXiFen;
        if (isClub)
            daiXiFen = this.getNumberItem("xiFen", 0);
        else
            daiXiFen = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_QianJiangQianFen_daiXiFen, 0);
        this._playNode_daiXiFen.setSelected(daiXiFen);
        var text = this._playNode_daiXiFen.getChildByName("text");
        this.radioTextColor(text,daiXiFen);

        var zongZha;
        if (isClub)
            zongZha = this.getNumberItem("fangHeShou", 0);
        else
            zongZha = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_QianJiangQianFen_zongZha, 0);
        this._playNode_zongZha.setSelected(zongZha);
        var text = this._playNode_zongZha.getChildByName("text");
        this.radioTextColor(text,zongZha);

        this.setExtraPlayNodeCurrentSelect(isClub);
    },
    getSelectedPara:function()
    {
        var para = {};
        para.gameType                               = MjClient.GAME_TYPE.QIAN_JIANG_QIAN_FEN;
        para.maxPlayer                              = 4;
        para.showHandCount                           = this._playNode_showLeft_radio.getSelectIndex();
        para.diFen = this._zhuIdx;
        para.isCustomBaseScore                      = false;

        para.biDa = this._playNode_biDa.isSelected() ? 1 : 0;
        para.f510kYa4 = this._playNode_chun510kYa4Zha.isSelected() ? 1 : 0;
        para.shuangWangKeZha = this._playNode_shuangWangKeZha.isSelected() ? 1 : 0;
        para.baoShuangDingDa = this._playNode_baoShuangXuZuiDa.isSelected() ? 1 : 0;
        para.xiFen = this._playNode_daiXiFen.isSelected() ? 1 : 0;
        para.zongZha = this._playNode_zongZha.isSelected() ? 1 : 0;

        if (!this._isFriendCard) {
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_QianJiangQianFen_showHandCount, para.showHandCount);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_QianJiangQianFen_diFen, this._zhuIdx);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_QianJiangQianFen_biDa, para.biDa);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_QianJiangQianFen_chun510kYa4Zha, para.f510kYa4);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_QianJiangQianFen_shuangWangKeZha, para.shuangWangKeZha);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_QianJiangQianFen_xiaJiaBaoShuangDuiZiXuZuiDa, para.baoShuangDingDa);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_QianJiangQianFen_daiXiFen, para.xiFen);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_QianJiangQianFen_zongZha, para.zongZha);
        }

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