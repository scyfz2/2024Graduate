import config from '../utils/config'
import Request from './request/index'

export const service = new Request({
  BASE_URL: config.BASE_URL,
  TIME_OUT: config.TIME_OUT
})
