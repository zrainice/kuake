<template>
  <div class="info-card"
    @click="handleClick">
    <div class="content">
      <div class="name">{{info.name}}</div>
      <div>
        <span>{{info.area}}</span>
        <span>建筑面积:{{info.size}}㎡</span>
      </div>
    </div>
    <!-- <img :src="require('../assets/image/logo.png')"> -->
    <img :src="info.img || require('../assets/image/logo.png')">
  </div>
</template>

<script>
export default {
  /**
   * @author heziming
   * 厂房/空间卡片
   * home: {
   *  name: String,
   *  area: String,
   *  size: Number,
   *  img: String
   * }
   */
  props: {
    info: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    handleClick() {
      this.$emit('click', this.info)
    }
  }
}
</script>

<style lang="less" scoped>
.info-card {
  display: flex;
  justify-content: space-between;
  padding: 0.26rem 0.3rem 0.26rem 0.2rem;
  margin-top: 0.04rem;
  background: #fff;

  .name {
    max-width: 4rem;
  }

  .content {
    display: flex;
    flex-grow: auto;
    flex-direction: column;
    justify-content: space-between;
    padding: 0.34rem 0 0.22rem 0;
  }

  img {
    height: 1.88rem;
    width: 2.6rem;
  }
}
</style>

