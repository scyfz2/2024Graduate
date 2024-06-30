### liu-picture-composition适用于uni-app项目的canvas图片合成组件
### 本组件目前兼容微信小程序、H5
### 本组件是canvas图片合成组件，自由上传需要合成的图片，支持自定义图片大小、圆角、边框样式、边框颜色等，一键合成好看的头像
# --- 扫码预览、关注我们 ---

## 扫码关注公众号，查看更多插件信息，预览插件效果！ 

![](https://uni.ckapi.pro/uniapp/publicize.png)

### 使用示例
``` html
<view @click="compositionUrl">一键合成照片</view>
<liu-picture-composition ref="picRef" :bgUrl="bgUrl" :photoUrl="photoUrl" @change="change"></liu-picture-composition>
```
``` javascript

<script>
	export default {
		data() {
			return {
				bgUrl: '',//背景图片
				photoUrl: '',//头像图片
			}
		},

		methods: {
			compositionUrl() {
				this.$nextTick(res => {
					this.$refs.picRef.getNewUrl()
				})
			},
			change(e) {
				console.log('合成的图片地址:', e)
			},
		}
	}
</script>
```


### 属性说明
| 名称                         | 类型            | 默认值                  | 描述             |
| ----------------------------|---------------- | ---------------------- | ---------------|
| bgUrl                       | String          |                        | 背景图片地址
| photoUrl                    | String          |                        | 头像图片地址
| fileType                    | String          | png                    | 生成的图片格式(jpg或png)
| width                       | Number          | 300                    | 背景图片宽度(px)
| height                      | Number          | 300                    | 背景图片高度(px)
| dWidth                      | Number          | 200                    | 中间头像图片宽度(px)
| dHeight                     | Number          | 200                    | 中间头像图片高度(px)
| x                           | Number          | 0                      | 背景图片离左边的距离(px)
| y                           | Number          | 0                      | 背景图片离上边的距离(px)
| dx                          | Number          | 50                     | 中间头像离左边的距离(px)
| dy                          | Number          | 50                     | 中间头像离上边的距离(px)
| radius                      | Number          | 0                      | 背景图片圆角(px)
| lineWidth                   | Number          | 0                      | 背景图片边框宽度(px)
| lineColor                   | String          | #FFFFFF                | 背景图片边框颜色
| dRadius                     | Number          | 0                      | 中间头像圆角(px)
| dLineWidth                  | Number          | 0                      | 中间头像边框宽度(px)
| dLineColor                  | String          | #FFFFFF                | 中间头像边框颜色
| @change                     | Function        |                        | 图片合成成功回调事件









