<template>
  <div>
    <div v-for="item in list" :key="item.label" :class="['cell-line', item.type == 'row' ? 'row': 'half']">
      <span class="label">{{item.label}}：</span>
      <span class="value">{{item.value}}</span>
    </div>
    <div class="clear-float"></div>
  </div>
</template>

<script>
export default {
  /**
   * @author heziming
   * 表单详情
   * list: [
   * {label: String, value: String, type: 'row' }
   * ]
   * row 则为以行显示
   */
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {}
  }
}
</script>

<style lang="less" scoped>
.cell-line {
  font-size: 0.24rem;
  margin-top: 0.15rem;
  float: left;
  background: #fff;
  .label {
    color: #666;
  }
  .value {
    color: #333;
  }

  &.half {
    width: 50%;
    max-width: 50%;
  }

  &.row {
    width: 100%;
  }
}
</style>


