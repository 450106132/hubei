/****
 * 对象缓冲池，为了解决重复创建多个对象时候，卡顿现象
 * @type {{_pool: {}, putInPool: CommonPool.putInPool, hasObject: CommonPool.hasObject, removeObject: CommonPool.removeObject, getFromPool: CommonPool.getFromPool, _releaseCB: CommonPool._releaseCB, _autoRelease: CommonPool._autoRelease, drainAllPools: CommonPool.drainAllPools}}
 */


var CommonPool = {
    _pool: {},
    /**
     * Put the obj in pool
     * @param obj
     */
    putInPool: function (obj) {
        var name = "default";
        if(obj.getName)
        {
            name = obj.getName();
        }

        if (!this._pool[name]) {
            this._pool[name] = [];
        }
        // JSB retain to avoid being auto released
        cc.sys.isObjectValid(obj) && obj.retain && obj.retain();

        this._pool[name].push(obj);
    },

    /**
     * Check if this kind of obj has already in pool
     * @param objClass
     * @returns {boolean} if this kind of obj is already in pool return true,else return false;
     */
    hasObject: function (objName) {

        var list = this._pool[objName];
        if (!list || list.length === 0) {
            return false;
        }
        return true;
    },


    /**
     * Remove the obj if you want to delete it;
     * @param obj
     */
    removeObject: function (obj) {
        var name = "default";
        if(obj.getName)
        {
            name = obj.getName();
        }
        if (name) {
            var list = this._pool[name];
            if (list) {
                for (var i = 0; i < list.length; i++) {
                    if (obj === list[i]) {
                        // JSB release to avoid memory leak
                        obj.release && obj.release();
                        list.splice(i, 1);
                    }
                }
            }
        }
    },


    /**
     * Get the obj from pool
     * @param args
     * @returns {*} call the reuse function an return the obj
     */
    getFromPool: function (objName) {
        if (this.hasObject(objName)) {
            var list = this._pool[objName];
            var obj = list.shift();

            // JSB release to avoid memory leak
            cc.sys.isNative && obj.release && this._autoRelease(obj);
            if (cc.sys.isObjectValid(obj)) {
                return obj;
            }
        }
        return null;
    },

    _releaseCB: function () {
        this.release();
    },

    _autoRelease: function (obj) {
        var running = obj._running === undefined ? false : !obj._running;
        cc.director.getScheduler().schedule(this._releaseCB, obj, 0, 0, 0, running)
    },

    /**
     *  remove all objs in pool and reset the pool
     */
    drainAllPools: function () {
        for (var i in this._pool) {
            for (var j = 0; j < this._pool[i].length; j++) {
                var obj = this._pool[i][j];
                // JSB release to avoid memory leak
                obj.release && obj.release();
            }
        }
        this._pool = {};
    }

};