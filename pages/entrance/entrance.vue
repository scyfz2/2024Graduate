<template>
<view class="flex-col justify-start relative page">
	
	<view class="rongqi">
		<view class="rongqi2">
		<image class="image pos_2" mode="widthFix" src="/static/logo.png" />
		<view class="font2024">
			<view class="font">2024</view>
			<view class="font">Happy graduation</view>
			<view class="font">Now is your time</view>
		</view>

		<view class="flex-col justify-start items-start pos_6">
		  <image class="image_2" mode="widthFix" src="/static/Union (2).png" />
		</view>
		
		<view class="flex-col justify-start items-start pos_7">
		  <image class="image_3" style="width: 100%;" mode="widthFix" src="/static/town.png" />
		</view>
		<view class="rongqi3">
			<view class="flex-col justify-start button"><text class="text">Time to shine</text></view>
			
			<view class="text_2">
			  Congratulations, class of 2024! Customize your graduation photos with unique frames and stickers.
			</view>
		</view>
		<view class="flex-col justify-start items-center button_2 text-wrapper_3" @click="handleEvent()"><text class="text_3">Start</text></view>
		</view>
	</view>
	
	<view class="right-half-banner">
	  <view class="confetti"></view>
	  <view class="confetti"></view>
	  <view class="confetti"></view>
	  <view class="confetti"></view>
	  <view class="confetti"></view>
	  <view class="confetti"></view>
	  <view class="confetti"></view>
	  <view class="confetti"></view>
	  <view class="confetti"></view>
	  <view class="confetti"></view>
	  <view class="confetti"></view>
	  <view class="confetti"></view>
	  <view class="confetti"></view>
	  <view class="confetti"></view>
	  <view class="confetti"></view>
	  <view class="confetti"></view>
	  <view class="confetti"></view>
	  <view class="confetti"></view>
	  <view class="confetti"></view>
	  <view class="confetti"></view>
	  <view class="confetti"></view>
	  <view class="confetti"></view>
	  <view class="confetti"></view>
	  <view class="confetti"></view>
	  <view class="confetti"></view>
	</view>

</view>


</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {};
  },
  // onShareAppMessage: function() {
  // 	return {
  // 		title: '2024 Summer',
  // 		path: 'pages/entrance/entrance'
  // 	};
  // },
  // onShareTimeline: function() {
  // 	return {
  // 		title: '2024 Summer'
  // 	};
  // },

  methods: {
		handleEvent() {
			uni.navigateTo({
				url: `/pages/index/index`
			});
		}
	},
};
</script>

<style scoped lang="css">
	
.page {
  background-color: #ffffff;
  background-image: linear-gradient(194.5deg, #10263b 43.5%, #2b67a1 100%);
  width: 100%;
  min-height: 100vh; /* 使用视口高度 */
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column; /* 确保内容垂直排列 */
}


.rongqi {
  height: 100%; /* 使用视口高度 */
}
.rongqi2 {
  position: absolute;
  left: 0;
  width: 100vw;
  top: 30rpx;
}

.image {
  width: 326rpx;
  margin-left: 42rpx;
	margin-top: 85rpx;
}
.font2024 {
  margin-left: 84rpx;
  margin-top: 54rpx;
}

.font {
  font-size: 70rpx;
  font-family: Circular Pro;
  line-height: 84rpx;
  font-weight: 700;
  color: #ffffff;
}

.pos_6 {
  margin-top: 20rpx;
  margin-left: -5rpx;
}
.image_2 {
  width: 430rpx;
 animation: swing 2s infinite ease-in-out;
}

@keyframes swing {
  0% {
    transform: rotate(5deg);
  }
  50% {
    transform: rotate(-5deg);
  }
  100% {
    transform: rotate(5deg);
  }
}

.button {
  background-color: #ffffff5c;
  border-radius: 20px;
  margin-left: 40rpx;
  width: 327rpx;
  height: 74rpx;
	padding-left: 10rpx;
  line-height: 74rpx;
}

.text {
  margin-left: 32rpx;
  margin-right: 16rpx;
  margin-bottom: 56rpx;
  color: #ffffff;
  font-size: 40rpx;
  font-family: Circular Pro;
  line-height: 40rpx;
}
.text-wrapper {
  padding: 196px 0 8px;
  background-image: url('/static/town.png'); /* 修改路径 */
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.rongqi3 {
  margin-top: -330rpx;
}
.pos_7 {
  width: 100vw;
  margin-top: -120rpx;
}
.text_2 {
  margin-left: 40rpx;
  margin-right: 8rpx;
  padding-left: 20rpx;
  margin-top: 42rpx;
  position: relative;
  color: #ffffff;
  font-size: 36rpx;
  font-family: Inter;
  font-weight: 300;
  line-height: 44rpx;
  width: 400rpx;
  box-sizing: border-box;
}
.button_2 {
  position: absolute;
  /* right: 11vw; */
  top: 85vh;
  left: 50%;
  transform: translateX(-50%);
}

.text-wrapper_3 {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  background-color: #ffffff;
  border-radius: 60rpx;
  width: 672rpx; /* 使用视口宽度的百分比 */
  height: 106rpx; /* 使用视口高度的百分比 */
  border: solid 2rpx #ffffff;
  box-sizing: border-box; /* 包括内边距和边框 */
}

.text_3 {
  color: #061259;
  font-size: 36rpx;
  font-family: PingFang SC;
  line-height: 1.5; /* 修改为相对行高 */
  text-align: center;
}

.right-half-banner {
    position: absolute;
    top: 0;
    right: 0;
    width: 95vw; /* 右半边屏幕宽度 */
    height: 87vh; /* 视口高度 */
    overflow: hidden; /* 隐藏超出部分 */
  }

.confetti {
  position: absolute;
  width: 60rpx; /* 长方形彩带的宽度 */
  height: 20rpx; /* 长方形彩带的高度 */
  background-color: #37B4B0; /* 彩带颜色，可以自定义 */
  top: -20rpx; /* 初始位置在屏幕外 */
  left: 50%; /* 从屏幕的中间开始 */
  transform: translateX(-50%); /* 向左移动50%，以居中对齐 */
  animation: confetti-fall 5s linear infinite;
}

.confetti:nth-child(2) {
  background-color: #D7336C; 
  animation: confetti-fall-alt 6s linear infinite; /* 使用不同的动画名称 */
  animation-delay: 1s; /* 延迟开始动画 */
  left: 60%; /* 从屏幕的中间开始 */
}

.confetti:nth-child(3) {
  background-color: #F98109; 
  animation-duration: 4s; /* 不同彩带可以有不同的动画持续时间 */
  animation-delay: 2s; /* 延迟开始动画 */
  left: 40%; /* 从屏幕的中间开始 */
}

.confetti:nth-child(4) {
  background-color: #792D85; 
  animation: confetti-fall-alt 6s linear infinite; /* 使用不同的动画名称 */
  animation-delay: 1.2s; /* 延迟开始动画 */
  left: 35%; /* 从屏幕的中间开始 */
}

.confetti:nth-child(5) {
  background-color: #8FC31F; 
  animation-duration: 8s; /* 不同彩带可以有不同的动画持续时间 */
  animation-delay: 1.4s; /* 延迟开始动画 */
  left: 25%; /* 从屏幕的中间开始 */
}

.confetti:nth-child(6) {
  background-color: #B91C2E; 
  animation: confetti-fall-alt 6s linear infinite; /* 使用不同的动画名称 */
  animation-delay: 1.6s; /* 延迟开始动画 */
  left: 80%; /* 从屏幕的中间开始 */
}

.confetti:nth-child(7) {
  background-color: #009BC1; 
  animation-duration: 6s; /* 不同彩带可以有不同的动画持续时间 */
  animation-delay: 1.8s; /* 延迟开始动画 */
  left: 75; /* 从屏幕的中间开始 */
}

.confetti:nth-child(8) {
  background-color: #37B4B0; 
  animation-duration: 7s; /* 不同彩带可以有不同的动画持续时间 */
  animation-delay: 2s; /* 延迟开始动画 */
  left: 65%; /* 从屏幕的中间开始 */
}

.confetti:nth-child(9) {
  background-color: #F98109; 
  animation-duration: 6.5s; /* 不同彩带可以有不同的动画持续时间 */
  animation-delay: 2.2s; /* 延迟开始动画 */
  left: 15%; /* 从屏幕的中间开始 */
}

.confetti:nth-child(10) {
  background-color: #B91C2E; 
  animation: confetti-fall-alt 3s linear infinite; /* 使用不同的动画名称 */
  animation-delay: 2.2s; /* 延迟开始动画 */
  left: 75%; /* 从屏幕的中间开始 */
}

.confetti:nth-child(11) {
  background-color: #D7336C; 
  animation: confetti-fall-alt2 7s linear infinite; /* 使用不同的动画名称 */
  animation-delay: 2.2s; /* 延迟开始动画 */
  left: 45%; /* 从屏幕的中间开始 */
}

.confetti:nth-child(12) {
  background-color: #F98109; 
  animation: confetti-fall-alt2 5s linear infinite; /* 使用不同的动画名称 */
  animation-delay: 2.2s; /* 延迟开始动画 */
  left: 35%; /* 从屏幕的中间开始 */
}

.confetti:nth-child(13) {
  background-color: #009BC1; 
  animation: confetti-fall-alt2 5.5s linear infinite; /* 使用不同的动画名称 */
  animation-delay: 2.2s; /* 延迟开始动画 */
  left: 25%; /* 从屏幕的中间开始 */
}

.confetti:nth-child(14) {
  background-color: #DEB406; 
  animation: confetti-fall-alt2 8.5s linear infinite; /* 使用不同的动画名称 */
  animation-delay: 2.2s; /* 延迟开始动画 */
  left: 15%; /* 从屏幕的中间开始 */
}

.confetti:nth-child(15) {
  background-color: #8FC31F; 
  animation: confetti-fall-alt2 6.5s linear infinite; /* 使用不同的动画名称 */
  animation-delay: 2.2s; /* 延迟开始动画 */
  left: 55%; /* 从屏幕的中间开始 */
}
.confetti:nth-child(16) {
  background-color: #8FC31F; 
  animation: confetti-fall-alt2 10s linear infinite; /* 使用不同的动画名称 */
  animation-delay: 2.2s; /* 延迟开始动画 */
  left: 5%; /* 从屏幕的中间开始 */
}
.confetti:nth-child(17) {
  background-color: #009BC1; 
  animation: confetti-fall-alt 10s linear infinite; /* 使用不同的动画名称 */
  animation-delay: 2.2s; /* 延迟开始动画 */
  left: 75%; /* 从屏幕的中间开始 */
}
.confetti:nth-child(18) {
  background-color: #37B4B0; 
  animation: confetti-fall-alt 10s linear infinite; /* 使用不同的动画名称 */
  animation-delay: 2.2s; /* 延迟开始动画 */
  left: 65%; /* 从屏幕的中间开始 */
}
.confetti:nth-child(19) {
  background-color: #F98109; 
  animation-duration: 4s; /* 不同彩带可以有不同的动画持续时间 */
  animation-delay: 2s; /* 延迟开始动画 */
  left: 20%; /* 从屏幕的中间开始 */
}
.confetti:nth-child(20) {
  background-color: #8FC31F; 
  animation: confetti-fall-alt2 10s linear infinite; /* 使用不同的动画名称 */
  animation-delay: 2.2s; /* 延迟开始动画 */
  left: 15%; /* 从屏幕的中间开始 */
}
.confetti:nth-child(19) {
  background-color: #F98109; 
  animation: confetti-fall-alt4 13s linear infinite; /* 使用不同的动画名称 */
  animation-delay: 4s; /* 延迟开始动画 */
  left: 20%; /* 从屏幕的中间开始 */
}
.confetti:nth-child(20) {
  background-color: #ffffff; 
  animation: confetti-fall-alt3 10s linear infinite; /* 使用不同的动画名称 */
  animation-delay: 2.2s; /* 延迟开始动画 */
  transform: rotate(80deg); 
  left: 15%; /* 从屏幕的中间开始 */
}
.confetti:nth-child(21) {
  background-color: #F98109; 
  animation: confetti-fall-alt5 12s linear infinite; /* 使用不同的动画名称 */
  animation-delay: 1.4s; /* 延迟开始动画 */
  left: 65%; /* 从屏幕的中间开始 */
}

.confetti:nth-child(22) {
  background-color: #B91C2E; 
  animation: confetti-fall-alt5 6s linear infinite; /* 使用不同的动画名称 */
  animation-delay: 2.6s; /* 延迟开始动画 */ 
  left: 15%; /* 从屏幕的中间开始 */
}

.confetti:nth-child(23) {
  background-color: #8FC31F; 
  animation: confetti-fall-alt5 8s linear infinite; /* 使用不同的动画名称 */
  animation-delay: 3.2s; /* 延迟开始动画 */
  left: 25%; /* 从屏幕的中间开始 */
}

.confetti:nth-child(24) {
  background-color: #009BC1; 
  animation: confetti-fall-alt5 7s linear infinite; /* 使用不同的动画名称 */
  animation-delay: 1.2s; /* 延迟开始动画 */
  left: 75%; /* 从屏幕的中间开始 */
}
/* 增加摆动组件数量 */
/* 增加摆动效果 */
  /* 定义彩带飘落的动画 */
@keyframes confetti-fall {
  0% {
    transform: translateY(0) translateX(0) rotate(0deg);
    opacity: 1;
  }
  50% {
    /* 在50%的时间点，彩带达到最大左右偏移量和旋转角度 */
    transform: translateY(80vh) translateX(20px) rotate(45deg);
    opacity: 0.8; /* 可以调整透明度变化，使效果更自然 */
  }
  100% {
    transform: translateY(85vh) translateX(-10px) rotate(-45deg);
    opacity: 0;
  }
}
  
@keyframes confetti-fall-alt {
  0% {
    transform: translateY(0) translateX(100px) rotate(0deg);
    opacity: 1;
  }
  50% {
    /* 50%的时间点，彩带达到最大左右偏移量和不同的旋转角度 */
    transform: translateY(80vh) translateX(-30px) rotate(-25deg);
    opacity: 0.8;
  }
  100% {
    transform: translateY(85vh) translateX(20px) rotate(15deg);
    opacity: 0;
  }
}

@keyframes confetti-fall-alt2 {
  0% {
    transform: translateY(0) translateX(100px) rotate(0deg);
    opacity: 1;
  }
  50% {
    /* 50%的时间点，彩带达到最大左右偏移量和不同的旋转角度 */
    transform: translateY(80vh) translateX(-15px) rotate(-10deg);
    opacity: 0.8;
  }
  100% {
    transform: translateY(85vh) translateX(10px) rotate(5deg);
    opacity: 0;
  }
}

@keyframes confetti-fall-alt3 {
  0% {
    transform: translateY(0) translateX(60px) rotate(50deg);
    opacity: 1;
  }
  50% {
    /* 50%的时间点 */
    transform: translateY(40vh) translateX(-35px) rotate(-90deg);
    opacity: 0.7;
  }
  75% {
    /* 75%的时间点*/
    transform: translateY(60vh) translateX(45px) rotate(40deg);
    opacity: 0.7;
  }
  100% {
    transform: translateY(85vh) translateX(30px) rotate(95deg);
    opacity: 0;
  }
}
@keyframes confetti-fall-alt4 {
  0% {
    transform: translateY(0) translateX(40px) rotate(-40deg);
    opacity: 1;
  }
  50% {
    /* 50%的时间点 */
    transform: translateY(40vh) translateX(85px) rotate(80deg);
    opacity: 0.7;
  }
  75% {
    /* 75%的时间点*/
    transform: translateY(60vh) translateX(-25px) rotate(-70deg);
    opacity: 0.7;
  }
  100% {
    transform: translateY(85vh) translateX(-40px) rotate(45deg);
    opacity: 0;
  }
}
@keyframes confetti-fall-alt5 {
  0% {
    transform: translateY(0) translateX(20px) rotate(-90deg);
    opacity: 1;
  }
  50% {
    /* 50%的时间点 */
    transform: translateY(30vh) translateX(-35px) rotate(90deg);
    opacity: 0.7;
  }
  75% {
    /* 75%的时间点*/
    transform: translateY(50vh) translateX(45px) rotate(-80deg);
    opacity: 0.7;
  }
  100% {
    transform: translateY(88vh) translateX(-40px) rotate(75deg);
    opacity: 0;
  }
}
</style>
