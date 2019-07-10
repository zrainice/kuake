<template>
  <hr-page>
    <div slot="header">
      <hr-header title="全部课程"
        :leftOptions="{backText: '', showBack: false}">
        <span slot="right"
          @click="isSortShow = true">筛选</span>
      </hr-header>
      <tab>
        <tab-item v-for="(item, index) in tabList"
          :selected="index === 0"
          :key="item.id"
          @on-item-click="handleTabChange(item)">
          {{item.name}}
        </tab-item>
      </tab>
    </div>
    <div slot="body"
      class="container">
      <div v-if="isSortShow"
           @click="isSortShow = false"
        class="filter-mask">
        <div class="filter-box" @click.stop>
          <div class="m-b-20">关键字</div>
          <div class="m-b-20">
            <x-input v-model="filterStatus.keywords"></x-input>
          </div>
          <div class="m-b-20">综合排序</div>
          <div class="m-b-20">
            <span v-for="item in sortList"
              @click.stop="changeStatus('sort', item.value)"
              :key="item.name"
              class="filter-tag"
              :class="[item.value == filterStatus.sort ? 'filter-tag-active' : '' ]">{{item.name}}</span>
          </div>
          <div class="m-b-20">学习情况</div>
          <div class="m-b-20">
            <span v-for="item in studyStatusList"
              :key="item.name"
              @click.stop="changeStatus('study', item.value)"
              class="filter-tag"
              :class="[item.value == filterStatus.study ? 'filter-tag-active': '']">{{item.name}}</span>
          </div>
          <div class="disp-flex align-center justify-around">
            <div class="w-33p"><x-button @click.native.stop="resetFilter">重置</x-button></div>
            <div class="w-33p"><x-button @click.native.stop="getListData">确定</x-button></div>
          </div>
        </div>
      </div>
      <scroller lock-x
        height="-100"
        @on-scroll-bottom="onScrollBottom"
        ref="scrollerBottom"
        :scroll-bottom-offst="200">
        <div>
          <div class="disp-flex flex-wrap bg-white p-t-25">
            <block-lesson v-for="(it, index) in list"
              :key="index"
              :dataSource="it"
              @click.native="gotoDetail(it)" />
          </div>
          <load-more v-if="page.total > list.length"
            tip="加载中..."></load-more>
          <divider v-else>我是有底线的</divider>
        </div>
      </scroller>
    </div>
  </hr-page>
</template>

<script>
import { Tab, TabItem, Scroller, LoadMore, Divider, XButton, XInput } from 'vux'
import { hrPage, hrHeader } from '@/plugins/uiLib'
import { BlockLesson } from '@/components/Block'
export default {
  components: {
    Tab,
    TabItem,
    hrPage,
    hrHeader,
    BlockLesson,
    Scroller,
    LoadMore,
    Divider,
    XButton,
    XInput
  },
  data() {
    return {
      activeTab: 0, // 活跃的tab
      list: [],
      tabList: ['品牌营销', '企业管理', '人员素质'],
      page: {
        limit: 12,
        current: 1,
        total: 0
      },
      requestING: false, // 正在请求中, 防止多次重复请求, 用于分页
      isSortShow: false,
      sortList: [
        { name: '最新上线', value: 1 },
        { name: '最早上线', value: 2 },
        { name: '最高人气', value: 3 }
      ],
      studyStatusList: [
        { name: '不限', value: 1 },
        { name: '已学', value: 2 },
        { name: '未学', value: 3 }
      ],
      filterStatus: {
        sort: 0,
        study: 0,
        keywords: ''
      }
    }
  },
  created() {
    if (this.$route.query && this.$route.query.keywords) {
      this.filterStatus.keywords = this.$route.query.keywords
    }
    // 请求分类
    new Promise((resolve, reject) => {
      axios.post('/api/course/cateList').then(res => {
        if (res && res.length) {
          this.tabList = res.map(item => ({
            id: item.id,
            name: item.kkapp_category_name
          }))
          resolve(res)
        } else {
          reject('没有分类数据')
        }
      })
    }).then(data => {
      this.activeTab = data[0].id
      this.getListData()
    })
  },
  methods: {
    getListData(paramsSource = {}) {
      // 隐藏筛选的弹窗
      this.isSortShow = false
      const params = {
        cid: this.activeTab,
        p: this.page.current,
        limit: this.page.limit,
        sorts: this.filterStatus.sort,
        study: this.filterStatus.study,
        ...paramsSource
      }
      axios.post('/api/course/screen', params).then(res => {
        if (res) {
          this.page.total = res.num
          this.list = res.info.map(item => ({
            id: item.id,
            pic: item.kkapp_course_vodpic
              ? window.HOST + item.kkapp_course_vodpic.path
              : '',
            title: item.kkapp_course_name,
            hot: item.kkapp_course_see_num || 0,
            tags: item.tag
          }))
        }
      })
    },
    // 滚动到底部
    onScrollBottom() {
      if (!this.requestING && this.page.total > this.list.length) {
        this.page.current += 1
        this.requestING = true
        this.getListData()
      }
    },
    gotoDetail(item) {
      router.push({
        name: 'courseDetail',
        params: {
          id: item.id
        }
      })
    },
    handleTabChange(item) {
      this.activeTab = item.id
      this.page.current = 1
      this.page.total = 0
      this.getListData()
    },
    // 改变筛选内容
    changeStatus(type, value) {
      if (this.filterStatus[type] == value) {
        this.filterStatus[type] = ''
      } else {
        this.filterStatus[type] = value
      }
    },
    // 重置筛选
    resetFilter() {
      this.filterStatus = {
        ...this.filterStatus,
        sort: 0,
        study: 0,
        keywords: ''
      }
      this.page.current = 1
      this.page.total = 0
      this.getListData()
    }
  }
}
</script>

<style lang="less" scoped>
.course-item {
  float: left;
  margin: 0.3rem;
  width: 3rem;
  height: 3rem;
  border: 1px solid black;

  img {
    height: 2rem;
    width: 3rem;
  }
}
.filter-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  .vux-x-input {
    border: 1px solid #eeeeee;
  }
  .filter-box {
    box-sizing: border-box;
    padding: .2rem;
    position: absolute;
    top: 0.88rem;
    left: 0;
    width: 100%;
    background: #fff;
    .filter-tag {
      padding: 0.1rem 0.3rem;
      border: 1px solid black;
      border-radius: 0.1rem;
      +.filter-tag {
        margin-left: 0.2rem;
      }
      &.filter-tag-active {
        border: 1px solid #108EE9;
        background-color: #3D90CB;
      }
    }
  }
}
</style>
