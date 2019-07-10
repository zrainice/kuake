<template>
  <hr-page class="user-note">
    <div slot="header">
      <hr-header title="我的笔记"
                 :leftOptions="{backText: ''}">
      <span
      class="c-blue"
      slot="right"></span>
      </hr-header>
      <div class="disp-flex">
        <div class="w-50p note-button" @click="popup.showSort = true">{{searchInfo.sort[0] || '排序'}}</div>
        <datetime v-model="searchInfo.time" class="w-50p pd-0"
                  title="$t('Birthday')" format="YYYY-MM" clear-text="当月" @on-clear="setToday">
          <div class="note-button">{{searchInfo.time || '选择时间'}}</div>
        </datetime>
      </div>
    </div>
    <div slot="body" class="bg-white">
      <scroller lock-x height="-100" @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="200">
        <div>
          <div v-for="(item, index) in lists" :key="index" class="pd-20" @click="linkTo(item)">
            <div>{{item.time}}</div>
            <div class="disp-flex justify-between">
              <div>
                <h4>{{item.title}}</h4>
                <div class="c-999 fz-14">{{item.content}}</div>
              </div>
              <img v-if="item.pic" class="img" :src="item.pic" alt="">
              <div v-else class="img no-img">暂无图片</div>
            </div>
          </div>
          <load-more v-if="page.total > lists.length" tip="加载中..."></load-more>
          <divider v-else>我是有底线的</divider>
        </div>
      </scroller>
      <!-- 弹窗 -->
      <popup-picker :show.sync="popup.showSort" :show-cell="false" title="选择排序方式"
                    :data="popup.sortOptions" v-model="searchInfo.sort"></popup-picker>
    </div>
  </hr-page>
</template>

<script>
  import { Scroller, LoadMore, Datetime, XButton, PopupPicker, Radio, Divider } from 'vux'
  import { hrPage, hrHeader } from '@/plugins/uiLib'
  import moment from 'moment'
  export default {
    components: { hrPage, hrHeader, Scroller, LoadMore, Datetime, XButton, PopupPicker, Radio, Divider },
    name: "note",
    data() {
      return {
        lists: [],
        requestING: false, // 正在请求中, 防止多次重复请求, 用于分页
        searchInfo: {
          time: moment().format('YYYY-MM'),
          sort: ['时间排序']
        },
        popup: {
          showSort: false,
          sortOptions: [['时间排序', '课程排序']],
          trans: {
            '时间排序': 0,
            '课程排序': 1
          }
        },
        page: {
          limit: 10,
          current: 1,
          total: 0
        },
      }
    },
    mounted() {
      this.getListData()
    },
    methods: {
      // 获取列表数据
      getListData(paramsSource = {}, needClear = false) {
        const params = {
          order: this.popup.trans[this.searchInfo.sort[0]],
          time: this.searchInfo.time ? moment(this.searchInfo.time).unix() : '',
          page: this.page.current,
          limit: this.page.limit,
          ...paramsSource
        }
        axios.get('/api/client/commentList', { params }).then(data => {
          console.log(data)
          if (data) {
            this.requestING = false
            this.page.count = data.count
            this.lists = data.comment.map(item => {
              return {
                time: item.kkapp_comment_create_time ? moment.unix(item.kkapp_comment_create_time).format('YYYY-MM-DD') : '',
                title: item.kkapp_course_name,
                pic: item.kkapp_course_vodpic ? window.HOST + item.kkapp_course_vodpic.path : '',
                content: item.kkapp_comment_content
              }
            })
          }
        })
      },
      // 滚动到底部
      onScrollBottom() {
        if (!this.requestING && (this.page.total > this.lists.length)) {
          this.page.current += 1
          this.requestING = true
          this.getListData()
        }
      },
      // 设置时间为今天
      setToday() {
        this.searchInfo.time = moment().format('YYYY-MM')
      },
      // 跳转到课程详情页
      linkTo(item) {
        this.$router.push(`/courseDetail/${item.id}`)
      }
    },
    watch: {
      searchInfo: {
        deep: true,
        handler() {
          this.getListData(null, true)
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .user-note {
    .img {
      width: 2.8rem;
      height: 1.7rem;
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
    .note-button {
      border: 1px solid #eeeeee;
      padding: 0.1rem;
      text-align: center;
    }
  }
</style>
