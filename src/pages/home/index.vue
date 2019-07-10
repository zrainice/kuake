<template>
  <hr-page>
    <div slot="header">
      <div class="pos-rel bor-b">
        <!--<div class="search-masker"></div>-->
        <search-bar v-safe-top @search="search">
          <router-link slot="left"
            to="/home/help"
            class="router-flex disp-flex align-center">
            <img style="height: 0.4rem; width: 0.4rem; margin-left: 0.2rem;"
              src="../../assets/image/logo.png"
              alt="">
            <span class="m-l-15">咨询</span>
          </router-link>
          <router-link slot="searchBrn"
            to="/user/download"
            class="router-flex">
            <img style="height: 0.4rem; width: 0.4rem; margin-left: 0.2rem;"
              class="m-r-20"
              src="../../assets/image/logo.png"
              alt="">
          </router-link>
        </search-bar>
      </div>
    </div>
    <div slot="body">
      <swiper v-model="swiperIndex"
        :list="list"
        :aspect-ratio="450/750"
        dots-position="center"
        @click.native="handleSwiperClick"></swiper>
      <div class="disp-flex justify-around bg-white m-b-10">
        <div v-for="item in maps.classType"
             @click="$router.push(item.to)"
          class="disp-flex pd-20 align-center">
          <img style="height: 0.6rem; width: 0.6rem; margin-right: 0.2rem;"
            src="../../assets/image/logo.png"
            alt="">
          <div class="fz-14">
            <div>{{item.title}}</div>
            <div>{{item.intro}}</div>
          </div>
        </div>
      </div>
      <!-- 邀请链接 -->
      <router-link :to="item.to"
        v-for="(item, index) in maps.links"
        :key="index"
        class="bg-white router-div pd-10-20 m-b-10">
        <div class="disp-flex align-center pd-20-60 bor-radius">
          <img style="height: 0.8rem; width: 0.8rem; margin-right: 0.6rem;"
            src="../../assets/image/logo.png"
            slot="left"
            alt="">
          <span class="fz-24 fz-bold">{{item.title}}</span>
        </div>
      </router-link>
      <!-- 限时免费 -->
      <div v-for="item in maps.classGroup"
        :key="item.title"
        class="bg-white pd-20">
        <div v-if="item.type === 'one' && maps.classGroupOptions[item.options].length">
          <h3>{{item.title}}</h3>
          <div class="disp-flex flex-wrap">
            <block-lesson-line v-for="(it, index) in maps.classGroupOptions[item.options]"
              :key="index"
              :useEmit="item.useEmit"
              @detailEmit="detailBlockEmit"
              :dataSource="it" />
          </div>
        </div>
        <div v-else-if="item.type === 'two' && maps.classGroupOptions[item.options].length">
          <div class="disp-flex justify-between align-center">
            <h3>{{item.title}}</h3>
            <template v-if="item.to">
              <router-link :to="item.to" class="fz-14 c-666">
                <span>{{item.link}}</span>
              </router-link>
            </template>
            <template v-else>
              <span>{{item.link}}</span>
            </template>
          </div>
          <div class="disp-flex flex-wrap">
            <block-lesson v-for="(it, index) in maps.classGroupOptions[item.options]"
              :key="index"
              :useEmit="item.useEmit"
              @detailEmit="detailBlockEmit"
              :dataSource="it" />
          </div>
        </div>
      </div>
    </div>
  </hr-page>
</template>

<script>
import searchBar from '@/components/searchBar.vue'
import listItem from '@/components/listItem.vue'
import { hrHeader, hrPage, hrTab, hrTabItem } from '@/plugins/uiLib'
import { Swiper, TabItem, Tab } from 'vux'
import { BlockLesson, BlockLessonLine } from '@/components/Block'
import moment from 'moment'

export default {
  name: 'info',
  data() {
    return {
      keyword: '',
      userInfo: '',
      maps: {
        classType: [
          { title: '品牌营销', intro: '50门课', icon: '', to: '' },
          { title: '企业管理', intro: '100门课', icon: '', to: '' },
          { title: '人员素质', intro: '200门课', icon: '', to: '' }
        ], // 营销
        links: [
          { title: '让夸克更懂你', icon: '', to: '/home/question' },
          { title: '邀请好友 一起学习', icon: '', to: '/home/share' }
        ], // 链接
        classGroupOptions: {
          free: [], // 限时免费
          new: [], // 即将上新
          wonder: [], // 精彩片段
          recommend: [] // 为您推荐
        },
        classGroup: [
          {
            title: '限时免费',
            link: '查看更多',
            to: '/course',
            type: 'two',
            options: 'free'
          },
          {
            title: '即将上新',
            link: '查看更多',
            to: '/course',
            useEmit: '预约',
            type: 'one',
            options: 'new'
          },
          {
            title: '精彩片段',
            link: '查看更多',
            to: '/partList',
            type: 'two',
            options: 'wonder'
          },
          {
            title: '为您推荐',
            link: '查看更多',
            to: '/course',
            type: 'two',
            options: 'recommend'
          }
        ]
      },
      footer: {
        title: '更多',
        url: ''
      },
      list: [],
      swiperIndex: 0,
      infoList: [[], [], []]
    }
  },
  created() {
    try {
      const userInfo = localStorage.getItem('userInfo')
      this.userInfo = JSON.parse(userInfo)
      if (this.userInfo.kkapp_user_answer) {
        this.maps.links.shift()
      }
    } catch(e) {
      console.error(e)
    }
    // 获取限时免费
    const promise = []
    promise.push(axios.post('/api/home/home', { flag: 1 })) // 首页
    Promise.all(promise).then(([home]) => {
      console.log(home)
      // banner 图
      if (home.banner) {
        this.list = home.banner
          .filter(item => item.kkapp_advertisement_file_2)
          .map(item => ({
            src: item.kkapp_advertisement_link,
            img: window.HOST + item.kkapp_advertisement_file_2.path,
            type: '',
            title: name
          }))
      }
      // 处理快速跳转按钮
      if (home.categoryNum) {
        this.maps.classType = home.categoryNum.map(item => ({
          title: item.kkapp_category_name,
          intro: item.num + '门课',
          id: item.id,
          icon: '',
          to: '/course'
        }))
      }
      // 处理其他信息
      Object.entries(this.maps.classGroupOptions).forEach(([key]) => {
        if (home[key] && home[key].length) {
          if (key === 'wonder') {
            this.maps.classGroupOptions[key] = home[key].map(item => ({
              id: item.id,
              pic: item.kkapp_highlights_cover
                ? window.HOST + item.kkapp_highlights_cover.path
                : '',
              title: item.kkapp_highlights_name,
              hot: item.kkapp_highlights_see_num || 0,
              tags: item.tag
            }))
          } else if (key === 'new') {
            this.maps.classGroupOptions[key] = home[key].map(item => ({
              id: item.id,
              pic: item.kkapp_course_newpic ? window.HOST + item.kkapp_course_newpic.path : '',
              title: item.kkapp_course_name,
              time: item.kkapp_course_new_time,
              hot: item.kkapp_course_see_num || 0,
              tags: item.tag
            }))
          } else {
            this.maps.classGroupOptions[key] = home[key].map(item => ({
              id: item.id,
              pic: item.kkapp_course_vodpic
                ? window.HOST + item.kkapp_course_vodpic.path
                : '',
              title: item.kkapp_course_name,
              time: item.kkapp_course_new_time ? moment.unix(item.kkapp_course_new_time).format('YYYY-MM-DD') : '未知',
              hot: item.kkapp_course_see_num || 0,
              tags: item.tag
            }))
          }
        }
      })
    })
  },
  methods: {
    // 处理emit
    detailBlockEmit(even) {
      if (even.type === '预约') {
        axios.post('/api/course/addAppoint', { id: even.data.id }).then(res => {
          if (res) {
            this.$vux.toast.show({
              text: '预约成功!'
            });
          }
        })
      }
    },
    handleSwiperClick() {
      const current = this.list[this.swiperIndex]
      if (current) {
        if (current.src.includes('http')) {
          this.$router.push({ path: '/iframe', query: { src: window.btoa(encodeURIComponent(current.src)) } })
        } else {
          // this.$router.push(current.url)
        }
        // location.href = this.list[this.swiperIndex].url
      }
    },
    // 处理搜索
    search(keys) {
      this.$router.push({
        path: '/course',
        query: {
          keywords: keys
        }
      })
    },
    goToDetail(item) {
      // let type = this.mapInfo[this.tabList[index]]
      router.push({
        name: 'infoDetail',
        params: { type: item.type, id: item.id }
      })
    }
  },
  components: {
    hrHeader,
    hrPage,
    Swiper,
    hrTab,
    hrTabItem,
    Tab,
    TabItem,
    searchBar,
    listItem,
    BlockLesson,
    BlockLessonLine
  }
}
</script>

<style lang="less" scoped>
.search-masker {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 100;
}
.logo-container {
  padding: 0.2rem 0;
  img {
    display: block;
    width: 3rem;
    margin: 0 auto;
  }
}
</style>
