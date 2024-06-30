<template>
	<view class="container" style="height: 100%">
		<view class="avatar-container grid justify-center" id="avatar-container" @touchstart="touchStart"
			@touchend="touchEnd" @touchmove="touchMove">
			<view class="avatar-bg-border">
				<image @touchstart="touchAvatarBg" class="bg avatar-bg" id="avatar-bg" :src="avatarPath"></image>
			</view>
			<image class="mask flip-horizontal" :class="{maskWithBorder: showBorder}" id='mask' :src="imgurl"
				:style="{ top: maskCenterY-maskSize/2-2+'px', left: maskCenterX-maskSize/2-2+'px', transform: 'rotate(' +rotate+ 'deg)' + 'scale(' +scale+')' + 'rotateY('+ rotateY +'deg)'}">
			</image>
			<text class="cuIcon-full handle circle" :class="{hideHandle: !showBorder}" id="handle"
				:style="{top:handleCenterY-10 + 'px', left:handleCenterX-10 +'px'}"></text>
		</view>
		<view>
			<canvas class="cans-id-mask" canvas-id="cans-id-mask"
				style="height:270px;width:270px;margin-left: auto;margin-right: auto;" />
		</view>

		<scroll-view class=" scrollView mask-scroll-view grid justify-around action-wrapper" scroll-x="true">
			<unicloud-db v-slot:default="{data, loading, error, options}" collection="avatar-type">
				<view v-for="(item,index) in data" :key="index" style="display: inline-flex;">
					<view class="grid col-2" style="padding-left: 40rpx;">
						<button id="btn-save" class="cu-btn round action-btn bg-cyan shadow "
							@click="Operation(item.AvatartypeDetailList)">{{item.name}}</button>
						<!-- <view @click="Operation(item.AvatartypeDetailList)">{{item.name}}</view> -->
					</view>
				</view>
			</unicloud-db>
		</scroll-view>
		<view class="grid justify-around action-wrapper" style="margin-top: 10rpx;">
			<view class="grid col-1">
				<button open-type="chooseAvatar" class="cu-btn round action-btn bg-yellow shadow"
					@chooseavatar="onChooseAvatar">我的头像</button>
			</view>
			<view class="grid col-2">
				<button id="btn-save" class="cu-btn round action-btn bg-yellow shadow" @click="draw">保存头像</button>
			</view>
			<view class="grid col-3">
				<button id="btn-save" class="cu-btn round action-btn bg-yellow shadow" open-type="share">分享朋友</button>
			</view>
		</view>

		<scroll-view scrollWithAnimation scrollX class="nav" :scrollLeft="scrollLeft">
			<view @tap="tabSelect(index)" :class="'cu-item ' + (TabCur == index ? 'text-red cur' : '')" :data-id="index"
				v-for="(item, index) in typeList" :key="index">
				{{ item.title }}
			</view>
		</scroll-view>
		<scroll-view class="scrollView" :scrollY="true" :style="'height:' + scrollHeight + 'px;background: #ffffff00;'">
			<view class="grid">
				<view v-for="(item, index) in imgList" :key="index">
					<image @tap="changeMask(item,index)"
						:class="'imgList ' + (selSucaiIndex == index ? 'selClass' : 'selNo')" :data-item="item"
						:data-sel-id="index" :lazyLoad="true" :src="item.url"></image>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	const list = {}
	export default {
		data() {
			return {
				scrollLeft: 0,
				scrollHeight: 200,
				TabCur: 0,
				duration: 15,
				windowHeight: 0,
				cansWidth: 270, // 宽度 px
				cansHeight: 270, // 高度 px
				avatarPath: '/static/image/profile.png',
				currentMaskId: -1,
				imgurl: "",
				showBorder: false,
				maskCenterX: wx.getSystemInfoSync().windowWidth / 2,
				maskCenterY: 150,
				cancelCenterX: wx.getSystemInfoSync().windowWidth / 2 - 50 - 2,
				cancelCenterY: 100,
				handleCenterX: wx.getSystemInfoSync().windowWidth / 2 + 50 - 2,
				handleCenterY: 200,
				maskSize: 100,
				scale: 1,
				rotate: 0,
				rotateY: 0, // 值180时，则水平翻转
				mask_center_x: wx.getSystemInfoSync().windowWidth / 2,
				mask_center_y: 150,
				cancel_center_x: wx.getSystemInfoSync().windowWidth / 2 - 50 - 2,
				cancel_center_y: 100,
				handle_center_x: wx.getSystemInfoSync().windowWidth / 2 + 50 - 2,
				handle_center_y: 200,
				scaleCurrent: 1,
				rotateCurrent: 0,
				touch_target: "",
				start_x: 0,
				start_y: 0,
				typeList: [],
				imgList: [],
			}
		},
		computed: {
			maskPic: function() {
				var pic = this.imgurl;
				console.log(pic)
				return pic;
			}
		},
		onLoad(option) {
			this.windowHeight = getApp().globalData.windowHeight;
			this.scrollHeight = this.windowHeight - 50 - 290 - 120
			this.getCategory()
		},
		onShareAppMessage() {
			return {
				title: '指尖绘制美的存在',
				path: '/pages/index/index',
				success: function(res) {
					console.log(res);
				}
			}
		},
		onShareTimeline() {
			return {
				title: '指尖绘制美的存在',
				path: '/pages/index/index',
				success: function(res) {
					console.log(res);
				}
			}
		},
		methods: {
			getCategory() {
				var that = this
				uniCloud.callFunction({
					name: 'getGuashiCategory',
					success(res) {
						that.typeList = res.result
						that.getList(that.typeList[0].id)
					},
					fail(err) {

					},
					complete() {}
				});
			},
			getList(cat_id) {
				var that = this
				uniCloud.callFunction({
					name: 'getGuashiList',
					data: {
						"cat_id": cat_id,
					},
					success(res) {
						console.log(res)
						that.imgList = res.result
						that.selSucaiIndex = 0
					},
					fail(err) {

					},
					complete() {}
				});
			},
			tabSelect(index) {
				this.TabCur = index
				this.scrollLeft = 60 * (index - 1)
				this.getList(this.typeList[index].id)
			},

			// 选择图片
			Operation(operat) {
				// this.imgList = JSON.parse(operat)
				this.imgList = operat
			},
			touchAvatarBg() {
				this.showBorder = false;
			},
			touchStart(e) {
				console.log('e.target.id', e.target.id);
				if (e.target.id == "mask") {
					this.touch_target = "mask";
					this.showBorder = true;
				} else if (e.target.id == "handle") {
					this.touch_target = "handle"
				} else {
					this.touch_target = ""
				};

				if (this.touch_target != "") {
					this.start_x = e.touches[0].clientX;
					this.start_y = e.touches[0].clientY;
				}
			},
			touchMove(e) {
				var current_x = e.touches[0].clientX;
				var current_y = e.touches[0].clientY;
				var moved_x = current_x - this.start_x;
				var moved_y = current_y - this.start_y;
				if (this.touch_target == "mask") {
					this.maskCenterX = this.maskCenterX + moved_x;
					this.maskCenterY = this.maskCenterY + moved_y;
					this.cancelCenterX = this.cancelCenterX + moved_x;
					this.cancelCenterY = this.cancelCenterY + moved_y;
					this.handleCenterX = this.handleCenterX + moved_x;
					this.handleCenterY = this.handleCenterY + moved_y;
				};
				if (this.touch_target == "handle") {
					this.handleCenterX = this.handleCenterX + moved_x;
					this.handleCenterY = this.handleCenterY + moved_y;
					this.cancelCenterX = 2 * this.maskCenterX - this.handleCenterX;
					this.cancelCenterY = 2 * this.maskCenterY - this.handleCenterY;
					let diff_x_before = this.handle_center_x - this.mask_center_x;
					let diff_y_before = this.handle_center_y - this.mask_center_y;
					let diff_x_after = this.handleCenterX - this.mask_center_x;
					let diff_y_after = this.handleCenterY - this.mask_center_y;
					let distance_before = Math.sqrt(diff_x_before * diff_x_before + diff_y_before * diff_y_before);
					let distance_after = Math.sqrt(diff_x_after * diff_x_after + diff_y_after * diff_y_after);
					let angle_before = Math.atan2(diff_y_before, diff_x_before) / Math.PI * 180;
					let angle_after = Math.atan2(diff_y_after, diff_x_after) / Math.PI * 180;
					this.scale = distance_after / distance_before * this.scaleCurrent;
					this.rotate = angle_after - angle_before + this.rotateCurrent;
				}
				this.start_x = current_x;
				this.start_y = current_y;
			},
			touchEnd(e) {
				this.mask_center_x = this.maskCenterX;
				this.mask_center_y = this.maskCenterY;
				this.cancel_center_x = this.cancelCenterX;
				this.cancel_center_y = this.cancelCenterY;
				this.handle_center_x = this.handleCenterX;
				this.handle_center_y = this.handleCenterY;
				this.touch_target = "";
				this.scaleCurrent = this.scale;
				this.rotateCurrent = this.rotate;
			},
			async onChooseAvatar(e) {
				console.log(e)
				const {
					avatarUrl
				} = e.detail
				console.log(avatarUrl)
				//const avatarTemp = await this.getTempFile(avatarUrl)
				// const url = await this.uploadFile(avatarUrl, 'original_' + this.formatDate() + '.jpg')
				this.avatarPath = avatarUrl;
			},
			async uploadFile(filePath, fileName) {
				const result = await uniCloud.uploadFile({
					filePath: filePath,
					cloudPath: '/tuku/customAvatar/' + fileName,
					cloudPathAsRealPath: true,
				});
				return result.fileID
			},
			formatDate() {
				var date = new Date();
				var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
				var D = date.getDate();
				var h = date.getHours();
				var m = date.getMinutes();
				var s = date.getSeconds();
				return M + D + h + m + s;
			},
			// 获取用户信息
			getUserInfo(result) {
				let userInfo = result;
				userInfo.avatarUrl = userInfo.avatarUrl.replace("132", "0").replace('https://thirdwx.qlogo.cn',
					'https://wx.qlogo.cn'); // 使用最大分辨率头像 959 * 959
				console.log(userInfo.avatarUrl)
				let self = this;

				uni.downloadFile({
					url: userInfo.avatarUrl,
					success: function(res) {
						uni.hideLoading();
						self.avatarPath = res.tempFilePath;
					},
					fail: function(e) {
						console.log(e);
						uni.hideLoading();
						uni.showModal({
							title: '图片加载超时',
							content: "网络异常，请稍后重试",
							success(res) {
								if (res.confirm) {
									self.downloadAvatarAndPaintAll(imageUrl);
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						})
					}
				})
			},
			// 选择挂件
			changeMask(e, index) {
				console.log(e)
				this.selSucaiIndex = index
				console.log(this.selSucaiIndex)
				let self = this;
				uni.downloadFile({
					url: e.url,
					success: function(res) {
						console.log('-------', res)
						uni.hideLoading();
						console.log(res.tempFilePath);
						self.imgurl = res.tempFilePath
					},
					fail: function(e) {}
				})
				this.showBorder = true;
			},
			// 绘制头像
			draw() {
				if (this.imgurl == "") {
					uni.showToast({
						title: '您还没选择挂件哦',
						duration: 2000,
						icon: "none"
					})
					return
				}
				let scale = this.scale;
				let rotate = this.rotate;
				let mask_center_x = this.mask_center_x;
				let mask_center_y = this.mask_center_y;
				let _this = this;
				// 创建节点选择器
				// 口罩中心位置的计算是从屏幕左上角开始，所以我们需要获取头像图片的位置，来得到口罩相对头像的位置
				var query = wx.createSelectorQuery();
				query.select('#avatar-bg').boundingClientRect()
				query.exec(function(res) {
					//res就是 所有标签为#的元素的信息的数组
					mask_center_x = mask_center_x - res[0].left;
					mask_center_y = mask_center_y - res[0].top;
					const pc = wx.createCanvasContext('cans-id-mask');
					const windowWidth = wx.getSystemInfoSync().windowWidth;
					const mask_size = 100 * scale;

					pc.clearRect(0, 0, _this.cansWidth, _this.cansHeight);
					pc.drawImage(_this.avatarPath, 0, 0, _this.cansWidth, _this.cansHeight);
					pc.translate(mask_center_x, mask_center_y);
					pc.rotate(rotate * Math.PI / 180);
					if (_this.isAndroid) {
						_this.rotateY == 180 && pc.scale(-1, 1);
					}
					pc.drawImage(_this.maskPic, -mask_size / 2, -mask_size / 2, mask_size, mask_size);
					pc.draw();
					_this.saveCans();
				})
			},
			// 保存头像
			saveCans() {
				let _this = this;
				uni.showLoading({
					title: '保存...',
					mask: true
				})
				uni.canvasToTempFilePath({
					x: 0,
					y: 0,
					height: this.cansWidth,
					width: this.cansHeight,
					destWidth: this.cansWidth * 3,
					destHeight: this.cansHeight * 3,
					canvasId: 'cans-id-mask',
					success: function(res) {
						uni.hideLoading();
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success: function(res) {
								uni.showModal({
									title: '保存成功',
									content: '头像已经在您的相册里啦',
									showCancel: false
								});
								uni.vibrateShort({
									success: function() {
										console.log('vibrateShort');
									}
								});
							},
							fail(res) {
								if (res.errMsg.indexOf("fail")) {
									uni.showModal({
										title: '您需要授权相册权限',
										success(res) {
											if (res.confirm) {
												uni.openSetting({
													success(res) {
														console.log("相册授权成功");
													},
													fail(res) {
														console.log(res)
													}
												})
											}
										}
									})
								}
							}
						});
					},
					fail(res) {
						uni.hideLoading()
					}
				}, this)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.avatar-container {
		height: 290px;
		width: 100%;
		margin-top: 100rpx;
		margin-left: auto;
		margin-right: auto;
	}

	.avatar-bg-border {
		border: 6px solid white;
		border-radius: 10px;
		width: 282px;
		height: 282px;
	}

	.avatar-bg {
		position: absolute;
		z-index: 0;
		height: 270px;
		width: 270px;
	}

	.action-wrapper {
		padding-top: 30rpx;
		padding-left: 50rpx;
		padding-right: 50rpx;
		font-weight: 800;
	}

	.share-wrapper {
		padding-top: 10rpx;
		padding-left: 100rpx;
		padding-right: 100rpx;
		font-weight: 800;
	}

	.mask {
		height: 100px;
		width: 100px;
		position: absolute;
		top: 50rpx;
		border: 3px solid rgba(255, 255, 255, 0.0);
	}

	.maskWithBorder {
		border: dashed 3px white;
	}

	.hideHandle {
		display: none;
	}

	.circle {
		border-radius: 50%;
		font-size: 15px;
		color: #000;
		line-height: 25px;
		text-align: center;
		background: #fff;
	}

	.handle,
	.cancel {
		position: absolute;
		z-index: 1;
		width: 25px;
		height: 25px;
		background-color: white;
		color: black;
	}

	.scrollView {
		width: 100%;
		// position: absolute;
		// bottom: 50rpx;
		white-space: nowrap;
	}

	.butscrollView {
		width: 100%;
		position: absolute;
		bottom: 50rpx;
		white-space: nowrap;
	}

	.infoView {
		width: 95%;
		position: absolute;
		bottom: 85px;
		white-space: nowrap;
		background-color: white;
		margin: 10px;
		padding: 1px 5px;
		border-radius: 5px;
		white-space: pre-wrap;
	}

	.imgList {
		height: 65px;
		width: 65px;
		border: 2px solid white;
		border-radius: 5px;
		margin: 10px 10px 10px 10px;
	}

	.cans-id-mask {
		position: absolute;
		top: 100px;
		left: 1000px;
	}

	.flip-horizontal {
		-moz-transform: scaleX(-1);
		-webkit-transform: scaleX(-1);
		-o-transform: scaleX(-1);
		transform: scaleX(-1);
	}

	.my-text {
		font-size: 40rpx;
	}

	.ad-wraper {
		margin: 30px auto 0;
		width: 700rpx;
	}

	.nav {
		white-space: nowrap;
		color: #fff;
		font-size: 28px;
		font-weight: 500;
	}

	.nav .cu-item {
		display: inline-block;
		height: 90rpx;
		line-height: 90rpx;
		margin: 0 10rpx;
		padding: 0 20rpx;
	}

	.grid {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}

	.grid.grid-square {
		overflow: hidden;
	}

	.grid.grid-square .cu-tag {
		background-color: rgba(0, 0, 0, .5);
		border-bottom-left-radius: 6rpx;
		height: auto;
		padding: 6rpx 12rpx;
		position: absolute;
		right: 0;
		top: 0;
	}

	.grid.grid-square>view>text[class*="cuIcon-"] {
		align-items: center;
		bottom: 0;
		color: var(--grey);
		display: flex;
		flex-direction: column;
		font-size: 52rpx;
		justify-content: center;
		left: 0;
		margin: auto;
		position: absolute;
		right: 0;
		top: 0;
	}

	.grid.grid-square>view {
		border-radius: 6rpx;
		margin-bottom: 20rpx;
		margin-right: 20rpx;
		overflow: hidden;
		position: relative;
	}

	.grid.grid-square>view.bg-img image {
		height: 100%;
		position: absolute;
		width: 100%;
	}

	.grid.col-1.grid-square>view {
		height: 0;
		margin-right: 0;
		padding-bottom: 100%;
	}

	.grid.col-2.grid-square>view {
		height: 0;
		padding-bottom: calc((100% - 20rpx)/2);
		width: calc((100% - 20rpx)/2);
	}

	.grid.col-3.grid-square>view {
		height: 0;
		padding-bottom: calc((100% - 40rpx)/3);
		width: calc((100% - 40rpx)/3);
	}

	.grid.col-4.grid-square>view {
		height: 0;
		padding-bottom: calc((100% - 60rpx)/4);
		width: calc((100% - 60rpx)/4);
	}

	.grid.col-5.grid-square>view {
		height: 0;
		padding-bottom: calc((100% - 80rpx)/5);
		width: calc((100% - 80rpx)/5);
	}

	.grid.col-2.grid-square>view:nth-child(2n),
	.grid.col-3.grid-square>view:nth-child(3n),
	.grid.col-4.grid-square>view:nth-child(4n),
	.grid.col-5.grid-square>view:nth-child(5n) {
		margin-right: 0;
	}

	.grid.col-1>view {
		width: 100%;
	}

	.grid.col-2>view {
		width: 50%;
	}

	.grid.col-3>view {
		width: 33.33%;
	}

	.grid.col-4>view {
		width: 25%;
	}

	.grid.col-5>view {
		width: 20%;
	}

	.selNo {
		border: 1rpx solid #b8b0b1;
	}

	.selClass {
		border: 1rpx solid #ff4c4c;
	}
</style>