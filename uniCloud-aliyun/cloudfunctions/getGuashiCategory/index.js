'use strict';
const db = uniCloud.database()

exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	var dbName = event.dbName; //集合名称(表的名称)
	const res = await db.collection('guashi-classify')
	.orderBy("id","asc")
	.get();

	//返回数据给客户端
	return res.data
};