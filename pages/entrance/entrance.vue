<template>
<view class="flex-col justify-start relative page">
	
	<view class="rongqi">
		<view class="rongqi2">
		<image class="image pos_2" mode="widthFix" src="/static/logo.png" />
		<view class="font2024">
			<view class="font">2024</view>
			<view class="font">Graduation</view>
			<view class="font">Title Here</view>
		</view>

		<view class="flex-col justify-start items-start pos_6">
		  <image class="image_2" mode="widthFix" src="/static/Union (2).png" />
		</view>
		
		<view class="flex-col justify-start items-start pos_7">
		  <image class="image_3" style="width: 100%;" mode="widthFix" src="/static/town.png" />
		</view>
		<view class="rongqi3">
			<view class="flex-col justify-start button"><text class="text">Subtitle Name</text></view>
			
			<view class="text_2">
			  Brief explanation of the function brief explanation of the function.
			</view>
		</view>
		<view class="flex-col justify-start items-center button_2 text-wrapper_3" @click="handleEvent()"><text class="text_3">Start</text></view>
		</view>
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
  onShareAppMessage: function() {
  	return {
  		title: '2024 Summer',
  		path: 'pages/entrance/entrance'
  	};
  },
  onShareTimeline: function() {
  	return {
  		title: '2024 Summer'
  	};
  },

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
  font-size: 80rpx;
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
  line-height: 84rpx;
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

</style>
