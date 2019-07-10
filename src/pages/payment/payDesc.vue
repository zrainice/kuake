// 购买介绍
<template>
  <div>
    <div class="tx-c">购买介绍</div>
    <div class="bottom-btn">
      <x-button @click.native="goToBuy">前往购买</x-button>
    </div>
  </div>
</template>

<script>
import { XButton } from 'vux'
export default {
  components: {
    XButton
  },
  data() {
    return {}
  },
  methods:  {
    goToBuy() {
      router.push({
        name: 'pay'
      })
    }
  }
}
</script>

<style scoped>
.bottom-btn {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
