<template>
  <div class="gm-search-bar-container">
    <slot name="left"></slot>
    <div class="search-bar">
      <img class="search-icon"
        src="../assets/image/search-icon.png"
        alt="">
      <input ref="input"
        type="search"
        @keydown.enter="search"
        v-model="keyword"
        :placeholder="placeholder">
    </div>
    <slot name="searchBrn">
      <div class="search-btn"
        @click="search">{{searchBtnContent}}</div>
    </slot>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String
    },
    searchBtnContent: {
      type: String,
      default() {
        return '搜索'
      }
    },
    placeholder: {
      type: String,
      default() {
        return '请输入搜索内容'
      }
    }
  },
  data() {
    return {
      keyword: '',
    }
  },
  created() {
    this.keyword = this.value || ''
  },
  methods: {
    // 搜索
    search() {
      this.$refs.input.blur()
      setTimeout(() => {
        this.$emit('search', this.keyword.trim())
      }, 50);
    }
  },
  watch: {
    value(val, old) {
      this.keyword = val
    }
  }
}
</script>

<style lang="less">
.gm-search-bar-container {
  background: #fff;
  height: 0.88rem;
  display: flex;
  align-items: center;
  // padding-left: 0.12rem;

  .search-bar {
    display: flex;
    align-items: center;
    flex-grow: 1;
    height: 0.56rem;
    background-color: #e6e6e6;
    margin-left: 0.12rem;
    border-radius: 0.28rem;

    .search-icon {
      height: 0.4rem;
      width: 0.4rem;
      margin: 0 0.22rem 0 0.24rem;
    }

    input {
      height: 0.56rem;
      flex-grow: 1;
      outline: none;
      background: transparent;
      border: none;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      font-size: 0.24rem;
      color: #333;
      // 去除默认搜索按钮
      &::-webkit-search-cancel-button {
        display: none;
      }
    }
  }

  .search-btn {
    font-size: 0.28rem;
    color: #333;
    width: 1.12rem;
    text-align: center;
  }
}
</style>
