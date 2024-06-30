import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

// import store from '@/store';
// let vuexStore = require('@/store/$u.mixin.js');
// Vue.mixin(vuexStore);

import {
	service
} from './service/index'

Vue.prototype.$http = service;

const app = new Vue({
    ...App
})

app.$mount()
