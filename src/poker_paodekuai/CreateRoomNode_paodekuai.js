/**
 * Created by sking on 2017/7/21.
 */


var CreateRoomNode_paodekuai = CreateRoomNode.extend({
    setKey:function()
    {
        this.localStorageKey.KEY_PDK_playerNumber   = "_PAO_DE_KUAI_PLAYER_NUMBER";     //玩家数量
        this.localStorageKey.KEY_PDK_mustPut = "_PAO_DE_KUAI_MUST_PUT";                 //能管必管
        this.localStorageKey.KEY_PDK_showCardNumber = "PAO_DE_KUAI_SHOW_CARD_NUMBER";   //显示牌数
        this.localStorageKey.KEY_PDK_mustPutHongTaoSan = "PAO_DE_KUAI_MUST_PUT_HONG_TAO_SAN";   //先出红桃3
        this.localStorageKey.KEY_PDK_zhaDanFanBei = "PAO_DE_KUAI_ZHA_DAN_FAN_BEI";      //炸弹翻倍
        this.localStorageKey.KEY_PDK_SHUFFLE_OPTION = "PAO_DE_KUAI_SHUFFLE_OPTION" // 切牌

        this.setExtraKey({
            fanBei: "PAO_DE_KUAI_FAN_BEI",  //大结算翻倍
            fanBeiScore: "PAO_DE_KUAI_FAN_BEI_SCORE",  //少于X分大结算翻倍
            tuoGuan: "PAO_DE_KUAI_TUO_GUAN",          //托管
            fengDing: "PAO_DE_KUAI_FENG_DING"          // 封顶
        });
    },
    initAll:function(IsFriendCard)
    {   
        if (!IsFriendCard)
            this.setKey();

        this.bg_node = ccs.load("bg_paodekuai.json").node;
        this.addChild(this.bg_node);
        this.bg_node = this.bg_node.getChildByName("bg_paodekuai");
    },
    initPlayNode:function()
    {
        var _bg_Node = null;

        if(MjClient.APP_TYPE.QXJSMJ == MjClient.getAppType())
        {
            this._super();

            if (GameClass[this._data.gameType] == MjClient.GAME_CLASS.PAO_DE_KUAI) {
                // 江苏跑得快添加了滑动处理
                _bg_Node = this.bg_node.getChildByName("view");
            }
        }

        if (!_bg_Node)
            _bg_Node = this.bg_node;

        var _playWay = _bg_Node.getChildByName("play_way");
        
        this.mustPut = _playWay.getChildByName("play_mustPut");
        this.addListenerText(this.mustPut);
        this.mustPut.addEventListener(this.clickCB, this.mustPut);

        this.showCardNumber = _playWay.getChildByName("play_showCardNumber");
        this.addListenerText(this.showCardNumber);
        this.showCardNumber.addEventListener(this.clickCB, this.showCardNumber);

        this.mustPutHongTaoSan = _playWay.getChildByName("play_mustPutHongTaoSan");
        this.addListenerText(this.mustPutHongTaoSan);
        this.mustPutHongTaoSan.addEventListener(this.clickCB, this.mustPutHongTaoSan);
        
        this.zhaDanFanBei = _playWay.getChildByName("play_zhaDanFanBei");
        this.addListenerText(this.zhaDanFanBei);
        this.zhaDanFanBei.addEventListener(this.clickCB, this.zhaDanFanBei);

        this.playerNumber_3 = _playWay.getChildByName("playerNumber_3");
        this.playerNumber_2 = _playWay.getChildByName("playerNumber_2");
        this.playerNumber_2.visible = false;
        var nodeList = [];
        nodeList.push( _playWay.getChildByName("playerNumber_3") );
        nodeList.push( _playWay.getChildByName("playerNumber_2") );       
        this._playNode_player_number_radio = createRadioBoxForCheckBoxs(nodeList, function(index){
            this.changePayForPlayerNum(index);
            this.radioBoxSelectCB(index, nodeList[index], nodeList);
        }.bind(this));
		
		this.initPlayNumNode(nodeList, [3, 2]);
		
        this.addListenerText(nodeList,this._playNode_player_number_radio, function(index){
            this.changePayForPlayerNum(index);
            this.radioBoxSelectCB(index, nodeList[index], nodeList);
        }.bind(this));

        // 切牌
        if (_playWay.getChildByName("shuffleSys"))
        {
            var nodeListShuffle = [];
            nodeListShuffle.push( _playWay.getChildByName("shuffleSys") );
            nodeListShuffle.push( _playWay.getChildByName("shufflePlayer") );
            this.shuffle_radio = createRadioBoxForCheckBoxs(nodeListShuffle,this.radioBoxSelectCB);
            this.addListenerText(nodeListShuffle,this.shuffle_radio);
            this.nodeListShuffle = nodeListShuffle;
        }

        this.initExtraPlayNode(_playWay);

    },
    setPlayNodeCurrentSelect:function(isClub)
    {
        if(MjClient.APP_TYPE.QXJSMJ == MjClient.getAppType())
        {
            this._super();
        }
        //设置上次创建房间时的默认选项
        var _currentPlayerNumber;
        if (isClub)
            _currentPlayerNumber = this.getNumberItem("maxPlayer", 3);
        else
            _currentPlayerNumber = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_PDK_playerNumber, 3);
        this.playerNumber_3.setSelected(true); // _currentPlayerNumber == 3
        var text = this.playerNumber_3.getChildByName("text");
        this.selectedCB(text,true)
        /*this.playerNumber_2.setSelected(_currentPlayerNumber == 2);
        var text = this.playerNumber_2.getChildByName("text");
        this.selectedCB(text, _currentPlayerNumber == 2)*/

        var _mustPut;
        if (isClub)
             _mustPut = this.getBoolItem("mustPut", true);
        else
            _mustPut = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_PDK_mustPut, true);
        this.mustPut.setSelected(_mustPut);
        var text = this.mustPut.getChildByName("text");
        this.selectedCB(text, _mustPut)

        var _showCardNumber;
        if (isClub)
            _showCardNumber = this.getBoolItem("showCardNumber", true);
        else
            _showCardNumber = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_PDK_showCardNumber, true);
        this.showCardNumber.setSelected(_showCardNumber);
        var text = this.showCardNumber.getChildByName("text");
        this.selectedCB(text, _showCardNumber)

        var _mustPutHongTaoSan;
        if (isClub)
            _mustPutHongTaoSan = this.getBoolItem("mustPutHongTaoSan", false);
        else
            _mustPutHongTaoSan = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_PDK_mustPutHongTaoSan, false);
        this.mustPutHongTaoSan.setSelected(_mustPutHongTaoSan);
        var text = this.mustPutHongTaoSan.getChildByName("text");
        this.selectedCB(text, _mustPutHongTaoSan)

        var _zhaDanFanBei;
        if (isClub)
            _zhaDanFanBei = this.getBoolItem("isZhaDanFanBei", false);
        else
            _zhaDanFanBei = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_PDK_zhaDanFanBei, false);
        this.zhaDanFanBei.setSelected(_zhaDanFanBei);
        var text = this.zhaDanFanBei.getChildByName("text");
        this.selectedCB(text, _zhaDanFanBei)

        if (this.shuffle_radio){
            var shuffle_radioItem
            if (isClub){
                var option = this.getNumberItem("isPlayerShuffle", 0);
                shuffle_radioItem = option
            }
            else{
                var option = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_PDK_SHUFFLE_OPTION, 0);
                shuffle_radioItem = option;
            }
            this.shuffle_radio.selectItem(shuffle_radioItem)
            this.radioBoxSelectCB(shuffle_radioItem,this.nodeListShuffle[shuffle_radioItem],this.nodeListShuffle);
        }

        this.setExtraPlayNodeCurrentSelect(isClub);
    },
    getSelectedPara:function()
    {
        var para = {};
        para.gameType = MjClient.GAME_TYPE.PAO_DE_KUAI;
        para.maxPlayer = this.playerNumber_2.isSelected() ? 2 : 3;
        para.mustPutHongTaoSan = this.mustPutHongTaoSan.isSelected();
        para.mustPut = this.mustPut.isSelected();
        para.showCardNumber = this.showCardNumber.isSelected();
        para.isZhaDanFanBei = this.zhaDanFanBei.isSelected();
        if(this._nodeGPS) para.gps = this._nodeGPS.isSelected(); // add by sking for creat room need gps
        // 切牌
        if (this.shuffle_radio) {
            para.isPlayerShuffle = this.shuffle_radio.getSelectIndex();
        }

        if (!this._isFriendCard) {
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_PDK_playerNumber, para.maxPlayer);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_PDK_mustPut, para.mustPut);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_PDK_showCardNumber, para.showCardNumber);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_PDK_mustPutHongTaoSan, para.mustPutHongTaoSan);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_PDK_zhaDanFanBei, para.isZhaDanFanBei);
            if (this.shuffle_radio){
                util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_PDK_SHUFFLE_OPTION, para.isPlayerShuffle);
            }
        }

        this.getExtraSelectedPara(para);

        cc.log("createara: " + JSON.stringify(para));
        return para;
    }
});

var CreateRoomNode_paodekuai2 = CreateRoomNode.extend({
    setKey:function()
    {
        this.localStorageKey.KEY_PDK_playerNumber   = "_PAO_DE_KUAI_PLAYER_NUMBER";     //玩家数量
        this.localStorageKey.KEY_PDK_mustPut = "_PAO_DE_KUAI2_MUST_PUT";                 //能管必管
        this.localStorageKey.KEY_PDK_showCardNumber = "PAO_DE_KUAI2_SHOW_CARD_NUMBER";   //显示牌数
        this.localStorageKey.KEY_PDK_mustPutHongTaoSan = "PAO_DE_KUAI2_MUST_PUT_HONG_TAO_SAN";   //先出红桃3
        this.localStorageKey.KEY_PDK_zhaDanFanBei = "PAO_DE_KUAI2_ZHA_DAN_FAN_BEI";      //炸弹翻倍
        this.localStorageKey.KEY_PDK_SHUFFLE_OPTION = "PAO_DE_KUAI2_SHUFFLE_OPTION" // 切牌

        this.setExtraKey({
            fanBei: "PAO_DE_KUAI_2_FAN_BEI",  //大结算翻倍
            fanBeiScore: "PAO_DE_KUAI_2_FAN_BEI_SCORE",  //少于X分大结算翻倍
            tuoGuan: "PAO_DE_KUAI_2_TUO_GUAN",          //托管
            fengDing: "PAO_DE_KUAI_2_FENG_DING"          // 封顶
        });
    },
    initAll:function(IsFriendCard)
    {   
        if (!IsFriendCard)
            this.setKey();

        this.bg_node = ccs.load("bg_paodekuai2.json").node;
        this.addChild(this.bg_node);
        this.bg_node = this.bg_node.getChildByName("bg_paodekuai");
    },
    initPlayNode:function()
    {
        var _bg_Node = null;

        if(MjClient.APP_TYPE.QXJSMJ == MjClient.getAppType())
        {
            this._super();

            if (GameClass[this._data.gameType] == MjClient.GAME_CLASS.PAO_DE_KUAI) {
                // 江苏跑得快添加了滑动处理
                _bg_Node = this.bg_node.getChildByName("view");
            }
        }

        if (!_bg_Node)
            _bg_Node = this.bg_node;

        var _playWay = _bg_Node.getChildByName("play_way");
        
        this.mustPut = _playWay.getChildByName("play_mustPut");
        this.addListenerText(this.mustPut);
        this.mustPut.addEventListener(this.clickCB, this.mustPut);

        this.showCardNumber = _playWay.getChildByName("play_showCardNumber");
        this.addListenerText(this.showCardNumber);
        this.showCardNumber.addEventListener(this.clickCB, this.showCardNumber);

        this.mustPutHongTaoSan = _playWay.getChildByName("play_mustPutHongTaoSan");
        this.addListenerText(this.mustPutHongTaoSan);
        this.mustPutHongTaoSan.addEventListener(this.clickCB, this.mustPutHongTaoSan);
        
        this.zhaDanFanBei = _playWay.getChildByName("play_zhaDanFanBei");
        this.addListenerText(this.zhaDanFanBei);
        this.zhaDanFanBei.addEventListener(this.clickCB, this.zhaDanFanBei);

        this.playerNumber_3 = _playWay.getChildByName("playerNumber_3");
        this.playerNumber_3.visible = false;
        this.playerNumber_2 = _playWay.getChildByName("playerNumber_2");
        var nodeList = [];
        nodeList.push( _playWay.getChildByName("playerNumber_3") );
        nodeList.push( _playWay.getChildByName("playerNumber_2") );       
        this._playNode_player_number_radio = createRadioBoxForCheckBoxs(nodeList, function(index){
            this.changePayForPlayerNum(index);
            this.radioBoxSelectCB(index, nodeList[index], nodeList);
        }.bind(this));
        
        this.initPlayNumNode(nodeList, [3, 2]);
        
        this.addListenerText(nodeList,this._playNode_player_number_radio, function(index){
            this.changePayForPlayerNum(index);
            this.radioBoxSelectCB(index, nodeList[index], nodeList);
        }.bind(this));

        // 切牌
        if (_playWay.getChildByName("shuffleSys"))
        {
            var nodeListShuffle = [];
            nodeListShuffle.push( _playWay.getChildByName("shuffleSys") );
            nodeListShuffle.push( _playWay.getChildByName("shufflePlayer") );
            this.shuffle_radio = createRadioBoxForCheckBoxs(nodeListShuffle,this.radioBoxSelectCB);
            this.addListenerText(nodeListShuffle,this.shuffle_radio);
            this.nodeListShuffle = nodeListShuffle;
        }

        this.initExtraPlayNode(_playWay);

    },
    setPlayNodeCurrentSelect:function(isClub)
    {
        if(MjClient.APP_TYPE.QXJSMJ == MjClient.getAppType())
        {
            this._super();
        }
        //设置上次创建房间时的默认选项
        var _currentPlayerNumber;
        if (isClub)
            _currentPlayerNumber = this.getNumberItem("maxPlayer", 3);
        else
            _currentPlayerNumber = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_PDK_playerNumber, 3);
       /* this.playerNumber_3.setSelected(_currentPlayerNumber != 2); // _currentPlayerNumber == 3
        var text = this.playerNumber_3.getChildByName("text");
        this.selectedCB(text,_currentPlayerNumber != 2)*/
        this.playerNumber_2.setSelected(true);
        var text = this.playerNumber_2.getChildByName("text");
        this.selectedCB(text, true)

        var _mustPut;
        if (isClub)
             _mustPut = this.getBoolItem("mustPut", true);
        else
            _mustPut = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_PDK_mustPut, true);
        this.mustPut.setSelected(_mustPut);
        var text = this.mustPut.getChildByName("text");
        this.selectedCB(text, _mustPut)

        var _showCardNumber;
        if (isClub)
            _showCardNumber = this.getBoolItem("showCardNumber", true);
        else
            _showCardNumber = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_PDK_showCardNumber, true);
        this.showCardNumber.setSelected(_showCardNumber);
        var text = this.showCardNumber.getChildByName("text");
        this.selectedCB(text, _showCardNumber)

        var _mustPutHongTaoSan;
        if (isClub)
            _mustPutHongTaoSan = this.getBoolItem("mustPutHongTaoSan", false);
        else
            _mustPutHongTaoSan = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_PDK_mustPutHongTaoSan, false);
        this.mustPutHongTaoSan.setSelected(_mustPutHongTaoSan);
        var text = this.mustPutHongTaoSan.getChildByName("text");
        this.selectedCB(text, _mustPutHongTaoSan)

        var _zhaDanFanBei;
        if (isClub)
            _zhaDanFanBei = this.getBoolItem("isZhaDanFanBei", false);
        else
            _zhaDanFanBei = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_PDK_zhaDanFanBei, false);
        this.zhaDanFanBei.setSelected(_zhaDanFanBei);
        var text = this.zhaDanFanBei.getChildByName("text");
        this.selectedCB(text, _zhaDanFanBei)

        if (this.shuffle_radio){
            var shuffle_radioItem
            if (isClub){
                var option = this.getNumberItem("isPlayerShuffle", 0);
                shuffle_radioItem = option
            }
            else{
                var option = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_PDK_SHUFFLE_OPTION, 0);
                shuffle_radioItem = option;
            }
            this.shuffle_radio.selectItem(shuffle_radioItem)
            this.radioBoxSelectCB(shuffle_radioItem,this.nodeListShuffle[shuffle_radioItem],this.nodeListShuffle);
        }

        this.setExtraPlayNodeCurrentSelect(isClub);
    },
    getSelectedPara:function()
    {
        var para = {};
        para.gameType = MjClient.GAME_TYPE.PAO_DE_KUAI;
        para.maxPlayer = this.playerNumber_2.isSelected() ? 2 : 3;
        para.mustPutHongTaoSan = this.mustPutHongTaoSan.isSelected();
        para.mustPut = this.mustPut.isSelected();
        para.showCardNumber = this.showCardNumber.isSelected();
        para.isZhaDanFanBei = this.zhaDanFanBei.isSelected();
        if(this._nodeGPS) para.gps = this._nodeGPS.isSelected(); // add by sking for creat room need gps
        // 切牌
        if (this.shuffle_radio) {
            para.isPlayerShuffle = this.shuffle_radio.getSelectIndex();
        }

        if (!this._isFriendCard) {
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_PDK_playerNumber, para.maxPlayer);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_PDK_mustPut, para.mustPut);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_PDK_showCardNumber, para.showCardNumber);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_PDK_mustPutHongTaoSan, para.mustPutHongTaoSan);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_PDK_zhaDanFanBei, para.isZhaDanFanBei);
            if (this.shuffle_radio){
                util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_PDK_SHUFFLE_OPTION, para.isPlayerShuffle);
            }
        }

        this.getExtraSelectedPara(para);

        cc.log("createara: " + JSON.stringify(para));
        return para;
    }
});

