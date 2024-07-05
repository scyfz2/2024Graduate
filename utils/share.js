export default {
  created() {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ["shareAppMessage", "shareTimeline"],
    });
  },
  onShareAppMessage(res) {
    // 发送给朋友
    return {
      title: "快来定制你的专属毕业照吧！", 
      imageUrl: "/static/share.png",
	  path: 'pages/entrance/entrance'
    };
  },
  onShareTimeline(res) {
    // 分享到朋友圈
    return {
      title: "快来定制你的专属毕业照吧！",
      imageUrl: "/static/share.png",
	  path: 'pages/entrance/entrance'
    };
  },
};
 