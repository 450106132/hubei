/**
 * Created by WuXiaoDong on 2017/12/16.
 */


var CreateRoomNode_LiuHuQiang = CreateRoomNode.extend({
    onExit:function()
    {
        this._super();
        MjClient.MaxPlayerNum_leiyang = 4;
    },
    initAll:function()
    {
        if(MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP) {
            this._costName = '房卡';
        }
        if (!this._isFriendCard){
            this.localStorageKey.KEY_HYLiuHuQiang_maxPlayer       = "_HYLiuHuQiang_maxPlayer";          //几人玩
            this.localStorageKey.KEY_HYLiuHuQiang_xingType    = "_HYLiuHuQiang_xingType";       //醒
            this.localStorageKey.KEY_HYLiuHuQiang_xiType      = "_HYLiuHuQiang_xiType";         //息
            this.localStorageKey.KEY_HYLiuHuQiang_suanfenType      = "_HYLiuHuQiang_suanfenType";         //算分
            this.localStorageKey.KEY_HYLiuHuQiang_mingwei        = "_HYLiuHuQiang_mingwei";           //明偎
            this.localStorageKey.KEY_HYLiuHuQiang_yiwushi     = "_HYLiuHuQiang_yiwushi";        //一五十
            this.localStorageKey.KEY_HYLiuHuQiang_hongheidian= "_HYLiuHuQiang_hongheidian";   //红黑点
            this.localStorageKey.KEY_HYLiuHuQiang_tianhu= "_HYLiuHuQiang_tianhu";   //天地胡
            this.localStorageKey.KEY_HYLiuHuQiang_dihu= "_HYLiuHuQiang_dihu";   //天地胡
            this.localStorageKey.KEY_HYLiuHuQiang_qiepai= "_HYLiuHuQiang_qiepai";   //切牌
            this.localStorageKey.KEY_HYLiuHuQiang_maiPai        = "_HYShiHuKa_maiPai"; //埋牌
            this.localStorageKey.KEY_HYLiuHuQiang_zhangShu= "_HYLiuHuQiang_zhangShu";   //21张
        }

        // var majiang = MjClient.data.gameInfo.js3mj;
        // this.fangzhuPay = {pay4:majiang.roundHYLHQ12,  pay8:majiang.roundHYLHQ8,  pay16:majiang.roundHYLHQ16};
        // this.AAPay      = {pay4:majiang.roundHYLHQAA12,pay8:majiang.roundHYLHQAA8,pay16:majiang.roundHYLHQAA16};
        // this.clubPay    = {pay4:majiang.roundHYLHQCL12,pay8:majiang.roundHYLHQCL8,pay16:majiang.roundHYLHQCL16};

        this.roundNumObj = {roundNum1:8, roundNum2:10, roundNum3:12};
        if (MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ) {
            this.roundNumObj = {roundNum1:5, roundNum2:10, roundNum3:20};
        }
        
        this.bg_node = ccs.load("bg_LiuHuQiang.json").node;
        this.addChild(this.bg_node);
        this.bg_node = this.bg_node.getChildByName("bg_hyLiuHuQiang").getChildByName("view");
    },
    radioBoxSelectCB_liuHuQiang : function(index,sender, list){
        this.radioBoxSelectCB(index,sender, list);
        this.checkSelect();
    },
    initPlayNode:function()
    {
        var _play = this.bg_node.getChildByName("play");
        
        var maxPlayerList = [];
        maxPlayerList.push(_play.getChildByName("maxPlayer4"));
        maxPlayerList.push(_play.getChildByName("maxPlayer3"));
        maxPlayerList.push(_play.getChildByName("maxPlayer2"));
		this.initPlayNumNode(maxPlayerList, [4, 3, 2]);
        this.maxPlayerList_radio = createRadioBoxForCheckBoxs(maxPlayerList,this.radioBoxSelectCB_liuHuQiang.bind(this));
        cc.eventManager.addListener(this.setTextClick(maxPlayerList,0,this.maxPlayerList_radio,this.checkSelect.bind(this)),maxPlayerList[0].getChildByName("text"));
        cc.eventManager.addListener(this.setTextClick(maxPlayerList,1,this.maxPlayerList_radio,this.checkSelect.bind(this)),maxPlayerList[1].getChildByName("text"));
        cc.eventManager.addListener(this.setTextClick(maxPlayerList,2,this.maxPlayerList_radio,this.checkSelect.bind(this)),maxPlayerList[2].getChildByName("text"));

        var xingTypeList = [];
        xingTypeList.push(_play.getChildByName("play_budaixing"));
        xingTypeList.push(_play.getChildByName("play_genxing"));
        xingTypeList.push(_play.getChildByName("play_fanxing"));
        this.xingTypeList_radio = createRadioBoxForCheckBoxs(xingTypeList,this.radioBoxSelectCB);
        cc.eventManager.addListener(this.setTextClick(xingTypeList,0,this.xingTypeList_radio),xingTypeList[0].getChildByName("text"));
        cc.eventManager.addListener(this.setTextClick(xingTypeList,1,this.xingTypeList_radio),xingTypeList[1].getChildByName("text"));
        cc.eventManager.addListener(this.setTextClick(xingTypeList,2,this.xingTypeList_radio),xingTypeList[2].getChildByName("text"));

        var xiTypeList = [];
        xiTypeList.push(_play.getChildByName("xiType1"));
        xiTypeList.push(_play.getChildByName("xiType2"));
        xiTypeList.push(_play.getChildByName("xiType3"));
        this.xiTypeList_radio = createRadioBoxForCheckBoxs(xiTypeList,this.radioBoxSelectCB);
        cc.eventManager.addListener(this.setTextClick(xiTypeList,0,this.xiTypeList_radio),xiTypeList[0].getChildByName("text"));
        cc.eventManager.addListener(this.setTextClick(xiTypeList,1,this.xiTypeList_radio),xiTypeList[1].getChildByName("text"));
        cc.eventManager.addListener(this.setTextClick(xiTypeList,2,this.xiTypeList_radio),xiTypeList[2].getChildByName("text"));

        var suanfenTypeList = [];
        suanfenTypeList.push(_play.getChildByName("play_erfen"));
        suanfenTypeList.push(_play.getChildByName("play_onexionetun"));
        this.suanfenTypeList_radio = createRadioBoxForCheckBoxs_leiyang(suanfenTypeList,this.radioBoxSelectCB);
        var textCallBack = function(index){
            this._clickCB(suanfenTypeList[index], ccui.CheckBox.EVENT_UNSELECTED);
        }.bind(this);
        cc.eventManager.addListener(this.setTextClick(suanfenTypeList,0,this.suanfenTypeList_radio,textCallBack),suanfenTypeList[0].getChildByName("text"));
        cc.eventManager.addListener(this.setTextClick(suanfenTypeList,1,this.suanfenTypeList_radio,textCallBack),suanfenTypeList[1].getChildByName("text"));

        this.mingwei = _play.getChildByName("play_mingwei");
        cc.eventManager.addListener(this.setTextClick(),this.mingwei.getChildByName("text"));
        this.mingwei.addEventListener(this._clickCB.bind(this), this.mingwei);

        this.yiwushi = _play.getChildByName("yiwushi");
        cc.eventManager.addListener(this.setTextClick(),this.yiwushi.getChildByName("text"));
        this.yiwushi.addEventListener(this._clickCB.bind(this), this.yiwushi);

        this.hongheidian = _play.getChildByName("hongheidian");
        cc.eventManager.addListener(this.setTextClick(),this.hongheidian.getChildByName("text"));
        this.hongheidian.addEventListener(this._clickCB.bind(this), this.hongheidian);

        this.tianhu = _play.getChildByName("tianhu");
        this.tianhu.getChildByName("text").ignoreContentAdaptWithSize(true);
        cc.eventManager.addListener(this.setTextClick(),this.tianhu.getChildByName("text"));
        this.tianhu.addEventListener(this._clickCB.bind(this), this.tianhu);

        this.dihu = _play.getChildByName("dihu");
        this.dihu.getChildByName("text").ignoreContentAdaptWithSize(true);
        cc.eventManager.addListener(this.setTextClick(),this.dihu.getChildByName("text"));
        this.dihu.addEventListener(this._clickCB.bind(this), this.dihu);

        this.zhangShu = _play.getChildByName("zhangShu");
        cc.eventManager.addListener(this.setTextClick(),this.zhangShu.getChildByName("text"));
        this.zhangShu.addEventListener(this._clickCB.bind(this), this.zhangShu);

        this.maiPai = _play.getChildByName("maiPai");
        cc.eventManager.addListener(this.setTextClick(null,null,null,this.checkSelect.bind(this)),this.maiPai.getChildByName("text"));
        this.maiPai.addEventListener(this._clickCB.bind(this), this.maiPai);

        //切牌
        var list = [];
        list.push( _play.getChildByName("play_xitong"));
        list.push( _play.getChildByName("play_shoudong"));
        this._playNode_Card_radio = createRadioBoxForCheckBoxs(list,this.radioBoxSelectCB);
        cc.eventManager.addListener(this.setTextClick(list,0,this._playNode_Card_radio),list[0].getChildByName("text"));
        cc.eventManager.addListener(this.setTextClick(list,1,this._playNode_Card_radio),list[1].getChildByName("text"));        

        this.schedule(function(sender,type)
        {
            var index = this.maxPlayerList_radio.getSelectIndex();
            if (MjClient.MaxPlayerNum_leiyang != 4 - index)
            {
                MjClient.MaxPlayerNum_leiyang = 4 - index;
                this.changeAAPayForPlayerNum();
            }
            //this.qianggangquanbao.setVisible(this.qiangganghu.isSelected());
        },0.1);

        //跑胡子不要四局
        var _currentRoundState = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_RondType, 1);
        if (_currentRoundState == 1)
        {
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_RondType, 2);
        }
    },

    checkSelect : function(){
        var maxPlayer= [4,3,2][this.maxPlayerList_radio.getSelectIndex()];
        if(maxPlayer == 4){
            this.setBoxStatus(this.zhangShu, undefined, false);
        }else if(maxPlayer== 3 || maxPlayer== 2){
            this.setBoxStatus(this.zhangShu, undefined, true);
        }
        this.maiPai.visible = false;
        if(maxPlayer == 2){
            this.maiPai.visible = true;
        }
    },

    setBoxStatus : function(box, isSelected, visible){
        if(isSelected != undefined){
            box.setSelected(isSelected);
            var txt = box.getChildByName("text");
            if(isSelected){
                txt.setTextColor(cc.color(208,88,60));
            }else{
                txt.setTextColor(cc.color(72,94,112));
            }
        }
        box.visible = visible;
    },

    _clickCB : function(sender,type){
        switch (type) {
                case ccui.CheckBox.EVENT_SELECTED:
                case ccui.CheckBox.EVENT_UNSELECTED:
                    var txt = sender.getChildByName("text");
                    var selectColor = cc.color(237,101,1);
                    var unSelectColor = cc.color(158,118,78);
                    if(MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ){
                        selectColor = cc.color(208,88,60);
                        unSelectColor = cc.color(72,94,112);
                    }
                    if(MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP) {
                        selectColor = cc.color("#d21400");
                        unSelectColor = cc.color("#255662");
                    }
                    if(sender.isSelected()){
                        txt.setTextColor(selectColor);
                    }else{
                        txt.setTextColor(unSelectColor);
                    }
                    break;
            }

        this.checkSelect();
    },

    setPlayNodeCurrentSelect:function(isClub)
    {
        var _play = this.bg_node.getChildByName("play");
        var list = [];
        index = 0;

        var _maxPlayer;
        if(isClub){
            _maxPlayer = [4,3,2].indexOf(this.getNumberItem("maxPlayer",4));
        }else{
            _maxPlayer = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_HYLiuHuQiang_maxPlayer, 0);
        }
        this.maxPlayerList_radio.selectItem(_maxPlayer);
        list.push(_play.getChildByName("maxPlayer4"));
        list.push(_play.getChildByName("maxPlayer3"));
        list.push(_play.getChildByName("maxPlayer2"));
        this.radioBoxSelectCB(_maxPlayer,list[_maxPlayer],list); 

        var _xingType;
        if(isClub){
            _xingType = this.getNumberItem("xingType",0);
        }else{
            _xingType = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_HYLiuHuQiang_xingType, 0);
        }
        this.xingTypeList_radio.selectItem(_xingType);
        list = [];
        list.push(_play.getChildByName("play_budaixing"));
        list.push(_play.getChildByName("play_genxing"));
        list.push(_play.getChildByName("play_fanxing"));
        this.radioBoxSelectCB(_xingType,list[_xingType],list);

        var _xiType;
        if(isClub){
            _xiType = [6,9,15].indexOf(this.getNumberItem("xiNum",6));
        }else{
            _xiType = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_HYLiuHuQiang_xiType, 0);
        }
        this.xiTypeList_radio.selectItem(_xiType);
        list = [];
        list.push(_play.getChildByName("xiType1"));
        list.push(_play.getChildByName("xiType2"));
        list.push(_play.getChildByName("xiType3"));
        this.radioBoxSelectCB(_xiType,list[_xiType],list);

        var _suanfenType;
        if(isClub){
            _suanfenType = this.getNumberItem("suanfenType",-1);
        }else{
            _suanfenType = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_HYLiuHuQiang_suanfenType, -1);
        }
        if(_suanfenType != -1){
            this.suanfenTypeList_radio.selectItem(_suanfenType);
        }
        list = [];
        list.push(_play.getChildByName("play_erfen"));
        list.push(_play.getChildByName("play_onexionetun"));
        this.radioBoxSelectCB(_suanfenType,list[_suanfenType],list);

        var _mingwei;
        if(isClub){
            _mingwei = this.getBoolItem("isMingwei",true);
        }else{
            _mingwei = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_HYLiuHuQiang_mingwei, true);
        }
        this.mingwei.setSelected(_mingwei);
        var txt = this.mingwei.getChildByName("text");
        this.radioTextColor(txt, _mingwei);
        // if(_mingwei){
        //     txt.setTextColor(cc.color(237,101,1));
        // }else{
        //     txt.setTextColor(cc.color(158,118,78));
        // }

        var _yiwushi;
        if(isClub){
            _yiwushi = this.getBoolItem("isYiwushi",false);
        }else{
            _yiwushi = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_HYLiuHuQiang_yiwushi, false);
        }
        this.yiwushi.setSelected(_yiwushi);
        var txt = this.yiwushi.getChildByName("text");
        this.radioTextColor(txt, _yiwushi);
        // if(_yiwushi){
        //     txt.setTextColor(cc.color(237,101,1));
        // }else{
        //     txt.setTextColor(cc.color(158,118,78));
        // }

        var _hongheidian;
        if(isClub){
            _hongheidian = this.getBoolItem("isHongheidian",true);
        }else{
            _hongheidian = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_HYLiuHuQiang_hongheidian, true);
        }
        this.hongheidian.setSelected(_hongheidian);
        var txt = this.hongheidian.getChildByName("text");
        this.radioTextColor(txt, _hongheidian);
        // if(_hongheidian){
        //     txt.setTextColor(cc.color(237,101,1));
        // }else{
        //     txt.setTextColor(cc.color(158,118,78));
        // }

        var _tianhu;
        if(isClub){
            _tianhu = this.getBoolItem("isTianhu",true);
        }else{
            _tianhu = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_HYLiuHuQiang_tianhu, true);
        }
        this.tianhu.setSelected(_tianhu);
        var txt = this.tianhu.getChildByName("text");
        this.radioTextColor(txt, _tianhu);
        // if(_tianhu){
        //     txt.setTextColor(cc.color(237,101,1));
        // }else{
        //     txt.setTextColor(cc.color(158,118,78));
        // }

        var _dihu;
        if(isClub){
            _dihu = this.getBoolItem("isDihu",true);
        }else{
            _dihu = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_HYLiuHuQiang_dihu, true);
        }
        this.dihu.setSelected(_dihu);
        var txt = this.dihu.getChildByName("text");
        this.radioTextColor(txt, _dihu);
        // if(_dihu){
        //     txt.setTextColor(cc.color(237,101,1));
        // }else{
        //     txt.setTextColor(cc.color(158,118,78));
        // }

        var _zhangShu;
        if (isClub){
            _zhangShu = this.getBoolItem("is21Zhang", false);
        }else{
            _zhangShu = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_HYLiuHuQiang_zhangShu, false);
        }
        this.zhangShu.setSelected(_zhangShu);
        var txt = this.zhangShu.getChildByName("text");
        this.radioTextColor(txt, _zhangShu);

        var _maiPai; 
        if(isClub)
            _maiPai = this.getBoolItem("isMaiPai", true);
        else
            _maiPai = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_HYLiuHuQiang_maiPai, true);
        this.maiPai.setSelected(_maiPai);
        var txt = this.maiPai.getChildByName("text");
        this.radioTextColor(txt, _maiPai);

        //切牌
        var cardIndex = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_HYLiuHuQiang_qiepai, 0);
        if(isClub){
            cardIndex = this.getNumberItem("isManualCutCard",0);
        }
        this._playNode_Card_radio.selectItem(cardIndex);
        var _play = this.bg_node.getChildByName("play");
        list = [];
        list.push( _play.getChildByName("play_xitong"));
        list.push( _play.getChildByName("play_shoudong"));
        this.radioBoxSelectCB(cardIndex,list[cardIndex],list);

        // 这一行代码必须在最后，因为他会间接调用getSelectedPara
        this.changeAAPayForPlayerNum();

        this.checkSelect();
    },
    getSelectedPara:function()
    {
        var maxPlayerIndex = this.maxPlayerList_radio.getSelectIndex();
        var xiIndex = this.xiTypeList_radio.getSelectIndex();

        var para = {};
        para.gameType = MjClient.GAME_TYPE.HY_LIU_HU_QIANG;
        para.maxPlayer = [4,3,2][maxPlayerIndex];
        para.xiNum = [6,9,15][xiIndex];
        para.xingType = this.xingTypeList_radio.getSelectIndex();
        para.suanfenType = parseInt(this.suanfenTypeList_radio.getSelectIndex())+parseInt(1);
        para.isMingwei = this.mingwei.isSelected();
        para.isYiwushi = this.yiwushi.isSelected();
        para.isHongheidian = this.hongheidian.isSelected();
        para.isTianhu = this.tianhu.isSelected();//天胡
        para.isDihu = this.dihu.isSelected();//地胡
        para.isMaiPai = this.maiPai.isSelected(); //埋牌20

        if(para.maxPlayer != 2){
            para.isMaiPai = false;
        }

        if(para.maxPlayer == 3 || para.maxPlayer == 2){
            para.is21Zhang = this.zhangShu.isSelected();
        }else{
            para.is21Zhang = false;
        }

        //切牌
        para.isManualCutCard = this._playNode_Card_radio.getSelectIndex();
        cc.log("createara: " + JSON.stringify(para));
        if (!this._isFriendCard){
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_HYLiuHuQiang_maxPlayer, maxPlayerIndex);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_HYLiuHuQiang_xingType, para.xingType);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_HYLiuHuQiang_xiType, xiIndex);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_HYLiuHuQiang_suanfenType, this.suanfenTypeList_radio.getSelectIndex());
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_HYLiuHuQiang_mingwei, para.isMingwei);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_HYLiuHuQiang_yiwushi, para.isYiwushi);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_HYLiuHuQiang_hongheidian, para.isHongheidian);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_HYLiuHuQiang_tianhu, para.isTianhu);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_HYLiuHuQiang_dihu, para.isDihu);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_HYLiuHuQiang_qiepai, para.isManualCutCard);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_HYLiuHuQiang_maiPai, para.isMaiPai);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_HYLiuHuQiang_zhangShu, para.is21Zhang);
        }


        return para;
    },
    changeAAPayForPlayerNum:function()
    {
        // var majiang = MjClient.data.gameInfo.js3mj;
        // cc.log("wxd==========MjClient.MaxPlayerNum_leiyang============"+MjClient.MaxPlayerNum_leiyang)
        // if(4 > MjClient.MaxPlayerNum_leiyang){
        //     this.fangzhuPay = {pay4:majiang['roundHYLHQ4P' +  MjClient.MaxPlayerNum_leiyang ], pay8:majiang['roundHYLHQ8P' +  MjClient.MaxPlayerNum_leiyang ], pay16:majiang['roundHYLHQ16P' +  MjClient.MaxPlayerNum_leiyang ]};
        //     this.AAPay = {pay4:majiang['roundHYLHQAA4P' +  MjClient.MaxPlayerNum_leiyang ], pay8:majiang['roundHYLHQAA8P' +  MjClient.MaxPlayerNum_leiyang ], pay16:majiang['roundHYLHQAA16P' +  MjClient.MaxPlayerNum_leiyang ]};
        // }else{
        //     this.fangzhuPay = {pay4:majiang.roundHYLHQ4, pay8:majiang.roundHYLHQ8, pay16:majiang.roundHYLHQ16};
        //     this.AAPay = {pay4:majiang.roundHYLHQAA4,pay8:majiang.roundHYLHQAA8,pay16:majiang.roundHYLHQAA16};
        // }
        // cc.log("wxd==========this.fangzhuPay============"+JSON.stringify(this.fangzhuPay));
        this.setDiaNumData(this.bg_node, this.roundNumObj, this.fangzhuPay, this.AAPay, this.clubPay);
    }
});