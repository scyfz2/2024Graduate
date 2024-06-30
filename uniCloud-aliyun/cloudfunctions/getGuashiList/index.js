'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	console.log(event)
	//event为客户端上传的参数
	//前端调用此函数需要传入的参数：dbName ，filter ，pageIndex ，pageSize
	var cat_id = event.cat_id
	const res = await db.collection('guashi-list').where({
			"cat_id": cat_id
		})
		.orderBy('sort', 'asc')
		.get()
	return res.data;
};


