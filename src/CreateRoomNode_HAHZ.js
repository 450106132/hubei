/**
 * Created by maoyu on 2017/7/21.
 */


var CreateRoomNode_HAHZ = CreateRoomNode.extend({
    initAll:function(IsFriendCard)
    {
        if (!IsFriendCard) {
            this.localStorageKey.KEY_HAHZ_playernum         = "_HAHZ_PLAYER_NUM";       //人数
            this.localStorageKey.KEY_HAHZ_moTpye            = "_HAHZ_MO_WAY";           //摸的方式
            this.localStorageKey.KEY_HAHZ_qianggang         = "_HAHZ_GANG_GANG";        //摸的方式
            this.localStorageKey.KEY_HAHZ_mbzdqz            = "_HAHZ_MBZDQZ";           //摸的方式
            this.localStorageKey.KEY_HAHZ_difen             = "_HAHZ_DI_FEN";           // 底分
        }        

        this.bg_node = ccs.load("bg_HAHZ.json").node;
        this.addChild(this.bg_node);
        this.bg_node = this.bg_node.getChildByName("bg_HAHZ");
    },
    initPlayNode:function()
    {
        var _bgHAHZNode = this.bg_node;
        //莫的类型
        var _play = _bgHAHZNode.getChildByName("play");
        this._playNode_moType_1 = _play.getChildByName("motype1");
        this._playNode_moType_2 = _play.getChildByName("motype2"); 
        this._playNode_moType_3 = _play.getChildByName("motype3");
        var nodeList1 = [];
        nodeList1.push( _play.getChildByName("motype1") );
        nodeList1.push( _play.getChildByName("motype2") );
        nodeList1.push( _play.getChildByName("motype3") );
        this.motype_List = nodeList1;
        
        this._playNode_player_type_radio = createRadioBoxForCheckBoxs(nodeList1,this.radioBoxSelectCB);
        this.addListenerText(nodeList1,this._playNode_player_type_radio);

        this._playNode_canRob = _play.getChildByName("canRob");
        this.addListenerText(this._playNode_canRob);
        this._playNode_canRob.addEventListener(this.clickCB, this._playNode_canRob);

        this._playNode_mbzdqz = _play.getChildByName("mbzdqz");
        this.addListenerText(this._playNode_mbzdqz);
        this._playNode_mbzdqz.addEventListener(this.clickCB, this._playNode_mbzdqz);

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
        var difenNode = _bgHAHZNode.getChildByName("difen");
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
    setPlayNodeCurrentSelect:function(isClub)
    {
        var _motype;
        if (isClub)
            _motype = this.getNumberItem("zaimo", 0);
        else
            _motype = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_HAHZ_moTpye,0);
        var index = _motype == 0? 0:(_motype == 1? 1:2);
        this._playNode_player_type_radio.selectItem(index)
        this["_playNode_moType_" + (index + 1)].setSelected(true);
        this.radioBoxSelectCB(index,this.motype_List[index],this.motype_List);

        if (isClub)
            this._carRob = this.getBoolItem("canRob", true);
        else
            this._carRob = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_HAHZ_qianggang,true);
        this._playNode_canRob.setSelected(this._carRob);
        var text = this._playNode_canRob.getChildByName("text");
        this.selectedCB(text,this._carRob);

        if (isClub)
            this._mbzdqz = this.getBoolItem("mbzdqz", false);
        else
            this._mbzdqz = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_HAHZ_mbzdqz,false);
        this._playNode_mbzdqz.setSelected(this._mbzdqz);
        var text = this._playNode_mbzdqz.getChildByName("text");
        this.selectedCB(text,this._mbzdqz);

        var _playnumIndex;
        if (isClub)
            if (this.getBoolItem("convertible", false))
                _playnumIndex = 3;
            else
                _playnumIndex = [4, 3, 2].indexOf(this.getNumberItem("maxPlayer", 4));
        else
            _playnumIndex = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_HAHZ_playernum, 0);
        this._playNum_radio.selectItem(_playnumIndex);
        var text = this._playNum_radio.getSelectItem().getChildByName("text");
        this.selectedCB(text, _playnumIndex);

        //底分
        if (isClub)
            this._zhuIdx = this.getNumberItem("difen", 1);
        else
            this._zhuIdx = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_HAHZ_difen, 1);
        if (this._ZhuNum)
            this.setDiFen();

        // 这一行代码必须在最后，因为他会间接调用getSelectedPara
        this.changePayForPlayerNum();

    },
    getSelectedPara: function() {
        var para = {};
        para.gameType = MjClient.GAME_TYPE.HA_HONGZHONG;
        para.maxPlayer = 4;
        para.flowerType = WithFlowerType.noFlower;
        para.zaimo = 0; //是否可明杠可碰
        para.canRob = true; //
        para.mbzdqz = false;

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
        var moType = 0;
        moType = this._playNode_moType_1.isSelected() == true ? 0 : (this._playNode_moType_2.isSelected() == true ? 1 : 2);
        para.zaimo = moType;
        para.canRob = this._playNode_canRob.isSelected();
        para.mbzdqz = this._playNode_mbzdqz.isSelected();

        if (!this._isFriendCard) {
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_HAHZ_playernum, _playnumIndex);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_HAHZ_moTpye, moType);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_HAHZ_qianggang, para.canRob);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_HAHZ_mbzdqz, para.mbzdqz);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_HAHZ_difen, this._zhuIdx);
        }

        cc.log("createara: " + JSON.stringify(para));
        return para;
    }
});