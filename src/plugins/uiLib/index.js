import Vue from 'vue'
// 表单类
import hrInput from './form/input/index.vue'
import hrUploadImg from './form/uploadImg/index.vue'
import hrFormRender from './form/formRender/index.vue'
// 布局类
import hrTab from './layouts/tab/tab.vue'
import hrTabItem from './layouts/tab/tabItem.vue'
// import hrOrderTab from './layouts/orderTab/login.vue'
import hrHeader from './layouts/header/index.vue'
import hrPage from './layouts/page/index.vue'

// 交互类
import hrScroller from './list/scroller/index'
// 工具类
import hrHttp from './assets/js/http.js'
import hrGlobal from './assets/js/global.js'

import vueScroller from 'vue-scroller'

Vue.use(vueScroller)

// 挂载到全局对象
window.$hrHttp = hrHttp
window.$hrGlobal = hrGlobal
// 判断当前设备是否属于APP
window.$hrApiInfo = {}
setTimeout(() => {
  window.$hrApiInfo['isApp'] = !!(window.api && window.api.systemType)
}, 1000)

export {
  hrInput,
  hrUploadImg,
  hrFormRender,
  hrTab,
  hrTabItem,
  hrHeader,
  hrPage,
  hrScroller
}
