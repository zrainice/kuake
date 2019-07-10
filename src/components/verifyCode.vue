<template>
  <x-input title="*手机号码"
    placeholder="请输入"
    :label-width="labelWidth"
    v-model.trim="innerVal"
    @on-change="handleChange">
    <span class="fz-28 c-999"
      style="border-left: 1px solid #ddd; padding-left: 0.25rem"
      @click="getVerify"
      slot="right">{{verifyMessage}}</span>
  </x-input>
</template>

<script>
// 获取手机验证码组件
import Verify from '@/assets/js/verify.js'
import { XInput, Group } from 'vux'
export default {
  props: {
    labelWidth: {
      type: String,
      default: '2rem'
    },
    value: {
      type: String,
      default: ''
    },
    beforeSubmit: Function
  },
  data() {
    return {
      innerVal: '',
      isCountDown: false,
      countDown: 60,
      timeHandler: null
    }
  },
  computed: {
    verifyMessage() {
      if (this.isCountDown) {
        if (this.countDown <= 0) {
          clearInterval(this.timeHandler)
          this.isCountDown = false
          this.countDown = 60
          return '获取验证码'
        } else {
          return `${this.countDown < 1 ? 1 : this.countDown}后重新获取`
        }
      } else {
        return '获取验证码'
      }
    }
  },
  created() {
    this.innerVal = this.value
  },
  methods: {
    async getVerify() {
      if (Verify.isPhone(this.innerVal)) {
        if (this.beforeSubmit && typeof this.beforeSubmit == 'function') {
          if (!await this.beforeSubmit(this.innerVal)) {
            return
          }
        }
        let ret = await axios.post('/api/user/sendCode', { mobile: this.innerVal })
        // ret = $g.handleRes(ret)
        if (ret.status == 200) {
          $g.toast('发送成功!', 'success')
        } else {
          $g.toast(ret.message)
          return
        }
        this.isCountDown = true
        this.timeHandler = setInterval(() => {
          this.countDown--
        }, 1000)
      } else {
        $g.toast('请输入正确的手机号码')
      }
    },
    handleChange() {
      this.$emit('input', this.innerVal)
    }
  },
  components: { XInput, Group }
}
</script>
