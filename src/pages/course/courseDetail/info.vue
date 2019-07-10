// 课程详情
<template>
  <div class="bg-white cell">
    <div>
      <div>讲师介绍</div>
      <div>{{teacherName}}</div>
      <div v-html="teacherDes"></div>
    </div>
    <div>
      <div>课程介绍</div>
      <div v-html="courseDes"></div>
      <!-- <div>展开更多</div> -->
    </div>
    <div>
      <div class="fz-bold">精选笔记</div>
      <template v-if="noteList.length">
        <div v-for="(item, index) in noteList"
          class="note-item disp-flex"
          :key="index + Math.random()* 1000">
          <img :src="item.img "
            alt="">
          <div class="flex-auto">
            <div>
              <span>{{item.name}}</span>
              <span class="f-r"
                @click="praiseNote(item)">赞{{item.praise}}</span>
            </div>
            <div>{{item.content}}</div>
          </div>
        </div>
      </template>
      <div v-else>
        暂无笔记
      </div>
      <div class="disp-flex justify-around">
        <div v-if="noteList.length >= 3"
          @click="loadNotes">查看更多</div>
        <div @click="openNotes">我要写笔记</div>
      </div>
      <div class="fz-bold">课程讨论</div>
      <template v-if="commentList.length">
        <div v-for="(item, index) in commentList"
          class="note-item disp-flex"
          :key="index + Math.random()* 1000">
          <img :src="item.img "
            alt="">
          <div class="flex-auto">
            <div>
              <span>{{item.name}}</span>
              <span class="f-r"
                @click="praiseComment(item)">赞{{item.praise}}</span>
            </div>
            <div>{{item.content}}</div>
          </div>
        </div>
      </template>
      <div v-else>
        暂无评论
      </div>
      <div class="disp-flex justify-around m-b-40">
        <div v-if="commentList.length >= 3"
          @click="loadComments">查看更多</div>
        <div @click="showCommentInput">我要写评论</div>
      </div>
      <div v-show="isInputShow"
        class="disp-flex comment-input">
        <input type="text"
          v-model="comment"
          class="flex-auto"
          @blur="isInputShow = false"
          ref="commentInput">
        <div class="disp-flex align-center"
          @click="sendComment">发送</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      noteList: [],
      commentList: [],
      noteItem: {
        img: require('../../../../static/footer/other02.png'),
        name: 'biao',
        content: '获益匪浅，老师讲得不错',
        praise: 100
      },
      comment: '',
      isInputShow: false,
      id: '',
      teacherName: '',
      teacherDes: '',
      courseDes: ''
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      this.id = this.$route.params.id
      this.getCourseInfo()
    },
    // 获取课程详情
    getCourseInfo() {
      axios
        .post('/api/course/getCourse', {
          id: this.id
        })
        .then(res => {
          this.teacherName = res.teacher.kkapp_teacher_name
          this.teacherDes = $g.parseHTMLDocument(
            res.teacher.kkapp_teacher_descripe
          )
          this.courseDes = $g.parseHTMLDocument(
            res.course.kkapp_course_descripe
          )
          this.noteList = res.notes.map(item => ({
            id: item.id,
            img: item.kkapp_user_head && item.kkapp_user_head.deal_image,
            name: item.kkapp_user_username,
            content: item.kkapp_comment_content,
            praise: item.kkapp_comment_zan
          }))
          this.commentList = res.comment.map(item => ({
            id: item.id,
            img: item.kkapp_user_head && item.kkapp_user_head.deal_image,
            name: item.kkapp_user_username,
            content: item.kkapp_comment_content,
            praise: item.kkapp_comment_zan
          }))
        })
    },
    // 加载更多精选日记
    loadNotes() {},
    // 加载更多评论说
    loadComments() {
      this.commentList.push(this.noteItem)
      axios
        .post('/api/course/commentList', {
          id: this.id,
          p: 1,
          limit: 100
        })
        .then(res => {
          console.log(res)
        })
    },
    // 写评论
    showCommentInput() {
      this.isInputShow = true
      setTimeout(() => {
        this.$refs.commentInput.focus()
      })
    },
    // 发送评论
    sendComment() {
      if (this.comment.trim() == '') {
        $g.toast('请输入内容')
        return
      }
      axios
        .post('/api/course/addComment', {
          id: this.id,
          content: this.comment,
          flag: 1
        })
        .then(res => {
          this.comment = ''
          $g.toast('评论成功，审核通过后会显示在当前页面')
          this.$refs.commentInput.blur()
          this.getCourseInfo()
        })
    },
    // 打开写笔记的功能
    openNotes() {
      this.$store.dispatch('update', {
        key: 'isWriteNoteShow',
        value: true
      })
    },
    // 赞评论
    praiseComment(item) {
      axios.post('/api/course/addLike', { id: item.id }).then(res => {
        if (res) {
          $g.toast('点赞成功')
          item.praise++
        }
      })
    },
    // 赞笔记
    praiseNote(item) {
      console.log('赞笔记')
    }
  },
  watch: {
    // 监听评论是否出现 若出现则禁止页面滚动
    isInputShow(val) {
      let eventHandler = ev => {
        ev.preventDefault()
      }
      if (val) {
        document.documentElement.style.position = 'fixed'
        // document.getElementById('vux_view_box_body').style.overflow = 'hidden'
      } else {
        document.documentElement.style.position = 'relative'
        // document.getElementById('vux_view_box_body').style.overflow = 'auto'
      }
    },
    '$route.params.id'(val, oldVal) {
      if (val != oldVal) {
        this.initData()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.note-item {
  img {
    height: 1.5rem;
    width: 1.5rem;
  }
}

.comment-input {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 0.88rem;
  border-top: 1px solid black;
  padding: 0 0.22rem;
  font-size: 0.3rem;
  background: #fff;
}
</style>
