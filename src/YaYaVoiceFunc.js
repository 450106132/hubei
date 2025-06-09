/**
 * Created by Administrator on 2017/6/21/021.
 */

MjClient.native.yayaVoiceEvent = {
    EVENT_JOIN_ROOM:"EventJoinRoom", //加入房间，{uid:123123}
    EVENT_LEAVE_ROOM:"EventLeaveRoom", //离开房间，{uid:123123}
    EVENT_OPEN_MIC:"EventOpenMic", //自己打开了麦克风
    EVENT_CLOSE_MIC:"EventCloseMic", //自己关闭了麦克风
    EVENT_ROOM_USERS:"EventRoomUsers" //语音房间里面的用户id，{uids:[123123, 231123, 111232]}
};

MjClient.native.yayaVoice =
{
    // 是否在语音房间里
    _isOpenVoice:false,  
    joinRoom:function(roomID)
    {
        if ((cc.sys.OS_ANDROID == cc.sys.os && !isCurrentNativeVersionBiggerThan("26.2.0")) ||
            (cc.sys.OS_IOS == cc.sys.os && !isCurrentNativeVersionBiggerThan("21.0.0")))
        {
            MjClient.showMsg("请下载最新游戏客户端来使用实时语音功能", function () {
                MjClient.native.OpenUrl(MjClient.remoteCfg.wxShareUrl);
            }, function () {});
            return;
        }

        try
        {
            if ( cc.sys.OS_ANDROID == cc.sys.os )
            {
                jsb.reflection.callStaticMethod("org.cocos2dx.javascript.YaYaVoiceHelper", "joinRoom", "(Ljava/lang/String;Ljava/lang/String;)V", String(roomID), String(SelfUid()));
            }
            else if (cc.sys.OS_IOS==cc.sys.os)
            {
                jsb.reflection.callStaticMethod("AppController","yayaJoinRoom:AndUserID:", String(roomID), String(SelfUid()));
            }
            else if (cc.sys.OS_WINDOWS==cc.sys.os)
            {
                postEvent(MjClient.native.yayaVoiceEvent.EVENT_JOIN_ROOM, {uid:SelfUid()});
            }
        }
        catch (e)
        {
            MjClient.native.HelloOC("yayaJoinRoom throw: " + JSON.stringify(e));
        }
    }
    ,leaveRoom:function()
    {
        if ((cc.sys.OS_ANDROID == cc.sys.os && !isCurrentNativeVersionBiggerThan("26.2.0")) ||
            (cc.sys.OS_IOS == cc.sys.os && !isCurrentNativeVersionBiggerThan("21.0.0")))
        {
            MjClient.showMsg("请下载最新游戏客户端来使用实时语音功能", function () {
                MjClient.native.OpenUrl(MjClient.remoteCfg.wxShareUrl);
            }, function () {});
            return;
        }

        try
        {
            if ( cc.sys.OS_ANDROID == cc.sys.os )
            {
                jsb.reflection.callStaticMethod("org.cocos2dx.javascript.YaYaVoiceHelper", "leaveRoom", "()V");
            }
            else if (cc.sys.OS_IOS==cc.sys.os)
            {
                jsb.reflection.callStaticMethod("AppController","yayaLeaveRoom");
            }
            else if (cc.sys.OS_WINDOWS==cc.sys.os)
            {
                postEvent(MjClient.native.yayaVoiceEvent.EVENT_LEAVE_ROOM, {uid:SelfUid()});
            }
        }
        catch (e)
        {
            MjClient.native.HelloOC("yayaLeaveRoom throw: " + JSON.stringify(e));
        }
    }
    ,openMic:function()
    {
        if ((cc.sys.OS_ANDROID == cc.sys.os && !isCurrentNativeVersionBiggerThan("26.2.0")) ||
            (cc.sys.OS_IOS == cc.sys.os && !isCurrentNativeVersionBiggerThan("21.0.0")))
        {
            MjClient.showMsg("请下载最新游戏客户端来使用实时语音功能", function () {
                MjClient.native.OpenUrl(MjClient.remoteCfg.wxShareUrl);
            }, function () {});
            return;
        }

        try
        {
            if ( cc.sys.OS_ANDROID == cc.sys.os )
            {
                jsb.reflection.callStaticMethod("org.cocos2dx.javascript.YaYaVoiceHelper", "openMic", "()V");
            }
            else if (cc.sys.OS_IOS==cc.sys.os)
            {
                jsb.reflection.callStaticMethod("AppController","yayaOpenMic");
            }
            else if (cc.sys.OS_WINDOWS==cc.sys.os)
            {
                postEvent(MjClient.native.yayaVoiceEvent.EVENT_OPEN_MIC, {uid:SelfUid()});
            }
        }
        catch (e)
        {
            MjClient.native.HelloOC("yayaOpenMic throw: " + JSON.stringify(e));
        }
    }
    ,closeMic:function()
    {
        if ((cc.sys.OS_ANDROID == cc.sys.os && !isCurrentNativeVersionBiggerThan("26.2.0")) ||
            (cc.sys.OS_IOS == cc.sys.os && !isCurrentNativeVersionBiggerThan("21.0.0")))
        {
            MjClient.showMsg("请下载最新游戏客户端来使用实时语音功能", function () {
                MjClient.native.OpenUrl(MjClient.remoteCfg.wxShareUrl);
            }, function () {});
            return;
        }

        try
        {
            if ( cc.sys.OS_ANDROID == cc.sys.os )
            {
                jsb.reflection.callStaticMethod("org.cocos2dx.javascript.YaYaVoiceHelper", "closeMic", "()V");
            }
            else if (cc.sys.OS_IOS==cc.sys.os)
            {
                jsb.reflection.callStaticMethod("AppController","yayaCloseMic");
            }
            else if (cc.sys.OS_WINDOWS==cc.sys.os)
            {
                postEvent(MjClient.native.yayaVoiceEvent.EVENT_CLOSE_MIC, {uid:SelfUid()});
            }
        }
        catch (e)
        {
            MjClient.native.HelloOC("yayaCloseMic throw: " + JSON.stringify(e));
        }
    }
    ,getRoomUsers:function()
    {
        if ((cc.sys.OS_ANDROID == cc.sys.os && !isCurrentNativeVersionBiggerThan("26.2.0")) ||
            (cc.sys.OS_IOS == cc.sys.os && !isCurrentNativeVersionBiggerThan("21.0.0")))
        {
            MjClient.showMsg("请下载最新游戏客户端来使用实时语音功能", function () {
                MjClient.native.OpenUrl(MjClient.remoteCfg.wxShareUrl);
            }, function () {});
            return;
        }

        try
        {
            if ( cc.sys.OS_ANDROID == cc.sys.os )
            {
                jsb.reflection.callStaticMethod("org.cocos2dx.javascript.YaYaVoiceHelper", "getRoomUsers", "()V");
            }
            else if (cc.sys.OS_IOS==cc.sys.os)
            {
                jsb.reflection.callStaticMethod("AppController","yayaGetRoomUsers");
            }
            else if (cc.sys.OS_WINDOWS==cc.sys.os)
            {
                postEvent(MjClient.native.yayaVoiceEvent.EVENT_ROOM_USERS, {uids:[SelfUid()]});
            }
        }
        catch (e)
        {
            MjClient.native.HelloOC("yayaGetRoomUsers throw: " + JSON.stringify(e));
        }
    }
};