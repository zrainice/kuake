<template>
  <hr-page>
    <div slot="header"
      style="border-bottom: 1px solid rgba(221, 221, 221, 0.5);">
      <hr-header :title="title"
        :leftOptions="{backText: ''}"></hr-header>
    </div>
    <div slot="body"
      class="bg-white info-detail">
      <div class="fz-32 c-333 fz-bold">
        {{title}}
      </div>
      <div class="fz-30 c-333"
        v-html="summary">
      </div>
      <div class="fz-24 c-999 m-b-20">
        {{time}}
      </div>
      <div class="fz-24 c-666 content"
        v-html="content">
      </div>
    </div>
  </hr-page>
</template>

<script>
import { hrPage, hrHeader } from '@/plugins/uiLib'
import moment from 'moment'
export default {
  components: {
    hrPage,
    hrHeader
  },
  data() {
    return {
      title: '',
      time: '',
      summary: '',
      content: '',
      typeApi: {
        env: '/api/envito/detail',
        stra: '/api/policy/detail',
        open: '/api/infor/detail'
      }
    }
  },
  async created() {
    let { type, id } = this.$route.params
    let res = await axios.get(this.typeApi[type], { params: { id } })
    let _temp
    switch (type) {
      case 'env':
        _temp = {
          title: res.zoro_envito_column,
          summary: res.zoro_envito_brief,
          createTime: res.zoro_envito_update,
          remark: res.zoro_envito_details
        }
        break
      case 'stra':
        _temp = {
          title: res.detail.zoro_policy_title,
          summary: res.detail.zoro_policy_brief,
          remark: res.detail.zoro_policy_details,
          createTime: res.detail.zoro_policy_update
        }
        break
      case 'open':
        _temp = {
          title: res.detail.zoro_infor_header,
          summary: res.detail.zoro_infor_brief,
          remark: res.detail.zoro_infor_details,
          createTime: res.detail.zoro_infor_update
        }
        break
    }
    this.title = _temp.title
    this.summary = _temp.summary || ''
    this.summary = $g.parseHTMLDocument(
      this.summary.replace(/(\r\n|\n)+/g, '<br>')
    )
    this.content = _temp.remark || ''
    this.content = $g.parseHTMLDocument(
      this.content.replace(/(\r\n|\n)+/g, '<br>')
    )
    this.time = moment(_temp.createTime * 1000).format('YYYY-MM-DD')
  },
  mounted() {
    document.addEventListener('click', this.handelClickEvent)
  },
  methods: {
    // 阻止页面点击a标签跳转
    handelClickEvent() {
      let target = event.target
      event.stopPropagation()
      event.preventDefault()
      if (target.tagName.toLowerCase() == 'a') {
        // 检测a标签
        // event.preventDefault()
      }
    }
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handelClickEvent)
  }
}
</script>

<style lang="less">
.info-detail {
  padding: 0.3rem 0.26rem 0.4rem 0.26rem;
}

.content {
  p,
  span,
  div,
  b,
  a,
  a:active,
  a:hover {
    font-size: 0.26rem !important;
    line-height: 0.4rem !important;
    color: #666 !important;
    // text-indent: 0rem !important;
    text-align: left !important;
  }

  ul,
  li {
    list-style: none;
  }
}
</style>


