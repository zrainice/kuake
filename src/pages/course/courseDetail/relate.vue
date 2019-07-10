// 课程选集
<template>
  <div class="disp-flex flex-wrap bg-white p-t-25">
    <template v-if="list.length">
      <block-lesson v-for="(it, index) in list"
        :key="index"
        :dataSource="it"
        @click.native="gotoDetail(it)" />
    </template>
    <div v-else class="tx-c">
      暂无相关课程
    </div>
  </div>
</template>

<script>
import { BlockLesson } from '@/components/Block'
export default {
  components: {
    BlockLesson
  },
  data() {
    return {
      id: '',
      list: []
    }
  },
  created() {
    this.id = this.$route.params.id
    this.getRealateList()
  },
  methods: {
    getRealateList() {
      axios
        .post('/api/course/relateList', {
          p: 0,
          list: 50
        })
        .then(res => {
          this.list = res.info.map(item => ({
            id: item.id,
            pic: item.kkapp_course_vodpic
              ? window.HOST + item.kkapp_course_vodpic.path
              : '',
            title: item.kkapp_course_name,
            hot: item.kkapp_course_see_num || 0,
            tags: item.tag
          }))
          console.log(this.list)
        })
    },
    // 跳转到对应的课程页
    gotoDetail(item) {
      if (item.id != this.$store.state.currentCourse) {
        router.replace({
          name: 'courseDetail',
          params: {
            id: item.id
          }
        })
      }
    }
  }
}
</script>

<style>
</style>
