<template>
  <hr-page>
    <hr-header slot="header"
      title="消息提醒"
      class="bor-b"
      :leftOptions="{backText: ''}">
    </hr-header>
    <div slot="body">
      <collapse v-if="false" class="bg-white">
        <collapse-item v-for="(item, index) in columns" :name="index" :key="index" @change="console.log(111)">
          <span slot="title">{{item.title}}</span>
          <span slot="content">{{item.content}}</span>
        </collapse-item>
      </collapse>
      <div v-for="(item, index) in columns" class="message-item">
        <div>{{item.content}}</div>
        <div class="disp-flex justify-end fz-14 c-666">{{item.time}}</div>
      </div>
    </div>
  </hr-page>
</template>

<script>
import infoCard from '@/components/infoCard'
import { hrPage, hrHeader } from '@/plugins/uiLib'
import { Collapse, CollapseItem } from '@/components/collapse'
import moment from 'moment'
export default {
  data() {
    return {
      columns: [
        { title: '您预约的课程"企业营销"已上新, 请前往观看', content: '目前仅支持手机微信注册哦' },
        { title: '您预约的课程"企业营销"已上新, 请前往观看', content: '目前仅支持手机微信注册哦' },
        { title: '您预约的课程"企业营销"已上新, 请前往观看', content: '目前仅支持手机微信注册哦' },
        { title: '您预约的课程"企业营销"已上新, 请前往观看', content: '目前仅支持手机微信注册哦' },
        { title: '您预约的课程"企业营销"已上新, 请前往观看', content: '目前仅支持手机微信注册哦' },
      ]
    }
  },
  created() {
    this.getMessageData()
  },
  methods: {
    getMessageData() {
      axios.get('/api/message/messageList').then(res => {
        console.log(res)
        if (res) {
          this.columns = res.map(item => {
            return {
              time: item.kkapp_send_message_create_time ? moment.unix(item.kkapp_send_message_create_time).format('YYYY-MM-DD HH:mm:ss') : '',
              content: item.kkapp_send_message_content
            }
          })
        }
      })
    }
  },
  components: {
    hrPage,
    hrHeader,
    infoCard,
    Collapse,
    CollapseItem
  }
}
</script>

<style lang="less" scoped>
  .message-item {
    padding: .2rem;
    background-color: #ffffff;
  }
</style>

