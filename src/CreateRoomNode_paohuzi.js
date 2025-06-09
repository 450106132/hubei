/**
 * Created by wuxiaodong on 2017/8/1.
 */


var CreateRoomNode_paohuzi = CreateRoomNode.extend({
    initAll:function(IsFriendCard)
    {
        if (!IsFriendCard) {
            this.localStorageKey.KEY_paohuzi_kingnum = "_PAO_HU_ZI_KING_NUM"; //kingnum
            this.localStorageKey.KEY_paohuzi_isfanxing = "_PAO_HU_ZI_IS_FAN_XING"; //kingnum
            this.localStorageKey.KEY_paohuzi_fengDing = "_PAO_HU_ZI_FENG_DING"; //fengding
            this.localStorageKey.KEY_paohuzi_hongZhuan = "_PAO_HU_ZI_HONG_ZHUAN"; //hongZhuan
            this.localStorageKey.Key_paohuzi_isgenxing = "_PAO_HU_ZI_GEN_XING"; //gen xing
        }

        // var majiang = MjClient.data.gameInfo.js3mj;
        // this.fangzhuPay = {pay4:majiang.roundYZCHZ12,  pay8:majiang.roundYZCHZ8,  pay16:majiang.roundYZCHZ16, pay10:majiang.roundYZCHZ10};
        // this.AAPay      = {pay4:majiang.roundYZCHZAA12,pay8:majiang.roundYZCHZAA8,pay16:majiang.roundYZCHZAA16, pay10:majiang.roundYZCHZAA10};
        // this.clubPay    = {pay4:majiang.roundYZCHZCL12,pay8:majiang.roundYZCHZCL8,pay16:majiang.roundYZCHZCL16, pay10:majiang.roundYZCHZCL10};

        this.roundNumObj = {roundNum1:12, roundNum2:8, roundNum3:16, roundNum4:10};
        if (MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ) {
            this.roundNumObj = {roundNum1:20, roundNum2:5, roundNum3:20, roundNum4:10};
        }
        
        this.bg_node = ccs.load("bg_paohuzi.json").node;
        this.addChild(this.bg_node);
        this.bg_node = this.bg_node.getChildByName("bg_xuzhou");
    },
    initPlayNode:function()
    {
        var _bgXuzhouNode = this.bg_node;

        var _play = _bgXuzhouNode.getChildByName("play");
        //无王、单王、双王、三王
        this.noKingNode_paohuzi = _play.getChildByName("play_noking");
        this.oneKingNode_paohuzi = _play.getChildByName("play_oneking");
        this.twoKingNode_paohuzi = _play.getChildByName("play_twoking");
        this.twoKingNode_paohuzi.setSelected(true);
        var txt = this.twoKingNode_paohuzi.getChildByName("text");
        txt.setTextColor(cc.color(237,101,1));

        this.threeKingNode_paohuzi   = _play.getChildByName("play_threeking");
        var nodeListKing = [];
        nodeListKing.push( this.noKingNode_paohuzi );
        nodeListKing.push( this.oneKingNode_paohuzi );
        nodeListKing.push( this.twoKingNode_paohuzi );
        nodeListKing.push( this.threeKingNode_paohuzi );
        this._playNode_King_radio_2 = createRadioBoxForCheckBoxs(nodeListKing,this.radioBoxSelectCB);
        cc.eventManager.addListener(this.setTextClick(nodeListKing,0,this._playNode_King_radio_2),nodeListKing[0].getChildByName("text"));
        cc.eventManager.addListener(this.setTextClick(nodeListKing,1,this._playNode_King_radio_2),nodeListKing[1].getChildByName("text"));
        cc.eventManager.addListener(this.setTextClick(nodeListKing,2,this._playNode_King_radio_2),nodeListKing[2].getChildByName("text"));
        cc.eventManager.addListener(this.setTextClick(nodeListKing,3,this._playNode_King_radio_2),nodeListKing[3].getChildByName("text"));

        //跟醒、翻醒
        this.genXingNode_paohuzi = _play.getChildByName("play_genxing");
        this.genXingNode_paohuzi.setSelected(true);
        var txt = this.genXingNode_paohuzi.getChildByName("text");
        txt.setTextColor(cc.color(237,101,1));

        this.fanXingNode_paohuzi   = _play.getChildByName("play_fanxing");
        var nodeListXing = [];
        nodeListXing.push( this.genXingNode_paohuzi );
        nodeListXing.push( this.fanXingNode_paohuzi );
        this._playNode_Xing_radio_2 = createRadioBoxForCheckBoxs(nodeListXing,this.radioBoxSelectCB);
        cc.eventManager.addListener(this.setTextClick(nodeListXing,0,this._playNode_Xing_radio_2),nodeListXing[0].getChildByName("text"));
        cc.eventManager.addListener(this.setTextClick(nodeListXing,1,this._playNode_Xing_radio_2),nodeListXing[1].getChildByName("text"));

        //单醒、双醒 
        // this.oneXingNode_paohuzi = _play.getChildByName("play_onexing");
        // this.oneXingNode_paohuzi.setSelected(true);
        // this.twoXingNode_paohuzi   = _play.getChildByName("play_twoxing");
        // var nodeListoneXing = [];
        // nodeListoneXing.push( this.oneXingNode_paohuzi );
        // nodeListoneXing.push( this.twoXingNode_paohuzi );
        // this._playNode_oneXing_radio_2 = createRadioBoxForCheckBoxs(nodeListoneXing);
        // cc.eventManager.addListener(this.setTextClick(nodeListoneXing,0,this._playNode_oneXing_radio_2),nodeListoneXing[0].getChildByName("text"));
        // cc.eventManager.addListener(this.setTextClick(nodeListoneXing,1,this._playNode_oneXing_radio_2),nodeListoneXing[1].getChildByName("text"));
        
        //fix bug 千千
        //单醒、双醒
        this.twoXingNode_paohuzi   = _play.getChildByName("play_twoxing");
        cc.eventManager.addListener(this.setTextClick(),this.twoXingNode_paohuzi.getChildByName("text"));
        this.twoXingNode_paohuzi.addEventListener(function(sender,type)
        {
            switch (type) {
                case ccui.CheckBox.EVENT_SELECTED:
                case ccui.CheckBox.EVENT_UNSELECTED:
                    var txt = sender.getChildByName("text");
                    if(sender.isSelected()){
                        txt.setTextColor(cc.color(237,101,1));
                    }else{
                        txt.setTextColor(cc.color(158,118,78));
                    }
                    break;
            }
        }, this.twoXingNode_paohuzi);


        //封顶
        this.sanbaiNode_paohuzi = _play.getChildByName("play_sanbai");
        this.sanbaiNode_paohuzi.setSelected(true);
        var txt = this.sanbaiNode_paohuzi.getChildByName("text");
        txt.setTextColor(cc.color(237,101,1));

        this.liubaiNode_paohuzi   = _play.getChildByName("play_liubai");
        this.wushangxianNode_paohuzi   = _play.getChildByName("play_wushangxian");
        var nodeListBai = [];
        nodeListBai.push( this.sanbaiNode_paohuzi );
        nodeListBai.push( this.liubaiNode_paohuzi );
        nodeListBai.push( this.wushangxianNode_paohuzi );
        this._playNode_Bai_radio_2 = createRadioBoxForCheckBoxs(nodeListBai, this.radioBoxSelectCB);
        cc.eventManager.addListener(this.setTextClick(nodeListBai,0,this._playNode_Bai_radio_2),nodeListBai[0].getChildByName("text"));
        cc.eventManager.addListener(this.setTextClick(nodeListBai,1,this._playNode_Bai_radio_2),nodeListBai[1].getChildByName("text"));
        cc.eventManager.addListener(this.setTextClick(nodeListBai,2,this._playNode_Bai_radio_2),nodeListBai[2].getChildByName("text"));


        //红转朱黑
        this.hongZhuanNode_paohuzi = _play.getChildByName("hongzhuan");
        cc.eventManager.addListener(this.setTextClick(),this.hongZhuanNode_paohuzi.getChildByName("text"));
        this.hongZhuanNode_paohuzi.addEventListener(function(sender,type)
        {
            switch (type) {
                case ccui.CheckBox.EVENT_SELECTED:
                case ccui.CheckBox.EVENT_UNSELECTED:
                    var txt = sender.getChildByName("text");
                    if(sender.isSelected()){
                        txt.setTextColor(cc.color(237,101,1));
                    }else{
                        txt.setTextColor(cc.color(158,118,78));
                    }
                    break;
            }
        }, this.hongZhuanNode_paohuzi);
    },

    setPlayNodeCurrentSelect:function(isClub)
    {   
        //无王、单王、双王、三王
        var paohuzi_kingnum;
        if(isClub){
            paohuzi_kingnum = this.getNumberItem("kingNum",2);
        }else{
            paohuzi_kingnum = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_paohuzi_kingnum, 2);
        }
        //fix by 千千
        var list = [];
        list.push(this.noKingNode_paohuzi);
        list.push(this.oneKingNode_paohuzi);
        list.push(this.twoKingNode_paohuzi);
        list.push(this.threeKingNode_paohuzi);
        var index = 0;
        if(paohuzi_kingnum == 0){
            this.noKingNode_paohuzi.setSelected(true);
            this.oneKingNode_paohuzi.setSelected(false);
            this.twoKingNode_paohuzi.setSelected(false);
            this.threeKingNode_paohuzi.setSelected(false);
            index = 0;
        }else if(paohuzi_kingnum == 1){
            this.oneKingNode_paohuzi.setSelected(true);
            this.noKingNode_paohuzi.setSelected(false);
            this.twoKingNode_paohuzi.setSelected(false);
            this.threeKingNode_paohuzi.setSelected(false);
            index = 1;
        }else if(paohuzi_kingnum == 2){
            this.twoKingNode_paohuzi.setSelected(true);
            this.noKingNode_paohuzi.setSelected(false);
            this.oneKingNode_paohuzi.setSelected(false);
            this.threeKingNode_paohuzi.setSelected(false);
            index = 2;
        }else if(paohuzi_kingnum == 3){
            this.threeKingNode_paohuzi.setSelected(true);
            this.noKingNode_paohuzi.setSelected(false);
            this.oneKingNode_paohuzi.setSelected(false);
            this.twoKingNode_paohuzi.setSelected(false);
            index = 3;
        }
        //fix by 千千
        this.radioBoxSelectCB(index,list[index],list);

        //单醒、双醒
        var oneXingNode_paohuzi;
        if(isClub){
            oneXingNode_paohuzi = this.getNumberItem("isFanXing",1);
        }else{
            oneXingNode_paohuzi = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_paohuzi_isfanxing, 1);
        }
        if(oneXingNode_paohuzi == 1){
            // this.oneXingNode_paohuzi.setSelected(true);
            this.twoXingNode_paohuzi.setSelected(false);
        }else if(oneXingNode_paohuzi == 2){
            // this.oneXingNode_paohuzi.setSelected(false);
            this.twoXingNode_paohuzi.setSelected(true);
        }
        var txt = this.twoXingNode_paohuzi.getChildByName("text");
        if(oneXingNode_paohuzi == 2){
            txt.setTextColor(cc.color(237,101,1));
        }else{
            txt.setTextColor(cc.color(158,118,78));
        }

        //跟醒、翻醒
        var genXingNode_paohuzi;
        if(isClub){
            genXingNode_paohuzi = this.getBoolItem("isGenXing",true);
        }else{
            genXingNode_paohuzi = util.localStorageEncrypt.getBoolItem(this.localStorageKey.Key_paohuzi_isgenxing, true);
        }
        var list = [];
        list.push(this.genXingNode_paohuzi);
        list.push(this.fanXingNode_paohuzi);
        index = 0;
        if(genXingNode_paohuzi == true){
            this.genXingNode_paohuzi.setSelected(true);
            this.fanXingNode_paohuzi.setSelected(false);
            index = 0;
        }else if(genXingNode_paohuzi == false){
            this.genXingNode_paohuzi.setSelected(false);
            this.fanXingNode_paohuzi.setSelected(true);
            index = 1;
        }  
        //fix by 千千
        this.radioBoxSelectCB(index,list[index],list);

        //红转朱黑
        var paohuzi_hongZhuan;
        if(isClub){
            paohuzi_hongZhuan = this.getBoolItem("hongZhuan",false);
        }else{
            paohuzi_hongZhuan = util.localStorageEncrypt.getBoolItem(this.localStorageKey.KEY_paohuzi_hongZhuan, false);
        }
        this.hongZhuanNode_paohuzi.setSelected(paohuzi_hongZhuan);
        var txt = this.hongZhuanNode_paohuzi.getChildByName("text");
        if(paohuzi_hongZhuan){
            txt.setTextColor(cc.color(237,101,1));
        }else{
            txt.setTextColor(cc.color(158,118,78));
        }
        
        //封顶
        var paohuzi_fengDing;
        if(isClub){
            paohuzi_fengDing = this.getNumberItem("fengDing",300);
        }else {
            paohuzi_fengDing = util.localStorageEncrypt.getNumberItem(this.localStorageKey.KEY_paohuzi_fengDing, 300);
        }
        list = [];
        list.push(this.sanbaiNode_paohuzi);
        list.push(this.liubaiNode_paohuzi);
        list.push(this.wushangxianNode_paohuzi);
        index = 2;
        if(paohuzi_fengDing == 300){
            this.sanbaiNode_paohuzi.setSelected(true);
            this.liubaiNode_paohuzi.setSelected(false);
            this.wushangxianNode_paohuzi.setSelected(false);
            index = 0;
        }else if(paohuzi_fengDing == 600){
            this.sanbaiNode_paohuzi.setSelected(false);
            this.liubaiNode_paohuzi.setSelected(true);
            this.wushangxianNode_paohuzi.setSelected(false);
            index = 1;
        }else if(paohuzi_fengDing == -1){
            this.sanbaiNode_paohuzi.setSelected(false);
            this.liubaiNode_paohuzi.setSelected(false);
            this.wushangxianNode_paohuzi.setSelected(true);
            index = 2;
        }
        //fix by 千千
        this.radioBoxSelectCB(index,list[index],list);
    },
    getSelectedPara:function()
    {
        var para = {};
        para.gameType = MjClient.GAME_TYPE.PAO_HU_ZI;
        para.maxPlayer = 3;
        para.kingNum = 2;//双王玩法
        para.isFanXing = 1;//单醒还是双醒
        para.hongZhuan = false;//红转朱黑
        para.fengDing = 300;//封顶
        para.isGenXing = true;//跟醒翻醒

        //几王玩法
        if(this.noKingNode_paohuzi.isSelected()){
            para.kingNum = 0;
        }else if(this.oneKingNode_paohuzi.isSelected()){
            para.kingNum = 1;
        }else if (this.twoKingNode_paohuzi.isSelected()){
            para.kingNum = 2;
        }else if (this.threeKingNode_paohuzi.isSelected()){
            para.kingNum = 3;
        }
        //单醒还是双醒
        // if (this.oneXingNode_paohuzi.isSelected()){
        //     para.isFanXing = 1;
        // }else if (this.twoXingNode_paohuzi.isSelected()){
        //     para.isFanXing = 2;
        // }
        //fix by 千千
        if (this.twoXingNode_paohuzi.isSelected()){
            para.isFanXing = 2;
        }else{
            para.isFanXing = 1
        }
        //跟醒还是翻醒
        if(this.genXingNode_paohuzi.isSelected()){
            para.isGenXing = true;
        }else if(this.fanXingNode_paohuzi.isSelected()){
            para.isGenXing = false;
        }
        //红转朱黑
        para.hongZhuan = this.hongZhuanNode_paohuzi.isSelected();

        //封顶
        if(this.sanbaiNode_paohuzi.isSelected()){
            para.fengDing = 300;
        }else if(this.liubaiNode_paohuzi.isSelected()){
            para.fengDing = 600;
        }else if(this.wushangxianNode_paohuzi.isSelected()){
            para.fengDing = -1;
        }
        if (!this._isFriendCard){
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.KEY_paohuzi_hongZhuan, para.hongZhuan);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_paohuzi_kingnum, para.kingNum);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_paohuzi_isfanxing, para.isFanXing);
            util.localStorageEncrypt.setNumberItem(this.localStorageKey.KEY_paohuzi_fengDing, para.fengDing);
            util.localStorageEncrypt.setBoolItem(this.localStorageKey.Key_paohuzi_isgenxing, para.isGenXing);
        }


        cc.log("createara: " + JSON.stringify(para));
        return para;
    }
});