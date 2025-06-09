//跑得快算法类
(function() {
function PaodekuaiTY() {
    this.handCount = 16;
    this.laiziCard = -1;

    // this.cardCfg.fk[1]==方块1 
    // this.cardCfg.ht[13]==黑桃K
    // this.cardCfg.jokerRed==大王
    this.cardCfg = {};
    this.cardCfg.fk = {};
    this.cardCfg.mh = {};
    this.cardCfg.hx = {};
    this.cardCfg.ht = {};
    this.cardCfg.jokerRed = 53;
    this.cardCfg.jokerBlack = 54;
    for(var i=1; i<=52; i++ ){
        // 0:方块  1:梅花  2:梅花  3:黑桃
        var cardType = (i + 3) % 4;
        // 牌值 1 - 13
        var cardValue = Math.ceil(i / 4);
        if(0 == cardType) this.cardCfg.fk[cardValue] = i;
        if(1 == cardType) this.cardCfg.mh[cardValue] = i;
        if(2 == cardType) this.cardCfg.hx[cardValue] = i;
        if(3 == cardType) this.cardCfg.ht[cardValue] = i;
    }
    this.cardCfg.firstOutCard = this.cardCfg.ht[3];
}

if(typeof(cc)=='undefined') {
    var cc = function(){}
    cc.log = function(){
        var str = '';
        for (var i=0; i<arguments.length; i++){
            str  = str + arguments[i] + ' ';
        }
    }
}

var PDK_MINPOINT = 3;
var PDK_KPOINT = 13;
var PDK_APOINT = 14;
var PDK_2POINT = 16;// 2，和A必须分开
var PDK_MAXPOINT = PDK_2POINT; 
// 牌型排序优先级 和 id
var PDK_CARDTPYE = {
    sidaisan: 13,
    sandaier: 12,
    feiji: 11,
    sanshun: 10,
    sidaier: 9,
    sangeA: 8,
    sange3: 7,
    sizha: 14,
    sandaiyi: 6,
    liandui: 5,
    shunzi: 4,
    sanzhang: 3, // 只能最后一次出牌有效 
    duizi: 2,
    danpai: 1,
};
PaodekuaiTY.prototype.CARDTPYE = PDK_CARDTPYE;
var PDK_CARDCOUNT = {};
PDK_CARDCOUNT[PDK_CARDTPYE.feiji] = 8;
PDK_CARDCOUNT[PDK_CARDTPYE.sanshun] = 6;
PDK_CARDCOUNT[PDK_CARDTPYE.sidaier] = 6;
PDK_CARDCOUNT[PDK_CARDTPYE.sidaisan] = 5;
PDK_CARDCOUNT[PDK_CARDTPYE.sangeA] = 3;
PDK_CARDCOUNT[PDK_CARDTPYE.sange3] = 3;
PDK_CARDCOUNT[PDK_CARDTPYE.sizha] = 4;
PDK_CARDCOUNT[PDK_CARDTPYE.sandaier] = 5;
PDK_CARDCOUNT[PDK_CARDTPYE.sandaiyi] = 4;
PDK_CARDCOUNT[PDK_CARDTPYE.liandui] = 4;
PDK_CARDCOUNT[PDK_CARDTPYE.shunzi] = 5;
PDK_CARDCOUNT[PDK_CARDTPYE.sanzhang] = 3;
PDK_CARDCOUNT[PDK_CARDTPYE.duizi] = 2;
PDK_CARDCOUNT[PDK_CARDTPYE.danpai] = 1;

var PDK_CARD_VALUE = {};
PDK_CARD_VALUE[PDK_CARDTPYE.sangeA] = 3;
PDK_CARD_VALUE[PDK_CARDTPYE.sizha] = 2;
PDK_CARD_VALUE[PDK_CARDTPYE.sange3] = 1;


// 包函关系的牌型
var pdk_cardTypeSub = function() {
    var ret = {};
    ret[PDK_CARDTPYE.sizha] = [PDK_CARDTPYE.sanzhang, PDK_CARDTPYE.duizi];
    ret[PDK_CARDTPYE.sanzhang] = [PDK_CARDTPYE.duizi];
    ret[PDK_CARDTPYE.liandui] = [PDK_CARDTPYE.duizi];
    ret[PDK_CARDTPYE.sandaier] = [PDK_CARDTPYE.sanzhang, PDK_CARDTPYE.duizi];
    ret[PDK_CARDTPYE.sandaiyi] = [PDK_CARDTPYE.sanzhang, PDK_CARDTPYE.duizi];
    ret[PDK_CARDTPYE.feiji] = [PDK_CARDTPYE.sanzhang, PDK_CARDTPYE.liandui, PDK_CARDTPYE.duizi];
    return ret;
}();

// 出牌提示顺序
var pdk_putOrder = [];
var pdk_daiPaiOrder = [];
var pdk_allZhaDan = [
    PDK_CARDTPYE.sange3,
    PDK_CARDTPYE.sizha,
    PDK_CARDTPYE.sangeA,
];

// 出牌提示时不拆的所有牌型
var pdk_allBuChaiType = [
    PDK_CARDTPYE.duizi,
    PDK_CARDTPYE.sanzhang,
    PDK_CARDTPYE.shunzi,
    PDK_CARDTPYE.liandui,
    PDK_CARDTPYE.feiji,
    PDK_CARDTPYE.sange3,
    PDK_CARDTPYE.sizha,
    PDK_CARDTPYE.sangeA,
];

PaodekuaiTY.prototype.allTipsNoOrder = [
    [PDK_CARDTPYE.danpai, []],
    [PDK_CARDTPYE.duizi, []],
    [PDK_CARDTPYE.sandaier, []],
    [PDK_CARDTPYE.sandaiyi, []],
    [PDK_CARDTPYE.liandui, []],
    [PDK_CARDTPYE.shunzi, []],
    [PDK_CARDTPYE.feiji, []],
    [pdk_allZhaDan, []],
];

/*红桃/黑桃3先手提示
主动提起一张先手的三，可点提示
对3  不拆炸弹
提起所有3 实现成 三带二 三带一 不拆炸弹
带3的连对 不拆炸弹
带3顺子最长的顺子 不拆炸弹
*/
pdk_putOrder[99] = [
    [PDK_CARDTPYE.danpai, []],
    [PDK_CARDTPYE.duizi, [pdk_allZhaDan]],
    [PDK_CARDTPYE.sandaier, [pdk_allZhaDan]],
    [PDK_CARDTPYE.sandaiyi, [pdk_allZhaDan]],
    [PDK_CARDTPYE.liandui, [pdk_allZhaDan]],
    [PDK_CARDTPYE.shunzi, [pdk_allZhaDan]],
];

/* 先手提示：
单牌(不能组成任何牌型,独立的单牌),如果只有一个单牌2，则放到后面提示。
对子（不拆其他牌型的对子）
顺子 不能组成其他牌型最大数量的顺子
三带二（不拆其他牌型） 
三带一（不拆其他牌型）
连对（不拆其他牌型）
挨个提示单牌，可拆炸弹
炸弹
*/
pdk_putOrder[0] = [
    [PDK_CARDTPYE.danpai, pdk_allBuChaiType, {buchuOnly2:true}],
    [PDK_CARDTPYE.duizi, pdk_allBuChaiType],
    [PDK_CARDTPYE.shunzi, pdk_allBuChaiType],
    [PDK_CARDTPYE.sandaier, [pdk_allBuChaiType]],
    [PDK_CARDTPYE.sandaiyi, [pdk_allBuChaiType]],
    [PDK_CARDTPYE.liandui, [pdk_allBuChaiType]],

    [PDK_CARDTPYE.shunzi, []],
    [PDK_CARDTPYE.sandaier, []],
    [PDK_CARDTPYE.sandaiyi, []],
    [PDK_CARDTPYE.liandui, []],
    [PDK_CARDTPYE.duizi, []],

    [PDK_CARDTPYE.danpai, []],
    [pdk_allZhaDan, []],
];

/* 接单牌提示顺序
1.  出独立的单牌，不拆其他牌型
2.  出非组成顺子必要条件的单牌，不拆炸弹、三条、对子
3.  拆顺子的单牌，不拆炸弹、三条、对子
4.  拆对子，不拆炸弹、三条。
5.  拆三条，不拆炸弹
6.  炸弹
7.  单牌
*/
pdk_putOrder[PDK_CARDTPYE.danpai] = [
    [PDK_CARDTPYE.danpai, pdk_allBuChaiType],
    [PDK_CARDTPYE.danpai, [pdk_allZhaDan, PDK_CARDTPYE.sanzhang, PDK_CARDTPYE.duizi, PDK_CARDTPYE.shunzi]],
    [PDK_CARDTPYE.danpai, [pdk_allZhaDan, PDK_CARDTPYE.sanzhang, PDK_CARDTPYE.duizi]],
    [PDK_CARDTPYE.danpai, [pdk_allZhaDan, PDK_CARDTPYE.sanzhang]],
    [PDK_CARDTPYE.danpai, [pdk_allZhaDan]],
    [pdk_allZhaDan, []],
    [PDK_CARDTPYE.danpai, []],
];

/* 接对子提示顺序
1.  提示独立的对子
2.  出非组成顺子必要条件的对子
3.  拆顺子，不拆炸弹、飞机、三张
4.  拆三张，不拆炸弹、飞机
5.  拆飞机，不拆炸弹
6.  出炸弹
7.  对子，
*/
pdk_putOrder[PDK_CARDTPYE.duizi] = [
    // [PDK_CARDTPYE.duizi, pdk_allBuChaiType],
    // [PDK_CARDTPYE.duizi, [pdk_allZhaDan, PDK_CARDTPYE.feiji, PDK_CARDTPYE.sanzhang, PDK_CARDTPYE.shunzi]],
    // [PDK_CARDTPYE.duizi, [pdk_allZhaDan, PDK_CARDTPYE.feiji, PDK_CARDTPYE.sanzhang]],
    // [PDK_CARDTPYE.duizi, [pdk_allZhaDan, PDK_CARDTPYE.feiji]],
    [PDK_CARDTPYE.duizi, [pdk_allZhaDan]],
    [pdk_allZhaDan, []],
    [PDK_CARDTPYE.duizi, []],
];

/* 接连对提示顺序
1.不拆炸弹的连对
2.炸弹
3.连对
*/
pdk_putOrder[PDK_CARDTPYE.liandui] = [
    [PDK_CARDTPYE.liandui, pdk_allBuChaiType],
    [PDK_CARDTPYE.liandui, [pdk_allZhaDan,PDK_CARDTPYE.sanzhang]],    
    [PDK_CARDTPYE.liandui, [pdk_allZhaDan]],
    [pdk_allZhaDan, []],
    [PDK_CARDTPYE.liandui, []],
];

/* 接顺子提示顺序
1.  优先出不能组成其他牌型的顺子
2.  拆三张，不拆炸弹、对子、飞机
3.  拆对子，不拆炸弹、飞机
4.  拆飞机，不拆炸弹
5.  顺子
6.  炸弹
*/
pdk_putOrder[PDK_CARDTPYE.shunzi] = [
    [PDK_CARDTPYE.shunzi, pdk_allBuChaiType],
    [PDK_CARDTPYE.shunzi, [pdk_allZhaDan, PDK_CARDTPYE.feiji, PDK_CARDTPYE.duizi]],
    [PDK_CARDTPYE.shunzi, [pdk_allZhaDan, PDK_CARDTPYE.feiji]],
    [PDK_CARDTPYE.shunzi, [pdk_allZhaDan]],
    [PDK_CARDTPYE.shunzi, []],
    [pdk_allZhaDan, []],
];

/*接三带二&三带一提示逻辑
找到一个三张部分，依次提示完带牌再提示其他三张
1.  炸弹，无不拆炸弹的三张，提示炸弹
2.  选择三张，提示独立的三张
3.  选择三张，拆顺子，不拆飞机
4.  选择三张，拆飞机
5.  选择二张，散牌大于2，提示散牌
6.  选择二张，散牌等于1，有对子比散牌小且非组成顺子的必要条件，提示该对子，不拆三张、顺子/炸弹
7.  选择二张，散牌等于1，有对子比散牌大且非组成顺子的必要条件，提示散牌加对子中的一张，不拆三张、顺子/炸弹       *67的意思是留下一张大的单牌
8.  提示对子（接对子逻辑）
9.  选择二张，拆顺子，不拆飞机/炸弹
10. 选择二张，拆三张不拆/炸弹
11. 炸弹
12. 炸弹中的三张
*/
pdk_get_sandaiyi_sandaier_putOrder = function(type) {
    return [
        [type, pdk_allBuChaiType],
        [type, [pdk_allZhaDan, PDK_CARDTPYE.feiji]],
        [type, [pdk_allZhaDan]],
        [pdk_allZhaDan, []],
        [type, []],
    ];
}
pdk_putOrder[PDK_CARDTPYE.sandaiyi] = pdk_get_sandaiyi_sandaier_putOrder(PDK_CARDTPYE.sandaiyi);
pdk_putOrder[PDK_CARDTPYE.sandaier] = pdk_get_sandaiyi_sandaier_putOrder(PDK_CARDTPYE.sandaier);

// 三带一 带牌顺序
pdk_daiPaiOrder[PDK_CARDTPYE.sandaiyi] = [
    [PDK_CARDTPYE.danpai, pdk_allBuChaiType],
    [PDK_CARDTPYE.danpai, [pdk_allZhaDan, PDK_CARDTPYE.sanzhang, PDK_CARDTPYE.duizi, PDK_CARDTPYE.shunzi]],
    [PDK_CARDTPYE.danpai, [pdk_allZhaDan, PDK_CARDTPYE.sanzhang, PDK_CARDTPYE.duizi]],
    [PDK_CARDTPYE.danpai, [pdk_allZhaDan, PDK_CARDTPYE.sanzhang]],
    [PDK_CARDTPYE.danpai, [pdk_allZhaDan]],
];

/* 三带二 带牌顺序
5.  选择二张，散牌大于2，提示散牌
6.  选择二张，散牌等于1，有对子比散牌小且非组成顺子的必要条件，提示该对子，不拆三张、顺子/炸弹
7.  选择二张，散牌等于1，有对子比散牌大且非组成顺子的必要条件，提示散牌加对子中的一张，不拆三张、顺子/炸弹       *67的意思是留下一张大的单牌
8.  提示对子（接对子逻辑）
9.  选择二张，拆顺子，不拆飞机/炸弹
10. 选择二张，拆三张不拆/炸弹
*/
pdk_daiPaiOrder[PDK_CARDTPYE.sandaier] = [
    [PDK_CARDTPYE.danpai, [pdk_allBuChaiType]],
    [PDK_CARDTPYE.duizi, [pdk_allBuChaiType]],
    [PDK_CARDTPYE.danpai, [pdk_allZhaDan, PDK_CARDTPYE.sanzhang, PDK_CARDTPYE.shunzi]],
    [PDK_CARDTPYE.duizi, [pdk_allZhaDan, PDK_CARDTPYE.feiji, PDK_CARDTPYE.sanzhang, PDK_CARDTPYE.shunzi]],
    [PDK_CARDTPYE.duizi, [pdk_allZhaDan, PDK_CARDTPYE.feiji, PDK_CARDTPYE.sanzhang]],
    [PDK_CARDTPYE.duizi, [pdk_allZhaDan, PDK_CARDTPYE.feiji]],
    [PDK_CARDTPYE.duizi, [pdk_allZhaDan]],
    [PDK_CARDTPYE.danpai, [pdk_allZhaDan, PDK_CARDTPYE.feiji]],
    [PDK_CARDTPYE.danpai, [pdk_allZhaDan]],
];

/*接四带二
1.提示炸弹
2.四带二
优先选择最小炸弹
选择带的二张牌如下
当散牌大于等于2时，提示散牌
散牌为1，拆对子（留一张大的单牌）不拆炸弹不拆顺子 
无对子，拆顺子，优先提示顺子+散牌中最小的两张
无顺子，有三张，提示三张中的两张（拆三张）
*/
pdk_putOrder[PDK_CARDTPYE.sidaier] = [
    [pdk_allZhaDan, []],
    [PDK_CARDTPYE.sidaier, []],
];

// 四带二 带牌顺序
pdk_daiPaiOrder[PDK_CARDTPYE.sidaier] = [
    [PDK_CARDTPYE.danpai, [pdk_allBuChaiType]],
    [PDK_CARDTPYE.danpai, [pdk_allZhaDan, PDK_CARDTPYE.sanzhang, PDK_CARDTPYE.shunzi]],
    [PDK_CARDTPYE.danpai, [pdk_allZhaDan, PDK_CARDTPYE.sanzhang]],
    [PDK_CARDTPYE.danpai, [pdk_allZhaDan]],
];

/*接四带三
提示炸弹
四带三
优先选择最小炸弹
选择带的三张牌如下
当散牌大于等于三时，提示散牌
否，提示非组成顺子必要条件的散牌和对子中最小三张（保证关联顺子至少还有五张）
提示最小的三张牌
*/
pdk_putOrder[PDK_CARDTPYE.sidaisan] = [
    [pdk_allZhaDan, []],
    [PDK_CARDTPYE.sidaisan, []],
];

// 四带三 带牌顺序
pdk_daiPaiOrder[PDK_CARDTPYE.sidaisan] = [
    [PDK_CARDTPYE.danpai, [pdk_allBuChaiType]],
    [PDK_CARDTPYE.danpai, [pdk_allZhaDan, PDK_CARDTPYE.sanzhang, PDK_CARDTPYE.shunzi]],
    [PDK_CARDTPYE.danpai, [pdk_allZhaDan]],
    [PDK_CARDTPYE.danpai, []],
];

/*接飞机
优先不拆炸弹的飞机
提示炸弹
需要拆炸弹的飞机
*/
pdk_putOrder[PDK_CARDTPYE.feiji] = [
    [PDK_CARDTPYE.feiji, [pdk_allZhaDan]],
    [pdk_allZhaDan, []],
    [PDK_CARDTPYE.feiji, []],
];

/*飞机带牌逻辑
优先提示散牌
带二张
散牌为1，对子点数比散牌点数小且非组成顺子的必要条件，提示对子
否，提示散牌加一张最小的对子（先拆对子）
无对子，拆顺子
无顺子，有三张，提示三张中的两张（拆三张）

带三张或更多
提示非组成顺子必要条件的散牌和对子、三张中最小三张（保证关联顺子至少还有五张）
提示最小的三张张牌
*/
pdk_daiPaiOrder[PDK_CARDTPYE.feiji] = [
    [PDK_CARDTPYE.danpai, [pdk_allBuChaiType]],

    // 新增带对子的规则
    [PDK_CARDTPYE.duizi, [pdk_allBuChaiType]],
    [PDK_CARDTPYE.duizi, [pdk_allZhaDan, PDK_CARDTPYE.feiji, PDK_CARDTPYE.sanzhang, PDK_CARDTPYE.shunzi]],

    [PDK_CARDTPYE.danpai, [pdk_allZhaDan, PDK_CARDTPYE.sanzhang, PDK_CARDTPYE.shunzi]],
    [PDK_CARDTPYE.danpai, [pdk_allZhaDan, PDK_CARDTPYE.sanzhang]],
    [PDK_CARDTPYE.danpai, [pdk_allZhaDan]],
];


// 1 - 52  方块A:1 梅花A:2 红心A:3 黑桃A:4 -- 黑桃王:52
// 1.16张玩法为现有的没有大小王、只有一个2、三个A的玩法 一共48张
// 2.15张玩法：在16张的基础上，再去掉两个A（剩红桃A）、一个K（去掉黑桃K），一共45张
// 不选【首局先出黑桃三】时,随机发牌(包括黑桃三),首局随机先手（首局必定发黑桃三且先手）
PaodekuaiTY.prototype.randomCards = function(areaSelectMode, tData) {
    var cards = [];
    var handCardNum = 0 == areaSelectMode['cardNumIndex'] ? 16 : 15;
    this.handCount = handCardNum;   // GameCode runStartGame 发牌用到
    // 首出规则  
    // 1 :3人玩法有黑桃3首出,必须出3    
    // 2：3人玩法有黑桃3首出,可以不出3   
    // 3：2人玩法有黑桃3首出,必须出3  
    // 4 :2人玩法，随机先手，可以不出3
    var firstPutRuleNum = tData.areaSelectMode.firstPutRule;

    var allHandCardNum = handCardNum * tData.maxPlayer;
    // 没有大小王的 52 张牌
    for (var i = 1; i <= 52; i++) {
        cards.push(i);
    }

    // 去掉 方块2 梅花2 红心2
    cards.splice( cards.indexOf(this.cardCfg.fk[2]), 1 );
    cards.splice( cards.indexOf(this.cardCfg.mh[2]), 1 );
    cards.splice( cards.indexOf(this.cardCfg.hx[2]), 1 );

    // 去跳黑桃A
   cards.splice( cards.indexOf(this.cardCfg.ht[1]), 1 );

    // 15张玩法 
    if(15 == handCardNum){
        // 去掉 方块A 梅花A
        cards.splice( cards.indexOf(this.cardCfg.fk[1]), 1 );
        cards.splice( cards.indexOf(this.cardCfg.mh[1]), 1 );
        // 去掉 黑桃K
        cards.splice( cards.indexOf(this.cardCfg.ht[13]), 1 );
    }

    // 黑桃3 必须发到手上
    if(4 != firstPutRuleNum) {
        // 黑桃3先去掉, 确定人数后再放进牌堆， 保证黑桃3发到玩家手上, 拿黑桃3的先出
        cards.splice( cards.indexOf(this.cardCfg.ht[3]), 1 );
        // 洗牌
        // cards.sort(function (a, b) {
        //     return .5 - Math.random();
        // });
        cards = shuffleArray(cards);

        // 2人玩法 记录没 发出去的牌
        tData.otherCards = cards.slice(allHandCardNum - 1, cards.length);
        tData.otherCards.sort(this.cardValueCmp.bind(this))
        // 取得对应人数的牌数 - 1
        cards = cards.slice(0, allHandCardNum - 1);
        // 黑桃3放进洗牌堆
        cards.push(this.cardCfg.ht[3]);
        // 洗牌
        // cards.sort(function (a, b) {
        //     return .5 - Math.random();
        // });
        cards = shuffleArray(cards);

    // 黑桃3 可以不发到手上
    } else {
        // 洗牌
        cards = shuffleArray(cards);
        // cards.sort(function (a, b) {
        //     return .5 - Math.random();
        // });
        // 2人玩法 记录没 发出去的牌
        tData.otherCards = cards.slice(allHandCardNum, cards.length);
        tData.otherCards.sort(this.cardValueCmp.bind(this))

        // 取得对应人数的牌数 - 1
        cards = cards.slice(0, allHandCardNum);
    }

    if (areaSelectMode.havezhadan == false )
        this.noZhadan(cards, tData.maxPlayer, handCardNum)
    
    return cards;
};

/*拆掉发的牌里的炸弹。发牌时15张或者16张的发
*randCards:要发的牌组
*plycnt:玩家数量
*crdeNum:每个玩家发多少牌
*/
PaodekuaiTY.prototype.noZhadan = function(randCards, plycnt, crdeNum) {
    if (randCards.length != plycnt*crdeNum) return;

    var data = {}
    for (var p = 0; p < plycnt; p++)
    {
        for(var c = 0; c < crdeNum; c++)
        {
            var idx = p*crdeNum+c;
            var pt = this.calPoint(randCards[idx]);
            if (!data[p])data[p]={};
            if (!data[p][pt])data[p][pt]=[];
            data[p][pt].push(idx);//记录相同牌的索引
        }
    }

    for (var d in data)
    {
        var pd = data[d];
        for (var aa in pd)
        {
            var pdaa = pd[aa]
            if (pdaa.length >=4)//发现炸弹
            {
                for (var i = 1; i <=(plycnt-1); i++)//在其他两组牌里尝试交换
                {
                    var idd = (Number(d)+i)%plycnt;
                    var pdii = data[idd];
                    var bbreak = false;
                    for (var nn in pdii)
                    {
                        var pdnn = pdii[nn];
                        if (pdnn.length > 1)//相同张数必须大于1，不然有可能换了后，出现新的炸弹
                        {//交换
                            var scrpt = this.calPoint(randCards[pdaa[0]]);
                            var destpt = this.calPoint(randCards[pdnn[0]]);
                            //1,交换牌
                            var ttmmpp = randCards[pdnn[0]];
                            randCards[pdnn[0]] = randCards[pdaa[0]];
                            randCards[pdaa[0]] = ttmmpp;

                            //更新data数据
                            if(!pdii[scrpt])pdii[scrpt]=[];
                            pdii[scrpt].push(pdnn[0]);
                            pdnn.splice(0,1);
                            var b = true;
                            for (var qq in pd)
                            {
                                if (qq == destpt)
                                {
                                    pd[qq].push(pdaa[0]);
                                    pdaa.splice(0,1);
                                    b = false;
                                    break;
                                }
                            }
                            if (b) 
                            {
                                if(!pd[destpt])pd[destpt]=[];
                                pd[destpt].push(pdaa[0]);
                                pdaa.splice(0,1);
                            }

                            bbreak = true;
                            break;
                        }
                    }
                    if (bbreak) break;
                }
            }
        }
    }
}

/**
 * 计算牌点数
 * @param {number} num
 * @return {number}
 */
PaodekuaiTY.prototype.calPoint = function(num) {
    if (!num)
        return -1;
    
    var ceilNum = Math.ceil(num / 4);
    if (ceilNum == 1)
        return PDK_APOINT; // A记为14
    
    if (ceilNum == 2)
        return PDK_MAXPOINT; // 2记为16
    
    return ceilNum;
};


/**
 * 判断是否为3顺  : 555666 , 555666777
 * @param  {array} oCards 按点数排序好的皮
 * @return {boll} 
 */
PaodekuaiTY.prototype.isSanShun = function(oCards){
    if ( 0 != oCards.length % 3 ) 
        return false;

    for(var i in oCards){
        if(i==0) continue;

        var cardPoint1 = this.calPoint(oCards[i]);
        var cardPoint2 = this.calPoint(oCards[i-1]);

        if(0!=i && 0!=i%3 && cardPoint1!=cardPoint2 )
            return false;

        // 每第3张牌比第4张牌少1点, 否则不是3顺
        if(0!=i && 0==i%3 && (cardPoint1-cardPoint2)!=1 )
            return false;
    }

    return true;
}
// console.log( PaodekuaiTY.prototype.isSanShun([3,3,3]) );

/**
 * 获取所有3顺的组合
 * @param  {array} oCards 按点数排序好的牌
 * @return {array} 所有3顺的组合 和 散牌
 */
PaodekuaiTY.prototype.getSanShunAndSanPai = function(oCards, valueCompared){
    var countSanSame = 0;
    // 记录所有3张的数值
    var sanSameList = [];
    // 记录散牌
    var sanPaiList = [];

    var allCards = oCards.slice();

    // 排除比指定值小的牌
    var needCompare = (valueCompared && typeof(valueCompared) == "number");
    if (needCompare) {
        for (var i = 0; i < allCards.length;) {
            var value = this.calPoint(allCards[i]);
            if (value < valueCompared) {
                sanPaiList.push(allCards[i]);
                allCards.splice(i,1);
            } else 
                i++;
        }
    }

    for(var i in allCards){
        // 如 是第一张牌 或 重置搜索, 记录已搜索一张牌， 跳过牌值对比
        if(0 == i || 0 == countSanSame)  {
            countSanSame = 1;
            // 最后一张牌，放到散牌里
            if(i == (allCards.length - 1) ){
                sanPaiList.push( allCards[i] );
            }
            continue;
        }

        var cardPoint1 = this.calPoint(allCards[i]);
        var cardPoint2 = this.calPoint(allCards[i-1]);

        // 如果此牌 和 搜索的牌值相等, 搜索记录+1
        if(cardPoint1==cardPoint2){
            countSanSame++;

        }else{
            // 如 已搜索的牌 是散牌， 记录为散牌
            for(var j=1; j <= countSanSame; j++)
                sanPaiList.push( allCards[i-j] );
            
            // 此牌allCards[i] 继续和后面的牌对比, 所以记录此牌在搜索 
            countSanSame = 1;
            
        }

        // 如果3张 ，记录， 重置搜索  
        if(3 == countSanSame){
            for(var j=0; j < countSanSame; j++)
                sanSameList.push( allCards[i-j] );
            countSanSame = 0;

        // 如 最后一张牌没有3张
        }else if(i == (allCards.length - 1) ){
            for(var j=0; j < countSanSame; j++)
                sanPaiList.push( allCards[i-j] );
            countSanSame = 0;
        }
    }


    var tmpsanShun1 = [];
    var tmpsanShun2 = [];
    var handIndex = 0;
    sanSameList.sort(this.cardSortBigToSmall.bind(this));// 从大到小排序
    for(var i=0; i < sanSameList.length - 1; i++) {
        var pa = this.calPoint(sanSameList[i]);
        var pb = this.calPoint(sanSameList[i+1]);  

        // 如果不能组成三顺 或者 是数组最后一位， 计算记录 最大的 三顺
        if( pa - pb > 1 || (i + 1) == sanSameList.length - 1) 
        {
            if( (i + 1) == sanSameList.length - 1 ) {
                tmpsanShun2 = sanSameList.slice(handIndex, sanSameList.length);
            } else {
                tmpsanShun2 = sanSameList.slice(handIndex, i + 1);
                handIndex = i + 1;
            }
            if(tmpsanShun1.length < tmpsanShun2.length || this.calPoint(tmpsanShun1[0]) < this.calPoint(tmpsanShun2[0]) )
            {
                tmpsanShun1 = tmpsanShun2;
            }
        }
    }

    for(var i in tmpsanShun1) {
        var card = tmpsanShun1[i]
        sanSameList.splice(sanSameList.indexOf(card), 1);
    }
    sanPaiList = sanPaiList.concat(sanSameList);

    return [tmpsanShun1, sanPaiList];
}
// var handCards = [13,14,15,17,18,19,21,22,23,25,26,27,29,30,31,33];
// console.log( PaodekuaiTY.prototype.getSanShunAndSanPai(handCards) );


PaodekuaiTY.prototype.countDuiNum = function(oCards){
    var num = 0;
    var cardNumByValue = {};
    for(var i in oCards){
        var cardValue = this.calPoint(oCards[i]);
        if(!cardNumByValue[cardValue]){
            cardNumByValue[cardValue] = 1;  
        } else {
            cardNumByValue[cardValue]++;
            if(cardNumByValue[cardValue] % 2 == 0)
                num++;
        }
    }

    if(num == oCards.length/2){
        return num;
    }else{
        return 0;
    }
}

PaodekuaiTY.prototype.formatFeiJiType = function(oCards,areaSelectMode, valueCompared){
    // 记录所有3张的数值
    var sanSameList = [];
    // 记录散牌
    var sanPaiList = [];
    var sanShunAndSanPai = this.getSanShunAndSanPai(oCards, valueCompared);

    sanSameList = sanShunAndSanPai[0];
    sanPaiList = sanShunAndSanPai[1];

    var feijiInfo = {}
    feijiInfo.BU_SHI_FEI_JI = 0 // 飞机类型: 不是飞机
    feijiInfo.DAI_CHI_BANG = 1; // 飞机类型: 带翅膀
    feijiInfo.DAN_ZHANG_CHI_BANG = 2;// 飞机类型: 带单张的翅膀
    feijiInfo.NO_CHI_BANG = 3;  // 飞机类型: 不带翅膀
    feijiInfo.value = 0;    // 飞机的牌值
    feijiInfo.type = feijiInfo.BU_SHI_FEI_JI; // 飞机类型
    feijiInfo.sanPaiCards = [];
    feijiInfo.sanZhangCards = [];

    if(!oCards) return feijiInfo;

    // 将3张里的 最大数量的3顺 整理出来
    var maxCountShunIndex1 = 0;     // 最大数量的3顺 的数组下表始值
    var maxCountShunIndex2 = -3;    // 最大数量的3顺 的数组下表终值
    var countSanShun = 0;         // 3顺最大数量的
    var tempCountSanShun = 0;
    for(var i=0; i<sanSameList.length/3; i++){
        if(i==0){
            tempCountSanShun++;
            continue;
        }    
        
        var cardPoint1 = this.calPoint(sanSameList[i*3]);
        var cardPoint2 = this.calPoint(sanSameList[i*3-1]);
        var isLastCount = i==(sanSameList.length/3 - 1);    // 此3张是否为最后3张
        var isSanShun = (cardPoint1-cardPoint2) <= 1;       // 此3张和前3张是否为顺

        // 如果是 3顺， 顺数量+1
        if( isSanShun )   tempCountSanShun++;

        // 如果不是 3顺， 顺的数量 比 前面顺的数量多 (数量最大的顺作为 飞机)
        // 如果和前3张组成3顺， 且是最后的3张， 
        if(  (!isSanShun || isSanShun && isLastCount )
            && countSanShun <= tempCountSanShun){
            maxCountShunIndex2 = (i+1)*3 - 1;
            countSanShun = tempCountSanShun;
        }

    }
    maxCountShunIndex1 = maxCountShunIndex2 - countSanShun*3 + 1

    var sanShunList = []
    for(var i in sanSameList){
        if(i>=maxCountShunIndex1 && i<=maxCountShunIndex2){
            sanShunList.push(sanSameList[i]);
            
        }else{
            sanPaiList.push(sanSameList[i]);
        }
    }

    // 如果选了“炸弹不拆”，则包含炸弹的牌型不算飞机
    if (areaSelectMode && areaSelectMode.zhaDanBuChai)
    {
        // 包含四张同样的牌不算飞机
        for(var i=0; i < oCards.length; i++){
            var cardValue = this.calPoint(oCards[i]);
            var findCards = this.findNSameCard(oCards, cardValue, 4);
            if(findCards) return feijiInfo;
        }
    }


    if(0 == sanShunList.length) return feijiInfo;

    // 飞机带翅膀
    // var duiNum = this.countDuiNum(sanPaiList);
    // if(sanShunList.length/3 == duiNum) // 翅膀需要是对子  333-444555-6   333444-6789  
    if(feijiInfo.type == feijiInfo.BU_SHI_FEI_JI && sanShunList.length/3 >= sanPaiList.length/2 && oCards.length % 5 == 0) // 翅膀任意牌
    {
        var feijiNum = sanShunList.length;
        var chibangNum = sanPaiList.length
        if (feijiNum / 3 > chibangNum / 2) {
            var diffNum = (2*feijiNum - 3*chibangNum) / 5
            sanPaiList = sanPaiList.concat( sanShunList.slice(feijiNum-diffNum , feijiNum) );
            sanShunList = sanShunList.slice(0 , feijiNum-diffNum);
        }
        feijiInfo.type = feijiInfo.DAI_CHI_BANG;
    }

    // 带对应单张的飞机
    // 如果是 用3张作翅膀的牌型: 555666777888  333444555666777888999101010 
    if(feijiInfo.type == feijiInfo.BU_SHI_FEI_JI && 0 == sanShunList.length % 12 && 0 == sanPaiList.length)
        feijiInfo.type = feijiInfo.DAN_ZHANG_CHI_BANG;
    // 如果飞机和翅膀数量相等
    if(feijiInfo.type == feijiInfo.BU_SHI_FEI_JI && sanPaiList.length == sanShunList.length/3)
        feijiInfo.type = feijiInfo.DAN_ZHANG_CHI_BANG;

    // 不带翅膀 的飞机
    // if(sanShunList.length > 0 && sanPaiList.length == 0)
    if(feijiInfo.type == feijiInfo.BU_SHI_FEI_JI && sanShunList.length > 0 && sanPaiList.length <= sanShunList.length/3*2) // 任意翅膀数量的飞机
        feijiInfo.type = feijiInfo.NO_CHI_BANG;

    if(feijiInfo.type != feijiInfo.BU_SHI_FEI_JI){
        feijiInfo.value = sanShunList[sanShunList.length-1];
    }

    feijiInfo.sanPaiCards = sanPaiList;
    feijiInfo.sanZhangCards = sanShunList;
    // console.log('sanSameList', sanSameList.toString());
    // console.log('sanShunList', sanShunList.toString());
    // console.log('sanPaiList', sanPaiList.toString());
    return feijiInfo;
}

/**
 * 判断是否为飞机 
 * @param  {array} oCards 按点数排序好的牌
 * @return {num} 返回飞机的牌值， 不是飞机返回0 
 */
PaodekuaiTY.prototype.isFeiJi = function(oCards,areaSelectMode){
    var feijiInfo = this.formatFeiJiType(oCards,areaSelectMode);
    return feijiInfo.value;
}

/**
 * 判断是否是顺子
 * @param {array} oCards 按点数排好序的牌
 * @return {bool}
 */
PaodekuaiTY.prototype.isShun = function(oCards) {
    if (!oCards || oCards.length < 5)
        return false;
    
    var cardCount = oCards.length;
    var points = [];
    for (var i = 0; i < oCards.length; i++) {
        points.push(this.calPoint(oCards[i]));
    }

    for (var i = 0; i <= cardCount - 2; i ++) {
        if (points[i] != points[i + 1] - 1)
            return false;
    }

    return true;
};

PaodekuaiTY.prototype.isZhaDan = function(oCards, areaSelectMode) {
    if(!oCards || oCards.length ==0) return false;

    var cardType = this.calType(oCards, areaSelectMode);

    // 四炸
    if( cardType == PDK_CARDTPYE.sizha
        || cardType == PDK_CARDTPYE.sangeA 
        || cardType == PDK_CARDTPYE.sange3)
    {
        return true;
    } else {
        return false;
    }
}


PaodekuaiTY.prototype.isHadZhaDan = function(cards, areaSelectMode) {
    for(var i=0; i < cards.length; i++){
        var cardValue = this.calPoint(cards[i]);
        var isHadZhaDan = this.findNSameCard(cards, cardValue, 4);
        if(isHadZhaDan && cards.length > 4) return true;
    }

    // PDK_CARDTPYE.sangeA
    if( areaSelectMode.can3aZhaDan ) {
        var isSanA = this.findNSameCard(cards, PDK_APOINT, 3);
        if(isSanA && cards.length > 3) return true;
    }

    // PDK_CARDTPYE.sange3
    if( areaSelectMode.can3ge3ZhaDan ) {
        var isSan3 = this.findNSameCard(cards, PDK_MINPOINT, 3);
        if(isSan3 && cards.length > 3) return true;
    }

    return false;
}

//统计牌里有多少炸弹
PaodekuaiTY.prototype.ZhadanCount = function(cards, areaSelectMode) {
    if (!cards) return 0;
    var ZhaDanAry = [];
    for(var i=0; i < cards.length; i++){
        var cardValue = this.calPoint(cards[i]);
        var isHadZhaDan = this.findNSameCard(cards, cardValue, 4);
        if(isHadZhaDan && cards.length > 4 && ZhaDanAry.indexOf(cardValue) < 0)
        {
            ZhaDanAry.push(cardValue);
        }
    }

    // PDK_CARDTPYE.sangeA
    if( areaSelectMode.can3aZhaDan && ZhaDanAry.indexOf(PDK_APOINT) < 0) {
        var isSanA = this.findNSameCard(cards, PDK_APOINT, 3);
        if(isSanA && cards.length > 3) ZhaDanAry.push(PDK_APOINT);
    }

    // PDK_CARDTPYE.sange3
    if( areaSelectMode.can3ge3ZhaDan && ZhaDanAry.indexOf(PDK_MINPOINT) < 0 ) {
        var isSan3 = this.findNSameCard(cards, PDK_MINPOINT, 3);
        if(isSan3 && cards.length > 3) ZhaDanAry.push(PDK_MINPOINT);
    }

    return ZhaDanAry.length;
}


// 是否拆散了炸弹牌型
PaodekuaiTY.prototype.isChaiZhaDan = function(handCards, putCards, areaSelectMode){
     // 炸弹不可拆 但是可以 四带2 四代3 等四张一块出
    for(var i=0; i < putCards.length; i++){
        var cardValue = this.calPoint(putCards[i]);
        var findHand = this.findNSameCard(handCards, cardValue, 4);
        var findCards = this.findNSameCard(putCards, cardValue, 4);
        // putCards 有属于炸弹的牌， 而且 没有包含完整的炸弹牌型
        if(findHand && !findCards) {
            return true;
        }

        var isPutA = this.findNSameCard(putCards, PDK_APOINT, 1);
        if( areaSelectMode.can3aZhaDan && isPutA) {
            // 3A的炸弹
            var findHand3A = this.findNSameCard(handCards, PDK_APOINT, 3);
            var findCards3A = this.findNSameCard(putCards, PDK_APOINT, 3);
            // 如果拆了3个A
            if(findHand3A && !findCards3A) {
                return true;
            } 
        }
    }

    return false;
}

/**
 * 判断是否是连对
 * @param {array} oCards 按点数排好序的牌
 * @return {bool}
 */
PaodekuaiTY.prototype.isLiandui = function(oCards) { //oCards有序
    var cardNum = PDK_CARDCOUNT[PDK_CARDTPYE.liandui];// 连对最小牌数

    if (!oCards || oCards.length < cardNum || oCards.length % 2 != 0)
        return false;
    
    var cardCount = oCards.length;
    var points = [];
    for (var i = 0; i < oCards.length; i++) {
        points.push(this.calPoint(oCards[i]));
    }

    for (var i = 0; i < cardCount - 2; i += 2) {
        var abs = Math.abs(points[i] - points[i + 2]);
        if ( abs != 1 || (points[i + 1] != points[i]) ||  (points[i + 2] != points[i + 3]) )  return false;
    }

    return true;
};


/**
 * 计算牌型
 * @param {array} cards 按点数排好序的牌
 * @return {PDK_CARDTPYE} 牌型，-1 = 不成型
 */
PaodekuaiTY.prototype.calType = function(pCards, areaSelectMode) {
    if(!areaSelectMode) areaSelectMode = {};
    var maxSameCard = 0;
    var cards = pCards.slice();
    cards.sort(this.cardValueCmp.bind(this));
    var cardCount = cards.length;
    var allSame = this.calPoint(cards[0]) == this.calPoint(cards[cards.length - 1]);

    var pointCounts = {};
    for (var i = 0; i < cards.length; i++) {
        var p = this.calPoint(cards[i]);
        if (pointCounts[p]) {
            pointCounts[p]++;
        }
        else {
            pointCounts[p] = 1;
        }
    }
    var maxCount = 0; // 最多有几张点数最多的牌
    for (var p in pointCounts) {
        if (maxCount < pointCounts[p]) {
            maxCount = pointCounts[p];
            maxSameCard = p;
        }
    }

    // 三个A  和三顺牌型相似， 避免判断为三顺， 放到三顺前
    if (cardCount == PDK_CARDCOUNT[PDK_CARDTPYE.sangeA] && allSame && this.calPoint(cards[0]) == PDK_APOINT && areaSelectMode.can3aZhaDan)
        return PDK_CARDTPYE.sangeA;

    // 三个3算炸弹   带黑桃3不算炸弹
    if (cardCount == PDK_CARDCOUNT[PDK_CARDTPYE.sange3] && allSame && this.calPoint(cards[0]) == PDK_MINPOINT && cards.indexOf(this.cardCfg.ht[3]) < 0 && areaSelectMode.can3ge3ZhaDan)
        return PDK_CARDTPYE.sange3;

    // 飞机
    if(cardCount >= 6 && maxCount >= 3 && this.isFeiJi(cards,areaSelectMode)!=0 ){
        return PDK_CARDTPYE.feiji;
    }

    // 3顺
    // if(cardCount >= 3 && maxCount == 3 && this.isSanShun(cards)){
    //     return PDK_CARDTPYE.sanshun;
    // }

    // 顺子，5张起
    if (cardCount >= 5 && maxCount == 1 && this.isShun(cards))
        return PDK_CARDTPYE.shunzi;

    // 连对，2对起
    if (cardCount >= PDK_CARDCOUNT[PDK_CARDTPYE.liandui] && maxCount == 2 && this.isLiandui(cards))
        return PDK_CARDTPYE.liandui;

    // 四带三
    if (cardCount == 7 && maxCount == 4 )
        return PDK_CARDTPYE.sidaisan;

    //四带二
    if (cardCount == 6 && maxCount == 4 )
        return PDK_CARDTPYE.sidaier;

    //四炸
    if (cardCount == 4 && allSame)
        return PDK_CARDTPYE.sizha;

    // 三带二
    if (cardCount == PDK_CARDCOUNT[PDK_CARDTPYE.sandaier] && maxCount == 3 )
        return PDK_CARDTPYE.sandaier;

    //三带一
    if (cardCount == 4 && maxCount == 3 )
        return PDK_CARDTPYE.sandaiyi;

    // 三张
    if (cardCount == 3 && allSame)
        return PDK_CARDTPYE.sanzhang;

    // 对子
    if (cardCount == 2 && allSame)
        return PDK_CARDTPYE.duizi;

    // 单牌
    if (cardCount == 1)
        return PDK_CARDTPYE.danpai;

    return -1;
};

PaodekuaiTY.prototype.cardsType = function(cards, areaSelectMode) {
    return this.calType(cards, areaSelectMode)
}

/**
 * 计算牌型点数
 * @param {array} cards 按点数排好序的牌
 * @return {number}
 */
PaodekuaiTY.prototype.calCardsValue = function(cards, type, areaSelectMode) {

    if (!cards || cards.length == 0)
        return -1;
    
    if (!type)
        type = this.calType(cards, areaSelectMode);
    
    var lastCard = cards[cards.length - 1];
        
    if (type == PDK_CARDTPYE.sandaier)
        return this.calPoint(cards[2]);

    if (type == PDK_CARDTPYE.sandaiyi)
        return this.calPoint(cards[2]);
    
    if (type == PDK_CARDTPYE.sidaier)
        return this.calPoint(cards[3]);
        
    if (type == PDK_CARDTPYE.sidaisan)
        return this.calPoint(cards[3]);

    if (type == PDK_CARDTPYE.feiji)
        return   this.calPoint( this.isFeiJi(cards,areaSelectMode) );

    // 单牌，对子，三张，顺子，连对，四炸，三个A
    return this.calPoint(lastCard);
};

// 牌点比较函数
PaodekuaiTY.prototype.cardValueCmp = function(a, b) {
    var pa = this.calPoint(a);
    var pb = this.calPoint(b);
    if (pa == pb)
        return a - b;
    
    return pa - pb;
};

PaodekuaiTY.prototype.cardSortBigToSmall = function(a, b) {
    var pa = this.calPoint(a);
    var pb = this.calPoint(b);
    if (pa == pb)
        return b - a;
    
    return pb - pa;
}

/** 剔除癞子
 * @param {array} oCards [in] 
 * @param {array} cards [out] 剔除癞子后的按点数据序的牌
 * @return {number} 返回癞子数
 */
PaodekuaiTY.prototype.transformAndGetLaizi = function(oCards, cards) {
    var laizi = 0;
    for (var i = 0; i < oCards.length; i++) {
        if (oCards[i] == this.laiziCard)
            laizi ++;
        else
            cards.push(oCards[i]);
    }
    cards.sort(this.cardValueCmp.bind(this));
    return laizi;
};



/** 
 * 牌是否能压上
 * @param {array} oCards 按点数排好序的牌/选择了的手牌
 * @param {array} [oLastCards] 按点数排好序的牌/最后打出的牌
 * @param {number} [handsNum] 手牌数量
 */
PaodekuaiTY.prototype.canPut = function(oCards, oLastCards, handsNum, areaSelectMode) {

    var cardsType = this.calType(oCards, areaSelectMode);

    // cc.log("PaodekuaiTY.prototype.canPut oCards:", oCards );
    // cc.log("oLastCards" , oLastCards );
    // cc.log("handsNum" , handsNum );
    // cc.log("canPut cardsType", cardsType)
    // 如果客户端调用时 没有 传areaSelectMode

    if (cardsType == -1)
        return false;

    // 最后一手出不完整的飞机， 3带1 3张 检测
    var canPutLastType = false;
    var canPutAnyType = [];     // 最后一手同类牌比较
    if( (cardsType == PDK_CARDTPYE.sanzhang || cardsType == PDK_CARDTPYE.sandaiyi ) ){
        if( areaSelectMode.canPutAnySanZhang && oCards.length == handsNum && oLastCards) {
            canPutAnyType.push(PDK_CARDTPYE.sandaiyi);
            canPutAnyType.push(PDK_CARDTPYE.sandaier);
            canPutAnyType.push(PDK_CARDTPYE.sanzhang);
            canPutLastType = true;

        } else if ( oCards.length == handsNum && !oLastCards) {
            return true;
        } else {
            return false;
        }
    } 

    if( cardsType == PDK_CARDTPYE.feiji ) {
        var feijiInfo = this.formatFeiJiType(oCards,areaSelectMode);
        if(feijiInfo.type != feijiInfo.DAI_CHI_BANG){
            if( areaSelectMode.canPutAnyFeiji && oLastCards ) {
                canPutLastType = true;
                canPutAnyType.push(PDK_CARDTPYE.feiji);
            }else if ( oCards.length == handsNum && !oLastCards) {
                return true;
            } else {
                return false;
            }
        }
    }

    // 最后一手牌
    if( canPutLastType ){
        if (oCards.length == handsNum )
        {
            if (!oLastCards || oLastCards.length==0 || oLastCards=='undefined')
                return true;

            var lastCardsType = this.calType(oLastCards, areaSelectMode);
            if(canPutAnyType.indexOf(lastCardsType) >= 0 ) {
                var typeValue = this.calCardsValue(oCards, cardsType, areaSelectMode);
                var lastTypeValue = this.calCardsValue(oLastCards, lastCardsType, areaSelectMode);
                return typeValue > lastTypeValue;
            } else {
                return false;
            }

        } else {
            return false;
        }
    }

    // 没有上次打的牌，三家过自己再出牌
    if (!oLastCards || oLastCards.length==0 || oLastCards=='undefined')
        return true;

    if ((cardsType == PDK_CARDTPYE.shunzi || cardsType == PDK_CARDTPYE.liandui) && oCards.length != oLastCards.length)
        return false;

    oCards.sort(this.cardValueCmp.bind(this));
    oLastCards.sort(this.cardValueCmp.bind(this));

    var lastCardsType = this.calType(oLastCards, areaSelectMode);
    if (cardsType == lastCardsType && oCards.length == oLastCards.length) {
        var typeValue = this.calCardsValue(oCards, cardsType, areaSelectMode);
        var lastTypeValue = this.calCardsValue(oLastCards, lastCardsType, areaSelectMode);
        return typeValue > lastTypeValue;
    }
    else if(PDK_CARD_VALUE[cardsType]) {
        var last_card_value = PDK_CARD_VALUE[lastCardsType] || 0;
        return PDK_CARD_VALUE[cardsType] > last_card_value;
    }
    return false;
}; 

// 检查是否能出牌
/**
 * 检测是否能出牌
 * @param  {Array} oHands 手牌
 * @param  {Array} cards 提起的牌/选择了的牌
 * @param  {Array} lastCards 上次出的牌/打在桌面上的牌
 * @param  {object}  areaSelectMode 玩法选项 
 * @param  {bool}  isNextPlayerOneCard 下家是否为报单
 * @param  {bool}  isFirstRound 是否第一局
 * @return {Array} 返回可以出的牌
 */
PaodekuaiTY.prototype.checkPut = function(oHands, cards, lastCards, areaSelectMode, isNextPlayerOneCard, isFirstRound) {
    if(cards && typeof(cards)!='undefined' && cards.length == 0) return null;

    var hands = oHands.slice();
    for (var i = 0; i < cards.length; i++) {
        var p = hands.indexOf(cards[i]);
        if (p >= 0) {
            hands.splice(p, 1);
        }
        else {
            return null; // 手里没有这些牌
        }
    }
    
    if(!areaSelectMode && cc ) {
        areaSelectMode = MjClient.data.sData.tData.areaSelectMode;
    }

    // 第一局 黑桃三先出时 有黑桃三必须出
    isFirstRound = areaSelectMode.isPreRoundFirstRule? true : isFirstRound;
    if (isFirstRound && areaSelectMode && areaSelectMode.firstHeiTao3 && cards.indexOf(this.cardCfg.ht[3])<0 && oHands.indexOf(this.cardCfg.ht[3])>=0){
        return null;
    }




    var cardType = this.calType(cards, areaSelectMode);
    var pthis = this;

    // 炸弹不可拆 但是可以 四带2 四代3 等四张一块出
    if(areaSelectMode && areaSelectMode.zhaDanBuChai && this.isChaiZhaDan(oHands, cards, areaSelectMode) ){
        return null;
    }

    // 四带二
    if(cardType == PDK_CARDTPYE.sidaier && areaSelectMode && !areaSelectMode.can4dai2){
        return null
    }

    // 四带三
    if(cardType == PDK_CARDTPYE.sidaisan && areaSelectMode && !areaSelectMode.can4dai3){
        return null
    }

    // 如果 下家报单 提起的一张牌 不是最大的牌
    var sortHand = oHands.slice();
    sortHand.sort(this.cardValueCmp.bind(this));
    var maxCards = this.getAllMaxCard(oHands);
    if(isNextPlayerOneCard && cards.length==1 && this.calPoint(maxCards[0]) != this.calPoint(cards[0]) ){
        return null;
    }


    var sortCards = cards;
    var sortLastCards = lastCards;

    if (typeof(sortLastCards) == "number")
        sortLastCards = null;
    
    if (sortCards){
        sortCards = sortCards.slice();
        sortCards.sort(this.cardValueCmp.bind(this));
    }
    if (sortLastCards){
        sortLastCards = sortLastCards.slice(),
        sortLastCards.sort(this.cardValueCmp.bind(this));
    }

    if (this.canPut(sortCards, sortLastCards, oHands.length, areaSelectMode)) {
        return hands; // 能打得过上家的牌
    }
    return null;
};

PaodekuaiTY.prototype.getMaxDanPai = function(oCards) {
    var sortCards = oCards.slice();
    sortCards.sort(this.cardValueCmp.bind(this));
    return sortCards[sortCards.length -1];
}

/**
 * 对手牌排序
 * @param {array} 
 * @param {number} sortType 1 = 花色排序, 2 = 张数排序, 0 ==普通牌型
 */
PaodekuaiTY.prototype.sortHandCards = function(oCards, sortType) {
    var cards = oCards.slice();
    var commonCmp = this.cardValueCmp.bind(this);
    var cardValueCmp = this.cardValueCmp.bind(this);
    if (sortType == 1) { // 花色排序
        commonCmp = function (a, b) {
            var c1 = (a + 3) % 4;
            var c2 = (b + 3) % 4;
            if (c1 == c2)
                return cardValueCmp(a, b);
            else
                return c1 - c2;
        }
    }
    else if (sortType == 2) { // 张数排序
        var pointCounts = {};
        for (var i = 0; i < cards.length; i++) {
            var p = this.calPoint(cards[i]);
            if (pointCounts[p])
                pointCounts[p] ++;
            else
                pointCounts[p] = 1;
        }

        commonCmp = function (a, b) {
            var c1 = pointCounts[this.calPoint(a)];
            var c2 = pointCounts[this.calPoint(b)];
            if (c1 == c2)
                return cardValueCmp(a, b);
            else
                return c1 - c2;
        }
    }

    cards.sort(function(a, b) {
        return -commonCmp(a, b);
    });
    return cards;
};

/** 
 * 找N张点数一样的牌
 * @param {array} hands 按点数排好序的牌 
 * @param {number} points
 * @param {number}
 * @return {array}
 */
PaodekuaiTY.prototype.findNSameCard = function(hands, point, n) {
    var newh = hands.slice();
    newh.sort(this.cardValueCmp.bind(this));
    for (var i = 0; i < newh.length; i++) {
        if (this.calPoint(newh[i]) == point && this.calPoint(newh[i + n - 1]) == point)
            return newh.slice(i, i + n);
    }
    return null;
};

// 删除相应牌值
PaodekuaiTY.prototype.delPoint = function(hands, points){
    var arr = hands.slice();
    for(var i=0; i < points.length; i++){
        for (var j = 0; j < arr.length; j++) {
            if( this.calPoint(arr[j]) == points[i] ){
                arr.splice(j, 1);
                j--;
            }
        }
    }
    return arr;
}

/**
 * 列举集合里面 num 个元素的所有组合
 * @param  {array} parr 集合数组
 * @param  {number} num 元素个数
 * @return {array} nun个元素的所有组合
 */
PaodekuaiTY.prototype.lieju = function(parr, num){
    var tmps = [];

    var zhuhe = function(srcArr, eleNum, tagArr){
        if(eleNum == 0) return tagArr;
        var newZhuHe = [];

        if(!tagArr){
            tagArr = [];
            tagArr.push(srcArr[0]);
            newZhuHe.push(tagArr);
        }else{
            for(var i=0; i<tagArr.length; i++){
                for(var j=i; j<srcArr.length; j++){
                    newZhuHe.push( tagArr[i].concat( srcArr[j] ) );
                }
            }
        }

        var pSrcArr = srcArr.slice(1, srcArr.length);
        return zhuhe(pSrcArr, --eleNum, newZhuHe)
    }

    for(var i=0; i < parr.length-num+1; i++){
        var tmp = zhuhe(parr.slice(i, parr.length), num) ;
        tmps = tmps.concat(tmp);
    }

    return tmps;
}

PaodekuaiTY.prototype.formatCards = function(oCards) {
    var info = {};
    // key:牌值  value:数量  (10有3张）
    info.mValueToNum = {};
    // key:数量  value:牌值  (3张的牌有10, K, 4)
    info.mNumToValue = {};

    var cds = oCards.slice();
    cds.sort(this.cardValueCmp.bind(this));
    info.cds = cds;

    for(var i in cds){
        var value = this.calPoint(cds[i]);
        if( !info.mValueToNum[value] ) info.mValueToNum[value] = [];

        info.mValueToNum[value].push(cds[i]);
    }

    for(var i in cds){
        var value = this.calPoint(cds[i]);
        var num = info.mValueToNum[value].length;

        if( !info.mNumToValue[num] ) info.mNumToValue[num] = [];

        if( info.mNumToValue[num].indexOf(value) < 0 )
            info.mNumToValue[num].push(value);
    }

    return info;
}

PaodekuaiTY.prototype.indexOfCards = function(cardList, cards) {
    for(var i in cardList) {
        var tmpCards = cardList[i];
        if( this.isSameCards(tmpCards, cards) )
            return true;
    }
    return false;
}

PaodekuaiTY.prototype.isSameCards = function(cards1, cards2) {
    if(cards1.length != cards2.length) return false;

    var cds1 = cards1.slice();
    var cds2 = cards2.slice();
    cds1.sort(this.cardValueCmp.bind(this));
    cds2.sort(this.cardValueCmp.bind(this));

    for(var i in cds1){
        if(cds1[i] != cds2[i])
            return false;
    }

    return true;
}

PaodekuaiTY.prototype.findCardByRole = function(oCards, findNum, ignoreCardValued) {

    var cinfo = this.formatCards(oCards);
    var fCards = [];

    // 最小的两张单牌
    if(cinfo.mNumToValue[1] && cinfo.mNumToValue[1].length >= 2) {
        var ret = [];
        for(var i = 0; i < findNum; i++){
            var value = cinfo.mNumToValue[1][i];
            if( !ignoreCardValued || !ignoreCardValued[value] ) {
                var card = cinfo.mValueToNum[value][0];
                ret.push(card);
            }
        }

        if( ret.length == findNum && !this.indexOfCards(fCards, ret) ) 
            fCards.push( ret );
    }

    // 最小的一个对子
    if(cinfo.mNumToValue[2] && cinfo.mNumToValue[2].length >= 1) {
        var ret = [];
        var value = cinfo.mNumToValue[2][0];
        if( !ignoreCardValued || !ignoreCardValued[value] ) {
            var cards = cinfo.mValueToNum[value];
            ret = ret.concat(cards)
        }
        if( ret.length == findNum ) fCards.push( ret );
    }

    // 不拆3，4张的情况下，最小的两张牌
    var ret = [];
    for(var i in cinfo.cds) {
        var card = cinfo.cds[i];
        var value = this.calPoint(card);
        if( !ignoreCardValued || !ignoreCardValued[value] ) {
            var length = cinfo.mValueToNum[value].length;
            if( length <= 2 ) 
                ret.push(card);
        }

        if( ret.length == findNum ) {
            if( !this.indexOfCards(fCards, ret) ) fCards.push( ret );
            break;
        }
    }

    // 最小的两张牌
    var ret = [];
    for(var i in cinfo.cds) {
        var card = cinfo.cds[i];
        var value = this.calPoint(card);
        if( !ignoreCardValued || !ignoreCardValued[value] ) {
            ret.push(card);
        }

        if( ret.length == findNum ) {
            if( !this.indexOfCards(fCards, ret) ) fCards.push( ret );
            break;
        }
    }

    return fCards;
}

/** 
 * 用laizi张癞子去拼出type牌型的牌
 * @param {array} hands 按点数按好序的牌
 * @param {number} laizi 所使用的癞子数
 * @param {PDK_CARDTPYE} type 要拼出的牌型
 * @param {array} lastCards 最后一手牌
 * @param {array} 拼好的 
 */
PaodekuaiTY.prototype.findCardByType = function(hands, laizi, type, lastCards, buChaiTypes, areaSelectMode) {
    var rets = [];
    var laizis = [];
    var cardNum = typeof(lastCards)!='undefined' && lastCards ? lastCards.length : null;
    var cardCount = PDK_CARDCOUNT[type];

    if (cardNum && (type == PDK_CARDTPYE.liandui || type == PDK_CARDTPYE.shunzi))
        cardCount = cardNum;

    if (laizi > cardCount || laizi + hands.length < cardCount) {
        // 如果是用所有手牌压 飞机 或 三带二 , 牌数少于被压的牌
        if(type != PDK_CARDTPYE.feiji && type != PDK_CARDTPYE.sandaier)
            return rets;
    }

    for (var i = 0; i < laizi; i++) {
        laizis.push(this.laiziCard);
    }

    if (type == PDK_CARDTPYE.feiji && hands.length >= cardCount) {
        var bLastPuts = (lastCards && lastCards != -1 && lastCards.length > 0);

        if (bLastPuts) {
            var feijiInfo = this.formatFeiJiType(lastCards,areaSelectMode);
            var valueCompared = this.calPoint(feijiInfo.value);
            var handFeiji = this.getSanShunAndSanPai(hands,valueCompared);
        } else {
            var handFeiji = this.getSanShunAndSanPai(hands);
        }
        var handCardSanZhangNum = handFeiji[0].length/3;
        var handCardSanPaiNum = handFeiji[1].length;

        if (handCardSanZhangNum >= 2)
        {
            if (bLastPuts)
            {
                var lastCardSanZhangNum = feijiInfo.sanZhangCards.length/3;
                var lastCardSanPaiNum = feijiInfo.sanPaiCards.length;

                if(handCardSanZhangNum >= lastCardSanZhangNum){
                    var sanShun = [];
                    var sanpai = [];
                    for(var i=0; i<handCardSanZhangNum; i++){
                        var startSanIndex = i*3;
                        var lastSanIndex = i*3+lastCardSanZhangNum*3;
                        sanShun = handFeiji[0].slice(startSanIndex, lastSanIndex)
                        if(sanShun.length != feijiInfo.sanZhangCards.length) continue;
                        var feiJiValue_a = this.formatFeiJiType(handFeiji[0],areaSelectMode,valueCompared).value;
                        var feiJiValue_b = feijiInfo.value;
                        if(feiJiValue_a < feiJiValue_b) continue;
                        sanpai = handFeiji[0].slice(0, startSanIndex);
                        sanpai = sanpai.concat(handFeiji[0].slice(lastSanIndex, handFeiji[0].length));//-lastSanIndex));
                        sanpai = sanpai.concat(handFeiji[1]);
                        var allSanPaiZhuHe = [];
                        if (this.useNewTip) {
                            allSanPaiZhuHe = this.findDaiPai(sanpai, PDK_CARDTPYE.feiji, lastCardSanPaiNum, false, buChaiTypes);
                        } else {
                            for(var j=0; j < sanpai.length && sanpai.length >= j+lastCardSanPaiNum; j++) {  // 依次散牌组合
                                var cards = sanpai.slice(j, j+lastCardSanPaiNum);
                                allSanPaiZhuHe.push(cards);
                            }
                        }
                        if (allSanPaiZhuHe.length > 0) {
                            for(var j in allSanPaiZhuHe){
                                var ret = sanShun.concat( allSanPaiZhuHe[j] );
                                if(this.isFeiJi(ret,areaSelectMode) != 0){
                                    rets.push(ret);
                                }
                            }
                        }
                        else // 如果飞机是最后一手， 可以打出
                        {
                            var ret = sanShun.concat(sanpai)
                            rets.push(ret);
                        }
                    }
                }
            }
            else
            {
                // 先手

                // var lastCardSanZhangNum = 0;
                // var lastCardSanPaiNum = 0;
                // for(var k = handCardSanZhangNum; k >= 2; k--)
                // {
                //     lastCardSanZhangNum = k;

                //     for(var m = lastCardSanZhangNum; m >= 0; m--)
                //     {
                //         lastCardSanPaiNum = Math.min(handCardSanPaiNum,m*2);

                //         if(handCardSanZhangNum >= lastCardSanZhangNum)
                //         {
                //             var sanShun = [];
                //             var sanpai = [];

                //             for(var i=0; i<handCardSanZhangNum; i++)
                //             {
                //                 var startSanIndex = i*3;
                //                 var lastSanIndex = i*3+lastCardSanZhangNum*3;

                //                 sanShun = handFeiji[0].slice(startSanIndex, lastSanIndex)
                //                 sanpai = handFeiji[0].slice(0, startSanIndex);
                //                 sanpai = sanpai.concat(handFeiji[0].slice(lastSanIndex, handFeiji[1].length-lastSanIndex));
                //                 sanpai = sanpai.concat(handFeiji[1]);

                //                 var allSanPaiZhuHe = [];

                //                 if (this.useNewTip) 
                //                 {
                //                     allSanPaiZhuHe = this.findDaiPai(sanpai, PDK_CARDTPYE.feiji, lastCardSanPaiNum, false, buChaiTypes);
                //                 } 
                //                 else 
                //                 {
                //                     for(var j=0; j < sanpai.length && sanpai.length >= j+lastCardSanPaiNum; j++) 
                //                     {  
                //                         // 依次散牌组合
                //                         var cards = sanpai.slice(j, j+lastCardSanPaiNum);
                //                         allSanPaiZhuHe.push(cards);
                //                     }
                //                 }

                //                 if (allSanPaiZhuHe.length > 0) 
                //                 {
                //                     for(var j in allSanPaiZhuHe)
                //                     {
                //                         var ret = sanShun.concat( allSanPaiZhuHe[j] );

                //                         ret.sort(this.cardValueCmp.bind(this));

                //                         if(this.isFeiJi(ret,areaSelectMode) != 0)
                //                         {
                //                             rets.push(ret);
                //                         }
                //                     }
                //                 }
                //                 else // 如果飞机是最后一手， 可以打出
                //                 {
                //                     var ret = sanShun.concat(sanpai)
                //                     rets.push(ret);
                //                 }
                //             }
                //         }
                //     }
                // }
            }
        }

    }else if (type == PDK_CARDTPYE.sangeA) {
        if (laizi == 0)
        {
            var find = this.findNSameCard(hands, PDK_APOINT, 3);
            if (find)
                rets.push(find);
        }
    }
    else if (type == PDK_CARDTPYE.sange3) {
        if (laizi == 0)
        {
            var newHands = hands.slice();
            var idxht3 = newHands.indexOf(this.cardCfg.ht[3]);
            if (idxht3 >= 0)newHands.splice(idxht3, 1);
            var find = this.findNSameCard(newHands, PDK_MINPOINT, 3);
            if (find)   rets.push(find);
        }
    }
    else if (type == PDK_CARDTPYE.sizha  || type == PDK_CARDTPYE.duizi || type == PDK_CARDTPYE.sanzhang) { 
        for (var i = PDK_MINPOINT; i <= PDK_MAXPOINT; i++) {
            var find = this.findNSameCard(hands, i, cardCount - laizi);
            if (find) {
                rets.push(laizis.concat(find));
            }
        }
    }
    else if (type == PDK_CARDTPYE.liandui) {
        for (var i = PDK_MINPOINT; i <= PDK_APOINT - cardCount/2 + 1; i++) // 连对首张
        {
            var ldCount = 0;
            var ret = laizis.slice();
            for (var j = 0; j < cardCount/2; j++) 
            {
                var p = i + j;
                for (var k = 0; k < hands.length - 1; k++) 
                {
                    var point1 = this.calPoint(hands[k]);
                    var point2 = this.calPoint(hands[k + 1]);
                    if (point1 != p || point2 != p)
                        continue;

                    ldCount += 2;
                    ret.push(hands[k]);
                    ret.push(hands[k + 1]);
                    break;
                }
            }
            if (ldCount + laizi == cardCount) {
                rets.push(ret);
            }
        }
    }
    else if (type == PDK_CARDTPYE.sandaier) {
        for (var aLaizi = 0; aLaizi <= laizi; aLaizi++) 
        {
            for (var i = PDK_MINPOINT; i <= PDK_MAXPOINT; i++) 
            {
                var temp1 = this.findNSameCard(hands, i, 3 - aLaizi);
                if (!temp1)
                    continue;

                if(1 - (laizi - aLaizi) <= 0) 
                {
                    rets.push(laizis.concat(temp1));
                    continue;
                }

                var newHands = this.delPoint(hands, [i]);
                
                if (this.useNewTip) {
                    var findCards = this.findDaiPai(newHands, type, 2, false, buChaiTypes);
                    for (var j in findCards) {
                        var ret = laizis.concat(temp1);
                        ret = ret.concat(findCards[j]);
                        if (!this.indexOfCards(rets, ret)) 
                            rets.push(ret);
                    }
                }
                else {
                    for(var j=1; j < newHands.length; j++)
                    {
                        var ret = laizis.concat(temp1);
                        ret.push(newHands[j-1]);
                        ret.push(newHands[j]);
                        if( !this.indexOfCards(rets, ret) ) 
                            rets.push(ret); 
                    }
                }

                // 如果是有3张， 但手牌数量不够组成3带二，可以用3带1 或 3张打
                if(rets.length == 0) {
                    rets.push(hands);
                }

            }
        }
    }
    else if (type == PDK_CARDTPYE.sandaiyi) {
        for (var aLaizi = 0; aLaizi <= laizi; aLaizi++) 
        {
            for (var i = PDK_MINPOINT; i <= PDK_MAXPOINT; i++) 
            {
                var temp1 = this.findNSameCard(hands, i, 3 - aLaizi);
                if (!temp1)
                    continue;

                if(1 - (laizi - aLaizi) <= 0) 
                {
                    rets.push(laizis.concat(temp1));
                    continue;
                }

                var newHands = this.delPoint(hands, [i]);
                if (this.useNewTip) {
                    var findCards = this.findDaiPai(newHands, type, 1, false, buChaiTypes);
                    for (var j in findCards) {
                        var ret = laizis.concat(temp1);
                        ret = ret.concat(findCards[j]);
                        rets.push(ret);
                    }
                }
                else {
                    for(var j=0; j < newHands.length; j++)
                    {
                        var ret = laizis.concat(temp1);
                        ret.push(newHands[j]);
                        rets.push(ret); 
                    }
                }

                // 如果是有3张， 但手牌数量不够组成3带一，可以3张打
                if(rets.length == 0) {
                    rets.push(hands);
                }

            }
        }
    }
    else if (type == PDK_CARDTPYE.shunzi) {
        for (var i = PDK_MINPOINT; i <= PDK_APOINT - cardCount + 1; i++) { // 顺子首张
            var shun = laizis.slice();

            for (var j = 0; j < cardCount; j++) {
                var p = i + j;
                var find = this.findNSameCard(hands, p, 1);
                if( (p-1)==PDK_KPOINT )  // 如果上张牌是K ,需要考虑计算A
                    find = this.findNSameCard(hands, PDK_APOINT, 1);

                if (find)
                    shun = shun.concat(find);
            }
            if (shun.length == cardCount)
                rets.push(shun);
        }
    }
    else if (type == PDK_CARDTPYE.danpai) {
        if (laizis.length == 1) {
            rets.push(laizis.slice());
        }
        else {
            var handsCopy = hands.slice();
            handsCopy.sort(this.cardValueCmp.bind(this));

            for (var i = PDK_MINPOINT; i <= PDK_MAXPOINT; i++) 
            {
                // cc.log("findCardByType hands " + hands + " i = " + i);

                // 效率太低，废弃
                // var find = this.findNSameCard(hands, i, 1);
                // if (find)
                //     rets.push(find);

                for (var j = 0; j < handsCopy.length; j++) {
                    if (this.calPoint(handsCopy[j]) == i) {
                        rets.push([handsCopy[j]]);
                        break;
                    }
                }
            }
        }
    }
    else if (type == PDK_CARDTPYE.sidaier){
        for (var i = PDK_MINPOINT; i <= PDK_MAXPOINT; i++)
        {
            var find = this.findNSameCard(hands, i, 4);
            if(!find)
                continue;

            var newHands = this.delPoint(hands, [i]);
            if (this.useNewTip) {
                var findCards = this.findDaiPai(newHands, type, 2, false, buChaiTypes);
                for (var j in findCards) {
                    var ret = laizis.concat(find);
                    ret = ret.concat(findCards[j]);
                    rets.push(ret);
                }
            } else {
                for(var j=1; j < newHands.length; j++)
                {
                    var ret = laizis.concat(find);
                    ret.push(newHands[j-1]);
                    ret.push(newHands[j]);
                    rets.push(ret); 
                }
            }
        }
    }
    else if (type == PDK_CARDTPYE.sidaisan){
        for (var i = PDK_MINPOINT; i <= PDK_MAXPOINT; i++)
        {
            var find = this.findNSameCard(hands, i, 4);
            if(!find)
                continue;

            var newHands = this.delPoint(hands, [i]);
            if (this.useNewTip) {
                var findCards = this.findDaiPai(newHands, type, 3, false, buChaiTypes);
                for (var j in findCards) {
                    var ret = laizis.concat(find);
                    ret = ret.concat(findCards[j]);
                    rets.push(ret);
                }
            } else {
                for(var j=2; j < newHands.length; j++)
                {
                    var ret = laizis.concat(find);
                    ret.push(newHands[j-1]);
                    ret.push(newHands[j-2]);
                    ret.push(newHands[j]);
                    rets.push(ret); 
                }
            }
        }
    }
    else if(type == PDK_CARDTPYE.sanshun)
    {
        for (var i = PDK_MINPOINT; i <= PDK_MAXPOINT - cardCount/3 + 1; i++) // 连对首张
        {
            var ldCount = 0;
            var ret = laizis.slice();
            for (var j = 0; j < cardCount/3; j++) 
            {
                var p = i + j;
                for (var k = 0; k < hands.length - 1; k++) 
                {
                    var point1;
                    var point2;
                    var point3;
                    // if(p == 1 || p == 2) {
                    //     point1 = this.calPoint(hands[k],true);
                    //     point2 = this.calPoint(hands[k + 1],true);
                    //     point3 = this.calPoint(hands[k + 2],true);
    
                    // } else {
                        point1 = this.calPoint(hands[k]);
                        point2 = this.calPoint(hands[k + 1]);
                        point3 = this.calPoint(hands[k + 2]);
                    // } 
                    
                    if (point1 != p || point2 != p|| point3 != p)
                        continue;

                    ldCount += 3;
                    ret.push(hands[k]);
                    ret.push(hands[k + 1]);
                    ret.push(hands[k + 2]);
                    break;
                }
            }
            if (ldCount + laizi == cardCount) {
                rets.push(ret);
            }
        }
    }

    // 如果是最后一手牌， 可以接张数不一样类型相同的牌
    // 适用于 飞机牌型 和 三张牌型
    // 例如 3带2 可用 3带1 或 3张接
    if(cardNum >= hands.length && rets.length == 0) {
        rets.push(hands);
    }

    return rets;
};

PaodekuaiTY.prototype.getAllMaxCard = function(oCards){
    var sortHands = oCards.slice();
    sortHands.sort(this.cardValueCmp.bind(this));
    var maxCard = sortHands[sortHands.length - 1];

    var rets = []
    for(var i in sortHands){
        var ret = []
        if(this.calPoint(maxCard) == this.calPoint(sortHands[i])){
            ret.push(sortHands[i]);
            rets.push(ret);
        }
    }

    return rets;
}

// 对牌型进行排序  目前指准对 炸弹接 3带2 的牌型
PaodekuaiTY.prototype.sortByCardType = function(cardsList, areaSelectMode) {
    var cards = cardsList.slice();

    var sfun = function(a, b) {
        var aType = this.calType(a, areaSelectMode);
        var bType = this.calType(b, areaSelectMode);
        var aValue = this.calCardsValue(a, aType, areaSelectMode);
        var bValue = this.calCardsValue(b, bType, areaSelectMode);

        if(aType == bType) {
            return aValue - bValue;
        }

        if(aType != bType) {
            // 3带儿优先
            if(aValue != bValue) {
                return bType - aType;
            }

            // 炸弹优先
            if(aValue == bValue) {
                if(aType == PDK_CARDTPYE.sizha) return -1;
                if(aType != PDK_CARDTPYE.sizha) return 1;
            }
        }
    }

    cards.sort(sfun.bind(this))
    return cards;
}

PaodekuaiTY.prototype.findDaiPai = function(oCards, type, findNum, same, buChaiTypes) {
    var ret = [];
    var daiPaiOrder = pdk_daiPaiOrder[type];
    if (!daiPaiOrder || findNum <= 0)
        return ret;

    daiPaiOrder = daiPaiOrder.slice();
    if (same) {
        for (var i = daiPaiOrder.length - 1; i >= 0; i--) {
            if (daiPaiOrder[i][0] == PDK_CARDTPYE.danpai)
                daiPaiOrder.splice(i, 1);
        }
    }

    var isHaveCards = function(rets, cards) {
        for (var i = 0; i < rets.length; i++) {
            var j = 0;
            for (; j < cards.length; j++) {
                if (rets[i].indexOf(cards[j]) < 0)
                    break;
            }
            if (j == cards.length)
                return true;
        }
        return false;
    }

    // for (var index = 0; index < daiPaiOrder.length; index ++) {
    //     var cards = this.findPutTipCards(oCards, [], {}, false, false, [daiPaiOrder[index]], buChaiTypes);

    //     var temp = [];
    //     for (var i = 0; i < cards.length; i++) {
    //         // 6.   选择二张，散牌等于1，有对子比散牌小且非组成顺子的必要条件，提示该对子，不拆三张、顺子/炸弹
    //         // 7.   选择二张，散牌等于1，有对子比散牌大且非组成顺子的必要条件，提示散牌加对子中的一张，不拆三张、顺子/炸弹       *67的意思是留下一张大的单牌
    //         if (cards[i].length == findNum && !(ret.length == 0 && temp.length != 0 && this.calPoint(cards[i][0]) > this.calPoint(temp[temp.length - 1]))) {
    //             if (!isHaveCards(ret, cards[i]))
    //                 ret.push(cards[i]);
    //         } else {
    //             temp = temp.concat(cards[i]);
    //             var subTemp = [];
    //             while (temp.length >= findNum) {
    //                 subTemp = temp.slice(0, findNum);
    //                 if (!isHaveCards(ret, subTemp))
    //                     ret.push(subTemp);
    //                 temp.shift();
    //                 break;
    //             }
    //         }
    //     }

    //     if (temp.length > 0 && !isHaveCards(ret, temp)) {
    //         var allCards = cards.slice();
    //         allCards.push(oCards);
    //         for (var i = 0; i < allCards.length; i++) {
    //             for (var j = 0; j < allCards[i].length; j++) {
    //                 if (temp.indexOf(allCards[i][j]) >= 0)
    //                     continue;

    //                 temp.push(allCards[i][j]);
    //                 if (temp.length >= findNum) {
    //                     ret.push(temp.slice(0, findNum));
    //                     temp.length = 0;
    //                     break;
    //                 }
    //             }
    //             if (temp.length == 0)
    //                 break;
    //         }
    //     }
    // }

    var cards = this.findPutTipCards(oCards, [], {}, false, false, daiPaiOrder, buChaiTypes);

    var temp = [];
    for (var i = 0; i < cards.length; i++) {
        // 6.   选择二张，散牌等于1，有对子比散牌小且非组成顺子的必要条件，提示该对子，不拆三张、顺子/炸弹
        // 7.   选择二张，散牌等于1，有对子比散牌大且非组成顺子的必要条件，提示散牌加对子中的一张，不拆三张、顺子/炸弹       *67的意思是留下一张大的单牌
        if (cards[i].length == findNum && !(ret.length == 0 && temp.length != 0 && this.calPoint(cards[i][0]) > this.calPoint(temp[temp.length - 1]))) {
            if (!isHaveCards(ret, cards[i]))
                ret.push(cards[i]);
        } else {
            temp = temp.concat(cards[i]);
            var subTemp = [];
            while (temp.length >= findNum) {
                subTemp = temp.slice(0, findNum);
                if (!isHaveCards(ret, subTemp))
                    ret.push(subTemp);
                temp.shift();
                break;
            }
        }
    }

    if (temp.length > 0 && !isHaveCards(ret, temp)) {
        var allCards = cards.slice();
        allCards.push(oCards);
        for (var i = 0; i < allCards.length; i++) {
            for (var j = 0; j < allCards[i].length; j++) {
                if (temp.indexOf(allCards[i][j]) >= 0)
                    continue;

                temp.push(allCards[i][j]);
                if (temp.length >= findNum) {
                    ret.push(temp.slice(0, findNum));
                    temp.length = 0;
                    break;
                }
            }
            if (temp.length == 0)
                break;
        }
    }

    return ret;
}

// 此函数只供提示出牌调用
PaodekuaiTY.prototype.findCardByType_fast = function(hands, laizi, type, lastCards, buChaiTypes, areaSelectMode) {
    if (!this.findCardByTypeCache)
        this.findCardByTypeCache = [];
    
    var argumentsStr = JSON.stringify(arguments);
    for (var i = 0; i < this.findCardByTypeCache.length; i ++) {
        if (this.findCardByTypeCache[i].argumentsStr == argumentsStr)
            return JSON.parse(this.findCardByTypeCache[i].retValueStr);
    }
    
    var retValue = this.findCardByType(hands, laizi, type, lastCards, buChaiTypes, areaSelectMode);
    this.findCardByTypeCache.push({argumentsStr: argumentsStr, retValueStr: JSON.stringify(retValue)});
    return retValue;
}

PaodekuaiTY.prototype.initCanPutTypes = function(hands, includeCard, areaSelectMode) {
    if (!this.canPutTypesCache)
        this.canPutTypesCache = [];
    
    var argumentsStr = JSON.stringify(arguments);
    for (var i = 0; i < this.canPutTypesCache.length; i ++) {
        if (this.canPutTypesCache[i].argumentsStr == argumentsStr)
            return JSON.parse(this.canPutTypesCache[i].retValueStr);
    }

    var info = this.formatCards(hands);
    info.mValueToCards = info.mValueToNum;
    var tempHands = hands.slice();
    if (includeCard > 0)
        tempHands.splice(tempHands.indexOf(includeCard), 1);

    var getNumFunc = function(hands, value, type, thxCards, sameNum, haveNum) {
        if (haveNum < sameNum)
            return 0;

        var cards = this.findCardByType_fast(hands, 0, type, null, null, areaSelectMode);
        var num = 0;
        for (var i = 0; i < cards.length; i++) {
            for (var j = 0; j < cards[i].length; j++) {
                if (this.calPoint(cards[i][j]) != value)
                    continue;

                var newHands = hands.slice();
                for (var k = 0; k < cards[i].length; k++) {
                    newHands.splice(newHands.indexOf(cards[i][k]), 1);
                }
                var ret = getNumFunc(newHands, value, type, thxCards, sameNum, haveNum - sameNum);
                if (num < ret + sameNum)
                    num = ret + sameNum;
                break;
            }
        }

        if (PDK_CARDTPYE.sztonghua && PDK_CARDTPYE.sztonghua == type) {
            for (var i = 0; i < cards.length; i++) {
                for (var j = 0; j < cards[i].length; j++) {
                    if (thxCards.indexOf(cards[i][j]) < 0)
                        thxCards.push(cards[i][j]);
                }
            }
        }

        return num;
    }.bind(this);

    var valueToCanTypes = {};
    var thxCards = [];
    for (var value in info.mValueToCards) {
        value = Number(value);
        valueToCanTypes[value] = [];
    }

    for (var index = 0; index < pdk_allBuChaiType.length; index++) {
        var type = pdk_allBuChaiType[index];
        if (!type)
            continue;

        var cards = this.findCardByType_fast(tempHands, 0, type, null, null, areaSelectMode);
        if (cards.length <= 0 || this.calType(cards[0], areaSelectMode) != type)
            continue;

        var allValues = [];
        for (var i = 0; i < cards.length; i++) {
            for (var j = 0; j < cards[i].length; j++) {
                var value = this.calPoint(cards[i][j])
                allValues[value] = 1;
            }
        }

        var sameNum = 1;
        var point = this.calPoint(cards[0][0]);
        for (var i = 1; i < cards[0].length; i ++) {
            if (this.calPoint(cards[0][i]) == point)
                sameNum ++;
        }

        for (var value in allValues) {
            if (info.mValueToCards[value] >= sameNum*2)
                valueToCanTypes[value][type] = getNumFunc(tempHands, value, type, thxCards, sameNum, info.mValueToCards[value]);
            else    
                valueToCanTypes[value][type] = sameNum;
        }
    }

    info.mValueToCanTypes = valueToCanTypes;
    info.thxCards = thxCards;

    this.canPutTypesCache.push({argumentsStr: argumentsStr, retValueStr: JSON.stringify(info)});

    return info;
}
/**
 * 提示可出的牌
 * @param  {array} oHands 我的手牌
 * @param  {array} oLastCards 上家出的牌
 * @param  {array} areaSelectMode 创建房间的选项
 * @param  {Boolean} isNextPlayerOneCard 下家是否报单
 * @param  {Boolean} isFirstRound 是否第一局
 * @param  {array} [putOrder] 提示优先级规则
 * @return {array} 提示的牌
 */
PaodekuaiTY.prototype.findPutTipCards = function(hands, lastCards, areaSelectMode, isNextPlayerOneCard, isFirstRound, putOrder, allBuChaiTypes) {
   
    var getTypesName = function(types) {
        var ret = "null";
        for (var i = 0; i < types.length; i++) {
            for (var key in PDK_CARDTPYE) {
                if (PDK_CARDTPYE[key] == types[i])
                    ret = ret == "null" ? key : ret + "|" + key;
            }
        }
        return ret;
    }

    //cc.log("hands=" + JSON.stringify(hands) + " lastCards=" + JSON.stringify(lastCards));

    var startTime = new Date().getTime();
    hands = hands.slice();
    hands.sort(this.cardValueCmp.bind(this));

    var rets = [];
    var lastType = 0;
    if (!lastCards || lastCards == -1)
        lastCards = [];
    
    //  红桃/黑桃3先手提示
    var includeCard = -1;
    if (this.isMustPutCard3(hands, areaSelectMode, isFirstRound)) {
        lastType = 99;
        includeCard = this.cardCfg.firstOutCard;
    } else if (lastCards.length > 0) {
        lastType = this.calType(lastCards, areaSelectMode);
    }
    if (!putOrder)
        putOrder = pdk_putOrder[lastType];
    if (!putOrder)
        return rets;

    putOrder = putOrder.slice();

    var info = this.initCanPutTypes(hands, includeCard, areaSelectMode);

    // info.mValueToCards = info.mValueToNum = key:牌值  value:[具体的牌...]
    // info.mNumToValue = key:数量  value:[牌值...]
    // info.mValueToCanTypes = key:牌值 value:[牌型1: 占用数量], ...]
    // info.thxCards = [所有同花顺具体的牌...]

    // cc.log("每一牌值可组成的牌型：" + function() {
    //     var ret = "";
    //     for (var value in info.mValueToCanTypes) {
    //         var canTypes = info.mValueToCanTypes[value];
    //         ret += value + ":[";
    //         for (var type in canTypes) {
    //             ret += getTypesName([type]) + ":" + canTypes[type] + ",";
    //         }
    //         ret += "], ";
    //     }
    //     return ret;
    // }());

    var getBuChaiTypes = function(buChaiTypes, allBuChaiTypes) {
        buChaiTypes = buChaiTypes.slice();
        // 不拆牌型中可能还包函数组（为了好配置）
        for (var j = 0; j < buChaiTypes.length; j ++) {
            if (buChaiTypes[j] && typeof(buChaiTypes[j]) !== "number") {
                buChaiTypes = buChaiTypes.concat(buChaiTypes[j]);
                buChaiTypes.splice(j, 1);
                j --;
            }
        }
        if (allBuChaiTypes) {
            for (var j = 0; j < allBuChaiTypes.length; j ++) {
                if (buChaiTypes.indexOf(allBuChaiTypes[j]) < 0)
                    buChaiTypes.push(allBuChaiTypes[j]);
            }
        }
        return buChaiTypes;
    }

    // 排除不满足不拆牌型后剩下的牌值-数量对
    var getCanPutValueNums = function(type, buChaiTypes) {
        var canPutValueNums = [];
        for (var value in info.mValueToCards) {
            value = Number(value);
            var canUseNum = info.mValueToCards[value].length; // 不拆牌后的数量
            var canTypes = info.mValueToCanTypes[value].slice();

            if (canTypes[type]) {
                canTypes[type] = 0;
            }
            if (pdk_cardTypeSub[type]) {
                for (var i = 0; i < pdk_cardTypeSub[type].length; i++) {
                    if (canTypes[pdk_cardTypeSub[type][i]])
                        canTypes[pdk_cardTypeSub[type][i]] = 0;
                }
            }

            for (var i in canTypes) {
                i = Number(i);
                if (!canTypes[i] || buChaiTypes.indexOf(i) < 0)
                    continue;

                canUseNum -= canTypes[i];
            }

            if (canUseNum > 0) {
                canPutValueNums[value] = canUseNum;
            }
        }
        return canPutValueNums;
    }

    var isHaveCards = function(rets, cards) {
        var cardsStr = cards.slice().sort().toString();
        for (var i = 0; i < rets.length; i++) {
            if (rets[i].slice().sort().toString() == cardsStr)
                return true;
        }
        return false;
    }

    var replaceThxCard = function(info, cards) {
        var thxCards = info.thxCards;
        for (var i = 0; i < cards.length; i ++) {
            for (var j = 0; j < cards[i].length; j ++) {
                if (thxCards.indexOf(cards[i][j]) < 0)
                    continue;
                
                var v = this.calPoint(cards[i][j]);
                if (!info.mValueToCards[v])
                    continue;
                
                for (var k = 0; k < info.mValueToCards[v].length; k++) {
                    if (thxCards.indexOf(info.mValueToCards[v][k]) >= 0 || cards[i].indexOf(info.mValueToCards[v][k]) >= 0)
                        continue;

                    cards[i][j] = info.mValueToCards[v][k];
                    break;
                }
            }
        }
        return cards;
    }.bind(this);

    var replaceIncludeCard = function(includeCard, cards) {
        for (var i = cards.length - 1; i >= 0; i--) {
            if (cards[i].indexOf(includeCard) >= 0) 
                continue;
            
            var includeValue = this.calPoint(includeCard);
            for (var j = cards[i].length - 1; j >= 0; j--) {
                if (this.calPoint(cards[i][j]) == includeValue) {
                    cards[i][j] = includeCard;
                    break;
                }
            }

            if (cards[i].indexOf(includeCard) >= 0)
                continue;

            cards.splice(i, 1);
        }
        return cards;
    }.bind(this);

    var isTypeValid = function(type,putOrder)
    {
        if (!type || !putOrder)
            return true;
        
        for (var order = 0; order < putOrder.length; order++) {
            var typeArray = typeof(putOrder[order][0]) === "number" ? [putOrder[order][0]] : putOrder[order][0];
            for (var typeIndex = 0; typeIndex < typeArray.length; typeIndex++) {
                if (type == typeArray[typeIndex])
                    return true;
            }
        }

        return false;
    }

    var originalPutOrder = pdk_putOrder[lastType];
    if (lastType != 99 && lastType != 0 && !originalPutOrder) {
        originalPutOrder = [
            [lastType, []],
            [pdk_allZhaDan, []],
        ];
    }
    for (var order = 0; order < putOrder.length; order++) {
        var typeArray = typeof(putOrder[order][0]) === "number" ? [putOrder[order][0]] : putOrder[order][0];
        for (var typeIndex = 0; typeIndex < typeArray.length; typeIndex++) {
            if (!typeArray[typeIndex])
                continue;

            var type = typeArray[typeIndex];

            // 检查type有效性，避免无效且费力的查找
            if (lastType != 99 && lastType != 0 && !isTypeValid(type,originalPutOrder))
                continue;
            
            if (allBuChaiTypes && allBuChaiTypes.indexOf(type) >= 0)
                continue;

            var buChaiTypes = getBuChaiTypes(putOrder[order][1], allBuChaiTypes);
            var canPutValueNums = getCanPutValueNums(type, buChaiTypes); // 排除不满足不拆牌型后剩下的牌值-数量对

            //cc.log("第" + order + "优先级出:" + getTypesName([type]) + " canPutValueNums=" + JSON.stringify(canPutValueNums) + " buChaiTypes=" + getTypesName(buChaiTypes));

            var cards = this.findCardByType_fast(hands, 0, type, lastCards, buChaiTypes, areaSelectMode);
            
            // 下家报单强制出最大
            if (isNextPlayerOneCard && type == PDK_CARDTPYE.danpai) {
                cards = this.getAllMaxCard(hands);
            }

            // 顺子、连对、同花顺尝试更多数量的牌
            if (lastCards.length <= 0 && cards.length > 0 && (type == PDK_CARDTPYE.shunzi || type == PDK_CARDTPYE.liandui || (PDK_CARDTPYE.sztonghua && type == PDK_CARDTPYE.sztonghua))) {
                var addNum = type == PDK_CARDTPYE.shunzi || type == PDK_CARDTPYE.sztonghua ? 1 : 2;
                for (var i = cards[0].length + addNum; true; i += addNum) {
                    var tempCards = this.findCardByType_fast(hands, 0, type, new Array(i), null, areaSelectMode);
                    if (tempCards.length > 0 && tempCards[0].length == i)
                        cards = tempCards.concat(cards);
                    else
                        break;
                }
            }

            // 如果不必要，尽量不出同花顺的牌
            if (PDK_CARDTPYE.sztonghua && PDK_CARDTPYE.sztonghua != type && info.thxCards.length > 0) {
                cards = replaceThxCard(info, cards);
            }

            // 必须包函指定牌
            if (includeCard > 0) {
                cards = replaceIncludeCard(includeCard, cards);
            }

            for (var i = 0; i < cards.length; i++) {
                var exist = true;
                var nums = canPutValueNums.slice();
                for (var j = 0; j < cards[i].length; j++) {
                    var value = this.calPoint(cards[i][j]);
                    if (!nums[value]) {
                        exist = false;
                        break;
                    }
                    nums[value] --;
                }

                // 如果只有一个单牌2，则放到后面提示。
                if (putOrder[order][2] && putOrder[order][2].buchuOnly2 && 
                    cards[i].length == 1 && this.calPoint(cards[i][0]) == PDK_MAXPOINT)
                    continue;
                
                if (!exist || isHaveCards(rets, cards[i]))
                    continue;

                if (this.canPut(cards[i], lastCards, hands.length, areaSelectMode))
                    rets.push(cards[i]);
            }
        }
    }

    if (!allBuChaiTypes) {
        //cc.log("智能提示用时：" + (new Date().getTime() - startTime) + "ms");
        //cc.log("rets=" + JSON.stringify(rets));
    }

    if (!allBuChaiTypes)
        this.findCardByTypeCache = [];

    return rets;
}

/**
 * 是否首手必须先出红桃/黑桃3
 * @param  {array} oHands 我的手牌
 * @param  {object} areaSelectMode 创建房间的选项
 * @param  {Boolean} isFirstRound 是否第一局
 * @return {Boolean} 
 */
PaodekuaiTY.prototype.isMustPutCard3 = function(oHands, areaSelectMode, isFirstRound) {
    isFirstRound = areaSelectMode.isPreRoundFirstRule? true : isFirstRound;
    return (isFirstRound && (areaSelectMode && areaSelectMode.firstHeiTao3)) && oHands.indexOf(this.cardCfg.firstOutCard)>=0;
}

/**
 * 提示可出的牌
 * @param  {array} oHands 我的手牌
 * @param  {array} oLastCards 上家出的牌
 * @param  {Boolean} areaSelectMode 创建房间的选项
 * @param  {Boolean} isNextPlayerOneCard 下家是否报单
 * @param  {Boolean} isFirstRound 是否第一局
 * @param  {Boolean} isSmartTip   是否使用智能提示
 * @return {array} 提示的牌
 */
PaodekuaiTY.prototype.tipCards = function(oHands, oLastCards, areaSelectMode, isNextPlayerOneCard, isFirstRound, isSmartTip) {
    if(isSmartTip) {
        this.canPutTypesCache = [];

        this.useNewTip = true;
        var ret = this.findPutTipCards(oHands, oLastCards, areaSelectMode, isNextPlayerOneCard, isFirstRound);
        this.useNewTip = false;

        if (ret.length > 0) return ret;
    }
        
    // cc.log("----------------tipCards", oLastCards)
    //  第一个局 当勾“先出黑桃三”选项时，提示出黑桃三
    if (this.isMustPutCard3(oHands, areaSelectMode, isFirstRound)) {
           return [[this.cardCfg.ht[3]]]
    }

    // 第一个出牌时
    var isFirstPlayerPut = (!oLastCards || oLastCards == -1 || oLastCards.length == 0);
    if(isFirstPlayerPut)
    {
        var sortHands = oHands.slice();
        sortHands.sort(this.cardValueCmp.bind(this));
        return [[sortHands[sortHands.length - 1]]];
    }
    
    var hands = [];
    var handLaizi = this.transformAndGetLaizi(oHands, hands);
    var lastCardsType = this.calType(oLastCards, areaSelectMode);
    var rets = [];

    for (var laizi = 0; laizi <= handLaizi; laizi++) {
        if(lastCardsType ==  PDK_CARDTPYE.sizha) break;
        if(lastCardsType ==  PDK_CARDTPYE.sangeA) break;
        if(lastCardsType ==  PDK_CARDTPYE.sange3) break;
        
        var sameTypeCards = this.findCardByType(hands, laizi, lastCardsType, oLastCards, null, areaSelectMode);
        for (var i = 0; i < sameTypeCards.length; i++) {

            // 炸弹不可拆 但是可以 四带2 四代3 等四张一块出
            if( areaSelectMode && areaSelectMode.zhaDanBuChai && this.isChaiZhaDan(oHands, sameTypeCards[i], areaSelectMode) ){
                continue;
            }

            if (this.canPut(sameTypeCards[i], oLastCards, oHands.length, areaSelectMode)) {
                rets.push(sameTypeCards[i]);
            }
        }
    }

    //  下家报单强制出最大
    if(isNextPlayerOneCard){
        // 如果上家出牌且是一张，  才使用报单提示
        if(rets.length>0 && oLastCards && oLastCards.length <= 1 ){
            rets = this.getAllMaxCard(oHands);
        // 如果上家没有出牌， 使用报单提示
        }else if(rets.length>0 && !oLastCards || oLastCards == -1 ){
            rets = this.getAllMaxCard(oHands);
        }
    }

    if (areaSelectMode.can3ge3ZhaDan) {
        var cardtypes = this.findCardByType(hands, 0, PDK_CARDTPYE.sange3, null, null, areaSelectMode);
        for (var i = 0; i < cardtypes.length; i++) {
            if (this.canPut(cardtypes[i], oLastCards, oHands.length, areaSelectMode)) {
                rets.push(cardtypes[i]);
            }
        }
    }

    var booms = this.findCardByType(hands, 0, PDK_CARDTPYE.sizha, null, null, areaSelectMode);
    // 不是压三带二的时候， 最后提示炸弹
    for (var i = 0; i < booms.length; i++) {
        if (this.canPut(booms[i], oLastCards, oHands.length, areaSelectMode)) {
            rets.push(booms[i]);
        }
    }

    // 压三带二的时候， 先提示炸弹 , 对提示的牌型进行排序
    if(lastCardsType == PDK_CARDTPYE.sandaier) {
        rets = this.sortByCardType(rets, areaSelectMode);
    }

    if(areaSelectMode.can3aZhaDan){
        rets = rets.concat(this.findCardByType(hands, 0, PDK_CARDTPYE.sangeA, null, null, areaSelectMode) );
    }
    return rets;
};

/**
 * 提示可出的牌，是否相同牌型，相同牌值
 * @param  {array} tipscardsArray 我的手牌
 */
PaodekuaiTY.prototype.IsSametipCards = function(tipscardsArray, areaSelectMode)
{
    if (tipscardsArray.length <= 0)return false;
    var cardType = this.calType(tipscardsArray[0], areaSelectMode);
    var cardNum = tipscardsArray[0].length;
    var cardpoint = this.calCardsValue(tipscardsArray[0], cardType, areaSelectMode)
    for(var i = 0; i < tipscardsArray.length; i++)
    {
        var tmp_cardType = this.calType(tipscardsArray[i],areaSelectMode);
        var tmp_cardNum = tipscardsArray[i].length;
        var tmp_cardpoint = this.calCardsValue(tipscardsArray[i], cardType, areaSelectMode)
        if (tmp_cardType != cardType || tmp_cardNum != cardNum || tmp_cardpoint != cardpoint )
            return false;
    }
    return true;
};

/**
 * 如果是有效牌型，剔除带牌
 * @param  {array} Cards 牌组
 * @param  {Boolean} areaSelectMode 创建房间的选项
 */
PaodekuaiTY.prototype.delDaipai = function(Cards, areaSelectMode)
{
    var cardtype = this.calType(Cards, areaSelectMode);

    if (cardtype == PDK_CARDTPYE.sanshun ||
        cardtype == PDK_CARDTPYE.sangeA ||
        cardtype == PDK_CARDTPYE.sange3 ||
        cardtype == PDK_CARDTPYE.sizha ||
        cardtype == PDK_CARDTPYE.liandui ||
        cardtype == PDK_CARDTPYE.shunzi ||
        cardtype == PDK_CARDTPYE.sanzhang ||
        cardtype == PDK_CARDTPYE.duizi ||
        cardtype == PDK_CARDTPYE.danpai)
        return Cards;

    var point = this.calCardsValue(Cards, cardtype, areaSelectMode)
    if( cardtype == PDK_CARDTPYE.sandaier||
        cardtype == PDK_CARDTPYE.sandaiyi)
        Cards = this.findNSameCard(Cards, point, 3);
    else if(cardtype == PDK_CARDTPYE.sidaisan||
            cardtype == PDK_CARDTPYE.sidaier)
        Cards = this.findNSameCard(Cards, point, 4);
    else if(cardtype == PDK_CARDTPYE.feiji)
    {
        var feiji  = this.formatFeiJiType(Cards,areaSelectMode);
        Cards = feiji.sanZhangCards;
    }

    return Cards;
}

if(typeof(module)!="undefined" && module.exports)    
    module.exports = PaodekuaiTY;

if(typeof(MjClient)!="undefined")
    MjClient.majiang_PaodekuaiTY = new PaodekuaiTY();

/*
PaodekuaiTY.prototype.shuffleArray_paodekuai = function(arr, playcnt) {
    if (arr.length < 3 || playcnt <= 0) return; //切牌要求牌堆必须大于3张
    function rnd(n, m){
        var random = Math.floor(Math.random()*(m-n+1)+n);
        return random;
    }

    // for (var i = 0; i < arr.length; i++) {
    //     var randIndex = i + Math.floor(Math.random() * (arr.length - i));
    //     var temp = arr[i];
    //     arr[i] = arr[randIndex];
    //     arr[randIndex] = temp;
    // }

    var qiePaiCnt = 10;//切牌次数
    var chaPaiCnt = 5;//插牌次数

    //切牌
    var beginIndex = Math.ceil(arr.length/3);
    for (var i = 0; i < qiePaiCnt; i++)
    {   
        var rndcnt = rnd(0,3);
        var realb = beginIndex + rndcnt;
        var tmp = arr.slice(realb, beginIndex*2-rndcnt);
        arr.splice(realb, beginIndex-rndcnt*2);
        arr = arr.concat(tmp);            
    }

    //插牌
    beginIndex = Math.ceil(arr.length/2);
    for (var i = 0 ;i < chaPaiCnt; i++)
    {
        var tmp1 = arr.slice(0, beginIndex);
        arr.splice(0, beginIndex);
        var tmp2 = arr.slice();
        arr.splice(0, arr.length);
        var l1 = 0;
        var l2 = 0;
        for(; l1 < tmp1.length && l2 < tmp2.length;)
        {
            var rndcnt1 = rnd(1,3);
            for (var c = 0; c < rndcnt1 && (l1) < tmp1.length; c++)
            {
                arr.push(tmp1[l1]);
                l1++;
            }

            var rndcnt2 = rnd(1,3);
            for (var c = 0; c < rndcnt2 && (l2) < tmp2.length; c++)
            {
                arr.push(tmp2[l2]);
                l2++;
            }
        }
        tmp1.splice(0, l1);
        tmp2.splice(0, l2);    
        if (tmp1.length > 0) arr = arr.concat(tmp1);
        if (tmp2.length > 0) arr = arr.concat(tmp2);        
    }

    //发牌
    var plyarr = [];
    for (var i = 0; i < arr.length; i++)
    {
        var idx = i % playcnt;
        if (!plyarr[idx])plyarr[idx]=[];
        
        plyarr[idx].push(arr[i]);
    }
    arr.splice(0, arr.length);
    for(var i = 0; i < plyarr.length; i++)
        arr = arr.concat(plyarr[i]); 

    return arr;
};
*/
PaodekuaiTY.prototype.shuffleArray = function(arr) {
    for (var i = 0; i < arr.length; i++) {
        var randIndex = i + Math.floor(Math.random() * (arr.length - i));
        var temp = arr[i];
        arr[i] = arr[randIndex];
        arr[randIndex] = temp;
    }
    for (var i = 0; i < arr.length; i++) {
        var randIndex = i + Math.floor(Math.random() * (arr.length - i));
        var temp = arr[i];
        arr[i] = arr[randIndex];
        arr[randIndex] = temp;
    }
    return arr;
};

PaodekuaiTY.prototype.randomCards__test = function(areaSelectMode, tData, bnew) {
    var cards = [];
    var handCardNum = 0 == areaSelectMode['cardNumIndex'] ? 16 : 15;
    this.handCount = handCardNum;   // GameCode runStartGame 发牌用到
    // 首出规则  
    // 1 :3人玩法有黑桃3首出,必须出3    
    // 2：3人玩法有黑桃3首出,可以不出3   
    // 3：2人玩法有黑桃3首出,必须出3  
    // 4 :2人玩法，随机先手，可以不出3
    var firstPutRuleNum = tData.areaSelectMode.firstPutRule;
    var allHandCardNum = handCardNum * tData.maxPlayer;
    // 没有大小王的 52 张牌
    for (var i = 1; i <= 52; i++) {
        cards.push(i);
    }

    // 去掉 方块2 梅花2 红心2
    cards.splice( cards.indexOf(this.cardCfg.fk[2]), 1 );
    cards.splice( cards.indexOf(this.cardCfg.mh[2]), 1 );
    cards.splice( cards.indexOf(this.cardCfg.hx[2]), 1 );

    // 去跳黑桃A
   cards.splice( cards.indexOf(this.cardCfg.ht[1]), 1 );

    // 15张玩法 
    if(15 == handCardNum){
        // 去掉 方块A 梅花A
        cards.splice( cards.indexOf(this.cardCfg.fk[1]), 1 );
        cards.splice( cards.indexOf(this.cardCfg.mh[1]), 1 );
        // 去掉 黑桃K
        cards.splice( cards.indexOf(this.cardCfg.ht[13]), 1 );
    }

    // 黑桃3 必须发到手上
    if(4 != firstPutRuleNum) {
        // 黑桃3先去掉, 确定人数后再放进牌堆， 保证黑桃3发到玩家手上, 拿黑桃3的先出
        cards.splice( cards.indexOf(this.cardCfg.ht[3]), 1 );
        cards = bnew? this.shuffleArray_paodekuai(cards, areaSelectMode.maxPlayer):this.shuffleArray(cards);

        // 2人玩法 记录没 发出去的牌
        tData.otherCards = cards.slice(allHandCardNum - 1, cards.length);
        tData.otherCards.sort(this.cardValueCmp.bind(this))
        // 取得对应人数的牌数 - 1
        cards = cards.slice(0, allHandCardNum - 1);
        // 黑桃3放进洗牌堆
        cards.push(this.cardCfg.ht[3]);
        cards = bnew? this.shuffleArray_paodekuai(cards, areaSelectMode.maxPlayer):this.shuffleArray(cards);

    // 黑桃3 可以不发到手上
    } else {
        // 洗牌
        // if (bnew)
        // {
        //     cards = this.shuffleArray_paodekuai(cards, areaSelectMode.maxPlayer);
        // }
        // else{
        //     cards.sort(function (a, b) {
        //         return .5 - Math.random();
        //     });
        // }
        cards = shuffleArray(cards);
        // 2人玩法 记录没 发出去的牌
        tData.otherCards = cards.slice(allHandCardNum, cards.length);
        tData.otherCards.sort(this.cardValueCmp.bind(this))

        // 取得对应人数的牌数 - 1
        cards = cards.slice(0, allHandCardNum);
    }
    if (areaSelectMode.havezhadan == false )
    this.noZhadan(cards, tData.maxPlayer, handCardNum)


    return cards;
};

PaodekuaiTY.prototype.doF = function(areaSelectMode, tData, bnew)
{
    var shuuffleCnt = 1000;
    var shuffleType = bnew? "=========NewShuffle": ( areaSelectMode.firstPutRule!=4? "=========OldShuffle,haotao3" : "=========OldShuffle" )
    console.log(shuffleType, "ShuffleCnt", shuuffleCnt)

    var sizha = 0;
    var sanshun = 0;
    var laindui = 0;
    var shunzi = 0;
    for (var i = 0; i < shuuffleCnt; i++)
    {
        var mjhand = this.randomCards__test(areaSelectMode, tData, bnew);
        cardNext=0;
        var plyarr = [];
        for (var n =0; n < areaSelectMode.maxPlayer; n++)
        {
            if (!plyarr[n])plyarr[n]=[];
            for (var j = 0; j < this.handCount; j++) {
                var newCard = mjhand[cardNext++];
                plyarr[n].push(newCard);
            }
        }

        for(var m = 0; m < plyarr.length; m++)
        {
            sizha += this.findCardByType(plyarr[m], 0, PDK_CARDTPYE.sizha, [1,1,1,1], null, areaSelectMode).length;
            sanshun += this.findCardByType(plyarr[m], 0, PDK_CARDTPYE.sanshun, [1,1,1,1,1,1], null, areaSelectMode).length;
            laindui += this.findCardByType(plyarr[m], 0, PDK_CARDTPYE.liandui, [1,1,1,1], null, areaSelectMode).length;
            shunzi += this.findCardByType(plyarr[m], 0, PDK_CARDTPYE.shunzi, [1,1,1,1,1], null, areaSelectMode).length;
        }
    }

    console.log("sizha:", sizha)
    console.log("sanshun:", sanshun)
    console.log("laindui:", laindui)
    console.log("shunzi:", shunzi)
}

PaodekuaiTY.prototype.checkshuffleArray = function(areaSelectMode, tData)
{
    areaSelectMode.firstPutRule = 2;
    this.doF(areaSelectMode, tData, false);
    // areaSelectMode.firstPutRule = 4;
    // this.doF(areaSelectMode, tData, false);
    // this.doF(areaSelectMode, tData, true);
}


})();