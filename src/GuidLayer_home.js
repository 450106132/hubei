var guidLayer_home= cc.Layer.extend({
    _kuaisujiaru:null,
    _kuaisuchuangjian:null,
    _Btn_create:null,
    _Btn_join:null,
    _julebulist:null,
    _memberinfo:null,
    _clublist:null,
    _item0:null,
    _item1:null,
    _item2:null,
    ctor: function () {
        this._super();
        var UI = ccs.load("GuidLayer_home.json");
        this.addChild(UI.node);
        var that = this;

        var _back = UI.node.getChildByName("back");
        setWgtLayout(_back,[0.7, 0.7], [0.05, 0.2], [0.5, 0.5]);

        this._kuaisuchuangjian = _back.getChildByName("kuaisuchuangjian");
        this._kuaisuchuangjian.setVisible(false);
        this._kuaisujiaru = _back.getChildByName("kuaisujiaru");
        this._kuaisujiaru.setVisible(false);
        this._julebulist = _back.getChildByName("julebulist");
        this._julebulist.setVisible(false);
        this._item0 = _back.getChildByName("item0");
        this._item1 = _back.getChildByName("item1");
        this._item2 = _back.getChildByName("item2");

        this._Btn_create = this._kuaisuchuangjian.getChildByName("Button");
        this._Btn_create_c = this._item2.getChildByName("Button");
        this._Btn_join = this._kuaisujiaru.getChildByName("Button");

        //快速创建
        this._Btn_create.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Xinshouyindao_Chuangjianjulebu", {uid:SelfUid()});
                reallyPlayEffect("sound/button_click.mp3",false);
                MjClient.Scene.addChild(new FriendCard_main());
                MjClient.Scene.addChild(new FriendCard_info());
            }
        }, this);

        //快速创建__
        this._Btn_create_c.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Xinshouyindao_Chuangjianjulebu", {uid:SelfUid()});
                reallyPlayEffect("sound/button_click.mp3",false);
                MjClient.Scene.addChild(new FriendCard_main());
                MjClient.Scene.addChild(new FriendCard_info());
            }
        }, this);


        //快速加入
        this._Btn_join.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Xinshouyindao_Jiarujulebu", {uid:SelfUid()});
                reallyPlayEffect("sound/button_click.mp3",false);
                MjClient.Scene.addChild(new FriendCard_main());
                MjClient.Scene.addChild(new FriendCardFindLayer());
            }
        }, this);

        if (MjClient.guide_info && MjClient.guide_info.memberInfo) 
            this._memberinfo = MjClient.guide_info.memberInfo;

        if (MjClient.guide_info && MjClient.guide_info.clubList)
            this._clublist = MjClient.guide_info.clubList;

        if(MjClient.isNewMember == true){
            if (MjClient.data.pinfo.downloadFrom 
                && parseInt(MjClient.data.pinfo.downloadFrom) > 0)
            {
                this._julebulist.setVisible(true);
                var btn_item = this._item2.clone();
                this._julebulist.pushBackCustomItem(btn_item);
            }
            else{
                this._kuaisuchuangjian.setVisible(true);
                var pos = this._kuaisujiaru.getPosition();
                this._kuaisujiaru.setPosition(this._kuaisuchuangjian.getPosition());
                this._kuaisuchuangjian.setPosition(pos);
            }
        }; 

        if(MjClient.isNewUser == true) {
            if (MjClient.data.pinfo.downloadFrom 
                && parseInt(MjClient.data.pinfo.downloadFrom) > 0) 
            {
                this._julebulist.setVisible(true);
                if (!MjClient.data.pinfo.memberId) 
                {
                    MjClient.gamenet.request("pkcon.handler.getMemberInfo", 
                        {memberId:parseInt(MjClient.data.pinfo.downloadFrom)}, 
                        function(rtn)
                        {
                            if(rtn.code==0)
                            {
                                var data = rtn.data;
                                if(data.nickname && data.memberId && data.avatar)
                                {
                                    var item = that.getlistitem(that,0,data.nickname,data.memberId,data.avatar);
                                    MjClient.bingdingbtn = item;
                                    that._julebulist.pushBackCustomItem(item);
                                }
                            }
                        })
                }
                if (this._clublist.length > 0) 
                {
                    for (var i = 0; i < this._clublist.length; i++) {
                        var item = that.getlistitem(that,1,this._clublist[i].title,this._clublist[i].clubId,this._clublist[i].avatar);
                        that._julebulist.pushBackCustomItem(item);
                    }
                }   
            }
            else
            {
                this._kuaisujiaru.setVisible(true);
            }
        };
    },
    getlistitem:function(node,type,name,id,img)
    {
        var item = null;
        var that = node;
        if (type == 0) 
        {
            
            item = that._item0.clone();
            var item_text = item.getChildByName("id");
            var str = "邀请码:" + id;
            item_text.setString(str);

            var item_btn = item.getChildByName("Button");
            item_btn.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Xinshouyindao_Bangding", {uid:SelfUid()});
                if (MjClient.data.pinfo.downloadFrom 
                    && parseInt(MjClient.data.pinfo.downloadFrom) > 0 
                    && !MjClient.data.pinfo.memberId)
                {
                    var layer = new autoBindingCodeLayer_tips(parseInt(MjClient.data.pinfo.downloadFrom));
                    MjClient.Scene.addChild(layer);

                    var oldScale = layer.getScale();
                    layer.setScale(0);
                    layer.runAction(cc.scaleTo(0.3, oldScale).easing(cc.easeBackOut()));
                }
            }
            }, that);
        }
        else if (type == 1)
        {
            item = that._item1.clone();
            var item_text = item.getChildByName("id");
            //俱乐部ID
            var str = "ID:"+id;
            item_text.setString(str);

            var item_btn = item.getChildByName("Button");
            item_btn.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                MjClient.native.umengEvent4CountWithProperty("Zhujiemian_Xinshouyindao_Jiaru", {uid:SelfUid()});
            MjClient.gamenet.request("pkplayer.handler.clubApply", {clubId : id},
                function(rtn) {
                    cc.log(" ===== clubApply === " + JSON.stringify(rtn))
                    if (rtn.message) {
                        MjClient.showToast(rtn.message);
                    } else {
                        MjClient.showToast("申请失败");
                    }
                }
            );
                //MjClient.showToast("申请成功");
            }
            }, that);

        }

        var item_name = item.getChildByName("name");
        var _nameStr = unescape(name);
        item_name.setString(getNewName(_nameStr));

        var item_bg = item.getChildByName("headbg");
        //显示头像
        var url = img;
        if(!url) url="png/default_headpic.png";
        that.CircularCuttingHeadImg(item_bg,url);
        return item;
    },
    // 设置圆形裁剪头像
    CircularCuttingHeadImg:function (node, url)
    {
        var head = node;
        cc.loader.loadImg(url, {isCrossOrigin : true}, function(err, texture)
        {
            if(!err && texture && cc.sys.isObjectValid(head))
            {
                cc.log("add head img" + JSON.stringify(texture));
                var clippingNode = new cc.ClippingNode();
                var mask = new cc.Sprite("Guid/headbg2.png");
                clippingNode.setAlphaThreshold(0);
                clippingNode.setStencil(mask);
                var img = new cc.Sprite(texture);
                img.setScale(mask.getContentSize().width / img.getContentSize().width);
                clippingNode.addChild(img);
                clippingNode.setPosition(head.getContentSize().width / 1.62, head.getContentSize().height / 1.9);
                //遮罩框
                var hideblock = new cc.Sprite("Guid/head.png");
                hideblock.setPosition(hideblock.getContentSize().width / 2, hideblock.getContentSize().height / 2);
                head.addChild(clippingNode);
                head.addChild(hideblock);
            }
        });
    }
});
