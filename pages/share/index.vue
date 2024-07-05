<template>
	<view class="flex-col justify-start page">

		<canvas canvas-id="ShareCanvas" class="section-share"> </canvas>

		<view class="flex-row group_6 mt-27">
			<view class="flex-col items-center button text-wrapper_3" @click="NextPic()">
				<text class="button_font">Next pic</text>
			</view>
			<view class="flex-col items-center button text-wrapper_4" @click="saveCanvasToAlbum()">
				<text class="button_font_white">Download poster</text>
			</view>
		</view>

	</view>



</template>

<script>
	// 在你的 script 中添加以下代码
	export default {
		data() {
			return {
				avatarPath: "",
				type: "endlong",
				count: "0",
			}
		},
		onLoad(options) {
			let _this = this
			console.log(options, "/options");
			_this.avatarPath = decodeURIComponent(options.path);
			_this.type = options.type;
			this.initShare();
		},
		onShow() {
			this.drawCanvas();
			 this.initShare();
		},
		methods: {
			initShare: function() {
			    wx.showShareMenu({
			      withShareTicket: true // 显示分享到朋友圈的按钮
			    });
			},
			NextPic() {
				uni.navigateTo({
					url: `/pages/index/index`
				});
			},
			onShareAppMessage(options) {
			    return {
			      title: 'UNNC毕业季', // 转发的标题
			      path: '/pages/entrance/entrance', // 转发的页面路径
			      imageUrl: '/static/logo.png', // 可以是本地路径或网络图片
			      success: function(res) {
			        // 转发成功
			      },
			      fail: function(err) {
			        // 转发失败
			      }
			    };
			  },
			drawCanvas(withBackground = false) {
				console.log("Hello drawCanvas!");
				this.$http.request({
					url: 'common/image/count/get',
				}).then((res) => {
					console.log(res);
					this.count = res;
					console.log(this.count);
					// 获取屏幕宽度，并计算 rpx 到 px 的比例
					const screen_width_px = wx.getSystemInfoSync().windowWidth;
					const scale = screen_width_px / 375; // 375 px 是设计稿的宽度标准值
					console.log("screen_width_px: " + screen_width_px);
					console.log("scale: " + scale);

					// 假设 rpxX 是你之前定义的 rpx 单位的数值
					const rpxX = 100; // 示例值，你需要替换为实际的 rpx 值
					const cssX = rpxX * scale; // 转换为 CSS 像素
					console.log("100 rpx = " + cssX + " css"); // 打印转换后的 CSS 像素值

					const ctx = wx.createCanvasContext('ShareCanvas', this);

					// 如果需要背景色，则绘制纯白色背景
					if (withBackground) {
						ctx.setFillStyle('#FDFBF9');
						ctx.fillRect(0, 0, 700, 1246); // 绘制一个覆盖整个画布的矩形背景
					}

					// 绘制线条元素
					ctx.setFillStyle('#10263b');
					ctx.fillRect(24 * scale, 55 * scale, 282 * scale, 39 * scale);
					ctx.fillRect(24 * scale, 100 * scale, 282 * scale, 39 * scale);



					// 绘制文字
					const FontSize = 32 * scale; // 转换为 CSS 像素
					console.log("FontSize: " + FontSize);
					ctx.font = 'bold 32px Circular Pro'; // 粗体，32px大小，Arial字体
					ctx.setFontSize(32 * scale);
					ctx.setFillStyle('#ffffff');
					ctx.fillText('Congratuations!', (24 + 8) * scale, (55 + 30) * scale);

					ctx.setFontSize(32 * scale);
					ctx.setFillStyle('#ffffff');
					ctx.fillText('# Class of 2024', (24 + 8) * scale, (100 + 30) * scale);

					// 根据计数位数动态设置x坐标
					let xPosition = 200 * scale;
					let WPosition = 192 * scale;
					let WPosition2 = 145 * scale;
					
					if (this.count >= 10000) {
					  xPosition = 180 * scale; // 计数在10000以上
					  WPosition = 172 * scale;
					  WPosition2 = 125 * scale;
					} else if (this.count < 1000) {
					  xPosition = 220 * scale; // 计数在1000以下
					  WPosition = 215 * scale;
					  WPosition2 = 165 * scale;
					  
					}
					// 绘制下面NO.线条元素
					ctx.setFillStyle('#10263b');
					ctx.fillRect(WPosition, 515 * scale, WPosition2, 42 * scale);
					// ctx.fillRect(192 * scale, 515 * scale, 145 * scale, 42 * scale);
					
					ctx.setFontSize(32 * scale);
					ctx.setFillStyle('#ffffff');
					ctx.fillText(`No. ${this.count}`, xPosition, 549 * scale);

					
					ctx.setFontSize(24 * scale);
					ctx.font = '24px Circular Pro'; // black，32px大小，Circular Pro字体
					ctx.setFillStyle('#10263B');
					ctx.fillText('Congrats from UNNC', 120 * scale, 585 * scale);
					// ctx.fillText('Congrats from UNNC', 260 * scale, 577 * scale);
					

					// ctx.setFontSize(20 * scale);
					// ctx.font = '20px Circular Pro'; // black，32px大小，Circular Pro字体
					// ctx.setFillStyle('#10263B');
					// ctx.fillText('from UNNC', 240 * scale, 600 * scale);

					ctx.setFontSize(15 * scale);
					ctx.font = '12px PingFang SC'; // black，32px大小，Circular Po字体
					ctx.setFillStyle('#10263b');
					ctx.fillText('Scan to', 91 * scale, 526 * scale); 
					ctx.fillText('generate your', 91 * scale, 536 * scale);
					ctx.fillText('graduation', 91 * scale, 546 * scale);
					ctx.fillText('photos!', 91 * scale, 556 * scale);
					
					// 设置填充颜色为灰色，例如 '#cccccc'
					// ctx.setFillStyle('#000000');
					// // 绘制圆形路径
					// ctx.beginPath();
					// ctx.arc(52, 590, 30, 0, Math.PI * 2, true);			
					// // 填充路径
					// ctx.fill();
					const QRcodeUrl = '/static/QRcode.png';
					ctx.drawImage(QRcodeUrl, 28 * scale, 510 * scale, 55 * scale, 55 * scale);
					

					// 绘制图片
					// const imgUrl = '/static/index/frame1.png';
					console.log(this.type);
					const imgUrl = this.avatarPath;
					if (this.type == "endlong") {
						ctx.drawImage(imgUrl, 52 * scale, 159 * scale, 240 * scale, 321 * scale);
					} else {
						ctx.drawImage(imgUrl, 15 * scale, 159 * scale, 321 * scale, 240 * scale);
					}
				
					ctx.draw();
				})

			},
			saveCanvasToAlbum() {
				console.log("Hello saveCanvasToAlbum!");

				const that = this;
				this.drawCanvas(true); // 绘制带背景色的画布

				wx.canvasToTempFilePath({
					canvasId: 'ShareCanvas',
					success: function(res) {
						wx.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success: function() {
								wx.showToast({
									title: '保存成功',
									icon: 'success',
									duration: 2000
								});
								that.drawCanvas(false); // 恢复不带背景色的画布
							},
							fail: function() {
								wx.showToast({
									title: '保存失败',
									icon: 'none',
									duration: 2000
								});
								that.drawCanvas(false); // 恢复不带背景色的画布
							}
						});
					},
					fail: function() {
						wx.showToast({
							title: 'Canvas 导出失败',
							icon: 'none',
							duration: 2000
						});
						that.drawCanvas(false); // 恢复不带背景色的画布
					}
				});
			}
		}

	};
</script>

<style scoped lang="scss">
	.page {
		width: 100%;
		height: 100vh;
		/* 使用视口高度 */
		display: flex;
		/* 启用Flexbox布局 */
		flex-direction: column;
		/* 设置主轴方向为垂直 */
		align-items: center;
		/* 水平居中 */
	}

	.section {
		background-color: #00ffff;
		margin-top: 20rpx;
		height: 1230rpx;
		width: 710rpx
	}

	.section-share {
		margin-top: 20rpx;
		// background-color: #55ff7f;
		background-color: #FDFBF9;
		border-radius: 47.71rpx;
		height: 1246rpx;
		width: 700rpx;
		box-shadow: 0rpx 0rpx 19.08rpx #0000001a;

	}

	.group {
		margin-top: 104rpx;
		margin-left: 64rpx;
	}

	.group_2 {
		display: flex;
		align-items: center;
		width: 100%;
	}

	.section_2 {
		background-color: #10263b;
		width: 503.82rpx;
		height: 61.07rpx;
	}

	.font {
		font-size: 61.07rpx;
		font-family: Circular Pro;
		font-weight: 700;
		color: #ffffff;
	}

	.text {
		line-height: 68.7rpx;
	}

	.text-wrapper_1 {
		// margin-right: 19.08rpx;
		height: 64rpx;
		width: 540rpx;
		background-color: #10263b;
	}

	.text-wrapper_2 {
		margin-top: 10rpx;
		height: 64rpx;
		width: 592rpx;
		background-color: #10263b;
	}

	.text-wrapper_NO {
		display: flex;
		/* 启用Flexbox布局 */
		justify-content: center;
		/* 垂直居中 */
		align-items: center;
		/* 水平居中 */
		margin-top: 10rpx;
		height: 64rpx;
		min-width: 100rpx;
		/* 设置一个最小宽度 */
		white-space: nowrap;
		/* 文本不换行 */
		overflow: hidden;
		/* 超出部分隐藏 */
		text-overflow: ellipsis;
		/* 超出部分显示省略号 */
		width: auto;
		/* 宽度自动 */
		background-color: #10263b;
	}

	.text_2 {
		margin-left: 14rpx;
		line-height: 60.71rpx;
	}

	.poster {
		margin-top: 70rpx;
		display: flex;
		/* 启用Flexbox布局 */
		flex-direction: column;
		/* 设置主轴方向为垂直 */
		justify-content: center;
		/* 垂直居中 */
		align-items: center;
		/* 水平居中 */
	}

	.image {
		width: 458.02rpx;
		height: 612.6rpx;
	}

	.group_4 {
		display: flex;
		align-items: center;
		width: 450rpx;
		margin-left: 40rpx;
		margin-top: 120rpx;

	}

	.section_3 {
		background-color: #d9d9d9;
		border-radius: 50%;
		width: 104.96rpx;
		height: 104.96rpx;
	}

	.text_4 {
		margin-left: 20rpx;
		color: #10263b;
		font-size: 19.08rpx;
		font-family: PingFang SC;
		line-height: 22.9rpx;
		width: 104.96rpx;
	}

	.group_3 {
		width: 450rpx;
		margin-top: 50rpx;
		margin-right: 70rpx;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		/* 所有子元素靠右侧对齐 */
	}

	.text_3 {
		margin-left: 19.08rpx;
		margin-right: 3.82rpx;
		line-height: 44.22rpx;
	}

	.text_5 {
		margin-top: 14rpx;
		color: #10263b;
		font-size: 38.17rpx;
		font-family: Circular Pro;
		font-weight: 900;
		line-height: 45.8rpx;
		text-align: right;
		width: 229.01rpx;
	}

	.text-wrapper_3 {
		padding: 30.53rpx 0;
		background-color: #ffffff;
		border-radius: 57.25rpx;
		height: 89.69rpx;
		border-left: solid 1.91rpx #ffffff;
		border-right: solid 1.91rpx #ffffff;
		border-top: solid 1.91rpx #ffffff;
		border-bottom: solid 1.91rpx #ffffff;
	}

	.font_2 {
		font-size: 34.35rpx;
		font-family: PingFang SC;
		line-height: 25rpx;
	}

	.text-wrapper_4 {
		margin-left: 40rpx;
		padding: 30.53rpx 0;
		background-color: #10263b;
		border-radius: 57.25rpx;
		height: 89.69rpx;
	}

	.group_6 {
		// padding-left: 54rpx;
		display: flex;
		align-items: center;
	}

	.mt-27 {
		margin-top: 51.53rpx;
	}

	.button {
		width: 310rpx;
	}

	.button_font {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		font-size: 34rpx;
		font-family: PingFang SC;
		line-height: 25rpx;
		color: #061259;
	}

	.button_font_white {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		font-size: 34rpx;
		font-family: PingFang SC;
		line-height: 25rpx;
		color: #ffffff;
	}
</style>