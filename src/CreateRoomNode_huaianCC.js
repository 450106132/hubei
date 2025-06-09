var CreateRoomNode_huaianCC = CreateRoomNode.extend({

    // ctor: function(layer,IsFriendCard) { //构造函数在父类里面已经写了(子类没有多余的动作，最好就不要重写了),如果在子类里面继承就一定与父类保持一致(现在是已经修改好的，原来的是没有任何参数)，不然会出现不可预知的bug
    //     this._super(layer,IsFriendCard); 
    // },
    onExit:function()
    {
        this._super();
        MjClient.MaxPlayerNum = 4;
    },
    setKey:function(){
        this.localStorageKey.KEY_huaianCC_playernum     = "_HUAI_AN_CC_PLAYER_NUM";         //人数
        this.localStorageKey.KEY_huaianCC_zhongfabai    = "_HUAI_AN_CC_ZHONG_FA_BAI";       //中发白
        this.localStorageKey.KEY_huaianCC_canGang       = "_HUAI_AN_CC_CAN_GANG_SCORE";     //杠牌有分
        this.localStorageKey.KEY_huaianCC_getGang       = "_HUAI_AN_CC_GET_GANG_SCORE";     //杠牌直接得分
        this.localStorageKey.KEY_huaianCC_liu8zhang     = "_HUAI_AN_CC_LIU_8_ZHANG";        //留8张
        this.localStorageKey.KEY_huaianCC_lazhuang      = "_HUAI_AN_CC_LAZHUANG";           //拉庄
        this.localStorageKey.KEY_huaianCC_difen         = "_HUAI_AN_CC_DI_FEN";             // 底分
        this.localStorageKey.KEY_huaianCC_keZiSuan1Hua  = "_HUAI_AN_CC_KE_ZI_SUAN_1_HUA";   // 刻字算一花
    },
    initAll:function(IsFriendCard)
    {
        if (!IsFriendCard)
            this.setKey();

        this.bg_node = ccs.load("bg_huaianCC.json").node;
        this.addChild(this.bg_node);
        this.bg_node = this.bg_node.getChildByName("bg_huaianCC");
    },
    initPlayNode:function()
    {
        var _bgHuaianCCNode = this.bg_node;
        var _play = _bgHuaianCCNode.getChildByName("play");
        
        // 人数
        var playNumList = [];
        playNumList.push( _play.getChildByName("play_count0") );
        playNumList.push( _play.getChildByName("play_count1") );
        playNumList.push( _play.getChildByName("play_count2") );
        playNumList.push( _play.getChildByName("play_count3") );
        this.initPlayNumNode(playNumList, [4, 3, 2, 4]);   // playNumList[选项1， 选项2， 选项x3 ] 对应 [4人， 3人, 2人]
        this._playNum_radio = createRadioBoxForCheckBoxs(playNumList, function(index){
            this.changePayForPlayerNum(index);
            this.radioBoxSelectCB(index, playNumList[index], playNumList);
        }.bind(this));
        this.addListenerText(playNumList, this._playNum_radio, this.changePayForPlayerNum.bind(this));
        this._playNumList = playNumList;
		
        //中发白
        var nodeList = [];
        nodeList.push( _play.getChildByName("zhongfabai_1") );
        nodeList.push( _play.getChildByName("zhongfabai_2") );
        nodeList.push( _play.getChildByName("zhongfabai_3") );
        nodeList.push( _play.getChildByName("zhongfabai_4") );

        this._playNode_zhongfabai_radio = createRadioBoxForCheckBoxs(nodeList,this.radioBoxSelectCB);
        this.addListenerText(nodeList, this._playNode_zhongfabai_radio);
        this.huaList = nodeList;



        //拉庄
        this._playNode_lazhuang = _play.getChildByName("lazhuang");
        this.addListenerText(this._playNode_lazhuang);
        this._playNode_lazhuang.addEventListener(this.clickCB, this._playNode_lazhuang);

        //杠牌有分
        this._playNode_canGang = _play.getChildByName("canGang");
        this.addListenerText(this._playNode_canGang,null,this._gangFen.bind(this));
        // this._playNode_canGang.addEventListener(this.clickCB, this._playNode_canGang);
        //杠牌直接得分
        
        this._playNode_getGang = _play.getChildByName("getGang");
        this.addListenerText(this._playNode_getGang,null,this._gangFen.bind(this));
        this._playNode_getGang.addEventListener(this.clickCB, this._playNode_getGang);
        this._playNode_canGang.addEventListener(function(sender, type) {
            switch (type) {
                case ccui.CheckBox.EVENT_SELECTED:
                case ccui.CheckBox.EVENT_UNSELECTED:
                    var txt = sender.getChildByName("text");
                    if (sender.isSelected()) {
                        txt.setTextColor(cc.color(237, 101, 1));
                    } else {
                        txt.setTextColor(cc.color(158, 118, 78));
                    }

                    this._gangFen();
                    break;
            }
        }, this);
        //留8张
        this._playNode_liu8zhang = _play.getChildByName("liu8zhang");
        this.addListenerText(this._playNode_liu8zhang);
        this._playNode_liu8zhang.addEventListener(this.clickCB, this._playNode_liu8zhang);

        //刻字算一花
        this._playNode_keZiSuan1Hua = _play.getChildByName("keZiSuan1Hua");
        this.addListenerText(this._playNode_keZiSuan1Hua);
        this._playNode_keZiSuan1Hua.addEventListener(this.clickCB, this._playNode_keZiSuan1Hua);

        //底分
        this._zhuIdx = 1;
        var difenNode = _bgHuaianCCNode.getChildByName("difen");
        this._ZhuNum = difenNode.getChildByName("txt_fen");
        if (this._ZhuNum) {
            this._ZhuNum.setString(this._zhuIdx);
            this._Button_sub = difenNode.getChildByName("btn_sub");
            this._Button_sub.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    if (this._zhuIdx == 0) {
                        this._zhuIdx = 11;
                    }
                    if (this._zhuIdx > 0) {
                        this._zhuIdx--;
                        this.setDiFen();
                        this._Button_add.setTouchEnabled(true);
                        this._Button_add.setBright(true);
                    }
                }
            }, this);
            this._Button_add = difenNode.getChildByName("btn_add");
            this._Button_add.addTouchEventListener(function(sender, type) {
                if (type == 2) {

                    if (this._zhuIdx == 10) {
                        this._zhuIdx = -1;
                    }
                    if (this._zhuIdx < 10) {
                        this._zhuIdx++;
                        this.setDiFen();
                        this._Button_sub.setTouchEnabled(true);
                        this._Button_sub.setBright(true);
                    }
                }
            }, this);
        }

    },
    setDiFen: function () {
    	var value = [0.5,1,2,3,4,5,6,7,8,9,10][Math.floor(this._zhuIdx)];
        this._ZhuNum.setString([0.5,1,2,3,4,5,6,7,8,9,10][Math.floor(this._zhuIdx)] + "");
        this.setRoomCardModeFree(value);
    },
    _gangFen: function() {
        if (this._playNode_canGang.isSelected()) {
            this._playNode_getGang.setVisible(true);
        } else {
            this._playNode_getGang.setVisible(false);
            this._playNode_getGang.setSelected(false);
        }
        var text = this._playNode_getGang.getChildByName("text");
        this.selectedCB(text, this._playNode_getGang.isSelected())
    },
    
    setPlayNodeCurrentSelect: function(isClub) {
        var _playnumIndex;
        if (isClub)
            if (this.getBoolItem("convertible", false))
                _playnumIndex = 3;
            else
                _playnumIndex = [4, 3, 2].indexOf(this.getNumberItem("maxPlayer", 4));
        else
            _playnumIndex = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_huaianCC_playernum, 0);
        this._playNum_radio.selectItem(_playnumIndex);
        var text = this._playNum_radio.getSelectItem().getChildByName("text");
        this.selectedCB(text, _playnumIndex);

        if (isClub)
            this._zhongfabai = this.getNumberItem("zhongfabai", 1) - 1;
        else
            this._zhongfabai = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_huaianCC_zhongfabai, 0);
        this._playNode_zhongfabai_radio.selectItem(this._zhongfabai);
        var index = this._zhongfabai;
        this.radioBoxSelectCB(index, this.huaList[index], this.huaList);

        if (isClub)
            this._lazhuang = this.getBoolItem("lazhuang", false);
        else
            this._lazhuang = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_huaianCC_lazhuang, false);
        this._playNode_lazhuang.setSelected(this._lazhuang);
        var text = this._playNode_lazhuang.getChildByName("text");
        this.selectedCB(text,this._lazhuang)

        if (isClub)
            this._canGang = this.getBoolItem("canGangScore", false);
        else
            this._canGang = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_huaianCC_canGang, false);
        this._playNode_canGang.setSelected(this._canGang);
        var text = this._playNode_canGang.getChildByName("text");
        this.selectedCB(text,this._canGang)
        this._playNode_getGang.setVisible(this._canGang);

        if (isClub)
            this._getGang = this.getBoolItem("getGangScore", false);
        else
            this._getGang = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_huaianCC_getGang, false);
        this._playNode_getGang.setSelected(this._getGang);
        var text = this._playNode_getGang.getChildByName("text");
        this.selectedCB(text,this._getGang)

        if (isClub)
            this._liu8zhang = this.getBoolItem("liu8zhang", false);
        else
            this._liu8zhang = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_huaianCC_liu8zhang, false);
        this._playNode_liu8zhang.setSelected(this._liu8zhang);
        var text = this._playNode_liu8zhang.getChildByName("text");
        this.selectedCB(text, this._liu8zhang);


        if (isClub)
            this._keZiSuan1Hua = this.getBoolItem("keZiSuan1Hua", false);
        else
            this._keZiSuan1Hua = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_huaianCC_keZiSuan1Hua, false);
        this._playNode_keZiSuan1Hua.setSelected(this._keZiSuan1Hua);
        var text = this._playNode_keZiSuan1Hua.getChildByName("text");
        this.selectedCB(text, this._keZiSuan1Hua);

        //底分
        if (isClub)
            this._zhuIdx = this.getNumberItem("difen", 1);
        else
            this._zhuIdx = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_huaianCC_difen, 1);
        if (this._ZhuNum)
            this.setDiFen();

        // 这一行代码必须在最后，因为他会间接调用getSelectedPara
        this.changePayForPlayerNum();
    },
    getSelectedPara:function()
    {
        var para = {};
        para.gameType = MjClient.GAME_TYPE.HUAI_AN_CC;
        para.maxPlayer = 4;
        para.zhongfabai = 0;//是否带中发白
        para.lazhuang = false;//是否拉庄
        para.canGangScore = false;//杠牌有分
        para.getGangScore = false;//杠牌直接得分
        para.liu8zhang = false;//是否留8张

        // 人数
        var indexToNum = {0:4, 1:3, 2:2, 3:4};
        var _playnumIndex = this._playNum_radio.getSelectIndex();
        para.maxPlayer = indexToNum[_playnumIndex];
        para.convertible = false;
        if (_playnumIndex == 3) 
        {
            para.convertible = true;
        }

        para.difen = Number(this._ZhuNum.getString());// 底分

        //中发白
        // 1 【红中当小花】红中当花, 牌局中除去发,白
        // 2 【中发白白当小花】 中发白当花
        // 3 【中发白不当花】 中发白作为普通牌
        // 2 【中发当小花】 中发当花
        var zhongfabaiSelectIndex = this._playNode_zhongfabai_radio.getSelectIndex()
        para.zhongfabai = zhongfabaiSelectIndex + 1;

        para.lazhuang = this._playNode_lazhuang.isSelected();

        //杠牌有分
        para.canGangScore = this._playNode_canGang.isSelected();

        //杠牌直接得分
        para.getGangScore = this._playNode_getGang.isSelected();

        //刻子算1花
        para.keZiSuan1Hua = this._playNode_keZiSuan1Hua.isSelected();

        para.liu8zhang = this._playNode_liu8zhang.isSelected();
        if (!this._isFriendCard) {
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_huaianCC_playernum, _playnumIndex);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_huaianCC_zhongfabai, zhongfabaiSelectIndex);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_huaianCC_lazhuang, para.lazhuang);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_huaianCC_keZiSuan1Hua, para.keZiSuan1Hua);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_huaianCC_canGang, para.canGangScore);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_huaianCC_getGang, para.getGangScore);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_huaianCC_liu8zhang, para.liu8zhang);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_huaianCC_difen, this._zhuIdx);
        }
        cc.log("createara: " + JSON.stringify(para));
        return para;
    }
});