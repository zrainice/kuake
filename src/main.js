// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import global from './assets/js/global'
import vuxPlugin from './plugins/vuxPlugin'
import popUp from './plugins/popUpManager/index'
import directives from './plugins/directive'
import httpInit from './plugins/httpConfig'
// import http from '@/assets/js/http'
import vConsole from 'vconsole'
import '@/assets/js/appApi.js'
import Vuex from 'vuex'
import store from './vuex/store'
// import vueg from 'vueg'
// import 'vueg/css/transition-min.css'
import '@/assets/iconfont/iconfont.css'
import '@/assets/js/response'
import '@/assets/styles/global.css'
import '@/assets/styles/vux-self.less'
import '@/assets/styles/common.less'
import '@/assets/js/gt.js'

// new vConsole()
Vue.use(router)
Vue.use(popUp)
Vue.use(directives)
// 苹果端300ms点击延迟解决方案
const FastClick = require('fastclick')
FastClick.attach(document.body)

Vue.config.productionTip = false

Vue.use(vuxPlugin)
Vue.use(Vuex)

// Vue.use(http)
/* eslint-disable no-new */
// 如果是app的话 就会有apiready事件 并且window中存在api对象 
// 组件中可以使用window.api 及 api.systemType来判断是否在APP中运行及系统类型
function initApp() {
  global.init(Vue)
  httpInit()
  setTimeout(() => {
    new Vue({
      el: '#app',
      router,
      store: new Vuex.Store(store),
      components: { App },
      template: '<App/>'
    })
  })
}

let timer = setTimeout(() => {
  initApp()
}, 200)
window.apiready = function () {
  clearTimeout(timer)
  initApp()
  $g.isAPP = true
  $g.isIOS = api.systemType != 'android'
  api.setStatusBarStyle({
    style: 'dark'
  })
  let timeHandler = null
  api.addEventListener({
    name: 'keyback'
  }, () => {
    // 处理两次点击退出app
    if (Vue.$hrPopUpManager.handleBack()) {
      if (router.history.current.meta.isHome) {
        if (!timeHandler) {
          Vue.$vux.toast.text('再点击一次退出APP', 'middle')
          timeHandler = setTimeout(() => {
            timeHandler = null
          }, 2000)
        } else {
          api.closeWidget({
            silent: true
          })
        }
      } else {
        router.goBack()
      }
    }
  })
}
window.router = router
window.isDev = process.env.NODE_ENV == 'development'