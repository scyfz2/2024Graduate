
import store from '@/store'
class Request {
  constructor(config) {
    uni.addInterceptor('request', {
      //请求触发前的回调函数
      invoke(args) {
				let token = uni.getStorageSync('token');
        args.url = config.BASE_URL + args.url
        args.timeout = config.TIME_OUT
				args.header = {
					token: token,
					// token: "6845ac23-3d98-4320-9e4d-edf03e2ccdf5",
					// token: "d1f26209-66ea-4445-b56d-6bc32b9cf34a"
				}
      },
      //请求成功的回调函数
      success() {},
      //拦截失败回调函数
      fail(err) {
      },
      //拦截完成回调函数
      complete(res) {
				if(res && res.statusCode == 401) {
					store.commit('setIsLogin', true);
				}
			}
    })
  }
  request(config) {
    return new Promise((resolve, reject) => {
      uni.request({
        ...config,
        success: (res) => {
          resolve(res.data)
        },
        fail(err) {
          reject(err)
        }
      })
    })
  }
  get(config) {
    return this.request({
      ...config,
      method: 'GET'
    })
  }
  post(config) {
    return this.request({
      ...config,
      method: 'POST'
    })
  }
  put(config) {
    return this.request({
      ...config,
      method: 'put'
    })
  }
  delete(config) {
    return this.request({
      ...config,
      method: 'DELETE'
    })
  }
  patch(config) {
    return this.request({
      ...config,
      method: 'PATCH'
    })
  }
}
export default Request
