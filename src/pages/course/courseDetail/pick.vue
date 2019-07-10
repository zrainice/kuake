// 课程选集
<template>
  <div class="bg-white cell">
    <div>课程目录</div>
    <div class="m-t-20 m-b-20 context-container fz-24">
      <div>
        <div v-for="item in $store.state.sectionInfo"
          :class="item.id == $store.state.currentSection ? 'current-section' : ''"
          :key="item.id"
          @click="changeSection(item)">
          <div>{{item.title}}</div>
          <div>25min</div>
          <div v-if="item.isFree">免费学习</div>
        </div>
      </div>
    </div>
    <div>学习材料</div>
    <div v-for="item in $store.state.sectionInfo"
      :key="item.id">
      <div>{{item.title}}</div>
      <div class="m-t-20 m-b-20 context-container fz-24">
        <div v-if="item.ppt">
          <div class="pic-container"
            v-for="(ppt, index) in item.ppt"
            :key="ppt.name">
            <img :src="HOST + '/' + ppt.path"
              @click="showPPT(index, item)"
              alt="">
          </div>
        </div>
        <div v-else>课程暂无资料</div>
      </div>
    </div>
    <previewer ref="previewer"
      :list="currentList">
    </previewer>
  </div>
</template>

<script>
import { Previewer } from 'vux'
export default {
  components: {
    Previewer
  },
  data() {
    return {
      id: '',
      courseList: [],
      courseAttachments: [],
      HOST: window.HOST,
      currentList: []
    }
  },
  created() {
    // this.id = this.$route.params.id
    // this.getCourseList()
  },
  methods: {
    changeSection(item) {
      if (item.id != this.$store.state.currentSection) {
        this.$store.dispatch('update', {
          key: 'currentSection',
          value: item.id
        })
      }
    },
    // 显示ppt
    showPPT(index, item) {
      this.currentList = item.ppt.map(it => ({
        msrc: this.HOST + '/' + it.path,
        src: this.HOST + '/' + it.path,
        w: 800,
        h: 400
      }))
      this.$refs.previewer.show(index)
    }
  }
}
</script>

<style lang="less" scoped>
.context-container {
  width: 100%;
  overflow-x: scroll;
  overflow-y: hidden;
  & > div {
    width: 100rem;
    & > div {
      float: left;
      width: 2rem;
      height: 1.5rem;
      margin-right: 0.4rem;
      &.current-section {
        border: 1px solid black;
      }
    }
    .pic-container {
      width: 7rem;
      height: 3rem;
      img {
        height: 100%;
        width: 100%;
      }
    }
  }
}
</style>
