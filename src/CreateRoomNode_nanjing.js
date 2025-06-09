/**
 * Created by maoyu on 2017/7/21.
 */


var CreateRoomNode_nanjing = CreateRoomNode.extend({
    initAll:function()
    {
        this.localStorageKey.KEY_nanjing_playWay      = "_NAN_JING_PLAY_WAY";         //当前选择项，0，进园子，1，敞开头
        this.localStorageKey.KEY_nanjing_HuaZa        = "_NAN_JING_HUA_ZA";           //是否花砸2
        this.localStorageKey.KEY_nanjing_JieZhuangBi  = "_NAN_JING_JIE_ZHUANG_BI";    //是否接庄比
        this.localStorageKey.KEY_nanjing_limt300      = "_NAN_JING_LIMT_300";         //是否单把300上限

        this.bg_node = ccs.load("bg_nanjing.json").node;
        this.addChild(this.bg_node);
        this.bg_node = this.bg_node.getChildByName("bg_nanjing");
    },
    initPlayNode:function()
    {
        this._super();
        var _bgNanjingNode = this.bg_node.getChildByName("view");
        var _round = _bgNanjingNode.getChildByName("round");

        var _playWay = _bgNanjingNode.getChildByName("play_way");
        this._playWayJinYuanzi = _playWay.getChildByName("play_Jinyuanzi");
        //
        // //进园子
        // this._playWayJinYuanzi.addEventListener(function(sender,type)
        // {
        //     switch (type) {
        //         case ccui.CheckBox.EVENT_SELECTED:
        //         case ccui.CheckBox.EVENT_UNSELECTED:
        //             this._playWayJinYuanzi.setSelected(true);
        //             this._playWayChangkaitou.setSelected(false);
        //             this._playWayJiezhuangbi.visible = true;
        //             this._playWayHuaza2.visible = true;
        //             this._playWuxianzhi.visible = false;
        //             this._playUpto300.visible = false;
        //
        //             break;
        //     }
        // },this);
        //
        // //敞开头
         this._playWayChangkaitou = _playWay.getChildByName("play_Changkaitou");
        // this._playWayChangkaitou.addEventListener(function(sender,type)
        // {
        //     switch (type) {
        //         case ccui.CheckBox.EVENT_SELECTED:
        //         case ccui.CheckBox.EVENT_UNSELECTED:
        //             this._playWayJinYuanzi.setSelected(false);
        //             this._playWayChangkaitou.setSelected(true);
        //             this._playWayJiezhuangbi.visible = false;
        //             this._playWayHuaza2.visible = false;
        //             this._playWuxianzhi.visible = true;
        //             this._playUpto300.visible = true;
        //             this._playUpto300.setSelected(false);
        //             this._playWuxianzhi.setSelected(true);
        //             break;
        //     }
        // },this);


        var nodePlayList = [];
        nodePlayList.push( _playWay.getChildByName("play_Jinyuanzi") );
        nodePlayList.push( _playWay.getChildByName("play_Changkaitou") );
        this._playNode_player_play_radio = createRadioBoxForCheckBoxs(nodePlayList,function(index){
            cc.log("==============================index = " + index);
            if(index == 0)
            {
                this._playWayJiezhuangbi.visible = true;
                this._playWayHuaza2.visible = true;
                this._playWuxianzhi.visible = false;
                this._playUpto300.visible = false;
            }
            else {
                this._playWayJiezhuangbi.visible = false;
                this._playWayHuaza2.visible = false;
                this._playWuxianzhi.visible = true;
                this._playUpto300.visible = true;
                this._playUpto300.setSelected(false);
                this._playWuxianzhi.setSelected(true);
            }

            this.radioBoxSelectCB(index, nodePlayList[index], nodePlayList);
        }.bind(this));
        this.addListenerText(nodePlayList, this._playNode_player_play_radio,function(index){
            cc.log("==============================index = " + index);
            if(index == 0)
            {
                this._playWayJiezhuangbi.visible = true;
                this._playWayHuaza2.visible = true;
                this._playWuxianzhi.visible = false;
                this._playUpto300.visible = false;
            }
            else {
                this._playWayJiezhuangbi.visible = false;
                this._playWayHuaza2.visible = false;
                this._playWuxianzhi.visible = true;
                this._playUpto300.visible = true;
                this._playUpto300.setSelected(false);
                this._playWuxianzhi.setSelected(true);
            }

            this.radioBoxSelectCB(index, nodePlayList[index], nodePlayList);
        }.bind(this));


        //接庄比
        this._playWayJiezhuangbi = _playWay.getChildByName("play_Jiezhuangbi");
        this.addListenerText(this._playWayJiezhuangbi);
        this._playWayJiezhuangbi.addEventListener(this.clickCB, this._playWayJiezhuangbi);

        // this._playWayJiezhuangbi.addEventListener(function(sender,type)
        // {
        //     switch (type) {
        //         case ccui.CheckBox.EVENT_SELECTED:
        //             this._playWayJiezhuangbi.setSelected(true);
        //             break;
        //         case ccui.CheckBox.EVENT_UNSELECTED:
        //             this._playWayJiezhuangbi.setSelected(false);
        //             break;
        //     }
        // },this);

        //花砸2
        this._playWayHuaza2 = _playWay.getChildByName("play_Huaza2");
        this.addListenerText(this._playWayHuaza2);
        this._playWayHuaza2.addEventListener(this.clickCB, this._playWayHuaza2);
        // this._playWayHuaza2.addEventListener(function(sender,type)
        // {
        //     switch (type) {
        //         case ccui.CheckBox.EVENT_SELECTED:
        //             this._playWayHuaza2.setSelected(true);
        //             break;
        //         case ccui.CheckBox.EVENT_UNSELECTED:
        //             this._playWayHuaza2.setSelected(false);
        //             break;
        //     }
        // },this);

        // //结算无限制
         this._playWuxianzhi = _playWay.getChildByName("play_Wuxianzhi");
        // this._playWuxianzhi.addEventListener(function(sender,type)
        // {
        //     switch (type) {
        //         case ccui.CheckBox.EVENT_SELECTED:
        //         case ccui.CheckBox.EVENT_UNSELECTED:
        //             this._playUpto300.setSelected(false);
        //             this._playWuxianzhi.setSelected(true);
        //             break;
        //     }
        // },this);
        //
        // //结算300上限
        this._playUpto300 = _playWay.getChildByName("play_up300");
        // this._playUpto300.addEventListener(function(sender,type)
        // {
        //     switch (type) {
        //         case ccui.CheckBox.EVENT_SELECTED:
        //         case ccui.CheckBox.EVENT_UNSELECTED:
        //             this._playUpto300.setSelected(true);
        //             this._playWuxianzhi.setSelected(false);
        //             break;
        //     }
        // },this);

        var nodeXianZhiList = [];
        nodeXianZhiList.push( _playWay.getChildByName("play_Wuxianzhi") );
        nodeXianZhiList.push( _playWay.getChildByName("play_up300") );
        this._playNode_player_xianzhi_radio = createRadioBoxForCheckBoxs(nodeXianZhiList,this.radioBoxSelectCB);
        this.addListenerText(nodeXianZhiList, this._playNode_player_xianzhi_radio,function(index){
        }.bind(this));
        this._XianZhiList = nodeXianZhiList;

        //人数
        this._playNode_maxPlayer0 = _playWay.getChildByName("play_count0");
        this._playNode_maxPlayer1 = _playWay.getChildByName("play_count1");
        this._playNode_maxPlayer2 = _playWay.getChildByName("play_count2");
        this._playNode_maxPlayer3 = _playWay.getChildByName("play_count3");
        //this._playNode_maxPlayer2.visible = false;
        var nodeCountList1 = [];
        nodeCountList1.push(_playWay.getChildByName("play_count0"));
        nodeCountList1.push(_playWay.getChildByName("play_count1"));
        nodeCountList1.push(_playWay.getChildByName("play_count2"));
        nodeCountList1.push(_playWay.getChildByName("play_count3"));
        this._playNode_player_count_radio = createRadioBoxForCheckBoxs(nodeCountList1, function(index){
            this.changePayForPlayerNum(index);
            this.radioBoxSelectCB(index, nodeCountList1[index], nodeCountList1);
        }.bind(this));
        this.addListenerText(nodeCountList1, this._playNode_player_count_radio,this.changePayForPlayerNum.bind(this));
        this._countlist = nodeCountList1;

        this.initPlayNumNode(nodeCountList1, [4, 3, 2, 4]);


        // //默认园子
        // this._playWayJinYuanzi.setSelected(true);
        // this._playWayChangkaitou.setSelected(false);
        // this._playWayJiezhuangbi.visible = true;
        // this._playWayHuaza2.visible = true;
        // this._playWuxianzhi.visible = false;
        // this._playUpto300.visible = false;

    },
    setPlayNodeCurrentSelect:function(isClub)
    {
        this._super();
        var _list = [];
        _list.push(this._playWayJinYuanzi);
        _list.push(this._playWayChangkaitou);

        var _currentPlayWay;
        if (isClub)
            _currentPlayWay = this.getNumberItem("playType", 0);
        else
            _currentPlayWay = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_nanjing_playWay, 0);

        cc.log("==================_currentPlayWay = " + _currentPlayWay);
        this._playWayJinYuanzi.setSelected(!_currentPlayWay);
        this._playWayChangkaitou.setSelected(_currentPlayWay);
        var index = _currentPlayWay;
        this._playNode_player_play_radio.selectItem(index);
        this.radioBoxSelectCB(index, _list[index], _list);


        var nanjing_HuaZa;
        if (isClub)
            nanjing_HuaZa = this.getBoolItem("isHuaZa", true);
        else
            nanjing_HuaZa = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_nanjing_HuaZa,true);
        this._playWayHuaza2.setSelected(nanjing_HuaZa);
        var text = this._playWayHuaza2.getChildByName("text");
        this.selectedCB(text,nanjing_HuaZa);

        var nanjing_JieZhuangBi;
        if (isClub)
            nanjing_JieZhuangBi = this.getBoolItem("isJieZhuangBi", true);
        else
            nanjing_JieZhuangBi = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_nanjing_JieZhuangBi,true);
        this._playWayJiezhuangbi.setSelected(nanjing_JieZhuangBi);
        var text = this._playWayJiezhuangbi.getChildByName("text");
        this.selectedCB(text,nanjing_JieZhuangBi);




        var _currentLimitWay;
        if (isClub)
            _currentLimitWay = this.getBoolItem("islimit300", 0);
        else
            _currentLimitWay = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_nanjing_limt300, 0);

        this._playWuxianzhi.setSelected(_currentLimitWay);
        this._playUpto300.setSelected(!_currentLimitWay);
        var index = _currentLimitWay ==  true ? 1 : 0;
        this._playNode_player_xianzhi_radio.selectItem(index);
        this.radioBoxSelectCB(index, this._XianZhiList[index], this._XianZhiList);



        //人数
        var _currentCount;
        if (isClub)
            if (this.getBoolItem("convertible", false))
                _currentCount = 3;
            else
                _currentCount = [4, 3, 2].indexOf(this.getNumberItem("maxPlayer", 4));
        else
            _currentCount = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_LYG_count, 0);
        if(_currentCount  == 2 )
        {
            _currentCount =  util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_LYG_count_1,0) == 1 ? 1:0 ;
        }
        this._playNode_player_count_radio.selectItem(_currentCount);
        this.radioBoxSelectCB(_currentCount, this._countlist[_currentCount], this._countlist);
        this.changePayForPlayerNum();

        if(_currentPlayWay == 0) //进圆子
        {
            this._playWuxianzhi.visible = false;
            this._playUpto300.visible = false;
            this._playWayHuaza2.visible = true;
            this._playWayJiezhuangbi.visible = true;
        }
        else { //敞开头

            this._playWuxianzhi.visible = true;
            this._playUpto300.visible = true;
            this._playWayHuaza2.visible = false;
            this._playWayJiezhuangbi.visible = false;
        }

    },
    getSelectedPara:function()
    {
        var para = {};
        para.gameType = MjClient.GAME_TYPE.NAN_JING;
        para.maxPlayer = 4;
        para.playType = 0;//0 进园子，1，敞开头

        //进园子选项
        para.isHuaZa = true; //是否花砸2
        para.isJieZhuangBi = true; //是否接庄比

        //敞开头选项
        para.islimit300 = true;//是否 单把300上限，false 为无限制

        if(this._nodeGPS) para.gps = this._nodeGPS.isSelected();// add by sking for creat room need gps

        if(this._playWayJinYuanzi.isSelected())
        {
            //进园子玩法
            if(this._playWayJiezhuangbi.isSelected())
            {
                para.isJieZhuangBi = true;
            }
            else
            {
                para.isJieZhuangBi = false;
            }
            cc.log("===========isJieZhuangBi = " + para.isJieZhuangBi);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_nanjing_JieZhuangBi, para.isJieZhuangBi);


            if(this._playWayHuaza2.isSelected())
            {
                para.isHuaZa = true;
            }else{
                para.isHuaZa = false;
            }

            cc.log("===========isHuaZa = " + para.isHuaZa);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_nanjing_HuaZa, para.isHuaZa);

            para.playType = 0;
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_nanjing_playWay, para.playType);
        }else{
            //敞开头玩法
            if(this._playWuxianzhi.isSelected())
            {
                para.islimit300 = false;
            }
            else if(this._playUpto300.isSelected())
            {
                para.islimit300 = true;
            }

            cc.log("===========islimit300 = " + para.islimit300);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_nanjing_limt300, para.islimit300);

            para.playType = 1;
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_nanjing_playWay, para.playType);
        }



        //人数
        var _countIdx = 0;
        para.convertible = false;
        if (this._playNode_maxPlayer0.isSelected()) {
            para.maxPlayer = 4;
            _countIdx = 0;
        }
        else if (this._playNode_maxPlayer1.isSelected()) {
            para.maxPlayer = 3;
            _countIdx = 1;
        }
        else if (this._playNode_maxPlayer2.isSelected()) {
            para.maxPlayer = 2;
            _countIdx = 2;
        }
        else if (this._playNode_maxPlayer3.isSelected()) {
            para.maxPlayer = 4;
            para.convertible = true;
            _countIdx = 3;
        }


        if (!this._isFriendCard) {
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_LYG_count, _countIdx)
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_LYG_count_1, _countIdx)
        }

        cc.log("createara: " + JSON.stringify(para));
        return para;
    }
});