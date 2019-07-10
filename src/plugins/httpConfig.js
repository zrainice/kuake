/**
 * 网络请求控制模块
 * @Author Heziming
 * todo
 * 错误重连机制
 * 错误日志记录机制
 */
import Axios from 'axios'

// 初始化axios配置
export default function () {
  const HOST = 'http://kkappapi.wkuai.cc/'
  const uploadApi = '/admin/upload'

  Axios.defaults.baseURL = HOST

  // 拦截请求 添加请求头
  Axios.interceptors.request.use(function (config) {
    let token = localStorage.getItem('token')
    if (token) {
      config.headers.common['token'] = token + '%' + window.btoa(new Date().getTime())
    }
    $g.showLoading()
    // 在发送请求之前做些什么
    return config;
  })

  // 此处约定, 只要status为200 且后端处理逻辑200 即为正确的返回内容
  // 错误的话会直接抛出错误, 不会进行额外处理 如果有要求进行其他处理的话, 以后可以提出需求优化
  Axios.interceptors.response.use(function (response) {
    if (response.status == 200) {
      let data = response.data
      setTimeout(() => {
        $g.hideLoading()
      }, 300)
      if (data.code == 200) {
        return data.data || true
      } else {
        $g.toast(data.error, 'cancel')
        return false
      }
    } else {
      $g.toast('网络错误', 'cancel')
      return false
    }
  })

  window.axios = Axios
  window.HOST = HOST
  window.uploadApi = uploadApi
}
