/**
 * Created by lms.
 */


var CreateRoomNode_tonghua = CreateRoomNode.extend({

    onExit:function()
    {
        this._super();
        MjClient.MaxPlayerNum = 4;
    },
    setKey:function()
    {
        this.localStorageKey.KEY_tonghua_quetuigang     = "_TONG_HUA_QUE_TUI_GAGN";             //瘸腿杠
        this.localStorageKey.KEY_tonghua_qionghu        = "_TONG_HUA_QIONG_HU";   //穷胡翻番
        this.localStorageKey.KEY_tonghua_bimenhu        = "_TONG_HUA_BI_MEN_HU";  //闭门胡翻番 
        this.localStorageKey.KEY_tonghua_zangang        = "_TONG_HUA_ZAN_GANG";   //攒杠
        this.localStorageKey.KEY_tonghua_sanmingsian    = "_TONG_HUA_SAN_MING_SI_AN";   //三明四暗
        this.localStorageKey.KEY_tonghua_jieguanggang    = "_TONG_HUA_JIE_GUANG_DAN";   //借光杠
        this.localStorageKey.KEY_tonghua_duanmen        = "_TONG_HUA_DUAN_MEN";   //端门胡
        this.localStorageKey.KEY_tonghua_piaohu        = "_TONG_HUA_PIAO_HU";   //飘胡
        this.localStorageKey.KEY_tonghua_qidui          = "_TONG_HUA_QI_DUI";   //七对
        this.localStorageKey.KEY_tonghua_wubuzhun       = "_TONG_HUA_WU_BU_ZHUN";   //五不准
        this.localStorageKey.KEY_tonghua_playernum      = "_TONG_HUA_PLAYER_NUM_v2";   //人数
        this.localStorageKey.KEY_tonghua_difen          = "_TONG_HUA_difen";    // 底分
    },
    setKeyByCardFriend:function()
    {
        this.localStorageKey.KEY_tonghua_quetuigang     = "CF_TONG_HUA_QUE_TUI_GAGN";             //瘸腿杠
        this.localStorageKey.KEY_tonghua_qionghu        = "CF_TONG_HUA_QIONG_HU";   //穷胡翻番
        this.localStorageKey.KEY_tonghua_bimenhu        = "CF_TONG_HUA_BI_MEN_HU";  //闭门胡翻番 
        this.localStorageKey.KEY_tonghua_zangang        = "CF_TONG_HUA_ZAN_GANG";   //攒杠
        this.localStorageKey.KEY_tonghua_sanmingsian    = "CF_TONG_HUA_SAN_MING_SI_AN";   //三明四暗
        this.localStorageKey.KEY_tonghua_jieguanggang    = "CF_TONG_HUA_JIE_GUANG_DAN";   //借光杠
        this.localStorageKey.KEY_tonghua_duanmen        = "CF_TONG_HUA_DUAN_MEN";   //端门胡
        this.localStorageKey.KEY_tonghua_piaohu        = "CF_TONG_HUA_PIAO_HU";   //飘胡
        this.localStorageKey.KEY_tonghua_qidui          = "CF_TONG_HUA_QI_DUI";   //七对
        this.localStorageKey.KEY_tonghua_wubuzhun       = "CF_TONG_HUA_WU_BU_ZHUN";   //五不准
        this.localStorageKey.KEY_tonghua_playernum      = "CF_TONG_HUA_PLAYER_NUM_v2";   //人数
        this.localStorageKey.KEY_tonghua_difen          = "CF_TONG_HUA_difen";    // 底分
    },

    initAll:function(IsFriendCard)
    {
        cc.log(" ======== YYYY IsFriendCard ",IsFriendCard)
        if (IsFriendCard)
            this.setKeyByCardFriend();
        else
            this.setKey();


        this.bg_node = ccs.load("bg_tonghua.json").node;
        this.addChild(this.bg_node);
        this.bg_node = this.bg_node.getChildByName("bg_tonghua");
    },

    initPlayNode:function()
    {
        var _bgtonghuaNode = this.bg_node;

        var _play = _bgtonghuaNode.getChildByName("play");

        this._playNode_isQTG = _play.getChildByName("play_quetuigang");
        this.addListenerText(this._playNode_isQTG);
        this._playNode_isQTG.addEventListener(this.clickCB, this._playNode_isQTG);

        this._playNode_isQionghu   = _play.getChildByName("play_qionghu");
        this.addListenerText(this._playNode_isQionghu);
        this._playNode_isQionghu.addEventListener(this.clickCB, this._playNode_isQionghu);

        this._playNode_isBimenhu   = _play.getChildByName("play_bimenhu");
        this.addListenerText(this._playNode_isBimenhu);
        this._playNode_isBimenhu.addEventListener(this.clickCB, this._playNode_isBimenhu);

        this._playNode_isZangang   = _play.getChildByName("play_zangang");
        this.addListenerText(this._playNode_isZangang);
        this._playNode_isZangang.addEventListener(this.clickCB, this._playNode_isZangang);

        this._playNode_isSanmingsian   = _play.getChildByName("play_sanmingsian");
        this.addListenerText(this._playNode_isSanmingsian);
        this._playNode_isSanmingsian.addEventListener(this.clickCB, this._playNode_isSanmingsian);

        this._playNode_isJieguanggang   = _play.getChildByName("play_jieguanggang");
        this.addListenerText(this._playNode_isJieguanggang);
        this._playNode_isJieguanggang.addEventListener(this.clickCB, this._playNode_isJieguanggang);

        this._playNode_isDuanmen   = _play.getChildByName("play_duanmen");
        this.addListenerText(this._playNode_isDuanmen);
        this._playNode_isDuanmen.addEventListener(this.clickCB, this._playNode_isDuanmen);

        this._playNode_isPiaohu   = _play.getChildByName("play_piaohu");
        this.addListenerText(this._playNode_isPiaohu);
        this._playNode_isPiaohu.addEventListener(this.clickCB, this._playNode_isPiaohu);

        this._playNode_isQidui   = _play.getChildByName("play_qidui");
        this.addListenerText(this._playNode_isQidui);
        this._playNode_isQidui.addEventListener(this.clickCB, this._playNode_isQidui);;

        this._playNode_isWubuzhun   = _play.getChildByName("play_wubuzhun");
        this.addListenerText(this._playNode_isWubuzhun);
        this._playNode_isWubuzhun.addEventListener(this.clickCB, this._playNode_isWubuzhun);

        var nodeList1 = [];
        nodeList1.push( _play.getChildByName("play_player4") );
        nodeList1.push( _play.getChildByName("play_player3") );
        nodeList1.push( _play.getChildByName("play_player2") );
        this.list = nodeList1;
        this._playNode_player_num_radio = createRadioBoxForCheckBoxs(nodeList1,function(index){
            this.changePayForPlayerNum(index);
            this.radioBoxSelectCB(index, nodeList1[index], nodeList1);
        }.bind(this));
        this.addListenerText(nodeList1, this._playNode_player_num_radio,this.changePayForPlayerNum.bind(this));

        //底分
        this._zhuIdx = 1;
        this._ZhuNum = _bgtonghuaNode.getChildByName("txt_fen");
        this._ZhuNum.setString(this._zhuIdx);
        this._Button_sub = _bgtonghuaNode.getChildByName("btn_sub");
        this._Button_sub.addTouchEventListener(function(sender, type) {
            if (type == 2) {
                if (this._zhuIdx == 1) {
                    this._zhuIdx = 11;
                }
                if (this._zhuIdx > 1) {
                    this._zhuIdx--;
                    this._ZhuNum.setString(this._zhuIdx);
                    this._Button_add.setTouchEnabled(true);
                    this._Button_add.setBright(true);
                    cc.log("----------------this._guidIdx = " + this._zhuIdx);
                    this.setRoomCardModeFree();
                }
            }
        }, this);
        this._Button_add = _bgtonghuaNode.getChildByName("btn_add");
        this._Button_add.addTouchEventListener(function(sender, type) {
            if (type == 2) {

                if (this._zhuIdx == 10) {
                    this._zhuIdx = 0;
                }
                if (this._zhuIdx < 10) {
                    this._zhuIdx++;
                    this._ZhuNum.setString(this._zhuIdx);
                    this._Button_sub.setTouchEnabled(true);
                    this._Button_sub.setBright(true);
                    this.setRoomCardModeFree();
                }
            }
        }, this);

    },
    setPlayNodeCurrentSelect:function()
    {
        this._isQTH = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_tonghua_quetuigang,true);
        this._playNode_isQTG.setSelected(this._isQTH);
        var text = this._playNode_isQTG.getChildByName("text");
        this.selectedCB(text,this._isQTH)

        this._isqionghu = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_tonghua_qionghu,false);
        this._playNode_isQionghu.setSelected(this._isqionghu);
        var text = this._playNode_isQionghu.getChildByName("text");
        this.selectedCB(text,this._isqionghu)

        this._isBimenhu = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_tonghua_bimenhu,false);
        this._playNode_isBimenhu.setSelected(this._isBimenhu);
        var text = this._playNode_isBimenhu.getChildByName("text");
        this.selectedCB(text,this._isBimenhu)

        this._iszangang = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_tonghua_zangang,true);
        this._playNode_isZangang.setSelected(this._iszangang);
        var text = this._playNode_isZangang.getChildByName("text");
        this.selectedCB(text,this._iszangang)

        this._isSanmingsian = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_tonghua_sanmingsian,false);
        this._playNode_isSanmingsian.setSelected(this._isSanmingsian);
        var text = this._playNode_isSanmingsian.getChildByName("text");
        this.selectedCB(text,this._isSanmingsian)

        this._isJieguanggang = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_tonghua_jieguanggang,false);
        this._playNode_isJieguanggang.setSelected(this._isJieguanggang);
        var text = this._playNode_isJieguanggang.getChildByName("text");
        this.selectedCB(text,this._isJieguanggang)

        this._isduanmen = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_tonghua_duanmen,false);
        this._playNode_isDuanmen.setSelected(this._isduanmen);
        var text = this._playNode_isDuanmen.getChildByName("text");
        this.selectedCB(text,this._isduanmen)

        this._ispiaohu = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_tonghua_piaohu,false);
        this._playNode_isPiaohu.setSelected(this._ispiaohu);
        var text = this._playNode_isPiaohu.getChildByName("text");
        this.selectedCB(text,this._ispiaohu)

        this._isqidui = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_tonghua_qidui,false);
        this._playNode_isQidui.setSelected(this._isqidui);
        var text = this._playNode_isQidui.getChildByName("text");
        this.selectedCB(text,this._isqidui)

        this._isWubuzhun = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_tonghua_wubuzhun,false);
        this._playNode_isWubuzhun.setSelected(this._isWubuzhun);
        var text = this._playNode_isWubuzhun.getChildByName("text");
        this.selectedCB(text,this._isWubuzhun)

        this._player_num_index = Number( util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_tonghua_playernum, 0) );
        this._playNode_player_num_radio.selectItem(this._player_num_index);
        MjClient.MaxPlayerNum = 4 - this._player_num_index;
        this.radioBoxSelectCB(this._player_num_index,this.list[this._player_num_index],this.list);

        this._zhuIdx = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_tonghua_difen, 1);
        this._ZhuNum.setString(this._zhuIdx + "");

        // 三明四暗和攒蛋可以同时不选，但不能同时选择
        var select = 0;
        if (this._iszangang)
            select = 1;
        else if (this._isSanmingsian)
            select = 2;
        var _this = this;
        var zangangOrSanmingsianFunc = function()
        {
            if (select != 1 && _this._playNode_isZangang.isSelected())
            {
                _this._playNode_isSanmingsian.setSelected(false);
                select = 1;
            }
            else if (select != 2 && _this._playNode_isSanmingsian.isSelected())
            {
                _this._playNode_isZangang.setSelected(false);
                select = 2;
            }
        }
        this.runAction(cc.repeatForever(cc.callFunc(zangangOrSanmingsianFunc)));

        this.changePayForPlayerNum();
    },
    getSelectedPara:function()
    {
        var para = {};
        para.gameType = MjClient.GAME_TYPE.TONG_HUA;
        para.maxPlayer = 4;
        para.quetuigang = this._playNode_isQTG.isSelected();
        para.qionghu = this._playNode_isQionghu.isSelected();
        para.bimenhu = this._playNode_isBimenhu.isSelected();
        para.zangang = this._playNode_isZangang.isSelected();
        para.sanmingsian = this._playNode_isSanmingsian.isSelected();
        para.jieguanggang = this._playNode_isJieguanggang.isSelected();
        para.duanmenhu = this._playNode_isDuanmen.isSelected();
        para.piaohu = this._playNode_isPiaohu.isSelected();
        para.qidui = this._playNode_isQidui.isSelected();
        para.wubuzhun = this._playNode_isWubuzhun.isSelected();
        para.tonghua_difen   = this._zhuIdx;


        util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_tonghua_quetuigang, para.quetuigang);
        util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_tonghua_qionghu, para.qionghu);
        util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_tonghua_bimenhu, para.bimenhu);
        util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_tonghua_zangang,para.zangang);
        util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_tonghua_sanmingsian,para.sanmingsian);
        util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_tonghua_jieguanggang, para.jieguanggang);
        util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_tonghua_duanmen,para.duanmenhu);
        util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_tonghua_piaohu,para.piaohu);
        util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_tonghua_qidui,para.qidui);
        util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_tonghua_wubuzhun, para.wubuzhun);
        util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_tonghua_difen, para.tonghua_difen);

        // 人数
        var maxPlayerSelectIndex = this._playNode_player_num_radio.getSelectIndex();
        para.maxPlayer = 4 - maxPlayerSelectIndex;
        util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_tonghua_playernum, maxPlayerSelectIndex);


        //cc.log("------gameType localStorageEncrypt: " + _gameType);
        cc.log("createara: KEY_tonghua === " + JSON.stringify(para));
        return para;
    }
});