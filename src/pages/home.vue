<template>
  <hr-page>
    <router-view slot="body"></router-view>
    <tabbar slot="bottom">
      <tabbar-item v-for="(item, index) in tabList"
        :key="item.path"
        :link="{path: item.path, replace: true}"
        :selected="activeIndex == index">
        <div slot="label"
          style="line-height: 0.1rem">
          <span class="iconfont tab-icon"
            :class="item.icon"
            style="line-height:0.8rem"></span>
          <div class="fz-24"
            style="line-height: 0.1rem;">{{item.label}}</div>
        </div>
      </tabbar-item>
    </tabbar>
  </hr-page>
</template>


<script>
import { hrPage } from '@/plugins/uiLib'
import { Tabbar, TabbarItem } from 'vux'
import moment from 'moment'
export default {
  data() {
    return {
      tabList: [
        {
          icon: 'icon-shouye',
          label: '首页',
          path: '/home'
        },
        {
          icon: 'icon-shouye',
          label: '课程',
          path: '/course'
        },
        {
          icon: 'icon-wode',
          label: '我的',
          path: '/user'
        }
      ],
      activeIndex: 0
    }
  },
  created() {
    console.log(JSON.stringify(localStorage.getItem('userInfo')))
    if (localStorage.getItem('userInfo')) {
      this.$store.dispatch('update', {
        key: 'userInfo',
        value: JSON.parse(localStorage.getItem('userInfo'))
      })
    }
    this.setActiveIndex(this.$route)
    // 没有登录跳转到登录页
    try {
      const token = localStorage.getItem('token')
      const timeout = localStorage.getItem('timeout')
      if (!token || !timeout || (moment().valueOf() - timeout > 7 * 24 * 3600 * 1000)) {
        this.$router.push('/login')
      } else {
        const linkd = sessionStorage.getItem('linkd')
        if (!linkd) {
          // 跳转到首屏广告
          this.$router.push('/ad')
        }
      }
    } catch(e) {
      console.error(e)
    }
  },
  methods: {
    setActiveIndex(_route) {
      let pathList = this.tabList.map(i => i.path)
      let index = pathList.indexOf(_route.path)
      if (index > -1) {
        this.$nextTick(() => {
          this.activeIndex = index
        })
      }
    }
  },
  watch: {
    $route(to, from) {
      this.setActiveIndex(to)
    }
  },
  components: { hrPage, Tabbar, TabbarItem }
}
</script>

<style lang="less" scoped>
.tab-icon {
  height: 0.44rem;
  width: 0.44rem;
  font-size: 0.44rem;
}
</style>
