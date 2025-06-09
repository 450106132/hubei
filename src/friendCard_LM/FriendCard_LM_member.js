/**
 * Created by fhw on 2018/08/29.
 */


// 亲友圈-联盟-成员列表
var FriendCard_LM_member = cc.Layer.extend({
    ctor:function(clubInfo) {
        this._super();
        MjClient.friendCard_member_ui = this;
        var that = this;
        
        this.clubInfo = clubInfo;

        this.isSupperManger = FriendCard_Common.isSupperManger(this.clubInfo);//这里不是真的创建者
        this.isLeader = FriendCard_Common.isLeader(this.clubInfo);
        this.isManager = FriendCard_Common.isManager(this.clubInfo);
        this.isGroupLeader = FriendCard_Common.isGroupLeader(this.clubInfo);
        this.isAssistants = FriendCard_Common.isAssistants(this.clubInfo);
        this.isLMClubManager = FriendCard_Common.isLMClubManager(this.clubInfo);
        var subClubId = MjClient.FriendCard_main_ui.data.subClubId;
        this.isOpenOptAnyOne = (this.clubInfo.isOptGroupOpen && this.clubInfo.isOptGroupOpen.indexOf(subClubId) > -1);

        this._roleId = 0;
        if(this.isAssistants){
            this._roleId = 4;
        }else if(this.isGroupLeader){
            this._roleId = 2;
        }else if(this.isLeader){
            this._roleId = 3;
        }else if(this.isSupperManger){
            this._roleId = 6;
        }else if(FriendCard_Common.isLMChair()){
            this._roleId = 1;
        }else if(this.isLMClubManager){
            this._roleId = 5;
        }
        this._checkGroupType = "全部";
        this.curUserGrp = null; //自己的是什么分组
        var resJson = "friendcard_member.json";
        if(isIPhoneX() && FriendCard_Common.getSkinType() != 3 && FriendCard_Common.getSkinType() != 4){
            resJson = "friendcard_memberX.json";
        }
        var node = ccs.load(resJson).node;
        this.node = node;
        this.addChild(node);
        var that = this;
        var block = node.getChildByName("block");
        var Image_di = node.getChildByName("Image_di");
        

        this._Image_bg = node.getChildByName("Image_bg");
        var Image_hua = node.getChildByName("Image_hua");
        var Image_left = node.getChildByName("Image_left");

        COMMON_UI.setNodeTextAdapterSize(node);

        setWgtLayout(block, [1, 1], [0.5, 0.5], [0, 0],true);
        if(FriendCard_Common.getSkinType() == 1)
        {
            var close = node.getChildByName("close");

            setWgtLayout(close , [0.15, 0.1097], [0.997, 1], [0, 0],false);
            Image_di.width = MjClient.size.width;
            Image_di.height = MjClient.size.height *0.9653;
            Image_di.setPosition(MjClient.size.width/2,MjClient.size.height/2);
            setWgtLayout(this._Image_bg , [1, 0.9653], [0.5, 0.5], [0, 0],false);

            if(isIPhoneX()){
                setWgtLayout(Image_left , [0.2976   , 1.0402], [0, 0], [0, 0],false);
                setWgtLayout(Image_hua , [0.1830, 0.2220], [0.0156, 0.9792], [0, 0],false);
            }else{
                setWgtLayout(Image_hua, [0.1773, 0.1764], [0.0156, 0.9792], [0, 0],false);
                setWgtLayout(Image_left, [0.2883, 0.8264], [0, 0], [0, 0],false);
            }
        }
        else if(FriendCard_Common.getSkinType() == 2)
        {
            Image_di.width = MjClient.size.width;
            Image_di.height = MjClient.size.height //*0.9306;
            Image_di.setPosition(MjClient.size.width/2,MjClient.size.height*0.5);

            var close = node.getChildByName("close");
            var suizi = node.getChildByName("suizi");
            var listView_leftBG = this.node.getChildByName("ListView_leftBG")
            if(isIPhoneX()){
                setWgtLayout(close , [0.1226, 0.2916], [0.9662, 0.8910], [0, 0],false);
                setWgtLayout(suizi , [0.0148, 0.3431], [0.9690, 0.8657], [0, 0],false);
                setWgtLayout(this._Image_bg , [1, 0.9653], [0.5, 0.4842], [0, 0],false);
                listView_leftBG.width = MjClient.size.width * 0.218;
                listView_leftBG.height = MjClient.size.height *0.95;
                listView_leftBG.setPosition(0,MjClient.size.height*0.5);
            }else{
                setWgtLayout(close , [0.1188, 0.2236], [0.9740, 0.9062], [0, 0],false);
                setWgtLayout(suizi , [0.0148, 0.3431], [0.9764, 0.9147], [0, 0],false);
                setWgtLayout(this._Image_bg , [1, 1], [0.5, 0.5], [0, 0],false);
                listView_leftBG.width = MjClient.size.width * 0.1992;
                listView_leftBG.height = MjClient.size.height *0.95;
                listView_leftBG.setPosition(0,MjClient.size.height*0.5);
            }
            closeBtnAddLight(close)
        }else if(FriendCard_Common.getSkinType() == 3  || FriendCard_Common.getSkinType() == 4){
            var close = this._Image_bg.getChildByName("close");
            setWgtLayout(this._Image_bg , [1, 1], [0.5, 0.5], [0, 0],false);
        }
        close.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Chengyuan_Close", {uid:SelfUid()});
                this.removeFromParent(true);
            }
        }, this);

        this.initView();
        if (clubInfo.showIndex){
            this.showPosition(clubInfo.showIndex);
        }else{
            if(!this.isManager || this.isLMClubManager){
                this.showPosition(1);
            }else{
                this.showPosition(0);
            }
        }

        UIEventBind(null, this, "league_refresh_info", function(rtn) {
            that.clubInfo.roleMap = rtn.roleMap
        });
        
        
    },
    initView:function () {
        var that = this,ListView_left;
        if(FriendCard_Common.getSkinType() == 2)
        {
            var panel_left = this.node.getChildByName("panel_left");
            if(isIPhoneX())
            {
                setWgtLayout(panel_left , [0.2177, 1], [0,0], [0, 0],false);
            }
            else
            {
                setWgtLayout(panel_left , [0.1977, 1], [0,0], [0, 0],false);
            }
            ListView_left = panel_left.getChildByName("ListView_left")
        }
        else
        {
            ListView_left = this._Image_bg.getChildByName("ListView_left");
        }
        ListView_left.setScrollBarEnabled(false);
        var Button_member = ListView_left.getChildByName("Button_member");
        var Button_shenhe = ListView_left.getChildByName("Button_shenhe");
        var Button_group = ListView_left.getChildByName("Button_group");
        var Button_zhuli = ListView_left.getChildByName("Button_zhuli");
        var Button_league = ListView_left.getChildByName("Button_league");
        var Button_daoru = ListView_left.getChildByName("Button_daoru");
        var Button_addMember = ListView_left.getChildByName("Button_addMember");
        var Button_member_record = ListView_left.getChildByName("Button_member_record");
        Button_member_record.addChild(Button_shenhe.getChildByName("Image_point").clone());

        Button_shenhe.removeFromParent(true);
        if(!this.isManager || this.isLMClubManager){
            Button_league.removeFromParent(true);
        }
        if(FriendCard_Common.isOrdinaryMember()){
            Button_member_record.removeFromParent(true);
        }else{
            Button_member_record.getChildByName("Image_point").visible = MjClient.FriendCard_main_ui.data.redpointMemberButton;
            UIEventBind(null, Button_member_record, "update_member_record", function(eD) {
                Button_member_record.getChildByName("Image_point").visible = MjClient.FriendCard_main_ui.data.redpointMemberButton
            });
        }
        if(!this.isManager && !this.isGroupLeader && !this.isAssistants){
            Button_addMember.removeFromParent(true);
        }
        //导入权限
        if(FriendCard_Common.isOrdinaryMember()){
            Button_daoru.removeFromParent(true);
        }else if(!this.isLeader && !FriendCard_Common.isOpenMemberDaoru()){
            var hasPowerDaoru = false;

            if(FriendCard_Common.isLMChair() && !this.clubInfo.importChairmanPermTime){
                hasPowerDaoru = true;
            }
            
            if(this.isAssistants && 
                (!this.clubInfo.importChairmanPermTime && this.clubInfo.importPermTime)){
                hasPowerDaoru = true;
            }

            if(this.isGroupLeader && 
                (!this.clubInfo.importChairmanPermTime && this.clubInfo.importPermTime)){
                hasPowerDaoru = true;
            }

            if(this.isLMClubManager && 
                (!this.clubInfo.importChairmanPermTime && this.clubInfo.importPermTime)){
                hasPowerDaoru = true;
            }

            if(this.isSupperManger && 
                (!this.clubInfo.importChairmanPermTime && this.clubInfo.importPermTime)){
                hasPowerDaoru = true;
            }
            
            if(!hasPowerDaoru){
                Button_daoru.removeFromParent(true);
            }
        }//导入权限end
        
        if (!this.isManager || this.isLMClubManager) {
            Button_group.removeFromParent(true);
        }
        if (!this.isGroupLeader) {
            Button_zhuli.removeFromParent(true);
        }

        this.leftViews =[Button_league,Button_member,Button_daoru,Button_addMember,Button_group,Button_zhuli,null,Button_member_record];
        for (var i in this.leftViews){
            if (this.leftViews[i] && cc.sys.isObjectValid(this.leftViews[i])){
                this.leftViews[i].tag = i;
                this.leftViews[i].addTouchEventListener(function (sender, type) {
                    if (type == 2) {
                        that.showPosition(sender.tag);
                    }
                }, this);
            }
        }
        var Panel_check_member = this._Image_bg.getChildByName("Panel_check_member");
        Panel_check_member.removeFromParent(true);

        var Panel_member = this._Image_bg.getChildByName("Panel_member");
        Panel_member.keyName = "member_member";
        Panel_member.sortEventName = "sortChange_" + Panel_member.keyName;
        Panel_member.updateEventName = "friendCard_memberListUpdate";
        var Panel_league = this._Image_bg.getChildByName("Panel_league");
        var Panel_group = this._Image_bg.getChildByName("Panel_group");
        Panel_group.keyName = "member_group";
        Panel_group.sortEventName = "sortChange_" + Panel_group.keyName;
        Panel_group.updateEventName = "friendCard_groupListUpdate";
        var Panel_zhuli = this._Image_bg.getChildByName("Panel_zhuli");
        Panel_zhuli.keyName = "member_zhuli";
        Panel_zhuli.sortEventName = "sortChange_" + Panel_zhuli.keyName;
        Panel_zhuli.updateEventName = "friendCard_zhuliListUpdate";
        var Panel_daoru = this._Image_bg.getChildByName("Panel_daoru");
        var Panel_tianjia = this._Image_bg.getChildByName("Panel_tianjia");
        var Panel_daochu = this._Image_bg.getChildByName("Panel_daochu");
        var Panel_member_record = this._Image_bg.getChildByName("Panel_member_record");
        this.panelViews =[Panel_league,Panel_member,Panel_daoru,Panel_tianjia,Panel_group,Panel_zhuli,Panel_daochu,Panel_member_record];


        this.Panle_memberManage = this.node.getChildByName("Panle_memberManage");
        this.Panle_memberManage.setPosition(cc.p(MjClient.size.width/2, MjClient.size.height/2));
        this.Panle_memberManage.width = MjClient.size.width;
        this.Panle_memberManage.height = MjClient.size.height;
        var Panle_memberManage_block = this.Panle_memberManage.getChildByName("block");
        Panle_memberManage_block.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                that.Panle_memberManage.visible = false;
            }
        }, this);
        setWgtLayout(Panle_memberManage_block , [1, 1], [0.5, 0.5], [0, 0],true);
        var Panle_memberManage_Image_bg = this.Panle_memberManage.getChildByName("Image_bg");
        if(isIPhoneX()){
            setWgtLayout(Panle_memberManage_Image_bg , [0.8339, 0.9143], [0.5, 0.5], [0, 0],false);
        }else{
            setWgtLayout(Panle_memberManage_Image_bg , [0.8078, 0.7264], [0.5, 0.5], [0, 0],false);
        }
        this.Panle_memberManage.visible = false;

        this.panle_LMListManage = this.node.getChildByName("Panle_LMListManage");
        this.panle_LMListManage.setPosition(cc.p(MjClient.size.width/2, MjClient.size.height/2));
        this.panle_LMListManage.width = MjClient.size.width;
        this.panle_LMListManage.height = MjClient.size.height;
        var panle_LMListManage_block = this.panle_LMListManage.getChildByName("block");
        panle_LMListManage_block.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                that.panle_LMListManage.visible = false;
            }
        }, this);
        setWgtLayout(panle_LMListManage_block , [1, 1], [0.5, 0.5], [0, 0],true);
        var panle_LMListManage_Image_bg = this.panle_LMListManage.getChildByName("Image_bg");
        if(isIPhoneX()){
            setWgtLayout(panle_LMListManage_Image_bg , [0.8339, 0.9143], [0.5, 0.5], [0, 0],false);
        }else{
            setWgtLayout(panle_LMListManage_Image_bg , [0.8078, 0.7264], [0.5, 0.5], [0, 0],false);
        }
        this.panle_LMListManage.visible = false;

        this.Panle_addRemark = this.node.getChildByName("Panle_addRemark");
        this.Panle_addRemark.setPosition(cc.p(MjClient.size.width/2, MjClient.size.height/2));
        this.Panle_addRemark.width = MjClient.size.width;
        this.Panle_addRemark.height = MjClient.size.height;
        var Panle_addRemark_block = this.Panle_addRemark.getChildByName("block");
        Panle_addRemark_block.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                that.Panle_addRemark.visible = false;
            }
        }, this);
        setWgtLayout(Panle_addRemark_block , [1, 1], [0.5, 0.5], [0, 0],true);
        var Panle_addRemark_Image_bg = this.Panle_addRemark.getChildByName("Image_bg");
        if(FriendCard_Common.getSkinType() == 3){
            setWgtLayout(Panle_addRemark_Image_bg , [1, 1], [0.5, 0.5], [0, 0],false);
        }else{
            if(isIPhoneX()){
                setWgtLayout(Panle_addRemark_Image_bg , [0.6589, 0.7605], [0.5, 0.5], [0, 0],false);
            }else{
                setWgtLayout(Panle_addRemark_Image_bg , [0.6383, 0.6042], [0.5, 0.5], [0, 0],false);
            }
        }

        this.Panle_addRemark.visible = false;

        this.Panle_daochu = this.node.getChildByName("Panle_daochu");
        this.Panle_daochu.setPosition(cc.p(MjClient.size.width/2, MjClient.size.height/2));
        this.Panle_daochu.width = MjClient.size.width;
        this.Panle_daochu.height = MjClient.size.height;
        var Panle_daochu_block = this.Panle_daochu.getChildByName("block");
        Panle_daochu_block.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                that.Panle_daochu.visible = false;
            }
        }, this);
        setWgtLayout(Panle_daochu_block , [1, 1], [0.5, 0.5], [0, 0],true);
        var Panle_daochu_Image_bg = this.Panle_daochu.getChildByName("Image_bg");
        if(isIPhoneX()){
            setWgtLayout(Panle_daochu_Image_bg , [0.8339, 0.9143], [0.5, 0.5], [0, 0],false);
        }else{
            setWgtLayout(Panle_daochu_Image_bg , [0.8078, 0.7264], [0.5, 0.5], [0, 0],false);
        }

        this.Panle_daochu.visible = false;
        var Image_bg = this.Panle_daochu.getChildByName("Image_bg");
        var cell_daochu = Image_bg.getChildByName("Cell");
        cell_daochu.visible = false;
        var daochu_close = Image_bg.getChildByName("close");
        daochu_close.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                that.Panle_daochu.visible = false;
            }
        }, this);
        closeBtnAddLight(daochu_close);
        this.refreshDaoChuList = function (playerData) {

            var listView = Image_bg.getChildByName("ListView");
            var cell = Image_bg.getChildByName("Cell");
            cell.visible = false;
            listView.removeAllItems();
            Image_bg.removeChildByName("emptyTextTip");
            if (!this.daochu_data || this.daochu_data.length <= 1){
                var emptyTxt = new ccui.Text();
                emptyTxt.setFontName("fonts/lanting.TTF");
                emptyTxt.setFontSize(30);
                emptyTxt.setString("暂无数据");
                emptyTxt.setColor(cc.color(0x79, 0x34, 0x12));
                emptyTxt.setName("emptyTextTip");
                emptyTxt.setPosition(Image_bg.width/2,Image_bg.height/2);
                Image_bg.addChild(emptyTxt);
                return;
            }
            for(var i = 0; i < this.daochu_data.length; i++)
            {
                if (this.daochu_data[i].clubId == this.clubInfo.clubId)
                    continue;

                var itemData = this.daochu_data[i];
                var item = cell.clone();
                item.visible = true;
                listView.pushBackCustomItem(item);

                var text_title = item.getChildByName("Text_title");
                text_title.setString(unescape(itemData.title))

                var text_people = item.getChildByName("Text_people");
                text_people.setString("总共"+itemData.playerCount+"人")

                var text_id = item.getChildByName("Text_Id");
                text_id.setString("ID: " + itemData.clubId)

                var head = item.getChildByName("Image_head");
                head.isMask = true;
                that.refreshHead(itemData.avatar ? itemData.avatar : "png/default_headpic.png", head);

                item.setTag(i)
                item.addTouchEventListener(function (sender, type)
                {
                    if (type != 2)
                        return;
                    var index = sender.getTag();
                    var uiPara = {}
                    uiPara.msg = "确定将玩家"+getNewName(unescape(playerData.nickname))+"导入到"+unescape(that.daochu_data[index].title)+"吗?";
                    uiPara.yes = function() {
                        MjClient.block();
                        MjClient.gamenet.request("pkplayer.handler.leagueExportUser", {
                            currentLid:that.clubInfo.clubId,
                            type:that.daochu_data[index].leagueId ? 1 : 2,
                            targetLid:that.daochu_data[index].clubId,
                            userId:playerData.userId},  function(rtn)
                        {
                            MjClient.unblock();
                            if (!cc.sys.isObjectValid(that))
                                return;
                            if(rtn.code == 0)
                            {
                                MjClient.showToast(rtn.message);
                                postEvent("friendCard_memberListUpdate");
                                that.Panle_daochu.visible = false;
                                that.Panle_memberManage.visible = false;
                            }
                            else
                            {
                                FriendCard_Common.serverFailToast(rtn);
                            }
                        });
                        MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Chengyuan_Chengyuanliebiao_Caozuo_Tianjiadaoqitapengyouquan_Sure", {uid: SelfUid()});
                    }
                    uiPara.no = function() {
                    }
                    uiPara.close = function() {
                    }
                    MjClient.FriendCard_main_ui.addChild(new Friendcard_popUpMeg(uiPara))
                    MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Chengyuan_Daoruchenyuan", {uid:SelfUid()});
                });
            }
        }

        this.editBoxEditingDidBegin = function (editBox) {
            if(editBox.getChildByName("hintTxt")){
                editBox.getChildByName("hintTxt").visible = false;
            }
            if(editBox.lastText){
                editBox.setString(editBox.lastText);
            }
        };
        this.editBoxEditingDidEnd = function (editBox) {
            var hintTxt = editBox.getChildByName("hintTxt");
            if(hintTxt){
                hintTxt.visible = true;
                if(!(editBox.getString() && editBox.getString().length > 0)){
                    hintTxt.setString(hintTxt.defaultText);
                    hintTxt.setColor(hintTxt.defaultColor);
                    editBox.lastText = "";
                }else {
                    hintTxt.setString(editBox.getString());
                    editBox.lastText = editBox.getString();
                    editBox.setString("");
                    hintTxt.setColor(editBox.getFontColor());
                }
            }
        };
        this.editBoxTextChanged = function (editBox, text ) {

        };

        this.editBoxReturn = function (editBox) {

        };
        this.setEditString = function (editBox,text) {
            var hintTxt = editBox.getChildByName("hintTxt");
            if(hintTxt){
                editBox.lastText = text;
                if(text){
                    hintTxt.setString(text);
                    hintTxt.setColor(editBox.getFontColor());
                }else{
                    hintTxt.setString(hintTxt.defaultText);
                    hintTxt.setColor(hintTxt.defaultColor);
                }
            }else{
                editBox.setString(text);
            }
        }
        this.initPanle_filtrateMember();
    },
    //设置显示当前面板
    showPosition:function (index) {
        this.showingIndex = index;
        for (var i in this.panelViews){
            if (this.panelViews[i] && cc.sys.isObjectValid(this.panelViews[i])){
                this.panelViews[i].visible = false;
            }
        }
        for (var i in this.leftViews){
            if (this.leftViews[i] && cc.sys.isObjectValid(this.leftViews[i])){
                this.leftViews[i].setBright(false);
                if(FriendCard_Common.getSkinType() == 4){
                    var textLabel = this.leftViews[i].getChildByName("Text");
                    textLabel.disableEffect();
                    textLabel.setColor(cc.color("#B0684B"));
                }

            }
        }
        if(this.leftViews[index]){
            this.leftViews[index].setBright(true);
            if(FriendCard_Common.getSkinType() == 4){
                var textLabel = this.leftViews[index].getChildByName("Text");
                textLabel.setColor(cc.color("#FFF5D9"));
                textLabel.enableShadow(cc.color("#AC633B"),textLabel.getShadowOffset(),textLabel.getShadowBlurRadius());
            }
        }
        if (index == 0){
            this.showLeagueView();
        }else if (index == 1){
            MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Chengyuan_Chengyuanliebiao", {uid:SelfUid()});
            this.showMemberView();
        }else if (index == 2){
            MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Chengyuan_Daoruchengyuan", {uid:SelfUid()});
            this.showDaoruView();
        }else if (index == 3){
            MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Chengyuan_Tianjiachengyuan", {uid:SelfUid()});
            this.showAddMemberView();
        }else if (index == 4){
            this.showGroupView();
        }else if (index == 5){
            this.showZhuliView();
        }else if (index == 6){
            this.leftViews[3].setBright(true);
            this.showNewMemberDaoChuView();
        }else if (index == 7){
            this.showMemberRecordView();
        }
    },
    showMemberRecordView:function(){
        var that = this;
        var _panel = this.panelViews[7];
        if (!this.hasInitMemberRecordView){
            _panel._hasMoreData = true;
            _panel._listView = _panel.getChildByName("ListView");
            _panel._listView._curPage = 0;
            _panel._cell = _panel.getChildByName("Cell");
            _panel._cell.visible = false;
            _panel._data = {};
            _panel._data.list = [];

            _panel._prePageLength = 5;//本地测试分页
            if (cc.sys.OS_WINDOWS != cc.sys.os) {
                _panel._prePageLength = 50;
            } 
            var btn_all = _panel.getChildByName("Button_all");
            var btn_join = _panel.getChildByName("Button_join");
            var btn_quit = _panel.getChildByName("Button_quit");
            var _selectTypeViews = [btn_all,btn_join,btn_quit];
            _selectTypeViews[0].setBright(false);
            _panel._reflashTypeViews = function(view){
                for(var i = 0 ;i < _selectTypeViews.length;i++){
                    if(_selectTypeViews[i] != view){
                        _selectTypeViews[i].setBright(true);
                    }else{
                        _selectTypeViews[i].setBright(false);
                    }
                }
            }
            btn_all.addTouchEventListener(function(sender,type){
                if(type == 2){
                    _panel._type = 0;
                    _panel._reflashTypeViews(sender);
                    that.rquestMemberRecordList(null);
                }
            })
            btn_join.addTouchEventListener(function(sender,type){
                if(type == 2){
                    _panel._type = 1;
                    _panel._reflashTypeViews(sender);
                    that.rquestMemberRecordList(null);
                }
            })
            btn_quit.addTouchEventListener(function(sender,type){
                if(type == 2){
                    _panel._type = 2;
                    _panel._reflashTypeViews(sender);
                    that.rquestMemberRecordList(null);
                }
            })

            var image_search = _panel.getChildByName("Image_search");
            _panel._edtInput = this.initEditView(_panel,"请输入玩家信息...");
            var button_find = image_search.getChildByName("Button_find");
            button_find.zIndex = 1;
            button_find.addTouchEventListener(function (sender, type) {
                if (type == 2) {
                    that.rquestMemberRecordList(null);
                }
            }, this);

            this.createMemberRecordItem = function (item,index,data){
                var itemData = data;
                //createTime
                var addTime1 = item.getChildByName("Text_addTime1");
                var addTime2 = item.getChildByName("Text_addTime2");
                addTime1.ignoreContentAdaptWithSize(true);
                addTime2.ignoreContentAdaptWithSize(true);
                var timeStr = MjClient.dateFormat(new Date(parseInt(itemData.createTime)), 'yyyy-MM-dd hh:mm:ss');
                timeStr = timeStr.split(" ");
                addTime1.setString(timeStr[0]);
                addTime2.setString(timeStr[1]);
                var text_content = item.getChildByName("Text_content");
                text_content.ignoreContentAdaptWithSize(false);
                text_content.setTextAreaSize(cc.size(item.width - text_content.x - 20,item.height))
                text_content.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER)
                var str = ""
                if(itemData.type == 4){
                    //退出
                    if(itemData.group){
                        str += itemData.group+"组";
                        if(itemData.assistantNo){
                            str += "("+itemData.assistantNo+")";
                        }
                    }else{
                        str += "未分组"
                    }
                    str += unescape(itemData.nickname)+itemData.userId;
                    str += "退出了联盟"
                }else if(itemData.type == 5){
                    //踢出
                    if(itemData.group){
                        str += itemData.group+"组";
                        if(itemData.assistantNo){
                            str += "("+itemData.assistantNo+")";
                        }
                    }else{
                        str += "未分组"
                    }
                    str += unescape(itemData.nickname)+itemData.userId;
                    str += "被踢出了联盟,操作人:";
                    if(itemData.optRoleId){
                        str += FriendCard_Common.getRoleTextByRoleId(itemData.optRoleId)
                    }
                    str += unescape(itemData.optNickname)+itemData.optUserId
                }else if(itemData.type == 3){
                    if(itemData.optRoleId){
                        str += FriendCard_Common.getRoleTextByRoleId(itemData.optRoleId)
                    }
                    str += unescape(itemData.optNickname)+itemData.optUserId
                    str += "将直属玩家"+unescape(itemData.nickname)+"("+itemData.userId+")"
                    str += "添加至联盟"
                }else if(itemData.type == 1){
                    if(itemData.optRoleId){
                        str += FriendCard_Common.getRoleTextByRoleId(itemData.optRoleId)
                    }
                    str += unescape(itemData.optNickname)+itemData.optUserId
                    str += "将"+unescape(itemData.nickname)+"("+itemData.userId+")"
                    str += "添加至联盟"
                }else if(itemData.type == 2){
                    if(itemData.optRoleId){
                        str += FriendCard_Common.getRoleTextByRoleId(itemData.optRoleId)
                    }
                    str += unescape(itemData.optNickname)+itemData.optUserId
                    str += "从他的亲友圈导入"+unescape(itemData.nickname)+"("+itemData.userId+")"
                    str += ""
                }else if(itemData.type == 40){ //系统踢出
                    if(itemData.group){
                        str += itemData.group+"组";
                        if(itemData.assistantNo){
                            str += "("+itemData.assistantNo+")";
                        }
                    }else{
                        str += "未分组"
                    }
                    str += unescape(itemData.nickname)+itemData.userId;
                    if(itemData.noLoginDay){
                        str += "，由于超过"+itemData.noLoginDay+"天未在联盟玩牌，被系统自动踢出联盟";
                    }else if(itemData.noGameDay){
                        str += "，由于超过"+itemData.noGameDay+"天未在联盟玩牌，被系统自动踢出联盟";
                    }
                }
                text_content.setString(str);

                return item;
            }

            this.refreshMemberRecordList = function (shouldClear) {
                cc.log("refreshMemberRecordList")

                var preItemNum = _panel._listView.getItems().length;
                var curentPoint = _panel._listView.getInnerContainerPosition();
                if(curentPoint.y > 0){
                    curentPoint.y = 0;
                }
                var initPointY = _panel._listView.height - _panel._listView.getInnerContainerSize().height;
                var cell = _panel._cell;
                cell.visible = false;
                if(shouldClear || (_panel._data.list.length == 0)){
                    cc.log("refreshMemberList removeAllItems")
                    _panel._listView.removeAllItems();
                    preItemNum = 0;
                }
                var isEmpty = this.dealEmptyView(_panel);
                if(isEmpty){
                    return;
                }
                for (var i = 0; i < _panel._data.list.length; i ++)
                {
                    var item = _panel._listView.getItems()[i];
                    if(!item){
                        item = cell.clone();
                        _panel._listView.pushBackCustomItem(item);
                    }
                    item.visible = true;
                    item.dataIndex = i
                    this.createMemberRecordItem(item,i,_panel._data.list[i])
                }
                
                for(var i = preItemNum - 1; i >= _panel._data.list.length; i--){
                    _panel._listView.getItems()[i].removeFromParent(true);
                }
                FriendCard_UI.addListBottomTipUi(_panel._listView,_panel._hasMoreData ? 2 : 3)
                _panel._listView.forceDoLayout();
                if(preItemNum > 0){
                    curentPoint.y = curentPoint.y + _panel._listView.getInnerContainerPosition().y - initPointY;
                    var totalY = (_panel._listView.height - _panel._listView.getInnerContainerSize().height);
                    if(totalY == 0){
                        var percent = 0;
                    }else{
                        var percent = 100 - curentPoint.y * 100 / totalY;
                    }
                    _panel._listView.jumpToPercentVertical(percent)
                }
            };
            FriendCard_UI.setListAutoLoadMore(_panel._listView,function(){
                FriendCard_UI.addListBottomTipUi(_panel._listView,1)
                
                that.rquestMemberRecordList(_panel._listView._curPage+1);
            },function(){
                if (!_panel._isLoadingData &&
                    _panel._hasMoreData && 
                    !_panel._edtInput.lastText  && 
                    (_panel._data.list.length > 0)){
                    return true;
                }
                return false;
            })
            

            this.rquestMemberRecordList = function (lastId) {
                if(_panel._isLoadingData){
                    return;
                }
                var lastId = _panel._edtInput.lastText ? 0 : lastId;
                if(!lastId){
                    lastId = 0;
                }
                var sendInfo = {
                    leagueId: this.clubInfo.clubId,
                    pageLen:_panel._prePageLength,
                    keyword:_panel._edtInput.lastText,
                    pageIdx:lastId,
                }
                if((!_panel._edtInput.lastText || _panel._edtInput.lastText == "")&& _panel._type){
                    sendInfo.type = _panel._type;
                }
                cc.log("rquestMemberRecordList sendInfo ",JSON.stringify(sendInfo));
                MjClient.block();
                _panel._isLoadingData = true;
                MjClient.gamenet.request("pkplayer.handler.leaguePlayerIO", sendInfo ,  function(rtn)
                {
                    MjClient.unblock();
                    if (!cc.sys.isObjectValid(that)) {
                        return;
                    }
                    _panel._isLoadingData = false;

                    if(rtn.code == 0){
                        if(!rtn.data){
                            rtn.data = [];
                        }
                        var dataLength =rtn.data.length;
                        _panel._hasMoreData = dataLength >= _panel._prePageLength;
                        
                        if(lastId == 0){
                            _panel._data.list = [];
                        }
                        _panel._listView._curPage = lastId;
                        var addDatas = [];
                        for(var i = 0 ; i < rtn.data.length; i++){
                            var hasLocal = false;
                            for(var j = 0 ; j < _panel._data.list.length; j++){
                                if(JSON.stringify(rtn.data[i]) == JSON.stringify(_panel._data.list[j])){
                                    hasLocal = true;
                                }
                            }
                            if(!hasLocal){
                                addDatas.push(rtn.data[i]);
                            }
                        }
                        _panel._data.list = _panel._data.list.concat(addDatas)
                        that.refreshMemberRecordList(lastId == 0 ? true : false);
                    }
                    else{
                        FriendCard_Common.serverFailToast(rtn);
                    }
                });
            };
            this.hasInitMemberRecordView = true;
        }
        
        this.rquestMemberRecordList();
        _panel.visible = true;
        MjClient.FriendCard_main_ui.data.redpointMemberButton = 0;
        postEvent("update_member_record");
    },
     //成员 - 助理界面
    showZhuliView:function () {
        var that = this;
        var _panel = this.panelViews[5];
        if (!this.hasInitZhuliView){
            _panel._hasMoreData = true;
            _panel._listView = _panel.getChildByName("ListView");
            _panel._cell = _panel.getChildByName("Cell");
            _panel._cell.visible = false;
            _panel._data = {};
            _panel._data.list = [];
            //排序
            this.initPanleSortView(_panel);

            //搜索查找 全部组长
            var button_all_zhuli = _panel.getChildByName("Button_all_zhuli");
            button_all_zhuli.addTouchEventListener(function (sender, type) {
                if (type == 2) {
                    that.setEditString(_panel._edtInput,"");
                    that.rquestClubZhuliList(_panel._edtInput.lastText,0);
                    MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Chengyuan_Chengyuanliebiao_Quanbuchengyuan", {uid:SelfUid()});
                }
            }, this);

            _panel._edtInput = this.initEditView(_panel,"请输入玩家信息...");
            var image_search = _panel.getChildByName("Image_search");
            var button_find = image_search.getChildByName("Button_find");
            button_find.zIndex = 1;
            button_find.addTouchEventListener(function (sender, type) {
                if (type == 2) {
                    var inputStr = _panel._edtInput.lastText;
                    if (inputStr){
                        that.rquestClubZhuliList(inputStr,0);
                    }
                    MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Chengyuan_Chengyuanliebiao_Chazhao", {uid:SelfUid()});
                }
            }, this);
            //
            this.createZhuliItem = function(item,index,data)
            {
                var itemData = data;
                // 头像
                var head = item.getChildByName("Image_head")
                head.isMask = true;
                head.removeAllChildren();
                this.refreshHead(itemData.headimgurl,head );
                this.setFrozenImg(item,itemData,head)

                // 名称
                var name = item.getChildByName("Text_name");
                name.ignoreContentAdaptWithSize(true);
                name.setFontName("");
                name.setFontSize(name.getFontSize()) //不知道为什么要重新设置一遍 否则字体很小
            
                if(FriendCard_Common.getSkinType() == 2 || FriendCard_Common.getSkinType() == 4)
                {
                    name.setString(getNewName(unescape(itemData.nickname),5));  
                }
                else
                {
                    name.setString(getNewName(unescape(itemData.nickname),6));
                }

                var rank = item.getChildByName("Text_rank");
                if (rank) rank.setVisible(false);

                if (rank && itemData.roleId > 0) {
                    rank.setVisible(true);
                    rank.ignoreContentAdaptWithSize(true);
                    switch(itemData.roleId)
                    {
                        case 1:
                            rank.setString("会长");
                            break;
                        case 3:
                            rank.setString("盟主");
                            break;
                        case 2:
                            if(this.curUserGrp == itemData.group || this.isManager)//如果他是组长,并且他是自己组的组长就显示
                                rank.setString("组长");
                            else
                                rank.setVisible(false) 
                            break;
                        case 4:
                            if(this.curUserGrp == itemData.group && (this._roleId == 2 || this._roleId == 4))//组长和助理们能看到
                                rank.setString(itemData.assistantNo+"号助理");
                            else
                                rank.setVisible(false)
                            break;
                        case 5:
                            rank.setString("管理员");
                            break;
                        case 6:
                            rank.setString("超级管理员");
                            break;
                    }
                }
                //助理编号
                var text_bianhao = item.getChildByName("Text_bianhao");
                text_bianhao.setString(itemData.assistantNo+"号");
                //人数
                var text_renshu = item.getChildByName("Text_renshu");
                text_renshu.setString(itemData.assisCount+"人");

                //createTime
                var addTime1 = item.getChildByName("Text_addTime1");
                var addTime2 = item.getChildByName("Text_addTime2");
                addTime1.ignoreContentAdaptWithSize(true);
                addTime2.ignoreContentAdaptWithSize(true);
                var timeStr = MjClient.dateFormat(new Date(parseInt(itemData.createTime)), 'yyyy-MM-dd hh:mm:ss');
                timeStr = timeStr.split(" ");
                addTime1.setString(timeStr[0]);
                addTime2.setString(timeStr[1]);
                // 最近一次玩牌时间
                var lastTime = item.getChildByName("Text_lastTime");
                lastTime.ignoreContentAdaptWithSize(true);
                this.setStateStr(lastTime, itemData.status, itemData.lastLoginTime);

                // 玩家ID
                var id = item.getChildByName("Text_ID");
                id.ignoreContentAdaptWithSize(true);
                var idStr = "" + itemData.userId;
                /*if (!this.isManager && idStr.length > 4)
                    idStr = idStr.slice(0, 2) + "******".slice(0, idStr.length - 4) + idStr.slice(-2);*/
                id.setString(idStr);
                if(!id._standColor){
                    id._standColor = id.getTextColor();
                }
                id.setTextColor(id._standColor);
                if (itemData.isDirectly == 1){
                    if(FriendCard_Common.getSkinType() == 3){
                        id.setTextColor(cc.color("#04a013"));
                    }else{
                        id.setTextColor(cc.color("#4d58b6"));
                    }
                }
                if(itemData.isAgent) {
                    if(FriendCard_Common.getSkinType() == 3){
                        id.setTextColor(cc.color("#d33c00"));
                    }else{
                        id.setTextColor(cc.color("#ab3215"));
                    }
                }

                //禁止玩牌图片
                var userStop = item.getChildByName("Image_userStop");
                userStop.ignoreContentAdaptWithSize(true);
                userStop.visible = !!(itemData.userStatus & 16);

                //比赛禁玩图片
                var imgForbidPlay = item.getChildByName("imgForbidPlay");
                if (imgForbidPlay) {
                    imgForbidPlay.visible = false;
                }
                if(itemData.isMatchForbid){
                    if (!imgForbidPlay) {
                        imgForbidPlay = ccui.ImageView("friendCards/memberManage/img_scoreLimit.png");
                        imgForbidPlay.setName("imgForbidPlay");
                        imgForbidPlay.setAnchorPoint(cc.p(1, 0.5))
                        imgForbidPlay.y = head.y;
                        imgForbidPlay.x = head.x- head.width/2;
                        item.addChild(imgForbidPlay);
                    }
                    imgForbidPlay.visible = true;
                }

                //备注 remarks
                var remarks = item.getChildByName("Text_remarks");
                remarks.ignoreContentAdaptWithSize(true);
                remarks.visible = true;
                if (itemData.remarkGrp && itemData.group.toString() === this.isGroupLeader) {//如果是组长显示组长的备注
                    remarks.setString("(" + itemData.remarkGrp.replace(/\s/g, "") + ")");
                } else if (itemData.remark && this.isManager) {
                    remarks.setString("(" + itemData.remark.replace(/\s/g, "") + ")");
                } else {
                    remarks.visible = false;
                }

                // 操作
                //是否是管理或者会长
                var operationVisible = (
                    (this.isLeader|| 
                    (this.isSupperManger && (itemData.roleId != 3 && itemData.roleId != 6))||
                    (this.isManager && (itemData.roleId != 3 && itemData.roleId != 1 && itemData.roleId != 6))) ||
                    (itemData.group.toString() === this.isGroupLeader && (itemData.roleId != 3 && itemData.roleId != 1))) && itemData.userId != MjClient.data.pinfo.uid;
                

                var Button_operation = item.getChildByName("Button_operation");
                Button_operation.visible = operationVisible;

                Button_operation._cell = item;
                Button_operation.data = itemData;
                Button_operation.addTouchEventListener(function (sender, type) {
                    if (type == 2) {
                        MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Chengyuan_Chengyuanliebiao_Caozuo", {uid: SelfUid()});
                        this.showMemberManage(sender.data,sender._cell,sender._cell.dataIndex,_panel.keyName)
                    }
                }, this);
                return item;
            };
            _panel.reloadListUiFunc = function(){
                that.refreshZhuliList(false);
            }
            this.refreshZhuliList = function (shouldClear) {
                var cellType = _panel._data.checkZhuli ? "check_dailiMenber_all" : "check_daili_all";
                var preItemNum = _panel._listView.getItems().length;
                var curentPoint = _panel._listView.getInnerContainerPosition();
                if(curentPoint.y > 0){
                    curentPoint.y = 0;
                }
                var initPointY = _panel._listView.height - _panel._listView.getInnerContainerSize().height;

                var cell = _panel._cell
                cell.visible = false;
                var cell_member = this.panelViews[1].getChildByName("Cell");
                cell_member.visible = false;

                if(_panel._listView.getItems()[0] && _panel._listView.getItems()[0].cellType != cellType){
                    _panel._listView.removeAllItems();
                    preItemNum = 0;
                }

                if(shouldClear || (_panel._data.list.length == 0)){
                    cc.log("refreshzhuliList removeAllItems")
                    _panel._listView.removeAllItems();
                    preItemNum = 0;

                }
                var isEmpty = this.dealEmptyView(_panel);
                if(isEmpty){
                    return;
                }
                for (var i = 0; i < _panel._data.list.length; i ++)
                {
                    var item = _panel._listView.getItems()[i];
                   

                    if(cellType == "check_dailiMenber_all"){
                        if (!item) {
                            item = cell_member.clone();
                            item.cellType = cellType;
                            _panel._listView.pushBackCustomItem(item);
                        }
                        this.createMemberItem(item,i,_panel._data.list[i])
                    }
                    else
                    {
                        if(!item){
                            item = cell.clone();
                            item.cellType = "check_daili_all";
                            _panel._listView.pushBackCustomItem(item);
                        } 
                        this.createZhuliItem(item,i,_panel._data.list[i])
                    }

                    item.visible = true;
                    item.dataIndex = i
                }
                for(var i = preItemNum - 1; i >= _panel._data.list.length; i--){
                    _panel._listView.getItems()[i].removeFromParent(true);
                }
                FriendCard_UI.addListBottomTipUi(_panel._listView,_panel._hasMoreData ? 2 : 3)
                _panel._listView.forceDoLayout();
                if(preItemNum > 0){
                    curentPoint.y = curentPoint.y + _panel._listView.getInnerContainerPosition().y - initPointY;
                    var totalY = (_panel._listView.height - _panel._listView.getInnerContainerSize().height);
                    if(totalY == 0){
                        var percent = 0;
                    }else{
                        var percent = 100 - curentPoint.y * 100 / totalY;
                    }
                    _panel._listView.jumpToPercentVertical(percent)
                }
            };
            _panel._prePageLength = 5;//本地测试分页
            if (cc.sys.OS_WINDOWS != cc.sys.os) {
                _panel._prePageLength = 50;
            } 
            this.rquestClubZhuliList = function(keyword,length,checkZhuli){
                var alreadyCount = keyword ? 0 : length;
                var sortSort = keyword ? 0 : (this["sort_sort_"+_panel.keyName] ? this["sort_sort_"+_panel.keyName] : 0);
                var sortState = (this["sort_state_"+_panel.keyName] ? this["sort_state_"+_panel.keyName] : 0);
                var sendInfo = {
                    leagueId: this.clubInfo.clubId, 
                    currcnt: alreadyCount,
                    keyword:keyword,
                    length:_panel._prePageLength,
                    sort:sortSort,
                    state:sortState,
                    type:3}
                if(checkZhuli){
                    sendInfo.group = checkZhuli;
                    if(!this["isCheckZhuliAllMember" + checkZhuli]){
                        this["isCheckZhuliAllMember" + checkZhuli] = true;
                        sendInfo.currcnt = 0;
                        sendInfo.range = 2
                    }
                }
                cc.log("rquestClubZhuliList sendInfo ",JSON.stringify(sendInfo));
                MjClient.block();
                _panel._isLoadingData = true;
                MjClient.gamenet.request("pkplayer.handler.leaguePlayerList", sendInfo ,  function(rtn)
                {
                    MjClient.unblock();
                    if (!cc.sys.isObjectValid(that)) {
                        return;
                    }
                    _panel._isLoadingData = false;
                    if(rtn.code == 0){
                        if(!rtn.data.list){
                            rtn.data.list = [];
                        }
                        var dataLength =rtn.data.list.length;
                        _panel._hasMoreData = dataLength >= _panel._prePageLength;
                        if(alreadyCount == 0){
                            _panel._data.list = [];
                        }
                        _panel._data.mine = rtn.data.mine;
                        _panel._data.list = _panel._data.list.concat(rtn.data.list);
                        _panel._data.checkZhuli = checkZhuli;
                        that.refreshZhuliList(alreadyCount == 0 ? true :false);
                    }
                    else{
                        FriendCard_Common.serverFailToast(rtn);
                    }
                });
            }
            
            //什么是助理
            var Button_zhuliHelp = this.panelViews[5].getChildByName("Button_zhuliHelp")
            if(Button_zhuliHelp)
            {
                Button_zhuliHelp.addTouchEventListener(function (sender, type) {
                    MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Chengyuan_Chengyuanliebiao_Shenmeshiguanliyuan", {uid: SelfUid()});
                    if (type == 2) {
                        var uiPara = {}
                        uiPara.msg = "组长可设置专属助理，拥有拉人权限";
                        uiPara.yes = function() {
                        }
                        MjClient.FriendCard_main_ui.addChild(new Friendcard_popUpMeg(uiPara))
                    }
                }, this);
            }

            FriendCard_UI.setListAutoLoadMore(_panel._listView,function(){
                FriendCard_UI.addListBottomTipUi(_panel._listView,1)
                that.rquestClubZhuliList(null,_panel._data.list.length,_panel._data.checkZhuli);
            },function(){
                if (!_panel._isLoadingData &&
                    _panel._hasMoreData && 
                    !_panel._edtInput.lastText  && 
                    (_panel._data.list.length > 0)){
                    return true;
                }
                return false
            })
            
            UIEventBind(null, this, "friendCard_zhuliListUpdate", function(rtn) {
                this.rquestClubZhuliList(_panel._edtInput.lastText,0);
            }.bind(this));
            this.hasInitZhuliView = true;

            //团队分数预警按钮
            var btnSetWarnScore = _panel.getChildByName("btnSetWarnScore");
            if (btnSetWarnScore) {
                btnSetWarnScore.visible = false;
            }
            if(MjClient.isWarnScoreOpen() && (FriendCard_Common.isLeader() || FriendCard_Common.isLMChair() || FriendCard_Common.isGroupLeader())){
                if (!btnSetWarnScore) {
                    btnSetWarnScore = new ccui.Button("friendCards/warnScore/btn_wanrScoreSet.png");
                    _panel.addChild(btnSetWarnScore);
                    btnSetWarnScore.setAnchorPoint(cc.p(1, 0));
                    if (FriendCard_Common.getSkinType() == 1) {
                        btnSetWarnScore.setPosition(cc.p(_panel.width-40, -50));
                    }else if (FriendCard_Common.getSkinType() == 4){
                        btnSetWarnScore.setPosition(cc.p(_panel.width-40, 20));
                    }else{
                        btnSetWarnScore.setPosition(cc.p(_panel.width-40, 0));
                    }
                }
                btnSetWarnScore.visible = true;
                btnSetWarnScore.addTouchEventListener(function (sender, type) {
                    if (type == 2) {
                        MjClient.FriendCard_main_ui.addChild(new FriendCard_WarnScore(that.clubInfo));
                    }
                }, this);
            }

        }
        this.rquestClubZhuliList(_panel._edtInput.lastText,0);
        _panel.visible = true;
    },
    //成员 - 组长界面
    showGroupView:function () {
        var that = this;
        var _panel = this.panelViews[4]
        if (!this.hasInitGroupView){
            _panel._hasMoreData = true;
            _panel._listView = _panel.getChildByName("ListView");
            _panel._cell = _panel.getChildByName("Cell");
            _panel._cell.visible = false;
            _panel._data = {};
            _panel._data.list = [];
            //排序
            this.initPanleSortView(_panel);
            //搜索查找 全部组长
            var button_all_group = _panel.getChildByName("Button_all_group");
            button_all_group.addTouchEventListener(function (sender, type) {
                if (type == 2) {
                    that.setEditString(_panel._edtInput,"");
                    that.rquestClubGroupList(_panel._edtInput.lastText,0);
                    MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Chengyuan_Chengyuanliebiao_Quanbuchengyuan", {uid:SelfUid()});
                }
            }, this);
            _panel._edtInput = this.initEditView(_panel,"请输入玩家信息...");
            var image_search = _panel.getChildByName("Image_search");
            var button_find = image_search.getChildByName("Button_find");
            button_find.zIndex = 1;
            button_find.addTouchEventListener(function (sender, type) {
                if (type == 2) {
                    var inputStr = _panel._edtInput.lastText;
                    if (inputStr){
                        that.rquestClubGroupList(inputStr,0);
                    }
                    MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Chengyuan_Chengyuanliebiao_Chazhao", {uid:SelfUid()});
                }
            }, this);
            
            //
            this.createGroupItem = function(item,index,data)
            {
                var itemData = data;
                // 头像
                var head = item.getChildByName("Image_head")
                head.isMask = true;
                head.removeAllChildren();
                this.refreshHead(itemData.headimgurl,head );
                this.setFrozenImg(item,itemData,head)

                // 名称
                var name = item.getChildByName("Text_name");
                name.ignoreContentAdaptWithSize(true);
                name.setFontName("");
                name.setFontSize(name.getFontSize()) //不知道为什么要重新设置一遍 否则字体很小
            
                if(FriendCard_Common.getSkinType() == 2 || FriendCard_Common.getSkinType() == 4)
                {
                    name.setString(getNewName(unescape(itemData.nickname),5));  
                }
                else
                {
                    name.setString(getNewName(unescape(itemData.nickname),6));
                }

                var rank = item.getChildByName("Text_rank");
                if (rank) rank.setVisible(false);

                if (rank && itemData.roleId > 0) {
                    rank.setVisible(true);
                    rank.ignoreContentAdaptWithSize(true);
                    switch(itemData.roleId)
                    {
                        case 1:
                            rank.setString("会长");
                            break;
                        case 3:
                            rank.setString("盟主");
                            break;
                        case 2:
                            if(this.curUserGrp == itemData.group || this.isManager)//如果他是组长,并且他是自己组的组长就显示
                                rank.setString("组长");
                            else
                                rank.setVisible(false) 
                            break;
                        case 4:
                            if(this.curUserGrp == itemData.group && (this._roleId == 2 || this._roleId == 4))//组长和助理们能看到
                                rank.setString(itemData.assistantNo+"号助理");
                            else
                                rank.setVisible(false)
                            break;
                        case 5:
                            rank.setString("管理员");
                            break;
                        case 6:
                            rank.setString("超级管理员");
                            break;
                    }
                }
                //几组
                var text_bianhao = item.getChildByName("Text_bianhao");
                if (itemData.group === 0) {
                    text_bianhao.setString("未分组");
                } else {
                    text_bianhao.setString(itemData.group + "组");
                }
                //人数
                var text_renshu = item.getChildByName("Text_renshu");
                text_renshu.setString(itemData.groupCount+"人");


                //createTime
                var addTime1 = item.getChildByName("Text_addTime1");
                var addTime2 = item.getChildByName("Text_addTime2");
                addTime1.ignoreContentAdaptWithSize(true);
                addTime2.ignoreContentAdaptWithSize(true);
                var timeStr = MjClient.dateFormat(new Date(parseInt(itemData.createTime)), 'yyyy-MM-dd hh:mm:ss');
                timeStr = timeStr.split(" ");
                addTime1.setString(timeStr[0]);
                addTime2.setString(timeStr[1]);
                // 最近一次玩牌时间
                var lastTime = item.getChildByName("Text_lastTime");
                lastTime.ignoreContentAdaptWithSize(true);
                this.setStateStr(lastTime, itemData.status, itemData.lastLoginTime);

                // 玩家ID
                var id = item.getChildByName("Text_ID");
                id.ignoreContentAdaptWithSize(true);
                var idStr = "" + itemData.userId;
                /*if (!this.isManager && idStr.length > 4)
                    idStr = idStr.slice(0, 2) + "******".slice(0, idStr.length - 4) + idStr.slice(-2);*/
                id.setString(idStr);
                if(!id._standColor){
                    id._standColor = id.getTextColor();
                }
                id.setTextColor(id._standColor);
                if (itemData.isDirectly == 1){
                    if(FriendCard_Common.getSkinType() == 3){
                        id.setTextColor(cc.color("#04a013"));
                    }else{
                        id.setTextColor(cc.color("#4d58b6"));
                    }
                }
                if(itemData.isAgent) {
                    if(FriendCard_Common.getSkinType() == 3){
                        id.setTextColor(cc.color("#d33c00"));
                    }else{
                        id.setTextColor(cc.color("#ab3215"));
                    }
                }

                //禁止玩牌图片
                var userStop = item.getChildByName("Image_userStop");
                userStop.ignoreContentAdaptWithSize(true);
                userStop.visible = !!(itemData.userStatus & 8);

                //比赛禁玩
                if (itemData.userId == 0) {
                //无组长的时候后端这个状态有BUG，后端要求加上
                    itemData.isMatchForbid = 0;
                }
                var imgForbidPlay = item.getChildByName("imgForbidPlay");
                if (imgForbidPlay) {
                    imgForbidPlay.visible = false;
                }
                if(itemData.isMatchForbid){
                    if (!imgForbidPlay) {
                        imgForbidPlay = ccui.ImageView("friendCards/memberManage/img_scoreLimit.png");
                        imgForbidPlay.setName("imgForbidPlay");
                        imgForbidPlay.setAnchorPoint(cc.p(1, 0.5))
                        imgForbidPlay.y = head.y;
                        imgForbidPlay.x = head.x- head.width/2;
                        item.addChild(imgForbidPlay);
                    }
                    imgForbidPlay.visible = true;
                }
        

                //备注 remarks
                var remarks = item.getChildByName("Text_remarks");
                remarks.ignoreContentAdaptWithSize(true);
                remarks.visible = true;
                if (itemData.remarkGrp && itemData.group.toString() === this.isGroupLeader) {//如果是组长显示组长的备注
                    remarks.setString("(" + itemData.remarkGrp.replace(/\s/g, "") + ")");
                } else if (itemData.remark && this.isManager) {
                    remarks.setString("(" + itemData.remark.replace(/\s/g, "") + ")");
                } else {
                    remarks.visible = false;
                }

                // 操作
                //是否是管理或者会长
                var operationVisible = (
                    (this.isLeader|| 
                    (this.isSupperManger && (itemData.roleId != 3 && itemData.roleId != 6))||
                    (this.isManager && (itemData.roleId != 3 && itemData.roleId != 1 && itemData.roleId != 6))) ||
                    (itemData.group.toString() === this.isGroupLeader && (itemData.roleId != 3 && itemData.roleId != 1))) && itemData.userId != MjClient.data.pinfo.uid;
                

                var Button_operation = item.getChildByName("Button_operation");
                Button_operation.visible = operationVisible;

                Button_operation._cell = item;
                Button_operation.data = itemData;
                Button_operation.addTouchEventListener(function (sender, type) {
                    if (type == 2) {
                        MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Chengyuan_Chengyuanliebiao_Caozuo", {uid: SelfUid()});
                        this.showMemberManage(sender.data,sender._cell,sender._cell.dataIndex,_panel.keyName)
                    }
                }, this);

                //如果该分组没有组长 就隐藏其他信息
                if (itemData.roleId != 2 && itemData.roleId != 3 && itemData.roleId != 1) {
                    var showWidget = "Text_bianhao Text_renshu Button_operation Image_line";
                    var children = item.children;
                    for (var i = 0; i < children.length; i++) {
                        if (showWidget.indexOf(children[i].name) == -1) {
                            children[i].visible = false;
                        }
                    }
                }
                return item;
            };
            _panel.reloadListUiFunc = function(){
                that.refreshGroupList(false);
            }
            this.refreshGroupList = function (shouldClear,cellType) {
                var cellType = _panel._data.checkGroup ? "check_groupMember_all" : "check_groupLeader_all";

                var preItemNum = _panel._listView.getItems().length;
                var curentPoint = _panel._listView.getInnerContainerPosition();
                if(curentPoint.y > 0){
                    curentPoint.y = 0;
                }
                var initPointY = _panel._listView.height - _panel._listView.getInnerContainerSize().height;

                var cell = _panel._cell;
                cell.visible = false;
                var cell_member = this.panelViews[1].getChildByName("Cell");
                cell_member.visible = false;

                if(_panel._listView.getItems()[0] && _panel._listView.getItems()[0].cellType != cellType){
                    _panel._listView.removeAllItems();
                    preItemNum = 0;
                }

                if(shouldClear || (_panel._data.list.length == 0)){
                    cc.log("refreshGroupList removeAllItems")
                    _panel._listView.removeAllItems();
                    preItemNum = 0;
                }
                var isEmpty = this.dealEmptyView(_panel);
                if(isEmpty){
                    return;
                }
                for (var i = 0; i < _panel._data.list.length; i ++)
                {
                    var item = _panel._listView.getItems()[i];
                    if(cellType == "check_groupMember_all"){
                         if (!item) {
                            item = cell_member.clone();
                            item.cellType = cellType;
                            _panel._listView.pushBackCustomItem(item);
                        }
                        this.createMemberItem(item,i,_panel._data.list[i])
                    }
                    else{
                        if(!item){
                            item = cell.clone();
                            item.cellType = "check_groupLeader_all";
                            _panel._listView.pushBackCustomItem(item);
                        } 
                        this.createGroupItem(item,i,_panel._data.list[i])
                    }

                    item.visible = true;
                    item.dataIndex = i
                }
                for(var i = preItemNum - 1; i >= _panel._data.list.length; i--){
                    _panel._listView.getItems()[i].removeFromParent(true);
                }
                FriendCard_UI.addListBottomTipUi(_panel._listView,_panel._hasMoreData ? 2 : 3)
                _panel._listView.forceDoLayout();
                if(preItemNum > 0){

                    curentPoint.y = curentPoint.y + _panel._listView.getInnerContainerPosition().y - initPointY;
                    var totalY = (_panel._listView.height - _panel._listView.getInnerContainerSize().height);
                    if(totalY == 0){
                        var percent = 0;
                    }else{
                        var percent = 100 - curentPoint.y * 100 / totalY;
                    }
                    _panel._listView.jumpToPercentVertical(percent)
                }    
            };
            _panel._prePageLength = 5;//本地测试分页
            if (cc.sys.OS_WINDOWS != cc.sys.os) {
                _panel._prePageLength = 50;
            } 
            this.rquestClubGroupList = function(keyword,length,checkGroup){
                var alreadyCount = keyword ? 0 : length;
                var sortSort = keyword ? 0 : (this["sort_sort_"+_panel.keyName] ? this["sort_sort_"+_panel.keyName] : 0);
                var sortState = (this["sort_state_"+_panel.keyName] ? this["sort_state_"+_panel.keyName] : 0);
                var sendInfo = {
                    leagueId: this.clubInfo.clubId, 
                    currcnt: alreadyCount,
                    keyword:keyword,
                    length:_panel._prePageLength,
                    sort:sortSort,
                    state:sortState,
                    type:2,
                    range:3}
                if(checkGroup){
                    delete sendInfo.type
                    sendInfo.group = checkGroup;
                    if(!this["isCheckGroupAllMember" + checkGroup]){
                        this["isCheckGroupAllMember" + checkGroup] = true;
                        sendInfo.currcnt = 0
                    }
                }
                cc.log("rquestClubGroupList sendInfo ",JSON.stringify(sendInfo));
                MjClient.block();
                _panel._isLoadingData = true;
                MjClient.gamenet.request("pkplayer.handler.leaguePlayerList", sendInfo ,  function(rtn)
                {
                    MjClient.unblock();

                    if (!cc.sys.isObjectValid(that)) {
                        return;
                    }
                    _panel._isLoadingData = false;
                    if(rtn.code == 0){
                        if(!rtn.data.list){
                            rtn.data.list = [];
                        }
                        var dataLength =rtn.data.list.length;
                        _panel._hasMoreData = dataLength >= _panel._prePageLength;
                        if(alreadyCount == 0){
                            _panel._data.list = [];
                        }
                        _panel._data.mine = rtn.data.mine;
                        _panel._data.list = _panel._data.list.concat(rtn.data.list);
                        _panel._data.checkGroup = checkGroup;
                        that.refreshGroupList(alreadyCount == 0 ? true :false);
                    }
                    else
                    {
                        FriendCard_Common.serverFailToast(rtn);
                    }
                });
            }

            //什么是组长
            var Button_groupHelp = _panel.getChildByName("Button_groupHelp")
            if(Button_groupHelp)
            {
                Button_groupHelp.addTouchEventListener(function (sender, type) {
                    MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Chengyuan_Chengyuanliebiao_Shenmeshiguanliyuan", {uid: SelfUid()});
                    if (type == 2) {
                        var uiPara = {}
                        uiPara.msg = "组长仅可对所在分组操作\n导入、踢出、禁玩、添加备注权限。";
                        uiPara.yes = function() {
                        }
                        MjClient.FriendCard_main_ui.addChild(new Friendcard_popUpMeg(uiPara))
                    }
                }, this);
            }

            FriendCard_UI.setListAutoLoadMore(_panel._listView,function(){
                FriendCard_UI.addListBottomTipUi(_panel._listView,1)
                that.rquestClubGroupList(null,_panel._data.list.length,_panel._data.checkGroup);
            },function(){
                if (!_panel._isLoadingData &&
                    _panel._hasMoreData && 
                    !_panel._edtInput.lastText  && 
                    (_panel._data.list.length > 0)){
                    return true;
                }
                return false
            })

            UIEventBind(null, this, "friendCard_groupListUpdate", function(rtn) {
                this.rquestClubGroupList(_panel._edtInput.lastText,0);
            }.bind(this));
            this.hasInitGroupView = true;

            //团队分数预警按钮
            var btnSetWarnScore = _panel.getChildByName("btnSetWarnScore");
            if (btnSetWarnScore) {
                btnSetWarnScore.visible = false;
            }
            if(MjClient.isWarnScoreOpen() && (FriendCard_Common.isLeader() || FriendCard_Common.isLMChair() || FriendCard_Common.isGroupLeader())){
                if (!btnSetWarnScore) {
                    btnSetWarnScore = new ccui.Button("friendCards/warnScore/btn_wanrScoreSet.png");
                    _panel.addChild(btnSetWarnScore);
                    btnSetWarnScore.setAnchorPoint(cc.p(1, 0));
                    if (FriendCard_Common.getSkinType() == 1) {
                        btnSetWarnScore.setPosition(cc.p(_panel.width-40, -50));
                    }else if(FriendCard_Common.getSkinType() == 4){
                        btnSetWarnScore.setPosition(cc.p(_panel.width-40, 20));
                    }else{
                        btnSetWarnScore.setPosition(cc.p(_panel.width-40, 0));
                    }
                }
                btnSetWarnScore.visible = true;
                btnSetWarnScore.addTouchEventListener(function (sender, type) {
                    if (type == 2) {
                        MjClient.FriendCard_main_ui.addChild(new FriendCard_WarnScore(that.clubInfo));
                    }
                }, this);
            }
        }
        this.rquestClubGroupList(_panel._edtInput.lastText,0);
        _panel.visible = true;
    },
    //成员列表
    showMemberView:function () {
        var that = this;
        var _panel = this.panelViews[1];
        if (!this.hasInitMemberView){
            _panel._hasMoreData = true;
            _panel._listView = _panel.getChildByName("ListView");
            _panel._cell = _panel.getChildByName("Cell");
            _panel._cell.visible = false;
            _panel._data = {};
            _panel._data.list = [];
            var sort3 = _panel.getChildByName("sortListBg").getChildByName("sortList").getChildByName("sort3");
            if(sort3){
                sort3.removeFromParent(true);
            }
            //排序
            this.initPanleSortView(_panel);
            
            //禁玩30天未上线玩家
            var text_stop_into_game30 = _panel.getChildByName("Text_stop_into_game30");
            text_stop_into_game30.visible = (this.isLeader || FriendCard_Common.isLMChair());
            _panel._checkBocstopIntoGame30 = text_stop_into_game30.getChildByName("checkBok");
            text_stop_into_game30.addTouchEventListener(function (sender, type) {
                if (type == 2) {
                    _panel._checkBocstopIntoGame30.setSelected(!_panel._checkBocstopIntoGame30.isSelected());
                    that.requestStopGame30(_panel._checkBocstopIntoGame30.isSelected() ? 2 : 1,function(){
                        that.rquestClubPlayerList(_panel._edtInput.lastText,0);
                    });
                }
            }, this);

              //批量禁止玩牌功能
            _panel._allMemberStopNode = _panel.getChildByName("all_member_stop");
            _panel._allMemberStopNode.visible = false;
            _panel._allMemberStopCheckBox = _panel._allMemberStopNode.getChildByName("all_member_stop_CheckBox");
            _panel._allMemberStopCheckBox.setSelected(false);
            _panel._allMemberStopNode.addTouchEventListener(function (sender, type) {
                if (type == 2) {
                    var isSelected = _panel._allMemberStopCheckBox.isSelected();
                    var uiPara = {}
                    if(isSelected){
                        uiPara.msg = "是否将你所属成员全部允许玩牌？";
                    }else{
                        uiPara.msg = "是否将你所属成员全部禁止玩牌？";       
                    }
                    uiPara.yes = function() {
                        if (!cc.sys.isObjectValid(MjClient.friendCard_member_ui))
                            return;
                        MjClient.block();
                        MjClient.gamenet.request("pkplayer.handler.leagueBatchChangePlayersStatus", {leagueId: that.clubInfo.clubId,status:isSelected ? 1 : 2},  function(rtn)
                        {
                            MjClient.unblock();
                            if (rtn.code == 0) {
                                _panel._allMemberStopCheckBox.setSelected(true);
                                that.rquestClubPlayerList(_panel._edtInput.lastText,0)
                                MjClient.showToast(isSelected ? "已全部允许玩牌":"已全部禁止玩牌");
                            } else {
                                FriendCard_Common.serverFailToast(rtn)
                            }
                        });
                    } 
                    uiPara.no = function() {}
                    uiPara.close = function() {}
                    MjClient.FriendCard_main_ui.addChild(new Friendcard_popUpMeg(uiPara))
                }
            }, this);
            
            //搜索查找
            var button_all_member = _panel.getChildByName("Button_all_member");
            button_all_member.addTouchEventListener(function (sender, type) {
                if (type == 2) {
                    that.setEditString(_panel._edtInput,"");
                    that.rquestClubPlayerList(_panel._edtInput.lastText,0);
                    MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Chengyuan_Chengyuanliebiao_Quanbuchengyuan", {uid:SelfUid()});
                }
            }, this);

            var image_search = _panel.getChildByName("Image_search");
            _panel._edtInput = this.initEditView(_panel,"请输入玩家信息...");
            var button_find = image_search.getChildByName("Button_find");
            button_find.zIndex = 1;
            button_find.addTouchEventListener(function (sender, type) {
                if (type == 2) {
                    var inputStr = _panel._edtInput.lastText;
                    if (inputStr){
                        that.rquestClubPlayerList(inputStr,0);
                    }
                    MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Chengyuan_Chengyuanliebiao_Chazhao", {uid:SelfUid()});
                }
            }, this);
            //退出俱乐部
            var text_exit_club = _panel.getChildByName("Text_exit_club");
            // text_exit_club.visible= !this.isLeader && this.clubInfo.roleMap.admin.indexOf(MjClient.data.pinfo.uid) < 0;
            text_exit_club.visible= false;
            text_exit_club.addTouchEventListener(function (sender, type) {
                if (type == 2) {
                    var uiPara = {}
                    if(that.isGroupLeader){
                        uiPara.uiStyle = "friendcard_posUpMsg_daoshu2";
                        uiPara.msg = "确定退出该亲友圈吗？";
                        uiPara.msgRed2 = "退出后，可正常获得当天已产生的业绩和推广奖励";
                        uiPara.msgRed = "退出亲友圈将不可撤销，请谨慎操作！";
                    }else{
                        uiPara.msg = "确定退出该亲友圈吗？";
                    }
                    uiPara.yes = function() {
                        if (!cc.sys.isObjectValid(MjClient.friendCard_member_ui)) // 有可能些时被踢出亲友圈而that不存在
                            return;
                        MjClient.block();
                        MjClient.gamenet.request("pkplayer.handler.leagueExit", {leagueId: that.clubInfo.clubId},  function(rtn)
                        {
                            MjClient.unblock();
                            if(rtn.code == 0){
                                MjClient.showToast(rtn.message || "退出成功");
                                if (cc.sys.isObjectValid(that))
                                    that.removeFromParent(true);
                            }
                            else{
                                FriendCard_Common.serverFailToast(rtn);
                            }
                        }); 
                    },
                    uiPara.no = function() {
                    }
                    uiPara.close = function() {
                    }
                    MjClient.FriendCard_main_ui.addChild(new Friendcard_popUpMeg(uiPara))
                }
            }, this);

            _panel.reloadListUiFunc = function(){
                that.refreshMemberList(false);
            }
            this.refreshMemberList = function (shouldClear) {
                _panel._checkBocstopIntoGame30.setSelected((_panel._data.mine.mpPermission & 32));
                if(_panel._allMemberStopNode){
                    _panel._allMemberStopNode.visible = _panel._data.mine.optPlayerState != 0;
                    _panel._allMemberStopCheckBox.setSelected(_panel._data.mine.optPlayerState == 1)
                }

                var preItemNum = _panel._listView.getItems().length;
                var curentPoint = _panel._listView.getInnerContainerPosition();
                if(curentPoint.y > 0){
                    curentPoint.y = 0;
                }
                var initPointY = _panel._listView.height - _panel._listView.getInnerContainerSize().height;
                var cell = _panel._cell;
                cell.visible = false;
                if(shouldClear || (_panel._data.list.length == 0)){
                    cc.log("refreshMemberList removeAllItems")
                    _panel._listView.removeAllItems();
                    preItemNum = 0;
                }
                var isEmpty = this.dealEmptyView(_panel);
                if(isEmpty){
                    return;
                }
                for (var i = 0; i < _panel._data.list.length; i ++)
                {
                    var item = _panel._listView.getItems()[i];
                    if(!item){
                        item = cell.clone();
                        _panel._listView.pushBackCustomItem(item);
                    }
                    item.visible = true;
                    this.createMemberItem(item,i,_panel._data.list[i])
                    item.dataIndex = i
                }
                
                for(var i = preItemNum - 1; i >= _panel._data.list.length; i--){
                    _panel._listView.getItems()[i].removeFromParent(true);
                }
                FriendCard_UI.addListBottomTipUi(_panel._listView,_panel._hasMoreData ? 2 : 3)
                _panel._listView.forceDoLayout();
                if(preItemNum > 0){
                    curentPoint.y = curentPoint.y + _panel._listView.getInnerContainerPosition().y - initPointY;
                    var totalY = (_panel._listView.height - _panel._listView.getInnerContainerSize().height);
                    if(totalY == 0){
                        var percent = 0;
                    }else{
                        var percent = 100 - curentPoint.y * 100 / totalY;
                    }
                    _panel._listView.jumpToPercentVertical(percent)
                }
            };
            _panel._prePageLength = 10;//本地测试分页
            if (cc.sys.OS_WINDOWS != cc.sys.os) {
                _panel._prePageLength = 50;
            } 
            this.rquestClubPlayerList = function(keyword,length){

                var alreadyCount = keyword ? 0 : length;
                var sortSort = keyword ? 0 : (this["sort_sort_"+_panel.keyName] ? this["sort_sort_"+_panel.keyName] : 0);
                var sortState = (this["sort_state_"+_panel.keyName] ? this["sort_state_"+_panel.keyName] : 0);
                var sortType = (this["sort_type_"+_panel.keyName] ? this["sort_type_"+_panel.keyName] : 0);
                var sendInfo = {
                    leagueId: this.clubInfo.clubId, 
                    currcnt: alreadyCount,
                    keyword:keyword,
                    length:_panel._prePageLength,
                    sort:sortSort,
                    type:sortType,
                    state:sortState,
                }
                if(this._checkGroupType != "全部")
                {
                    sendInfo.group = this._checkGroupType;
                }
                if (this._checkRangeType) {
                    sendInfo.range = this._checkRangeType;
                }
                if (!this.isFirstRquest) {
                    this.isFirstRquest = true;
                    if (this.isAssistants) {
                        sendInfo.type = 3;
                        sendInfo.range = 4;
                    }
                }
                cc.log("clubPlayerList sendInfo ",JSON.stringify(sendInfo));
                MjClient.block();
                _panel._isLoadingData = true;
                MjClient.gamenet.request("pkplayer.handler.leaguePlayerList", sendInfo ,  function(rtn)
                {
                    MjClient.unblock();
                    if (!cc.sys.isObjectValid(that)) {
                        return;
                    }
                    _panel._isLoadingData = false;
                    if(rtn.code == 0){
                        if(!rtn.data.list){
                            rtn.data.list = [];
                        }
                        var dataLength =rtn.data.list.length;
                        
                        _panel._hasMoreData = dataLength >= _panel._prePageLength;
                        if(alreadyCount == 0){
                            _panel._data.list = [];
                        }
                        that.curUserGrp = rtn.data.mine.group;
                        that._roleId = rtn.data.mine.roleId;
                        _panel._data.mine = rtn.data.mine;
                        _panel._data.list = _panel._data.list.concat(rtn.data.list);
                        that.refreshMemberList(alreadyCount == 0 ? true :false);
                    }
                    else
                    {
                        FriendCard_Common.serverFailToast(rtn);
                    }
                });
            }

            FriendCard_UI.setListAutoLoadMore(_panel._listView,function(){
                FriendCard_UI.addListBottomTipUi(_panel._listView,1) 
                that.rquestClubPlayerList(null,_panel._data.list.length);
            },function(){
                if (!_panel._isLoadingData &&
                    _panel._hasMoreData && 
                    !_panel._edtInput.lastText  && 
                    (_panel._data.list.length > 0)){
                    return true;
                }
                return false
            })

            UIEventBind(null, this, "friendCard_memberListUpdate", function(rtn) {
                that.rquestClubPlayerList(_panel._edtInput.lastText,0);
            });

            this.hasInitMemberView = true;
            
        }
        this.rquestClubPlayerList(_panel._edtInput.lastText,0);
        _panel.visible = true;
    },
    //联盟列表
    showLeagueView:function () {
        var that = this;
        var _panel = this.panelViews[0];
        if (!this.hasInitLeagueView){
            _panel._listView = _panel.getChildByName("ListView");
            _panel._data = {};
            _panel._data.list = [];
            this.createLeagueItem = function (item,index,data){
                var itemData = data;
                // 头像
                var head = item.getChildByName("Image_head")
                head.isMask = true;
                this.refreshHead(itemData.headurl,head );
                this.setFrozenImg(item,itemData,head)
                // 名称
                var name = item.getChildByName("Text_name");
                name.ignoreContentAdaptWithSize(true);
                name.setFontName("");
                name.setFontSize(name.getFontSize()) //不知道为什么要重新设置一遍 否则字体很小

                if(FriendCard_Common.getSkinType() == 2){
                    name.setString(getNewName(unescape(itemData.nickname),5));
                }
                else{
                    name.setString(getNewName(unescape(itemData.nickname),6));
                }

                //createTime
                var addTime1 = item.getChildByName("Text_addTime1");
                var addTime2 = item.getChildByName("Text_addTime2");
                addTime1.ignoreContentAdaptWithSize(true);
                addTime2.ignoreContentAdaptWithSize(true);
                var timeStr = MjClient.dateFormat(new Date(parseInt(itemData.createTime)), 'yyyy-MM-dd hh:mm:ss');
                timeStr = timeStr.split(" ");
                addTime1.setString(timeStr[0]);
                addTime2.setString(timeStr[1]);
                // 最近一次玩牌时间
                var lastTime = item.getChildByName("Text_lastTime");
                lastTime.ignoreContentAdaptWithSize(true);
                this.setStateStr(lastTime, itemData.status, null);
                // 玩家ID
                var id = item.getChildByName("Text_ID");
                id.ignoreContentAdaptWithSize(true);
                var idStr = "" + itemData.userId;
                id.setString(idStr);

                //禁止玩牌图片
                var userStop = item.getChildByName("Image_userStop");
                userStop.ignoreContentAdaptWithSize(true);
                userStop.visible = !!(itemData.userStatus & 4);

                //比赛禁玩
                var imgForbidPlay = item.getChildByName("imgForbidPlay");
                if (imgForbidPlay) {
                    imgForbidPlay.visible = false;
                }
                if(itemData.isMatchForbid){
                    if (!imgForbidPlay) {
                        imgForbidPlay = ccui.ImageView("friendCards/memberManage/img_scoreLimit.png");
                        imgForbidPlay.setName("imgForbidPlay");
                        imgForbidPlay.setAnchorPoint(cc.p(1, 0.5))
                        imgForbidPlay.y = head.y;
                        imgForbidPlay.x = head.x- head.width/2;
                        item.addChild(imgForbidPlay);
                    }
                    imgForbidPlay.visible = true;
                }
        
                var Text_role = item.getChildByName("Text_role");
                Text_role.visible = (itemData.roleId == 3);
                if(!this.isLeader && this.isSupperManger){
                    //超级管理员
                    Text_role.visible = true;
                }
                Text_role.setString((itemData.roleId == 3) ? "盟主" :"会长");
                var Text_num = item.getChildByName("Text_num");
                Text_num.setString(itemData.count+"人")

                var button_ope_league = item.getChildByName("Button_ope_league");
                button_ope_league.visible = this.isSupperManger && (itemData.userId != SelfUid()) && !FriendCard_Common.isLeader(this.clubInfo,itemData.userId);
                button_ope_league.tag = index;
                button_ope_league.addTouchEventListener(function (sender, type){
                    if (type != 2)
                        return;
                    this.showLMListManage(sender.getTag())
                }.bind(this));
                
                var Button_leave_league = item.getChildByName("Button_leave_league");
                Button_leave_league.visible = (itemData.roleId != 3) && (itemData.userId == SelfUid());
                Button_leave_league.tag = index;
                Button_leave_league.addTouchEventListener(function (sender, type)
                {
                    if (type != 2)
                        return;
                    var index = sender.getTag();
                    var uiPara = {}
                    uiPara.uiStyle = "friendcard_posUpMsg_daoshu2";
                    uiPara.msg = "确定退出联盟吗";
                    uiPara.msgRed2 = "退出后，可正常获得当天已产生的业绩和推广奖励";
                    uiPara.msgRed = "退出联盟将不可撤销，请谨慎操作！";
                    var sendInfo = {};
                    sendInfo.leagueId = that.clubInfo.clubId;
                    sendInfo.userId = _panel._data.list[index].userId;
                    cc.log("leagueExit sendInfo",JSON.stringify(sendInfo))
                    uiPara.yes = function() {
                        cc.log("leagueTransferCreator")
                        MjClient.block();
                        MjClient.gamenet.request("pkplayer.handler.leagueExit", sendInfo, function(rtn) {
                            MjClient.unblock();
                            if (rtn.code == 0) {
                                MjClient.showMsg(rtn.message);
                                if(cc.sys.isObjectValid(MjClient.friendCard_member_ui)){
                                    MjClient.friendCard_member_ui.removeFromParent(true);
                                }
                            } else if (rtn.message) {
                                MjClient.showMsg(rtn.message);
                            }

                        });
                    }.bind(this);
                    uiPara.no = function () {
                    }
                    uiPara.close = function () {
                    }
                    MjClient.FriendCard_main_ui.addChild(new Friendcard_popUpMeg(uiPara))
                });
                
                return item;
            }
            this.refreshLeagueList = function () {
                
                var cell = _panel._cell;
                cell.visible = false;
                _panel._listView.removeAllItems();
                this.dealEmptyView(_panel);
                
                for (var i = 0; i < _panel._data.list.length; i ++)
                {
                    var item = cell.clone();
                    item.visible = true;
                    _panel._listView.pushBackCustomItem(item);
                    this.createLeagueItem(item,i,_panel._data.list[i])
                }
            };
            _panel.reloadListUiFunc = function(){
                that.refreshLeagueList();
            }
            _panel._cell = _panel.getChildByName("Cell");
            _panel._cell.visible = false;
            this.hasInitLeagueView = true;

            //团队分数预警按钮
            var btnSetWarnScore = _panel.getChildByName("btnSetWarnScore");
            if (btnSetWarnScore) {
                btnSetWarnScore.visible = false;
            }
            if(MjClient.isWarnScoreOpen() && (FriendCard_Common.isLeader() || FriendCard_Common.isLMChair() || FriendCard_Common.isGroupLeader())){
                if (!btnSetWarnScore) {
                    btnSetWarnScore = new ccui.Button("friendCards/warnScore/btn_wanrScoreSet.png");
                    _panel.addChild(btnSetWarnScore);
                    btnSetWarnScore.setAnchorPoint(cc.p(1, 0));
                    btnSetWarnScore.setPosition(cc.p(_panel.width-40, 10));
                    if (FriendCard_Common.getSkinType() == 1) {
                        btnSetWarnScore.setPosition(cc.p(_panel.width-40, -40));
                    }
                }
                btnSetWarnScore.visible = true;
                btnSetWarnScore.addTouchEventListener(function (sender, type) {
                    if (type == 2) {
                        MjClient.FriendCard_main_ui.addChild(new FriendCard_WarnScore(that.clubInfo));
                    }
                }, this);
            }
        }
        this.rquestLeaguePlayerList = function () {
            var sendInfo = {
                leagueId: this.clubInfo.clubId
            }
            cc.log("rquestLeaguePlayerList sendInfo ",JSON.stringify(sendInfo));
            MjClient.block();
            MjClient.gamenet.request("pkplayer.handler.leagueList", sendInfo ,  function(rtn)
            {
                MjClient.unblock();
                if (!cc.sys.isObjectValid(that)) {
                    return;
                }

                if(rtn.code == 0){
                    _panel._data.list = rtn.data ? rtn.data : [];
                    that.refreshLeagueList();
                }
                else{
                    FriendCard_Common.serverFailToast(rtn);
                }
            });
        };
        this.rquestLeaguePlayerList();
        _panel.visible = true;
    },
    //导入俱乐部列表
    showDaoruView:function () {
        var that = this;
        var _panel = this.panelViews[2];
        if (!this.hasInitDaoruView){
            _panel._listView = _panel.getChildByName("ListView");
            _panel._cell = _panel.getChildByName("Cell");
            _panel._cell.visible = false;
            _panel._data = {};
            _panel._data.list = [];
            this.reqClubListDaoru = function() {
                MjClient.block();
                MjClient.gamenet.request("pkplayer.handler.clubList", {type:2},
                    function(rtn) {
                        MjClient.unblock();
                        if(!cc.sys.isObjectValid(that))
                            return;
                        if (rtn.code == 0) {
                            _panel._data.list = rtn.data && rtn.data.list ? rtn.data.list : [];

                            if(rtn.data && rtn.data.leagueList){
                                for(var i = rtn.data.leagueList.length - 1; i >= 0; i--){
                                    rtn.data.leagueList[i].clubId = rtn.data.leagueList[i].leagueId;
                                }
                                _panel._data.list = _panel._data.list.concat(rtn.data.leagueList);
                            }
                            for(var i = _panel._data.list.length - 1; i >= 0; i--){
                                if ( _panel._data.list[i].clubId == that.clubInfo.clubId){
                                     _panel._data.list.splice(i,1)
                                }
                            }
                            that.refreshDaoruList();
                            
                        } else {
                            FriendCard_Common.serverFailToast(rtn)
                        }
                    }
                );
            }
            this.refreshDaoruList = function()
            {
                var cell = _panel._cell;
                cell.visible = false;
                _panel._listView.removeAllItems();
                this.dealEmptyView(_panel);
                for(var i = 0; i < _panel._data.list.length; i++)
                {
                    if (_panel._data.list[i].clubId == this.clubInfo.clubId)
                        continue;
                    var itemData = _panel._data.list[i];
                    var item = cell.clone();
                    item.visible = true;
                    _panel._listView.pushBackCustomItem(item);

                    var text_title = item.getChildByName("Text_title");
                    text_title.setString(unescape(itemData.title))

                    var text_club_type = item.getChildByName("Text_club_type");
                    var clubTypeStr = FriendCard_Common.getClubRoomModeNameByType(itemData.type);
                    if(itemData.leagueId){
                        clubTypeStr += "（联盟）";
                    }
                    text_club_type.setString(clubTypeStr);

                    var text_people = item.getChildByName("Text_people");
                    text_people.setString(itemData.playerCount+"人")

                    var text_id = item.getChildByName("Text_Id");
                    text_id.setString("ID: " + itemData.clubId)

                    var head = item.getChildByName("Image_head");
                    head.isMask = true;
                    that.refreshHead(itemData.avatar ? itemData.avatar : "png/default_headpic.png", head);

                    var Button_daoru = item.getChildByName("Button_daoru");
                    Button_daoru.setTag(i)
                    Button_daoru.addTouchEventListener(function (sender, type)
                    {
                        if (type != 2)
                            return;

                        MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Chengyuan_Daoruchengyuan_Daoru", {uid:SelfUid()});
                        var index = sender.getTag();

                        var uiPara = {}
                        uiPara.msg = "确定从【" + unescape(_panel._data.list[index].title) + "】导入玩家？";
                        uiPara.yes = function() {
                            MjClient.block();
                            MjClient.gamenet.request("pkplayer.handler.leagueImportUser", {
                                fromId:_panel._data.list[index].clubId, 
                                currentLid:that.clubInfo.clubId,
                                type:_panel._data.list[index].leagueId ? 1 : 2},  function(rtn)
                            {
                                MjClient.unblock();

                                if (!cc.sys.isObjectValid(that))
                                    return;

                                if(rtn.code == 0){
                                    MjClient.showToast(rtn.message);
                                    _panel._data.list.splice(index, 1);
                                    that.refreshDaoruList();
                                }
                                else{
                                    FriendCard_Common.serverFailToast(rtn);
                                }
                            });
                            MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Chengyuan_Daoruchengyuan_Daoru_Sure", {uid:SelfUid()});
                        }
                        uiPara.no = function() {
                        }
                        uiPara.close = function() {
                        }
                        MjClient.FriendCard_main_ui.addChild(new Friendcard_popUpMeg(uiPara))
                    });
                }
            }
            
            this.hasInitDaoruView = true;
        }
        this.reqClubListDaoru();
        _panel.visible = true;
    },
    //添加成员面板
    showAddMemberView:function () {
        var that = this;
        var _panel = this.panelViews[3];
        if (!this.hasInitAddMemberView){
            _panel._listView = _panel.getChildByName("ListView");
            _panel._cell = _panel.getChildByName("Cell");
            _panel._cell.visible = false;
            _panel._data = {};
            _panel._data.list = [];

            //搜索查找
            var button_add = _panel.getChildByName("Button_add");
            button_add.visible = false;
            var image_search = _panel.getChildByName("Image_search");
            var button_find = image_search.getChildByName("Button_find");
            button_find.zIndex = 1;
            _panel._edtInput = this.initEditView(_panel,"请输入玩家ID...",((FriendCard_Common.getSkinType() == 4) ? 0 : -button_find.width));
            button_add.addTouchEventListener(function (sender, type) {
                if (type == 2) {
                    MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Chengyuan_Tianjiachengyuan_Tianjiazhishuwanjia_Tianji", {uid:SelfUid()});
                    var children = _panel._listView.getChildren();
                    var userArr = [];
                    for (var i = 0; i <children.length ; i++)
                    {
                        if(children[i].getChildByName("CheckBox").isSelected())
                        {
                            userArr.push(parseInt(children[i].getChildByName("Text_ID").userid));
                        }
                    }
                    if (userArr.length == 0 && !searchItemCheckBox.isSelected())
                    {
                        MjClient.showToast("请选择最少一个玩家！");
                        return
                    }
                    var addMember = function () {
                        MjClient.block();
                        var sendInfo = {
                            leagueId: that.clubInfo.clubId, 
                            userId: Number(that.addMemberLastUserData.userId)
                        }
                        cc.log("leagueAddUser sendInfo",JSON.stringify(sendInfo))
                        MjClient.gamenet.request("pkplayer.handler.leagueAddUser",sendInfo ,  function(rtn)
                        {
                            MjClient.unblock();
                            if (rtn.code == 0){
                                if (rtn.data.isAddMember) {//添加普通成员，直接通过
                                    MjClient.showToast("该用户拥有代理身份，需等待对方同意后才能完成添加");
                                }else{//添加代理需确认
                                    MjClient.showToast("添加成功！");
                                    that.addMemberSuccessShowDaoChuView({
                                        userArr:userArr,
                                        userData:that.addMemberLastUserData
                                    });
                                }
                            }
                            else{
                                FriendCard_Common.serverFailToast(rtn);
                            }
                        });
                    }
                    if (userArr.length == 0){
                        addMember();
                        return;
                    }
                    MjClient.block();
                    var sendInfo = {
                        leagueId:that.clubInfo.clubId,
                        members:userArr
                    };
                    //
                    cc.log("leagueAddMember sendInfo",JSON.stringify(sendInfo))
                    MjClient.gamenet.request("pkplayer.handler.leagueAddMember",sendInfo,  function(rtn)
                    {
                        MjClient.unblock();
                        if (searchItemCheckBox.isSelected()){
                            addMember();
                            return;
                        }
                        if (rtn.code == 0){
                            MjClient.showToast("添加成功！");
                            that.addMemberSuccessShowDaoChuView({userArr:userArr});
                        }
                        else{
                            FriendCard_Common.serverFailToast(rtn);
                        }
                    });
                }
            }, this);
            button_find.addTouchEventListener(function (sender, type) {
                if (type == 2) {
                    var idStr = _panel._edtInput.lastText;
                    var id = Number(idStr);
                    if (!id || id < 1000)
                    {
                        MjClient.showToast("请输入正确的玩家id！");
                        return;
                    }
                    MjClient.block();
                    MjClient.gamenet.request("pkcon.handler.getUserInfo", {userId: id},  function(rtn)
                    {
                        MjClient.unblock();
                        if(rtn.code == 0 && rtn.data){
                            that.setSearChUserView(rtn.data);
                        }
                        else{
                            FriendCard_Common.serverFailToast(rtn);
                        }
                    });
                    MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Chengyuan_Tianjiachengyuan_Chazhao", {uid:SelfUid()});
                }
            }, this);
            var item_find = _panel.getChildByName("item_find");
            var searchItemCheckBox = item_find.getChildByName("CheckBox");
            searchItemCheckBox.ignoreContentAdaptWithSize(true);
            searchItemCheckBox.addEventListener(function(sender, type) {
                switch (type) {
                    case ccui.CheckBox.EVENT_SELECTED:
                    case ccui.CheckBox.EVENT_UNSELECTED:
                        that.resetAddMemberSelectCount();
                        break;
                }
            },this);
            item_find.visible = false;
            this.resetAddMemberView = function () {
                item_find.visible = false;
                that.setEditString(_panel._edtInput,"");
                this.AddMemberRsetPostion();
                searchItemCheckBox.setSelected(false);
                selectAllCheckBox.setSelected(false);
                this.resetAddMemberSelectCount();
            }
            var Image_middle = _panel.getChildByName("Image_middle");
            Image_middle.beforeY = Image_middle.getPositionY();
            var selectAllCheckBox = Image_middle.getChildByName("CheckBox");
            selectAllCheckBox.ignoreContentAdaptWithSize(true);
            var Text_directPlayerNum = Image_middle.getChildByName("Text_directPlayerNum");
            Text_directPlayerNum.setString("0人");
            selectAllCheckBox.addEventListener(function(sender, type) {
                switch (type) {
                    case ccui.CheckBox.EVENT_SELECTED:
                        that.refresDirectPlayerhList(true);
                        if (_panel._data.list.length == 0){
                            selectAllCheckBox.setSelected(false);
                        }
                        if(selectAllCheckBox.isSelected())
                        {
                            MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Chengyuan_Tianjiachengyuan_Tianjiazhishuwanjia", {uid:SelfUid()});
                        }
                        this.resetAddMemberSelectCount();
                        break;
                    case ccui.CheckBox.EVENT_UNSELECTED:
                        that.refresDirectPlayerhList(false);
                        this.resetAddMemberSelectCount();
                        break;
                }
            },this);

            _panel._listView.beforeY = _panel._listView.getPositionY();
            this.AddMemberRsetPostion = function () {
                if (item_find.visible == true){
                    Image_middle.setPositionY(Image_middle.beforeY);
                    _panel._listView.setPositionY(_panel._listView.beforeY);
                }else{
                    Image_middle.setPositionY(Image_middle.beforeY + item_find.height-20);
                    _panel._listView.setPositionY(_panel._listView.beforeY + item_find.height-20);
                }
                var emptyTextTip = _panel.getChildByName("emptyTextTip");
                if (emptyTextTip){
                    emptyTextTip.setPositionY(_panel._listView.getPositionY()-_panel._listView.height/2);
                }
                if (that.isManager){
                    if(MjClient.APP_TYPE.QXNTQP == MjClient.getAppType()){
                        _panel._listView.visible = false;
                        Image_middle.visible = false;
                    }else{
                        _panel._listView.visible = true;
                        Image_middle.visible = true;
                    }

                }else{
                    _panel._listView.visible = false;
                    Image_middle.visible = false;
                }
            }
            this.setSearChUserView = function (playerData) {
                var Text_name = item_find.getChildByName("Text_name");
                var Text_id = item_find.getChildByName("Text_ID");
                Text_name.setString(getNewName(unescape(playerData.nickname)));
                Text_name.setFontName("");
                Text_name.setFontSize(Text_name.getFontSize()) //不知道为什么要重新设置一遍 否则字体很小
                Text_id.setString("ID:" + playerData.userId);
                this.addMemberLastUserData = {
                    userId:playerData.userId,
                    nickname:playerData.nickname
                };

                var head = item_find.getChildByName("Image_head");
                head.isMask = true;
                that.refreshHead(playerData.headimgurl ? playerData.headimgurl : "png/default_headpic.png", head);

                item_find.visible = true;
                this.AddMemberRsetPostion();
            }
            this.directPlayerListWithClub = function() {
                MjClient.block();
                MjClient.gamenet.request("pkplayer.handler.directPlayerListWithLeauge", {leagueId:that.clubInfo.clubId},  function(rtn)
                {
                    MjClient.unblock();
                    if (!cc.sys.isObjectValid(that)) {
                        return;
                    }
                    if(rtn.code == 0){
                        _panel._data.list = (rtn.data && rtn.data.list) ? rtn.data.list : [];
                        that.refresDirectPlayerhList();
                    }
                    else
                    {
                        FriendCard_Common.serverFailToast(rtn);
                    }
                });
            }
            this.resetAddMemberSelectCount = function () {
                var selectCount = 0;
                if(item_find.visible == true && searchItemCheckBox.isSelected())selectCount++;
                if (selectAllCheckBox.isSelected()){
                    selectCount+=_panel._data.list.length;
                }else{
                    var children = _panel._listView.getChildren();
                    for (var i = 0; i <children.length ; i++) {
                        if(children[i].getChildByName("CheckBox").isSelected()) {
                            selectCount++;
                        }
                    }
                }
                if(selectCount > 0)
                {
                    button_add.visible = true;
                }
                else
                {
                    button_add.visible = false;
                }
                Text_directPlayerNum.setString(selectCount+"人");
            }
            this.refresDirectPlayerhList = function(selectAll)
            {

                var cell = _panel._cell;
                cell.visible = false;
                _panel._listView.removeAllItems();
                var isEmpty = this.dealEmptyView(_panel);
                if(isEmpty){
                    return;
                }
                cc.log("refresDirectPlayerhList");
                for (var i = 0; i < _panel._data.list.length; i ++)
                {
                    var item = cell.clone();
                    item.visible = true;

                    _panel._listView.pushBackCustomItem(item);

                    var head = item.getChildByName("Image_head");
                    head.isMask = true;
                    that.refreshHead(_panel._data.list[i].headimgurl ? _panel._data.list[i].headimgurl : "png/default_headpic.png", head);


                    // 名称
                    var name = item.getChildByName("Text_name");
                    name.ignoreContentAdaptWithSize(true);
                    name.setString(getNewName(unescape(_panel._data.list[i].nickname)));
                    name.setFontName("");
                    name.setFontSize(name.getFontSize()) //不知道为什么要重新设置一遍 否则字体很小

                    // 玩家ID
                    var id = item.getChildByName("Text_ID");
                    id.ignoreContentAdaptWithSize(true);
                    id.setString("ID:" +unescape(_panel._data.list[i].id));
                    id.userid = _panel._data.list[i].id;
                    var isAdd = item.getChildByName("CheckBox");
                    isAdd.ignoreContentAdaptWithSize(true);
                    isAdd.setSelected(selectAll ? true:false);

                    isAdd.addEventListener(function(sender, type) {
                        switch (type) {
                            case ccui.CheckBox.EVENT_SELECTED:   
                            case ccui.CheckBox.EVENT_UNSELECTED:
                                if(isAdd.isSelected())
                                    {
                                        MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Chengyuan_Tianjiachengyuan_Tianjiazhishuwanjia", {uid:SelfUid()});
                                    }
                                selectAllCheckBox.setSelected(false);
                                that.resetAddMemberSelectCount();
                                break;
                        }
                    },this);
                }
                that.resetAddMemberSelectCount();
            }

            this.hasInitAddMemberView = true;
        }
        this.resetAddMemberView();
        if (this.isManager && !this.isLMClubManager){
            if(MjClient.APP_TYPE.QXNTQP != MjClient.getAppType()){
                //南通没有直属玩家
                this.directPlayerListWithClub();
            }
        }
        _panel.visible = true;
    },
    addMemberSuccessShowDaoChuView:function(data){
        var hasOtherLeaderClub = false;
        if(cc.sys.isObjectValid(MjClient.FriendCard_main_ui) && MjClient.FriendCard_main_ui.clubList){
            var clubList = MjClient.FriendCard_main_ui.clubList;
            for(var i = 0 ; i < clubList.length; i++){
                if(clubList[i].clubId != this.clubInfo.clubId){
                    if(clubList[i].roleId == 3 || (clubList[i].roleId == 1 && clubList[i].leagueId)){
                        hasOtherLeaderClub = true;
                        break;
                    }
                }
            }
        }
        if(hasOtherLeaderClub){
            this.panelViews[6].bindAddUserData = data;
            this.showPosition(6);
        }
    },
    //导出俱乐部列表（添加成员成功后显示）
    showNewMemberDaoChuView:function () {
        var that = this;
        var _panel = this.panelViews[6];
        var text_add_user_desc = _panel.getChildByName("Text_add_user_desc");
        var descStr = "";
        if(!_panel.bindAddUserData.userArr || _panel.bindAddUserData.userArr.length == 0){
            descStr = "你还可以将"+unescape(_panel.bindAddUserData.userData.nickname)+
            "（"+_panel.bindAddUserData.userData.userId+"）同步到其他亲友圈";
        }else{
            var userNum = _panel.bindAddUserData.userArr.length + (_panel.bindAddUserData.userData ? 1 : 0)
            descStr = "你还可以将这"+userNum+"人同步到其他亲友圈"
        }
        text_add_user_desc.setString(descStr)

        var selectAllCheckBox = _panel.getChildByName("Image_middle").getChildByName("CheckBox");
        selectAllCheckBox.setSelected(false);
        if (!this.hasInitNewMemberDaoChuView){
            _panel._hasMoreData = true;
            _panel._listView = _panel.getChildByName("ListView");
            _panel._cell = _panel.getChildByName("Cell");
            _panel._cell.visible = false;
            _panel._data = {};
            _panel._data.list = [];
            this.reqClubListNewMemberDaoChu = function() {
                MjClient.block();
                MjClient.gamenet.request("pkplayer.handler.clubList", {type:2},
                    function(rtn) {
                        MjClient.unblock();
                        if(!cc.sys.isObjectValid(that))
                            return;
                        if (rtn.code == 0) {
                            _panel._data.list = rtn.data && rtn.data.list ? rtn.data.list : [];

                            if(rtn.data && rtn.data.leagueList){
                                for(var i = rtn.data.leagueList.length - 1; i >= 0; i--){
                                    rtn.data.leagueList[i].clubId = rtn.data.leagueList[i].leagueId;
                                }
                                _panel._data.list = _panel._data.list.concat(rtn.data.leagueList);
                            }
                            for(var i = _panel._data.list.length - 1; i >= 0; i--){
                                if ( _panel._data.list[i].clubId == that.clubInfo.clubId){
                                     _panel._data.list.splice(i,1)
                                }
                            }
                            that.refreshNewMemberDaoChuList();
                            
                        } else {
                            FriendCard_Common.serverFailToast(rtn)
                        }
                    }
                );
            }
            this.refreshNewMemberDaoChuList = function()
            {
                var cell = _panel._cell;
                cell.visible = false;
                _panel._listView.removeAllItems();
                var isEmpty = this.dealEmptyView(_panel);
                if(isEmpty){
                    return;
                }
                for(var i = 0; i < _panel._data.list.length; i++)
                {
                    if (_panel._data.list[i].clubId == this.clubInfo.clubId)
                        continue;

                    var itemData = _panel._data.list[i];
                    var item = cell.clone();
                    item.visible = true;
                    _panel._listView.pushBackCustomItem(item);

                    var text_title = item.getChildByName("Text_title");
                    text_title.setString(unescape(itemData.title))

                    var text_club_type = item.getChildByName("Text_club_type");
                    var clubTypeStr = FriendCard_Common.getClubRoomModeNameByType(itemData.type);
                    if(itemData.leagueId){
                        clubTypeStr += "（联盟）";
                    }
                    text_club_type.setString(clubTypeStr);

                    var text_people = item.getChildByName("Text_people");
                    text_people.setString(itemData.playerCount+"人")

                    var text_id = item.getChildByName("Text_Id");
                    text_id.setString("ID: " + itemData.clubId);
                    if(itemData.leagueId){
                        text_id.leagueId = itemData.leagueId;
                    }else{
                        text_id.clubId = itemData.clubId;
                    }
                    var head = item.getChildByName("Image_head");
                    head.isMask = true;
                    that.refreshHead(itemData.avatar ? itemData.avatar : "png/default_headpic.png", head);
                    
                    var isAdd = item.getChildByName("CheckBox");
                    isAdd.ignoreContentAdaptWithSize(true);
                    isAdd.setSelected(selectAllCheckBox.isSelected() ? true:false);
                }
            }
            selectAllCheckBox.addEventListener(function(sender, type) {
                switch (type) {
                    case ccui.CheckBox.EVENT_SELECTED:
                        that.refreshNewMemberDaoChuList();
                        break;
                    case ccui.CheckBox.EVENT_UNSELECTED:
                        that.refreshNewMemberDaoChuList();
                        break;
                }
            },this);

            var button_add_again = _panel.getChildByName("Button_add_again");
            button_add_again.addTouchEventListener(function (sender, type) {
                if (type == 2) {
                    that.showPosition(3);
                }
            });
            var button_daochu = _panel.getChildByName("Button_daochu");
            button_daochu.addTouchEventListener(function (sender, type) {
                if (type == 2) {
                    var children = _panel._listView.getChildren();
                    var leagueIds = [];
                    var clubIds = [];
                    for (var i = 0; i <children.length ; i++){
                        if(children[i].getChildByName("CheckBox").isSelected()){
                            if(children[i].getChildByName("Text_Id").leagueId){
                                leagueIds.push(parseInt(children[i].getChildByName("Text_Id").leagueId));
                            }else{
                                clubIds.push(parseInt(children[i].getChildByName("Text_Id").clubId));
                            }
                        }
                    }
                    this.daochuTotalCount = clubIds.length + leagueIds.length;
                    this.daochuSuccessCount = 0;
                    this.daochuFailCount = 0;
                    if (this.daochuTotalCount == 0)
                    {
                        MjClient.showToast("请选择要导出的亲友圈");
                        return
                    }
                    var userArr = _panel.bindAddUserData.userArr ? _panel.bindAddUserData.userArr : [];
                    if(_panel.bindAddUserData.userData && userArr.indexOf(_panel.bindAddUserData.userData.userId) < 0){
                        userArr.push(_panel.bindAddUserData.userData.userId)
                    }
                    MjClient.block();
                    clubIds.forEach(function(clubId){
                        that.reqDaoChuToClubAsync(userArr,clubId,null);
                    });
                    leagueIds.forEach(function(leagueId){
                        that.reqDaoChuToClubAsync(userArr,null,leagueId);
                    });
                }
            }, this);
            this.reqDaoChuToClubCallBackFunc = function(rtn){
                if(rtn.code == 0){
                    this.daochuSuccessCount++;
                }else{
                    this.daochuFailCount++;
                }
                if((this.daochuSuccessCount + this.daochuFailCount) == this.daochuTotalCount){
                    MjClient.unblock();
                    MjClient.showToast("成功同步到"+this.daochuSuccessCount+"个亲友圈,"+"失败同步到"+this.daochuFailCount+"个亲友圈")
                }
            };
            this.reqDaoChuToClubAsync =  function(userArr,clubId,leagueId) {
                if(clubId){
                    var sendInfo = {
                        clubId:clubId,
                        userId:userArr
                    };
                    cc.log("clubInvite",JSON.stringify(sendInfo));
                    MjClient.gamenet.request("pkplayer.handler.clubInvite",sendInfo,function(rtn){
                        that.reqDaoChuToClubCallBackFunc(rtn)
                    });
                }else{
                    var sendInfo = {
                        leagueId: leagueId, 
                        userId: userArr,
                    }
                    cc.log("leagueAddUser",JSON.stringify(sendInfo));
                    MjClient.gamenet.request("pkplayer.handler.leagueAddUser",sendInfo,function(rtn){
                        that.reqDaoChuToClubCallBackFunc(rtn)
                    });
                }
                
            }
            this.hasInitNewMemberDaoChuView = true;
        }
        this.refreshNewMemberDaoChuList();
        this.reqClubListNewMemberDaoChu();
        _panel.visible = true;
    },
    requestStopGame30:function(value,callBackFunc){
        var that = this;
        var sendInfo = {
            leagueId: that.clubInfo.clubId, 
            userId: MjClient.data.pinfo.uid,
            type: 9, 
            value: value
        }
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.leaguePlayerUpdate", sendInfo,  function(rtn){
            MjClient.unblock();
            if(!cc.sys.isObjectValid(that)){
                return;
            }
            if(rtn.code == 0){
                MjClient.showToast(rtn.message);
                if(callBackFunc){
                    callBackFunc();
                }
            }
            else{
                FriendCard_Common.serverFailToast(rtn);
            }
        });
    },
    requestInviteSet:function(accept)
    {
        MjClient.block();
        MjClient.gamenet.request("pkplayer.handler.leagueInviteSet", {leagueId: this.clubInfo.clubId, accept: accept},  function(rtn)
        {
            MjClient.unblock();
            if (rtn.code == 0) {
                MjClient.showToast("设置成功！");
            } else {
                FriendCard_Common.serverFailToast(rtn);
            }
        });
    },
 
    refreshHead: function(url, head) {
        head.needScale = 8;
        COMMON_UI.refreshHead(this, url, head);
    },
    
    
    setStateStr: function(stateLabel, status,lastLoginTime) {
        if (status == 2) {
            stateLabel.setString("对局中");
            if(FriendCard_Common.getSkinType() == 3){
                stateLabel.setTextColor(cc.color("#d33c00"));
            }else{
                stateLabel.setTextColor(cc.color("#ab3215"));
            }
        } else if (status == 0) {
            if(lastLoginTime)
                stateLabel.setString(lastLoginTime+"登录");
            else
                stateLabel.setString("离线");
            if(FriendCard_Common.getSkinType() == 3){
                stateLabel.setTextColor(cc.color("#686767"));
            }else{
                stateLabel.setTextColor(cc.color("#b7b7b6"));
            }
        } else {
            stateLabel.setString("在线");
            if(FriendCard_Common.getSkinType() == 3){
                stateLabel.setTextColor(cc.color("#04a013"));
            }else{
                stateLabel.setTextColor(cc.color("#308f16"));
            }
        }
    },
    //显示成员操作界面
    showMemberManage:function(itemData,cell,index,openType)
    {
        if(!openType){
            openType = "member_member"
        }
        var that = this;
        this.Panle_memberManage.visible = true;
        this.memberManage = this.Panle_memberManage.getChildByName("Image_bg");
        this.memberManage.visible=true;

        var isGroupLeader =  FriendCard_Common.isGroupLeader(that.clubInfo,itemData.userId);
        var isAssistant =  FriendCard_Common.isAssistants(that.clubInfo,itemData.userId);
        var isSupperManger =  FriendCard_Common.isSupperManger(that.clubInfo,itemData.userId);

        var hasGroupLeader = false;
        var groupList = [];
        if(this.isManager || (itemData.group && !isGroupLeader)){
            //判断该组有没有组长
            var sendInfo = {
                leagueId: this.clubInfo.clubId, 
                type:2,
            }
            cc.log("判断该组有没有组长 sendInfo ",JSON.stringify(sendInfo));
            MjClient.block();
            MjClient.gamenet.request("pkplayer.handler.leaguePlayerList", sendInfo ,  function(rtn)
            {
                MjClient.unblock();
                if (!cc.sys.isObjectValid(that)) {
                    return;
                }

                if(rtn.code == 0){
                    if(!rtn.data.list){
                        rtn.data.list = [];
                    }
                    for(var i = 0 ; i < rtn.data.list.length;i++){
                        if(rtn.data.list[i].group == itemData.group){
                            hasGroupLeader = true;
                        }
                        if(rtn.data.list[i].group && groupList.indexOf(rtn.data.list[i].group) < 0){
                            groupList.push(rtn.data.list[i].group);
                        }
                    }
                }
            });
        }
        var Button_mamager = this.memberManage.getChildByName("Button_mamager");
        var Button_unMamager = this.memberManage.getChildByName("Button_unMamager");
        var Button_tichu = this.memberManage.getChildByName("Button_tichu");
        var Button_admit = this.memberManage.getChildByName("Button_admit");
        var Button_AddOtherClub = this.memberManage.getChildByName("Button_AddOtherClub");
        var Button_unAdmit = this.memberManage.getChildByName("Button_unAdmit");
        var Button_remarks = this.memberManage.getChildByName("Button_remarks"); //备注
        var Button_groupMag = this.memberManage.getChildByName("Button_groupMag");//设置组长
        var Button_unGroupMag = this.memberManage.getChildByName("Button_unGroupMag");//取消组长
        var Button_zhuli = this.memberManage.getChildByName("Button_zhuli");//设置助理
        var Button_unZhuli = this.memberManage.getChildByName("Button_unZhuli");//撤销助理
        var button_frozen = this.memberManage.getChildByName("Button_frozen");
        var button_unfrozen = this.memberManage.getChildByName("Button_unfrozen");
        var button_checkCY = this.memberManage.getChildByName("Button_checkCY");//查看成员

        //下面是动态添加的按钮
        //比赛解除禁玩
        var btnUnForbidMatch = this.memberManage.getChildByName("btnUnForbidMatch");
        if (!btnUnForbidMatch) {
            btnUnForbidMatch = Button_admit.clone();
            btnUnForbidMatch.setName("btnUnForbidMatch");
            imgMatchFlag = ccui.ImageView("friendCards/memberManage/img_scoreFlag.png");
            imgMatchFlag.setAnchorPoint(1, 1);
            imgMatchFlag.y = btnUnForbidMatch.height;
            imgMatchFlag.x = btnUnForbidMatch.width;
            btnUnForbidMatch.addChild(imgMatchFlag);
            this.memberManage.addChild(btnUnForbidMatch);
        }
        btnUnForbidMatch.visible = false;

        var button_tickAll = this.memberManage.getChildByName("Button_tickAll");//踢出全部人
        if(!button_tickAll){
            if(FriendCard_Common.getSkinType() == 4){
                button_tickAll = FriendCard_Common.createCommonBtn({text:"踢出全部人"})
            }else{
                button_tickAll = FriendCard_Common.createCommonBtn({resArr:["friendCards/memberManage/btn_tick_all_n.png","friendCards/memberManage/btn_tick_all_s.png","friendCards/memberManage/btn_tick_all_s.png"]})
            }
            button_tickAll.setName("Button_tickAll");
            this.memberManage.addChild(button_tickAll);
        }
        var button_supperManager = this.memberManage.getChildByName("Button_supperManager");//设置超级管理员
        if(!button_supperManager){
            if(FriendCard_Common.getSkinType() == 4){
                button_supperManager = FriendCard_Common.createCommonBtn({text:"设置超级管理员"})
            }else{
                button_supperManager = FriendCard_Common.createCommonBtn({resArr:["friendCards/memberManage/btn_supperMamager_n.png","friendCards/memberManage/btn_supperMamager_s.png","friendCards/memberManage/btn_supperMamager_s.png"]})
            }
            button_supperManager.setName("Button_supperManager");
            this.memberManage.addChild(button_supperManager);
        }
        var button_unSupperManager = this.memberManage.getChildByName("Button_unSupperManager");//撤销超级管理员
        if(!button_unSupperManager){
            if(FriendCard_Common.getSkinType() == 4){
                button_unSupperManager = FriendCard_Common.createCommonBtn({text:"撤销超级管理员"})
            }else{
                button_unSupperManager = FriendCard_Common.createCommonBtn({resArr:["friendCards/memberManage/btn_unSupperMamager_n.png","friendCards/memberManage/btn_unSupperMamager_s.png","friendCards/memberManage/btn_unSupperMamager_s.png"]})
            }
            button_unSupperManager.setName("Button_unSupperManager");
            this.memberManage.addChild(button_unSupperManager);
        }
        button_supperManager.visible = false;
        button_unSupperManager.visible = false;
        if(openType == "member_member"){
            if(this.isLeader){
                if(isSupperManger){
                    button_supperManager.visible = false;
                    button_unSupperManager.visible = true;
                }else{
                    button_supperManager.visible = true;
                    button_unSupperManager.visible = false;
                }
            }
        }

        //增加玩家分组
        var button_group = this.memberManage.getChildByName("Button_group");
        var close = this.memberManage.getChildByName("close");


        close.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                this.Panle_memberManage.visible = false;
                MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Chengyuan_Chengyuanliebiao_Caozuo_Close", {uid: SelfUid()});
            }
        }, this);
        closeBtnAddLight(close);

        button_tickAll.visible = false;
        var isUnAdmit = 0;
        if(openType == "member_member"){
            isUnAdmit = (itemData.userStatus & 2) || (itemData.userStatus & 32);
            button_tickAll.visible = false;
            if(isAssistant || isGroupLeader){
                Button_tichu.visible = false;
            }else{
                Button_tichu.visible = true;
            }
            if(!Button_tichu.visible){
                if(this.isOpenOptAnyOne && (this.isLeader || FriendCard_Common.isLMChair()) && 
                    itemData.userId != MjClient.data.pinfo.uid){
                    Button_tichu.visible = true;
                }
            }
        }else if(openType == "member_group"){
            isUnAdmit = itemData.userStatus & 8;
            if(this.isSupperManger || (this.isManager && !this.isLMClubManager)){
                button_tickAll.visible = true;
                Button_tichu.visible = false;
            }else{
                button_tickAll.visible = false;
                Button_tichu.visible = true;
            }
        }else if(openType  == "member_zhuli"){
            isUnAdmit = itemData.userStatus & 16;
            if(this.isGroupLeader){
                button_tickAll.visible = true;
                Button_tichu.visible = false;
            }else{
                button_tickAll.visible = false;
                Button_tichu.visible = true;
            }
        }
        /*if(!this.isLeader && this.isSupperManger){
            Button_tichu.visible = false;
            button_tickAll.visible = false;
        }*/
        cc.log("openType",openType,"button_tickAll.visible",button_tickAll.visible)
        // 踢出
        //Button_tichu.visible = ((this.isSupperManger || this.isManager) && !(itemData.roleId == 4 || itemData.roleId == 2)) && itemData.userId != MjClient.data.pinfo.uid;
        // 设为管理
        Button_mamager.visible = (this.isManager && !this.isLMClubManager) && itemData.userId != MjClient.data.pinfo.uid && itemData.roleId == 0;
        // 撤销管理
        Button_unMamager.visible = (this.isManager && !this.isLMClubManager) && itemData.userId != MjClient.data.pinfo.uid && itemData.roleId == 5;
        // 是否进房UI显示
        Button_unAdmit.visible = !isUnAdmit;
        Button_admit.visible = !!isUnAdmit;
        button_group.visible = this.isManager && !isGroupLeader;
        //组长
        cc.log("this.isGroupLeader",this.isGroupLeader)
        Button_remarks.visible = true;
        if(this.isGroupLeader)
        {
            Button_groupMag.visible = false;
            Button_unGroupMag.visible = false;
            Button_zhuli.visible = (this.curUserGrp && itemData.group == this.curUserGrp && !(itemData.roleId == 4));
            Button_unZhuli.visible = false//(this.curUserGrp && itemData.group == this.curUserGrp && (itemData.roleId == 4));
        }
        else if(this.isManager)
        {
            Button_zhuli.visible = false;
            Button_unZhuli.visible = false;
            Button_groupMag.visible = !isGroupLeader;

            if(this.isOpenOptAnyOne && (this.isLeader || FriendCard_Common.isLMChair())){
                Button_unGroupMag.visible = isGroupLeader;
            }else{
                Button_unGroupMag.visible = false;//isGroupLeader;
            }
            
        }else if (this.isAssistants) {
            Button_zhuli.visible = false;
            Button_unZhuli.visible = false;
            Button_groupMag.visible = false;
            Button_unGroupMag.visible = false;
            Button_remarks.visible = false;
        } else {
            Button_zhuli.visible = false;
            Button_unZhuli.visible = false;
            Button_groupMag.visible = false;
            Button_unGroupMag.visible = false;
        }
        Button_AddOtherClub.visible = true;
        //添加到其他亲友圈 如果是管理
        if ( !(this.isManager && itemData.userId != MjClient.data.pinfo.uid) ) {
            Button_AddOtherClub.visible = false
        }
        button_frozen.visible = ((itemData.roleId == 1 && (this._roleId == 3 || this._roleId == 6)) ||
            (itemData.roleId == 2 && ((this._roleId == 1) || (this._roleId == 3 || this._roleId == 6))) || (itemData.roleId == 4 && this._roleId == 2)) && 
            (!itemData.isFrozen);
        button_unfrozen.visible = ((itemData.roleId == 1 && (this._roleId == 3 || this._roleId == 6)) ||
            (itemData.roleId == 2 && ((this._roleId == 1) || (this._roleId == 3 || this._roleId == 6))) || (itemData.roleId == 4 && this._roleId == 2)) && 
            (itemData.isFrozen);

        //button_frozen.visible = false;
        //button_unfrozen.visible = false;
        //调整位置
        if (!this.postionList){
            this.postionList = [
                Button_groupMag.getPosition(),Button_mamager.getPosition(),Button_unGroupMag.getPosition(),
                button_group.getPosition(),Button_remarks.getPosition(),Button_unMamager.getPosition(),
                Button_unAdmit.getPosition(),Button_admit.getPosition(),Button_AddOtherClub.getPosition(),
            ];
        }
        var buttonList = [button_checkCY,
            Button_groupMag,Button_unGroupMag,Button_mamager,
            Button_unMamager,button_group,Button_remarks,
            Button_admit,Button_unAdmit,Button_AddOtherClub,
            Button_zhuli,Button_unZhuli,Button_tichu,
            button_frozen,button_unfrozen,button_tickAll,
            button_supperManager,button_unSupperManager,
            btnUnForbidMatch
        ];
        //查看成员
        if (openType === "member_group") {
            button_checkCY.visible = true;
            var keepStatusBtn =[
                button_checkCY,button_tickAll
            ]
            if(itemData.roleId != 2 && itemData.roleId != 3 && itemData.roleId != 1){
                for (var i = 0; i < buttonList.length; i++) {
                    if(keepStatusBtn.indexOf(buttonList[i]) < 0){
                        cc.log("buttonList[i].name",buttonList[i].name)
                        buttonList[i].visible = false;
                    }
                }
            }
        } else {
            button_checkCY.visible = false;
        }
        

       
        if(openType != "member_member" && itemData.isMatchForbid
            && (FriendCard_Common.isLeader() || FriendCard_Common.isLMChair() || FriendCard_Common.isGroupLeader()) ){
            btnUnForbidMatch.visible = true;
        }

        var visibleList = [];
        for (var i = 0 ; i < buttonList.length; i++){
            if (buttonList[i] && buttonList[i].visible){
                visibleList.push(buttonList[i]);
            }
        }
        for (var i = 0 ; i < visibleList.length; i++){
            if (i< this.postionList.length){
                visibleList[i].setPosition(this.postionList[i]);
            }
        }
        btnUnForbidMatch.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                MjClient.block();
                MjClient.gamenet.request("pkplayer.handler.leagueMatchTeamLiftBan", 
                    {leagueId: that.clubInfo.clubId, userId: itemData.userId}, 
                    function (rtn) {
                        MjClient.unblock();
                        if (rtn.code == 0) {
                            MjClient.showToast("操作成功!");
                            if (cc.sys.isObjectValid(that)) {
                                itemData.isMatchForbid = 0;
                                that.reLoadCurPanleListUI();
                                that.Panle_memberManage.visible = false;
                            }
                        }
                        else {
                            FriendCard_Common.serverFailToast(rtn);
                        }
                    }); 
            }
        }, this);
         //查看成员
        button_checkCY.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                if(that.showingIndex == 4 && this.rquestClubGroupList){
                    this.rquestClubGroupList(null, 0, itemData.group);
                }else if(that.showingIndex == 5 && this.rquestClubZhuliList)
                if (this.rquestClubGroupList) {
                    this.rquestClubZhuliList(null, 0, itemData.group);
                }
                that.Panle_memberManage.visible = false;
            }
        }, this);

        //允许进房
        Button_admit.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Chengyuan_Chengyuanliebiao_Caozuo_Yunxujinfang", {uid: SelfUid()});
                var uiPara = {}
                uiPara.msg = "确定允许该玩家进房吗？";
                var _type = 1;
                if(openType == "member_zhuli"){
                    _type = 8;
                }else if(openType == "member_group"){
                    _type = 7;
                }
                // MjClient.showToast("==== type "+ _type);
                uiPara.yes = function() {
                    MjClient.gamenet.request("pkplayer.handler.leaguePlayerUpdate", {
                        leagueId:that.clubInfo.clubId,
                        userId:itemData.userId,
                        type:_type,
                        value:1},  function(rtn)
                        {
                            MjClient.unblock();
                            if(rtn.code == 0)
                            {
                                MjClient.showToast(rtn.message);
                                if (cc.sys.isObjectValid(that)) {
                                    itemData.userStatus = rtn.data.status;
                                    var curPanel = that.reLoadCurPanleListUI();
                                    that.Panle_memberManage.visible = false;
                                    if(rtn.isOtherGroup){
                                        that._tongBuJinWan(1);
                                    }
                                    if(curPanel){
                                        if(curPanel._allMemberStopNode && curPanel._data.mine.optPlayerState){
                                            curPanel._data.mine.optPlayerState = 2;
                                            that.reLoadCurPanleListUI();
                                        }
                                    }
                                }
                            }
                            else
                            {
                               FriendCard_Common.serverFailToast(rtn);
                            }
                        });
                    MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Chengyuan_Chengyuanliebiao_Caozuo_Yunxujinfang_Sure", {uid: SelfUid()});
                }
                uiPara.no = function() {
                }
                uiPara.close = function() {
                }
                MjClient.FriendCard_main_ui.addChild(new Friendcard_popUpMeg(uiPara))
            }
        }, this);

        this._tongBuJinWan = function(type){
            var uiPara = {};
            
            if(openType != "member_member"){
                return;
            }
            var str = "你已经成功将" + itemData.userId + "成功禁玩，他加入你的其他亲友圈，是否一起同步禁玩？";
            if(type == 1){
                str = "你已经成功将" + itemData.userId + "成功解禁，他加入你的其他亲友圈，是否一起同步解禁？";
            }
            uiPara.msg = str;

            uiPara.yes = function () {
                MjClient.gamenet.request("pkplayer.handler.syncPlayerStatus", {
                    userId: itemData.userId, status: type
                }, function (rtn) {
                        MjClient.unblock();
                        if (rtn.code == 0) {
                            MjClient.showToast(rtn.message);
                        }
                        else {
                            FriendCard_Common.serverFailToast(rtn);
                        }
                    }); //createSwitch
                MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Chengyuan_Chengyuanliebiao_Caozuo_Jinzhijinfang_Sure", { uid: SelfUid() });
            }
            uiPara.no = function() {
            }
            uiPara.close = function() {
            }
            MjClient.FriendCard_main_ui.addChild(new Friendcard_popUpMeg(uiPara))
        }
        //禁止进房
        Button_unAdmit.data = itemData;
        if(openType != "member_member"){
            if(FriendCard_Common.getSkinType() == 4){
                Button_unAdmit.setTitleText("全员禁玩")
            }else{
                Button_unAdmit.loadTextureNormal("friendCards/memberManage/btn_notAdmit2_n.png");
                Button_unAdmit.loadTexturePressed("friendCards/memberManage/btn_notAdmit2_s.png");
            }
        }else{
            if(FriendCard_Common.getSkinType() == 4){
                Button_unAdmit.setTitleText("禁止进房")
            }else{
                Button_unAdmit.loadTextureNormal("friendCards/memberManage/btn_notAdmit_n.png");
                Button_unAdmit.loadTexturePressed("friendCards/memberManage/btn_notAdmit_s.png");
            }
            
        }


        Button_unAdmit.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Chengyuan_Chengyuanliebiao_Caozuo_Jinzhijinfang", {uid: SelfUid()});
                var uiPara = {};
                var str = "是否将此玩家禁止玩牌？";
                var _type = 1;
                if(openType != "member_member"){
                    str = "是否将此团队全员禁止玩牌？";
                }
                if(openType == "member_zhuli"){
                    _type = 8;
                }else if(openType == "member_group"){
                    _type = 7;
                }
                uiPara.msg = str;
                uiPara.yes = function () {
                    MjClient.gamenet.request("pkplayer.handler.leaguePlayerUpdate", {
                        leagueId: that.clubInfo.leagueId, userId: itemData.userId, type: _type, value: 2
                    }, function (rtn) {
                            MjClient.unblock();
                            if (rtn.code == 0) {
                                MjClient.showToast(rtn.message);
                                if (cc.sys.isObjectValid(that)) {
                                    itemData.userStatus = rtn.data.status;
                                    that.reLoadCurPanleListUI();
                                    that.Panle_memberManage.visible = false;
                                    if(rtn.isOtherGroup){
                                        that._tongBuJinWan(2);
                                    }
                                }
                            }
                            else {
                                FriendCard_Common.serverFailToast(rtn);
                            }
                        }); 
                    MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Chengyuan_Chengyuanliebiao_Caozuo_Jinzhijinfang_Sure", { uid: SelfUid() });
                },
                uiPara.no = function() {
                }
                uiPara.close = function() {
                }
                MjClient.FriendCard_main_ui.addChild(new Friendcard_popUpMeg(uiPara))
            }
        }, this);
        //设置助理
        Button_zhuli.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                if(itemData.roleId > 0){
                    MjClient.showToast("请取消其特殊身份后再试");
                    return;
                }
                var uiPara = {}
                uiPara.msg = "确定设为助理吗？设置成功后，你无法撤销助理身份，且其推荐成员只能由助理踢出；只能将助理及其推荐人员一起踢出亲友圈。";
                uiPara.yes = function() {
                    MjClient.block();
                    MjClient.gamenet.request("pkplayer.handler.leagueSetPosition", {
                        leagueId:that.clubInfo.leagueId,
                        userId:itemData.userId,
                        roleId:4},  function(rtn)
                    {
                        MjClient.unblock();
                        if(rtn.code == 0)
                        {
                            MjClient.showToast(rtn.message?rtn.message:"设置助理成功");
                            if (cc.sys.isObjectValid(that)) {
                                itemData.assistantNo = rtn.data.assistantNo;
                                itemData.roleId = 4;
                                that.reLoadCurPanleListUI();
                                that.Panle_memberManage.visible = false;
                            }
                        }
                        else
                        {
                            FriendCard_Common.serverFailToast(rtn);
                        }
                    });
                }
                uiPara.no = function() {
                }
                uiPara.close = function() {
                }
                MjClient.FriendCard_main_ui.addChild(new Friendcard_popUpMeg(uiPara))


                
            }
        }, this);
        //撤销助理
        Button_unZhuli.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                MjClient.block();
                MjClient.gamenet.request("pkplayer.handler.leagueSetPosition", {
                    leagueId:that.clubInfo.leagueId,
                    userId:itemData.userId,
                    roleId:0},  function(rtn)
                {
                    MjClient.unblock();
                    if(rtn.code == 0)
                    {
                        MjClient.showToast(rtn.message?rtn.message:"撤销助理成功");
                        if (cc.sys.isObjectValid(that)) {
                            itemData.assistantNo = 0;
                            itemData.roleId = 0;
                            that.reLoadCurPanleListUI();
                            that.Panle_memberManage.visible = false;
                        }
                    }
                    else
                    {
                        FriendCard_Common.serverFailToast(rtn);
                    }
                });
            }
        }, this);

        

        //踢出全部人按钮
        button_tickAll.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                var uiPara = {}
                var sendInfo = {
                    leagueId:that.clubInfo.clubId,
                };
                uiPara.uiStyle = "friendcard_posUpMsg_daoshu2";
                uiPara.msgRed2 = "被踢出的角色，可正常获得当天已产生的业绩和推广奖励";
                uiPara.msgRed = "踢出亲友圈将不可撤销，请谨慎操作！";
                if(openType === "member_group"){
                    uiPara.msg = "确定将"+itemData.group+"组"+itemData.groupCount+"人全部踢出亲友圈吗";
                    sendInfo.groupId = itemData.group;
                }else{
                    uiPara.msg = "确定将助理及其推荐成员"+itemData.assisCount+"人全部踢出亲友圈吗？";
                    sendInfo.userId = itemData.userId;
                }
                uiPara.yes = function() {
                    cc.log("leagueExit sendInfo",JSON.stringify(sendInfo))
                    MjClient.gamenet.request("pkplayer.handler.leagueExit",sendInfo,  function(rtn)
                    {
                        MjClient.unblock();
                        if(rtn.code == 0)
                        {
                            MjClient.showToast(rtn.message);
                            if (cc.sys.isObjectValid(that)) {
                                if(cc.sys.isObjectValid(that.panelViews[that.showingIndex])){
                                    if(that.panelViews[that.showingIndex]._data){
                                        var _data = that.panelViews[that.showingIndex]._data;
                                        if(_data.list[index]){
                                            _data.list.splice(index, 1);
                                            that.panelViews[that.showingIndex].reloadListUiFunc();
                                        }
                                    }
                                }
                                that.Panle_memberManage.visible = false;
                            }
                        }
                        else
                        {
                           FriendCard_Common.serverFailToast(rtn);
                        }
                    });
                }
                uiPara.no = function() {
                }
                uiPara.close = function() {
                }
                MjClient.FriendCard_main_ui.addChild(new Friendcard_popUpMeg(uiPara))
            }
        }, this);
        //踢出按钮
        Button_tichu.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                if((!this.isOpenOptAnyOne && this.isManager && itemData.group) && hasGroupLeader){
                    MjClient.showToast("不可操作，请联系该组组长");
                    return;
                }
                if((this.isGroupLeader && itemData.assistantNo) && hasGroupLeader){
                    MjClient.showToast("操作失败，请联系助理");
                    return;
                }
                MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Chengyuan_Chengyuanliebiao_Caozuo_Tichuqinyouquan", {uid: SelfUid()});
                var uiPara = {}
                uiPara.msg = "确定踢出该成员吗？";
                uiPara.yes = function() {
                    var sendInfo = {
                        leagueId:that.clubInfo.clubId,
                        userId:itemData.userId
                    }
                    cc.log("leagueExit sendInfo",JSON.stringify(sendInfo))
                    MjClient.gamenet.request("pkplayer.handler.leagueExit",sendInfo,  function(rtn)
                        {
                            MjClient.unblock();
                            if(rtn.code == 0)
                            {
                                MjClient.showToast(rtn.message);
                                if (cc.sys.isObjectValid(that)) {
                                    if(cc.sys.isObjectValid(that.panelViews[that.showingIndex])){
                                        if(that.panelViews[that.showingIndex]._data){
                                            var _data = that.panelViews[that.showingIndex]._data;
                                            if(_data.list[index]){
                                                _data.list.splice(index, 1);
                                                that.panelViews[that.showingIndex].reloadListUiFunc();
                                            }
                                        }
                                    }
                                    that.Panle_memberManage.visible = false;

                                }

                            }
                            else
                            {
                               FriendCard_Common.serverFailToast(rtn);
                            }
                        });
                    MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Chengyuan_Chengyuanliebiao_Caozuo_Tichuqinyouquan_Sure", {uid: SelfUid()});
                },
                uiPara.no = function() {
                }
                uiPara.close = function() {
                }
                MjClient.FriendCard_main_ui.addChild(new Friendcard_popUpMeg(uiPara))
            }
        }, this);

        //管理
        Button_mamager.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                    cc.log("设为管理");
                    if(itemData.roleId > 0){
                        MjClient.showToast("请取消其特殊身份后再试");
                        return;
                    }
                    MjClient.block();
                    MjClient.gamenet.request("pkplayer.handler.leagueSetPosition", {
                        leagueId:that.clubInfo.leagueId,
                        userId:itemData.userId,
                        roleId:5},  function(rtn)
                    {
                        MjClient.unblock();
                        if(rtn.code == 0)
                        {
                            MjClient.showToast(rtn.message);
                            if (cc.sys.isObjectValid(that)) {
                                itemData.roleId = 5;
                                that.reLoadCurPanleListUI();
                                that.Panle_memberManage.visible = false
                            }
                        }
                        else
                        {
                           FriendCard_Common.serverFailToast(rtn);
                        }
                    });
                MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Chengyuan_Chengyuanliebiao_Caozuo_Sheweiguanliyuan", {uid: SelfUid()});
            }
        }, this);

        //撤销管理
        Button_unMamager.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                cc.log("撤销管理");
                MjClient.block();
                MjClient.gamenet.request("pkplayer.handler.leagueSetPosition", {
                        leagueId:that.clubInfo.leagueId,
                        userId:itemData.userId,
                        roleId:0},  function(rtn)
                {
                    MjClient.unblock();
                    if(rtn.code == 0)
                    {
                        MjClient.showToast(rtn.message);
                        if (cc.sys.isObjectValid(that)) {
                            itemData.roleId = 0;
                            that.reLoadCurPanleListUI();
                            that.Panle_memberManage.visible = false
                        }
                    }
                    else
                    {
                       FriendCard_Common.serverFailToast(rtn);
                    }
                });
                MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Chengyuan_Chengyuanliebiao_Caozuo_Quxiaoguanliyuan", {uid: SelfUid()});
            }
        }, this);

        //设置超级管理员
        button_supperManager.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                if(itemData.roleId > 0){
                    MjClient.showToast("请取消其特殊身份后再试");
                    return;
                }
                var uiPara = {}
                uiPara.msg = "超级管理员权限除不能亲友圈踢出联盟与修改比例外，其他权限与你一致，确定将他设为超级管理员吗？";
                uiPara.yes = function() {
                    MjClient.block();
                    MjClient.gamenet.request("pkplayer.handler.leagueSetPosition", {
                        leagueId:that.clubInfo.leagueId,
                        userId:itemData.userId,
                        roleId:6},  function(rtn)
                    {
                        MjClient.unblock();
                        if(rtn.code == 0)
                        {
                            MjClient.showToast(rtn.message);
                            if (cc.sys.isObjectValid(that)) {
                                itemData.roleId = 6;
                                that.reLoadCurPanleListUI();
                                that.Panle_memberManage.visible = false
                            }
                        }
                        else
                        {
                           FriendCard_Common.serverFailToast(rtn);
                        }
                    });
                }
                uiPara.no = function() {
                }
                uiPara.close = function() {
                }
                MjClient.FriendCard_main_ui.addChild(new Friendcard_popUpMeg(uiPara))  
            }
        }, this);

        //撤销超级管理员
        button_unSupperManager.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                MjClient.block();
                MjClient.gamenet.request("pkplayer.handler.leagueSetPosition", {
                        leagueId:that.clubInfo.leagueId,
                        userId:itemData.userId,
                        roleId:0},  function(rtn)
                {
                    MjClient.unblock();
                    if(rtn.code == 0)
                    {
                        MjClient.showToast(rtn.message);
                        if (cc.sys.isObjectValid(that)) {
                            itemData.roleId = 0;
                            that.reLoadCurPanleListUI();
                            that.Panle_memberManage.visible = false
                        }
                    }
                    else
                    {
                       FriendCard_Common.serverFailToast(rtn);
                    }
                });
            }
        }, this);
        //备注
        Button_remarks.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Chengyuan_Chengyuanliebiao_Caozuo_Tianjiabeizhu", {uid: SelfUid()});
                this.showInputRemarksNameDialog(itemData);
            }
        }, this);

        //添加到其他亲友圈
        Button_AddOtherClub.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                if((this.isManager && itemData.group) && hasGroupLeader){
                    MjClient.showToast("不可操作，请联系该组组长");
                    return;
                }
                if((this.isGroupLeader && itemData.assistantNo) && hasGroupLeader){
                    MjClient.showToast("操作失败，请联系助理");
                    return;
                }
                MjClient.block();
                MjClient.gamenet.request("pkplayer.handler.clubList", {type:2},
                    function(rtn) {
                        MjClient.unblock();

                        if(!cc.sys.isObjectValid(that))
                            return;

                        if (rtn.code == 0) {
                            if (rtn.data.length <= 1)
                            {
                                MjClient.showToast("你没有创建其他亲友圈");
                                that.removeFromParent(true);
                            }
                            else
                            {
                                that.daochu_data = rtn.data && rtn.data.list ? rtn.data.list : [];

                                if(rtn.data && rtn.data.leagueList){
                                    for(var i = rtn.data.leagueList.length - 1; i >= 0; i--){
                                        rtn.data.leagueList[i].clubId = rtn.data.leagueList[i].leagueId;
                                    }
                                    that.daochu_data = that.daochu_data.concat(rtn.data.leagueList);
                                }

                                that.Panle_daochu.visible = true;
                                that.refreshDaoChuList(itemData);
                            }
                        } else {
                            FriendCard_Common.serverFailToast(rtn)
                        }
                    }
                );
                MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Chengyuan_Chengyuanliebiao_Caozuo_Tianjiadaoqitapengyouquan", {uid: SelfUid()});
            }
        }, this);


        button_group.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                if((!this.isOpenOptAnyOne && this.isManager && itemData.group) && hasGroupLeader){
                    MjClient.showToast("不可操作，请联系该组组长");
                    return;
                }
                if((this.isGroupLeader && itemData.assistantNo) && hasGroupLeader){
                    MjClient.showToast("操作失败，请联系助理");
                    return;
                }
                var others = [];
                others.push("不分组");
                var data = {event:"MEMBER_FENZU",numberGroup:FriendCard_Common.getGroupNumber(),others:others};
                data.callBackFunc = function (eD) {
                    var setGroupType = eD.groupType == "不分组" ? 0 :eD.groupType;
                    setGroupType  = setGroupType+"";
                    MjClient.block();
                    MjClient.gamenet.request("pkplayer.handler.leaguePlayerUpdate", {
                        leagueId:that.clubInfo.clubId,
                        userId:itemData.userId, 
                        type:4,
                        value:setGroupType},  function(rtn)
                    {
                        MjClient.unblock();
                        if(rtn.code == 0)
                        {
                            MjClient.showToast(rtn.message);
                            if (cc.sys.isObjectValid(that)) {
                                itemData.group = setGroupType;
                                that.reLoadCurPanleListUI();
                                that.Panle_memberManage.visible = false;
                            }
                        }
                        else
                        {
                            FriendCard_Common.serverFailToast(rtn);
                        }
                    });
                };
                that.addChild(new friendcard_selectGroup(data));
            }
        }, this);

        //设置组长
        Button_groupMag.addTouchEventListener(function (sender, type) {
            if (type == 2) {

                if(itemData.roleId > 0){
                    MjClient.showToast("请取消其特殊身份后再试");
                    return;
                }
                if((!this.isOpenOptAnyOne && this.isManager && itemData.group) && hasGroupLeader){
                    MjClient.showToast("不可操作，请联系该组组长");
                    return;
                }
                if((this.isGroupLeader && itemData.assistantNo) && hasGroupLeader){
                    MjClient.showToast("操作失败，请联系助理");
                    return;
                }
                var others = [];
                var data = {event:"MEMBER_FENZU",numberGroup:FriendCard_Common.getGroupNumber(),ignoreGroups:groupList,others:others};
                data.callBackFunc = function (eD) {

                    var groupType = eD.groupType == "不分组" ? 0 :eD.groupType;
                    var uiPara = {}
                    uiPara.msg = "确定设为"+groupType+"组的组长吗？设置成功后，你无法撤销组长身份，且其组员只能由组长踢出；只能将整组一起踢出亲友圈。";

                    if (MjClient.getAppType() == MjClient.APP_TYPE.AYGUIZHOUMJ && FriendCard_Common.getClubisLM()) {
                        uiPara.msg = '1.联盟小组人数须达到8人且新玩家3人以上，才可以给组长设置返利比例\r\n2.组员只能够被组长踢出亲友圈\r\n3.会长可以将整个组踢出亲友圈\r\n4.组长身份将无法被撤销';
                        uiPara.msgFontSize = 25;
                        uiPara.msgHorizontalAlignment = cc.TEXT_ALIGNMENT_LEFT;
                    }

                    uiPara.yes = function() {
                        MjClient.block();
                        MjClient.gamenet.request("pkplayer.handler.leagueSetPosition", {
                            leagueId:that.clubInfo.leagueId,
                            userId:itemData.userId,
                            groupId:groupType,
                            roleId:2},  function(rtn)
                        {
                            MjClient.unblock();
                            if(rtn.code == 0)
                            {
                                MjClient.showToast(rtn.message);
                                if (cc.sys.isObjectValid(that)) {
                                    itemData.roleId = 2;
                                    itemData.group = groupType;
                                    that.reLoadCurPanleListUI();
                                    that.Panle_memberManage.visible = false;
                                }
                            }
                            else
                            {
                                FriendCard_Common.serverFailToast(rtn);
                            }
                        });
                    },
                    uiPara.no = function() {
                    }
                    uiPara.close = function() {
                    }
                    if(that.isOpenOptAnyOne){
                        uiPara.yes();
                    }else{
                        MjClient.FriendCard_main_ui.addChild(new Friendcard_popUpMeg(uiPara))
                    }
                };
                that.addChild(new friendcard_selectGroup(data));
            }
        }, this);

        Button_unGroupMag.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                MjClient.gamenet.request("pkplayer.handler.leagueSetPosition", {
                    leagueId:that.clubInfo.leagueId,
                        userId:itemData.userId,
                        groupId:itemData.group,
                        roleId:0},  function(rtn)
                {
                    MjClient.unblock();
                    if(rtn.code == 0)
                    {
                        MjClient.showToast(rtn.message ? rtn.message : "撤销组长成功");
                        if (cc.sys.isObjectValid(that)) {
                            itemData.roleId = 0;
                            that.reLoadCurPanleListUI();
                            that.Panle_memberManage.visible = false;
                        }
                    }
                    else
                    {
                        FriendCard_Common.serverFailToast(rtn);
                    }
                });
            }
        }, this);


        //冻结
        button_frozen.addTouchEventListener(function (sender, type)
        {
            if (type == 2){
                var uiPara = {}
                uiPara.uiStyle = "friendcard_posUpMsg_daoshu2";
                uiPara.msgRed2 = "冻结后该用户将无法进行提现";
                //uiPara.msgRed = "";
                uiPara.msg = "是否确认冻结";
                uiPara.showTime = 0;
                uiPara.yes = function() {
                    var sendInfo = {};
                    sendInfo.leagueId = that.clubInfo.clubId;
                    sendInfo.userId = itemData.userId;
                    sendInfo.isFrozen = 1;
                    cc.log("clubSetFrozen sendInfo",JSON.stringify(sendInfo))
                    MjClient.block();
                    MjClient.gamenet.request("pkplayer.handler.leagueSetFrozen", sendInfo, function(rtn) {
                        MjClient.unblock();
                        if (rtn.code == 0) {
                            MjClient.showToast(rtn.message? rtn.message : "冻结成功");
                            if(cc.sys.isObjectValid(that)){
                                itemData.isFrozen = 1;
                                that.reLoadCurPanleListUI();
                                that.Panle_memberManage.visible = false;
                            }
                        } else{
                            FriendCard_Common.serverFailToast(rtn);
                        }
                    });
                };
                uiPara.no = function() {
                }
                uiPara.close = function() {
                }
                MjClient.FriendCard_main_ui.addChild(new Friendcard_popUpMeg(uiPara))
            }
        });
        //解冻
        button_unfrozen.addTouchEventListener(function (sender, type)
        {
            if (type == 2){
                var uiPara = {}
                uiPara.uiStyle = "friendcard_posUpMsg_daoshu2";
                uiPara.msgRed2 = "解冻后该用户可以正常提现";
                //uiPara.msgRed = "";
                uiPara.msg = "是否确认解冻";
                uiPara.showTime = 0;
                uiPara.yes = function() {
                    var sendInfo = {};
                    sendInfo.leagueId = that.clubInfo.clubId;
                    sendInfo.userId = itemData.userId;
                    sendInfo.isFrozen = 0;
                    cc.log("clubSetFrozen sendInfo",JSON.stringify(sendInfo))
                    MjClient.block();
                    MjClient.gamenet.request("pkplayer.handler.leagueSetFrozen", sendInfo, function(rtn) {
                        MjClient.unblock();
                        if (rtn.code == 0) {
                            MjClient.showToast(rtn.message? rtn.message : "解冻成功");
                            if(cc.sys.isObjectValid(that)){
                                itemData.isFrozen = 0;
                                that.reLoadCurPanleListUI();
                                that.Panle_memberManage.visible = false;
                            }
                        } else{
                            FriendCard_Common.serverFailToast(rtn);
                        }
                    });
                };
                uiPara.no = function() {
                }
                uiPara.close = function() {
                }
                MjClient.FriendCard_main_ui.addChild(new Friendcard_popUpMeg(uiPara))
            }
        });
    },
    //显示联盟列表操作界面
    showLMListManage:function(index)
    {
        var that = this;
        var _panel = this.panelViews[0];

        this.panle_LMListManage.visible = true;
        this.LMListManage = this.panle_LMListManage.getChildByName("Image_bg");
        this.LMListManage.visible=true;

        var button_turn_league = this.LMListManage.getChildByName("Button_turn_league");
        var button_tick_league = this.LMListManage.getChildByName("Button_tick_league");
        //var button_frozen = this.LMListManage.getChildByName("Button_frozen");
        //var button_unfrozen = this.LMListManage.getChildByName("Button_unfrozen");
        var button_admit = this.LMListManage.getChildByName("Button_admit");
        var button_unAdmit = this.LMListManage.getChildByName("Button_unAdmit");
        var close = this.LMListManage.getChildByName("close");
        var itemData = _panel._data.list[index];


        //比赛解除禁玩
        var btnUnForbidMatch = this.LMListManage.getChildByName("btnUnForbidMatch");
        if(!btnUnForbidMatch){
            btnUnForbidMatch = button_admit.clone();
            btnUnForbidMatch.setName("btnUnForbidMatch");
            imgMatchFlag = ccui.ImageView("friendCards/memberManage/img_scoreFlag.png");
            imgMatchFlag.setAnchorPoint(1, 1);
            imgMatchFlag.y = btnUnForbidMatch.height;
            imgMatchFlag.x = btnUnForbidMatch.width;
            btnUnForbidMatch.addChild(imgMatchFlag);
            this.LMListManage.addChild(btnUnForbidMatch);
        }
        btnUnForbidMatch.visible = false;
        if(itemData.isMatchForbid&& (FriendCard_Common.isLeader() || FriendCard_Common.isLMChair() || FriendCard_Common.isGroupLeader()) ){
            btnUnForbidMatch.visible = true;
        }

        //冻结
        var button_frozen = this.LMListManage.getChildByName("Button_frozen");
        button_frozen.visible = false;
        //解冻
        var button_unfrozen = this.LMListManage.getChildByName("Button_unfrozen");
        button_unfrozen.visible = false;

        close.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                this.panle_LMListManage.visible = false;
                MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Chengyuan_Chengyuanliebiao_Caozuo_Close", {uid: SelfUid()});
            }
        }, this);
        closeBtnAddLight(close);
       
        button_turn_league.visible = this.isLeader;
        button_tick_league.visible = this.isLeader;

        button_frozen.visible = this.isLeader && !itemData.isFrozen;
        button_unfrozen.visible = this.isLeader && itemData.isFrozen;

        button_admit.visible = !!(itemData.userStatus & 4);
        button_unAdmit.visible = !(itemData.userStatus & 4);
        //调整位置
        if (!this.lmPptPostionList){
            var p6 = cc.p(button_admit.x,button_unfrozen.y)
            this.lmPptPostionList = [
                button_turn_league.getPosition(),
                button_tick_league.getPosition(),
                button_frozen.getPosition(),
                button_admit.getPosition(),
                button_unfrozen.getPosition(),
                p6,
            ];
        }
        var buttonList = [
            button_turn_league,
            button_tick_league,
            button_frozen,
            button_unfrozen,
            button_admit,
            button_unAdmit,
            btnUnForbidMatch,
        ];
        var visibleList = [];
        for (var i = 0 ; i < buttonList.length; i++){
            if (buttonList[i].visible){
                visibleList.push(buttonList[i]);
            }
        }

        for (var i = 0 ; i < visibleList.length; i++){
            if (i < this.lmPptPostionList.length){
                visibleList[i].setPosition(this.lmPptPostionList[i]);
            }
        }


        btnUnForbidMatch.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                MjClient.block();
                MjClient.gamenet.request("pkplayer.handler.leagueMatchTeamLiftBan", 
                    {leagueId: that.clubInfo.clubId, userId: itemData.userId}, 
                    function (rtn) {
                        MjClient.unblock();
                        if (rtn.code == 0) {
                            MjClient.showToast("操作成功!");
                            if (cc.sys.isObjectValid(that)) {
                                itemData.isMatchForbid = 0;
                                that.refreshLeagueList();
                                that.panle_LMListManage.visible = false;
                            }
                        }
                        else {
                            FriendCard_Common.serverFailToast(rtn);
                        }
                    }); 
            }
        }, this);
         //转让联盟
        button_turn_league.addTouchEventListener(function (sender, type)
        {
            if (type != 2)
                return;
            var uiPara = {}
            uiPara.uiStyle = "friendcard_posUpMsg_daoshu";
            uiPara.msg = "确定转让盟主吗";
            uiPara.msgRed = "转让盟主将不可撤销，请谨慎操作！";
            var sendInfo = {};
            sendInfo.leagueId = that.clubInfo.clubId;
            sendInfo.userId = itemData.userId;
            cc.log("leagueTransferCreator sendInfo",JSON.stringify(sendInfo))
            uiPara.yes = function() {
                cc.log("leagueTransferCreator")
                MjClient.block();
                MjClient.gamenet.request("pkplayer.handler.leagueTransferCreator", sendInfo, function(rtn) {
                    MjClient.unblock();
                    if (rtn.code == 0) {
                        MjClient.showMsg(rtn.message? rtn.message :"转让联盟成功");
                        if(cc.sys.isObjectValid(MjClient.friendCard_member_ui)){
                            MjClient.friendCard_member_ui.removeFromParent(true);
                        }
                    }else{
                        FriendCard_Common.serverFailToast(rtn);
                    }

                });
            }.bind(this);
            uiPara.no = function () {
            }
            uiPara.close = function () {
            }
            MjClient.FriendCard_main_ui.addChild(new Friendcard_popUpMeg(uiPara))
        });

        //踢出联盟
        button_tick_league.addTouchEventListener(function (sender, type)
        {
            if (type != 2)
                return;
            var uiPara = {}
            uiPara.uiStyle = "friendcard_posUpMsg_daoshu2";
            uiPara.msgRed2 = "被踢出的角色，可正常获得当天已产生的业绩和推广奖励";
            uiPara.msgRed = "踢出联盟将不可撤销，请谨慎操作！";
            uiPara.msg = "确定将"+unescape(itemData.nickname)+"踢出联盟吗";
            var sendInfo = {};
            sendInfo.leagueId = that.clubInfo.clubId;
            sendInfo.userId = itemData.userId;
            cc.log("leagueExit sendInfo",JSON.stringify(sendInfo))
            uiPara.yes = function() {
                cc.log("leagueTransferCreator")
                MjClient.block();
                MjClient.gamenet.request("pkplayer.handler.leagueExit", sendInfo, function(rtn) {
                    MjClient.unblock();
                    if (rtn.code == 0) {
                        MjClient.showToast(rtn.message ? rtn.message : "踢出联盟成功");
                        if(cc.sys.isObjectValid(that)){
                            var _data = _panel._data;
                            if(_data.list[index]){
                                _data.list.splice(index, 1);
                                that.refreshLeagueList();
                            }
                            that.panle_LMListManage.visible = false;
                        }
                    }else{
                        FriendCard_Common.serverFailToast(rtn);
                    }

                });
            }.bind(this);
            uiPara.no = function () {
            }
            uiPara.close = function () {
            }
            MjClient.FriendCard_main_ui.addChild(new Friendcard_popUpMeg(uiPara))
            
        });

        //冻结
        button_frozen.addTouchEventListener(function (sender, type)
        {
            if (type == 2){
                var uiPara = {}
                uiPara.uiStyle = "friendcard_posUpMsg_daoshu2";
                uiPara.msgRed2 = "冻结后该用户将无法进行提现";
                //uiPara.msgRed = "";
                uiPara.msg = "是否确认冻结";
                uiPara.showTime = 0;
                uiPara.yes = function() {
                    var sendInfo = {};
                    sendInfo.leagueId = that.clubInfo.clubId;
                    sendInfo.userId = itemData.userId;
                    sendInfo.isFrozen = 1;
                    cc.log("clubSetFrozen sendInfo",JSON.stringify(sendInfo))
                    MjClient.block();
                    MjClient.gamenet.request("pkplayer.handler.leagueSetFrozen", sendInfo, function(rtn) {
                        MjClient.unblock();
                        if (rtn.code == 0) {
                            MjClient.showToast(rtn.message? rtn.message : "冻结成功");
                            if(cc.sys.isObjectValid(that)){
                                itemData.isFrozen = 1;
                                that.reLoadCurPanleListUI();
                                that.panle_LMListManage.visible = false;
                            }
                        } else{
                            FriendCard_Common.serverFailToast(rtn);
                        }
                    });
                };
                uiPara.no = function() {
                }
                uiPara.close = function() {
                }
                MjClient.FriendCard_main_ui.addChild(new Friendcard_popUpMeg(uiPara))
            }
        });
        //解冻
        button_unfrozen.addTouchEventListener(function (sender, type)
        {
            if (type == 2){
                var uiPara = {}
                uiPara.uiStyle = "friendcard_posUpMsg_daoshu2";
                uiPara.msgRed2 = "解冻后该用户可以正常提现";
                //uiPara.msgRed = "";
                uiPara.msg = "是否确认解冻";
                uiPara.showTime = 0;
                uiPara.yes = function() {
                    var sendInfo = {};
                    sendInfo.leagueId = that.clubInfo.clubId;
                    sendInfo.userId = itemData.userId;
                    sendInfo.isFrozen = 0;
                    cc.log("clubSetFrozen sendInfo",JSON.stringify(sendInfo))
                    MjClient.block();
                    MjClient.gamenet.request("pkplayer.handler.leagueSetFrozen", sendInfo, function(rtn) {
                        MjClient.unblock();
                        if (rtn.code == 0) {
                            MjClient.showToast(rtn.message? rtn.message : "解冻成功");
                            if(cc.sys.isObjectValid(that)){
                                itemData.isFrozen = 0;
                                that.reLoadCurPanleListUI();
                                that.panle_LMListManage.visible = false;
                            }
                        } else{
                            FriendCard_Common.serverFailToast(rtn);
                        }
                    });
                };
                uiPara.no = function() {
                }
                uiPara.close = function() {
                }
                MjClient.FriendCard_main_ui.addChild(new Friendcard_popUpMeg(uiPara))
            }

          
        });

        //允许进房
        button_admit.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                var sendInfo = {
                    leagueId:that.clubInfo.clubId,
                    userId:itemData.userId,
                    type:5,
                    value:1
                }
                MjClient.block();
                MjClient.gamenet.request("pkplayer.handler.leaguePlayerUpdate",sendInfo , function(rtn)
                    {
                        MjClient.unblock();
                        if(rtn.code == 0){
                            MjClient.showToast(rtn.message);
                            if (cc.sys.isObjectValid(that)) {
                                itemData.userStatus = rtn.data.status;
                                that.refreshLeagueList();
                                that.panle_LMListManage.visible = false;
                            }
                        }
                        else{
                           FriendCard_Common.serverFailToast(rtn);
                        }
                    }
                );
            }
        }, this);

        if(FriendCard_Common.getSkinType() == 4){
            button_unAdmit.setTitleText("全员禁玩")
        }else{
            button_unAdmit.loadTextureNormal("friendCards/memberManage/btn_notAdmit2_n.png");
            button_unAdmit.loadTexturePressed("friendCards/memberManage/btn_notAdmit2_s.png");
        }
        //禁止进房
        button_unAdmit.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                // MjClient.showToast("====这是联盟啊啊   --------")
                var uiPara = {}
                uiPara.msg = "是否将此亲友圈全员禁止玩牌？";
                var sendInfo = {
                    leagueId: that.clubInfo.leagueId, userId: itemData.userId, type: 5, value: 2,
                };
                uiPara.yes = function() {
                    MjClient.block();
                    MjClient.gamenet.request("pkplayer.handler.leaguePlayerUpdate",sendInfo ,  function(rtn)
                        {
                            MjClient.unblock();
                            if(rtn.code == 0)
                            {
                                MjClient.showToast(rtn.message);
                                if (cc.sys.isObjectValid(that)) {
                                    itemData.userStatus = rtn.data.status;
                                    that.refreshLeagueList();
                                    that.panle_LMListManage.visible = false;
                                }
                            }
                            else{
                               FriendCard_Common.serverFailToast(rtn);
                            }
                        });
                    MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Chengyuan_Chengyuanliebiao_Caozuo_Jinzhijinfang_Sure", {uid: SelfUid()});
                }
                uiPara.no = function() {
                }
                uiPara.close = function() {
                }
                MjClient.FriendCard_main_ui.addChild(new Friendcard_popUpMeg(uiPara))
            }
        }, this);
    },
    //设置玩家备注界面
    showInputRemarksNameDialog: function(itemData) {
        var that = this;
        this.Panle_addRemark.visible = true;
        var image_remarks = this.Panle_addRemark.getChildByName("Image_bg");

        var image = image_remarks.getChildByName("Image");
        image.removeChildByName("textInput")
        var textInput = new cc.EditBox(image.getContentSize(), new cc.Scale9Sprite("friendCards/main/int_playwords.png"));
        textInput.setName("textInput");
        textInput.setFontColor(cc.color(0x40, 0x40, 0x40));
        textInput.setInputMode(cc.EDITBOX_INPUT_MODE_ANY);
        textInput.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
        textInput.setPlaceHolder("最多6个字");
        textInput.setPosition(image.getContentSize().width / 2, image.getContentSize().height / 2);
        image.addChild(textInput);

        image_remarks.getChildByName("close").addTouchEventListener(function (sender, type) {
            if (type == 2) {
                this.Panle_addRemark.visible = false;
            }
        }, this);
        var finishBtn = image_remarks.getChildByName("Button_finish");
        finishBtn.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Chengyuan_Chengyuanliebiao_Caozuo_Tianjiabeizhu_Wancheng", {uid: SelfUid()});
                var remarkStr = textInput.getString();
                if (remarkStr && remarkStr.length > 6){
                     MjClient.showToast("备注最多6个字");
                }else{
                    MjClient.block();
                    var sendInfo = {
                        leagueId:that.clubInfo.clubId,
                        userId:itemData.userId,
                        type:that.isGroupLeader ? 3 : 2,
                        value:remarkStr
                    }
                    cc.log("leaguePlayerUpdate sendInfo",JSON.stringify(sendInfo));
                    MjClient.gamenet.request("pkplayer.handler.leaguePlayerUpdate", sendInfo,  function(rtn)
                    {
                        MjClient.unblock();
                        if(rtn.code == 0)
                        {
                            MjClient.showToast(rtn.message);
                            if (cc.sys.isObjectValid(that)) {
                                if (that.isGroupLeader) {
                                    itemData.remarkGrp = remarkStr;
                                } else {
                                    itemData.remark = remarkStr;
                                }
                                that.reLoadCurPanleListUI();
                                that.Panle_memberManage.visible = false;
                                that.Panle_addRemark.visible = false;
                            }
                        }
                        else
                        {
                           FriendCard_Common.serverFailToast(rtn);
                        }
                    });
                }

            }
        }, this);
    },
    setFrozenImg:function(item,itemData,head){
        if(itemData.isFrozen){
            var imgFrozenSignBg = item.getChildByName("imgFrozenSignBg");
            if(!imgFrozenSignBg){
                imgFrozenSignBg = ccui.ImageView("friendCards/common/headMask_da.png");
                imgFrozenSignBg.setName("imgFrozenSignBg")
                imgFrozenSignBg.scale = head.width/imgFrozenSignBg.width;
                item.addChild(imgFrozenSignBg)
                imgFrozenSignBg.setPosition(head.getPosition());
                imgFrozenSignBg.setOpacity(255 * 0.6);
            }else{
                imgFrozenSignBg.visible = true;
            }
            
            var imgFrozenSign = item.getChildByName("imgFrozenSign");
            if(!imgFrozenSign){
                imgFrozenSign = ccui.ImageView("friendCards/memberManage/img_frozen_sign.png");
                imgFrozenSign.setName("imgFrozenSign")
                item.addChild(imgFrozenSign)
                imgFrozenSign.setPosition(head.getPosition());
            }else{
                imgFrozenSign.visible = true;
            }
            
        }else{
            var imgFrozenSignBg = item.getChildByName("imgFrozenSignBg");
            var imgFrozenSign = item.getChildByName("imgFrozenSign");
            if(imgFrozenSignBg){
                imgFrozenSignBg.visible = false;
            }
            if(imgFrozenSign){
                imgFrozenSign.visible = false;
            }
        }

        /*if(itemData.preRebateFreeze){
            var isGroupLeader =  FriendCard_Common.isGroupLeader(this.clubInfo,itemData.userId);
            var isAssistant =  FriendCard_Common.isAssistants(this.clubInfo,itemData.userId);
            var imgFrozenSignBg = item.getChildByName("imgFrozenSignBg");
            if(!imgFrozenSignBg){
                imgFrozenSignBg = ccui.ImageView("friendCards/common/headMask_da.png");
                imgFrozenSignBg.setName("imgFrozenSignBg")
                imgFrozenSignBg.scale = head.width/imgFrozenSignBg.width;
                item.addChild(imgFrozenSignBg)
                imgFrozenSignBg.setPosition(head.getPosition());
                imgFrozenSignBg.setOpacity(255 * 0.6);
            }else{
                imgFrozenSignBg.visible = true;
            }
            
            var imgFrozenSign = item.getChildByName("imgFrozenSign");
            if(!imgFrozenSign){
                imgFrozenSign = ccui.ImageView("friendCards/memberManage/img_frozen_sign.png");
                imgFrozenSign.setName("imgFrozenSign")
                item.addChild(imgFrozenSign)
                imgFrozenSign.setPosition(head.getPosition());
            }else{
                imgFrozenSign.visible = true;
            }
            if(itemData.preRebateFreeze == 3){
                imgFrozenSign.loadTexture("friendCards/memberManage/img_frozen_sign1.png")
            }else{
                imgFrozenSign.loadTexture("friendCards/memberManage/img_frozen_sign.png")
            }
        }else{
            var imgFrozenSignBg = item.getChildByName("imgFrozenSignBg");
            var imgFrozenSign = item.getChildByName("imgFrozenSign");
            if(imgFrozenSignBg){
                imgFrozenSignBg.visible = false;
            }
            if(imgFrozenSign){
                imgFrozenSign.visible = false;
            }
        }*/
    },
    //注意这个会复用
    createMemberItem: function(item,index,data)
    {
        var itemData = data//[index];;
        // 头像
        var head = item.getChildByName("Image_head")
        head.isMask = true;
        head.removeAllChildren();
        this.refreshHead(itemData.headimgurl,head );
        this.setFrozenImg(item,itemData,head)

        // 名称
        var name = item.getChildByName("Text_name");
        name.ignoreContentAdaptWithSize(true);
        name.setFontName("");
        name.setFontSize(name.getFontSize()) //不知道为什么要重新设置一遍 否则字体很小
    
        if(FriendCard_Common.getSkinType() == 2){
            name.setString(getNewName(unescape(itemData.nickname),5));  
        }
        else{
            name.setString(getNewName(unescape(itemData.nickname),6));
        }

        var rank = item.getChildByName("Text_rank");
        if (rank) rank.setVisible(false);

        if (rank && itemData.roleId > 0) {
            rank.setVisible(true);
            rank.ignoreContentAdaptWithSize(true);
            switch(itemData.roleId)
            {
                case 1:
                    rank.setString("会长");
                    break;
                case 3:
                    rank.setString("盟主");
                    break;
                case 2:
                    if(this.curUserGrp == itemData.group || this.isManager)//如果他是组长,并且他是自己组的组长就显示
                        rank.setString("组长");
                    else
                        rank.setVisible(false) 
                    break;
                case 4:
                    if(this.curUserGrp == itemData.group && (this._roleId == 2 || this._roleId == 4))//组长和助理们能看到
                        rank.setString(itemData.assistantNo+"号助理");
                    else
                        rank.setVisible(false)
                    break;
                case 5:
                    rank.setString("管理员");
                    break;
                case 6:
                    rank.setString("超级管理员");
                    break;
            }
        }
        //助理编号
        var Image_bianhao = item.getChildByName("Image_bianhao");
        Image_bianhao.getChildByName("Text").setString(itemData.assistantNo+"");
        Image_bianhao.visible = (this.curUserGrp && itemData.group == this.curUserGrp && itemData.assistantNo  && (this._roleId == 2 || this._roleId == 4));


        //createTime
        var addTime1 = item.getChildByName("Text_addTime1");
        var addTime2 = item.getChildByName("Text_addTime2");
        addTime1.ignoreContentAdaptWithSize(true);
        addTime2.ignoreContentAdaptWithSize(true);
        var timeStr = MjClient.dateFormat(new Date(parseInt(itemData.createTime)), 'yyyy-MM-dd hh:mm:ss');
        timeStr = timeStr.split(" ");
        addTime1.setString(timeStr[0]);
        addTime2.setString(timeStr[1]);
        // 最近一次玩牌时间
        var lastTime = item.getChildByName("Text_lastTime");
        lastTime.ignoreContentAdaptWithSize(true);
        this.setStateStr(lastTime, itemData.status, itemData.lastLoginTime);

        // 玩家ID
        var id = item.getChildByName("Text_ID");
        id.ignoreContentAdaptWithSize(true);
        var idStr = "" + itemData.userId;
        if (itemData.userId != SelfUid() && !this.isManager && 
            !(itemData.group.toString() === FriendCard_Common.isGroupLeader(this.clubInfo)) && 
            !(itemData.refereeId == SelfUid()) && 
            idStr.length > 4){
            idStr = idStr.slice(0, 2) + "******".slice(0, idStr.length - 4) + idStr.slice(-2);
        }
        id.setString(idStr);
        if(!id._standColor){
            id._standColor = id.getTextColor();
        }
        id.setTextColor(id._standColor);
        if (itemData.isDirectly == 1){
            if(FriendCard_Common.getSkinType() == 3){
                id.setTextColor(cc.color("#04a013"));
            }else{
                id.setTextColor(cc.color("#4d58b6"));
            }
        }
        if(itemData.isAgent) {
            if(FriendCard_Common.getSkinType() == 3){
                id.setTextColor(cc.color("#d33c00"));
            }else{
                id.setTextColor(cc.color("#ab3215"));
            }
        }

        //禁止玩牌图片
        var userStop = item.getChildByName("Image_userStop");
        userStop.ignoreContentAdaptWithSize(true);
        userStop.visible = !!((itemData.userStatus & 2) || (itemData.userStatus & 32));

        //备注 remarks
        var remarks = item.getChildByName("Text_remarks");
        remarks.ignoreContentAdaptWithSize(true);
        remarks.visible = true;
        if (itemData.remarkGrp && itemData.group.toString() === this.isGroupLeader) {//如果是组长显示组长的备注
            remarks.setString("(" + itemData.remarkGrp.replace(/\s/g, "") + ")");
        } else if (itemData.remark && this.isManager) {
            remarks.setString("(" + itemData.remark.replace(/\s/g, "") + ")");
        } else {
            remarks.visible = false;
        }

        //分组
        //只有会长和管理员显示分组
        var group = item.getChildByName("Text_group");
        if (this.isManager) {
            if (group && (itemData.group == "0" || itemData.group === null)) {
                group.ignoreContentAdaptWithSize(true);
                group.visible = false;
            } else if (group) {
                group.ignoreContentAdaptWithSize(true);
                group.visible = true;
                group.setString(itemData.group + "组")
                group.setFontSize(22);
            }
        }
        //如果是组长看是否是该组组长 如果是也显示 这里要用"===" 
        else if (group &&  (itemData.group != "0" && itemData.group)  && itemData.group.toString() === FriendCard_Common.isGroupLeader(this.clubInfo)) {
            group.ignoreContentAdaptWithSize(true);
            group.visible = true;
            group.setString(itemData.group + "组")
            group.setFontSize(22);
        } else {
            group.visible = false;
        }

        // 操作
        //是否是管理或者会长
        var operationVisible = (
            (this.isLeader|| 
            (this.isSupperManger && (itemData.roleId != 3 && itemData.roleId != 6))||
            (this.isManager && (itemData.roleId != 3 && itemData.roleId != 1 && itemData.roleId != 6))) ||
            (itemData.group.toString() === this.isGroupLeader && (itemData.roleId != 3 && itemData.roleId != 1))) && itemData.userId != MjClient.data.pinfo.uid;
        
        if(!operationVisible){
            operationVisible = itemData.refereeId == SelfUid();
        }
        var Button_operation = item.getChildByName("Button_operation");
        Button_operation.visible = operationVisible;

        Button_operation._cell = item;
        Button_operation.data = itemData;
        Button_operation.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Chengyuan_Chengyuanliebiao_Caozuo", {uid: SelfUid()});
                this.showMemberManage(sender.data,sender._cell,sender._cell.dataIndex)
            }
        }, this);
        return item;
    },
    requestPreRebateFreeze:function(itemData,freezeAction){
        var that = this;
        MjClient.block();
        var sendInfo = {
            leagueId:that.clubInfo.clubId,
            userId:itemData.userId,
            freezeAction:freezeAction
        }
        MjClient.gamenet.request("pkplayer.handler.leaguePreRebateFreeze", sendInfo, function(rtn)
        {
            MjClient.unblock();
            if (!cc.sys.isObjectValid(that))
                return;
            if(rtn.code == 0){
                itemData.preRebateFreeze = freezeAction;
                that.reLoadCurPanleListUI();
                that.Panle_memberManage.visible = false;
                that.panle_LMListManage.visible = false;
            }
            else
            {
                FriendCard_Common.serverFailToast(rtn);
            }
        });
    },
    initPanle_filtrateMember:function(){
        var that = this
        this.Panle_filtrateMember = this.node.getChildByName("Panle_filtrateMember");
        if(this.Panle_filtrateMember){
            this.Panle_filtrateMember.visible = false;
        }
    },
    reLoadCurPanleListUI:function(){
        if(cc.sys.isObjectValid(this.panelViews[this.showingIndex])){
            if(this.panelViews[this.showingIndex].reloadListUiFunc){
                this.panelViews[this.showingIndex].reloadListUiFunc();
                return this.panelViews[this.showingIndex];
            }
        }
    },
    dealEmptyView:function(panel){
        panel.removeChildByName("emptyTextTip");
        if (!panel._data || !panel._data.list || panel._data.list.length == 0){
            var emptyTxt = new ccui.Text();
            emptyTxt.setFontName("fonts/lanting.TTF");
            emptyTxt.setFontSize(30);
            emptyTxt.setString("暂无数据");
            emptyTxt.setColor(cc.color(0x79, 0x34, 0x12));
            emptyTxt.setName("emptyTextTip");
            emptyTxt.setPosition(panel.width/2,panel.height/2);
            panel.addChild(emptyTxt);
            panel._isLoadingData = false;
            return true;
        }
        return false;
    },
    initEditView:function(panel,hintStr,dw){
        if(!hintStr){
            hintStr = "";
        }
        var image_search = panel.getChildByName("Image_search");
        var edtContentSize= image_search.getContentSize();
        if(dw){
            edtContentSize.width += dw;
        }
        var edt_input = new cc.EditBox(edtContentSize, new cc.Scale9Sprite());
        edt_input.setFontColor(cc.color("#2B344C"));
        edt_input.setPlaceholderFontColor(cc.color(0xFF, 0xFF, 0xFF));
        edt_input.setMaxLength(10);
        edt_input.setFontSize(34);
        edt_input.setInputFlag(cc.EDITBOX_INPUT_FLAG_INITIAL_CAPS_ALL_CHARACTERS);
        edt_input.setInputMode(cc.EDITBOX_INPUT_MODE_ANY);
        edt_input.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
        edt_input.setPlaceHolder("");
        edt_input.setPlaceholderFontSize(34);
        edt_input.setPosition(edtContentSize.width/2, edtContentSize.height/2);
        image_search.addChild(edt_input);
        var hintTxt = new ccui.Text();
        hintTxt.setFontName("fonts/lanting.TTF");
        hintTxt.setName("hintTxt");
        hintTxt.setFontSize(34);
        hintTxt.setString(hintStr);
        hintTxt.defaultText = hintStr;
        hintTxt.defaultColor = cc.color("#b7b7b6")
        hintTxt.setColor(hintTxt.defaultColor);
        hintTxt.setAnchorPoint(0,0.5);
        hintTxt.setPosition(0+10,edt_input.height/2);
        edt_input.addChild(hintTxt);
        edt_input.setDelegate(this);
        return edt_input;
    },
    initSortListItem:function(node,i,eventName){
        if(!node){
            return;
        }
        node.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                postEvent(eventName,{position:node.getTag(),txt:node.getChildByName("Text_sort").getString()});
            }
        });
        var text_sort = node.getChildByName("Text_sort");
        if(text_sort){
            if(FriendCard_Common.getSkinType() == 3) {
                if(i == 0){
                    text_sort.setTextColor(cc.color(FriendCard_Common.getTextColor().red));
                }else{
                    text_sort.setTextColor(cc.color(FriendCard_Common.getTextColor().black));
                }
            }
        }

        var image_bg = node.getChildByName("Image_bg");
        if(image_bg){
            if(i == 0){
                image_bg.visible = true;
            }else{
                image_bg.visible = false;
            }
        }

        var image_selected = node.getChildByName("Image_selected");
        if(image_selected){
            if(FriendCard_Common.getSkinType() != 1){
                image_selected.visible = false;
            }
        }

        UIEventBind(null, node,eventName, function(data) {
            if(FriendCard_Common.getSkinType() == 3){
                if(text_sort){
                    if(data.position == node.getTag()){
                        text_sort.setTextColor(cc.color(FriendCard_Common.getTextColor().red));
                    }else{
                        text_sort.setTextColor(cc.color(FriendCard_Common.getTextColor().black));
                    }
                }
            }
            if(image_bg){
                if (data.position == node.getTag()) {
                    image_bg.visible = true;
                }else{
                    image_bg.visible = false;
                }
            }
            
            if(image_selected){
                if (data.position == node.getTag() && FriendCard_Common.getSkinType() == 1) {
                    image_selected.visible = true;
                }else{
                    image_selected.visible = false;
                }
            }
        }.bind(node));
    },
    initPanleSortView:function(_panel,beginIndex,endIndex,nameFix){
        var that = this;
        if(!nameFix){
            nameFix = ""
        }
        if(!beginIndex){
            beginIndex = 0;
        }
        if(!endIndex){
            endIndex = 10;
        }
        var sortBg = _panel.getChildByName("sortBg"+nameFix)
        var text_sort = sortBg.getChildByName("Text_sort")
        var button_jiaotou = sortBg.getChildByName("Button_jiaotou")
        var sortListBg = _panel.getChildByName("sortListBg"+nameFix);
        sortListBg._beginIndex = beginIndex;
        sortListBg._endIndex = endIndex;
        text_sort.initFontSize = text_sort.getFontSize();
        sortListBg.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                sortListBg.visible = false;
                button_jiaotou.setBright(!sortListBg.visible);
            }
        }, this);
        var sortList = sortListBg.getChildByName("sortList");
        sortList.setScrollBarEnabled(false);
        for (var i = beginIndex ; i < endIndex; i ++){
            var sortNode = sortList.getChildByName("sort"+i);
            if(sortNode){
                sortNode.setTag(i);
               
                if(i == 8){
                    sortNode.removeFromParent();
                }else if(i == 3){
                    sortNode.removeFromParent();
                }else if((i == 5) && this.isAssistants){
                    sortNode.removeFromParent();
                }
                this.initSortListItem(sortNode,i,_panel.sortEventName);
            }
        }
        sortBg.addTouchEventListener(function (sender, type) {
            if (type == 2) {
                sortListBg.visible = !sortListBg.visible;
                button_jiaotou.setBright(!sortListBg.visible);
            }
        }, this);
        UIEventBind(null, sortListBg, _panel.sortEventName, function(data) {
            var sortType = data.position;
            if(sortListBg._beginIndex > sortType || sortListBg._endIndex < sortType){
                return;
            }
            that.setSortInfo(_panel,sortType);
            if(sortType == 0)
                MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Chengyuan_Chengyuanliebiao_Paixuxuanze_Zonghepaixu", {uid:SelfUid()});
            else if(sortType == 1)
                MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Chengyuan_Chengyuanliebiao_Paixuxuanze_Xinjiaruzaiqian", {uid:SelfUid()});
            else if(sortType == 2)
                MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Chengyuan_Chengyuanliebiao_Paixuxuanze_Xinjiaruzaihou", {uid:SelfUid()});
            else if(sortType == 3)
                MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Chengyuan_Chengyuanliebiao_Paixuxuanze_Zhikanguanliyuan", {uid:SelfUid()});
            else if(sortType == 4)
                MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Chengyuan_Chengyuanliebiao_Paixuxuanze_Zhikanduijuzhong", {uid:SelfUid()});
            else if(sortType == 5)
                MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Chengyuan_Chengyuanliebiao_Paixuxuanze_Zhikanzaixian", {uid:SelfUid()});
            else if(sortType == 6)
                MjClient.native.umengEvent4CountWithProperty("Qinyouquan_Chengyuan_Chengyuanliebiao_Paixuxuanze_Zhikanlixian", {uid:SelfUid()});
            sortListBg.visible = false;
            button_jiaotou.setBright(!sortListBg.visible);
            text_sort.setString(data.txt+"");
            if (text_sort.getString().length > 4) {
                text_sort.setFontSize(text_sort.initFontSize - 5)
            } else {
                text_sort.setFontSize(text_sort.initFontSize)
            }
            if(_panel.updateEventName){
                postEvent(_panel.updateEventName);
            }
        });
    },
    setSortInfo:function(_panel,sortType){
        var that= this;
        if(sortType){
            switch(sortType){
                case 0:
                    that["sort_sort_"+_panel.keyName] = 0;
                    that["sort_type_"+_panel.keyName] = 0;
                    that["sort_state_"+_panel.keyName] = 0;
                    break;
                case 1:
                    that["sort_sort_"+_panel.keyName] = 1;
                    that["sort_type_"+_panel.keyName] = 0;
                    that["sort_state_"+_panel.keyName] = 0;
                    break;
                case 2:
                    that["sort_sort_"+_panel.keyName] = 2;
                    that["sort_type_"+_panel.keyName] = 0;
                    that["sort_state_"+_panel.keyName] = 0;
                    break;
                case 3:
                    that["sort_sort_"+_panel.keyName] = 0;
                    that["sort_type_"+_panel.keyName] = 1;
                    that["sort_state_"+_panel.keyName] = 0;
                    break;
                case 4:
                    that["sort_sort_"+_panel.keyName] = 0;
                    that["sort_type_"+_panel.keyName] = 0;
                    that["sort_state_"+_panel.keyName] = 1;
                    break;
                case 5:
                    that["sort_sort_"+_panel.keyName] = 0;
                    that["sort_type_"+_panel.keyName] = 0;
                    that["sort_state_"+_panel.keyName] = 3;
                    break;
                case 6:
                    that["sort_sort_"+_panel.keyName] = 0;
                    that["sort_type_"+_panel.keyName] = 0;
                    that["sort_state_"+_panel.keyName] = 4;
                    break;
                case 7:
                    that["sort_sort_"+_panel.keyName] = 0;
                    that["sort_type_"+_panel.keyName] = 0;
                    that["sort_state_"+_panel.keyName] = 2;
                    break;
                case 8:
                    that["sort_sort_"+_panel.keyName] = 0;
                    that["sort_type_"+_panel.keyName] = 2;
                    that["sort_state_"+_panel.keyName] = 0;
                    break;
                case 9:
                    that["sort_sort_"+_panel.keyName] = 11;
                    that["sort_type_"+_panel.keyName] = 0;
                    that["sort_state_"+_panel.keyName] = 0;
                    break;
                case 98:
                    that._checkGroupType = that.isGroupLeader;
                    break;
                case 99:
                    that._checkGroupType = "全部";
                    break;
                case 100:
                    that["sort_type_"+_panel.keyName] = 0;
                    that["sort_type_zhuLi_"+_panel.keyName] = 3;
                    that._checkRangeType = 4;
                    break;
                case 101:
                    that["sort_type_"+_panel.keyName] = 0;
                    that["sort_type_zhuLi_"+_panel.keyName] = 0;
                    that._checkRangeType = 0;
                    break;
            }
        }else{
            that["sort_sort_"+_panel.keyName] = 0;
            that["sort_type_"+_panel.keyName] = 0;
            that["sort_state_"+_panel.keyName] = 0;
        }
         if( that["sort_type_zhuLi_"+_panel.keyName]){
            that["sort_type_"+_panel.keyName] = that["sort_type_zhuLi_"+_panel.keyName]
        }
    },
    onExit: function () {
        if(FriendCard_Common.getSkinType() == 3 && MjClient.FriendCard_main_ui)
        {
            MjClient.FriendCard_main_ui.bottomBtnDelLight()
        }
        this._super();
        MjClient.friendCard_member_ui = null;
    },

});


