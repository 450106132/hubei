/**
 * Created by maoyu on 2018/3/30.
 */

var h5 = h5 || {};


h5.clipboardHelper = {

    setClipboard : function (text) {
        var username = document.createElement("input");
        username.value = text;
        document.body.appendChild(username);
        username.select();
        document.execCommand("Copy");
        document.body.removeChild(username);

    },

    getClipboard : function () {

    }

};

