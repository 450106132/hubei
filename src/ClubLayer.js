/**
 * Created by sking on 2017/7/8.
 */
var clubLayer = cc.Layer.extend({
    _listView:null,
    _cellNode:null,
    _exit_club:null,
    _listArray:[],
    ctor: function () {
        this._super();
        var UI = ccs.load("ClubLayer.json");
        this.addChild(UI.node);
        var that = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);

        var _back = UI.node.getChildByName("back");
        setWgtLayout(_back,[0.95, 0.95], [0.5, 0.5], [0, 0]);

        var _close = _back.getChildByName("close");
        _close.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                that.removeFromParent();
            }
        }, this);

        this._exit_club = _back.getChildByName("Text_exit");
        this._exit_club.setTouchEnabled(true);
        this._exit_club.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                MjClient.showMsg("真的要退出亲友圈吗？",function () {
                    MjClient.block();
                    MjClient.gamenet.request("pkplayer.handler.exitClub",{},
                        function(rtn)
                        {
                            if(rtn.code == 0)
                            {
                                MjClient.showToast("退出亲友圈成功");
                                that.removeFromParent();
                            }
                            else
                            {
                                if(rtn.message)
                                {
                                    MjClient.showToast(rtn.message);
                                }
                                else
                                {
                                    MjClient.showToast("退出亲友圈失败，请重试");
                                }
                            }
                            MjClient.unblock();
                        }
                    );
                },function(){},"1");
            }
        }, this);


        this._cellNode = _back.getChildByName("cell_node");
        this._cellNode.visible = false;

        this._listView = _back.getChildByName("ListView_1");
        this._listView.removeAllChildren(true);
        this._listArray = [];


        var that = this;
        var _listViewState = 0;
        this._listView.addCCSEventListener(function(sender,type){
            switch (type) {
                case ccui.ScrollView.EVENT_SCROLL_TO_BOTTOM:
                    if (_listViewState == 0)
                    {
                        _listViewState = 1;
                    }
                    break;
                case ccui.ScrollView.EVENT_AUTOSCROLL_ENDED:
                    if (_listViewState == 1)
                    {
                        var idx = 0;
                        if (that._listArray.length > 0)
                        {
                            idx = that._listArray[that._listArray.length - 1].index;
                        }
                        that.reqSeverData(_back,idx);
                    }
                    _listViewState = 0;
                    break;
            }
        });



        this.reqSeverData(_back,0);
    },
    initClubInfo:function(backNode,data)
    {
        cc.log("===========culb ==========");

        this._clubName = backNode.getChildByName("Text_clubName");
        this._clubName.ignoreContentAdaptWithSize(true);
        //this._clubName.setString(data.info.clubTitle);
        if(data.info.clubTitle)
        {
            var _Str = unescape(data.info.clubTitle);
            this._clubName.setString(getNewName(_Str,11));
        }

        this._clubID = backNode.getChildByName("Text_clubID");
        this._clubID.ignoreContentAdaptWithSize(true);
        this._clubID.setString("ID:" + data.info.clubId);

        this._clubSay = backNode.getChildByName("Text_clubsay");
        this._clubSay.setString(getNewName(data.info.clubNotice,25));
        if(data.info.clubNotice)
        {
            var _Str = unescape(data.info.clubNotice);
            this._clubSay.setString(getNewName(_Str,25));
        }

        if(data.list.length == 0)
        {
            return MjClient.showToast("已显示所有成员");
        }

        for(var i = 0; i <  data.list.length ;i++)
        {
            var oneData = data.list[i];
            if(oneData)
            {
                this._listView.pushBackCustomItem(this.createOneCellInfo(oneData));
            }
        }

    },
    createOneCellInfo:function(data)
    {
        var _copyNode = this._cellNode.clone();
        _copyNode.visible = true;
        _copyNode.setTag(data.index);

        this._listArray.push(data);

        var headicon = _copyNode.getChildByName("head").getChildByName("nobody");
        var url = data.headimgurl;
        if(!url) url="png/default_headpic.png";
        cc.loader.loadImg(url, {isCrossOrigin : true}, function(err, texture)
        {
            if(!err&&texture&&cc.sys.isObjectValid(headicon))
            {
                var headSprite = new cc.Sprite(texture);
                headSprite.setPosition(headicon.getContentSize().width/2, headicon.getContentSize().height/2);
                headSprite.setScale((headicon.getContentSize().width-4)/headSprite.getContentSize().width);
                headicon.addChild(headSprite);
            }
        });

        var _name = _copyNode.getChildByName("Text_name");
        if(data.nickname)
        {
            var _nameStr = unescape(data.nickname);
            _name.setString(getNewName(_nameStr,11));
            _name.setFontName("Arial");
            _name.setFontSize(_name.getFontSize());
        }


        var _job = _copyNode.getChildByName("Text_job");
        _job.ignoreContentAdaptWithSize(true);
        if(data.duty == 1)
        {
            _job.setString("会长");
        }
        else if(data.duty == 2)
        {
            _job.setString("会员");
        }
        else
        {
            _job.setString("会员");
        }

        //如果自己是会长，则隐藏退出功能
        if(data.duty == 1 && data.userId == SelfUid())
        {
            this._exit_club.visible = false;
            this._exit_club.setTouchEnabled(false);
        }


        var _playCount = _copyNode.getChildByName("Text_playCount");
        _playCount.ignoreContentAdaptWithSize(true);
        if(data.playNum || data.playNum == 0)
        {
            _playCount.setString(data.playNum);
        }

        var _winTime = _copyNode.getChildByName("Text_winTime");
        _winTime.ignoreContentAdaptWithSize(true);
        if(data.winnerNum || data.winnerNum == 0)
        {
            _winTime.setString(data.winnerNum);
        }

        var _online = _copyNode.getChildByName("Text_online");
        if(data.isOnline)
        {
            _online.setString("当前在线");
        }else{
            if(data.lastLoginTime)
            {
                var timeStr = MjClient.dateFormat(new Date(parseInt(data.lastLoginTime)),'yyyy/MM/dd');
                _online.setString("上次登录\n" + timeStr);
            }
            else
            {
                _online.setString("当前不在线");
            }
        }

        if(data.userId)
        {
            if((data.userId == SelfUid()))//自己变灰色
            {
                _copyNode.setColor(cc.color(200,200,200));
            }
        }

        if(data.duty)
        {
            if(data.duty == 1)//会长
            {
                _name.setColor(cc.color(255,0,0));
                _job.setColor(cc.color(255,0,0));
                _playCount.setColor(cc.color(255,0,0));
                _winTime.setColor(cc.color(255,0,0));
                _online.setColor(cc.color(255,0,0));
            }else{
                _name.setColor(cc.color(120,70,8));
                _job.setColor(cc.color(120,70,8));
                _playCount.setColor(cc.color(120,70,8));
                _winTime.setColor(cc.color(120,70,8));
                _online.setColor(cc.color(120,70,8));
            }
        }

        return _copyNode;
    },
    reqSeverData:function(backNode,Index)
    {
        if(!Index || Index == null)
        {
            Index = 0;
        }
        var that = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.clubInfo",{lastIndex:Index},
            function(rtn)
            {
                if(rtn.code == 0)
                {

                    that.initClubInfo(backNode,rtn.data);
                }
                else
                {
                    if(rtn.message)
                    {
                        MjClient.showToast(rtn.message);
                    }
                    else
                    {
                        MjClient.showToast("获取数据失败,请重新打开");
                    }

                }

                MjClient.unblock();
            }
        );
    }
});



/*
 绑定亲友圈邀请码
 */
var clubindingCodeLayer = cc.Layer.extend({
    _textFeildName:null,
    ctor: function () {
        this._super();
        var UI = ccs.load("ClubBindingLayer.json");
        this.addChild(UI.node);
        var that = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);


        var _back = UI.node.getChildByName("back");
        setWgtLayout(_back,[0.8, 0.8], [0.5, 0.5], [0, -0.03]);

        var _close = _back.getChildByName("close");
        _close.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                that.removeFromParent();
            }
        }, this);

        //描述
        var _desc = _back.getChildByName("Text_1");
        if (MjClient.updateCfg && MjClient.systemConfig.clubInfo)
        {
            _desc.setString(MjClient.systemConfig.clubInfo);
        }
        else
        {
            _desc.setString("请向上级代理询问亲友圈ID，申请加入后请等待代理审核");
        }


        var _Image_2 = _back.getChildByName("Image_2");
        var starParticle1 =  new cc.ParticleSystem("game_picture/diamondStar.plist");
        starParticle1.setPosition(_Image_2.getContentSize().width/2, _Image_2.getContentSize().height/2);
        _Image_2.addChild(starParticle1);


        var _TextBg = _back.getChildByName("xiaotanchuan_51");
        this._textFeildName = new cc.EditBox(cc.size(356,45), new cc.Scale9Sprite("game_picture/xiaotanchuan_51.png"));
        this._textFeildName.setFontColor(cc.color(255,255,255));
        this._textFeildName.setMaxLength(8);
        this._textFeildName.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
        this._textFeildName.setPlaceHolder("点击输入");
        this._textFeildName.setPosition(_TextBg.getContentSize().width/2, _TextBg.getContentSize().height/2);
        _TextBg.addChild(this._textFeildName);

        /*
         绑定
         */
        var _Btn_binding = _back.getChildByName("Btn_binding");
        _Btn_binding.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                var _str = that._textFeildName.getString();
                if(_str.length == 0 || parseInt(_str) == 0)
                {
                    MjClient.showToast("请输入正确的亲友圈ID");
                    return;
                }

                MjClient.gamenet.request("pkplayer.handler.clubApply", {clubId:Number(_str)}, function(rtn)
                {
                    if(rtn.code==0)
                    {
                        if (!cc.isUndefined(rtn.message))
                            MjClient.showToast(rtn.message);
                        else
                            MjClient.showToast("申请成功！");
                        that.removeFromParent();
                    }
                    else
                    {
                        if (!cc.isUndefined(rtn.message))
                            MjClient.showToast(rtn.message);
                    }
                });
            }
        },this);
    },
    binding:function(ID)
    {
        var that = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.clubApply",{clubId:ID},
            function(rtn)
            {
                if(rtn.code == 0)
                {
                    that.removeFromParent();
                }

                if(rtn.message)
                {
                    MjClient.showToast(rtn.message);
                }
                MjClient.unblock();
            }
        );
    }
});