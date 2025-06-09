var CustomScoreLayer = cc.Layer.extend({
    _textField: null,
    jsBind: {
        block: {
            _layout: [[1, 1], [0.5, 0.5], [0, 0], true],
        },
        back: {
            _layout: [[0.7, 0.7], [0.5, 0.5], [0, 0]],
            close: {
                _visible: false,
                _click: function () {
                    MjClient.customScoreLayer.node.removeFromParent();
                }
            },
            xiaotanchuang: {
                TextField_1: {
                    _run: function () {
                        this.setTouchEnabled(false);
                    }
                }
            }
        }
    },
    ctor: function(){
        this._super();
        var UINode = ccs.load("customBaseScoreLayer.json").node;
        MjClient.Scene.addChild(UINode);
        this.setName("CustomScoreLayer");
        this.node = UINode;
        MjClient.customScoreLayer = this;
        MjClient._customValue = "";
        BindUiAndLogic(UINode, this.jsBind);
        var self = this;

        var _back = UINode.getChildByName("back");
        this._textField = _back.getChildByName("xiaotanchuang").getChildByName("TextField_1");

        //数字按键
        var _num = _back.getChildByName("num");
        for (var i = 0; i <= 9; i++) {
            var _btnNum = _num.getChildByName("Button_" + i);
            _btnNum.setTag(i);
            _btnNum.addTouchEventListener(function (sender, type) {
                if (type === ccui.Widget.TOUCH_ENDED) {
                    var itag = sender.getTag();
                    self.InputPlaybackNumber(itag);
                }
            }, this);
        }

        //清除所有
        var _clear = _num.getChildByName("clear");
        _clear.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    self.InputPlaybackNumber(-2);
                    break;
                default :
                    break;
            }
        }, this);

        //删除
        var _del = _num.getChildByName("del");
        _del.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    self.InputPlaybackNumber(-1);
                    break;
                default :
                    break;
            }
        }, this);

        //确定
        var btnSure = _back.getChildByName("btnSure");
        btnSure.addTouchEventListener(function (sender, Type) {
            switch (Type) {
                case ccui.Widget.TOUCH_ENDED:
                    if(!(parseInt(MjClient._customValue) > 0 && parseInt(MjClient._customValue) <= 100 &&
                        MjClient._customValue.substr(0, 1) !== "0" ) ){
                        MjClient.showToast("请重新输入正确底分");
                        MjClient._customValue = "";
                        this._textField.setString(MjClient._customValue);
                    }else{
                        MjClient._customBaseScoreNode.setString(MjClient._customValue);
                        UINode.removeFromParent();
                    }
                    break;
                default:
                    break;
            }
        }, this);
        return true;
    },

    InputPlaybackNumber: function(n) {
        var change = true;
        if(n >= 0 && MjClient._customValue.length < 15)
            MjClient._customValue += n;
        else if(n === -1 && MjClient._customValue.length > 0)
            MjClient._customValue = MjClient._customValue.substring(0, MjClient._customValue.length - 1);
        else if(n === -2 && MjClient._customValue.length > 0)
            MjClient._customValue = "";
        else
            change = false;
        if(change) {
            this._textField.setString(MjClient._customValue);
        }

        if(MjClient._customValue.length >= 3 && parseInt(MjClient._customValue) > 100 ){
            MjClient.showToast("底分上限值100，请重新输入");
            MjClient._customValue = "";
            this._textField.setString(MjClient._customValue);
        }
    }
});

var CreateRoomNode_wuXue510K = CreateRoomNode.extend({
    setKey:function() {
        this.localStorageKey.KEY_WUXUE510K_showHandCount     = "_WuXue510K_SHOWHAND_COUNT";           //是否展示手牌
        this.localStorageKey.KEY_WUXUE510K_playKeFan         = "_WuXue510K_PLAY_KEFAN";               //可反
        this.localStorageKey.KEY_WUXUE510K_pangGuanId        = "_WuXue510K_PANGGUAN_ID";              //0: 结束可看    1:结束不可看
        this.localStorageKey.KEY_WUXUE510K_playBaoJing       = "_WuXue510K_PLAY_BAOJING";             //报警
        this.localStorageKey.KEY_WUXUE510K_diFen             = "_WuXue510K_DIFEN";
        this.localStorageKey.KEY_WUXUE510K_isCustomBaseScore = "_WuXue510K_CUSTOMEDIFEN";
        this.setExtraKey({
            jieSuanDiFen: "_WuXue510K_jiesuandifen",
            tuoGuan: "WuXue510K_TUO_GUAN",                     //托管
            trustWhole: "WuXue510K_TRUST_WHOLE",               //整局托管
            trustWay: "WuXue510K_TRUST_WAY"                    //托管方式
        });
    },

    initAll:function(IsFriendCard) {
        if (!IsFriendCard) this.setKey();
        this.bgNode = ccs.load("bg_wuXue510K.json").node;
        this.addChild(this.bgNode);
        this.bg_node = this.bgNode.getChildByName("bg_wuXue510K").getChildByName("view");
        this.isAdjusted = false;
    },

    initPlayNode:function() {
        var that = this;
        var _bg_Node = this.bg_node;
        var _playWay = _bg_Node.getChildByName("play_way");
        this._playNode_basescore_0 = _playWay.getChildByName("play_difen0");
        this._playNode_basescore_1 = _playWay.getChildByName("play_difen1");
        this._playNode_basescore_2 = _playWay.getChildByName("play_difen2");
        this._playNode_basescore_3 = _playWay.getChildByName("play_difen3");
        MjClient._customBaseScoreNode = this._playNode_basescore_3.getChildByName("text");

        var callback = function(){
            var layer = MjClient.Scene.getChildByName("CustomScoreLayer");
            if(layer) layer.removeFromParent();
            MjClient.Scene.addChild(new CustomScoreLayer());
        };

        var nodeListfeng = [];
        nodeListfeng.push( this._playNode_basescore_0 );
        nodeListfeng.push( this._playNode_basescore_1 );
        nodeListfeng.push( this._playNode_basescore_2 );
        nodeListfeng.push( this._playNode_basescore_3 );
        this._playNode_basescore_list = nodeListfeng;
        this._playNode_basescore_radio = createRadioBoxForCheckBoxs(nodeListfeng, function(index, sender, nodeList){
            index = Number(index);
            this.radioBoxSelectCB(index, sender, nodeList);
            if(index === 3) callback();
        }.bind(this));
        this.addListenerText(nodeListfeng, this._playNode_basescore_radio, function (index) {
            index = Number(index);
            if(index === 3) callback();
        }.bind(this));

        var _custom_bg = _playWay.getChildByName("custom_bg");
        _custom_bg.addTouchEventListener(function (sender, type) {
            if(type === ccui.Widget.TOUCH_ENDED) {
                that._playNode_basescore_radio.selectItem(3);
                that.radioBoxSelectCB(3, nodeListfeng[3], nodeListfeng);
                callback();
            }
        });

        this._playNode_showLeft_0 = _playWay.getChildByName("play_showLeft0");
        this._playNode_showLeft_1 = _playWay.getChildByName("play_showLeft1");
        var nodeListrule = [this._playNode_showLeft_0, this._playNode_showLeft_1];
        this._playNode_showLeft_radio = createRadioBoxForCheckBoxs(nodeListrule, this.radioBoxSelectCB);
        this.addListenerText(nodeListrule,this._playNode_showLeft_radio);
        this.NodeList_showLeft = nodeListrule;

        this._playNode_spectator0 = _playWay.getChildByName("paly_spectator0");
        this._playNode_spectator1 = _playWay.getChildByName("paly_spectator1");
        var spectatorList = [this._playNode_spectator0, this._playNode_spectator1];
        this._playNode_spectator_radio = createRadioBoxForCheckBoxs(spectatorList, this.radioBoxSelectCB);
        this.addListenerText(spectatorList, this._playNode_spectator_radio);
        this.NodeList_spectator = spectatorList;

        this._playNode_keFan = _playWay.getChildByName("play_kefan");
        this.addListenerText(this._playNode_keFan);
        this._playNode_keFan.addEventListener(this.clickCB, this._playNode_keFan);

        this._playNode_baoJing = _playWay.getChildByName("play_baojing");
        this.addListenerText(this._playNode_baoJing);
        this._playNode_baoJing.addEventListener(this.clickCB, this._playNode_baoJing);

        this.difenAry = [0.1, 0.2, 0.3, 0.4, 0.5, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        this.initExtraPlayNode(_playWay);
    },

    initExtraPlayNode:function(_playWay){
        this._super(_playWay);
        for(var i = 0; i <this.trustWayNodeList.length; i++){
            if(this.trustWayNodeList[i]){
                this.trustWayNodeList[i].setVisible(false);
            }
        }
    },

    setPlayNodeCurrentSelect:function(isClub) {
        var isCustomBaseScore;
        if (isClub){
            isCustomBaseScore = this.getBoolItem("isCustomBaseScore", false);
        }else{
            isCustomBaseScore = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_WUXUE510K_isCustomBaseScore, false);
        }

        var diFenIdx;
        if(!isCustomBaseScore){
            if (isClub)
                diFenIdx = [1, 5, 10].indexOf(this.getNumberItem("diFen",1));
            else{
                diFenIdx = [1, 5, 10].indexOf(util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_WUXUE510K_diFen, 1));
            }
        }
        else{
            var diFen;
            if(isClub){
                diFen = util.localStorageEncrypt.getNumberItem("diFen",1)
            }else{
                diFen = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_WUXUE510K_diFen, 1)
            }
            MjClient._customValue = diFen.toString();
            MjClient._customBaseScoreNode.setString(diFen);
            diFenIdx = 3;
        }
        this._playNode_basescore_radio.selectItem(diFenIdx);
        this.radioBoxSelectCB(diFenIdx, this._playNode_basescore_list[diFenIdx], this._playNode_basescore_list);


        // 手牌剩余牌
        var handCountIdx;
        if (isClub)
            handCountIdx = this.getNumberItem("showHandCount", 1);
        else
            handCountIdx = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_WUXUE510K_showHandCount, 1);
        this._playNode_showLeft_radio.selectItem(handCountIdx);
        this.radioBoxSelectCB(handCountIdx, this.NodeList_showLeft[handCountIdx], this.NodeList_showLeft);


        var pangGuan;
        if (isClub)
            pangGuan = this.getNumberItem("catPartnerCards", 1);
        else
            pangGuan = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_WUXUE510K_pangGuanId, 1);
        this._playNode_spectator_radio.selectItem(pangGuan);
        this.radioBoxSelectCB(pangGuan, this.NodeList_spectator[pangGuan], this.NodeList_spectator);


        var baoJing;
        if (isClub)
            baoJing = this.getBoolItem("baoJing", true);
        else
            baoJing = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_WUXUE510K_playBaoJing, true);
        this._playNode_baoJing.setSelected(baoJing);
        this.selectedCB(this._playNode_baoJing.getChildByName("text"), baoJing);


        var keFan;
        if (isClub)
            keFan = this.getBoolItem("keFan", false);
        else
            keFan = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_WUXUE510K_playKeFan, false);
        this._playNode_keFan.setSelected(keFan);
        this.selectedCB(this._playNode_keFan.getChildByName("text"), keFan);

        this.setExtraPlayNodeCurrentSelect(isClub);
    },
    getSelectedPara:function() {
        var para = {};
        para.gameType = MjClient.GAME_TYPE.WU_XUE_510K;
        para.maxPlayer = 4;
        para.baoJing = this._playNode_baoJing.isSelected();
        para.keFan = this._playNode_keFan.isSelected();
        para.showHandCount = this._playNode_showLeft_radio.getSelectIndex();
        para.catPartnerCards = this._playNode_spectator_radio.getSelectIndex();
        para.diFen = [1, 5, 10, -1][this._playNode_basescore_radio.getSelectIndex()];
        para.laiziOption = 1;                    // 默认带癞子玩法
        para.isCustomBaseScore = false;
        if(para.diFen === -1){
            para.diFen = parseInt(MjClient._customValue);
            para.isCustomBaseScore = true;
        }
        if (!this._isFriendCard) {
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_WUXUE510K_showHandCount, para.showHandCount);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_WUXUE510K_pangGuanId, para.catPartnerCards);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_WUXUE510K_playBaoJing, para.baoJing);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_WUXUE510K_playKeFan, para.keFan);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_WUXUE510K_isCustomBaseScore, para.isCustomBaseScore);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_WUXUE510K_diFen, para.diFen);
        }
        this.getExtraSelectedPara(para);

        cc.log("wuXue510K createara: " + JSON.stringify(para));
        return para;
    }
});