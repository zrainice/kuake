// vux组件引入
import {
  ToastPlugin,
  AlertPlugin,
  ConfirmPlugin,
  LoadingPlugin
} from 'vux'

export default {
  install(Vue, options) {
    Vue.use(ToastPlugin)
    Vue.use(AlertPlugin)
    Vue.use(ConfirmPlugin)
    Vue.use(LoadingPlugin)
  }
}