// 设置圆形裁剪头像 (由于图片资源不统一，目前只用于岳阳app)
function CircularCuttingHeadImg(node, pl)
{
    if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP
        || MjClient.getAppType() === MjClient.APP_TYPE.HUBEIMJ
        || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ
        || MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_PENG_HU
        || MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG
        || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ
        || MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP
        || MjClient.getAppType() == MjClient.APP_TYPE.AYGUIZHOUMJ) {
        var head = node;
        var url = pl.info.headimgurl;
        if(!url) url = "png/default_headpic.png";
        cc.loader.loadImg(url, {isCrossOrigin : true}, function(err, texture)
        {
            if(!err && texture && cc.sys.isObjectValid(head))
            {
                var clippingNode = new cc.ClippingNode();
                var mask = new cc.Sprite("gameOver/gameOver_headBg2.png");
                clippingNode.setAlphaThreshold(0);
                clippingNode.setStencil(mask);
                var img = new cc.Sprite(texture);
                img.setScale(mask.getContentSize().width / img.getContentSize().width);
                clippingNode.addChild(img);
                clippingNode.setPosition(head.getContentSize().width / 2, head.getContentSize().height / 2);
                //遮罩框
                var hideblock = new cc.Sprite("gameOver/gameOver_headBg3.png");
                hideblock.setPosition(head.getContentSize().width / 2, head.getContentSize().height / 2);
                head.addChild(clippingNode);
                head.addChild(hideblock);
            }
        });
    }
}

// 添加复制按钮功能
function addCopyBtnToGameOverLayer(node)
{
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    // 牌友联盟江苏麻将 显示复制按钮
    if((MjClient.getAppType() != MjClient.APP_TYPE.QXJSMJ &&
        MjClient.getAppType() != MjClient.APP_TYPE.QXXZMJ &&
        MjClient.getAppType() != MjClient.APP_TYPE.QXNTQP &&
        MjClient.getAppType() != MjClient.APP_TYPE.QXHAMJ &&
        MjClient.getAppType() != MjClient.APP_TYPE.BDHYZP &&
        MjClient.getAppType() != MjClient.APP_TYPE.QXYYQP &&
        MjClient.getAppType() != MjClient.APP_TYPE.HUBEIMJ &&
        MjClient.getAppType() != MjClient.APP_TYPE.YLHUNANMJ &&
        MjClient.getAppType() != MjClient.APP_TYPE.QXYZQP &&
        MjClient.getAppType() != MjClient.APP_TYPE.QXSYDTZ &&
        MjClient.getAppType() != MjClient.APP_TYPE.HUNANWANGWANG &&
        MjClient.getAppType() != MjClient.APP_TYPE.QXXXGHZ &&
        MjClient.getAppType() != MjClient.APP_TYPE.BDHYZP &&
        MjClient.gameType != MjClient.GAME_TYPE.DOU_DI_ZHU_GZ &&
        MjClient.getAppType() != MjClient.APP_TYPE.AYGUIZHOUMJ &&
        MjClient.getAppType() != MjClient.APP_TYPE.QXLYQP &&
        !isJinZhongAPPType()
        ) || tData.matchId){
        cc.log('warn btnCopy is not show in apptype:', MjClient.getAppType());
        return;
    }

    var _back = node.getChildByName("back");
    var _btnCopy =  _back.getChildByName("btnCopy");

    if(!cc.sys.isObjectValid(_btnCopy)) {
        cc.log('error btnCopy is not found');
        return;
    }

    var _share =  _back.getChildByName("share");
    var _btnReplay =  _back.getChildByName("btnReplay");
    var copytext = "\n";
    _btnCopy.visible = true;

    if (MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_ZERO) 
    {
        _btnCopy.visible = false;
        var midx = _btnCopy.getParent().width / 2
        _btnReplay.x = midx - 140;
        _share.x = midx + 140;
    }
    var clubInfoTable = getClubInfoInTable();
    if(clubInfoTable) {
        var midx = _btnCopy.getParent().width / 2
        _btnCopy.x = midx - 80;
        _share.x = midx + 200;
        if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_PENG_HU || 
            MjClient.gameType == MjClient.GAME_TYPE.YY_AN_HUA_PAO_HU_ZI || 
            MjClient.gameType == MjClient.GAME_TYPE.NING_XIANG_PAO_HU_ZI || 
            MjClient.gameType == MjClient.GAME_TYPE.CHEN_ZHOU_ZI_PAI || 
            MjClient.gameType == MjClient.GAME_TYPE.GUI_YANG_ZI_PAI ||
            MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_WAI_HU_ZI ||
            MjClient.gameType == MjClient.GAME_TYPE.YI_YANG_WAI_HU_ZI ||
            MjClient.gameType == MjClient.GAME_TYPE.NAN_XIAN_GUI_HU_ZI ||
            MjClient.gameType == MjClient.GAME_TYPE.YUAN_JIANG_GUI_HU_ZI ||
            MjClient.gameType == MjClient.GAME_TYPE.CHANG_DE_PAO_HU_ZI ||
            MjClient.gameType == MjClient.GAME_TYPE.YUAN_LING_PAO_HU_ZI ||
            MjClient.gameType == MjClient.GAME_TYPE.SHI_MEN_PAO_HU_ZI ||
            MjClient.gameType == MjClient.GAME_TYPE.CHEN_ZHOU_MAO_HU_ZI||
            MjClient.gameType == MjClient.GAME_TYPE.HAN_SHOU_PAO_HU_ZI ||
            MjClient.gameType == MjClient.GAME_TYPE.DA_TONG_ZHA_GU_ZI ||
            isJinZhongAPPType() || 
            MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP || 
            ((MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ || MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG) &&
                MjClient.gameType != MjClient.GAME_TYPE.DA_TONG_ZI_SHAO_YANG || 
                MjClient.gameType != MjClient.GAME_TYPE.LONG_HUI_BA_ZHA_DAN || 
                MjClient.gameType != MjClient.GAME_TYPE.BAN_BIAN_TIAN_ZHA)){
            _btnCopy.x = midx - 140;
            _share.x = midx + 140;
        }
    } else if(GameClass[MjClient.gameType] == MjClient.GAME_CLASS.DOU_DI_ZHU && 
        MjClient.getAppType() != MjClient.APP_TYPE.QXYYQP &&
        MjClient.getAppType() != MjClient.APP_TYPE.HUBEIMJ &&
        MjClient.getAppType() != MjClient.APP_TYPE.YLHUNANMJ && 
        MjClient.getAppType() != MjClient.APP_TYPE.AYGUIZHOUMJ &&
        !isJinZhongAPPType()) {
        var offX = 160;
        _share.x += offX;
        _btnReplay.x += offX - 30
        cc.log("DOU_DI_ZHU");
        if (MjClient.gameType == MjClient.GAME_TYPE.DA_TONG_ZHA_GU_ZI) 
        {
            var midx = _btnCopy.getParent().width / 2
            _btnCopy.x = midx - 140;
            _share.x = midx + 140;
        }
    }
    else if(MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ)
    {
        _btnCopy.x = 256.53;
        _share.x = 547.53;
        _btnReplay.x = 850.21;
    }else if(MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ ||  MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ ||
        MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_GZ || MjClient.getAppType() == MjClient.APP_TYPE.AYGUIZHOUMJ){

    }else if(isYongZhouProject()){
        if (MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP) {
            _share.x = 763.99;
        }else if(  MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP ||
            ((MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ || MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG) &&
                MjClient.gameType != MjClient.GAME_TYPE.DA_TONG_ZI_SHAO_YANG || 
                MjClient.gameType != MjClient.GAME_TYPE.LONG_HUI_BA_ZHA_DAN ||  
                MjClient.gameType != MjClient.GAME_TYPE.BAN_BIAN_TIAN_ZHA) ) {
            var midx = _btnCopy.getParent().width / 2
            _btnCopy.x = midx - 140;
            _share.x = midx + 140;
        }
    }
    else if (MjClient.gameType == MjClient.GAME_TYPE.PAO_DE_KUAI_JZ ||
        // MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_JZ ||
        MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_GZ ||
        // MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_LV_LIANG || 
        MjClient.gameType == MjClient.GAME_TYPE.LV_LIANG_DA_QI || 
        // MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_LIN_FEN || 
        // MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_XIN_ZHOU ||
        MjClient.gameType == MjClient.GAME_TYPE.XIN_ZHOU_SAN_DA_ER || 
        MjClient.gameType == MjClient.GAME_TYPE.SHAN_XI_GAN_DENG_YAN) 
    {
        var midx = _btnCopy.getParent().width / 2
        _btnCopy.x = midx - 140;
        _share.x = midx + 140;
    }
    else if (isJinZhongAPPType() ) 
    {
        cc.log("isJinZhongAPPType");
        var midx = _btnCopy.getParent().width / 2
        _btnCopy.x = midx - 140;
        _share.x = midx + 140;
    }
    else
    {
        cc.log("else");
        var offX = 140;
        _share.x += offX;
        _btnReplay.x += offX;
    }

    // 亲友圈玩法名称
    if (clubInfoTable && clubInfoTable.ruleName) {
        var ruleName = unescape(clubInfoTable.ruleName);
        copytext += ruleName + "\n";
    }

    // 房间id
    var strTableid = '【' + tData.tableid + '】 ';
    // 玩法名称
    var strRoomName = GameCnName[MjClient.gameType] + ' ';
    // 局数
    var roundNumPre = tData.roundNumPre || tData.roundNum;
    var factRoundNum = tData.roundAll - roundNumPre + 1;
    factRoundNum = factRoundNum > tData.roundAll ? tData.roundAll : factRoundNum;
    var strRoundNum = tData.roundAll < 50 ? factRoundNum + "/" + tData.roundAll + "局" : "";
    copytext += strTableid + strRoomName + strRoundNum + '\n';
    // 日期
    var strDate = MjClient.dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss');
    copytext += strDate + '\n';

    copytext += "=====  战绩  ===== \n"

    var sData = MjClient.data.sData;
    if (isYongZhouProject()) {
        (function() {
            if (MjClient.gameType == MjClient.GAME_TYPE.DA_TONG_ZI_SHAO_YANG || MjClient.gameType == MjClient.GAME_TYPE.LONG_HUI_BA_ZHA_DAN) {
                if (Object.keys(sData.teams).length > 0) { // 4人分组
                    for (var tid in sData.teams) {
                        var team = sData.teams[tid];
                        var name = getNewName(unescape(sData.players[team.uids[0]].info.nickname)) + " " + getNewName(unescape(sData.players[team.uids[1]].info.nickname));
                        copytext += "【" + name + "】";
                        copytext += '\n';
                        copytext += (team.windif > 0 ? '战绩: +' : '战绩: ') + team.windif;
                        copytext += '\n';
                    }

                    return;
                }
            }

            var key = "winall";
            if (MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_BO_PI) {
                key = "winScore";
            } else if (MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA || MjClient.gameType == MjClient.GAME_TYPE.XIANG_XIANG_GAO_HU_ZI ||
                MjClient.gameType == MjClient.GAME_TYPE.LOU_DI_FANG_PAO_FA) {
                key = "fenshu";
            } else if (MjClient.gameType == MjClient.GAME_TYPE.DA_TONG_ZI_SHAO_YANG || MjClient.gameType == MjClient.GAME_TYPE.LONG_HUI_BA_ZHA_DAN) {
                key = "windif";
            }

            //计算所有人数据
            var MaxWinAll = 0;
            for (var uid in sData.players) {
                MaxWinAll = Math.max(MaxWinAll, sData.players[uid][key]);
            }

            for (var uid in sData.players) {
                var pl_data = MjClient.data.sData.players[uid];
                var name = getNewName(unescape(pl_data.info.nickname));
                var winall = pl_data[key];
                copytext += "【" + name + "】";

                if (MaxWinAll != 0 && MaxWinAll == winall) copytext += ' 大赢家';

                copytext += '\n';
                copytext += (winall > 0 ? '战绩: +' : '战绩: ') + winall;
                copytext += '\n';
            }
        }());
    }else{
        var MaxWinAll = 0;
        //计算所有人数据
        for (var uid in sData.players) {
            var pi = sData.players[uid];
            if (pi) {
                MaxWinAll = MaxWinAll > pi.winall ? MaxWinAll : pi.winall;
            }
        }
        // cc.log(" ====== MjClient.data.sData  ",JSON.stringify(MjClient.data.sData));
        for (var i in sData.players) {
            var pl_data = MjClient.data.sData.players[i];
            var name = getNewName(unescape(pl_data.info.nickname));
            copytext += "【" + name + "】";

            if (MaxWinAll != 0 && MaxWinAll == pl_data.winall) copytext += ' 大赢家';

            copytext += '\n';
            if (sData.tData.gameType == MjClient.GAME_TYPE.YUE_YANG_YUAN_JIANG_QIAN_FEN) {
                if (pl_data.roomStatistics) {
                    copytext += '战绩: +' + pl_data.roomStatistics[5];
                }

            } else {
                if (pl_data.winall > 0) {
                    copytext += '战绩: +' + pl_data.winall;
                } else if (pl_data.winall < 0) {
                    copytext += '战绩: ' + pl_data.winall;
                } else {
                    copytext += '战绩: ' + pl_data.winall;
                }
            }

            copytext += '\n';
        }
    }
    
    var clubInfoTable = getClubInfoInTable();
    // cc.log(" ====== lms -- XXXXX --",playLogInfoView,JSON.stringify(clubInfoTable))
    if (clubInfoTable && clubInfoTable.clubId && MjClient.friendCard_replay && !playLogInfoView) {
        _btnCopy.loadTextureNormal("gameOver/btn_replay_n.png");
        _btnCopy.loadTexturePressed("gameOver/btn_replay_s.png");
    } 

    var isAddURL = false;
    _btnCopy.addTouchEventListener(function (sender, Type) {
        switch (Type) {
            case ccui.Widget.TOUCH_ENDED:
                var clubInfoTable = getClubInfoInTable();
                // cc.log(" ====== lms -- YYYY --",JSON.stringify(clubInfoTable))
                if (clubInfoTable && clubInfoTable.clubId && MjClient.friendCard_replay && !playLogInfoView) {
                    clubReplay(clubInfoTable.clubId, clubInfoTable.ruleId, MjClient.gameType);
                    return;
                }
                if (!isAddURL && (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP
                    || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ
                    ||MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ
                    || MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG
                    || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ
                    || MjClient.getAppType() == MjClient.APP_TYPE.TXJINZHONGMJ
                    || MjClient.getAppType() == MjClient.APP_TYPE.DQSHANXIMJ
                )) {
                    MjClient.block();
                    MjClient.gamenet.request("pkplayer.handler.openBrowser", { type: 10, creator: tData.owner, roomNum: tData.tableid, time: sData.serverTime }, function (rtn) {
                        MjClient.unblock();
                        if (rtn.code == 0 && rtn.data)
                            copytext += "\n" + rtn.data + "\n";

                        isAddURL = true;
                        cc.log(copytext)
                        MjClient.showToast('战绩已复制到粘贴板,快去分享吧');
                        MjClient.native.doCopyToPasteBoard(copytext);
                        MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Zhanjifuzhi", { uid: SelfUid(), gameType: MjClient.gameType });
                    });
                }
                else {
                    cc.log(copytext)
                    MjClient.showToast('战绩已复制到粘贴板,快去分享吧');
                    MjClient.native.doCopyToPasteBoard(copytext);
                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Dajiesuanjiemian_Fuzhizhanji", { uid: SelfUid(), gameType: MjClient.gameType });
                }
                break;
            default:
                break;
        }
    }, this);
}

function copyPlayLogResult(item) {
    cc.log("item=" + JSON.stringify(item));

    var copytext = "\n";

    // 亲友圈玩法名称
    if (item.ruleName) {
        var ruleName = unescape(item.ruleName);
        copytext += ruleName + "\n";
    }

    // 房间id
    var strTableid = '【' + item.tableid + '】 ';
    // 玩法名称
    var strRoomName = GameCnName[item.gametype] + ' ';
    // 局数
    var strRoundNum = item.roundNum && item.roundNum < 40 && item.roundBeen ? item.roundBeen + "/" + item.roundNum  + "局" : "";

    copytext += strTableid + strRoomName + strRoundNum + '\n';

    // 日期
    copytext += item.now + '\n';

    copytext += "=====  战绩  ===== \n"

    var MaxWinAll = 0;
    //计算所有人数据
    for (var uid in item.players) {
        var pi = item.players[uid];
        if (pi) {
            MaxWinAll = MaxWinAll > pi.winall ? MaxWinAll : pi.winall;
        }
    }

    for (var i in item.players) {
        var pl_data = item.players[i];
        var name = getNewName(unescape(pl_data.nickname));
        copytext += "【" + name + "】";

        if (MaxWinAll != 0 && MaxWinAll == pl_data.winall) copytext += ' 大赢家';

        copytext += '\n';
        if (pl_data.winall > 0) {
            copytext += '战绩: +' + pl_data.winall;
        } else if (pl_data.winall < 0) {
            copytext += '战绩: ' + pl_data.winall;
        } else {
            copytext += '战绩: ' + pl_data.winall;
        }
        copytext += '\n';
    }

    cc.log(copytext)
    MjClient.showToast('战绩已复制到粘贴板,快去分享吧');
    MjClient.native.doCopyToPasteBoard(copytext);
}

function copyPlayLogResult_friendCard(item) {
    cc.log("item=" + JSON.stringify(item));

    var copytext = "\n";

    // 亲友圈玩法名称
    if (item.ruleName) {
        var ruleName = unescape(item.ruleName);
        copytext += ruleName + "\n";
    }

    // 房间id
    var strTableid = '【' + item.roomNum + '】 ';
    // 玩法名称
    var strRoomName = GameCnName[item.gameType] + ' ';
    // 局数
    var strRoundNum = item.roundNum && item.roundNum < 40 && item.roundBeen ? item.roundBeen + "/" + item.roundNum  + "局" : "";

    copytext += strTableid + strRoomName + strRoundNum + '\n';

    // 日期
    copytext += item.showTime + '\n';

    copytext += "=====  战绩  ===== \n";

    var MaxWinAll = 0;
    //计算所有人数据
    for (var uid in item.players) {
        var pi = item.players[uid];
        if (pi) {
            MaxWinAll = MaxWinAll > pi.score ? MaxWinAll : pi.score;
        }
    }

    for (var i in item.players) {
        var pl_data = item.players[i];
        var name = getNewName(unescape(pl_data.nickname));
        copytext += "【" + name + "】";

        if (MaxWinAll != 0 && MaxWinAll == pl_data.score) copytext += ' 大赢家';

        copytext += '\n';
        if (pl_data.score > 0) {
            copytext += '战绩: +' + pl_data.score;
        } else if (pl_data.score < 0) {
            copytext += '战绩: ' + pl_data.score;
        } else {
            copytext += '战绩: ' + pl_data.score;
        }
        copytext += '\n';
    }

    cc.log(copytext)
    MjClient.showToast('战绩已复制到粘贴板,快去分享吧');
    MjClient.native.doCopyToPasteBoard(copytext);
}

//俱乐部房卡模式 添加房卡
function AddFangKaIcon(sData, node, tData, pl, MaxWinAll, MaxWinPlayer,  MaxloseAll, MaxlosePlayer, pos, para) {

    //无效房间 或者 非房卡模式
    if ( !tData.isValidTable || !tData.fangkaSource || MaxWinAll == 0) {
        return ;
    }

    //旺旺 暂时屏蔽
    if(MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG){
        return;
    }


    //外面 传进来的字段 不一定是对的 再次进行校准
    var MaxWinAll=0;
    var MaxlosePlayer = null;
    var MaxWinPlayer = null;
    var MaxloseAll = 999999999;

    var key = "winall";
    if (MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_BO_PI || MjClient.gameType == MjClient.GAME_TYPE.DA_ZI_BO_PI) {
        key = "winScore";
    } else if (MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA || MjClient.gameType == MjClient.GAME_TYPE.XIANG_XIANG_GAO_HU_ZI ||
        MjClient.gameType == MjClient.GAME_TYPE.LOU_DI_FANG_PAO_FA) {
        key = "fenshu";
    } else if (MjClient.gameType == MjClient.GAME_TYPE.DA_TONG_ZI_SHAO_YANG || MjClient.gameType == MjClient.GAME_TYPE.LONG_HUI_BA_ZHA_DAN) {
        key = "windif";
    }else if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_YUAN_JIANG_QIAN_FEN)
        key = "roomStatistics"
    var _pl_winall= pl[key];
    if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_YUAN_JIANG_QIAN_FEN)
        _pl_winall= pl[key][5];
    cc.log("====== key",key,_pl_winall);
     
    //计算所有人数据
    for (var uid in sData.players) {
        var pi = sData.players[uid];
        if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_YUAN_JIANG_QIAN_FEN){
            if (pi) {
                if (MaxWinAll < pi.roomStatistics[5]) {
                    MaxWinAll = pi.roomStatistics[5];
                    MaxWinPlayer = uid;
    
                } else if (MaxWinAll == pi.roomStatistics[5]) {
                    if (parseInt(uid) < parseInt(MaxWinPlayer)) {
                        MaxWinAll = pi.roomStatistics[5];
                        MaxWinPlayer = uid;
                    }
                }
                if (pi.roomStatistics[5] < MaxloseAll) {
                    MaxloseAll = pi.roomStatistics[5];
                    MaxlosePlayer = uid;
                } else if (pi.roomStatistics[5] == MaxloseAll) {
                    if (parseInt(uid) < parseInt(MaxlosePlayer)) {
                        MaxloseAll = pi.roomStatistics[5];
                        MaxlosePlayer = uid;
                    }
                }
            }
        }else{
            if (pi) {
                if (MaxWinAll < pi[key]) {
                    MaxWinAll = pi[key];
                    MaxWinPlayer = uid;
    
                } else if (MaxWinAll == pi[key]) {
                    if (parseInt(uid) < parseInt(MaxWinPlayer)) {
                        MaxWinAll = pi[key];
                        MaxWinPlayer = uid;
                    }
                }
                if (pi[key] < MaxloseAll) {
                    MaxloseAll = pi[key];
                    MaxlosePlayer = uid;
                } else if (pi[key] == MaxloseAll) {
                    if (parseInt(uid) < parseInt(MaxlosePlayer)) {
                        MaxloseAll = pi[key];
                        MaxlosePlayer = uid;
                    }
                }
            }
        }
        
    }


    var sameScorePl = function (score) {
        var plCount = 0;
        for (var uid in sData.players) {
            var pi = sData.players[uid];
            if (pi) {
                var key = "winall";
                if (MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_BO_PI || MjClient.gameType == MjClient.GAME_TYPE.DA_ZI_BO_PI) {
                    key = "winScore";
                } else if (MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA || MjClient.gameType == MjClient.GAME_TYPE.XIANG_XIANG_GAO_HU_ZI ||
                    MjClient.gameType == MjClient.GAME_TYPE.LOU_DI_FANG_PAO_FA) {
                    key = "fenshu";
                } else if (MjClient.gameType == MjClient.GAME_TYPE.DA_TONG_ZI_SHAO_YANG || MjClient.gameType == MjClient.GAME_TYPE.LONG_HUI_BA_ZHA_DAN) {
                    key = "windif";
                } else if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_YUAN_JIANG_QIAN_FEN)
                    key = "roomStatistics"
                if(MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_YUAN_JIANG_QIAN_FEN){
                    if(score == pi[key][5])
                        plCount++;
                }else{
                    if (score == pi[key]) {
                        plCount++;
                    }
                }

            }
        }
        return plCount;
    };
    
    var add_func = function(node, fangkaCount, pos) {
        var _fagnkaIcon = new ccui.ImageView("gameOver/icon_fangka.png");
        _fagnkaIcon.setPosition(pos);
        var _numberLabel = new ccui.Text();
        _numberLabel.setFontSize(26);
        _numberLabel.setString(fangkaCount);
        _numberLabel.setColor(cc.color(0xb6, 0x49, 0x08));
        _numberLabel.setPosition(cc.p(21, 67));
        _fagnkaIcon.addChild(_numberLabel);
        if (para && para.rotate) {
            _fagnkaIcon.setRotation(para.rotate);
        }
        if (para && para.scale) {
            _fagnkaIcon.setScale(para.scale);
        }
        node.addChild(_fagnkaIcon);
    };
    cc.log("======= data pl",MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA,JSON.stringify(pl));
    
    cc.log(" ==tData.fangkaCount, tData.fangkaSource,MaxWinAll,tData.fangkaFree, MaxloseAll,tData.fangkaExtra ",tData.fangkaCount, tData.fangkaSource,MaxWinAll,tData.fangkaFree, MaxloseAll,tData.fangkaExtra)
    if (tData.fangkaCount && tData.fangkaSource == 1 && MaxWinAll >= tData.fangkaFree && MaxWinAll !=0) {
        if (tData.fangkaExtra === 0 && pl.info.uid == MaxWinPlayer) {
            add_func(node, tData.fangkaCount, pos);
        }else if(tData.fangkaExtra && _pl_winall == MaxWinAll){ 
            var plCount =  sameScorePl(MaxWinAll);
            var fangkaCount = Math.ceil(tData.fangkaCount/plCount);
            add_func(node, fangkaCount, pos);
        }
    }else if (tData.fangkaCount && tData.fangkaSource == 2 && MaxWinAll >= tData.fangkaFree && MaxWinAll !=0) {
        if (tData.fangkaExtra === 0 && pl.info.uid == MaxlosePlayer) {
            add_func(node, tData.fangkaCount, pos);
        }else if(tData.fangkaExtra && _pl_winall == MaxloseAll){
            add_func(node, tData.fangkaCount, pos);
            var plCount =  sameScorePl(MaxloseAll);
            var fangkaCount = Math.ceil(tData.fangkaCount/plCount);
            add_func(node, fangkaCount, pos);
        }
    }else if (tData.fangkaCount && tData.fangkaSource == 3 && MaxWinAll >= tData.fangkaFree && MaxWinAll !=0) {
        //AA付 暂时不显示
        // if (tData.fangkaExtra === 0) {
        //     add_func(node, tData.fangkaCount, pos);
        // }else if(pl.info.uid == MaxWinPlayer && tData.fangkaExtra){
        //     add_func(node, tData.fangkaCount + tData.fangkaExtra, pos);
        // }
    }
}


// 特殊玩法 分组 
function AddFangKaIconTeam(node, tData, pl, MaxWinAll, MaxWinPlayer,  MaxloseAll, MaxlosePlayer, pos) {

    //无效房间 或者 非房卡模式
    if ( !tData.isValidTable || !tData.fangkaSource || MaxWinAll == 0) {
        return ;
    }

    //旺旺 暂时屏蔽
    if(MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG){
        return;
    }

    var add_func = function() {
        var _fagnkaIcon = new ccui.ImageView("gameOver/icon_fangka.png");
        _fagnkaIcon.setPosition(pos);
        var _numberLabel = new ccui.Text();
        _numberLabel.setFontSize(26);
        _numberLabel.setString(tData.fangkaCount);
        _numberLabel.setColor(cc.color(0xb6, 0x49, 0x08));
        _numberLabel.setPosition(cc.p(21, 67));
        _fagnkaIcon.addChild(_numberLabel);
        node.addChild(_fagnkaIcon);
    };
    var key = "winall";
    if (MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_BO_PI || MjClient.gameType == MjClient.GAME_TYPE.DA_ZI_BO_PI) {
        key = "winScore";
    } else if (MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_FANG_PAO_FA || MjClient.gameType == MjClient.GAME_TYPE.XIANG_XIANG_GAO_HU_ZI ||
        MjClient.gameType == MjClient.GAME_TYPE.LOU_DI_FANG_PAO_FA) {
        key = "fenshu";
    } else if (MjClient.gameType == MjClient.GAME_TYPE.DA_TONG_ZI_SHAO_YANG || MjClient.gameType == MjClient.GAME_TYPE.LONG_HUI_BA_ZHA_DAN) {
        key = "windif";
    }
    var _pl_winall= pl[key];
    if (tData.fangkaCount && tData.fangkaSource == 1 && MaxWinAll >= tData.fangkaFree) {
        if (tData.fangkaExtra === 0 && pl == MaxWinPlayer) {
            add_func(node, tData.fangkaCount, pos);
        }else if(tData.fangkaExtra && _pl_winall == MaxWinAll){ 
            add_func(node, tData.fangkaCount, pos);
        }
    }else if (tData.fangkaCount && tData.fangkaSource == 2 && MaxWinAll >= tData.fangkaFree) {
        if (tData.fangkaExtra === 0 && pl == MaxlosePlayer) {
            add_func(node, tData.fangkaCount, pos);
        }else if(tData.fangkaExtra && _pl_winall == MaxloseAll){
            add_func(node, tData.fangkaCount, pos);
        }
    }else if (tData.fangkaCount && tData.fangkaSource == 3 && MaxWinAll >= tData.fangkaFree) {
        //AA付 暂时不显示
        // if (tData.fangkaExtra === 0) {
        //     add_func(node, tData.fangkaCount, pos);
        // }else if(pl.info.uid == MaxWinPlayer && tData.fangkaExtra){
        //     add_func(node, tData.fangkaCount + tData.fangkaExtra, pos);
        // }
    }
}

//设置单个玩家的详细信息
function SetGameOverLayer(node,off)
{
    if(!node) return;
    var sData=MjClient.data.sData;
    var tData=sData.tData;
    var pl=MjClient.getPlayerByIndex(off);
    node.setVisible(false);
    if(!pl)
    {
        return;
    }
    node.setVisible(true);
    var uidSelf = SelfUid();
    var MaxWinAll=0;
    var MaxDianPao=0;
    var bPaoWang = false;
    var MaxlosePlayer = null;
    var MaxWinPlayer = null;
    var MaxloseAll = 999999999;

    //计算所有人数据
    for (var uid in sData.players) {
        var pi = sData.players[uid];
        if (pi) {
            if (MaxWinAll < pi.winall) {
                MaxWinAll = pi.winall;
                MaxWinPlayer = uid;

            }else if (MaxWinAll == pi.winall) {
                if (parseInt(uid) < parseInt(MaxWinPlayer)) {
                    MaxWinAll = pi.winall;
                    MaxWinPlayer = uid;
                }
            }
            if (pi.winall < MaxloseAll) {
                MaxloseAll = pi.winall;
                MaxlosePlayer = uid;
            }else if (pi.winall == MaxloseAll) {
                if (parseInt(uid) < parseInt(MaxlosePlayer)) {
                    MaxloseAll = pi.winall;
                    MaxlosePlayer = uid;
                }
            }
        }
    }

    //最大点炮数
    for (var uid in sData.players) {
        var pi = sData.players[uid];
        if(pi)
        {
            MaxDianPao = MaxDianPao>pi.dianpaoTotal?MaxDianPao:pi.dianpaoTotal;
        }
    }

    //计算炮王
    var _paowangArray = [];
    var _paoScore = 9999;
    for (var uid in sData.players) {
        var pi = sData.players[uid];
        if(pi)
        {
            if(MaxDianPao == pi.dianpaoTotal)
            {
                if(pi.winall <= _paoScore)
                {
                    _paoScore = pi.winall;
                    //_paowangArray.push(pi.info.uid);
                }
            }
        }
    }

    //存点炮王的数组
    for (var uid in sData.players) {
        var pi = sData.players[uid];
        if(pi)
        {
            if(MaxDianPao == pi.dianpaoTotal)
            {
                if(pi.winall <= _paoScore)
                {
                    _paowangArray.push(pi.info.uid);
                }
            }
        }
    }

    cc.log("===================_paowangArray =11111 " + JSON.stringify(_paowangArray));

    //是否是炮王
    if(_paowangArray.indexOf(pl.info.uid)>=0)
    {
        bPaoWang = true;
    }

    //根据输赢设置文字颜色
    function setTextColor(textNode)
    {

        if(MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ
            || isJinZhongAPPType()
            || MjClient.getAppType() == MjClient.APP_TYPE.TXLVLIANGMJ
            || MjClient.getAppType() == MjClient.APP_TYPE.TXLINFENMJ
            )
        {
            if(MaxWinAll !=0 && MaxWinAll == pl.winall )//大赢家
            {
                textNode.setColor(cc.color(221,78,0));
            }
            else if(pl.winall < 0)//输家
            {
                textNode.setColor(cc.color(104,104,104));
            }
        }
        else if(MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP)
        {
            if(pl.winall < 0) { //输家
                textNode.setColor(cc.color(37,69,89));
            }
            else {
                textNode.setColor(cc.color(88,45,45));
            }
        }
        else if(MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ ||
                 MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ ||
                 MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP ||
                 MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ)
        {
            if(MaxWinAll !=0 && MaxWinAll == pl.winall )//大赢家
            {
                textNode.setColor(cc.color(82,40,126));
            }
            else if(pl.winall < 0)//输家
            {
                textNode.setColor(cc.color(37,83,118));
                //textNode.setColor(cc.color(255,0,0));
            }
        }
    }
    //根据输赢设置背景底板颜色
    function setPlayerBg()
    {
        var _bgNode = node.getChildByName("bg");
        var _name = node.getChildByName("name");
        var _id = node.getChildByName("id");
        if(MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ
            || isJinZhongAPPType()
            || MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP
            || MjClient.getAppType() == MjClient.APP_TYPE.TXLVLIANGMJ
            || MjClient.getAppType() === MjClient.APP_TYPE.QXYZQP
            || MjClient.getAppType() == MjClient.APP_TYPE.TXLINFENMJ)
        {

            if(MaxWinAll !=0 && MaxWinAll == pl.winall )//大赢家
            {
                _bgNode.loadTexture("gameOver/gerenxinxi_2.png");
                _name.setColor(cc.color(221,78,0));
                _id.setColor(cc.color(221,78,0));
            }
            else if(pl.winall < 0)//输家
            {
                _bgNode.loadTexture("gameOver/gerenxinxi_3.png");

                var _textIcon1 = node.getChildByName("winNode").getChildByName("allscore");
                var _textIcon2 = node.getChildByName("lastNode").getChildByName("allscore");
                var _textIcon3 = node.getChildByName("normalNode").getChildByName("allscore");
                if (MjClient.getAppType() != MjClient.APP_TYPE.QXHAIANMJ) 
                {
                    _textIcon1.loadTexture("gameOver/zongchengji_1.png");
                    _textIcon2.loadTexture("gameOver/zongchengji_1.png");
                    _textIcon3.loadTexture("gameOver/zongchengji_1.png");
                    _name.setColor(cc.color(104,104,104));
                    _id.setColor(cc.color(104,104,104));
                }
            }
        }
        else if(MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ ||
                MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ ||
                MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP ||
                MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ)
        {
            var _maxPlayer = parseInt(MjClient.data.sData.tData.maxPlayer);

            if(MaxWinAll !=0 && MaxWinAll == pl.winall )//大赢家
            {
                _bgNode.loadTexture("gameOver/gerenxinxi_2.png");
                if(_maxPlayer == 2)
                {
                    _bgNode.loadTexture("gameOver/gerenxinxi2_2.png");
                }
            }
            else if(pl.winall < 0)//输家
            {
                _bgNode.loadTexture("gameOver/gerenxinxi_3.png");
                if(_maxPlayer == 2)
                {
                    _bgNode.loadTexture("gameOver/gerenxinxi2_3.png");
                }
            }
        }

        // if(MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ) { //江苏麻将 总成绩不要显示
        //     var _textIcon1 = node.getChildByName("winNode").getChildByName("allscore");
        //     var _textIcon2 = node.getChildByName("lastNode").getChildByName("allscore");
        //     var _textIcon3 = node.getChildByName("normalNode").getChildByName("allscore");
        //     _textIcon1.visible = false;
        //     _textIcon2.visible = false;
        //     _textIcon3.visible = false;
        // }
    }


    var uibind={
        dayingjia_light:{
            _visible: false,
            _run: function() {
                if(MaxWinAll != 0 && MaxWinAll == pl.winall )//大赢家
                {
                    this.visible = true;
                }
            },
        },
        name:{
            _run: function() {
                this.setFontName("Arial");
                this.setFontSize(this.getFontSize());
                this.ignoreContentAdaptWithSize(true);
                if(MjClient.getAppType() === MjClient.APP_TYPE.QXYZQP){
                    if(pl.winall < 0) { //输家
                        this.setColor(cc.color(37,69,89));
                    }
                    else {
                        this.setColor(cc.color(88,45,45));
                    }
                }
            },
            _text: function() {
                return getNewName(unescape(pl.info.nickname ) + "");
            }
        },
        id: {
            _run:function()
            {
                this.ignoreContentAdaptWithSize(true);
                if(MjClient.getAppType() === MjClient.APP_TYPE.QXYZQP){
                    if(pl.winall < 0) { //输家
                        this.setColor(cc.color(37,69,89));
                    }
                    else {
                        this.setColor(cc.color(88,45,45));
                    }
                }
            },
            _text: function () {
                return "ID:" + pl.info.uid.toString();
            }
        },

        bg:{
            _run: function(){  
                if(isYongZhouProject()){
                    setDismissTypeImg(pl,this,0.73,0.72,"chang"); 
                }
            }
        },
        winNode:{
            winNum:{
            },
            bigWinner:{
                _visible : false
            }
        },
        lastNode:{
            winNum1:{},
            winNum2:{},
        },
        normalNode:{
            winNum1:{},
            winNum2:{},
        },
        statistc:{
            item0:{
                _run:function()
                {
                    setTextColor(this);
                    this.ignoreContentAdaptWithSize(true);
                },
                _text: function () {
                    if(pl.roomStatisticsDesc && typeof pl.roomStatisticsDesc[0] == 'string') return pl.roomStatisticsDesc[0] + pl.roomStatistics[0];

                    return "自摸次数    " + (pl.zimoTotal > 0? pl.zimoTotal+"":"0" );
                }
            },

            item1:{
                _run:function()
                {
                    setTextColor(this);
                    this.ignoreContentAdaptWithSize(true);
                },
                _text: function () {
                    if(pl.roomStatisticsDesc && typeof pl.roomStatisticsDesc[1] == 'string') return pl.roomStatisticsDesc[1] + pl.roomStatistics[1];
                    return "点炮次数    " +  (pl.dianpaoTotal > 0? pl.dianpaoTotal +"":"0" );
                }
            },
            item2:{
                _run:function()
                {
                    setTextColor(this);
                    this.ignoreContentAdaptWithSize(true);
                },
                _text: function () {
                    if(pl.roomStatisticsDesc && typeof pl.roomStatisticsDesc[2] == 'string') return pl.roomStatisticsDesc[2] + pl.roomStatistics[2];
                    if (MjClient.gameType === MjClient.GAME_TYPE.TONG_HUA ||
                        MjClient.getAppType() === MjClient.APP_TYPE.QXJSMJ)
                        return "接炮次数    " + (pl.jiepaoTotal > 0? pl.jiepaoTotal +"":"0" );
                    else
                        return "暗杠次数    " + (pl.angangTotal > 0? pl.angangTotal +"":"0" );
                }
            },
            item3:{
                _run:function()
                {
                    setTextColor(this);
                    this.ignoreContentAdaptWithSize(true);
                },
                _text: function () {
                    if(pl.roomStatisticsDesc && typeof pl.roomStatisticsDesc[3] == 'string') return pl.roomStatisticsDesc[3] + pl.roomStatistics[3];
                    if (MjClient.gameType == MjClient.GAME_TYPE.TONG_HUA)
                        return "暗蛋次数    " + (pl.angangTotal   > 0? pl.angangTotal  +"":"0" );
                    else if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ)
                        return "暗杠次数    " + (pl.angangTotal   > 0? pl.angangTotal  +"":"0" );
                    else
                        return "明杠次数    " + (pl.minggangTotal  > 0? pl.minggangTotal +"":"0" );
                }
            },
            item4:{
                _run:function(){
                    setTextColor(this);
                    this.ignoreContentAdaptWithSize(true);
                    if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ) {
                        this.visible = true;
                    }
                },
                _text: function () {
                    if(pl.roomStatisticsDesc && typeof pl.roomStatisticsDesc[4] == 'string') return pl.roomStatisticsDesc[4] + pl.roomStatistics[4];

                    if (MjClient.gameType == MjClient.GAME_TYPE.TONG_HUA)
                        return "明蛋次数    " + (pl.minggangTotal  > 0? pl.minggangTotal +"":"0" );
                    else if(MjClient.gameType == MjClient.GAME_TYPE.TY_ZHUANZHUAN)
                        return "接炮次数    " + (pl.jiepaoTotal  > 0? pl.jiepaoTotal +"":"0" );
                    else if (MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ) {
                        return "明杠次数    " + (pl.minggangTotal  > 0? pl.minggangTotal +"":"0" );
                    } else
                        return "";
                }
            },
            item5:{
                _run:function()
                {
                    this.ignoreContentAdaptWithSize(true);
                    if(pl.roomStatisticsDesc && typeof pl.roomStatisticsDesc[5] == 'string') this.visible = true
                },
                _text: function () {
                    if(pl.roomStatisticsDesc && typeof pl.roomStatisticsDesc[5] == 'string') return pl.roomStatisticsDesc[5] + pl.roomStatistics[5];

                    //return "旋风杠次数：" +  (pl.xuanfenggangTotal  > 0? pl.xuanfenggangTotal +"":"0" );
                    return "";
                }
            },
        },
    }

    // if(MjClient.getAppType() ==  MjClient.APP_TYPE.QXJSMJ ||
    //     MjClient.getAppType() ==  MjClient.APP_TYPE.QXYYQP ||
    //     MjClient.getAppType() ==  MjClient.APP_TYPE.QXNTQP ||
    //     MjClient.getAppType() ==  MjClient.APP_TYPE.QXHAIANMJ)
    // {
    //     setUserOfflineWinGamePanel(node,pl);
    // }

    setUserOfflineWinGamePanel(node,pl);

    var wxNode = node.getChildByName("head");
    addWxHeadToEndUI(wxNode,off);
    BindUiAndLogic(node,uibind);

    var numValue = Math.abs(pl.winall) + "";
    var nodeParent = node.getParent();
    var _share = nodeParent.getChildByName("share");
    var _shine = _share.getChildByName("img_shine");
    var _point = _share.getChildByName("img_point");
    var _txt = _share.getChildByName("img_txt");


    setPlayerBg();

    var _fangkaNode;
    //最高得分
    if (MaxWinAll !=0 && MaxWinAll == pl.winall ) {
        uibind.normalNode._node.visible = false;
        uibind.lastNode._node.visible =false;
        uibind.winNode._node.visible = true;
        uibind.winNode.bigWinner._node.visible = true;
        uibind.winNode.winNum._node.setString(pl.winall + "");
        uibind.winNode.winNum._node.ignoreContentAdaptWithSize(true);
        var act_Func = function() {
            var a = cc.scaleTo(0.5, 1.0);
            var aa = cc.fadeIn(0.5);
            var a1 = cc.scaleTo(1.0, 4);
            var a2 = cc.fadeOut(1.0);
            var act_2 = cc.rotateBy(0.8, 30);
            var act_3 = cc.rotateBy(0.8, -30);
            var a3 =  cc.callFunc(function() {
                _shine.setScale(1);
            }.bind(_shine));
            _shine.runAction(cc.sequence(cc.spawn(a,aa), cc.spawn(a1,a2),a3,cc.delayTime(0.1)).repeatForever());
            _point.runAction(cc.sequence(act_2, act_3).repeatForever());

        }
        var clubInfoTable = getClubInfoInTable();
        if (clubInfoTable && pl.info.uid == SelfUid() && MjClient.getAppType() != MjClient.APP_TYPE.QXYYQP && MjClient.getAppType() != MjClient.APP_TYPE.HUBEIMJ && MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ ) {
            _shine.setVisible(true);
            _point.setVisible(true);
            _txt.setVisible(true);
            act_Func();
        }
        _fangkaNode = uibind.winNode._node;
    }//点炮最多
    else if( MaxDianPao != 0 &&  bPaoWang){
        uibind.winNode._node.visible = false;
        uibind.normalNode._node.visible = false;
        uibind.lastNode._node.visible =true;
        _fangkaNode = uibind.lastNode._node;
        if( pl.winall >=0 ){
            uibind.lastNode.winNum1._node.visible = true;
            uibind.lastNode.winNum2._node.visible = false;
            uibind.lastNode.winNum1._node.setString(pl.winall + "");
            uibind.lastNode.winNum1._node.ignoreContentAdaptWithSize(true);
        }
        else{
            uibind.lastNode.winNum1._node.visible = false;
            uibind.lastNode.winNum2._node.visible = true;
            uibind.lastNode.winNum2._node.setString(Math.abs(pl.winall) + "");
            uibind.lastNode.winNum2._node.ignoreContentAdaptWithSize(true);
        }
    }
    else{
        uibind.winNode._node.visible = false;
        uibind.lastNode._node.visible =false;
        uibind.normalNode._node.visible = true;
        _fangkaNode = uibind.normalNode._node;
        if( pl.winall >= 0 ){
            uibind.normalNode.winNum2._node.visible =false;
            uibind.normalNode.winNum1._node.visible= true;
            uibind.normalNode.winNum1._node.setString(pl.winall + "");
            uibind.normalNode.winNum1._node.ignoreContentAdaptWithSize(true);

        }
        else {
            uibind.normalNode.winNum1._node.visible= false;
            uibind.normalNode.winNum2._node.visible =true;
            uibind.normalNode.winNum2._node.setString(Math.abs(pl.winall) + "");
            uibind.normalNode.winNum2._node.ignoreContentAdaptWithSize(true);
        }
    }
    AddFangKaIcon(sData, _fangkaNode, tData, pl, MaxWinAll, MaxWinPlayer,  MaxloseAll, MaxlosePlayer, cc.p(-115, 385));
    
    node.getChildByName("fangzhu").visible = tData.owner == pl.info.uid;

    var maxPlayer = parseInt(MjClient.data.sData.tData.maxPlayer);
    var head2 = node.getParent().getChildByName("head2");
    var head3 = node.getParent().getChildByName("head3");
    cc.log("=============game over off idx jjjjj =  " + off);

    if(MjClient.getAppType() != MjClient.APP_TYPE.QXJSMJ &&
       MjClient.getAppType() != MjClient.APP_TYPE.QXXZMJ &&
       MjClient.getAppType() != MjClient.APP_TYPE.QXNTQP &&
        MjClient.getAppType() != MjClient.APP_TYPE.QXHAIANMJ &&
       MjClient.getAppType() != MjClient.APP_TYPE.QXHAMJ) //牌友联盟江苏，徐州新UI
    {
        if (head2 && head3)
        {
            var size = (head3.x - head2.x) * (4 - maxPlayer) / (maxPlayer + 1);
            node.x += size * (off + 1);
        }
    }

    if (pl.isNeedFanBei || tData.isFanBei) { 
        var yoff = 15;
        uibind.winNode.winNum._node.y += yoff;

        if(MjClient.getAppType() === MjClient.APP_TYPE.QXXXGHZ){
            uibind.lastNode.winNum1._node.y += yoff;
            uibind.lastNode.winNum2._node.y += yoff;
        }else{
            uibind.lastNode._node.y += yoff;
        }
        
        // node.getChildByName("line_hua_0").y += yoff;
        uibind.normalNode.winNum1._node.y += yoff;
        uibind.normalNode.winNum2._node.y += yoff;

        var fanbeiFormula = node.getChildByName("fanbeiFormula");
        fanbeiFormula.setVisible(true);
        fanbeiFormula.setString("(" + Math.floor(pl.winall/2*10)/10 + "x2)");
        fanbeiFormula.ignoreContentAdaptWithSize(true);
        var bWin = (MaxWinAll !=0 && MaxWinAll == pl.winall);
        fanbeiFormula.setTextColor(bWin? cc.color(0xff,0xf5,0x84):cc.color(0xb0,0xed,0xff));


        // 如皋二人长牌UI显示特殊  fanBeiId 0 bu不翻倍  1 翻2倍  2 翻3倍
        if(MjClient.gameType === MjClient.GAME_TYPE.RU_GAO_ER) {
            var fanBeiId = tData.areaSelectMode.fanBei;
            var beishu = fanBeiId == 1 ? 2 : 3;
            fanbeiFormula.ignoreContentAdaptWithSize(true);
            fanbeiFormula.setString("(" + Math.floor(pl.winall/beishu*10)/10 + "x" + beishu + ")");
            fanbeiFormula.setTextColor(bWin? cc.color("#ff0000") : cc.color("#0066cc"));
            fanbeiFormula.x -= cc.winSize.width * 0.20;
            fanbeiFormula.y += cc.winSize.height * 0.07;
        }
    }
}

//如皋长牌
function SetGameOverLayer_changpai(node,off)
{
    var sData=MjClient.data.sData;
    var tData=sData.tData;
    var pl=MjClient.getPlayerByIndex(off);
    node.setVisible(false);
    if(!pl)
    {
        return;
    }


    var _bg = node.getChildByName("bg");
    var _dis = _bg.scale*_bg.getSize().width;

    cc.log("===================_dis " + _dis);
    node.setVisible(true);
    if (MjClient.getAppType() != MjClient.APP_TYPE.QXNTQP) {
        node.setPositionX(node.getPositionX() + _dis/2);
    }

    var uidSelf = SelfUid();
    var MaxWinAll=0;
    var MaxDianPao=0;



    //计算所有人数据
    for (var uid in sData.players) {
        var pi = sData.players[uid];
        if(pi)
        {
            MaxWinAll = MaxWinAll>pi.winall?MaxWinAll:pi.winall;
        }
    }


    //最大点炮数
    for (var uid in sData.players) {
        var pi = sData.players[uid];
        if(pi)
        {
            MaxDianPao = MaxDianPao>pi.dianpaoTotal?MaxDianPao:pi.dianpaoTotal;
        }
    }

    //计算炮王
    var bPaoWang = false;
    var _paowangArray = [];
    var _paoScore = 9999;
    for (var uid in sData.players) {
        var pi = sData.players[uid];
        if(pi)
        {
            if(MaxDianPao == pi.dianpaoTotal)
            {
                if(pi.winall <= _paoScore)
                {
                    _paoScore = pi.winall;
                    //_paowangArray.push(pi.info.uid);
                }
            }
        }
    }
    //存点炮王的数组
    for (var uid in sData.players) {
        var pi = sData.players[uid];
        if(pi)
        {
            if(MaxDianPao == pi.dianpaoTotal)
            {
                if(pi.winall <= _paoScore)
                {
                    _paowangArray.push(pi.info.uid);
                }
            }
        }
    }

    cc.log("===================_paowangArray = 2222 " + JSON.stringify(_paowangArray));

    //是否是炮王
    if(_paowangArray.indexOf(pl.info.uid)>=0)
    {
        bPaoWang = true;
    }

    //根据输赢设置文字颜色
    function setTextColor(textNode)
    {
        if (MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP) {
            if(MaxWinAll !=0 && MaxWinAll == pl.winall )//大赢家
            {
                textNode.setColor(cc.color(82,40,126));
            }
            else if(pl.winall < 0)//输家
            {
                textNode.setColor(cc.color(37,83,118));
                //textNode.setColor(cc.color(255,0,0));
            }
        }
    }
    //根据输赢设置背景底板颜色
    function setPlayerBg()
    {
        var _bgNode = node.getChildByName("bg");
        var _name = node.getChildByName("name");
        var _id = node.getChildByName("id");
        if (MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP) {
            var _maxPlayer = parseInt(MjClient.data.sData.tData.maxPlayer);

            if(MaxWinAll !=0 && MaxWinAll == pl.winall )//大赢家
            {
                _bgNode.loadTexture("gameOver/gerenxinxi_2.png");
                if(_maxPlayer == 2)
                {
                    _bgNode.loadTexture("gameOver/gerenxinxi2_2.png");
                }
            }
            else if(pl.winall < 0)//输家
            {
                _bgNode.loadTexture("gameOver/gerenxinxi_3.png");
                if(_maxPlayer == 2)
                {
                    _bgNode.loadTexture("gameOver/gerenxinxi2_3.png");
                }
            }
        }
    }


    var uibind={
        name: {
            _run: function() {
                this.setFontName("Arial");
                this.setFontSize(this.getFontSize());
            },
            _text: function() {
                return unescape(pl.info.nickname) + "";
            }
        },
        id: {
            _run:function()
            {
                this.ignoreContentAdaptWithSize(true);
            },
            _text: function () {
                return "ID:" + pl.info.uid.toString();
            }
        },
        winNode:{
            winNum:{
            },
            bigWinner:{
                _visible : false
            }
        },
        lastNode:{
            winNum1:{},
            winNum2:{},
        },
        normalNode:{
            winNum1:{},
            winNum2:{},
        },
        statistc:{
            item0:{
                _run:function()
                {
                    setTextColor(this);
                    this.ignoreContentAdaptWithSize(true);
                },
                _text: function () {
                    return "自摸次数：" + (pl.zimoTotal > 0? pl.zimoTotal+"":"0" );
                }
            },

            item1:{
                _run:function()
                {
                    setTextColor(this);
                    this.ignoreContentAdaptWithSize(true);
                },
                _text: function () {
                    return "点炮次数：" +  (pl.dianpaoTotal  > 0? pl.dianpaoTotal +"":"0" );
                }
            },
            item2:{
                _run:function()
                {
                    setTextColor(this);
                    this.ignoreContentAdaptWithSize(true);
                },
                _text: function () {
                    if(MjClient.GAME_TYPE.QU_TANG_23_ZHANG === MjClient.gameType){
                        return "全荤次数: " + (Number(pl.quanhunTotal) > 0 ? String(pl.quanhunTotal) : "0");
                    }
                    return "暗杠次数：" + (pl.angangTotal   > 0? pl.angangTotal  +"":"0" );
                }
            },
            item3:{
                _run:function()
                {
                    setTextColor(this);
                    this.ignoreContentAdaptWithSize(true);
                },
                _text: function () {
                    if(MjClient.GAME_TYPE.QU_TANG_23_ZHANG === MjClient.gameType){
                        return "清胡次数: " + (Number(pl.qinghuTotal) > 0 ? String(pl.qinghuTotal) : "0");
                    }
                    return "明杠次数：" + (pl.minggangTotal  > 0? pl.minggangTotal +"":"0" );
                }
            },
            item4:{
                _text: function () {
                    // console.log("=====doomsky say:pl.jiepaoTotal======", pl.jiepaoTotal);
                    // return "接炮次数：" + (pl.jiepaoTotal  > 0? pl.jiepaoTotal +"":"0" );
                    return "";
                }
            },
            item5:{
                _text: function () {
                    //return "旋风杠次数：" +  (pl.xuanfenggangTotal  > 0? pl.xuanfenggangTotal +"":"0" );
                    return "";
                }
            },
        },
    }

    var wxNode = node.getChildByName("head");
    addWxHeadToEndUI(wxNode,off);
    BindUiAndLogic(node,uibind);

    var numValue = Math.abs(pl.winall) + "";

    setPlayerBg();

    //最高得分
    if (MaxWinAll !=0 && MaxWinAll == pl.winall ) {
        uibind.normalNode._node.visible = false;
        uibind.lastNode._node.visible =false;
        uibind.winNode._node.visible = true;
        uibind.winNode.bigWinner._node.visible = true;
        uibind.winNode.winNum._node.setString(pl.winall + "");
        uibind.winNode.winNum._node.ignoreContentAdaptWithSize(true);
        var nodeParent = node.getParent();
        var _share = nodeParent.getChildByName("share");
        var _shine = _share.getChildByName("img_shine");
        var _point = _share.getChildByName("img_point");
        var _txt = _share.getChildByName("img_txt");
        var act_Func = function() {
            var a = cc.scaleTo(0.5, 1.0);
            var aa = cc.fadeIn(0.5);
            var a1 = cc.scaleTo(1.0, 4);
            var a2 = cc.fadeOut(1.0);
            var act_2 = cc.rotateBy(0.8, 30);
            var act_3 = cc.rotateBy(0.8, -30);
            var a3 =  cc.callFunc(function() {
                _shine.setScale(1);
            }.bind(_shine));
            _shine.runAction(cc.sequence(cc.spawn(a,aa), cc.spawn(a1,a2),a3,cc.delayTime(0.1)).repeatForever());
            _point.runAction(cc.sequence(act_2, act_3).repeatForever());

        }
        var clubInfoTable = getClubInfoInTable();
        if (clubInfoTable && pl.info.uid == SelfUid() && MjClient.getAppType() != MjClient.APP_TYPE.QXYYQP && MjClient.getAppType() != MjClient.APP_TYPE.HUBEIMJ &&  MjClient.getAppType() != MjClient.APP_TYPE.YLHUNANMJ ) {
            _shine.setVisible(true);
            _point.setVisible(true);
            _txt.setVisible(true);
            act_Func();
        }

    }//点炮最多
    else if( MaxDianPao != 0 && bPaoWang ){
        uibind.winNode._node.visible = false;
        uibind.normalNode._node.visible = false;
        uibind.lastNode._node.visible =true;
        if( pl.winall >=0 ){
            uibind.lastNode.winNum1._node.visible = true;
            uibind.lastNode.winNum2._node.visible = false;
            uibind.lastNode.winNum1._node.setString(pl.winall + "");
            uibind.lastNode.winNum1._node.ignoreContentAdaptWithSize(true);
        }
        else{
            uibind.lastNode.winNum1._node.visible = false;
            uibind.lastNode.winNum2._node.visible = true;
            uibind.lastNode.winNum2._node.setString(Math.abs(pl.winall) + "");
            uibind.lastNode.winNum2._node.ignoreContentAdaptWithSize(true);
        }
    }
    else{
        uibind.winNode._node.visible = false;
        uibind.lastNode._node.visible =false;
        uibind.normalNode._node.visible = true;
        if( pl.winall >= 0 ){
            uibind.normalNode.winNum2._node.visible =false;
            uibind.normalNode.winNum1._node.visible= true;
            uibind.normalNode.winNum1._node.setString(pl.winall + "");
            uibind.normalNode.winNum1._node.ignoreContentAdaptWithSize(true);
        }
        else {
            uibind.normalNode.winNum1._node.visible= false;
            uibind.normalNode.winNum2._node.visible =true;
            uibind.normalNode.winNum2._node.setString(Math.abs(pl.winall) + "");
            uibind.normalNode.winNum2._node.ignoreContentAdaptWithSize(true);
        }
    }

    node.getChildByName("fangzhu").visible = tData.owner == pl.info.uid;
}

//设置单个玩家的详细信息,牛牛
function SetGameOverLayer_NN(node,off)
{
    var sData=MjClient.data.sData;
    var tData=sData.tData;
    var pl=MjClient.getPlayerByIndex(off);
    node.setVisible(false);
    node.setVisible(true);

    var uidSelf = SelfUid();
    var MaxWinAll=0;
    var MaxDianPao=0;


    //计算所有人数据
    for (var uid in sData.players) {
        var pi = sData.players[uid];
        if(pi)
        {
            MaxWinAll = MaxWinAll>pi.winall?MaxWinAll:pi.winall;
        }
    }

    // for (var i = 0; i <  tData.uids.length; i++) {
    //     var uid = tData.uids[i];
    //     var pi= sData.players[uid];
    //     if(pi)
    //     {
    //         MaxWinAll = MaxWinAll>pi.winall?MaxWinAll:pi.winall;
    //     }
    // }



    var uibind={
        name: {
            _run:function(){
                this.setFontName("Arial");
                this.setFontSize(this.getFontSize());
                this.setFontSize(this.getFontSize());
            },
            _text: function() {
                if (!pl) {
                    return "";
                }
                return unescape(pl.info.nickname) + "";
            }
        },
        id: {
            _run:function(){
                this.ignoreContentAdaptWithSize(true);
            },
            _text: function () {
                if(!pl)
                {
                    return "";
                }
                return "ID:" + pl.info.uid.toString();
            }
        },
        winNode:{
            winNum:{
            },
            bigWinner:{
                _visible : false
            }
        },
        lastNode:{
            winNum1:{},
            winNum2:{},
        },
        normalNode:{
            winNum1:{},
            winNum2:{},
        },
        statistc:{
            item0:{
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                },
                _text: function () {
                    if(!pl)
                    {
                        return "牛牛次数：";
                    }
                    return "牛牛次数：" + (pl.roomStatistics[0] > 0? pl.roomStatistics[0]+"":"0" );
                }
            },

            item1:{
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                },
                _text: function () {
                    if(!pl)
                    {
                        return "五小牛次数：";
                    }
                    return "五小牛次数：" +  (pl.roomStatistics[1]  > 0? pl.roomStatistics[1] +"":"0" );
                }
            },
            item2:{
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                },
                _text: function () {
                    if(!pl)
                    {
                        return "炸弹次数：";
                    }
                    return "炸弹次数：" + (pl.roomStatistics[2]   > 0? pl.roomStatistics[2]  +"":"0" );
                }
            },
            item3:{
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                },
                _text: function () {
                    if(!pl)
                    {
                        return "失败次数：";
                    }
                    return "失败次数：" + (pl.roomStatistics[3]  > 0? pl.roomStatistics[3] +"":"0" );
                }
            },
            item4:{
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                },
                _text: function () {
                    if(!pl)
                    {
                        return "胜利次数：";
                    }
                    return "胜利次数：" + (pl.roomStatistics[4]  > 0? pl.roomStatistics[4] +"":"0" );
                }
            },
            item5:{
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                },
                _text: function () {
                    //return "旋风杠次数：" +  (pl.xuanfenggangTotal  > 0? pl.xuanfenggangTotal +"":"0" );
                    return "";
                }
            },
        },
    }

    var wxNode = node.getChildByName("head");
    addWxHeadToEndUI(wxNode,off);
    BindUiAndLogic(node,uibind);

    if(!pl)
    {
        uibind.normalNode._node.visible = false;
        uibind.lastNode._node.visible =false;
        uibind.winNode._node.visible = false;
        uibind.winNode.bigWinner._node.visible = false;
        uibind.winNode.winNum._node.visible = false;
        node.getChildByName("fangzhu").visible =false;
        return;
    }

    var numValue = Math.abs(pl.winall) + "";
    //最高得分
    if (MaxWinAll !=0 && MaxWinAll == pl.winall ) {
        uibind.normalNode._node.visible = false;
        uibind.lastNode._node.visible =false;
        uibind.winNode._node.visible = true;
        uibind.winNode.bigWinner._node.visible = true;
        uibind.winNode.winNum._node.setString(pl.winall + "");
        uibind.winNode.winNum._node.ignoreContentAdaptWithSize(true);
        uibind.winNode.winNum._node.setScale(0.8);
        var nodeParent = node.getParent().getParent();
        var _share = nodeParent.getChildByName("share");
        var _shine = _share.getChildByName("img_shine");
        var _point = _share.getChildByName("img_point");
        var _txt = _share.getChildByName("img_txt");
        var act_Func = function() {
            var a = cc.scaleTo(0.5, 1.0);
            var aa = cc.fadeIn(0.5);
            var a1 = cc.scaleTo(1.0, 4);
            var a2 = cc.fadeOut(1.0);
            var act_2 = cc.rotateBy(0.8, 30);
            var act_3 = cc.rotateBy(0.8, -30);
            var a3 =  cc.callFunc(function() {
                _shine.setScale(1);
            }.bind(_shine));
            _shine.runAction(cc.sequence(cc.spawn(a,aa), cc.spawn(a1,a2),a3,cc.delayTime(0.1)).repeatForever());
            _point.runAction(cc.sequence(act_2, act_3).repeatForever());

        }
        var clubInfoTable = getClubInfoInTable();
        if (clubInfoTable && pl.info.uid == SelfUid() && MjClient.getAppType() != MjClient.APP_TYPE.QXYYQP && MjClient.getAppType() != MjClient.APP_TYPE.HUBEIMJ&& MjClient.getAppType() != MjClient.APP_TYPE.YLHUNANMJ ) {
            _shine.setVisible(true);
            _point.setVisible(true);
            _txt.setVisible(true);
            act_Func();
        }

    }//点炮最多
    else if( MaxDianPao != 0 &&MaxDianPao == pl.dianpaoTotal ){
        uibind.winNode._node.visible = false;
        uibind.normalNode._node.visible = false;
        uibind.lastNode._node.visible =true;
        if( pl.winall >=0 ){
            uibind.lastNode.winNum1._node.visible = true;
            uibind.lastNode.winNum2._node.visible = false;
            uibind.lastNode.winNum1._node.setString(pl.winall + "");
            uibind.lastNode.winNum1._node.ignoreContentAdaptWithSize(true);
            uibind.lastNode.winNum1._node.setScale(0.8);
        }
        else{
            uibind.lastNode.winNum1._node.visible = false;
            uibind.lastNode.winNum2._node.visible = true;
            uibind.lastNode.winNum2._node.setString(Math.abs(pl.winall) + "");
            uibind.lastNode.winNum2._node.ignoreContentAdaptWithSize(true);
            uibind.lastNode.winNum2._node.setScale(0.8);
        }
    }
    else{
        uibind.winNode._node.visible = false;
        uibind.lastNode._node.visible =false;
        uibind.normalNode._node.visible = true;
        if( pl.winall >= 0 ){
            uibind.normalNode.winNum2._node.visible =false;
            uibind.normalNode.winNum1._node.visible= true;
            uibind.normalNode.winNum1._node.setString(pl.winall + "");
            uibind.normalNode.winNum1._node.ignoreContentAdaptWithSize(true);
            uibind.normalNode.winNum1._node.setScale(0.8);
        }
        else {
            uibind.normalNode.winNum1._node.visible= false;
            uibind.normalNode.winNum2._node.visible =true;
            uibind.normalNode.winNum2._node.setString(Math.abs(pl.winall) + "");
            uibind.normalNode.winNum2._node.ignoreContentAdaptWithSize(true);
            uibind.normalNode.winNum2._node.setScale(0.8);
        }
    }

    node.getChildByName("fangzhu").visible = tData.owner == pl.info.uid;
}

//设置单个玩家的详细信息,掼蛋
function SetGameOverLayer_guandan(node,off)
{
    var sData=MjClient.data.sData;
    var tData=sData.tData;
    var pl=MjClient.getPlayerByIndex(off);
    node.setVisible(false);
    node.setVisible(true);

    var uidSelf = SelfUid();
    var MaxWinAll=0;
    var MaxDianPao=0;


    //计算所有人数据
    for (var uid in sData.players) {
        var pi = sData.players[uid];
        if(pi)
        {
            MaxWinAll = MaxWinAll>pi.winall?MaxWinAll:pi.winall;
        }
    }

    // for (var i = 0; i <  tData.uids.length; i++) {
    //     var uid = tData.uids[i];
    //     var pi= sData.players[uid];
    //     if(pi)
    //     {
    //         MaxWinAll = MaxWinAll>pi.winall?MaxWinAll:pi.winall;
    //     }
    // }



    var uibind={
        name: {
            _run: function() {
                this.setFontName("Arial");
                this.setFontSize(this.getFontSize());
            },
            _text: function() {
                if (!pl) {
                    return "";
                }
                return unescape(pl.info.nickname) + "";
            }
        },
        id: {
            _run:function(){
                this.ignoreContentAdaptWithSize(true);
            },
            _text: function () {
                if(!pl)
                {
                    return "";
                }
                return "ID:" + pl.info.uid.toString();
            }
        },
        winNode:{
            winNum:{
            },
            bigWinner:{
                _visible : false
            }
        },
        lastNode:{
            winNum1:{},
            winNum2:{},
        },
        normalNode:{
            winNum1:{},
            winNum2:{},
        },
        statistc:{
            item0:{
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                },
                _text: function () {
                    if(!pl)
                    {
                        return "头游次数：";
                    }
                    return "头游次数：" + (pl.roomStatistics[0] > 0? pl.roomStatistics[0]+"":"0" );
                }
            },

            item1:{
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                },
                _text: function () {
                    if(!pl)
                    {
                        return "胜利次数：";
                    }
                    return "胜利次数：" +  (pl.roomStatistics[1]  > 0? pl.roomStatistics[1] +"":"0" );
                }
            },
            item2:{
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                },
                _text: function () {
                    if(!pl)
                    {
                        return "天王炸次数：";
                    }
                    return "天王炸次数：" + (pl.roomStatistics[2]   > 0? pl.roomStatistics[2]  +"":"0" );
                }
            },
            item3:{
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                },
                _text: function () {
                    if(!pl)
                    {
                        return "同花顺次数：";
                    }
                    return "同花顺次数：" + (pl.roomStatistics[3]  > 0? pl.roomStatistics[3] +"":"0" );
                }
            },
            item4:{
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                },
                _text: function () {
                    if(!pl)
                    {
                        return "炸弹次数：";
                    }
                    return "炸弹次数：" + (pl.roomStatistics[4]  > 0? pl.roomStatistics[4] +"":"0" );
                }
            },
            item5:{
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                },
                _text: function () {
                    //return "旋风杠次数：" +  (pl.xuanfenggangTotal  > 0? pl.xuanfenggangTotal +"":"0" );
                    return "";
                }
            },
        },
    }

    var wxNode = node.getChildByName("head");
    addWxHeadToEndUI(wxNode,off);
    BindUiAndLogic(node,uibind);

    if(!pl)
    {
        uibind.normalNode._node.visible = false;
        uibind.lastNode._node.visible =false;
        uibind.winNode._node.visible = false;
        uibind.winNode.bigWinner._node.visible = false;
        uibind.winNode.winNum._node.visible = false;
        node.getChildByName("fangzhu").visible =false;
        return;
    }

    var numValue = Math.abs(pl.winall) + "";
    //最高得分
    if (MaxWinAll !=0 && MaxWinAll == pl.winall ) {
        uibind.normalNode._node.visible = false;
        uibind.lastNode._node.visible =false;
        uibind.winNode._node.visible = true;
        uibind.winNode.bigWinner._node.visible = true;
        uibind.winNode.winNum._node.setString(pl.winall + "");
        uibind.winNode.winNum._node.ignoreContentAdaptWithSize(true);
        uibind.winNode.winNum._node.setScale(0.8);
        var nodeParent = node.getParent();
        var _share = nodeParent.getChildByName("share");
        var _shine = _share.getChildByName("img_shine");
        var _point = _share.getChildByName("img_point");
        var _txt = _share.getChildByName("img_txt");
        var act_Func = function() {
            var a = cc.scaleTo(0.5, 1.0);
            var aa = cc.fadeIn(0.5);
            var a1 = cc.scaleTo(1.0, 4);
            var a2 = cc.fadeOut(1.0);
            var act_2 = cc.rotateBy(0.8, 30);
            var act_3 = cc.rotateBy(0.8, -30);
            var a3 =  cc.callFunc(function() {
                _shine.setScale(1);
            }.bind(_shine));
            _shine.runAction(cc.sequence(cc.spawn(a,aa), cc.spawn(a1,a2),a3,cc.delayTime(0.1)).repeatForever());
            _point.runAction(cc.sequence(act_2, act_3).repeatForever());

        }
        var clubInfoTable = getClubInfoInTable();
        if (clubInfoTable && pl.info.uid == SelfUid() && MjClient.getAppType() != MjClient.APP_TYPE.QXYYQP && MjClient.getAppType() != MjClient.APP_TYPE.HUBEIMJ&&  MjClient.getAppType() != MjClient.APP_TYPE.YLHUNANMJ ) {
            _shine.setVisible(true);
            _point.setVisible(true);
            _txt.setVisible(true);
            act_Func();
        }

    }//点炮最多
    else if( MaxDianPao != 0 &&MaxDianPao == pl.dianpaoTotal ){
        uibind.winNode._node.visible = false;
        uibind.normalNode._node.visible = false;
        uibind.lastNode._node.visible =true;
        if( pl.winall >=0 ){
            uibind.lastNode.winNum1._node.visible = true;
            uibind.lastNode.winNum2._node.visible = false;
            uibind.lastNode.winNum1._node.setString(pl.winall + "");
            uibind.lastNode.winNum1._node.ignoreContentAdaptWithSize(true);
            uibind.lastNode.winNum1._node.setScale(0.8);
        }
        else{
            uibind.lastNode.winNum1._node.visible = false;
            uibind.lastNode.winNum2._node.visible = true;
            uibind.lastNode.winNum2._node.setString(Math.abs(pl.winall) + "");
            uibind.lastNode.winNum2._node.ignoreContentAdaptWithSize(true);
            uibind.lastNode.winNum2._node.setScale(0.8);
        }
    }
    else{
        uibind.winNode._node.visible = false;
        uibind.lastNode._node.visible =false;
        uibind.normalNode._node.visible = true;
        if( pl.winall >= 0 ){
            uibind.normalNode.winNum2._node.visible =false;
            uibind.normalNode.winNum1._node.visible= true;
            uibind.normalNode.winNum1._node.setString(pl.winall + "");
            uibind.normalNode.winNum1._node.ignoreContentAdaptWithSize(true);
            uibind.normalNode.winNum1._node.setScale(0.8);
        }
        else {
            uibind.normalNode.winNum1._node.visible= false;
            uibind.normalNode.winNum2._node.visible =true;
            uibind.normalNode.winNum2._node.setString(Math.abs(pl.winall) + "");
            uibind.normalNode.winNum2._node.ignoreContentAdaptWithSize(true);
            uibind.normalNode.winNum2._node.setScale(0.8);
        }
    }

    node.getChildByName("fangzhu").visible = tData.owner == pl.info.uid;
}

//设置单个玩家的详细信息,跑得快
function SetGameOverLayer_paodekuai(node,off)
{
    var sData=MjClient.data.sData;
    var tData=sData.tData;
    var pl=MjClient.getPlayerByIndex(off);
    if(!pl)
    {
        node.setVisible(false);
        return;
    }
    node.setVisible(true);
    var uidSelf = SelfUid();
    var MaxWinAll = 0;
    var MaxDianPao = 0;
    var MaxlosePlayer = null;
    var MaxWinPlayer = null;
    var MaxloseAll = 999999999;

    //计算所有人数据
    for (var uid in sData.players) {
        var pi = sData.players[uid];
        if (pi) {
            if (MaxWinAll < pi.winall) {
                MaxWinAll = pi.winall;
                MaxWinPlayer = uid;

            }else if (MaxWinAll == pi.winall) {
                if (parseInt(uid) < parseInt(MaxWinPlayer)) {
                    MaxWinAll = pi.winall;
                    MaxWinPlayer = uid;
                }
            }
            if (pi.winall < MaxloseAll) {
                MaxloseAll = pi.winall;
                MaxlosePlayer = uid;
            }else if (pi.winall == MaxloseAll) {
                if (parseInt(uid) < parseInt(MaxlosePlayer)) {
                    MaxloseAll = pi.winall;
                    MaxlosePlayer = uid;
                }
            }
        }
    }


    var uibind={
        dayingjia_light:{
            _visible: false,
            _run: function() {
                if(MaxWinAll != 0 && MaxWinAll == pl.winall )//大赢家
                {
                    this.visible = true;
                }
            },
        },
        name:{
            _run: function() {
                this.setFontName("Arial");
                this.setFontSize(this.getFontSize());
                this.ignoreContentAdaptWithSize(true);
                if (isJinZhongAPPType() || MjClient.getAppType() === MjClient.APP_TYPE.QXYZQP) {
                    if(pl.winall < 0) { //输家
                        this.setColor(cc.color(37,69,89));
                    }
                    else {
                        this.setColor(cc.color(88,45,45));
                    }
                }
            },
            _text: function() {
                if (!pl) {
                    return "";
                }
                return getNewName(unescape(pl.info.nickname ) + "");
            }
        },
        id: {
            _run:function(){
                this.ignoreContentAdaptWithSize(true);
                if (isJinZhongAPPType() || MjClient.getAppType() === MjClient.APP_TYPE.QXYZQP) {
                    if(pl.winall < 0) { //输家
                        this.setColor(cc.color(37,69,89));
                    }
                    else {
                        this.setColor(cc.color(88,45,45));
                    }
                }
            },
            _text: function () {
                if(!pl)
                {
                    return "";
                }
                return "ID:" + pl.info.uid.toString();
            }
        },
        winNode:{
            winNum:{
            },
            bigWinner:{
                _visible : false
            }
        },
        lastNode:{
            winNum1:{},
            winNum2:{},
        },
        normalNode:{
            winNum1:{},
            winNum2:{},
        },
        statistc:{
            item0:{
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                    if (isJinZhongAPPType() || MjClient.getAppType() === MjClient.APP_TYPE.QXYZQP) {
                        if(pl.winall < 0) { //输家
                            this.setColor(cc.color(37,69,89));
                        }
                        else {
                            this.setColor(cc.color(88,45,45));
                        }
                    }
                },
                _text: function () {
                    if(!pl || !pl.roomStatistics || !pl.roomStatistics[0])
                    {
                        return "胜利次数：0";
                    }
                    return "胜利次数：" +  (pl.roomStatistics[0]  > 0? pl.roomStatistics[0] +"":"0" );
                }
            },

            item1:{
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                    if (isJinZhongAPPType() || MjClient.getAppType() === MjClient.APP_TYPE.QXYZQP) {
                        if(pl.winall < 0) { //输家
                            this.setColor(cc.color(37,69,89));
                        }
                        else {
                            this.setColor(cc.color(88,45,45));
                        }
                    }
                },
                _text: function () {
                    if(!pl || !pl.roomStatistics || !pl.roomStatistics[1])
                    {
                        return "炸弹次数：0";
                    }
                    return "炸弹次数：" +  (pl.roomStatistics[1]  > 0? pl.roomStatistics[1] +"":"0" );
                }
            },
            item2:{
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                    if (isJinZhongAPPType() || MjClient.getAppType() === MjClient.APP_TYPE.QXYZQP) {
                        if(pl.winall < 0) { //输家
                            this.setColor(cc.color(37,69,89));
                        }
                        else {
                            this.setColor(cc.color(88,45,45));
                        }
                    }
                },
                _text: function () {
                    //淮安新跑的快的判定
                    if (MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ && MjClient.gameType == MjClient.GAME_TYPE.PAO_DE_KUAI_HUAIAN_NEW)
                    {
                        if (tData.areaSelectMode.isXunHangDaoDanPlay)
                            return "导弹次数：" + (pl.roomStatistics.length >= 3 ? pl.roomStatistics[2] + "" : "0");
                        else
                            return "单局最高：" + (pl.roomStatistics.length >= 4 ? pl.roomStatistics[3] + "" : "0");
                    }
                    if (MjClient.getAppType() != MjClient.APP_TYPE.QXYYQP && MjClient.getAppType() != MjClient.APP_TYPE.HUBEIMJ &&  MjClient.getAppType() != MjClient.APP_TYPE.YLHUNANMJ &&
                        MjClient.gameType != MjClient.GAME_TYPE.PAO_DE_KUAI_XIANG_SHUI )
                    {
                        return ""
                    }
                    if(!pl || !pl.roomStatistics || !pl.roomStatistics[2])
                    {
                        return "单局最高：0";
                    }
                    return "单局最高：" +  (pl.roomStatistics[2]  > 0? pl.roomStatistics[2] +"":"" );
                }
            },
            item3:{
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                    if (isJinZhongAPPType()) {
                        if(pl.winall < 0) { //输家
                            this.setColor(cc.color(37,69,89));
                        }
                        else {
                            this.setColor(cc.color(88,45,45));
                        }
                    }
                },
                _text: function () {
                    //淮安新跑的快的判定
                    //
                    if( MjClient.gameType == MjClient.GAME_TYPE.PAO_DE_KUAI_XIANG_SHUI ){
                        return "大关次数：" + (pl.roomStatistics.length >= 4 ? pl.roomStatistics[3] + "" : "0");
                    }

                    if (MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ && MjClient.gameType == MjClient.GAME_TYPE.PAO_DE_KUAI_HUAIAN_NEW)
                    {
                        if (tData.areaSelectMode.isXunHangDaoDanPlay)
                            return "单局最高：" + (pl.roomStatistics.length >= 4 ? pl.roomStatistics[3] + "" : "0");
                        else
                            return "大关次数：" + (pl.roomStatistics.length >= 5 ? pl.roomStatistics[4] + "" : "0");
                    }
                    if (MjClient.getAppType() != MjClient.APP_TYPE.QXYYQP && MjClient.getAppType() != MjClient.APP_TYPE.HUBEIMJ &&  MjClient.getAppType() != MjClient.APP_TYPE.YLHUNANMJ){
                        return ""
                    }
                    if(!pl || !pl.roomStatistics || !pl.roomStatistics[3])
                    {
                        return "被关春天：0";
                    }
                    return "被关春天：" +  (pl.roomStatistics[3]  > 0? pl.roomStatistics[3] +"":"0" );
                }
            },
            item4:{
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                    if (isJinZhongAPPType()) {
                        if(pl.winall < 0) { //输家
                            this.setColor(cc.color(37,69,89));
                        }
                        else {
                            this.setColor(cc.color(88,45,45));
                        }
                    }
                },
                _text: function () {
                    if( MjClient.gameType == MjClient.GAME_TYPE.PAO_DE_KUAI_XIANG_SHUI ){
                        return "小关次数：" + (pl.roomStatistics.length >= 5 ? pl.roomStatistics[4] + "" : "0");
                    }

                     //淮安新跑的快的判定
                    if (MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ && MjClient.gameType == MjClient.GAME_TYPE.PAO_DE_KUAI_HUAIAN_NEW)
                    {
                        if (tData.areaSelectMode.isXunHangDaoDanPlay)
                            return "大关次数：" + (pl.roomStatistics.length >= 5 ? pl.roomStatistics[4] + "" : "0");
                        else
                            return "小关次数：" + (pl.roomStatistics.length >= 6 ? pl.roomStatistics[5] + "" : "0");
                    }
                    if (MjClient.getAppType() != MjClient.APP_TYPE.QXYYQP && MjClient.getAppType() != MjClient.APP_TYPE.HUBEIMJ &&  MjClient.getAppType() != MjClient.APP_TYPE.YLHUNANMJ){
                        return ""
                    }
                    if(!pl || !pl.roomStatistics || !pl.roomStatistics[4])
                    {
                        return "扎鸟次数：0";
                    }
                    return "扎鸟次数：" +  (pl.roomStatistics[4]  > 0? pl.roomStatistics[4] +"":"0" );
                }
            },
            item5:{
                _text: function () {
                    if (MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ && MjClient.gameType == MjClient.GAME_TYPE.PAO_DE_KUAI_HUAIAN_NEW)
                    {
                        if (tData.areaSelectMode.isXunHangDaoDanPlay)
                            return "小关次数：" + (pl.roomStatistics.length >= 6 ? pl.roomStatistics[5] + "" : "0");
                        else
                            return "";
                    }
                    return "";
                }
            },
        },
        listView:{
            _run:function(){
                this.visible = false;
            }
        }
    }

    var wxNode = node.getChildByName("head");
    addWxHeadToEndUI(wxNode,off);

    BindUiAndLogic(node,uibind);

    // if(MjClient.getAppType() ==  MjClient.APP_TYPE.QXJSMJ ||
    //     MjClient.getAppType() ==  MjClient.APP_TYPE.QXNTQP ||
    //     MjClient.getAppType() ==  MjClient.APP_TYPE.QXHAIANMJ)
    // {
    //     setUserOfflineWinGamePanel(node,pl);
    // }
    setUserOfflineWinGamePanel(node,pl);

    if(!pl)
    {
        uibind.normalNode._node.visible = false;
        uibind.lastNode._node.visible =false;
        uibind.winNode._node.visible = false;
        uibind.winNode.bigWinner._node.visible = false;
        uibind.winNode.winNum._node.visible = false;
        node.getChildByName("fangzhu").visible =false;
        return;
    }

    var _bgNode = node.getChildByName("bg");
    if(isJinZhongAPPType() || MjClient.getAppType() === MjClient.APP_TYPE.QXYZQP || MjClient.getAppType() === MjClient.APP_TYPE.AYGUIZHOUMJ)
    {
        if(MaxWinAll !=0 && MaxWinAll == pl.winall )//大赢家
        {
            _bgNode.loadTexture("gameOver/gerenxinxi_2.png");
        }
        else if(pl.winall < 0)//输家
        {
            _bgNode.loadTexture("gameOver/gerenxinxi_3.png");
        }
    }
    else if (MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP
          || MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ) {
        var _maxPlayer = parseInt(MjClient.data.sData.tData.maxPlayer);
        if(MaxWinAll !=0 && MaxWinAll == pl.winall )//大赢家
        {
            _bgNode.loadTexture("gameOver/gerenxinxi_2.png");
            if(_maxPlayer == 2)
            {
                _bgNode.loadTexture("gameOver/gerenxinxi2_2.png");
            }
        }
        else if(pl.winall < 0)//输家
        {
            _bgNode.loadTexture("gameOver/gerenxinxi_3.png");
            if(_maxPlayer == 2)
            {
                _bgNode.loadTexture("gameOver/gerenxinxi2_3.png");
            }
        }
    }

    var numValue = Math.abs(pl.winall) + "";
    var _fangkaNode;
    //最高得分
    if (MaxWinAll !=0 && MaxWinAll == pl.winall ) {
        uibind.normalNode._node.visible = false;
        uibind.lastNode._node.visible =false;
        uibind.winNode._node.visible = true;
        uibind.winNode.bigWinner._node.visible = true;
        uibind.winNode.winNum._node.setString(pl.winall + "");
        _fangkaNode = uibind.winNode._node;
        uibind.winNode.winNum._node.ignoreContentAdaptWithSize(true);
        if (MjClient.getAppType() != MjClient.APP_TYPE.QXYYQP && MjClient.getAppType() != MjClient.APP_TYPE.HUBEIMJ &&  MjClient.getAppType() != MjClient.APP_TYPE.YLHUNANMJ)
            uibind.winNode.winNum._node.setScale(0.8);
        var nodeParent = node.getParent();
        var _share = nodeParent.getChildByName("share");
        var _shine = _share.getChildByName("img_shine");
        var _point = _share.getChildByName("img_point");
        var _txt = _share.getChildByName("img_txt");
        var act_Func = function() {
            var a = cc.scaleTo(0.5, 1.0);
            var aa = cc.fadeIn(0.5);
            var a1 = cc.scaleTo(1.0, 4);
            var a2 = cc.fadeOut(1.0);
            var act_2 = cc.rotateBy(0.8, 30);
            var act_3 = cc.rotateBy(0.8, -30);
            var a3 =  cc.callFunc(function() {
                _shine.setScale(1);
            }.bind(_shine));
            _shine.runAction(cc.sequence(cc.spawn(a,aa), cc.spawn(a1,a2),a3,cc.delayTime(0.1)).repeatForever());
            _point.runAction(cc.sequence(act_2, act_3).repeatForever());

        }
        var clubInfoTable = getClubInfoInTable();
        if (clubInfoTable && pl.info.uid == SelfUid() && MjClient.getAppType() != MjClient.APP_TYPE.QXYYQP  && MjClient.getAppType() != MjClient.APP_TYPE.HUBEIMJ &&  MjClient.getAppType() != MjClient.APP_TYPE.YLHUNANMJ) {
            _shine.setVisible(true);
            _point.setVisible(true);
            _txt.setVisible(true);
            act_Func();
        }

    }//点炮最多
    else if( MaxDianPao != 0 &&MaxDianPao == pl.dianpaoTotal ){
        uibind.winNode._node.visible = false;
        uibind.normalNode._node.visible = false;
        uibind.lastNode._node.visible =true;
        _fangkaNode = uibind.lastNode._node;
        if( pl.winall >=0 ){
            uibind.lastNode.winNum1._node.visible = true;
            uibind.lastNode.winNum2._node.visible = false;
            uibind.lastNode.winNum1._node.setString(pl.winall + "");
            uibind.lastNode.winNum1._node.ignoreContentAdaptWithSize(true);
            if (MjClient.getAppType() != MjClient.APP_TYPE.QXYYQP  && MjClient.getAppType() != MjClient.APP_TYPE.HUBEIMJ &&  MjClient.getAppType() != MjClient.APP_TYPE.YLHUNANMJ)
                uibind.lastNode.winNum1._node.setScale(0.8);
        }
        else{
            uibind.lastNode.winNum1._node.visible = false;
            uibind.lastNode.winNum2._node.visible = true;
            uibind.lastNode.winNum2._node.setString(Math.abs(pl.winall) + "");
            uibind.lastNode.winNum2._node.ignoreContentAdaptWithSize(true);
            if (MjClient.getAppType() != MjClient.APP_TYPE.QXYYQP && MjClient.getAppType() != MjClient.APP_TYPE.HUBEIMJ &&  MjClient.getAppType() != MjClient.APP_TYPE.YLHUNANMJ)
                uibind.lastNode.winNum2._node.setScale(0.8);
        }
    }
    else{
        uibind.winNode._node.visible = false;
        uibind.lastNode._node.visible =false;
        uibind.normalNode._node.visible = true;
        _fangkaNode = uibind.normalNode._node;
        if( pl.winall >= 0 ){
            uibind.normalNode.winNum2._node.visible =false;
            uibind.normalNode.winNum1._node.visible= true;
            uibind.normalNode.winNum1._node.setString(pl.winall + "");
            uibind.normalNode.winNum1._node.ignoreContentAdaptWithSize(true);
            if (MjClient.getAppType() != MjClient.APP_TYPE.QXYYQP && MjClient.getAppType() != MjClient.APP_TYPE.HUBEIMJ &&  MjClient.getAppType() != MjClient.APP_TYPE.YLHUNANMJ)
                uibind.normalNode.winNum1._node.setScale(0.8);
        }
        else {
            uibind.normalNode.winNum1._node.visible= false;
            uibind.normalNode.winNum2._node.visible =true;
            uibind.normalNode.winNum2._node.setString(Math.abs(pl.winall) + "");
            uibind.normalNode.winNum2._node.ignoreContentAdaptWithSize(true);
            if (MjClient.getAppType() != MjClient.APP_TYPE.QXYYQP && MjClient.getAppType() != MjClient.APP_TYPE.HUBEIMJ &&  MjClient.getAppType() != MjClient.APP_TYPE.YLHUNANMJ)
                uibind.normalNode.winNum2._node.setScale(0.8);
        }
    }
    var pos = cc.p(-85, 345);
    if (MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ) {
        pos = cc.p(-140, 345);
    }
    AddFangKaIcon(sData, _fangkaNode, tData, pl, MaxWinAll, MaxWinPlayer,  MaxloseAll, MaxlosePlayer, pos);


    if (pl.isNeedFanBei) {
        if (MjClient.getAppType() != MjClient.APP_TYPE.QXYZQP && MjClient.getAppType() != MjClient.APP_TYPE.AYGUIZHOUMJ)
        {
            var yoff = 15;
            uibind.winNode.winNum._node.y += yoff;
            // node.getChildByName("line_hua_0").y += yoff;
            uibind.normalNode.winNum1._node.y += yoff;
            uibind.normalNode.winNum2._node.y += yoff;
        }
        var beiShu = 1;
        if (tData.areaSelectMode.fanBei == 1)beiShu = 2;
        else if(tData.areaSelectMode.fanBei == 2)beiShu = 3;

        var fanbeiFormula = node.getChildByName("fanbeiFormula");
        fanbeiFormula.setVisible(true);
        fanbeiFormula.setString("(" + Math.floor(pl.winall/beiShu*10)/10 + "x"+ beiShu + ")");
        fanbeiFormula.ignoreContentAdaptWithSize(true);
        var bWin = (MaxWinAll !=0 && MaxWinAll == pl.winall);
        
        if (MjClient.getAppType() != MjClient.APP_TYPE.BDHYZP) {
            fanbeiFormula.setColor(bWin? cc.color(0xff,0xfe,0xd6):cc.color(0xd4,0xfe,0xff));
        } else {
            fanbeiFormula.setColor(bWin? cc.color(0xf0,0xff,0x76):cc.color(0x78,0xf7,0xff));
        }
        fanbeiFormula.enableOutline(bWin? cc.color(0xb2,0x43,0x3e):cc.color(0x15,0x5c,0xa8), 1);
    }

    node.getChildByName("fangzhu").visible = tData.owner == pl.info.uid;

    // 江苏,徐州新版大结算UI，不用调node位置
    if(!(MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ ||
         MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ ||
         MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP ||
         MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ || 
         MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ)){
        var maxPlayer = parseInt(MjClient.data.sData.tData.maxPlayer);
        var size = node.getChildByName("bg").getContentSize().width * (4 - maxPlayer) / (maxPlayer + 1);
        node.x += size * (off + 1);
    }
}

//设置单个玩家的详细信息,跑得快(岳阳New) 贵州跑得快
function SetGameOverLayer_paodekuai_QXYYQP(node,off)
{
    var sData=MjClient.data.sData;
    var tData=sData.tData;
    var pl=MjClient.getPlayerByIndex(off);
    if(!pl)
    {
        node.setVisible(false);
        return;
    }
    node.setVisible(true);
    var uidSelf = SelfUid();
    var MaxWinAll=0;
    var MaxDianPao=0;
    var MaxlosePlayer = null;
    var MaxWinPlayer = null;
    var MaxloseAll = 999999999;
    //计算所有人数据
    for (var uid in sData.players) {
        var pi = sData.players[uid];
        if (pi) {
            if (MaxWinAll < pi.winall) {
                MaxWinAll = pi.winall;
                MaxWinPlayer = uid;

            }else if (MaxWinAll == pi.winall) {
                if (parseInt(uid) < parseInt(MaxWinPlayer)) {
                    MaxWinAll = pi.winall;
                    MaxWinPlayer = uid;
                }
            }
            if (pi.winall < MaxloseAll) {
                MaxloseAll = pi.winall;
                MaxlosePlayer = uid;
            }else if (pi.winall == MaxloseAll) {
                if (parseInt(uid) < parseInt(MaxlosePlayer)) {
                    MaxloseAll = pi.winall;
                    MaxlosePlayer = uid;
                }
            }
        }
    }

    var uibind={
        dayingjia_light:{
            _visible: false,
            _run: function() {
                if(MaxWinAll != 0 && MaxWinAll == pl.winall )//大赢家
                {
                    this.visible = true;
                }
            },
        },
        name:{
            _run: function() {
                this.ignoreContentAdaptWithSize(true);
                this.setFontName("Arial");
                this.setFontSize(this.getFontSize());
            },
            _text: function() {
                if (!pl) {
                    return "";
                }
                return getNewName(unescape(pl.info.nickname ) + "");
            }
        },
        id: {
            _run:function(){
                this.ignoreContentAdaptWithSize(true);
            },
            _text: function () {
                if(!pl)
                {
                    return "";
                }
                return "ID:" + pl.info.uid.toString();
            }
        },
        winNode:{
            winNum:{
            },
            bigWinner:{
                _visible : false
            }
        },
        lastNode:{
            winNum1:{},
            winNum2:{},
        },
        normalNode:{
            winNum1:{},
            winNum2:{},
        },
        statistc:{
            item0:{
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                },
                _text: function () {
                    return "胜利次数：";
                },
                Text:{
                    _text: function () {
                        if(!pl || !pl.roomStatistics || !pl.roomStatistics[0]) {
                            return "0";
                        }
                        return pl.roomStatistics[0] > 0 ? pl.roomStatistics[0] + "" : "0";
                    },
                    _run:function() {
                        var childTex = this.getParent().getChildByName("Text_0");
                        childTex.ignoreContentAdaptWithSize(true);
                        childTex.setString(this.getString());
                        if (this.getParent().getString() == "") {
                            this.visible = false;
                            childTex.visible = false;
                        }
                        if(MaxWinAll != 0 && MaxWinAll == pl.winall ) { //大赢家
                            this.visible = false;
                            childTex.visible = true;
                        }
                        else {
                            this.visible = true;
                            childTex.visible = false;
                        }
                        this.ignoreContentAdaptWithSize(true);
                    },
                },
            },

            item1:{
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                },
                _text: function () {
                    return "炸弹次数：";
                },
                Text:{
                    _text: function () {
                        if(!pl || !pl.roomStatistics || !pl.roomStatistics[1]) {
                            return "0";
                        }
                        return pl.roomStatistics[1] > 0 ? pl.roomStatistics[1] + "" : "0";
                    },
                    _run:function() {
                        var childTex = this.getParent().getChildByName("Text_0");
                        childTex.ignoreContentAdaptWithSize(true);
                        childTex.setString(this.getString());
                        if (this.getParent().getString() == "") {
                            this.visible = false;
                            childTex.visible = false;
                        }
                        if(MaxWinAll != 0 && MaxWinAll == pl.winall ) { //大赢家
                            this.visible = false;
                            childTex.visible = true;
                        }
                        else {
                            this.visible = true;
                            childTex.visible = false;
                        }
                        this.ignoreContentAdaptWithSize(true);
                    },
                },
            },
            item2:{
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                },
                _text: function () {
                    return "单局最高：";
                },
                Text:{
                    _text: function () {
                        if(!pl || !pl.roomStatistics || !pl.roomStatistics[2]) {
                            return "0";
                        }
                        return pl.roomStatistics[2] > 0 ? pl.roomStatistics[2] + "" : "";
                    },
                    _run:function() {
                        var childTex = this.getParent().getChildByName("Text_0");
                        childTex.ignoreContentAdaptWithSize(true);
                        childTex.setString(this.getString());
                        if (this.getParent().getString() == "") {
                            this.visible = false;
                            childTex.visible = false;
                        }
                        if(MaxWinAll != 0 && MaxWinAll == pl.winall ) { //大赢家
                            this.visible = false;
                            childTex.visible = true;
                        }
                        else {
                            this.visible = true;
                            childTex.visible = false;
                        }
                        this.ignoreContentAdaptWithSize(true);
                    },
                },
            },
            item3:{
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                },
                _text: function () {
                    return "被关春天：";
                },
                Text:{
                    _text: function () {
                        if(!pl || !pl.roomStatistics || !pl.roomStatistics[3]) {
                            return "0";
                        }
                        return pl.roomStatistics[3] > 0 ? pl.roomStatistics[3] + "" : "0";
                    },
                    _run:function() {
                        var childTex = this.getParent().getChildByName("Text_0");
                        childTex.ignoreContentAdaptWithSize(true);
                        childTex.setString(this.getString());
                        if (this.getParent().getString() == "") {
                            this.visible = false;
                            childTex.visible = false;
                        }
                        if(MaxWinAll != 0 && MaxWinAll == pl.winall ) { //大赢家
                            this.visible = false;
                            childTex.visible = true;
                        }
                        else {
                            this.visible = true;
                            childTex.visible = false;
                        }
                        this.ignoreContentAdaptWithSize(true);
                    },
                },
            },
            item4:{
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                },
                _text: function () {
                    return "扎鸟次数：";
                },
                Text:{
                    _text: function () {
                        if(!pl || !pl.roomStatistics || !pl.roomStatistics[4]) {
                            return "0";
                        }
                        return pl.roomStatistics[4] > 0 ? pl.roomStatistics[4] + "" : "0";
                    },
                    _run:function() {
                        var childTex = this.getParent().getChildByName("Text_0");
                        childTex.ignoreContentAdaptWithSize(true);
                        childTex.setString(this.getString());
                        if (this.getParent().getString() == "") {
                            this.visible = false;
                            childTex.visible = false;
                        }
                        if(MaxWinAll != 0 && MaxWinAll == pl.winall ) { //大赢家
                            this.visible = false;
                            childTex.visible = true;
                        }
                        else {
                            this.visible = true;
                            childTex.visible = false;
                        }
                        this.ignoreContentAdaptWithSize(true);
                    },
                },
            },
            item5:{
                _text: function () {
                    return "";
                },
                Text:{
                    _text: function () {

                    },
                    _run:function() {
                        var childTex = this.getParent().getChildByName("Text_0");
                        childTex.ignoreContentAdaptWithSize(true);
                        childTex.setString(this.getString());
                        if (this.getParent().getString() == "") {
                            this.visible = false;
                            childTex.visible = false;
                        }
                        this.ignoreContentAdaptWithSize(true);
                    },
                },
            },
        },
        listView:{
            _run:function(){
                this.visible = false;
            }
        }
    }

    // 显示玩家头像
    var head = node.getChildByName("head");
    if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP ||  MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ ||MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ ) {
        CircularCuttingHeadImg(head, pl);
    }
    else {
       addWxHeadToEndUI(head, off);
    }

    BindUiAndLogic(node,uibind);

    setUserOfflineWinGamePanel(node,pl);

    if(!pl)
    {
        uibind.normalNode._node.visible = false;
        uibind.lastNode._node.visible =false;
        uibind.winNode._node.visible = false;
        uibind.winNode.bigWinner._node.visible = false;
        uibind.winNode.winNum._node.visible = false;
        node.getChildByName("fangzhu").visible =false;
        return;
    }

    var numValue = Math.abs(pl.winall) + "";

    var _winScore = pl.winall;
    if((tData.areaSelectMode.scoreNeedEnough == 1) &&pl.winall2){
        _winScore = pl.winall2
    }

    var _fangkaNode;
    //最高得分
    if (MaxWinAll !=0 && MaxWinAll == pl.winall ) {
        uibind.normalNode._node.visible = false;
        uibind.lastNode._node.visible =false;
        uibind.winNode._node.visible = true;
        uibind.winNode.bigWinner._node.visible = true;
        uibind.winNode.winNum._node.setString(_winScore + "");
        uibind.winNode.winNum._node.ignoreContentAdaptWithSize(true);
        if (MjClient.getAppType() != MjClient.APP_TYPE.QXYYQP &&  MjClient.getAppType() != MjClient.APP_TYPE.YLHUNANMJ && MjClient.getAppType() != MjClient.APP_TYPE.HUBEIMJ &&
        MjClient.getAppType() != MjClient.APP_TYPE.AYGUIZHOUMJ)
            uibind.winNode.winNum._node.setScale(0.8);
        var nodeParent = node.getParent();
        var _share = nodeParent.getChildByName("share");
        var _shine = _share.getChildByName("img_shine");
        var _point = _share.getChildByName("img_point");
        var _txt = _share.getChildByName("img_txt");
        var act_Func = function() {
            var a = cc.scaleTo(0.5, 1.0);
            var aa = cc.fadeIn(0.5);
            var a1 = cc.scaleTo(1.0, 4);
            var a2 = cc.fadeOut(1.0);
            var act_2 = cc.rotateBy(0.8, 30);
            var act_3 = cc.rotateBy(0.8, -30);
            var a3 =  cc.callFunc(function() {
                _shine.setScale(1);
            }.bind(_shine));
            _shine.runAction(cc.sequence(cc.spawn(a,aa), cc.spawn(a1,a2),a3,cc.delayTime(0.1)).repeatForever());
            _point.runAction(cc.sequence(act_2, act_3).repeatForever());

        }
        var clubInfoTable = getClubInfoInTable();
        if (clubInfoTable && pl.info.uid == SelfUid() && MjClient.getAppType() != MjClient.APP_TYPE.QXYYQP && MjClient.getAppType() != MjClient.APP_TYPE.HUBEIMJ &&  MjClient.getAppType() != MjClient.APP_TYPE.YLHUNANMJ) {
            _shine.setVisible(true);
            _point.setVisible(true);
            _txt.setVisible(true);
            act_Func();
        }
        // 背景
        var _bgNode = node.getChildByName("bg");
        _bgNode.loadTexture("gameOver/pjjs_9.png");
        _fangkaNode = uibind.winNode._node;

    }//点炮最多
    else if( MaxDianPao != 0 && MaxDianPao == pl.dianpaoTotal ){
        uibind.winNode._node.visible = false;
        uibind.normalNode._node.visible = false;
        uibind.lastNode._node.visible =true;
        _fangkaNode = uibind.lastNode._node;
        if( pl.winall >=0 ){
            uibind.lastNode.winNum1._node.visible = true;
            uibind.lastNode.winNum2._node.visible = false;
            uibind.lastNode.winNum1._node.setString(_winScore + "");
            uibind.lastNode.winNum1._node.ignoreContentAdaptWithSize(true);
        }
        else{
            uibind.lastNode.winNum1._node.visible = false;
            uibind.lastNode.winNum2._node.visible = true;
            uibind.lastNode.winNum2._node.setString(Math.abs(_winScore) + "");
            uibind.lastNode.winNum2._node.ignoreContentAdaptWithSize(true);
        }
    }
    else{
        uibind.winNode._node.visible = false;
        uibind.lastNode._node.visible =false;
        uibind.normalNode._node.visible = true;
        _fangkaNode = uibind.normalNode._node;
        if( pl.winall >= 0 ){
            uibind.normalNode.winNum2._node.visible =false;
            uibind.normalNode.winNum1._node.visible= true;
            uibind.normalNode.winNum1._node.setString(_winScore + "");
            uibind.normalNode.winNum1._node.ignoreContentAdaptWithSize(true);
        }
        else {
            uibind.normalNode.winNum1._node.visible= false;
            uibind.normalNode.winNum2._node.visible =true;
            uibind.normalNode.winNum2._node.setString(Math.abs(_winScore) + "");
            uibind.normalNode.winNum2._node.ignoreContentAdaptWithSize(true);
        }
    }
    // 
    var pos = cc.p(-110, 385);
    if(MjClient.getAppType() == MjClient.APP_TYPE.AYGUIZHOUMJ){
        pos = cc.p(-135, 410);
    } 
    AddFangKaIcon(sData, _fangkaNode, tData, pl, MaxWinAll, MaxWinPlayer,  MaxloseAll, MaxlosePlayer, pos);
    
    if (pl.isNeedFanBei) {
        var yoff = 15;
        uibind.winNode.winNum._node.y += yoff;
        var linhua = node.getChildByName("line_hua_0");
        if (linhua) linhua.y += yoff;
        uibind.normalNode.winNum1._node.y += yoff;
        uibind.normalNode.winNum2._node.y += yoff;

        var fanbeiFormula = node.getChildByName("fanbeiFormula");
        fanbeiFormula.setVisible(true);
        fanbeiFormula.setString("(" + Math.floor(pl.winall/2*10)/10 + "x2)");
        fanbeiFormula.ignoreContentAdaptWithSize(true);
        var bWin = (MaxWinAll !=0 && MaxWinAll == pl.winall);
        fanbeiFormula.setColor(bWin? cc.color(0xff,0xfe,0xd6):cc.color(0xd4,0xfe,0xff));
        fanbeiFormula.enableOutline(bWin? cc.color(0xb2,0x43,0x3e):cc.color(0x15,0x5c,0xa8), 1);
    }

    node.getChildByName("fangzhu").visible = tData.owner == pl.info.uid;

    var maxPlayer = parseInt(MjClient.data.sData.tData.maxPlayer);
    var size = node.getChildByName("bg").getContentSize().width * (4 - maxPlayer) / (maxPlayer + 1);
    node.x += size * (off + 1);
    //  cc.log("===== lms ---scoreNeedEnough ",(tData.areaSelectMode.scoreNeedEnough ) , pl.winall2 ,(pl.winall2 < 0) , (pl.winall2 > pl.winall))
    if ((tData.areaSelectMode.scoreNeedEnough == 1) && pl.winall2 && (pl.winall2 < 0) && (pl.winall2 > pl.winall)) {
        var textTip = new ccui.ImageView("gameOver/newOver/jifenbuzu.png");
        textTip.setPosition(cc.p(0, 167));
        node.addChild(textTip);
    }

}

//设置单个玩家的详细信息,跑得快
function SetGameOverLayer_paodekuai_QXSYDTZ(node,off)
{
    var sData=MjClient.data.sData;
    var tData=sData.tData;
    var pl=MjClient.getPlayerByIndex(off);
    if(!pl)
    {
        node.setVisible(false);
        return;
    }
    node.setVisible(true);
    var uidSelf = SelfUid();
    var MaxWinAll = 0;
    var MaxDianPao = 0;
    var MaxlosePlayer = null;
    var MaxWinPlayer = null;
    var MaxloseAll = 999999999;

    //计算所有人数据
    for (var uid in sData.players) {
        var pi = sData.players[uid];
        if (pi) {
            if (MaxWinAll < pi.winall) {
                MaxWinAll = pi.winall;
                MaxWinPlayer = uid;

            }else if (MaxWinAll == pi.winall) {
                if (parseInt(uid) < parseInt(MaxWinPlayer)) {
                    MaxWinAll = pi.winall;
                    MaxWinPlayer = uid;
                }
            }
            if (pi.winall < MaxloseAll) {
                MaxloseAll = pi.winall;
                MaxlosePlayer = uid;
            }else if (pi.winall == MaxloseAll) {
                if (parseInt(uid) < parseInt(MaxlosePlayer)) {
                    MaxloseAll = pi.winall;
                    MaxlosePlayer = uid;
                }
            }
        }
    }


    var uibind={
        dayingjia_light:{
            _visible: false,
            _run: function() {
                if(MaxWinAll != 0 && MaxWinAll == pl.winall )//大赢家
                {
                    this.visible = true;
                }
            },
        },
        name:{
            _run: function() {
                this.setFontName("Arial");
                this.ignoreContentAdaptWithSize(true);
            },
            _text: function() {
                if (!pl) {
                    return "";
                }
                return getNewName(unescape(pl.info.nickname) + "");
            }
        },
        id: {
            _run:function(){
                this.ignoreContentAdaptWithSize(true);
            },
            _text: function () {
                if(!pl)
                {
                    return "";
                }
                return "ID:" + pl.info.uid.toString();
            }
        },
        winNode:{
            winNum:{
            },
            bigWinner:{
                _visible : false
            }
        },
        lastNode:{
            winNum1:{},
            winNum2:{},
        },
        normalNode:{
            winNum1:{},
            winNum2:{},
        },
        statistc:{
            item0:{
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                },
                _text: function () {
                    return "胜利次数：";
                },
                Text:{
                    _text: function () {
                        if(!pl || !pl.roomStatistics || !pl.roomStatistics[0]) {
                            return "0";
                        }
                        return pl.roomStatistics[0] > 0 ? pl.roomStatistics[0] + "" : "0";
                    },
                    _run:function() {
                        var childTex = this.getParent().getChildByName("Text_0");
                        childTex.ignoreContentAdaptWithSize(true);
                        childTex.setString(this.getString());
                        if (this.getParent().getString() == "") {
                            this.visible = false;
                            childTex.visible = false;
                        }
                        if(MaxWinAll != 0 && MaxWinAll == pl.winall ) { //大赢家
                            this.visible = false;
                            childTex.visible = true;
                        }
                        else {
                            this.visible = true;
                            childTex.visible = false;
                        }
                        this.ignoreContentAdaptWithSize(true);
                    },
                },
            },

            item1:{
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                },
                _text: function () {
                    return "炸弹次数：";
                },
                Text:{
                    _text: function () {
                        if(!pl || !pl.roomStatistics || !pl.roomStatistics[1]) {
                            return "0";
                        }
                        return pl.roomStatistics[1] > 0 ? pl.roomStatistics[1] + "" : "0";
                    },
                    _run:function() {
                        var childTex = this.getParent().getChildByName("Text_0");
                        childTex.ignoreContentAdaptWithSize(true);
                        childTex.setString(this.getString());
                        if (this.getParent().getString() == "") {
                            this.visible = false;
                            childTex.visible = false;
                        }
                        if(MaxWinAll != 0 && MaxWinAll == pl.winall ) { //大赢家
                            this.visible = false;
                            childTex.visible = true;
                        }
                        else {
                            this.visible = true;
                            childTex.visible = false;
                        }
                        this.ignoreContentAdaptWithSize(true);
                    },
                },
            },
            item2:{
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                },
                _text: function () {
                    return "单局最高：";
                },
                Text:{
                    _text: function () {
                        if(!pl || !pl.roomStatistics || !pl.roomStatistics[2]) {
                            return "0";
                        }
                        return pl.roomStatistics[2] > 0 ? pl.roomStatistics[2] + "" : "";
                    },
                    _run:function() {
                        var childTex = this.getParent().getChildByName("Text_0");
                        childTex.ignoreContentAdaptWithSize(true);
                        childTex.setString(this.getString());
                        if (this.getParent().getString() == "") {
                            this.visible = false;
                            childTex.visible = false;
                        }
                        if(MaxWinAll != 0 && MaxWinAll == pl.winall ) { //大赢家
                            this.visible = false;
                            childTex.visible = true;
                        }
                        else {
                            this.visible = true;
                            childTex.visible = false;
                        }
                        this.ignoreContentAdaptWithSize(true);
                    },
                },
            },
            item3:{
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                },
                _text: function () {
                    return "被关春天：";
                },
                Text:{
                    _text: function () {
                        if(!pl || !pl.roomStatistics || !pl.roomStatistics[3]) {
                            return "0";
                        }
                        return pl.roomStatistics[3] > 0 ? pl.roomStatistics[3] + "" : "0";
                    },
                    _run:function() {
                        var childTex = this.getParent().getChildByName("Text_0");
                        childTex.ignoreContentAdaptWithSize(true);
                        childTex.setString(this.getString());
                        if (this.getParent().getString() == "") {
                            this.visible = false;
                            childTex.visible = false;
                        }
                        if(MaxWinAll != 0 && MaxWinAll == pl.winall ) { //大赢家
                            this.visible = false;
                            childTex.visible = true;
                        }
                        else {
                            this.visible = true;
                            childTex.visible = false;
                        }
                        this.ignoreContentAdaptWithSize(true);
                    },
                },
            },
            item4:{
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                },
                _text: function () {
                    return "扎鸟次数：";
                },
                Text:{
                    _text: function () {
                        if(!pl || !pl.roomStatistics || !pl.roomStatistics[4]) {
                            return "0";
                        }
                        return pl.roomStatistics[4] > 0 ? pl.roomStatistics[4] + "" : "0";
                    },
                    _run:function() {
                        var childTex = this.getParent().getChildByName("Text_0");
                        childTex.ignoreContentAdaptWithSize(true);
                        childTex.setString(this.getString());
                        if (this.getParent().getString() == "") {
                            this.visible = false;
                            childTex.visible = false;
                        }
                        if(MaxWinAll != 0 && MaxWinAll == pl.winall ) { //大赢家
                            this.visible = false;
                            childTex.visible = true;
                        }
                        else {
                            this.visible = true;
                            childTex.visible = false;
                        }
                        this.ignoreContentAdaptWithSize(true);
                    },
                },
            },
            item5:{
                _text: function () {
                    return "";
                },
                Text:{
                    _text: function () {
                        
                    },
                    _run:function() {
                        var childTex = this.getParent().getChildByName("Text_0");
                        childTex.ignoreContentAdaptWithSize(true);
                        childTex.setString(this.getString());
                        if (this.getParent().getString() == "") {
                            this.visible = false;
                            childTex.visible = false;
                        }
                        this.ignoreContentAdaptWithSize(true);
                    },
                },
            },
        },
    }

    // 显示玩家头像
    var head = node.getChildByName("head");
    CircularCuttingHeadImg(head, pl);

    BindUiAndLogic(node,uibind);

    if(!pl)
    {
        uibind.normalNode._node.visible = false;
        uibind.lastNode._node.visible =false;
        uibind.winNode._node.visible = false;
        uibind.winNode.bigWinner._node.visible = false;
        uibind.winNode.winNum._node.visible = false;
        node.getChildByName("fangzhu").visible =false;
        return;
    }

    setUserOfflineWinGamePanel(node,pl);
    
    var numValue = Math.abs(pl.winall) + "";


    var _winScore = pl.winall;
    if((tData.areaSelectMode.scoreNeedEnough == 1) &&pl.winall2){
        _winScore = pl.winall2
    }
    var _fangkaNode;
    //最高得分
    if (MaxWinAll !=0 && MaxWinAll == pl.winall ) {
        uibind.normalNode._node.visible = false;
        uibind.lastNode._node.visible =false;
        uibind.winNode._node.visible = true;
        uibind.winNode.bigWinner._node.visible = true;
        uibind.winNode.winNum._node.setString(_winScore + "");
        uibind.winNode.winNum._node.ignoreContentAdaptWithSize(true);
        _fangkaNode = uibind.winNode._node;
        if (MjClient.getAppType() != MjClient.APP_TYPE.QXSYDTZ && MjClient.getAppType() != MjClient.APP_TYPE.HUNANWANGWANG && MjClient.getAppType() != MjClient.APP_TYPE.QXLYQP)
            uibind.winNode.winNum._node.setScale(0.8);
        var nodeParent = node.getParent();
        var _share = nodeParent.getChildByName("share");
        var _shine = _share.getChildByName("img_shine");
        var _point = _share.getChildByName("img_point");
        var _txt = _share.getChildByName("img_txt");
        var act_Func = function() {
            var a = cc.scaleTo(0.5, 1.0);
            var aa = cc.fadeIn(0.5);
            var a1 = cc.scaleTo(1.0, 4);
            var a2 = cc.fadeOut(1.0);
            var act_2 = cc.rotateBy(0.8, 30);
            var act_3 = cc.rotateBy(0.8, -30);
            var a3 =  cc.callFunc(function() {
                _shine.setScale(1);
            }.bind(_shine));
            _shine.runAction(cc.sequence(cc.spawn(a,aa), cc.spawn(a1,a2),a3,cc.delayTime(0.1)).repeatForever());
            _point.runAction(cc.sequence(act_2, act_3).repeatForever());

        }
        var clubInfoTable = getClubInfoInTable();
        if (clubInfoTable && pl.info.uid == SelfUid()) {
            _shine.setVisible(true);
            _point.setVisible(true);
            _txt.setVisible(true);
            act_Func();
        }
        // 背景
        var _bgNode = node.getChildByName("bg");
        _bgNode.loadTexture("gameOver/pjjs_9.png");

        if (pl.isNeedFanBei) {
            uibind.winNode.winNum._node.y += 15;
            node.getChildByName("line_hua_0").y += 15;

            var bWin = true;
        }

    }//点炮最多
    else if( MaxDianPao != 0 && MaxDianPao == pl.dianpaoTotal ){
        uibind.winNode._node.visible = false;
        uibind.normalNode._node.visible = false;
        uibind.lastNode._node.visible =true;
        _fangkaNode = uibind.lastNode._node;
        if( pl.winall >=0 ){
            uibind.lastNode.winNum1._node.visible = true;
            uibind.lastNode.winNum2._node.visible = false;
            uibind.lastNode.winNum1._node.setString(_winScore + "");
            uibind.lastNode.winNum1._node.ignoreContentAdaptWithSize(true);
        }
        else{
            uibind.lastNode.winNum1._node.visible = false;
            uibind.lastNode.winNum2._node.visible = true;
            uibind.lastNode.winNum2._node.setString(Math.abs(_winScore) + "");
            uibind.lastNode.winNum2._node.ignoreContentAdaptWithSize(true);
        }
    }
    else{
        uibind.winNode._node.visible = false;
        uibind.lastNode._node.visible =false;
        uibind.normalNode._node.visible = true;
        _fangkaNode = uibind.normalNode._node;
        if( pl.winall >= 0 ){
            uibind.normalNode.winNum2._node.visible =false;
            uibind.normalNode.winNum1._node.visible= true;
            uibind.normalNode.winNum1._node.setString(_winScore + "");
            uibind.normalNode.winNum1._node.ignoreContentAdaptWithSize(true);

            if (pl.isNeedFanBei) {
                uibind.normalNode.winNum1._node.y += 15;
            }
        }
        else {
            uibind.normalNode.winNum1._node.visible= false;
            uibind.normalNode.winNum2._node.visible =true;
            uibind.normalNode.winNum2._node.setString(Math.abs(_winScore) + "");
            uibind.normalNode.winNum2._node.ignoreContentAdaptWithSize(true);

            if (pl.isNeedFanBei) {
                uibind.normalNode.winNum2._node.y += 15;
            }
        }

        if (pl.isNeedFanBei) {
            node.getChildByName("line_hua_0").y += 15;

            var bWin = false;
        }
    }

    AddFangKaIcon(sData, _fangkaNode, tData, pl, MaxWinAll, MaxWinPlayer,  MaxloseAll, MaxlosePlayer, cc.p(-100, 385));


    if (pl.isNeedFanBei) {
        var fanbeiFormula = node.getChildByName("fanbeiFormula");

        fanbeiFormula.setVisible(true);
        var strTmp = "(" + revise(pl.winall/2) + "x2)"
        if (tData.areaSelectMode.jiaFen > 0 && tData.maxPlayer == 2 && MaxWinAll > 0)
        {//如果有加分
            var sc = pl.winall+(tData.areaSelectMode.jiaFen*(pl.winall>0? -1:1));
            strTmp = "(" + revise(sc/2) + "x2)"
            strTmp = strTmp + (pl.winall>0? ("+"+tData.areaSelectMode.jiaFen) : ("-"+tData.areaSelectMode.jiaFen))
        }
        fanbeiFormula.setString(strTmp);
        fanbeiFormula.ignoreContentAdaptWithSize(true);
        if (bWin) {
            fanbeiFormula.setColor(cc.color(0xff,0xfe,0xd6));
            fanbeiFormula.enableOutline(cc.color(0xb2,0x43,0x3e), 1);
        }
        else {
            fanbeiFormula.setColor(cc.color(0xd4,0xfe,0xff));
            fanbeiFormula.enableOutline(cc.color(0x15,0x5c,0xa8), 1);
        }
    }


    if (tData.owner == pl.info.uid)
    {
        node.getChildByName("fangzhu").visible =true;
    }
    else{
        node.getChildByName("fangzhu").visible =false;
    }

    var maxPlayer = parseInt(MjClient.data.sData.tData.maxPlayer);
    var size = node.getChildByName("bg").getContentSize().width * (4 - maxPlayer) / (maxPlayer + 1);
    node.x += size * (off + 1);

    if ((tData.areaSelectMode.scoreNeedEnough == 1) && pl.winall2 && (pl.winall2 < 0) && (pl.winall2 > pl.winall)) {
        var textTip = new ccui.ImageView("gameOver/newOver/jifenbuzu.png");
        textTip.setPosition(cc.p(0, 167));
        node.addChild(textTip);
    }

}

//设置单个玩家的详细信息,三打哈
function SetGameOverLayer_sanDaHa(node, off)
{
    var sData = MjClient.data.sData;
    var tData = sData.tData;
    var pl = MjClient.getPlayerByIndex(off);
    if (!pl) {
        node.setVisible(false);
        return;
    }
    node.setVisible(true);
    var uidSelf = SelfUid();
    var MaxWinAll = 0;
    var MaxDianPao = 0;
    var MaxlosePlayer = null;
    var MaxWinPlayer = null;
    var MaxloseAll = 999999999;

    //计算所有人数据
    for (var uid in sData.players) {
        var pi = sData.players[uid];
        if (pi) {
            if (MaxWinAll < pi.winall) {
                MaxWinAll = pi.winall;
                MaxWinPlayer = uid;

            }else if (MaxWinAll == pi.winall) {
                if (parseInt(uid) < parseInt(MaxWinPlayer)) {
                    MaxWinAll = pi.winall;
                    MaxWinPlayer = uid;
                }
            }
            if (pi.winall < MaxloseAll) {
                MaxloseAll = pi.winall;
                MaxlosePlayer = uid;
            }else if (pi.winall == MaxloseAll) {
                if (parseInt(uid) < parseInt(MaxlosePlayer)) {
                    MaxloseAll = pi.winall;
                    MaxlosePlayer = uid;
                }
            }
        }
    }

    var uibind = {
        name: {
            _run:function(){
                this.setFontName("Arial");
                this.setFontSize(this.getFontSize());
                this.ignoreContentAdaptWithSize(true);
            },
            _text: function() {
                if (!pl) {
                    return "";
                }
                return getNewName(unescape(pl.info.nickname ) + "");
            }
        },
        id: {
            _run: function() {
                this.ignoreContentAdaptWithSize(true);
            },
            _text: function() {
                if (!pl) {
                    return "";
                }
                return "ID:" + pl.info.uid.toString();
            }
        },
        winNode: {
            winNum: {},
            bigWinner: {
                _visible: false
            }
        },
        lastNode: {
            winNum1: {},
            winNum2: {},
        },
        normalNode: {
            winNum1: {},
            winNum2: {},
        },
        statistc: {
            item0: {
                _run: function() {
                    this.ignoreContentAdaptWithSize(true);
                },
                _text: function() {
                    if(MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_SAN_DA_HA || MjClient.gameType == MjClient.GAME_TYPE.XIANG_XIANG_SAN_DA_HA)
                    {
                        if(!pl || !pl.roomStatistics || !pl.roomStatistics[0])
                        {
                            return "当庄局数：0";
                        }
                        return "当庄局数：" +  (pl.roomStatistics[0]  > 0? pl.roomStatistics[0] +"":"0" );
                    }else{
                        return "当庄局数：";
                    }

                },
                Text:{
                    _text: function () {
                        if (!pl || !pl.roomStatistics || !pl.roomStatistics[0]) {
                            return "0";
                        }
                        return pl.roomStatistics[0] > 0 ? pl.roomStatistics[0] + "" : "0";
                    },
                    _run:function() {
                        var childTex = this.getParent().getChildByName("Text_0");
                        childTex.ignoreContentAdaptWithSize(true);
                        childTex.setString(this.getString());
                        if (this.getParent().getString() == "") {
                            this.visible = false;
                            childTex.visible = false;
                        }
                        if(MaxWinAll != 0 && MaxWinAll == pl.winall ) { //大赢家
                            this.visible = false;
                            childTex.visible = true;
                        }
                        else {
                            this.visible = true;
                            childTex.visible = false;
                        }
                        this.ignoreContentAdaptWithSize(true);
                    },
                },
            },

            item1: {
                _run: function() {
                    this.ignoreContentAdaptWithSize(true);
                },
                _text: function() {
                    if(MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_SAN_DA_HA || MjClient.gameType == MjClient.GAME_TYPE.XIANG_XIANG_SAN_DA_HA)
                    {
                        if(!pl || !pl.roomStatistics || !pl.roomStatistics[1])
                        {
                            return "当庄赢局数：0";
                        }
                        return "当庄赢局数：" +  (pl.roomStatistics[1]  > 0? pl.roomStatistics[0] +"":"0" );
                    }else{
                        return "当庄赢局数：";
                    }
                },
                Text:{
                    _text: function () {
                        if (!pl || !pl.roomStatistics || !pl.roomStatistics[1]) {
                            return "0";
                        }
                        return pl.roomStatistics[1] > 0 ? pl.roomStatistics[1] + "" : "0";
                    },
                    _run:function() {
                        var childTex = this.getParent().getChildByName("Text_0");
                        childTex.ignoreContentAdaptWithSize(true);
                        childTex.setString(this.getString());
                        if (this.getParent().getString() == "") {
                            this.visible = false;
                            childTex.visible = false;
                        }
                        if(MaxWinAll != 0 && MaxWinAll == pl.winall ) { //大赢家
                            this.visible = false;
                            childTex.visible = true;
                        }
                        else {
                            this.visible = true;
                            childTex.visible = false;
                        }
                        this.ignoreContentAdaptWithSize(true);
                    },
                },
            },
            item2: {
                _run: function() {
                    this.ignoreContentAdaptWithSize(true);
                },
                _text: function() {
                    if(MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_SAN_DA_HA || MjClient.gameType == MjClient.GAME_TYPE.XIANG_XIANG_SAN_DA_HA)
                    {
                        if(!pl || !pl.roomStatistics || !pl.roomStatistics[2])
                        {
                            return "总赢局数：0";
                        }
                        return "总赢局数：" +  (pl.roomStatistics[2]  > 0? pl.roomStatistics[2] +"":"0" );
                    }else{
                        return "总赢局数：";
                    }
                },
                Text:{
                    _text: function () {
                        if (!pl || !pl.roomStatistics || !pl.roomStatistics[2]) {
                            return "0";
                        }
                        return pl.roomStatistics[2] > 0 ? pl.roomStatistics[2] + "" : "0";
                    },
                    _run:function() {
                        var childTex = this.getParent().getChildByName("Text_0");
                        childTex.ignoreContentAdaptWithSize(true);
                        childTex.setString(this.getString());
                        if (this.getParent().getString() == "") {
                            this.visible = false;
                            childTex.visible = false;
                        }
                        if(MaxWinAll != 0 && MaxWinAll == pl.winall ) { //大赢家
                            this.visible = false;
                            childTex.visible = true;
                        }
                        else {
                            this.visible = true;
                            childTex.visible = false;
                        }
                        this.ignoreContentAdaptWithSize(true);
                    },
                },
            },
            item3: {
                _run: function() {
                    this.ignoreContentAdaptWithSize(true);
                },
                _text: function() {
                    if(MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_SAN_DA_HA || MjClient.gameType == MjClient.GAME_TYPE.XIANG_XIANG_SAN_DA_HA)
                    {
                        if(!pl || !pl.roomStatistics || !pl.roomStatistics[3])
                        {
                            return "大光获胜：0";
                        }
                        return "大光获胜：" +  (pl.roomStatistics[3]  > 0? pl.roomStatistics[3] +"":"0" );
                    }else {
                        return "大光获胜：";
                    }

                },
                Text:{
                    _text: function () {
                        if (!pl || !pl.roomStatistics || !pl.roomStatistics[3]) {
                            return "0";
                        }
                        return pl.roomStatistics[3] > 0 ? pl.roomStatistics[3] + "" : "0";
                    },
                    _run:function() {
                        var childTex = this.getParent().getChildByName("Text_0");
                        childTex.ignoreContentAdaptWithSize(true);
                        childTex.setString(this.getString());
                        if (this.getParent().getString() == "") {
                            this.visible = false;
                            childTex.visible = false;
                        }
                        if(MaxWinAll != 0 && MaxWinAll == pl.winall ) { //大赢家
                            this.visible = false;
                            childTex.visible = true;
                        }
                        else {
                            this.visible = true;
                            childTex.visible = false;
                        }
                        this.ignoreContentAdaptWithSize(true);
                    },
                },
            },
            item4: {
                _run: function() {
                    this.ignoreContentAdaptWithSize(true);
                },
                _text: function() {
                    if(MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_SAN_DA_HA || MjClient.gameType == MjClient.GAME_TYPE.XIANG_XIANG_SAN_DA_HA)
                    {
                        if(!pl || !pl.roomStatistics || !pl.roomStatistics[4])
                        {
                            return "大倒获胜：0";
                        }
                        return "大倒获胜：" +  (pl.roomStatistics[4]  > 0? pl.roomStatistics[4] +"":"0" );
                    }else{
                        return "大倒获胜：";
                    }

                },
                Text:{
                    _text: function () {
                        if (!pl || !pl.roomStatistics || !pl.roomStatistics[4]) {
                            return "0";
                        }
                        return pl.roomStatistics[4] > 0 ? pl.roomStatistics[4] + "" : "0";
                    },
                    _run:function() {
                        var childTex = this.getParent().getChildByName("Text_0");
                        childTex.ignoreContentAdaptWithSize(true);
                        childTex.setString(this.getString());
                        if (this.getParent().getString() == "") {
                            this.visible = false;
                            childTex.visible = false;
                        }
                        if(MaxWinAll != 0 && MaxWinAll == pl.winall ) { //大赢家
                            this.visible = false;
                            childTex.visible = true;
                        }
                        else {
                            this.visible = true;
                            childTex.visible = false;
                        }
                        this.ignoreContentAdaptWithSize(true);
                    },
                },
            },
            item5: {
                _text: function() {
                    return "";
                },
                Text:{
                    _text: function () {

                    },
                    _run:function() {
                        var childTex = this.getParent().getChildByName("Text_0");
                        childTex.ignoreContentAdaptWithSize(true);
                        childTex.setString(this.getString());
                        if (this.getParent().getString() == "") {
                            this.visible = false;
                            childTex.visible = false;
                        }
                        this.ignoreContentAdaptWithSize(true);
                    },
                },
            },
        },
    }

    // 显示玩家头像
    var head = node.getChildByName("head");
    if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ
        || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ || MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG) {
        CircularCuttingHeadImg(head, pl);
    }
    else {
       addWxHeadToEndUI(head, off);
    }

    BindUiAndLogic(node, uibind);

    if (MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ || MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG)
        setUserOfflineWinGamePanel(node,pl);

    if (!pl) {
        uibind.normalNode._node.visible = false;
        uibind.lastNode._node.visible = false;
        uibind.winNode._node.visible = false;
        uibind.winNode.bigWinner._node.visible = false;
        uibind.winNode.winNum._node.visible = false;
        node.getChildByName("fangzhu").visible = false;
        return;
    }

    //最高得分
    var _fangkaNode;
    if (MaxWinAll != 0 && MaxWinAll == pl.winall) {
        uibind.normalNode._node.visible = false;
        uibind.lastNode._node.visible = false;
        uibind.winNode._node.visible = true;
        uibind.winNode.bigWinner._node.visible = true;
        uibind.winNode.winNum._node.setString(pl.winall + "");
        uibind.winNode.winNum._node.ignoreContentAdaptWithSize(true);
        var nodeParent = node.getParent();
        var _share = nodeParent.getChildByName("share");
        var _shine = _share.getChildByName("img_shine");
        var _point = _share.getChildByName("img_point");
        var _txt = _share.getChildByName("img_txt");
        var act_Func = function() {
            var a = cc.scaleTo(0.5, 1.0);
            var aa = cc.fadeIn(0.5);
            var a1 = cc.scaleTo(1.0, 4);
            var a2 = cc.fadeOut(1.0);
            var act_2 = cc.rotateBy(0.8, 30);
            var act_3 = cc.rotateBy(0.8, -30);
            var a3 =  cc.callFunc(function() {
                _shine.setScale(1);
            }.bind(_shine));
            _shine.runAction(cc.sequence(cc.spawn(a,aa), cc.spawn(a1,a2),a3,cc.delayTime(0.1)).repeatForever());
            _point.runAction(cc.sequence(act_2, act_3).repeatForever());

        }
        var clubInfoTable = getClubInfoInTable();
        if (clubInfoTable && pl.info.uid == SelfUid() && MjClient.getAppType() != MjClient.APP_TYPE.QXYYQP && MjClient.getAppType() != MjClient.APP_TYPE.HUBEIMJ &&  MjClient.getAppType() != MjClient.APP_TYPE.YLHUNANMJ) {
            _shine.setVisible(true);
            _point.setVisible(true);
            _txt.setVisible(true);
            act_Func();
        }
        // 背景
        var _bgNode = node.getChildByName("bg");
        if (MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_SAN_DA_HA || MjClient.gameType == MjClient.GAME_TYPE.XIANG_XIANG_SAN_DA_HA) {
            _bgNode.loadTexture("res/gameOver/pjjs_10_MJ.png");
        } else {
            _bgNode.loadTexture("gameOver/pjjs_9.png");
        }  
        _fangkaNode = uibind.winNode._node;

    } else {
        uibind.winNode._node.visible = false;
        uibind.lastNode._node.visible = false;
        uibind.normalNode._node.visible = true;
        _fangkaNode = uibind.normalNode._node;
        if (pl.winall >= 0) {
            uibind.normalNode.winNum2._node.visible = false;
            uibind.normalNode.winNum1._node.visible = true;
            uibind.normalNode.winNum1._node.setString(pl.winall + "");
            uibind.normalNode.winNum1._node.ignoreContentAdaptWithSize(true);

        } else {
            uibind.normalNode.winNum1._node.visible = false;
            uibind.normalNode.winNum2._node.visible = true;
            uibind.normalNode.winNum2._node.setString(Math.abs(pl.winall) + "");
            uibind.normalNode.winNum2._node.ignoreContentAdaptWithSize(true);
        }
        _fangkaNode = uibind.normalNode._node;

    }

    if (pl.isNeedFanBei) {
        if (MjClient.getAppType() != MjClient.APP_TYPE.QXYZQP && MjClient.getAppType() != MjClient.APP_TYPE.AYGUIZHOUMJ)
        {
            var yoff = 15;
            uibind.winNode.winNum._node.y += yoff;
            // node.getChildByName("line_hua_0").y += yoff;
            uibind.normalNode.winNum1._node.y += yoff;
            uibind.normalNode.winNum2._node.y += yoff;
        }
        var beiShu = 1;
        if (tData.areaSelectMode.fanBei == 1)beiShu = 2;
        else if(tData.areaSelectMode.fanBei == 2)beiShu = 3;

        var fanbeiFormula = node.getChildByName("fanbeiFormula");
        fanbeiFormula.setVisible(true);
        fanbeiFormula.setString("(" + Math.floor(pl.winall/beiShu*10)/10 + "x"+ beiShu + ")");
        fanbeiFormula.ignoreContentAdaptWithSize(true);
        var bWin = (MaxWinAll !=0 && MaxWinAll == pl.winall);
        
        if (MjClient.getAppType() != MjClient.APP_TYPE.BDHYZP) {
            fanbeiFormula.setTextColor(bWin? cc.color(0xff,0xfe,0xd6):cc.color(0xd4,0xfe,0xff));
            fanbeiFormula.enableOutline(bWin? cc.color(0xb2,0x43,0x3e):cc.color(0x15,0x5c,0xa8), 1);
        } else {
            fanbeiFormula.setTextColor(bWin? cc.color(0xea,0xd1,0x41):cc.color(0x4e,0xd4,0xff));
            fanbeiFormula.enableOutline(bWin? cc.color(0xea,0xd1,0x41):cc.color(0x4e,0xd4,0xff), 1);

            //fanbeiFormula.setTextColor(cc.color(255,255,255));
        }
    }
    
    AddFangKaIcon(sData, _fangkaNode, tData, pl, MaxWinAll, MaxWinPlayer,  MaxloseAll, MaxlosePlayer, cc.p(-115, 385));

    node.getChildByName("fangzhu").visible = tData.owner == pl.info.uid;

    var maxPlayer = parseInt(MjClient.data.sData.tData.maxPlayer);
    var head2 = node.getParent().getChildByName("head2");
    var head3 = node.getParent().getChildByName("head3");
    if (head2 && head3) {
        var size = (head3.x - head2.x) * (4 - maxPlayer) / (maxPlayer + 1);
        node.x += size * (off + 1);
    }
}

//设置单个玩家的详细信息,南京麻将
function SetGameOverLayer_nanjing(node,off)
{
    var sData=MjClient.data.sData;
    var tData=sData.tData;
    var pl=MjClient.getPlayerByIndex(off);
    node.setVisible(false);
    if(!pl)
    {
        return;
    }
    node.setVisible(true);
    var uidSelf = SelfUid();

    var isJinYuanZi = false;//是否是进园子
    var sData=MjClient.data.sData;
    var tData=sData.tData;
    if(tData.areaSelectMode.playType ==0)
    {
        isJinYuanZi = true;
    }

    var MaxWinAll=0;
    var MaxDianPao=0;

    //计算所有人数据
    for (var uid in sData.players) {
        var pi = sData.players[uid];
        if(pi)
        {
            var iTotalScore = isJinYuanZi ? pi.winall-100 : pi.winall;
            MaxWinAll = MaxWinAll>iTotalScore?MaxWinAll:iTotalScore;
        }
    }

    //最大点炮数
    for (var uid in sData.players) {
        var pi = sData.players[uid];
        if(pi)
        {
            MaxDianPao = MaxDianPao>pi.dianpaoTotal?MaxDianPao:pi.dianpaoTotal;
        }
    }

    //计算炮王
    var bPaoWang = false;
    var _paowangArray = [];
    var _paoScore = 9999;
    for (var uid in sData.players) {
        var pi = sData.players[uid];
        if(pi)
        {
            if(MaxDianPao == pi.dianpaoTotal)//算出点炮的最小分
            {
                if(pi.winall <= _paoScore)
                {
                    _paoScore = pi.winall;
                    //_paowangArray.push(pi.info.uid);
                }
            }
        }
    }

    //存点炮王的数组
    for (var uid in sData.players) {
        var pi = sData.players[uid];
        if(pi)
        {
            if(MaxDianPao == pi.dianpaoTotal)
            {
                if(pi.winall <= _paoScore)
                {
                    _paowangArray.push(pi.info.uid);
                }
            }
        }
    }


    cc.log("===================_paowangArray = 3333 " + JSON.stringify(_paowangArray));

    //是否是炮王
    if(_paowangArray.indexOf(pl.info.uid)>=0)
    {
        bPaoWang = true;
    }


    //根据输赢设置背景底板颜色
    function setPlayerBg()
    {
        var _bgNode = node.getChildByName("bg");
        var _name = node.getChildByName("name");
        var _id = node.getChildByName("id");

        var _maxPlayer = parseInt(MjClient.data.sData.tData.maxPlayer);

        if(MaxWinAll !=0 && MaxWinAll == pl.winall )//大赢家
        {
            _bgNode.loadTexture("gameOver/gerenxinxi_2.png");
            if(_maxPlayer == 2)
            {
                _bgNode.loadTexture("gameOver/gerenxinxi2_2.png");
            }
        }
        else if(pl.winall < 0)//输家
        {
            _bgNode.loadTexture("gameOver/gerenxinxi_3.png");
            if(_maxPlayer == 2)
            {
                _bgNode.loadTexture("gameOver/gerenxinxi2_3.png");
            }
        }
    }


    var uibind={
        name: {
            _run: function() {
                this.setFontName("Arial");
                this.setFontSize(this.getFontSize());
            },
            _text: function() {
                return unescape(pl.info.nickname) + "";
            }
        },
        id: {
            _run:function()
            {
                this.ignoreContentAdaptWithSize(true);
            },
            _text: function () {
                return "ID:" + pl.info.uid.toString();
            }
        },
        winNode:{
            winNum:{
            },
            bigWinner:{
                _visible : false
            }
        },
        lastNode:{
            winNum1:{},
            winNum2:{},
        },
        normalNode:{
            winNum1:{},
            winNum2:{},
        },
        statistc:{
            item0:{
                _text: function () {
                    console.log("=====doomsky say:pl.zimoTotal======", pl.zimoTotal);
                    return "自摸次数：" + (pl.zimoTotal > 0? pl.zimoTotal+"":"0" );
                }
            },

            item1:{
                _text: function () {
                    return "点炮次数：" +  (pl.dianpaoTotal  > 0? pl.dianpaoTotal +"":"0" );
                }
            },
            item2:{
                _text: function () {
                    console.log("=====doomsky say:pl.angangTotal======", pl.caibao);
                    return "菜包：" + pl.caibao;
                }
            },
            item3:{
                _text: function () {
                    console.log("=====doomsky say:pl.minggangTotal======", pl.roubao);
                    return "肉包：" + pl.roubao;
                }
            },
            item4:{
                _text: function () {
                    // console.log("=====doomsky say:pl.jiepaoTotal======", pl.jiepaoTotal);
                    // return "接炮次数：" + (pl.jiepaoTotal  > 0? pl.jiepaoTotal +"":"0" );
                    return "";
                }
            },
            item5:{
                _text: function () {
                    //return "旋风杠次数：" +  (pl.xuanfenggangTotal  > 0? pl.xuanfenggangTotal +"":"0" );
                    return "";
                }
            },
        },
    }

    var wxNode = node.getChildByName("head");
    addWxHeadToEndUI(wxNode,off);
    BindUiAndLogic(node,uibind);
    setPlayerBg();
    var totalScore = isJinYuanZi ? pl.winall - 100 : pl.winall;
    var numValue = Math.abs(totalScore) + "";
    //最高得分
    if (MaxWinAll !=0 && MaxWinAll == totalScore ) {
        if (MjClient.getAppType() == MjClient.APP_TYPE.QXTHMJ) {
            node.getChildByName("bg").loadTexture("gameOver/pjjs_10.png");
        }
        uibind.normalNode._node.visible = false;
        uibind.lastNode._node.visible =false;
        uibind.winNode._node.visible = true;
        uibind.winNode.bigWinner._node.visible = true;
        uibind.winNode.winNum._node.setString(totalScore + "");
        uibind.winNode.winNum._node.ignoreContentAdaptWithSize(true);
        var nodeParent = node.getParent();
        var _share = nodeParent.getChildByName("share");
        var _shine = _share.getChildByName("img_shine");
        var _point = _share.getChildByName("img_point");
        var _txt = _share.getChildByName("img_txt");
        var act_Func = function() {
            var a = cc.scaleTo(0.5, 1.0);
            var aa = cc.fadeIn(0.5);
            var a1 = cc.scaleTo(1.0, 4);
            var a2 = cc.fadeOut(1.0);
            var act_2 = cc.rotateBy(0.8, 30);
            var act_3 = cc.rotateBy(0.8, -30);
            var a3 =  cc.callFunc(function() {
                _shine.setScale(1);
            }.bind(_shine));
            _shine.runAction(cc.sequence(cc.spawn(a,aa), cc.spawn(a1,a2),a3,cc.delayTime(0.1)).repeatForever());
            _point.runAction(cc.sequence(act_2, act_3).repeatForever());

        }
        var clubInfoTable = getClubInfoInTable();
        if (clubInfoTable && pl.info.uid == SelfUid() && MjClient.getAppType() != MjClient.APP_TYPE.QXYYQP && MjClient.getAppType() != MjClient.APP_TYPE.HUBEIMJ &&  MjClient.getAppType() != MjClient.APP_TYPE.YLHUNANMJ) {
            _shine.setVisible(true);
            _point.setVisible(true);
            _txt.setVisible(true);
            act_Func();
        }

    }//点炮最多
    else if( MaxDianPao != 0 && bPaoWang){
        if (MjClient.getAppType() == MjClient.APP_TYPE.QXTHMJ) {
            node.getChildByName("bg").loadTexture("gameOver/pjjs_9.png");
        }
        uibind.winNode._node.visible = false;
        uibind.normalNode._node.visible = false;
        uibind.lastNode._node.visible =true;
        if( totalScore >=0 ){
            uibind.lastNode.winNum1._node.visible = true;
            uibind.lastNode.winNum2._node.visible = false;
            uibind.lastNode.winNum1._node.setString(totalScore + "");
            uibind.lastNode.winNum1._node.ignoreContentAdaptWithSize(true);
        }
        else{
            uibind.lastNode.winNum1._node.visible = false;
            uibind.lastNode.winNum2._node.visible = true;
            uibind.lastNode.winNum2._node.setString(Math.abs(totalScore) + "");
            uibind.lastNode.winNum2._node.ignoreContentAdaptWithSize(true);
        }
    }
    else{
        if (MjClient.getAppType() == MjClient.APP_TYPE.QXTHMJ) {
            node.getChildByName("bg").loadTexture("gameOver/pjjs_9.png");
        }
        uibind.winNode._node.visible = false;
        uibind.lastNode._node.visible =false;
        uibind.normalNode._node.visible = true;
        if( totalScore >= 0 ){
            uibind.normalNode.winNum2._node.visible =false;
            uibind.normalNode.winNum1._node.visible= true;
            uibind.normalNode.winNum1._node.setString(totalScore + "");
            uibind.normalNode.winNum1._node.ignoreContentAdaptWithSize(true);
        }
        else {
            uibind.normalNode.winNum1._node.visible= false;
            uibind.normalNode.winNum2._node.visible =true;
            uibind.normalNode.winNum2._node.setString(Math.abs(totalScore) + "");
            uibind.normalNode.winNum2._node.ignoreContentAdaptWithSize(true);
        }
    }

    node.getChildByName("fangzhu").visible = tData.owner == pl.info.uid;
}

//跑胡子(设置单个玩家的信息)
function SetGameOverLayer_paohuzi(node,off){
    var sData=MjClient.data.sData;
    var tData=sData.tData;
    var pl=MjClient.getPlayerByIndex(off);
    if(!pl){
        node.setVisible(false);
        return;
    }
    var uidSelf = SelfUid();
    var MaxWinAll=0;
    var MaxDianPao=0;
    var MaxlosePlayer = null;
    var MaxWinPlayer = null;
    var MaxloseAll = 999999999;

    //计算所有人数据
    for (var uid in sData.players) {
        var pi = sData.players[uid];
        if (pi) {
            if (MaxWinAll < pi.winall) {
                MaxWinAll = pi.winall;
                MaxWinPlayer = uid;

            }else if (MaxWinAll == pi.winall) {
                if (parseInt(uid) < parseInt(MaxWinPlayer)) {
                    MaxWinAll = pi.winall;
                    MaxWinPlayer = uid;
                }
            }
            if (pi.winall < MaxloseAll) {
                MaxloseAll = pi.winall;
                MaxlosePlayer = uid;
            }else if (pi.winall == MaxloseAll) {
                if (parseInt(uid) < parseInt(MaxlosePlayer)) {
                    MaxloseAll = pi.winall;
                    MaxlosePlayer = uid;
                }
            }
        }
    }
    setDismissTypeImg(pl,node,0.5,0.19,"chang");

    var uibind={
        name:{
            _run:function(){
                this.setFontName("Arial");
                this.setFontSize(this.getFontSize());
                this.setFontSize(this.getFontSize());
            },
            _text:function(){
                if(!pl){
                    return "";
                }
                return unescape(pl.info.nickname)+"";
            }
        },
        id: {
            _run:function(){
                this.ignoreContentAdaptWithSize(true);
            },
            _text: function () {
                if(!pl){
                    return "";
                }
                return "" + pl.info.uid.toString();
            }
        },
        allscore:{
            winNum1:{
            },
            winNum2:{
            },
            bigWinner:{
                _visible : false
            }
        },
        huxiBg:{
            _visible:function(){
                if(MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_BO_PI){
                    return true;
                }
                return false;
            },
            score:{
                _run:function(){
                    if(MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_BO_PI){
                        this.setString(pl.winall);
                    }
                }
            }
        },
        listView:{
            _run:function(){
                var pos = this.getPosition();
                if(MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_BO_PI){
                    this.setPosition(cc.p(pos.x, pos.y - 46));
                }
                this.setScrollBarEnabled(false);
                var itemModel = this.children[0];
                this.setItemModel(itemModel);
                this.removeAllChildren();
                var tableMsg = pl.tableMsg;
                var listView = this;
                for(var i = 0;i < tableMsg.length;i++){
                    listView.pushBackDefaultItem();
                    var children = listView.children;
                    var insertItem = children[children.length-1];
                    insertItem.getChildByName("title").setString("第"+(i+1)+"局");
                    insertItem.getChildByName("score").setString(tableMsg[i]);
                    if(MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ
                        || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ ){
                        if(pl.winall == MaxWinAll && pl.winall != 0){
                            insertItem.getChildByName("score").setTextColor(cc.color("#a80e0e"));
                        }
                    }
                    if(tableMsg[i]>0){
                        insertItem.getChildByName("score").setString("+"+tableMsg[i]);
                    }
                    // if(pl.winall > 0){
                    //     insertItem.getChildByName("title").setTextColor(cc.color("#a3544a"));
                    //     insertItem.getChildByName("score").setTextColor(cc.color("#a3544a"));
                    // }else {
                    //     insertItem.getChildByName("title").setTextColor(cc.color("#4a88a0"));
                    //     insertItem.getChildByName("score").setTextColor(cc.color("#4a88a0"));
                    // }
                    insertItem.getChildByName("title").ignoreContentAdaptWithSize(true);
                    insertItem.getChildByName("score").ignoreContentAdaptWithSize(true);
                }
            
            }
        },
    };

    var wxNode = node.getChildByName("head");
    if(MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ ||
        MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ ){
        addWxHeadToEndUI_paohuzi(wxNode,off);
    }else if(MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP){
        CircularCuttingHeadImg(wxNode, pl);
    }else{
        addWxHeadToEndUI(wxNode,off);
    }
    BindUiAndLogic(node,uibind);
    // node.getChildByName("fangzhu").visible =false;
    if(!pl)
    {
        uibind.allscore.visible = false;
        node.getChildByName("fangzhu").visible =false;
        return;
    }

    var numValue = Math.abs(pl.winall) + "";
    if(MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_BO_PI){
        numValue = Math.abs(pl.winScore) + "";
    }
    
    uibind.allscore.visible = true;
    uibind.allscore.bigWinner._node.visible = false;
 
    if (pl.winall > 0) {
        var nodeParent = node.getParent().getParent();
        if(MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ
            || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ ){
            node.loadTexture("gameOver/zipai_winbg.png");
            var scoreBg = node.getChildByName("scoreBg");
            if(scoreBg){
                scoreBg.loadTexture("gameOver/huangBg.png");
            }
        }else if(MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP){
            if(pl.winall == MaxWinAll && pl.winall != 0){
                node.loadTexture("gameOver/over_box_1.png");
            }  
        }else{
            node.loadTexture("gameOver/pjjs_12.png");
            node.getChildByName("allscore").loadTexture("gameOver/pjjs_14.png");

            var scoreBg = node.getChildByName("scoreBg");
            if(scoreBg){
                scoreBg.loadTexture("gameOver/huangBg.png");
            }
        }
    } else {
        if(MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ
            || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ ){
            node.loadTexture("gameOver/zipai_loserbg.png");
            var scoreBg = node.getChildByName("scoreBg");
            if(scoreBg){
                scoreBg.loadTexture("gameOver/huangBg.png");
            }
        }else if(MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP){
            //do nothing
        }else{
            node.loadTexture("gameOver/pjjs_9.png");
            node.getChildByName("allscore").loadTexture("gameOver/pjjs_14.png");

            var scoreBg = node.getChildByName("scoreBg");
            if(scoreBg){
                scoreBg.loadTexture("gameOver/lanBg.png");
            }
        }
    }

    var winNum1 = node.getChildByName("allscore").getChildByName("winNum1");
    winNum1.ignoreContentAdaptWithSize(true);
    winNum1.setString(pl.winall + "");
    if(MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_BO_PI){
        winNum1.setString(pl.winScore);
    }
    
    var winNum2 = node.getChildByName("allscore").getChildByName("winNum2");
    winNum2.ignoreContentAdaptWithSize(true);
    winNum2.setString(pl.winall + "");
    if(MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_BO_PI){
        winNum2.setString(pl.winScore);
    }
    if(MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ
        || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ ){
        winNum2.setString(Math.abs(pl.winall));
    }
    // winNum1.setContentSize(cc.size(numValue.length *33,48));
    // winNum2.setContentSize(cc.size(numValue.length *33,48));
    // if(MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP)
    // {
    //     winNum1.setContentSize(cc.size(numValue.length *33,62));
    //     winNum2.setContentSize(cc.size((numValue.length + 1) * 33,62));
    // }
    
    if(MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_BO_PI){
       if(pl.winScore > 0){
            winNum1.visible = true;
            winNum2.visible = false;
        }else {
            winNum1.visible = false;
            winNum2.visible = true;
        }
    }else{
        if(pl.winall > 0){
            winNum1.visible = true;
            winNum2.visible = false;
        }else {
            winNum1.visible = false;
            winNum2.visible = true;
        }
    }
    
    //最高得分
    var nodeParent = node.getParent().getParent();
    var _share = nodeParent.getChildByName("share");
    var _shine = _share.getChildByName("img_shine");
    var _point = _share.getChildByName("img_point");
    var _txt = _share.getChildByName("img_txt");
    if(pl.winall == MaxWinAll && pl.winall != 0){
        uibind.allscore.bigWinner._node.visible = true;
        var act_Func = function() {
            var a = cc.scaleTo(0.5, 1.0);
            var aa = cc.fadeIn(0.5);
            var a1 = cc.scaleTo(1.0, 4);
            var a2 = cc.fadeOut(1.0);
            var act_2 = cc.rotateBy(0.8, 30);
            var act_3 = cc.rotateBy(0.8, -30);
            var a3 =  cc.callFunc(function() {
                _shine.setScale(1);
            }.bind(_shine));
            _shine.runAction(cc.sequence(cc.spawn(a,aa), cc.spawn(a1,a2),a3,cc.delayTime(0.1)).repeatForever());
            _point.runAction(cc.sequence(act_2, act_3).repeatForever());

        }
        var clubInfoTable = getClubInfoInTable();
        if (clubInfoTable && pl.info.uid == SelfUid()) {
            _shine.setVisible(false);
            _point.setVisible(false);
            _txt.setVisible(false);
            act_Func();
        }
    }
    var pos = cc.p(50, 435);
    var rot = 0;
    var para = {};
    if (MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP) {
        // para.rot = -80;
        pos = cc.p(22, 414);
        para.scale = 0.85;
    }


    AddFangKaIcon(sData, node, tData, pl, MaxWinAll, MaxWinPlayer,  MaxloseAll, MaxlosePlayer, pos, para);


    if (tData.owner == pl.info.uid)
    {
        node.getChildByName("fangzhu").visible =true;
    }
    else{
        node.getChildByName("fangzhu").visible =false;
    }   
}

//斗地主
function SetGameOverLayer_doudizhu(node,off,isNewUi)
{
    var sData=MjClient.data.sData;
    var tData=sData.tData;
    var pl=MjClient.getPlayerByIndex(off);
    if(!pl){
        node.setVisible(false);
        return;
    }
    var uidSelf = SelfUid();
    var MaxWinAll=0;
    var MaxDianPao=0;
    var MaxlosePlayer = null;
    var MaxWinPlayer = null;
    var MaxloseAll = 999999999;

    //计算所有人数据
    for (var uid in sData.players) {
        var pi = sData.players[uid];
        if (pi) {
            if (MaxWinAll < pi.winall) {
                MaxWinAll = pi.winall;
                MaxWinPlayer = uid;

            }else if (MaxWinAll == pi.winall) {
                if (parseInt(uid) < parseInt(MaxWinPlayer)) {
                    MaxWinAll = pi.winall;
                    MaxWinPlayer = uid;
                }
            }
            if (pi.winall < MaxloseAll) {
                MaxloseAll = pi.winall;
                MaxlosePlayer = uid;
            }else if (pi.winall == MaxloseAll) {
                if (parseInt(uid) < parseInt(MaxlosePlayer)) {
                    MaxloseAll = pi.winall;
                    MaxlosePlayer = uid;
                }
            }
        }
    }

    var uibind={
        name:{
            _run:function(){
                this.ignoreContentAdaptWithSize(true);
                this.setFontName("Arial");
                this.setFontSize(this.getFontSize());
            },
            _text:function(){
                if(!pl){
                    return "";
                }
                return getNewName(unescape(pl.info.nickname)+"");
            }
        },
        id: {
            _run:function(){
                this.ignoreContentAdaptWithSize(true);
            },
            _text: function () {
                if(!pl){
                    return "";
                }
                return  pl.info.uid.toString();
            }
        },
        allscore:{
            winNum1:{
            },
            winNum2:{
            },
            bigWinner:{
                _visible : false
            }
        },
        listView:{
            _run:function(){
                this.setScrollBarEnabled(false);
                var itemModel = this.children[0];
                this.setItemModel(itemModel);
                this.removeAllChildren();
                var tableMsg = pl.roomStatistics;
                cc.log("----------tableMsg doudizhu---- " + JSON.stringify(tableMsg));
                if(!tableMsg)
                {
                    tableMsg = [0,0,0,0,0];
                    //return MjClient.showToast("当前没有数据");
                }
                var listView = this;
                for(var i = 0;i < tableMsg.length;i++){
                    listView.pushBackDefaultItem();
                    var children = listView.children;
                    var insertItem = children[children.length-1];

                    insertItem.getChildByName("title").setString("第" + (i+1) + "局");
                    var scoreLabel = insertItem.getChildByName("score");
                    scoreLabel.ignoreContentAdaptWithSize(true);
                    if(tableMsg[i])
                    {
                        scoreLabel.setString(tableMsg[i]);
                    }
                    else {
                        scoreLabel.setString("0");
                    }
                    if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ  || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) {
                        if (Number(scoreLabel.getString()) > 0) {
                            scoreLabel.setColor(cc.color("#D3260E"));
                        }
                        else {
                            scoreLabel.setColor(cc.color("#00824C"));
                        }
                    }
                }
            }
        },
    };

    // var wxNode = node.getChildByName("head");
    // addWxHeadToEndUI(wxNode,off);

    // 显示玩家头像
    var head = node.getChildByName("head");
    if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ  || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ ) {
        CircularCuttingHeadImg(head, pl);
    }
    else {
       addWxHeadToEndUI(head, off);
    }

    BindUiAndLogic(node,uibind);
    // node.getChildByName("fangzhu").visible =false;

    // if(MjClient.getAppType() ==  MjClient.APP_TYPE.QXJSMJ ||
    //     MjClient.getAppType() ==  MjClient.APP_TYPE.QXYYQP ||
    //     MjClient.getAppType() ==  MjClient.APP_TYPE.QXNTQP ||
    //     MjClient.getAppType() ==  MjClient.APP_TYPE.QXHAIANMJ)
    // {
    //     setUserOfflineWinGamePanel(node,pl);
    // }
    setUserOfflineWinGamePanel(node,pl);
    if(!pl)
    {
        uibind.allscore.visible = false;
        node.getChildByName("fangzhu").visible =false;
        return;
    }

    var numValue = Math.abs(pl.winall) + "";
    //最高得分
    uibind.allscore.visible = true;
    uibind.allscore.bigWinner._node.visible = false;
    if(pl.winall >= 0){
        var winNum1 = node.getChildByName("allscore").getChildByName("winNum1");
        winNum1.setString(pl.winall + "");
        winNum1.ignoreContentAdaptWithSize(true);
		if (!isNewUi)
        	winNum1.setScale(0.8);
        var winNum2 = node.getChildByName("allscore").getChildByName("winNum2");
        winNum2.visible = false;
    }else{
        var winNum2 = node.getChildByName("allscore").getChildByName("winNum2");
        winNum2.setString(pl.winall + "");
        winNum2.ignoreContentAdaptWithSize(true);
        if (!isNewUi)
			winNum2.setScale(0.8);
        var winNum1 = node.getChildByName("allscore").getChildByName("winNum1");
        winNum1.visible = false;

        if (MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP
            || MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ) {
            node.loadTexture("gameOver/pjjs_9.png");
        }
    }
    var nodeParent = node.getParent().getParent();
    var _share = nodeParent.getChildByName("share");
    var _shine = _share.getChildByName("img_shine");
    var _point = _share.getChildByName("img_point");
    var _txt = _share.getChildByName("img_txt");
    if(pl.winall == MaxWinAll && pl.winall != 0){
        uibind.allscore.bigWinner._node.visible = true;
        var act_Func = function() {
            var a = cc.scaleTo(0.5, 1.0);
            var aa = cc.fadeIn(0.5);
            var a1 = cc.scaleTo(1.0, 4);
            var a2 = cc.fadeOut(1.0);
            var act_2 = cc.rotateBy(0.8, 30);
            var act_3 = cc.rotateBy(0.8, -30);
            var a3 =  cc.callFunc(function() {
                _shine.setScale(1);
            }.bind(_shine));
            _shine.runAction(cc.sequence(cc.spawn(a,aa), cc.spawn(a1,a2),a3,cc.delayTime(0.1)).repeatForever());
            _point.runAction(cc.sequence(act_2, act_3).repeatForever());

        }
        var clubInfoTable = getClubInfoInTable();
        if (clubInfoTable && pl.info.uid == SelfUid() && MjClient.getAppType() != MjClient.APP_TYPE.QXYYQP && MjClient.getAppType() != MjClient.APP_TYPE.HUBEIMJ && MjClient.getAppType() != MjClient.APP_TYPE.YLHUNANMJ) {
            _shine.setVisible(true);
            _point.setVisible(true);
            _txt.setVisible(true);
            act_Func();
        }
        // 设置背景大赢家图片/字体颜色（岳阳app）
        if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ  || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) {
            node.loadTexture("gameOver/pjjs_9.png");
        }
        else if (MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP
              || MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ) {
            node.loadTexture("gameOver/gerenxinxi_2.png");
        }
    }

    AddFangKaIcon(sData, uibind.allscore._node, tData, pl, MaxWinAll, MaxWinPlayer,  MaxloseAll, MaxlosePlayer, cc.p(10, 345));

    node.getChildByName("fangzhu").visible = tData.owner == pl.info.uid;
}

//斗地主大结算(NEW)——临汾,晋中斗地主 贵州斗地主
function SetGameOverLayer_doudizhu_APP(node,off,isNewUi)
{
    var sData=MjClient.data.sData;
    var tData=sData.tData;
    var pl=MjClient.getPlayerByIndex(off);
    if(!pl){
        node.setVisible(false);
        return;
    }

    var uidSelf = SelfUid();
    var MaxWinAll=0;
    var MaxDianPao=0;
    var MaxlosePlayer = null;
    var MaxWinPlayer = null;
    var MaxloseAll = 999999999;

    //计算所有人数据
    for (var uid in sData.players) {
        var pi = sData.players[uid];
        if (pi) {
            if (MaxWinAll < pi.winall) {
                MaxWinAll = pi.winall;
                MaxWinPlayer = uid;

            }else if (MaxWinAll == pi.winall) {
                if (parseInt(uid) < parseInt(MaxWinPlayer)) {
                    MaxWinAll = pi.winall;
                    MaxWinPlayer = uid;
                }
            }
            if (pi.winall < MaxloseAll) {
                MaxloseAll = pi.winall;
                MaxlosePlayer = uid;
            }else if (pi.winall == MaxloseAll) {
                if (parseInt(uid) < parseInt(MaxlosePlayer)) {
                    MaxloseAll = pi.winall;
                    MaxlosePlayer = uid;
                }
            }
        }
    }

    //输赢统计
    //输赢统计
    var winCount  = 0;
    var winScore = 0;
    var loseCount = 0;
    var loseScore = 0;
    var pingCount = 0;

    var leftCount = tData.roundNumPre;//tData.roundAll - (tData.roundAll - tData.roundNumPre + 1);
    if(cc.isUndefined(tData.roundNumPre))
    {
        leftCount = tData.roundNum;
    }
    else {
        if(tData.roundNum <= 0 && cc.isUndefined(tData.roundNumPre)) {
            leftCount = 0;
        }
    }
    if(leftCount <= 0) leftCount = 0;

    var tableMsg = pl.roomStatistics;
    if(!tableMsg)
    {
        tableMsg = [0,0,0,0,0];
    }

    for(var i = 0;i < tableMsg.length;i++)
    {
        if(tableMsg[i] > 0 )
        {
            winCount++;
            winScore += tableMsg[i];
            // 精度修正
            winScore = revise(winScore);
        }
        else if(tableMsg[i] < 0 )
        {
            loseCount++;
            loseScore += tableMsg[i];
            // 精度修正
            loseScore = revise(loseScore);
        }
        else if(tableMsg[i] == 0 )
        {
            pingCount++;
        }
    }

    if (MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP
        || MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ) {
        pingCount = tData.roundAll - leftCount - winCount - loseCount;
    }

    pl.winall = revise(pl.winall);

    var uibind={
        dayingjia_light:{
            _visible: false,
            _run: function() {
                if(MaxWinAll != 0 && MaxWinAll == pl.winall )//大赢家
                {
                    this.visible = true;
                }
            },
        },
        name:{
            _run:function(){
                this.setFontName("Arial");
                this.setFontSize(this.getFontSize());
                this.ignoreContentAdaptWithSize(true);
                if(pl.winall < 0) { //输家
                    this.setColor(cc.color(37,69,89));
                }
                else {
                    this.setColor(cc.color(88,45,45));
                }
            },
            _text:function(){
                if(!pl){
                    return "";
                }
                return getNewName(unescape(pl.info.nickname)+"");
            }
        },
        id: {
            _run:function(){
                this.ignoreContentAdaptWithSize(true);
                if(pl.winall < 0) { //输家
                    this.setColor(cc.color(37,69,89));
                }
                else {
                    this.setColor(cc.color(88,45,45));
                }
            },
            _text: function () {
                if(!pl){
                    return "";
                }
                return  pl.info.uid.toString();
            }
        },
        allscore:{
            winNum1:{
                _run: function() {
                    this.ignoreContentAdaptWithSize(true);
                },
            },
            winNum2:{
                _run: function() {
                    this.ignoreContentAdaptWithSize(true);
                },
            },
            bigWinner:{
                _visible : false
            }
        },
        listView:{
            _run:function(){
                this.setScrollBarEnabled(false);
                var itemModel = this.children[0];

                /*
                if(MaxWinAll !=0 && MaxWinAll == pl.winall )//大赢家
                {
                    //itemModel.getChildByName("title").setColor(cc.color(221,78,0));
                    itemModel.getChildByName("title").setColor(cc.color(255,255,255));
                }
                else if(pl.winall < 0)//输家
                {
                    //itemModel.getChildByName("score").setColor(cc.color(104,104,104));
                    itemModel.getChildByName("score").setColor(cc.color(255,255,255));
                }
                */

                if(pl.winall < 0) { //输家
                    itemModel.getChildByName("title").setColor(cc.color(37,69,89));
                    itemModel.getChildByName("score").setColor(cc.color(37,69,89));
                }
                else {
                    itemModel.getChildByName("title").setColor(cc.color(88,45,45));
                    itemModel.getChildByName("score").setColor(cc.color(88,45,45));
                }


                this.setItemModel(itemModel);
                this.removeAllChildren();

                cc.log("----------tableMsg doudizhu---- " + JSON.stringify(tableMsg));
                var listView = this;
                listView.setTouchEnabled(false);
                for(var i = 0;i < 4;i++){
                    listView.pushBackDefaultItem();
                    var children = listView.children;
                    var insertItem = children[children.length-1];
                    insertItem.getChildByName("title").setString("第" + (i+1) + "局");
                    var scoreLabel = insertItem.getChildByName("score");
                    insertItem.getChildByName("title").ignoreContentAdaptWithSize(true);
                    scoreLabel.ignoreContentAdaptWithSize(true);
                    if(i == 0)
                    {
                        insertItem.getChildByName("title").setString("赢" + winCount + "局");
                        scoreLabel.setString(winScore);
                    }
                    else if(i == 1)
                    {
                        insertItem.getChildByName("title").setString("输" + loseCount + "局");
                        scoreLabel.setString(loseScore);
                    }
                    else if(i == 2)
                    {
                        insertItem.getChildByName("title").setString("平" + pingCount + "局");
                        scoreLabel.setString("0");
                    }
                    else if(i == 3)
                    {
                        insertItem.getChildByName("title").setString("未完成" + leftCount + "局");
                        scoreLabel.setString("0");
                    }

                    // if(tableMsg[i])
                    // {
                    //     scoreLabel.setString(tableMsg[i]);
                    // }
                    // else {
                    //     scoreLabel.setString("0");
                    // }
                }
            }
        },
    };

    var wxNode = node.getChildByName("head");
    if (MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ || MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG) {
        CircularCuttingHeadImg(wxNode, pl);
    }
    else {
       addWxHeadToEndUI(wxNode, off);
    }
    BindUiAndLogic(node,uibind);
    // node.getChildByName("fangzhu").visible =false;

    // if(MjClient.getAppType() ==  MjClient.APP_TYPE.QXJSMJ ||
    //     MjClient.getAppType() ==  MjClient.APP_TYPE.QXYYQP ||
    //     MjClient.getAppType() ==  MjClient.APP_TYPE.QXHAIANMJ)
    // {
    //     setUserOfflineWinGamePanel(node,pl);
    // }
    setUserOfflineWinGamePanel(node,pl);
    if(!pl)
    {
        uibind.allscore.visible = false;
        node.getChildByName("fangzhu").visible =false;
        return;
    }


    var _bgNode = node;
    var _name = node.getChildByName("name");
    var _id = node.getChildByName("id");

    if(MaxWinAll !=0 && MaxWinAll == pl.winall )//大赢家
    {
        _bgNode.loadTexture("gameOver/gerenxinxi_2.png");
    }
    else if(pl.winall < 0)//输家
    {
        _bgNode.loadTexture("gameOver/gerenxinxi_3.png");

        // var _textIcon1 = node.getChildByName("allscore")
        // _textIcon1.loadTexture("gameOver/zongchengji_1.png");
    }



    var numValue = Math.abs(pl.winall) + "";
    //最高得分
    uibind.allscore.visible = true;
    uibind.allscore.bigWinner._node.visible = false;
    if(pl.winall >= 0){
        var winNum1 = node.getChildByName("allscore").getChildByName("winNum1");
        winNum1.setString(pl.winall + "");
        winNum1.ignoreContentAdaptWithSize(true);
        if (!isNewUi)
            // winNum1.setScale(0.8);
        var winNum2 = node.getChildByName("allscore").getChildByName("winNum2");
        winNum2.visible = false;
    }else{
        var winNum2 = node.getChildByName("allscore").getChildByName("winNum2");
        winNum2.setString(Math.abs(pl.winall) + "");
        winNum2.ignoreContentAdaptWithSize(true);
        if (!isNewUi)
            // winNum2.setScale(0.8);
        var winNum1 = node.getChildByName("allscore").getChildByName("winNum1");
        winNum1.visible = false;
    }
    var nodeParent = node.getParent().getParent();
    var _share = nodeParent.getChildByName("share");
    var _shine = _share.getChildByName("img_shine");
    var _point = _share.getChildByName("img_point");
    var _txt = _share.getChildByName("img_txt");
    if(pl.winall == MaxWinAll && pl.winall != 0){
        uibind.allscore.bigWinner._node.visible = true;
        var act_Func = function() {
            var a = cc.scaleTo(0.5, 1.0);
            var aa = cc.fadeIn(0.5);
            var a1 = cc.scaleTo(1.0, 4);
            var a2 = cc.fadeOut(1.0);
            var act_2 = cc.rotateBy(0.8, 30);
            var act_3 = cc.rotateBy(0.8, -30);
            var a3 =  cc.callFunc(function() {
                _shine.setScale(1);
            }.bind(_shine));
            _shine.runAction(cc.sequence(cc.spawn(a,aa), cc.spawn(a1,a2),a3,cc.delayTime(0.1)).repeatForever());
            _point.runAction(cc.sequence(act_2, act_3).repeatForever());

        }
        var clubInfoTable = getClubInfoInTable();
        if (clubInfoTable && pl.info.uid == SelfUid() && MjClient.getAppType() != MjClient.APP_TYPE.QXYYQP && MjClient.getAppType() != MjClient.APP_TYPE.HUBEIMJ && MjClient.getAppType() != MjClient.APP_TYPE.YLHUNANMJ) {
            _shine.setVisible(true);
            _point.setVisible(true);
            _txt.setVisible(true);
            act_Func();
        }
    }
    var pos = cc.p(10, 345)
    if(MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_GZ && MjClient.getAppType() == MjClient.APP_TYPE.AYGUIZHOUMJ) pos = cc.p(-115, 312);
    AddFangKaIcon(sData, uibind.allscore._node, tData, pl, MaxWinAll, MaxWinPlayer,  MaxloseAll, MaxlosePlayer, pos);

    node.getChildByName("fangzhu").visible = tData.owner == pl.info.uid;
}
//扎股子大结算(NEW)
function SetGameOverLayer_zhaguzi(node,off,isNewUi)
{
    var sData=MjClient.data.sData;
    var tData=sData.tData;
    var pl=MjClient.getPlayerByIndex(off);
    if(!pl){
        node.setVisible(false);
        return;
    }
    var uidSelf = SelfUid();
    var MaxWinAll = 0;
    var MaxDianPao = 0;
    var MaxlosePlayer = null;
    var MaxWinPlayer = null;
    var MaxloseAll = 999999999;

    //计算所有人数据
    for (var uid in sData.players) {
        var pi = sData.players[uid];
        if (pi) {
            if (MaxWinAll < pi.winall) {
                MaxWinAll = pi.winall;
                MaxWinPlayer = uid;

            }else if (MaxWinAll == pi.winall) {
                if (parseInt(uid) < parseInt(MaxWinPlayer)) {
                    MaxWinAll = pi.winall;
                    MaxWinPlayer = uid;
                }
            }
            if (pi.winall < MaxloseAll) {
                MaxloseAll = pi.winall;
                MaxlosePlayer = uid;
            }else if (pi.winall == MaxloseAll) {
                if (parseInt(uid) < parseInt(MaxlosePlayer)) {
                    MaxloseAll = pi.winall;
                    MaxlosePlayer = uid;
                }
            }
        }
    }

    //输赢统计
    //输赢统计
    var winCount  = 0;
    var winScore = 0;
    var loseCount = 0;
    var loseScore = 0;
    var pingCount = 0;

    var leftCount = tData.roundNumPre;//tData.roundAll - (tData.roundAll - tData.roundNumPre + 1);
    if(cc.isUndefined(tData.roundNumPre))
    {
        leftCount = tData.roundNum;
    }
    else {
        if(tData.roundNum <= 0 && cc.isUndefined(tData.roundNumPre)) {
            leftCount = 0;
        }
    }
    if(leftCount <= 0) leftCount = 0;

    var tableMsg = pl.roomStatistics;
    if(!tableMsg)
    {
        tableMsg = [0,0,0,0,0,0];
    }

    for(var i = 0;i < tableMsg.length;i++)
    {
        if(tableMsg[i] > 0 )
        {
            winCount++;
            winScore += tableMsg[i];
            // 精度修正
            winScore = revise(winScore);
        }
        else if(tableMsg[i] < 0 )
        {
            loseCount++;
            loseScore += tableMsg[i];
            // 精度修正
            loseScore = revise(loseScore);
        }
        else if(tableMsg[i] == 0 )
        {
            pingCount++;
        }
    }
    pl.winall = revise(pl.winall);

    var uibind={
        dayingjia_light:{
            _visible: false,
            _run: function() {
                if(MaxWinAll != 0 && MaxWinAll == pl.winall )//大赢家
                {
                    this.visible = true;
                }
            },
        },
        name:{
            _run:function(){
                this.setFontName("Arial");
                this.setFontSize(this.getFontSize());
                this.ignoreContentAdaptWithSize(true);
                if(pl.winall < 0) { //输家
                    this.setColor(cc.color(37,69,89));
                }
                else {
                    this.setColor(cc.color(88,45,45));
                }
            },
            _text:function(){
                if(!pl){
                    return "";
                }
                return getNewName(unescape(pl.info.nickname)+"");
            }
        },
        id: {
            _run:function(){
                this.ignoreContentAdaptWithSize(true);
                if(pl.winall < 0) { //输家
                    this.setColor(cc.color(37,69,89));
                }
                else {
                    this.setColor(cc.color(88,45,45));
                }
            },
            _text: function () {
                if(!pl){
                    return "";
                }
                return  pl.info.uid.toString();
            }
        },
        allscore:{
            winNum1:{
                _run: function() {
                    this.ignoreContentAdaptWithSize(true);
                },
            },
            winNum2:{
                _run: function() {
                    this.ignoreContentAdaptWithSize(true);
                },
            },
            bigWinner:{
                _visible : false
            }
        },
        listView:{
            _run:function(){
                this.setScrollBarEnabled(false);
                // var itemModel = this.children[0];
                //
                // /*
                //  if(MaxWinAll !=0 && MaxWinAll == pl.winall )//大赢家
                //  {
                //  //itemModel.getChildByName("title").setColor(cc.color(221,78,0));
                //  itemModel.getChildByName("title").setColor(cc.color(255,255,255));
                //  }
                //  else if(pl.winall < 0)//输家
                //  {
                //  //itemModel.getChildByName("score").setColor(cc.color(104,104,104));
                //  itemModel.getChildByName("score").setColor(cc.color(255,255,255));
                //  }
                //  */
                //
                // if(pl.winall < 0) { //输家
                //     itemModel.getChildByName("title").setColor(cc.color(37,69,89));
                //     itemModel.getChildByName("score").setColor(cc.color(37,69,89));
                // }
                // else {
                //     itemModel.getChildByName("title").setColor(cc.color(88,45,45));
                //     itemModel.getChildByName("score").setColor(cc.color(88,45,45));
                // }
                //
                //
                // this.setItemModel(itemModel);
                // this.removeAllChildren();
                //
                // cc.log("----------tableMsg doudizhu---- " + JSON.stringify(tableMsg));
                var listView = this;
                listView.setTouchEnabled(false);
                // for(var i = 0;i < 4;i++){
                //     listView.pushBackDefaultItem();
                //     var children = listView.children;
                //     var insertItem = children[children.length-1];
                //     insertItem.getChildByName("title").setString("第" + (i+1) + "局");
                //     var scoreLabel = insertItem.getChildByName("score");
                //     insertItem.getChildByName("title").ignoreContentAdaptWithSize(true);
                //     scoreLabel.ignoreContentAdaptWithSize(true);
                //     if(i == 0)
                //     {
                //         insertItem.getChildByName("title").setString("赢" + winCount + "局");
                //         scoreLabel.setString(winScore);
                //     }
                //     else if(i == 1)
                //     {
                //         insertItem.getChildByName("title").setString("输" + loseCount + "局");
                //         scoreLabel.setString(loseScore);
                //     }
                //     else if(i == 2)
                //     {
                //         insertItem.getChildByName("title").setString("平" + pingCount + "局");
                //         scoreLabel.setString("0");
                //     }
                //     else if(i == 3)
                //     {
                //         insertItem.getChildByName("title").setString("未完成" + leftCount + "局");
                //         scoreLabel.setString("0");
                //     }
                //
                //     // if(tableMsg[i])
                //     // {
                //     //     scoreLabel.setString(tableMsg[i]);
                //     // }
                //     // else {
                //     //     scoreLabel.setString("0");
                //     // }
                // }
            },
            item_0:{
                title:{
                    _run:function(){
                        this.ignoreContentAdaptWithSize(true);
                    }
                },
                score:{
                    _run:function(){
                        this.setString(""+pl.roomStatistics[0]);
                    }
                }
            },
            item_1:{
                title:{
                    _run:function(){
                        this.ignoreContentAdaptWithSize(true);
                    }
                },
                score:{
                    _run:function(){
                        this.setString(""+pl.roomStatistics[1]);
                    }
                }
            },
            item_2:{
                title:{
                    _run:function(){
                        this.ignoreContentAdaptWithSize(true);
                    }
                },
                score:{
                    _run:function(){
                        this.setString(""+pl.roomStatistics[2]);
                    }
                }
            },
            item_3:{
                title:{
                    _run:function(){
                        this.ignoreContentAdaptWithSize(true);
                    }
                },
                score:{
                    _run:function(){
                        this.setString(""+pl.roomStatistics[3]);
                    }
                }
            },
        },
        sanNum:{
            _run:function(){
                this.setString("x"+pl.roomStatistics[4]);
            }
        },
        guNum:{
            _run:function(){
                this.setString("x"+pl.roomStatistics[5]);
            }
        }
    };

    var wxNode = node.getChildByName("head");
    addWxHeadToEndUI(wxNode,off);
    BindUiAndLogic(node,uibind);
    // node.getChildByName("fangzhu").visible =false;

    // if(MjClient.getAppType() ==  MjClient.APP_TYPE.QXJSMJ ||
    //     MjClient.getAppType() ==  MjClient.APP_TYPE.QXYYQP ||
    //     MjClient.getAppType() ==  MjClient.APP_TYPE.QXHAIANMJ)
    // {
    //     setUserOfflineWinGamePanel(node,pl);
    // }
    setUserOfflineWinGamePanel(node,pl);
    if(!pl)
    {
        uibind.allscore.visible = false;
        node.getChildByName("fangzhu").visible =false;
        return;
    }


    var _bgNode = node;
    var _name = node.getChildByName("name");
    var _id = node.getChildByName("id");

    if(MaxWinAll !=0 && MaxWinAll == pl.winall )//大赢家
    {
        _bgNode.loadTexture("gameOver/gerenxinxi_2.png");
    }
    else if(pl.winall < 0)//输家
    {
        _bgNode.loadTexture("gameOver/gerenxinxi_3.png");

        // var _textIcon1 = node.getChildByName("allscore")
        // _textIcon1.loadTexture("gameOver/zongchengji_1.png");
    }



    var numValue = Math.abs(pl.winall) + "";
    //最高得分
    uibind.allscore.visible = true;
    uibind.allscore.bigWinner._node.visible = false;
    if(pl.winall >= 0){
        var winNum1 = node.getChildByName("allscore").getChildByName("winNum1");
        winNum1.setString(pl.winall + "");
        winNum1.ignoreContentAdaptWithSize(true);
        if (!isNewUi)
        // winNum1.setScale(0.8);
            var winNum2 = node.getChildByName("allscore").getChildByName("winNum2");
        winNum2.visible = false;
    }else{
        var winNum2 = node.getChildByName("allscore").getChildByName("winNum2");
        winNum2.setString(Math.abs(pl.winall) + "");
        winNum2.ignoreContentAdaptWithSize(true);
        if (!isNewUi)
        // winNum2.setScale(0.8);
            var winNum1 = node.getChildByName("allscore").getChildByName("winNum1");
        winNum1.visible = false;
    }
    var nodeParent = node.getParent().getParent();
    var _share = nodeParent.getChildByName("share");
    var _shine = _share.getChildByName("img_shine");
    var _point = _share.getChildByName("img_point");
    var _txt = _share.getChildByName("img_txt");
    if(pl.winall == MaxWinAll && pl.winall != 0){
        uibind.allscore.bigWinner._node.visible = true;
        var act_Func = function() {
            var a = cc.scaleTo(0.5, 1.0);
            var aa = cc.fadeIn(0.5);
            var a1 = cc.scaleTo(1.0, 4);
            var a2 = cc.fadeOut(1.0);
            var act_2 = cc.rotateBy(0.8, 30);
            var act_3 = cc.rotateBy(0.8, -30);
            var a3 =  cc.callFunc(function() {
                _shine.setScale(1);
            }.bind(_shine));
            _shine.runAction(cc.sequence(cc.spawn(a,aa), cc.spawn(a1,a2),a3,cc.delayTime(0.1)).repeatForever());
            _point.runAction(cc.sequence(act_2, act_3).repeatForever());

        }
        var clubInfoTable = getClubInfoInTable();
        if (clubInfoTable && pl.info.uid == SelfUid() && MjClient.getAppType() != MjClient.APP_TYPE.QXYYQP && MjClient.getAppType() != MjClient.APP_TYPE.HUBEIMJ && MjClient.getAppType() != MjClient.APP_TYPE.YLHUNANMJ) {
            _shine.setVisible(true);
            _point.setVisible(true);
            _txt.setVisible(true);
            act_Func();
        }
    }
    // 
    var pos = cc.p(50, 435);
    
    AddFangKaIcon(sData, node, tData, pl, MaxWinAll, MaxWinPlayer,  MaxloseAll, MaxlosePlayer, pos);

    node.getChildByName("fangzhu").visible = tData.owner == pl.info.uid;
}

//麻将大结算界面(NEW)——晋中app
function SetGameOverLayer_majiang_jinzhongAPP(node,off)
{
    var sData=MjClient.data.sData;
    var tData=sData.tData;
    var pl=MjClient.getPlayerByIndex(off);
    node.setVisible(false);
    if(!pl)
    {
        return;
    }
    node.setVisible(true);
    var uidSelf = SelfUid();
    var MaxWinAll=0;
    var MaxDianPao=0;
    var bPaoWang = false;

    var MaxlosePlayer = null;
    var MaxWinPlayer = null;
    var MaxloseAll = 999999999;

    //计算所有人数据
    for (var uid in sData.players) {
        var pi = sData.players[uid];
        if (pi) {
            if (MaxWinAll < pi.winall) {
                MaxWinAll = pi.winall;
                MaxWinPlayer = uid;

            }else if (MaxWinAll == pi.winall) {
                if (parseInt(uid) < parseInt(MaxWinPlayer)) {
                    MaxWinAll = pi.winall;
                    MaxWinPlayer = uid;
                }
            }
            if (pi.winall < MaxloseAll) {
                MaxloseAll = pi.winall;
                MaxlosePlayer = uid;
            }else if (pi.winall == MaxloseAll) {
                if (parseInt(uid) < parseInt(MaxlosePlayer)) {
                    MaxloseAll = pi.winall;
                    MaxlosePlayer = uid;
                }
            }
        }
    }

    //最大点炮数
    for (var uid in sData.players) {
        var pi = sData.players[uid];
        if(pi)
        {
            MaxDianPao = MaxDianPao>pi.dianpaoTotal?MaxDianPao:pi.dianpaoTotal;
        }
    }


    //计算炮王
    var _paowangArray = [];
    var _paoScore = 9999;
    for (var uid in sData.players) {
        var pi = sData.players[uid];
        if(pi)
        {
            if(MaxDianPao == pi.dianpaoTotal)
            {
                if(pi.winall <= _paoScore)
                {
                    _paoScore = pi.winall;
                    //_paowangArray.push(pi.info.uid);
                }
            }
        }
    }

    //存点炮王的数组
    for (var uid in sData.players) {
        var pi = sData.players[uid];
        if(pi)
        {
            if(MaxDianPao == pi.dianpaoTotal)
            {
                if(pi.winall <= _paoScore)
                {
                    _paowangArray.push(pi.info.uid);
                }
            }
        }
    }

    cc.log("===================_paowangArray =22222 " + JSON.stringify(_paowangArray));

    //是否是炮王
    if(_paowangArray.indexOf(pl.info.uid)>=0)
    {
        bPaoWang = true;
    }

    // text += "-" + tData.maxPlayer + "人\n";
    // var roundNumPre = typeof(tData.roundNumPre) != "undefined" ? tData.roundNumPre : tData.roundNum;

    //输赢统计
    var winCount  = 0;
    var winScore = 0;
    var loseCount = 0;
    var loseScore = 0;
    var pingCount = 0;

    var leftCount = tData.roundNumPre;//tData.roundAll - (tData.roundAll - tData.roundNumPre + 1);
    if(tData.roundAll==9999)
    {
        leftCount=0
    }
    else {
        if(cc.isUndefined(tData.roundNumPre))
        {
            leftCount = tData.roundNum;
        }
        else {
            if(tData.roundNum <= 0 && cc.isUndefined(tData.roundNumPre)) {
                leftCount = 0;
            }
        }
    }
    if(leftCount <= 0) leftCount = 0;


    var tableMsg = pl.roomStatistics;
    if(!tableMsg)
    {
        tableMsg = [0,0,0,0,0];
    }

    cc.log("tData.roundNumPre = " + tData.roundAll);
    cc.log("tData.roundNumPre = " + tData.roundNum);
    cc.log("tData.roundNumPre = " + tData.roundNumPre);
    cc.log("leftCount = " + leftCount);

    for(var i = 0;i < tableMsg.length;i++)
    {
        if(tableMsg[i] > 0 )
        {
            winCount++;
            winScore += tableMsg[i];
            // 精度修正
            winScore = revise(winScore);
        }
        else if(tableMsg[i] < 0 )
        {
            loseCount++;
            loseScore += tableMsg[i];
            // 精度修正
            loseScore = revise(loseScore);
        }
        else if(tableMsg[i] == 0 )
        {
            pingCount++;
        }
    }
    pl.winall = revise(pl.winall);
    // pingCount =  tData.roundAll - winCount - loseCount;


    var uibind={
        dayingjia_light:{
            _visible: false,
            _run: function() {
                if(MaxWinAll != 0 && MaxWinAll == pl.winall )//大赢家
                {
                    this.visible = true;
                }
            },
        },
        name:{
            _run: function() {
                this.setFontName("Arial");
                this.ignoreContentAdaptWithSize(true);
                if(pl.winall < 0) { //输家
                    this.setColor(cc.color(37,69,89));
                }
                else {
                    this.setColor(cc.color(88,45,45));
                }
            },
            _text: function() {
                return getNewName(unescape(pl.info.nickname ) + "");
            }
        },
        id: {
            _run:function()
            {
                this.ignoreContentAdaptWithSize(true);
                if(pl.winall < 0) { //输家
                    this.setColor(cc.color(37,69,89));
                }
                else {
                    this.setColor(cc.color(88,45,45));
                }
            },
            _text: function () {
                return "ID:" + pl.info.uid.toString();
            }
        },
        winNode:{
            winNum:{
                _run: function() {
                    this.ignoreContentAdaptWithSize(true);
                },
            },
            bigWinner:{
                _visible : false
            }
        },
        lastNode:{
            winNum1:{
                _run: function() {
                    this.ignoreContentAdaptWithSize(true);
                },
            },
            winNum2:{
                _run: function() {
                    this.ignoreContentAdaptWithSize(true);
                },
            },
        },
        normalNode:{
            winNum1:{
                _run: function() {
                    this.ignoreContentAdaptWithSize(true);
                },
            },
            winNum2:{
                _run: function() {
                    this.ignoreContentAdaptWithSize(true);
                },
            },
        },
        statistc:{
            item0:{
                _run:function()
                {
                    // if(MaxWinAll != 0 && MaxWinAll == pl.winall )//大赢家
                    // {
                    //     this.setColor(cc.color(88,45,45));
                    // }
                    // else if(pl.winall < 0)//输家
                    // {
                    //     this.setColor(cc.color(37,69,89));
                    // }
                    if(pl.winall < 0) { //输家
                        this.setColor(cc.color(37,69,89));
                    }
                    else {
                        this.setColor(cc.color(88,45,45));
                    }

                    this.ignoreContentAdaptWithSize(true);
                    // this.getChildByName("Image_bg").visible = true;
                    this.getChildByName("text").visible = true;
                    this.getChildByName("text").setString("" + winScore);
                    this.getChildByName("text").ignoreContentAdaptWithSize(true);
                },
                _text: function () {
                    //console.log("=====doomsky say:pl.zimoTotal======", pl.zimoTotal);
                    return "赢" + winCount + "局";
                }
            },

            item1:{
                _run:function()
                {
                    if(pl.winall < 0) { //输家
                        this.setColor(cc.color(37,69,89));
                    }
                    else {
                        this.setColor(cc.color(88,45,45));
                    }
                    this.ignoreContentAdaptWithSize(true);
                    // this.getChildByName("Image_bg").visible = true;
                    this.getChildByName("text").visible = true;
                    this.getChildByName("text").setString("" + loseScore);
                    this.getChildByName("text").ignoreContentAdaptWithSize(true);
                },
                _text: function () {
                    return "输" + loseCount + "局";
                }
            },
            item2:{
                _run:function()
                {
                    if(pl.winall < 0) { //输家
                        this.setColor(cc.color(37,69,89));
                    }
                    else {
                        this.setColor(cc.color(88,45,45));
                    }
                    this.ignoreContentAdaptWithSize(true);
                    // this.getChildByName("Image_bg").visible = true;
                    this.getChildByName("text").visible = true;
                    this.getChildByName("text").setString("" + 0);
                    this.getChildByName("text").ignoreContentAdaptWithSize(true);
                },
                _text: function () {
                    return "平" + pingCount + "局";
                }
            },
            item3:{
                _run:function()
                {
                    if(pl.winall < 0) { //输家
                        this.setColor(cc.color(37,69,89));
                    }
                    else {
                        this.setColor(cc.color(88,45,45));
                    }
                    this.ignoreContentAdaptWithSize(true);
                    // this.getChildByName("Image_bg").visible = true;
                    this.getChildByName("text").visible = true;
                    this.getChildByName("text").setString("" + 0);
                    this.getChildByName("text").ignoreContentAdaptWithSize(true);
                },
                _text: function () {
                    return "未完成" + leftCount + "局";
                }
            },
            item4:{
                _text: function () {
                    return "";
                }
            },
            item5:{
                _text: function () {
                    //return "旋风杠次数：" +  (pl.xuanfenggangTotal  > 0? pl.xuanfenggangTotal +"":"0" );
                    return "";
                }
            },
        },
    }

    // if(MjClient.getAppType() ==  MjClient.APP_TYPE.QXJSMJ ||
    //     MjClient.getAppType() ==  MjClient.APP_TYPE.QXYYQP ||
    //     MjClient.getAppType() ==  MjClient.APP_TYPE.QXHAIANMJ)
    // {
    //     setUserOfflineWinGamePanel(node,pl);
    // }

    setUserOfflineWinGamePanel(node,pl);

    var wxNode = node.getChildByName("head");
    addWxHeadToEndUI(wxNode,off);
    BindUiAndLogic(node,uibind);

    var numValue = Math.abs(pl.winall) + "";
    var nodeParent = node.getParent();
    var _share = nodeParent.getChildByName("share");
    var _shine = _share.getChildByName("img_shine");
    var _point = _share.getChildByName("img_point");
    var _txt = _share.getChildByName("img_txt");


    if(/*MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ*/
        isJinZhongAPPType())
    {
        var _bgNode = node.getChildByName("bg");
        var _name = node.getChildByName("name");
        var _id = node.getChildByName("id");

        if(MaxWinAll !=0 && MaxWinAll == pl.winall )//大赢家
        {
            _bgNode.loadTexture("gameOver/gerenxinxi_2.png");
        }
        else if(pl.winall < 0)//输家
        {
            _bgNode.loadTexture("gameOver/gerenxinxi_3.png");

            var _textIcon1 = node.getChildByName("winNode").getChildByName("allscore");
            var _textIcon2 = node.getChildByName("lastNode").getChildByName("allscore");
            var _textIcon3 = node.getChildByName("normalNode").getChildByName("allscore");
            _textIcon1.loadTexture("gameOver/zongchengji_1.png");
            _textIcon2.loadTexture("gameOver/zongchengji_1.png");
            _textIcon3.loadTexture("gameOver/zongchengji_1.png");
        }
    }

    cc.log("pl.winall ************ pl.winall = " + pl.winall);
    var _fangkaNode;
    //最高得分
    if (MaxWinAll !=0 && MaxWinAll == pl.winall ) {
        uibind.normalNode._node.visible = false;
        uibind.lastNode._node.visible =false;
        uibind.winNode._node.visible = true;
        _fangkaNode = uibind.winNode._node;
        uibind.winNode.bigWinner._node.visible = true;
        uibind.winNode.winNum._node.setString(pl.winall + "");
        uibind.winNode.winNum._node.ignoreContentAdaptWithSize(true);
        var act_Func = function() {
            var a = cc.scaleTo(0.5, 1.0);
            var aa = cc.fadeIn(0.5);
            var a1 = cc.scaleTo(1.0, 4);
            var a2 = cc.fadeOut(1.0);
            var act_2 = cc.rotateBy(0.8, 30);
            var act_3 = cc.rotateBy(0.8, -30);
            var a3 =  cc.callFunc(function() {
                _shine.setScale(1);
            }.bind(_shine));
            _shine.runAction(cc.sequence(cc.spawn(a,aa), cc.spawn(a1,a2),a3,cc.delayTime(0.1)).repeatForever());
            _point.runAction(cc.sequence(act_2, act_3).repeatForever());

        }
        var clubInfoTable = getClubInfoInTable();
        if (clubInfoTable && pl.info.uid == SelfUid() && MjClient.getAppType() != MjClient.APP_TYPE.QXYYQP && MjClient.getAppType() != MjClient.APP_TYPE.HUBEIMJ && MjClient.getAppType() != MjClient.APP_TYPE.YLHUNANMJ) {
            _shine.setVisible(true);
            _point.setVisible(true);
            _txt.setVisible(true);
            act_Func();
        }
    }//点炮最多
    else if( MaxDianPao != 0 &&  bPaoWang){
        uibind.winNode._node.visible = false;
        uibind.normalNode._node.visible = false;
        uibind.lastNode._node.visible =true;
        _fangkaNode = uibind.lastNode._node;
        if( pl.winall >=0 ){
            uibind.lastNode.winNum1._node.visible = true;
            uibind.lastNode.winNum2._node.visible = false;
            uibind.lastNode.winNum1._node.setString(pl.winall + "");
            uibind.lastNode.winNum1._node.ignoreContentAdaptWithSize(true);
        }
        else{
            uibind.lastNode.winNum1._node.visible = false;
            uibind.lastNode.winNum2._node.visible = true;
            uibind.lastNode.winNum2._node.setString(Math.abs(pl.winall) + "");
            uibind.lastNode.winNum2._node.ignoreContentAdaptWithSize(true);
        }
    }
    else{
        uibind.winNode._node.visible = false;
        uibind.lastNode._node.visible =false;
        uibind.normalNode._node.visible = true;
        _fangkaNode = uibind.normalNode._node;
        if( pl.winall >= 0 ){
            uibind.normalNode.winNum2._node.visible =false;
            uibind.normalNode.winNum1._node.visible= true;
            uibind.normalNode.winNum1._node.setString(pl.winall + "");
            uibind.normalNode.winNum1._node.ignoreContentAdaptWithSize(true);

        }
        else {
            uibind.normalNode.winNum1._node.visible= false;
            uibind.normalNode.winNum2._node.visible =true;
            uibind.normalNode.winNum2._node.setString(Math.abs(pl.winall) + "");
            uibind.normalNode.winNum2._node.ignoreContentAdaptWithSize(true);
        }
    }

    node.getChildByName("fangzhu").visible = tData.owner == pl.info.uid;

    var maxPlayer = parseInt(MjClient.data.sData.tData.maxPlayer);
    var head2 = node.getParent().getChildByName("head2");
    var head3 = node.getParent().getChildByName("head3");
    if (head2 && head3)
    {
        var size = (head3.x - head2.x) * (4 - maxPlayer) / (maxPlayer + 1);
        node.x += size * (off + 1);
    }
    AddFangKaIcon(sData, _fangkaNode, tData, pl, MaxWinAll, MaxWinPlayer,  MaxloseAll, MaxlosePlayer, cc.p(-113, 335));
}

// 岳阳麻将大结算_new
function SetGameOverLayer_QXYYQP(node,off)
{
    if(!node) return;
    var sData=MjClient.data.sData;
    var tData=sData.tData;
    var pl=MjClient.getPlayerByIndex(off);
    node.setVisible(false);
    if(!pl)
    {
        return;
    }
    node.setVisible(true);
    var uidSelf = SelfUid();
    var MaxWinAll=0;
    var MaxDianPao=0;
    var bPaoWang = false;
    var MaxlosePlayer = null;
    var MaxWinPlayer = null;
    var MaxloseAll = 999999999;

    //计算所有人数据
    for (var uid in sData.players) {
        var pi = sData.players[uid];
        if (pi) {
            if (MaxWinAll < pi.winall) {
                MaxWinAll = pi.winall;
                MaxWinPlayer = uid;

            }else if (MaxWinAll == pi.winall) {
                if (parseInt(uid) < parseInt(MaxWinPlayer)) {
                    MaxWinAll = pi.winall;
                    MaxWinPlayer = uid;
                }
            }
            if (pi.winall < MaxloseAll) {
                MaxloseAll = pi.winall;
                MaxlosePlayer = uid;
            }else if (pi.winall == MaxloseAll) {
                if (parseInt(uid) < parseInt(MaxlosePlayer)) {
                    MaxloseAll = pi.winall;
                    MaxlosePlayer = uid;
                }
            }
        }
    }

    //最大点炮数
    for (var uid in sData.players) {
        var pi = sData.players[uid];
        if(pi)
        {
            MaxDianPao = MaxDianPao>pi.dianpaoTotal?MaxDianPao:pi.dianpaoTotal;
        }
    }


    //计算炮王
    var _paowangArray = [];
    var _paoScore = 9999;
    for (var uid in sData.players) {
        var pi = sData.players[uid];
        if(pi)
        {
            if(MaxDianPao == pi.dianpaoTotal)
            {
                if(pi.winall <= _paoScore)
                {
                    _paoScore = pi.winall;
                    //_paowangArray.push(pi.info.uid);
                }
            }
        }
    }

    //存点炮王的数组
    for (var uid in sData.players) {
        var pi = sData.players[uid];
        if(pi)
        {
            if(MaxDianPao == pi.dianpaoTotal)
            {
                if(pi.winall <= _paoScore)
                {
                    _paowangArray.push(pi.info.uid);
                }
            }
        }
    }

    cc.log("===================_paowangArray =33333 " + JSON.stringify(_paowangArray));

    //是否是炮王
    if(_paowangArray.indexOf(pl.info.uid)>=0)
    {
        bPaoWang = true;
    }

    //根据输赢设置背景底板颜色
    function setPlayerBg()
    {
        var _bgNode = node.getChildByName("bg");
        var _name = node.getChildByName("name");
        var _id = node.getChildByName("id");

        if(MaxWinAll !=0 && MaxWinAll == pl.winall )//大赢家
        {
            _bgNode.loadTexture("gameOver/pjjs_9.png");
        }
    }



    var uibind={
        name:{
            _run: function() {
                this.setFontName("Arial");
                this.ignoreContentAdaptWithSize(true);
            },
            _text: function() {
                return getNewName(unescape(pl.info.nickname ) + "");
            }
        },
        id: {
            _run:function()
            {
                this.ignoreContentAdaptWithSize(true);
            },
            _text: function () {
                return "ID:" + pl.info.uid.toString();
            }
        },
        winNode:{
            winNum:{
            },
            bigWinner:{
                _visible : false
            }
        },
        lastNode:{
            winNum1:{},
            winNum2:{},
        },
        normalNode:{
            winNum1:{},
            winNum2:{},
        },
        statistc:{
            _run:function() {
                if (MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_YI_JIAO_LAI_YOU ||
                    MjClient.gameType == MjClient.GAME_TYPE.HU_BEI_YI_JIAO_LAI_YOU) {
                    this.visible = false;
                }
                else {
                    this.visible = true;
                }
            },
            item0:{
                _run:function()
                {
                    this.ignoreContentAdaptWithSize(true);
                },
                _text: function () {
                    console.log("=====doomsky say:pl.zimoTotal======", pl.zimoTotal);
                    if(pl.roomStatisticsDesc && typeof pl.roomStatisticsDesc[0] == 'string') return pl.roomStatisticsDesc[0] + "";

                    if (MjClient.gameType == MjClient.GAME_TYPE.MJ_ZHUO_XIA_ZI)
                    {
                        return "大胡自摸";
                    }
                    else if (MjClient.gameType == MjClient.GAME_TYPE.CHAO_GU_MJ)
                    {
                        return "小刀次数";
                    }
                    else{
                        return "自摸次数";
                    }
                },
                Text:{
                    _text: function () {
                        if (pl.roomStatisticsDesc && typeof pl.roomStatisticsDesc[0] == 'string') {
                            return pl.roomStatistics[0] + "";
                        }
                        if (MjClient.gameType == MjClient.GAME_TYPE.MJ_ZHUO_XIA_ZI)
                        {
                            return pl.dahuzimoTotal > 0 ? pl.dahuzimoTotal+ "": "0";
                        }
                        if (MjClient.gameType == MjClient.GAME_TYPE.CHAO_GU_MJ)
                        {
                            return pl.endInfo["小刀"] > 0 ? pl.endInfo["小刀"]+ "": "0";
                        }
                        return pl.zimoTotal > 0 ? pl.zimoTotal + "" : "0";
                    },
                    _run:function() {
                        var childTex = this.getParent().getChildByName("Text_0");
                        childTex.ignoreContentAdaptWithSize(true);
                        childTex.setString(this.getString());
                        if (this.getParent().getString() == "") {
                            this.visible = false;
                            childTex.visible = false;
                        }
                        if(MaxWinAll != 0 && MaxWinAll == pl.winall )//大赢家
                        {
                            this.visible = false;
                            childTex.visible = true;
                        }
                        else {
                            this.visible = true;
                            childTex.visible = false;
                        }
                        this.ignoreContentAdaptWithSize(true);
                    },
                },
            },

            item1:{
                _run:function()
                {
                    this.ignoreContentAdaptWithSize(true);
                },
                _text: function () {
                    if(pl.roomStatisticsDesc && typeof pl.roomStatisticsDesc[1] == 'string') return pl.roomStatisticsDesc[1] + "";

                    if (MjClient.gameType == MjClient.GAME_TYPE.MJ_ZHUO_XIA_ZI)
                    {
                        return "小胡自摸";
                    }
                    else if (MjClient.gameType == MjClient.GAME_TYPE.CHAO_GU_MJ)
                    {
                        return "大刀次数";
                    }
                    else if(MjClient.gameType == MjClient.GAME_TYPE.NAN_XIAN_MJ)
                    {
                        return "接炮次数";
                    }
                    else{
                        return "点炮次数";
                    }

                },
                Text:{
                    _text: function () {
                        if (pl.roomStatisticsDesc && typeof pl.roomStatisticsDesc[1] == 'string') {
                            return pl.roomStatistics[1] + "";
                        }
                        if (MjClient.gameType == MjClient.GAME_TYPE.MJ_ZHUO_XIA_ZI)
                        {
                            return pl.xiaohuzimoTotal > 0 ? pl.xiaohuzimoTotal+ "": "0";
                        }
                        if (MjClient.gameType == MjClient.GAME_TYPE.NAN_XIAN_MJ)
                        {
                            return pl.jiepaoTotal > 0 ? pl.jiepaoTotal+ "": "0";
                        }
                        if (MjClient.gameType == MjClient.GAME_TYPE.CHAO_GU_MJ)
                        {
                            return pl.endInfo["大刀"] > 0 ? pl.endInfo["大刀"]+ "": "0";
                        }
                        return pl.dianpaoTotal > 0 ? pl.dianpaoTotal + "" : "0";
                    },
                    _run:function() {
                        var childTex = this.getParent().getChildByName("Text_0");
                        childTex.ignoreContentAdaptWithSize(true);
                        childTex.setString(this.getString());
                        if (this.getParent().getString() == "") {
                            this.visible = false;
                            childTex.visible = false;
                        }
                        if(MaxWinAll != 0 && MaxWinAll == pl.winall )//大赢家
                        {
                            this.visible = false;
                            childTex.visible = true;
                        }
                        else {
                            this.visible = true;
                            childTex.visible = false;
                        }
                        this.ignoreContentAdaptWithSize(true);
                    },
                },
            },
            item2:{
                _run:function()
                {
                    this.ignoreContentAdaptWithSize(true);
                },
                _text: function () {
                    if(pl.roomStatisticsDesc && typeof pl.roomStatisticsDesc[2] == 'string') return pl.roomStatisticsDesc[2] + "";
                    if (MjClient.gameType == MjClient.GAME_TYPE.TONG_HUA)
                        return "接炮次数";
                    else if (MjClient.gameType == MjClient.GAME_TYPE.MJ_ZHUO_XIA_ZI 
                            || MjClient.gameType == MjClient.GAME_TYPE.CHAO_GU_MJ
                            || MjClient.gameType == MjClient.GAME_TYPE.ML_HONGZHONG
                            || MjClient.gameType == MjClient.GAME_TYPE.ML_HONGZHONG_ZERO)
                    {
                        return "接炮次数";
                    }
                    else if(MjClient.gameType == MjClient.GAME_TYPE.NAN_XIAN_MJ){
                        return "点炮次数";
                    }
                    else
                        return "暗杠次数";
                },
                Text:{
                    _text: function () {
                        if (pl.roomStatisticsDesc && typeof pl.roomStatisticsDesc[2] == 'string') {
                            return pl.roomStatistics[2] + "";
                        }

                        if (MjClient.gameType == MjClient.GAME_TYPE.MJ_ZHUO_XIA_ZI ||
                            MjClient.gameType == MjClient.GAME_TYPE.ML_HONGZHONG
                            || MjClient.gameType == MjClient.GAME_TYPE.ML_HONGZHONG_ZERO)
                        {
                            return pl.jiepaoTotal > 0 ? pl.jiepaoTotal+ "": "0";
                        }
                        if(MjClient.gameType == MjClient.GAME_TYPE.NAN_XIAN_MJ){
                            return pl.dianpaoTotal > 0 ? pl.dianpaoTotal + "" : "0";
                        }
                        if (MjClient.gameType == MjClient.GAME_TYPE.CHAO_GU_MJ)
                        {
                            return pl.endInfo["接炮"] > 0 ? pl.endInfo["接炮"]+ "": "0";
                        }
                        if (MjClient.gameType == MjClient.GAME_TYPE.TONG_HUA)
                            return pl.jiepaoTotal > 0 ? pl.jiepaoTotal + "" : "0";
                        else
                            return pl.angangTotal > 0 ? pl.angangTotal + "" : "0";
                    },
                    _run:function() {
                        var childTex = this.getParent().getChildByName("Text_0");
                        childTex.ignoreContentAdaptWithSize(true);
                        childTex.setString(this.getString());
                        if (this.getParent().getString() == "") {
                            this.visible = false;
                            childTex.visible = false;
                        }
                        if(MaxWinAll != 0 && MaxWinAll == pl.winall )//大赢家
                        {
                            this.visible = false;
                            childTex.visible = true;
                        }
                        else {
                            this.visible = true;
                            childTex.visible = false;
                        }
                        this.ignoreContentAdaptWithSize(true);
                    },
                },
            },
            item3:{
                _run:function()
                {
                    this.ignoreContentAdaptWithSize(true);
                },
                _text: function () {
                    if(pl.roomStatisticsDesc && typeof pl.roomStatisticsDesc[3] == 'string') return pl.roomStatisticsDesc[3] + "";
                    console.log("=====doomsky say:pl.angangTotal======", pl.angangTotal);
                    if (MjClient.gameType == MjClient.GAME_TYPE.TONG_HUA)
                        return "暗蛋次数";
                    else if (MjClient.gameType == MjClient.GAME_TYPE.MJ_ZHUO_XIA_ZI ||
                            MjClient.gameType == MjClient.GAME_TYPE.CHAO_GU_MJ)
                    {
                        return "点炮次数";
                    }
                    else if(MjClient.gameType == MjClient.GAME_TYPE.NAN_XIAN_MJ ||
                        MjClient.gameType == MjClient.GAME_TYPE.ML_HONGZHONG
                        || MjClient.gameType == MjClient.GAME_TYPE.ML_HONGZHONG_ZERO) {
                        return "暗杠次数";
                    }
                    else
                        return "明杠次数";
                },
                Text:{
                    _text: function () {
                        if (pl.roomStatisticsDesc && typeof pl.roomStatisticsDesc[3] == 'string') {
                            return pl.roomStatistics[3] + "";
                        }

                        if (MjClient.gameType == MjClient.GAME_TYPE.MJ_ZHUO_XIA_ZI ||
                            MjClient.gameType == MjClient.GAME_TYPE.CHAO_GU_MJ)
                        {
                            return pl.dianpaoTotal > 0 ? pl.dianpaoTotal+ "": "0";
                        }
                        if (MjClient.gameType == MjClient.GAME_TYPE.NAN_XIAN_MJ ||
                            MjClient.gameType == MjClient.GAME_TYPE.ML_HONGZHONG 
                            || MjClient.gameType == MjClient.GAME_TYPE.ML_HONGZHONG_ZERO) {
                            return pl.angangTotal > 0 ? pl.angangTotal + "" : "0";
                        }
                        if (MjClient.gameType == MjClient.GAME_TYPE.TONG_HUA)
                            return pl.angangTotal > 0 ? pl.angangTotal + "" : "0";
                        else
                            return pl.minggangTotal > 0 ? pl.minggangTotal + "" : "0";
                    },
                    _run:function() {
                        var childTex = this.getParent().getChildByName("Text_0");
                        childTex.ignoreContentAdaptWithSize(true);
                        childTex.setString(this.getString());
                        if (this.getParent().getString() == "") {
                            this.visible = false;
                            childTex.visible = false;
                        }
                        if(MaxWinAll != 0 && MaxWinAll == pl.winall )//大赢家
                        {
                            this.visible = false;
                            childTex.visible = true;
                        }
                        else {
                            this.visible = true;
                            childTex.visible = false;
                        }
                        this.ignoreContentAdaptWithSize(true);
                    },
                },
            },
            item4:{
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                },
                _text: function () {
                    if(pl.roomStatisticsDesc && typeof pl.roomStatisticsDesc[4] == 'string') return pl.roomStatisticsDesc[4] + "";
                    console.log("=====doomsky say:pl.minggangTotal======", pl.minggangTotal);
                    if (MjClient.gameType == MjClient.GAME_TYPE.TONG_HUA)
                        return "明蛋次数";
                    else if(MjClient.gameType == MjClient.GAME_TYPE.TY_ZHUANZHUAN)
                        return "接炮次数";
                    else if (MjClient.gameType == MjClient.GAME_TYPE.CHAO_GU_MJ)
                    {
                        return "连冠加倍";
                    }
                    else if (MjClient.gameType == MjClient.GAME_TYPE.NAN_XIAN_MJ ||
                        MjClient.gameType == MjClient.GAME_TYPE.ML_HONGZHONG
                        || MjClient.gameType == MjClient.GAME_TYPE.ML_HONGZHONG_ZERO) {
                        return "明杠次数";
                    }
                    else
                        return "";
                    //return "明杠次数          " + (pl.minggangTotal  > 0? pl.minggangTotal +"":"0" );
                },
                Text:{
                    _text: function () {
                        if (pl.roomStatisticsDesc && typeof pl.roomStatisticsDesc[4] == 'string') {
                            return pl.roomStatistics[4] + "";
                        }
                        if (MjClient.gameType == MjClient.GAME_TYPE.CHAO_GU_MJ)
                        {
                            return pl.endInfo["连冠加倍"] > 0 ? pl.endInfo["连冠加倍"]+ "": "0";
                        }
                        if (MjClient.gameType == MjClient.GAME_TYPE.NAN_XIAN_MJ ||
                            MjClient.gameType == MjClient.GAME_TYPE.ML_HONGZHONG
                            || MjClient.gameType == MjClient.GAME_TYPE.ML_HONGZHONG_ZERO) {
                            return pl.minggangTotal > 0 ? pl.minggangTotal + "" : "0";
                        }
                        if (MjClient.gameType == MjClient.GAME_TYPE.TONG_HUA)
                            return pl.minggangTotal > 0 ? pl.minggangTotal + "" : "0";
                        if(MjClient.gameType == MjClient.GAME_TYPE.TY_ZHUANZHUAN){
                            return pl.jiepaoTotal > 0 ? pl.jiepaoTotal + "" : "0";
                        }
                    },
                    _run:function() {
                        var childTex = this.getParent().getChildByName("Text_0");
                        childTex.ignoreContentAdaptWithSize(true);
                        childTex.setString(this.getString());
                        if (this.getParent().getString() == "") {
                            this.visible = false;
                            childTex.visible = false;
                        }
                        if(MaxWinAll != 0 && MaxWinAll == pl.winall )//大赢家
                        {
                            this.visible = false;
                            childTex.visible = true;
                        }
                        else {
                            this.visible = true;
                            childTex.visible = false;
                        }
                        this.ignoreContentAdaptWithSize(true);
                    },
                },
            },
            item5:{
                _run:function()
                {
                    this.ignoreContentAdaptWithSize(true);
                    if(pl.roomStatisticsDesc && typeof pl.roomStatisticsDesc[5] == 'string') this.visible = true;
                },
                _text: function () {
                    if(pl.roomStatisticsDesc && typeof pl.roomStatisticsDesc[5] == 'string') return pl.roomStatisticsDesc[5] + "";

                    //return "旋风杠次数：" +  (pl.xuanfenggangTotal  > 0? pl.xuanfenggangTotal +"":"0" );
                    return "";
                },
                Text:{
                    _text: function () {
                        if (pl.roomStatisticsDesc && typeof pl.roomStatisticsDesc[5] == 'string') {
                            return pl.roomStatistics[5] + "";
                        }
                    },
                    _run:function() {
                        var childTex = this.getParent().getChildByName("Text_0");
                        childTex.ignoreContentAdaptWithSize(true);
                        childTex.setString(this.getString());
                        if (this.getParent().getString() == "") {
                            this.visible = false;
                            childTex.visible = false;
                        }
                        if(MaxWinAll != 0 && MaxWinAll == pl.winall )//大赢家
                        {
                            this.visible = false;
                            childTex.visible = true;
                        }
                        else {
                            this.visible = true;
                            childTex.visible = false;
                        }
                        this.ignoreContentAdaptWithSize(true);
                    },
                },
            },
        },
        listView:{
            _run:function(){
                if(MjClient.gameType != MjClient.GAME_TYPE.YUE_YANG_YI_JIAO_LAI_YOU &&
                    MjClient.gameType != MjClient.GAME_TYPE.HU_BEI_YI_JIAO_LAI_YOU)
                {
                    this.visible = false;
                    return;
                }
                else {
                    this.visible = true;
                }
                this.setScrollBarEnabled(false);
                var itemModel = this.children[0];
                this.setItemModel(itemModel);
                this.removeAllChildren();
                var tableMsg = pl.tableMsg;

                cc.log("----------tableMsg doudizhu---- " + JSON.stringify(tableMsg));

                var listView = this;


                var nameText = [" 自摸次数"," 点炮次数"," 接炮次数"," 暗杠次数"," 明杠次数"];
                var zimoTotal =  pl.zimoTotal;
                var dianpaoTotal = pl.dianpaoTotal;
                var jiepaoTotal = pl.jiepaoTotal;
                var angangTotal = pl.angangTotal;
                var minggangTotal = pl.minggangTotal;
                var describeMsg = [zimoTotal,dianpaoTotal,jiepaoTotal,angangTotal,minggangTotal];
                // cc.log('describeMsgdescribeMsgdescribeMsg:'+JSON.stringify(describeMsg))
                for (var i = 0; i < describeMsg.length; i++) {
                    listView.pushBackDefaultItem();
                    var listChild = listView.children;//listView.getChildByName("maxTextItem_" + i);
                    var item = listChild[i];
                    var itemName = item.getChildByName("title");
                    itemName.setString(nameText[i]);
                    var scoreText = item.getChildByName("score");
                    scoreText.setString(describeMsg[i]);
                    scoreText.ignoreContentAdaptWithSize(true);
                    if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ  || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) {
                        if (Number(scoreText.getString()) > 0) {
                            scoreText.setColor(cc.color("#D3260E"));
                        }
                        else {
                            scoreText.setColor(cc.color("#00824C"));
                        }
                    }
                }


                for(var i = 0;i < tableMsg.length;i++){
                    listView.pushBackDefaultItem();
                    var children = listView.children;
                    var insertItem = children[children.length-1];

                    insertItem.getChildByName("title").setString(" 第" + (i+1) + "局");
                    var scoreLabel = insertItem.getChildByName("score");
                    scoreLabel.ignoreContentAdaptWithSize(true);
                    if(tableMsg[i])
                    {
                        scoreLabel.setString(tableMsg[i]);
                    }
                    else {
                        scoreLabel.setString("0");
                    }
                    if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP ||MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ  || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) {
                        if (Number(scoreLabel.getString()) > 0) {
                            scoreLabel.setColor(cc.color("#D3260E"));
                        }
                        else {
                            scoreLabel.setColor(cc.color("#00824C"));
                        }
                    }
                }
            }
        },
    }

    setUserOfflineWinGamePanel(node,pl);

    // 显示玩家头像
    var head = node.getChildByName("head");
    CircularCuttingHeadImg(head, pl);

    BindUiAndLogic(node,uibind);

    var numValue = Math.abs(pl.winall) + "";
    var nodeParent = node.getParent();
    var _share = nodeParent.getChildByName("share");
    var _shine = _share.getChildByName("img_shine");
    var _point = _share.getChildByName("img_point");
    var _txt = _share.getChildByName("img_txt");


    setPlayerBg();

    var _fangkaNode;
    //最高得分
    if (MaxWinAll !=0 && MaxWinAll == pl.winall ) {
        uibind.normalNode._node.visible = false;
        uibind.lastNode._node.visible =false;
        uibind.winNode._node.visible = true;
        uibind.winNode.bigWinner._node.visible = true;
        uibind.winNode.winNum._node.setString(pl.winall + "");
        uibind.winNode.winNum._node.ignoreContentAdaptWithSize(true);
        var act_Func = function() {
            var a = cc.scaleTo(0.5, 1.0);
            var aa = cc.fadeIn(0.5);
            var a1 = cc.scaleTo(1.0, 4);
            var a2 = cc.fadeOut(1.0);
            var act_2 = cc.rotateBy(0.8, 30);
            var act_3 = cc.rotateBy(0.8, -30);
            var a3 =  cc.callFunc(function() {
                _shine.setScale(1);
            }.bind(_shine));
            _shine.runAction(cc.sequence(cc.spawn(a,aa), cc.spawn(a1,a2),a3,cc.delayTime(0.1)).repeatForever());
            _point.runAction(cc.sequence(act_2, act_3).repeatForever());

        }
        var clubInfoTable = getClubInfoInTable();
        if (clubInfoTable && pl.info.uid == SelfUid() && MjClient.getAppType() != MjClient.APP_TYPE.QXYYQP && MjClient.getAppType() != MjClient.APP_TYPE.HUBEIMJ && MjClient.getAppType() != MjClient.APP_TYPE.YLHUNANMJ) {
            _shine.setVisible(true);
            _point.setVisible(true);
            _txt.setVisible(true);
            act_Func();
        }

        _fangkaNode = uibind.winNode._node;
    }//点炮最多
    else if( MaxDianPao != 0 &&  bPaoWang){
        uibind.winNode._node.visible = false;
        uibind.normalNode._node.visible = false;
        uibind.lastNode._node.visible =true;
        _fangkaNode = uibind.lastNode._node;
        if( pl.winall >=0 ){
            uibind.lastNode.winNum1._node.visible = true;
            uibind.lastNode.winNum2._node.visible = false;
            uibind.lastNode.winNum1._node.setString(pl.winall + "");
            uibind.lastNode.winNum1._node.ignoreContentAdaptWithSize(true);
        }
        else{
            uibind.lastNode.winNum1._node.visible = false;
            uibind.lastNode.winNum2._node.visible = true;
            uibind.lastNode.winNum2._node.setString(Math.abs(pl.winall) + "");
            uibind.lastNode.winNum2._node.ignoreContentAdaptWithSize(true);
        }
    }
    else{
        uibind.winNode._node.visible = false;
        uibind.lastNode._node.visible =false;
        uibind.normalNode._node.visible = true;
        _fangkaNode = uibind.normalNode._node;
        if( pl.winall >= 0 ){
            uibind.normalNode.winNum2._node.visible =false;
            uibind.normalNode.winNum1._node.visible= true;
            uibind.normalNode.winNum1._node.setString(pl.winall + "");
            uibind.normalNode.winNum1._node.ignoreContentAdaptWithSize(true);

        }
        else {
            uibind.normalNode.winNum1._node.visible= false;
            uibind.normalNode.winNum2._node.visible =true;
            uibind.normalNode.winNum2._node.setString(Math.abs(pl.winall) + "");
            uibind.normalNode.winNum2._node.ignoreContentAdaptWithSize(true);
        }
    }
    AddFangKaIcon(sData, _fangkaNode, tData, pl, MaxWinAll, MaxWinPlayer,  MaxloseAll, MaxlosePlayer, cc.p(-115, 385));

    node.getChildByName("fangzhu").visible = tData.owner == pl.info.uid;

    var maxPlayer = parseInt(MjClient.data.sData.tData.maxPlayer);
    var head2 = node.getParent().getChildByName("head2");
    var head3 = node.getParent().getChildByName("head3");
    cc.log("=============game over off idx  aaaa =  " + off);


    if (head2 && head3)
    {
        var size = (head3.x - head2.x) * (4 - maxPlayer) / (maxPlayer + 1);
        node.x += size * (off + 1);
    }

    if (pl.isNeedFanBei) {
        var yoff = 15;
        uibind.winNode.winNum._node.y += yoff;
        uibind.lastNode._node.y += yoff;
        node.getChildByName("line_hua_0").y += yoff;
        uibind.normalNode.winNum1._node.y += yoff;
        uibind.normalNode.winNum2._node.y += yoff;

        var fanbeiFormula = node.getChildByName("fanbeiFormula");
        fanbeiFormula.setVisible(true);
        fanbeiFormula.setString("(" + Math.floor(pl.winall/2*10)/10 + "x2)");
        fanbeiFormula.ignoreContentAdaptWithSize(true);
        var bWin = (MaxWinAll !=0 && MaxWinAll == pl.winall);
        fanbeiFormula.setColor(bWin? cc.color(0xff,0xfe,0xd6):cc.color(0xd4,0xfe,0xff));
        fanbeiFormula.enableOutline(bWin? cc.color(0xb2,0x43,0x3e):cc.color(0x15,0x5c,0xa8), 1);
    }

}
//沅江大结算
function SetGameOverLayer_YJ(node,off)
{
    if(!node) return;
    var sData=MjClient.data.sData;
    var tData=sData.tData;
    var pl=MjClient.getPlayerByIndex(off);
    node.setVisible(false);
    if(!pl)
    {
        return;
    }
    node.setVisible(true);
    var uidSelf = SelfUid();
    var MaxWinAll=0;
    var MaxDianPao=0;
    var bPaoWang = false;
    var MaxlosePlayer = null;
    var MaxWinPlayer = null;
    var MaxloseAll = 999999999;

    //计算所有人数据
    for (var uid in sData.players) {
        var pi = sData.players[uid];
        if (pi) {
            if (MaxWinAll < pi.winall) {
                MaxWinAll = pi.winall;
                MaxWinPlayer = uid;

            }else if (MaxWinAll == pi.winall) {
                if (parseInt(uid) < parseInt(MaxWinPlayer)) {
                    MaxWinAll = pi.winall;
                    MaxWinPlayer = uid;
                }
            }
            if (pi.winall < MaxloseAll) {
                MaxloseAll = pi.winall;
                MaxlosePlayer = uid;
            }else if (pi.winall == MaxloseAll) {
                if (parseInt(uid) < parseInt(MaxlosePlayer)) {
                    MaxloseAll = pi.winall;
                    MaxlosePlayer = uid;
                }
            }
        }
    }

    //最大点炮数
    for (var uid in sData.players) {
        var pi = sData.players[uid];
        if(pi)
        {
            MaxDianPao = MaxDianPao>pi.dianpaoTotal?MaxDianPao:pi.dianpaoTotal;
        }
    }


    //计算炮王
    var _paowangArray = [];
    var _paoScore = 9999;
    for (var uid in sData.players) {
        var pi = sData.players[uid];
        if(pi)
        {
            if(MaxDianPao == pi.dianpaoTotal)
            {
                if(pi.winall <= _paoScore)
                {
                    _paoScore = pi.winall;
                    //_paowangArray.push(pi.info.uid);
                }
            }
        }
    }

    //存点炮王的数组
    for (var uid in sData.players) {
        var pi = sData.players[uid];
        if(pi)
        {
            if(MaxDianPao == pi.dianpaoTotal)
            {
                if(pi.winall <= _paoScore)
                {
                    _paowangArray.push(pi.info.uid);
                }
            }
        }
    }

    cc.log("===================_paowangArray =44444 " + JSON.stringify(_paowangArray));

    //是否是炮王
    if(_paowangArray.indexOf(pl.info.uid)>=0)
    {
        bPaoWang = true;
    }

    //根据输赢设置背景底板颜色
    function setPlayerBg()
    {
        var _bgNode = node.getChildByName("bg");
        var _name = node.getChildByName("name");
        var _id = node.getChildByName("id");

        if(MaxWinAll !=0 && MaxWinAll == pl.winall )//大赢家
        {
            _bgNode.loadTexture("gameOver/pjjs_9.png");
        }
    }



    var uibind={
        name:{
            _run: function() {
                this.setFontName("Arial");
                this.ignoreContentAdaptWithSize(true);
            },
            _text: function() {
                return getNewName(unescape(pl.info.nickname ) + "");
            }
        },
        id: {
            _run:function()
            {
                this.ignoreContentAdaptWithSize(true);
            },
            _text: function () {
                return "ID:" + pl.info.uid.toString();
            }
        },
        winNode:{
            winNum:{
            },
            bigWinner:{
                _visible : false
            }
        },
        lastNode:{
            winNum1:{},
            winNum2:{},
        },
        normalNode:{
            winNum1:{},
            winNum2:{},
        },
        statistc:{
            _run:function() {
                if (MjClient.gameType == MjClient.GAME_TYPE.YUE_YANG_YI_JIAO_LAI_YOU ||
                    MjClient.gameType == MjClient.GAME_TYPE.HU_BEI_YI_JIAO_LAI_YOU) {
                    this.visible = false;
                }
                else {
                    this.visible = true;
                }
            },
            item0:{
                _run:function()
                {
                    this.ignoreContentAdaptWithSize(true);
                },
                _text: function () {
                    console.log("=====doomsky say:pl.zimoTotal======", pl.zimoTotal);
                    if(pl.roomStatisticsDesc && typeof pl.roomStatisticsDesc[0] == 'string') return pl.roomStatisticsDesc[0] + "";

                    if (MjClient.gameType == MjClient.GAME_TYPE.MJ_ZHUO_XIA_ZI)
                    {
                        return "大胡自摸";
                    }
                    else{
                        return "自摸次数";
                    }
                },
                Text:{
                    _text: function () {
                        if (pl.roomStatisticsDesc && typeof pl.roomStatisticsDesc[0] == 'string') {
                            return pl.roomStatistics[0] + "";
                        }
                        if (MjClient.gameType == MjClient.GAME_TYPE.MJ_ZHUO_XIA_ZI)
                        {
                            return pl.dahuzimoTotal > 0 ? pl.dahuzimoTotal+ "": "0";
                        }
                        return pl.zimoTotal > 0 ? pl.zimoTotal + "" : "0";
                    },
                    _run:function() {
                        var childTex = this.getParent().getChildByName("Text_0");
                        childTex.ignoreContentAdaptWithSize(true);
                        childTex.setString(this.getString());
                        if (this.getParent().getString() == "") {
                            this.visible = false;
                            childTex.visible = false;
                        }
                        if(MaxWinAll != 0 && MaxWinAll == pl.winall )//大赢家
                        {
                            this.visible = false;
                            childTex.visible = true;
                        }
                        else {
                            this.visible = true;
                            childTex.visible = false;
                        }
                        this.ignoreContentAdaptWithSize(true);
                    },
                },
            },

            item1:{
                _run:function()
                {
                    this.ignoreContentAdaptWithSize(true);
                },
                _text: function () {
                    if(pl.roomStatisticsDesc && typeof pl.roomStatisticsDesc[1] == 'string') return pl.roomStatisticsDesc[1] + "";

                    if (MjClient.gameType == MjClient.GAME_TYPE.MJ_ZHUO_XIA_ZI)
                    {
                        return "小胡自摸";
                    }
                    else{
                        return "点炮次数";
                    }

                },
                Text:{
                    _text: function () {
                        if (pl.roomStatisticsDesc && typeof pl.roomStatisticsDesc[1] == 'string') {
                            return pl.roomStatistics[1] + "";
                        }
                        if (MjClient.gameType == MjClient.GAME_TYPE.MJ_ZHUO_XIA_ZI)
                        {
                            return pl.xiaohuzimoTotal > 0 ? pl.xiaohuzimoTotal+ "": "0";
                        }
                        return pl.dianpaoTotal > 0 ? pl.dianpaoTotal + "" : "0";
                    },
                    _run:function() {
                        var childTex = this.getParent().getChildByName("Text_0");
                        childTex.ignoreContentAdaptWithSize(true);
                        childTex.setString(this.getString());
                        if (this.getParent().getString() == "") {
                            this.visible = false;
                            childTex.visible = false;
                        }
                        if(MaxWinAll != 0 && MaxWinAll == pl.winall )//大赢家
                        {
                            this.visible = false;
                            childTex.visible = true;
                        }
                        else {
                            this.visible = true;
                            childTex.visible = false;
                        }
                        this.ignoreContentAdaptWithSize(true);
                    },
                },
            },
            item2:{
                _run:function()
                {
                    this.ignoreContentAdaptWithSize(true);
                },
                _text: function () {
                    if(pl.roomStatisticsDesc && typeof pl.roomStatisticsDesc[2] == 'string') return pl.roomStatisticsDesc[2] + "";
                    if (MjClient.gameType == MjClient.GAME_TYPE.TONG_HUA)
                        return "接炮次数";
                    else if (MjClient.gameType == MjClient.GAME_TYPE.MJ_ZHUO_XIA_ZI)
                    {
                        return "接炮次数";
                    }
                    else
                        return "暗杠次数";
                },
                Text:{
                    _text: function () {
                        if (pl.roomStatisticsDesc && typeof pl.roomStatisticsDesc[2] == 'string') {
                            return pl.roomStatistics[2] + "";
                        }

                        if (MjClient.gameType == MjClient.GAME_TYPE.MJ_ZHUO_XIA_ZI)
                        {
                            return pl.jiepaoTotal > 0 ? pl.jiepaoTotal+ "": "0";
                        }

                        if (MjClient.gameType == MjClient.GAME_TYPE.TONG_HUA)
                            return pl.jiepaoTotal > 0 ? pl.jiepaoTotal + "" : "0";
                        else
                            return pl.angangTotal > 0 ? pl.angangTotal + "" : "0";
                    },
                    _run:function() {
                        var childTex = this.getParent().getChildByName("Text_0");
                        childTex.ignoreContentAdaptWithSize(true);
                        childTex.setString(this.getString());
                        if (this.getParent().getString() == "") {
                            this.visible = false;
                            childTex.visible = false;
                        }
                        if(MaxWinAll != 0 && MaxWinAll == pl.winall )//大赢家
                        {
                            this.visible = false;
                            childTex.visible = true;
                        }
                        else {
                            this.visible = true;
                            childTex.visible = false;
                        }
                        this.ignoreContentAdaptWithSize(true);
                    },
                },
            },
            item3:{
                _run:function()
                {
                    this.ignoreContentAdaptWithSize(true);
                },
                _text: function () {
                    if(pl.roomStatisticsDesc && typeof pl.roomStatisticsDesc[3] == 'string') return pl.roomStatisticsDesc[3] + "";
                    console.log("=====doomsky say:pl.angangTotal======", pl.angangTotal);
                    if (MjClient.gameType == MjClient.GAME_TYPE.TONG_HUA)
                        return "暗蛋次数";
                    else if (MjClient.gameType == MjClient.GAME_TYPE.MJ_ZHUO_XIA_ZI)
                    {
                        return "点炮次数";
                    }
                    else
                        return "明杠次数";
                },
                Text:{
                    _text: function () {
                        if (pl.roomStatisticsDesc && typeof pl.roomStatisticsDesc[3] == 'string') {
                            return pl.roomStatistics[3] + "";
                        }

                        if (MjClient.gameType == MjClient.GAME_TYPE.MJ_ZHUO_XIA_ZI)
                        {
                            return pl.dianpaoTotal > 0 ? pl.dianpaoTotal+ "": "0";
                        }

                        if (MjClient.gameType == MjClient.GAME_TYPE.TONG_HUA)
                            return pl.angangTotal > 0 ? pl.angangTotal + "" : "0";
                        else
                            return pl.minggangTotal > 0 ? pl.minggangTotal + "" : "0";
                    },
                    _run:function() {
                        var childTex = this.getParent().getChildByName("Text_0");
                        childTex.ignoreContentAdaptWithSize(true);
                        childTex.setString(this.getString());
                        if (this.getParent().getString() == "") {
                            this.visible = false;
                            childTex.visible = false;
                        }
                        if(MaxWinAll != 0 && MaxWinAll == pl.winall )//大赢家
                        {
                            this.visible = false;
                            childTex.visible = true;
                        }
                        else {
                            this.visible = true;
                            childTex.visible = false;
                        }
                        this.ignoreContentAdaptWithSize(true);
                    },
                },
            },
            item4:{
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                },
                _text: function () {
                    if(pl.roomStatisticsDesc && typeof pl.roomStatisticsDesc[4] == 'string') return pl.roomStatisticsDesc[4] + "";
                    console.log("=====doomsky say:pl.minggangTotal======", pl.minggangTotal);
                    if (MjClient.gameType == MjClient.GAME_TYPE.TONG_HUA)
                        return "明蛋次数";
                    else if(MjClient.gameType == MjClient.GAME_TYPE.TY_ZHUANZHUAN)
                        return "接炮次数";
                    else
                        return "";
                    //return "明杠次数          " + (pl.minggangTotal  > 0? pl.minggangTotal +"":"0" );
                },
                Text:{
                    _text: function () {
                        if (pl.roomStatisticsDesc && typeof pl.roomStatisticsDesc[4] == 'string') {
                            return pl.roomStatistics[4] + "";
                        }
                        if (MjClient.gameType == MjClient.GAME_TYPE.TONG_HUA)
                            return pl.minggangTotal > 0 ? pl.minggangTotal + "" : "0";
                        if(MjClient.gameType == MjClient.GAME_TYPE.TY_ZHUANZHUAN){
                            return pl.jiepaoTotal > 0 ? pl.jiepaoTotal + "" : "0";
                        }
                    },
                    _run:function() {
                        var childTex = this.getParent().getChildByName("Text_0");
                        childTex.ignoreContentAdaptWithSize(true);
                        childTex.setString(this.getString());
                        if (this.getParent().getString() == "") {
                            this.visible = false;
                            childTex.visible = false;
                        }
                        if(MaxWinAll != 0 && MaxWinAll == pl.winall )//大赢家
                        {
                            this.visible = false;
                            childTex.visible = true;
                        }
                        else {
                            this.visible = true;
                            childTex.visible = false;
                        }
                        this.ignoreContentAdaptWithSize(true);
                    },
                },
            },
            item5:{
                _run:function()
                {
                    this.ignoreContentAdaptWithSize(true);
                    if(pl.roomStatisticsDesc && typeof pl.roomStatisticsDesc[5] == 'string') this.visible = true;
                },
                _text: function () {
                    if(pl.roomStatisticsDesc && typeof pl.roomStatisticsDesc[5] == 'string') return pl.roomStatisticsDesc[5] + "";

                    //return "旋风杠次数：" +  (pl.xuanfenggangTotal  > 0? pl.xuanfenggangTotal +"":"0" );
                    return "";
                },
                Text:{
                    _text: function () {
                        if (pl.roomStatisticsDesc && typeof pl.roomStatisticsDesc[5] == 'string') {
                            return pl.roomStatistics[5] + "";
                        }
                    },
                    _run:function() {
                        var childTex = this.getParent().getChildByName("Text_0");
                        childTex.ignoreContentAdaptWithSize(true);
                        childTex.setString(this.getString());
                        if (this.getParent().getString() == "") {
                            this.visible = false;
                            childTex.visible = false;
                        }
                        if(MaxWinAll != 0 && MaxWinAll == pl.winall )//大赢家
                        {
                            this.visible = false;
                            childTex.visible = true;
                        }
                        else {
                            this.visible = true;
                            childTex.visible = false;
                        }
                        this.ignoreContentAdaptWithSize(true);
                    },
                },
            },
        },
        listView:{
            _run:function(){

                this.visible = true;
                this.setScrollBarEnabled(false);
                var itemModel = this.children[0];
                this.setItemModel(itemModel);
                this.removeAllChildren();
                var tableMsg = pl.countHu;
                if(!tableMsg || Object.keys(tableMsg).length <= 0)
                {
                    this.visible = false;
                }

                var listView = this;
                cc.log("tableMsg    -------------  ",JSON.stringify(tableMsg));

                for(var i in tableMsg){
                    listView.pushBackDefaultItem();
                    var children = listView.children;
                    var insertItem = children[children.length-1];

                    insertItem.getChildByName("title").setString(i);
                    var scoreLabel = insertItem.getChildByName("score");
                    scoreLabel.ignoreContentAdaptWithSize(true);
                    if(tableMsg[i])
                    {
                        scoreLabel.setString(tableMsg[i]);
                    }
                    else {
                        scoreLabel.setString("0");
                    }
                    if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) {
                        if (Number(scoreLabel.getString()) > 0) {
                            scoreLabel.setColor(cc.color("#D3260E"));
                        }
                        else {
                            scoreLabel.setColor(cc.color("#00824C"));
                        }
                    }
                }
            }
        },
    }

    setUserOfflineWinGamePanel(node,pl);

    // 显示玩家头像
    var head = node.getChildByName("head");
    CircularCuttingHeadImg(head, pl);

    BindUiAndLogic(node,uibind);

    var numValue = Math.abs(pl.winall) + "";
    var nodeParent = node.getParent();
    var _share = nodeParent.getChildByName("share");
    var _shine = _share.getChildByName("img_shine");
    var _point = _share.getChildByName("img_point");
    var _txt = _share.getChildByName("img_txt");


    setPlayerBg();

    var _fangkaNode;
    //最高得分
    if (MaxWinAll !=0 && MaxWinAll == pl.winall ) {
        uibind.normalNode._node.visible = false;
        uibind.lastNode._node.visible =false;
        uibind.winNode._node.visible = true;
        uibind.winNode.bigWinner._node.visible = true;
        uibind.winNode.winNum._node.setString(pl.winall + "");
        uibind.winNode.winNum._node.ignoreContentAdaptWithSize(true);
        var act_Func = function() {
            var a = cc.scaleTo(0.5, 1.0);
            var aa = cc.fadeIn(0.5);
            var a1 = cc.scaleTo(1.0, 4);
            var a2 = cc.fadeOut(1.0);
            var act_2 = cc.rotateBy(0.8, 30);
            var act_3 = cc.rotateBy(0.8, -30);
            var a3 =  cc.callFunc(function() {
                _shine.setScale(1);
            }.bind(_shine));
            _shine.runAction(cc.sequence(cc.spawn(a,aa), cc.spawn(a1,a2),a3,cc.delayTime(0.1)).repeatForever());
            _point.runAction(cc.sequence(act_2, act_3).repeatForever());

        }
        var clubInfoTable = getClubInfoInTable();
        if (clubInfoTable && pl.info.uid == SelfUid() && MjClient.getAppType() != MjClient.APP_TYPE.QXYYQP && MjClient.getAppType() != MjClient.APP_TYPE.HUBEIMJ && MjClient.getAppType() != MjClient.APP_TYPE.YLHUNANMJ) {
            _shine.setVisible(true);
            _point.setVisible(true);
            _txt.setVisible(true);
            act_Func();
        }

        _fangkaNode = uibind.winNode._node;
    }//点炮最多
    else if( MaxDianPao != 0 &&  bPaoWang){
        uibind.winNode._node.visible = false;
        uibind.normalNode._node.visible = false;
        uibind.lastNode._node.visible =true;
        _fangkaNode = uibind.lastNode._node;
        if( pl.winall >=0 ){
            uibind.lastNode.winNum1._node.visible = true;
            uibind.lastNode.winNum2._node.visible = false;
            uibind.lastNode.winNum1._node.setString(pl.winall + "");
            uibind.lastNode.winNum1._node.ignoreContentAdaptWithSize(true);
        }
        else{
            uibind.lastNode.winNum1._node.visible = false;
            uibind.lastNode.winNum2._node.visible = true;
            uibind.lastNode.winNum2._node.setString(Math.abs(pl.winall) + "");
            uibind.lastNode.winNum2._node.ignoreContentAdaptWithSize(true);
        }

    }
    else{
        uibind.winNode._node.visible = false;
        uibind.lastNode._node.visible =false;
        uibind.normalNode._node.visible = true;
        _fangkaNode = uibind.normalNode._node;
        if( pl.winall >= 0 ){
            uibind.normalNode.winNum2._node.visible =false;
            uibind.normalNode.winNum1._node.visible= true;
            uibind.normalNode.winNum1._node.setString(pl.winall + "");
            uibind.normalNode.winNum1._node.ignoreContentAdaptWithSize(true);

        }
        else {
            uibind.normalNode.winNum1._node.visible= false;
            uibind.normalNode.winNum2._node.visible =true;
            uibind.normalNode.winNum2._node.setString(Math.abs(pl.winall) + "");
            uibind.normalNode.winNum2._node.ignoreContentAdaptWithSize(true);
        }
    }

    AddFangKaIcon(sData, _fangkaNode, tData, pl, MaxWinAll, MaxWinPlayer,  MaxloseAll, MaxlosePlayer, cc.p(-115, 385));

    node.getChildByName("fangzhu").visible = tData.owner == pl.info.uid;

    var maxPlayer = parseInt(MjClient.data.sData.tData.maxPlayer);
    var head2 = node.getParent().getChildByName("head2");
    var head3 = node.getParent().getChildByName("head3");
    cc.log("=============game over off idx  rrrr =  " + off);


    if (head2 && head3)
    {
        var size = (head3.x - head2.x) * (4 - maxPlayer) / (maxPlayer + 1);
        node.x += size * (off + 1);
    }

}

//麻将大结算界面(NEW)——临汾app
function SetGameOverLayer_majiang_linfenAPP(node,off)
{
    var sData=MjClient.data.sData;
    var tData=sData.tData;
    var pl=MjClient.getPlayerByIndex(off);
    node.setVisible(false);
    if(!pl)
    {
        return;
    }
    node.setVisible(true);
    var uidSelf = SelfUid();
    var MaxWinAll=0;
    var MaxDianPao=0;
    var bPaoWang = false;

    //计算所有人数据
    for (var uid in sData.players) {
        var pi = sData.players[uid];
        if(pi)
        {
            MaxWinAll = MaxWinAll>pi.winall?MaxWinAll:pi.winall;
        }
    }

    //最大点炮数
    for (var uid in sData.players) {
        var pi = sData.players[uid];
        if(pi)
        {
            MaxDianPao = MaxDianPao>pi.dianpaoTotal?MaxDianPao:pi.dianpaoTotal;
        }
    }


    //计算炮王
    var _paowangArray = [];
    var _paoScore = 9999;
    for (var uid in sData.players) {
        var pi = sData.players[uid];
        if(pi)
        {
            if(MaxDianPao == pi.dianpaoTotal)
            {
                if(pi.winall <= _paoScore)
                {
                    _paoScore = pi.winall;
                    //_paowangArray.push(pi.info.uid);
                }
            }
        }
    }

    //存点炮王的数组
    for (var uid in sData.players) {
        var pi = sData.players[uid];
        if(pi)
        {
            if(MaxDianPao == pi.dianpaoTotal)
            {
                if(pi.winall <= _paoScore)
                {
                    _paowangArray.push(pi.info.uid);
                }
            }
        }
    }

    cc.log("===================_paowangArray =55555 " + JSON.stringify(_paowangArray));

    //是否是炮王
    if(_paowangArray.indexOf(pl.info.uid)>=0)
    {
        bPaoWang = true;
    }

    // text += "-" + tData.maxPlayer + "人\n";
    // var roundNumPre = typeof(tData.roundNumPre) != "undefined" ? tData.roundNumPre : tData.roundNum;

    //输赢统计
    var winCount  = 0;
    var winScore = 0;
    var loseCount = 0;
    var loseScore = 0;
    var pingCount = 0;

    var leftCount = tData.roundNumPre;//tData.roundAll - (tData.roundAll - tData.roundNumPre + 1);
    if(cc.isUndefined(tData.roundNumPre))
    {
        leftCount = tData.roundNum;
    }
    else {
        if(tData.roundNum <= 0 && cc.isUndefined(tData.roundNumPre)) {
            leftCount = 0;
        }
    }
    if(leftCount <= 0) leftCount = 0;


    var tableMsg = pl.roomStatistics;
    if(!tableMsg)
    {
        tableMsg = [0,0,0,0,0];
        //return MjClient.showToast("当前没有数据");
    }
    cc.log("tData.roundNumPre = " + tData.roundAll);
    cc.log("tData.roundNumPre = " + tData.roundNum);
    cc.log("tData.roundNumPre = " + tData.roundNumPre);
    cc.log("leftCount = " + leftCount);

    for(var i = 0;i < tableMsg.length;i++)
    {
        if(tableMsg[i] > 0 )
        {
            winCount++;
            winScore += tableMsg[i];
        }
        else if(tableMsg[i] < 0 )
        {
            loseCount++;
            loseScore += tableMsg[i];
        }
        else if(tableMsg[i] == 0 )
        {
            pingCount++;
        }
    }


    winScore  = revise(winScore);
    loseScore = revise(loseScore);
    pl.winall = revise(pl.winall);



    var uibind={
        name:{
            _run: function() {
                this.setFontName("Arial");
                this.ignoreContentAdaptWithSize(true);
            },
            _text: function() {
                return getNewName(unescape(pl.info.nickname ) + "");
            }
        },
        id: {
            _run:function()
            {
                this.ignoreContentAdaptWithSize(true);
            },
            _text: function () {
                return "ID:" + pl.info.uid.toString();
            }
        },
        winNode:{
            winNum:{
            },
            bigWinner:{
                _visible : false
            }
        },
        lastNode:{
            winNum1:{},
            winNum2:{},
        },
        normalNode:{
            winNum1:{},
            winNum2:{},
        },
        statistc:{
            item0:{
                _run:function()
                {
                    if(MaxWinAll !=0 && MaxWinAll == pl.winall )//大赢家
                    {
                        //this.setColor(cc.color(221,78,0));
                    }
                    else if(pl.winall < 0)//输家
                    {
                        //this.setColor(cc.color(104,104,104));
                    }

                    this.ignoreContentAdaptWithSize(true);
                    this.getChildByName("text").visible = true;
                    this.getChildByName("text").setString("" + winScore);
                    this.getChildByName("text").ignoreContentAdaptWithSize(true);
                },
                _text: function () {
                    //console.log("=====doomsky say:pl.zimoTotal======", pl.zimoTotal);
                    return "赢" + winCount + "局";
                }
            },

            item1:{
                _run:function()
                {
                    if(MaxWinAll !=0 && MaxWinAll == pl.winall )//大赢家
                    {
                        //this.setColor(cc.color(221,78,0));
                    }
                    else if(pl.winall < 0)//输家
                    {
                        //this.setColor(cc.color(104,104,104));
                    }
                    this.ignoreContentAdaptWithSize(true);
                    this.getChildByName("text").visible = true;
                    this.getChildByName("text").setString("" + loseScore);
                    this.getChildByName("text").ignoreContentAdaptWithSize(true);
                },
                _text: function () {
                    return "输" + loseCount + "局";
                }
            },
            item2:{
                _run:function()
                {
                    if(MaxWinAll !=0 && MaxWinAll == pl.winall )//大赢家
                    {
                        //this.setColor(cc.color(221,78,0));
                    }
                    else if(pl.winall < 0)//输家
                    {
                        //this.setColor(cc.color(104,104,104));
                    }
                    this.ignoreContentAdaptWithSize(true);
                    this.getChildByName("text").visible = true;
                    this.getChildByName("text").setString("" + 0);
                    this.getChildByName("text").ignoreContentAdaptWithSize(true);
                },
                _text: function () {
                    return "平" + pingCount + "局";
                }
            },
            item3:{
                _run:function()
                {
                    if(MaxWinAll !=0 && MaxWinAll == pl.winall )//大赢家
                    {
                        //this.setColor(cc.color(221,78,0));
                    }
                    else if(pl.winall < 0)//输家
                    {
                        //this.setColor(cc.color(104,104,104));
                    }
                    this.ignoreContentAdaptWithSize(true);
                    this.getChildByName("text").visible = true;
                    this.getChildByName("text").setString("" + 0);
                    this.getChildByName("text").ignoreContentAdaptWithSize(true);
                },
                _text: function () {
                    return "未完成" + leftCount + "局";
                }
            },
            item4:{
                _text: function () {
                    return "";
                }
            },
            item5:{
                _text: function () {
                    //return "旋风杠次数：" +  (pl.xuanfenggangTotal  > 0? pl.xuanfenggangTotal +"":"0" );
                    return "";
                }
            },
        },
    }

    // if(MjClient.getAppType() ==  MjClient.APP_TYPE.QXJSMJ ||
    //     MjClient.getAppType() ==  MjClient.APP_TYPE.QXYYQP ||
    //     MjClient.getAppType() ==  MjClient.APP_TYPE.QXHAIANMJ)
    // {
    //     setUserOfflineWinGamePanel(node,pl);
    // }
    setUserOfflineWinGamePanel(node,pl);

    var wxNode = node.getChildByName("head");
    addWxHeadToEndUI(wxNode,off);
    BindUiAndLogic(node,uibind);

    var numValue = Math.abs(pl.winall) + "";
    var nodeParent = node.getParent();
    var _share = nodeParent.getChildByName("share");
    var _shine = _share.getChildByName("img_shine");
    var _point = _share.getChildByName("img_point");
    var _txt = _share.getChildByName("img_txt");


    if(MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ
        || isJinZhongAPPType()
        || MjClient.getAppType() == MjClient.APP_TYPE.TXLVLIANGMJ
        || MjClient.getAppType() == MjClient.APP_TYPE.TXLINFENMJ)
    {
        var _bgNode = node.getChildByName("bg");
        var _name = node.getChildByName("name");
        var _id = node.getChildByName("id");

        if(MaxWinAll !=0 && MaxWinAll == pl.winall )//大赢家
        {
            _bgNode.loadTexture("gameOver/gerenxinxi_2.png");
            // _name.setColor(cc.color(221,78,0));
            // _id.setColor(cc.color(221,78,0));
        }
        else if(pl.winall < 0)//输家
        {
            _bgNode.loadTexture("gameOver/gerenxinxi_3.png");

            // var _textIcon1 = node.getChildByName("winNode").getChildByName("allscore");
            // var _textIcon2 = node.getChildByName("lastNode").getChildByName("allscore");
            // var _textIcon3 = node.getChildByName("normalNode").getChildByName("allscore");
            // _textIcon1.loadTexture("gameOver/zongchengji_1.png");
            // _textIcon2.loadTexture("gameOver/zongchengji_1.png");
            // _textIcon3.loadTexture("gameOver/zongchengji_1.png");
            // _name.setColor(cc.color(104,104,104));
            // _id.setColor(cc.color(104,104,104));
        }
    }


    cc.log("cccccccccccccccccc,", pl.winall)
    //最高得分
    if (MaxWinAll !=0 && MaxWinAll == pl.winall ) {
        cc.log("0000000000000000000")
        uibind.normalNode._node.visible = false;
        uibind.lastNode._node.visible =false;
        uibind.winNode._node.visible = true;
        uibind.winNode.bigWinner._node.visible = true;
        uibind.winNode.winNum._node.setString(pl.winall + "");
        uibind.winNode.winNum._node.ignoreContentAdaptWithSize(true);
        var act_Func = function() {
            var a = cc.scaleTo(0.5, 1.0);
            var aa = cc.fadeIn(0.5);
            var a1 = cc.scaleTo(1.0, 4);
            var a2 = cc.fadeOut(1.0);
            var act_2 = cc.rotateBy(0.8, 30);
            var act_3 = cc.rotateBy(0.8, -30);
            var a3 =  cc.callFunc(function() {
                _shine.setScale(1);
            }.bind(_shine));
            _shine.runAction(cc.sequence(cc.spawn(a,aa), cc.spawn(a1,a2),a3,cc.delayTime(0.1)).repeatForever());
            _point.runAction(cc.sequence(act_2, act_3).repeatForever());

        }
        var clubInfoTable = getClubInfoInTable();
        if (clubInfoTable && pl.info.uid == SelfUid() && MjClient.getAppType() != MjClient.APP_TYPE.QXYYQP && MjClient.getAppType() != MjClient.APP_TYPE.HUBEIMJ && MjClient.getAppType() != MjClient.APP_TYPE.YLHUNANMJ) {
            _shine.setVisible(true);
            _point.setVisible(true);
            _txt.setVisible(true);
            act_Func();
        }
    }//点炮最多
    else if( MaxDianPao != 0 &&  bPaoWang){
        uibind.winNode._node.visible = false;
        uibind.normalNode._node.visible = false;
        uibind.lastNode._node.visible =true;
        if( pl.winall >=0 ){
            uibind.lastNode.winNum1._node.visible = true;
            uibind.lastNode.winNum2._node.visible = false;
            uibind.lastNode.winNum1._node.setString(pl.winall + "");
            uibind.lastNode.winNum1._node.ignoreContentAdaptWithSize(true);
        }
        else{
            uibind.lastNode.winNum1._node.visible = false;
            uibind.lastNode.winNum2._node.visible = true;
            uibind.lastNode.winNum2._node.setString(Math.abs(pl.winall) + "");
            uibind.lastNode.winNum2._node.ignoreContentAdaptWithSize(true);
        }
    }
    else{
        uibind.winNode._node.visible = false;
        uibind.lastNode._node.visible = false;
        uibind.normalNode._node.visible = true;
        if( pl.winall >= 0 ){
            uibind.normalNode.winNum2._node.visible =false;
            uibind.normalNode.winNum1._node.visible= true;
            uibind.normalNode.winNum1._node.setString(pl.winall + "");
            uibind.normalNode.winNum1._node.ignoreContentAdaptWithSize(true);

        }
        else {
            uibind.normalNode.winNum1._node.visible= false;
            uibind.normalNode.winNum2._node.visible =true;
            uibind.normalNode.winNum2._node.setString(Math.abs(pl.winall) + "");
            uibind.normalNode.winNum2._node.ignoreContentAdaptWithSize(true);
        }
    }

    node.getChildByName("fangzhu").visible = tData.owner == pl.info.uid;

    var maxPlayer = parseInt(MjClient.data.sData.tData.maxPlayer);
    var head2 = node.getParent().getChildByName("head2");
    var head3 = node.getParent().getChildByName("head3");
    if (head2 && head3)
    {
        var size = (head3.x - head2.x) * (4 - maxPlayer) / (maxPlayer + 1);
        node.x += size * (off + 1);
    }
}

//设置单个玩家的详细信息--牛十别
function SetGameOverLayer_niushibie(node,off)
{
    if(!node) return;
    var sData=MjClient.data.sData;
    var tData=sData.tData;
    var pl=MjClient.getPlayerByIndex(off);

    node.setVisible(false);
    if(!pl)
    {
        return;
    }
    node.setVisible(true);
    var MaxWinAll=0;
    var MaxlosePlayer = null;
    var MaxWinPlayer = null;
    var MaxloseAll = 999999999;

    //计算所有人数据
    for (var uid in sData.players) {
        var pi = sData.players[uid];
        if (pi) {
            if (MaxWinAll < pi.winall) {
                MaxWinAll = pi.winall;
                MaxWinPlayer = uid;

            }else if (MaxWinAll == pi.winall) {
                if (parseInt(uid) < parseInt(MaxWinPlayer)) {
                    MaxWinAll = pi.winall;
                    MaxWinPlayer = uid;
                }
            }
            if (pi.winall < MaxloseAll) {
                MaxloseAll = pi.winall;
                MaxlosePlayer = uid;
            }else if (pi.winall == MaxloseAll) {
                if (parseInt(uid) < parseInt(MaxlosePlayer)) {
                    MaxloseAll = pi.winall;
                    MaxlosePlayer = uid;
                }
            }
        }
    }

    var uibind={
        name:{
            _run: function() {
                this.setFontName("Arial");
                this.ignoreContentAdaptWithSize(true);
            },
            _text: function() {
                return getNewName(unescape(pl.info.nickname ) + "");
            }
        },
        id: {
            _run:function()
            {
                this.ignoreContentAdaptWithSize(true);
            },
            _text: function () {
                return "ID:" + pl.info.uid.toString();
            }
        },
        winNode:{
            winNum:{
            },
            bigWinner:{
                _visible : false
            }
        },
        lastNode:{
            winNum1:{},
            winNum2:{},
        },
        normalNode:{
            winNum1:{},
            winNum2:{},
        },
        statistc:{
            item0:{
                Text_0:{
                    _run:function()
                    {
                        this.ignoreContentAdaptWithSize(true);
                    },
                    _text: function()
                    {
                        return (pl.roomStatistics[0] > 0? pl.roomStatistics[0]+"":"0" )
                    }
                }
            },
            item1:{
                Text_0:{
                    _run:function()
                    {
                        this.ignoreContentAdaptWithSize(true);
                    },
                    _text: function()
                    {
                        return (pl.roomStatistics[1] > 0? pl.roomStatistics[1]+"":"0" )
                    }
                }
            },
            item2:{
                Text_0:{
                    _run:function()
                    {
                        this.ignoreContentAdaptWithSize(true);
                    },
                    _text: function()
                    {
                        return (pl.roomStatistics[2] > 0? pl.roomStatistics[2]+"":"0" )
                    }
                }
            },
        },
    }

    var wxNode = node.getChildByName("head");
    CircularCuttingHeadImg(wxNode, pl);
    BindUiAndLogic(node,uibind);

    uibind.normalNode._node.visible = true;
    uibind.lastNode._node.visible =false;
    uibind.winNode._node.visible = false;
    uibind.normalNode.winNum1._node.visible = pl.winall >= 0;
    uibind.normalNode.winNum2._node.visible = pl.winall < 0;
    uibind.normalNode.winNum1._node.ignoreContentAdaptWithSize (true);
    uibind.normalNode.winNum2._node.ignoreContentAdaptWithSize (true);
    uibind.normalNode.winNum1._node.setString(""+pl.winall);
    uibind.normalNode.winNum2._node.setString(""+pl.winall);

    var bg1 = node.getChildByName("bg1");
    var bg2 = node.getChildByName("bg2");
    bg1.visible = pl.winall>=0;
    bg2.visible = pl.winall<0;

    //最高得分
    var _fangkaNode;
    if (MaxWinAll !=0 && MaxWinAll == pl.winall ) {
        _fangkaNode = uibind.normalNode._node;
    }else if (MaxloseAll == pl.winall) {
        _fangkaNode = uibind.lastNode._node;
    }else{
        _fangkaNode = uibind.normalNode._node;
    }

    AddFangKaIcon(sData, _fangkaNode, tData, pl, MaxWinAll, MaxWinPlayer,  MaxloseAll, MaxlosePlayer, cc.p(-95, 330));

    node.getChildByName("fangzhu").visible = tData.owner == pl.info.uid;
}

//设置单个玩家的详细信息--打码子
function SetGameOverLayer_damazi(node,off)
{
    if(!node) return;
    var sData=MjClient.data.sData;
    var tData=sData.tData;
    var pl=MjClient.getPlayerByIndex(off);

    node.setVisible(false);
    if(!pl)
    {
        return;
    }
    node.setVisible(true);
    var MaxWinAll=0;
    var MaxlosePlayer = null;
    var MaxWinPlayer = null;
    var MaxloseAll = 999999999;

    //计算所有人数据
    for (var uid in sData.players) {
        var pi = sData.players[uid];
        if (pi) {
            if (MaxWinAll < pi.winall) {
                MaxWinAll = pi.winall;
                MaxWinPlayer = uid;

            }else if (MaxWinAll == pi.winall) {
                if (parseInt(uid) < parseInt(MaxWinPlayer)) {
                    MaxWinAll = pi.winall;
                    MaxWinPlayer = uid;
                }
            }
            if (pi.winall < MaxloseAll) {
                MaxloseAll = pi.winall;
                MaxlosePlayer = uid;
            }else if (pi.winall == MaxloseAll) {
                if (parseInt(uid) < parseInt(MaxlosePlayer)) {
                    MaxloseAll = pi.winall;
                    MaxlosePlayer = uid;
                }
            }
        }
    }

    var uibind={
        name:{
            _run: function() {
                this.ignoreContentAdaptWithSize(true);
                this.setFontName("Arial");
                this.setFontSize(this.getFontSize());
            },
            _text: function() {
                return getNewName(unescape(pl.info.nickname ) + "");
            }
        },
        id: {
            _run:function()
            {
                this.ignoreContentAdaptWithSize(true);
            },
            _text: function () {
                return "ID:" + pl.info.uid.toString();
            }
        },
        winNode:{
            winNum:{
            },
            bigWinner:{
                _visible : false
            }
        },
        lastNode:{
            winNum1:{},
            winNum2:{},
        },
        normalNode:{
            winNum1:{},
            winNum2:{},
        },
        statistc:{
            item0:{
                Text_0:{
                    _run:function()
                    {
                        this.ignoreContentAdaptWithSize(true);
                    },
                    _text: function()
                    {
                        return (pl.roomStatistics[0] > 0? pl.roomStatistics[0]+"":"0" )
                    }
                }
            },
            item1:{
                Text_0:{
                    _run:function()
                    {
                        this.ignoreContentAdaptWithSize(true);
                    },
                    _text: function()
                    {
                        return (pl.roomStatistics[1] > 0? pl.roomStatistics[1]+"":"0" )
                    }
                }
            },
            item2:{
                Text_0:{
                    _run:function()
                    {
                        this.ignoreContentAdaptWithSize(true);
                    },
                    _text: function()
                    {
                        return (pl.roomStatistics[2] > 0? pl.roomStatistics[2]+"":"0" )
                    }
                }
            },
            item3:{
                Text_0:{
                    _run:function()
                    {
                        this.ignoreContentAdaptWithSize(true);
                    },
                    _text: function()
                    {
                        return (pl.roomStatistics[3] > 0? pl.roomStatistics[3]+"":"0" )
                    }
                }
            },
        },
    }

    var wxNode = node.getChildByName("head");
    CircularCuttingHeadImg(wxNode, pl);
    BindUiAndLogic(node,uibind);

    uibind.normalNode._node.visible = true;
    uibind.lastNode._node.visible =false;
    uibind.winNode._node.visible = false;
    uibind.normalNode.winNum1._node.visible = pl.winall >= 0;
    uibind.normalNode.winNum2._node.visible = pl.winall < 0;
    uibind.normalNode.winNum1._node.ignoreContentAdaptWithSize (true);
    uibind.normalNode.winNum2._node.ignoreContentAdaptWithSize (true);
    uibind.normalNode.winNum1._node.setString(""+pl.winall);
    uibind.normalNode.winNum2._node.setString(""+pl.winall);

    var bg1 = node.getChildByName("bg1");
    var bg2 = node.getChildByName("bg2");
    bg1.visible = pl.winall>=0;
    bg2.visible = pl.winall<0;

    var _fangkaNode;
    //最高得分
    if (MaxWinAll !=0 && MaxWinAll == pl.winall ) {
        _fangkaNode = uibind.normalNode._node;

    }else if (MaxloseAll == pl.winall) {
        _fangkaNode = uibind.lastNode._node;
    }else{
        _fangkaNode = uibind.normalNode._node;
    }
    AddFangKaIcon(sData, _fangkaNode, tData, pl, MaxWinAll, MaxWinPlayer,  MaxloseAll, MaxlosePlayer, cc.p(-95, 330));
    node.getChildByName("fangzhu").visible = tData.owner == pl.info.uid;
}

//分享大结算信息
function ShareGameOverInfo()
{
    MjClient.block();
    var fileName = "wxcapture_screen.jpg"
    var ui = ccs.load(res.EndAllShare_json);
    var node = ui.node;
    MjClient.Scene.addChild(node)
    node.setZOrder(-10);
    var bg = node.getChildByName('bg');
    // bg.setScale(0.75);
    bg.setAnchorPoint(0,0);
    bg.x = 0;
    bg.y = 0;

    var itemWin = bg.getChildByName('item_win');
    var itemLose = bg.getChildByName('item_lose');
    itemWin.visible = false;
    itemLose.visible = false;

    var temp = JSON.parse(JSON.stringify(MjClient.data.sData.players));
    var shareData = []
    for(var i in temp) {
        shareData[i] = temp[i];
    }

    shareData.sort(function(a, b) {
        return b.winall - a.winall;
    })

    //计算所有人数据
    var sData=MjClient.data.sData;
    var tData=sData.tData;
    var MaxWinAll=0;
    for (var uid in sData.players) {
        var pi = sData.players[uid];
        if(pi)
        {
            MaxWinAll = MaxWinAll>pi.winall?MaxWinAll:pi.winall;
        }
    }

    var offY = 0;
    for(var i in shareData) {
        var pl = shareData[i];
        var item = null;
        var off = MjClient.data.sData.tData.uids.indexOf(pl.info.uid);

        // 排名
        var num = parseInt(i) + 1;
        if(pl.winall > 0) {
            item = itemWin.clone();
        } else {
            item = itemLose.clone();
        }
        if(pl.winall > 0 && i == 0 ) {
            var itemnum = item.getChildByName('item_num').visible = false;
        } else {
            if(pl.winall > 0) {
                item.getChildByName('item_num_1').visible = false;
            }
            var itemnum = item.getChildByName('item_num')
            itemnum.setString(num);
        }

        if(MaxWinAll !=0 && MaxWinAll == pl.winall )//大赢家
        {
            item.getChildByName("item_bg").loadTexture("gameOver/dayingjia_di.png");
        }


        // 头像
        var head = item.getChildByName("head");
        addWxHeadToEndUI(head, off);

        // uid
        var textid = item.getChildByName('player_id')
        textid.ignoreContentAdaptWithSize(true);
        textid.setString('ID:' + pl.info.uid);
        // 山西，大结算微信分享图，ID中间三位用“*”表示
        if(isJinZhongAPPType())
        {
            var id = pl.info.uid + "" || "1000000";
            var mid = id.substring(0, 2) + "***" + id.substring(5);
            textid.setString('ID:' + mid);
        }


        // 名称
        var textname = item.getChildByName('player_name')
        textname.ignoreContentAdaptWithSize(true);
        textname.setString(getNewName(unescape(pl.info.nickname)));
        textname.setFontName("Arial");
        textname.setFontSize(textname.getFontSize());

        //自摸
        var Text_zimo = item.getChildByName("Text_zimo");
        Text_zimo.ignoreContentAdaptWithSize(true);

        //点炮
        var Text_dianpao = item.getChildByName("Text_dianpao");
        Text_dianpao.ignoreContentAdaptWithSize(true);

        //暗杠
        var Text_angang = item.getChildByName("Text_angang");
        Text_angang.ignoreContentAdaptWithSize(true);

        //明杠
        var Text_minggang = item.getChildByName("Text_minggang");
        Text_minggang.ignoreContentAdaptWithSize(true);


        if(isJinZhongAPPType()
         ||MjClient.getAppType() == MjClient.APP_TYPE.TXLINFENMJ)
        {
            //输赢统计
            var winCount  = 0;
            var winScore = 0;
            var loseCount = 0;
            var loseScore = 0;
            var pingCount = 0;
            var leftCount = tData.roundNumPre;//tData.roundAll - (tData.roundAll - tData.roundNumPre + 1);
            if(cc.isUndefined(tData.roundNumPre))
            {
                leftCount = tData.roundNum;
            }
            else {
                if(tData.roundNum <= 0 && cc.isUndefined(tData.roundNumPre)) {
                    leftCount = 0;
                }
            }
            if(leftCount <= 0) leftCount = 0;
            var tableMsg = pl.roomStatistics;
            if(!tableMsg)
            {
                tableMsg = [0,0,0,0,0];
            }
            for(var i = 0;i < tableMsg.length;i++)
            {
                if(tableMsg[i] > 0 )
                {
                    winCount++;
                    winScore += tableMsg[i];
                }
                else if(tableMsg[i] < 0 )
                {
                    loseCount++;
                    loseScore += tableMsg[i];
                }
                else if(tableMsg[i] == 0 )
                 {
                    pingCount++;
                }
            }

            Text_zimo.setString("赢" + winCount + "局:"+ revise(winScore));
            Text_dianpao.setString("输" + loseCount + "局:"+  revise(loseScore));
            Text_angang.setString("平" + pingCount + "局:" + 0);
            Text_minggang.setString("未完成" + leftCount + "局:" + 0);

            if(MjClient.gameType == MjClient.GAME_TYPE.DA_TONG_ZHA_GU_ZI){
                pl=MjClient.getPlayerByIndex(off);
                Text_zimo.setString("赢" + pl.roomStatistics[0] + "局");
                Text_dianpao.setString("输" + pl.roomStatistics[1] + "局");
                Text_angang.setString("平" + pl.roomStatistics[2] + "局");
                var finishNum = pl.roomStatistics[0] + pl.roomStatistics[1] + pl.roomStatistics[2];
                var unfinishedNum = tData.roundAll - finishNum;
                Text_minggang.setString("未完成" + unfinishedNum + "局");
            }
        }
        else
        {
            Text_zimo.setString("自摸次数：" + (pl.zimoTotal > 0? pl.zimoTotal+"":"0" ));
            Text_dianpao.setString("点炮次数：" +  (pl.dianpaoTotal  > 0? pl.dianpaoTotal +"":"0" ));
            Text_angang.setString("暗杠次数：" + (pl.angangTotal   > 0? pl.angangTotal  +"":"0" ));
            Text_minggang.setString("明杠次数：" + (pl.minggangTotal  > 0? pl.minggangTotal +"":"0" ));
        }


        // 得分
        var score = item.getChildByName('score')
        var strScore = pl.winall;// .是减号  /是加号
        if(strScore < 0) {
            strScore *= -1;
            strScore = '-' +  revise(strScore);
        } else if ( strScore > 0) {
            strScore = '+' + revise(strScore);
        }
        score.setString(strScore);
        score.setSize(score.getVirtualRendererSize())   // score的size 没 刷新成 label的size 有毒

        item.visible = true;
        item.y -= offY;
        offY += 123;
        bg.addChild(item);
    }

    var sData = MjClient.data.sData;
    var tData = sData.tData;

    var room_name = bg.getChildByName('room_name')
    room_name.setString('玩法:' + GameCnName[MjClient.gameType]);
    room_name.ignoreContentAdaptWithSize(true);

    var room_id = bg.getChildByName('room_id')
    var text_id = '房号:' + tData.tableid;
    text_id += ' 局数:' + tData.roundAll;
    room_id.setString(text_id);
    room_id.ignoreContentAdaptWithSize(true);

    var room_score = bg.getChildByName('room_score')
    if(tData.areaSelectMode.difen && tData.areaSelectMode.difen > 0) {
        var text_score = '底分:';
        text_score += tData.areaSelectMode.difen;
        room_score.setString(text_score)
        room_score.ignoreContentAdaptWithSize(true);
    } else
    {
        room_score.visible = false;
    }

    var room_pay = bg.getChildByName('room_pay')
    var index_pay = tData.areaSelectMode.payWay
    var text_pay = getGameCnDesc(MjClient.gameType, 'payWay', index_pay, tData.areaSelectMode)
    room_pay.setString('资费:' + text_pay)
    room_pay.ignoreContentAdaptWithSize(true);

    var room_master = bg.getChildByName('room_master')
    var masterpl = sData.players[tData.owner];

    var clubInfoTable = getClubInfoInTable();
    //需求：海安、晋中、南通 对于俱乐部牌局，在大结算、大结算分享图中，增加显示，亲友圈ID，并显示对应的玩法名称【是会长建立玩法时设定的玩法名称】
    if (clubInfoTable && (MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ ||
        isJinZhongAPPType() ||
        MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP )) {
        room_master.setString('亲友圈ID:' + clubInfoTable.clubId+"（"+unescape(clubInfoTable.ruleName)+"）");
        room_master.ignoreContentAdaptWithSize(true);
    }
    else
    {
        if( masterpl ) {
            var mastername = masterpl.info.nickname;
            mastername = getNewName(unescape(mastername))
            room_master.setString('房主:' + mastername);
            room_master.ignoreContentAdaptWithSize(true);
        } else {
            room_master.visible = false;
        }
    }



    var room_time = bg.getChildByName("room_time");
    room_time.ignoreContentAdaptWithSize(true);
    if(MjClient.roundEndTime){
        if(!MjClient.isDismiss && sData.tData.roundNum <= 0){
            room_time.setString(MjClient.roundEndTime+" 结束");
        }else {
            room_time.setString(MjClient.roundEndTime+" 解散");
        }
    }else {
        room_time.visible = false;
    }


    // 保存成图片
    MjClient.saveNodeToImage(bg, fileName, function(pnode, savepath) {
        if(cc.sys.isObjectValid(node)) {
            node.removeFromParent();
        }
        // 分享图片到微信
        MjClient.shareImageToMultiPlatform(savepath);

        MjClient.unblock();
    });

}





//  斗地主大结算
var GameOverLayer_doudizhu = cc.Layer.extend({
    sprite:null,
    jsBind:{
        back:{
            share:{
                img_shine:{
                    _visible:false
                },
                img_txt:{
                    _visible:false
                },
                img_point:{
                    _visible:false
                },
                _event:{
                    captureScreen_OK:function(){
                        if (MjClient.endallui.capture_screen != true)
                            return;
                        MjClient.endallui.capture_screen = false;
                        var writePath = jsb.fileUtils.getWritablePath();
                        var textrueName = "wxcapture_screen.png";
                        var savepath = writePath+textrueName;
                        MjClient.shareImageToSelectedPlatform(savepath);
                        this.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(function()
                        {
                            this.setTouchEnabled(true);
                        }.bind(this))));
                        if(MjClient.Scene.getChildByName("shareCode")) MjClient.Scene.removeChildByName("shareCode");
                    }
                }
            },
        }
    },
    ctor:function () {
        this._super();
        var endallui = ccs.load(res.EndAll_doudizhu_json);
        BindUiAndLogic(endallui.node,this.jsBind);
        this.addChild(endallui.node);
        MjClient.endallui=this;

        var _block = endallui.node.getChildByName("block");
        setWgtLayout(_block,[1,1],[0.5,0.5],[0,0], true);

        var _bg = endallui.node.getChildByName("bg");
        if (_bg) {
            setWgtLayout(_bg, [1, 1], [0.5, 0.0], [0,0]);
            _bg.height += (MjClient.size.height / _bg.scaleY - _bg.height) / 2;
        }

        var isNewUi = (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ);

        /*
         changed by sking
         */
        var _back = endallui.node.getChildByName("back");
        if(isJinZhongAPPType() || MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_GZ)
        {
            if(isIPhoneX())
                setWgtLayout(_back,[0.85,0.85],[0.5,0.5],[0,0],false);
            else
                setWgtLayout(_back,[1,1],[0.5,0.5],[0,0]);
        }
        else if(MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ  || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) {
            setWgtLayout(_back,[1,1],[0.5,0.5],[0, 0]);
        }
        if (MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP && isIPhoneX()) {
            setWgtLayout(_back, [0.85,0.85],[0.5,0.5],[0,0], false);
        }
        else {
            setWgtLayout(_back,[1,1],[0.5,0.5],[0, -0.025]);
        }

        var infoMation_bg = _back.getChildByName("infoMation_bg");
        if (infoMation_bg)
        {
            infoMation_bg.ignoreContentAdaptWithSize(false); 
            infoMation_bg.setSize(cc.size(400, 60));             
        }


        //分享
        var _share =  _back.getChildByName("share");
        var sData=MjClient.data.sData;
        var tData=sData.tData;
        _share.visible = !MjClient.remoteCfg.guestLogin && !tData.matchId;


        //_share.x = 713.24;//屏蔽再来一局的时候，坐标要移动一下
        _share.addTouchEventListener(function(sender,Type){
            switch (Type)
            {
                case ccui.Widget.TOUCH_ENDED:
                    if(isJinZhongAPPType() && MjClient.gameType != MjClient.GAME_TYPE.LV_LIANG_DA_QI) { // 打七除外
                        ShareGameOverInfo();
                    } else {
                        MjClient.shareMultiPlatform(MjClient.systemConfig.sharePlatforms, function()
                        {
                            COMMON_UI.getShareCodeTexture(tData.tableInfoUrl,_back,function(){
                                cc.log("====================capture_screen=======================");
                                postEvent("capture_screen");
                                if(MjClient.endallui && cc.sys.isObjectValid(MjClient.endallui)){
                                    MjClient.endallui.capture_screen = true;
                                }
                                _share.setTouchEnabled(false);
                            });
                        });
                    }
                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Dajiesuanjiemian_Fenxiang",  {uid:SelfUid(),gameType:MjClient.gameType});
                    break;
                default :
                    break;
            }
        },this);
        var clubInfoTable = getClubInfoInTable();
        if (clubInfoTable && clubInfoTable.clubId) {
            _share.x = _share.getParent().width / 2;
        }

        // 如果是亲友圈的房间显示亲友圈图标及名称
        var image_title = _back.getChildByName("Image_title");
        var clubNode = _back.getChildByName("Image_club");
        if ((MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP 
            || MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ)
         && clubInfoTable && typeof(clubInfoTable.clubAvatar) != "undefined" && clubInfoTable.clubTitle && clubInfoTable.ruleName && clubNode != null) 
        {
            if (image_title)
                image_title.setVisible(false);

            var clubName = clubNode.getChildByName("Text_name");
            clubName.ignoreContentAdaptWithSize(true);
            clubName.setString(unescape(clubInfoTable.clubTitle) + " " + (clubInfoTable.ruleName ? "(" + GameCnName[MjClient.gameType] + ")" : ""));

            var _nameStr = unescape(clubInfoTable.ruleName);
            var _ruleName = clubName.clone();
            _ruleName.ignoreContentAdaptWithSize(true);
            _ruleName.setString(_nameStr);
            _ruleName.y = clubName.y + clubName.height/2 + _ruleName.height/2;
            _ruleName.x = clubName.x;
            clubNode.addChild(_ruleName);

            cc.loader.loadImg(clubInfoTable.clubAvatar ? clubInfoTable.clubAvatar : "png/default_headpic.png", {
                isCrossOrigin: true
            }, function(err, texture) {
                if (err || !texture || !sys.isObjectValid(clubNode))
                    return;

                var sp = new cc.Sprite(texture);
                if (!sp)
                    return;

                sp.setScale((clubNode.width - 8) / sp.width);
                sp.setPosition(cc.p(clubNode.width / 2, clubNode.height / 2));
                clubNode.addChild(sp);
            });
        }
        else if (clubInfoTable && typeof(clubInfoTable.clubAvatar) != "undefined" && clubInfoTable.clubId && clubNode != null)
        {
            if (image_title)
                image_title.setVisible(false);

            var clubName = clubNode.getChildByName("Text_name");
            clubName.ignoreContentAdaptWithSize(true);
            clubName.setString("" + unescape(clubInfoTable.clubTitle));

            var _nameStr = unescape(clubInfoTable.ruleName);
            var _ruleName = clubName.clone();
            _ruleName.ignoreContentAdaptWithSize(true);
            _ruleName.setString(_nameStr);
            _ruleName.y = clubName.y + clubName.height/2 + _ruleName.height/2;
            _ruleName.x = clubName.x;
            clubNode.addChild(_ruleName);

            cc.loader.loadImg(clubInfoTable.clubAvatar ? clubInfoTable.clubAvatar : "png/default_headpic.png", {
                isCrossOrigin: true
            }, function(err, texture) {
                if (err || !texture || !sys.isObjectValid(clubNode))
                    return;

                var sp = new cc.Sprite(texture);
                if (!sp)
                    return;

                sp.setScale((clubNode.width - 8) / sp.width);
                sp.setPosition(cc.p(clubNode.width / 2, clubNode.height / 2));
                clubNode.addChild(sp);
            });
        }
        else if (clubNode != null)
        {
            clubNode.setVisible(false);
        }

        //信息 说明
        var _infoMation =  _back.getChildByName("infoMation");
        _infoMation.visible = true;

        var _infoMation2 =  _back.getChildByName("infoMation_2");
        if (_infoMation2 == null) {
            _infoMation2 =  _back.getChildByName("infoMation_1"); // 永州工程
        }
        cc.log(" ----------- _infoMation2----------- 9999999  ",_infoMation2)
        if (_infoMation2) {
            _infoMation2.setString("")
            _infoMation2.visible = true;
            //描述结算
            var sData=MjClient.data.sData;
            var tData=sData.tData;
            cc.log(" --------isDismiss  ",MjClient.isDismiss);
            if (MjClient.isDismiss)
            {

                var id = tData.firstDel;
                var pl = sData.players[id];
                var delStr = "";
                if(pl)
                {
                    var name  =  unescape(pl.info.nickname );
                    delStr = name + pl.mjdesc[0];
                }
                else
                {
                    // 系统、会长或管理员解散房间
                    pl = getUIPlayer(0);
                    if (pl)
                        delStr = pl.mjdesc[0];
                }

                _infoMation2.setString("" + delStr) ;
            }
        }

        function _infoText(){
            var sData=MjClient.data.sData;
            var tData=sData.tData;
            var text = GameCnName[MjClient.gameType];

            if (isNewUi) {
                text += "-" + tData.maxPlayer + "人\n";
                var roundNumPre = typeof(tData.roundNumPre) != "undefined" ? tData.roundNumPre : tData.roundNum;
                text += "房号：" + tData.tableid
                if (roundNumPre && tData.roundAll - tData.roundNumPre + 1 <= tData.roundAll)
                {
                    var extraNum = tData.extraNum ? tData.extraNum:0;
                    text += " 局数：" + (tData.roundAll - tData.roundNumPre + 1 + extraNum) + "/" + tData.roundAll;
                }
                    
                text += "\n";
                if(MjClient.roundEndTime)
                    text += MjClient.roundEndTime + "";
            } else {
                var strPayWay = "";
                switch (tData.areaSelectMode.payWay)
                {
                    case 0:
                        strPayWay = ",房主付";
                        break;
                    case 1:
                        strPayWay = ",AA付";
                        break;
                    case 2:
                        strPayWay = ",大赢家付";
                        break;
                }
                text += strPayWay;

                if(tData.areaSelectMode.zhafengding != null)
                {
                    if(tData.areaSelectMode.zhafengding <= 0)
                    {
                        text +=  ",不封顶";
                    }
                    else
                    {
                        text += ","+tData.areaSelectMode.zhafengding+"炸封顶";
                    }
                }


                switch (tData.areaSelectMode.jifengding)
                {
                    case 3:
                        text += ",3级封顶";
                        break;
                    case 5:
                        text += ",5级封顶";
                        break;
                    case 0:
                        text += ",不封顶";
                        break;
                }
                if(tData.areaSelectMode.beishufengding)
                {
                    text +=  "," + tData.areaSelectMode.beishufengding+ "倍封顶 ";
                }
                text += tData.areaSelectMode.koudi? ",扣底加级" : "";
                text += tData.areaSelectMode.zhuangdanjiabei? ",庄家单打赢双倍" : "";
                text += tData.areaSelectMode.bijiaoShuangwang ? ",双王必叫" : "";
                text += tData.areaSelectMode.bijiaoSigeer ? ",4个2必叫" : "";
                text += tData.areaSelectMode.bijiaoWangshuanger ? ",王+双2必叫" : "";
                text += tData.areaSelectMode.bijiaoZhadan ? ",炸弹必叫" : "";
                text += tData.areaSelectMode.daiti ? ",带踢" : "";
                text += tData.areaSelectMode.sidaier ? ",四带二" : "";
                text += tData.areaSelectMode.yingjiaxianchu ? ",赢家先出" : "";
                text += tData.areaSelectMode.difen ? "," + tData.areaSelectMode.difen + "积分底分" : "";
                text += tData.areaSelectMode.jiabei ? ",加倍" : "";
                text += tData.areaSelectMode.sidaisi ? ",四带两对" : "";
                
                if(tData.areaSelectMode.sandai != null && typeof(tData.areaSelectMode.sandai) == "number"){
                    var str = "";
                    switch (tData.areaSelectMode.sandai) {
                        case 0:
                            str = ",三带一";
                            break; 
                        case 1:
                            str = ",三带一对";
                            break;
                        case 2:
                            str = ",三带一+三带一对";
                            break;  
                    }
                    text += str;
                }

                text += ",房间号:";
                text += tData.tableid;
                var clubInfoTable = getClubInfoInTable();
                if (clubInfoTable){
                    //需求：海安、晋中、南通 对于俱乐部牌局，在大结算、大结算分享图中，增加显示，亲友圈ID，并显示对应的玩法名称【是会长建立玩法时设定的玩法名称】
                    if(MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ ||
                        isJinZhongAPPType() ||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP ){
                        text += ",亲友圈ID:";
                        text += clubInfoTable.clubId;
                        if(clubInfoTable.ruleName){
                            text = text+"（"+unescape(clubInfoTable.ruleName)+"）";
                        }
                    }
                }
            }

            return text;
        }
        _infoMation.setString(_infoText());
        _infoMation.setFontName("Arial");
        _infoMation.setFontSize(_infoMation.getFontSize());
        // 晋中换皮
        if (!isNewUi && MjClient.getAppType() != MjClient.APP_TYPE.TXJINZHONGMJ && MjClient.getAppType() != MjClient.APP_TYPE.DQSHANXIMJ  && MjClient.getAppType() != MjClient.APP_TYPE.QXYZQP
            && MjClient.getAppType() != MjClient.APP_TYPE.QXSYDTZ && MjClient.getAppType() != MjClient.APP_TYPE.HUNANWANGWANG &&
            MjClient.getAppType() != MjClient.APP_TYPE.AYGUIZHOUMJ)
            _infoMation.ignoreContentAdaptWithSize(true);

        //时间
        var _time =  _back.getChildByName("time");
        _time.visible = true;
        _time.setString("");

        if (isNewUi) {
            if (MjClient.getAppType() != MjClient.APP_TYPE.QXTHMJ) {
                //描述结算
                if (MjClient.isDismiss) {
                    var id = tData.firstDel;
                    var pl = sData.players[id];
                    var delStr = "";
                    if(pl)
                    {
                        var name  =  unescape(pl.info.nickname );
                        delStr = name + pl.mjdesc[0];
                    }
                    else
                    {
                        // 系统、会长或管理员解散房间
                        pl = getUIPlayer(0);
                        if (pl)
                            delStr = pl.mjdesc[0];
                        if (pl)
                        {
                            for(var i =0;i<pl.mjdesc.length;i++)
                            {
                                if(pl.mjdesc[i].indexOf("管理员")>=0||pl.mjdesc[i].indexOf("会长")>=0)
                                    delStr=pl.mjdesc[i];
                            }
                            //delStr = pl.mjdesc[0];
                        }
                    }
                    _time.setString(delStr);
                }
            }
        } else {
            cc.log("MjClient.roundEndTime == " + MjClient.roundEndTime);
            if(MjClient.roundEndTime)
                _time.setString(MjClient.roundEndTime);
        }

        var nantongReplay = function() {
            var tData = MjClient.data.sData.tData;
            var para = tData.areaSelectMode;
            var inviteVipTable = MjClient.data.inviteVipTable;
            para.maxPlayer = tData.maxPlayer;
            para.gameType = tData.gameType;

            MjClient.showMsg("是否再来一局？", function () {
                MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Zailaiyiju", {uid:SelfUid(),gameType:para.gameType});
                if (inviteVipTable)
                {
                    MjClient.joinGame(inviteVipTable, null, false, para.gameType);
                }
                else
                {
                    MjClient.createRoom(para, tData.roundAll, tData.areaSelectMode.payWay, function (rtn)
                    {
                        if(rtn.result==0)
                        {
                            MjClient.rematchInfo(MjClient.data.vipTable, tData.uids);
                        }
                    });
                }
            }, function(){}, "1", "nantongReplay");
        };

        //close ,关闭
        var _close1 =  _back.getChildByName("close");
        this._close1 = _close1;
        _close1.addTouchEventListener(function(sender,Type){
            switch (Type)
            {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Tuichu", {uid:SelfUid(),gameType:MjClient.gameType});
                    if(MjClient.Scene.getChildByName("shareCode")) MjClient.Scene.removeChildByName("shareCode");
                   
                    var clubInfoTable = getClubInfoInTable();
                    if (clubInfoTable) {
                        if (!MjClient.FriendCard_main_ui)
                            MjClient.Scene.addChild(new FriendCard_main(clubInfoTable.clubId));
                    }

                    //MjClient.leaveGame();
                    //这里的leaveGame肯定会返回{"result":0,"msg":"alreadyLeave"}，所以不用等待返回后再继续
                    //MjClient.native.doCopyToPasteBoard("");//清空剪切板
                    MjClient.gamenet.request("pkplayer.handler.LeaveGame",{},function(rtn){});
                    delete MjClient.data.sData;
                    delete MjClient.gameType;
                    postEvent("LeaveGame");
                    //if (!MjClient.enterui && !MjClient.FriendCard_main_ui)
                    //    MjClient.Scene.addChild(new EnterRoomLayer());

                    if(MjClient.endallui){
                        MjClient.endallui.removeFromParent(true);
                        MjClient.endallui = null;
                    }

                    if(cc.sys.isObjectValid(MjClient.goldMatchingui)){
                        MjClient.goldMatchingui.removeFromParent();
                        delete  MjClient.goldMatchingui;
                    }

                    break;
                default :
                    break;
            }
        },this);



        //再来一局
        var _btnReplay =  _back.getChildByName("btnReplay");
        var tData = MjClient.data.sData.tData;


        if(MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ ||
            /*isJinZhongAPPType() ||*/
            MjClient.getAppType() == MjClient.APP_TYPE.TXLVLIANGMJ ||
            MjClient.getAppType() == MjClient.APP_TYPE.TXLINFENMJ ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ
        )
        {
            // _btnReplay.visible = true;
            _btnReplay.visible = !MjClient.remoteCfg.guestLogin && !tData.matchId;
            _btnReplay.visible = !getClubInfoInTable();

        }
        else
        {
            _btnReplay.visible = false;  //屏蔽再来一局
        }
        if (MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_ZERO) 
        {
            _btnReplay.visible = true;  //屏蔽再来一局
        }

        _btnReplay.addTouchEventListener(function(sender,Type){
            switch (Type)
            {
                case ccui.Widget.TOUCH_ENDED:
                    if(MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ)//淮安斗地主，南通APP再来一局退出到主界面再提示
                    {
                        nantongReplay();

                        //MjClient.leaveGame();
                        //这里的leaveGame肯定会返回{"result":0,"msg":"alreadyLeave"}，所以不用等待返回后再继续
                        //MjClient.native.doCopyToPasteBoard("");//清空剪切板
                        MjClient.gamenet.request("pkplayer.handler.LeaveGame",{},function(rtn){});
                        delete MjClient.data.sData;
                        delete MjClient.gameType;
                        postEvent("LeaveGame");
                        //if (!MjClient.enterui && !MjClient.FriendCard_main_ui)
                        //    MjClient.Scene.addChild(new EnterRoomLayer());

                        if(MjClient.endallui){
                            MjClient.endallui.removeFromParent(true);
                            MjClient.endallui = null;
                        }

                    }
                    else
                    {
                        MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Dajiesuanjiemian_Zailaiyiju", {uid:SelfUid(),gameType:MjClient.gameType});
                        if (MjClient.data.inviteVipTable)
                        {
                            MjClient.leaveGame(function()
                            {
                                cc.log("--------------reCreateRoom2")

                                MjClient.joinGame(MjClient.data.inviteVipTable, null, false, MjClient.gameType);
                            });
                        }
                        else
                        {
                            MjClient.reCreateRoom();
                        }

                    }
                    break;
                default :
                    break;
            }
        },this);

        var self = this;
        if(tData.matchId){
            _close1.setVisible(false);
            var endTitle = _back.getChildByName("end_title");
            endTitle.loadTexture("winGame/BL_jieshu.png");
            endTitle.ignoreContentAdaptWithSize(true);

            var _btnReplay =  _back.getChildByName("roundEndText");
            _btnReplay.setVisible(true);
        }
        var textNum =  _back.getChildByName("Text_num");
        var text3 =  _back.getChildByName("Text_3");
        var text5 =  _back.getChildByName("Text_5");
        UIEventBind(null,this,"leftTable",function(data){
            //num.setString(self._data.condition - data.signUpCount);
            textNum.setString(data.leftTable);
            textNum.setVisible(true);
            text3.setVisible(true);
            text5.setVisible(true);
        })

        // 显示复制按钮
        addCopyBtnToGameOverLayer(endallui.node);

        //四个玩家的详细信息
        var infoBg = _back.getChildByName("infoBg");
        var infoBgSize = infoBg.getCustomSize();

        var info = infoBg.getChildByName("info");
        info.visible = false;
        var bgSize = info.getCustomSize();
        var sData = MjClient.data.sData;
        var players = sData.players;
        var playerCount = Object.keys(players).length;

        //var off_x = (infoBgSize.width - playerCount*bgSize.width)/(playerCount-1);
        //var startPos = cc.p(bgSize.width/2,infoBgSize.height/2);

        var off_x = bgSize.width*(4 -playerCount)/4;
        if(MjClient.gameType == MjClient.GAME_TYPE.LV_LIANG_DA_QI
            ||MjClient.gameType == MjClient.GAME_TYPE.XIN_ZHOU_SAN_DA_ER
            ||MjClient.gameType == MjClient.GAME_TYPE.DA_TONG_ZHA_GU_ZI){
            bgSize.width = 242;
            off_x = bgSize.width*(6 -playerCount)/14;
            bgSize.width = bgSize.width * 0.95;
            info.setScale(0.98);
            // info.setPosition(cc.p(info.x, info.y+100));
            // info.getChildByName("allscore").setScale(1.3);
            // info.getChildByName("allscore").getChildByName("bigWinner").setPosition(cc.p(110, 300));
            // info.getChildByName("allscore").getChildByName("bigWinner").setScale(1.25);
        }

        // 南通/海安
        if (MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP
            || MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ
            || MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ) {
            off_x = (1085 - bgSize.width * playerCount) / (playerCount - 1);
        }

        var startPos = cc.p(infoBgSize.width/2 - playerCount*(bgSize.width + off_x)/2 + (bgSize.width + off_x)/2, infoBgSize.height/2);

        // 晋中换皮
        if (isJinZhongAPPType() || MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_GZ) {
            startPos = cc.p(infoBgSize.width/2 - playerCount*(bgSize.width + off_x)/2 + (bgSize.width + off_x)/2, 0);
        }

        var clone = null;
        for(var i = 0 ; i < playerCount ; i++){
            clone = info.clone();
            clone.visible = true;
            infoBg.addChild(clone, 4 - i);
            if(isJinZhongAPPType()
                || MjClient.getAppType() == MjClient.APP_TYPE.TXLINFENMJ
                || MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP
                || MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ
                || MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP
                || MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG
				|| MjClient.getAppType() == MjClient.APP_TYPE.AYGUIZHOUMJ
                || MjClient.getAppType() === MjClient.APP_TYPE.QXSYDTZ)
            {
                SetGameOverLayer_doudizhu_APP(clone,i, isNewUi);
            }
            else
            {
                SetGameOverLayer_doudizhu(clone,i, isNewUi);
            }

            clone.setPosition(startPos);

            COMMON_UI.addGameOverNotSameClubUI(clone,MjClient.getPlayerByIndex(i))

            startPos = cc.p(startPos.x + bgSize.width + off_x,startPos.y);
        }
        return true;
    },
    onEnter:function()
    {
        this._super();
        if (MjClient.homeui && MjClient.systemConfig.rankEnable == "true")
        {
            MjClient.homeui.gameRankLayer();
        }
    },
    replaySet : function(cb){ // 邵阳斗地主需要用到 replaySet
        this._close1.addTouchEventListener(function(sender,type){
            if (type == ccui.Widget.TOUCH_ENDED)
                MjClient.goOnReplay();
        }, this);
    }
});

//  扎股子大结算
var GameOverLayer_zhaguzi = cc.Layer.extend({
    sprite:null,
    jsBind:{
        back:{
            share:{
                img_shine:{
                    _visible:false
                },
                img_txt:{
                    _visible:false
                },
                img_point:{
                    _visible:false
                },
                _event:{
                    captureScreen_OK:function(){
                        if (MjClient.endallui.capture_screen != true)
                            return;
                        MjClient.endallui.capture_screen = false;
                        var writePath = jsb.fileUtils.getWritablePath();
                        var textrueName = "wxcapture_screen.png";
                        var savepath = writePath+textrueName;
                        MjClient.shareImageToSelectedPlatform(savepath);
                        this.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(function()
                        {
                            this.setTouchEnabled(true);
                        }.bind(this))));
                        if(MjClient.Scene.getChildByName("shareCode")) MjClient.Scene.removeChildByName("shareCode");
                    }
                }
            },
        }
    },
    ctor:function () {
        this._super();
        var endallui = ccs.load("endAll_ZhaGuZi.json");
        BindUiAndLogic(endallui.node,this.jsBind);
        this.addChild(endallui.node);
        MjClient.endallui=this;

        var _block = endallui.node.getChildByName("block");
        setWgtLayout(_block,[1,1],[0.5,0.5],[0,0], true);

        var _bg = endallui.node.getChildByName("bg");
        if (_bg) {
            setWgtLayout(_bg, [1, 1], [0.5, 0.0], [0,0]);
            _bg.height += (MjClient.size.height / _bg.scaleY - _bg.height) / 2;
        }

        var isNewUi = (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP ||MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ  || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ);

        /*
         changed by sking
         */
        var _back = endallui.node.getChildByName("back");
        if(isIPhoneX())
            setWgtLayout(_back,[0.85,0.85],[0.5,0.5],[0,0],false);
        else
            setWgtLayout(_back,[1,1],[0.5,0.5],[0,0]);



        //分享
        var _share =  _back.getChildByName("share");
        var sData=MjClient.data.sData;
        var tData=sData.tData;
        _share.visible = !MjClient.remoteCfg.guestLogin && !tData.matchId;

        //_share.x = 713.24;//屏蔽再来一局的时候，坐标要移动一下
        _share.addTouchEventListener(function(sender,Type){
            switch (Type)
            {
                case ccui.Widget.TOUCH_ENDED:
                    if(isJinZhongAPPType() && MjClient.gameType != MjClient.GAME_TYPE.LV_LIANG_DA_QI) { // 打七除外
                        ShareGameOverInfo();
                    } else {
                        MjClient.shareMultiPlatform(MjClient.systemConfig.sharePlatforms, function()
                        {
                            COMMON_UI.getShareCodeTexture(tData.tableInfoUrl,_back,function(){
                                cc.log("====================capture_screen=======================");
                                postEvent("capture_screen");
                                if(MjClient.endallui && cc.sys.isObjectValid(MjClient.endallui)){
                                    MjClient.endallui.capture_screen = true;
                                }
                                _share.setTouchEnabled(false);
                            });
                        });
                    }
                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Dajiesuanjiemian_Fenxiang",  {uid:SelfUid(),gameType:MjClient.gameType});
                    break;
                default :
                    break;
            }
        },this);
        var clubInfoTable = getClubInfoInTable();
        if (clubInfoTable && clubInfoTable.clubId) {
            _share.x = _share.getParent().width / 2;
        }

        // 如果是亲友圈的房间显示亲友圈图标及名称
        var image_title = _back.getChildByName("Image_title");
        var clubNode = _back.getChildByName("Image_club");
        if (clubInfoTable && typeof(clubInfoTable.clubAvatar) != "undefined" && clubInfoTable.clubId && clubNode != null)
        {
            if (image_title)
                image_title.setVisible(false);

            var clubName = clubNode.getChildByName("Text_name");
            clubName.ignoreContentAdaptWithSize(true);
            clubName.setString("" + unescape(clubInfoTable.clubTitle));

            var _nameStr = unescape(clubInfoTable.ruleName);
            var _ruleName = clubName.clone();
            _ruleName.ignoreContentAdaptWithSize(true);
            _ruleName.setString(_nameStr);
            _ruleName.y = clubName.y + clubName.height/2 + _ruleName.height/2;
            _ruleName.x = clubName.x;
            clubNode.addChild(_ruleName);
            cc.loader.loadImg(clubInfoTable.clubAvatar ? clubInfoTable.clubAvatar : "png/default_headpic.png", {
                isCrossOrigin: true
            }, function(err, texture) {
                if (err || !texture || !sys.isObjectValid(clubNode))
                    return;

                var sp = new cc.Sprite(texture);
                if (!sp)
                    return;

                sp.setScale((clubNode.width - 8) / sp.width);
                sp.setPosition(cc.p(clubNode.width / 2, clubNode.height / 2));
                clubNode.addChild(sp);
            });
        }
        else if (clubNode != null)
        {
            clubNode.setVisible(false);
        }

        //信息 说明
        var _infoMation =  _back.getChildByName("infoMation");
        _infoMation.visible = true;
        _infoMation.setFontName("Arial");
        _infoMation.setFontSize(_infoMation.getFontSize());

        var _infoMation2 =  _back.getChildByName("infoMation_2");
        cc.log(" ----------- _infoMation2----------- 9999999  ",_infoMation2)
        if (_infoMation2) {
            _infoMation2.setFontName("Arial");
            _infoMation2.setFontSize(_infoMation2.getFontSize());
            _infoMation2.setString("")
            _infoMation2.visible = true;
            //描述结算
            var sData=MjClient.data.sData;
            var tData=sData.tData;
            cc.log(" --------isDismiss  ",MjClient.isDismiss);
            if (MjClient.isDismiss)
            {

                var id = tData.firstDel;
                var pl = sData.players[id];
                var delStr = "";
                if(pl)
                {
                    var name  =  unescape(pl.info.nickname );
                    delStr = name + pl.mjdesc[0];
                }
                else
                {
                    // 系统、会长或管理员解散房间
                    pl = getUIPlayer(0);
                    if (pl)
                        delStr = pl.mjdesc[0];
                }

                _infoMation2.setString("" + delStr) ;
                _infoMation2.setFontName("Arial");
                _infoMation2.setFontSize(_infoMation2.getFontSize());
            }
        }

        function _infoText(){
            var sData=MjClient.data.sData;
            var tData=sData.tData;
            var text = GameCnName[MjClient.gameType];

            if (isNewUi) {
                text += "-" + tData.maxPlayer + "人\n";
                var roundNumPre = typeof(tData.roundNumPre) != "undefined" ? tData.roundNumPre : tData.roundNum;
                text += "房号：" + tData.tableid
                if (roundNumPre && tData.roundAll - tData.roundNumPre + 1 <= tData.roundAll)
                    text += " 局数：" + (tData.roundAll - tData.roundNumPre + 1) + "/" + tData.roundAll;
                text += "\n";
                if(MjClient.roundEndTime)
                    text += MjClient.roundEndTime + "";
            } else {
                var strPayWay = "";
                switch (tData.areaSelectMode.payWay)
                {
                    case 0:
                        strPayWay = ",房主付";
                        break;
                    case 1:
                        strPayWay = ",AA付";
                        break;
                    case 2:
                        strPayWay = ",大赢家付";
                        break;
                }
                text += strPayWay;

                // switch (tData.areaSelectMode.zhafengding)
                // {
                //     case 0:
                //         text += ",不封顶";
                //         break;
                //     case 1:
                //         text += ",3炸封顶";
                //         break;
                //     case 2:
                //         text += ",4炸封顶";
                //         break;
                // }
                if(tData.areaSelectMode.zhafengding != null)
                {
                    if(tData.areaSelectMode.zhafengding <= 0)
                    {
                        text +=  ",不封顶";
                    }
                    else
                    {
                        text += ","+tData.areaSelectMode.zhafengding+"炸封顶";
                    }
                }


                switch (tData.areaSelectMode.jifengding)
                {
                    case 3:
                        text += ",3级封顶";
                        break;
                    case 5:
                        text += ",5级封顶";
                        break;
                    case 0:
                        text += ",不封顶";
                        break;
                }
                if(tData.areaSelectMode.beishufengding)
                {
                    text +=  "," + tData.areaSelectMode.beishufengding+ "倍封顶 ";
                }
                text += tData.areaSelectMode.koudi? ",扣底加级" : "";
                text += tData.areaSelectMode.zhuangdanjiabei? ",庄家单打赢双倍" : "";
                text += tData.areaSelectMode.bijiaoShuangwang ? ",双王必叫" : "";
                text += tData.areaSelectMode.bijiaoSigeer ? ",4个2必叫" : "";
                text += tData.areaSelectMode.bijiaoWangshuanger ? ",王+双2必叫" : "";
                text += tData.areaSelectMode.bijiaoZhadan ? ",炸弹必叫" : "";
                text += tData.areaSelectMode.daiti ? ",带踢" : "";
                text += tData.areaSelectMode.sidaier ? ",四带二" : "";
                text += tData.areaSelectMode.yingjiaxianchu ? ",赢家先出" : "";
                text += tData.areaSelectMode.difen ? "," + tData.areaSelectMode.difen + "积分底分" : "";
                text += tData.areaSelectMode.jiabei ? ",加倍" : "";
                text += tData.areaSelectMode.sidaisi ? ",四带两对" : "";

                text += ",房间号:";
                text += tData.tableid;
                var clubInfoTable = getClubInfoInTable();
                if (clubInfoTable){
                    //需求：海安、晋中、南通 对于俱乐部牌局，在大结算、大结算分享图中，增加显示，亲友圈ID，并显示对应的玩法名称【是会长建立玩法时设定的玩法名称】
                    if(MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ ||
                        isJinZhongAPPType() ||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP ){
                        text += ",亲友圈ID:";
                        text += clubInfoTable.clubId;
                        if(clubInfoTable.ruleName){
                            text = text+"（"+unescape(clubInfoTable.ruleName)+"）";
                        }
                    }
                }
            }

            return text;
        }
        _infoMation.setString(_infoText());
        _infoMation.setFontName("Arial");
        _infoMation.setFontSize(_infoMation.getFontSize());
        // 晋中换皮
        if (!isNewUi && MjClient.getAppType() != MjClient.APP_TYPE.TXJINZHONGMJ && MjClient.getAppType() != MjClient.APP_TYPE.DQSHANXIMJ)
            _infoMation.ignoreContentAdaptWithSize(true);

        //时间
        var _time =  _back.getChildByName("time");
        _time.visible = true;
        _time.setString("");

        if (isNewUi) {
            if (MjClient.getAppType() != MjClient.APP_TYPE.QXTHMJ) {
                //描述结算
                if (MjClient.isDismiss) {
                    var id = tData.firstDel;
                    var pl = sData.players[id];
                    var delStr = "";
                    if(pl)
                    {
                        var name  =  unescape(pl.info.nickname );
                        delStr = name + pl.mjdesc[0];
                    }
                    else
                    {
                        // 系统、会长或管理员解散房间
                        pl = getUIPlayer(0);
                        if (pl)
                            delStr = pl.mjdesc[0];
                        if (pl)
                        {
                            for(var i =0;i<pl.mjdesc.length;i++)
                            {
                                if(pl.mjdesc[i].indexOf("管理员")>=0||pl.mjdesc[i].indexOf("会长")>=0)
                                    delStr=pl.mjdesc[i];
                            }
                            //delStr = pl.mjdesc[0];
                        }
                    }
                    _time.setString(delStr);
                    _time.setFontName("Arial");
                    _time.setFontSize(_time.getFontSize());
                }
            }
        } else {
            cc.log("MjClient.roundEndTime == " + MjClient.roundEndTime);
            if(MjClient.roundEndTime)
                _time.setString(MjClient.roundEndTime);
        }

        var nantongReplay = function() {
            var tData = MjClient.data.sData.tData;
            var para = tData.areaSelectMode;
            var inviteVipTable = MjClient.data.inviteVipTable;
            para.maxPlayer = tData.maxPlayer;
            para.gameType = tData.gameType;

            MjClient.showMsg("是否再来一局？", function () {
                MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Zailaiyiju", {uid:SelfUid(),gameType:para.gameType});
                if (inviteVipTable)
                {
                    MjClient.joinGame(inviteVipTable, null, false, para.gameType);
                }
                else
                {
                    MjClient.createRoom(para, tData.roundAll, tData.areaSelectMode.payWay, function (rtn)
                    {
                        if(rtn.result==0)
                        {
                            MjClient.rematchInfo(MjClient.data.vipTable, tData.uids);
                        }
                    });
                }
            }, function(){}, "1", "nantongReplay");
        };

        //close ,关闭
        var _close1 =  _back.getChildByName("close");
        _close1.addTouchEventListener(function(sender,Type){
            switch (Type)
            {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Tuichu", {uid:SelfUid(),gameType:MjClient.gameType});
                    if(MjClient.Scene.getChildByName("shareCode")) MjClient.Scene.removeChildByName("shareCode");
                   
                    var clubInfoTable = getClubInfoInTable();
                    if (clubInfoTable) {
                        if (!MjClient.FriendCard_main_ui)
                            MjClient.Scene.addChild(new FriendCard_main(clubInfoTable.clubId));
                    }

                    //MjClient.leaveGame();
                    //这里的leaveGame肯定会返回{"result":0,"msg":"alreadyLeave"}，所以不用等待返回后再继续
                    //MjClient.native.doCopyToPasteBoard("");//清空剪切板
                    MjClient.gamenet.request("pkplayer.handler.LeaveGame",{},function(rtn){});
                    delete MjClient.data.sData;
                    delete MjClient.gameType;
                    postEvent("LeaveGame");
                    //if (!MjClient.enterui && !MjClient.FriendCard_main_ui)
                    //    MjClient.Scene.addChild(new EnterRoomLayer());

                    if(MjClient.endallui){
                        MjClient.endallui.removeFromParent(true);
                        MjClient.endallui = null;
                    }

                    if(cc.sys.isObjectValid(MjClient.goldMatchingui)){
                        MjClient.goldMatchingui.removeFromParent();
                        delete  MjClient.goldMatchingui;
                    }

                    break;
                default :
                    break;
            }
        },this);



        //再来一局
        var _btnReplay =  _back.getChildByName("btnReplay");
        var tData = MjClient.data.sData.tData;


        _btnReplay.visible = !MjClient.remoteCfg.guestLogin && !tData.matchId;
        _btnReplay.visible = !getClubInfoInTable();;
        _btnReplay.visible = false;


        _btnReplay.addTouchEventListener(function(sender,Type){
            switch (Type)
            {
                case ccui.Widget.TOUCH_ENDED:
                    if(MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP)//南通APP再来一局退出到主界面再提示
                    {
                        nantongReplay();

                        //MjClient.leaveGame();
                        //这里的leaveGame肯定会返回{"result":0,"msg":"alreadyLeave"}，所以不用等待返回后再继续
                        //MjClient.native.doCopyToPasteBoard("");//清空剪切板
                        MjClient.gamenet.request("pkplayer.handler.LeaveGame",{},function(rtn){});
                        delete MjClient.data.sData;
                        delete MjClient.gameType;
                        postEvent("LeaveGame");
                        //if (!MjClient.enterui && !MjClient.FriendCard_main_ui)
                        //    MjClient.Scene.addChild(new EnterRoomLayer());

                        if(MjClient.endallui){
                            MjClient.endallui.removeFromParent(true);
                            MjClient.endallui = null;
                        }

                    }
                    else
                    {
                        MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Dajiesuanjiemian_Zailaiyiju", {uid:SelfUid(),gameType:MjClient.gameType});
                        if (MjClient.data.inviteVipTable)
                        {
                            MjClient.leaveGame(function()
                            {
                                cc.log("--------------reCreateRoom2")

                                MjClient.joinGame(MjClient.data.inviteVipTable, null, false, MjClient.gameType);
                            });
                        }
                        else
                        {
                            MjClient.reCreateRoom();
                        }

                    }
                    break;
                default :
                    break;
            }
        },this);

        var self = this;
        if(tData.matchId){
            _close1.setVisible(false);
            var endTitle = _back.getChildByName("end_title");
            endTitle.loadTexture("winGame/BL_jieshu.png");
            endTitle.ignoreContentAdaptWithSize(true);

            var _btnReplay =  _back.getChildByName("roundEndText");
            _btnReplay.setVisible(true);
        }
        var textNum =  _back.getChildByName("Text_num");
        var text3 =  _back.getChildByName("Text_3");
        var text5 =  _back.getChildByName("Text_5");
        UIEventBind(null,this,"leftTable",function(data){
            //num.setString(self._data.condition - data.signUpCount);
            textNum.setString(data.leftTable);
            textNum.setVisible(true);
            text3.setVisible(true);
            text5.setVisible(true);
        })

        // 显示复制按钮
        addCopyBtnToGameOverLayer(endallui.node);

        //四个玩家的详细信息
        var infoBg = _back.getChildByName("infoBg");
        var infoBgSize = infoBg.getCustomSize();

        var info = infoBg.getChildByName("info");
        info.visible = false;
        var bgSize = info.getCustomSize();
        var sData = MjClient.data.sData;
        var players = sData.players;
        var playerCount = Object.keys(players).length;

        //var off_x = (infoBgSize.width - playerCount*bgSize.width)/(playerCount-1);
        //var startPos = cc.p(bgSize.width/2,infoBgSize.height/2);

        var off_x = bgSize.width*(4 -playerCount)/4;
        bgSize.width = 242;
        off_x = bgSize.width*(6 -playerCount)/14;
        bgSize.width = bgSize.width * 0.95;
        info.setScale(0.98);
            // info.setPosition(cc.p(info.x, info.y+100));
            // info.getChildByName("allscore").setScale(1.3);
            // info.getChildByName("allscore").getChildByName("bigWinner").setPosition(cc.p(110, 300));
            // info.getChildByName("allscore").getChildByName("bigWinner").setScale(1.25);


        var startPos = cc.p(infoBgSize.width/2 - playerCount*(bgSize.width + off_x)/2 + (bgSize.width + off_x)/2, infoBgSize.height/2);

        // 晋中换皮
        startPos = cc.p(infoBgSize.width/2 - playerCount*(bgSize.width + off_x)/2 + (bgSize.width + off_x)/2, 0);

        var clone = null;
        for(var i = 0 ; i < playerCount ; i++){
            clone = info.clone();
            clone.visible = true;
            infoBg.addChild(clone, 4 - i);
            SetGameOverLayer_zhaguzi(clone,i, isNewUi);
            clone.setPosition(startPos);

            COMMON_UI.addGameOverNotSameClubUI(clone,MjClient.getPlayerByIndex(i))

            startPos = cc.p(startPos.x + bgSize.width + off_x,startPos.y);
        }
        return true;
    },
    onEnter:function()
    {
        this._super();
        if (MjClient.homeui && MjClient.systemConfig.rankEnable == "true")
        {
            MjClient.homeui.gameRankLayer();
        }
    }
});

//  跑胡子大结算
var GameOverLayer_paohuzi = cc.Layer.extend({
    sprite:null,
    jsBind:{
        back:{
            share:{
                img_shine:{
                    _visible:false
                },
                img_txt:{
                    _visible:false
                },
                img_point:{
                    _visible:false
                },
                _event:{
                    captureScreen_OK:function(){
                        if (MjClient.endallui.capture_screen != true)
                            return;
                        MjClient.endallui.capture_screen = false;
                        var writePath = jsb.fileUtils.getWritablePath();
                        var textrueName = "wxcapture_screen.png";
                        var savepath = writePath+textrueName;
                        MjClient.shareImageToSelectedPlatform(savepath);
                        this.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(function()
                        {
                            this.setTouchEnabled(true);
                        }.bind(this))));
                        if(MjClient.Scene.getChildByName("shareCode")) MjClient.Scene.removeChildByName("shareCode");
                    }
                }
            },
        }
    },
    setInfoMationYongZhou:function() {
         //信息 说明
         var _infoMation =  this.backNode.getChildByName("infoMation");
         _infoMation.visible = true;
         function _infoText(){
             var sData=MjClient.data.sData;
             var tData=sData.tData;
             var text = "";
 
             if(MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI){
                 text += "扯胡子三人场,";
             }else if(MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_ER){
                 text += "扯胡子二人场,";
             }else if(MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_SR){
                 text += "四人场(坐醒),";
             }else if(MjClient.gameType == MjClient.GAME_TYPE.LUO_DI_SAO){
                 text += "落地扫,";
             }else if(MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_King){
                 text += "四王扯胡子,";
             }else if(MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_SR_King){
                 text += "四王坐醒,";
             }else if(MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_LR_King){
                 text += "四王单挑场,";
             }else if(MjClient.gameType == MjClient.GAME_TYPE.ZP_LY_CHZ){
                 text += "耒阳字牌,";
             }else if(MjClient.gameType == MjClient.GAME_TYPE.HY_LIU_HU_QIANG){
                 text += "六胡抢,";
             }else if(MjClient.gameType == MjClient.GAME_TYPE.HY_SHI_HU_KA){
                 text += "十胡卡,";
             }else if(MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_SHIWUHUXI){
                 text += "衡阳十五胡,";
             }else if(MjClient.gameType == MjClient.GAME_TYPE.JIANG_YONG_15Z){
                 text += "江永十五张";
             }if(MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_ZI_PAI){
                 text += "邵阳字牌,";
             }if(MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_BO_PI){
                 text += "邵阳剥皮,";
             }
 
             if(MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_King || 
                 MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_SR_King ||
                 MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_LR_King){
                 text += MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_LR_King ? "" : "四王,";
                 text += (tData.areaSelectMode.isKing == true) ? "按王限胡," : "按番限胡," ;
             }else if(MjClient.gameType != MjClient.GAME_TYPE.ZP_LY_CHZ && 
                     MjClient.gameType != MjClient.GAME_TYPE.HY_LIU_HU_QIANG && 
                     MjClient.gameType != MjClient.GAME_TYPE.HY_SHI_HU_KA &&
                     MjClient.gameType != MjClient.GAME_TYPE.HENG_YANG_SHIWUHUXI && 
                     MjClient.gameType != MjClient.GAME_TYPE.SHAO_YANG_BO_PI && 
                     MjClient.gameType != MjClient.GAME_TYPE.SHAO_YANG_ZI_PAI){
                 text += (tData.areaSelectMode.kingNum == 0) ? "无王," :(tData.areaSelectMode.kingNum == 1) ? "单王," : (tData.areaSelectMode.kingNum == 2)?"双王,":"三王,";
             }
             if(MjClient.gameType == MjClient.GAME_TYPE.ZP_LY_CHZ){
                 text += (tData.areaSelectMode.jushou) ? "举手做声," : "" ;
                 text += (tData.areaSelectMode.budaihu) ? "不带无胡," : "带无胡," ;
                 text += (tData.areaSelectMode.budaiyihong) ? "不带一点红," : "带一点红," ;
                 text += (tData.areaSelectMode.isPutLimit) ? "吃边打边," : "" ;
                 if("trustTime" in tData.areaSelectMode){
                     text += {"-1": "", 0: "", 60: "1分钟后托管,", 120: "2分钟后托管,", 180: "3分钟后托管,", 300: "5分钟后托管," }[tData.areaSelectMode.trustTime];
                 }
                 text += (MjClient.MaxPlayerNum_leiyang == 3) ? "三人" : ((MjClient.MaxPlayerNum_leiyang == 2) ? "二人" : "四人");
             }else if(MjClient.gameType == MjClient.GAME_TYPE.HY_LIU_HU_QIANG){
                 text += (tData.areaSelectMode.xiNum == 6) ? "6息," : (tData.areaSelectMode.xiNum == 9) ? "9息," : "15息," ;
                 text += (tData.areaSelectMode.suanfenType == 0) ? "" : (tData.areaSelectMode.suanfenType == 1) ? "底分2分," : "1息1囤,";
                 text += ["有胡必胡," , "点炮必胡,", " "][tData.areaSelectMode.bihuType] ;
                 text += (tData.areaSelectMode.isMingwei) ? "明偎,\n" : "\n" ;
                 text += (tData.areaSelectMode.isYiwushi) ? "一五十," : "" ;
                 text += (tData.areaSelectMode.isHongheidian) ? "红黑点," : "" ;
 
                 text += (tData.areaSelectMode.isTiandihu) ? "天地胡," : "" ;
                 text += (tData.areaSelectMode.isTianhu) ? "天胡," : "" ;
                 text += (tData.areaSelectMode.isDihu) ? "地胡," : "" ;
                 text += (tData.areaSelectMode.isMaiPai) ? "埋牌20张," : "" ;
                 text += (tData.areaSelectMode.is21Zhang) ? "21张," : "" ;
                 text += (tData.areaSelectMode.xingType == 0) ? "不带醒," : (tData.areaSelectMode.xingType == 2) ? "翻醒," : "随醒," ;
                 text += (MjClient.MaxPlayerNum_leiyang == 3) ? "三人" : (MjClient.MaxPlayerNum_leiyang == 2) ? "二人" : "三人";
             }else if(MjClient.gameType == MjClient.GAME_TYPE.HY_SHI_HU_KA){
                 text += ["有胡必胡," , "点炮必胡,", " "][tData.areaSelectMode.bihuType] ;
                 if(tData.areaSelectMode.isHongheidian){
                     text += "红黑点,";
                     text += (tData.areaSelectMode.hongziType == 0) ? "10红3倍13红5倍," : "10红3倍多一红+3胡," ;
                 } 
                 text += ["3倍,", "2倍,", "1倍," ][tData.areaSelectMode.fangpaoType];
                 text += (tData.areaSelectMode.isErfen) ? "底分2分," : "" ;
                 text += (tData.areaSelectMode.isYiwushi) ? "一五十," : "" ;
                 text += (tData.areaSelectMode.isTiandihu) ? "天地胡," : "" ;
                 text += (tData.areaSelectMode.isTianhu) ? "天胡," : "" ;
                 text += (tData.areaSelectMode.isDihu) ? "地胡," : "" ;
                 text += (tData.areaSelectMode.isHaidihu) ? "海底胡," : "" ;
                 text += (tData.areaSelectMode.isPiaoHu) ? "飘胡," : "" ;
                 text += (tData.areaSelectMode.isMaiPai) ? "埋牌20张," : "" ;
                 text += (tData.areaSelectMode.isHuLiangZhang) ? "可胡示众牌," : "" ;
                 text += (tData.areaSelectMode.isYiHongSanBei) ? "一点红三倍," : "" ;
                 text += (tData.areaSelectMode.isZiMoFanBei) ? "自摸翻倍," : "" ;
                 text += (tData.areaSelectMode.xingType == 0) ? "不带醒," : (tData.areaSelectMode.xingType == 2) ? "翻醒," : "随醒," ;
                 if("trustTime" in tData.areaSelectMode){
                     text += {"-1": "", 0: "", 60: "1分钟后托管,", 120: "2分钟后托管,", 180: "3分钟后托管,", 300: "5分钟后托管," }[tData.areaSelectMode.trustTime];
                 }
                 text += (MjClient.MaxPlayerNum_leiyang == 3) ? "三人" : "二人";
             }else if(MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_ZI_PAI){
                 text += (tData.areaSelectMode.huXiType == 3)?"3息一囤,":"5息一囤,";
                 text += tData.areaSelectMode.isJiaChui ? "加锤" : "";
                 text += tData.areaSelectMode.hongHeiType == 0 ? ",红黑胡翻倍" : ",红黑胡10囤";
                 text += tData.areaSelectMode.isZiMo ? ",自摸+1囤" : "";
             }else if(MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_BO_PI){
                 var arr = ["", "一", "二", "三", "四"];
                 text += arr[tData.areaSelectMode.maxPlayer] + "人";
                 text += tData.areaSelectMode.isHongheidian ? ",红黑点" : "";
                 text += tData.areaSelectMode.isTianDiHu ? ",天地胡" : "";
                 if(tData.areaSelectMode.isLianZhuang){
                     text += ",可连庄";
                     if(tData.areaSelectMode.fengDing == -1){
                         text += ",不封顶"
                     }else{
                         text += "," + tData.areaSelectMode.fengDing + "胡封顶"
                     }
                     
                 }
             }else if(MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_SHIWUHUXI){
                 text += (tData.areaSelectMode.bihuType == 0) ? "有胡必胡," : (tData.areaSelectMode.bihuType == 1) ? "点炮必胡," : "无点炮胡,";
                 text += (tData.areaSelectMode.xingType == 0) ? "不带醒\n" : (tData.areaSelectMode.xingType == 2) ? "翻醒\n" : "随醒\n" ;
                 text += (tData.areaSelectMode.isErfen) ? "底分2分," : "" ;
                 text += (tData.areaSelectMode.isZiMoRate) ? "自摸翻倍," : "" ;
                 text += (tData.areaSelectMode.isHongheidian) ? "红黑胡," : "" ;
                 text += (tData.areaSelectMode.isAlldemit) ? "解散须全部人同意," : "" ;
                 text += "三人";
             }else {
                 text += (tData.areaSelectMode.isGenXing == true) ? "跟醒," : "翻醒,";
                 text += (tData.areaSelectMode.isFanXing == 1) ? "单醒," : "双醒,";
                 text += (tData.areaSelectMode.hongZhuan == true) ? "红转朱黑," : "";
                 text += (tData.areaSelectMode.fengDing == -1) ? "无上限," : tData.areaSelectMode.fengDing + "分封顶,";
                 text += (MjClient.gameType != MjClient.GAME_TYPE.PAO_HU_ZI_LR_King && MjClient.MaxPlayerNum_paohuzi == 3) ? "三人" : ((MjClient.MaxPlayerNum_paohuzi == 2) ? "二人" : "四人");
             }
 
             if(MjClient.gameType == MjClient.GAME_TYPE.HY_LIU_HU_QIANG || 
                 MjClient.gameType == MjClient.GAME_TYPE.HY_SHI_HU_KA){
                 text += ",房间号:"+tData.tableid;
             }else{
                 text += "\n房间号:"+tData.tableid;
             }
        
             if(MjClient.gameType == MjClient.GAME_TYPE.SHAO_YANG_BO_PI){
                 text += "";
             }else{
                 text += ",局数:"+tData.roundAll+"局";
             }
             return text;
         }
         _infoMation.setString(_infoText());
         if(MjClient.getAppType() != MjClient.APP_TYPE.QXYZQP && MjClient.getAppType() != MjClient.APP_TYPE.QXLYQP){
             _infoMation.ignoreContentAdaptWithSize(true);
         }
    },
    setInfoMationLYG:function() {
        //信息 说明
        var _infoMation =  this.backNode.getChildByName("infoMation");
        _infoMation.visible = true;
        function _infoText(){
            var sData=MjClient.data.sData;
            var tData=sData.tData;
            var text = GameCnName[MjClient.gameType];
            text += ",房间号:";
            text += tData.tableid;

            var clubInfoTable = getClubInfoInTable();
            if (clubInfoTable){
                //需求：海安、晋中、南通 对于俱乐部牌局，在大结算、大结算分享图中，增加显示，亲友圈ID，并显示对应的玩法名称【是会长建立玩法时设定的玩法名称】
                if(MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ ||
                    isJinZhongAPPType() ||
                    MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP ){
                    text += ",亲友圈ID:";
                    text += clubInfoTable.clubId;
                    if(clubInfoTable.ruleName){
                        text = text+"（"+unescape(clubInfoTable.ruleName)+"）";
                    }
                }
            }
            //描述结算
            if (MjClient.isDismiss){
                var id = tData.firstDel;
                var pl = sData.players[id];
                var delStr = "";
                if(pl){
                    var name  =  unescape(pl.info.nickname );
                    delStr = name + pl.mjdesc[0];
                } else{
                    // 系统、会长或管理员解散房间
                    pl = getUIPlayer(0);
                    if (pl)
                        delStr = pl.mjdesc[0];
                }
                text += "," + delStr;
            }
            return text;
        }
        _infoMation.setString(_infoText());
        _infoMation.setFontName("Arial");
        _infoMation.setFontSize(_infoMation.getFontSize());
    },
    setInfoMationRight: function() { // 大结算右侧
        //解散信息 说明
        var _infoMation_1 =  this.backNode.getChildByName("infoMation_1");
        if (_infoMation_1 == null) {
            _infoMation_1 =  this.backNode.getChildByName("infoMation_2");
        }
        if (_infoMation_1 == null) { return; }
        _infoMation_1.visible = true;
        function _info1Text(){
            var sData=MjClient.data.sData;
            var tData=sData.tData;
            var text = "";

            //描述结算
            if (MjClient.isDismiss)
            {
                var id = tData.firstDel;
                var pl = sData.players[id];
                if(pl) {
                    var name  =  unescape(pl.info.nickname || pl.info.name);
                    var delStr = name + pl.mjdesc[0];
                    text += "" + delStr;
                } else {
                    text += "" + '会长解散';
                }
            }
            return text;
        }
        _infoMation_1.setString(_info1Text());
    },
    ctor:function () {
        this._super();
        var endallui = ccs.load(res.EndAll_paohuzi_json);
        BindUiAndLogic(endallui.node,this.jsBind);
        this.addChild(endallui.node);
        MjClient.endallui=this;

        var _block = endallui.node.getChildByName("block");
        setWgtLayout(_block,[1,1],[0.5,0.5],[0,0],true);

        /*
            changed by sking
         */
        var _back = endallui.node.getChildByName("back");
        this.backNode = _back;
        setWgtLayout(_back,[1,1],[0.5,0.5],[0,0]);


        //分享
        var _share =  _back.getChildByName("share");
        var tData = MjClient.data.sData.tData;
        _share.visible = !MjClient.remoteCfg.guestLogin && !tData.matchId;


        //_share.x = 713.24;//屏蔽再来一局的时候，坐标要移动一下
        _share.addTouchEventListener(function(sender,Type){
            switch (Type)
            {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.shareMultiPlatform(MjClient.systemConfig.sharePlatforms, function()
                    {
                        COMMON_UI.getShareCodeTexture(tData.tableInfoUrl,_back,function(){
                            cc.log("====================capture_screen=======================");
                            postEvent("capture_screen");
                            if(MjClient.endallui && cc.sys.isObjectValid(MjClient.endallui)){
                                MjClient.endallui.capture_screen = true;
                            }
                            _share.setTouchEnabled(false);
                        });
                    });
                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Dajiesuanjiemian_Fenxiang",  {uid:SelfUid(),gameType:MjClient.gameType});
                    break;
                default :
                    break;
            }
        },this);

        // 如果是亲友圈的房间显示亲友圈图标及名称
        var image_title = _back.getChildByName("Image_title");
        var clubNode = _back.getChildByName("Image_club");
        var clubInfoTable = getClubInfoInTable();
        if (clubInfoTable && typeof(clubInfoTable.clubAvatar) != "undefined" && clubInfoTable.clubId && clubNode != null)
        {
            if (image_title)
                image_title.setVisible(false);

            var clubName = clubNode.getChildByName("Text_name");
            clubName.ignoreContentAdaptWithSize(true);
            clubName.setString("" + unescape(clubInfoTable.clubTitle));

            var _nameStr = unescape(clubInfoTable.ruleName);
            var _ruleName = clubName.clone();
            _ruleName.ignoreContentAdaptWithSize(true);
            _ruleName.setString(_nameStr);
            _ruleName.y = clubName.y + clubName.height/2 + _ruleName.height/2;
            _ruleName.x = clubName.x;
            clubNode.addChild(_ruleName);
            cc.loader.loadImg(clubInfoTable.clubAvatar ? clubInfoTable.clubAvatar : "png/default_headpic.png", {
                isCrossOrigin: true
            }, function(err, texture) {
                if (err || !texture || !sys.isObjectValid(clubNode))
                    return;

                var sp = new cc.Sprite(texture);
                if (!sp)
                    return;

                sp.setScale((clubNode.width - 8) / sp.width);
                sp.setPosition(cc.p(clubNode.width / 2, clubNode.height / 2));
                clubNode.addChild(sp);
            });
        } else if (clubNode != null) {
            clubNode.setVisible(false);
        }

        if (isYongZhouProject) {
            this.setInfoMationYongZhou();
        } else {
            this.setInfoMationLYG();
        }
        this.setInfoMationRight();

        
        // 晋中换皮
        var _infoMation =  _back.getChildByName("infoMation");
        if (MjClient.getAppType() != MjClient.APP_TYPE.QXYZQP && MjClient.getAppType() != MjClient.APP_TYPE.QXLYQP) {
            _infoMation.ignoreContentAdaptWithSize(true);
        }

        //时间
        var _time =  _back.getChildByName("time");
        _time.visible = true;
        _time.setString("");
        cc.log("MjClient.roundEndTime == " + MjClient.roundEndTime);

        if(MjClient.roundEndTime){
            _time.setString(MjClient.roundEndTime);
        }else {
            _time.setString("");
        }

        var nantongReplay = function() {
            var tData = MjClient.data.sData.tData;
            var para = tData.areaSelectMode;
            var inviteVipTable = MjClient.data.inviteVipTable;
            para.maxPlayer = tData.maxPlayer;
            para.gameType = tData.gameType;

            MjClient.showMsg("是否再来一局？", function () {
                MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Zailaiyiju", {uid:SelfUid(),gameType:para.gameType});
                if (inviteVipTable)
                {
                    MjClient.joinGame(inviteVipTable, null, false, para.gameType);
                }
                else
                {
                    MjClient.createRoom(para, tData.roundAll, tData.areaSelectMode.payWay, function (rtn)
                    {
                        if(rtn.result==0)
                        {
                            MjClient.rematchInfo(MjClient.data.vipTable, tData.uids);
                        }
                    });
                }
            }, function(){}, "1", "nantongReplay");
        };

        //close ,关闭
        var _close1 =  _back.getChildByName("close");
        _close1.addTouchEventListener(function(sender,Type){
            switch (Type)
            {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Tuichu", {uid:SelfUid(),gameType:MjClient.gameType});
                    if(MjClient.Scene.getChildByName("shareCode")) MjClient.Scene.removeChildByName("shareCode");
                    var clubInfoTable = getClubInfoInTable();
                    if (clubInfoTable) {
                        if (!MjClient.FriendCard_main_ui)
                            MjClient.Scene.addChild(new FriendCard_main(clubInfoTable.clubId));
                    }

                    //MjClient.leaveGame();
                    //这里的leaveGame肯定会返回{"result":0,"msg":"alreadyLeave"}，所以不用等待返回后再继续
                    //MjClient.native.doCopyToPasteBoard("");//清空剪切板
                    MjClient.gamenet.request("pkplayer.handler.LeaveGame",{},function(rtn){});
                    delete MjClient.data.sData;
                    delete MjClient.gameType;
                    postEvent("LeaveGame");
                    //if (!MjClient.enterui && !MjClient.FriendCard_main_ui)
                    //    MjClient.Scene.addChild(new EnterRoomLayer());

                    if(MjClient.endallui){
                        MjClient.endallui.removeFromParent(true);
                        MjClient.endallui = null;
                    }

                    if(cc.sys.isObjectValid(MjClient.goldMatchingui)){
                        MjClient.goldMatchingui.removeFromParent();
                        delete  MjClient.goldMatchingui;
                    }

                    break;
                default :
                    break;
            }
        },this);



        //再来一局
        var _btnReplay =  _back.getChildByName("btnReplay");
        var tData = MjClient.data.sData.tData;
        _btnReplay.visible = !MjClient.remoteCfg.guestLogin && !tData.matchId;

        _btnReplay.visible = false;  //屏蔽再来一局

        _btnReplay.addTouchEventListener(function(sender,Type){
            switch (Type)
            {
                case ccui.Widget.TOUCH_ENDED:
                    if(MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP)//南通APP再来一局退出到主界面再提示
                    {
                        nantongReplay();

                        //MjClient.leaveGame();
                        //这里的leaveGame肯定会返回{"result":0,"msg":"alreadyLeave"}，所以不用等待返回后再继续
                        //MjClient.native.doCopyToPasteBoard("");//清空剪切板
                        MjClient.gamenet.request("pkplayer.handler.LeaveGame",{},function(rtn){});
                        delete MjClient.data.sData;
                        delete MjClient.gameType;
                        postEvent("LeaveGame");
                        //if (!MjClient.enterui && !MjClient.FriendCard_main_ui)
                        //    MjClient.Scene.addChild(new EnterRoomLayer());

                        if(MjClient.endallui){
                            MjClient.endallui.removeFromParent(true);
                            MjClient.endallui = null;
                        }

                    }
                    else
                    {
                        MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Dajiesuanjiemian_Zailaiyiju", {uid:SelfUid(),gameType:MjClient.gameType});
                        if (MjClient.data.inviteVipTable)
                        {
                            MjClient.leaveGame(function()
                            {
                                MjClient.joinGame(MjClient.data.inviteVipTable, null, false, MjClient.gameType);
                            });
                        }
                        else
                        {
                            MjClient.reCreateRoom();
                        }

                    }
                    break;
                default :
                    break;
            }
        },this);

        // 显示复制按钮
        addCopyBtnToGameOverLayer(endallui.node);

        var self = this;
        if(tData.matchId){
            _close1.setVisible(false);
            function delayExe()
            {
                self.addChild(new roundEndLayer(),500);
            }
            this.runAction(cc.sequence(cc.DelayTime(3),cc.callFunc(delayExe)));
            var endTitle = _back.getChildByName("end_title");
            endTitle.loadTexture("winGame/BL_jieshu.png");
            endTitle.ignoreContentAdaptWithSize(true);

            var _btnReplay =  _back.getChildByName("roundEndText");
            _btnReplay.setVisible(true);
        }
        var textNum =  _back.getChildByName("Text_num");
        var text3 =  _back.getChildByName("Text_3");
        var text5 =  _back.getChildByName("Text_5");
        UIEventBind(null,this,"leftTable",function(data){
            //num.setString(self._data.condition - data.signUpCount);
            textNum.setString(data.leftTable);
            textNum.setVisible(true);
            text3.setVisible(true);
            text5.setVisible(true);
        })

        //四个玩家的详细信息
        var infoBg = _back.getChildByName("infoBg"); 
        var infoBgSize = infoBg.getCustomSize();

        var info = infoBg.getChildByName("info");
        info.visible = false;
        var bgSize = info.getCustomSize();
        var sData = MjClient.data.sData;
        var players = sData.players;
        var playerCount = Object.keys(players).length;

        var startPos = cc.p((infoBgSize.width - bgSize.width*(playerCount - 1) - 8*(playerCount + 1))/2,infoBgSize.height/2);
        
        var clone = null;
        for(var i = 0 ; i < playerCount ; i++){
            clone = info.clone();
            clone.visible = true;
            clone.setPosition(startPos);
            infoBg.addChild(clone);
            SetGameOverLayer_paohuzi(clone,i);
            startPos = cc.p(startPos.x + bgSize.width + 18 , startPos.y);

            COMMON_UI.addGameOverNotSameClubUI(clone,MjClient.getPlayerByIndex(i))
        }
        return true;
    },
    onEnter:function()
    {
        this._super();
        if (MjClient.homeui && MjClient.systemConfig.rankEnable == "true")
        {
            MjClient.homeui.gameRankLayer();
        }
    }
});


//  牛十别大结算
var GameOverLayer_niushibie = cc.Layer.extend({
    sprite:null,
    jsBind:{
        back:{
            share:{
                img_shine:{
                    _visible:false
                },
                img_txt:{
                    _visible:false
                },
                img_point:{
                    _visible:false
                },
                _event:{
                    captureScreen_OK:function(){
                        if (MjClient.endallui.capture_screen != true)
                            return;
                        MjClient.endallui.capture_screen = false;
                        var writePath = jsb.fileUtils.getWritablePath();
                        var textrueName = "wxcapture_screen.png";
                        var savepath = writePath+textrueName;
                        MjClient.shareImageToSelectedPlatform(savepath);
                        this.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(function()
                        {
                            this.setTouchEnabled(true);
                        }.bind(this))));
                        if(MjClient.Scene.getChildByName("shareCode")) MjClient.Scene.removeChildByName("shareCode");
                    }
                }
            },
        }
    },
    ctor:function () {
        this._super();

        //牌友联盟江苏新UI大结算
        var _jsonPath = "endAll_NiuShiBie.json";
        var endallui = ccs.load(_jsonPath);
        BindUiAndLogic(endallui.node,this.jsBind);
        this.addChild(endallui.node);
        MjClient.endallui=this;

        var _block = endallui.node.getChildByName("block");
        setWgtLayout(_block,[1,1],[0.5,0.5],[0,0], true);

        var _bg = endallui.node.getChildByName("bg");
        if (_bg) {
            setWgtLayout(_bg, [1, 1], [0.5, 0.0], [0, 0]);
            _bg.height += (MjClient.size.height / _bg.scaleY - _bg.height) / 2;
        }

        var isNewUi = (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ  || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ);

        /*
            changed by sking
         */
        var _back = endallui.node.getChildByName("back");
        setWgtLayout(_back,[1,1],[0.5,0.5],[0,0]);
        //分享
        var _share =  _back.getChildByName("share");
        var tData = MjClient.data.sData.tData;
        _share.visible = !MjClient.remoteCfg.guestLogin && !tData.matchId;


        //_share.x = 713.24;//屏蔽再来一局的时候，坐标要移动一下
        _share.addTouchEventListener(function(sender,Type){
            switch (Type)
            {
                case ccui.Widget.TOUCH_ENDED:
                    if(isJinZhongAPPType()) {
                        ShareGameOverInfo()
                    } else {
                        MjClient.shareMultiPlatform(MjClient.systemConfig.sharePlatforms, function()
                        {
                            COMMON_UI.getShareCodeTexture(tData.tableInfoUrl,_back,function(){
                                cc.log("====================capture_screen=======================");
                                postEvent("capture_screen");
                                if(MjClient.endallui && cc.sys.isObjectValid(MjClient.endallui)){
                                    MjClient.endallui.capture_screen = true;
                                }
                                _share.setTouchEnabled(false);
                            });
                        });
                        MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Dajiesuanjiemian_Fenxiang",  {uid:SelfUid(),gameType:MjClient.gameType});
                    }
                    break;
                default :
                    break;
            }
        },this);
        var clubInfoTable = getClubInfoInTable();
        if (clubInfoTable && clubInfoTable.clubId) {
            _share.x = _share.getParent().width / 2;
        }
        var sData=MjClient.data.sData;
        var tData=sData.tData;
        var _difenText =  _back.getChildByName("Text_difen");
        if (_difenText) {
            _difenText.setString(" X "+tData.areaSelectMode.tonghua_difen)
        }

        // 如果是亲友圈的房间显示亲友圈图标及名称
        var image_title = _back.getChildByName("Image_title");
        var clubNode = _back.getChildByName("Image_club");

        if (clubInfoTable && typeof(clubInfoTable.clubAvatar) != "undefined" && clubInfoTable.clubId && clubNode != null)
        {
            if (image_title)
                image_title.setVisible(false);

            var clubName = clubNode.getChildByName("Text_name");
            clubName.ignoreContentAdaptWithSize(true);
            clubName.setString("" + unescape(clubInfoTable.clubTitle));

            var _nameStr = unescape(clubInfoTable.ruleName);
            var _ruleName = clubName.clone();
            _ruleName.ignoreContentAdaptWithSize(true);
            _ruleName.setString(_nameStr);
            _ruleName.y = clubName.y + clubName.height/2 + _ruleName.height/2;
            _ruleName.x = clubName.x;
            clubNode.addChild(_ruleName);
            cc.loader.loadImg(clubInfoTable.clubAvatar ? clubInfoTable.clubAvatar : "png/default_headpic.png", {
                isCrossOrigin: true
            }, function(err, texture) {
                if (err || !texture || !sys.isObjectValid(clubNode))
                    return;

                var sp = new cc.Sprite(texture);
                if (!sp)
                    return;

                sp.setScale((clubNode.width - 8) / sp.width);
                sp.setPosition(cc.p(clubNode.width / 2, clubNode.height / 2));
                clubNode.addChild(sp);
            });
        }
        else if (clubNode != null)
        {
            clubNode.setVisible(false);
        }

        //信息 说明
        var _infoMation =  _back.getChildByName("infoMation");
        _infoMation.visible = true;
        function _infoText(){
            var sData=MjClient.data.sData;
            var tData=sData.tData;
            var text ="";
            text += GameCnName[MjClient.gameType];

            if (isNewUi) {
                text += "-" + tData.maxPlayer + "人\n";
                var roundNumPre = typeof(tData.roundNumPre) != "undefined" ? tData.roundNumPre : tData.roundNum;
                text += "房号：" + tData.tableid
                if (roundNumPre && tData.roundAll - tData.roundNumPre + 1 <= tData.roundAll)
                    text += " 局数：" + (tData.roundAll - tData.roundNumPre + 1) + "/" + tData.roundAll;
                text += "\n";
                if(MjClient.roundEndTime)
                    text += MjClient.roundEndTime + "";
            } else {
                var strPayWay = "";
                switch (tData.areaSelectMode.payWay) {
                    case 0:
                        strPayWay = ",房主付";
                        break;
                    case 1:
                        strPayWay = ",AA付";
                        break;
                    case 2:
                        strPayWay = ",大赢家付";
                        break;
                }
                text += strPayWay;

                text += ",房间号:";
                text += tData.tableid;
                var clubInfoTable = getClubInfoInTable();
                if (clubInfoTable){
                    //需求：海安、晋中、南通 对于俱乐部牌局，在大结算、大结算分享图中，增加显示，亲友圈ID，并显示对应的玩法名称【是会长建立玩法时设定的玩法名称】
                    if(MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ ||
                        isJinZhongAPPType() ||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP ){
                        text += ",亲友圈ID:";
                        text += clubInfoTable.clubId;
                        if(clubInfoTable.ruleName){
                            text = text+"（"+unescape(clubInfoTable.ruleName)+"）";
                        }
                    }
                }

                if(MjClient.getAppType() != MjClient.APP_TYPE.QXTHMJ){
                    //描述结算
                    if (MjClient.isDismiss)
                    {
                        var id = tData.firstDel;
                        var pl = sData.players[id];
                        var delStr = "";
                        if(pl)
                        {
                            var name  =  unescape(pl.info.nickname );
                            delStr = name + pl.mjdesc[0];
                        }
                        else
                        {
                            // 系统、会长或管理员解散房间
                            pl = getUIPlayer(0);
                            if (pl)
                                delStr = pl.mjdesc[0];
                        }

                        text += "," + delStr;
                    }
                }
            }
            return text;
        }
        _infoMation.setString(_infoText());
        _infoMation.setFontName("Arial");
        _infoMation.setFontSize(_infoMation.getFontSize());

        if(MjClient.getAppType() == MjClient.APP_TYPE.QXTHMJ){
            var sData=MjClient.data.sData;
            var tData=sData.tData;
            var _infoMation_2 =  _back.getChildByName("infoMation_2");
            var per = "";
            var id = tData.firstDel;
            var pl = sData.players[id];
            if (MjClient.isDismiss)
            {
                if ( pl &&  pl.mjdesc[0]) {
                    var name  =  unescape(pl.info.nickname );
                    var delStr = name + pl.mjdesc[0];
                    per += delStr;
                }
            }

            _infoMation_2.setString(per);
            _infoMation_2.ignoreContentAdaptWithSize(true);
            _infoMation_2.setFontName("Arial");
            _infoMation_2.setFontSize(_infoMation_2.getFontSize());

        }


        //时间
        var _time =  _back.getChildByName("time");
        _time.visible = true;
        _time.setString("");

        if (isNewUi) {
            if (MjClient.getAppType() != MjClient.APP_TYPE.QXTHMJ) {
                //描述结算
                if (MjClient.isDismiss) {
                    var id = tData.firstDel;
                    var pl = sData.players[id];
                    var delStr = "";
                    if(pl)
                    {
                        var name  =  unescape(pl.info.nickname );
                        delStr = name + pl.mjdesc[0];
                    }
                    else
                    {
                        // 系统、会长或管理员解散房间
                        pl = getUIPlayer(0);
                        if (pl)
                            delStr = pl.mjdesc[0];
                    }
                    _time.setString(delStr);
                }
            }
        } else {
            cc.log("===============MjClient.roundEndTime = " + MjClient.roundEndTime);
            if(MjClient.roundEndTime)
                _time.setString(""+MjClient.roundEndTime);
        }


        var nantongReplay = function() {
            var tData = MjClient.data.sData.tData;
            var para = tData.areaSelectMode;
            var inviteVipTable = MjClient.data.inviteVipTable;
            para.maxPlayer = tData.maxPlayer;
            para.gameType = tData.gameType;

            MjClient.showMsg("是否再来一局？", function () {
                MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Zailaiyiju", {uid:SelfUid(),gameType:para.gameType});
                if (inviteVipTable)
                {
                    MjClient.joinGame(inviteVipTable, null, false, para.gameType);
                }
                else
                {
                    MjClient.createRoom(para, tData.roundAll, tData.areaSelectMode.payWay, function (rtn)
                    {
                        if(rtn.result==0)
                        {
                            MjClient.rematchInfo(MjClient.data.vipTable, tData.uids);
                        }
                    });
                }
            }, function(){}, "1", "nantongReplay");
        };

        //close ,关闭
        var _close1 =  _back.getChildByName("close");
        _close1.addTouchEventListener(function(sender,Type){
            switch (Type)
            {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Tuichu", {uid:SelfUid(),gameType:MjClient.gameType});
                    if(MjClient.Scene.getChildByName("shareCode")) MjClient.Scene.removeChildByName("shareCode");

                    var clubInfoTable = getClubInfoInTable();
                    if (clubInfoTable) {
                        if (!MjClient.FriendCard_main_ui)
                            MjClient.Scene.addChild(new FriendCard_main(clubInfoTable.clubId));
                    }

                    //MjClient.leaveGame();
                    //这里的leaveGame肯定会返回{"result":0,"msg":"alreadyLeave"}，所以不用等待返回后再继续
                    //MjClient.native.doCopyToPasteBoard("");//清空剪切板
                    MjClient.gamenet.request("pkplayer.handler.LeaveGame",{},function(rtn){});
                    delete MjClient.data.sData;
                    delete MjClient.gameType;
                    postEvent("LeaveGame");
                    if (MjClient.enterui)
                    {
                        MjClient.enterui.removeFromParent(true);
                        MjClient.enterui = null;
                    }

                    if (MjClient.createui)
                    {
                        MjClient.createui.removeFromParent(true);
                        MjClient.createui = null;
                    }

                    if(MjClient.endallui){
                        MjClient.endallui.removeFromParent(true);
                        MjClient.endallui = null;
                    }

                    if(cc.sys.isObjectValid(MjClient.goldMatchingui)){
                        MjClient.goldMatchingui.removeFromParent();
                        delete  MjClient.goldMatchingui;
                    }

                    break;
                default :
                    break;
            }
        },this);



        //再来一局
        var _btnReplay =  _back.getChildByName("btnReplay");
        var tData = MjClient.data.sData.tData;
        _btnReplay.visible = !MjClient.remoteCfg.guestLogin && !tData.matchId;

        if(MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ  || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ){
            _btnReplay.visible = false;  //屏蔽再来一局
        }

        if (MjClient.getAppType() != MjClient.APP_TYPE.QXTHMJ)
        {
            var clubInfoTable = getClubInfoInTable();
            if (clubInfoTable)
            {
                _btnReplay.visible = false;
                _share.x = _share.getParent().width / 2;
            }
        }

        _btnReplay.addTouchEventListener(function(sender,Type){
            switch (Type)
            {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Dajiesuanjiemian_Zailaiyiju", {uid:SelfUid(),gameType:MjClient.gameType});
                    if (MjClient.data.inviteVipTable)
                    {
                        MjClient.leaveGame(function()
                        {
                            MjClient.joinGame(MjClient.data.inviteVipTable, null, false, MjClient.gameType);
                        });
                    }
                    else
                    {
                        MjClient.reCreateRoom();
                    }
                    break;
                default :
                    break;
            }
        },this);

        // 显示复制按钮
        addCopyBtnToGameOverLayer(endallui.node);

        var self = this;
        if(tData.matchId){
            _close1.setVisible(false);
            function delayExe()
            {
                self.addChild(new roundEndLayer(),500);
            }
            this.runAction(cc.sequence(cc.DelayTime(3),cc.callFunc(delayExe)));
            var endTitle = _back.getChildByName("end_title");
            endTitle.loadTexture("winGame/BL_jieshu.png");
            endTitle.ignoreContentAdaptWithSize(true);

        }
        var textNum =  _back.getChildByName("Text_num");
        var text3 =  _back.getChildByName("Text_3");
        var text5 =  _back.getChildByName("Text_5");
        cc.log("=================leftTable====");
        UIEventBind(null,this,"leftTable",function(data){
            textNum.setString(data.leftTable);
            textNum.setVisible(true);
            text3.setVisible(true);
            text5.setVisible(true);
        })
        cc.log("=============1===  kkkk =leftTable====");

        //根据分队规则
        var teamIndex = [0,1,2,3];
        if (tData.areaSelectMode.teammode == 2)
        {//如果是铁队
            var ImageVS = _back.getChildByName("ImageVS");
            ImageVS.visible = true;
            teamIndex = [0,2,1,3];
            //移动位置
            var head1 = _back.getChildByName("head" + 1);
            var head2 = _back.getChildByName("head" + 2);
            head1.setPositionX(head1.getPositionX()-50);
            head2.setPositionX(head2.getPositionX()+50);
        }

        //四个玩家的详细信息
        for(var i = 0 ; i < 4 ; i++)
        {
            var player =   _back.getChildByName("head" + i);
            SetGameOverLayer_niushibie(player,teamIndex[i]);

            COMMON_UI.addGameOverNotSameClubUI(player,MjClient.getPlayerByIndex(teamIndex[i]))
        }

        cc.log("=============2===leftTable====");
        return true;
    },
    onEnter:function()
    {
        this._super();
        if (MjClient.homeui && MjClient.systemConfig.rankEnable == "true")
        {
            MjClient.homeui.gameRankLayer();
        }
    }
});

//  打码子大结算
var GameOverLayer_damazi = cc.Layer.extend({
    sprite:null,
    jsBind:{
        back:{
            share:{
                img_shine:{
                    _visible:false
                },
                img_txt:{
                    _visible:false
                },
                img_point:{
                    _visible:false
                },
                _event:{
                    captureScreen_OK:function(){
                        if (MjClient.endallui.capture_screen != true)
                            return;
                        MjClient.endallui.capture_screen = false;
                        var writePath = jsb.fileUtils.getWritablePath();
                        var textrueName = "wxcapture_screen.png";
                        var savepath = writePath+textrueName;
                        MjClient.shareImageToSelectedPlatform(savepath);
                        this.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(function()
                        {
                            this.setTouchEnabled(true);
                        }.bind(this))));
                        if(MjClient.Scene.getChildByName("shareCode")) MjClient.Scene.removeChildByName("shareCode");
                    }
                }
            },
        }
    },
    ctor:function () {
        this._super();

        //牌友联盟江苏新UI大结算
        var _jsonPath = "endAll_DaMaZi.json";
        var endallui = ccs.load(_jsonPath);
        BindUiAndLogic(endallui.node,this.jsBind);
        this.addChild(endallui.node);
        MjClient.endallui=this;

        var _block = endallui.node.getChildByName("block");
        setWgtLayout(_block,[1,1],[0.5,0.5],[0,0], true);

        var _bg = endallui.node.getChildByName("bg");
        if (_bg) {
            setWgtLayout(_bg, [1, 1], [0.5, 0.0], [0, 0]);
            _bg.height += (MjClient.size.height / _bg.scaleY - _bg.height) / 2;
        }

        var isNewUi = (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP ||  MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ  || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ);

        /*
            changed by sking
         */
        var _back = endallui.node.getChildByName("back");
        setWgtLayout(_back,[1,1],[0.5,0.5],[0,0]);
        //分享
        var _share =  _back.getChildByName("share");
        var tData = MjClient.data.sData.tData;
        _share.visible = !MjClient.remoteCfg.guestLogin && !tData.matchId;

        //_share.x = 713.24;//屏蔽再来一局的时候，坐标要移动一下
        _share.addTouchEventListener(function(sender,Type){
            switch (Type)
            {
                case ccui.Widget.TOUCH_ENDED:
                    if(isJinZhongAPPType()) {
                        ShareGameOverInfo()
                    } else {
                        MjClient.shareMultiPlatform(MjClient.systemConfig.sharePlatforms, function()
                        {
                            COMMON_UI.getShareCodeTexture(tData.tableInfoUrl,_back,function(){
                                cc.log("====================capture_screen=======================");
                                postEvent("capture_screen");
                                if(MjClient.endallui && cc.sys.isObjectValid(MjClient.endallui)){
                                    MjClient.endallui.capture_screen = true;
                                }
                                _share.setTouchEnabled(false);
                            });
                        });
                        MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Fanxiang",  {uid:SelfUid(),gameType:MjClient.gameType});
                    }
                    break;
                default :
                    break;
            }
        },this);
        var clubInfoTable = getClubInfoInTable();


        if (clubInfoTable && clubInfoTable.clubId) {
            _share.x = _share.getParent().width / 2;
        }
        var sData=MjClient.data.sData;
        var tData=sData.tData;
        var _difenText =  _back.getChildByName("Text_difen");
        if (_difenText) {
            _difenText.setString(" X "+tData.areaSelectMode.tonghua_difen)
        }
        // 如果是亲友圈的房间显示亲友圈图标及名称
        var image_title = _back.getChildByName("Image_title");
        var clubNode = _back.getChildByName("Image_club");
        if (clubInfoTable && typeof(clubInfoTable.clubAvatar) != "undefined" && clubInfoTable.clubId && clubNode != null)
        {
            if (image_title)
                image_title.setVisible(false);

            var clubName = clubNode.getChildByName("Text_name");
            clubName.ignoreContentAdaptWithSize(true);
            clubName.setString("" + unescape(clubInfoTable.clubTitle));
            
            var _nameStr = unescape(clubInfoTable.ruleName);
            var _ruleName = clubName.clone();
            _ruleName.ignoreContentAdaptWithSize(true);
            _ruleName.setString(_nameStr);
            _ruleName.y = clubName.y + clubName.height/2 + _ruleName.height/2;
            _ruleName.x = clubName.x;
            clubNode.addChild(_ruleName);
            cc.loader.loadImg(clubInfoTable.clubAvatar ? clubInfoTable.clubAvatar : "png/default_headpic.png", {
                isCrossOrigin: true
            }, function(err, texture) {
                if (err || !texture || !sys.isObjectValid(clubNode))
                    return;

                var sp = new cc.Sprite(texture);
                if (!sp)
                    return;

                sp.setScale((clubNode.width - 8) / sp.width);
                sp.setPosition(cc.p(clubNode.width / 2, clubNode.height / 2));
                clubNode.addChild(sp);
            });
        }
        else if (clubNode != null)
        {
            clubNode.setVisible(false);
        }

        //信息 说明
        var _infoMation =  _back.getChildByName("infoMation");
        _infoMation.visible = true;
        function _infoText(){
            var sData=MjClient.data.sData;
            var tData=sData.tData;
            var text ="";
            text += GameCnName[MjClient.gameType];

            if (isNewUi) {
                text += "-" + tData.maxPlayer + "人\n";
                var roundNumPre = typeof(tData.roundNumPre) != "undefined" ? tData.roundNumPre : tData.roundNum;
                text += "房号：" + tData.tableid
                if (roundNumPre && tData.roundAll - tData.roundNumPre + 1 <= tData.roundAll)
                    text += " 局数：" + (tData.roundAll - tData.roundNumPre + 1) + "/" + tData.roundAll;
                text += "\n";
                if(MjClient.roundEndTime)
                    text += MjClient.roundEndTime + "";
            } else {
                var strPayWay = "";
                switch (tData.areaSelectMode.payWay) {
                    case 0:
                        strPayWay = ",房主付";
                        break;
                    case 1:
                        strPayWay = ",AA付";
                        break;
                    case 2:
                        strPayWay = ",大赢家付";
                        break;
                }
                text += strPayWay;

                text += ",房间号:";
                text += tData.tableid;

                if (clubInfoTable && clubInfoTable.clubId){
                    //需求：海安、晋中、南通 对于俱乐部牌局，在大结算、大结算分享图中，增加显示，亲友圈ID，并显示对应的玩法名称【是会长建立玩法时设定的玩法名称】
                    if(MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ ||
                        isJinZhongAPPType() ||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP ){
                        text += ",亲友圈ID:";
                        text += clubInfoTable.clubId;
                        if(clubInfoTable.ruleName){
                            text = text+"（"+unescape(clubInfoTable.ruleName)+"）";
                        }
                    }
                }

                if(MjClient.getAppType() != MjClient.APP_TYPE.QXTHMJ){
                    //描述结算
                    if (MjClient.isDismiss)
                    {
                        var id = tData.firstDel;
                        var pl = sData.players[id];
                        var delStr = "";
                        if(pl)
                        {
                            var name  =  unescape(pl.info.nickname );
                            delStr = name + pl.mjdesc[0];
                        }
                        else
                        {
                            // 系统、会长或管理员解散房间
                            pl = getUIPlayer(0);
                            if (pl)
                                delStr = pl.mjdesc[0];
                        }

                        text += "," + delStr;
                    }
                }
            }
            return text;
        }
        _infoMation.setString(_infoText());
        _infoMation.setFontName("Arial");
        _infoMation.setFontSize(_infoMation.getFontSize());

        if(MjClient.getAppType() == MjClient.APP_TYPE.QXTHMJ){
            var sData=MjClient.data.sData;
            var tData=sData.tData;
            var _infoMation_2 =  _back.getChildByName("infoMation_2");
            var per = "";
            var id = tData.firstDel;
            var pl = sData.players[id];
            if (MjClient.isDismiss)
            {
                if ( pl &&  pl.mjdesc[0]) {
                    var name  =  unescape(pl.info.nickname );
                    var delStr = name + pl.mjdesc[0];
                    per += delStr;
                }
            }

            _infoMation_2.setString(per);
            _infoMation_2.ignoreContentAdaptWithSize(true);
            _infoMation_2.setFontName("Arial");
            _infoMation_2.setFontSize(_infoMation_2.getFontSize());

        }


        //时间
        var _time =  _back.getChildByName("time");
        _time.visible = true;
        _time.setString("");

        if (isNewUi) {
            if (MjClient.getAppType() != MjClient.APP_TYPE.QXTHMJ) {
                //描述结算
                if (MjClient.isDismiss) {
                    var id = tData.firstDel;
                    var pl = sData.players[id];
                    var delStr = "";
                    if(pl)
                    {
                        var name  =  unescape(pl.info.nickname );
                        delStr = name + pl.mjdesc[0];
                    }
                    else
                    {
                        // 系统、会长或管理员解散房间
                        pl = getUIPlayer(0);
                        if (pl)
                            delStr = pl.mjdesc[0];
                    }
                    _time.setString(delStr);
                }
            }
        } else {
            cc.log("===============MjClient.roundEndTime = " + MjClient.roundEndTime);
            if(MjClient.roundEndTime)
                _time.setString(""+MjClient.roundEndTime);
        }


        var nantongReplay = function() {
            var tData = MjClient.data.sData.tData;
            var para = tData.areaSelectMode;
            var inviteVipTable = MjClient.data.inviteVipTable;
            para.maxPlayer = tData.maxPlayer;
            para.gameType = tData.gameType;

            MjClient.showMsg("是否再来一局？", function () {
                MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Zailaiyiju", {uid:SelfUid(),gameType:para.gameType});
                if (inviteVipTable)
                {
                    MjClient.joinGame(inviteVipTable, null, false, para.gameType);
                }
                else
                {
                    MjClient.createRoom(para, tData.roundAll, tData.areaSelectMode.payWay, function (rtn)
                    {
                        if(rtn.result==0)
                        {
                            MjClient.rematchInfo(MjClient.data.vipTable, tData.uids);
                        }
                    });
                }
            }, function(){}, "1", "nantongReplay");
        };

        //close ,关闭
        var _close1 =  _back.getChildByName("close");
        _close1.addTouchEventListener(function(sender,Type){
            switch (Type)
            {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Tuichu", {uid:SelfUid(),gameType:MjClient.gameType});
                    if(MjClient.Scene.getChildByName("shareCode")) MjClient.Scene.removeChildByName("shareCode");

                    var clubInfoTable = getClubInfoInTable();
                    if (clubInfoTable) {
                        if (!MjClient.FriendCard_main_ui)
                            MjClient.Scene.addChild(new FriendCard_main(clubInfoTable.clubId));
                    }

                    //MjClient.leaveGame();
                    //这里的leaveGame肯定会返回{"result":0,"msg":"alreadyLeave"}，所以不用等待返回后再继续
                    //MjClient.native.doCopyToPasteBoard("");//清空剪切板
                    MjClient.gamenet.request("pkplayer.handler.LeaveGame",{},function(rtn){});
                    delete MjClient.data.sData;
                    delete MjClient.gameType;
                    postEvent("LeaveGame");
                    if (MjClient.enterui)
                    {
                        MjClient.enterui.removeFromParent(true);
                        MjClient.enterui = null;
                    }

                    if (MjClient.createui)
                    {
                        MjClient.createui.removeFromParent(true);
                        MjClient.createui = null;
                    }

                    if(MjClient.endallui){
                        MjClient.endallui.removeFromParent(true);
                        MjClient.endallui = null;
                    }

                    if(cc.sys.isObjectValid(MjClient.goldMatchingui)){
                        MjClient.goldMatchingui.removeFromParent();
                        delete  MjClient.goldMatchingui;
                    }

                    break;
                default :
                    break;
            }
        },this);



        //再来一局
        var _btnReplay =  _back.getChildByName("btnReplay");
        var tData = MjClient.data.sData.tData;
        _btnReplay.visible = !MjClient.remoteCfg.guestLogin && !tData.matchId;

        if(MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ  || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ){
            _btnReplay.visible = false;  //屏蔽再来一局
        }

        if (MjClient.getAppType() != MjClient.APP_TYPE.QXTHMJ)
        {
            var clubInfoTable = getClubInfoInTable();
            if (clubInfoTable)
            {
                _btnReplay.visible = false;
                _share.x = _share.getParent().width / 2;
            }
        }

        _btnReplay.addTouchEventListener(function(sender,Type){
            switch (Type)
            {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Zailaiyiju", {uid:SelfUid(),gameType:MjClient.gameType});
                    if (MjClient.data.inviteVipTable)
                    {
                        MjClient.leaveGame(function()
                        {
                            MjClient.joinGame(MjClient.data.inviteVipTable, null, false, MjClient.gameType);
                        });
                    }
                    else
                    {
                        MjClient.reCreateRoom();
                    }
                    break;
                default :
                    break;
            }
        },this);

        // 显示复制按钮
        addCopyBtnToGameOverLayer(endallui.node);

        var self = this;
        if(tData.matchId){
            _close1.setVisible(false);
            function delayExe()
            {
                self.addChild(new roundEndLayer(),500);
            }
            this.runAction(cc.sequence(cc.DelayTime(3),cc.callFunc(delayExe)));
            var endTitle = _back.getChildByName("end_title");
            endTitle.loadTexture("winGame/BL_jieshu.png");
            endTitle.ignoreContentAdaptWithSize(true);

        }
        var textNum =  _back.getChildByName("Text_num");
        var text3 =  _back.getChildByName("Text_3");
        var text5 =  _back.getChildByName("Text_5");
        cc.log("=================leftTable====");
        UIEventBind(null,this,"leftTable",function(data){
            textNum.setString(data.leftTable);
            textNum.setVisible(true);
            text3.setVisible(true);
            text5.setVisible(true);
        })
        cc.log("=============1  jjjj ====leftTable====");

        //根据分队规则
        var teamIndex = [0,1,2,3];
        if (tData.areaSelectMode.teammode == 2)
        {//如果是铁队
            var ImageVS = _back.getChildByName("ImageVS");
            ImageVS.visible = true;
            teamIndex = [0,2,1,3];
            //移动位置
            var head1 = _back.getChildByName("head" + 1);
            var head2 = _back.getChildByName("head" + 2);
            head1.setPositionX(head1.getPositionX()-50);
            head2.setPositionX(head2.getPositionX()+50);
        }

        //四个玩家的详细信息
        for(var i = 0 ; i < 4 ; i++)
        {
            var player =   _back.getChildByName("head" + i);
            SetGameOverLayer_damazi(player,teamIndex[i]);

            COMMON_UI.addGameOverNotSameClubUI(player,MjClient.getPlayerByIndex(teamIndex[i]))
        }

        cc.log("=============2===leftTable====");
        return true;
    },
    onEnter:function()
    {
        this._super();
        if (MjClient.homeui && MjClient.systemConfig.rankEnable == "true")
        {
            MjClient.homeui.gameRankLayer();
        }
    }
});

// 邵阳麻将大结算_new
function SetGameOverLayer_QXSYDTZ(node,off)
{
    if(!node) return;
    var sData=MjClient.data.sData;
    var tData=sData.tData;
    var pl=MjClient.getPlayerByIndex(off);
    node.setVisible(false);
    if(!pl)
    {
        return;
    }
    node.setVisible(true);
    var uidSelf = SelfUid();
    var MaxWinAll=0;
    var MaxDianPao=0;
    var bPaoWang = false;
    var MaxlosePlayer = null;
    var MaxWinPlayer = null;
    var MaxloseAll = 999999999;

    //计算所有人数据
    for (var uid in sData.players) {
        var pi = sData.players[uid];
        if (pi) {
            if (MaxWinAll < pi.winall) {
                MaxWinAll = pi.winall;
                MaxWinPlayer = uid;

            }else if (MaxWinAll == pi.winall) {
                if (parseInt(uid) < parseInt(MaxWinPlayer)) {
                    MaxWinAll = pi.winall;
                    MaxWinPlayer = uid;
                }
            }
            if (pi.winall < MaxloseAll) {
                MaxloseAll = pi.winall;
                MaxlosePlayer = uid;
            }else if (pi.winall == MaxloseAll) {
                if (parseInt(uid) < parseInt(MaxlosePlayer)) {
                    MaxloseAll = pi.winall;
                    MaxlosePlayer = uid;
                }
            }
        }
    }
    //最大点炮数
    for (var uid in sData.players) {
        var pi = sData.players[uid];
        if(pi)
        {
            MaxDianPao = MaxDianPao>pi.dianpaoTotal?MaxDianPao:pi.dianpaoTotal;
        }
    }


    //计算炮王
    var _paowangArray = [];
    var _paoScore = 9999;
    for (var uid in sData.players) {
        var pi = sData.players[uid];
        if(pi)
        {
            if(MaxDianPao == pi.dianpaoTotal)
            {
                if(pi.winall <= _paoScore)
                {
                    _paoScore = pi.winall;
                    //_paowangArray.push(pi.info.uid);
                }
            }
        }
    }

    //存点炮王的数组
    for (var uid in sData.players) {
        var pi = sData.players[uid];
        if(pi)
        {
            if(MaxDianPao == pi.dianpaoTotal)
            {
                if(pi.winall <= _paoScore)
                {
                    _paowangArray.push(pi.info.uid);
                }
            }
        }
    }

    cc.log("===================_paowangArray =11111 " + JSON.stringify(_paowangArray));

    //是否是炮王
    if(_paowangArray.indexOf(pl.info.uid)>=0)
    {
        bPaoWang = true;
    }

    //根据输赢设置背景底板颜色
    function setPlayerBg()
    {
        var _bgNode = node.getChildByName("bg");
        var _name = node.getChildByName("name");
        var _id = node.getChildByName("id");

        if(MaxWinAll !=0 && MaxWinAll == pl.winall )//大赢家
        {
            _bgNode.loadTexture("gameOver/over_box_1.png"); 
        }
    }


    if(off == 0){
        // jieSanIcon
        var jieSanIcon = node.getChildByName("jieSanIcon");
        jieSanIcon.setVisible(MjClient.isDismiss)

    }


    var uibind={
        name:{
            _run: function() {
                this.ignoreContentAdaptWithSize(true);
                this.setFontName("Arial");
                this.setFontSize(this.getFontSize());
            },
            _text: function() {
                return getNewName(unescape(pl.info.nickname) + "");
            }
        },
        id: {
            _run:function()
            {
                this.ignoreContentAdaptWithSize(true);
            },
            _text: function () {
                return "ID:" + pl.info.uid.toString();
            }
        },
        winNode:{
            winNum:{
            },
            bigWinner:{
                _visible : false
            }
        },
        lastNode:{
            winNum1:{},
            winNum2:{},
        },
        normalNode:{
            winNum1:{},
            winNum2:{},
        },
        statistc:{
            item0:{
                _run:function()
                {
                    this.ignoreContentAdaptWithSize(true);
                },
                _text: function () {
                    console.log("=====doomsky say:pl.zimoTotal======", pl.zimoTotal);
                    if(pl.roomStatisticsDesc && typeof pl.roomStatisticsDesc[0] == 'string') return pl.roomStatisticsDesc[0] + "";

                    if (MjClient.gameType == MjClient.GAME_TYPE.MJ_ZHUO_XIA_ZI) 
                    {
                        return "大胡自摸";
                    }
                    else{
                        return "自摸次数";
                    }
                },
                Text:{
                    _text: function () {
                        if (pl.roomStatisticsDesc && typeof pl.roomStatisticsDesc[0] == 'string') {
                            return pl.roomStatistics[0] + "";
                        }
                        if (MjClient.gameType == MjClient.GAME_TYPE.MJ_ZHUO_XIA_ZI) 
                        {
                            return pl.dahuzimoTotal > 0 ? pl.dahuzimoTotal+ "": "0";
                        }
                        return pl.zimoTotal > 0 ? pl.zimoTotal + "" : "0";
                    },
                    _run:function() {
                        var childTex = this.getParent().getChildByName("Text_0");
                        childTex.ignoreContentAdaptWithSize(true);
                        childTex.setString(this.getString());
                        if (this.getParent().getString() == "") {
                            this.visible = false;
                            childTex.visible = false;
                        }
                        if(MaxWinAll != 0 && MaxWinAll == pl.winall )//大赢家
                        {
                            this.visible = false;
                            childTex.visible = true;
                        }
                        else {
                            this.visible = true;
                            childTex.visible = false;
                        }
                        this.ignoreContentAdaptWithSize(true);
                    },
                },
            },

            item1:{
                _run:function()
                {
                    this.ignoreContentAdaptWithSize(true);
                },
                _text: function () {
                    if(pl.roomStatisticsDesc && typeof pl.roomStatisticsDesc[1] == 'string') return pl.roomStatisticsDesc[1] + "";

                    if (MjClient.gameType == MjClient.GAME_TYPE.MJ_ZHUO_XIA_ZI) 
                    {
                        return "小胡自摸";
                    }
                    else{
                        return "点炮次数";
                    }
                    
                },
                Text:{
                    _text: function () {
                        if (pl.roomStatisticsDesc && typeof pl.roomStatisticsDesc[1] == 'string') {
                            return pl.roomStatistics[1] + "";
                        }
                        if (MjClient.gameType == MjClient.GAME_TYPE.MJ_ZHUO_XIA_ZI) 
                        {
                            return pl.xiaohuzimoTotal > 0 ? pl.xiaohuzimoTotal+ "": "0";
                        }
                        return pl.dianpaoTotal > 0 ? pl.dianpaoTotal + "" : "0";
                    },
                    _run:function() {
                        var childTex = this.getParent().getChildByName("Text_0");
                        childTex.ignoreContentAdaptWithSize(true);
                        childTex.setString(this.getString());
                        if (this.getParent().getString() == "") {
                            this.visible = false;
                            childTex.visible = false;
                        }
                        if(MaxWinAll != 0 && MaxWinAll == pl.winall )//大赢家
                        {
                            this.visible = false;
                            childTex.visible = true;
                        }
                        else {
                            this.visible = true;
                            childTex.visible = false;
                        }
                        this.ignoreContentAdaptWithSize(true);
                    },
                },
            },
            item2:{
                _run:function()
                {
                    this.ignoreContentAdaptWithSize(true);
                },
                _text: function () {
                    if(pl.roomStatisticsDesc && typeof pl.roomStatisticsDesc[2] == 'string') return pl.roomStatisticsDesc[2] + "";
                    if (MjClient.gameType === MjClient.GAME_TYPE.TONG_HUA ||
                        MjClient.gameType === MjClient.GAME_TYPE.XU_PU_LAO_PAI ||
                        MjClient.gameType === MjClient.GAME_TYPE.MJ_ZHUO_XIA_ZI)
                        return "接炮次数";
                    else
                        return "暗杠次数";
                },
                Text:{
                    _text: function () {
                        if (pl.roomStatisticsDesc && typeof pl.roomStatisticsDesc[2] == 'string') {
                            return pl.roomStatistics[2] + "";
                        }


                        if (MjClient.gameType === MjClient.GAME_TYPE.TONG_HUA ||
                            MjClient.gameType === MjClient.GAME_TYPE.MJ_ZHUO_XIA_ZI ||
                            MjClient.gameType === MjClient.GAME_TYPE.XU_PU_LAO_PAI)
                            return pl.jiepaoTotal > 0 ? pl.jiepaoTotal + "" : "0";
                        else
                            return pl.angangTotal > 0 ? pl.angangTotal + "" : "0";
                    },
                    _run:function() {
                        var childTex = this.getParent().getChildByName("Text_0");
                        childTex.ignoreContentAdaptWithSize(true);
                        childTex.setString(this.getString());
                        if (this.getParent().getString() == "") {
                            this.visible = false;
                            childTex.visible = false;
                        }
                        if(MaxWinAll != 0 && MaxWinAll == pl.winall )//大赢家
                        {
                            this.visible = false;
                            childTex.visible = true;
                        }
                        else {
                            this.visible = true;
                            childTex.visible = false;
                        }
                        this.ignoreContentAdaptWithSize(true);
                    },
                },
            },
            item3:{
                _run:function()
                {
                    this.ignoreContentAdaptWithSize(true);
                },
                _text: function () {
                    if(pl.roomStatisticsDesc && typeof pl.roomStatisticsDesc[3] == 'string') return pl.roomStatisticsDesc[3] + "";
                    console.log("=====doomsky say:pl.angangTotal======", pl.angangTotal);
                    if (MjClient.gameType == MjClient.GAME_TYPE.TONG_HUA)
                        return "暗蛋次数";
                    else if (MjClient.gameType == MjClient.GAME_TYPE.MJ_ZHUO_XIA_ZI) 
                    {
                        return "点炮次数";
                    }
                    else if(MjClient.gameType === MjClient.GAME_TYPE.XU_PU_LAO_PAI){
                        return "";
                    }
                    else
                        return "明杠次数";
                },
                Text:{
                    _text: function () {
                        if (pl.roomStatisticsDesc && typeof pl.roomStatisticsDesc[3] == 'string') {
                            return pl.roomStatistics[3] + "";
                        }

                        if(MjClient.gameType === MjClient.GAME_TYPE.XU_PU_LAO_PAI){
                            return "";
                        }
                        
                        if (MjClient.gameType == MjClient.GAME_TYPE.MJ_ZHUO_XIA_ZI) 
                        {
                            return pl.dianpaoTotal > 0 ? pl.dianpaoTotal+ "": "0";
                        }

                        if (MjClient.gameType == MjClient.GAME_TYPE.TONG_HUA)
                            return pl.angangTotal > 0 ? pl.angangTotal + "" : "0";
                        else
                            return pl.minggangTotal > 0 ? pl.minggangTotal + "" : "0";
                    },
                    _run:function() {
                        var childTex = this.getParent().getChildByName("Text_0");
                        childTex.ignoreContentAdaptWithSize(true);
                        childTex.setString(this.getString());
                        if (this.getParent().getString() == "") {
                            this.visible = false;
                            childTex.visible = false;
                        }
                        if(MaxWinAll != 0 && MaxWinAll == pl.winall )//大赢家
                        {
                            this.visible = false;
                            childTex.visible = true;
                        }
                        else {
                            this.visible = true;
                            childTex.visible = false;
                        }
                        this.ignoreContentAdaptWithSize(true);
                    },
                },
            },
            item4:{
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                },
                _text: function () {
                    if(pl.roomStatisticsDesc && typeof pl.roomStatisticsDesc[4] == 'string') return pl.roomStatisticsDesc[4] + "";
                    console.log("=====doomsky say:pl.minggangTotal======", pl.minggangTotal);
                    if (MjClient.gameType == MjClient.GAME_TYPE.TONG_HUA)
                        return "明蛋次数";
                    else if(MjClient.gameType == MjClient.GAME_TYPE.TY_ZHUANZHUAN
                        && (MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ || MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG)){
                        return "接炮次数";
                    }
                    else
                        return "";
                    //return "明杠次数          " + (pl.minggangTotal  > 0? pl.minggangTotal +"":"0" );
                },
                Text:{
                    _text: function () {
                        if (pl.roomStatisticsDesc && typeof pl.roomStatisticsDesc[4] == 'string') {
                            return pl.roomStatistics[4] + "";
                        }
                        if (MjClient.gameType == MjClient.GAME_TYPE.TONG_HUA)
                            return pl.minggangTotal > 0 ? pl.minggangTotal + "" : "0";
                        if(MjClient.gameType == MjClient.GAME_TYPE.TY_ZHUANZHUAN
                            && (MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ || MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG)){
                            return pl.jiepaoTotal  > 0? pl.jiepaoTotal +"":"0";
                        }
                    },
                    _run:function() {
                        var childTex = this.getParent().getChildByName("Text_0");
                        childTex.ignoreContentAdaptWithSize(true);
                        childTex.setString(this.getString());
                        if (this.getParent().getString() == "") {
                            this.visible = false;
                            childTex.visible = false;
                        }
                        if(MaxWinAll != 0 && MaxWinAll == pl.winall )//大赢家
                        {
                            this.visible = false;
                            childTex.visible = true;
                        }
                        else {
                            this.visible = true;
                            childTex.visible = false;
                        }
                        this.ignoreContentAdaptWithSize(true);
                    },
                },
            },
            item5:{
                _run:function()
                {
                    this.ignoreContentAdaptWithSize(true);
                    if(pl.roomStatisticsDesc && typeof pl.roomStatisticsDesc[5] == 'string') this.visible = true;
                },
                _text: function () {
                    if(pl.roomStatisticsDesc && typeof pl.roomStatisticsDesc[5] == 'string') return pl.roomStatisticsDesc[5] + "";
                    
                    //return "旋风杠次数：" +  (pl.xuanfenggangTotal  > 0? pl.xuanfenggangTotal +"":"0" );
                    return "";
                },
                Text:{
                    _text: function () {
                        if (pl.roomStatisticsDesc && typeof pl.roomStatisticsDesc[5] == 'string') {
                            return pl.roomStatistics[5] + "";
                        }
                    },
                    _run:function() {
                        var childTex = this.getParent().getChildByName("Text_0");
                        childTex.ignoreContentAdaptWithSize(true);
                        childTex.setString(this.getString());
                        if (this.getParent().getString() == "") {
                            this.visible = false;
                            childTex.visible = false;
                        }
                        if(MaxWinAll != 0 && MaxWinAll == pl.winall )//大赢家
                        {
                            this.visible = false;
                            childTex.visible = true;
                        }
                        else {
                            this.visible = true;
                            childTex.visible = false;
                        }
                        this.ignoreContentAdaptWithSize(true);
                    },
                },
            },
        },
    }

    // setUserOfflineWinGamePanel(node,pl);

    // 显示玩家头像
    var head = node.getChildByName("head");
    CircularCuttingHeadImg(head, pl);
    setUserOfflineWinGamePanel(node,pl);

    BindUiAndLogic(node,uibind);

    var numValue = Math.abs(pl.winall) + "";
    var nodeParent = node.getParent();
    var _share = nodeParent.getChildByName("share");
    var _shine = _share.getChildByName("img_shine");
    var _point = _share.getChildByName("img_point");
    var _txt = _share.getChildByName("img_txt");


    setPlayerBg();

    var _fangkaNode;
    //最高得分
    if (MaxWinAll !=0 && MaxWinAll == pl.winall ) {
        uibind.normalNode._node.visible = false;
        uibind.lastNode._node.visible =false;
        uibind.winNode._node.visible = true;
        uibind.winNode.bigWinner._node.visible = true;
        uibind.winNode.winNum._node.setString(pl.winall + "");
        uibind.winNode.winNum._node.ignoreContentAdaptWithSize(true);
        var act_Func = function() {
            var a = cc.scaleTo(0.5, 1.0);
            var aa = cc.fadeIn(0.5);
            var a1 = cc.scaleTo(1.0, 4);
            var a2 = cc.fadeOut(1.0);
            var act_2 = cc.rotateBy(0.8, 30);
            var act_3 = cc.rotateBy(0.8, -30);
            var a3 =  cc.callFunc(function() {
                _shine.setScale(1);
            }.bind(_shine));
            _shine.runAction(cc.sequence(cc.spawn(a,aa), cc.spawn(a1,a2),a3,cc.delayTime(0.1)).repeatForever());
            _point.runAction(cc.sequence(act_2, act_3).repeatForever());

        }
        var clubInfoTable = getClubInfoInTable();
        if (clubInfoTable && pl.info.uid == SelfUid()
            && MjClient.getAppType() != MjClient.APP_TYPE.QXSYDTZ
            && MjClient.getAppType() != MjClient.APP_TYPE.HUNANWANGWANG) {
            _shine.setVisible(true);
            _point.setVisible(true);
            _txt.setVisible(true);
            act_Func();
        }
        _fangkaNode = uibind.winNode._node;
    }//点炮最多
    else if( MaxDianPao != 0 &&  bPaoWang){
        uibind.winNode._node.visible = false;
        uibind.normalNode._node.visible = false;
        uibind.lastNode._node.visible =true;
        if( pl.winall >=0 ){
            uibind.lastNode.winNum1._node.visible = true;
            uibind.lastNode.winNum2._node.visible = false;
            uibind.lastNode.winNum1._node.setString(pl.winall + "");
            uibind.lastNode.winNum1._node.ignoreContentAdaptWithSize(true);
        }
        else{
            uibind.lastNode.winNum1._node.visible = false;
            uibind.lastNode.winNum2._node.visible = true;
            uibind.lastNode.winNum2._node.setString(Math.abs(pl.winall) + "");
            uibind.lastNode.winNum2._node.ignoreContentAdaptWithSize(true);
        }

        _fangkaNode = uibind.lastNode._node;
    }
    else{
        uibind.winNode._node.visible = false;
        uibind.lastNode._node.visible =false;
        uibind.normalNode._node.visible = true;
        if( pl.winall >= 0 ){
            uibind.normalNode.winNum2._node.visible =false;
            uibind.normalNode.winNum1._node.visible= true;
            uibind.normalNode.winNum1._node.setString(pl.winall + "");
            uibind.normalNode.winNum1._node.ignoreContentAdaptWithSize(true);

        }
        else {
            uibind.normalNode.winNum1._node.visible= false;
            uibind.normalNode.winNum2._node.visible =true;
            uibind.normalNode.winNum2._node.setString(Math.abs(pl.winall) + "");
            uibind.normalNode.winNum2._node.ignoreContentAdaptWithSize(true);
        }

        _fangkaNode = uibind.normalNode._node;
    }
    AddFangKaIcon(sData, _fangkaNode, tData, pl, MaxWinAll, MaxWinPlayer,  MaxloseAll, MaxlosePlayer, cc.p(-115, 385));

    if (tData.owner == pl.info.uid)
    {
        node.getChildByName("fangzhu").visible =true;
    }
    else{
        node.getChildByName("fangzhu").visible =false;
    }

    var maxPlayer = parseInt(MjClient.data.sData.tData.maxPlayer);
    var head2 = node.getParent().getChildByName("head2");
    var head3 = node.getParent().getChildByName("head3");
    cc.log("=============game over off idx ttttt =  " + off);

    if (pl.isNeedFanBei || tData.isFanBei) { 
        var yoff = 15;
        uibind.winNode.winNum._node.y += yoff;

        if(MjClient.getAppType() === MjClient.APP_TYPE.QXXXGHZ){
            uibind.lastNode.winNum1._node.y += yoff;
            uibind.lastNode.winNum2._node.y += yoff;
        }else{
            uibind.lastNode._node.y += yoff;
        }
        
        // node.getChildByName("line_hua_0").y += yoff;
        uibind.normalNode.winNum1._node.y += yoff;
        uibind.normalNode.winNum2._node.y += yoff;

        var fanbeiFormula = node.getChildByName("fanbeiFormula");
        fanbeiFormula.setVisible(true);
        fanbeiFormula.setString("(" + Math.floor(pl.winall/2*10)/10 + "x2)");
        fanbeiFormula.ignoreContentAdaptWithSize(true);
        var bWin = (MaxWinAll !=0 && MaxWinAll == pl.winall);
        // fanbeiFormula.setTextColor(bWin? cc.color(0xff,0xf5,0x84):cc.color(0xb0,0xed,0xff));
        // fanbeiFormula.enableOutline(bWin? cc.color(0xff,0xf5,0x84):cc.color(0xb0,0xed,0xff), 1);
        fanbeiFormula.setColor(bWin? cc.color(0xff,0xfe,0xd6):cc.color(0xd4,0xfe,0xff));
        fanbeiFormula.enableOutline(bWin? cc.color(0xb2,0x43,0x3e):cc.color(0x15,0x5c,0xa8), 1);
        
    }

    if (head2 && head3)
    {
        var size = (head3.x - head2.x) * (4 - maxPlayer) / (maxPlayer + 1);
        node.x += size * (off + 1);
    }

}

//  麻将大结算
var GameOverLayer = cc.Layer.extend({
    sprite:null,
    jsBind:{
        back:{
            share:{
                img_shine:{
                    _visible:false
                },
                img_txt:{
                    _visible:false
                },
                img_point:{
                    _visible:false
                },
                _event:{
                    captureScreen_OK:function(){
                        if (MjClient.endallui.capture_screen != true)
                            return;

                        MjClient.endallui.capture_screen = false;
                        var writePath = jsb.fileUtils.getWritablePath();
                        var textrueName = "wxcapture_screen.png";
                        var savepath = writePath+textrueName;
                        MjClient.shareImageToSelectedPlatform(savepath);
                        this.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(function()
                        {
                            this.setTouchEnabled(true);
                        }.bind(this))));

                        if(MjClient.Scene.getChildByName("shareCode")) MjClient.Scene.removeChildByName("shareCode");
                    }
                }
            },
        }
    },
    ctor:function () {
        this._super();
        var _jsonPath = "endAll.json";
        if(MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ ||
           MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ ||
           MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP ||
           MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ ||
           MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ)
        {
            var maxPlayer = parseInt(MjClient.data.sData.tData.maxPlayer);
            if(maxPlayer == 3)
            {
                _jsonPath = "endAll3p.json";
            }
            else if(maxPlayer == 2)
            {
                _jsonPath = "endAll2p.json";
            }
        }
        //淮安新跑的快
        if (MjClient.gameType == MjClient.GAME_TYPE.PAO_DE_KUAI_HUAIAN_NEW)
        {
            _jsonPath = "endAll_PaoDeKuaiNew.json"
        }

        if(MjClient.gameType == MjClient.GAME_TYPE.YUAN_JIANG_MJ)
        {
            _jsonPath = "endAll_YJ.json"
        }

        var endallui = ccs.load(_jsonPath);
        BindUiAndLogic(endallui.node,this.jsBind);
        this.addChild(endallui.node);
        MjClient.endallui=this;

        var _block = endallui.node.getChildByName("block");
        setWgtLayout(_block,[1,1],[0.5,0.5],[0,0], true);

        var _bg = endallui.node.getChildByName("bg");
        if (_bg) {
            setWgtLayout(_bg, [1, 1], [0.5, 0.0], [0, 0]);
            _bg.height += (MjClient.size.height / _bg.scaleY - _bg.height) / 2;
        }

        var isNewUi = (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP|| MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ  || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ);

        /*
            changed by sking
         */
        var _back = endallui.node.getChildByName("back");
        if(MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ ||
           MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ ||
           MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP ||
           MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ ||
            (MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ && MjClient.gameType != MjClient.GAME_TYPE.PAO_DE_KUAI_HUAIAN_NEW)) {
            setWgtLayout(_back,[0.96,0.96],[0.5,0.5],[0,0]);
        }
        else if(isJinZhongAPPType() && isIPhoneX())
        {
            setWgtLayout(_back,[0.85,0.85],[0.5,0.5],[0,0],false);
        }
        else if ((MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || MjClient.getAppType() == MjClient.APP_TYPE.AYGUIZHOUMJ) && 
            GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_DE_KUAI && isIPhoneX()) {
            // 永州跑得快超框处理
            setWgtLayout(_back, [0.8, 0.8], [0.5, 0.5], [0, 0]);
        }
        else if ((MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ) && 
            GameClass[MjClient.gameType] == MjClient.GAME_CLASS.MA_JIANG && isIPhoneX()) {
            // 永州麻将超框处理
            setWgtLayout(_back, [0.85,0.85],[0.5,0.5],[0,0], false);
        }
        else {
            setWgtLayout(_back,[1,1],[0.5,0.5],[0,0]);
        }

        //分享
        var _share =  _back.getChildByName("share");
        var tData = MjClient.data.sData.tData;
        _share.visible = !MjClient.remoteCfg.guestLogin && !tData.matchId;



        _share.addTouchEventListener(function(sender,Type){
            switch (Type)
            {
                case ccui.Widget.TOUCH_ENDED:
                    if(isJinZhongAPPType()) {
                        ShareGameOverInfo()
                    } else {
                        MjClient.shareMultiPlatform(MjClient.systemConfig.sharePlatforms, function()
                        {
                            COMMON_UI.getShareCodeTexture(tData.tableInfoUrl,_back,function(){
                                cc.log("====================capture_screen======================= tData.tableInfoUrl = " + tData.tableInfoUrl);
                                postEvent("capture_screen");
                                if(MjClient.endallui && cc.sys.isObjectValid(MjClient.endallui)){
                                    MjClient.endallui.capture_screen = true;
                                }
                                _share.setTouchEnabled(false);
                            });
                        });
                        MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Dajiesuanjiemian_Fenxiang",  {uid:SelfUid(),gameType:MjClient.gameType});
                    }
                    break;
                default :
                    break;
            }
        },this);
        var sData=MjClient.data.sData;
        var tData=sData.tData;
        var _difenText =  _back.getChildByName("Text_difen");
        if (_difenText) {
            _difenText.setString(" X "+tData.areaSelectMode.tonghua_difen)
        }

        // 如果是亲友圈的房间显示亲友圈图标及名称
        var image_title = _back.getChildByName("Image_title");
        var clubNode = _back.getChildByName("Image_club");
        var clubInfoTable = getClubInfoInTable();
        if ((MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP 
            || MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ)
         && clubInfoTable && typeof(clubInfoTable.clubAvatar) != "undefined" && clubInfoTable.clubTitle && clubInfoTable.ruleName && clubNode != null) 
        {
            if (image_title)
                image_title.setVisible(false);

            var clubName = clubNode.getChildByName("Text_name");
            clubName.ignoreContentAdaptWithSize(true);
            clubName.setString(unescape(clubInfoTable.clubTitle) + " " + (clubInfoTable.ruleName ? "(" + GameCnName[MjClient.gameType] + ")" : ""));

            cc.loader.loadImg(clubInfoTable.clubAvatar ? clubInfoTable.clubAvatar : "png/default_headpic.png", {
                isCrossOrigin: true
            }, function(err, texture) {
                if (err || !texture || !sys.isObjectValid(clubNode))
                    return;

                var sp = new cc.Sprite(texture);
                if (!sp)
                    return;

                sp.setScale((clubNode.width - 8) / sp.width);
                sp.setPosition(cc.p(clubNode.width / 2, clubNode.height / 2));
                clubNode.addChild(sp);
            });
        }
        else if (clubInfoTable && typeof(clubInfoTable.clubAvatar) != "undefined" && clubInfoTable.clubId && clubNode != null)
        {
            if (image_title)
                image_title.setVisible(false);

            var clubName = clubNode.getChildByName("Text_name");
            clubName.ignoreContentAdaptWithSize(true);
            clubName.setString("" + unescape(clubInfoTable.clubTitle));

            var _nameStr = unescape(clubInfoTable.ruleName);
            var _ruleName = clubName.clone();
            _ruleName.ignoreContentAdaptWithSize(true);
            _ruleName.setString(_nameStr);
            _ruleName.y = clubName.y + clubName.height/2 + _ruleName.height/2;
            _ruleName.x = clubName.x;
            clubNode.addChild(_ruleName);
            cc.loader.loadImg(clubInfoTable.clubAvatar ? clubInfoTable.clubAvatar : "png/default_headpic.png", {
                isCrossOrigin: true
            }, function(err, texture) {
                if (err || !texture || !sys.isObjectValid(clubNode))
                    return;

                var sp = new cc.Sprite(texture);
                if (!sp)
                    return;

                sp.setScale((clubNode.width - 8) / sp.width);
                sp.setPosition(cc.p(clubNode.width / 2, clubNode.height / 2));
                clubNode.addChild(sp);
            });
        }
        else if (clubNode != null)
        {
            clubNode.setVisible(false);
        }

        //信息 说明
        var _infoMation =  _back.getChildByName("infoMation");
        _infoMation.visible = true;
        function _infoText(){
            var sData=MjClient.data.sData;
            var tData=sData.tData;
            var text ="";
            text += GameCnName[MjClient.gameType];
            var extraNum = tData.extraNum ? tData.extraNum:0;
            if (isNewUi) {
                text += "-" + tData.maxPlayer + "人\n";
                var roundNumPre = typeof(tData.roundNumPre) != "undefined" ? tData.roundNumPre : tData.roundNum;
                text += "房号：" + tData.tableid
                if (roundNumPre && tData.roundAll - tData.roundNumPre + 1 <= tData.roundAll)
                    text += " 局数：" + (tData.roundAll - tData.roundNumPre + 1 + extraNum) + "/" + tData.roundAll;
                text += "\n";
                if(MjClient.roundEndTime)
                    text += MjClient.roundEndTime + "";
            } else {
                var strPayWay = "";
                switch (tData.areaSelectMode.payWay) {
                    case 0:
                        strPayWay = ",房主付";
                        break;
                    case 1:
                        strPayWay = ",AA付";
                        break;
                    case 2:
                        strPayWay = ",大赢家付";
                        break;
                }
                text += strPayWay;

                if(MjClient.gameType == MjClient.GAME_TYPE.WANG_DIAO_MA_JIANG)
                {   
                    text += "," + tData.areaSelectMode.maxPlayer + "人场" 
                    if(tData.areaSelectMode.maPai === 0)
                        text += ",数字码"
                    else
                        text +=  "," + tData.areaSelectMode.maPai + "码"
                    if(tData.areaSelectMode.isQiangGangHu)
                        text += ",抢杠胡" 
                    if(tData.areaSelectMode.isLiangPian)
                        text += ",两片" 
                    
                } 

                text += ",房间号:";
                text += tData.tableid;
                var clubInfoTable = getClubInfoInTable();
                if (clubInfoTable){
                    //需求：海安、晋中、南通 对于俱乐部牌局，在大结算、大结算分享图中，增加显示，亲友圈ID，并显示对应的玩法名称【是会长建立玩法时设定的玩法名称】
                    if(MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ ||
                        isJinZhongAPPType() ||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP ){
                        text += ",亲友圈ID:";
                        text += clubInfoTable.clubId;
                        if(clubInfoTable.ruleName){
                            text = text+"（"+unescape(clubInfoTable.ruleName)+"）";
                        }
                    }
                }

                if(MjClient.getAppType() != MjClient.APP_TYPE.QXTHMJ){
                    //描述结算
                    if (MjClient.isDismiss)
                    {
                        var id = tData.firstDel;
                        var pl = sData.players[id];
                        var delStr = "";
                        if(pl)
                        {
                            if (pl.mjdesc && pl.mjdesc.length > 0) {
                                var name  =  unescape(pl.info.nickname );
                                delStr = name + pl.mjdesc[0];
                            }
                        }
                        else
                        {
                            // 系统、会长或管理员解散房间
                            pl = getUIPlayer(0);
                            if (pl && pl.mjdesc && pl.mjdesc.length > 0)
                                delStr = pl.mjdesc[0];
                        }

                        text += "," + delStr;
                    }
                }
            }
            return text;
        }
        _infoMation.setString(_infoText());
        _infoMation.setFontName("Arial");
        _infoMation.setFontSize(_infoMation.getFontSize());
        // 晋中换皮
        if (!isNewUi
            && MjClient.gameType != MjClient.GAME_TYPE.PAO_DE_KUAI_HUAIAN_NEW
            && MjClient.getAppType() != MjClient.APP_TYPE.TXJINZHONGMJ
            && MjClient.getAppType() != MjClient.APP_TYPE.DQSHANXIMJ
            && MjClient.getAppType() != MjClient.APP_TYPE.AYGUIZHOUMJ
            && !isYongZhouProject())
            _infoMation.ignoreContentAdaptWithSize(true);


        if(MjClient.getAppType() == MjClient.APP_TYPE.QXTHMJ){
            var sData=MjClient.data.sData;
            var tData=sData.tData;
            var _infoMation_2 =  _back.getChildByName("infoMation_2");
            var per = "";
            var id = tData.firstDel;
            var pl = sData.players[id];
            if (MjClient.isDismiss)
            {
                if ( pl &&  pl.mjdesc[0]) {
                    var name  =  unescape(pl.info.nickname );
                    var delStr = name + pl.mjdesc[0];
                    per += delStr;
                }
            }

            _infoMation_2.setString(per);
            _infoMation_2.ignoreContentAdaptWithSize(true);
            _infoMation_2.setFontName("Arial");
            _infoMation_2.setFontSize(_infoMation_2.getFontSize());

        }


        //时间
        var _time =  _back.getChildByName("time");
        _time.visible = true;
        _time.setString("");

        if (isNewUi) {
            if (MjClient.getAppType() != MjClient.APP_TYPE.QXTHMJ) {
                //描述结算
                if (MjClient.isDismiss) {
                    var id = tData.firstDel;
                    var pl = sData.players[id];
                    var delStr = "";
                    if(pl)
                    {
                        var name  =  unescape(pl.info.nickname );
                        delStr = name + pl.mjdesc[0];
                    }
                    else
                    {
                        // 系统、会长或管理员解散房间
                        pl = getUIPlayer(0);
                        if (pl)
                            delStr = pl.mjdesc[0];
                    }
                    _time.setString(delStr);
                    _time.setFontName("Arial");
                    _time.setFontSize(_time.getFontSize());
                }
            }
        } else {
            cc.log("===============MjClient.roundEndTime = " + MjClient.roundEndTime);
            if(MjClient.roundEndTime)
                _time.setString(""+MjClient.roundEndTime);
        }


        var nantongReplay = function() {
            var tData = MjClient.data.sData.tData;
            var para = tData.areaSelectMode;
            var inviteVipTable = MjClient.data.inviteVipTable;
            para.maxPlayer = tData.maxPlayer;
            para.gameType = tData.gameType;

            MjClient.showMsg("是否再来一局？", function () {
                MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Zailaiyiju", {uid:SelfUid(),gameType:para.gameType});
                if (inviteVipTable)
                {
                    MjClient.joinGame(inviteVipTable, null, false, para.gameType);
                }
                else
                {
                    MjClient.createRoom(para, tData.roundAll, tData.areaSelectMode.payWay, function (rtn)
                    {
                        if(rtn.result==0)
                        {
                            MjClient.rematchInfo(MjClient.data.vipTable, tData.uids);
                        }
                    });
                }
            }, function(){}, "1", "nantongReplay");
        };

        //close ,关闭
        var _close1 =  _back.getChildByName("close");
        this._close1 = _close1;
        _close1.addTouchEventListener(function(sender,Type){
            switch (Type)
            {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Tuichu", {uid:SelfUid(),gameType:MjClient.gameType});
                    if(MjClient.Scene.getChildByName("shareCode")) MjClient.Scene.removeChildByName("shareCode");
                
                    var clubInfoTable = getClubInfoInTable();
                    if (clubInfoTable) {
                        if (!MjClient.FriendCard_main_ui)
                            MjClient.Scene.addChild(new FriendCard_main(clubInfoTable.clubId));
                    }

                    //MjClient.leaveGame();
                    //这里的leaveGame肯定会返回{"result":0,"msg":"alreadyLeave"}，所以不用等待返回后再继续
                    //MjClient.native.doCopyToPasteBoard("");//清空剪切板
                    MjClient.gamenet.request("pkplayer.handler.LeaveGame",{},function(rtn){});
                    delete MjClient.data.sData;
                    delete MjClient.gameType;
                    postEvent("LeaveGame");
                    if (MjClient.enterui)
                    {
                        MjClient.enterui.removeFromParent(true);
                        MjClient.enterui = null;
                    }

                    if (MjClient.createui)
                    {
                        MjClient.createui.removeFromParent(true);
                        MjClient.createui = null;
                    }

                    if(MjClient.endallui){
                        MjClient.endallui.removeFromParent(true);
                        MjClient.endallui = null;
                    }

                    if(cc.sys.isObjectValid(MjClient.goldMatchingui)){
                        MjClient.goldMatchingui.removeFromParent();
                        delete  MjClient.goldMatchingui;
                    }

                    if (MjClient.rePlayVideo >= 0 && MjClient.replayui) {
                        MjClient.replayui.replayEnd();
                    }

                    break;
                default :
                    break;
            }
        },this);


        //再来一局
        var _btnReplay =  _back.getChildByName("btnReplay");
        var tData = MjClient.data.sData.tData;
        _btnReplay.visible = !MjClient.remoteCfg.guestLogin && !tData.matchId;

        if(MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP ||
            MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ ||
            MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP||
            MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP||
            MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
            isJinZhongAPPType()){
            _btnReplay.visible = false;  //屏蔽再来一局
        }

        if (MjClient.getAppType() != MjClient.APP_TYPE.QXTHMJ && MjClient.gameType != MjClient.GAME_TYPE.XIANG_XIANG_SAN_DA_HA
        && MjClient.getAppType() != MjClient.APP_TYPE.AYGUIZHOUMJ) {
            var clubInfoTable = getClubInfoInTable();
            if (clubInfoTable) {
                _btnReplay.visible = false;
                _share.x = _share.getParent().width / 2;
            }
        }

        if(MjClient.gameType == MjClient.GAME_TYPE.HENG_YANG_CHANG_SHA){
            _btnReplay.visible = false;
        }

        _btnReplay.addTouchEventListener(function(sender,Type){
            switch (Type)
            {
                case ccui.Widget.TOUCH_ENDED:

                    if(
                        MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXTHMJ)
                    {
                        var clubInfoTable = getClubInfoInTable();
                        if (clubInfoTable) {
                            if (!MjClient.FriendCard_main_ui)
                                MjClient.Scene.addChild(new FriendCard_main(clubInfoTable.clubId));
                        }

                        //MjClient.leaveGame();
                        //这里的leaveGame肯定会返回{"result":0,"msg":"alreadyLeave"}，所以不用等待返回后再继续
                        //MjClient.native.doCopyToPasteBoard("");//清空剪切板
                        MjClient.gamenet.request("pkplayer.handler.LeaveGame",{},function(rtn){});
                        delete MjClient.data.sData;
                        delete MjClient.gameType;
                        postEvent("LeaveGame");
                        //if (!MjClient.enterui && !MjClient.FriendCard_main_ui)
                        //    MjClient.Scene.addChild(new EnterRoomLayer());

                        if(MjClient.endallui){
                            MjClient.endallui.removeFromParent(true);
                            MjClient.endallui = null;
                        }

                    }
                    else if(MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP || MjClient.getAppType() == MjClient.APP_TYPE.QXTHMJ)//南通APP再来一局退出到主界面再提示
                    {
                        nantongReplay();

                        //MjClient.leaveGame();
                        //这里的leaveGame肯定会返回{"result":0,"msg":"alreadyLeave"}，所以不用等待返回后再继续
                        //MjClient.native.doCopyToPasteBoard("");//清空剪切板
                        MjClient.gamenet.request("pkplayer.handler.LeaveGame",{},function(rtn){});
                        delete MjClient.data.sData;
                        delete MjClient.gameType;
                        postEvent("LeaveGame");
                        if (MjClient.enterui)
                        {
                            MjClient.enterui.removeFromParent(true);
                            MjClient.enterui = null;
                        }

                        if (MjClient.createui)
                        {
                            MjClient.createui.removeFromParent(true);
                            MjClient.createui = null;
                        }

                        if(MjClient.endallui){
                            MjClient.endallui.removeFromParent(true);
                            MjClient.endallui = null;
                        }
                    }
                    else
                    {
                        MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Dajiesuanjiemian_Zailaiyiju", {uid:SelfUid(),gameType:MjClient.gameType});
                        if (MjClient.data.inviteVipTable)
                        {
                            MjClient.leaveGame(function()
                            {
                                MjClient.joinGame(MjClient.data.inviteVipTable, null, false, MjClient.gameType);
                            });
                        }
                        else
                        {
                            MjClient.reCreateRoom();
                        }

                    }
                    break;
                default :
                    break;
            }
        },this);

        //显示复制按钮
        addCopyBtnToGameOverLayer(endallui.node);

       //cc.log("==========================current url = " + _url);

        //倒计时
        // var countDown = _back.getChildByName("count_down");
        // if(countDown)
        // {
        //     if(tData.matchId){
        //         countDown.setVisible(true);
        //     }else {
        //         countDown.setVisible(false);
        //     }
        //     schedulLoadTexture(countDown);
        // }

        var self = this;
        if(tData.matchId){
            _close1.setVisible(false);
            function delayExe()
            {
                self.addChild(new roundEndLayer(),500);
            }
            this.runAction(cc.sequence(cc.DelayTime(3),cc.callFunc(delayExe)));
            var endTitle = _back.getChildByName("end_title");
            endTitle.loadTexture("winGame/BL_jieshu.png");
            endTitle.ignoreContentAdaptWithSize(true);

            // var _btnReplay =  _back.getChildByName("roundEndText");
            // _btnReplay.setVisible(true);
        }
        var textNum =  _back.getChildByName("Text_num");
        var text3 =  _back.getChildByName("Text_3");
        var text5 =  _back.getChildByName("Text_5");
        cc.log("=================leftTable====");
        UIEventBind(null,this,"leftTable",function(data){
            //num.setString(self._data.condition - data.signUpCount);
            textNum.setString(data.leftTable);
            textNum.setVisible(true);
            text3.setVisible(true);
            text5.setVisible(true);
        })
        cc.log("=============1===   nnn =leftTable====");

        var bdhyNewUISet = function(back, player, i){
            var pl = MjClient. getPlayerByIndex(i);
            if(!pl)
            {
                return;
            }
            var sData = MjClient.data.sData;
            var MaxWinAll=0;
            //计算所有人数据
            for (var uid in sData.players) {
                var pi = sData.players[uid];
                if(pi)
                {
                    MaxWinAll = MaxWinAll>pi.winall?MaxWinAll:pi.winall;
                } 
            }

            var line1 = back.getChildByName("line_1");
            var line2 = back.getChildByName("line_2");
            var line3 = back.getChildByName("line_3");
            var lineList = [null,line1, line2, line3];

            var tData = sData.tData;
            var maxPlayer = parseInt(tData.maxPlayer);
            var bg = back.getChildByName("bg");
            var allSize = bg.getContentSize();
            if(MaxWinAll !=0 && MaxWinAll == pl.winall ){//大赢家
                var headBg = player.getChildByName("bg");
                headBg.loadTexture("ui/gameOver/win_" + tData.maxPlayer +"ren_" + i + ".png");
                headBg.ignoreContentAdaptWithSize(true);
            }

            var bgBai = player.getChildByName("bgBai");
            bgBai.loadTexture("ui/gameOver/baiBan/win_" + tData.maxPlayer +"ren_" + i + ".png");
            bgBai.ignoreContentAdaptWithSize(true);
            
            var size = 283;//4人

            player.x = (allSize.width / maxPlayer) * i + (size/2) + bg.x - bg.width * 0.5;
            if(maxPlayer == 3){
                size = 377;
                player.x = (allSize.width / maxPlayer) * i + (size/2) + bg.x - bg.width * 0.5;
                line3.visible = false;
                var line = lineList[i+1];
                if(line){
                    line.x = player.x + size * 0.5;
                }
            }else if(maxPlayer == 2){
                size = 565;
                player.x = (allSize.width / maxPlayer) * i + (size/2) + bg.x - bg.width * 0.5;
                line1.visible = false;
                line3.visible = false;
            } 
        }

        //四个玩家的详细信息
        for(var i = 0 ; i < 4 ; i++)
        {
            var player =   _back.getChildByName("head" + i);
            if(MjClient.gameType == MjClient.GAME_TYPE.NIU_NIU)
            {
                SetGameOverLayer_NN(player,i);
            }
            else if(MjClient.gameType == MjClient.GAME_TYPE.NAN_JING)
            {
                SetGameOverLayer_nanjing(player,i);
            }
            else if(MjClient.gameType == MjClient.GAME_TYPE.TUAN_TUAN_ZHUAN)
            {
                SetGameOverLayer_guandan(player,i);
            }
            else if(MjClient.gameType === MjClient.GAME_TYPE.RU_GAO ||
                    MjClient.gameType === MjClient.GAME_TYPE.RU_GAO_MJH ||
                    MjClient.gameType === MjClient.GAME_TYPE.QU_TANG_23_ZHANG)
            {
                SetGameOverLayer_changpai(player,i);
            }
            else if(MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI)
            {
                SetGameOverLayer_paohuzi(player,i);
            }
            else if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_DE_KUAI)
            {
                if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP||
                    MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ ||
                    MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ ||
                    MjClient.getAppType() == MjClient.APP_TYPE.AYGUIZHOUMJ) {
                    SetGameOverLayer_paodekuai_QXYYQP(player,i);
                } else if (MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ
                    || MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP
                    || MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG) {
                    SetGameOverLayer_paodekuai_QXSYDTZ(player,i);
                } else {
                    SetGameOverLayer_paodekuai(player,i);

                    if(MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP){
                        bdhyNewUISet(_back, player, i);
                    }
                }
            }
            else if (GameClass[MjClient.gameType] == MjClient.GAME_CLASS.SAN_DA_HA)
            {
                SetGameOverLayer_sanDaHa(player,i);
            }
            else if (isJinZhongAPPType()
                ||MjClient.getAppType() == MjClient.APP_TYPE.TXLVLIANGMJ)
            {
                SetGameOverLayer_majiang_jinzhongAPP(player,i);    //晋中新版大结算界面
            }
            else if (MjClient.getAppType() == MjClient.APP_TYPE.TXLINFENMJ)
            {
                SetGameOverLayer_majiang_linfenAPP(player,i);     //临汾新版大结算界面
            }
            else if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP||MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ)
            {
                if(MjClient.gameType == MjClient.GAME_TYPE.YUAN_JIANG_MJ)
                {
                    SetGameOverLayer_YJ(player,i); 
                }
                else
                {
                    SetGameOverLayer_QXYYQP(player,i);     //岳阳新版大结算界面
                }
            }else if (MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ || MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG
                || MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP)
            {

                //主要是麻将类
                SetGameOverLayer_QXSYDTZ(player,i);     //邵阳新版大结算界面
            }
            else
            {
                SetGameOverLayer(player,i);
                if(MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP){
                    bdhyNewUISet(_back, player, i);
                }
            }
            COMMON_UI.addGameOverNotSameClubUI(player,MjClient.getPlayerByIndex(i))
            
        }
        cc.log("=============2===leftTable====");
        return true;
    },
    onEnter:function()
    {
        this._super();
        if (MjClient.homeui && MjClient.systemConfig.rankEnable == "true")
        {
            MjClient.homeui.gameRankLayer();
        }
    },
    replaySet : function(cb){
        if (MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ || MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG) {
            this._close1.addTouchEventListener(function(sender,type){
                if (type == ccui.Widget.TOUCH_ENDED)
                    MjClient.goOnReplay();
            }, this);
        } 
        else {
            var btn = new ui.Button("ui/zhanji/huikanMj_n.png", "ui/zhanji/huikanMj_s.png", "ui/zhanji/huikanMj_s.png", ccui.Widget.LOCAL_TEXTURE);
            btn.addClickEvent(function(){
                MjClient.goOnReplay();
            }, this);
            btn.x = this._share.x + 120;
            btn.y = this._share.y;
            // btn.scale = 1.2;
            this._share.parent.addChild(btn);
            this._share.x -= 120;

            this._close1.addTouchEventListener(function(sender,Type){
                if(MjClient.endallui){
                    MjClient.endallui.removeFromParent(true);
                    MjClient.endallui = null;
                }

                if(MjClient.rePlayVideo >= 0 && MjClient.replayui){
                    MjClient.replayui.replayEnd();
                }
            },this); 
        }
    }
});

//  阮江千分大结算
var GameOverLayer_ruanjiangqianfen = cc.Layer.extend({
    sprite:null,
    jsBind:{
        back:{
            share:{
                img_shine:{
                    _visible:false
                },
                img_txt:{
                    _visible:false
                },
                img_point:{
                    _visible:false
                },
                _event:{
                    captureScreen_OK:function(){
                        if (MjClient.endallui.capture_screen != true)
                            return;
                        MjClient.endallui.capture_screen = false;
                        var writePath = jsb.fileUtils.getWritablePath();
                        var textrueName = "wxcapture_screen.png";
                        var savepath = writePath+textrueName;
                        MjClient.shareImageToSelectedPlatform(savepath);
                        this.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(function()
                        {
                            this.setTouchEnabled(true);
                        }.bind(this))));
                        if(MjClient.Scene.getChildByName("shareCode")) MjClient.Scene.removeChildByName("shareCode");
                    }
                }
            },
        }
    },
    ctor:function () {
        this._super();
        var endallui = ccs.load("endAll_Ruanjiangqianfen.json");
        BindUiAndLogic(endallui.node,this.jsBind);
        this.addChild(endallui.node);
        MjClient.endallui=this;

        var _block = endallui.node.getChildByName("block");
        setWgtLayout(_block,[1,1],[0.5,0.5],[0,0], true);

        var _bg = endallui.node.getChildByName("bg");
        if (_bg) {
            setWgtLayout(_bg, [1, 1], [0.5, 0.0], [0,0]);
            _bg.height += (MjClient.size.height / _bg.scaleY - _bg.height) / 2;
        }

        var isNewUi = (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP|| MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ ||MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ);

        var _back = endallui.node.getChildByName("back");
        setWgtLayout(_back,[1,1],[0.5,0.5],[0, 0]);

        //分享
        var _share =  _back.getChildByName("share");
        var sData=MjClient.data.sData;
        var tData=sData.tData;
        _share.visible = !MjClient.remoteCfg.guestLogin && !tData.matchId;
        _share.addTouchEventListener(function(sender,Type){
            switch (Type)
            {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.shareMultiPlatform(MjClient.systemConfig.sharePlatforms, function()
                    {
                        COMMON_UI.getShareCodeTexture(tData.tableInfoUrl,_back,function(){
                            cc.log("====================capture_screen=======================");
                            postEvent("capture_screen");
                            if(MjClient.endallui && cc.sys.isObjectValid(MjClient.endallui)){
                                MjClient.endallui.capture_screen = true;
                            }
                            _share.setTouchEnabled(false);
                        });
                    });
                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Dajiesuanjiemian_Fenxiang",  {uid:SelfUid(),gameType:MjClient.gameType});
                    break;
                default :
                    break;
            }
        },this);
        var clubInfoTable = getClubInfoInTable();
        if (clubInfoTable && clubInfoTable.clubId) {
            _share.x = _share.getParent().width / 2;
        }


        // 如果是亲友圈的房间显示亲友圈图标及名称
        var image_title = _back.getChildByName("Image_title");
        var clubNode = _back.getChildByName("Image_club");
        if (clubInfoTable && typeof(clubInfoTable.clubAvatar) != "undefined" && clubInfoTable.clubId && clubNode != null)
        {
            if (image_title)
                image_title.setVisible(false);

            var clubName = clubNode.getChildByName("Text_name");
            clubName.ignoreContentAdaptWithSize(true);
            clubName.setString("" + unescape(clubInfoTable.clubTitle));

            var _nameStr = unescape(clubInfoTable.ruleName);
            var _ruleName = clubName.clone();
            _ruleName.ignoreContentAdaptWithSize(true);
            _ruleName.setString(_nameStr);
            _ruleName.y = clubName.y + clubName.height/2 + _ruleName.height/2;
            _ruleName.x = clubName.x;
            clubNode.addChild(_ruleName);

            cc.loader.loadImg(clubInfoTable.clubAvatar ? clubInfoTable.clubAvatar : "png/default_headpic.png", {
                isCrossOrigin: true
            }, function(err, texture) {
                if (err || !texture || !sys.isObjectValid(clubNode))
                    return;

                var sp = new cc.Sprite(texture);
                if (!sp)
                    return;

                sp.setScale((clubNode.width - 8) / sp.width);
                sp.setPosition(cc.p(clubNode.width / 2, clubNode.height / 2));
                clubNode.addChild(sp);
            });
        }
        else if (clubNode != null)
        {
            clubNode.setVisible(false);
        }

        //信息 说明
        var _infoMation =  _back.getChildByName("infoMation");
        _infoMation.visible = true;

        var _infoMation2 =  _back.getChildByName("infoMation_2");
        if (_infoMation2) {
            _infoMation2.setString("")
            _infoMation2.visible = true;
            //描述结算
            var sData=MjClient.data.sData;
            var tData=sData.tData;
            cc.log(" --------isDismiss  ",MjClient.isDismiss);
            if (MjClient.isDismiss)
            {

                var id = tData.firstDel;
                var pl = sData.players[id];
                var delStr = "";
                if(pl)
                {
                    var name  =  unescape(pl.info.nickname );
                    delStr = name + pl.mjdesc[0];
                }
                else
                {
                    // 系统、会长或管理员解散房间
                    pl = getUIPlayer(0);
                    if (pl)
                        delStr = pl.mjdesc[0];
                }

                _infoMation2.setString("" + delStr) ;
                _infoMation2.setFontName("Arial");
                _infoMation2.setFontSize(_infoMation2.getFontSize());
            }
        }

        function _infoText(){
            var sData=MjClient.data.sData;
            var tData=sData.tData;
            var text = GameCnName[MjClient.gameType];

            if (isNewUi) {
                text += "-" + tData.maxPlayer + "人\n";
                var roundNumPre = typeof(tData.roundNumPre) != "undefined" ? tData.roundNumPre : tData.roundNum;
                text += "房号：" + tData.tableid
                text += "\n";
                if(MjClient.roundEndTime)
                    text += MjClient.roundEndTime + "";
            } else {
                var strPayWay = "";
                text += ",房间号:";
                text += tData.tableid;
            }

            return text;
        }
        _infoMation.setString(_infoText());
        // 晋中换皮
        if (!isNewUi && MjClient.getAppType() != MjClient.APP_TYPE.TXJINZHONGMJ && MjClient.getAppType() != MjClient.APP_TYPE.DQSHANXIMJ)
            _infoMation.ignoreContentAdaptWithSize(true);

        //时间
        var _time =  _back.getChildByName("time");
        _time.visible = true;
        _time.setString("");

        if (isNewUi) {
            if (MjClient.getAppType() != MjClient.APP_TYPE.QXTHMJ) {
                //描述结算
                if (MjClient.isDismiss) {
                    var id = tData.firstDel;
                    var pl = sData.players[id];
                    var delStr = "";
                    if(pl)
                    {
                        var name  =  unescape(pl.info.nickname );
                        delStr = name + pl.mjdesc[0];
                    }
                    else
                    {
                        // 系统、会长或管理员解散房间
                        pl = getUIPlayer(0);
                        if (pl)
                            delStr = pl.mjdesc[0];
                        if (pl)
                        {
                            for(var i =0;i<pl.mjdesc.length;i++)
                            {
                                if(pl.mjdesc[i].indexOf("管理员")>=0||pl.mjdesc[i].indexOf("会长")>=0)
                                    delStr=pl.mjdesc[i];
                            }
                        }
                    }
                    _time.setString(delStr);
                    _time.setFontName("Arial");
                    _time.setFontSize(_time.getFontSize());
                }
            }
        } else {
            cc.log("MjClient.roundEndTime == " + MjClient.roundEndTime);
            if(MjClient.roundEndTime)
                _time.setString(MjClient.roundEndTime);
        }

        var nantongReplay = function() {
            var tData = MjClient.data.sData.tData;
            var para = tData.areaSelectMode;
            var inviteVipTable = MjClient.data.inviteVipTable;
            para.maxPlayer = tData.maxPlayer;
            para.gameType = tData.gameType;

            MjClient.showMsg("是否再来一局？", function () {
                MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Zailaiyiju", {uid:SelfUid(),gameType:para.gameType});
                if (inviteVipTable)
                {
                    MjClient.joinGame(inviteVipTable, null, false, para.gameType);
                }
                else
                {
                    MjClient.createRoom(para, tData.roundAll, tData.areaSelectMode.payWay, function (rtn)
                    {
                        if(rtn.result==0)
                        {
                            MjClient.rematchInfo(MjClient.data.vipTable, tData.uids);
                        }
                    });
                }
            }, function(){}, "1", "nantongReplay");
        };

        //close ,关闭
        var _close1 =  _back.getChildByName("close");
        _close1.addTouchEventListener(function(sender,Type){
            switch (Type)
            {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Tuichu", {uid:SelfUid(),gameType:MjClient.gameType});
                    if(MjClient.Scene.getChildByName("shareCode")) MjClient.Scene.removeChildByName("shareCode");
                    var clubInfoTable = getClubInfoInTable();
                    if (clubInfoTable) {
                        if (!MjClient.FriendCard_main_ui)
                            MjClient.Scene.addChild(new FriendCard_main(clubInfoTable.clubId));
                    }
                    MjClient.gamenet.request("pkplayer.handler.LeaveGame",{},function(rtn){});
                    delete MjClient.data.sData;
                    delete MjClient.gameType;
                    postEvent("LeaveGame");

                    if(MjClient.endallui){
                        MjClient.endallui.removeFromParent(true);
                        MjClient.endallui = null;
                    }

                    if(cc.sys.isObjectValid(MjClient.goldMatchingui)){
                        MjClient.goldMatchingui.removeFromParent();
                        delete  MjClient.goldMatchingui;
                    }

                    break;
                default :
                    break;
            }
        },this);



        //再来一局
        var _btnReplay =  _back.getChildByName("btnReplay");
        var tData = MjClient.data.sData.tData;


        if(MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ ||
            isJinZhongAPPType() ||
            MjClient.getAppType() == MjClient.APP_TYPE.TXLVLIANGMJ ||
            MjClient.getAppType() == MjClient.APP_TYPE.TXLINFENMJ ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ
        )
        {
            _btnReplay.visible = !MjClient.remoteCfg.guestLogin && !tData.matchId;
            _btnReplay.visible = !getClubInfoInTable();
        }
        else
        {
            _btnReplay.visible = false;  //屏蔽再来一局
        }
        _btnReplay.addTouchEventListener(function(sender,Type){
            switch (Type)
            {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Dajiesuanjiemian_Zailaiyiju", {uid:SelfUid(),gameType:MjClient.gameType});
                    if (MjClient.data.inviteVipTable)
                    {
                        MjClient.leaveGame(function()
                        {
                            MjClient.joinGame(MjClient.data.inviteVipTable, null, false, MjClient.gameType);
                        });
                    }
                    else
                    {
                        MjClient.reCreateRoom();
                    }
                    break;
                default :
                    break;
            }
        },this);

        var self = this;
        if(tData.matchId){
            _close1.setVisible(false);
            var endTitle = _back.getChildByName("end_title");
            endTitle.loadTexture("winGame/BL_jieshu.png");
            endTitle.ignoreContentAdaptWithSize(true);

            var _btnReplay =  _back.getChildByName("roundEndText");
            _btnReplay.setVisible(true);
        }
        var textNum =  _back.getChildByName("Text_num");
        var text3 =  _back.getChildByName("Text_3");
        var text5 =  _back.getChildByName("Text_5");
        UIEventBind(null,this,"leftTable",function(data){
            textNum.setString(data.leftTable);
            textNum.setVisible(true);
            text3.setVisible(true);
            text5.setVisible(true);
        })

        // 显示复制按钮
        addCopyBtnToGameOverLayer(endallui.node);
        //四个玩家的详细信息
        var infoBg = _back.getChildByName("infoBg");
        var infoBgSize = infoBg.getCustomSize();

        var info = infoBg.getChildByName("info");
        info.visible = false;
        var bgSize = info.getCustomSize();
        var sData = MjClient.data.sData;
        var players = sData.players;
        var playerCount = Object.keys(players).length;

        var off_x = bgSize.width*(4 -playerCount)/4;
        // 南通
        if (MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP) {
            off_x = (1085 - bgSize.width * playerCount) / (playerCount - 1);
        }
        var startPos = cc.p(infoBgSize.width/2 - playerCount*(bgSize.width + off_x)/2 + (bgSize.width + off_x)/2, infoBgSize.height/2);
        // 晋中换皮
        if (isJinZhongAPPType()) {
            startPos = cc.p(infoBgSize.width/2 - playerCount*(bgSize.width + off_x)/2 + (bgSize.width + off_x)/2, 0);
        }
        var clone = null;
        for(var i = 0 ; i < playerCount ; i++){
            clone = info.clone();
            clone.visible = true;
            infoBg.addChild(clone, 4 - i);
            SetGameOverLayer_ruanjiangqianfen(clone,i, isNewUi);

            clone.setPosition(startPos);

            COMMON_UI.addGameOverNotSameClubUI(clone,MjClient.getPlayerByIndex(i))

            startPos = cc.p(startPos.x + bgSize.width + off_x,startPos.y);
        }
        return true;
    },
    onEnter:function()
    {
        this._super();
        if (MjClient.homeui && MjClient.systemConfig.rankEnable == "true")
        {
            MjClient.homeui.gameRankLayer();
        }
    }
});

//阮江千分
function SetGameOverLayer_ruanjiangqianfen(node,off,isNewUi)
{
    var sData=MjClient.data.sData;
    var tData=sData.tData;
    var pl=MjClient.getPlayerByIndex(off);
    if(!pl){
        node.setVisible(false);
        return;
    }
    var MaxWinAll=0;
    var MaxlosePlayer = null;
    var MaxWinPlayer = null;
    var MaxloseAll = 999999999;
    //计算所有人数据
    for (var uid in sData.players) {
        var pi = sData.players[uid];
        if (pi) {
            if (MaxWinAll < pi.roomStatistics[5]) {
                MaxWinAll = pi.roomStatistics[5];
                MaxWinPlayer = uid;

            } else if (MaxWinAll == pi.roomStatistics[5]) {
                if (parseInt(uid) < parseInt(MaxWinPlayer)) {
                    MaxWinAll = pi.roomStatistics[5];
                    MaxWinPlayer = uid;
                }
            }
            if (pi.roomStatistics[5] < MaxloseAll) {
                MaxloseAll = pi.roomStatistics[5];
                MaxlosePlayer = uid;
            } else if (pi.roomStatistics[5] == MaxloseAll) {
                if (parseInt(uid) < parseInt(MaxlosePlayer)) {
                    MaxloseAll = pi.roomStatistics[5];
                    MaxlosePlayer = uid;
                }
            }
        }
    }
    var uibind={
        name:{
            _run:function(){
                this.ignoreContentAdaptWithSize(true);
                this.setFontName("Arial");
                this.setFontSize(this.getFontSize());
            },
            _text:function(){
                if(!pl){
                    return "";
                }
                return getNewName(unescape(pl.info.nickname)+"");
            }
        },
        id: {
            _run:function(){
                this.ignoreContentAdaptWithSize(true);
            },
            _text: function () {
                if(!pl){
                    return "";
                }
                return  pl.info.uid.toString();
            }
        },
        allscore:{
            winNum1:{
            },
            winNum2:{
            },
            bigWinner:{
                _visible : false
            }
        },
        digit_jifen:{
            _text: function () {
                if(!pl){
                    return "";
                }
                return  pl.roomStatistics[0].toString();
            }
        },
        digit_jiangfen:{
            _text: function () {
                if(!pl){
                    return "";
                }
                return  pl.roomStatistics[1].toString();
            }
        },
        digit_totaljifen:{
            _text: function () {
                if(!pl){
                    return "";
                }
                return  (pl.roomStatistics[2]).toString();
            }
        },
        digit_sishewuru:{
            _text: function () {
                if(!pl){
                    return "";
                }
                return  (pl.roomStatistics[3]).toString();
            }
        },
        digit_jifen2:{
            _text: function () {
                if(!pl){
                    return "";
                }
                return  (pl.roomStatistics[3]).toString();
            }
        },
        digit_xifen:{
            _text: function () {
                if(!pl){
                    return "";
                }
                return  (pl.roomStatistics[4]).toString();
            }
        }
    };
    // 显示玩家头像
    var head = node.getChildByName("head");
    if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ ||MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) {
        CircularCuttingHeadImg(head, pl);
    }
    else {
        addWxHeadToEndUI(head, off);
    }

    BindUiAndLogic(node,uibind);

    // if(MjClient.getAppType() ==  MjClient.APP_TYPE.QXJSMJ ||
    //     MjClient.getAppType() ==  MjClient.APP_TYPE.QXYYQP ||
    //     MjClient.getAppType() ==  MjClient.APP_TYPE.QXNTQP ||
    //     MjClient.getAppType() ==  MjClient.APP_TYPE.QXHAIANMJ)
    // {
    //     setUserOfflineWinGamePanel(node,pl);
    // }

    setUserOfflineWinGamePanel(node,pl);

    if(!pl)
    {
        uibind.allscore.visible = false;
        node.getChildByName("fangzhu").visible =false;
        return;
    }
    //最高得分
    uibind.allscore.visible = true;
    uibind.allscore.bigWinner._node.visible = false;
    // cc.log(" ======= pl ",JSON.stringify(pl));
    if(pl.roomStatistics[5] >= 0){
        var winNum1 = node.getChildByName("allscore").getChildByName("winNum1");
        winNum1.setString(pl.roomStatistics[5] + "");
        winNum1.ignoreContentAdaptWithSize(true);
        if (!isNewUi)
            winNum1.setScale(0.8);
        var winNum2 = node.getChildByName("allscore").getChildByName("winNum2");
        winNum2.visible = false;
    }else{
        var winNum2 = node.getChildByName("allscore").getChildByName("winNum2");
        winNum2.setString(pl.roomStatistics[5] + "");
        winNum2.ignoreContentAdaptWithSize(true);
        if (!isNewUi)
            winNum2.setScale(0.8);
        var winNum1 = node.getChildByName("allscore").getChildByName("winNum1");
        winNum1.visible = false;

        if (MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP
            || MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ) {
            node.loadTexture("gameOver/pjjs_9.png");
        }
    }
    var nodeParent = node.getParent().getParent();
    var _share = nodeParent.getChildByName("share");
    var _shine = _share.getChildByName("img_shine");
    var _point = _share.getChildByName("img_point");
    var _txt = _share.getChildByName("img_txt");
    if(pl.roomStatistics[5] == MaxWinAll && pl.roomStatistics[5] != 0){
        uibind.allscore.bigWinner._node.visible = true;
        var act_Func = function() {
            var a = cc.scaleTo(0.5, 1.0);
            var aa = cc.fadeIn(0.5);
            var a1 = cc.scaleTo(1.0, 4);
            var a2 = cc.fadeOut(1.0);
            var act_2 = cc.rotateBy(0.8, 30);
            var act_3 = cc.rotateBy(0.8, -30);
            var a3 =  cc.callFunc(function() {
                _shine.setScale(1);
            }.bind(_shine));
            _shine.runAction(cc.sequence(cc.spawn(a,aa), cc.spawn(a1,a2),a3,cc.delayTime(0.1)).repeatForever());
            _point.runAction(cc.sequence(act_2, act_3).repeatForever());

        }
        var clubInfoTable = getClubInfoInTable();
        if (clubInfoTable && pl.info.uid == SelfUid() && MjClient.getAppType() != MjClient.APP_TYPE.QXYYQP && MjClient.getAppType() != MjClient.APP_TYPE.HUBEIMJ && MjClient.getAppType() != MjClient.APP_TYPE.YLHUNANMJ) {
            _shine.setVisible(true);
            _point.setVisible(true);
            _txt.setVisible(true);
            act_Func();
        }
        // 设置背景大赢家图片/字体颜色（岳阳app）
        node.loadTexture("gameOver/pjjs_9.png");

    }
    AddFangKaIcon(sData, node, tData, pl, MaxWinAll, MaxWinPlayer,  MaxloseAll, MaxlosePlayer, cc.p(50, 435));

    node.getChildByName("fangzhu").visible = tData.owner == pl.info.uid;
}

//湘乡告胡子用户信息设置
function SetEndAllUserUI_xxghz(node,off)
{
    var sData=MjClient.data.sData;
    var tData=sData.tData;
    var pl=MjClient.getPlayerByIndex(off);
    node.setVisible(false);
    if(!pl)return;
    node.setVisible(true);
    node=node.getChildByName("head");
    var zhuangNode = node.getChildByName("zhuang");
    /*cc.log("fdgrsdb" + JSON.stringify(tData.owner));
    cc.log("fdgrsdbpl.info.uid" + JSON.stringify(pl.info.uid));*/
    zhuangNode.setVisible(tData.owner == pl.info.uid);
    zhuangNode.zIndex=10;

    //add by sking
    var name = node.getChildByName("name");
    name.ignoreContentAdaptWithSize(true);

    var uibind= {
        head: {
            name: {
                _run:function()
                {
                    this.setFontName("Arial");
                    this.ignoreContentAdaptWithSize(true);
                },
                _text: function () {
                    var _nameStr = unescape(pl.info.nickname) + "";
                    //this.ignoreContentAdaptWithSize(true);
                    return getNewName (_nameStr);
                }
            },
            id: {
                _run:function()
                {
                    this.ignoreContentAdaptWithSize(true);
                },
                _text: function () {
                    return "ID:" + pl.info.uid.toString();
                }
            },

        }
        , winNum: {
            _run: function(){
                this.ignoreContentAdaptWithSize(true);
            },
            _text: function () {
                var pre = "总积分：";
                if(pl.fenshu != undefined && pl.fenshu <= 0){
                    return pre + pl.fenshu.toString();
                }
                return pre;
            }
            , hu: {
                _run: function () {
                    var isShow = true;
                    for(var uid in sData.players){
                        var player = sData.players[uid];
                        if(pl.info.uid == player.info.uid){
                            continue;
                        }
                        if(player.fenshu > pl.fenshu || pl.fenshu == 0){
                            isShow = false;
                        }
                    }
                    this.setVisible(isShow);
                }
            }
            , fenshu: {
                _run:function()
                {
                    this.ignoreContentAdaptWithSize(true);
                    this.x = this.parent.getCustomSize().width;
                    this.y = this.parent.getCustomSize().height / 2;
                    if(pl.fenshu != undefined && pl.fenshu <= 0){
                        this.visible = false;
                    }
                },
                _text: function(){
                    var winScore = "";
                    if(pl.fenshu != undefined && pl.fenshu > 0){
                        winScore = pl.fenshu;
                    }
                    return winScore;
                }
            },
            fanbeiFormula: {
                _run: function(){
                    if (pl.isNeedFanBei) { 
                        this.x = this.getCustomSize().width * 2;
                        this.y = -this.getCustomSize().height;
                        this.setVisible(true);

                        this.setString("(" + Math.floor(pl.fenshu/2*10)/10 + "x2)");
                        this.ignoreContentAdaptWithSize(true);
                        if(pl.fenshu > 0) this.setTextColor(cc.color("#E22E00"));
                    }
                }
            }
        },
        totalhuxi:{
            _text: function () {
                var a = pl.winall;
                var pre = "总胡息：";
                return pre + (a/10).toFixed(0)*10;
            }
        },
        primehuxi:{
            _text: function () {
                var pre = "原始胡息：";
                return pre + pl.winall;
            }
        },
        datuoflag:{
            _run:function(){
                this.visible = true;
                var tData = MjClient.data.sData.tData;
                if(pl.jiazhuNum == 0){
                    this.loadTexture("gameOver/budatuo.png");
                }
                if(tData.areaSelectMode.tuototuo == 0){
                    this.visible = false;
                }
            }
        }
    }
    BindUiAndLogic(node.parent,uibind);
    addWxHeadToEndUI(uibind.head._node,off);

    var pl = MjClient.getPlayerByIndex(off);
    setRoundEndUserOffline_xiangxiang(uibind.head._node,pl);
    //uibind.winNum._node.y=uibind.head._node.y;

    var MaxWinAll=0;
    var MaxlosePlayer = null;
    var MaxWinPlayer = null;
    var MaxloseAll = 999999999;


    for (var uid in sData.players) {
        var pi = sData.players[uid];
        if (pi) {
            if (MaxWinAll < pi.fenshu) {
                MaxWinAll = pi.fenshu;
                MaxWinPlayer = uid;

            }else if (MaxWinAll == pi.fenshu) {
                if (parseInt(uid) < parseInt(MaxWinPlayer)) {
                    MaxWinAll = pi.fenshu;
                    MaxWinPlayer = uid;
                }
            }
            if (pi.fenshu < MaxloseAll) {
                MaxloseAll = pi.fenshu;
                MaxlosePlayer = uid;
            }else if (pi.fenshu == MaxloseAll) {
                if (parseInt(uid) < parseInt(MaxlosePlayer)) {
                    MaxloseAll = pi.fenshu;
                    MaxlosePlayer = uid;
                }
            }
        }
    }
    AddFangKaIcon(sData, node, tData, pl, MaxWinAll, MaxWinPlayer,  MaxloseAll, MaxlosePlayer, cc.p(-50, 50));

}

//湘乡告胡子
var endAll_xxghz = cc.Layer.extend({
    jsBind:{
        block: {
            _layout: [[1, 1], [0.5, 0.5], [0, 0], true],
            greenTip:{
                _run: function(){
                    if(isIpadSize()){
                        this.x = this.getParent().getCustomSize().width * 5 / 7;
                    }
                }
            }
        },
        back:{
            _layout:[[0.9, 0.9],[0.5,0.5],[0,-0.05]],
            accountFlag:{
                _visible:function(){
                    return true;
                }
            },
            share:{
                _event:{
                    captureScreen_OK:function(){
                        if (MjClient.endallui.capture_screen != true)
                            return;
                        MjClient.endallui.capture_screen = false;
                        var writePath = jsb.fileUtils.getWritablePath();
                        var textrueName = "wxcapture_screen.png";
                        var savepath = writePath+textrueName;
                        MjClient.shareImageToSelectedPlatform(savepath);
                        this.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(function()
                        {
                            this.setTouchEnabled(true);
                        }.bind(this))));
                        if(MjClient.Scene.getChildByName("shareCode")) MjClient.Scene.removeChildByName("shareCode");
                    }
                }
            },
            close:{
                _click:function(btn,eT)
                {
                    // MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Tuichu", {uid:SelfUid(),gameType:MjClient.gameType});
                    // MjClient.leaveGame();
                    // if(MjClient.endallui){
                    //     MjClient.endallui.removeFromParent(true);
                    //     MjClient.endallui = null;
                    // }
                    var tData = MjClient.data.sData.tData;
                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Tuichu", {uid:SelfUid(),gameType:MjClient.gameType});
                    if(MjClient.Scene.getChildByName("shareCode")) MjClient.Scene.removeChildByName("shareCode");
                    var clubInfoTable = getClubInfoInTable();
                    if (clubInfoTable && !(MjClient.rePlayVideo >= 0 && MjClient.replayui)) {
                        if (!MjClient.FriendCard_main_ui)
                            MjClient.Scene.addChild(new FriendCard_main(clubInfoTable.clubId));
                    }
                    //MjClient.leaveGame();
                    //这里的leaveGame肯定会返回{"result":0,"msg":"alreadyLeave"}，所以不用等待返回后再继续
                    //MjClient.native.doCopyToPasteBoard("");//清空剪切板
                    MjClient.gamenet.request("pkplayer.handler.LeaveGame",{},function(rtn){});
                    delete MjClient.data.sData;
                    delete MjClient.gameType;
                    postEvent("LeaveGame");
                    if (!MjClient.enterui && !MjClient.FriendCard_main_ui)
                        MjClient.Scene.addChild(new EnterRoomLayer());

                    if(MjClient.endallui){
                        MjClient.endallui.removeFromParent(true);
                        MjClient.endallui = null;
                    }

                    if(MjClient.rePlayVideo >= 0 && MjClient.replayui){
                        MjClient.replayui.replayEnd();
                    }
                }
            },
            dir_roomname:
                {
                    _visible:true,
                    _run:function(){
                        this.ignoreContentAdaptWithSize(true);
                    },
                    _text: function () {
                        var sData=MjClient.data.sData;
                        var tData=sData.tData;

                        var str = GameCnName[MjClient.gameType];
                        var text = str;
                        return text;
                    }
                },
            dir_roomnum:
                {
                    _visible:true,
                    _run:function(){
                        this.ignoreContentAdaptWithSize(true);
                    },
                    _text: function () {
                        var sData=MjClient.data.sData;
                        var tData=sData.tData;

                        var str ="";
                        var text = str;
                        text += ("房间号:" + tData.tableid);
                        return text;
                    }
                },
            head0:{
                head:{
                    zhuang:{_visible:false}
                },
                winNum:{
                },
                _run:function(){ SetEndAllUserUI_xxghz(this,0); },

            }
            ,head1:{
                head:{
                    zhuang:{_visible:false}
                },
                winNum:{
                    // _layout:[[0.08,0.08],[1,0.5],[-2.5,0.75]]
                },
                _run:function(){
                    if(MjClient.MaxPlayerNum_xiangxiang == 2){
                        this.setPosition(this.getPositionX(),this.getPositionY() - 50);
                    }
                    SetEndAllUserUI_xxghz(this,1);
                }
            }

            ,head2:{
                head:{
                    zhuang:{_visible:false}
                },
                winNum:{
                    // _layout:[[0.08,0.08],[1,0.5],[-2.5,-0.75]]
                },
                _run:function(){ SetEndAllUserUI_xxghz(this,2); }
            }
        },
    },
    ctor:function () {
        this._super();
        var endallui = ccs.load("endAll_xxghuzi.json");
        BindUiAndLogic(endallui.node,this.jsBind);
        this.addChild(endallui.node);

        var sData=MjClient.data.sData;
        var tData=sData.tData;
        var _back = endallui.node.getChildByName("back");
        //分享
        var _share =  _back.getChildByName("share");
        this._share = _share;
        _share.visible = !MjClient.remoteCfg.guestLogin && !tData.matchId;

        //_share.x = 713.24;//屏蔽再来一局的时候，坐标要移动一下
        _share.addTouchEventListener(function(sender,Type){
            switch (Type)
            {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.shareMultiPlatform(MjClient.systemConfig.sharePlatforms, function()
                    {
                        COMMON_UI.getShareCodeTexture(tData.tableInfoUrl,_back,function(){
                            cc.log("====================capture_screen=======================");
                            postEvent("capture_screen");
                            if(MjClient.endallui && cc.sys.isObjectValid(MjClient.endallui)){
                                MjClient.endallui.capture_screen = true;
                            }
                            _share.setTouchEnabled(false);
                        });
                    });
                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Fanxiang",  {uid:SelfUid(),gameType:MjClient.gameType});
                    break;
                default :
                    break;
            }
        },this);


        //复制战绩
        cc.log("copy war record");
        addCopyBtnToGameOverLayer(endallui.node);

        //时间
        var _time =  _back.getChildByName("time");
        _time.visible = true;
        //function _setTime()
        //{
        //    var time = MjClient.getCurrentTime();
        //    var str = " " + time[0] + "-" + time[1] + "-" + time[2] + " " + time[3] + ":" + time[4] + ":" + time[5];
        //    cc.log("str time =  " + str);
        //    return str;
        //}
        _time.setString(MjClient.roundEndTime);

        //显示谁解散了房间
        var firstdelltip = endallui.node.getChildByName("back").getChildByName("firstDelTip");
        firstdelltip.setVisible(false);
        var pl = MjClient.data.sData.players[tData.firstDel];

        if(pl){
            var _nameStr = getNewName(unescape(pl.info.nickname) + "");
            firstdelltip.setString(_nameStr + "在" + MjClient.roundEndTime + "申请了解散");
            firstdelltip.setVisible(true);
        }

        MjClient.endallui=this;

        changeMJBg_paohuzi(this, getCurrentMJBgType());
        return true;
    }
});

//    湘乡(湘潭跑胡子玩法)  大结算设置个人信息  这是湘潭跑胡子
function SetGameOverLayer_xiangtanPHZ(node,off,isNewUi){
    var sData=MjClient.data.sData;
    var tData=sData.tData;
    var pl=MjClient.getPlayerByIndex(off);
    cc.log("大结算 pl：" + JSON.stringify(pl));

    if(!pl){
        node.setVisible(false);
        return;
    }

    var uidSelf = SelfUid();

    var uibind={
        name:{
            _run:function(){
                this.ignoreContentAdaptWithSize(true);
                this.setFontName("Arial");
                this.setFontSize(this.getFontSize());
            },
            _text:function(){
                if(!pl){
                    return "";
                }
                return getNewName_new(unescape(pl.info.nickname)+"",6);
            }
        },
        id: {
            _run:function(){
                this.ignoreContentAdaptWithSize(true);
            },
            _text: function () {
                if(!pl){
                    return "ID:";
                }
                return  "ID: " + pl.info.uid.toString();
            }
        },
        bigWinner: {
            _run:function(){
                var isShow = true;
                for(var uid in sData.players){
                    var player = sData.players[uid];
                    if(pl.info.uid == player.info.uid){
                        continue;
                    }
                    if(player.winall > pl.winall || pl.winall == 0){
                        isShow = false;
                    }
                }
                this.setVisible(isShow);
            },
        },
        jiachui: {
            _run:function(){
                this.visible = false;
                // var tData = MjClient.data.sData.tData;
                // if(pl.jiazhuNum == 0){
                //     this.loadTexture("gameOver/budatuo.png");
                // }
                // if(tData.areaSelectMode.tuototuo == 0){
                //     this.visible = false;
                // }
            }
        }
    };

    var wxNode = node.getChildByName("head");
    addWxHeadToEndAllUI_xiangPHZ(wxNode,off);
    BindUiAndLogic(node,uibind);

    // 玩家分数   湘潭跑胡子
    var winNum = node.getChildByName("score_text");
    winNum.ignoreContentAdaptWithSize(true);
    var icon = node.getChildByName("icon");
    var scoreContnet = pl.winall != undefined ? pl.winall : 0;

    var textFileName = scoreContnet >= 0 ? "gameOver_new/addScore_zipai.png" : "gameOver_new/loseScore_zipai.png";
    var iconImg = scoreContnet >= 0 ? "gameOver_new/add_zipai.png" : "gameOver_new/sub_zipai.png";
    icon.loadTexture(iconImg);
    winNum.setProperty(scoreContnet + "", textFileName, 33, 46, "0");

    //玩家总胡息
    var textNode = node.getChildByName("textNode");
    // var zonghushu = textNode.getChildByName("zonghushu");
    // var winall = zonghushu.getChildByName("winall");
    // winall.setString((pl.winall/10).toFixed(0)*10);

    //分数位置移动
    var moveSize = winNum.getCustomSize().width / 2;
    winNum.x -= moveSize;
    icon.x -= moveSize;

    if (pl.isNeedFanBei) {
        var offY = 10;
        icon.y += offY;
        winNum.y += offY;

        var fanbeiFormula = node.getChildByName("fanbeiFormula");
        fanbeiFormula.setVisible(true);
        fanbeiFormula.setString("(" + Math.floor(scoreContnet/2*10)/10 + "x2)");
        fanbeiFormula.ignoreContentAdaptWithSize(true);
        var bWin = scoreContnet >= 0;
        fanbeiFormula.setTextColor(bWin? cc.color(0xff,0xf5,0x84):cc.color(0xb0,0xed,0xff));
    }

    // 玩家数据信息
    var showRoomStatistics = function(node,showList,data){
        // 胡牌 自摸  提 跑次数统计
        for (var i = 0; i < showList.length; i++) {
            //湘潭跑胡子没有放炮统计
            if(i == 2){
                continue;
            }
            var name = showList[i];
            var text = node.getChildByName(name);
            text.setString("" + data[i]);
        }
    }

    showRoomStatistics(textNode,["huNum","ziMoNum","dianpaoNum","tiPaiNum","paoPaiNum"],pl.roomStatistics);
    var MaxWinAll=0;
    var MaxlosePlayer = null;
    var MaxWinPlayer = null;
    var MaxloseAll = 999999999;

    //计算所有人数据
    for (var uid in sData.players) {
        var pi = sData.players[uid];
        if (pi) {
            if (MaxWinAll < pi.winall) {
                MaxWinAll = pi.winall;
                MaxWinPlayer = uid;

            }else if (MaxWinAll == pi.winall) {
                if (parseInt(uid) < parseInt(MaxWinPlayer)) {
                    MaxWinAll = pi.winall;
                    MaxWinPlayer = uid;
                }
            }
            if (pi.winall < MaxloseAll) {
                MaxloseAll = pi.winall;
                MaxlosePlayer = uid;
            }else if (pi.winall == MaxloseAll) {
                if (parseInt(uid) < parseInt(MaxlosePlayer)) {
                    MaxloseAll = pi.winall;
                    MaxlosePlayer = uid;
                }
            }
        }
    }
    var para = {};
    para.rotate = 60;
    AddFangKaIcon(sData, node, tData, pl, MaxWinAll, MaxWinPlayer,  MaxloseAll, MaxlosePlayer, cc.p(50, 435), para);
}

/*
    湘乡   湘潭跑胡子   字牌大结算  这是湘潭跑胡子
 */
var GameOverLayer_xiangtanPHZ = cc.Layer.extend({
    sprite:null,
    jsBind:{
        back:{
            close :{
            },
            share :{
                img_shine:{
                    _visible:false
                },
                img_txt:{
                    _visible:false
                },
                img_point:{
                    _visible:false
                },
                _event:{
                    captureScreen_OK:function(){
                        if (MjClient.endallui.capture_screen != true)
                            return;
                        MjClient.endallui.capture_screen = false;
                        var writePath = jsb.fileUtils.getWritablePath();
                        var textrueName = "wxcapture_screen.png";
                        var savepath = writePath+textrueName;
                        MjClient.shareImageToSelectedPlatform(savepath);
                        this.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(function()
                        {
                            this.setTouchEnabled(true);
                        }.bind(this))));
                        if(MjClient.Scene.getChildByName("shareCode")) MjClient.Scene.removeChildByName("shareCode");
                    }
                }
            },
            dir_roomname:
                {
                    _visible:true,
                    _run:function(){
                        this.ignoreContentAdaptWithSize(true);
                    },
                    _text: function () {
                        var sData=MjClient.data.sData;
                        var tData=sData.tData;

                        var str = GameCnName[MjClient.gameType];
                        var text = str;
                        return text;
                    }
                },
            dir_roomnum:
                {
                    _visible:true,
                    _run:function(){
                        this.ignoreContentAdaptWithSize(true);
                    },
                    _text: function () {
                        var sData=MjClient.data.sData;
                        var tData=sData.tData;

                        var str ="";
                        var text = str;
                        text += ("房间号:" + tData.tableid);
                        return text;
                    }
                },
            time:
                {
                    _visible:true,
                    _run:function(){
                        this.ignoreContentAdaptWithSize(true);
                    },
                    _text: function () {
                        var str = MjClient.roundEndTime;
                        return str;
                    }
                }
        }

    },
    ctor:function () {
        this._super();
        //湘潭跑胡子
        cc.log(JSON.stringify(MjClient.data.sData));

        var endallui = ccs.load("endAll_xiangxiangPHZ.json");
        BindUiAndLogic(endallui.node,this.jsBind);
        this.addChild(endallui.node);
        // setWgtLayout(endallui.node,[0,1],[0,0],[0,0]);
        MjClient.endallui=this;


        // 这是湘潭跑胡子
        var _bgBox = endallui.node.getChildByName("bgBox");
        setWgtLayout(_bgBox,[1,1],[0.5,0.5],[0,0],true);

        var _back = endallui.node.getChildByName("back");
        setWgtLayout(_back,[0.95,0.95],[0.5,0.5],[0,0]);
        // //这是湘潭跑胡子分享
        var _share =  _back.getChildByName("share");
        var sData=MjClient.data.sData;
        var tData=sData.tData;
        _share.visible = !MjClient.remoteCfg.guestLogin && !tData.matchId;

        //_share.x = 713.24;//屏蔽再来一局的时候，坐标要移动一下   这是湘潭跑胡子
        _share.addTouchEventListener(function(sender,Type){
            switch (Type)
            {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.shareMultiPlatform(MjClient.systemConfig.sharePlatforms, function()
                    {
                        COMMON_UI.getShareCodeTexture(tData.tableInfoUrl,_back,function(){
                            cc.log("====================capture_screen=======================");
                            postEvent("capture_screen");
                            if(MjClient.endallui && cc.sys.isObjectValid(MjClient.endallui)){
                                MjClient.endallui.capture_screen = true;
                            }
                            _share.setTouchEnabled(false);
                        });
                    });
                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Fanxiang",  {uid:SelfUid(),gameType:MjClient.gameType});
                    break;
                default :
                    break;
            }
        },this);

        //复制战绩
        addCopyBtnToGameOverLayer(endallui.node);

        //这是湘潭跑胡子   玩家的详细信息
        var infoBg = _back.getChildByName("infoBg");
        var infoBgSize = infoBg.getCustomSize();

        var info = infoBg.getChildByName("info");
        info.visible = false;
        var bgSize = info.getCustomSize();
        var sData = MjClient.data.sData;
        var players = sData.players;
        var playerCount = Object.keys(players).length;

        var startPos = cc.p( (infoBgSize.width - bgSize.width*playerCount) / (playerCount + 1) + bgSize.width / 2,infoBgSize.height/2);
        var clone = null;
        for(var i = 0 ; i < playerCount ; i++){
            clone = info.clone();
            clone.visible = true;
            clone.setPosition(startPos);
            infoBg.addChild(clone);
            SetGameOverLayer_xiangtanPHZ(clone,i);

            COMMON_UI.addGameOverNotSameClubUI(clone,MjClient.getPlayerByIndex(i))


            startPos = cc.p(startPos.x + bgSize.width + ((infoBgSize.width - bgSize.width*playerCount) / (playerCount + 1)) , startPos.y);
        }
        var clubInfoTable = getClubInfoInTable();
        // // 如果是亲友圈的房间显示亲友圈图标及名称  这是湘潭跑胡子
        var clubNode = _back.getChildByName("Image_club");
        if (clubInfoTable && typeof(clubInfoTable.clubAvatar) != "undefined" && clubInfoTable.clubId && clubNode != null)
        {
            var clubName = clubNode.getChildByName("Text_name");
            clubName.ignoreContentAdaptWithSize(true);
            clubName.setString("" + unescape(clubInfoTable.clubTitle));

            var _nameStr = unescape(clubInfoTable.ruleName);
            var _ruleName = clubName.clone();
            _ruleName.ignoreContentAdaptWithSize(true);
            _ruleName.setString(_nameStr);
            _ruleName.y = clubName.y + clubName.height/2 + _ruleName.height/2;
            _ruleName.x = clubName.x;
            clubNode.addChild(_ruleName);

            cc.loader.loadImg(clubInfoTable.clubAvatar, {
                isCrossOrigin: true
            }, function(err, texture) {
                if (err || !texture || !sys.isObjectValid(clubNode))
                    return;

                var sp = new cc.Sprite(texture);
                if (!sp)
                    return;

                sp.setScale((clubNode.width - 8) / sp.width);
                sp.setPosition(cc.p(clubNode.width / 2, clubNode.height / 2));
                clubNode.addChild(sp);
            });
        }
        else if (clubNode != null)
        {
            clubNode.setVisible(false);
        }

        var sData=MjClient.data.sData;
        var tData=sData.tData;

        var jieSanIcon = _back.getChildByName("jieSanIcon");
        jieSanIcon.setVisible(MjClient.isDismiss);

        //解散信息 说明
        var _infoMation_1 =  _back.getChildByName("infoMation");
        _infoMation_1.visible = false;
        var pl = MjClient.data.sData.players[tData.firstDel];

        if(pl){
            var _nameStr = getNewName(unescape(pl.info.nickname) + "");
            _infoMation_1.setString(_nameStr + "于" + MjClient.roundEndTime + "申请解散");
            _infoMation_1.setVisible(true);
            _infoMation_1.setFontName("Arial");
            _infoMation_1.setFontSize(_infoMation_1.getFontSize());
        }

        cc.log(JSON.stringify(MjClient.data.sData));

        // //close ,关闭  这是湘潭跑胡子
        var _close1 =  _back.getChildByName("close");
        _close1.addTouchEventListener(function(sender,Type){
            switch (Type)
            {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Tuichu", {uid:SelfUid(),gameType:MjClient.gameType});
                    if(MjClient.Scene.getChildByName("shareCode")) MjClient.Scene.removeChildByName("shareCode");
                    var clubInfoTable = getClubInfoInTable();
                    if (clubInfoTable && !(MjClient.rePlayVideo >= 0 && MjClient.replayui) ) {
                        if (!MjClient.FriendCard_main_ui)
                            MjClient.Scene.addChild(new FriendCard_main(clubInfoTable.clubId));
                    }
                    //MjClient.leaveGame();
                    //这里的leaveGame肯定会返回{"result":0,"msg":"alreadyLeave"}，所以不用等待返回后再继续
                    //MjClient.native.doCopyToPasteBoard("");//清空剪切板
                    MjClient.gamenet.request("pkplayer.handler.LeaveGame",{},function(rtn){});
                    delete MjClient.data.sData;
                    delete MjClient.gameType;
                    postEvent("LeaveGame");
                    if (!MjClient.enterui && !MjClient.FriendCard_main_ui)
                        MjClient.Scene.addChild(new EnterRoomLayer());

                    if(MjClient.endallui){
                        MjClient.endallui.removeFromParent(true);
                        MjClient.endallui = null;
                    }
                    if(MjClient.rePlayVideo >= 0 && MjClient.replayui){
                        MjClient.replayui.replayEnd();
                    }
                    break;
                default :
                    break;
            }
        },this);

        return true;
    },
    onEnter:function()
    {
        this._super();
        if (MjClient.homeui && MjClient.systemConfig.rankEnable == "true")
        {
            MjClient.homeui.gameRankLayer();
        }
    }
});

function addWxHeadToEndAllUI_xiangPHZ(node,off)
{
    var pl = MjClient.getPlayerByIndex(off);
    var img = "png/default_headpic.png";
    if(pl && pl.wxHeadImg)
    {
        img = pl.wxHeadImg;
    }
    else
    {
        return;
    }
    var sp = new cc.Sprite(img);
    node.addChild(sp);
    var frame = node.getChildByName("frame");
    if (frame){
        frame.zIndex = sp.zIndex + 1;
    }

    // if(pl.onLine == false && MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP){
    setRoundEndUserOffline_xiangxiang(node,pl);
    // }

    setWgtLayout(sp,[0.88,0.88],[0.5,0.5],[0,0],false,true);
}
/*
    湘乡   湘乡跑胡子   字牌大结算  这是湘乡跑胡子
 */
var GameOverLayer_xiangxiangPHZ = cc.Layer.extend({
    sprite:null,
    jsBind:{
        back:{
            close :{
            },
            share :{
                img_shine:{
                    _visible:false
                },
                img_txt:{
                    _visible:false
                },
                img_point:{
                    _visible:false
                },
                _event:{
                    captureScreen_OK:function(){
                        if (MjClient.endallui.capture_screen != true)
                            return;
                        MjClient.endallui.capture_screen = false;
                        var writePath = jsb.fileUtils.getWritablePath();
                        var textrueName = "wxcapture_screen.png";
                        var savepath = writePath+textrueName;
                        MjClient.shareImageToSelectedPlatform(savepath);
                        this.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(function()
                        {
                            this.setTouchEnabled(true);
                        }.bind(this))));
                        if(MjClient.Scene.getChildByName("shareCode")) MjClient.Scene.removeChildByName("shareCode");
                    }
                }
            },
            dir_roomname:
                {
                    _visible:true,
                    _run:function(){
                        this.ignoreContentAdaptWithSize(true);
                    },
                    _text: function () {
                        var sData=MjClient.data.sData;
                        var tData=sData.tData;

                        var str = GameCnName[MjClient.gameType];
                        var text = str;
                        return text;
                    }
                },
            dir_roomnum:
                {
                    _visible:true,
                    _run:function(){
                        this.ignoreContentAdaptWithSize(true);
                    },
                    _text: function () {
                        var sData=MjClient.data.sData;
                        var tData=sData.tData;

                        var str ="";
                        var text = str;
                        text += ("房间号:" + tData.tableid);
                        return text;
                    }
                },
            time:
                {
                    _visible:true,
                    _run:function(){
                        this.ignoreContentAdaptWithSize(true);
                    },
                    _text: function () {
                        var str = MjClient.roundEndTime;
                        return str;
                    }
                }
        }

    },
    ctor:function () {
        this._super();
        //test这是湘乡跑胡子
        cc.log(JSON.stringify(MjClient.data.sData));

        var endallui = ccs.load("endAll_xiangxiangPHZ.json");
        BindUiAndLogic(endallui.node,this.jsBind);
        this.addChild(endallui.node);
        // setWgtLayout(endallui.node,[0,1],[0,0],[0,0]);
        MjClient.endallui=this;


        // 这是湘乡跑胡子
        var _bgBox = endallui.node.getChildByName("bgBox");
        setWgtLayout(_bgBox,[1,1],[0.5,0.5],[0,0],true);

        var _back = endallui.node.getChildByName("back");
        setWgtLayout(_back,[0.95,0.95],[0.5,0.5],[0,0]);
        // //这是湘乡跑胡子分享
        var _share =  _back.getChildByName("share");
        var sData=MjClient.data.sData;
        var tData=sData.tData;
        _share.visible = !MjClient.remoteCfg.guestLogin && !tData.matchId;

        //_share.x = 713.24;//屏蔽再来一局的时候，坐标要移动一下   这是湘乡跑胡子
        _share.addTouchEventListener(function(sender,Type){
            switch (Type)
            {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.shareMultiPlatform(MjClient.systemConfig.sharePlatforms, function()
                    {
                        COMMON_UI.getShareCodeTexture(tData.tableInfoUrl,_back,function(){
                            cc.log("====================capture_screen=======================");
                            postEvent("capture_screen");
                            if(MjClient.endallui && cc.sys.isObjectValid(MjClient.endallui)){
                                MjClient.endallui.capture_screen = true;
                            }
                            _share.setTouchEnabled(false);
                        });
                    });
                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Fanxiang",  {uid:SelfUid(),gameType:MjClient.gameType});
                    break;
                default :
                    break;
            }
        },this);


        //复制战绩
        addCopyBtnToGameOverLayer(endallui.node);

        //这是湘乡跑胡子   玩家的详细信息
        var infoBg = _back.getChildByName("infoBg");
        var infoBgSize = infoBg.getCustomSize();

        var info = infoBg.getChildByName("info");
        info.visible = false;
        var bgSize = info.getCustomSize();
        var sData = MjClient.data.sData;
        var players = sData.players;
        var playerCount = Object.keys(players).length;

        var startPos = cc.p( (infoBgSize.width - bgSize.width*playerCount) / (playerCount + 1) + bgSize.width / 2,infoBgSize.height/2);
        var clone = null;
        for(var i = 0 ; i < playerCount ; i++){
            clone = info.clone();
            clone.visible = true;
            clone.setPosition(startPos);
            infoBg.addChild(clone);
            SetGameOverLayer_xiangxiangPHZ(clone,i);

            COMMON_UI.addGameOverNotSameClubUI(clone,MjClient.getPlayerByIndex(i))

            startPos = cc.p(startPos.x + bgSize.width + ((infoBgSize.width - bgSize.width*playerCount) / (playerCount + 1)) , startPos.y);
        }

        // // 如果是亲友圈的房间显示亲友圈图标及名称  这是湘乡跑胡子
        var clubNode = _back.getChildByName("Image_club");
        var clubInfoTable = getClubInfoInTable();
        if (clubInfoTable && typeof(clubInfoTable.clubAvatar) != "undefined" && clubInfoTable.clubId && clubNode != null)
        {
            var clubName = clubNode.getChildByName("Text_name");
            clubName.ignoreContentAdaptWithSize(true);
            clubName.setString("" + unescape(clubInfoTable.clubTitle));

            var _nameStr = unescape(clubInfoTable.ruleName);
            var _ruleName = clubName.clone();
            _ruleName.ignoreContentAdaptWithSize(true);
            _ruleName.setString(_nameStr);
            _ruleName.y = clubName.y + clubName.height/2 + _ruleName.height/2;
            _ruleName.x = clubName.x;
            clubNode.addChild(_ruleName);

            cc.loader.loadImg(clubInfoTable.clubAvatar, {
                isCrossOrigin: true
            }, function(err, texture) {
                if (err || !texture || !sys.isObjectValid(clubNode))
                    return;

                var sp = new cc.Sprite(texture);
                if (!sp)
                    return;

                sp.setScale((clubNode.width - 8) / sp.width);
                sp.setPosition(cc.p(clubNode.width / 2, clubNode.height / 2));
                clubNode.addChild(sp);
            });
        }
        else if (clubNode != null)
        {
            clubNode.setVisible(false);
        }

        var sData=MjClient.data.sData;
        var tData=sData.tData;

        var jieSanIcon = _back.getChildByName("jieSanIcon");
        jieSanIcon.setVisible(MjClient.isDismiss);

        //解散信息 说明
        var _infoMation_1 =  _back.getChildByName("infoMation");
        _infoMation_1.visible = false;
        var pl = MjClient.data.sData.players[tData.firstDel];

        if(pl){
            var _nameStr = getNewName(unescape(pl.info.nickname) + "");
            _infoMation_1.setString(_nameStr + "于" + MjClient.roundEndTime + "申请解散");
            _infoMation_1.setVisible(true);
            _infoMation_1.setFontName("Arial");
        }

        cc.log(JSON.stringify(MjClient.data.sData));

        // //close ,关闭  这是湘乡跑胡子
        var _close1 =  _back.getChildByName("close");
        _close1.addTouchEventListener(function(sender,Type){
            switch (Type)
            {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Tuichu", {uid:SelfUid(),gameType:MjClient.gameType});
                    if(MjClient.Scene.getChildByName("shareCode")) MjClient.Scene.removeChildByName("shareCode");
                    var clubInfoTable = getClubInfoInTable();
                    if (clubInfoTable && !(MjClient.rePlayVideo >= 0 && MjClient.replayui) ) {
                        if (!MjClient.FriendCard_main_ui)
                            MjClient.Scene.addChild(new FriendCard_main(clubInfoTable.clubId));
                    }
                    //MjClient.leaveGame();
                    //这里的leaveGame肯定会返回{"result":0,"msg":"alreadyLeave"}，所以不用等待返回后再继续
                    //MjClient.native.doCopyToPasteBoard("");//清空剪切板
                    MjClient.gamenet.request("pkplayer.handler.LeaveGame",{},function(rtn){});
                    delete MjClient.data.sData;
                    delete MjClient.gameType;
                    postEvent("LeaveGame");
                    if (!MjClient.enterui && !MjClient.FriendCard_main_ui)
                        MjClient.Scene.addChild(new EnterRoomLayer());

                    if(MjClient.endallui){
                        MjClient.endallui.removeFromParent(true);
                        MjClient.endallui = null;
                    }
                    if(MjClient.rePlayVideo >= 0 && MjClient.replayui){
                        MjClient.replayui.replayEnd();
                    }
                    break;
                default :
                    break;
            }
        },this);

        return true;
    },
    onEnter:function()
    {
        this._super();
        if (MjClient.homeui && MjClient.systemConfig.rankEnable == "true")
        {
            MjClient.homeui.gameRankLayer();
        }
    }
});

//    湘乡(湘乡跑胡子玩法)  大结算设置个人信息  这是湘乡跑胡子
function SetGameOverLayer_xiangxiangPHZ(node,off,isNewUi){
    var sData=MjClient.data.sData;
    var tData=sData.tData;
    var pl=MjClient.getPlayerByIndex(off);
    cc.log("大结算 pl：" + JSON.stringify(pl));

    if(!pl){
        node.setVisible(false);
        return;
    }

    var uidSelf = SelfUid();

    var uibind={
        name:{
            _run:function(){
                this.ignoreContentAdaptWithSize(true);
                this.setFontName("Arial");
                this.setFontSize(this.getFontSize());
            },
            _text:function(){
                if(!pl){
                    return "";
                }
                return getNewName_new(unescape(pl.info.nickname)+"",6);
            }
        },
        id: {
            _run:function(){
                this.ignoreContentAdaptWithSize(true);
            },
            _text: function () {
                if(!pl){
                    return "ID:";
                }
                return  "ID: " + pl.info.uid.toString();
            }
        },
        bigWinner: {
            _run:function(){
                var isShow = true;
                for(var uid in sData.players){
                    var player = sData.players[uid];
                    if(pl.info.uid == player.info.uid){
                        continue;
                    }
                    if(player.winall > pl.winall || pl.winall == 0){
                        isShow = false;
                    }
                }
                this.setVisible(isShow);
            },
        },
        jiachui: {
            _run:function(){
                this.visible = false;
                // var tData = MjClient.data.sData.tData;
                // if(pl.jiazhuNum == 0){
                //     this.loadTexture("gameOver/budatuo.png");
                // }
                // if(tData.areaSelectMode.tuototuo == 0){
                //     this.visible = false;
                // }
            }
        }
    };

    var wxNode = node.getChildByName("head");
    addWxHeadToEndAllUI_xiangPHZ(wxNode,off);
    BindUiAndLogic(node,uibind);

    // 玩家分数   湘乡跑胡子
    var winNum = node.getChildByName("score_text");
    winNum.ignoreContentAdaptWithSize(true);
    var icon = node.getChildByName("icon");
    var scoreContnet = pl.winall != undefined ? pl.winall : 0;

    var textFileName = scoreContnet >= 0 ? "gameOver_new/addScore_zipai.png" : "gameOver_new/loseScore_zipai.png";
    var iconImg = scoreContnet >= 0 ? "gameOver_new/add_zipai.png" : "gameOver_new/sub_zipai.png";
    icon.loadTexture(iconImg);
    winNum.setProperty(scoreContnet + "", textFileName, 33, 46, "0");

    //玩家总胡息
    var textNode = node.getChildByName("textNode");
    // var zonghushu = textNode.getChildByName("zonghushu");
    // var winall = zonghushu.getChildByName("winall");
    // winall.setString((pl.winall/10).toFixed(0)*10);

    //分数位置移动
    var moveSize = winNum.getCustomSize().width / 2;
    winNum.x -= moveSize;
    icon.x -= moveSize;

    if (pl.isNeedFanBei) {
        var offY = 10;
        icon.y += offY;
        winNum.y += offY;

        var fanbeiFormula = node.getChildByName("fanbeiFormula");
        fanbeiFormula.setVisible(true);
        fanbeiFormula.setString("(" + Math.floor(scoreContnet/2*10)/10 + "x2)");
        fanbeiFormula.ignoreContentAdaptWithSize(true);
        var bWin = scoreContnet >= 0;
        fanbeiFormula.setTextColor(bWin? cc.color(0xff,0xf5,0x84):cc.color(0xb0,0xed,0xff));
    }
    
    // 玩家数据信息
    var showRoomStatistics = function(node,showList,data){
        // 胡牌 自摸  提 跑次数统计
        for (var i = 0; i < showList.length; i++) {
            //湘乡跑胡子没有放炮统计
            if(i == 2){
                continue;
            }
            var name = showList[i];
            var text = node.getChildByName(name);
            text.setString("" + data[i]);
        }
    }

    showRoomStatistics(textNode,["huNum","ziMoNum","dianpaoNum","tiPaiNum","paoPaiNum"],pl.roomStatistics);
};


//  斗地主大结算
var GameOverLayer_ganDengYan = cc.Layer.extend({
    sprite:null,
    jsBind:{
        back:{
            share:{
                img_shine:{
                    _visible:false
                },
                img_txt:{
                    _visible:false
                },
                img_point:{
                    _visible:false
                },
                _event:{
                    captureScreen_OK:function(){
                        if (MjClient.endallui.capture_screen != true)
                            return;
                        MjClient.endallui.capture_screen = false;
                        var writePath = jsb.fileUtils.getWritablePath();
                        var textrueName = "wxcapture_screen.png";
                        var savepath = writePath+textrueName;
                        MjClient.shareImageToSelectedPlatform(savepath);
                        this.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(function()
                        {
                            this.setTouchEnabled(true);
                        }.bind(this))));
                        if(MjClient.Scene.getChildByName("shareCode")) MjClient.Scene.removeChildByName("shareCode");
                    }
                }
            },
        }
    },
    ctor:function () {
        this._super();
        var endallui = ccs.load(res.EndAll_doudizhu_json);
        BindUiAndLogic(endallui.node,this.jsBind);
        this.addChild(endallui.node);
        MjClient.endallui=this;

        var _block = endallui.node.getChildByName("block");
        setWgtLayout(_block,[1,1],[0.5,0.5],[0,0], true);

        var _bg = endallui.node.getChildByName("bg");
        if (_bg) {
            setWgtLayout(_bg, [1, 1], [0.5, 0.0], [0,0]);
            _bg.height += (MjClient.size.height / _bg.scaleY - _bg.height) / 2;
        }

        var isNewUi = (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ ||MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ);

        /*
         changed by sking
         */
        var _back = endallui.node.getChildByName("back");
        if(isJinZhongAPPType() || MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_GZ)
        {
            if(isIPhoneX())
                setWgtLayout(_back,[0.85,0.85],[0.5,0.5],[0,0],false);
            else
                setWgtLayout(_back,[1,1],[0.5,0.5],[0,0]);
        }
        else if(MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) {
            setWgtLayout(_back,[1,1],[0.5,0.5],[0, 0]);
        }
        if (MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP && isIPhoneX()) {
            setWgtLayout(_back, [0.85,0.85],[0.5,0.5],[0,0], false);
        }
        else {
            setWgtLayout(_back,[1,1],[0.5,0.5],[0, -0.025]);
        }

        var infoMation_bg = _back.getChildByName("infoMation_bg");
        if (infoMation_bg)
        {
            infoMation_bg.ignoreContentAdaptWithSize(false); 
            infoMation_bg.setSize(cc.size(400, 60));             
        }


        //分享
        var _share =  _back.getChildByName("share");
        var sData=MjClient.data.sData;
        var tData=sData.tData;
        _share.visible = !MjClient.remoteCfg.guestLogin && !tData.matchId;


        //_share.x = 713.24;//屏蔽再来一局的时候，坐标要移动一下
        _share.addTouchEventListener(function(sender,Type){
            switch (Type)
            {
                case ccui.Widget.TOUCH_ENDED:
                    if(isJinZhongAPPType() && 
                        MjClient.gameType != MjClient.GAME_TYPE.LV_LIANG_DA_QI && 
                        MjClient.gameType != MjClient.GAME_TYPE.SHAN_XI_GAN_DENG_YAN) { // 打七除外
                        ShareGameOverInfo();
                    } else {
                        MjClient.shareMultiPlatform(MjClient.systemConfig.sharePlatforms, function()
                        {
                            COMMON_UI.getShareCodeTexture(tData.tableInfoUrl,_back,function(){
                                cc.log("====================capture_screen=======================");
                                postEvent("capture_screen");
                                if(MjClient.endallui && cc.sys.isObjectValid(MjClient.endallui)){
                                    MjClient.endallui.capture_screen = true;
                                }
                                _share.setTouchEnabled(false);
                            });
                        });
                    }
                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Dajiesuanjiemian_Fenxiang",  {uid:SelfUid(),gameType:MjClient.gameType});
                    break;
                default :
                    break;
            }
        },this);
        var clubInfoTable = getClubInfoInTable();
        if (clubInfoTable && clubInfoTable.clubId) {
            _share.x = _share.getParent().width / 2;
        }

        // 如果是亲友圈的房间显示亲友圈图标及名称
        var image_title = _back.getChildByName("Image_title");
        var clubNode = _back.getChildByName("Image_club");
        if ((MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP 
            || MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ)
         && clubInfoTable && typeof(clubInfoTable.clubAvatar) != "undefined" && clubInfoTable.clubTitle && clubInfoTable.ruleName && clubNode != null) 
        {
            if (image_title)
                image_title.setVisible(false);

            var clubName = clubNode.getChildByName("Text_name");
            clubName.ignoreContentAdaptWithSize(true);
            clubName.setString(unescape(clubInfoTable.clubTitle) + " " + (clubInfoTable.ruleName ? "(" + GameCnName[MjClient.gameType] + ")" : ""));

            var _nameStr = unescape(clubInfoTable.ruleName);
            var _ruleName = clubName.clone();
            _ruleName.ignoreContentAdaptWithSize(true);
            _ruleName.setString(_nameStr);
            _ruleName.y = clubName.y + clubName.height/2 + _ruleName.height/2;
            _ruleName.x = clubName.x;
            clubNode.addChild(_ruleName);

            cc.loader.loadImg(clubInfoTable.clubAvatar ? clubInfoTable.clubAvatar : "png/default_headpic.png", {
                isCrossOrigin: true
            }, function(err, texture) {
                if (err || !texture || !sys.isObjectValid(clubNode))
                    return;

                var sp = new cc.Sprite(texture);
                if (!sp)
                    return;

                sp.setScale((clubNode.width - 8) / sp.width);
                sp.setPosition(cc.p(clubNode.width / 2, clubNode.height / 2));
                clubNode.addChild(sp);
            });
        }
        else if (clubInfoTable && typeof(clubInfoTable.clubAvatar) != "undefined" && clubInfoTable.clubId && clubNode != null)
        {
            if (image_title)
                image_title.setVisible(false);

            var clubName = clubNode.getChildByName("Text_name");
            clubName.ignoreContentAdaptWithSize(true);
            clubName.setString("" + unescape(clubInfoTable.clubTitle));

            var _nameStr = unescape(clubInfoTable.ruleName);
            var _ruleName = clubName.clone();
            _ruleName.ignoreContentAdaptWithSize(true);
            _ruleName.setString(_nameStr);
            _ruleName.y = clubName.y + clubName.height/2 + _ruleName.height/2;
            _ruleName.x = clubName.x;
            clubNode.addChild(_ruleName);

            cc.loader.loadImg(clubInfoTable.clubAvatar ? clubInfoTable.clubAvatar : "png/default_headpic.png", {
                isCrossOrigin: true
            }, function(err, texture) {
                if (err || !texture || !sys.isObjectValid(clubNode))
                    return;

                var sp = new cc.Sprite(texture);
                if (!sp)
                    return;

                sp.setScale((clubNode.width - 8) / sp.width);
                sp.setPosition(cc.p(clubNode.width / 2, clubNode.height / 2));
                clubNode.addChild(sp);
            });
        }
        else if (clubNode != null)
        {
            clubNode.setVisible(false);
        }

        //信息 说明
        var _infoMation =  _back.getChildByName("infoMation");
        _infoMation.visible = true;

        var _infoMation2 =  _back.getChildByName("infoMation_2");
        if (_infoMation2 == null) {
            _infoMation2 =  _back.getChildByName("infoMation_1"); // 永州工程
        }
        cc.log(" ----------- _infoMation2----------- 9999999  ",_infoMation2)
        if (_infoMation2) {
            _infoMation2.setString("")
            _infoMation2.visible = true;
            _infoMation2.ignoreContentAdaptWithSize(true);

            //描述结算
            var sData=MjClient.data.sData;
            var tData=sData.tData;
            cc.log(" --------isDismiss  ",MjClient.isDismiss);
            if (MjClient.isDismiss)
            {

                var id = tData.firstDel;
                var pl = sData.players[id];
                var delStr = "";
                if(pl)
                {
                    var name  =  unescape(pl.info.nickname );
                    delStr = name + pl.mjdesc[0];
                }
                else
                {
                    // 系统、会长或管理员解散房间
                    pl = getUIPlayer(0);
                    if (pl)
                        delStr = pl.mjdesc[0];
                }

                _infoMation2.setString("" + delStr) ;
            }
        }

        function _infoText(){
            var sData=MjClient.data.sData;
            var tData=sData.tData;
            var text = GameCnName[MjClient.gameType];

            if (isNewUi) {
                text += "-" + tData.maxPlayer + "人\n";
                var roundNumPre = typeof(tData.roundNumPre) != "undefined" ? tData.roundNumPre : tData.roundNum;
                text += "房号：" + tData.tableid
                if (roundNumPre && tData.roundAll - tData.roundNumPre + 1 <= tData.roundAll)
                {
                    var extraNum = tData.extraNum ? tData.extraNum:0;
                    text += " 局数：" + (tData.roundAll - tData.roundNumPre + 1 + extraNum) + "/" + tData.roundAll;
                }
                    
                text += "\n";
                if(MjClient.roundEndTime)
                    text += MjClient.roundEndTime + "";
            } else {
                var strPayWay = "";
                switch (tData.areaSelectMode.payWay)
                {
                    case 0:
                        strPayWay = ",房主付";
                        break;
                    case 1:
                        strPayWay = ",AA付";
                        break;
                    case 2:
                        strPayWay = ",大赢家付";
                        break;
                }
                text += strPayWay;

                text += "," + 8 * Math.pow(2,tData.areaSelectMode.fengDing) + "倍封顶";
                text += [",赢家补牌",",全体补牌"][tData.areaSelectMode.addCard];
                text += tData.areaSelectMode.zhaDanFanBei ? ",炸弹翻倍" : "";
                text += tData.areaSelectMode.guanMenFanBei ? ",关门翻倍" : "";
                text += tData.areaSelectMode.sanZha ? ",三炸" : "";
                text += tData.areaSelectMode.difen ? ",底分X"+ tData.areaSelectMode.difen : "";

                text += ",房间号:";
                text += tData.tableid;
                var clubInfoTable = getClubInfoInTable();
                if (clubInfoTable){
                    //需求：海安、晋中、南通 对于俱乐部牌局，在大结算、大结算分享图中，增加显示，亲友圈ID，并显示对应的玩法名称【是会长建立玩法时设定的玩法名称】
                    if(MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ ||
                        isJinZhongAPPType() ||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP ){
                        text += ",亲友圈ID:";
                        text += clubInfoTable.clubId;
                        if(clubInfoTable.ruleName){
                            text = text+"（"+unescape(clubInfoTable.ruleName)+"）";
                        }
                    }
                }
            }

            return text;
        }
        _infoMation.setString(_infoText());
        _infoMation.setFontName("Arial");
        _infoMation.setFontSize(_infoMation.getFontSize());
        // 晋中换皮
        if (!isNewUi && MjClient.getAppType() != MjClient.APP_TYPE.TXJINZHONGMJ && MjClient.getAppType() != MjClient.APP_TYPE.DQSHANXIMJ  && MjClient.getAppType() != MjClient.APP_TYPE.QXYZQP
            && MjClient.getAppType() != MjClient.APP_TYPE.QXSYDTZ && MjClient.getAppType() != MjClient.APP_TYPE.HUNANWANGWANG &&
            MjClient.getAppType() != MjClient.APP_TYPE.AYGUIZHOUMJ)
            _infoMation.ignoreContentAdaptWithSize(true);

        //时间
        var _time =  _back.getChildByName("time");
        _time.visible = true;
        _time.setString("");

        if (isNewUi) {
            if (MjClient.getAppType() != MjClient.APP_TYPE.QXTHMJ) {
                //描述结算
                if (MjClient.isDismiss) {
                    var id = tData.firstDel;
                    var pl = sData.players[id];
                    var delStr = "";
                    if(pl)
                    {
                        var name  =  unescape(pl.info.nickname );
                        delStr = name + pl.mjdesc[0];
                    }
                    else
                    {
                        // 系统、会长或管理员解散房间
                        pl = getUIPlayer(0);
                        if (pl)
                            delStr = pl.mjdesc[0];
                        if (pl)
                        {
                            for(var i =0;i<pl.mjdesc.length;i++)
                            {
                                if(pl.mjdesc[i].indexOf("管理员")>=0||pl.mjdesc[i].indexOf("会长")>=0)
                                    delStr=pl.mjdesc[i];
                            }
                            //delStr = pl.mjdesc[0];
                        }
                    }
                    _time.setString(delStr);
                }
            }
        } else {
            cc.log("MjClient.roundEndTime == " + MjClient.roundEndTime);
            if(MjClient.roundEndTime)
                _time.setString(MjClient.roundEndTime);
        }

        var nantongReplay = function() {
            var tData = MjClient.data.sData.tData;
            var para = tData.areaSelectMode;
            var inviteVipTable = MjClient.data.inviteVipTable;
            para.maxPlayer = tData.maxPlayer;
            para.gameType = tData.gameType;

            MjClient.showMsg("是否再来一局？", function () {
                MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Zailaiyiju", {uid:SelfUid(),gameType:para.gameType});
                if (inviteVipTable)
                {
                    MjClient.joinGame(inviteVipTable, null, false, para.gameType);
                }
                else
                {
                    MjClient.createRoom(para, tData.roundAll, tData.areaSelectMode.payWay, function (rtn)
                    {
                        if(rtn.result==0)
                        {
                            MjClient.rematchInfo(MjClient.data.vipTable, tData.uids);
                        }
                    });
                }
            }, function(){}, "1", "nantongReplay");
        };

        //close ,关闭
        var _close1 =  _back.getChildByName("close");
        this._close1 = _close1;
        _close1.addTouchEventListener(function(sender,Type){
            switch (Type)
            {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Tuichu", {uid:SelfUid(),gameType:MjClient.gameType});
                    if(MjClient.Scene.getChildByName("shareCode")) MjClient.Scene.removeChildByName("shareCode");
                   
                    var clubInfoTable = getClubInfoInTable();
                    if (clubInfoTable) {
                        if (!MjClient.FriendCard_main_ui)
                            MjClient.Scene.addChild(new FriendCard_main(clubInfoTable.clubId));
                    }

                    //MjClient.leaveGame();
                    //这里的leaveGame肯定会返回{"result":0,"msg":"alreadyLeave"}，所以不用等待返回后再继续
                    //MjClient.native.doCopyToPasteBoard("");//清空剪切板
                    MjClient.gamenet.request("pkplayer.handler.LeaveGame",{},function(rtn){});
                    delete MjClient.data.sData;
                    delete MjClient.gameType;
                    postEvent("LeaveGame");
                    //if (!MjClient.enterui && !MjClient.FriendCard_main_ui)
                    //    MjClient.Scene.addChild(new EnterRoomLayer());

                    if(MjClient.endallui){
                        MjClient.endallui.removeFromParent(true);
                        MjClient.endallui = null;
                    }

                    if(cc.sys.isObjectValid(MjClient.goldMatchingui)){
                        MjClient.goldMatchingui.removeFromParent();
                        delete  MjClient.goldMatchingui;
                    }

                    break;
                default :
                    break;
            }
        },this);



        //再来一局
        var _btnReplay =  _back.getChildByName("btnReplay");
        var tData = MjClient.data.sData.tData;


        if(MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ ||
            /*isJinZhongAPPType() ||*/
            MjClient.getAppType() == MjClient.APP_TYPE.TXLVLIANGMJ ||
            MjClient.getAppType() == MjClient.APP_TYPE.TXLINFENMJ ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ
        )
        {
            // _btnReplay.visible = true;
            _btnReplay.visible = !MjClient.remoteCfg.guestLogin && !tData.matchId;
            _btnReplay.visible = !getClubInfoInTable();

        }
        else
        {
            _btnReplay.visible = false;  //屏蔽再来一局
        }
        if (MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_ZERO) 
        {
            _btnReplay.visible = true;  //屏蔽再来一局
        }

        _btnReplay.addTouchEventListener(function(sender,Type){
            switch (Type)
            {
                case ccui.Widget.TOUCH_ENDED:
                    if(MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ)//淮安斗地主，南通APP再来一局退出到主界面再提示
                    {
                        nantongReplay();

                        //MjClient.leaveGame();
                        //这里的leaveGame肯定会返回{"result":0,"msg":"alreadyLeave"}，所以不用等待返回后再继续
                        //MjClient.native.doCopyToPasteBoard("");//清空剪切板
                        MjClient.gamenet.request("pkplayer.handler.LeaveGame",{},function(rtn){});
                        delete MjClient.data.sData;
                        delete MjClient.gameType;
                        postEvent("LeaveGame");
                        //if (!MjClient.enterui && !MjClient.FriendCard_main_ui)
                        //    MjClient.Scene.addChild(new EnterRoomLayer());

                        if(MjClient.endallui){
                            MjClient.endallui.removeFromParent(true);
                            MjClient.endallui = null;
                        }

                    }
                    else
                    {
                        MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Dajiesuanjiemian_Zailaiyiju", {uid:SelfUid(),gameType:MjClient.gameType});
                        if (MjClient.data.inviteVipTable)
                        {
                            MjClient.leaveGame(function()
                            {
                                cc.log("--------------reCreateRoom2")

                                MjClient.joinGame(MjClient.data.inviteVipTable, null, false, MjClient.gameType);
                            });
                        }
                        else
                        {
                            MjClient.reCreateRoom();
                        }

                    }
                    break;
                default :
                    break;
            }
        },this);

        var self = this;
        if(tData.matchId){
            _close1.setVisible(false);
            var endTitle = _back.getChildByName("end_title");
            endTitle.loadTexture("winGame/BL_jieshu.png");
            endTitle.ignoreContentAdaptWithSize(true);

            var _btnReplay =  _back.getChildByName("roundEndText");
            _btnReplay.setVisible(true);
        }
        var textNum =  _back.getChildByName("Text_num");
        var text3 =  _back.getChildByName("Text_3");
        var text5 =  _back.getChildByName("Text_5");
        UIEventBind(null,this,"leftTable",function(data){
            //num.setString(self._data.condition - data.signUpCount);
            textNum.setString(data.leftTable);
            textNum.setVisible(true);
            text3.setVisible(true);
            text5.setVisible(true);
        })

        // 显示复制按钮
        addCopyBtnToGameOverLayer(endallui.node);

        //四个玩家的详细信息
        var infoBg = _back.getChildByName("infoBg");
        var infoBgSize = infoBg.getCustomSize();

        var info = infoBg.getChildByName("info");
        info.visible = false;
        var bgSize = info.getCustomSize();
        var sData = MjClient.data.sData;
        var players = sData.players;
        var playerCount = Object.keys(players).length;

        //var off_x = (infoBgSize.width - playerCount*bgSize.width)/(playerCount-1);
        //var startPos = cc.p(bgSize.width/2,infoBgSize.height/2);

        var off_x = bgSize.width*(4 -playerCount)/4;
        if(MjClient.gameType == MjClient.GAME_TYPE.LV_LIANG_DA_QI
            ||MjClient.gameType == MjClient.GAME_TYPE.XIN_ZHOU_SAN_DA_ER
            ||MjClient.gameType == MjClient.GAME_TYPE.DA_TONG_ZHA_GU_ZI
            ||MjClient.gameType == MjClient.GAME_TYPE.SHAN_XI_GAN_DENG_YAN){
            bgSize.width = 242;
            off_x = bgSize.width*(6 -playerCount)/14;
            bgSize.width = bgSize.width * 0.95;
            info.setScale(0.98);
            // info.setPosition(cc.p(info.x, info.y+100));
            // info.getChildByName("allscore").setScale(1.3);
            // info.getChildByName("allscore").getChildByName("bigWinner").setPosition(cc.p(110, 300));
            // info.getChildByName("allscore").getChildByName("bigWinner").setScale(1.25);
        }

        // 南通/海安
        if (MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP
            || MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ
            || MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ) {
            off_x = (1085 - bgSize.width * playerCount) / (playerCount - 1);
        }

        var startPos = cc.p(infoBgSize.width/2 - playerCount*(bgSize.width + off_x)/2 + (bgSize.width + off_x)/2, infoBgSize.height/2);

        // 晋中换皮
        if (isJinZhongAPPType() || MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_GZ) {
            startPos = cc.p(infoBgSize.width/2 - playerCount*(bgSize.width + off_x)/2 + (bgSize.width + off_x)/2, 0);
        }

        var clone = null;
        for(var i = 0 ; i < playerCount ; i++){
            clone = info.clone();
            clone.visible = true;
            infoBg.addChild(clone, 4 - i);
            
            SetGameOverLayer_ganDengYan(clone,i, isNewUi);

            clone.setPosition(startPos);

            COMMON_UI.addGameOverNotSameClubUI(clone,MjClient.getPlayerByIndex(i))

            startPos = cc.p(startPos.x + bgSize.width + off_x,startPos.y);
        }
        return true;
    },
    onEnter:function()
    {
        this._super();
        if (MjClient.homeui && MjClient.systemConfig.rankEnable == "true")
        {
            MjClient.homeui.gameRankLayer();
        }
    },
    replaySet : function(cb){ // 邵阳斗地主需要用到 replaySet
        this._close1.addTouchEventListener(function(sender,type){
            if (type == ccui.Widget.TOUCH_ENDED)
                MjClient.goOnReplay();
        }, this);
    }
});

// 干瞪眼大结算
function SetGameOverLayer_ganDengYan(node,off,isNewUi)
{
    var sData=MjClient.data.sData;
    var tData=sData.tData;
    var pl=MjClient.getPlayerByIndex(off);
    if(!pl){
        node.setVisible(false);
        return;
    }

    var uidSelf = SelfUid();
    var MaxWinAll=0;
    var MaxDianPao=0;
    var MaxlosePlayer = null;
    var MaxWinPlayer = null;
    var MaxloseAll = 999999999;

    //计算所有人数据
    for (var uid in sData.players) {
        var pi = sData.players[uid];
        if (pi) {
            if (MaxWinAll < pi.winall) {
                MaxWinAll = pi.winall;
                MaxWinPlayer = uid;

            }else if (MaxWinAll == pi.winall) {
                if (parseInt(uid) < parseInt(MaxWinPlayer)) {
                    MaxWinAll = pi.winall;
                    MaxWinPlayer = uid;
                }
            }
            if (pi.winall < MaxloseAll) {
                MaxloseAll = pi.winall;
                MaxlosePlayer = uid;
            }else if (pi.winall == MaxloseAll) {
                if (parseInt(uid) < parseInt(MaxlosePlayer)) {
                    MaxloseAll = pi.winall;
                    MaxlosePlayer = uid;
                }
            }
        }
    }

    pl.winall = revise(pl.winall);

    var uibind={
        dayingjia_light:{
            _visible: false,
            _run: function() {
                if(MaxWinAll != 0 && MaxWinAll == pl.winall )//大赢家
                {
                    this.visible = true;
                }
            },
        },
        name:{
            _run:function(){
                this.setFontName("Arial");
                this.setFontSize(this.getFontSize());
                this.ignoreContentAdaptWithSize(true);
                if(pl.winall < 0) { //输家
                    this.setColor(cc.color(37,69,89));
                }
                else {
                    this.setColor(cc.color(88,45,45));
                }
            },
            _text:function(){
                if(!pl){
                    return "";
                }
                return getNewName(unescape(pl.info.nickname)+"");
            }
        },
        id: {
            _run:function(){
                this.ignoreContentAdaptWithSize(true);
                if(pl.winall < 0) { //输家
                    this.setColor(cc.color(37,69,89));
                }
                else {
                    this.setColor(cc.color(88,45,45));
                }
            },
            _text: function () {
                if(!pl){
                    return "";
                }
                return  pl.info.uid.toString();
            }
        },
        allscore:{
            winNum1:{
                _run: function() {
                    this.ignoreContentAdaptWithSize(true);
                },
            },
            winNum2:{
                _run: function() {
                    this.ignoreContentAdaptWithSize(true);
                },
            },
            bigWinner:{
                _visible : false
            }
        },
        listView:{
            _run:function(){
                this.setScrollBarEnabled(false);
                var itemModel = this.children[0];

                /*
                if(MaxWinAll !=0 && MaxWinAll == pl.winall )//大赢家
                {
                    //itemModel.getChildByName("title").setColor(cc.color(221,78,0));
                    itemModel.getChildByName("title").setColor(cc.color(255,255,255));
                }
                else if(pl.winall < 0)//输家
                {
                    //itemModel.getChildByName("score").setColor(cc.color(104,104,104));
                    itemModel.getChildByName("score").setColor(cc.color(255,255,255));
                }
                */

                if(pl.winall < 0) { //输家
                    itemModel.getChildByName("title").setColor(cc.color(37,69,89));
                    itemModel.getChildByName("score").setColor(cc.color(37,69,89));
                }
                else {
                    itemModel.getChildByName("title").setColor(cc.color(88,45,45));
                    itemModel.getChildByName("score").setColor(cc.color(88,45,45));
                }


                this.setItemModel(itemModel);
                this.removeAllChildren();

                var listView = this;
                listView.setTouchEnabled(false);
                for(var i = 0;i < 3;i++) {
                    listView.pushBackDefaultItem();
                    var children = listView.children;
                    var insertItem = children[children.length-1];

                    var title = insertItem.getChildByName("title");
                    var scoreLabel = insertItem.getChildByName("score");

                    title.ignoreContentAdaptWithSize(true);
                    scoreLabel.ignoreContentAdaptWithSize(true);

                    if(i == 0)
                    {
                        title.setString("赢" + (pl.roomStatistics[0] || "0") + "局");
                        scoreLabel.setString(pl.roomStatistics[3] || "0");
                    }
                    else if(i == 1)
                    {
                        title.setString("单局最高");
                        scoreLabel.setString(pl.roomStatistics[2] || "0");
                    }
                    else if(i == 2)
                    {
                        title.setString("炸弹个数");
                        scoreLabel.setString(pl.roomStatistics[1] || "0");
                    }
                }
            }
        },
    };

    var wxNode = node.getChildByName("head");
    if (MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ || MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG) {
        CircularCuttingHeadImg(wxNode, pl);
    }
    else {
       addWxHeadToEndUI(wxNode, off);
    }
    BindUiAndLogic(node,uibind);
    // node.getChildByName("fangzhu").visible =false;

    // if(MjClient.getAppType() ==  MjClient.APP_TYPE.QXJSMJ ||
    //     MjClient.getAppType() ==  MjClient.APP_TYPE.QXYYQP ||
    //     MjClient.getAppType() ==  MjClient.APP_TYPE.QXHAIANMJ)
    // {
    //     setUserOfflineWinGamePanel(node,pl);
    // }
    setUserOfflineWinGamePanel(node,pl);
    if(!pl)
    {
        uibind.allscore.visible = false;
        node.getChildByName("fangzhu").visible =false;
        return;
    }


    var _bgNode = node;
    var _name = node.getChildByName("name");
    var _id = node.getChildByName("id");

    if(MaxWinAll !=0 && MaxWinAll == pl.winall )//大赢家
    {
        _bgNode.loadTexture("gameOver/gerenxinxi_2.png");
    }
    else if(pl.winall < 0)//输家
    {
        _bgNode.loadTexture("gameOver/gerenxinxi_3.png");

        // var _textIcon1 = node.getChildByName("allscore")
        // _textIcon1.loadTexture("gameOver/zongchengji_1.png");
    }



    var numValue = Math.abs(pl.winall) + "";
    //最高得分
    uibind.allscore.visible = true;
    uibind.allscore.bigWinner._node.visible = false;
    if(pl.winall >= 0){
        var winNum1 = node.getChildByName("allscore").getChildByName("winNum1");
        winNum1.setString(pl.winall + "");
        winNum1.ignoreContentAdaptWithSize(true);
        if (!isNewUi)
            // winNum1.setScale(0.8);
        var winNum2 = node.getChildByName("allscore").getChildByName("winNum2");
        winNum2.visible = false;
    }else{
        var winNum2 = node.getChildByName("allscore").getChildByName("winNum2");
        winNum2.setString(Math.abs(pl.winall) + "");
        winNum2.ignoreContentAdaptWithSize(true);
        if (!isNewUi)
            // winNum2.setScale(0.8);
        var winNum1 = node.getChildByName("allscore").getChildByName("winNum1");
        winNum1.visible = false;
    }
    var nodeParent = node.getParent().getParent();
    var _share = nodeParent.getChildByName("share");
    var _shine = _share.getChildByName("img_shine");
    var _point = _share.getChildByName("img_point");
    var _txt = _share.getChildByName("img_txt");
    if(pl.winall == MaxWinAll && pl.winall != 0){
        uibind.allscore.bigWinner._node.visible = true;
        var act_Func = function() {
            var a = cc.scaleTo(0.5, 1.0);
            var aa = cc.fadeIn(0.5);
            var a1 = cc.scaleTo(1.0, 4);
            var a2 = cc.fadeOut(1.0);
            var act_2 = cc.rotateBy(0.8, 30);
            var act_3 = cc.rotateBy(0.8, -30);
            var a3 =  cc.callFunc(function() {
                _shine.setScale(1);
            }.bind(_shine));
            _shine.runAction(cc.sequence(cc.spawn(a,aa), cc.spawn(a1,a2),a3,cc.delayTime(0.1)).repeatForever());
            _point.runAction(cc.sequence(act_2, act_3).repeatForever());

        }
        var clubInfoTable = getClubInfoInTable();
        if (clubInfoTable && pl.info.uid == SelfUid() && MjClient.getAppType() != MjClient.APP_TYPE.QXYYQP && MjClient.getAppType() != MjClient.APP_TYPE.HUBEIMJ && MjClient.getAppType() != MjClient.APP_TYPE.YLHUNANMJ) {
            _shine.setVisible(true);
            _point.setVisible(true);
            _txt.setVisible(true);
            act_Func();
        }
    }
    var pos = cc.p(10, 345)
    if(MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_GZ && MjClient.getAppType() == MjClient.APP_TYPE.AYGUIZHOUMJ) pos = cc.p(-115, 312);
    AddFangKaIcon(sData, uibind.allscore._node, tData, pl, MaxWinAll, MaxWinPlayer,  MaxloseAll, MaxlosePlayer, pos);

    node.getChildByName("fangzhu").visible = tData.owner == pl.info.uid;
}

//  武穴隔板大结算
var GameOverLayer_Poker = cc.Layer.extend({
    sprite:null,
    jsBind:{
        back:{
            share:{
                img_shine:{
                    _visible:false
                },
                img_txt:{
                    _visible:false
                },
                img_point:{
                    _visible:false
                },
                _event:{
                    captureScreen_OK:function(){
                        if (MjClient.endallui.capture_screen != true)
                            return;
                        MjClient.endallui.capture_screen = false;
                        var writePath = jsb.fileUtils.getWritablePath();
                        var textrueName = "wxcapture_screen.png";
                        var savepath = writePath+textrueName;
                        MjClient.shareImageToSelectedPlatform(savepath);
                        this.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(function()
                        {
                            this.setTouchEnabled(true);
                        }.bind(this))));
                        if(MjClient.Scene.getChildByName("shareCode")) MjClient.Scene.removeChildByName("shareCode");
                    }
                }
            },
        }
    },
    ctor:function (res_json) {
        this._super();
        var endallui = ccs.load(res_json ? res_json : res.endAll_Poker_json); 
        BindUiAndLogic(endallui.node,this.jsBind);
        this.addChild(endallui.node);
        MjClient.endallui=this;

        var _block = endallui.node.getChildByName("block");
        setWgtLayout(_block,[1,1],[0.5,0.5],[0,0], true);

        var _bg = endallui.node.getChildByName("bg");
        if (_bg) {
            setWgtLayout(_bg, [1, 1], [0.5, 0.0], [0,0]);
            _bg.height += (MjClient.size.height / _bg.scaleY - _bg.height) / 2;
        }

        var isNewUi = (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ);

        /*
         changed by sking
         */
        var _back = endallui.node.getChildByName("back");
        if(isJinZhongAPPType() || MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_GZ)
        {
            if(isIPhoneX())
                setWgtLayout(_back,[0.85,0.85],[0.5,0.5],[0,0],false);
            else
                setWgtLayout(_back,[1,1],[0.5,0.5],[0,0]);
        }
        else if(MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ  || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) {
            setWgtLayout(_back,[1,1],[0.5,0.5],[0, 0]);
        }
        if (MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP && isIPhoneX()) {
            setWgtLayout(_back, [0.85,0.85],[0.5,0.5],[0,0], false);
        }
        else {
            setWgtLayout(_back,[1,1],[0.5,0.5],[0, -0.025]);
        }

        var infoMation_bg = _back.getChildByName("infoMation_bg");
        if (infoMation_bg)
        {
            infoMation_bg.ignoreContentAdaptWithSize(false); 
            infoMation_bg.setSize(cc.size(400, 60));             
        }


        //分享
        var _share =  _back.getChildByName("share");
        var sData=MjClient.data.sData;
        var tData=sData.tData;
        _share.visible = !MjClient.remoteCfg.guestLogin && !tData.matchId;


        //_share.x = 713.24;//屏蔽再来一局的时候，坐标要移动一下
        _share.addTouchEventListener(function(sender,Type){
            switch (Type)
            {
                case ccui.Widget.TOUCH_ENDED:
                    if(isJinZhongAPPType() && MjClient.gameType != MjClient.GAME_TYPE.LV_LIANG_DA_QI) { // 打七除外
                        ShareGameOverInfo();
                    } else {
                        MjClient.shareMultiPlatform(MjClient.systemConfig.sharePlatforms, function()
                        {
                            COMMON_UI.getShareCodeTexture(tData.tableInfoUrl,_back,function(){
                                cc.log("====================capture_screen=======================");
                                postEvent("capture_screen");
                                if(MjClient.endallui && cc.sys.isObjectValid(MjClient.endallui)){
                                    MjClient.endallui.capture_screen = true;
                                }
                                _share.setTouchEnabled(false);
                            });
                        });
                    }
                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Dajiesuanjiemian_Fenxiang",  {uid:SelfUid(),gameType:MjClient.gameType});
                    break;
                default :
                    break;
            }
        },this);
        var clubInfoTable = getClubInfoInTable();
        if (clubInfoTable && clubInfoTable.clubId) {
            _share.x = _share.getParent().width / 2;
        }

        // 如果是亲友圈的房间显示亲友圈图标及名称
        var image_title = _back.getChildByName("Image_title");
        var clubNode = _back.getChildByName("Image_club");
        if ((MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP 
            || MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ)
         && clubInfoTable && typeof(clubInfoTable.clubAvatar) != "undefined" && clubInfoTable.clubTitle && clubInfoTable.ruleName && clubNode != null) 
        {
            if (image_title)
                image_title.setVisible(false);

            var clubName = clubNode.getChildByName("Text_name");
            clubName.ignoreContentAdaptWithSize(true);
            clubName.setString(unescape(clubInfoTable.clubTitle) + " " + (clubInfoTable.ruleName ? "(" + GameCnName[MjClient.gameType] + ")" : ""));

            var _nameStr = unescape(clubInfoTable.ruleName);
            var _ruleName = clubName.clone();
            _ruleName.ignoreContentAdaptWithSize(true);
            _ruleName.setString(_nameStr);
            _ruleName.y = clubName.y + clubName.height/2 + _ruleName.height/2;
            _ruleName.x = clubName.x;
            clubNode.addChild(_ruleName);

            cc.loader.loadImg(clubInfoTable.clubAvatar ? clubInfoTable.clubAvatar : "png/default_headpic.png", {
                isCrossOrigin: true
            }, function(err, texture) {
                if (err || !texture || !sys.isObjectValid(clubNode))
                    return;

                var sp = new cc.Sprite(texture);
                if (!sp)
                    return;

                sp.setScale((clubNode.width - 8) / sp.width);
                sp.setPosition(cc.p(clubNode.width / 2, clubNode.height / 2));
                clubNode.addChild(sp);
            });
        }
        else if (clubInfoTable && typeof(clubInfoTable.clubAvatar) != "undefined" && clubInfoTable.clubId && clubNode != null)
        {
            if (image_title)
                image_title.setVisible(false);

            var clubName = clubNode.getChildByName("Text_name");
            clubName.ignoreContentAdaptWithSize(true);
            clubName.setString("" + unescape(clubInfoTable.clubTitle));

            var _nameStr = unescape(clubInfoTable.ruleName);
            var _ruleName = clubName.clone();
            _ruleName.ignoreContentAdaptWithSize(true);
            _ruleName.setString(_nameStr);
            _ruleName.y = clubName.y + clubName.height/2 + _ruleName.height/2;
            _ruleName.x = clubName.x;
            clubNode.addChild(_ruleName);

            cc.loader.loadImg(clubInfoTable.clubAvatar ? clubInfoTable.clubAvatar : "png/default_headpic.png", {
                isCrossOrigin: true
            }, function(err, texture) {
                if (err || !texture || !sys.isObjectValid(clubNode))
                    return;

                var sp = new cc.Sprite(texture);
                if (!sp)
                    return;

                sp.setScale((clubNode.width - 8) / sp.width);
                sp.setPosition(cc.p(clubNode.width / 2, clubNode.height / 2));
                clubNode.addChild(sp);
            });
        }
        else if (clubNode != null)
        {
            clubNode.setVisible(false);
        }

        //信息 说明
        var _infoMation =  _back.getChildByName("infoMation");
        _infoMation.visible = true;

        var _infoMation2 =  _back.getChildByName("infoMation_2");
        if (_infoMation2 == null) {
            _infoMation2 =  _back.getChildByName("infoMation_1"); // 永州工程
        }

        var _info_Play =  _back.getChildByName("info_Play");
        if(_info_Play){

            // var str = "";

            // str += tData.areaSelectMode.fan == 0 ? "可反," : "不可反,";
            // str += tData.areaSelectMode.showHandCount ? "显示手牌数," : "";
            // str += tData.areaSelectMode.selectCardByPlayer ? "手动选择底牌," : "";
            // str += tData.areaSelectMode.singleJokerIsBomb ? "比牌时单王算炸弹," : "";
            // str += tData.areaSelectMode.hunShuiRule == 0 ? "门清玩法一," : "门清玩法二,";
            // str += tData.areaSelectMode.diFen ? "底分X" + tData.areaSelectMode.diFen + "," : "";
            // cc.log(" ----------- _info_Play----------- 9999999  ",str);

            _info_Play.setString("" + this.getPlayInfo());
        }
         
        cc.log(" ----------- _infoMation2----------- 9999999  ",_infoMation2)
        if (_infoMation2) {
            _infoMation2.setString("")
            _infoMation2.visible = true;
            //描述结算
            var sData=MjClient.data.sData;
            var tData=sData.tData;
            cc.log(" --------isDismiss  ",MjClient.isDismiss);
            if (MjClient.isDismiss)
            {

                var id = tData.firstDel;
                var pl = sData.players[id];
                var delStr = "";
                if(pl)
                {
                    var name  =  unescape(pl.info.nickname );
                    delStr = name + pl.mjdesc[0];
                }
                else
                {
                    // 系统、会长或管理员解散房间
                    pl = getUIPlayer(0);
                    if (pl)
                        delStr = pl.mjdesc[0];
                }

                _infoMation2.setString("" + delStr) ;
            }
        }

        function _infoText(){
            var sData=MjClient.data.sData;
            var tData=sData.tData;
            var text = GameCnName[MjClient.gameType];

            if (isNewUi) {
                text += "-" + tData.maxPlayer + "人\n";
                var roundNumPre = typeof(tData.roundNumPre) != "undefined" ? tData.roundNumPre : tData.roundNum;
                text += "房号：" + tData.tableid
                if (roundNumPre && tData.roundAll - tData.roundNumPre + 1 <= tData.roundAll)
                {
                    var extraNum = tData.extraNum ? tData.extraNum:0;
                    text += " 局数：" + (tData.roundAll - tData.roundNumPre + 1 + extraNum) + "/" + tData.roundAll;
                }
                    
                text += "\n";
                if(MjClient.roundEndTime)
                    text += MjClient.roundEndTime + "";
            } else {
                var strPayWay = "";
                switch (tData.areaSelectMode.payWay)
                {
                    case 0:
                        strPayWay = ",房主付";
                        break;
                    case 1:
                        strPayWay = ",AA付";
                        break;
                    case 2:
                        strPayWay = ",大赢家付";
                        break;
                }
                text += strPayWay;

                text += tData.areaSelectMode.fan == 0 ? ",可反" : ",不可反";
                text += tData.areaSelectMode.showHandCount ? ",显示手牌数" : "";
                text += tData.areaSelectMode.selectCardByPlayer ? ",手动选择底牌" : "";
                text += tData.areaSelectMode.singleJokerIsBomb ? ",比牌时单王算炸弹" : "";
                text += tData.areaSelectMode.hunShuiRule == 0 ? ",门清玩法一" : ",门清玩法二";
                text += tData.areaSelectMode.diFen ? ",底分X" + tData.areaSelectMode.diFen : "";

                text += ",房间号:";
                text += tData.tableid;
                var clubInfoTable = getClubInfoInTable();
                if (clubInfoTable){
                    //需求：海安、晋中、南通 对于俱乐部牌局，在大结算、大结算分享图中，增加显示，亲友圈ID，并显示对应的玩法名称【是会长建立玩法时设定的玩法名称】
                    if(MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ ||
                        isJinZhongAPPType() ||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP ){
                        text += ",亲友圈ID:";
                        text += clubInfoTable.clubId;
                        if(clubInfoTable.ruleName){
                            text = text+"（"+unescape(clubInfoTable.ruleName)+"）";
                        }
                    }
                }
            }

            return text;
        }
        _infoMation.setString(_infoText());
        _infoMation.setFontName("Arial");
        _infoMation.setFontSize(_infoMation.getFontSize());
        // 晋中换皮
        if (!isNewUi && MjClient.getAppType() != MjClient.APP_TYPE.TXJINZHONGMJ && MjClient.getAppType() != MjClient.APP_TYPE.DQSHANXIMJ  && MjClient.getAppType() != MjClient.APP_TYPE.QXYZQP
            && MjClient.getAppType() != MjClient.APP_TYPE.QXSYDTZ && MjClient.getAppType() != MjClient.APP_TYPE.HUNANWANGWANG &&
            MjClient.getAppType() != MjClient.APP_TYPE.AYGUIZHOUMJ)
            _infoMation.ignoreContentAdaptWithSize(true);

        //时间
        var _time =  _back.getChildByName("time");
        _time.visible = false;
        _time.setString("");

        if (isNewUi) {
            if (MjClient.getAppType() != MjClient.APP_TYPE.QXTHMJ) {
                //描述结算
                if (MjClient.isDismiss) {
                    var id = tData.firstDel;
                    var pl = sData.players[id];
                    var delStr = "";
                    if(pl)
                    {
                        var name  =  unescape(pl.info.nickname );
                        delStr = name + pl.mjdesc[0];
                    }
                    else
                    {
                        // 系统、会长或管理员解散房间
                        pl = getUIPlayer(0);
                        if (pl)
                            delStr = pl.mjdesc[0];
                        if (pl)
                        {
                            for(var i =0;i<pl.mjdesc.length;i++)
                            {
                                if(pl.mjdesc[i].indexOf("管理员")>=0||pl.mjdesc[i].indexOf("会长")>=0)
                                    delStr=pl.mjdesc[i];
                            }
                            //delStr = pl.mjdesc[0];
                        }
                    }
                    _time.setString(delStr);
                }
            }
        } else {
            cc.log("MjClient.roundEndTime == " + MjClient.roundEndTime);
            if(MjClient.roundEndTime)
                _time.setString(MjClient.roundEndTime);
        }

        var nantongReplay = function() {
            var tData = MjClient.data.sData.tData;
            var para = tData.areaSelectMode;
            var inviteVipTable = MjClient.data.inviteVipTable;
            para.maxPlayer = tData.maxPlayer;
            para.gameType = tData.gameType;

            MjClient.showMsg("是否再来一局？", function () {
                MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Zailaiyiju", {uid:SelfUid(),gameType:para.gameType});
                if (inviteVipTable)
                {
                    MjClient.joinGame(inviteVipTable, null, false, para.gameType);
                }
                else
                {
                    MjClient.createRoom(para, tData.roundAll, tData.areaSelectMode.payWay, function (rtn)
                    {
                        if(rtn.result==0)
                        {
                            MjClient.rematchInfo(MjClient.data.vipTable, tData.uids);
                        }
                    });
                }
            }, function(){}, "1", "nantongReplay");
        };

        //close ,关闭
        var _close1 =  _back.getChildByName("close");
        this._close1 = _close1;
        _close1.addTouchEventListener(function(sender,Type){
            switch (Type)
            {
                case ccui.Widget.TOUCH_ENDED:
                    MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Tuichu", {uid:SelfUid(),gameType:MjClient.gameType});
                    if(MjClient.Scene.getChildByName("shareCode")) MjClient.Scene.removeChildByName("shareCode");
                   
                    var clubInfoTable = getClubInfoInTable();
                    if (clubInfoTable) {
                        if (!MjClient.FriendCard_main_ui)
                            MjClient.Scene.addChild(new FriendCard_main(clubInfoTable.clubId));
                    }

                    //MjClient.leaveGame();
                    //这里的leaveGame肯定会返回{"result":0,"msg":"alreadyLeave"}，所以不用等待返回后再继续
                    //MjClient.native.doCopyToPasteBoard("");//清空剪切板
                    MjClient.gamenet.request("pkplayer.handler.LeaveGame",{},function(rtn){});
                    delete MjClient.data.sData;
                    delete MjClient.gameType;
                    postEvent("LeaveGame");
                    //if (!MjClient.enterui && !MjClient.FriendCard_main_ui)
                    //    MjClient.Scene.addChild(new EnterRoomLayer());

                    if(MjClient.endallui){
                        MjClient.endallui.removeFromParent(true);
                        MjClient.endallui = null;
                    }

                    if(cc.sys.isObjectValid(MjClient.goldMatchingui)){
                        MjClient.goldMatchingui.removeFromParent();
                        delete  MjClient.goldMatchingui;
                    }

                    break;
                default :
                    break;
            }
        },this);



        //再来一局
        var _btnReplay =  _back.getChildByName("btnReplay");
        var tData = MjClient.data.sData.tData;


        if(MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ ||
            /*isJinZhongAPPType() ||*/
            MjClient.getAppType() == MjClient.APP_TYPE.TXLVLIANGMJ ||
            MjClient.getAppType() == MjClient.APP_TYPE.TXLINFENMJ ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ||
            MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ
        )
        {
            // _btnReplay.visible = true;
            _btnReplay.visible = !MjClient.remoteCfg.guestLogin && !tData.matchId;
            _btnReplay.visible = !getClubInfoInTable();

        }
        else
        {
            _btnReplay.visible = false;  //屏蔽再来一局
        }
        if (MjClient.gameType == MjClient.GAME_TYPE.WU_XUE_GE_BAN ||
            MjClient.gameType == MjClient.GAME_TYPE.CHONG_YANG_DA_GUN ||
            MjClient.gameType == MjClient.GAME_TYPE.TONG_SHAN_DA_GONG ||
            MjClient.gameType == MjClient.GAME_TYPE.DA_YE_510K ||
            MjClient.gameType == MjClient.GAME_TYPE.QIAN_JIANG_QIAN_FEN ||
            MjClient.gameType == MjClient.GAME_TYPE.DA_YE_DA_GONG ||
            MjClient.gameType == MjClient.GAME_TYPE.QI_CHUN_DA_GONG) 
        {
            _btnReplay.visible = true;  //屏蔽再来一局
        }

        _btnReplay.addTouchEventListener(function(sender,Type){
            switch (Type)
            {
                case ccui.Widget.TOUCH_ENDED:
                    if(MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP||
                        MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ)//淮安斗地主，南通APP再来一局退出到主界面再提示
                    {
                        nantongReplay();

                        //MjClient.leaveGame();
                        //这里的leaveGame肯定会返回{"result":0,"msg":"alreadyLeave"}，所以不用等待返回后再继续
                        //MjClient.native.doCopyToPasteBoard("");//清空剪切板
                        MjClient.gamenet.request("pkplayer.handler.LeaveGame",{},function(rtn){});
                        delete MjClient.data.sData;
                        delete MjClient.gameType;
                        postEvent("LeaveGame");
                        //if (!MjClient.enterui && !MjClient.FriendCard_main_ui)
                        //    MjClient.Scene.addChild(new EnterRoomLayer());

                        if(MjClient.endallui){
                            MjClient.endallui.removeFromParent(true);
                            MjClient.endallui = null;
                        }

                    }
                    else
                    {
                        MjClient.native.umengEvent4CountWithProperty("Fangjiannei_Dajiesuanjiemian_Zailaiyiju", {uid:SelfUid(),gameType:MjClient.gameType});
                        if (MjClient.data.inviteVipTable)
                        {
                            MjClient.leaveGame(function()
                            {
                                cc.log("--------------reCreateRoom2")

                                MjClient.joinGame(MjClient.data.inviteVipTable, null, false, MjClient.gameType);
                            });
                        }
                        else
                        {
                            MjClient.reCreateRoom();
                        }

                    }
                    break;
                default :
                    break;
            }
        },this);

        var self = this;
        if(tData.matchId){
            _close1.setVisible(false);
            var endTitle = _back.getChildByName("end_title");
            endTitle.loadTexture("winGame/BL_jieshu.png");
            endTitle.ignoreContentAdaptWithSize(true);

            var _btnReplay =  _back.getChildByName("roundEndText");
            _btnReplay.setVisible(true);
        }
        var textNum =  _back.getChildByName("Text_num");
        var text3 =  _back.getChildByName("Text_3");
        var text5 =  _back.getChildByName("Text_5");
        UIEventBind(null,this,"leftTable",function(data){
            //num.setString(self._data.condition - data.signUpCount);
            textNum.setString(data.leftTable);
            textNum.setVisible(true);
            text3.setVisible(true);
            text5.setVisible(true);
        })

        // 显示复制按钮
        addCopyBtnToGameOverLayer(endallui.node);

        //四个玩家的详细信息
        var infoBg = _back.getChildByName("infoBg");
        var infoBgSize = infoBg.getCustomSize();

        var info = infoBg.getChildByName("info");
        info.visible = false;
        var bgSize = info.getCustomSize();
        var sData = MjClient.data.sData;
        var players = sData.players;
        var playerCount = Object.keys(players).length;

        //var off_x = (infoBgSize.width - playerCount*bgSize.width)/(playerCount-1);
        //var startPos = cc.p(bgSize.width/2,infoBgSize.height/2);

        var off_x = bgSize.width*(4 -playerCount)/4;
        if(MjClient.gameType == MjClient.GAME_TYPE.LV_LIANG_DA_QI
            ||MjClient.gameType == MjClient.GAME_TYPE.XIN_ZHOU_SAN_DA_ER
            ||MjClient.gameType == MjClient.GAME_TYPE.DA_TONG_ZHA_GU_ZI){
            bgSize.width = 242;
            off_x = bgSize.width*(6 -playerCount)/14;
            bgSize.width = bgSize.width * 0.95;
            info.setScale(0.98);
            // info.setPosition(cc.p(info.x, info.y+100));
            // info.getChildByName("allscore").setScale(1.3);
            // info.getChildByName("allscore").getChildByName("bigWinner").setPosition(cc.p(110, 300));
            // info.getChildByName("allscore").getChildByName("bigWinner").setScale(1.25);
        }

        // 南通/海安
        if (MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP
            || MjClient.getAppType() == MjClient.APP_TYPE.QXHAMJ
            || MjClient.getAppType() == MjClient.APP_TYPE.QXHAIANMJ) {
            off_x = (1085 - bgSize.width * playerCount) / (playerCount - 1);
        }

        var startPos = cc.p(infoBgSize.width/2 - playerCount*(bgSize.width + off_x)/2 + (bgSize.width + off_x)/2, infoBgSize.height/2);

        // 晋中换皮
        if (isJinZhongAPPType() || MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_GZ) {
            startPos = cc.p(infoBgSize.width/2 - playerCount*(bgSize.width + off_x)/2 + (bgSize.width + off_x)/2, 0);
        }

        var clone = null;
        for(var i = 0 ; i < playerCount ; i++){
            clone = info.clone();
            clone.visible = true;
            infoBg.addChild(clone, 4 - i);

            //SetGameOverLayer_wuXueGeBan(clone,i, isNewUi);
            this.setInfo_Poker(clone, i, isNewUi);

            clone.setPosition(startPos);

            COMMON_UI.addGameOverNotSameClubUI(clone,MjClient.getPlayerByIndex(i))

            startPos = cc.p(startPos.x + bgSize.width + off_x,startPos.y);
        }

        if(!_btnReplay.visible){
            var _back = endallui.node.getChildByName("back");
            var _share =  _back.getChildByName("share");
            var _btnCopy =  _back.getChildByName("btnCopy");

            var midx = _btnCopy.getParent().width / 2
            _btnCopy.x = midx - 140;
            _share.x = midx + 140;
        }

        if(_info_Play && !_btnReplay.visible && MjClient.gameType == MjClient.GAME_TYPE.DOU_DI_ZHU_QC){
            _info_Play.setPositionY(_btnReplay.y);
            _info_Play.setPositionX(_btnReplay.x + 70);
        }

        return true;
    },
    onEnter:function()
    {
        this._super();
        if (MjClient.homeui && MjClient.systemConfig.rankEnable == "true")
        {
            MjClient.homeui.gameRankLayer();
        }
    },
    replaySet : function(cb){ // 邵阳斗地主需要用到 replaySet
        this._close1.addTouchEventListener(function(sender,type){
            if (type == ccui.Widget.TOUCH_ENDED)
                MjClient.goOnReplay();
        }, this);
    },
    getPlayInfo: function(){
        var str = "";

        var sData=MjClient.data.sData;
        var tData=sData.tData;

        str += tData.areaSelectMode.fan == 0 ? "可反," : "不可反,";
        str += tData.areaSelectMode.showHandCount ? "显示手牌数," : "";
        str += tData.areaSelectMode.selectCardByPlayer ? "手动选择底牌," : "";
        str += tData.areaSelectMode.singleJokerIsBomb ? "比牌时单王算炸弹," : "";
        str += tData.areaSelectMode.hunShuiRule == 0 ? "门清玩法一," : "门清玩法二,";
        str += tData.areaSelectMode.diFen ? "底分X" + tData.areaSelectMode.diFen + "," : "";


        return str;
    },

    setListInfo: function(node, _listInfo){
        var listView = node;
        var pl = _listInfo.pl;
        var winCount = _listInfo.winCount;
        var loseCount = _listInfo.loseCount;
        
        var loseScore = _listInfo.loseScore;
        var winScore = _listInfo.winScore;

        
        for(var i = 0;i < 3;i++){
            listView.pushBackDefaultItem();
            var children = listView.children;
            var insertItem = children[children.length-1];

            insertItem.getChildByName("title").setString("第" + (i+1) + "局");
            var scoreLabel = insertItem.getChildByName("score");
            scoreLabel.ignoreContentAdaptWithSize(true);

            if(i == 0)
            {
                insertItem.getChildByName("title").setString("赢" + winCount + "局");
                scoreLabel.setString(winScore);
            }
            else if(i == 1)
            {
                insertItem.getChildByName("title").setString("输" + loseCount + "局");
                scoreLabel.setString(loseScore);
            }
            else if(i == 2)
            {
                insertItem.getChildByName("title").setString("旁观局数");
                scoreLabel.setString(pl.gaiPaiCount);
            }
        }
    },

    setInfo_Poker: function(node, off, isNewUi){
        var sData=MjClient.data.sData;
        var tData=sData.tData;
        var pl=MjClient.getPlayerByIndex(off);
        if(!pl){
            node.setVisible(false);
            return;
        }
        var uidSelf = SelfUid();
        var MaxWinAll=0;
        var MaxDianPao=0;
        var MaxlosePlayer = null;
        var MaxWinPlayer = null;
        var MaxloseAll = 999999999;

        var _funSetInfo = this.setListInfo;

        //计算所有人数据
        for (var uid in sData.players) {
            var pi = sData.players[uid];
            if (pi) {
                if (MaxWinAll < pi.winall) {
                    MaxWinAll = pi.winall;
                    MaxWinPlayer = uid;

                }else if (MaxWinAll == pi.winall) {
                    if (parseInt(uid) < parseInt(MaxWinPlayer)) {
                        MaxWinAll = pi.winall;
                        MaxWinPlayer = uid;
                    }
                }
                if (pi.winall < MaxloseAll) {
                    MaxloseAll = pi.winall;
                    MaxlosePlayer = uid;
                }else if (pi.winall == MaxloseAll) {
                    if (parseInt(uid) < parseInt(MaxlosePlayer)) {
                        MaxloseAll = pi.winall;
                        MaxlosePlayer = uid;
                    }
                }
            }
        }

        //输赢统计
        //输赢统计
        var winCount  = 0;
        var winScore = 0;
        var loseCount = 0;
        var loseScore = 0;
        var tableMsg = pl.roomStatistics;

        var _listInfo = {};

        if(!tableMsg)
        {
            tableMsg = [0,0,0,0,0];
        }

        for(var i = 0;i < tableMsg.length;i++)
        {
            if(tableMsg[i] > 0 )
            {
                winCount++;
                winScore += tableMsg[i];
                // 精度修正
                winScore = revise(winScore);
            }
            else if(tableMsg[i] < 0 )
            {
                loseCount++;
                loseScore += tableMsg[i];
                // 精度修正
                loseScore = revise(loseScore);
            }
        }

        _listInfo.winCount = winCount;
        _listInfo.winScore = winScore;
        _listInfo.loseCount = loseCount;
        _listInfo.loseScore = loseScore;
        _listInfo.winScore = winScore;
        _listInfo.pl = pl;

        var uibind={
            name:{
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                    this.setFontName("Arial");
                    this.setFontSize(this.getFontSize());

                    if(pl.winall >= 0) {
                        this.setTextColor(cc.color("#A4844D"));
                    }
                },
                _text:function(){
                    if(!pl){
                        return "";
                    }
                    return getNewName(unescape(pl.info.nickname)+"");
                }
            },
            id: {
                _run:function(){
                    this.ignoreContentAdaptWithSize(true);
                    if(pl.winall >= 0) {
                        this.setTextColor(cc.color("#A4844D"));
                    }
                },
                _text: function () {
                    if(!pl){
                        return "";
                    }
                    return  pl.info.uid.toString();
                }
            },
            allscore:{
                winNum1:{
                },
                winNum2:{
                },
                bigWinner:{
                    _visible : false
                }
            },
            listView:{
                _run:function(){
                    this.setScrollBarEnabled(false);
                    var itemModel = this.children[0];

                    if(pl.winall < 0) { //输家
                        // itemModel.getChildByName("title").setColor(cc.color(37,69,89));
                        // itemModel.getChildByName("score").setColor(cc.color(37,69,89));
                    }
                    else {
                        cc.log("------------------------rtrtrytyrtyrt--------------")
                        itemModel.getChildByName("title").setTextColor(cc.color("#A4844D"));
                        itemModel.getChildByName("score").setTextColor(cc.color("#F0EFB2"));
                    }

                    this.setItemModel(itemModel);
                    this.removeAllChildren();

                    var listView = this;

                    //listView.setTouchEnabled(false);

                    _funSetInfo(listView, _listInfo);
                    
                }
            },
        };

        var wxNode = node.getChildByName("head");
        addWxHeadToEndUI(wxNode,off);

        
        // 显示玩家头像
        var head = node.getChildByName("head");
        // if (false && MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ  || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ ) {
        //     CircularCuttingHeadImg(head, pl);
        // }
        // else {
        //    addWxHeadToEndUI(head, off);
        // }

        BindUiAndLogic(node,uibind);
        // node.getChildByName("fangzhu").visible =false;
        
        var chenji = node.getChildByName("allscore").getChildByName("chengji");
        if(chenji){
            chenji.ignoreContentAdaptWithSize(true); 
        }

        setUserOfflineWinGamePanel(node,pl);
        if(!pl)
        {
            uibind.allscore.visible = false;
            node.getChildByName("fangzhu").visible =false;
            return;
        }

        var numValue = Math.abs(pl.winall) + "";
        //最高得分
        uibind.allscore.visible = true;
        uibind.allscore.bigWinner._node.visible = false;
        if(pl.winall >= 0){
            var winNum1 = node.getChildByName("allscore").getChildByName("winNum1");
            winNum1.setString("+" + pl.winall + "");
            winNum1.ignoreContentAdaptWithSize(true);
            if (!isNewUi)
                winNum1.setScale(0.8);
            var winNum2 = node.getChildByName("allscore").getChildByName("winNum2");
            winNum2.visible = false;

            node.loadTexture("res_paodekuai/gameOverWuXueGeBan/bg_ziji.png");
            
            if(chenji){
                chenji.setTextColor(cc.color("#A4844D"));
            }
            
        }else{
            var winNum2 = node.getChildByName("allscore").getChildByName("winNum2");
            winNum2.setString(pl.winall + "");
            winNum2.ignoreContentAdaptWithSize(true);
            if (!isNewUi)
                winNum2.setScale(0.8);
            var winNum1 = node.getChildByName("allscore").getChildByName("winNum1");
            winNum1.visible = false;
        }
        var nodeParent = node.getParent().getParent();
        var _share = nodeParent.getChildByName("share");
        var _shine = _share.getChildByName("img_shine");
        var _point = _share.getChildByName("img_point");
        var _txt = _share.getChildByName("img_txt");
        if(pl.winall == MaxWinAll && pl.winall != 0){
            uibind.allscore.bigWinner._node.visible = true;
            var act_Func = function() {
                var a = cc.scaleTo(0.5, 1.0);
                var aa = cc.fadeIn(0.5);
                var a1 = cc.scaleTo(1.0, 4);
                var a2 = cc.fadeOut(1.0);
                var act_2 = cc.rotateBy(0.8, 30);
                var act_3 = cc.rotateBy(0.8, -30);
                var a3 =  cc.callFunc(function() {
                    _shine.setScale(1);
                }.bind(_shine));
                _shine.runAction(cc.sequence(cc.spawn(a,aa), cc.spawn(a1,a2),a3,cc.delayTime(0.1)).repeatForever());
                _point.runAction(cc.sequence(act_2, act_3).repeatForever());

            }
            var clubInfoTable = getClubInfoInTable();
            if (clubInfoTable && pl.info.uid == SelfUid() && MjClient.getAppType() != MjClient.APP_TYPE.QXYYQP && MjClient.getAppType() != MjClient.APP_TYPE.HUBEIMJ && MjClient.getAppType() != MjClient.APP_TYPE.YLHUNANMJ) {
                _shine.setVisible(true);
                _point.setVisible(true);
                _txt.setVisible(true);
                act_Func();
            }
            // 设置背景大赢家图片/字体颜色（岳阳app）
            // if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ  || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) {
            //     node.loadTexture("gameOver/pjjs_9.png");
            // }
            // else if (MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP
            //       || MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ) {
            //     node.loadTexture("gameOver/gerenxinxi_2.png");
            // }
        }

        AddFangKaIcon(sData, uibind.allscore._node, tData, pl, MaxWinAll, MaxWinPlayer,  MaxloseAll, MaxlosePlayer, cc.p(10, 345));

        node.getChildByName("fangzhu").visible = tData.owner == pl.info.uid;
    }


});


//斗地主
function SetGameOverLayer_wuXueGeBan(node,off,isNewUi)
{
    var sData=MjClient.data.sData;
    var tData=sData.tData;
    var pl=MjClient.getPlayerByIndex(off);
    if(!pl){
        node.setVisible(false);
        return;
    }
    var uidSelf = SelfUid();
    var MaxWinAll=0;
    var MaxDianPao=0;
    var MaxlosePlayer = null;
    var MaxWinPlayer = null;
    var MaxloseAll = 999999999;

    //计算所有人数据
    for (var uid in sData.players) {
        var pi = sData.players[uid];
        if (pi) {
            if (MaxWinAll < pi.winall) {
                MaxWinAll = pi.winall;
                MaxWinPlayer = uid;

            }else if (MaxWinAll == pi.winall) {
                if (parseInt(uid) < parseInt(MaxWinPlayer)) {
                    MaxWinAll = pi.winall;
                    MaxWinPlayer = uid;
                }
            }
            if (pi.winall < MaxloseAll) {
                MaxloseAll = pi.winall;
                MaxlosePlayer = uid;
            }else if (pi.winall == MaxloseAll) {
                if (parseInt(uid) < parseInt(MaxlosePlayer)) {
                    MaxloseAll = pi.winall;
                    MaxlosePlayer = uid;
                }
            }
        }
    }

    //输赢统计
    //输赢统计
    var winCount  = 0;
    var winScore = 0;
    var loseCount = 0;
    var loseScore = 0;
    var tableMsg = pl.roomStatistics;

    if(!tableMsg)
    {
        tableMsg = [0,0,0,0,0];
    }

    for(var i = 0;i < tableMsg.length;i++)
    {
        if(tableMsg[i] > 0 )
        {
            winCount++;
            winScore += tableMsg[i];
            // 精度修正
            winScore = revise(winScore);
        }
        else if(tableMsg[i] < 0 )
        {
            loseCount++;
            loseScore += tableMsg[i];
            // 精度修正
            loseScore = revise(loseScore);
        }
    }

    var uibind={
        name:{
            _run:function(){
                this.ignoreContentAdaptWithSize(true);
                this.setFontName("Arial");
                this.setFontSize(this.getFontSize());

                if(pl.winall >= 0) {
                    this.setTextColor(cc.color("#A4844D"));
                }
            },
            _text:function(){
                if(!pl){
                    return "";
                }
                return getNewName(unescape(pl.info.nickname)+"");
            }
        },
        id: {
            _run:function(){
                this.ignoreContentAdaptWithSize(true);
                if(pl.winall >= 0) {
                    this.setTextColor(cc.color("#A4844D"));
                }
            },
            _text: function () {
                if(!pl){
                    return "";
                }
                return  pl.info.uid.toString();
            }
        },
        allscore:{
            winNum1:{
            },
            winNum2:{
            },
            bigWinner:{
                _visible : false
            }
        },
        listView:{
            _run:function(){
                this.setScrollBarEnabled(false);
                var itemModel = this.children[0];

                if(pl.winall < 0) { //输家
                    // itemModel.getChildByName("title").setColor(cc.color(37,69,89));
                    // itemModel.getChildByName("score").setColor(cc.color(37,69,89));
                }
                else {
                    cc.log("------------------------rtrtrytyrtyrt--------------")
                    itemModel.getChildByName("title").setTextColor(cc.color("#A4844D"));
                    itemModel.getChildByName("score").setTextColor(cc.color("#F0EFB2"));
                }

                this.setItemModel(itemModel);
                this.removeAllChildren();

                var listView = this;
                listView.setTouchEnabled(false);

                for(var i = 0;i < 3;i++){
                    listView.pushBackDefaultItem();
                    var children = listView.children;
                    var insertItem = children[children.length-1];

                    insertItem.getChildByName("title").setString("第" + (i+1) + "局");
                    var scoreLabel = insertItem.getChildByName("score");
                    scoreLabel.ignoreContentAdaptWithSize(true);

                    if(i == 0)
                    {
                        insertItem.getChildByName("title").setString("赢" + winCount + "局");
                        scoreLabel.setString(winScore);
                    }
                    else if(i == 1)
                    {
                        insertItem.getChildByName("title").setString("输" + loseCount + "局");
                        scoreLabel.setString(loseScore);
                    }
                    else if(i == 2)
                    {
                        insertItem.getChildByName("title").setString("旁观局数");
                        scoreLabel.setString(pl.gaiPaiCount);
                    }
                }
            }
        },
    };

    var wxNode = node.getChildByName("head");
    addWxHeadToEndUI(wxNode,off);

    
    // 显示玩家头像
    var head = node.getChildByName("head");
    // if (false && MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ  || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ ) {
    //     CircularCuttingHeadImg(head, pl);
    // }
    // else {
    //    addWxHeadToEndUI(head, off);
    // }

    BindUiAndLogic(node,uibind);
    // node.getChildByName("fangzhu").visible =false;
    
    var chenji = node.getChildByName("allscore").getChildByName("chengji");
    if(chenji){
        chenji.ignoreContentAdaptWithSize(true); 
    }

    setUserOfflineWinGamePanel(node,pl);
    if(!pl)
    {
        uibind.allscore.visible = false;
        node.getChildByName("fangzhu").visible =false;
        return;
    }

    var numValue = Math.abs(pl.winall) + "";
    //最高得分
    uibind.allscore.visible = true;
    uibind.allscore.bigWinner._node.visible = false;
    if(pl.winall >= 0){
        var winNum1 = node.getChildByName("allscore").getChildByName("winNum1");
        winNum1.setString("+" + pl.winall + "");
        winNum1.ignoreContentAdaptWithSize(true);
        if (!isNewUi)
            winNum1.setScale(0.8);
        var winNum2 = node.getChildByName("allscore").getChildByName("winNum2");
        winNum2.visible = false;

        node.loadTexture("res_paodekuai/gameOverWuXueGeBan/bg_ziji.png");
        
        if(chenji){
            chenji.setTextColor(cc.color("#A4844D"));
        }
        
    }else{
        var winNum2 = node.getChildByName("allscore").getChildByName("winNum2");
        winNum2.setString(pl.winall + "");
        winNum2.ignoreContentAdaptWithSize(true);
        if (!isNewUi)
            winNum2.setScale(0.8);
        var winNum1 = node.getChildByName("allscore").getChildByName("winNum1");
        winNum1.visible = false;
    }
    var nodeParent = node.getParent().getParent();
    var _share = nodeParent.getChildByName("share");
    var _shine = _share.getChildByName("img_shine");
    var _point = _share.getChildByName("img_point");
    var _txt = _share.getChildByName("img_txt");
    if(pl.winall == MaxWinAll && pl.winall != 0){
        uibind.allscore.bigWinner._node.visible = true;
        var act_Func = function() {
            var a = cc.scaleTo(0.5, 1.0);
            var aa = cc.fadeIn(0.5);
            var a1 = cc.scaleTo(1.0, 4);
            var a2 = cc.fadeOut(1.0);
            var act_2 = cc.rotateBy(0.8, 30);
            var act_3 = cc.rotateBy(0.8, -30);
            var a3 =  cc.callFunc(function() {
                _shine.setScale(1);
            }.bind(_shine));
            _shine.runAction(cc.sequence(cc.spawn(a,aa), cc.spawn(a1,a2),a3,cc.delayTime(0.1)).repeatForever());
            _point.runAction(cc.sequence(act_2, act_3).repeatForever());

        }
        var clubInfoTable = getClubInfoInTable();
        if (clubInfoTable && pl.info.uid == SelfUid() && MjClient.getAppType() != MjClient.APP_TYPE.QXYYQP && MjClient.getAppType() != MjClient.APP_TYPE.HUBEIMJ && MjClient.getAppType() != MjClient.APP_TYPE.YLHUNANMJ) {
            _shine.setVisible(true);
            _point.setVisible(true);
            _txt.setVisible(true);
            act_Func();
        }
        // 设置背景大赢家图片/字体颜色（岳阳app）
        // if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ  || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ) {
        //     node.loadTexture("gameOver/pjjs_9.png");
        // }
        // else if (MjClient.getAppType() == MjClient.APP_TYPE.QXNTQP
        //       || MjClient.getAppType() == MjClient.APP_TYPE.QXJSMJ) {
        //     node.loadTexture("gameOver/gerenxinxi_2.png");
        // }
    }

    AddFangKaIcon(sData, uibind.allscore._node, tData, pl, MaxWinAll, MaxWinPlayer,  MaxloseAll, MaxlosePlayer, cc.p(10, 345));

    node.getChildByName("fangzhu").visible = tData.owner == pl.info.uid;
}