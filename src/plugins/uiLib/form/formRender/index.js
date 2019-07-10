const _formRender = {
  methods: {
    /**
     * isPrototypeof 一个对象是否存在于另一个对象的原型链上
     */
    _formRender_isRealEmpty(value) {
      // value为以下值时返回true：undefined,null,'',空数组,空对象
      return value === '' || value === undefined || value === null ||
      (Array.prototype.isPrototypeOf(value) && value.length === 0) ||
      (Object.prototype.isPrototypeOf(value) && Object.keys(value).length === 0)
    },
    _formRender_isRealEmptyObject(value) {
      return (Object.prototype.toString.call(value) === '[object Object]' && Object.keys(value).length === 0)
    }
  }
}

export default _formRender
