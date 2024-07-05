<template>
	<view class="preview">
		<view class="preview-box">
			<view class="box-style" :class="type">
				<image class="bg avatar-bg" id="avatar-bg" :src="avatarPath" mode="widthFix"></image>
			</view>
		</view>
		<view class="preview-btn">
			<view class="btn-group">
				<view class="btn-item item1" @click="goBack">
					<text>Back to Edit</text>
				</view>
				<!-- <view class="btn-item item1" @click="goBack">
					<text>Back to Edit</text>
				</view> -->
				<view class="btn-item item2" @click="handleSaveEvent()">
					<text>Save</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				avatarPath: "",
				type: "endlong",
			}
		},
		onLoad(options) {
			let _this = this
			console.log(options, "/options");
			_this.avatarPath = decodeURIComponent(options.path);
			_this.type = options.type;
		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta: 1 // 返回的页面层级，默认值为1
				});
			},
			handleSaveEvent() {
				let _this = this;
				uni.showLoading({
					title: '保存...',
					mask: true
				})
				uni.saveImageToPhotosAlbum({
					filePath: _this.avatarPath,
					success: function(res) {
						uni.vibrateShort({
							success: function() {
								uni.navigateTo({
									url: `/pages/share/index?path=${encodeURIComponent(_this.avatarPath)}&type=${_this.type}`
								});
								_this.$http.request({
									url: 'common/image/count/add',
								}).then((res) => {
									if (res.code == "1") {
										let result = res.data || {};
									}
								})
							}
						});
						uni.hideLoading()
					},
					fail(res) {
						uni.hideLoading()
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

			}
		}

	}
</script>

<style scoped lang="scss">
	.preview {
		width: 100%;
		height: 100vh;
		display: flex;
		flex-wrap: wrap;

		.preview-box {
			width: 100%;
			height: calc(100% - 300rpx);
			display: flex;
			align-items: center;
			justify-content: center;

			.box-style {}

			.endlong {
				width: 513rpx;
				height: 667rpx;
			}

			.across {
				width: 568rpx;
				height: 426rpx;
				margin-top: 180rpx;
			}
		}

		.preview-btn {
			width: 100%;
			height: 300rpx;
			display: flex;

			.btn-group {
				width: 100%;
				height: 94rpx;
				margin-top: 103rpx;
				display: flex;
				justify-content: space-evenly;

				.btn-item {
					width: 316rpx;
					height: 100%;
					padding: 30rpx 50rpx;
					border-radius: 50rpx;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: flex-start;
					font-size: 34rpx;
					font-family: PingFang SC;
					line-height: 25rpx;
				}

				.item1 {
					color: #152639;
					background: #ffffff;
				}

				.item2 {
					color: #ffffff;
					background: #152639;
				}
			}
		}
	}
</style>