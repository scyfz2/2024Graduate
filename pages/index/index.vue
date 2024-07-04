<template>
	<view class="home">
		<!-- 原动态高度区域 -->
		<!-- <view class="avatar-container grid justify-center" id="avatar-container" @touchstart="touchStart"
			@touchend="touchEnd" @touchmove="touchMove">
			<view class="avatar-bg-border" :style="{ height: maskSizeHeight+'px',}">
				<image @touchstart="touchAvatarBg" :style="{ height: maskSizeHeight+'px',}" class="bg avatar-bg"
					id="avatar-bg" :src="avatarPath"></image>
			</view>
			<image style="position: absolute;" :src="imgurl" :style="{ 
				top: 15+'px', left: 15+'px', width: ma skSizeWidth+'px',height: maskSizeHeight+'px',}">
			</image>

			<image mode="aspectFit" class="mask flip-horizontal" :class="{maskWithBorder: showBorder}" id='mask'
				:src="gsUrl"
				:style="{ width: maskSizeWidth1+'px',height: maskSizeHeight1+'px',
				top: maskCenterY - maskSizeWidth1/2-2+'px', left: maskCenterX - maskSizeHeight1/2-2+'px', transform: 'rotate(' +rotate+ 'deg)' + 'scale(' +scale+')' + 'rotateY('+ rotateY +'deg)'}">
			</image>
			<text @click="closeGuashi()" class="cuIcon-close handle circle" :class="{hideHandle: !showBorder}"
				id="handle"
				:style="{top:cancelCenterY- maskSizeWidth1/2  + 'px', left:cancelCenterX- maskSizeHeight1/2+'px'}"></text>
			<text class="cuIcon-full handle circle" :class="{hideHandle: !showBorder}" id="handle"
				:style="{top:handleCenterY + 'px', left:handleCenterX- maskSizeHeight1/2  +'px'}"></text>

		</view> -->
		<view class="body">
			<view class="avatar-container grid justify-center" :class="type" id="avatar-container"
				@touchstart.stop="touchStart" @touchend.stop="touchEnd" @touchmove.stop="touchMove">
				<view class="avatar-bg-border">
					<image @touchstart="touchAvatarBg" class="bg avatar-bg" id="avatar-bg" :src="avatarPath"></image>
				</view>
				<!-- <image style="position: absolute; width: 100% ;height: 100%" :src="imgurl"> -->
				<image style="position: absolute; width: 100%; height: 100%;" :src="imgurl" mode="widthFix">
				</image>

				<!-- <image mode="aspectFit" class="mask flip-horizontal" :class="{maskWithBorder: showBorder}" id='mask'
					:src="gsUrl"
					:style="{ width: maskSizeWidth1+'px',height: maskSizeHeight1+'px',
				top: maskCenterY - maskSizeHeight1/2+'px', left: maskCenterX - maskSizeWidth1/2+'px', transform: 'rotate(' +rotate+ 'deg)' + 'scale(' +scale+')' + 'rotateY('+ rotateY +'deg)'}">
				</image> -->
				<view v-for="(item,index) in maskOptList" :id="`mask_${item.key}`" :data-key="`mask_${item.key}`"
					:data-index="index" :key="item.key" class="m-mask-item" :class="{maskWithBorder: item.edit }"
					:style="{ width: item.width+'px',height: item.height+'px',
				top: item.centerY - item.height/2+'px', left: item.centerX - item.width/2+'px', transform: 'rotate(' +item.rotate+ 'deg)' + 'scale(' +item.scale+')' + 'rotateY('+ item.rotateY +'deg)'}">
					<view class="m-mask-view">
						<image :src="item.url" mode="" :id="`mask_${item.key}`" :data-key="`mask_${item.key}`" :data-index="index">
						</image>
						<text @touchstart.stop="closeGuashi(index)" class="cuIcon-close handle circle"
							:class="{hideHandle: !item.edit}" id="handle" :data-key="`mask_${item.key}`"
							:style="{top: 0  + 'px', left:'0px'}"></text>
						<text class="cuIcon-full handle circle" :class="{hideHandle: !item.edit}" :data-key="`mask_${item.key}`"
							id="handle" :style="{bottom:0+ 'px', left:'0px'}"></text>
					</view>
				</view>



			</view>

		</view>
		<view class="watermark">
			<text class="watermark1">
				{{step < 1 ? "Please choose a picture" : "Use two fingers to drag & zoom-in/out"}}

				<!-- <text class="watermark1-content">Graduation</text> -->
			</text>
			<view class="watermark2">
				Graduation
			</view>
		</view>

		<liu-picture-composition ref="picRef" :bgUrl="bgUrl" :photoUrl="photoUrl" :guashiUrl="gsUrl" :width="imgWidth"
			:height="imgHeight" :dWidth="imgWidth" :dHeight="imgHeight" :radioFun="getRatioFun" :maskList="maskOptList" :x="0"
			:y="0" :dx="0" :dy="0" :rotate="rotate" :scale="scale" @change="change"></liu-picture-composition>

		<view class="choose">
			<view class="flex-col section" v-if="step == 0">
				<view class="flex-row items-center biaoti">
					<view class="green_spot"></view>
					<text class="font_step">Step 1 / Choose Pic & Frame</text>
				</view>
				<scroll-view class="scroll" scrollWithAnimation scrollX :scrollLeft="scrollLeft">
					<view class="group">

						<view :class="imgSelectIndex == index ? 'selectedClass' : 'selectedClassDefault'"
							@click="selectImg(item,index,'endlong')" class="item" v-for="(item,index) in imgList0" :key="index">
							<image class="frame_1" mode="widthFix" :src="item" />
						</view>


						<view :class="imgSelectIndex == index ? 'selectedClass' : 'selectedClassDefault'"
							@click="selectImg(item,index, 'across')" class="item" v-for="(item,index) in imgList1" :key="index">
							<image class="frame_2" mode="widthFix" :src="item" />
						</view>

					</view>
				</scroll-view>
				<view class="flex-row group_6 mt-27">
					<view class="flex-col items-center button text-wrapper_3" @click="onChooseAvatar">
						<text class="button_font">Choose a Pic</text>
					</view>
					<view class="ml-16 flex-col items-center button text-wrapper_4"
						:class="nextState ? 'text-wrapper_4_bg1' : 'text-wrapper_4_bg2'" @click="nextStep1()">
						<text class="button_font" style="color: white;">Next</text>
					</view>
				</view>
			</view>
			<view class="flex-col section" v-if="step == 1">
				<view class="flex-row items-center biaoti">
					<view class="green_spot" style="background-color: #F98109;"></view>
					<text class="font_step">Step 2 / Add Sticker</text>
				</view>
				<scroll-view class="scroll" scrollWithAnimation scrollX :scrollLeft="scrollLeft">
					<view class="group">
						<view :class="getMaskOptKey.indexOf(index) > -1 ? 'selectedClass' : 'selectedClassDefault'"
							@click="selectImg1(item,index)" class="item" v-for="(item,index) in imgList2" :key="index">
							<image class="frame_2" mode="widthFix" :src="item" />
						</view>
					</view>
				</scroll-view>
				<view class="flex-row group_6 mt-27">
					<view class="flex-col items-center button text-wrapper_3" @click="nextStepBack">
						<text class="button_font">Back</text>
					</view>
					<view class="ml-16 flex-col items-center button text-wrapper_5"
						:class="maskOptList.length > 0 ? 'text-wrapper_5_bg1' : 'text-wrapper_5_bg2'" @click="compositionUrl()">
						<text class="button_font" style="color: white;">Generate</text>
					</view>
				</view>
			</view>
		</view>

		<ksp-cropper mode="fixed"  :width="modeWidth" :height="modeHeight" :maxWidth="1024" :maxHeight="1024" :url="url"
			@cancel="oncancel" @ok="onok"></ksp-cropper>



	</view>
</template>

<script>
	const list = {}
	var _self = null
	export default {
		data() {
			return {
				cropAspectRatio: '10:5',
				bgUrl: 'https://graduation-1313923643.cos.ap-nanjing.myqcloud.com/logo-back.png', //背景图片
				photoUrl: 'https://graduation-1313923643.cos.ap-nanjing.myqcloud.com/frame2.png', //头像图片
				gsUrl: "",

				url: "",
				path: "",

				type: "endlong",

				scrollLeft: 0,
				img_h: 0,
				step: 0,
				TabCur: 0,
				duration: 15,
				windowHeight: 0,
				cansWidth: 0, // 宽度 px
				cansHeight: 0, // 高度 px
				avatarPath: "",
				currentMaskId: -1,
				imgurl: "",
				imgurl1: "",
				showBorder: false,
				showBorder1: false,
				

				maskSize: 0,
				maskCenterX: wx.getSystemInfoSync().windowWidth / 2,
				maskCenterY: 150,
				cancelCenterX: wx.getSystemInfoSync().windowWidth / 2 - 50 - 2,
				cancelCenterY: 300,
				handleCenterX: wx.getSystemInfoSync().windowWidth / 2 + 50 - 2,
				handleCenterY: 200,

				maskSizeWidth: 489,
				maskSizeHeight: 489,

				maskSizeWidth1: 0,
				maskSizeHeight1: 0,

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

				start_x: 0,
				start_y: 0,

				touch_target: "",

				imgHeight: 0,
				imgWidth: 0,

				typeList: [],
				imgList: [],
				imgSelectIndex: null,
				imgList0: [
					"https://graduation-1313923643.cos.ap-nanjing.myqcloud.com/Group%2080.png",
					"https://graduation-1313923643.cos.ap-nanjing.myqcloud.com/Group%2085.png",
					"https://graduation-1313923643.cos.ap-nanjing.myqcloud.com/Group%2086.png",
					"https://graduation-1313923643.cos.ap-nanjing.myqcloud.com/Group%2089.png",
					"https://graduation-1313923643.cos.ap-nanjing.myqcloud.com/Group%2090.png",
					"https://graduation-1313923643.cos.ap-nanjing.myqcloud.com/Group%2091.png",
				],
				imgList1: [
					"https://graduation-1313923643.cos.ap-nanjing.myqcloud.com/Group%2081.png",
					"https://graduation-1313923643.cos.ap-nanjing.myqcloud.com/Group%2082.png",
					"https://graduation-1313923643.cos.ap-nanjing.myqcloud.com/Group%2083.png",
					"https://graduation-1313923643.cos.ap-nanjing.myqcloud.com/Group%2084.png",
					"https://graduation-1313923643.cos.ap-nanjing.myqcloud.com/Group%2087.png",
					"https://graduation-1313923643.cos.ap-nanjing.myqcloud.com/Group%2088.png",
				],
				imgSelectIndex1: null,
				imgList2: [
					"https://graduation-1313923643.cos.ap-nanjing.myqcloud.com/s1.png",
					"https://graduation-1313923643.cos.ap-nanjing.myqcloud.com/s2.png",
					"https://graduation-1313923643.cos.ap-nanjing.myqcloud.com/s3.png",
					"https://graduation-1313923643.cos.ap-nanjing.myqcloud.com/s4.png",
					"https://graduation-1313923643.cos.ap-nanjing.myqcloud.com/s5.png",
					"https://graduation-1313923643.cos.ap-nanjing.myqcloud.com/s6.png",
					"https://graduation-1313923643.cos.ap-nanjing.myqcloud.com/s7.png",
					"https://graduation-1313923643.cos.ap-nanjing.myqcloud.com/s8.png",
					"https://graduation-1313923643.cos.ap-nanjing.myqcloud.com/s9.png",
					"https://graduation-1313923643.cos.ap-nanjing.myqcloud.com/s10.png",
					"https://graduation-1313923643.cos.ap-nanjing.myqcloud.com/s11.png",
					"https://graduation-1313923643.cos.ap-nanjing.myqcloud.com/s12.png",
					"https://graduation-1313923643.cos.ap-nanjing.myqcloud.com/s13.png",
					"https://graduation-1313923643.cos.ap-nanjing.myqcloud.com/s14.png",
					"https://graduation-1313923643.cos.ap-nanjing.myqcloud.com/s15.png",
					"https://graduation-1313923643.cos.ap-nanjing.myqcloud.com/s16.png",
					"https://graduation-1313923643.cos.ap-nanjing.myqcloud.com/s17.png",
					"https://graduation-1313923643.cos.ap-nanjing.myqcloud.com/s18.png",
					"https://graduation-1313923643.cos.ap-nanjing.myqcloud.com/s19.png",
					"https://graduation-1313923643.cos.ap-nanjing.myqcloud.com/s20.png",
					"https://graduation-1313923643.cos.ap-nanjing.myqcloud.com/s21.png",
					"https://graduation-1313923643.cos.ap-nanjing.myqcloud.com/s22.png",
					"https://graduation-1313923643.cos.ap-nanjing.myqcloud.com/s23.png",
					"https://graduation-1313923643.cos.ap-nanjing.myqcloud.com/s24.png",
					"https://graduation-1313923643.cos.ap-nanjing.myqcloud.com/s25.png",
				],
				maskOptList: [],
			}
		},
		computed: {
			getMaskOptKey() {
				return this.maskOptList.map(item => item.key)
			},
			modeWidth() {
				let width = 575;
				if(this.type !== 'endlong') {
					width = 767;
				}
				return width;
			},
			modeHeight() {
				let height = 767;
				if(this.type !== 'endlong') {
					height = 575;
				}
				return height;
			},
			maskPic: function() {
				var pic = this.imgurl;
				console.log(pic)
				return pic;
			},
			maskPic1: function() {
				var pic = this.imgurl1;
				console.log(pic)
				return pic;
			},
			nextState() {
				let state = false;
				if (this.avatarPath != null) {
					state = true;
				}
				return state
			}
		},
		onLoad(option) {
			_self = this
			this.initial = {}
			this.windowHeight = getApp().globalData.windowHeight;
			console.log("=======", this.maskSizeHeight)
			this.img_h = this.windowHeight - 237 - 30

			var maxWidth = getApp().globalData.windowWidth - 30;
			// this.maskCenterY = this.img_h / 2
			this.maskSizeHeight = maxWidth * 653 / 489
			this.maskSizeWidth = maxWidth

			this.imgSelectIndex = 0
			// this.selectImg(this.imgList1[this.imgSelectIndex], this.imgSelectIndex)
		},
		methods: {
			getRatioFun(val, item) {
				let ratio = _self.imgWidth / uni.upx2px(513)
				return ratio * val
			},
			throttle(func, wait) {
				let lastTime = 0;
				return function(...args) {
					const now = new Date().getTime();
					if (now - lastTime >= wait) {
						lastTime = now;
						func.apply(this, args);
					}
				};
			},
			compositionUrl() {
				this.$nextTick(res => {
					this.$refs.picRef.getNewUrl()
				})
			},
			change(e) {
				console.log("实际上1", e);
				this.throttle(this.handleSkip(e), 500)
			},
			handleSkip(e) {
				if (this.maskOptList.length < 1) {
					uni.showToast({
						title: 'choose tags',
						duration: 2000,
						icon: "none"
					})
					return
				}
				let _this = this;
				const tempFilePath = e; // 替换为实际的临时文件路径
				uni.navigateTo({
					url: `/pages/preview/index?path=${encodeURIComponent(tempFilePath)}&type=${_this.type}`
				});
			},
			async onChooseAvatar(e) {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', "camera "], //从相册选择
					// crop: {
					// 	quality: 50,
					// 	width: 300,
					// 	height: 300,
					// 	resize: true
					// },
					success: (res) => {
						console.log(res)
						this.url = res.tempFilePaths[0];

						// this.avatarPath = res.tempFilePaths[0];
					}
				});
				// let _this = this;
				// uni.chooseImage({
				// 	count: 1, // 默认选择一张图片
				// 	sizeType: ['original', 'compressed'], // 可以选择原图或压缩图
				// 	sourceType: ['album', 'camera'], // 可以从相册选择或使用相机拍摄
				// 	success: function(chooseImageRes) {
				// 		const tempFilePaths = chooseImageRes.tempFilePaths;
				// 		uni.cropImage({
				// 			src: tempFilePaths[0], // 图片路径
				// 			destWidth: 300, // 裁剪后的宽度
				// 			destHeight: 300, // 裁剪后的高度
				// 			quality: 1, // 裁剪后的图片质量
				// 			success: function(cropImageRes) {
				// 				_this.url = cropImageRes.tempFilePath
				// 				console.log('裁剪后的图片路径：' + cropImageRes.tempFilePath);
				// 			},
				// 			fail: function(err) {
				// 				console.error('裁剪失败：' + err.errMsg);
				// 			}
				// 		});
				// 	}
				// });
			},
			onok(ev) {
				console.log("事件触发");
				this.url = "";

				this.path = ev.path;
				this.bgUrl = ev.path;
				this.avatarPath = ev.path;
				console.log("----ev.path-", ev.path)
			},
			oncancel() {
				// url设置为空，隐藏控件
				this.url = "";
			},
			nextStepBack() {
				this.step = 0
				this.showBorder = false
				this.gsUrl = null
				this.imgSelectIndex1 = null
			},
			selectImg(item, index, type) {
				this.type = type || 'endlong';
				console.log(item, index)
				// this.avatarPath = item
				// this.changeMask()
				this.imgSelectIndex = index
				let self = this;
				var url = item
				uni.getImageInfo({
					src: url,
					success(res) {
						console.log('-----res--', res)
						var maxWidth = getApp().globalData.windowWidth - 30;
						self.maskCenterY = self.img_h / 2

						self.maskSizeHeight = maxWidth * res.height / res.width
						self.maskSizeWidth = maxWidth

						self.avatarPath = null

						self.imgHeight = res.height
						self.imgWidth = res.width

						self.cansWidth = self.maskSizeWidth
						self.cansHeight = self.maskSizeHeight

					}
				})
				uni.downloadFile({
					url: url,
					success: function(res) {
						console.log('-------', res)
						uni.hideLoading();
						console.log(res.tempFilePath);
						self.imgurl = res.tempFilePath
						self.photoUrl = res.tempFilePath

						self.maskSize = 0

						self.maskCenterX = wx.getSystemInfoSync().windowWidth / 2
						self.maskCenterY = 150

						self.cancelCenterX = wx.getSystemInfoSync().windowWidth / 2 - self.maskSizeWidth1 / 2 -
							2
						self.cancelCenterY = 300

						self.handleCenterX = wx.getSystemInfoSync().windowWidth / 2 + self.maskSizeWidth1 / 2 -
							2
						self.handleCenterY = 200

					},
					fail: function(e) {}
				})

			},
			selectImg1(item, index) {
				console.log(item)
				let indx = this.maskOptList.findIndex(val => val.key === index)
				if (indx > -1) {
					this.maskOptList.splice(indx)
					return false;
				}
				this.imgSelectIndex1 = index
				let self = this;
				var url = item

				uni.getImageInfo({
					src: url,
					success(res) {
						console.log('-----res--', res)
						var maxWidth = 80;
						self.maskOptList.forEach(v => v.edit = false)
						self.maskOptList.push({
							key: index,
							centerX: uni.upx2px(513) / 2,
							centerY: 100,
							width: maxWidth,
							height: maxWidth * res.height / res.width,
							scale: 1,
							rotate: 0,
							rotateY: 0,
							url: res.path,
							edit: true
						})
					}
				})
				// uni.downloadFile({
				// 	url: url,
				// 	success: function(res) {
				// 		console.log("+++++", res);
				// 		// self.imgurl1 = res.tempFilePath
				// 		self.gsUrl = res.tempFilePath
				// 	},
				// 	fail: function(e) {}
				// })
			},
			closeGuashi(index) {
				console.log(index);
				this.maskOptList.splice(index, 1)
			},
			touchAvatarBg() {
				this.showBorder = false;
				this.showBorder1 = false
			},
			touchStart(e) {
				console.log('e.target.id', e.target);
				this.maskOptList.forEach(v => {
					if (`mask_${v.key}` == e.target.dataset.key) {
						v.edit = true
					} else {
						v.edit = false
					}
				})
				if (e.target.id.indexOf("mask") > -1) {
					this.touch_target = "mask";
					this.showBorder = true;
				} else if (e.target.id == "handle") {
					this.touch_target = "handle"
					let item = this.maskOptList.find(item => item.edit)
					this.initial = {
						initialX: item.centerX,
						initialY: item.centerY,
						initialH: item.height,
						initialW: item.width,
						initialRotate: item.rotate
					}
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
				let maxX = uni.upx2px(513)
				let maxY = maxX * this.imgHeight / this.imgWidth
				if (this.touch_target.indexOf("mask") > -1) {
					let item = this.maskOptList.find(item => item.edit)
					let x = item.centerX + moved_x
					let y = item.centerY + moved_y

					if (x < item.width / 2) {
						x = item.width / 2
					}
					if (x > maxX - item.width / 2) {
						x = maxX - item.width / 2
					}

					if (y < item.height / 2) {
						y = item.height / 2
					}
					if (y > maxY - item.height / 2) {
						y = maxY - item.height / 2
					}

					item.centerX = x
					item.centerY = y
					// console.log(item);

					// this.maskCenterX = this.maskCenterX + moved_x;
					// this.maskCenterY = this.maskCenterY + moved_y;
					// this.cancelCenterX = this.cancelCenterX + moved_x;
					// this.cancelCenterY = this.cancelCenterY + moved_y;
					// this.handleCenterX = this.handleCenterX + moved_x;
					// this.handleCenterY = this.handleCenterY + moved_y;
					this.start_x = current_x;
					this.start_y = current_y;
				};
				if (this.touch_target == "handle") {
					// 计算点到中心点的角度
					const {
						initialX,
						initialY,
						initialRotate
					} = this.initial
					let item = this.maskOptList.find(item => item.edit)
					let {
						centerX,
						centerY
					} = item
					const angleBefore = Math.atan2(this.start_y - centerY, this.start_x - centerX) / Math.PI * 180;
					const angleAfter = Math.atan2(current_y - centerY, current_x - centerX) / Math.PI * 180;
					// 旋转的角度
					item.rotate = initialRotate + angleAfter - angleBefore

					//缩放部分
					const {
						initialH,
						initialW
					} = this.initial
					//用勾股定理算出距离
					let lineA = Math.sqrt(Math.pow(centerX - this.start_x, 2) + Math.pow(centerY - this.start_y, 2));
					let lineB = Math.sqrt(Math.pow(centerX - current_x, 2) + Math.pow(centerY - current_y, 2));
					let w = initialW + (lineB - lineA);
					//由于是等比缩放，所以乘一个宽高比例。
					let h = initialH + (lineB - lineA) * (initialH / initialW);
					//定义最小宽高
					item.width = w <= 5 ? 5 : w;
					item.height = h <= 5 ? 5 : h;
					if (w > 5 && h > 5) {
						// 放大 或 缩小
						item.x = initialX - (lineB - lineA) / 2;
						item.y = initialY - (lineB - lineA) / 2;
					}



					// this.handleCenterX = this.handleCenterX + moved_x;
					// this.handleCenterY = this.handleCenterY + moved_y;
					// this.cancelCenterX = 2 * this.maskCenterX - this.handleCenterX;
					// this.cancelCenterY = 2 * this.maskCenterY - this.handleCenterY;
					// let diff_x_before = this.handle_center_x - this.mask_center_x;
					// let diff_y_before = this.handle_center_y - this.mask_center_y;
					// let diff_x_after = this.handleCenterX - this.mask_center_x;
					// let diff_y_after = this.handleCenterY - this.mask_center_y;
					// let distance_before = Math.sqrt(diff_x_before * diff_x_before + diff_y_before * diff_y_before);
					// let distance_after = Math.sqrt(diff_x_after * diff_x_after + diff_y_after * diff_y_after);
					// let angle_before = Math.atan2(diff_y_before, diff_x_before) / Math.PI * 180;
					// let angle_after = Math.atan2(diff_y_after, diff_x_after) / Math.PI * 180;
					// this.scale = distance_after / distance_before * this.scaleCurrent;
					// this.rotate = angle_after - angle_before + this.rotateCurrent;
				}

			},
			touchEnd(e) {
				console.log(e);
				this.mask_center_x = this.maskCenterX;
				this.mask_center_y = this.maskCenterY;
				this.cancel_center_x = this.cancelCenterX;
				this.cancel_center_y = this.cancelCenterY;
				this.handle_center_x = this.handleCenterX;
				this.handle_center_y = this.handleCenterY;
				this.touch_target = "";
				this.scaleCurrent = this.scale;
				this.rotateCurrent = this.rotate;

				console.log("----x", this.cancel_center_x)
				console.log("----y", this.cancel_center_y)
			},
			getRotationAngle(centerX, centerY, x, y) {
				// 计算点到中心点的角度
				let angle = Math.atan2(y - centerY, x - centerX) * 180 / Math.PI;

				// 转换为正角度
				// if (angle < 0) {
				//     angle += 360;
				// }

				return angle;
			},
			// 选择挂件
			changeMask() {
				let self = this;
				var url = "https://graduation-1313923643.cos.ap-nanjing.myqcloud.com/frame1.png"
				uni.downloadFile({
					url: url,
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
			nextStep1() {
				// if (this.imgSelectIndex == null) {
				// 	uni.showToast({
				// 		title: 'choose frame',
				// 		duration: 2000,
				// 		icon: "none"
				// 	})
				// 	return
				// }
				if (this.avatarPath == null) {
					uni.showToast({
						title: 'choose pic',
						duration: 2000,
						icon: "none"
					})
					return
				}
				this.nextState = true;
				this.step = 1
				this.showBorder = false;
			},
			// 绘制头像
			draw() {
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
					pc.drawImage(_this.maskPic, 0, 0, _this.cansWidth, _this.cansHeight);
					pc.translate(mask_center_x, mask_center_y);
					pc.rotate(rotate * Math.PI / 180);
					if (_this.isAndroid) {
						_this.rotateY == 180 && pc.scale(-1, 1);
					}
					// pc.drawImage(_this.maskPic1, -mask_size / 2, -mask_size / 2, mask_size, mask_size);

					pc.draw();
					_this.saveCans();

					return

					pc.clearRect(0, 0, _this.maskSizeWidth, _this.maskSizeHeight);

					pc.drawImage(_this.avatarPath, 0, 0, _this.maskSizeWidth, _this.maskSizeHeight);
					pc.drawImage(_this.maskPic, 0, 0, _this.maskSizeWidth, _this.maskSizeHeight);

					// pc.drawImage(_this.maskPic1, -_this.maskSizeWidth1 / 2, -_this.maskSizeHeight1 / 2, _this
					// 	.maskSizeWidth1, _this.maskSizeHeight1);

					// pc.drawImage(_this.maskPic1, -mask_size / 2, -mask_size / 2, mask_size, mask_size);
					pc.translate(mask_center_x, mask_center_y);
					// pc.rotate(rotate * Math.PI / 180);
					// if (_this.isAndroid) {
					// 	_this.rotateY == 180 && pc.scale(-1, 1);
					// }


					// pc.clearRect(0, 0, _this.cansWidth, _this.cansHeight);
					// pc.drawImage(_this.maskPic, -mask_size / 2, -mask_size / 2, mask_size, mask_size);
					// pc.drawImage(_this.maskPic, -_this.cansWidth, 0, _this.cansWidth, _this.cansHeight);
					// pc.translate(_this.cansWidth/2, _this.cansHeight/2);
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
					destWidth: this.cansWidth * 1.337,
					destHeight: this.cansHeight * 1.337,
					canvasId: 'cans-id-mask',
					success: function(res) {
						uni.hideLoading();
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success: function(res) {
								// uni.showModal({
								// 	title: '保存成功',
								// 	content: '头像已经在您的相册里啦',
								// 	showCancel: false
								// });
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

<style scoped lang="scss">
	page {
		height: 50vh;
		overflow: hidden;
		// height: 100vh;
		/* 使用视口高度 */
		background-color: #F3F4F5s;
	}

	.home {
		width: 100%;
		// height: 100vh;
		text-align: center;
		// background: #ffffff;
	}

	.body {

		width: 100%;
		position: fixed;
	}

	.touxiang {
		background-color: #ff5500;
		height: 990rpx;
		width: 100%;
	}

	.image {
		filter: drop-shadow(0rpx 1.91rpx 9.54rpx #0000001a);
		width: 650.76rpx;
		height: 488.55rpx;
	}

	.section {
		width: 100vw;
		padding: 54.47rpx 34.35rpx 75rpx 52.52rpx;
		/* 将底部填充设置为 0 */
		background-color: #10263b;
		// height: 100%;
		/* 确保容器高度占据父元素的整个高度 */
		box-sizing: border-box;
		/* 确保 padding 在高度计算中 */
		border-radius: 40rpx 40rpx 0 0;
	}

	.font {
		font-size: 24.81rpx;
		font-family: PingFang SC;
		line-height: 18.42rpx;
		font-weight: 600;
		color: #ffffff;
	}

	.font_step {
		color: #ffffff;
		font-size: 31rpx;
		font-family: Circular Pro;
		line-height: 28rpx;
		font-style: italic;
	}

	.choose {
		position: fixed;
		left: 0;
		bottom: 0;
		// padding-bottom: 10px;
		// width: 100%;
	}

	.biaoti {
		display: flex;
		align-items: center;
		flex-wrap: nowrap;
		margin-bottom: 42.35rpx;

		.font {
			flex: none;
		}

		.line {
			background-color: #e2e2e236;
			height: 1.91rpx;
			flex: 1;
			margin-left: 30rpx;
		}
	}

	.green_spot {
		background-color: #8fc31f;
		border-radius: 50%;
		width: 23rpx;
		height: 23rpx;
		margin-right: 20rpx;
	}

	.orange_spot {
		background-color: #F98109;
		border-radius: 50%;
		width: 23rpx;
		height: 23rpx;
		margin-right: 20rpx;
	}

	.frame_1 {
		width: 128rpx;
		height: 170rpx;
	}

	.frame_2 {
		top: 24rpx;
		width: 60%;
		// width: 170rpx;
		// height: 128rpx;
		object-fit: contain;
	}

	.scroll {
		width: 90vw;
		margin-top: 22rpx;
		margin-bottom: 32rpx;
		box-sizing: border-box;
		white-space: nowrap;

		.item {
			width: 170rpx;
			height: 170rpx;
			background: #E3E3E3;
			display: inline-block;
			margin: 10rpx;
			flex: 0 0 auto;

			// display: flex;
			//   justify-content: center;
			//   align-items: center;
			// background-color: #f0f0f0;
			// overflow: hidden;
			// position: relative;
			.image {
				width: 80%;
				height: 80%;
				object-fit: contain;
			}
		}

		.group {
			display: flex;
			flex-wrap: nowrap;

			height: 170rpx;
		}

		.selectedClass {
			border: 1px solid #ffffff;
		}

		.selectedClassDefault {
			// border: 3px solid #fff;
		}

		.group2 {
			white-space: nowrap;
			height: 86rpx;

			.stickers {
				width: 170rpx;
				height: 86rpx;
				background: #E3E3E3;
				display: inline-block;
				margin-right: 10rpx;
			}
		}
	}




	/* Choose a Pic */

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

	.text-wrapper_3 {
		padding: 30.53rpx 0;
		background-color: #ffffff;
		border-radius: 57.25rpx;
		height: 89.69rpx;
	}

	.text-wrapper_4 {
		margin-left: 30rpx;
		padding: 30.53rpx 0;
		color: #fff;
		border-radius: 57.25rpx;
		height: 89.69rpx;
	}

	.text-wrapper_4_bg1 {
		background-color: #8FC31E;
	}

	.text-wrapper_4_bg2 {
		background-color: #dddfe2;
	}

	.text-wrapper_5 {
		margin-left: 30rpx;
		padding: 30.53rpx 0;
		color: #fff;
		border-radius: 57.25rpx;
		height: 89.69rpx;
	}

	.text-wrapper_5_bg1 {
		background-color: #F98109;
	}

	.text-wrapper_5_bg2 {
		background-color: #dddfe2;
	}

	.avatar-container {
		height: 400rpx;
		// position: fixed;
		// top:0;
		// left: 0;
		// width: 100%;
		// // margin-top: 100rpx;
		// margin-left: auto;
		// margin-right: auto;
		position: relative;
		// width: 75%;
		// height: 45vh;
		margin: auto;
		margin-top: 50rpx;
		margin-bottom: 55rpx;
	}

	.endlong {
		width: 513rpx;
		height: 667rpx;
	}

	.across {
		width: 568rpx;
		height: 426rpx;
		margin-top: 180rpx;
	}

	.avatar-bg-border {
		background-color: white;
		// border: 6px solid white;
		// border-radius: 10px;
		// width: calc(100% - 30px);
		// margin: 15px;
		// height: 582px;
		width: 100%;
		height: 100%;
	}

	.avatar-bg {
		background: #e5e5e5;
		// position: absolute;
		// z-index: 0;
		// height: 482px;
		// width: 100%;
		// width: calc(100% - 30px);
		width: 100%;
		height: 100%;
	}

	.action-wrapper {
		padding-top: 30rpx;
		padding-left: 50rpx;
		padding-right: 50rpx;
		font-weight: 800;
	}

	.watermark {
		position: fixed;
		bottom: 440rpx;
		width: 100%;

		.watermark1 {
			// width: 100%;
			// height: 60rpx;
			padding: 20rpx 50rpx;
			border-radius: 30rpx;
			text-align: center;
			background: #e5e5e5;
			color: #9d9d9d;
		}

		.watermark2 {
			width: 100%;
			text-align: center;
			font-size: 135rpx;
			color: #dddfe2;
			line-height: 210rpx;
		}
	}


	.share-wrapper {
		padding-top: 10rpx;
		padding-left: 100rpx;
		padding-right: 100rpx;
		font-weight: 800;
	}

	.mask {
		// height: 100px;
		// width: 100px;
		position: absolute;
		top: 50rpx;
		border: 3px solid rgba(255, 255, 255, 0.0);
		// background-color: red;
	}

	.m-mask-item {
		position: absolute;
		top: 50rpx;
		border: 3px solid rgba(255, 255, 255, 0.0);

		.m-mask-view {
			position: relative;
			width: 100%;
			height: 100%;
		}

		image {
			width: 100%;
			height: 100%;
		}
	}

	.mask1 {
		height: 100px;
		width: 100px;
		position: absolute;
		top: 50rpx;
		border: 3px solid rgba(255, 255, 255, 0.0);
	}

	.maskWithBorder {
		border: dashed 2px white;
	}

	.hideHandle {
		display: none;
	}

	.circle {
		border-radius: 50%;
		font-size: 35rpx;
		color: #000;
		line-height: 55rpx;
		text-align: center;
		background: #fff;
	}

	.handle,
	.cancel {
		position: absolute;
		z-index: 1;
		width: 55rpx;
		height: 55rpx;
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