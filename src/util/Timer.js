var util = util || {};

util.Timer = {
    sTime : 0,
    cTime : 0,

    /**
     * 设置服务器时间
     * @param st (毫秒)
     */
    setServerTime : function(st){
        this.sTime = st;
        this.cTime = Date.now();
    },
    /**
     * 获取服务器时间 可能有误差
     * @returns {number}
     */
    getServerTimeNow : function(){
        var gapT = Date.now() - this.cTime;
        return this.sTime + gapT;
    },

    /**
     * 获取倒计时
     * @param time 计时器到达的服务器时间
     * @returns {number} 剩余秒
     */
    getCountdownByTime : function(time){
        var st = this.getServerTimeNow();
        return parseInt((time - st) / 1000) ;
    }
};

// 是否是对象(非数组 null)
util.isObject = function(obj) {
    // return !!obj && !Array.isArray(obj) && typeof obj === 'object';
    // console.log(toString.call(obj));
    return toString.call(obj) === '[object Object]';
};

util.inherits = function(ctor, superCtor) {
    if (ctor == undefined || superCtor == undefined || superCtor.prototype === undefined) {
        return;
    }

    ctor.super_ = superCtor;
    ctor.prototype = Object.create(superCtor.prototype, {});
};

// object继承
util.assign = function(obj, superObj) {
    if (!this.isObject(obj) || !this.isObject(superObj)) {
        return;
    }

    for (var k in superObj) {
        if (this.isObject(superObj[k])) {
            obj.hasOwnProperty(k) || (obj[k] = {});
            this.assign(obj[k], superObj[k]);
        } else {
            obj[k] === undefined && (obj[k] = superObj[k]);
        }
    }
};

// 深冻结
util.deepFreeze = function(obj) {
    Object.freeze(obj);
    for (var k in obj) {
        if (obj.hasOwnProperty(k) && !!obj[k] && typeof obj[k] === 'object') {
            this.deepFreeze(obj[k]);
        }
    }
};

util.bindUiAndLogicMajiang = function (node, jsBind){
    if(node==null) return;
    for(var key in jsBind){
        if(key.substr(0,1)=="_"){
            var func = FunctionBind[key];
            if(func) func(jsBind, node, jsBind[key]);
        }else if(typeof(jsBind[key]) === "function"){
            node[key] = jsBind[key]; 
        }else{
            this.bindUiAndLogicMajiang(node.getChildByName(key), jsBind[key]);
        }
    }
    jsBind._node = node;
};

/**
 *  主要对于图片路径的赋值
 **/
util.clone = function(originalNode){
    var copyNode = originalNode.clone();

    if(originalNode.getRenderFile && originalNode.getRenderFile().file != ""){
        copyNode.loadTexture(originalNode.getRenderFile().file);
    }

    var setTexture = function(searchNode, setNode){
        var children = searchNode.children;
        for(var i = 0;i < children.length;i++){
            var child = children[i];
            var setChild = setNode.getChildByName(child.getName());
            if(child.getRenderFile){
                var textureFile = child.getRenderFile().file;
                if(textureFile !== "" && setChild.loadTexture){
                    setChild.loadTexture(textureFile);
                }
            }
            setTexture(child, setChild);
        }
    };
    setTexture(originalNode, copyNode);
    return copyNode;
};

function test() {
    // 打印带函数的对象 (测试用 有bug)
    var log = function(obj) {
        function stringify (obj) {
            for (var k in obj) {
                if (typeof obj[k] === 'object') {
                    stringify(obj[k]);
                } else if (typeof obj[k] === 'function') {
                    obj[k] = obj[k].toString();
                }
            }
        }
        stringify(obj);

        console.log(JSON.stringify(obj));
    };

    var a = {
        head: {
            _layout: [[1, 1]],
            _run: function() {

            },
            _event: {
                mjhand: function() {

                }
            },
            name: {

            }
        }
    };

    var b = {
        head: {
            _layout: [[2, 2]],
            _run: function() {
                console.log("2");
            },
            _event: {
                push: function() {
                    console.log("3");
                }
            }
        }
    }

    util.assign(b, a);
    log(b);
}
// test();