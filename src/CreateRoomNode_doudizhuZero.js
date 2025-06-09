/**
 * Created by sking on 2017/7/21.
 */


var CreateRoomNode_doudizhuZERO = CreateRoomNode.extend({
    setKey:function()
    {
        this.localStorageKey.KEY_DDZZERO_playerNumber       = "_DOU_DI_ZHU_ZERO_PLAYER_NUMBER";     //玩家数量
        this.localStorageKey.KEY_DDZZERO_fengding           = "_DOU_DI_ZHU_ZERO_FENG_DING";           //封顶 封顶
        this.localStorageKey.KEY_DDZZERO_dizhu               = "_DI_ZHU_ZERO_FENG_DING";           //底分
        this.localStorageKey.KEY_DDZZERO_type            = "_DOU_DI_ZHU_TYPE";           //类型
        //this.localStorageKey.KEY_DDZZERO_yingjiachu           = "_DOU_DI_ZHU_yingjiachu";         //赢家出
        this.localStorageKey.KEY_DDZZERO_gps      = "_DOU_DI_ZHU_ZERO_GPS"; //防作弊
        this.localStorageKey.KEY_DDZZERO_shuangwangbijiao                = "_DOU_DI_ZHU_ZERO_SHUANG_WANG_BIJIAO";                //双王必叫
        this.localStorageKey.KEY_DDZZERO_sigeerbijiao                = "_DOU_DI_ZHU_ZERO_SI_GE_ER_BIJIAO";                //四个二必叫


    },
    initAll:function(IsFriendCard)
    {
        if (!IsFriendCard)
            this.setKey();

        this.bg_node = ccs.load("bg_doudizhuJZ.json").node;
        this.addChild(this.bg_node);
        this.bg_node = this.bg_node.getChildByName("bg_node");
        this.playScroll = this.bg_node.getChildByName("playScroll");
        this._scroll_round = this.playScroll.getChildByName("round");
    },
    initPlayNode:function()
    {
        if(MjClient.APP_TYPE.QXJSMJ == MjClient.getAppType())
        {
            this._super();
        }

        var _bg_Node = this.playScroll;
    
        var _playWay = _bg_Node.getChildByName("play");
        this._playNode_fengding_0 = _playWay.getChildByName("play_fengding0");
        this._playNode_fengding_1 = _playWay.getChildByName("play_fengding1");
        this._playNode_fengding_2 = _playWay.getChildByName("play_fengding2");
        var nodeListfeng = [];
        nodeListfeng.push( this._playNode_fengding_0 );
        nodeListfeng.push( this._playNode_fengding_1 );
        nodeListfeng.push( this._playNode_fengding_2 );
        this._playNode_feng_radio = createRadioBoxForCheckBoxs(nodeListfeng,this.radioBoxSelectCB);
        this.addListenerText(nodeListfeng,this._playNode_feng_radio);

        this._playNode_type_0 = _playWay.getChildByName("play_type");
        this._playNode_type_1 = _playWay.getChildByName("play_type1");
        var nodeListtype = [];
        nodeListtype.push( this._playNode_type_0 );
        nodeListtype.push( this._playNode_type_1 );
        this._playNode_type_radio = createRadioBoxForCheckBoxs(nodeListtype,function(index){
            this.showPlayType(index);
            // this.changePayForPlayerNum(index);
            this.radioBoxSelectCB(index, nodeListtype[index], nodeListtype);
        }.bind(this));
        this.addListenerText(nodeListtype,this._playNode_type_radio,this.showPlayType.bind(this));
        this._playTypelist = nodeListtype;


        //底分
        // this._zhuIdx = 0;//数组的引索
        // this._ZhuNum = _bg_Node.getChildByName("txt_fen");
        // this._ZhuNum.setString(this._zhuIdx+1);
        // this._Button_sub = _bg_Node.getChildByName("btn_sub");
        // this._Button_sub.addTouchEventListener(function(sender, type) {
        //     if (type == 2) {
        //         this._zhuIdx = (10 + --this._zhuIdx)%10;
        //         this._ZhuNum.setString(this._zhuIdx+1);
        //     }
        // }, this);
        // this._Button_add = _bg_Node.getChildByName("btn_add");
        // this._Button_add.addTouchEventListener(function(sender, type) {
        //     if (type == 2) {
        //         this._zhuIdx = (10 + ++this._zhuIdx)%10;
        //         this._ZhuNum.setString(this._zhuIdx+1);
        //     }
        // }, this);

        this._zhuIdx = 0;//数组的引索
        var _fenshu = [1,2,3,4,5,6,7,8,9,10,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9];
        var _arrayLenth =  _fenshu.length;//数组长度
        this._ZhuNum = _bg_Node.getChildByName("txt_fen");
        this._ZhuNum.setString(_fenshu[this._zhuIdx]);
        this._Button_sub = _bg_Node.getChildByName("btn_sub");
        this._Button_sub.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                this._zhuIdx = (_arrayLenth + --this._zhuIdx)%_arrayLenth;
                this._ZhuNum.setString(_fenshu[this._zhuIdx]);
                this.setRoomCardModeFree(_fenshu[this._zhuIdx]);
            }
        }, this);
        this._Button_add = _bg_Node.getChildByName("btn_add");
        this._Button_add.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                this._zhuIdx = (_arrayLenth + ++this._zhuIdx)%_arrayLenth;
                this._ZhuNum.setString(_fenshu[this._zhuIdx]);
                this.setRoomCardModeFree(_fenshu[this._zhuIdx]);
            }
        }, this);


        //防作弊
        this._playNode_gps = this.bg_node.getChildByName("play_gps");
        this.addListenerText(this._playNode_gps);
        this._playNode_gps.addEventListener(this.clickCB, this._playNode_gps);
        COMMON_UI.addHelpUI(this._playNode_gps);

        //加倍
        this._playNode_jiabei = _playWay.getChildByName("play_jiabei");   //加倍
        this.addListenerText(this._playNode_jiabei);
        this._playNode_jiabei.addEventListener(this.clickCB, this._playNode_jiabei);

        this._playNode_bijiaoshuangwang = _playWay.getChildByName("play_bijiaoshuangwang");   //双王必叫
        this.addListenerText(this._playNode_bijiaoshuangwang);
        this._playNode_bijiaoshuangwang.addEventListener(this.clickCB, this._playNode_bijiaoshuangwang);

        this._playNode_bijiaosigeer = _playWay.getChildByName("play_bijiaosigeer");   //四个二必叫
        this.addListenerText(this._playNode_bijiaosigeer);
        this._playNode_bijiaosigeer.addEventListener(this.clickCB, this._playNode_bijiaosigeer);

    },
    initRoundNode:function()
    {
       this._super();
       //打开大赢家付
        this.payWayNodeArray[2].visible = true;
        this.payWayNodeArray[2].setEnabled(true);
    },
    setPlayNodeCurrentSelect:function(isClub) {
        if (MjClient.APP_TYPE.QXJSMJ == MjClient.getAppType()) {
            this._super();
        }
        //设置上次创建房间时的默认选项
        var _fengDing;
        if (isClub)
            _fengDing = this.getNumberItem("zhafengding", 3);
        else
            _fengDing = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_DDZZERO_fengding, 3);
        this._playNode_fengding_0.setSelected(false);
        this._playNode_fengding_1.setSelected(false);
        this._playNode_fengding_2.setSelected(false);

        var list = [];
        list.push(this._playNode_fengding_0);
        list.push(this._playNode_fengding_1);
        list.push(this._playNode_fengding_2);
        var index = 0;

        if (_fengDing == 3) {
            this._playNode_fengding_0.setSelected(true);
            index = 0;
        }
        else if (_fengDing == 4) {
            index = 1;
            this._playNode_fengding_1.setSelected(true);
        }
        else if (_fengDing == 5) {
            index = 2;
            this._playNode_fengding_2.setSelected(true);
        }
        this.radioBoxSelectCB(index, list[index], list);

        var _type;
        if (isClub) {
            _type = this.getStringItem("type", "jingdian");
            if (_type == "jingdian") _type = 1;
            else _type = 0;
        }
        else
            _type = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_DDZZERO_type, 1);
        this._playNode_type_radio.selectItem(_type);
        this.radioBoxSelectCB(_type, this._playTypelist[_type], this._playTypelist);


        // this._playNode_type_0.setSelected(false);
        // this._playNode_type_1.setSelected(false);
        // var listtype = [];
        // listtype.push(this._playNode_type_0);
        // listtype.push(this._playNode_type_1);
        // var index = 0;
        // if(_type ==0 )
        // {
        //     this._playNode_type_0.setSelected(true);
        //     index = 0;
        // }
        // else if (_type == 1)
        // {
        //     index = 1;
        //     this._playNode_type_1.setSelected(true);
        // }
        // this.radioBoxSelectCB(index,listtype[index],listtype);
        this.showPlayType(_type);
        var _difen;
        var _fenshu = [1,2,3,4,5,6,7,8,9,10,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9];
        if (isClub) {
            _difen = _fenshu.indexOf(this.getNumberItem("difen", 1));
        }
        else
            _difen = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_DDZZERO_dizhu, 0);
        this._zhuIdx = (_fenshu.length + _difen)%_fenshu.length;
        this._ZhuNum.setString(_fenshu[this._zhuIdx]);
        //防作弊
        var _gps;
        if (isClub)
            _gps = this.getBoolItem("gps", false);
        else
            _gps = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_DDZZERO_gps, false);
        this._playNode_gps.setSelected(_gps);
        var text = this._playNode_gps.getChildByName("text");
        this.selectedCB(text, _gps);

        //加倍
        var _jiabei;
        if(isClub)
            _jiabei = this.getBoolItem("jiabei", false);
        else
            _jiabei = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_DDZ_LVLIANG_jiabei, false);
        this._playNode_jiabei.setSelected(_jiabei);
        var text = this._playNode_jiabei.getChildByName("text");
        this.selectedCB(text, _jiabei);

        //双王必叫
        var _shuangwangbijiao;
        if(isClub)
            _shuangwangbijiao = this.getBoolItem("bijiaoShuangwang", true);
        else
            _shuangwangbijiao = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_DDZZERO_shuangwangbijiao, true);
        this._playNode_bijiaoshuangwang.setSelected(_shuangwangbijiao);
        var text = this._playNode_bijiaoshuangwang.getChildByName("text");
        this.selectedCB(text, _shuangwangbijiao);

        //四个二必叫
        var _sigeerbijiao;
        if(isClub)
            _sigeerbijiao = this.getBoolItem("bijiaoSigeer", true);
        else
            _sigeerbijiao = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_DDZZERO_sigeerbijiao, true);
        this._playNode_bijiaosigeer.setSelected(_sigeerbijiao);
        var text = this._playNode_bijiaosigeer.getChildByName("text");
        this.selectedCB(text, _sigeerbijiao);
    },
    getSelectedPara:function()
    {
        var para = {};
        para.gameType = MjClient.GAME_TYPE.DOU_DI_ZHU_ZERO;
        para.maxPlayer = 3;
        para.zhafengding  = 3;
        para.difen = 1;
        para.type = "jingdian";
        // para.showHandCount            = this._playNode_showCount.isSelected();
        // para.yingjiaxianchu     = this._playNode_yingjiaxiaochu.isSelected();
        para.bijiaoShuangwang=false;
        para.bijiaoSigeer=false;

        if(this._nodeGPS) para.gps = this._nodeGPS.isSelected(); // add by sking for creat room need gps

        if(this._playNode_fengding_0.isSelected())
        {
            para.zhafengding = 3;
        }
        else if(this._playNode_fengding_1.isSelected())
        {
            para.zhafengding = 4;
        }
        else if(this._playNode_fengding_2.isSelected())
        {
            para.zhafengding = 5;
        }


        var _type = 0;
        if(this._playNode_type_0.isSelected())
        {
            _type = 0;
            para.type = "huanle";
        }else if(this._playNode_type_1.isSelected())
        {
            _type = 1;
            para.type = "jingdian";
            para.bijiaoShuangwang = this._playNode_bijiaoshuangwang.isSelected();
            para.bijiaoSigeer = this._playNode_bijiaosigeer.isSelected();
            para.jiabei = this._playNode_jiabei.isSelected();
        }



        // para.difen = parseInt(this._ZhuNum.getString());
        para.difen = this._ZhuNum.getString();

        //防作弊
        para.gps = this._playNode_gps.isSelected();
        if (!this._isFriendCard) {
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_DDZZERO_fengding,para.zhafengding);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_DDZZERO_type, _type);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_DDZZERO_shuangwangbijiao, para.bijiaoShuangwang);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_DDZZERO_sigeerbijiao, para.bijiaoSigeer);
            if (para.type == "jingdian") //只有经典才有加倍
            {
                util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_DDZ_LVLIANG_jiabei, para.jiabei);
            }
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_DDZZERO_dizhu, this._zhuIdx);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_DDZZERO_gps,  para.gps);
        }
        cc.log("createara: " + JSON.stringify(para));
        return para;
    },
    showPlayType:function (index) {
        if(index==0)
        {
            this._playNode_bijiaosigeer.setVisible(false);
            this._playNode_bijiaoshuangwang.setVisible(false);
            this._playNode_jiabei.setVisible(false);
        }
        else
        {
            this._playNode_bijiaosigeer.setVisible(true);
            this._playNode_bijiaoshuangwang.setVisible(true);
            this._playNode_jiabei.setVisible(true);
        }
    }
});