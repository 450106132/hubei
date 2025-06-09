/**
 * Created by sking on 2017/7/21.
 */


var CreateRoomNode_doudizhuQC = CreateRoomNode.extend({
    setKey:function()
    {
        this.localStorageKey.KEY_DDZTY_playerNumber       = "_DOU_DI_ZHU_QC_PLAYER_NUMBER";     //玩家数量
        this.localStorageKey.KEY_DDZTY_fengding           = "_DOU_DI_ZHU_QC_FENG_DING";           //封顶 封顶
        this.localStorageKey.KEY_DDZTY_dizhu           = "_DI_ZHU_QC_FENG_DING";           //封顶 封顶
        this.localStorageKey.KEY_DDZTY_showCount            = "_DOU_DI_ZHU_QC_SHOW_COUNT";           //显示手牌张数
        this.localStorageKey.KEY_DDZTY_yingjiachu         = "_DOU_DI_ZHU_QC_yingjiachu";         //赢家出
        this.localStorageKey.KEY_DDZTY_type             = "_DI_ZHU_QC_TYPE"; 
        this.localStorageKey.KEY_DDZTY_difen            = "_DI_ZHU_QC_DIFEN";   
        this.localStorageKey.KEY_DDZTY_ISLAIZI             = "_DI_ZHU_QC_ISLAIZI";  //癞子玩法
        this.localStorageKey.KEY_DDZTY_YINGZHAGUANRUANZHA            = "_DI_ZHU_QC_YINGZHAGUANRUANZHA";  //硬炸管软炸          

        this.setExtraKey({
            jieSuanDiFen: "_DOU_DI_ZHU_QC_jiesuandifen"
        });

    },
    changeToIsLaiZi : function()
    {
        this.play_YingZhaGuanRuanZha.setVisible(this.play_isLaiZi.isSelected());
    },
    initAll:function(IsFriendCard)
    {
        if (!IsFriendCard)
            this.setKey();
        this.bgNode = ccs.load("bg_doudizhuQC.json").node;
        this.addChild(this.bgNode);
        this.bg_node = this.bgNode.getChildByName("bg_doudizhuTY").getChildByName("view");
        if(!this.bg_node) this.bg_node = this.bgNode.getChildByName("bg_doudizhuTY");

        this.isAdjusted = false;
    },

    updateTypeSwitch: function (index){
        if(!this.type_radio){
            return;
        }

        this._playNode_dizhu_0.setVisible(false);
        this._playNode_dizhu_1.setVisible(false);

        for(var i in this.nodeListDiFen ){
            this.nodeListDiFen[i].setVisible(false);
        }

        if(index == 0 ){
            this._playNode_dizhu_0.setVisible(true);
            this._playNode_dizhu_1.setVisible(true);

            this._playNode_fengding_3.setVisible(true);
        }else if( index == 1 ){
            for(var i in this.nodeListDiFen ){
                this.nodeListDiFen[i].setVisible(true);
            }

            this._playNode_fengding_0.getChildByName("text").setString( 12 + "倍");
            this._playNode_fengding_1.getChildByName("text").setString( 24 + "倍");
            this._playNode_fengding_2.getChildByName("text").setString( 48 + "倍");
            this._playNode_fengding_3.setVisible(false);
        }
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
        this._playNode_fengding_0 = _playWay.getChildByName("play_fengding8");
        this._playNode_fengding_1 = _playWay.getChildByName("play_fengding16");
        this._playNode_fengding_2 = _playWay.getChildByName("play_fengding32");
        this._playNode_fengding_3 = _playWay.getChildByName("play_fengding64");
        var nodeListfeng = [];
        nodeListfeng.push( this._playNode_fengding_0 );
        nodeListfeng.push( this._playNode_fengding_1 );
        nodeListfeng.push( this._playNode_fengding_2 );
        nodeListfeng.push( this._playNode_fengding_3 );
        this._playNode_feng_radio = createRadioBoxForCheckBoxs(nodeListfeng,this.radioBoxSelectCB);
        this.addListenerText(nodeListfeng,this._playNode_feng_radio);

        var that = this;
        function updateFengDing(idx)
        {
            var _array = [8,16,32,64];
            if(idx == 0)
            {
                that._playNode_fengding_0.getChildByName("text").setString(_array[0] + "倍");
                that._playNode_fengding_1.getChildByName("text").setString(_array[1] + "倍");
                that._playNode_fengding_2.getChildByName("text").setString(_array[2] + "倍");
                that._playNode_fengding_3.getChildByName("text").setString(_array[3] + "倍");
            }
            else if(idx == 1){
                that._playNode_fengding_0.getChildByName("text").setString(_array[0]*3 + "倍");
                that._playNode_fengding_1.getChildByName("text").setString(_array[1]*3 + "倍");
                that._playNode_fengding_2.getChildByName("text").setString(_array[2]*3 + "倍");
                that._playNode_fengding_3.getChildByName("text").setString(_array[3]*3 + "倍");
            }
        }

        this._playNode_dizhu_0 = _playWay.getChildByName("play_dizhu0");
        this._playNode_dizhu_1 = _playWay.getChildByName("play_dizhu1");
        var nodeListdizhu = [];
        nodeListdizhu.push( this._playNode_dizhu_0 );
        nodeListdizhu.push( this._playNode_dizhu_1 );

        this._playNode_dizhu_radio = createRadioBoxForCheckBoxs(nodeListdizhu,function(index){
            updateFengDing(index);
            that.radioBoxSelectCB(index, nodeListdizhu[index], nodeListdizhu);
        });

        this.addListenerText(nodeListdizhu,this._playNode_dizhu_radio,updateFengDing);

        if(this.isUseUIV3 && MjClient.getAppType() === MjClient.APP_TYPE.QXYYQP ){
            if(!this.isAdjusted && this._playNode_dizhu_0){
                this.isAdjusted = true;
                this._playNode_dizhu_0.x -= 8;
            }
        }

        // function updateTypeSwitch(index){
        //     that._playNode_dizhu_0.setVisible(false);
        //     that._playNode_dizhu_1.setVisible(false);

        //     for(var i in that.nodeListDiFen ){
        //         that.nodeListDiFen[i].setVisible(false);
        //     }

        //     if(index == 0 ){
        //         that._playNode_dizhu_0.setVisible(true);
        //         that._playNode_dizhu_1.setVisible(true);
        //     }else if( index == 1 ){
        //         for(var i in that.nodeListDiFen ){
        //             that.nodeListDiFen[i].setVisible(true);
        //         }
        //     }

        // }
        //地主
        this.playNode_dizhutype0 = _playWay.getChildByName("play_dizhutype0");
        this.playNode_dizhutype1 = _playWay.getChildByName("play_dizhutype1");
        var nodeListDiZhuType = [];
        if(this.playNode_dizhutype0 && this.playNode_dizhutype1 ){
            nodeListDiZhuType.push( this.playNode_dizhutype0 );
            nodeListDiZhuType.push( this.playNode_dizhutype1 );

            this.type_radio = createRadioBoxForCheckBoxs(nodeListDiZhuType, function(index){
                updateFengDing(this._playNode_dizhu_radio.getSelectIndex());
                this.updateTypeSwitch(index);
                this.radioBoxSelectCB(index, nodeListDiZhuType[index], nodeListDiZhuType);  
            }.bind(this));
            this.addListenerText(nodeListDiZhuType, this.type_radio, function(index){this.updateTypeSwitch(index)}.bind(this));
            this.nodeListDiZhuType = nodeListDiZhuType;

            
            var nodeListDiFen = [];
            this.playNode_DiFen1 = _playWay.getChildByName("play_difen1");
            this.playNode_DiFen2 = _playWay.getChildByName("play_difen2");
            this.playNode_DiFen3 = _playWay.getChildByName("play_difen3");
            this.playNode_DiFen5 = _playWay.getChildByName("play_difen5");

            nodeListDiFen.push( this.playNode_DiFen1 );
            nodeListDiFen.push( this.playNode_DiFen2 );
            nodeListDiFen.push( this.playNode_DiFen3 );
            nodeListDiFen.push( this.playNode_DiFen5 );

            this.radio_DiFen = createRadioBoxForCheckBoxs(nodeListDiFen, this.radioBoxSelectCB);
            this.addListenerText(nodeListDiFen,this.radio_DiFen);
            this.nodeListDiFen = nodeListDiFen;
        }
        

        this._playNode_showCount           = _playWay.getChildByName("play_showhandCount");
        this.addListenerText(this._playNode_showCount);
        this._playNode_showCount.addEventListener(this.clickCB, this._playNode_showCount);

        this._playNode_yingjiaxiaochu    = _playWay.getChildByName("play_yingjiaxianchu");
        this.addListenerText(this._playNode_yingjiaxiaochu);
        this._playNode_yingjiaxiaochu.addEventListener(this.clickCB, this._playNode_yingjiaxiaochu);

        this.difenAry = [0.1,0.2,0.3,0.4,0.5,1,2,3,4,5,6,7,8,9,10];
        this.initExtraPlayNode(_playWay);

        //癞子玩法
        this.play_isLaiZi = _playWay.getChildByName("play_isLaiZi");
        this.addListenerText(this.play_isLaiZi, null, function(a){
            that.changeToIsLaiZi();
        });
        this.play_isLaiZi.addEventListener(function(sender, type)
        {
            that.clickCB(sender, type);
            that.changeToIsLaiZi();
        }, this.play_isLaiZi);

        //硬炸管软炸
        this.play_YingZhaGuanRuanZha = _playWay.getChildByName("play_YingZhaGuanRuanZha");
        this.addListenerText(this.play_YingZhaGuanRuanZha);
        this.play_YingZhaGuanRuanZha.addEventListener(this.clickCB, this.play_YingZhaGuanRuanZha);        
    },
    setPlayNodeCurrentSelect:function(isClub)
    {
        if(MjClient.APP_TYPE.QXJSMJ == MjClient.getAppType())
        {
            this._super();
        }

        var _type;
        if(this.type_radio){
            if (isClub)
                _type = this.getNumberItem("_diZhuType", 0);
            else
                _type = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_DDZTY_type, 0);
            this.type_radio.selectItem(_type)
            this.radioBoxSelectCB(_type, this.nodeListDiZhuType[_type], this.nodeListDiZhuType);

            var _difen;
            if (isClub)
                _difen = this.getNumberItem("_diFen", 5);
            else
                _difen = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_DDZTY_difen, 5);
            var _arr = [1, 2, 3, 5];
            var _index = _arr.indexOf(_difen);
            this.radio_DiFen.selectItem(_index)
            this.radioBoxSelectCB(_index, this.nodeListDiFen[_index], this.nodeListDiFen);

            this.updateTypeSwitch(_type); 
        }

        function isJiaoFen(){
            return (this.type_radio && _type == 1); //未完待续....
        }

        //设置上次创建房间时的默认选项
        var _fengDing;
        if (isClub)
            _fengDing = /*isJiaoFen() ? (this.getNumberItem("_maxFengDing", 12)) : */(this.getNumberItem("beishufengding", 8) / this.getNumberItem("multi", 1));
        else{
            _fengDing = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_DDZTY_fengding, /*isJiaoFen() ? 12:*/8 ) /
                ( [1, 3][(util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_DDZTY_dizhu, 0))] );
        }
        this._playNode_fengding_0.setSelected(false);
        this._playNode_fengding_1.setSelected(false);
        this._playNode_fengding_2.setSelected(false);
        this._playNode_fengding_3.setSelected(false);

        var list = [];
        list.push(this._playNode_fengding_0);
        list.push(this._playNode_fengding_1);
        list.push(this._playNode_fengding_2);
        list.push(this._playNode_fengding_3);
        var index = 0;

        if(_fengDing == 8)
        {
            this._playNode_fengding_0.setSelected(true);
            index = 0;
        }
        else if (_fengDing == 16)
        {
            index = 1;
            this._playNode_fengding_1.setSelected(true);
        }
        else if (_fengDing == 32)
        {
            index = 2;
            this._playNode_fengding_2.setSelected(true);
        }
        else {
            index = 3;
            this._playNode_fengding_3.setSelected(true);

            // if( isJiaoFen() ){
            //     this._playNode_fengding_3.setSelected(false);
            //     var _arr = [12, 24, 48];
            //     index = _arr.indexOf(_fengDing);
            //     list[index].setSelected(true);
            // }
        }
        this.radioBoxSelectCB(index,list[index],list);

        if(this.type_radio){
            this.fengDingIndexSelected0 = index;
        }

        var that = this;
        function updateFengDing(idx)
        {
            var _array = [8,16,32,64];
            if(idx == 0)
            {
                that._playNode_fengding_0.getChildByName("text").setString(_array[0] + "倍");
                that._playNode_fengding_1.getChildByName("text").setString(_array[1] + "倍");
                that._playNode_fengding_2.getChildByName("text").setString(_array[2] + "倍");
                that._playNode_fengding_3.getChildByName("text").setString(_array[3] + "倍");
            }
            else if(idx == 1){
                that._playNode_fengding_0.getChildByName("text").setString(_array[0]*3 + "倍");
                that._playNode_fengding_1.getChildByName("text").setString(_array[1]*3 + "倍");
                that._playNode_fengding_2.getChildByName("text").setString(_array[2]*3 + "倍");
                that._playNode_fengding_3.getChildByName("text").setString(_array[3]*3 + "倍");
            }
        }

        var _dizhu;
        if (isClub)
            _dizhu = [1, 3].indexOf(this.getNumberItem("multi", 1));
        else
            _dizhu = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_DDZTY_dizhu, 0);

        this._playNode_dizhu_0.setSelected(false);
        this._playNode_dizhu_1.setSelected(false);
        var listdizhu = [];
        listdizhu.push(this._playNode_dizhu_0);
        listdizhu.push(this._playNode_dizhu_1);
        var index = 0;
        if(_dizhu == 0 )
        {
            this._playNode_dizhu_0.setSelected(true);
            index = 0;
        }
        else if (_dizhu == 1)
        {
            index = 1;
            this._playNode_dizhu_1.setSelected(true);
        }
        updateFengDing(index);
        this.radioBoxSelectCB(index,listdizhu[index],listdizhu);

        if( this.type_radio ){
            this.updateTypeSwitch(_type);
        }
        

        var _handCount;
        if (isClub)
            _handCount = this.getBoolItem("showHandCount", false);
        else
            _handCount = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_DDZTY_showCount, false);
        this._playNode_showCount.setSelected(_handCount);
        var text = this._playNode_showCount.getChildByName("text");
        this.radioTextColor(text,_handCount)
        
        var _bi_yingjiachu;
        if (isClub)
            _bi_yingjiachu = this.getBoolItem("yingjiaxianchu", false);
        else
            _bi_yingjiachu = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_DDZTY_yingjiachu, false);
        this._playNode_yingjiaxiaochu.setSelected(_bi_yingjiachu);
        var text = this._playNode_yingjiaxiaochu.getChildByName("text");
        this.radioTextColor(text,_bi_yingjiachu)


        if (isClub)
            isTrue = this.getBoolItem("useLaizi", true);
        else
            isTrue = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_DDZTY_ISLAIZI, true);
        this.play_isLaiZi.setSelected(isTrue);
        var text = this.play_isLaiZi.getChildByName("text");
        this.selectedCB(text, isTrue);
        this.changeToIsLaiZi(); 

        if (isClub)
            isTrue = this.getBoolItem("yingZhaBigger", true);
        else
            isTrue = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_DDZTY_YINGZHAGUANRUANZHA, true);
        this.play_YingZhaGuanRuanZha.setSelected(isTrue);
        var text = this.play_YingZhaGuanRuanZha.getChildByName("text");
        this.selectedCB(text, isTrue);


        this.setExtraPlayNodeCurrentSelect(isClub);
    },
    getSelectedPara:function()
    {
        var para = {};
        para.gameType = MjClient.GAME_TYPE.DOU_DI_ZHU_QC;
        para.maxPlayer = 3;
        para.beishufengding  = 8;
        para.showHandCount            = this._playNode_showCount.isSelected();
        para.yingjiaxianchu     = this._playNode_yingjiaxiaochu.isSelected();
        
        if(this.type_radio) {
            para.diZhuType = this.type_radio.getSelectIndex(); //0:抢地主 1:叫分

            if( para.diZhuType == 1 ){

                if(this.playNode_DiFen1.isSelected())
                {
                    para.diFen = 1;
                }
                else if(this.playNode_DiFen2.isSelected())
                {
                    para.diFen = 2;
                }
                else if(this.playNode_DiFen3.isSelected())
                {
                    para.diFen = 3;
                }
                else {
                    para.diFen = 5;
                }
            }
        }

        if(this._nodeGPS) para.gps = this._nodeGPS.isSelected(); // add by sking for creat room need gps

        para.multi     = 1;


        var _dizhu = 0;
        if(this._playNode_dizhu_0.isSelected())
        {
            para.multi =1;
            _dizhu = 0;
        }
        else if(this._playNode_dizhu_1.isSelected())
        {
            para.multi = 3;
            _dizhu = 1;
        }

        if(this._playNode_fengding_0.isSelected())
        {
            para.beishufengding = 8;
        }
        else if(this._playNode_fengding_1.isSelected())
        {
            para.beishufengding = 16;
        }
        else if(this._playNode_fengding_2.isSelected())
        {
            para.beishufengding = 32;
        }
        else {
            para.beishufengding = 64;
        }

        para.beishufengding = para.beishufengding*para.multi;
        var _localValue = para.beishufengding

        if( this.type_radio && para.diZhuType == 1 ){
            if(this._playNode_fengding_0.isSelected())
            {
                para.beishufengding = 12;
            }
            else if(this._playNode_fengding_1.isSelected())
            {
                para.beishufengding = 24;
            }
            else if(this._playNode_fengding_2.isSelected())
            {
                para.beishufengding = 48;
            }
        }

        para.useLaizi = this.play_isLaiZi.isSelected();
        para.yingZhaBigger = this.play_isLaiZi.isSelected()? this.play_YingZhaGuanRuanZha.isSelected() : false;

        if (!this._isFriendCard) {
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_DDZTY_dizhu, _dizhu);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_DDZTY_fengding, _localValue);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_DDZTY_showCount, para.showHandCount);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_DDZTY_yingjiachu, para.yingjiaxianchu);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_DDZTY_ISLAIZI, para.useLaizi);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_DDZTY_YINGZHAGUANRUANZHA, para.yingZhaBigger);

            if(this.type_radio) {
                util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_DDZTY_type, para.diZhuType);
                if(para.diFen) util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_DDZTY_difen, para.diFen); 
            }
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