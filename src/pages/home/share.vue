<template>
  <hr-page>
    <div slot="header"
         style="border-bottom: 1px solid rgba(221, 221, 221, 0.5);">
      <hr-header :leftOptions="{backText: ''}">分享</hr-header>
    </div>
    <div class="home-share bg-white" slot="body">
      <div class="top">
        <img :src="HOST + poster.image" alt="">
        <img :src="HOST + poster.bottomImage" alt="">
      </div>
      <div class="image-box">
        <div v-for="item in images" @click="changeImage(item)">
          <img :src="HOST + item.path" alt="">
        </div>
      </div>
      <div class="pd-20-0">
        <x-button type="default" @click.native="modal.show = true">一键分享</x-button>
      </div>
      <actionsheet v-model="modal.show" :menus="modal.menu" @on-click-menu="oneKeyShare" show-cancel></actionsheet>
    </div>
  </hr-page>
</template>

<script>
  import { hrHeader, hrPage } from '@/plugins/uiLib'
  import { XButton, Actionsheet } from 'vux'
  export default {
    components: { XButton, hrHeader, hrPage, Actionsheet },
    name: "share",
    data() {
      return {
        HOST: window.HOST,
        images: [],
        poster: {
          image: '',
          name: '',
          bottomImage: ''
        },
        modal: {
          show: false,
          choose: '',
          menu: [
            {
              label: '微信',
              value: 'session'
            },
            {
              label: '朋友圈',
              value: 'timeline'
            }
          ]
        }
      }
    },
    mounted() {
      this.getImage()
    },
    methods: {
      // 一键分享
      oneKeyShare(choose) {
        this.modal.choose = choose
        const params = {
          poster: this.HOST + this.poster.image,
          content: this.HOST + this.poster.bottomImage,
          type: 1
        }
        axios.post('/api/share/synthesis', params).then(res => {
          if (res) {
            try {
              this.shareImg(res)
              // const shareBySystem = api.require('shareBySystem');
              // const params = {
              //   paths: [{
              //     filename : '分享图片',
              //     path : this.HOST + res
              //   }]
              // }
              // shareBySystem.openShareImge(params, function(ret, err) {
              //   if (ret) {
              //     this.$vux.toast.show({
              //       text: '分享成功!'
              //     })
              //     this.$router.go(-1)
              //   } else {
              //     this.$vux.toast.show({
              //       type: 'warn',
              //       text: '分享失败请重试!'
              //     })
              //   }
              // });
            } catch(e) {
              console.error(e)
            }
          }
        })
      },
      shareImg (res) {
        const self = this
        try {
          const wx = api.require('wx');
          // 首先先将图片下载到本地
          api.download({
            url: self.HOST + res, // 图片地址
            savePath: 'fs://images/share.jpg', // 图片存储路径
            report: true,
            cache: true,
            allowResume: true
          }, function(res, err) {
            console.log('进入回调')
            if (res.state == 1) {
              console.log('下载成功')
              wx.shareImage({
                // apiKey: '',
                scene: self.modal.choose,
                thumb: 'widget://images/share.jpg', // 不知道为什么这里使用fs:// 死活都有问题，无法分享
                contentUrl: 'fs://images/share.jpg'
              }, function(ret, err){
                if (ret.status) {
                  // alert('分享成功')
                  alert(JSON.stringify(ret))
                } else {
                  // alert(err.code)
                  alert(JSON.stringify(err))
                }
              })
            } else {
              alert('下载失败')
              console.log('下载失败')
              console.log(err)
            }
          })
        } catch(e) {
          alert(e)
          console.error(e)
        }
      },
      // 更换图片
      changeImage(item) {
        this.poster.image = item.path
        this.getUserInfoImg()
      },
      // 获取个人信息图片
      getUserInfoImg() {
        const params = {
          entries: 1,
          background: this.poster.image,
          val: this.poster.image,
          type: 0
        }
        axios.post('/api/share/poster', params).then(res => {
          if (res) {
            this.poster.bottomImage = res.replace(/^.\//g, '')
          }
        })
      },
      // 获取图片列表
      getImage() {
        const params = {
          entries: 0,
          type: 0
        }
        axios.post('/api/share/poster', params).then(res => {
          if (res) {
            this.images = res.poster.map(item => ({
              ...item.kkapp_source_pic,
              kkapp_source_sort: item.kkapp_source_sort
            }))
            if (this.images.length) {
              this.poster.image = this.images[0].path
            }
            this.getUserInfoImg()
            this.images = [...this.images, ...this.images, ...this.images, ...this.images]
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .home-share {
    box-sizing: border-box;
    .top {
      box-sizing: border-box;
      padding: 1rem;
      height: calc(100vh - 5rem);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img {
        width: 100%;
      }
    }
    .image-box {
      height: 2.5rem;
      overflow-y: hidden;
      overflow-x: scroll;
      padding: .5rem;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      >* + * {
        margin-left: .5rem;
      }
      img {
        height: 2.5rem;
      }
    }
  }
</style>
