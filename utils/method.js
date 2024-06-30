function setStorage(key, val) {
  try {
    return uni.setStorageSync(key, val)
  } catch {
    console.log('setStorageSync --- ERROR')
  }
}

function getStorage(key) {
  try {
    return uni.getStorageSync(key)
  } catch (e) {
    console.log('getStorageSync --- ERROR')
  }
}

function navTo(url, status) {
  if (status == 1) {
    uni.showToast({
      title: '开发中...',
      icon: 'none'
    })
  } else if (status == 2) {
    uni.navigateBack({
      delta: 1
    })
  } else if (status == 3) {
    uni.switchTab({
      url: url
    })
  } else if (status == 4) {
    uni.redirectTo({
      url: url
    })
  } else {
    uni.navigateTo({
      url: url
    })
  }
}

function showToast(msg, duration = 2000, icon = 'none') {
  uni.showToast({
    title: msg,
    duration: duration,
    icon: icon
  })
}

function showModel(title, content) {
  uni.showModal({
    title,
    content,
    success(res) {
      if (res.confirm) {
        console.log('用户点击确定')
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    }
  })
}

// 上传图片
function chooseImage(count = 1) {
  return new Promise((resolve, reject) => {
    uni.chooseImage({
      count: count,
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], //从相册选择
      success(res) {
        resolve(res.tempFilePaths)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}

// 上传附件
function chooseMessageFile(count = 1) {
  return new Promise((resolve, reject) => {
    wx.chooseMessageFile({
      count: count,
      type: 'file',
      extension: [
        'xlsx',
        'xls',
        'doc',
        'docx',
        'zip',
        'rar',
        'war',
        'png',
        'jpg',
        'pdf'
      ],
      success(res) {
        resolve(res.tempFiles)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}

// 复制剪贴板
function setClipboardData(data) {
  uni.setClipboardData({
    data,
    success: () => {
      console.log('success')
    }
  })
}

// 获取 null 内容区域高度
function contentHight(height = 0) {
  return `calc(100vh - ${getStorage('navbar') + height}px)`
}

module.exports = {
  setStorage: setStorage,
  getStorage: getStorage,
  navTo: navTo,
  showToast: showToast,
  showModel: showModel,
  chooseImage: chooseImage,
  chooseMessageFile: chooseMessageFile,
  contentHight: contentHight,
  setClipboardData: setClipboardData
}
