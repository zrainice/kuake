<template>
  <div class="disp-flex flex-column align-center justify-center h-100p">
    <div class="w-100p">
      <h3>登陆/注册</h3>
      <x-input v-model="info.phone"
        placeholder="请输入手机号"></x-input>
      <x-input v-model="info.code"
        placeholder="请输入验证码"></x-input>
      <x-button @click.native="getPhoneCode">获取验证码</x-button>
      <x-button @click.native="phoneLogin">登录</x-button>
    </div>
    <div class="m-t-40">
      <div class="fz-14 c-999 m-b-60">未注册的用户验证后自动登录</div>
      <x-button @click.native="wechatLogin">微信登录</x-button>
    </div>
  </div>
</template>

<script>
import { XInput, XButton } from 'vux'
import moment from 'moment'

export default {
  name: 'login',
  components: { XInput, XButton },
  data() {
    return {
      info: {
        phone: '',
        code: ''
      },
      wxInfo: {
        apiKey: '',
        apiSecret: ''
      }
    }
  },
  methods: {
    // 获取验证码
    getPhoneCode() {
      if (!this.info.phone) {
        this.$vux.toast.show({
          type: 'warn',
          text: '请输入手机号'
        })
      } else {
        axios
          .post('/api/login/sendCode', { mobile: this.info.phone })
          .then(res => {
            if (res) {
              this.$vux.toast.show({
                text: '验证码发送成功,请注意查收!'
              })
            }
          })
      }
    },
    // 手机登陆
    phoneLogin() {
      if (this.info.phone && this.info.code) {
        axios
          .post('/api/login/byPhone', {
            phone: this.info.phone,
            code: this.info.code
          })
          .then(res => {
            if (res) {
              this.handleLogin(res.token, res.userInfo)
            }
          })
      } else {
        this.$vux.toast.show({
          text: '请填写手机号跟验证码'
        })
      }
    },
    handleLogin(token, userInfo) {
      $g.toast('登录成功')
      localStorage.setItem('token', token)
      localStorage.setItem('timeout', moment().valueOf())
      localStorage.setItem('userInfo', JSON.stringify(userInfo))
      setTimeout(() => {
        router.replace({
          path: '/'
        })
      }, 200)
    },
    // 微信登录
    wechatLogin() {
      try {
        const wx = api.require('wx')
        new Promise((resolve, reject) => {
          axios.post('/api/login/getApp').then(res => {
            if (res) {
              this.wxInfo.apiSecret = res.secret
              this.wxInfo.apiKey = res.appid
              resolve(res)
            } else {
              reject('网络请求错误')
            }
          })
        })
          .then(res => {
            return new Promise((resolve, reject) => {
              wx.auth(
                {
                  apiKey: res.appid
                },
                function(ret, err) {
                  if (ret.status) {
                    resolve(ret)
                  } else {
                    reject(err)
                  }
                }
              )
            })
          })
          .then(res => {
            return new Promise((resolve, reject) => {
              wx.getToken(
                {
                  apiKey: this.wxInfo.apiKey,
                  apiSecret: this.wxInfo.apiSecret,
                  code: res.code
                },
                function(ret, err) {
                  if (ret.status) {
                    resolve(ret)
                  } else {
                    reject(err)
                  }
                }
              )
            })
          })
          .then(res => {
            return new Promise((resolve, reject) => {
              wx.getUserInfo(
                {
                  accessToken: res.accessToken,
                  openId: res.openId
                },
                (ret, err) => {
                  if (ret.status) {
                    axios.post('/api/login/addUserInfo', ret).then(res => {
                      this.handleLogin(res.token, res)
                    })
                  } else {
                    reject(err)
                  }
                }
              )
            })
          })
          .catch(e => {
            console.error(e)
          })
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>

<style scoped>
</style>
