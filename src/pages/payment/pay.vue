<template>
  <hr-page>
    <hr-header slot="header">支付页面</hr-header>
    <div slot="body"
      class="p-t-25">
      <div>
        <div class="p-l-20">购买详情</div>
        <div class="disp-flex align-center flex-column bg-white p-t-25">
          <div class="logo disp-flex justify-center align-center">logo</div>
          <div>夸克年费会员</div>
          <x-number v-model="amount"
            :min="1"></x-number>
          <span>￥ {{188 * amount}}</span>
        </div>
      </div>
      <div>
        <div class="p-l-20">支付方式</div>
        <div class="p-t-25 bg-white">
          <checklist :max="1"
            v-model="payWay"
            :options="payOptions"
            label-position="left"></checklist>
        </div>
      </div>
      <div>
        <div class="p-l-20">购买说明</div>
        <div class="p-t-25 p-l-20 p-b-25 bg-white">
          本产品为虚拟产品，一经支付，概不退款
        </div>
      </div>
      <div class="bottom-btn">
        <x-button @click.native="buy">购买</x-button>
      </div>
    </div>
  </hr-page>
</template>

<script>
import { hrPage, hrHeader } from '@/plugins/uiLib'
import { XButton, XNumber, Checklist } from 'vux'
export default {
  components: {
    hrPage,
    hrHeader,
    XButton,
    XNumber,
    Checklist
  },
  data() {
    return {
      amount: 1,
      payWay: ['zfb'],
      payOptions: [
        { key: 'wx', value: '微信' },
        { key: 'zfb', value: '支付宝' }
      ]
    }
  },
  methods: {
    async buy() {
      if (this.payWay.length == 0) {
        $g.toast('请选择支付方式!')
        return
      }
      let way = this.payWay[0]
      if (way == 'zfb') {
        // 获取订单参数
        let orderInfo = await axios.post('/api/course/payment', {
          memberId: 1,
          years: this.amount,
          method: 1
        })
        console.log(orderInfo)
        console.log(Object.entries(orderInfo.params))
        let orderPayString = Object.entries(orderInfo.params).reduce(
          (prev, [key, value]) => {
            if (prev.length != 0) {
              prev += '&'
            }
            let _value = value
            // 
            if (['biz_content', 'notify_url', 'timestamp'].includes(key)) {
              _value = encodeURI(value)
            }
            prev += `${key}=${_value}`
            return prev
          },
          ''
        )

        console.log(orderPayString)
        // 调起支付模块
        try {
          let aliPayPlus = api.require('aliPayPlus')

          new Promise((resolve, reject) => {
            aliPayPlus.payOrder(
              {
                orderInfo: orderPayString
              },
              ret => {
                resolve(ret)
              }
            )
          }).then(res => {
            $g.toast(JSON.stringify(res))
          })
        } catch (e) {
          console.log('非app环境报错' + e)
        }
      } else {
        $g.toast('暂不支持微信支付')
      }
    }
  }
}
</script>

<style scoped>
.logo {
  height: 1rem;
  width: 1rem;
  border: 1px solid black;
}
.bottom-btn {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
</style>
