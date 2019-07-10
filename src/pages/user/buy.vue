<template>
  <div class="user-buy bg-white">
    <hr-header slot="header"
               title="团队购买"
               :leftOptions="{backText: ''}">
      <span
      class="c-blue"
      slot="right"></span>
    </hr-header>
    <div slot="body">
      <div class="fz-14 m-t-25 content" v-html="content"></div>
      <x-button @click.native="zixun">立即咨询</x-button>
    </div>
  </div>
</template>

<script>
  import { XButton } from 'vux'
  import { hrPage, hrHeader } from '@/plugins/uiLib'
  export default {
    components: { hrPage, hrHeader, XButton },
    name: "buy",
    data() {
      return {
        content: '',
        phone: ''
      }
    },
    mounted() {
      this.getInfo()
    },
    methods: {
      getInfo() {
        axios.get('/api/client/consultation').then(res => {
          if (res) {
            this.content = (res.kkapp_personal_parameter_enterprise_copywriting || '').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
            this.phone = res.kkapp_personal_parameter_phone
          }
        })
      },
      // 咨询
      zixun() {
        api.call( {
          type: 'tel_prompt',
          number: this.phone
        } );
      }
    }
  }
</script>

<style lang="less" scoped>
  .user-buy {
    .content {
      min-height: calc(100vh - 3rem);
    }
  }
</style>
