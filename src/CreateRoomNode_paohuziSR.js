/**
 * Created by wuxiaodong on 2017/8/1.
 */


var CreateRoomNode_paohuziSR = CreateRoomNode.extend({
    initAll:function()
    {
        this.localStorageKey.KEY_paohuziSR_kingnum     = "_PAO_HU_ZI_SR_KING_NUM";             //kingnum
        this.localStorageKey.KEY_paohuziSR_fengDing      = "_PAO_HU_ZI_SR_FENG_DING";

        this.bg_node = ccs.load("bg_paohuziSR.json").node;
        this.addChild(this.bg_node);
        this.bg_node = this.bg_node.getChildByName("bg_xuzhou");
    },
    initPlayNode:function()
    {
        var _bgXuzhouNode = this.bg_node;

        var _play = _bgXuzhouNode.getChildByName("play");

        this.twoKingNode_paohuzi = _play.getChildByName("play_twoking");

        this.twoKingNode_paohuzi.setSelected(true);
        this.twoKingNode_paohuzi.addEventListener(function(sender,type)
        {
            switch (type) {
                case ccui.CheckBox.EVENT_SELECTED:
                case ccui.CheckBox.EVENT_UNSELECTED:
                    this.twoKingNode_paohuzi.setSelected(true);
                    this.threeKingNode_paohuzi.setSelected(false);
                    break;
            }
        },this);


        this.threeKingNode_paohuzi   = _play.getChildByName("play_threeking");
        this.threeKingNode_paohuzi.addEventListener(function(sender,type)
        {
            switch (type) {
                case ccui.CheckBox.EVENT_SELECTED:
                case ccui.CheckBox.EVENT_UNSELECTED:
                    this.twoKingNode_paohuzi.setSelected(false);
                    this.threeKingNode_paohuzi.setSelected(true);
                    break;
            }
        },this);


        this.fanXingNode_paohuzi   = _play.getChildByName("play_fanxing");
        this.fanXingNode_paohuzi.setSelected(true);
        this.fanXingNode_paohuzi.setTouchEnabled(false);

        //封顶
        this.sanbaiNode_paohuzi = _play.getChildByName("play_sanbai");
        this.sanbaiNode_paohuzi.setSelected(true);
        this.sanbaiNode_paohuzi.addEventListener(function(sender,type)
        {
            switch (type) {
                case ccui.CheckBox.EVENT_SELECTED:
                case ccui.CheckBox.EVENT_UNSELECTED:
                    cc.log("wxd........................touch...")
                    this.sanbaiNode_paohuzi.setSelected(true);
                    this.liubaiNode_paohuzi.setSelected(false);
                    this.wushangxianNode_paohuzi.setSelected(false);
                    break;
            }
        },this);

        this.liubaiNode_paohuzi   = _play.getChildByName("play_liubai");
        this.liubaiNode_paohuzi.addEventListener(function(sender,type)
        {
            switch (type) {
                case ccui.CheckBox.EVENT_SELECTED:
                case ccui.CheckBox.EVENT_UNSELECTED:
                    this.sanbaiNode_paohuzi.setSelected(false);
                    this.liubaiNode_paohuzi.setSelected(true);
                    this.wushangxianNode_paohuzi.setSelected(false);
                    break;
            }
        },this);

        this.wushangxianNode_paohuzi   = _play.getChildByName("play_wushangxian");
        this.wushangxianNode_paohuzi.addEventListener(function(sender,type)
        {
            switch (type) {
                case ccui.CheckBox.EVENT_SELECTED:
                case ccui.CheckBox.EVENT_UNSELECTED:
                    this.sanbaiNode_paohuzi.setSelected(false);
                    this.liubaiNode_paohuzi.setSelected(false);
                    this.wushangxianNode_paohuzi.setSelected(true);
                    break;
            }
        },this);

        //跑胡子四人不要四局
        var _currentRoundState = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_RondType, 1);
        if (_currentRoundState == 1)
        {
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_RondType, 2);
        }
    },
    setPlayNodeCurrentSelect:function()
    {
        var paohuzi_kingnum = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_paohuziSR_kingnum, 2);
        cc.log("wxd..........paohuzi_kingnum:"+paohuzi_kingnum)
        if(paohuzi_kingnum == 2)
        {
            this.twoKingNode_paohuzi.setSelected(true);
            this.threeKingNode_paohuzi.setSelected(false);

        }
        else if(paohuzi_kingnum == 3)
        {
            this.twoKingNode_paohuzi.setSelected(false);
            this.threeKingNode_paohuzi.setSelected(true);
        }

        var paohuzi_fengDing = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_paohuziSR_fengDing, 300);
        if(paohuzi_fengDing == 300){
            this.sanbaiNode_paohuzi.setSelected(true);
            this.liubaiNode_paohuzi.setSelected(false);
            this.wushangxianNode_paohuzi.setSelected(false);
        }else if(paohuzi_fengDing == 600){
            this.sanbaiNode_paohuzi.setSelected(false);
            this.liubaiNode_paohuzi.setSelected(true);
            this.wushangxianNode_paohuzi.setSelected(false);
        }else if(paohuzi_fengDing == -1){
            this.sanbaiNode_paohuzi.setSelected(false);
            this.liubaiNode_paohuzi.setSelected(false);
            this.wushangxianNode_paohuzi.setSelected(true);
        }
    },
    getSelectedPara:function()
    {
        var para = {};
        para.gameType = MjClient.GAME_TYPE.PAO_HU_ZI_SR;
        para.maxPlayer = 4;
        //para.isJiaZhu = true;//是否下嘴
        para.kingNum = 2;//双王玩法
        para.isFanXing = 2;//单醒还是双醒
        para.fengDing = 300;//封顶

        //几王玩法
        if (this.twoKingNode_paohuzi.isSelected())
        {
            para.kingNum = 2;

        }
        else if (this.threeKingNode_paohuzi.isSelected())
        {
            para.kingNum = 3;
        }

        //封顶
        if(this.sanbaiNode_paohuzi.isSelected()){
            para.fengDing = 300;
        }else if(this.liubaiNode_paohuzi.isSelected()){
            para.fengDing = 600;
        }else if(this.wushangxianNode_paohuzi.isSelected()){
            para.fengDing = -1;
        }

        util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_paohuziSR_kingnum, para.kingNum);
        util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_paohuziSR_fengDing, para.fengDing);



        //cc.log("------gameType localStorageEncrypt: " + _gameType);
        cc.log("createara: " + JSON.stringify(para));
        return para;
    }
});