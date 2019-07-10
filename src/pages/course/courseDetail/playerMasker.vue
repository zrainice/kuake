// 播放器上面的蒙版
<template>
  <div class="bg-trans control-bar">
    <div class="disp-flex justify-end">
      <div>音频</div>
      <div class="m-l-20">更多</div>
    </div>
    <div class="disp-flex">
      <div>播放</div>
      <div class="m-l-20">当前时间</div>
      <div class="flex-auto m-l-20">进度条</div>
      <div class="m-l-20">总时间</div>
      <div class="m-l-20">全屏</div>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style scoped>
.control-bar {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

#app {
  background: transparent;
}
</style>
