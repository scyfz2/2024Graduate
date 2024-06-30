<template>
	<view class="canvas-main">
		<canvas :style="'width:'+width+'px;height:'+height+'px;'" canvas-id="canvasId"></canvas>
	</view>
</template>

<script>
	export default {
		props: {
			//背景图片地址
			bgUrl: {
				type: String,
				default: ''
			},
			//头像图片地址
			photoUrl: {
				type: String,
				default: ''
			},
			//挂饰图片地址
			guashiUrl: {
				type: String,
				default: ''
			},
			scale: {
				type: String,
				default: ''
			},
			rotate: {
				type: String,
				default: ''
			},
			//生成的图片格式(jpg或png)
			fileType: {
				type: String,
				default: 'png'
			},
			//背景图片宽度(px)
			width: {
				type: Number,
				default: 300
			},
			//背景图片高度(px)
			height: {
				type: Number,
				default: 300
			},
			//中间头像图片宽度(px)
			dWidth: {
				type: Number,
				default: 200
			},
			//中间头像图片高度(px)
			dHeight: {
				type: Number,
				default: 200
			},
			radioFun: {
				type: Function,
				default: function() {}
			},
			maskList: {
				type: Array,
				default: function() {
					return []
				}
			},

			//挂饰图片宽度(px)
			gsWidth: {
				type: Number,
				default: 200
			},
			//挂饰图片高度(px)
			gsHeight: {
				type: Number,
				default: 200
			},
			//背景图片离左边的距离(px)
			x: {
				type: Number,
				default: 0
			},
			//背景图片离上边的距离(px)
			y: {
				type: Number,
				default: 0
			},
			//中间头像离左边的距离(px)
			dx: {
				type: Number,
				default: 50
			},
			//中间头像离上边的距离(px)
			dy: {
				type: Number,
				default: 50
			},
			//挂饰离左边的距离(px)
			gsx: {
				type: Number,
				default: 50
			},
			//挂饰离上边的距离(px)
			gsy: {
				type: Number,
				default: 50
			},
			//背景图片圆角(px)
			radius: {
				type: Number,
				default: 0
			},
			//背景图片边框宽度(px)
			lineWidth: {
				type: Number,
				default: 0
			},
			//背景图片边框颜色
			lineColor: {
				type: String,
				default: '#FFFFFF'
			},
			//中间头像圆角(px)
			dRadius: {
				type: Number,
				default: 0
			},
			//中间头像边框宽度(px)
			dLineWidth: {
				type: Number,
				default: 0
			},
			//中间头像边框颜色
			dLineColor: {
				type: String,
				default: '#FFFFFF'
			},
		},
		methods: {
			async getNewUrl() {
				let self = this
				const systemInfo = uni.getSystemInfoSync()
				let pixelRatio = systemInfo.pixelRatio
				let context = uni.createCanvasContext('canvasId', this)

				// var gsres = await uni.getImageInfo({
				// 	src: this.guashiUrl
				// })
				// this.guashiUrl = gsres.path
				console.log("----gushi", this.guashiUrl)

				this.getImageInfo(this.bgUrl, res => {
					this.bgUrl = res
					this.getImageInfo(this.photoUrl, async res1 => {
						this.photoUrl = res1
						if (this.radius > 0 || this.lineWidth > 0) {
							context.beginPath()
							context.moveTo(this.x + this.radius, this.y)
							context.arcTo(this.x + this.width, this.y, this.x + this.width, this
								.y +
								this.radius, this.radius)
							context.lineTo(this.x + this.width, this.y + this.height - this.radius)
							context.arcTo(this.x + this.width, this.y + this.height, this.x + this
								.width - this.radius, this.y + this.height, this.radius)
							context.lineTo(this.x + this.radius, this.y + this.height)
							context.arcTo(this.x, this.y + this.height, this.x, this.y + this
								.height - this.radius, this.radius)
							context.lineTo(this.x, this.y + this.radius)
							context.arcTo(this.x, this.y, this.x + this.radius, this.y, this
								.radius)
							context.closePath()
							context.clip()
						}
						await context.drawImage(this.bgUrl, this.x, this.y, this.width, this
							.height)
						if (this.lineWidth) {
							context.lineWidth = this.lineWidth
							context.strokeStyle = this.lineColor
							context.stroke()
						}
						if (this.dRadius > 0 || this.dLineWidth > 0) {
							context.beginPath()
							context.moveTo(this.dx + this.dRadius, this.dy)
							context.arcTo(this.dx + this.dWidth, this.dy, this.dx + this.dWidth,
								this
								.dy +
								this.dRadius, this.dRadius)
							context.lineTo(this.dx + this.dWidth, this.dy + this.dHeight - this
								.dRadius)
							context.arcTo(this.dx + this.dWidth, this.dy + this.dHeight, this.dx +
								this
								.dWidth - this.dRadius, this.dy + this.dHeight, this.dRadius)
							context.lineTo(this.dx + this.dRadius, this.dy + this.dHeight)
							context.arcTo(this.dx, this.dy + this.dHeight, this.dx, this.dy + this
								.dHeight - this.dRadius, this.dRadius)
							context.lineTo(this.dx, this.dy + this.dRadius)
							context.arcTo(this.dx, this.dy, this.dx + this.dRadius, this.dy, this
								.dRadius)
							context.closePath()
							context.clip()
						}
						await context.drawImage(this.photoUrl, this.dx, this.dy, this.dWidth, this
							.dHeight)

						// context.rotate(this.rotate * Math.PI / 180);

						this.maskList.forEach(async item=>{
							context.save();
							// 旋转元素
							context.translate(this.radioFun(item.centerX,item), this.radioFun(item.centerY,item));
							context.rotate(item.rotate * Math.PI / 180);
							context.translate(-this.radioFun(item.centerX,item), -this.radioFun(item.centerY,item));
							// 渲染元素
							context.drawImage(item.url, this.radioFun(item.centerX - item.width/2,item), this.radioFun(item.centerY - item.height/2,item), this.radioFun(item.width,item), this.radioFun(item.height,item));
							context.restore();
						})

						// await context.drawImage(this.guashiUrl, this.gsx, this.gsy, this.gsWidth,
						// 	this.gsHeight)
						// 	console.log(this.gsx, this.gsy, this.gsWidth,
						// 	this.gsHeight);

						if (this.dLineWidth) {
							context.lineWidth = this.dLineWidth
							context.strokeStyle = this.dLineColor
							context.stroke()
						}
						context.draw(false, () => {
							uni.canvasToTempFilePath({
								canvasId: 'canvasId',
								fileType: self.fileType,
								quality: 1,
								width: self.width,
								height: self.height,
								destWidth: self.width * pixelRatio,
								destHeight: self.height * pixelRatio,
								success: (res) => {
									self.$emit('change', res.tempFilePath)
								},
								fail: (err) => {
									console.log('生成图片失败:', err)
								}
							}, self)
						}, self)
					})
				})
			},
			getImageInfo(src, callback) {
				uni.getImageInfo({
					src: src,
					success: (res) => {
						callback(res.path)
					}
				})
			}
		}
	}
</script>

<style scoped>
	.canvas-main {
		position: fixed;
		z-index: -999999 !important;
		opacity: 0;
		top: -5000rpx;
	}
</style>