// 课程页面
<template>
  <hr-page>
    <div slot="header"
      ref="pageHeader">
      <hr-header :title="title"
        :leftOptions="{backText: ''}">
        <div slot="right">
          <span @click="handleCollect">{{isCollected? '取消喜欢': '喜欢'}}</span>
          <span @click="$router.push(`/home/videoShare/${id}`)">转发</span>
        </div>
      </hr-header>
      <div id="video-contaienr"></div>
      <tab custom-bar-width="40px">
        <tab-item v-for="(item, index) in tabList"
          :key="item"
          :selected="index===activeIndex"
          @on-item-click="handleTabChange(index)">
          {{item}}
        </tab-item>
      </tab>
    </div>
    <div slot="body">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
      <div v-show="showNoteList"
        :style="{'top': showNoteList ? noteTop : '100%'}"
        class="note-list">
        <div>
          <div class="tx-c">我的笔记</div>
          <div class="f-l"
            @click="showNoteList = false">关闭</div>
          <div class="f-r"
            @click="writeNotes">写笔记</div>
          <div class="tx-c">{{title}}</div>
          <div v-for="item in noteList"
            :key="item.kkapp_comment_content">
            <div>{{item.content}}</div>
          </div>
        </div>
      </div>
      <div class="bottom-btn">
        <x-button @click.native="goToBuyPage">$188 购买会员</x-button>
      </div>
    </div>
  </hr-page>
</template>

<script>
import { hrPage, hrHeader } from '@/plugins/uiLib'
import { Tab, TabItem, XButton } from 'vux'
export default {
  components: {
    hrPage,
    hrHeader,
    Tab,
    TabItem,
    XButton
  },
  data() {
    return {
      title: '课程标题',
      tabList: ['课程介绍', '课程选集', '相关课程'],
      playerHandler: null,
      isFull: false,
      showNoteList: false,
      noteTop: '100%',
      id: '',
      noteList: [],
      currentTime: '',
      isOpen: false,
      courseList: [],
      sectionId: '',
      activeIndex: 0
    }
  },
  computed: {
    // 判断当前播放的章节是否被收藏了
    isCollected() {
      let currentSection = this.courseList.find(
        item => item.id == this.sectionId
      )
      console.log(currentSection)
      if (currentSection) {
        return currentSection.isCollect != null
      } else {
        return false
      }
    }
  },
  created() {
    router.replace({
      name: 'courseInfo'
    })
    this.initData()
  },
  mounted() {
    // this.initSelfVodPlayer()
    this.initEvent()
    this.noteTop = -document.querySelector('.vux-tab').clientHeight + 'px'
  },
  methods: {
    initData() {
      this.id = this.$route.params.id
      this.$store.dispatch('update', {
        key: 'currentCourse',
        value: this.id
      })
      this.$store.dispatch('update', {
        key: 'isWriteNoteShow',
        value: false
      })
      this.getDetail()
      this.getCourseList()
    },
    getDetail() {
      axios
        .post('/api/course/getCourse', {
          id: this.id
        })
        .then(res => {
          this.title = res.course.kkapp_course_name
          this.noteList = res.notes.map(item => ({
            img: item.kkapp_user_head.deal_image,
            name: item.kkapp_user_username,
            content: item.kkapp_comment_content,
            praise: item.kkapp_comment_zan
          }))
        })
    },
    initEvent() {
      try {
        // 监听全屏事件
        api.addEventListener(
          {
            name: 'fullScreen'
          },
          ret => {
            // 获取当前播放时间
            let currentTime
            this.playerHandler.getCurrentPosition(ret => {
              currentTime = ret.position
            })
            //  获取总时间
            let totalTime
            this.playerHandler.getDuration(ret => {
              totalTime = ret.duration
            })
            if (!this.isFull) {
              api.setScreenOrientation({
                orientation: 'landscape_left'
              })
              this.playerHandler.close()
              this.playerHandler.initPlayer(
                {
                  rect: {
                    x: 0,
                    y: 0,
                    w: api.winHeight,
                    h: api.winWidth
                  }
                },
                ret => {
                  if (ret) {
                    this.playerHandler.prepareToPlay({
                      url:
                        'http://video.weclasswe.ruizhutech.com/customerTrans/e215aa39e43fe8e13f1fba1e68c0fbe8/47f8022b-16b9cbc8674-0004-12f8-f53-9b2b1.mp4'
                    })
                    let maskerUrl = {
                      dev: 'http://192.168.1.72:8080/#/playerMasker'
                    }
                    setTimeout(() => {
                      this.playerHandler.start()
                      if (!this.isOpen) {
                        setTimeout(() => {
                          this.isOpen = true
                          api.openFrame({
                            name: 'videoMask',
                            url: 'static/video/index.html',
                            rect: {
                              x: 0,
                              y: 0,
                              w: 'auto',
                              h: 'auto'
                            },
                            pageParam: {
                              currentTime,
                              totalTime
                            }
                          })
                        }, 200)
                      }
                    }, 200)
                  }
                }
              )
              this.isFull = true
            } else {
              api.setScreenOrientation({
                orientation: 'portrait_up'
              })
              this.playerHandler.close()
              setTimeout(() => {
                this.initSelfVodPlayer(currentTime)
              }, 200)
              this.isFull = false
            }
          }
        )

        api.addEventListener(
          {
            name: 'playStart'
          },
          ret => {
            // 指定播放时间
            let time = ret.value.time
            console.log(time)
            this.playerHandler.seekToTime(
              {
                position: time
              },
              () => {
                console.log('start')
                this.playerHandler.resume()
              }
            )
          }
        )

        // 停止播放
        api.addEventListener(
          {
            name: 'playStop'
          },
          ret => {
            this.playerHandler.pause()
          }
        )

        // 写笔记
        api.addEventListener(
          {
            name: 'writeNote'
          },
          ret => {
            this.showNoteList = true
            this.currentTime = ret.value.time
          }
        )
      } catch (e) {
        console.log(e)
      }
    },
    handleTabChange(index) {
      this.activeIndex = index
      let name = ''
      switch (index) {
        case 0:
          name = 'courseInfo'
          break
        case 1:
          name = 'coursePick'
          break
        case 2:
          name = 'courseRelate'
          break
        default:
          break
      }
      router.replace({ name })
    },
    // 使用内置模块的阿里云播放器
    initInnerVodPlayer() {
      let pageHeader = this.$refs.pageHeader
      try {
        this.playerHandler = api.require('aliyunVodPlayer')
        // 使用UI模块
        this.playerHandler.openCustomPlayer(
          {
            rect: {
              x: 0,
              y: pageHeader.clientHeight,
              w: api.winWidth,
              h: 200
            },
            isShowBackBtn: false,
            nextBtnVisible: false,
            danmuBtnVisible: false,
            url:
              'http://video.weclasswe.ruizhutech.com/customerTrans/e215aa39e43fe8e13f1fba1e68c0fbe8/47f8022b-16b9cbc8674-0004-12f8-f53-9b2b1.mp4'
          },
          function(ret) {
            api.openFrame({
              name: 'videoMask',
              url: 'static/video/index.html',
              rect: {
                x: 0,
                y: pageHeader.clientHeight,
                w: api.winWidth,
                h: 200
              }
            })
          }
        )
      } catch (e) {
        console.log(e)
      }
    },
    // 定制阿里云播放器
    initSelfVodPlayer(currentTime) {
      let pageHeader = document.querySelector('.vux-header')
      try {
        this.playerHandler = api.require('aliyunVodPlayer')
        console.log(pageHeader.clientHeight)
        this.playerHandler.initPlayer(
          {
            rect: {
              x: 0,
              y: pageHeader.clientHeight,
              w: api.winWidth,
              h: 200
            }
          },
          ret => {
            console.log(JSON.stringify(ret))
            if (ret) {
              this.playerHandler.prepareToPlay({
                url:
                  'http://video.weclasswe.ruizhutech.com/customerTrans/e215aa39e43fe8e13f1fba1e68c0fbe8/47f8022b-16b9cbc8674-0004-12f8-f53-9b2b1.mp4'
              })
              let maskerUrl = {
                dev: 'http://192.168.1.72:8080/#/playerMasker'
              }
              setTimeout(() => {
                this.playerHandler.start()
                // if (!this.isOpen) {
                console.log(pageHeader.clientHeight)
                window.requestAnimationFrame(() => {
                  this.isOpen = true
                  this.playerHandler.getDuration(ret => {
                    var totalTime = ret.duration
                    api.openFrame({
                      name: 'videoMask',
                      url: 'static/video/index.html',
                      rect: {
                        x: 0,
                        y: 70,
                        w: api.winWidth,
                        h: 200
                      },
                      pageParam: {
                        currentTime: currentTime || 0,
                        totalTime: totalTime || 0
                      }
                    })
                  })
                })
                // }
              }, 1000)
            }
          }
        )
      } catch (e) {
        console.log(e)
      }
    },
    beforeLeave() {
      try {
        this.playerHandler.stop()
        setTimeout(() => {
          this.playerHandler.close()
        }, 100)
        api.setFrameAttr({
          name: 'videoMask',
          hidden: true
        })
      } catch (e) {
        console.log(e)
      }
    },
    // 跳转到写笔记页面
    writeNotes() {
      this.beforeLeave()
      router.push({
        name: 'writeNote',
        query: {
          id: this.id,
          time: this.currentTime
        }
      })
    },
    // 课程收藏（点击喜欢）
    handleCollect() {
      if (!this.isCollected) {
        axios
          .post('/api/course/addCollect', {
            courserId: this.id,
            sections: this.sectionId,
            wonderful: ''
          })
          .then(res => {
            if (res) {
              $g.toast('收藏成功')
              this.getCourseList()
            }
          })
      } else {
        let currentSection = this.courseList.find(
          item => item.id == this.sectionId
        )
        if (currentSection) {
          axios
            .post('/api/course/cancelCole', { id: currentSection.isCollect })
            .then(res => {
              if (res) {
                $g.toast('取消收藏')
                this.getCourseList()
              }
            })
        }
      }
    },
    // 获取课程选集 并选择默认课程
    getCourseList() {
      axios.post('/api/course/courseSelect', { id: this.id }).then(res => {
        let courseList = res.map(item => ({
          isCollect: item.isCollect,
          title: item.kkapp_sections_title,
          isFree: item.kkapp_sections_is_free,
          id: item.id,
          video: item.kkapp_sections_video,
          ppt: item.kkapp_sections_ppt
        }))
        this.courseList = courseList
        this.$store.dispatch('update', {
          key: 'sectionInfo',
          value: courseList
        })
        // !todo 默认先取第一个章节的id作为章节id 后续会改成使用历史记录
        this.sectionId = courseList[0] ? courseList[0].id : ''
        this.$store.dispatch('update', {
          key: 'currentSection',
          value: this.sectionId
        })
      })
    },
    goToBuyPage() {
      router.push({
        name: 'payDesc'
      })
    }
  },
  beforeDestroy() {
    this.beforeLeave()
  },
  watch: {
    $route(val) {
      if (val) {
        if (val.name == 'courseDetail') {
          router.replace({
            name: 'courseInfo'
          })
          this.activeIndex = 0
          this.initData()
        }
      }
    },
    '$store.state.currentSection' (val) {
      if (val != this.sectionId) {
        this.sectionId = val
      }
    },
    '$store.state.isWriteNoteShow'(val) {
      if (val != false) {
        this.showNoteList = true
      }
    },
    showNoteList(val) {
      if (val == false && val != this.$store.state.isWriteNoteShow) {
        this.$store.dispatch('update', {
          key: 'isWriteNoteShow',
          value: false
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
#video-contaienr {
  height: 200px;
}
.note-list {
  position: absolute;
  top: 100%;
  width: 100%;
  z-index: 100;
  bottom: 0;
  background: #ddd;
}
.bottom-btn {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
</style>
