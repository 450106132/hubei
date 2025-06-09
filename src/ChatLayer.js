/**
 * Created by sking on 2017/4/8.
 */

(function() {

    var CHAT_TYPE_INPUT = 0;
    var CHAT_TYPE_DEFULT = 1;
    var CHAT_TYPE_EMOJI = 2;
    var playerChatLayer = null;
    var input = null;

    function emojiAction(num) {
        var key = "Fangjiannei_Duihua_Biaoqing_Fasongbiaoqing";
        if(MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || 
            MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ ||
            MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ ||
            MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP)
        {
            key = "Fangjiannei_Duihua_Biaoqing";
        }
		MjClient.native.umengEvent4CountWithProperty(key, {uid: SelfUid()});
        MJChat(SelfUid(), CHAT_TYPE_EMOJI, "", num);
        if(playerChatLayer)
        {
            playerChatLayer.removeFromParent(true);
            playerChatLayer = null;
        }
    }

    function ItemsBind(node, num) {

        var bind = {
            _click: function() {
				MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Duihua_wenziyuyin", {uid: SelfUid()});
                MJChat(SelfUid(), CHAT_TYPE_DEFULT, {text:node.getChildByName("text").getString(), voiceType:getCurrentVoiceType()}, num);
                if(playerChatLayer)
                {
                    playerChatLayer.removeFromParent(true);
                    playerChatLayer = null;
                }
            },
            text: {
                _run: function() {
                    this.ignoreContentAdaptWithSize(true);
                    if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP ||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
                        MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ ||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ ||
                        MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ )  this.setFontSize(24)
                    // 游戏独立的聊天语， 在 PlayerGamePanel 实现 getCahtText 来获取 wuyh
                    if (cc.sys.isObjectValid(MjClient.playui) && MjClient.playui.__proto__.getCahtText) {
                        var text = MjClient.playui.getCahtText(num);
                        // cc.log('ChatLayer getCahtText', num, text);
                        this.setString(text);
                        return;
                    }

                    

                    var _isPuTong = (getCurrentVoiceType() == 0) ;//0 是普通话
                    cc.log(num + "= num=============_isPuTong = " + _isPuTong);

                    if (MjClient.getAppType() == MjClient.APP_TYPE.QXTHMJ)
                    {

                        var pl = MjClient.data.pinfo;
                        cc.log(" === chat === pl ：" + JSON.stringify(pl))

                        if (pl && pl.sex == 1) { //男孩
                            switch (num) {
                                case 0:
                                    this.setString("大家大业还差这点小钱 ！");
                                    break;
                                case 1:
                                    this.setString("哈哈，没了吧！");
                                    break;
                                case 2:
                                    this.setString("朋友，看你打牌可真费劲！");
                                    break;
                                case 3:
                                    this.setString("时间就是金钱我的朋友");
                                    break;
                                case 4:
                                    this.setString("小树不修不直溜，人不修理哏赳赳");
                                    break;
                                case 5:
                                    this.setString("你是哪个单位的，出牌这么慢");
                                    break;
                                case 6:
                                    this.setString("眼瞅都下班了，你快点呗 ！");
                                    break;
                                case 7:
                                    this.setString("这牌打得真精彩。");
                                    break;
                                case 8:
                                    this.setString("宁千刀万剐，不胡第一把 ！");
                                    break;
                                case 9:
                                    this.setString("你沙楞的，我们还是朋友！");
                                    break;
                                default:
                                    break;
                            }
                        } else {
                            switch (num) {
                                case 0:
                                    this.setString("大家大业还差这点小钱 ！");
                                    break;
                                case 1:
                                    this.setString("哈哈，没了吧！");
                                    break;
                                case 2:
                                    this.setString("朋友，看你打牌可真费劲！");
                                    break;
                                case 3:
                                    this.setString("时间就是金钱我的朋友！");
                                    break;
                                case 4:
                                    this.setString("小树不修不直溜，人不修理哏赳赳！");
                                    break;
                                case 5:
                                    this.setString("快点吧，牌在你手上都下仔了！");
                                    break;
                                case 6:
                                    this.setString("你要耽误人家约会啦！");
                                    break;
                                case 7:
                                    this.setString("喂，你还在不在？");
                                    break;
                                case 8:
                                    this.setString("哟 跑得挺快啊！");
                                    break;
                                case 9:
                                    this.setString("哈哈，真爽，太过瘾啦！");
                                    break;
                                default:
                                    break;
                            }
                        }
                    }
                    else if (isJinZhongAPPType()
                            || MjClient.getAppType() == MjClient.APP_TYPE.AYGUIZHOUMJ
                            || MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP
                            || MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ)
                    {
                        // 麻将语音
                        var pl = MjClient.data.pinfo;
                        if (pl && pl.sex == 1) { //男孩
                            switch (num) {
                                case 0:
                                    this.setString("妹子能告诉我你的联系方式吗~");
                                    break;
                                case 1:
                                    this.setString("长夜漫漫没想到姑娘你也没睡~");
                                    break;
                                case 2:
                                    this.setString("几个菜鸟赢你们分分钟的事儿");
                                    break;
                                case 3:
                                    this.setString("快快快，甭考验本大王耐心！");
                                    break;
                                case 4:
                                    this.setString("如果上天再给我一次选择，我会让你输的更惨！");
                                    break;
                                case 5:
                                    this.setString("这么慢，我倒要看看你搬什么救兵！");
                                    break;
                                case 6:
                                    this.setString("你的钱是我的钱，我的钱还是我的钱~");
                                    break;
                                case 7:
                                    this.setString("朋友，你牌品不好容易断线！");
                                    break;
                                case 8:
                                    this.setString("我这里顺风顺水，要什么来什么~");
                                    break;
                                case 9:
                                    this.setString("胜负已分快投降吧~");
                                    break;
                                case 10:
                                    this.setString("哈哈~~这把牌直接打到你吐血");
                                    break;
                                case 11:
                                    this.setString("君子报仇十年不晚");
                                    break;
                                case 12:
                                    this.setString("官大一级压死你，牌大一级气死你");
                                    break;
                                case 13:
                                    this.setString("财运来的时候真是挡也挡不住！");
                                    break;
                                case 14:
                                    this.setString("你的胆子就和芝麻一样大");
                                    break;
                                case 15:
                                    this.setString("看你骨骼惊奇，肯定是打牌的好手，再来一局~");
                                    break;
                                case 16:
                                    this.setString("咸鱼翻身还是咸鱼");
                                    break;
                                case 17:
                                    this.setString("曾经有首歌，上碰下自摸！");
                                    break;
                                default:
                                    break;
                            }
                        } else {
                            switch (num) {
                                case 0:
                                    this.setString("快点儿呀，我等的花儿都谢了~");
                                    break;
                                case 1:
                                    this.setString("几个菜鸟赢你们分分钟的事儿");
                                    break;
                                case 2:
                                    this.setString("长夜无心睡眠，小女子这厢有礼~");
                                    break;
                                case 3:
                                    this.setString("如果上天再给我一次选择，我会让你输的更惨！");
                                    break;
                                case 4:
                                    this.setString("再不出牌，姐姐就回月亮宫了！");
                                    break;
                                case 5:
                                    this.setString("你的钱是我的钱，我的钱还是我的钱~");
                                    break;
                                case 6:
                                    this.setString("无尽的等待，无尽的寂寞啊~");
                                    break;
                                case 7:
                                    this.setString("我这里顺风顺水，要什么来什么~");
                                    break;
                                case 8:
                                    this.setString("这么慢，奴家都急死了！");
                                    break;
                                case 9:
                                    this.setString("快点儿啦，人家还要去做面膜拉~");
                                    break;
                                case 10:
                                    this.setString("官大一级压死你，牌大一级气死你");
                                    break;
                                case 11:
                                    this.setString("你的胆子就和芝麻一样大");
                                    break;
                                case 12:
                                    this.setString("咸鱼翻身还是咸鱼");
                                    break;
                                case 13:
                                    this.setString("我去洗白白了，明天再约哦！");
                                    break;
                                case 14:
                                    this.setString("哈哈~~这把牌直接打到你吐血");
                                    break;
                                case 15:
                                    this.setString("很高兴见到你，让我多胡几把嘛~");
                                    break;
                                case 16:
                                    this.setString("曾经有首歌，上碰下自摸！");
                                    break;
                                case 17:
                                    this.setString("真是不好意思又胡啦！");
                                    break;
                                case 18:
                                    this.setString("颜值才是胡牌的王道啊，哈哈~");
                                    break;
                                default:
                                    break;
                            }
                        }
                    }
                    else if (MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ) {
                        switch (num) {
                            case 0:
                                this.setString("大家好,很高兴认识你们。");
                                break;
                            case 1:
                                this.setString("快点快点，出牌利索点儿。");
                                break;
                            case 2:
                                this.setString("玩大牌，小牌不胡！");
                                break;
                            case 3:
                                this.setString("上牌太差，今天霉咯。");
                                break;
                            case 4:
                                this.setString("已拜财神，财源滚滚来！");
                                break;
                            case 5:
                                this.setString("清一色自摸，上贡上贡！");
                                break;
                            case 6:
                                this.setString("通宵决战，哥们必须奉陪到底！");
                                break;
                            case 7:
                                this.setString("架听了，坐等自摸上牌！");
                                break;
                            case 8:
                                this.setString("和大家玩牌很开心，下次再战。");
                                break;
                            default:
                                break;
                        }
                    }
                    else if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP ||
                            MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
                            MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ ||
                            MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ ) {
                        if ( MjClient.gameType == MjClient.GAME_TYPE.YY_AN_HUA_PAO_HU_ZI) {
                            switch (num) {
                                case 0:
                                    this.setString("大家好，很高兴见到各位");
                                    break;
                                case 1:
                                    this.setString("你的牌打的也太好了");
                                    break;
                                case 2:
                                    this.setString("哈哈，手气真好");
                                    break;
                                case 3:
                                    this.setString("快点吧，我等到花儿都谢了");
                                    break;
                                case 4:
                                    this.setString("不要走、决战到天亮");
                                    break;
                                case 5:
                                    this.setString("这个好吃");
                                    break;
                                case 6:
                                    this.setString("你放炮我不胡");
                                    break;
                                case 7:
                                    this.setString("真不好意思，又胡了");
                                    break;
                                case 8:
                                    this.setString("今天真高兴");
                                    break;
                                case 9:
                                    this.setString("又断线了，网络怎么这么差啊");
                                    break;
                                case 10:
                                    this.setString("君子报仇，十盘不晚");
                                    break;
                                case 11:
                                    this.setString("打错了，呜呜");
                                    break;
                                case 12:
                                    this.setString("各位不好意思，我得离开一会");
                                    break;
                                case 13:
                                    this.setString("再见了，我会想念大家的");
                                    break;
                                default:
                                    break;
                            }
                        }
                        else if (MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_NIU_SHI_BIE)
                        {
                            switch (num) {
                                case 0:
                                    this.setString("不要吊我呀，吊也吊不活啊！");
                                    break;
                                case 1:
                                    this.setString("你不好打让我来打他");
                                    break;
                                case 2:
                                    this.setString("你打我没有！");
                                    break;
                                case 3:
                                    this.setString("你感觉走你的别管我了！");
                                    break;
                                case 4:
                                    this.setString("你搞什么啊？");
                                    break;
                                case 5:
                                    this.setString("你能上就上我肯定最后一名了！");
                                    break;
                                case 6:
                                    this.setString("你要什么牌？");
                                    break;
                                case 7:
                                    this.setString("你有王吗？");
                                    break;
                                case 8:
                                    this.setString("让我来大他？");
                                    break;
                                case 9:
                                    this.setString("我肯定上了你赶快走！");
                                    break;
                                case 10:
                                    this.setString("我来打！");
                                    break;
                                case 11:
                                    this.setString("我同花顺你能吃就吃啊");
                                    break;
                                default:
                                    break;
                            }
                        }
                        else if (MjClient.gameType == MjClient.GAME_TYPE.ZHU_ZHOU_DA_MA_ZI ||
                           MjClient.gameType == MjClient.GAME_TYPE.CHONG_YANG_DA_GUN ||
                           MjClient.gameType == MjClient.GAME_TYPE.TONG_SHAN_DA_GONG ||
                           MjClient.gameType == MjClient.GAME_TYPE.DA_YE_DA_GONG ||
                           MjClient.gameType == MjClient.GAME_TYPE.DA_YE_510K ||
                            MjClient.gameType == MjClient.GAME_TYPE.QIAN_JIANG_QIAN_FEN ||
                           MjClient.gameType == MjClient.GAME_TYPE.QI_CHUN_DA_GONG)
                        {
                            switch (num) {
                                case 0:
                                    this.setString("快点出牌咯？");
                                    break;
                                case 1:
                                    this.setString("我正滴套！");
                                    break;
                                case 2:
                                    this.setString("鬼是死滴！");
                                    break;
                                case 3:
                                    this.setString("你有五十K么？");
                                    break;
                                case 4:
                                    this.setString("你有几套哦！");
                                    break;
                                case 5:
                                    this.setString(" 打滴鬼死吗？");
                                    break;
                                case 6:
                                    this.setString("你有正滴套吗？");
                                    break;
                                case 7:
                                    this.setString("随便打咯！");
                                    break;
                                case 8:
                                    this.setString("你还有好多分子");
                                    break;
                                case 9:
                                    this.setString("你有什么东西打哦？");
                                    break;
                                case 10:
                                    this.setString("打一个的");
                                    break;
                                case 11:
                                    this.setString("打对子");
                                    break;
                                case 12:
                                    this.setString("打三个的");
                                    break;
                                case 13:
                                    this.setString("打四个的");
                                    break;
                                case 14:
                                    this.setString("打两连对");
                                    break;
                                case 15:
                                    this.setString("打三连对");
                                    break;
                                case 16:
                                    this.setString("你有板子冒罗？");
                                    break;
                                case 17:
                                    this.setString("你要么子哦？");
                                    break;
                                case 18:
                                    this.setString("你不好打，我来！");
                                    break;
                                case 19:
                                    this.setString("我打不起你打罗！");
                                    break;
                                case 20:
                                    this.setString("你有几个鬼哦？");
                                    break;
                                case 21:
                                    this.setString("我有");
                                    break;
                                case 22:
                                    this.setString("我没有");
                                    break;
                                case 23:
                                    this.setString("往里面上分，我铁上！");
                                    break;
                                default:
                                    break;
                            }
                        }
                        else if ((MjClient.gameType === MjClient.GAME_TYPE.TAO_JIANG_MA_JIANG ||
                            MjClient.gameType === MjClient.GAME_TYPE.YI_YANG_MA_JIANG) && getCurrentVoiceType() == 1)
                        {
                            switch (num) {
                                case 0:
                                    this.setString("你真的厉害！");
                                    break;
                                case 1:
                                    this.setString("你快点出牌咯！");
                                    break;
                                case 2:
                                    this.setString("左手摸牌右手发财！");
                                    break;
                                case 3:
                                    this.setString("上碰下自摸一起吃火锅！");
                                    break;
                                case 4:
                                    this.setString("天灵灵，地灵灵来手好牌行不行！");
                                    break;
                                case 5:
                                    this.setString("我一听牌你就胡了，还搞得好不？");
                                    break;
                                case 6:
                                    this.setString("今天放了一万个炮了嘞！");
                                    break;
                                case 7:
                                    this.setString("手气真的索，打得我眼泪直落！");
                                    break;
                                case 8:
                                    this.setString("莫走，打得天亮！");
                                    break;
                                case 9:
                                    this.setString("你们小心点 我马上要自摸了！");
                                    break;
                                case 10:
                                    this.setString("上手是冤家让着点要得不？");
                                    break;
                                case 11:
                                    this.setString("冲动是魔鬼，要淡定！");
                                    break;
                                case 12:
                                    this.setString("这一局我胡了，去环球吃饭！");
                                    break;
                                case 13:
                                    this.setString("这牌来的太好了，不知道怎么打了！");
                                    break;
                                default:
                                    break;
                            }
                        }
                        else{
                            switch (num) {
                                case 0:
                                    this.setString("搏一搏，单车变摩托~");
                                    break;
                                case 1:
                                    this.setString("时间就是金钱，我的朋友！");
                                    break;
                                case 2:
                                    this.setString("一点小钱，拿去喝茶吧!");
                                    break;
                                case 3:
                                    this.setString("有没有天理有没有王法，这牌也输");
                                    break;
                                case 4:
                                    this.setString("快点啊，我等到花都谢了！");
                                    break;
                                case 5:
                                    this.setString("怎么又断线了，网络怎么这么差啊！");
                                    break;
                                case 6:
                                    this.setString("不要走，决战到天亮~");
                                    break;
                                case 7:
                                    this.setString("你的牌打得太好了~");
                                    break;
                                case 8:
                                    this.setString("你是妹妹还是哥哥？");
                                    break;
                                case 9:
                                    this.setString("跟你合作实在太愉快了~");
                                    break;
                                case 10:
                                    this.setString("大家好，很高兴见到各位~");
                                    break;
                                case 11:
                                    this.setString("各位不好意思，我得离开一会~");
                                    break;
                                case 12:
                                    this.setString("不要吵，专心玩游戏~");
                                    break;
                                default:
                                    break;
                            }
                        }
                    }
                    else if (MjClient.gameType == MjClient.GAME_TYPE.XIN_SI_YANG){
                        switch (num) {
                            case 0:
                                this.setString("不好意思，有事先走一步!");
                                break;
                            case 1:
                                this.setString("不要走，决战到天亮!");
                                break;
                            case 2:
                                this.setString("大家好，很高兴见到各位!");
                                break;
                            case 3:
                                this.setString("哈哈，手气真好!");
                                break;
                            case 4:
                                this.setString("今天真高兴!");
                                break;
                            case 5:
                                this.setString("快点出牌啊!");
                                break;
                            case 6:
                                this.setString("你的牌打的太好啦!");
                                break;
                            case 7:
                                this.setString("你放炮，我不胡!");
                                break;
                            case 8:
                                this.setString("你家里是开银行的吧!");
                                break;
                            case 9:
                                this.setString("你太牛啦!");
                                break;
                            case 10:
                                this.setString("怎么又断线了，网络怎么这么差啊!");
                                break;
                            default:
                                break;
                        }
                    } else
                    {
                        switch (num) {
                            case 0:
                                this.setString("快点啊，都等到我花儿都谢了！");
                                break;
                            case 1:
                                this.setString("怎么又断线了，网络怎么这么差啊！");
                                break;
                            case 2:
                                this.setString("不要走决战到天亮!");
                                break;
                            case 3:
                                this.setString("你的牌打的也太好了！");
                                break;
                            case 4:
                                this.setString("你是妹妹还是哥哥啊？");
                                break;
                            case 5:
                                this.setString("和你合作真是太愉快了！");
                                break;
                            case 6:
                                this.setString("大家好很高兴见到各位！");
                                break;
                            case 7:
                                this.setString("各位，真是不好意思我得离开一会。");
                                break;
                            case 8:
                                this.setString("不要吵了专心玩游戏吧！");
                                break;
                            default:
                                break;
                        }
                    }

                    if(MjClient.GAME_TYPE.TUAN_TUAN_ZHUAN === MjClient.gameType) {
                        switch (num) {
                            case 0:
                                this.setString("快点啊，都等到我花儿都谢了！");
                                break;
                            case 1:
                                this.setString("怎么又断线了，网络怎么这么差啊！");
                                break;
                            case 2:
                                this.setString("不要走决战到天亮!");
                                break;
                            case 3:
                                this.setString("你的牌打的也太好了！");
                                break;
                            case 4:
                                this.setString("你是妹妹还是哥哥啊？");
                                break;
                            case 5:
                                this.setString("和你合作真是太愉快了！");
                                break;
                            case 6:
                                this.setString("大家好很高兴见到各位！");
                                break;
                            case 7:
                                this.setString("各位，真是不好意思我得离开一会。");
                                break;
                            case 8:
                                this.setString("不要吵了专心玩游戏吧！");
                                break;
                            default:
                                break;
                        }
                    }
                }
            }

        }
        BindUiAndLogic(node, bind);
    }

    function ItemsBind_yongzhou(node, num) {
        var bind = {
            _click: function() {
                MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Duihua_wenziyuyin", {uid: SelfUid()});
                MJChat(SelfUid(),CHAT_TYPE_DEFULT,{text:node.getChildByName("text").getString(), voiceType:getCurrentVoiceType()},num);
                if(playerChatLayer)
                {
                    playerChatLayer.removeFromParent(true);
                    playerChatLayer = null;
                }
            }
            , text: {
                _run: function () {
                    this.ignoreContentAdaptWithSize(true);
                    if (MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ) {
                        switch (num) {
                            case 0:
                                this.setString("不要吵了，专心玩游戏把");
                                break;
                            case 1:
                                this.setString("不要走，决战到天亮");
                                break;
                            case 2:
                                this.setString("大家好很高兴见到各位！");
                                break;
                            case 3:
                                this.setString("各位不好意思,我得离开一会");
                                break;
                            case 4:
                                this.setString("和你合作真实太愉快了！");
                                break;
                            case 5:
                                this.setString("快点啊，等到我花儿都谢了");
                                break;
                            case 6:
                                this.setString("你的牌打的也太好了吧！");
                                break;
                            case 7:
                                this.setString("你是妹妹还是哥哥啊？");
                                break;
                            case 8:
                                this.setString("又断线了，网络咋这么差啊");
                                break;
                            default:
                                break;
                        }   
                    } else if(MjClient.gameType === MjClient.GAME_TYPE.XIANG_XIANG_GAO_HU_ZI ||
                        MjClient.gameType === MjClient.GAME_TYPE.XIANG_XIANG_PAO_HU_ZI ||
                        MjClient.gameType === MjClient.GAME_TYPE.XIANG_TAN_PAO_HU_ZI) {
                        this.ignoreContentAdaptWithSize(false);
                        var voiceType = util.localStorageEncrypt.getNumberItem(MjClient.KEY_ZI_PAI_VOICE_TYPE, 1);
                        if(MjClient.gameType === MjClient.GAME_TYPE.XIANG_TAN_PAO_HU_ZI) voiceType = 0;
                        
                        var content;
                        switch(num){
                            case 0:
                                content = voiceType == 0?"拼一拼，搏一搏，单车变摩托！":"湘乡有首歌，上碰下自摸！";
                                break;
                            case 1:
                                content = voiceType == 0?"怎么又断线了，你网络怎么这么差！":"莫喷泡子里，快递出牌咯！";
                                break;
                            case 2:
                                content = voiceType == 0?"不好意思，接个电话！":"嗯滴牌几就硬打的嬲噻啦，朋友啊！";
                                break;
                            case 3:
                                content = voiceType == 0?"你以为你是潘先生，不要这么浪，还是认真打牌，莫吵！":"么噶又断噶线里啊，换多好滴手机看看！";
                                break;
                            case 4:
                                content = voiceType == 0?"你要多出点师傅费，下次你才赢得前到！":"嗯是二炮导弹部队的老班长哦，放炮专业户！";
                                break;
                            case 5:
                                content = voiceType == 0?"大炮一响，黄金万两，关公保佑我赢钱！":"输的噶茄子样的，裤底舍噶哩，再输只能起跳涟水河里！";
                                break;
                            case 6:
                                content = voiceType == 0?"今天输大了，小妹（大哥）我跟你回家把！":"昨一子找杨哈子算了一挂，今天打牌手气好，恁搞打是滴！";
                                break;
                            case 7:
                                content = voiceType == 0?"你是不是踩了狗屎运，手气怎么这么好！":"打了这么久，就赢了一碗银粉丝的钱！";
                                break;
                            case 8:
                                content = voiceType == 0?"你放炮、我不胡！":"出来混，迟早是要还的，低调！";
                                break;
                            case 9:
                                content = voiceType == 0?"你太牛了牌打得这么好！":"专心耍咯，摸紧哒噶吵哩！";
                                break;
                            case 10:
                                content = "快点出牌咯！";
                                break;
                            case 11:
                                content = "这样打牌，你家里钱多啊！";
                                break;
                            case 12:
                                content = "你是帅哥还是靓妹，我们交个朋友吧！";
                                break;
                            case 13:
                                content = "要自摸了，今天真高兴！";
                                break;
                            case 14:
                                content = "出来混的迟早是要还的，你也得让我胡几手牌吧！";
                                break;
                            default:
                                break;
                        }
                        if(content){
                            this.setString(content);
                            this.ignoreContentAdaptWithSize(true);
                        }
                    }
                    else if (MjClient.gameType == MjClient.GAME_TYPE.ZP_LY_CHZ
                        || MjClient.gameType == MjClient.GAME_TYPE.LEI_YANG_GMJ
                        || MjClient.gameType == MjClient.GAME_TYPE.HY_LIU_HU_QIANG
                        || MjClient.gameType == MjClient.GAME_TYPE.HY_SHI_HU_KA
                        || MjClient.gameType == MjClient.GAME_TYPE.TY_HONGZHONG
                        || MjClient.gameType == MjClient.GAME_TYPE.XIANG_XIANG_HONG_ZHONG
                        || MjClient.gameType == MjClient.GAME_TYPE.HUAI_HUA_MA_JIANG
                        || MjClient.gameType == MjClient.GAME_TYPE.AN_HUA_MA_JIANG
                        || MjClient.gameType == MjClient.GAME_TYPE.YZ_PAO_DE_KUAI_TY
                        || MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_TY
                        || MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_HBTY
                        || MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_QC
                        || MjClient.gameType == MjClient.GAME_TYPE.WU_XUE_GE_BAN
                        || (MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ && (
                            MjClient.gameType == MjClient.GAME_TYPE.YONG_ZHOU_MJ
                            || MjClient.gameType == MjClient.GAME_TYPE.JIANG_HUA_MJ))
                        || MjClient.gameType == MjClient.GAME_TYPE.TY_ZHUANZHUAN
                        || MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_BO_PI
                        || MjClient.gameType == MjClient.GAME_TYPE.DA_ZI_BO_PI
                        || MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_ZI_PAI
                        || MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_MA_JIANG
                        || MjClient.gameType == MjClient.GAME_TYPE.XIN_NING_MA_JIANG
                        || MjClient.gameType == MjClient.GAME_TYPE.HY_ER_PAO_HU_ZI
                        || MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_PENG_HU
                        || MjClient.gameType == MjClient.GAME_TYPE.BAN_BIAN_TIAN_ZHA
                        || MjClient.gameType == MjClient.GAME_TYPE.LONG_HUI_BA_ZHA_DAN
                        || MjClient.gameType == MjClient.GAME_TYPE.YONG_ZHOU_LAO_CHUO
                        || MjClient.gameType == MjClient.GAME_TYPE.LENG_SHUI_JIANG_SHI_HU_DAO
                        || MjClient.gameType == MjClient.GAME_TYPE.XIANG_XIANG_SAN_DA_HA
                        || MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_SAN_DA_HA
                        || MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_SAN_DA_HA
                        || MjClient.gameType == MjClient.GAME_TYPE.YONG_LI_SAN_DA_HA
                        || MjClient.gameType == MjClient.GAME_TYPE.PAO_DE_KUAI_ELEVEN ) {
                        // var voiceType = util.localStorageEncrypt.getNumberItem(MjClient.KEY_voiceType, 1);
                        // if(voiceType == 1 && MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ
                        //     && ( MjClient.gameType == MjClient.GAME_TYPE.XIANG_XIANG_HONG_ZHONG
                        //     || MjClient.gameType == MjClient.GAME_TYPE.TY_ZHUANZHUAN)){
                        //     switch (num) {
                        //         case 0:
                        //             this.setString("我就不能有好牌啊");
                        //             break;
                        //         case 1:
                        //             this.setString("快出牌撒");
                        //             break;
                        //         case 2:
                        //             this.setString("我一直是顶你的");
                        //             break;
                        //         case 3:
                        //             this.setString("佩服！佩服！");
                        //             break;
                        //         case 4:
                        //             this.setString("看不清戴副眼睛");
                        //             break;
                        //         case 5:
                        //             this.setString("这是什么手咯，简直是臭手");
                        //             break;
                        //         case 6:
                        //             this.setString("天都要亮了，快点撒");
                        //             break;
                        //         case 7:
                        //             this.setString("我这里顺风顺水的，想不胡都不行");
                        //             break;
                        //         case 8:
                        //             this.setString("要胡的牌打的没有叫了");
                        //             break;
                        //         case 9:
                        //             this.setString("清早吧早的，鸡都没有叫");
                        //             break;
                        //         default:
                        //             break;
                        //     }
                        // }
                        // else
                        {
                            switch (num) {
                                case 0:
                                    this.setString("快点啊，我等到花儿都谢了");
                                    break;
                                case 1:
                                    this.setString("又断线了，网络咋这么差啊");
                                    break;
                                case 2:
                                    this.setString("不要走决战到天亮!");
                                    break;
                                case 3:
                                    this.setString("你的牌打的也太好了！");
                                    break;
                                case 4:
                                    this.setString("你是妹妹还是哥哥啊？");
                                    break;
                                case 5:
                                    this.setString("和你合作真是太愉快了！");
                                    break;
                                case 6:
                                    this.setString("大家好很高兴见到各位！");
                                    break;
                                case 7:
                                    this.setString("各位不好意思，我得离开一会");
                                    break;
                                case 8:
                                    this.setString("不要吵了专心玩游戏吧！");
                                    break;
                                default:
                                    break;
                            }
                        }

                    } else if ( MjClient.gameType == MjClient.GAME_TYPE.AN_HUA_PAO_HU_ZI){
                        switch (num) {
                            case 0:
                                this.setString("大家好，很高兴见到各位");
                                break;
                            case 1:
                                this.setString("你的牌打的也太好了");
                                break;
                            case 2:
                                this.setString("哈哈，手气真好");
                                break;
                            case 3:
                                this.setString("快点吧，我等到花儿都谢了");
                                break;
                            case 4:
                                this.setString("不要走、决战到天亮");
                                break;
                            case 5:
                                this.setString("这个好吃");
                                break;
                            case 6:
                                this.setString("你放炮我不胡");
                                break;
                            case 7:
                                this.setString("真不好意思，又胡了");
                                break;
                            case 8:
                                this.setString("今天真高兴");
                                break;
                            case 9:
                                this.setString("又断线了，网络怎么这么差啊");
                                break;
                            case 10:
                                this.setString("君子报仇，十盘不晚");
                                break;
                            case 11:
                                this.setString("打错了，呜呜");
                                break;
                            case 12:
                                this.setString("各位不好意思，我得离开一会");
                                break;
                            case 13:
                                this.setString("再见了，我会想念大家的");
                                break;
                            default:
                                break;
                        }
                    }else if (MjClient.gameType == MjClient.GAME_TYPE.DA_TONG_ZI_SHAO_YANG) {
                        switch (num) {
                            case 0:
                                this.setString("不好意思，又要第一了");
                                break;
                            case 1:
                                this.setString("快点，你在塞毛哦");
                                break;
                            case 2:
                                this.setString("接个电话等我一下");
                                break;
                            case 3:
                                this.setString("你要么子");
                                break;
                            case 4:
                                this.setString("你管好自己");
                                break;
                            case 5:
                                this.setString("有风吹么");
                                break;
                            case 6:
                                this.setString("你能走上游不");
                                break;
                            case 7:
                                this.setString("你牌好打么");
                                break;
                            case 8:
                                this.setString("不好出");
                                break;
                            case 9:
                                this.setString("让我来打");
                                break;
                            case 10:
                                this.setString("我先走对你有用没有");
                                break;
                            case 11:
                                this.setString("我先走了");
                                break;
                            case 12:
                                this.setString("要单张");
                                break;
                            case 13:
                                this.setString("要多连对");
                                break;
                            case 14:
                                this.setString("要飞机");
                                break;
                            case 15:
                                this.setString("要连对");
                                break;
                            case 16:
                                this.setString("要三个头");
                                break;
                        }
                    } else if (MjClient.gameType == MjClient.GAME_TYPE.DAO_ZHOU_MJ) {
                        var voiceType = util.localStorageEncrypt.getNumberItem(MjClient.KEY_voiceType, 1);
                        var content;
                        switch (num) {
                            case 0:
                                content = voiceType == 1 ? "不动了吼，这盘要轰顶老乃!" : "快点啊，我等到花儿都谢了";
                                break;
                            case 1:
                                content = voiceType == 1 ? "不要吵了，快点打牌类!" : "又断线了，网络咋这么差啊";
                                break;
                            case 2:
                                content = voiceType == 1 ? "出老吧，选来选去，选个炮的!" : "不要走决战到天亮";
                                break;
                            case 3:
                                content = voiceType == 1 ? "快点出老吧，睡着给老!" : "你的牌打的也太好了";
                                break;
                            case 4:
                                content = voiceType == 1 ? "麻将有首歌，上碰下自摸!" : "你是妹妹还是哥哥啊？";
                                break;
                            case 5:
                                content = voiceType == 1 ? "纳闷又断线了!" : "和你合作真是太愉快了";
                                break;
                            case 6:
                                content = voiceType == 1 ? "你滴牌打得太好了，挨不起你!" : "大家好很高兴见到各位";
                                break;
                            case 7:
                                content = voiceType == 1 ? "你给我吃一枪类，纳闷和快铁一样滴!" : "各位不好意思，我得离开一会";
                                break;
                            case 8:
                                content = voiceType == 1 ? "你纳闷总盯着我打的!" : "不要吵了专心玩游戏吧";
                                break;
                            case 9:
                                content = "上WC类，等哈仔类！";
                                break;
                        }
                        if (content) {
                            this.setString(content);
                        }
                    } else if (MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_SHIWUHUXI || MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_FANG_PAO_FA) {
                        var voiceType = util.localStorageEncrypt.getNumberItem(MjClient.KEY_voiceType, 0);
                        var content;
                        switch (num) {
                            case 0:
                                content = voiceType == 1 ? "横林古慢乃，快滴打牌勒" : "快点啊，我等到花儿都谢了";
                                break;
                            case 1:
                                content = voiceType == 1 ? "古甲牌恰得好乃" : "又断线了，网络咋这么差啊";
                                break;
                            case 2:
                                content = voiceType == 1 ? "吵死吵摆子，专心打牌呢" : "不要走决战到天亮";
                                break;
                            case 3:
                                content = voiceType == 1 ? "我屋里有滴事，先走鸟" : "你的牌打的也太好了";
                                break;
                            case 4:
                                content = voiceType == 1 ? "今林手气蛮好乃" : "你是妹妹还是哥哥啊？";
                                break;
                            case 5:
                                content = voiceType == 1 ? "今林么走，要打通宵咯" : "和你合作真是太愉快了";
                                break;
                            case 6:
                                content = voiceType == 1 ? "打古甲牌，钱多冒当放" : "大家好很高兴见到各位";
                                break;
                            case 7:
                                content = voiceType == 1 ? "和你们打牌，晓不得好开心" : "各位不好意思，我得离开一会";
                                break;
                            case 8:
                                content = voiceType == 1 ? "今林蛮开心" : "不要吵了专心玩游戏吧";
                                break;
                            case 9:
                                content = "你蛮狠乃";
                                break;
                            default:
                                break;
                        }
                        if (content) {
                            this.setString(content);
                        }
                    } else if (MjClient.gameType == MjClient.GAME_TYPE.CHANG_SHA) {
                        switch (num) {
                            case 0:
                                this.setString("别走，决战到天亮~");
                                break;
                            case 1:
                                this.setString("快点儿，我等到花儿都谢了！");
                                break;
                            case 2:
                                this.setString("你的牌打的太好了!");
                                break;
                            case 3:
                                this.setString("你放炮，我不胡");
                                break;
                            case 4:
                                this.setString("你家是开银行的吧？");
                                break;
                            case 5:
                                this.setString("网络怎么这么差，又断线了");
                                break;
                            case 6:
                                this.setString("我这顺风顺水，要什么来什么");
                                break;
                            case 7:
                                this.setString("曾经有首歌，上碰下自摸");
                                break;
                            case 8:
                                this.setString("真不好意思，刚接了个电话");
                                break;
                            default:
                                break;
                        }
                    } else if (MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_CHANG_SHA) {
                        switch (num) {
                            case 0:
                                this.setString("搏一搏，单车变摩托~");
                                break;
                            case 1:
                                this.setString("时间就是金钱，我的朋友！");
                                break;
                            case 2:
                                this.setString("一点小钱，拿去喝茶吧!");
                                break;
                            case 3:
                                this.setString("有没有天理有没有王法，这牌也输");
                                break;
                            case 4:
                                this.setString("快点啊，我等到花都谢了！");
                                break;
                            case 5:
                                this.setString("怎么又断线了，网络怎么这么差啊！");
                                break;
                            case 6:
                                this.setString("不要走，决战到天亮~");
                                break;
                            case 7:
                                this.setString("你的牌打得太好了~");
                                break;
                            case 8:
                                this.setString("你是妹妹还是哥哥？");
                                break;
                            case 9:
                                this.setString("跟你合作实在太愉快了~");
                                break;
                            case 10:
                                this.setString("大家好，很高兴见到各位~");
                                break;
                            case 11:
                                this.setString("各位不好意思，我得离开一会~");
                                break;
                            case 12:
                                this.setString("不要吵，专心玩游戏~");
                                break;
                            default:
                                break;
                        }
                    }
                    else {
                        switch (num) {
                            case 0:
                                this.setString("这牌好，我今天财气好");
                                break;
                            case 1:
                                this.setString("打张牌快点嘛");
                                break;
                            case 2:
                                this.setString("我这胡子没多大");
                                break;
                            case 3:
                                this.setString("下次再耍，我要走了");
                                break;
                            case 4:
                                this.setString("不要走，打到天亮");
                                break;
                            case 5:
                                this.setString("这个牌打错了");
                                break;
                            case 6:
                                this.setString("兄弟姐妹，打张来跑");
                                break;
                            case 7:
                                this.setString("这个牌打的好啦，我喜欢");
                                break;
                            case 8:
                                this.setString("你打张牌快点蛮，等天都黑了");
                                break;
                            default:
                                break;
                        }
                    }


                    if(MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ){
                        if(MjClient.gameType != MjClient.GAME_TYPE.AN_HUA_PAO_HU_ZI && 
                            MjClient.gameType != MjClient.GAME_TYPE.DA_TONG_ZI_SHAO_YANG && 
                            MjClient.gameType != MjClient.GAME_TYPE.HENG_YANG_SHIWUHUXI &&
                            MjClient.gameType != MjClient.GAME_TYPE.XIANG_XIANG_GAO_HU_ZI &&
                            MjClient.gameType != MjClient.GAME_TYPE.XIANG_XIANG_PAO_HU_ZI &&
                            MjClient.gameType != MjClient.GAME_TYPE.XIANG_TAN_PAO_HU_ZI &&
                            MjClient.gameType != MjClient.GAME_TYPE.DAO_ZHOU_MJ &&
                            MjClient.gameType != MjClient.GAME_TYPE.YONG_ZHOU_MJ &&
                            MjClient.gameType != MjClient.GAME_TYPE.JIANG_HUA_MJ &&
                            !getSYMovePlayYZ_ziPai()){
                            switch (num) {
                                case 0:
                                this.setString("搏一搏，单车变摩托~");
                                break;
                                case 1:
                                    this.setString("时间就是金钱，我的朋友！");
                                    break;
                                case 2:
                                    this.setString("一点小钱，拿去喝茶吧!");
                                    break;
                                case 3:
                                    this.setString("有没有天理有没有王法，这牌也输");
                                    break;
                                case 4:
                                    this.setString("快点啊，我等到花都谢了！");
                                    break;
                                case 5:
                                    this.setString("怎么又断线了，网络怎么这么差啊！");
                                    break;
                                case 6:
                                    this.setString("不要走，决战到天亮~");
                                    break;
                                case 7:
                                    this.setString("你的牌打得太好了~");
                                    break;
                                case 8:
                                    this.setString("你是妹妹还是哥哥？");
                                    break;
                                case 9:
                                    this.setString("跟你合作实在太愉快了~");
                                    break;
                                case 10:
                                    this.setString("大家好，很高兴见到各位~");
                                    break;
                                case 11:
                                    this.setString("各位不好意思，我得离开一会~");
                                    break;
                                case 12:
                                    this.setString("不要吵，专心玩游戏~");
                                    break;
                                default:
                                    break;
                            }
                        }
                    }
                }
            }

        }
        BindUiAndLogic(node, bind);
    }

    function MJChat(uid, type, msg, num) {
        MjClient.gamenet.request("pkroom.handler.tableMsg", {
            cmd: "MJChat",
            uid: uid,
            type: type,
            msg: msg,
            num: num
        });
    }

    function SendChatMessage() {
		MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Duihua_Fasong", {uid: SelfUid()});
        if (cc.sys.isObjectValid(input) && input.getString()) {
            var newString = checkChatWords(input.getString());
            MJChat(SelfUid(), CHAT_TYPE_INPUT, newString, 0);
        }

        if(playerChatLayer)
        {
            playerChatLayer.removeFromParent(true);
            playerChatLayer = null;
        }
    }



    window.ChatLayer = cc.Layer.extend({
        editBoxEditingDidBegin: function(editBox) {
            cc.log("editBox  DidBegin !");
            if (this._untouchLayer && cc.sys.isObjectValid(this._untouchLayer))
            {
                this._untouchLayer.removeFromParent();
                delete this._untouchLayer;
            }
            this._untouchLayer = new ClickCloseLayer();
            MjClient.Scene.addChild(this._untouchLayer);
        },
        editBoxEditingDidEnd: function(editBox) {
            cc.log("editBox  DidEnd !");
        },
        editBoxTextChanged: function(editBox, text) {
            cc.log("editBox , TextChanged, text: " + text);
        },
        editBoxReturn: function(editBox) {
            cc.log("editBox  was returned !");
        },

        ctor: function() {
            this._super();
            var chatui = ccs.load("PlayerChat.json");
            cc.log("------sking====1=======发送消息");
            MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Duihua", {uid:SelfUid()});

            //chatui.node.setScale(1.2);
            //BindUiAndLogic(chatui.node,this.jsBind);
            this.addChild(chatui.node);
            playerChatLayer = this;

            /*
                changed by sking
             */
            var _block = chatui.node.getChildByName("block");
            _block.setTouchEnabled(true);
            setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);
            var _back = chatui.node.getChildByName("back");
            if(MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || 
                MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ ||
                MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
                MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
                MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP ||
                MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ ||
                MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP)
            {
                setWgtLayout(_back, [0, 0.736], [0.5, 0.5], [0, 0]);
                _block.addTouchEventListener(function (sender, Type) {
                    switch (Type) {
                        case ccui.Widget.TOUCH_ENDED:
                            if (playerChatLayer) {
                                playerChatLayer.removeFromParent(true);
                                playerChatLayer = null;
                            }
                            break;
                        default :
                            break;
                    }
                }, this);
            } else {
                
                setWgtLayout(_back, [0.9, 0.9], [0.5, 0.5], [0, 0]);

                var _closeBtn = new ccui.Button();
                _closeBtn.loadTextureNormal("game_picture/btn_x_normal.png");
                _closeBtn.setPosition(cc.p(_back.getContentSize().width, _back.getContentSize().height));
                _back.addChild(_closeBtn);
                _closeBtn.addTouchEventListener(function(sender, Type) {
                    switch (Type) {
                        case ccui.Widget.TOUCH_ENDED:
                            if(playerChatLayer)
                            {
                                playerChatLayer.removeFromParent(true);
                                playerChatLayer = null;
                            }
                            break;
                        default:
                            break;
                    }
                }, this);
            }

            var inputimg = _back.getChildByName("inputimg");
            input = new cc.EditBox(inputimg.getContentSize(), new cc.Scale9Sprite());
            input.setFontColor(cc.color(0x7E, 0x5C, 0x45));
            input.setPlaceholderFontColor(cc.color(128, 128, 128));
            input.setMaxLength(20);
            input.setFontSize(34);
            input.setInputFlag(cc.EDITBOX_INPUT_FLAG_INITIAL_CAPS_ALL_CHARACTERS);
            input.setInputMode(cc.EDITBOX_INPUT_MODE_ANY);
            input.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
            input.setPlaceHolder("请输入文字");
            input.setPlaceholderFontSize(28);
            input.setPosition(inputimg.getContentSize().width / 2, inputimg.getContentSize().height / 2);
            input.setDelegate(this);
            inputimg.addChild(input);





            //发送按钮
            var send_btn = _back.getChildByName("send_btn");
            send_btn.addTouchEventListener(function(sender, Type) {
                switch (Type) {
                    case ccui.Widget.TOUCH_ENDED:
                        console.log("------发送消息");
                        SendChatMessage();
                        break;
                    default:
                        break;
                }
            }, this);

            var clubData = getClubInfoInTable();
            if(true || (clubData && clubData.isForbChat)){
                inputimg.setVisible(false);
                send_btn.setVisible(false);
            }

            //常用语列表
            var changyong_list = _back.getChildByName("changyong_list");
            this._listView_changyongyu = changyong_list;

            changyong_list.visible = true;
            //表情列表
            var emoji_list = _back.getChildByName("emoji_list");
            this._listView_biaoqing = emoji_list;
            emoji_list.visible = false;
            
            if (!isYongZhouProject() || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ ) {
                //常用语
                var changyongBtn = _back.getChildByName("changyong");
                changyongBtn.selected = false;
                changyongBtn.bright = false;

                //表情
                var emojiBtn = _back.getChildByName("emoji");
                emojiBtn.selected = true;
                emojiBtn.bright = true;

                changyongBtn.addEventListener(function(sender, type) {
                    switch (type) {
                        case ccui.CheckBox.EVENT_SELECTED:
                            changyongBtn.selected = true;
                            changyongBtn.bright = true;
                            emojiBtn.selected = false;
                            emojiBtn.bright = false;
                            changyongBtn.zIndex = 10;
                            emoji.zIndex = 5;
                            changyong_list.visible = false;
                            emoji_list.visible = true;
                            break;
                        case ccui.CheckBox.EVENT_UNSELECTED:
                            changyongBtn.selected = false;
                            changyongBtn.bright = false;
                            emojiBtn.selected = true;
                            emojiBtn.bright = true;
                            changyongBtn.zIndex = 5;
                            emojiBtn.zIndex = 10;
                            changyong_list.visible = true;
                            emoji_list.visible = false;
                            break;
                    }
                }, this);
                emojiBtn.addEventListener(function(sender, type) {
                    switch (type) {
                        case ccui.CheckBox.EVENT_SELECTED:
                            changyongBtn.selected = false;
                            changyongBtn.bright = false;
                            emojiBtn.selected = true;
                            emojiBtn.bright = true;
                            emojiBtn.zIndex = 10;
                            changyongBtn.zIndex = 5;
                            changyong_list.visible = true;
                            emoji_list.visible = false;
                            break;
                        case ccui.CheckBox.EVENT_UNSELECTED:
                            changyongBtn.selected = true;
                            changyongBtn.bright = true;
                            emojiBtn.selected = false;
                            emojiBtn.bright = false;
                            emojiBtn.zIndex = 5;
                            changyongBtn.zIndex = 10;
                            changyong_list.visible = false;
                            emoji_list.visible = true;
                            break;
                    }
                }, this);
                //常用语列表
                var changyong_item = changyong_list.getChildByName("item");
                var num = 8;
                if (MjClient.getAppType() == MjClient.APP_TYPE.QXTHMJ) {
                    num = 10;
                }
                else if(MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ) {
                    num = 9;
                    
                }else if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP ||
                    MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
                    MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ ||
                    MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ ) {
                    num = 12;
                }

                for (var i = 0; i < num; i++) {
                    var item = i == 0 ? changyong_item : changyong_item.clone();
                    if (i != 0)
                        changyong_list.insertCustomItem(item, i);
                    if(MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || 
                        MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ ||
                        MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP ||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ ||
                        MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP)
                    {
                        ItemsBind_yongzhou(item, i);
                    } else {
                        ItemsBind(item, i);
                    }
                }

                function emojiEvent(sender, eType) {
                    if (eType == ccui.Widget.TOUCH_ENDED) {
                        var itag = sender.getTag();
                        emojiAction(itag);
                    }
                }

                var emoji_item = emoji_list.getChildByName("item");
                var emoji_names = ["happy", "angry", "smaile", "han", "zhiya", "shihua", "jiong", "sleep", "fennu", "yun",
                    "lihai", "touxiang", "se", "huaixiao", "shaoxiang"
                ];

                if(isJinZhongAPPType()){
                    emoji_names = ["bb1", "daku1", "fennu1", "guzhang1", "kaiqiang1", "kaixin1", "keshui1", "pp1", "tuxue1"];
                }


                for (var i = 0; i < 4; i++) {
                    var item = i == 0 ? emoji_item : emoji_item.clone();
                    if (i != 0)
                        emoji_list.insertCustomItem(item, i);

                    for (var j = 0; j < 4; j++) {
                        var index = i * 4 + j;
                        var emoji = item.getChildByName("emoji" + j);
                        if (index <= emoji_names.length - 1) {
                            emoji.loadTexture("chat/" + emoji_names[index] + ".png");
                            emoji.ignoreContentAdaptWithSize(true);
                            emoji.setTag(index);
                            emoji.addTouchEventListener(emojiEvent, this);
                        } else {
                            emoji.setVisible(false);
                        }
                    }
                }

            }
            else
                {
                //常用语列表
                var changyong_list = _back.getChildByName("changyong_list");
                //表情列表
                var emoji_list = _back.getChildByName("emoji_list");
                emoji_list.visible = true;
                var changyong_item = changyong_list.getChildByName("item");
                var num = 9;

                if (MjClient.gameType == MjClient.GAME_TYPE.DA_TONG_ZI_SHAO_YANG ) { // 邵阳打筒子
                    num = 17;
                }
                if (MjClient.gameType == MjClient.GAME_TYPE.AN_HUA_PAO_HU_ZI ) { // 安化跑胡子
                    num = 14;
                }
                if (MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_SHIWUHUXI || MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_FANG_PAO_FA) { 
                    var voiceType = util.localStorageEncrypt.getNumberItem(MjClient.KEY_voiceType, 0);//衡阳15胡 和衡阳放炮罚
                    if (voiceType == 1) {
                        num = 10;
                    }
                }

                
                if (MjClient.gameType == MjClient.GAME_TYPE.DAO_ZHOU_MJ) {    //道州麻将
                    var voiceType = util.localStorageEncrypt.getNumberItem(MjClient.KEY_voiceType, 0);
                    if (voiceType == 1) {
                        num = 10;
                    }
                }

                if(MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ){
                    if(MjClient.gameType != MjClient.GAME_TYPE.AN_HUA_PAO_HU_ZI && 
                        MjClient.gameType != MjClient.GAME_TYPE.DA_TONG_ZI_SHAO_YANG && 
                        MjClient.gameType != MjClient.GAME_TYPE.HENG_YANG_SHIWUHUXI &&
                        !getSYMovePlayYZ_ziPai()){
                        num = 13;
                    }
                }

                if (MjClient.gameType == MjClient.GAME_TYPE.XIANG_XIANG_GAO_HU_ZI ||     //邵阳的湘乡玩法
                    MjClient.gameType === MjClient.GAME_TYPE.XIANG_XIANG_PAO_HU_ZI ||
                    MjClient.gameType === MjClient.GAME_TYPE.XIANG_TAN_PAO_HU_ZI) {
                    var voiceType = util.localStorageEncrypt.getNumberItem(MjClient.KEY_voiceType, 0);
                    if (voiceType == 0) {
                        num = 15;
                    } else {
                        num = 10;
                    }
                }

                if (MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_CHANG_SHA) {
                    changyong_item.getChildByName("text").setFontSize(22);
                    num = 13;
                }

                for (var i = 0; i < num; i++) {
                    var item = i == 0 ? changyong_item : changyong_item.clone();
                    if (i != 0)
                        changyong_list.insertCustomItem(item, i);
                    if(MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || 
                        MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ ||
                        MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP ||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ ||
                        MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP)
                    {
                        ItemsBind_yongzhou(item, i);
                    } else {
                        ItemsBind(item, i);
                    }
                }

                function emojiEvent(sender, eType) {
                    if (eType == ccui.Widget.TOUCH_ENDED) {
                        var itag = sender.getTag();
                        emojiAction(itag);
                    }
                }

                var temp = _back.getChildByName("emoji_list_new");
                temp && temp.setVisible(false);

                var emoji_item = emoji_list.getChildByName("item");
                var emoji_names = ["bb1", "daku1", "fennu1", "guzhang1", "kaiqiang1", "kaixin1", "keshui1", "pp1", "tuxue1"];

                var col = 3;
                var gap = 15;

                for (var i = 0; i < 5; i++) {
                    var item = i == 0 ? emoji_item : emoji_item.clone();
                    if (i != 0)
                        emoji_list.insertCustomItem(item, i);

                    for (var j = 0; j < col; j++) {
                        var index = i * col + j;

                        var emoji = item.getChildByName("emoji" + j);
                        if (emoji && index <= emoji_names.length - 1) {
                            var sprite = new cc.Sprite("chat/" + emoji_names[index] + ".png");
                            //emoji.loadTexture("chat/" + emoji_names[index] + ".png");
                            //emoji.ignoreContentAdaptWithSize(true);
                            sprite.setScale((emoji.getContentSize().width - gap) / sprite.getContentSize().width);
                            sprite.setPosition(emoji.getContentSize().width / 2, emoji.getContentSize().height / 2);
                            emoji.addChild(sprite);
                            emoji.setTag(index);
                            emoji.addTouchEventListener(emojiEvent, this);
                        } else {
                            emoji.setVisible(false);
                        }
                    }
                }

            }




            MjClient.playerChatLayer = this;
            return true;
        }
    });

    window.ChatLayer_new = cc.Layer.extend({
        editBoxEditingDidBegin: function(editBox) {
            cc.log("editBox  DidBegin !");
            if (this._untouchLayer && cc.sys.isObjectValid(this._untouchLayer))
            {
                this._untouchLayer.removeFromParent();
                delete this._untouchLayer;
            }
            this._untouchLayer = new ClickCloseLayer();
            MjClient.Scene.addChild(this._untouchLayer);
        },
        editBoxEditingDidEnd: function(editBox) {
            cc.log("editBox  DidEnd !");
        },
        editBoxTextChanged: function(editBox, text) {
            cc.log("editBox , TextChanged, text: " + text);
        },
        editBoxReturn: function(editBox) {
            cc.log("editBox  was returned !");
        },

        ctor: function() {
            this._super();
            var chatui = ccs.load("PlayerChat.json");
            cc.log("------sking====1=======发送消息");
            //chatui.node.setScale(1.2);
            //BindUiAndLogic(chatui.node,this.jsBind);
            this.addChild(chatui.node);
            playerChatLayer = this;
            /*
                changed by sking
             */
            var _block = chatui.node.getChildByName("block");
            _block.setTouchEnabled(true);
            setWgtLayout(_block,[1,1],[0.5,0.5],[0,0],true);
            _block.addTouchEventListener(function(sender,Type){
                switch (Type)
                {
                    case ccui.Widget.TOUCH_ENDED:
                        if(playerChatLayer)
                        {
                            playerChatLayer.removeFromParent(true);
                            playerChatLayer = null;
                        }
                        break;
                    default :
                        break;
                }
            },this);

            var _back = chatui.node.getChildByName("back");
            var inputimg = _back.getChildByName("inputimg");

            // 山西app特殊处理
            if(isJinZhongAPPType() || 
                MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP ||
                MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || 
                MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ ||
                MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
                MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP ||
                MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ ||
                MjClient.getAppType() == MjClient.APP_TYPE.AYGUIZHOUMJ ||
                MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP)
            {
                var sca = isIPad() ? 0.5 : 0.75;
                if(isJinZhongAPPType()){
                    sca = isIPad() ? 0.4861 : 0.7361;
                    setWgtLayout(_back,[1,sca],[0.8061,0.5],[0,0]);
                }else{
                    setWgtLayout(_back,[1,sca],[0.82,0.5],[0,0]);
                }
                input = new cc.EditBox(inputimg.getContentSize(), new cc.Scale9Sprite());
                input.setFontColor(cc.color(0x8C, 0xA9, 0xA2));
                input.setPlaceholderFontColor(cc.color(0x8C, 0xA9, 0xA2));
                input.setMaxLength(20);
                input.setFontSize(24);
                input.setInputFlag(cc.EDITBOX_INPUT_FLAG_INITIAL_CAPS_ALL_CHARACTERS);
                input.setInputMode(cc.EDITBOX_INPUT_MODE_ANY);
                input.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
                input.setPlaceHolder("点击这里输入......");
                input.setPlaceholderFontSize(24);
                input.setAnchorPoint(cc.p(0, 0.5));
                input.setPosition(20, 18);
                input.setDelegate(this);
                inputimg.addChild(input);

            }else{
                if(MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ){
                    setWgtLayout(_back,[1,1],[0.5,0.5],[0,0],false);
                    if(isIPhoneX()){//靠右
                        var rate = MjClient.size.width / _back.width;
                        dx = _back.width * (rate - _back.scale);
                        _back.x += dx/2;
                    }
                }else{
                    setWgtLayout(_back,[0,0.736],[0.5,0.5],[0,0]);
                }
                input = new cc.EditBox(inputimg.getContentSize(), new cc.Scale9Sprite());
                input.setFontColor(cc.color(0x7E, 0x5C, 0x45));
                input.setPlaceholderFontColor(cc.color(128, 128, 128));
                input.setMaxLength(20);
                input.setFontSize(34);
                input.setInputFlag(cc.EDITBOX_INPUT_FLAG_INITIAL_CAPS_ALL_CHARACTERS);
                input.setInputMode(cc.EDITBOX_INPUT_MODE_ANY);
                input.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
                input.setPlaceHolder("请输入文字");
                input.setPlaceholderFontSize(28);
                input.setPosition(inputimg.getContentSize().width / 2, inputimg.getContentSize().height / 2);
                input.setDelegate(this);
                inputimg.addChild(input);
            }


            //发送按钮
            var send_btn = _back.getChildByName("send_btn");
            send_btn.addTouchEventListener(function(sender,Type){
                switch (Type)
                {
                    case ccui.Widget.TOUCH_ENDED:
                        console.log("------发送消息");
                        SendChatMessage();
                        break;
                    default :
                        break;
                }
            },this);

            var clubData = getClubInfoInTable();
            if(true || (clubData && clubData.isForbChat)){
                inputimg.setVisible(false);
                send_btn.setVisible(false);
            }

            //常用语列表
            var changyong_list = _back.getChildByName("changyong_list");
            this._listView_changyongyu = changyong_list;

            //表情列表
            var emoji_list = _back.getChildByName("emoji_list");
            emoji_list.visible = true;
            this._listView_biaoqing = emoji_list;

            if (isJinZhongAPPType() || 
                MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP ||
                MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || 
                MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ ||
                MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
                MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP ||
                MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ ||
                MjClient.getAppType() == MjClient.APP_TYPE.AYGUIZHOUMJ ||
                MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP)
            {
                var menu = _back.getChildByName("menu");
                var btnEmoji = menu.getChildByName("btnEmoji");
                var btnChat = menu.getChildByName("btnChat");
                this.emojiList = _back.getChildByName("emoji_list");
                this.changyongList = _back.getChildByName("changyong_list");
                changyong_list = this.changyongList;
                emoji_list = this.emojiList;
                changyong_list.setVisible(false);
                emoji_list.setVisible(true);

                btnEmoji.setEnabled(false);
                btnChat.setEnabled(true);

                btnEmoji.addTouchEventListener(function (sender, type) {
                    switch (type){
                        case ccui.Widget.TOUCH_ENDED:
                            if (MjClient.data.sData && MjClient.data.sData.tData && MjClient.data.sData.tData.fieldId)
                                MjClient.native.umengEvent4CountWithProperty("Jinbichang_Fangjiannei_Duihua_Biaoqing", {uid:SelfUid()});
                            else
                                MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Duihua_Biaoqing", {uid:SelfUid()});

                            this.emojiList.setVisible(true);
                            this.changyongList.setVisible(false);

                            btnEmoji.setEnabled(false);
                            btnChat.setEnabled(true);
                    }
                }, this);

                btnChat.addTouchEventListener(function (sender, type) {
                    switch (type){
                        case ccui.Widget.TOUCH_ENDED:
                            if (MjClient.data.sData && MjClient.data.sData.tData && MjClient.data.sData.tData.fieldId)
                                MjClient.native.umengEvent4CountWithProperty("Jinbichang_Fangjiannei_Duihua_Changyongyu", {uid:SelfUid()});
                            else
                                MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Duihua_Changyongyu", {uid:SelfUid()});
                                
                            this.emojiList.setVisible(false);
                            this.changyongList.setVisible(true);

                            btnEmoji.setEnabled(true);
                            btnChat.setEnabled(false);
                    }
                }, this);
            }


            var changyong_item = changyong_list.getChildByName("item");
            var num = 9;
            var emoji_names = ["bb1", "daku1", "fennu1", "guzhang1", "kaiqiang1", "kaixin1", "keshui1", "pp1", "tuxue1"];


            if(MjClient.gameType == MjClient.GAME_TYPE.DAO_ZHOU_MJ ||
                (MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ &&
                (MjClient.gameType == MjClient.GAME_TYPE.XIANG_XIANG_HONG_ZHONG
                || MjClient.gameType == MjClient.GAME_TYPE.TY_ZHUANZHUAN)))
            {
                var voiceType = util.localStorageEncrypt.getNumberItem(MjClient.KEY_voiceType, 0);
                if (voiceType == 1) {
                    num = 10;
                }
            }

            if (isJinZhongAPPType())
            {
                emoji_names = ["bb1", "daku1", "fennu1", "guzhang1", "kaiqiang1", "kaixin1", "keshui1", "pp1", "tuxue1", "caishen1", "xishou1"];
                
                var pl = MjClient.data.pinfo;
                if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.MA_JIANG) { // 麻将显示快捷语音聊天条数
                    if (pl && pl.sex == 1) { // 男
                        num = 17;
                    } else { // 女
                        num = 18;
                    }
                } else { // 非麻将显示快捷语音聊天条数
                    if (pl && pl.sex == 1) { // 男
                        num = 16;
                    } else { // 女
                        num = 14;
                    }
                }
            }

            if (MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP
                || MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ) {
                var pl = MjClient.data.pinfo;
                if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.MA_JIANG
                    || GameClass[MjClient.gameType] == MjClient.GAME_CLASS.CHANG_PAI) { // 麻将/长牌显示快捷语音聊天条数
                    if (pl && pl.sex == 1) { // 男
                        num = 17;
                    } else { // 女
                        num = 18;
                    }
                } else { // 非麻将显示快捷语音聊天条数
                    if (pl && pl.sex == 1) { // 男
                        num = 16;
                    } else { // 女
                        num = 14;
                    }
                }
            }

            if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ 
                || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ) {
                num = 13;
                if (MjClient.gameType == MjClient.GAME_TYPE.YY_AN_HUA_PAO_HU_ZI) {
                    num = 14;
                }

                if (MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_NIU_SHI_BIE) {
                    num = 12;
                }

                if (MjClient.gameType == MjClient.GAME_TYPE.ZHU_ZHOU_DA_MA_ZI) {
                    num = 24;
                }

                if(MjClient.gameType === MjClient.GAME_TYPE.TAO_JIANG_MA_JIANG && getCurrentVoiceType() == 1){
                    num = 14;
                }
                if(MjClient.gameType == MjClient.GAME_TYPE.YI_YANG_MA_JIANG && getCurrentVoiceType() == 1){
                    num = 14;
                }
            }
            if (MjClient.gameType == MjClient.GAME_TYPE.XIN_SI_YANG){
                num = 11;
            }
            for (var i = 0; i < num; i ++)
            {
                var item = i == 0 ? changyong_item :changyong_item.clone();
                if (i != 0)
                    changyong_list.insertCustomItem(item,i);
                    if(MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || 
                        MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ ||
                        MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP ||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ ||
                        MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP)
                    {
                        ItemsBind_yongzhou(item, i);
                    } else {
                        ItemsBind(item, i);
                    }
            }

            function emojiEvent(sender,eType)
            {
                if(eType ==  ccui.Widget.TOUCH_ENDED)
                {
                    var itag = sender.getTag();
                    emojiAction(itag);
                }
            }

            var temp = _back.getChildByName("emoji_list_new");
            temp && temp.setVisible(false);

            var emoji_item = emoji_list.getChildByName("item");


            var col = 3;
            var gap = 15;

            for (var i = 0; i < 5; i ++) {
                var item = i == 0 ? emoji_item :emoji_item.clone();
                if (i != 0)
                    emoji_list.insertCustomItem(item, i);

                for (var j = 0; j < col; j ++) {
                    var index = i*col + j;

                    var emoji = item.getChildByName("emoji" + j);
                    if (emoji && index <= emoji_names.length - 1)
                    {
                        var sprite = new cc.Sprite("chat/" + emoji_names[index] + ".png");
                        //emoji.loadTexture("chat/" + emoji_names[index] + ".png");
                        //emoji.ignoreContentAdaptWithSize(true);
                        sprite.setScale((emoji.getContentSize().width-gap)/sprite.getContentSize().width);
                        sprite.setPosition(emoji.getContentSize().width/2, emoji.getContentSize().height/2);
                        emoji.addChild(sprite);
                        emoji.setTag(index);
                        emoji.addTouchEventListener(emojiEvent,this);
                    }
                    else
                    {
                        emoji.setVisible(false);
                    }
                }
            }

            if(MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ  || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ){
                //岳阳ui的大改了
                var that = this;
                this._listView_guizubiaoqing = _back.getChildByName("guizu_emoji_list");
                this._listView_guizubiaoqing.initFunc = function(){
                    that.showGuizuEmoji();
                }
                this._btn_biaoqingba = _back.getChildByName("Button_biaoqingbao");
                this._btn_changyongyu = _back.getChildByName("Button_changyongyu");
                this._btn_guizubiaoqing = _back.getChildByName("Button_guizubiaoqing");
                this._panelBtns = [this._btn_biaoqingba,this._btn_changyongyu,this._btn_guizubiaoqing];
                for(var i = 0; i < this._panelBtns.length; i++){
                    this._panelBtns[i].tag = i;
                    this._panelBtns[i].addTouchEventListener(function(sender,type){
                        if(type == 2){
                            that.showPanel(sender.tag);
                        }
                    })
                }

                this._panels = [this._listView_biaoqing,this._listView_changyongyu,this._listView_guizubiaoqing];

                var clubData = getClubInfoInTable();
                // if(!clubData || !clubData.isForbChat){
                //     this._listView_changyongyu._bindViews = [inputimg,send_btn];
                // }
                this._showndex = util.localStorageEncrypt.getNumberItem("chatTabIndex", 0);
                this.showPanel(this._showndex);

                var endP = cc.p(_back.x,_back.y);
                _back.x += 1280;
                _back.runAction(cc.moveTo(0.3,endP));
            }
            MjClient.playerChatLayer = this;
            return true;
        },
        showGuizuEmoji:function(){
            var that = this;
            if(this._initGuizuEmoji){
                return;
            }
            this._initGuizuEmoji = true;
            this.setUserEmojiList = function(){
                var col = 3;
                var gap = 0;
                var emoji_item = this._listView_guizubiaoqing.getChildByName("item");
                var rowCount = parseInt(this._userEmojiDatas.length/col) + ((this._userEmojiDatas.length%col) == 0 ? 0 : 1);
                for (var i = 0; i < rowCount; i ++) {
                    var item = i == 0 ? emoji_item :emoji_item.clone();
                    if (i != 0){
                        this._listView_guizubiaoqing.insertCustomItem(item, i);
                    }
                    for (var j = 0; j < col; j ++) {
                        var index = i*col + j;
                        var emoji = item.getChildByName("emoji" + j);
                        if (emoji && index < this._userEmojiDatas.length){
                            var sprite = new cc.Sprite("userInfo_3.0/zhuangBan/chat_emoji/"+this._userEmojiDatas[index].aliasId+".png");
                            sprite.setScale((emoji.getContentSize().width-gap)/sprite.getContentSize().width);
                            sprite.setPosition(emoji.getContentSize().width/2, emoji.getContentSize().height/2);
                            emoji.addChild(sprite);
                            var length = this._userEmojiDatas[index].aliasId.length;
                            var id = 0;
                            while(!isNaN(Number(this._userEmojiDatas[index].aliasId[length-1]))){
                                length--;
                            }
                            id = this._userEmojiDatas[index].aliasId.substring(length,this._userEmojiDatas[index].aliasId.length);
                            id = parseInt(id);
                            emoji.setTag(10000+id);
                            if(this._userEmojiDatas[index].isLocked === 0){
                                emoji.data = this._userEmojiDatas[index];
                                emoji.addTouchEventListener(function(sender,type){
                                    if(type == 2){
                                        if(sender.data.unlockType == 51){
                                            MjClient.showToast("需乐币解锁");
                                        }else if(sender.data.unlockType == 52){
                                            MjClient.showToast("参与活动解锁");
                                        }else if(sender.data.unlockType == 53){
                                            MjClient.showToast("购买礼包解锁");
                                        }else{
                                            MjClient.showToast("贵族" + sender.data.unlockType + "解锁");
                                        }
                                        
                                    }
                                },this);
                            }else{
                                emoji.addTouchEventListener(function(sender,type){
                                    if(type == 2){
                                        emojiAction(sender.tag);
                                    }
                                },this);
                            }
                            
                        }
                        else{
                            emoji.setVisible(false);
                        }
                    }
                }
            };
            MjClient.block();
            MjClient.gamenet.request("pkplayer.handler.userDressLTBQList",{length:200},function(rtn) {
                MjClient.unblock();
                if (rtn.code == 0){
                    that._userEmojiDatas = rtn.data ? rtn.data:[];
                    that.setUserEmojiList();
                }
            });
        },
        showPanel:function(index){
            this._showndex = index;
            util.localStorageEncrypt.setNumberItem("chatTabIndex", index);
            for(var i = 0; i < this._panelBtns.length; i++){
                if(index == i){
                    this._panelBtns[i].setBright(false);
                    this._panels[i].visible = true;
                    if(this._panels[i]._bindViews){
                        for(var j = 0; j < this._panels[i]._bindViews.length; j++){
                            this._panels[i]._bindViews[j].visible = true;
                        }
                    }
                    if(this._panels[i].initFunc){
                        this._panels[i].initFunc();
                    }
                }else{
                    this._panelBtns[i].setBright(true);
                    this._panels[i].visible = false;
                    if(this._panels[i]._bindViews){
                        for(var j = 0; j < this._panels[i]._bindViews.length; j++){
                            this._panels[i]._bindViews[j].visible = false;
                        }
                    }
                }
            }
        },
    });

    //以下APP用新UI
    if(isJinZhongAPPType() ||
       MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ ||
       MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP ||
       MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ ||
       MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP ||
       MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
       MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ ||
       MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ ||
       MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ ||
       MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP ||
       MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ ||
        MjClient.getAppType() == MjClient.APP_TYPE.AYGUIZHOUMJ ||
       MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP ||
       MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ)
    {
        window.ChatLayer = window.ChatLayer_new;
    }

    var ClickCloseLayer = cc.Layer.extend({
        ctor:function (msg) {
            this._super();
            if (MjClient.isUseUIv3 && MjClient.isUseUIv3() && MjClient.isFriendCardUseUIv3())
                var msgui = ccs.load("PopUpMsg_3.0.json");
            else
                var msgui = ccs.load("PopUpMsg.json");
            this.addChild(msgui.node);

            var _block = msgui.node.getChildByName("block");
            setWgtLayout(_block,[1,1],[0.5,0.5],[0,0],true);
            _block.setOpacity(0);
            _block.setTouchEnabled(true);
            _block.addTouchEventListener(function(sender, Type) {
                switch (Type) {
                    case ccui.Widget.TOUCH_ENDED:
                        this.removeFromParent();
                        break;
                    default:
                        break;
                }
            }, this);

            var _back = msgui.node.getChildByName("back");
            setWgtLayout(_back,[0.64,0.78],[0.5,0.5],[0,0]);
            _back.setVisible(false);

            return true;
        }

    });

})();