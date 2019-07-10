<template>
  <hr-page>
    <div slot="header">
      <hr-header title="我的收藏"
                 :leftOptions="{backText: ''}">
      <span
      class="c-blue"
      slot="right"></span>
      </hr-header>
      <tab v-model="active" prevent-default @on-before-index-change="switchTabItem">
        <tab-item v-for="(item, index) in tabList" :key="index">{{item.name}}</tab-item>
      </tab>
    </div>
    <div slot="body" class="bg-white p-t-25">
      <scroller lock-x height="-100" @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="200">
        <div>
          <div v-for="(item, index) in maps.videos" :key="index" class="pd-10-20">
            <h3>{{item.title}}</h3>
            <div class="like-video">
              <img v-if="item.video" :src="item.video" alt="">
              <div v-else>暂无封面</div>
            </div>
            <div class="collect-section">{{item.section}}</div>
          </div>
          <load-more v-if="page.total > maps.videos.length" tip="加载中..."></load-more>
          <divider v-else>我是有底线的</divider>
        </div>
      </scroller>
    </div>
  </hr-page>
</template>

<script>
  import { Tab, TabItem, Scroller, LoadMore, Divider } from 'vux'
  import { hrPage, hrHeader } from '@/plugins/uiLib'
  export default {
    name: "collect",
    components: { hrPage, hrHeader, Tab, TabItem, Scroller, LoadMore, Divider },
    data() {
      return {
        active: 0,
        tabList: [],
        page: {
          limit: 10,
          current: 1,
          total: 0
        },
        requestING: false, // 正在请求中, 防止多次重复请求, 用于分页
        maps: {
          videos: []
        }
      }
    },
    created() {
      // 请求分类
      new Promise((resolve, reject) => {
        axios.get('/api/client/collectList').then((res) => {
          if (res) {
            if (res.category && res.category.length) {
              this.tabList = res.category.map(item => ({ id: item.id, name: item.kkapp_category_name }))
            } else {
              reject('没有分类数据')
            }
            resolve(res)
          } else {
            reject('请求数据错误')
          }
        })
      }).then((data) => {
        this.getListData()
      })
    },
    methods: {
      // 获取列表数据
      getListData(paramsSource = {}, needClear = false) {
        const tabItem = this.tabList[this.active]
        const params = {
          cate_id: tabItem.id,
          page: this.page.current,
          limit: this.page.limit,
          ...paramsSource
        }
        axios.get('/api/client/collectList', { params }).then(res => {
          if (res) {
            this.page.total = res.count // 保存数据总数
            if (res.collect) {
              const temp = res.collect.map(item => ({
                title: item.kkapp_sections_title,
                video: item.kkapp_course_vodpic ? window.HOST + item.kkapp_course_vodpic.path : '',
                section: item.kkapp_course_name
              }))
              this.maps.videos = needClear ? temp : [...this.maps.videos, ...temp]
              this.requestING = false
            }
          }
        })
      },
      switchTabItem(index) {
        this.active = index
        this.page.current = 1
        this.getListData(null, true)
      },
      onScrollBottom() {
        if (!this.requestING && (this.page.total > this.maps.videos.length)) {
          this.page.current += 1
          this.requestING = true
          this.getListData()
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .collect-section {
    color: orange;
    margin-top: 0.2rem;
  }
  .like-video {
    width: 100%;
    height: 4rem;
    background-color: #666666;
    text-align: center;
    line-height: 4rem;
    color: #fff;
    img {
      width: 100%;
      height: 100%;
    }
  }
</style>
