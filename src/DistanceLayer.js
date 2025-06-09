/**
 * Created by sking on 2017/6/27.
 */

var DistanceLayer = cc.Layer.extend({
    ctor: function (layoutData) {
        this._super();
        var UI = ccs.load("DistanceTips.json");
        this.addChild(UI.node);
        var that = this;


        var _back = UI.node.getChildByName("back");
        layoutData = layoutData === undefined ? [[0.25, 0.25], [0.5, 0.65], [0, 0]] : layoutData;
        if(MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP && 
            GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_HU_ZI)
        {
            layoutData = [[0.25, 0.25], [0.5, 0.5], [0, 0]];
        }
        setWgtLayout(_back, layoutData[0], layoutData[1], layoutData[2]);
        
        // setWgtLayout(_back,[0.25, 0.25], [0.5, 0.65], [0, 0]);

        var _roleCount = 4;
        if(MjClient.gameType == MjClient.GAME_TYPE.RU_GAO_MJH ||
            MjClient.gameType == MjClient.GAME_TYPE.RU_GAO||
            MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI ||
            MjClient.gameType === MjClient.GAME_TYPE.QU_TANG_23_ZHANG)
        {
            _roleCount = 3;
        }
        else if (MjClient.gameType == MjClient.GAME_TYPE.PAO_DE_KUAI ||
                 MjClient.gameType == MjClient.GAME_TYPE.YZ_PAO_DE_KUAI_TY ||
                 MjClient.gameType == MjClient.GAME_TYPE.HUAIAN_CC ||
                 MjClient.gameType == MjClient.GAME_TYPE.LEI_YANG_GMJ ||
                 MjClient.gameType == MjClient.GAME_TYPE.DA_TONG_ZI_SHAO_YANG)
        {
            _roleCount = MjClient.MaxPlayerNum;
        }else if(MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_ER)
        {
            _roleCount = 2;
        }

        var sData = MjClient.data.sData;
        var tData = sData.tData;

        var plArr = []; //为了方便查询玩家位置
        for(var i =  0;i < 4;i++)
        {
            for(var j = 0;j < 4;j++)
            {
                var _arrowNode = _back.getChildByName("arrow_" + i + "_" + j);
                if(_arrowNode)
                {
                    // _arrowNode.setVisible(false);

                    var text = _arrowNode.getChildByName("Text");
                    text.setTextColor(cc.color(242,95,36));
                    text.ignoreContentAdaptWithSize(true);
                    text.setString("");
                }
            }


            var _handNode = _back.getChildByName("head_" + i);
            var pl = getUIPlayer(i);

            if(_roleCount == 3 && MjClient.gameType != MjClient.GAME_TYPE.HUAIAN_CC && MjClient.gameType != MjClient.GAME_TYPE.LEI_YANG_GMJ)
            {
                if(i >= 3)
                {
                    break;
                }
                if (MjClient.gameType != MjClient.GAME_TYPE.PAO_DE_KUAI ||
                    MjClient.gameType != MjClient.GAME_TYPE.YZ_PAO_DE_KUAI_TY ||
                    MjClient.gameType != MjClient.GAME_TYPE.DA_TONG_ZI_SHAO_YANG)
                    pl = getUIPlayer_changpai(i)
            }

            //如果是做醒玩法
            if(MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_SR_King || MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_SR){
                var index = i;
                if(i == 1){
                    index = 2;
                }
                else if(i == 2){
                    index = 1;
                }else if (i == 3 || i == 4){
                    index = 3;
                }
                var resoff = getOffByXing_paohuzi(index);
                pl = getUIPlayer_paohuzi(resoff);
                if(pl){
                    plArr.push({uid:pl.info.uid, index:i});
                } 
            }

            if(pl)
            {
                _handNode.visible = true;
                var url = "playing/gameTable/closeGps.png";
                if(pl.locationMsg){
                    var arr = pl.locationMsg.split(";");
                    if(parseInt(arr[0]) > 0 && parseInt(arr[1]) > 0){
                        url = "playing/gameTable/openGps.png";
                    }else{
                        url = "playing/gameTable/closeGps.png";
                    }
                }else{
                    url = "playing/gameTable/closeGps.png";
                }
                _handNode.loadTexture(url,ccui.Widget.LOCAL_TEXTURE);
            }else{
                _handNode.visible = false;
            }
            
        }

        function showDistanceArrow(off1,off2,distance,uid1,uid2)
        {
            for(var i =  0;i < 4;i++)
            {
                for(var j = 0;j < 4;j++)
                {
                    var _arrowNode = _back.getChildByName("arrow_" + i + "_" + j);
                    if(_arrowNode && ((off1 == i && off2 == j)||(off1 == j && off2 == i)))
                    {
                        _arrowNode.visible = true;
                        var url = "playing/gameTable/duijiao4_0.png";

                        var text = _arrowNode.getChildByName("Text");
                        text.setTextColor(cc.color(242,95,36));
                        text.ignoreContentAdaptWithSize(true);
                        if (distance>=1000)
                        {
                            text.setString("约"+(distance/1000).toFixed(1)+"千米");
                        }
                        else if(distance >= 0 && distance <= 50)
                        {   
                            if (MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG || MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ) {
                                text.setString("约" + distance.toFixed(0) + "米");
                            } else {
                                text.setString("小于50米");
                            }
                            text.setTextColor(cc.color(255,0,0));
                            url = "playing/gameTable/duijiao4_1.png";
                        }
                        else if (distance < 0)
                        {
                            text.setString("未检测到距离");
                        }
                        else
                        {
                            text.setString("约"+distance.toFixed(0)+"米");
                        }

                        _arrowNode.loadTexture(url,ccui.Widget.LOCAL_TEXTURE);

                    }
                }
            }
        }



        var geogData = [];
        for (var i = 0; i < tData.uids.length; i++) {
            var pl = MjClient.data.sData.players[tData.uids[i]];   
            
            var index = i;
            //如果是做醒玩法
            if(MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_SR_King || MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_SR){
                if(i == 1){
                    index = 2;
                }
                else if(i == 2){
                    index = 1;
                }else if (i == 3 || i == 4){
                    index = 3;
                }
                var resoff = getOffByXing_paohuzi(index);
                pl = getUIPlayer_paohuzi(resoff);
            }

            if (pl && pl.locationMsg) {
                geogData.push(pl.locationMsg);
            }
        }
        var disPlayer = [];
        for(var i=0; i<geogData.length; i++)
        {
            for(var j=i+1; j<geogData.length; j++)
            {
                var plyoneV = new Array();
                var plytwoV = new Array();
                plyoneV = geogData[i].split(";");
                plytwoV = geogData[j].split(";");
                var uid1 = plyoneV[3];
                var uid2 = plytwoV[3];
                var plone = getUIPlayerByUID(plyoneV[3]);
                var _oneLatitude = plone.info.location.latitude;
                var _oneLongitude = plone.info.location.longitude;
                if(!_oneLatitude)  _oneLatitude = plyoneV[0];
                if(!_oneLongitude)  _oneLongitude =  plyoneV[1];

                var pltwo = getUIPlayerByUID(plytwoV[3]);
                var _twoLatitude = pltwo.info.location.latitude;
                var _twoLongitude = pltwo.info.location.longitude;
                if(!_twoLatitude) _twoLatitude = plytwoV[0];
                if(!_twoLongitude) _twoLongitude =  plytwoV[1];

                var distance = MjClient.native.CalculateLineDistance(_oneLatitude, _oneLongitude, _twoLatitude, _twoLongitude);

                disPlayer.push({uid1: uid1, uid2: uid2, distance: distance});
            }
        }

        cc.log("========================disPlayer = " + JSON.stringify(disPlayer));
        for(i =  0; i < disPlayer.length;i++)
        {
            var uid1 = parseInt(disPlayer[i].uid1);
            var uid2 = parseInt(disPlayer[i].uid2);
            var distance = disPlayer[i].distance;

            //if(distance < 500)
            {
                var off1 = getUiOffByUid(uid1);
                var off2 = getUiOffByUid(uid2);
                //如果是做醒玩法
                if(MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_SR_King || MjClient.gameType == MjClient.GAME_TYPE.PAO_HU_ZI_SR){
                    off1 = this.getIndexInArr(uid1, plArr);
                    off2 = this.getIndexInArr(uid2, plArr);
                }

                if(_roleCount == 3 && MjClient.gameType != MjClient.GAME_TYPE.HUAIAN_CC && MjClient.gameType != MjClient.GAME_TYPE.LEI_YANG_GMJ)
                {
                    off1 = getUiOffByUid_changpai(uid1);
                    off2 = getUiOffByUid_changpai(uid2);
                }
                showDistanceArrow(off1,off2,distance,uid1,uid2);
            }
        }
    },

    getIndexInArr : function (value, arr){
        if(arr && arr.length > 0){
            var len = arr.length;
            for(var i = 0; i < len; i++){
                var obj = arr[i];
                if(value == obj.uid){
                    return obj.index;
                }
            }
        }else{
            return -1;
        }
    }
})