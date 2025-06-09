var util = util || {};

util.localStorageEncrypt = {
		_encryptEnable : false,
		_preEncryptString : '',
		_keyValueCache : {},
		
		setItem : function(key, value) {
			
			if (cc.isNumber(value)) {
				value = value.toString();
			}
			else if (value === true) {
				value = 'true';
			}
			else if (value === false) {
				value = 'false';
			}

			if (cc.isUndefined(key)){
				key = "undefined";
				cc.log("WARNING: !!!!!!!! util.localStorageEncrypt.setItem("+key+","+value+") !!!!!!!!");
			}
			
			if (this._keyValueCache[key] == value)
				return;

			if (this._encryptEnable)
			{
				var keyStr = this._preEncryptString + key;
				var keystr = util.md5.hex_md5(keyStr);
				var valuestr = util.base64.base64encode(util.base64.base64encode(value));
				cc.sys.localStorage.setItem(keystr, valuestr);
			}
			else
			{
				cc.sys.localStorage.setItem(key, value);
			}

			this._keyValueCache[key] = value;
		},
		
		
		setNumberItem : function(key, value) {
			this.setItem(key, value);
		},
		
		
		setStringItem : function(key, value) {
			this.setItem(key, value);
		},
		
		
		setBoolItem : function(key, value) {
			this.setItem(key, value);
		},
		
		
		getStringItem : function(key, defaultValue) {
			var ret = '';
			if (cc.isString(defaultValue) ) {
				ret = defaultValue;
			}

			if (cc.isUndefined(key)){
				key = "undefined";
				cc.log("WARNING: !!!!!!!! util.localStorageEncrypt.getStringItem("+key+","+defaultValue+") !!!!!!!!");
			}

			if (key in this._keyValueCache)
				return this._keyValueCache[key];
			
			if (this._encryptEnable) {
				var keyStr = this._preEncryptString + key;
				var keystr = util.md5.hex_md5(keyStr);
				var valuestr = cc.sys.localStorage.getItem(keystr);
				if (valuestr) {
					ret = util.base64.base64decode(util.base64.base64decode( valuestr ));
					this._keyValueCache[key] = ret;
				}
			}
			else {
				var valuestr = cc.sys.localStorage.getItem(key);
				if (valuestr) {
					ret = valuestr;
					this._keyValueCache[key] = ret;
				}
			}

			return ret;
		},
		
		
		getBoolItem : function(key, defaultValue) {
			var ret = false;
			if (defaultValue === true || defaultValue === false) {
				ret = defaultValue;
			}
			
			var retstr = this.getStringItem(key, ret ? 'true' : 'false');
			if (retstr === 'true') {
				ret = true;
			}
			else if (retstr === 'false') {
				ret = false;
			}
			
			return ret;
		},
		
		
		getNumberItem : function(key, defaultValue) {
			var ret = 0;
			if (cc.isNumber(defaultValue)) {
				ret = defaultValue;
			}
			var retstr = this.getStringItem(key, ret.toString());
			var retnum = Number(retstr);
			if (cc.isNumber(retnum)) {
				ret = retnum;
			}
			return ret;
		},



		removeItem : function (key) {
            if (cc.isUndefined(key)){
                key = "undefined";
                cc.log("WARNING: !!!!!!!! util.localStorageEncrypt.removeItem("+key+") !!!!!!!!");
            }

            if (key in this._keyValueCache)
                delete this._keyValueCache[key];

            cc.sys.localStorage.removeItem(key);
        }
		
		
		
		
}
