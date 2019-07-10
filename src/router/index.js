import Vue from 'vue'
import Router from 'vue-router'
// 账户模块
import SignUp from '@/pages/account/signUp'
import forgetPw from '@/pages/account/forgetPw'
// 首页
import Root from '@/pages/home'
// 首页模块
import Home from '@/pages/home/index'
import Question from '@/pages/home/question'
import Help from '@/pages/home/help'
import User from '@/pages/user/index'
import Share from '@/pages/home/share'
import VideoShare from '@/pages/home/videoShare'
// 课程列表页
import CourseIndex from '@/pages/course/index'
// 课程
import Course from '@/pages/course/course'
// 课程介绍
import CourseInfo from '@/pages/course/courseDetail/info'
// 课程选集
import CoursePick from '@/pages/course/courseDetail/pick'
// 相关课程
import courseRelate from '@/pages/course/courseDetail/relate'
// 精彩片段
import partList from '@/pages/course/partList'
import WriteNote from '@/pages/course/writeNote'
// 播放器蒙版
import PlayerMasker from '@/pages/course/courseDetail/playerMasker'
// 会员介绍
import BuyDesc from '@/pages/payment/payDesc'
// 支付页面
import Pay from '@/pages/payment/pay'
// 我的模块
import message from '@/pages/user/message'
import Info from '@/pages/user/info'
import Collect from '@/pages/user/collect'
import History from '@/pages/user/history'
import Note from '@/pages/user/note'
import Company from '@/pages/user/company'
import Buy from '@/pages/user/buy'
import IntegralStore from '@/pages/user/integralStore'
import Certificate from '@/pages/user/certificate'
import Download from '@/pages/user/download'
// 登录
import Login from '@/pages/account/login.vue'
// iframe
import IFrame from '@/pages/home/iframe.vue'
// 首屏广告
import AD from '@/pages/account/ad.vue'
Vue.use(Router)

let allRoutes = []
allRoutes = [
  {
    path: '/',
    name: 'root',
    component: Root,
    redirect: { name: 'home' },
    children: [
      {
        path: '/home',
        name: 'home',
        component: Home,
        meta: { isHome: true, keepAlive: true }
      }, {
        path: '/home/help',
        name: 'help',
        component: Help
      }, {
        path: '/course',
        name: 'course',
        component: CourseIndex,
        meta: { isHome: true, keepAlive: true }
      },
      {
        path: '/user',
        name: 'user',
        component: User,
        meta: { isHome: true }
      }
    ]
  },
  // 问卷调查 / 分享
  {
    path: '/home/question',
    name: 'question',
    component: Question
  },
  {
    path: '/home/share',
    name: 'share',
    component: Share
  },
  {
    path: '/home/videoShare/:id',
    name: 'videoShare',
    component: VideoShare
  },
  // 用户登陆
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  // 用户信息
  {
    path: '/',
    name: '',
    component: Root,
    children: [
      {
        path: '/user/root',
        name: 'userRoot',
        component: User,
      },
      {
        path: '/user/info',
        name: 'userInfo',
        component: Info
      },
      {
        path: '/user/message',
        name: 'message',
        component: message
      },
      {
        path: '/user/collect',
        name: 'collect',
        component: Collect
      },
      {
        path: '/user/history',
        name: 'history',
        component: History
      },
      {
        path: '/user/note',
        name: 'note',
        component: Note
      },
      {
        path: '/user/company',
        name: 'company',
        component: Company
      },
      {
        path: '/user/buy',
        name: 'buy',
        component: Buy
      },
      {
        path: '/user/integralstore',
        name: 'integralStore',
        component: IntegralStore
      },
      {
        path: '/user/certificate',
        name: 'certificate',
        component: Certificate
      },
      {
        path: '/user/download',
        name: 'download',
        component: Download
      }
    ]
  },
  // 课程详情
  {
    path: '/courseDetail/:id/',
    name: 'courseDetail',
    component: Course,
    children: [
      {
        path: 'info',
        name: 'courseInfo',
        component: CourseInfo
      },
      {
        path: 'pick',
        name: 'coursePick',
        component: CoursePick
      },
      {
        path: 'relate',
        name: 'courseRelate',
        component: courseRelate
      }
    ]
  },
  {
    path: '/playerMasker',
    name: 'playerMasker',
    component: PlayerMasker
  },
  {
    path: '/partList',
    name: 'partList',
    component: partList
  },
  {
    path: '/writeNote',
    name: 'writeNote',
    component: WriteNote
  },
  { path: '/payDesc', name: 'payDesc', component: BuyDesc },
  { path: '/pay', name: 'pay', component: Pay },
  {
    path: '/iframe',
    name: 'iframe',
    component: IFrame
  },
  {
    path: '/ad',
    name: 'AD',
    component: AD
  }
]

let _router = new Router({
  routes: allRoutes
})

let historyList = []

/**
 *  跨页面跳转, 并清除中间的历史记录
 *  @param name String 页面名称
 *  @param path String 完整路径
 *  任选其一即可，由于不同子路由中可以有相同的相对路径，建议使用唯一标识name
 *  不使用name的话请填写完整的路径，避免出现冲突的情况
 */
_router.returnTo = ({ name, path }) => {
  let target = ''
  if (name) {
    target = historyList.find(item => (item.name == name))
  }
  if (path) {
    target = historyList.find(item => (item.fullPath == path))
  }
  if (target) {
    let index = historyList.lastIndexOf(target)
    let distance = historyList.length - index - 1
    historyList.splice(index, distance)
    console.log('router return', distance)
    _router.go(-distance)
  } else {
    console.warn('superApp -- returnTo target not exist')
  }
}

Router.prototype.goBack = function (distance) {
  distance = distance || -1
  this.isBack = true
  _router.go(distance)
}

// _router.historyList = historyList

_router.beforeEach((to, from, next) => {
  // 用户没有登录的话 则跳转到登录页
  // if (!localStorage.getItem('token')) {
  //   if (to.name == 'user' || to.name == 'regList') {
  //     _router.push({ name: 'login', query: { target: to.name } })
  //   }
  //   next()
  // } else {
  historyList.push(to)
  next()
  // }
})

export default _router
