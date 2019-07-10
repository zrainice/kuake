<template>
  <div class="ad">
    <img :src="img" alt="">
    <div class="timeout" @click="skip">{{timeout}}s</div>
  </div>
</template>

<script>
  export default {
    name: "ad",
    data() {
      return {
        timeout: 5,
        img: '',
        linkTo: '',
        timer: null
      }
    },
    mounted() {
      this.getData()
      this.timer = setInterval(() => {
        if (this.timeout > 0) {
          this.timeout--
        } else if (this.timeout === 0) {
          this.skip()
        }
      }, 1000)
    },
    destroyed() {
      this.clear()
    },
    methods: {
      clear() {
        clearInterval(this.timer)
        sessionStorage.setItem('linkd', '1')
      },
      // 跳过
      skip() {
        this.clear()
        this.$router.go(-1)
      },
      getData() {
        axios.post('/api/home/appScreen').then(res => {
          console.log(res)
          if (res && res.length) {
            const item = res[0]
            this.timeout = item.kkapp_advertisement_stop // 停留时间
            this.img = item.kkapp_advertisement_file_2 ? window.HOST + item.kkapp_advertisement_file_2.path : ''
            this.linkTo = item.kkapp_advertisement_link
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .ad {
    width: 100vw;
    height: 100vh;
    .timeout {
      position: absolute;
      top: 1rem;
      right: 1rem;
      color: #ffffff;
      font-size: .32rem;
      padding: .1rem .2rem;
      border-radius: 1rem;
      background-color: rgba(0, 0, 0, 0.4);
      cursor: pointer;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
</style>
