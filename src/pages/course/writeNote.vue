<template>
  <hr-page>
    <hr-header slot="header"
      title="写笔记">
      <div @click="publish"
        slot="right">发布</div>
    </hr-header>
    <div slot="body">
      <x-textarea v-model="content"
        placeholder="写下你的感受"></x-textarea>
    </div>
  </hr-page>
</template>

<script>
import { hrPage, hrHeader } from '@/plugins/uiLib'
import { Tab, TabItem, XTextarea } from 'vux'
export default {
  components: {
    hrPage,
    hrHeader,
    Tab,
    TabItem,
    XTextarea
  },
  data() {
    return {
      time: '',
      id: '',
      content: ''
    }
  },
  created() {
    this.id = this.$route.query.id
    this.time = this.$route.query.time
  },
  methods: {
    publish() {
      if (this.content.trim() == '') {
        $g.toast('请输入笔记内容')
        return
      }
      let params = {
        id: this.id,
        content: this.content,
        flag: 0,
        noteTime: this.time || 1
      }
      axios.post('/api/course/addComment', params).then(res => {
        $g.toast(res)
        $g.goBack(1)
      })
    }
  }
}
</script>

<style>
</style>
