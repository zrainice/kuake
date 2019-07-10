<template>
  <div class="container disp-flex bg-white">
    <img :src="img"
      alt="">
    <div class="flex-auto m-l-20">
      <div class="lh-30">
        <div>
          <span class="fz-30 c-333 fz-bold">{{submitType}}</span>
          <span class="fz-24 c-666 f-r">{{time}}</span>
        </div>
        <div class="fz-30 m-t-5 c-333">提交人: {{submitter}}</div>
      </div>
      <div v-for="item in list"
        :key="item.name"
        class="fz-24 lh-24 m-t-5 c-666">
        {{item.name}}：{{item.value}}
      </div>
      <div class="m-t-15 fz-30 lh-30"
        :style="{color:color[type.color]}">{{type.name}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 图片地址
    img: String,
    // 提交类型
    submitType: String,
    // 提交人
    submitter: String,
    // 时间
    time: String,
    // 行数据
    list: {
      type: Array,
      default() {
        return []
      }
    },
    // 审核状态
    type: {
      type: Object,
      default() {
        return {
          name: '申请',
          color: 'red'
        }
      }
    }
  },
  data() {
    return {
      color: {
        orange: '#FF9A41',
        green: '#3CD47C',
        red: '#C11C1C'
      }
    }
  },
  methods: {
    handleClick() {
      this.$emit('click')
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 0.24rem 0.24rem 0.16rem 0.2rem;
  margin-bottom: 0.04rem;
  img {
    height: 0.6rem;
    width: 0.6rem;
  }
}
</style>

