const API = {}

const getCategory= function() {
	return new Promise(function(resolve, reject) {
		uniCloud.callFunction({
			name: 'getCategory',
			data: {},
			success(res) {
				console.log(res)
				resolve(res.result)
			},
			fail(err) {
				reject(err)
			},
			complete() {}
		});
	})
}
const getList = function(index,cat_id) {
	return new Promise(function(resolve, reject) {
		uniCloud.callFunction({
			name: 'get',
			data: {
				dbName: 'emjio-list', //要查询的表名
				filter: {
					'category':cat_id
				}, //筛选条件，格式{sex:'女'}
				pageIndex: index, //第几页
				pageSize: 10 //每页的记录条数
			},
			success(res) {
				resolve(res.result.data)
			},
			fail(err) {
				reject(err)
			},
			complete() {}
		});
	})
}
const reommendIconList = function(index,searchVal) {
	return new Promise(function(resolve, reject) {
		uniCloud.callFunction({
			name: 'reommendIconList',
			data: {
				dbName: 'emjio-list', //要查询的表名
				searchVal:searchVal, //筛选条件，格式{sex:'女'}
				pageIndex: index, //第几页
				pageSize: 10 //每页的记录条数
			},
			success(res) {
				resolve(res.result.data)
			},
			fail(err) {
				reject(err)
			},
			complete() {}
		});
	})
}
const searchIcon = function(index,searchVal) {
	return new Promise(function(resolve, reject) {
		uniCloud.callFunction({
			name: 'searchIcon',
			data: {
				dbName: 'emjio-list', //要查询的表名
				searchVal:searchVal, //筛选条件，格式{sex:'女'}
				pageIndex: index, //第几页
				pageSize: 10 //每页的记录条数
			},
			success(res) {
				resolve(res.result.data)
			},
			fail(err) {
				reject(err)
			},
			complete() {}
		});
	})
}
const getAllKeys = function() {
	return new Promise(function(resolve, reject) {
		uniCloud.callFunction({
			name: 'getAllKeys',
			success(res) {
				resolve(res)
			},
			fail(err) {
				reject(err)
			},
			complete() {}
		});
	})
}
const search = function(pageIndex,pageSize, keyword,key,dbName) {
	var filter = {}
	if (keyword == undefined) {
		keyword = ''
	}
	return new Promise(function(resolve, reject) {
		uniCloud.callFunction({
			name: 'hahaSearch',
			data: {
				dbName: dbName,
				key: key,
				keyword: keyword,
				pageIndex: pageIndex,
				pageSize: pageSize
			},
			success(res) {
				console.log(res)
				resolve(res.result.data)
			},
			fail(err) {
				reject(err)
			},
			complete() {}
		});
	})
}
const getCustomAvatarCategory = function() {
	return new Promise(function(resolve, reject) {
		uniCloud.callFunction({
			name: 'getCustomAvatarCategory',
			data: {
				dbName: 'custom-avatar-classify',
			},
			success(res) {
				resolve(res.result)
			},
			fail(err) {
				reject(err)
			},
			complete() {}
		});
	})
}
const getCustomAvatarList = function(category_id) {
	return new Promise(function(resolve, reject) {
		uniCloud.callFunction({
			name: 'getCustomAvatarList',
			data: {
				category_id:category_id
			},
			success(res) {
				resolve(res.result)
			},
			fail(err) {
				reject(err)
			},
			complete() {}
		});
	})
}
const getAppConfig = function(appid) {
	return new Promise(function(resolve, reject) {
		uniCloud.callFunction({
			name: 'getAppConfig',
			data: {
				appid:appid
			},
			success(res) {
				resolve(res.result)
			},
			fail(err) {
				reject(err)
			},
			complete() {}
		});
	})
}

API.getCustomAvatarCategory = getCustomAvatarCategory
API.getCustomAvatarList = getCustomAvatarList
API.getList = getList
API.getCategory = getCategory
API.reommendIconList = reommendIconList
API.searchIcon = searchIcon
API.getAllKeys = getAllKeys
API.search = search
API.getAppConfig = getAppConfig

module.exports = API
