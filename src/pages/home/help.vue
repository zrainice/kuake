<template>
  <div>
    <x-header title="常见问题" v-safe-top>
      <span slot="right" @click="modal.show = true">咨询客服</span>
    </x-header>
    <collapse class="bg-white">
      <collapse-item v-for="(item, index) in columns" :name="index" :key="index" @change="console.log(111)">
        <h4 slot="title">{{item.title}}</h4>
        <span slot="content" class="fz-14">{{item.content}}</span>
      </collapse-item>
    </collapse>
    <actionsheet v-model="modal.show" :menus="modal.menu" @on-click-menu="handelZX" show-cancel></actionsheet>
  </div>
</template>

<script>
  import { XHeader, Actionsheet } from 'vux'
  import { Collapse, CollapseItem } from '@/components/collapse'
  export default {
    components: { XHeader, CollapseItem, Collapse, Actionsheet },
    name: "help",
    data() {
      return {
        columns: [],
        modal: {
          show: false,
          menu: [
            {
              label: '电话咨询',
              value: 'phone'
            },
            {
              label: '微信咨询',
              value: 'wechat'
            }
          ]
        }
      }
    },
    mounted() {
      this.getQuestions()
    },
    methods: {
      getQuestions() {
        axios.get('/api/client/problemList').then(res => {
          if (res) {
            this.columns = res.problem.map(item => ({
              title: item.kkapp_common_problem_description,
              content: item.kkapp_common_problem_reply
            }))
          }
        })
      },
      handelZX(item) {
        if (item === 'phone') {
          api.call( {
            type: 'tel_prompt',
            number: this.connectInfo.phone
          } );
        } else if (item === 'wechat') {
          try {
            const clipBoard = api.require('clipBoard');
            clipBoard.set({
              value: this.connectInfo.wechat
            }, function(ret, err) {
              if (!ret) {
                this.$vux.toast.show({
                  text: '复制到剪切板失败'
                });
              } else {
                // const openApp = api.require('openApp');
                // const params = {
                //   package: 'com.tencent.mm',
                //   url: 'https://weixin.qq.com/cgi-bin/readtemplate?t=w_down\n'
                // };
                // openApp.openAppMarket(params, function(ret, err) {
                //   if (ret) {
                //     // alert($api.jsonToStr(ret));
                //   }
                // });
                api.openApp({
                  iosUrl: 'weixin://', //打开微信的，其中weixin为微信的URL Scheme
                  androidPkg: 'com.tencent.mm',
                  mimeType: 'text/html',
                  uri: 'weixin://'
                });
              }
            });
          } catch(e) {
            console.error(e)
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>
