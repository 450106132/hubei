/**
 * Created by maoyu on 2018/3/30.
 */

var h5 = h5 || {};

h5.weixinHelper = {

    //微信登录，获取用户信息
    //异步返回的结果通过事件来通知
    wxLogin: function() {
        var urlPrev = document.location.protocol + '//' + window.location.host;
        var url = urlPrev + '/common/user/info';
        var data = {}
        var str = window.location.href.split('?')[1];
        var arr = str.split('&');
        var params = {};
        for (var i = 0; i < arr.length; i++) {
            var v = arr[i].split('=');
            if (v[0] == 'state') continue;
            params[v[0]] = v[1];
        }

        var that = this;
        this._httpRrquest(url, params, "POST", function(userinfo)
        {
            postEvent("WX_USER_LOGIN", JSON.stringify(userinfo.data));

            //配置jssdk
            var url_jssdk = "https://" + AppEnv[MjClient.getAppType()] + "-member.jtcfgame.com/common/weixin/ticket?url=https://" + AppEnv[MjClient.getAppType()] + "-member.jtcfgame.com/html/h5/index.html";
            that._httpRrquest(url_jssdk, {}, "GET", function(res)
            {
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: res.data.appId, // 必填，公众号的唯一标识
                    timestamp: res.data.timestamp, // 必填，生成签名的时间戳
                    nonceStr: res.data.noncestr, // 必填，生成签名的随机串
                    signature: res.data.signature,// 必填，签名，见附录1
                    jsApiList: [
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage',
                        'startRecord',
                        'stopRecord',
                        'onVoiceRecordEnd',
                        'playVoice',
                        'pauseVoice',
                        'stopVoice',
                        'onVoicePlayEnd',
                        'getLocation',
                        'openLocation',
                        'uploadVoice',
                        'downloadVoice',
                        'translateVoice',
                        'chooseImage',
                        'previewImage',
                        'uploadImage',
                        'downloadImage'
                    ]
                });
                wx.ready(function(){
                    cc.log(" wx.config ready");
                });
                wx.error(function(res){
                    cc.log(" wx.config error");
                });

            });
        });
    },

    _httpRrquest: function (url, opt, methods, callback) {
        methods = methods || 'POST';
        var xmlHttp = cc.loader.getXMLHttpRequest();
        var params = [];
        for (var key in opt) {
            if (!!opt[key] || opt[key] === 0) {
                params.push(key + '=' + opt[key]);
            }
        };
        var postData = params.join('&');
        if (methods.toUpperCase() === 'POST') {
            xmlHttp.open('POST', url, true);
            xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
            xmlHttp.send(postData);
        } else if (methods.toUpperCase() === 'GET') {
            xmlHttp.open('GET', url + '?' + postData, true);
            xmlHttp.setRequestHeader('id', '123456');
            xmlHttp.setRequestHeader('token', 'abcdefg');
            xmlHttp.send(null);
        } else if (methods.toUpperCase() === 'DELETE') {
            xmlHttp.open('DELETE', url + '?' + postData, true);
            xmlHttp.send(null);
        }
        //xmlhttp.timeout=2000;//请求超时时间（毫秒）
        //xmlhttp.ontimeout = function() {//请求超时,执行函数
        //    alert("请求超时,请稍后再试~")
        // }
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4) {//响应准备就绪
                if (xmlHttp.status >= 200 && xmlHttp.status < 400) {
                    callback(JSON.parse(xmlHttp.responseText));
                } else {
                }
            }
        }
    },


    _getImgUrl:function()
    {
        var AppImgUrl = {};
        AppImgUrl[MjClient.APP_TYPE.QXJSMJ] = "http://image.jtcfgame.com/icon/icon_js.png";
        AppImgUrl[MjClient.APP_TYPE.QXHAMJ] = "http://image.jtcfgame.com/icon/icon_ha.png";
        AppImgUrl[MjClient.APP_TYPE.QXXZMJ] = "http://image.jtcfgame.com/icon/icon_xz.png";
        AppImgUrl[MjClient.APP_TYPE.QXYYQP] = "http://image.jtcfgame.com/icon/icon_yy.png";
        AppImgUrl[MjClient.APP_TYPE.QXHAIANMJ] = "http://image.jtcfgame.com/icon/icon_haian.png";
        AppImgUrl[MjClient.APP_TYPE.TXJINZHONGMJ] = "http://image.jtcfgame.com/icon/icon_jz.png";
        AppImgUrl[MjClient.APP_TYPE.TXLVLIANGMJ] = "http://image.jtcfgame.com/icon/icon_lvliangn.png";
        AppImgUrl[MjClient.APP_TYPE.TXLINFENMJ] = "http://image.jtcfgame.com/icon/icon_linfen.png";
        AppImgUrl[MjClient.APP_TYPE.YLHUNANMJ] = "http://image.jtcfgame.com/icon/icon_yongli.png";
        AppImgUrl[MjClient.APP_TYPE.AYGUIZHOUMJ] = "http://image.jtcfgame.com/icon/icon_guizhou.png";
        AppImgUrl[MjClient.APP_TYPE.LYSICHUANMJ] = "http://image.jtcfgame.com/icon/icon_sichuan.png";
        AppImgUrl[MjClient.APP_TYPE.HUBEIMJ] = "http://image.jtcfgame.com/icon/icon_hubei.png";
        return AppImgUrl[MjClient.getAppType()];
    },



    wxShareUrlToPYQ: function(url, title, imgUrl)
    {
        imgUrl = imgUrl || this._getImgUrl();
        wx.onMenuShareTimeline({
            title: title, // 分享标题
            link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: imgUrl, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
                postEvent("WX_SHARE_SUCCESS", "{errCode:0}");
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
                postEvent("WX_SHARE_SUCCESS", "{errCode:1}");
            }
        });
    },


    wxShareUrl: function(url, title, description, imgUrl)
    {
        imgUrl = imgUrl || this._getImgUrl();
        wx.onMenuShareAppMessage({
            title: title, // 分享标题
            desc: description, // 分享描述
            link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: imgUrl, // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                // 用户确认分享后执行的回调函数
                postEvent("WX_SHARE_SUCCESS", "{errCode:0}");
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
                postEvent("WX_SHARE_SUCCESS", "{errCode:1}");
            }
        });
    },



    startRecord:function()
    {
        wx.startRecord();
        wx.onVoiceRecordEnd({
        // 录音时间超过一分钟没有停止的时候会执行 complete 回调
            complete: function (res) {
                var localId = res.localId;
                postEvent("uploadRecord", ""+localId);
            }
        });
    },
    endRecord:function(eventName)
    {
        wx.stopRecord({
            success: function (res) {
                var localId = res.localId;
                if (eventName == "uploadRecord")
                {
                    postEvent("uploadRecord", ""+localId);
                }
            }
        });
    },
    uploadRecord:function(localId, eventName)
    {
        wx.uploadVoice({
            localId: localId, // 需要上传的音频的本地ID，由stopRecord接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: function (res) {
                var serverId = res.serverId; // 返回音频的服务器端ID
                postEvent(eventName, ""+serverId);
            }
        });
    },
    downloadRecord:function(serverId, eventName)
    {
        wx.downloadVoice({
            serverId: serverId, // 需要下载的音频的服务器端ID，由uploadVoice接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: function (res) {
                var localId = res.localId; // 返回音频的本地ID
                postEvent(eventName, ""+localId);
            }
        });
    },
    playRecord:function(localId)
    {
        wx.playVoice({
            localId: localId // 需要播放的音频的本地ID，由stopRecord接口获得
        });
    },



    pay:function(jsonString)
    {
        var jsonObj = JSON.parse(jsonString);
        wx.chooseWXPay({
            timestamp: jsonObj.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
            nonceStr: jsonObj.nonceStr, // 支付签名随机串，不长于 32 位
            package: jsonObj.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
            signType: jsonObj.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
            paySign: jsonObj.paySign, // 支付签名
            success: function (res) {
                // 支付成功后的回调函数
                var json = {
                    result:0,
                    platform:1,
                    msg:"成功"
                };
                postEvent("appPayFinished", JSON.stringify(json));
            }
        });
    }
};



