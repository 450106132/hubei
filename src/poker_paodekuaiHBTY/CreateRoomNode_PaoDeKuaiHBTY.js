var CreateRoomNode_PaoDeKuaiHBTY = CreateRoomNode.extend({
    setKey:function()
    {
        this.localStorageKey.KEY_PDK_PLAYERNUMBER   = "PAO_DE_KUAI_HBTY_PLAYER_NUMBER";     //玩家数量
        this.localStorageKey.KEY_PDK_PLAYSPEED   = "PAO_DE_KUAI_HBTY_PLAY_SPEED";           //速度
        this.localStorageKey.KEY_PDK_CARDNUMBER   = "KEY_PDK_CARDNUMBER";                   //手牌数量
        this.localStorageKey.KEY_PDK_MUST_PUT     = "PAO_DE_KUAI_HBTY_MUST_BEAT";              //能管必管(字段被下面占用了。。。。)
        this.localStorageKey.KEY_PDK_ZHADANBUCHAI = "PAO_DE_KUAI_HBTY_MUST_PUT";                 //炸弹不可拆
        this.localStorageKey.KEY_PDK_SHOWCARDNUMBER = "PAO_DE_KUAI_HBTY_SHOW_CARD_NUMBER";       //显示牌数
        //this.localStorageKey.KEY_PDK_FIRSTHEITAO3 = "PAO_DE_KUAI_HBTY_FIRST_HEI_TAO_3";     //先出黑桃3
        this.localStorageKey.KEY_PDK_TWOPLAYER_FIRSRPUTRULE = "PAO_DE_KUAI_HBTY_TWOPLAYER_FIRSRPUTRULE" // 两个人时先出规则
        this.localStorageKey.KEY_PDK_4DAI2 = "PAO_DE_KUAI_HBTY_4DAI2";     //4带2
        this.localStorageKey.KEY_PDK_4DAI3 = "PAO_DE_KUAI_HBTY_4DAI3";     //4带3
        this.localStorageKey.KEY_PDK_HONG_TAO_10_NIAO = "PAO_DE_KUAI_HBTY_HONG_TAO_10_NIAO";     //红桃10扎鸟
        this.localStorageKey.KEY_PDK_FANG_ZUO_BI    = "PAO_DE_KUAI_HBTY_FANG_ZUO_BI";     // 防作弊
        this.localStorageKey.KEY_PDK_CAN_3A_ZHADAN  = "PAO_DE_KUAI_HBTY_CAN_3A_ZHADAN";   // 三个A算炸弹
        this.localStorageKey.KEY_PDK_FANG_QIANG_GUAN = "PAO_DE_KUAI_FANG_QIANG_GUAN"; //防强关
        this.localStorageKey.KEY_PDK_IS_AUTOTIP = "PAO_DE_KUAI_IS_AUTOTIP"; //自动提示
        this.localStorageKey.KEY_PDK_canPutAnyFeiji = "PAO_DE_KUAI_HBTY_CAN_PUT_ANY_FEIJI";       //飞机可少带接完
        this.localStorageKey.KEY_PDK_SHUFFLE_OPTION = "PAO_DE_KUAI_HBTY_SHUFFLE_OPTION" // 切牌
        this.localStorageKey.KEY_PDK_DIFEN          = "PAO_DE_KUAI_HBTY_DIFEN";           //底分
        this.localStorageKey.KEY_PDK_HONG_TAO_10_JIAFEN   = "PAO_DE_KUAI_HBTY_HONG_TAO_10_JIAFENN";//红桃10加5分
        this.localStorageKey.KEY_PDK_PIAO_FEN   = "PAO_DE_KUAI_HBTY_PIAO_FEN";//飘分
        this.localStorageKey.KEY_PDK_DING_PIAO   = "PAO_DE_KUAI_HBTY_DING_PIAO";//定飘    
        this.localStorageKey.KEY_PDK_JIA_KOU_FEN   = "PAO_DE_KUAI_HBTY_JAI_KOU_FEN";//加扣分只出一张口10，，2--3张5
        this.localStorageKey.KEY_PDK_HAVE_ZHADAN   = "PAO_DE_KUAI_HBTY_HAVE_ZHADAN";//有炸弹
        this.localStorageKey.KEY_PDK_IS_PER_FIRST_RULE   = "PAO_DE_KUAI_HBTY_IS_PER_FIRST_RULE";//
        this.localStorageKey.KEY_PDK_IS_VIEGUAN   = "PAO_DE_KUAI_HBTY_IS_VIEGUAN";//   抢关   
        this.localStorageKey.KEY_PDK_3DAI1   = "PAO_DE_KUAI_HBTY_3DAI1";//   3带1 
        this.localStorageKey.KEY_PDK_canPutAnySanZhangJie = "PAO_DE_KUAI_HBTY_CAN_PUT_ANY_SANZHANG_JIE";         //三带少带接完
        this.localStorageKey.KEY_PDK_canPutAnySanZhangChu = "PAO_DE_KUAI_HBTY_CAN_PUT_ANY_SANZHANG_CHU";         //三带少带出完
        this.localStorageKey.KEY_PDK_IS50FENDDING = "PAO_DE_KUAI_HBTY_IS50FENDDING";         //50分封顶 
        this.localStorageKey.KEY_PDK_ZHADANSCORE = "PAO_DE_KUAI_HBTY_ZHADANSCORE";         //炸弹算分         

        this.setExtraKey({
            fanBei: "PAO_DE_KUAI_HBTY_FAN_BEI",  //大结算翻倍
            fanBeiScore: "PAO_DE_KUAI_HBTY_FAN_BEI_SCORE",  //少于X分大结算翻倍
            tuoGuan: "PAO_DE_KUAI_HBTY_TUO_GUAN",          //托管
            // fengDing: "PAO_DE_KUAI_HBTY_FENG_DING",         //封顶
            trustWhole: "PAO_DE_KUAI_HBTY_TRUST_WHOLE",  //整局托管
            trustWay: "PAO_DE_KUAI_HBTY_TRUST_WAY"  //托管方式
        });
    },
    changeToFirstRulue:function()
    {
        var player_firstOut_radioItem = this.player_firstOut_radio.getSelectIndex();
        this.musthongtao3.setVisible(!player_firstOut_radioItem == 0);
    },
    changeToPlayerNumber:function (num,bFirst) {
        if (num == 2){
            this.fangZuoBi.setVisible(false);
            // this.firstHeiTao3.setVisible(false)
            // for(var i = 0; i < this.nodeListFirstOutCard.length; i++){
            //     var radio = this.nodeListFirstOutCard[i]
            //     radio.setVisible(true)
            // }
            // 隐藏防强关
            //this.fangQiangGuan.setVisible(false)
            // 炸弹不可拆放到防强关位置
            //this.zhaDanBuChai.setPosition(this.fangQiangGuanPos)
        }else{
            this.fangZuoBi.setVisible(true);
            // this.firstHeiTao3.setVisible(true)
            // for(var i = 0; i < this.nodeListFirstOutCard.length; i++){
            //     var radio = this.nodeListFirstOutCard[i]
            //     radio.setVisible(false)
            // }
            //this.fangQiangGuan.setVisible(true)
            //this.zhaDanBuChai.setPosition(this.zhaDanBuChaiPos)
        }
    },
    changeToHaveZhaDan: function()
    {
        this.can3aZhaDan.setVisible(this.checkBoxhavezhadan.isSelected() && this._card_number_radio.getSelectIndex() == 0);
        this.zhaDanBuChai.setVisible(this.checkBoxhavezhadan.isSelected());
        if (this.checkBoxhavezhadan.isSelected() == false)
        {   
            var selectColor = CREATEROOM_COLOR_3;
            this.can3aZhaDan.setSelected(false);
            this.zhaDanBuChai.setSelected(false);
            this.can3aZhaDan.getChildByName("text").setTextColor(selectColor);
            this.zhaDanBuChai.getChildByName("text").setTextColor(selectColor);

            if (!this._isFriendCard){
                util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_PDK_CAN_3A_ZHADAN,false);
                util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_PDK_ZHADANBUCHAI, false);
            }
        }

    },
    changeToCardNum: function()
    {
        // var b = this.checkBoxhavezhadan && this.checkBoxhavezhadan.isSelected();
        this.can3aZhaDan.setVisible(this._card_number_radio.getSelectIndex() == 0 && this.checkBoxhavezhadan.isSelected()); 
    },
    initAll:function(IsFriendCard)
    {
        if (!IsFriendCard)
            this.setKey();


        //if(MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP) this._costName = '房卡';
        this.bgNode = ccs.load("bg_PaoDeKuaiHBTY.json").node;
        this.addChild(this.bgNode);
        this.bg_node = this.bgNode.getChildByName("bg_paodekuai").getChildByName("view");
        if(!this.bg_node) this.bg_node = this.bgNode.getChildByName("bg_paodekuai");
        this.isAdjusted = false;
    },
    initPlayNode:function()
    {
        var that = this
        if(MjClient.APP_TYPE.QXJSMJ == MjClient.getAppType())
        {
            this._super();
        }
        var _bg_Node = this.bg_node;
        var _playWay = _bg_Node.getChildByName("play_way");

        this.zhaDanBuChai = _playWay.getChildByName("play_zhaDanBuChai");
        this.addListenerText(this.zhaDanBuChai);
        this.zhaDanBuChai.addEventListener(this.clickCB, this.zhaDanBuChai);
        this.zhaDanBuChaiPos = this.zhaDanBuChai.getPosition()

        this.showCardNumber = _playWay.getChildByName("play_showCardNumber");
        this.addListenerText(this.showCardNumber);
        this.showCardNumber.addEventListener(this.clickCB, this.showCardNumber);

        // this.firstHeiTao3 = _playWay.getChildByName("play_firstHeiTao");
        // this.addListenerText(this.firstHeiTao3);
        // this.firstHeiTao3.addEventListener(this.clickCB, this.firstHeiTao3);

        this.can4dai2 = _playWay.getChildByName("play_can4dai2");
        this.addListenerText(this.can4dai2);
        this.can4dai2.addEventListener(this.clickCB, this.can4dai2);

        this.can4dai3 = _playWay.getChildByName("play_can4dai3");
        this.addListenerText(this.can4dai3);
        this.can4dai3.addEventListener(this.clickCB, this.can4dai3);

        this.can3dai1 = _playWay.getChildByName("play_can3dai1");
        this.addListenerText(this.can3dai1);
        this.can3dai1.addEventListener(this.clickCB, this.can3dai1);

        //红桃10扎鸟与红桃10加分互斥
        this.hongTao10Niao = _playWay.getChildByName("play_hongtao10niao");
        this.hongTao10JiaFen = _playWay.getChildByName("play_hongTao10JiaFen");
        if (this.hongTao10JiaFen){

            var nodeList = [];
            nodeList.push(this.hongTao10Niao);
            nodeList.push(this.hongTao10JiaFen );
            var hongtaoRadio = createRadioBoxForCheckBoxsHuChi(nodeList,function(index){
                for (var i = 0 ; i < nodeList.length; i++){
                    this.clickCB(nodeList[i],nodeList[i].isSelected()?ccui.CheckBox.EVENT_SELECTED:ccui.CheckBox.EVENT_UNSELECTED);
                }
            }.bind(this));
            this.addListenerText(nodeList,hongtaoRadio, function (index) {
                hongtaoRadio.selectItem(index);
            });
        }else{
            this.addListenerText(this.hongTao10Niao);
            this.hongTao10Niao.addEventListener(this.clickCB, this.hongTao10Niao);
        }
        var nodeListA = [];
        nodeListA.push( _playWay.getChildByName("playerNumber_3") );
        nodeListA.push( _playWay.getChildByName("playerNumber_2") );       
        this._playNode_player_number_radio = createRadioBoxForCheckBoxs(nodeListA, function(index){
            this.changePayForPlayerNum(index);
            this.radioBoxSelectCB(index, nodeListA[index], nodeListA);
            // 两人的时候不显示防作弊选项
            if (index == 1){
                that.changeToPlayerNumber(2);
            }else{
                that.changeToPlayerNumber(3);
            }
        }.bind(this));

        this.addListenerText(nodeListA,this._playNode_player_number_radio, function (a) {
            that.changePayForPlayerNum(a)
            // 两人的时候不显示防作弊选项
            if (a == 1){
                that.changeToPlayerNumber(2);
            }else{
                that.changeToPlayerNumber(3);
            }
        });
        this.nodeListA = nodeListA;
		
        this.initPlayNumNode(nodeListA, [3, 2]);
        
        //有无炸弹
        var checkBoxhavezhadan= _playWay.getChildByName("play_havezhadan")
        if(checkBoxhavezhadan){
            this.checkBoxhavezhadan = checkBoxhavezhadan;
            this.addListenerText(this.checkBoxhavezhadan, null, function(a){
                that.changeToHaveZhaDan();
            });
            this.checkBoxhavezhadan.addEventListener(function(sender, type)
            {
                that.clickCB(sender, type);
                that.changeToHaveZhaDan();
            }, this.checkBoxhavezhadan);
        }
		
        var nodeListB = [];
        nodeListB.push( _playWay.getChildByName("cardNum16") );
        nodeListB.push( _playWay.getChildByName("cardNum15") );       
        this._card_number_radio = createRadioBoxForCheckBoxs(nodeListB, function(index, sender, list){
            that.radioBoxSelectCB(index, sender, list);
            that.changeToCardNum();
        });
        this.addListenerText(nodeListB,this._card_number_radio, function(a){
            that.changeToCardNum();
        }.bind(this));
        this.nodeListB = nodeListB;

        // 是否必管
        var checkBoxNotMustPut = _playWay.getChildByName("checkBoxNotMustPut")
        if(checkBoxNotMustPut){
            this.checkBoxNotMustPut = checkBoxNotMustPut
            this.addListenerText(this.checkBoxNotMustPut);
            this.checkBoxNotMustPut.addEventListener(this.clickCB, this.checkBoxNotMustPut);
        }

        //炸弹算分
        var play_zhadanscore = [];
        play_zhadanscore.push( _playWay.getChildByName("play_zhadanscore1") );   
        play_zhadanscore.push( _playWay.getChildByName("play_zhadanscore2") );   
        play_zhadanscore.push( _playWay.getChildByName("play_zhadanscore3") );   
        this.play_zhadanscore_radio = createRadioBoxForCheckBoxs(play_zhadanscore,this.radioBoxSelectCB);
        this.addListenerText(play_zhadanscore,this.play_zhadanscore_radio);
        this.play_zhadanscore = play_zhadanscore;
        this.zhadanScoreAry = [5,10,20];

        // 两人时，黑桃三和随机先手
        var nodeListFirstOutCard = [];
        nodeListFirstOutCard.push( _playWay.getChildByName("play_luckcard_radio") );
        nodeListFirstOutCard.push( _playWay.getChildByName("play_firstHongTao") );
        this.player_firstOut_radio = createRadioBoxForCheckBoxs(nodeListFirstOutCard,function(index, sender, list){
            that.radioBoxSelectCB(index, sender, list);
            that.changeToFirstRulue();
        });
        this.addListenerText(nodeListFirstOutCard,this.player_firstOut_radio, function(a){
            that.changeToFirstRulue();
        }.bind(this));
        this.nodeListFirstOutCard = nodeListFirstOutCard;

        this.musthongtao3 = _playWay.getChildByName("play_musthongtao3");
        this.addListenerText(this.musthongtao3);
        this.musthongtao3.addEventListener(this.clickCB, this.musthongtao3);

        this.isVieGuan = _playWay.getChildByName("isVieGuan");
        this.addListenerText(this.isVieGuan);
        this.isVieGuan.addEventListener(this.clickCB, this.isVieGuan);        

        this.fangZuoBi = _playWay.getChildByName("play_fangZuoBi");
        this.addListenerText(this.fangZuoBi);
        this.fangZuoBi.addEventListener(this.clickCB, this.fangZuoBi);

        this.can3aZhaDan = _playWay.getChildByName("play_can3aZhaDan");
        this.addListenerText(this.can3aZhaDan);
        this.can3aZhaDan.addEventListener(this.clickCB, this.can3aZhaDan);
        // this.can3aZhaDan.schedule(function() {
        //     this.can3aZhaDan.setVisible(this._card_number_radio.getSelectIndex() == 0);
        // }.bind(this));

        this.fangQiangGuan = _playWay.getChildByName("play_fangQiangGuan");
        this.addListenerText(this.fangQiangGuan);
        this.fangQiangGuan.addEventListener(this.clickCB, this.fangQiangGuan);
        this.fangQiangGuanPos = this.fangQiangGuan.getPosition()

        this.isAutoTip = _playWay.getChildByName("play_autoTip");
        this.addListenerText(this.isAutoTip);
        this.isAutoTip.addEventListener(this.clickCB, this.isAutoTip);

        this.canPutAnyFeiji = _playWay.getChildByName("canPutAnyFeiji");
        this.addListenerText(this.canPutAnyFeiji);
        this.canPutAnyFeiji.addEventListener(this.clickCB, this.canPutAnyFeiji);

        this.canPutAnySanZhang_Jie = _playWay.getChildByName("canPutAnySanZhang_Jie");
        this.addListenerText(this.canPutAnySanZhang_Jie);
        this.canPutAnySanZhang_Jie.addEventListener(this.clickCB, this.canPutAnySanZhang_Jie);

        this.canPutAnySanZhang_Chu = _playWay.getChildByName("canPutAnySanZhang_Chu");
        this.addListenerText(this.canPutAnySanZhang_Chu);
        this.canPutAnySanZhang_Chu.addEventListener(this.clickCB, this.canPutAnySanZhang_Chu);

        this.Is50fengding = _playWay.getChildByName("Is50fengding");
        this.addListenerText(this.Is50fengding);
        this.Is50fengding.addEventListener(this.clickCB, this.Is50fengding);

        var btn_fangZuoBiTip = this.fangZuoBi.getChildByName("btn_fangZuoBiTip");
        var image_fangZuoBiTip = this.fangZuoBi.getChildByName("image_fangZuoBiTip");
        btn_fangZuoBiTip.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                image_fangZuoBiTip.setVisible(true);
            }
        }, btn_fangZuoBiTip);

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

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: false,
            status: null,
            onTouchBegan: function(touch, event) {
                if (image_fangZuoBiTip.isVisible()) {
                    image_fangZuoBiTip.setVisible(false);
                    return true;
                } else {
                    return false;
                }
            },
        }, image_fangZuoBiTip);

        this._zhuIdx = 1;
        this._ZhuNum = _bg_Node.getChildByName("txt_fen");
        if(!this._ZhuNum) this._ZhuNum = _bg_Node.getParent().getChildByName("txt_fen");
        if (this._ZhuNum) {
            this._ZhuNum.setString(this._zhuIdx);
            this._Button_sub = _bg_Node.getChildByName("btn_sub");
            if(!this._Button_sub) this._Button_sub = _bg_Node.getParent().getChildByName("btn_sub");
            this._Button_sub.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    if (this._zhuIdx == 0.5) {
                        this._zhuIdx = 11;
                    }
                    if (this._zhuIdx > 0.5) {
                        this._zhuIdx = this._zhuIdx == 1 ? 0.5:(this._zhuIdx-1);
                        this._ZhuNum.setString(this._zhuIdx);
                        this._Button_add.setTouchEnabled(true);
                        this._Button_add.setBright(true);
                        cc.log("----------------this._guidIdx = " + this._zhuIdx);
                        this.setRoomCardModeFree();
                    }
                }
            }, this);
            this._Button_add = _bg_Node.getChildByName("btn_add");
            if(!this._Button_add) this._Button_add = _bg_Node.getParent().getChildByName("btn_add");
            this._Button_add.addTouchEventListener(function(sender, type) {
                if (type == 2) {

                    if (this._zhuIdx == 10) {
                        this._zhuIdx = 0;
                    }
                    if (this._zhuIdx < 10) {
                        this._zhuIdx = (this._zhuIdx<1)? (this._zhuIdx+0.5): (this._zhuIdx+1);
                        this._ZhuNum.setString(this._zhuIdx);
                        this._Button_sub.setTouchEnabled(true);
                        this._Button_sub.setBright(true);
                        this.setRoomCardModeFree();
                    }
                }
            }, this);
        }

        // 速度
        var nodeListSpeed = [];
        nodeListSpeed.push( _playWay.getChildByName("play_speed_fast") );
        nodeListSpeed.push( _playWay.getChildByName("play_speed_mid") );
        nodeListSpeed.push( _playWay.getChildByName("play_speed_slow") );
        this.speed_radio = createRadioBoxForCheckBoxs(nodeListSpeed,this.radioBoxSelectCB);
        this.addListenerText(nodeListSpeed,this.speed_radio);
        this.nodeListSpeed = nodeListSpeed;

        // 飘分
        var nodeListPiaofen = [];
        nodeListPiaofen.push( _playWay.getChildByName("piao_0") );
        nodeListPiaofen.push( _playWay.getChildByName("piao_1") );
        nodeListPiaofen.push( _playWay.getChildByName("piao_2") );
        nodeListPiaofen.push( _playWay.getChildByName("piao_3") );
        this.initDingPiaoList(_playWay.getChildByName("piao_0"));
        this.dingpiaoAry = [0,1,2,3,5,8];
        this.dingpiaoIndex = 0;
        this.dingpiaoText = _playWay.getChildByName("piao_0").getChildByName("text");
        this.piaofen_radio = createRadioBoxForCheckBoxs(nodeListPiaofen,this.radioBoxSelectCB);
        this.addListenerText(nodeListPiaofen,this.piaofen_radio, function(a){
            if (a!=0)return;
            this.onClickPiao0(_playWay.getChildByName("piao_0"));
        }.bind(this));
        this.nodeListPiaofen = nodeListPiaofen;


        //加扣分
        var checkBoxjiakoufen = _playWay.getChildByName("play_jiakoufen")
        if(checkBoxjiakoufen){
            this.checkBoxjiakoufen = checkBoxjiakoufen
            this.addListenerText(this.checkBoxjiakoufen); 
            this.checkBoxjiakoufen.addEventListener(this.clickCB, this.checkBoxjiakoufen);
        }

        if(this.isUseUIV3){
            var text_title = this.bgNode.getChildByName("bg_paodekuai").getChildByName("text");
            if(text_title && !this.isAdjusted ){
                this.isAdjusted = true;
                text_title.y -= 15;
                text_title.setFontSize(24);
                text_title.setTextColor(cc.color("#6d685b"));
            }
        }

        this.initExtraPlayNode(_playWay);
    },
    initRoundNode:function()
    {
        this._super();

        if (MjClient.getAppType() == MjClient.APP_TYPE.AYGUIZHOUMJ)
            this.bg_node.setContentSize(cc.size(907.00,480.00));
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
            _currentPlayerNumber = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_PDK_PLAYERNUMBER, 3);
        var selectIndex = _currentPlayerNumber == 2 ? 1 : 0;
        this._playNode_player_number_radio.selectItem(selectIndex)

        if (selectIndex == 1) {
            this.changeToPlayerNumber(2,true)
        }else{
            this.changeToPlayerNumber(3,true)
        }
        this.radioBoxSelectCB(selectIndex,this.nodeListA[selectIndex],this.nodeListA);

        // 速度
        var playSpeedOption;
        if (isClub)
            playSpeedOption = this.getNumberItem("playSpeed", 0);
        else
            playSpeedOption = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_PDK_PLAYSPEED, 0);
        this.speed_radio.selectItem(playSpeedOption)
        this.radioBoxSelectCB(playSpeedOption,this.nodeListSpeed[playSpeedOption],this.nodeListSpeed);

        // 飘分
        var piaofenOption;
        if (isClub)
            piaofenOption = this.getNumberItem("piaofen", 0);
        else
            piaofenOption = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_PDK_PIAO_FEN, 0);
        this.piaofen_radio.selectItem(piaofenOption)
        this.radioBoxSelectCB(piaofenOption,this.nodeListPiaofen[piaofenOption],this.nodeListPiaofen);

        //定飘分
        var piaofenOption;
        if (isClub)
            piaofenOption = this.getNumberItem("dingpiaofen", 0);
        else
            piaofenOption = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_PDK_DING_PIAO, 0);
        piaofenOption = this.dingpiaoAry.indexOf(piaofenOption);
        this.dingpiaoIndex = piaofenOption;
        var dingpiao = this.dingpiaoAry[piaofenOption];
        this.dingpiaoText.setString(dingpiao == 0? "  不飘         ":"  飘"+ dingpiao + "分        ");        

        //this.radioBoxSelectCB(piaofenOption,this.nodeListPiaofen[piaofenOption],this.nodeListPiaofen);        

        // 炸弹算分
        var zhadanscore;
        if (isClub)
            zhadanscore = this.getNumberItem("zhadanscore", 5);
        else
            zhadanscore = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_PDK_ZHADANSCORE, 5);
        var selcetIndex = this.zhadanScoreAry.indexOf(zhadanscore);
        selectIndex = selectIndex >= 0? selectIndex:0;
        this.play_zhadanscore_radio.selectItem(selcetIndex)
        this.radioBoxSelectCB(selcetIndex,this.play_zhadanscore[piaofenOption],this.play_zhadanscore);

        var cardNumIndex;
        if (isClub)
            cardNumIndex = this.getNumberItem("cardNumIndex", 0);
        else
            cardNumIndex = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_PDK_CARDNUMBER, 0);
        this._card_number_radio.selectItem(cardNumIndex)
        this.radioBoxSelectCB(cardNumIndex,this.nodeListB[cardNumIndex],this.nodeListB);
        this.changeToCardNum();

        var isTrue;
        if (isClub)
            isTrue = this.getBoolItem("mustPut", true);
        else
            isTrue = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_PDK_MUST_PUT, true);
        this.checkBoxNotMustPut.setSelected(!isTrue);
        var text = this.checkBoxNotMustPut.getChildByName("text");
        this.selectedCB(text,!isTrue)

        var isTrue;
        if (isClub)
            isTrue = this.getBoolItem("isVieGuan", false);
        else
            isTrue = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_PDK_IS_VIEGUAN, false);
        this.isVieGuan.setSelected(isTrue);
        var text = this.isVieGuan.getChildByName("text");
        this.selectedCB(text,!isTrue)        

        var isTrue;
        if (isClub)
            isTrue = this.getBoolItem("zhaDanBuChai", false);
        else
            isTrue = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_PDK_ZHADANBUCHAI, false);
        this.zhaDanBuChai.setSelected(isTrue);
        var text = this.zhaDanBuChai.getChildByName("text");
        this.selectedCB(text,isTrue)

        if (isClub)
            isTrue = this.getBoolItem("showCardNumber", false);
        else
            isTrue = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_PDK_SHOWCARDNUMBER, false);
        this.showCardNumber.setSelected(isTrue);
        var text = this.showCardNumber.getChildByName("text");
        this.selectedCB(text,isTrue)

        var player_firstOut_radioItem
        if (isClub){
            var option = this.getNumberItem("firstPutRule", 1);// == 3 ? 0 : 1;
            player_firstOut_radioItem = option
        }
        else{
            var option = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_PDK_TWOPLAYER_FIRSRPUTRULE, 1);
            player_firstOut_radioItem = option;// == 3 ? 0 : 1;
        }
        this.player_firstOut_radio.selectItem(player_firstOut_radioItem==1? 0:1);
        this.radioBoxSelectCB(player_firstOut_radioItem,this.nodeListFirstOutCard[player_firstOut_radioItem],this.nodeListFirstOutCard);
        this.musthongtao3.setVisible(player_firstOut_radioItem!=1);
        this.musthongtao3.setSelected(player_firstOut_radioItem==3);
        var text = this.musthongtao3.getChildByName("text");
        this.selectedCB(text,isTrue)

        // if (isClub)
        //     isTrue = this.getBoolItem("firstHeiTao3", true);
        // else
        //     isTrue = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_PDK_FIRSTHEITAO3, true);
        // this.firstHeiTao3.setSelected(isTrue);
        // var text = this.firstHeiTao3.getChildByName("text");
        // this.selectedCB(text,isTrue)

        if (isClub)
            isTrue = this.getBoolItem("can4dai2", true);
        else
            isTrue = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_PDK_4DAI2, true);
        this.can4dai2.setSelected(isTrue);
        var text = this.can4dai2.getChildByName("text");
        this.selectedCB(text,isTrue)

        if (isClub)
            isTrue = this.getBoolItem("can4dai3", false);
        else
            isTrue = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_PDK_4DAI3, false);
        this.can4dai3.setSelected(isTrue);
        var text = this.can4dai3.getChildByName("text");
        this.selectedCB(text,isTrue)

        if (isClub)
            isTrue = this.getBoolItem("can3dai1", false);
        else
            isTrue = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_PDK_3DAI1, false);
        this.can3dai1.setSelected(isTrue);
        var text = this.can3dai1.getChildByName("text");
        this.selectedCB(text,isTrue)

        if (isClub)
            isTrue = this.getBoolItem("hongTao10Niao", false);
        else
            isTrue = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_PDK_HONG_TAO_10_NIAO, false);
        this.hongTao10Niao.setSelected(isTrue);
        var text = this.hongTao10Niao.getChildByName("text");
        this.selectedCB(text,isTrue)

        if (this.hongTao10JiaFen){
            if (isClub)
                isTrue = this.getBoolItem("hongTao10JiaFen", false);
            else
                isTrue = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_PDK_HONG_TAO_10_JIAFEN, false);
            this.hongTao10JiaFen.setSelected(isTrue);
            var text = this.hongTao10JiaFen.getChildByName("text");
            this.selectedCB(text,isTrue)
        }

        if (isClub)
            isTrue = this.getBoolItem("fangZuoBi", false);
        else
            isTrue = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_PDK_FANG_ZUO_BI, false);
        this.fangZuoBi.setSelected(isTrue);
        var text = this.fangZuoBi.getChildByName("text");
        this.selectedCB(text, isTrue);

        if (isClub)
            isTrue = this.getBoolItem("can3aZhaDan", false);
        else
            isTrue = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_PDK_CAN_3A_ZHADAN, false);
        this.can3aZhaDan.setSelected(isTrue);
        var text = this.can3aZhaDan.getChildByName("text");
        this.selectedCB(text, isTrue);

        if (isClub)
            isTrue = this.getBoolItem("fangQiangGuan", false);
        else
            isTrue = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_PDK_FANG_QIANG_GUAN, false);
        this.fangQiangGuan.setSelected(isTrue);
        var text = this.fangQiangGuan.getChildByName("text");
        this.selectedCB(text, isTrue);

        if (isClub)
            isTrue = this.getBoolItem("isAutoTip", false);
        else
            isTrue = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_PDK_IS_AUTOTIP, false);
        this.isAutoTip.setSelected(isTrue);
        var text = this.isAutoTip.getChildByName("text");
        this.selectedCB(text, isTrue);

        if (isClub)
            isTrue = this.getBoolItem("canPutAnyFeiji", true);
        else
            isTrue = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_PDK_canPutAnyFeiji, true);
        this.canPutAnyFeiji.setSelected(isTrue);
        var text = this.canPutAnyFeiji.getChildByName("text");
        this.selectedCB(text, isTrue);

        if (isClub)
            isTrue = this.getBoolItem("canPutAnySanZhang_Jie", true);
        else
            isTrue = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_PDK_canPutAnySanZhangJie, true);
        this.canPutAnySanZhang_Jie.setSelected(isTrue);
        var text = this.canPutAnySanZhang_Jie.getChildByName("text");
        this.selectedCB(text, isTrue);

        if (isClub)
            isTrue = this.getBoolItem("canPutAnySanZhang_Chu", true);
        else
            isTrue = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_PDK_canPutAnySanZhangChu, true);
        this.canPutAnySanZhang_Chu.setSelected(isTrue);
        var text = this.canPutAnySanZhang_Chu.getChildByName("text");
        this.selectedCB(text, isTrue);

        if (isClub)
            isTrue = this.getBoolItem("Is50fengding", true);
        else
            isTrue = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_PDK_IS50FENDDING, true);
        this.Is50fengding.setSelected(isTrue);
        var text = this.Is50fengding.getChildByName("text");
        this.selectedCB(text, isTrue);
 
        if (this.checkBoxjiakoufen)
        {
            if (isClub)
                isTrue = this.getBoolItem("jiakoufen", false);
            else
                isTrue = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_PDK_JIA_KOU_FEN, false);
            this.checkBoxjiakoufen.setSelected(isTrue);
            var text = this.checkBoxjiakoufen.getChildByName("text");
            this.selectedCB(text, isTrue);            
        }

        if (this.checkBoxhavezhadan)
        {
            if (isClub)
                isTrue = this.getBoolItem("havezhadan", true);
            else
                isTrue = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_PDK_HAVE_ZHADAN, true);
            this.checkBoxhavezhadan.setSelected(isTrue);
            var text = this.checkBoxhavezhadan.getChildByName("text");
            this.selectedCB(text, isTrue);
            this.changeToHaveZhaDan();            
        }


        if (isClub)
            this._zhuIdx = this.getNumberItem("paodekuaiTY_difen", 1);
        else
            this._zhuIdx = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_PDK_DIFEN, 1);
        if (this._ZhuNum)
            this._ZhuNum.setString(this._zhuIdx + "");

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
        para.gameType = MjClient.GAME_TYPE.PAO_DE_KUAI_HBTY;
        para.maxPlayer = this._playNode_player_number_radio.getSelectIndex() == 0 ? 3 : 2;// this.playerNumber_2.isSelected() ? 2 : 3;
        para.playSpeed = this.speed_radio.getSelectIndex(); // 速度 0:快 1:中 2:慢
        para.piaofen = this.piaofen_radio.getSelectIndex(); // //飘分 ：0不飘 1飘123 2飘235 3飘258
        para.cardNumIndex = this._card_number_radio.getSelectIndex();   // 手牌数量 0:16张手牌  1:15张手牌
        // para.firstHeiTao3 = this.firstHeiTao3.isSelected();   // 黑桃3先出
        para.mustPut  = !this.checkBoxNotMustPut.isSelected();  //是否必管(界面上的反义)
        para.zhaDanBuChai = this.zhaDanBuChai.isSelected();     // 炸弹不可拆
        para.showCardNumber = this.showCardNumber.isSelected(); // 显示牌数量
        para.can4dai2 = this.can4dai2.isSelected();     // 4带2
        para.can4dai3 = this.can4dai3.isSelected();     // 4带3
        para.can3dai1 = this.can3dai1.isSelected();     // 3带1
        para.hongTao10Niao = this.hongTao10Niao.isSelected();   // 红桃10扎鸟
        para.fangZuoBi = this.fangZuoBi.isSelected();
        para.can3aZhaDan = this.can3aZhaDan.isSelected();
        para.fangQiangGuan = this.fangQiangGuan.isSelected();
        para.isAutoTip = this.isAutoTip.isSelected();
        para.canPutAnyFeiji = this.canPutAnyFeiji.isSelected();
        para.canPutAnySanZhang_Jie = this.canPutAnySanZhang_Jie.isSelected();
        para.canPutAnySanZhang_Chu = this.canPutAnySanZhang_Chu.isSelected();
        para.hongTao10JiaFen = this.hongTao10JiaFen ?this.hongTao10JiaFen.isSelected():false;   // 红桃10加分
        para.jiakoufen = this.checkBoxjiakoufen.isSelected();
        para.havezhadan = this.checkBoxhavezhadan.isSelected();
        para.isVieGuan = this.isVieGuan.isSelected();
        para.Is50fengding = this.Is50fengding.isSelected();
        para.dingpiaofen = this.dingpiaoAry[this.dingpiaoIndex];

        //炸弹算分
        var zhadanScoreIndex = this.play_zhadanscore_radio.getSelectIndex();
        para.zhadanscore = this.zhadanScoreAry[zhadanScoreIndex];

        // 切牌
        if (this.shuffle_radio) {
            para.isPlayerShuffle = this.shuffle_radio.getSelectIndex();
        }

        if(this._nodeGPS) para.gps = this._nodeGPS.isSelected(); // add by sking for creat room need gps
        if (this._ZhuNum) {
            para.paodekuaiTY_difen = this._zhuIdx;
            if (!this._isFriendCard)
                util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_PDK_DIFEN, para.paodekuaiTY_difen);
        }
        

        if (!this._isFriendCard){
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_PDK_PLAYERNUMBER, para.maxPlayer);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_PDK_PLAYSPEED, para.playSpeed);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_PDK_PIAO_FEN, para.piaofen);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_PDK_CARDNUMBER, para.cardNumIndex);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_PDK_MUST_PUT, para.mustPut);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_PDK_ZHADANBUCHAI, para.zhaDanBuChai);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_PDK_SHOWCARDNUMBER, para.showCardNumber);

            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_PDK_4DAI2, para.can4dai2);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_PDK_4DAI3, para.can4dai3);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_PDK_3DAI1, para.can3dai1);            
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_PDK_HONG_TAO_10_NIAO, para.hongTao10Niao);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_PDK_FANG_QIANG_GUAN, para.fangQiangGuan)
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_PDK_HONG_TAO_10_JIAFEN, para.hongTao10JiaFen);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_PDK_JIA_KOU_FEN, para.jiakoufen);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_PDK_HAVE_ZHADAN, para.havezhadan);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_PDK_IS_VIEGUAN, para.isVieGuan);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_PDK_IS50FENDDING, para.Is50fengding);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_PDK_ZHADANSCORE, para.zhadanscore);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_PDK_DING_PIAO, para.dingpiaofen);            
        }

        // 首出规则
        //1、幸运翻牌（选项）：第一局出牌前，系统随机翻一张牌，归属为谁谁先出牌. 之后是赢家先出牌. 
        //2、红桃3（选项）：第一局发到红桃3玩家为庄家，庄家先出手出牌，后面每局都为上一局赢家.
        //3、红桃3首出（勾选了红桃3后才有）：首轮出牌，必须包含红桃3的牌型.

        // 两个人的时候屏蔽防作弊选项，但不清除之前保存的选择
        // （如上次3人选择防作弊，这次2人的时候不会显示防作弊选项，并且不勾选，下次三个人的时候仍然还是选择了防作弊）
        if (para.maxPlayer == 2){
            para.fangZuoBi = false;
            // para.firstHeiTao3 = this.player_firstOut_radio.getSelectIndex() == 0 ? true : false;   // 黑桃3先出
            para.fangQiangGuan = false;
        }

        // //兼容服务器其他通用跑得快
        // var player_firstOut_radioItem = this.player_firstOut_radio.getSelectIndex();
        // if (player_firstOut_radioItem == 0 ) player_firstOut_radioItem = para.maxPlayer == 2? 3:1;
        // else if (player_firstOut_radioItem == 1 ) player_firstOut_radioItem = 2; 
        // else if (player_firstOut_radioItem == 2) player_firstOut_radioItem = 4;
        // else if (player_firstOut_radioItem == 3 ) player_firstOut_radioItem = para.maxPlayer == 2? 3:1;
        // else if (player_firstOut_radioItem == 4 ) player_firstOut_radioItem = 2; 
        // else if (player_firstOut_radioItem == 5) player_firstOut_radioItem = 4;

        // para.isPreRoundFirstRule = this.player_firstOut_radio.getSelectIndex()>=3;
        // para.firstPutRule = player_firstOut_radioItem;// == 0 ? 3 : 4;

        // if (!this._isFriendCard)
        // {
        //     util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_PDK_TWOPLAYER_FIRSRPUTRULE, para.firstPutRule);
        //     util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_PDK_IS_PER_FIRST_RULE, para.isPreRoundFirstRule);
        // }

        var player_firstOut_radioItem = this.player_firstOut_radio.getSelectIndex();
        if (player_firstOut_radioItem == 0)
            para.firstPutRule = 1;
        else
            para.firstPutRule = this.musthongtao3.isSelected()? 3:2;

        // }else{
            // para.firstPutRule = this.firstHeiTao3.isSelected() ? 1 : 2;
            // if (!this._isFriendCard)
            //     util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_PDK_FANG_ZUO_BI, para.fangZuoBi);
            // var isFirstHeiTao3 = this.firstHeiTao3.isSelected()
            // if (!this._isFriendCard)
            //     util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_PDK_FIRSTHEITAO3, isFirstHeiTao3);
        // }
        if (!this._isFriendCard){
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_PDK_CAN_3A_ZHADAN, para.can3aZhaDan);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_PDK_IS_AUTOTIP, para.isAutoTip)
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_PDK_canPutAnyFeiji, para.canPutAnyFeiji);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_PDK_canPutAnySanZhangJie, para.canPutAnySanZhang_Jie);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_PDK_canPutAnySanZhangChu, para.canPutAnySanZhang_Chu);            
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_PDK_TWOPLAYER_FIRSRPUTRULE, para.firstPutRule);
            if (this.shuffle_radio){
                util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_PDK_SHUFFLE_OPTION, para.isPlayerShuffle);
            }
        }
        // 15张牌没有3个a， 所以不提示3a炸弹
        if(1 == para.cardNumIndex) para.can3aZhaDan = false;

        this.getExtraSelectedPara(para);

        cc.log("createara: " + JSON.stringify(para));

        return para;
    },

    initDingPiaoList : function(piao0Node)
    {
        var xl_piaofelist = piao0Node.getChildByName("xl_piaofelist");
        xl_piaofelist.setVisible(false);
        for(var i = 1; i <= 6; i++)
        {
            var xltext = xl_piaofelist.getChildByName("text" + i);
            xltext.exValue = i-1;
            xltext.setTouchEnabled(true);
            xltext.addTouchEventListener(function(sender,type){
                if(type == 2)
                {
                    this.dingpiaoIndex = sender.exValue;
                    var dingpiao = this.dingpiaoAry[sender.exValue];
                    var text = piao0Node.getChildByName("text");
                    text.setString(dingpiao == 0? "  不飘         ":"  飘"+ dingpiao + "分        ");
                    xl_piaofelist.setVisible(false);
                }
            }
            , this);
        }
    },

    onClickPiao0 : function(piao0Node)
    {
        var xl_piaofelist = piao0Node.getChildByName("xl_piaofelist");
        xl_piaofelist.setVisible(!xl_piaofelist.isVisible());
    }
});