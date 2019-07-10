import Vue from "vue";

// 弹窗管理
class PopUpManager {
  constructor() {
    this.popList = []
  }

  // 弹出最后的一个弹窗实例并关闭
  pop() {
    if (this.popList.length) {
      let lastHandler = this.popList.pop()
      lastHandler()
      return false
    } else {
      return true
    }
  }

  /**
   * 处理关闭弹窗并进行删除弹窗管理栈中的handler
   * @param {function} cb 用于关闭弹窗的方法
   * return @param {function} handler
   *        直接调用即可关闭注册的窗口及在弹窗序列中删除该窗口
   */
  add(cb) {
    let handler = () => {
      if (typeof cb === 'function') {
        cb()
      }
      this.popList.splice(this.popList.indexOf(handler), 1)
    }
    this.popList.push(handler)
    return handler
  }

  // 处理点击返回按钮事件
  handleBack() {
    // 优先处理弹窗队列中注册的弹窗
    if (!this.pop()) return false
    // 处理
    if (Vue.$vux.confirm.isVisible()) {
      // confirm弹窗
      Vue.$vux.confirm.hide()
      return false
    } else if (Vue.$vux.alert.isVisible()) {
      // alert弹窗
      Vue.$vux.alert.hide()
      return false
    } else if (Vue.$vux.toast.isVisible()) {
      // toast弹窗
      Vue.$vux.toast.hide()
      return false
    }
    return true
  }
}
export default {
  install(vue, options) {
    vue.prototype.$hrPopUpManager = new PopUpManager()
    vue.$hrPopUpManager = new PopUpManager()
  }
}