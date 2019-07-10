<template>
  <hr-page>
    <div slot="header"
         style="border-bottom: 1px solid rgba(221, 221, 221, 0.5);">
      <hr-header :leftOptions="{backText: ''}">浏览器</hr-header>
    </div>
    <div slot="body">
      <iframe class="iframe" ref="iframe" :src="src" frameborder="0"></iframe>
    </div>
  </hr-page>
</template>

<script>
  import { hrHeader, hrPage, hrTab, hrTabItem } from '@/plugins/uiLib'
  export default {
    components: { hrPage, hrHeader },
    name: "iframes",
    data() {
      return {
        src: ''
      }
    },
    created() {
      try {
        this.src = decodeURIComponent(window.atob(this.$route.query.src))
      } catch(e) {
        this.$vux.toast.show({
          type: 'warn',
          text: '地址错误!'
        });
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>
  .iframe {
    width: 100%;
    height: calc(100vh - 40px);
  }
</style>
