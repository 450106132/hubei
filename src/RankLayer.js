/**
 * Created by sking on 2017/7/17.
 */

var rankLayer = cc.Layer.extend({
    _cell_queshen:null,
    _queshenDataArray:[],
    _queshenList:null,
    _Panel_message:null,
    _zijiNode:null,
    ctor:function ()
    {
        this._super();
        var UI = ccs.load("RankLayer.json");
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


        var _ListViewMessage =  _back.getChildByName("ListView_1");
        cc.log("MjClient.systemConfig.bisaiImage =  "+ MjClient.systemConfig.bisaiImage);
        cc.loader.loadImg(MjClient.systemConfig.bisaiImage, {isCrossOrigin : true}, function(err,img){
            if(err)
            {
                cc.log(err);
            }
            else if (img&&cc.sys.isObjectValid(_ListViewMessage))
            {
                var panel = _ListViewMessage.getChildByName("Panel_1");
                var spriteNode = panel.getChildByName("Sprite_1");
                spriteNode.setTexture(img);
            }
        });




        this._cell_queshen = _back.getChildByName("cell_queshen");
        this._cell_queshen.visible = false;
        this._queshenList = _back.getChildByName("ListView");


        this._zijiNode = _back.getChildByName("Image_ziji");




        //初始化，土豪排行榜
        this.reqQueShenSeverData();

    },
    createQueShenOneCell:function(oneData)
    {
        var copyNode =this._cell_queshen.clone();
        copyNode.visible = true;
        var headicon = copyNode.getChildByName("nobody");
        var url = oneData.headimgurl;
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

        var _rankText = copyNode.getChildByName("Text_rank");
        _rankText.visible = false;
        _rankText.ignoreContentAdaptWithSize(true);

        var _rankImage = copyNode.getChildByName("image_rank");
        _rankImage.visible = false;
        var _pathIcon = "rank/"
        var rank = oneData.rank;
        if(rank == 1)
        {
            _rankImage.visible = true;
            _rankImage.loadTexture(_pathIcon + "jinpai.png");
        }
        else if(rank == 2)
        {
            _rankImage.visible = true;
            _rankImage.loadTexture(_pathIcon + "yinpai.png");
        }
        else if(rank == 3)
        {
            _rankImage.visible = true;
            _rankImage.loadTexture(_pathIcon + "tongpai.png");
        }
        else
        {
            _rankText.visible = true;
            _rankText.setString("" + rank);
        }


        var _Text_name = copyNode.getChildByName("Text_name");
        if(oneData.nickname)
        {
            var _nameStr = unescape(oneData.nickname);
            _Text_name.setString(getNewName(_nameStr,8));
            _Text_name.ignoreContentAdaptWithSize(true);
            _Text_name.setFontName("Arial");
            _Text_name.setFontSize(_Text_name.getFontSize());
        }

        var _winCount = copyNode.getChildByName("Text_winCount");
        _winCount.ignoreContentAdaptWithSize(true);
        _winCount.setString("0");
        if(oneData.winCount || oneData.winCount == 0)
        {
            _winCount.setString(oneData.winCount);
        }

        return copyNode;
    },
    initQueShenList:function(data)
    {

        this.initSelfInfo(this._zijiNode,data.mineRank,data.mineWin)


        var _rankList = data.list;
        for(var i = 0;i < _rankList.length ;i++)
        {
            this._queshenList.pushBackCustomItem(this.createQueShenOneCell(_rankList[i]));
        }
    },
    reqQueShenSeverData:function()
    {
        var that = this;
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.rankListMajiang",{index:1,pageNum:10},
            function(rtn)
            {
                if(rtn.code == 0)
                {

                    that.initQueShenList(rtn.data);
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
    },
    initSelfInfo:function(zijiNode,myRank,myWinCount)
    {

        var _myHead = zijiNode.getChildByName("nobody");
        var url = SelfHeadInfo().url;
        if(!url) url="png/default_headpic.png";
        cc.loader.loadImg(url, {isCrossOrigin : true}, function(err, texture)
        {
            if(!err&&texture&&cc.sys.isObjectValid(_myHead))
            {
                var headSprite = new cc.Sprite(texture);
                headSprite.setPosition(_myHead.getContentSize().width/2, _myHead.getContentSize().height/2);
                headSprite.setScale((_myHead.getContentSize().width-4)/headSprite.getContentSize().width);
                _myHead.addChild(headSprite);
            }
        });

        function _getName()
        {
            var pinfo = MjClient.data.pinfo;
            return unescape(pinfo.nickname );
        }

        var _name = zijiNode.getChildByName("text_name");
        _name.ignoreContentAdaptWithSize(true);
        _name.setString(getNewName(_getName(),7));


        var _rankText = zijiNode.getChildByName("Text_rank");
        _rankText.ignoreContentAdaptWithSize(true);
        _rankText.visible = false;

        var _rankImage = zijiNode.getChildByName("image_rank");
        _rankImage.visible = false;
        var _pathIcon = "rank/"
        var rank = myRank;//我的排名
        if(rank)
        {
            if (rank == 1) {
                _rankImage.visible = true;
                _rankImage.loadTexture(_pathIcon + "jinpai.png");
            }
            else if (rank == 2) {
                _rankImage.visible = true;
                _rankImage.loadTexture(_pathIcon + "yinpai.png");
            }
            else if (rank == 3) {
                _rankImage.visible = true;
                _rankImage.loadTexture(_pathIcon + "tongpai.png");
            }
            else {
                _rankText.visible = true;
                _rankText.setString("" + rank);
            }
        }
        else
        {
            _rankText.visible = true;
            _rankText.setString("无");
        }

        //我的胜利场次
        var _text_winCount = zijiNode.getChildByName("text_winCount");
        _text_winCount.ignoreContentAdaptWithSize(true);
        if(myWinCount || myWinCount == 0)
        {
            _text_winCount.setString(myWinCount);
        }else{
            _text_winCount.visible = false;
        }



        var _btnLiJiBaoMing = zijiNode.getChildByName("Button_20");
        if(!myRank || myRank == null || cc.isUndefined(myRank))//需要点击按钮参加
        {
            _btnLiJiBaoMing.visible = true;
            _btnLiJiBaoMing.setTouchEnabled(true);
        }
        else{
            _btnLiJiBaoMing.visible = false;
            _btnLiJiBaoMing.setTouchEnabled(false);
        }

        var a = cc.scaleTo(1,0.8);
        var a1 = cc.scaleTo(0.8,1);
        _btnLiJiBaoMing.runAction(cc.sequence(a,a1).repeatForever());
        var that = this;
        _btnLiJiBaoMing.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                //立即报名
                this.addChild(new rankRequestLayer(function()
                {
                    that.removeFromParent();
                }));
            }
        }, this);

    }
});


/*
    参加比赛
 */
var rankRequestLayer = cc.Layer.extend({
    _Text_had_person:null,
    _Text_had_money:null,
    ctor: function (callback) {
        this._super();
        var UI = ccs.load("RankRequstLayer.json");
        this.addChild(UI.node);
        var that = this;

        var _block = UI.node.getChildByName("block");
        setWgtLayout(_block, [1, 1], [0.5, 0.5], [0, 0], true);
        var that = this;
        var yiRenzheng = false;
        if(MjClient.data.pinfo.mobileNum &&
            MjClient.data.pinfo.mobileNum.toString().length == 11)
        {
            yiRenzheng = true;
        }

        var _back = UI.node.getChildByName("back");
        setWgtLayout(_back,[0.9, 0.9], [0.5, 0.5], [0, -0.04]);

        var _close = _back.getChildByName("close");
        _close.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                that.removeFromParent();
            }
        }, this);


        var Text_1 = _back.getChildByName("Text_1");
        Text_1.setString(MjClient.systemConfig.bisaiBaomingInfo);


        var _TextBg = _back.getChildByName("xiaotanchuan_51_0");
        this._textFeildName = new cc.EditBox(cc.size(356,45), new cc.Scale9Sprite("game_picture/xiaotanchuan_51.png"));
        this._textFeildName.setFontColor(cc.color(255,255,255));
        this._textFeildName.setMaxLength(6);
        this._textFeildName.setInputMode(cc.EDITBOX_INPUT_MODE_ANY);
        this._textFeildName.setPlaceHolder("点击输入");
        this._textFeildName.setPosition(_TextBg.getContentSize().width/2, _TextBg.getContentSize().height/2);
        _TextBg.addChild(this._textFeildName);


        var _TextBg1 = _back.getChildByName("xiaotanchuan_51");
        this._textFeildNum = new cc.EditBox(cc.size(356,45), new cc.Scale9Sprite("game_picture/xiaotanchuan_51.png"));
        this._textFeildNum.setFontColor(cc.color(255,255,255));
        this._textFeildNum.setMaxLength(11);
        this._textFeildNum.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
        this._textFeildNum.setPlaceHolder("点击输入");
        this._textFeildNum.setPosition(_TextBg1.getContentSize().width/2, _TextBg1.getContentSize().height/2);
        _TextBg1.addChild(this._textFeildNum);


        /*
         输入验证码
         */
        var _codeNumBg = _back.getChildByName("xiaotanchuan_codeNum");
        var _textFeildName2 = new cc.EditBox(cc.size(200,45), new cc.Scale9Sprite("game_picture/xiaotanchuan_51.png"));
        _textFeildName2.setFontColor(cc.color(255,255,255));
        _textFeildName2.setMaxLength(6);
        _textFeildName2.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
        _textFeildName2.setPlaceHolder("点击输入");
        _textFeildName2.setPosition(_codeNumBg.getContentSize().width/2, _codeNumBg.getContentSize().height/2);
        _codeNumBg.addChild(_textFeildName2);


        /*
         获取验证码
         */
        var _Btn_getCode = _back.getChildByName("Btn_getCode");
        _Btn_getCode.addTouchEventListener(function (sender, type) {
            if (type == 2)
            {
                var str = this._textFeildNum.getString();
                cc.log("输入的手机号为  =  " + str);
                if (str.length != 11)
                {
                    MjClient.showToast("请输入完整的手机号");
                    return;
                }

                if (MjClient.gamenet)
                {
                    _Btn_getCode.setTouchEnabled(false);
                    _Btn_getCode.setBright(false);

                    MjClient.block();
                    MjClient.gamenet.request("pkplayer.handler.getVerifyCode",{mobile_num:str},
                        function(rtn)
                        {
                            MjClient.unblock();
                            if (rtn.message)
                            {
                                MjClient.showToast(rtn.message);
                            }

                            if (rtn.code == 0)
                            {
                                MjClient.getVerifyCodeTime = new Date().getTime();
                            }
                            else
                            {
                                _Btn_getCode.setTouchEnabled(true);
                                _Btn_getCode.setBright(true);
                            }
                        });
                }
            }
        },this);



        /*
         倒计时
         */
        var _timeDes = _back.getChildByName("Text_time");
        _timeDes.ignoreContentAdaptWithSize(true);
        if (cc.isUndefined(MjClient.getVerifyCodeTime))
        {
            MjClient.getVerifyCodeTime = 0;
        }
        _timeDes.schedule(function()
        {
            var time = (new Date().getTime()) - MjClient.getVerifyCodeTime;
            time = parseInt(time/1000);
            if (time >= 60)
            {
                _Btn_getCode.setTouchEnabled(true);
                _Btn_getCode.setBright(true);
                _timeDes.setVisible(false);
            }
            else if (!yiRenzheng)
            {
                _Btn_getCode.setTouchEnabled(false);
                _Btn_getCode.setBright(false);
                _timeDes.setVisible(true);
                _timeDes.setString((60-time).toString() + "秒后可再次获取");
            }
        });



        if(yiRenzheng)
        {
            this._textFeildNum.setTouchEnabled(false);
            this._textFeildNum.setString(MjClient.data.pinfo.mobileNum);
            _codeNumBg.setVisible(false);
            _codeNumBg.setEnabled(false);
            _back.getChildByName("Text_code").setVisible(false);
            _Btn_getCode.setVisible(false);
            _Btn_getCode.setTouchEnabled(false);
            _timeDes.setVisible(false);
            _timeDes.setEnabled(false);
        }
        else
        {
            _back.getChildByName("Text_renzheng").setVisible(false);
        }





        var _Btn_Ok = _back.getChildByName("Btn_binding");
        _Btn_Ok.addTouchEventListener(function (sender, type)
        {
            if (type == 2)
            {
                var str = this._textFeildNum.getString();
                if (str.length !==11)
                {
                    MjClient.showToast("请输入正确的手机号");
                    return;
                }

                var strName = this._textFeildName.getString();
                if (strName.length == 0)
                {
                    MjClient.showToast("请输入姓名");
                    return;
                }


                var func_checkVerifyCode = function(code, callback)
                {
                    MjClient.block();
                    MjClient.gamenet.request("pkplayer.handler.checkVerifyCode",{mobile_num:str, verify_code:code},
                        function(rtn)
                        {
                            MjClient.unblock();
                            if (rtn.message)
                            {
                                MjClient.showToast(rtn.message);
                            }

                            if (rtn.code == 0)
                            {
                                callback();
                            }
                            else
                            {
                                _Btn_Ok.setTouchEnabled(true);
                                _Btn_Ok.setBright(true);
                            }
                        });
                };


                var func_requestJoin = function()
                {
                    MjClient.block();
                    MjClient.gamenet.request("pkplayer.handler.rankListApply",{realname:strName, type:1},
                        function(rtn)
                        {
                            MjClient.unblock();
                            if (rtn.message)
                            {
                                MjClient.showToast(rtn.message);
                            }

                            if (rtn.code == 0)
                            {
                                that.removeFromParent();
                                if (callback)
                                    callback();
                            }
                            else
                            {
                                _Btn_Ok.setTouchEnabled(true);
                                _Btn_Ok.setBright(true);
                            }
                        });
                };



                if (MjClient.data.pinfo.mobileNum &&
                    MjClient.data.pinfo.mobileNum.toString().length == 11)
                {
                    func_requestJoin();
                }
                else
                {
                    var str2 = _textFeildName2.getString();
                    cc.log("输入的验证码为  =  " + str2);
                    if (str2.length != 6)
                    {
                        MjClient.showToast("请输入完整的验证码");
                        return;
                    }

                    _Btn_Ok.setTouchEnabled(false);
                    _Btn_Ok.setBright(false);

                    func_checkVerifyCode(str2, func_requestJoin);
                }

            }
        }, this);
    }
});







