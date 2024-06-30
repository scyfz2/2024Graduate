'use strict';
const db = uniCloud.database()

exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	var appid = event.appid;
	var dbName = 'app-list'; //集合名称(表的名称)
	const res = await db.collection(dbName).where({"appid":appid}).get();
	//返回数据给客户端
	return res.data
};
