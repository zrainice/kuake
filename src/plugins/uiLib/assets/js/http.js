/**
 * 集成第三方请求模块，配置axios自身属性
 */
import axios from 'axios'

// 定义axios
let axiosInstance = axios.create({
  baseURL: '',
  timeout: 100000,
  headers: { 'Content-Type' : 'application/json' }
})

// 返回数据统一处理
axiosInstance.interceptors.response.use((response) => {
  return response
}, (error) => {
  console.log('error', '连接超时，请检查网络连接')
  return undefined
})

// 请求数据统一处理
axiosInstance.interceptors.request.use((config) => {
  // 此处需要补充header
  return config
}, (error) => {
  console.log('error', '连接超时，请检查网络连接')
  return undefined
})

export default axiosInstance
