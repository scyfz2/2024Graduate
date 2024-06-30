<script>
	import Vue from 'vue'
	import API from 'api/api.js';
	
	let sysInfo = uni.getSystemInfoSync();
	let windowHeight = sysInfo.windowHeight;
	let windowWidth = sysInfo.windowWidth;
	let IS_ANDROID = !sysInfo.model.includes('iPhone');
	let statusBarHeight = sysInfo.statusBarHeight;
	const STORAGE_KEY = 'PLUG-ADD-MYAPP-KEY';
	const envId = 'ncov-production-wwomb';
	const collectionName = 'config_jill';
	const docId = 'mp_launch_config_doc';
	export default {
		globalData: {
			windowHeight: windowHeight,
			windowWidth:windowWidth,
			statusBarHeight: statusBarHeight,
			SHOW_TIP: false,
			duration: 20,
			cropImageFilePath: '',
			rapaintAfterCrop: false,
			PAGE_BG_COLOR: '#C12928',
			enableSecurityCheck: true,
			userAvatarUrl: null,
			userAvatarFilePath: null,
			maskAvatarSavedTempPath: null
		},
		onShow: function() {
			console.log('App Show')
			//获取app配置
			var systemInfo = uni.getSystemInfoSync()
			var appId = systemInfo.appId
			console.log(systemInfo)
			API.getAppConfig(appId).then(res => {
				console.log(res)
					this.$u.vuex('appconfig', res[0])
				})
				.catch(err => {
					console.log(err)
				})
		},
		onHide: function() {}
	}
</script>

<style>
	/*每个页面公共css */
	@import './common/uni.css';
	@import "colorui/main.css";
	@import "colorui/icon.css";
	@import "app.css";
</style>

