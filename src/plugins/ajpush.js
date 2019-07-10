// 极光推送 插件
class AjpushClass {
  constructor(ajInstance) {
    this.ajpush = ajInstance
  }
  // 初始化
  init() {
    console.log('ajPush init')
    this.ajpush.init()
  }
  // 绑定别名
  bindAliasAndTags() {
    this.ajpush.bindAliasAndTags()
  }
}

export default {
  install(Vue, options) {
    // 必须在app内才能调用此API
    // if (!api) {
    //   console.log('not in APP')
    //   return
    // }
    // const ajpush = api.require('ajpush')
    // console.log(ajpush)
    // let Ajpush = new AjpushClass(ajpush)
    // window.Ajpush = Ajpush
  }
}