<template>
  <div class="disp-flex gm-snf c-999">
    <div @click="clickSearch"
      class="flex-auto disp-flex align-center justify-center"
      :class="{active: activeItem == 'search'}">
      <span class="iconfont icon-sousuo fz-32 m-r-10"></span>
      <span class="name">{{searchText}}</span>
    </div>
    <div @click="clickFilter"
      class="flex-auto disp-flex align-center justify-center"
      :class="{active: activeItem == 'filter'}">
      <span class="iconfont icon-loudou fz-32 m-r-10"></span>
      <span class="name">{{filterText}}</span>
    </div>
  </div>
</template>

<script>
export default {
  /**
   * 搜索与筛选组件
   */
  props: {
    activeItem: {
      type: String,
      default() {
        return ''
      }
    },
    searchText: {
      type: String,
      default() {
        return '搜索'
      }
    },
    filterText: {
      type: String,
      default() {
        return '筛选'
      }
    }
  },
  methods: {
    clickSearch() {
      this.$emit('search')
    },
    clickFilter() {
      this.$emit('filter')
    }
  }
}
</script>

<style lang="less" scoped>
.gm-snf {
  height: 0.96rem;
  background: #fff;
  color: #999;
  font-size: 0.28rem;
  border-bottom: 1px solid #ddd;

  img {
    position: relative;
    top: -0.04rem;
    height: 0.3rem;
    width: 0.3rem;
    margin-right: 0.2rem;
  }
  .name {
    margin-left: 0.1rem;
  }

  .active {
    color: #3D90CB;
    .name {
      border-bottom: 1px solid #3D90CB;
    }
  }

}

</style>
