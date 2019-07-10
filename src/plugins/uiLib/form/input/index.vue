<template>
  <x-input v-model="innerVal"
    :type="type"
    :text-align="textAlign"
    :max="max"
    :min="min"
    :label-width="labelWidth"
    :placeholder="placeholder"
    :show-clear="showClear"
    :title="label"
    @on-blur="handleBlur"
    @on-focus="handleFocus"
    @on-enter="handleEnter"
    @on-change="handleChange"></x-input>
</template>

<script>
import { XInput } from 'vux'
export default {
  props: [
    'value',
    'type',
    'placeholder',
    'id',
    'label',
    'readonly',
    'disabled',
    'label-width',
    'text-align',
    'show-clear',
    'max',
    'min'
  ],
  data() {
    return {
      innerVal: ''
    }
  },
  created() {
    this.innerVal = this.value || ''
  },
  methods: {
    handleChange(val) {
      this.$emit('input', val)
      this.$emit('change', val)
    },
    handleBlur(val, ev) {
      this.$emit('blur', val, ev)
    },
    handleFocus(val, ev) {
      this.$emit('focus', val, ev)
    },
    handleEnter(val, ev) {
      this.$emit('enter', val, ev)
    }
  },
  components: {XInput}
}
</script>
