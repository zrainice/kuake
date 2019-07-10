<template>
  <div class="history">
    <hr-header slot="header"
               title="观看历史"
               :leftOptions="{backText: ''}">
      <span
      class="c-blue"
      slot="right"></span>
    </hr-header>
    <div slot="body" class="bg-white">
      <scroller lock-x height="-100" @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="200">
        <div>
          <div v-for="(item, index) in lists" :key="index" class="disp-flex pd-20">
            <div class="img" :class="{ 'no-img': !item.pic }">
              <img v-if="item.pic" :src="item.pic" alt="">
              <div v-else>暂无图片</div>
            </div>
            <div class="disp-flex flex-column justify-between m-l-20">
              <h4>{{item.title}}</h4>
              <div>
                <div class="c-999 fz-14">第 {{item.currentSection}} 集 已观看到第 {{item.currentPlay}} 分钟 / 共 {{item.totalSection}} 集</div>
                <x-progress :percent="item.currentPlay / item.totalPlay * 100" :show-cancel="false"></x-progress>
              </div>
            </div>
          </div>
          <load-more v-if="page.total > lists.length" tip="加载中..."></load-more>
          <divider v-else>我是有底线的</divider>
        </div>
      </scroller>
    </div>
  </div>
</template>

<script>
  import { XProgress, Scroller, LoadMore, Divider } from 'vux'
  import { hrPage, hrHeader } from '@/plugins/uiLib'
  export default {
    components: { hrPage, hrHeader, XProgress, Scroller, LoadMore, Divider },
    name: "history",
    data() {
      return {
        lists: [],
        page: {
          limit: 12,
          current: 1,
          total: 0
        },
        requestING: false, // 正在请求中, 防止多次重复请求, 用于分页
      }
    },
    mounted() {
      this.getListData()
    },
    methods: {
      getListData(paramsSource) {
        const params = {
          id: this.activeTab,
          p: this.page.current,
          limit: this.page.limit,
          ...paramsSource
        }
        axios.get('/api/client/historyList', { params }).then(res => {
          if (res) {
            this.page.total = res.count
            this.requestING = false
            this.lists = res.history.map(item => {
              const tempTotal = res.num.find(it => it.id === item.kkapp_watch_course)
              return {
                pic: item.kkapp_teacher_head_pic ? window.HOST + item.kkapp_teacher_head_pic.path : '',
                title: item.kkapp_course_name,
                currentSection: item.kkapp_sections_sort,
                currentPlay: parseInt(item.kkapp_watch_time) || 0,
                totalPlay: 43,
                totalSection: tempTotal ? tempTotal.count : '0'
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
    }
  }
</script>

<style lang="less" scoped>
  .history {
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
  }
</style>
