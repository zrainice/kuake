<template>
  <hr-page>
    <hr-header slot="header"
               title="我的"
               :leftOptions="{showBack: false}">
      <router-link to="/home/help" class="c-blue" slot="left">咨询</router-link>
      <router-link to="/user/message"
      class="c-blue"
      slot="right">消息</router-link>
    </hr-header>
    <div slot="header"
      class="bg-white m-t-20"
      v-safe-top>
      <div class="disp-flex setting-header justify-between align-center pd-10-20">
        <!-- 未登录 -->
        <div class="disp-flex align-center" v-if="!token">
          <img src="../../assets/image/logo.png"
            alt="">
          <div>
            <div class="c-333 fz-40 m-l-15">游客</div>
            <router-link class="router-span" to="/login">点击登录</router-link>
          </div>
        </div>
        <!-- 登陆后 -->
        <div class="disp-flex align-center" v-else @click="$router.push('/user/info')">
          <img :src="userInfo.headImg" alt="">
          <div>
            <div>{{userInfo.kkapp_user_username}}</div>
            <div>积分: {{userInfo.kkapp_user_integral}}</div>
            <div>{{userInfo.joinTime}}{{userInfo.joinTime ? '加入' : ''}}</div>
            <div>会员截止:  {{userInfo.memberTime}}</div>
          </div>
        </div>
        <!-- 后台用户无法编辑用户信息 -->
        <template>
          <div class="iconfont icon-youjiantou fz-32 c-666"></div>
        </template>
      </div>
    </div>
    <div slot="body" class="disp-flex flex-wrap m-t-20 bg-white p-t-25">
      <div @click="linkTo(item)" v-for="(item, index) in maps.links" :key="index" class="w-33p router-flex flex-column align-center m-b-60">
        <img src="../../assets/image/logo.png"
             style="width: 0.5rem;height: 0.5rem;"
             alt="">
        <span class="m-t-20">{{item.name}}</span>
        <span v-if="item.tips" class="fz-14 c-999">{{item.tips}}</span>
      </div>
      <actionsheet v-model="modal.show" :menus="modal.menu" @on-click-menu="handelZX" show-cancel></actionsheet>
    </div>
  </hr-page>
</template>

<script>
import { hrPage, hrHeader } from '@/plugins/uiLib'
import { Cell, Group, Actionsheet } from 'vux'
import moment from 'moment'
export default {
  data() {
    return {
      userType: '',
      userInfo: {},
      token: '',
      maps: {
        links: [
          { icon: '', name: '收藏', to: '/user/collect' },
          { icon: '', name: '下载', to: '/user/download' },
          { icon: '', name: '历史', to: '/user/history' },
          { icon: '', name: '我的笔记', to: '/user/note' },
          { icon: '', name: '团队购买', to: '/user/buy' },
          { icon: '', name: '我要咨询', to: '' },
          { icon: '', name: '积分商城', tips: '即将上线', to: '/user/integralstore' },
          { icon: '', name: '学习证书', tips: '学习证书', to: '/user/certificate' },
        ]
      },
      connectInfo: {
        phone: '',
        wechat: ''
      },
      modal: {
        show: false,
        menu: [
          {
            label: '电话咨询',
            value: 'phone'
          },
          {
            label: '微信咨询',
            value: 'wechat'
          }
        ]
      }
    }
  },
  created() {
    // 获取公共信息
    this.getInfo()
    // 如果 localstorage 有存 token 就视为登陆了
    try {
      this.token = localStorage.getItem('token')
      const time = localStorage.getItem('timeout')
      if (!time || moment().valueOf() - time > 7 * 24 * 3600 * 1000) {
        localStorage.removeItem('token')
        localStorage.removeItem('timeout')
        localStorage.removeItem('userInfo')
      } else {
        this.token && this.getUserInfo()
      }
    } catch(e) {
      console.error(e)
    }
  },
  methods: {
    linkTo(item) {
      if (item.name === '我要咨询') {
        this.modal.show = true
      } else {
        this.$router.push(item.to)
      }
    },
    getInfo() {
      axios.get('/api/client/consultation').then(res => {
        if (res) {
          this.connectInfo.phone = res.kkapp_personal_parameter_phone
          this.connectInfo.wechat = res.kkapp_personal_parameter_wechat
        }
      })
    },
    // 获取用户信息
    getUserInfo() {
      axios.get('/api/client/clientInfo').then(res => {
        if (res && res.personal) {
          this.userInfo = {
            ...res.personal,
            headImg: res.personal.kkapp_user_head ? window.HOST + res.personal.kkapp_user_head.path : '',
            joinTime: res.personal.kkapp_user_register ? moment.unix(res.personal.kkapp_user_register).format('YYYY-MM') : '',
            memberTime: res.personal.kkapp_user_member_time ? moment.unix(res.personal.kkapp_user_member_time).format('YYYY-MM-DD') : '',
            kkapp_user_city: res.personal.kkapp_user_city || [] // 特殊处理一下地址的
          }
          // 更新用户信息
          localStorage.setItem('userInfo', JSON.stringify(this.userInfo))
        }
      })
    },
    handelZX(item) {
      if (item === 'phone') {
        api.call( {
          type: 'tel_prompt',
          number: this.connectInfo.phone
        } );
      } else if (item === 'wechat') {
        try {
          const clipBoard = api.require('clipBoard');
          clipBoard.set({
            value: this.connectInfo.wechat
          }, function(ret, err) {
            if (!ret) {
              this.$vux.toast.show({
                text: '复制到剪切板失败'
              });
            } else {
              api.openApp({
                iosUrl: 'weixin://', //打开微信的，其中weixin为微信的URL Scheme
                androidPkg: 'com.tencent.mm',
                mimeType: 'text/html',
                uri: 'weixin://'
              });
            }
          });
        } catch(e) {
          console.error(e)
        }
      }
    }
  },
  components: {
    Cell,
    hrPage,
    Group,
    hrHeader,
    Actionsheet
  }
}
</script>

<style lang="less" scoped>
.setting-header {
  padding: .5rem 0.24rem 0.4rem 0.3rem;
  img {
    height: 2rem;
    width: 2rem;
    margin-right: .5rem;
  }
}

.cell-icon {
  position: relative;
  top: 0.05rem;
  margin-right: 0.1rem;
  height: 0.32rem;
  width: 0.32rem;
}
</style>
