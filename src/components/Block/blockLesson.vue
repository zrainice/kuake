<template>
  <div class="block-lesson" @click="detailClick">
    <div v-if="dataSource.pic" class="img"><img :src="dataSource.pic" alt=""></div>
    <div v-else class="img no-img">暂无图片</div>
    <div v-if="dataSource.title" class="title">{{dataSource.title}}</div>
    <div v-if="dataSource.hot !== undefined" class="intro">{{dataSource.hot}}</div>
    <div v-if="dataSource.tags && dataSource.tags.length">
      <div v-for="item in dataSource.tags" class="tags">{{item}}</div>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .block-lesson {
    width: 50%;
    padding: 0.1rem 0.2rem;
    box-sizing: border-box;
    .img {
      width: 100%;
      height: 2rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .no-img {
      border: 1px solid rgba(0,0,0,0.2);
      display: flex;
      justify-content: center;
      align-items: center;
      color: rgba(0,0,0,0.25);
    }
    .title {
      font-weight: bold;
      font-size: 0.28rem;
    }
    .intro {
      font-size: 0.2rem;
      color: rgba(0,0,0,0.8);
    }
    .tags {
      display: inline-block;
      font-size: 0.2rem;
      padding: 0 0.2rem;
      line-height: 0.4rem;
      border: 1px solid rgba(0,0,0,0.4);
      border-radius: 1rem;
      background-color: rgba(24, 159, 256);
      margin-right: 0.1rem;
      color: #ffffff;
    }
    +.block-lesson +.block-lesson {
      margin-top: 0.3rem;
    }
  }
</style>
<script>
  export default {
    name: "blockLession",
    props: {
      dataSource: {
        type: Object,
        default() { return {} }
      },
      useEmit: {
        type: String,
        default: ''
      }
    },
    methods: {
      detailClick() {
        if (this.useEmit) {
          this.$emit('detailEmit', { type: this.useEmit, data: this.dataSource })
        } else {
          this.$router.push(this.dataSource.to || `/courseDetail/${this.dataSource.id}`)
        }
      }
    }
  }
</script>
