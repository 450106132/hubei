/**
 * Created by maoyu on 2017/7/21.
 */


var CreateRoomNode_NTHZ = CreateRoomNode.extend({
    initAll:function()
    {
        this.localStorageKey.KEY_NTHZ_zhuaNiao    = "_NTHZ_ZHUA_NIAO";       //抓鸟
        this.localStorageKey.KEY_NTHZ_piaofen = "_NTHZ_PIAO_FEN";       //飘分
        this.localStorageKey.KEY_NTHZ_mustzimo    = "_NTHZ_MUST_ZI_MO";   //只能自摸
        this.localStorageKey.KEY_NTHZ_daiHZ   = "_NTHZ_DAI_HZ";         //带红中
        this.localStorageKey.KEY_NTHZ_wuHZ_double  = "_NTHZ_WU_HZ_DOUBLE"; //无红中加倍
        this.localStorageKey.KEY_NTHZ_dahu     = "_NTHZ_HAVE_DA_HU";    //有大胡

        this.bg_node = ccs.load("bg_NTHZ.json").node;
        this.addChild(this.bg_node);
        this.bg_node = this.bg_node.getChildByName("bg_NTHZ");

        //为适配拖动，先把节点获取到
        this._scrollview = this.bg_node.getChildByName("scrollview");
        this._scroll_play = this._scrollview.getChildByName("play");
        this._scroll_round = this._scrollview.getChildByName("round");
    },
    initRoundNode:function()
    {
        this._super();
        //this.payWayNode_3.visible = true;
        //this.payWayNode_3.setEnabled(true);
        if (cc.sys.isObjectValid(this.payWayNodeArray[2]))
        {
            this.payWayNodeArray[2].visible = true;
            this.payWayNodeArray[2].setEnabled(true);
        }
    },
    initPlayNode:function()
    {
        //摸马
        var _play = this._scroll_play;
        var zhuaNiaoTypeList = [];
        zhuaNiaoTypeList.push(_play.getChildByName("zhuaniaoType1"));
        zhuaNiaoTypeList.push(_play.getChildByName("zhuaniaoType2"));
        zhuaNiaoTypeList.push(_play.getChildByName("zhuaniaoType3"));
        this.zhuaNiaoTypeList_radio = createRadioBoxForCheckBoxs(zhuaNiaoTypeList,this.radioBoxSelectCB);
        this.addListenerText(zhuaNiaoTypeList,this.zhuaNiaoTypeList_radio);

        var piaofenList = [];
        piaofenList.push(_play.getChildByName("piaofen1"));
        piaofenList.push(_play.getChildByName("piaofen2"));
        piaofenList.push(_play.getChildByName("piaofen3"));
        this.piaofengList_radio = createRadioBoxForCheckBoxs(piaofenList,this.radioBoxSelectCB);
        this.addListenerText(zhuaNiaoTypeList,this.zhuaNiaoTypeList_radio);

        this.daiHZ = _play.getChildByName("daiHZ");
        this.addListenerText(this.daiHZ,null,this.daiHZ.bind(this));
        this.daiHZ.addEventListener(this.clickCB, this.daiHZ);
        this.wuHZ_double = _play.getChildByName("wuHZ");
        this.addListenerText(this.wuHZ_double);
        this.wuHZ_double.addEventListener(this.clickCB, this.wuHZ_double);
        this.mustzimo = _play.getChildByName("mustzimo");
        this.addListenerText(this.mustzimo);
        this.mustzimo.addEventListener(this.clickCB, this.mustzimo);
        this.dahu = _play.getChildByName("dahu");
        this.addListenerText(this.dahu);
        this.dahu.addEventListener(this.clickCB, this.dahu);
    },
    select_daiHz: function() {
        if (that.daiHZ.isSelected()) {
            that.wuHZ_double.setVisible(true);
        } else {
            that.wuHZ_double.setVisible(false);
            that.wuHZ_double.setSelected(false);
        }
    },
    setPlayNodeCurrentSelect:function()
    {
        var _zhuaNiao = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_NTHZ_zhuaNiao, 0);
        this.zhuaNiaoTypeList_radio.selectItem(_zhuaNiao);
        var text = this.zhuaNiaoTypeList_radio.getChildByName("text");
        this.selectedCB(text,_zhuaNiao)

        var _piaofen = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_NTHZ_piaofen, 0);
        this.piaofengList_radio.selectItem(_piaofen);
        var text = this.piaofengList_radio.getChildByName("text");
        this.selectedCB(text,_piaofen)

        var _daiHZ = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_NTHZ_daiHZ, true);
        this.daiHZ.setSelected(_daiHZ);
        var text = this.daiHZ.getChildByName("text");
        this.selectedCB(text,_daiHZ)
        this.wuHZ_double.setVisible(_daiHZ);
        var text = this.wuHZ_double.getChildByName("text");
        this.selectedCB(text,_daiHZ)

        var _wuHZ_double = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_NTHZ_wuHZ_double, false);
        this.wuHZ_double.setSelected(_wuHZ_double);
        var text = this.wuHZ_double.getChildByName("text");
        this.selectedCB(text,_wuHZ_double)

        var _mustzimo = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_NTHZ_mustzimo, true);
        this.mustzimo.setSelected(_mustzimo);
        var text = this.mustzimo.getChildByName("text");
        this.selectedCB(text,_mustzimo)

        var _dahu = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_NTHZ_dahu, true);
        this.dahu.setSelected(_dahu);
        var text = this.dahu.getChildByName("text");
        this.selectedCB(text,_dahu)
    },
    getSelectedPara:function()
    {
        var zhuaNiao = this.zhuaNiaoTypeList_radio.getSelectIndex();
        var piaofen = this.piaofengList_radio.getSelectIndex();

        var para = {};
        para.gameType = MjClient.GAME_TYPE.NTHZ;
        para.maxPlayer = 4;
        para.zhuaniao = zhuaNiao;
        para.piaofen = piaofen;
        para.daihongzhong = this.daiHZ.isSelected();
        para.nohongzhongdouble = this.wuHZ_double.isSelected();
        para.mustzimo = this.mustzimo.isSelected();
        para.dahu = this.dahu.isSelected();

        cc.log("createara: " + JSON.stringify(para));

        util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_NTHZ_zhuaNiao, zhuaNiao);
        util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_NTHZ_piaofen, piaofen);
        util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_NTHZ_daiHZ, para.daihongzhong);
        util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_NTHZ_wuHZ_double, para.nohongzhongdouble);
        util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_NTHZ_mustzimo, para.mustzimo);
        util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_NTHZ_dahu, para.dahu);

        return para;
    }
});