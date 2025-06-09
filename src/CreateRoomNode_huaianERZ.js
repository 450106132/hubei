/**
 * Created by maoyu on 2017/7/21.
 */


var CreateRoomNode_huaianERZ = CreateRoomNode.extend({
    initAll:function(IsFriendCard)
    {   
        if (!IsFriendCard){
            this.localStorageKey.KEY_huaianERZ_flowerIndex      = "_HUAI_AN_ERZ_FLOWER_INDEX";      // 4花,8花
            this.localStorageKey.KEY_huaianERZ_difen            = "_HUAI_AN_ERZ_DI_FEN";            // 底分
            this.localStorageKey.KEY_huaianERZ_qiduiKeBuTing    = "_HUAI_AN_ERZ__QIDUIKEBUTING";    // 七对可不听
        }

        this.bg_node = ccs.load("bg_huaianERZ.json").node;
        this.addChild(this.bg_node);
        this.bg_node = this.bg_node.getChildByName("bg_huaianERZ");
    },
    initPlayNode:function()
    {
        var _play = this.bg_node.getChildByName("play_way");
        var flowerNodeList = [];
        flowerNodeList.push(_play.getChildByName("play_flower4"));
        flowerNodeList.push(_play.getChildByName("play_flower8"));
        this._flower_radio = createRadioBoxForCheckBoxs(flowerNodeList,this.radioBoxSelectCB);
        this.addListenerText(flowerNodeList,this._flower_radio);
        this._flowerlist = flowerNodeList;

        // 七对可不架听
        this._playNode_qiduiKeBuTing = _play.getChildByName("qiduiKeBuTing");
        this.addListenerText(this._playNode_qiduiKeBuTing);
        this._playNode_qiduiKeBuTing.addEventListener(this.clickCB, this._playNode_qiduiKeBuTing);

        //底分
        this._zhuIdx = 1;
        var difenNode = this.bg_node.getChildByName("difen");
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
        var flowerIndex;
        if (isClub)
            flowerIndex = [4, 8].indexOf(this.getNumberItem("huaianERZ_flowerNum", 0));
        else
            flowerIndex = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_huaianERZ_flowerIndex, 0);
        this._flower_radio.selectItem(flowerIndex);
        var index = flowerIndex;
        this.radioBoxSelectCB(index, this._flowerlist[index], this._flowerlist);

        // 七对可不架听
        var _qiduiKeBuTing;
        if (isClub)
            _qiduiKeBuTing = this.getBoolItem("qiduiKeBuTing", false);
        else
            _qiduiKeBuTing = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_huaianERZ_qiduiKeBuTing, false);
        this._playNode_qiduiKeBuTing.setSelected(_qiduiKeBuTing);
        var text = this._playNode_qiduiKeBuTing.getChildByName("text");
        this.selectedCB(text, _qiduiKeBuTing);

        //底分
        if (isClub)
            this._zhuIdx = this.getNumberItem("difen", 1);
        else
            this._zhuIdx = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_huaianERZ_difen, 1);
        if (this._ZhuNum)
            this.setDiFen();
    },
    getSelectedPara:function()
    {
        var flowerIndex = this._flower_radio.getSelectIndex();

        var para = {};
        para.gameType = MjClient.GAME_TYPE.HUAI_AN_ERZ;
        para.maxPlayer = 2;
        para.huaianERZ_flowerNum = [4, 8][flowerIndex];
        para.qiduiKeBuTing = this._playNode_qiduiKeBuTing.isSelected();

        para.difen = Number(this._ZhuNum.getString());// 底分

        if (!this._isFriendCard) {
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_huaianERZ_flowerIndex, flowerIndex);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_huaianERZ_difen, this._zhuIdx);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_huaianERZ_qiduiKeBuTing, para.qiduiKeBuTing);
        }

        cc.log("createara: " + JSON.stringify(para));
        return para;
    }
});