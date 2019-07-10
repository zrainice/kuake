<template>
  <hr-page>
    <hr-header slot="header"
      title="忘记密码"
      :leftOptions="{backText: ''}"></hr-header>
    <div slot="body">
      <hr-form-render ref="form"
        :model="form"
        :rules="rules">
        <group gutter="0"
          label-width="2rem">
          <verify-code v-model="form.phone"></verify-code>
          <x-input title="验证码"
            placeholder="请输入"
            v-model.trim="form.verifyCode"></x-input>
          <x-input title="密码"
            placeholder="请输入"
            v-model.trim="form.password"></x-input>
          <x-input title="确认密码"
            placeholder="请输入"
            v-model.trim="form.passwordConf"></x-input>
        </group>
      </hr-form-render>
      <div class="p-l-40 p-r-40 p-t-100">
        <x-button type="primary"
          @click.native="handleSubmit">确定</x-button>
      </div>
    </div>
  </hr-page>
</template>

<script>
import Verify from '@/assets/js/verify'
import verifyCode from '@/components/verifyCode'
import { hrHeader, hrPage, hrFormRender } from '@/plugins/uiLib'
import { Group, XInput, XButton } from 'vux'
export default {
  data() {
    return {
      form: {
        phone: '',
        verifyCode: '',
        password: '',
        passwordConf: '',
      },
      // 表单校验规则
      rules: {
        phone: [{ required: true, message: '请输入手机号码' }],
        verifyCode: [{ required: true, message: '请输入验证码' }],
        password: [{ required: true, message: '请输入密码' }],
        passwordConf: [{ required: true, message: '请输入确认密码' }]
      }
    }
  },
  methods: {
    // 提交请求
    handleSubmit() {
      this.$refs.form.validate(async (pass, err) => {
        if (pass) {
          if (this.form.password.length < 6) {
            $g.toast('请输入6位以上密码')
            return
          }
          if (this.form.password != this.form.passwordConf) {
            $g.toast('两次输入的密码不一致')
            return
          }
          // 全部信息都必填后 提交请求
          let ret = await axios.post('/api/user/forgetPass', {
            mobile: this.form.phone,
            password: window.btoa(this.form.password),
            code: this.form.verifyCode
          })
          // ret = $g.handleRes(ret)
          if (ret) {
            $g.toast('修改密码成功', 'success')
            setTimeout(() => {
              $g.goBack()
            }, 200)
          }
        } else {
          $g.toast(err, 'cancel')
        }
      })
    }
  },
  components: {
    hrPage,
    hrHeader,
    hrFormRender,
    Group,
    XInput,
    XButton,
    verifyCode
  }
}
</script>
