<template>
  <div class="user-integral-store">
    <hr-header slot="header"
               title="学习证书"
               :leftOptions="{backText: ''}">
      <span
      class="c-blue"
      slot="right"></span>
    </hr-header>
    <div slot="body">
      <div class="fz-14">正在紧急开发ing...</div>
    </div>
  </div>
</template>

<script>
  import { hrPage, hrHeader } from '@/plugins/uiLib'
  export default {
    components: { hrPage, hrHeader },
    name: "certificate"
  }
</script>

<style scoped>
  .user-integral-store {

  }
</style>
