function MJNet()
{
	var pomelo_ioError="io-error";
	var pomelo_onKick="onKick";
	var pomelo_error="error";
	var pomelo_close="close";
	var pomelo_disconnect="disconnect";
	var pomelo_reconnect="reconnect";
	var pomelo_heartbeatTimeout="heartbeat timeout";

    var pomelo = window.pomelo;
   
    var  reqPingPong=[];
	var  reqStart=Date.now();
	var  lastTableCmd=null;
    var pendingRequest={};
    function ComputePingPong()
	{
	   reqPingPong.push(Date.now()-reqStart); if(reqPingPong.length>5) reqPingPong.splice(0,1);
	   var pingpong=0;
	   for(var i=0;i<reqPingPong.length;i++) pingpong+=reqPingPong[i];
	   MjClient.reqPingPong=pingpong/reqPingPong.length;
	}
    this.SetCallBack = function (evt,cb)
    {
        pomelo.off(evt);
		if(cb)
        pomelo.on(evt, function (data) 
		{
			delete pendingRequest[evt];//默认删掉同名请求
            for (var req in TableMsgReqRespMapping) {
                if (req.indexOf('*') >= 0){//有通配符
                    var replaceReq = req.replace('*', '');
                    var arrResp = TableMsgReqRespMapping[req];
                    for (var i=0; i<arrResp.length; i++)
                    {
                        var replaceResp = arrResp[i].replace('*', '');
                        if (evt.indexOf(replaceResp) >= 0){
                            var replaceEvt = evt.replace(replaceResp, replaceReq);
                            delete pendingRequest[replaceEvt];
                        }
                    }
                }
                else{
                    if (TableMsgReqRespMapping[req].indexOf(evt) >= 0){
                        delete pendingRequest[req];//删掉映射表对应的请求
                    }
                }
            }
			if(lastTableCmd==evt) {lastTableCmd=null; ComputePingPong();}
			if(cc.sys.OS_WINDOWS==cc.sys.os && evt != 'MJTick') cc.log(evt+"@"+JSON.stringify(data));
			cb(data);
		});
    }
	
	this.QueueNetMsgCallback=function(evt)
	{
		this.SetCallBack(evt,function(d){
			//if (MjClient.getAppType() == MjClient.APP_TYPE.QXXZMJ
             //   || MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP
			//)
			{
				//使用新的事件循环机制
				MjClient.Scene.pushQueueNetMsg([evt,d]);
			}
			//else
			//{
			//	postEvent("QueueNetMsg",[evt,d]);
			//}
		});
	}
	

    this.connect = function (host,port,f_ok,f_fail)
    {
		var that = this;
		reqPingPong=[];
        pendingRequest={};
		pomelo.disconnect();
		this.SetCallBack(pomelo_disconnect,f_fail);
        pomelo.init({
            host: host,
            port: port,
            log: false,
			connectingTimeout:2*1000
        }, f_ok);

    }
    this.disconnect=function()
	{
		this.SetCallBack(pomelo_disconnect);
		pomelo.disconnect();
	}
	this.isConnected=function()
	{
		return pomelo.isConnected();
	}
    this.request = function( type,msg,cb )
    {
	   try
	   {    
			reqStart=Date.now();
			if (arguments.length == 2)
			{
				pomelo.notify(type, msg);
				lastTableCmd=null;
				if(type=="pkroom.handler.tableMsg")
				{
					lastTableCmd=msg.cmd;
					if (pomelo.isConnected()
                        && TableMsgReqExclude.indexOf(msg.cmd) < 0
                        && !(GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_HU_ZI && msg.cmd != "MJPut")//字牌只检查MJPut
                    ){
						pendingRequest[msg.cmd] = 0;
					}
				}
			}
			else
			{
			   pomelo.request(type, msg, function(rtn)
			   {
				   if (type=="pkroom.handler.tableMsg") delete pendingRequest[msg.cmd];
			       ComputePingPong();
				   //if(cc.sys.OS_WINDOWS==cc.sys.os)
					   //cc.log(type+" # "+(Date.now()-reqStart)+" "+JSON.stringify(rtn));
				   cb(rtn);
			   });
				if (type=="pkroom.handler.tableMsg"
                    && pomelo.isConnected()
                    && TableMsgReqExclude.indexOf(msg.cmd) < 0
                    && !(GameClass[MjClient.gameType] == MjClient.GAME_CLASS.PAO_HU_ZI && msg.cmd != "MJPut")//字牌只检查MJPut
                ){
					pendingRequest[msg.cmd] = 0;
				}
			}
	  }catch(e){  postEvent("disconnect",2); }
    }
	this.resetCallback=function()
	{
		this.SetCallBack(pomelo_ioError, function (data) { });
		this.SetCallBack(pomelo_onKick, function (data) { });
		this.SetCallBack(pomelo_error, function (data) { });
		this.SetCallBack(pomelo_close, function (data) { });
		this.SetCallBack(pomelo_disconnect, function (data){ });
		this.SetCallBack(pomelo_reconnect, function (data){ });
		this.SetCallBack(pomelo_heartbeatTimeout, function(){ });
	}
    this.resetCallback();	
	//Object.defineProperty(this,"connected",{get:function(){return 1==pomelo.socket.readyState;}});

    setInterval(function()
    {
        for (var cmd in pendingRequest)
        {
            pendingRequest[cmd]++;
            if (pendingRequest[cmd] >= 7)
            {
                cc.log("pendingRequest timeout! "+JSON.stringify(pendingRequest));
                pendingRequest = {};
                if (isJinZhongAPPType()
				|| MjClient.getAppType() == MjClient.APP_TYPE.QXYYQP || MjClient.getAppType() == MjClient.APP_TYPE.HUBEIMJ || MjClient.getAppType() == MjClient.APP_TYPE.YLHUNANMJ)
                {
                    MjClient.showToast("网络中断，正在重连...(" + cmd + ")");
                    this.disconnect();
                    postEvent("disconnect",6);
                    MjClient.native.umengEvent4CountWithProperty("Paijunei_Dduanxianchonglian_Test", {uid:SelfUid()});
                }
                return;
            }
        }
    }.bind(this), 1000);
}


//针对tableMsg请求响应中，不需要检查完整请求响应的cmd的数组
//特殊情况下，只有请求，没有对应的响应，也需要添加进表
var TableMsgReqExclude = [
    "MJTick",
    "MJPass",
    "PKPass",
    "PKWrongful",
	"MJJiazhu",
    "c2s_sdhMaiPai",
    "c2s_sdhTouXiang"
];



//tableMsg消息里面的cmd名称，请求和响应的映射表。表示一次完整的请求响应
//cmd相同则不需要添加，不同则需要添加进表
//key为请求cmd，value为服务器响应消息名
var TableMsgReqRespMapping = {};
TableMsgReqRespMapping["MJBBhu"] = ["loadOther"];
TableMsgReqRespMapping["MJChi"] = ["loadOther"];
TableMsgReqRespMapping["MJPeng"] = ["loadOther"];
TableMsgReqRespMapping["MJGang"] = ["loadOther"];
TableMsgReqRespMapping["MJHu"] = ["loadOther", "roundEnd"];
TableMsgReqRespMapping["MJPass"] = ["onlinePlayer"];
TableMsgReqRespMapping["selectDir"] = ["selectDir_event"];
TableMsgReqRespMapping["DelRoom"] = ["roundEnd", "endRoom"];
TableMsgReqRespMapping["sendLocationApps"] = ["locationApps"];
TableMsgReqRespMapping["c2s*"] = ["s2c*"];
TableMsgReqRespMapping["c2s_playerShuffleIndex"] = ["select_shuffle_index"];
TableMsgReqRespMapping["c2s_playerShuffleFinish"] = ["after_ready"];
TableMsgReqRespMapping["c2s_duZhanRet"] = ["duZhanSelectRet"];
TableMsgReqRespMapping["MJPut"] = ["MJFlower"];