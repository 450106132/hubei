
var CreateRoomNode_tongShanDaGong = CreateRoomNode.extend({
    setKey:function()
    {
        this.localStorageKey.KEY_TSDG_jokerNum       = "_TONGSHANDAGONG_jokerNum";     //花牌数量
        this.localStorageKey.KEY_TSDG_postCardsWay       = "_TONGSHANDAGONG_postCardsWay"; 
        this.localStorageKey.KEY_TSDG_showHandCount            = "_TONGSHANDAGONG_SHOW_COUNT";           //是否展示手牌 

        this.localStorageKey.KEY_TSDG_diFen                 = "_TONGSHANDAGONG_DIFEN";   
        this.localStorageKey.KEY_TSDG_catPartnerCards    = "_TONGSHANDAGONG_catPartnerCards";      
        this.localStorageKey.KEY_TSDG_danZhaFengDing                 = "_TONGSHANDAGONG_danZhaFengDing";      

        this.localStorageKey.KEY_TSDG_laiziPoint    = "_TONGSHANDAGONG_laiziPoint";       
        this.localStorageKey.KEY_TSDG_isCustomBaseScore = "_TONGSHANDAGONG_isCustomBaseScore";
        this.localStorageKey.KEY_TSDG_isCustomFengDing = "_TONGSHANDAGONG_isCustomFengDing"; 

        this.setExtraKey({
        });

    },
    initAll:function(IsFriendCard)
    {
        if (!IsFriendCard)
            this.setKey();
        this.bgNode = ccs.load("bg_TongShanDaGong.json").node;
        this.addChild(this.bgNode);
        this.bg_node = this.bgNode.getChildByName("bg_tongShanDaGong").getChildByName("view");
        if(!this.bg_node) this.bg_node = this.bgNode.getChildByName("bg_tongShanDaGong");

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
        //
        this._playNode_danZhaFengDing_0 = _playWay.getChildByName("play_danZhaFengDing0");
        this._playNode_danZhaFengDing_1 = _playWay.getChildByName("play_danZhaFengDing1");
        this._playNode_danZhaFengDing_2 = _playWay.getChildByName("play_danZhaFengDing2");
        this._playNode_danZhaFengDing_3 = _playWay.getChildByName("play_danZhaFengDing3");

        MjClient._customDanZhaFengDingNode = this._playNode_danZhaFengDing_3.getChildByName("text");

        var callbackFengDing = function(){
            var _lay = MjClient.Scene.getChildByTag(783412508)
            if( _lay){
                _lay.removeFromParent();
                _lay = null;
            } 

            _lay = new CustomDanZhaFengDingLayer();
            _lay.setTag(783412508);
            MjClient.Scene.addChild(_lay);
        };

        var nodeListFengDing = [];
        nodeListFengDing.push( this._playNode_danZhaFengDing_0 );
        nodeListFengDing.push( this._playNode_danZhaFengDing_1 );
        nodeListFengDing.push( this._playNode_danZhaFengDing_2 );
        nodeListFengDing.push( this._playNode_danZhaFengDing_3 );
        this._playNode_danZhaFengDing_list = nodeListFengDing;

        this._playNode_danZhaFengDing_radio = createRadioBoxForCheckBoxs(nodeListFengDing,  function(index){
            this.radioBoxSelectCB(index, nodeListFengDing[index], nodeListFengDing);
            if(index == 3 ){
                callbackFengDing();
            }
        }.bind(this));
        this.addListenerText(nodeListFengDing, this._playNode_danZhaFengDing_radio, function (index) {
                if(index == 3 ){
                    callbackFengDing();
                }
            });

        var custom_bg_0 = _playWay.getChildByName("custom_bg_0");
        custom_bg_0.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    that._playNode_danZhaFengDing_radio.selectItem(3)
                    that.radioBoxSelectCB(3, nodeListFengDing[3], nodeListFengDing);
                    callbackFengDing();
                    break;
            }
        });
        //

        //展示手牌
        this._playNode_jokerNum_0 = _playWay.getChildByName("play_jokerNum0");
        this._playNode_jokerNum_1 = _playWay.getChildByName("play_jokerNum1");
        var nodeListrule = [];
        nodeListrule.push( this._playNode_jokerNum_0 );
        nodeListrule.push( this._playNode_jokerNum_1 );

        this._playNode_jokerNum_radio = createRadioBoxForCheckBoxs(nodeListrule, this.radioBoxSelectCB);
        this.addListenerText(nodeListrule,this._playNode_jokerNum_radio);
        this.NodeList_jokerNum = nodeListrule

        
        this._playNode_postCardsWay_0 = _playWay.getChildByName("play_postCardsWay0");
        this._playNode_postCardsWay_1 = _playWay.getChildByName("play_postCardsWay1");
        this._playNode_postCardsWay_2 = _playWay.getChildByName("play_postCardsWay2");
        this._playNode_postCardsWay_3 = _playWay.getChildByName("play_postCardsWay3");
        var nodeListfan = [];
        nodeListfan.push( this._playNode_postCardsWay_0 );
        nodeListfan.push( this._playNode_postCardsWay_1 );
        nodeListfan.push( this._playNode_postCardsWay_2 );
        nodeListfan.push( this._playNode_postCardsWay_3 );

        this._playNode_postCardsWay_radio = createRadioBoxForCheckBoxs(nodeListfan, this.radioBoxSelectCB);
        this.addListenerText(nodeListfan,this._playNode_postCardsWay_radio);
        this.NodeList_postCardsWay = nodeListfan;


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
        var isCustomBaseScore
        if (isClub){
            isCustomBaseScore = this.getBoolItem("isCustomBaseScore", false);
        }else{
            isCustomBaseScore = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_TSDG_isCustomBaseScore, false);
        }
        
        var _difen;

        if(!isCustomBaseScore){
            if (isClub)
                _difen = [1, 3, 5].indexOf(this.getNumberItem("diFen",1));
            else{
                _difen = [1, 3, 5].indexOf(util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_TSDG_diFen, 1));
            }
        }
        else{

            if(isClub){
                _difen = util.localStorageEncrypt.getNumberItem("diFen",10)
            }else{
                _difen = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_TSDG_diFen, 10)
            }

            MjClient._customValue[MjClient.createRoomNode._data.gameType] = _difen.toString();
            this._playNode_basescore_3.getChildByName("text").setString(_difen);
            _difen = 3;
        }
        
        this._playNode_basescore_radio.selectItem(_difen)
        this.radioBoxSelectCB(_difen, this._playNode_basescore_list[_difen], this._playNode_basescore_list);

        //fengding
        var isCustomdanZhaFengDing
        if (isClub){
            isCustomdanZhaFengDing = this.getBoolItem("isCustomFengDing", false);
        }else{
            isCustomdanZhaFengDing = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_TSDG_isCustomFengDing, false);
        }
        
        var danZhaFengDing;

        if(!isCustomdanZhaFengDing){
            if (isClub)
                danZhaFengDing = [16,32,64].indexOf(this.getNumberItem("danZhaFengDing",32));
            else{
                danZhaFengDing = [16,32,64].indexOf(util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_TSDG_danZhaFengDing, 32));
            }
        }
        else{

            if(isClub){
                danZhaFengDing = util.localStorageEncrypt.getNumberItem("danZhaFengDing", 80)
            }else{
                danZhaFengDing = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_TSDG_danZhaFengDing, 80)
            }

            MjClient._customFengDing = danZhaFengDing.toString();
            MjClient._customDanZhaFengDingNode.setString(danZhaFengDing);
            danZhaFengDing = 3;
        }
        
        this._playNode_danZhaFengDing_radio.selectItem(danZhaFengDing)
        this.radioBoxSelectCB(danZhaFengDing, this._playNode_danZhaFengDing_list[danZhaFengDing], this._playNode_danZhaFengDing_list);

        // 
        var value;
        if (isClub)
            value = this.getNumberItem("jokerNum", 4);
        else
            value = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_TSDG_jokerNum, 4);
        value = [4, 8].indexOf(value);
        this._playNode_jokerNum_radio.selectItem(value)
        this.radioBoxSelectCB(value, this.NodeList_jokerNum[value], this.NodeList_jokerNum);


        // 
        var value;
        if (isClub)
            value = this.getNumberItem("postCardsWay", 0);
        else
            value = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_TSDG_postCardsWay, 0);
        this._playNode_postCardsWay_radio.selectItem(value)
        this.radioBoxSelectCB(value, this.NodeList_postCardsWay[value], this.NodeList_postCardsWay);

        //
        var value;
        if (isClub)
            value = this.getNumberItem("laiziPoint", 2);
        else
            value = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_TSDG_laiziPoint, 2);
        value = [2, 3].indexOf(value);
        this._playNode_laiziPoint_radio.selectItem(value)
        this.radioBoxSelectCB(value, this.NodeList_laiziPoint[value], this.NodeList_laiziPoint);

        var _catPartnerCards;
        if (isClub)
            _catPartnerCards = this.getBoolItem("catPartnerCards", true);
        else
            _catPartnerCards = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_TSDG_catPartnerCards, true);
        this._playNode_catPartnerCards.setSelected(_catPartnerCards);
        var text = this._playNode_catPartnerCards.getChildByName("text");
        this.radioTextColor(text,_catPartnerCards)

        
        if (isClub)
            _value = this.getBoolItem("showHandCount", true);
        else
            _value = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_TSDG_showHandCount, true);
        this._play_showHandCount.setSelected(_value);
        var text = this._play_showHandCount.getChildByName("text");
        this.radioTextColor(text, _value);

        this.setExtraPlayNodeCurrentSelect(isClub);
    },
    getSelectedPara:function()
    {
        var para = {};
        //if(this._nodeGPS) para.gps = this._nodeGPS.isSelected(); 
        para.gameType                               = MjClient.GAME_TYPE.TONG_SHAN_DA_GONG;
        para.maxPlayer                              = 4;

        para.catPartnerCards                          = this._playNode_catPartnerCards.isSelected();
        para.showHandCount                            = this._play_showHandCount.isSelected();

        para.jokerNum                                = [4, 8][this._playNode_jokerNum_radio.getSelectIndex()]; 
        para.postCardsWay                           = this._playNode_postCardsWay_radio.getSelectIndex(); 
        para.laiziPoint                             = [2, 3][this._playNode_laiziPoint_radio.getSelectIndex()]; 
        para.diFen                                  = [1,3,5,-1][this._playNode_basescore_radio.getSelectIndex()];
        
        para.isCustomBaseScore                      = false;

        if(para.diFen == -1){
            para.diFen = parseInt(MjClient._customValue[MjClient.createRoomNode._data.gameType]);
            para.isCustomBaseScore = true;
        }

        para.danZhaFengDing                        = [16,32,64,-1][this._playNode_danZhaFengDing_radio.getSelectIndex()];
        para.isCustomFengDing                      = false;

        if(para.danZhaFengDing == -1){
            para.danZhaFengDing = parseInt(MjClient._customFengDing);
            para.isCustomFengDing = true;
        }

        if (!this._isFriendCard) {
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_TSDG_postCardsWay, para.postCardsWay);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_TSDG_jokerNum, para.jokerNum);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_TSDG_laiziPoint, para.laiziPoint);

            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_TSDG_catPartnerCards, para.catPartnerCards);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_TSDG_showHandCount, para.showHandCount);
         
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_TSDG_isCustomFengDing, para.isCustomFengDing);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_TSDG_isCustomBaseScore, this._playNode_basescore_radio.getSelectIndex() == 3); 
            
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_TSDG_diFen, para.diFen);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_TSDG_danZhaFengDing, para.danZhaFengDing); 
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