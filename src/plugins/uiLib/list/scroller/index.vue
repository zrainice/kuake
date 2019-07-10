<template>
  <div>
    <scroller ref="scroller"
      :on-refresh="refresh"
      :on-infinite="infinite"
      :noDataText="noDataText"
      :snapping="true">
      <slot></slot>
      <div class="tips">{{ noData ? '没有更多数据了' : ''}}</div>
    </scroller>
  </div>
</template>
<script>
export default {
  props: {
    noData: {
      type: Boolean,
      default: false
    }
    // refresh: {
    //   type: Function,
    //   default: () => { }
    // },
    // infinite: {
    //   type: Function,
    //   default: () => { }
    // }
  },
  data() {
    return {
      noDataText: '没有更多数据了'
    }
  },
  created() {
  },
  methods: {
    refresh() {
      // 返回处理结束的方法
      this.$emit('refresh', this.$refs.scroller.finishPullToRefresh)
    },
    infinite() {
      if (this.noData) {
        this.$refs.myscroller.finishInfinite(false);
      } else {
        // 返回处理结束的方法
        this.$emit('infinite', this.$refs.scroller.finishInfinite)
      }
    }
  },
  mounted: function () {

  }
}
</script>
<style>
.tips {
  font-size: 14px;
}
</style>
