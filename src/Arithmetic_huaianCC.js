
(function() {
    var majiang = {};
    majiang.flowerArray = [];//花的列表，根据不同来设置


    //是否是花
    majiang.isCardFlower = function(card)
    {   
        var tData = MjClient.data.sData.tData;
        if (tData.areaSelectMode.zhongfabai == 1){
            this.flowerArray = [71];
        }else if (tData.areaSelectMode.zhongfabai == 2){
            this.flowerArray = [71, 81, 91];
        }else if (tData.areaSelectMode.zhongfabai == 3){
            this.flowerArray = []
        }else if (tData.areaSelectMode.zhongfabai == 4) {
            this.flowerArray  = [71, 81];
        }
        var isflower = this.flowerArray.indexOf(card) >= 0
        return isflower;
    }

    //设置花，参数是[]，必须设置
    majiang.setFlower = function(flower)
    {   
        this.flowerArray = flower || this.flowerArray;
    }

    //是否是混子
    majiang.isEqualHunCard = function(card)
    {
        return card == 200;
    }

    //是否可以胡
    majiang.canHu = function(cards, cd)
    {
        if (is7Dui(cards, cd)) {
            return true;
        }
        return canHuLaizi(cards, cd);
    }

    //听牌函数，判断手牌能否听牌
    majiang.canTing = function (cds) {
        var tingSet = calTingSet(cds);
        return Object.keys(tingSet).length == 1;
    }

    majiang.canGangWhenTing = function(hand, card)
    {
        var hangAfterGang = [];
        for(var i = 0; i < hand.length; i++)
        {
            if(card != hand[i])
            {
                hangAfterGang.push(hand[i]);
            }
        }
        //若听牌状态下，去掉所杠的牌不能再听则不能杠
        if (!majiang.canTing(hangAfterGang)) {
            return false;
        }
        //求出之前听的牌
        var tingSet1 = calTingSet(hand);
        //求出杠之后听的牌
        var tingSet2 = calTingSet(hangAfterGang);
        //对比前后听的牌
        if (Object.keys(tingSet1).length != Object.keys(tingSet2).length){
            return false;
        }

        // 原来听的牌不能听了， 返回false
        // for(var tingCard in tingSet1) {
        //     if (!(tingCard in tingSet2)) {
        //         return false;
        //     }
        // }
        //听牌不变可以杠
        return true;
    }

    //是否可以杠
    majiang.canGang1 = function(peng, hand, isTing)
    {
        var rtn = [];
        for(var i = 0; i < peng.length; i++)
        {
            if(hand.indexOf(peng[i]) >= 0 && (!isTing || majiang.canGangWhenTing(hand, peng[i])))
            {
                //手牌里的牌Push到rtn中
                rtn.push(peng[i]);
            }
        }
        var cnum = {};
        for(var i = 0; i < hand.length; i++)
        {
            var cd = hand[i];
            if(majiang.isEqualHunCard(cd))
            {
                continue;
            }
            var num = cnum[cd];
            if(!num)
            {
                num = 0;
            }
            num++;
            cnum[cd] = num;
            if(num == 4 && (!isTing || majiang.canGangWhenTing(hand, cd)))
            {
                rtn.push(cd);
            }
        }
        return rtn;
    };

    //是否可以明杠
    majiang.canGang0 = function(hand, cd, isTing)
    {
        if(majiang.isEqualHunCard(cd))//混牌不能杠
        {
            return false;
        }
        var num = 0;
        for (var i = 0; i < hand.length; i++) {
            if (hand[i] == cd) num++;
        }
        return num == 3 && (!isTing || majiang.canGangWhenTing(hand, cd));
    };

    //是否可以碰
    majiang.canPeng = function(hand, cd)
    {
        var num = 0;
        if(majiang.isEqualHunCard(cd))//混牌不能碰
        {
            return false;
        }
        for(var i = 0; i < hand.length; i++)
        {
            if(hand[i] == cd)
            {
                num++;
            }
        }
        return num >= 2;
    };

    majiang.CardCount = function (pl)
    {
        if(!pl) return 0;
        
        var rtn = (pl.mjpeng.length + pl.mjgang0.length + pl.mjgang1.length) * 3 + pl.mjchi.length;
        if(pl.mjhand)
        {
            rtn += pl.mjhand.length;
        }
        return rtn;
    };

    majiang.getAllCardsTotal = function ()
    {
        var tData = MjClient.data.sData.tData;
        if (tData.areaSelectMode.zhongfabai == 1) {
            return 112;
        }
        else  if (tData.areaSelectMode.zhongfabai == 4){
                return 116;
        }else{
            return 120;
        }
        return 0;
    };

    majiang.setFlowerImg = function (node, pl)
    {   
        var tData = MjClient.data.sData.tData;
        var isshow = tData.areaSelectMode.zhongfabai==3 ? false : true;
        if(!isshow || !pl) return;

        var icountNode = node.getChildByName("head").getChildByName("huaCount");
        if(icountNode != null) {
            var icount = pl.mjflower.length;
            icountNode.visible = true;
            cc.log("set flower ------ icount = " + icount);
            //changeAtalsForLabel(icountNode,icount);
            icountNode.setString("花 x " + icount);
        }
    };

    majiang.setJiaZhuNum = function (node, pl)
    {
        if(!pl) return;
        var icountNode = node.getChildByName("head").getChildByName("jiaZhu");
        var tData = MjClient.data.sData.tData;
        cc.log("===========拉庄 = " + pl.jiazhuNum);
        if(pl.jiazhuNum > 0) {
            icountNode.visible = true;
            icountNode.ignoreContentAdaptWithSize(true);
            if (tData.uids[tData.zhuang] != pl.info.uid)
                icountNode.setString("拉庄x" + pl.jiazhuNum);
            else
                icountNode.setString("顶庄x" + pl.jiazhuNum);
        }else{
            icountNode.setString("");
        }
    };

    if (typeof(MjClient) != "undefined")
    {
        MjClient.majiang_huaianCC = majiang;
    }
    else
    {
        module.exports = majiang;
    }
})();
