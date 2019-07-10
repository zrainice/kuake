<template>
  <div class="gm-list-item-detail"
    @click="click">
    <div class="content">
      <div class="title">{{item.title}}</div>
      <div class="des">{{item.description}}</div>
      <div class="info">
        <span v-if="item.see" style="margin-right: 0.2rem;">阅读{{item.see}}</span>
        <span>{{item.createTime}}</span>
      </div>
    </div>
    <img v-if="item.img" :src="item.img"
      alt="">
  </div>
</template>

<script>
/**
 * 列表内的更详细的卡片
 * item: {
 *  title: String,
 *  description: String,
 *  read: Number,
 *  time: Number(timeStamp) 秒,
 *  img: String(path)
 * }
 */
export default {
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    click() {
      this.$emit('click', this.item)
    }
  }
}
</script>

<style lang="less" scoped>
.gm-list-item-detail {
  display: flex;
  justify-content: space-between;
  padding: 0.26rem 0.3rem 0.26rem 0.24rem;
  margin-bottom: 0.04rem;
  background: #fff;

  .content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .title {
      font-size: 0.26rem;
      color: #333;
    }
    .des,
    .info {
      font-size: 0.24rem;
      color: #999;
    }
  }

  img {
    min-width: 2.6rem;
    margin-left: 0.5rem;
    text-align: right;
    height: 1.88rem;
    width: 2.6rem;
  }
}
</style>



