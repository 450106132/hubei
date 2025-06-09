/**
 * Created by sking on 2017/6/27.
 */

var showDistance3PlayerLayer = cc.Layer.extend({
    ctor: function (_roleCount) {
        this._super();
        _roleCount = _roleCount || 3;
        var jsonFile = "showDistance3PlayerTips.json";
        if (_roleCount == 5)
            jsonFile = "showDistance5PlayerTips.json";
        var UI = ccs.load(jsonFile);
        this.addChild(UI.node);
        var that = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);


        var _back = UI.node.getChildByName("back");
        setWgtLayout(_back,[0.65, 0.65], [0.5, 0.5], [0, 0]);

        var _close = _back.getChildByName("close");
        _close.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                that.removeFromParent();
            }
        }, this);


        //var _roleCount = 3;
		var sData = MjClient.data.sData;
        var tData = sData.tData;
        var uids = tData.uids;
		
        for(var i =  0;i < _roleCount;i++)
        {
            for(var j = 0;j < _roleCount;j++)
            {
                var _arrowNode = _back.getChildByName("arrow_" + i + "_" + j);
                if(_arrowNode)
                {
                    _arrowNode.setVisible(false);

                    var text = _arrowNode.getChildByName("Text");
                    //text.setTextColor(cc.color(242,95,36));
                    text.ignoreContentAdaptWithSize(true);
                    text.setString("未检测到距离");
                }
            }

            var _handNode = _back.getChildByName("head_" + i).getChildByName("nobody");
            var _headFrame = _back.getChildByName("head_" + i).getChildByName("headFrame");
            var _nameNode = _back.getChildByName("head_" + i).getChildByName("name");
            _nameNode.setString("");

            var lbNoOpenLocation = _back.getChildByName("head_" + i).getChildByName("lbNoOpenLocation");

            var pl = null;
            if (!isCanChangePlayerNum() && 
                GameClass[MjClient.gameType] != MjClient.GAME_CLASS.PAO_DE_KUAI &&
                MjClient.gameType != MjClient.GAME_TYPE.LEI_YANG_GMJ && 
                MjClient.gameType != MjClient.GAME_TYPE.DA_TONG_ZI_SHAO_YANG &&
                MjClient.gameType != MjClient.GAME_TYPE.BAN_BIAN_TIAN_ZHA &&
                MjClient.gameType != MjClient.GAME_TYPE.LONG_HUI_BA_ZHA_DAN)
            {
                pl = getUIPlayer_changpai(i)
            }
            else
            {
                pl = getUIPlayer(getOffForPlayerNum(i)); // 通过索引得到游戏中玩家位置偏移量，再通过getUIPlayer得到pl
            }

            if (!pl) {
                _handNode.visible = false;
                _headFrame.visible = false;
                _nameNode.visible = false;
                lbNoOpenLocation.visible = false;
                continue;
            }
            
            //var sData = MjClient.data.sData;
            //显示头像
            var url = pl.info.headimgurl;
            if(!url) url="png/default_headpic.png";
            function loadHead(i, _headFrame) {
                cc.loader.loadImg(url, {isCrossOrigin : true}, function(err, texture)
                {
                    if(!err&&texture&&cc.sys.isObjectValid(_back))
                    {
                        var clipper = new cc.ClippingNode();
                        var sten = cc.Sprite.create("distance/head_clip.png");
                        var stenSize = sten.getContentSize();
                        sten.setPosition(_headFrame.getPosition());
                        clipper.setContentSize(stenSize);
                        clipper.setStencil(sten);
                        clipper.setAlphaThreshold(0.5);
                        _back.getChildByName("head_" + i).addChild(clipper);
                        var headSprite = new cc.Sprite(texture);
                        headSprite.setPosition(sten.getPosition());
                        headSprite.setScaleX(_headFrame.width/headSprite.width);
                        headSprite.setScaleY(_headFrame.height/headSprite.height);
                        clipper.addChild(headSprite);
                    }
                });
            }
            loadHead(i, _headFrame);

            //显示昵称
            if(MjClient.getAppType() == MjClient.APP_TYPE.QXYZQP || 
                MjClient.getAppType() == MjClient.APP_TYPE.BDYZPHZ ||
                MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ ||
                MjClient.getAppType() == MjClient.APP_TYPE.QXLYQP ||
                MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
                MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ ||
                MjClient.getAppType() == MjClient.APP_TYPE.BDHYZP)
            {
                _nameNode.setString(getNewName(unescape(pl.info.nickname )));
            }else{
                _nameNode.setString(getPlayerName(unescape(pl.info.nickname)));
            }

            // 岳阳显示没有开启定位
            //if (MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP){
                if (!pl.locationMsg || pl.locationMsg.split(";")[0] <= 0 || pl.locationMsg.split(";")[1] <= 0){
                    // var lbNoOpenLocation = _handNode.getChildByName("lbNoOpenLocation");
                    // if (!lbNoOpenLocation){
                    //     lbNoOpenLocation = new ccui.Text();
                    //     lbNoOpenLocation.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
                    //     lbNoOpenLocation.setFontSize(30);
                    //     lbNoOpenLocation.ignoreContentAdaptWithSize(true);
                    //     lbNoOpenLocation.setTextColor(cc.color(255,0,0));
                    //     var posX = i % 2 == 0 ? -100 : 200
                    //     lbNoOpenLocation.x = posX;
                    //     lbNoOpenLocation.y = 0;
                    //     _handNode.addChild(lbNoOpenLocation);
                    // }
                    // lbNoOpenLocation.setString(getNewName(unescape(pl.info.nickname ))+"\n未开启定位")
                    _handNode.loadTexture("distance/close_gps.png");
                    lbNoOpenLocation.setVisible(true)
                }else{
                    _handNode.loadTexture("distance/open_gps.png");
                    lbNoOpenLocation.setVisible(false)
                }
               if(MjClient.getAppType() == MjClient.APP_TYPE.QXXXGHZ){
                    var posInfo = _back.getChildByName("head_" + i).getChildByName("pos");
                    posInfo.setVisible(true);
                    if(pl.locationMsg){
                        var plyPos = pl.locationMsg.split(";");
                        var addressStr = plyPos[4];
                        var addressVec = JSON.parse(addressStr);
                        var addressInfo = "";
                        for (var k=0; k<addressVec.length-2; k++)//精确到街道
                        {
                            addressInfo += addressVec[k];
                        }
                        posInfo.setString(addressInfo);
                    }
                }
            //}
        }

        function showDistanceArrow(off1,off2,distance)
        {
            for(var i =  0;i < _roleCount;i++)
            {
                for(var j = 0;j < _roleCount;j++)
                {
                    var _arrowNode = _back.getChildByName("arrow_" + i + "_" + j);

                    // 只要存在检测的距离，不显示“未开启定位”
                    // var lbNoOpenLocation_i = _back.getChildByName("head_" + i).getChildByName("lbNoOpenLocation");
                    // var lbNoOpenLocation_j = _back.getChildByName("head_" + j).getChildByName("lbNoOpenLocation");
                    // if (distance > 0) {
                    //     lbNoOpenLocation_i && (lbNoOpenLocation_i.visible = false);
                    //     lbNoOpenLocation_i && (lbNoOpenLocation_j.visible = false);
                    // }

                    if(_arrowNode && ((off1 == i && off2 == j)||(off1 == j && off2 == i)))
                    {
                        _arrowNode.visible = true;

                        var text = _arrowNode.getChildByName("Text");
                        //text.setTextColor(cc.color(242,95,36));
                        text.ignoreContentAdaptWithSize(true);
                        if (distance>=1000)
                        {
                            text.setString("约"+(distance/1000).toFixed(1)+"km");

                        }
                        else if (distance < 0)
                        {
                            text.setString("未检测到距离");
                            text.setTextColor(cc.color("#d50c0c"));
                        }
                        else if(distance >= 0 && distance <= 50)
                        {
                            // 5.16岳阳app小于50米也显示距离
                            if(MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP ||
                                MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ ||
                                MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ ||
                                MjClient.getAppType() == MjClient.APP_TYPE.HUNANWANGWANG ||
                                MjClient.getAppType() == MjClient.APP_TYPE.QXSYDTZ)
                            {
                                text.setString("约"+distance.toFixed(1)+"m");
                            }else {
                                text.setString("小于50m");
                            }
                            text.setTextColor(cc.color("#d50c0c"));
                        }
                        else
                        {
                            text.setString("约"+distance.toFixed(1)+"m");
                        }

                    }
                }
            }
        }


        var geogData = [];
        for (var i = 0; i < tData.uids.length; i++) {
            var pl = MjClient.data.sData.players[tData.uids[i]];
            if (pl && pl.locationMsg) {
                geogData.push(pl.locationMsg);
            }
        }
        var disPlayer = [];
        var haveLittle = false;
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

                if (distance >= 0 && distance <= 50)
                    haveLittle = true;
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
                var index1 = uids.indexOf(uid1);
                var index2 = uids.indexOf(uid2);
                var selfIndex = uids.indexOf(SelfUid());
                var off1 = (index1 - selfIndex + _roleCount) % _roleCount;
                var off2 = (index2 - selfIndex + _roleCount) % _roleCount;

                showDistanceArrow(off1,off2,distance);
            }
        }

        var littleTip = _back.getChildByName("littleTip");
        var btn_dismiss = _back.getChildByName("btn_dismiss");
        var btn_ignore = _back.getChildByName("btn_ignore");
        var btn_zhuyi = _back.getChildByName("btn_zhuyi");
        if (littleTip) {
            littleTip.ignoreContentAdaptWithSize(true);
            littleTip.setVisible(false);
        }
        if(btn_zhuyi){
            btn_zhuyi.setVisible(haveLittle);
            btn_zhuyi.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    if(MjClient.APP_TYPE.BDHYZP == MjClient.getAppType()){
                        MjClient.playui.addChild(new LocationAppsLayer(), 5001);
                    }else {
                        ScanCheatLayer.pInstance = null;
                        ScanCheatLayer.showStartOnce();
                    }
                }
            }, this);
        }
        if (btn_dismiss) {
            btn_dismiss.setVisible(haveLittle);
            btn_dismiss.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    this.removeFromParent();

                    if (MjClient.data.sData && MjClient.playui)
                        MjClient.delRoom(true);
                }
            }, this);
        }
        if (btn_ignore) {
            btn_ignore.setVisible(haveLittle);
            btn_ignore.addTouchEventListener(function(sender, type) {
                if (type == 2) {
                    this.removeFromParent();
                }
            }, this);
        }
    }
}) 
