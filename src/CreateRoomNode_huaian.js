/**
 * Created by maoyu on 2017/7/21.
 */


var CreateRoomNode_huaian = CreateRoomNode.extend({
    setKey:function(){
        this.localStorageKey.KEY_huaian_playernum       = "_HUAI_AN_PLAYER_NUM";        //人数
        this.localStorageKey.KEY_huaian_flowerType      = "_HUAI_AN_FLOWER_TYPE";       //花牌
        this.localStorageKey.KEY_huaian_zengfen         = "_HUAI_AN_ZENG_FEN";          //增分
        this.localStorageKey.KEY_huaian_limitUp         = "_HUAI_AN_UP_LIMIT";          //是否上限
        this.localStorageKey.KEY_huaian_canGangPeng     = "_HUAI_AN_CAN_PENG_GANG";     //是否可碰杠
        this.localStorageKey.KEY_huaian_zhuangDouble    = "_HUAI_AN_CAN_ZHUANG_GANG";   //是否可碰杠
        this.localStorageKey.KEY_huaian_difen           = "_HUAI_AN_DI_FEN";            // 底分
    },
    initAll:function(IsFriendCard)
    {
        if (!IsFriendCard)
            this.setKey();

        this.bg_node = ccs.load("bg_huaian.json").node;
        this.addChild(this.bg_node);
        this.bg_node = this.bg_node.getChildByName("bg_huaian");
    },
    initPlayNode:function()
    {
        var _bgHuaianNode = this.bg_node;
        //花
        var _play = _bgHuaianNode.getChildByName("play");
        this._playNode_flowerType_1 = _play.getChildByName("flower_yes");
        this._playNode_flowerType_2 = _play.getChildByName("flower_no");
        var nodeList1 = [];
        nodeList1.push( _play.getChildByName("flower_yes") );
        nodeList1.push( _play.getChildByName("flower_no") );
        this._playNode_flower_radio = createRadioBoxForCheckBoxs(nodeList1, this.radioBoxSelectCB);
        this.addListenerText(nodeList1,this._playNode_flower_radio);
        //增分
        this._playNode_zengfen = _play.getChildByName("zenfen");
        this.addListenerText(this._playNode_zengfen);
        this._playNode_zengfen.addEventListener(this.clickCB, this._playNode_zengfen);
        //上限
        this._playNode_limitUp = _play.getChildByName("isLimitUp");
        this.addListenerText(this._playNode_limitUp);
        this._playNode_limitUp.addEventListener(this.clickCB, this._playNode_limitUp);
        //吃碰杠
        this._playNode_isGangPeng = _play.getChildByName("isCanPengGang");
        this.addListenerText(this._playNode_isGangPeng);
        this._playNode_isGangPeng.addEventListener(this.clickCB, this._playNode_isGangPeng);
        
        this._playNode_isZhuangDouble = _play.getChildByName("zhuangDouble");
        this.addListenerText(this._playNode_isZhuangDouble);
        this._playNode_isZhuangDouble.addEventListener(this.clickCB, this._playNode_isZhuangDouble);

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
        
        //底分
        this._zhuIdx = 1;
        var difenNode = _bgHuaianNode.getChildByName("difen");
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
    setPlayNodeCurrentSelect: function(isClub) {
        var _huaianflowerCountType;
        if (isClub)
            _huaianflowerCountType = this.getNumberItem("flowerType", WithFlowerType.commonFlower);
        else
            _huaianflowerCountType = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_huaian_flowerType, WithFlowerType.commonFlower);
        var isbool = _huaianflowerCountType == WithFlowerType.commonFlower ? true : false;
        this._playNode_flowerType_1.setSelected(isbool);
        var text = this._playNode_flowerType_1.getChildByName("text");
        this.selectedCB(text,isbool)
        this._playNode_flowerType_2.setSelected(!isbool);
        var text = this._playNode_flowerType_2.getChildByName("text");
        this.selectedCB(text,!isbool)

        if (isClub)
            this.huaian_zengfen = this.getBoolItem("zengfen", false);
        else
            this.huaian_zengfen = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_huaian_zengfen, false);
        this._playNode_zengfen.setSelected(this.huaian_zengfen);
        var text = this._playNode_zengfen.getChildByName("text");
        this.selectedCB(text,this.huaian_zengfen)

        if (isClub)
            this.huaian_limitUp = this.getNumberItem("upLimmit", 0) == 200;
        else
            this.huaian_limitUp = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_huaian_limitUp, false);
        this._playNode_limitUp.setSelected(this.huaian_limitUp);
        var text = this._playNode_limitUp.getChildByName("text");
        this.selectedCB(text,this.huaian_limitUp)

        if (isClub)
            this.huaian_canpenggang = this.getBoolItem("canGangPeng", false);
        else
            this.huaian_canpenggang = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_huaian_canGangPeng, false);
        this._playNode_isGangPeng.setSelected(this.huaian_canpenggang);
        var text = this._playNode_isGangPeng.getChildByName("text");
        this.selectedCB(text,this.huaian_canpenggang)

        if (isClub)
            this.huaian_zhuangDouble = this.getBoolItem("zhuangDouble", false);
        else
            this.huaian_zhuangDouble = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_huaian_zhuangDouble, false);
        this._playNode_isZhuangDouble.setSelected(this.huaian_zhuangDouble);
        var text = this._playNode_isZhuangDouble.getChildByName("text");
        this.selectedCB(text,this.huaian_zhuangDouble);

        var _playnumIndex;
        if (isClub)
            if (this.getBoolItem("convertible", false))
                _playnumIndex = 3;
            else
                _playnumIndex = [4, 3, 2].indexOf(this.getNumberItem("maxPlayer", 4));
        else
            _playnumIndex = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_huaian_playernum, 0);
        this._playNum_radio.selectItem(_playnumIndex);
        var text = this._playNum_radio.getSelectItem().getChildByName("text");
        this.selectedCB(text, _playnumIndex);

        //底分
        if (isClub)
            this._zhuIdx = this.getNumberItem("difen", 1);
        else
            this._zhuIdx = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_huaian_difen, 1);
        if (this._ZhuNum)
            this.setDiFen();

        // 这一行代码必须在最后，因为他会间接调用getSelectedPara
        this.changePayForPlayerNum();
    },
    getSelectedPara:function()
    {
        var para = {};
        para.gameType = MjClient.GAME_TYPE.HUAI_AN;
        para.maxPlayer = 4;
        para.flowerType = WithFlowerType.noFlower;
        para.zengfen = false;
        para.upLimmit = 0;
        para.canGangPeng = false;//是否可明杠可碰
        para.zhuangDouble = false;

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

        //花牌
        para.flowerType = this._playNode_flowerType_1.isSelected() == true ? WithFlowerType.commonFlower :WithFlowerType.noFlower;
        //增分
        para.zengfen = this._playNode_zengfen.isSelected() ==true? true : false;
        //上限
        para.upLimmit = this._playNode_limitUp.isSelected()==true? 200 : 0;
        //是否可明杠，碰
        para.canGangPeng = this._playNode_isGangPeng.isSelected() == true ? true :false;

        para.zhuangDouble = this._playNode_isZhuangDouble.isSelected()== true ? true :false;

        if (!this._isFriendCard) {
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_huaian_playernum, _playnumIndex);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_huaian_flowerType,para.flowerType);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_huaian_zengfen,para.zengfen);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_huaian_limitUp,para.upLimmit);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_huaian_canGangPeng,para.canGangPeng);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_huaian_zhuangDouble, para.zhuangDouble);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_huaian_difen, this._zhuIdx);
        }
        cc.log("createara: " + JSON.stringify(para));
        return para;
    }
});