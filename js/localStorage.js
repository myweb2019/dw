let storge={
	/**
	 * 设置本地存储
	 * @param {Object} key 保存的名字
	 * @param {Object} value 值
	 */
	setlocalStorage(key, value) {
		localStorage.setItem(key, value);
	},
	
	//获取本地存储
	getlocalStorage(key) {
		var value = localStorage.getItem(key);
		if (value) {
			//有数据
			return value;
		} else {
			return []
		}
	},
	
	//删除本地存储
	clearlocalStorage(key) {
		localStorage.removeItem(key);
	}
}

