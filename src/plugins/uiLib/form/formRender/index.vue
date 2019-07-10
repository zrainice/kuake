<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
import _formRender from './index.js'
export default {
  props: {
    'model': {
      type: Object,
      default() {
        return {}
      }
    },
    'rules': { // 表单值规则
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {}
  },
  methods: {
    /**
     * 根据rules校验model对应的值
     */
    validate(callBack) {
      if (this._formRender_isRealEmpty(this.model)) {
        console.warn('props Field[model] is Required')
      }
      let errMsg = ''
      // 遍历判断数据值
      if (!this._formRender_isRealEmptyObject(this.rules)) {
        try {
          Object.keys(this.rules).forEach((key) => {
            this.rules[key].forEach((item) => {
              if (item.required) { // 必填规则标示
                if (this._formRender_isRealEmpty(this.model[key])) {// 必填规则判断值不能为空
                  errMsg = `${item.message ? item.message : '[' + key + ' is required]'}`
                  throw new Errow(errMsg)
                }
              } else if (item.validator) { // 自定义规则
                if (typeof item.validator === 'function') {
                  let _callBack = (message) => {
                    if (message) {
                      errMsg = message
                      throw new Errow(errMsg)
                    }
                  }
                  item.validator(item, this.model[key], _callBack)
                } else {
                  errMsg = 'validator must be a function'
                  throw new Errow(errMsg)
                }
              }
            })
          })
        } catch (err) {
          // console.warn(err)
          if (callBack) { callBack(false, errMsg) }
        }
      } else {
        console.warn('props Field[rules] is Required')
      }
      if (!errMsg) { // 校驗成功
        if (callBack) { callBack(true) }
      }
    }
  },
  mixins: [_formRender]
}
</script>

<style scoped>
</style>
