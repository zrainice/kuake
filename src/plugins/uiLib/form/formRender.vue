// 表单渲染外层组件 用于表单校验及提示
<template>
  <div>
    <slot name="default"></slot>
  </div>
</template>

<script>
export default {
  props: ['form', 'rules'],
  data() {
    return {

    }
  },
  methods: {
    validate() {
      return false
    }
  }
}
</script>
