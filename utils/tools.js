import config from '@/utils/config'
// 上传图片到 oss
function oss_upload(res, key) {
	const url = config.OSS_URL
	config.OSS_FORM_DATA.key = key
	const formData = config.OSS_FORM_DATA
	return new Promise((resolve, reject) => {
		var imageSrc = res.tempFilePaths[0]
		uni.uploadFile({
			url,
			filePath: imageSrc,
			fileType: 'image',
			name: 'file',
			formData,
			success: () => {
				resolve(url)
			},
			fail: (res) => {
				reject(res)
			}
		})
	})
}

// 获取 oss 图片路径
function oss_url(arr) {
	let timestamp = new Date().getTime()
	let fileType = arr[0].substring(arr[0].lastIndexOf('.')) || '.jpg'
	let key = `phone/images/${timestamp}${fileType}`
	return new Promise((resolve, reject) => {
		oss_upload({
					tempFilePaths: arr
				},
				key
			)
			.then((url) => {
				var src = `${url}/${key}`.toString()
				return resolve(src)
			})
			.catch((error) => {
				reject(error)
			})
	})
}

// 判断对象的值是否为空
function isObjEmpty(obj) {
	return Boolean(
		Object.values(obj).filter((item) => item === '' || item === null).length
	)
}

// 手机号正则
function phoneReg(phone) {
	let reg =
		/^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8,6]|8[0-9]|9[1,8,9])\d{8}$/
	if (!reg.test(phone) || phone.length !== 11) {
		return false
	} else {
		return true
	}
}

// 身份证正则
function carIdReg(carId) {
	let _IDRe18 =
		/^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
	let _IDre15 =
		/^([1-6][1-9]|50)\d{4}\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}$/
	// 校验身份证：
	if (_IDRe18.test(carId) || _IDre15.test(carId)) {
		return true
	} else {
		return false
	}
}

// 邮箱正则
function emailReg(email) {
	var emailReg = /^\w{3,}(\.\w+)*@[A-z0-9]+(\.[A-z]{2,5}){1,2}$/
	if (emailReg.test(email)) {
		return true
	} else {
		return false
	}
}

//跳转子页面传递参数
export const setNavigateTo = (url, data) => {
	let str = ""
	if (data) {
		str = JSON.stringify(data)
		str = str.replace(/%/g, '%25')
	}
	let param = encodeURIComponent(str);
	console.log("/////kkk", `${url}?param=${param}`);
	uni.navigateTo({
		url: `${url}?param=${param}`,
	});
}

/*******
 * @description: 根据输入的日期格式返回当前日期
 * @param {*} format 日期格式：yyyy-MM-dd HH:mm:ss
 * @return {*}
 */
export const getCurrentData = function(time, format) {
	console.log(time);
	format = format || "yyyy-MM-dd";
	let now = null
	if (time) {
		now = new Date(time);
	} else {
		now = new Date();
	}

	const year = now.getFullYear();
	const month = now.getMonth() + 1;
	const day = now.getDate();
	const hour = now.getHours();
	const minute = now.getMinutes();
	const second = now.getSeconds();

	console.log(year, month, day, hour, minute, second);
	// 用正则表达式替换各个格式占位符
	return format
		.replace(/yyyy/g, year)
		.replace(/MM/g, month.toString().padStart(2, "0"))
		.replace(/dd/g, day.toString().padStart(2, "0"))
		.replace(/HH/g, hour.toString().padStart(2, "0"))
		.replace(/mm/g, minute.toString().padStart(2, "0"))
		.replace(/ss/g, second.toString().padStart(2, "0"));
};


function showLoading(title = "", time, mask = true) {
	uni.showLoading({
		title: title,
		mask: mask
	});
	console.log(time, "////");
	if (time) {
		setTimeout(() => {
			hideLoading();
		}, time);
	}
}

function hideLoading() {
	uni.hideLoading();
}

module.exports = {
	oss_url: oss_url,
	isObjEmpty: isObjEmpty,
	phoneReg: phoneReg,
	carIdReg: carIdReg,
	emailReg: emailReg,
	setNavigateTo: setNavigateTo,
	getCurrentData: getCurrentData,
	showLoading: showLoading,
	hideLoading: hideLoading,
}