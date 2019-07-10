// 指令集
export default {
  install(Vue, options) {
    Vue.directive('safe-top', {
      inserted(el, binding, vnode, oldVnode) {
        if (window.api) {
          el.style.paddingTop = api.safeArea.top + 'px';
        }
      }
    })
  }
}