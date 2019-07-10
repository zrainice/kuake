<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive>
        <router-view class="Router"
          v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>

    <transition :name="transitionName">
      <router-view class="Router"
        v-if="!$route.meta.keepAlive"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      transitionName: 'slide-left'
    }
  },
  mounted() {
    // window.selfData = {}
    // window.selfData.old = window.document.body.clientHeight
    // window.onresize = (e) => {
    //   window.selfData.now = window.document.body.clientHeight
    //   window.selfData.scrollTop = document.querySelector('#vux_view_box_body').scrollTop
    //   setTimeout(() => {
    //     document.querySelector('#vux_view_box_body').scrollTop = window.selfData.scrollTop - (window.selfData.old - window.selfData.now)
    //     window.selfData.old = window.selfData.now
    //   }, 100)
    // }
  },
  beforeDestroy() {
    window.selfData = undefined
    window.onresize = undefined
  },
  watch: {
    '$route'(to, from) {
      let isBack = router.isBack  //  监听路由变化时的状态为前进还是后退
      if (isBack) {
        this.transitionName = 'slide-right'
      } else {
        this.transitionName = 'slide-left'
      }
      if (to.meta.isHome && from.meta.isHome) {
        this.transitionName = ''
      }
      router.isBack = false
    }
  }
}
</script>

<style>
html,
body {
  height: 100%;
  width: 100%;
  font-size: 0.3rem;
  /* overflow-x: hidden; */
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: left; */
  color: #2c3e50;
  background: rgb(248, 248, 248);
  /* padding-top: 70px; */
}

.Router {
  /* position: absolute; */
  width: 100%;
  transition: all 0.2s ease;
  /* top: 40px; */
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 1;
  -webkit-transform: translate(100%, 0);
  transform: translate(100%, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-100%, 0);
  transform: translate(-100% 0);
}
</style>

<style lang="less">
@import "~vux/src/styles/reset.less";
@import "~vux/src/styles/1px.less";
</style>

