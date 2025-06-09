/**
 * Created by maoyu on 2017/7/21.
 */


var CreateRoomNode_huaianTTZ = CreateRoomNode.extend({
    onExit:function()
    {
        this._super();
        MjClient.MaxPlayerNum = 4;
    },
    initAll: function(IsFriendCard) {
        if (!IsFriendCard)
	{
		this.localStorageKey.KEY_huaianTTZ_playernum          = "_HUAI_AN_TTZ_PLAYER_NUM";    // 人数
		this.localStorageKey.KEY_huaianTTZ_flowerType         = "_HUAI_AN_TTZ_FLOWER_TYPE";   // 花牌
		this.localStorageKey.KEY_huaianTTZ_tianhu             = "HUAI_AN_TTZ_TIANHU";         // 天胡
		this.localStorageKey.KEY_huaianTTZ_dihu               = "HUAI_AN_TTZ_DIHU";           // 地胡
        this.localStorageKey.KEY_huaianTTZ_mustzimo           = "HUAI_AN_TTZ_mustzimo";       // 只能自摸
        this.localStorageKey.KEY_huaianTTZ_difen              = "HUAI_AN_TTZ_DI_FEN";         // 底分
	}

        this.bg_node = ccs.load("bg_huaianTTZ.json").node;
        this.addChild(this.bg_node);
        this.bg_node = this.bg_node.getChildByName("bg_huaianTTZ");
    },
    initPlayNode: function() {
        var _bgHuaianNode = this.bg_node;
        //花
        var _play = _bgHuaianNode.getChildByName("play");
        this._playNode_flowerType_4 = _play.getChildByName("flower_4");
        this._playNode_flowerType_8 = _play.getChildByName("flower_8");
        var nodeListflower = [];
        nodeListflower.push(_play.getChildByName("flower_4"));
        nodeListflower.push(_play.getChildByName("flower_8"));
        this._playNode_player_hua_radio = createRadioBoxForCheckBoxs(nodeListflower, this.radioBoxSelectCB);
        this.addListenerText(nodeListflower, this._playNode_player_hua_radio);

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
		
        // 天胡
        this.tianhu    = _play.getChildByName("tianhu");
        this.addListenerText(this.tianhu);
        this.tianhu.addEventListener(this.clickCB, this.tianhu);

        this.dihu    = _play.getChildByName("dihu");
        this.addListenerText(this.dihu);
        this.dihu.addEventListener(this.clickCB, this.dihu);

        this.mustzimo    = _play.getChildByName("mustzimo");
        this.addListenerText(this.mustzimo);
        this.mustzimo.addEventListener(this.clickCB, this.mustzimo);

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
        var _playnumIndex;
        if (isClub)
            if (this.getBoolItem("convertible", false))
                _playnumIndex = 3;
            else
                _playnumIndex = [4, 3, 2].indexOf(this.getNumberItem("maxPlayer", 4));
        else
            _playnumIndex = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_huaianTTZ_playernum, 0);
        this._playNum_radio.selectItem(_playnumIndex);
        var text = this._playNum_radio.getSelectItem().getChildByName("text");
        this.selectedCB(text, _playnumIndex);

        var huaianTTZflowerType;
        if (isClub)
            huaianTTZflowerType = this.getNumberItem("flowerType", WithFlowerType.flower4);
        else
            huaianTTZflowerType = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_huaianTTZ_flowerType, WithFlowerType.flower4);
        this._playNode_flowerType_4.setSelected(huaianTTZflowerType == WithFlowerType.flower4);
        var text = this._playNode_flowerType_4.getChildByName("text");
        this.selectedCB(text, huaianTTZflowerType == WithFlowerType.flower4);
        this._playNode_flowerType_8.setSelected(huaianTTZflowerType != WithFlowerType.flower4);
        var text = this._playNode_flowerType_8.getChildByName("text");
        this.selectedCB(text, huaianTTZflowerType != WithFlowerType.flower4)

        var tianhu;
        if (isClub)
            tianhu = this.getBoolItem("tianHu", true);
        else
            tianhu = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_huaianTTZ_tianhu, true);
        this.tianhu.setSelected(tianhu);
        var text = this.tianhu.getChildByName("text");
        this.selectedCB(text,tianhu)

        var dihu;
        if (isClub)
            dihu = this.getBoolItem("diHu", true);
        else
            dihu = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_huaianTTZ_dihu, true);
        this.dihu.setSelected(dihu);
        var text = this.dihu.getChildByName("text");
        this.selectedCB(text,dihu)

        var mustzimo;
        if (isClub)
            mustzimo = this.getBoolItem("mustzimo", false);
        else
            mustzimo = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_huaianTTZ_mustzimo, false);
        this.mustzimo.setSelected(mustzimo);
        var text = this.mustzimo.getChildByName("text");
        this.selectedCB(text,mustzimo);

        //底分
        if (isClub)
            this._zhuIdx = this.getNumberItem("difen", 1);
        else
            this._zhuIdx = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_huaianTTZ_difen, 1);
        if (this._ZhuNum)
            this.setDiFen();

        // 这一行代码必须在最后，因为他会间接调用getSelectedPara
        this.changePayForPlayerNum();
    },

    getSelectedPara: function() {
        var para = {};
        para.gameType = MjClient.GAME_TYPE.HUAI_AN_TTZ;

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

        para.flowerType = this._playNode_flowerType_4.isSelected() ? WithFlowerType.flower4 : WithFlowerType.flower8;

        para.tianHu = this.tianhu.isSelected();

        para.mustzimo = this.mustzimo.isSelected();

        para.diHu = this.dihu.isSelected();
        if (!this._isFriendCard) {
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_huaianTTZ_playernum, _playnumIndex);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_huaianTTZ_flowerType, para.flowerType);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_huaianTTZ_tianhu, para.tianHu);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_huaianTTZ_dihu, para.diHu);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_huaianTTZ_mustzimo, para.mustzimo);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_huaianTTZ_difen, this._zhuIdx);
        }
        cc.log("createara: " + JSON.stringify(para));
        return para;
    }

});