import config from '@/utils/config'
module.exports = {
  data() {
    return {
      IMG_HOST: config.IMG_HOST
    }
  },
  onShow() {
    let pages = getCurrentPages()
    if (pages.length >= 1) {
      this.$x.pageRouter = pages[pages.length - 1].route
      if (this.$x.pageRouter) {
        this.$x.mpShare = {
          title: '', // 分享标题
          path: '', // 默认为当前页面路径
          imageUrl: '' // 默认为当前页面的截图
        }
      }
      return
    }
  },
  // 分享到好友
  onShareAppMessage() {
    return this.$x.mpShare
  },
  // 分享到朋友圈
  onShareTimeline() {
    return this.$x.mpShare
  }
}
