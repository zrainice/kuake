<template>
  <hr-page>
    <hr-header slot="header"
      title="我的资料"
      :leftOptions="{backText: ''}">
      <span class="c-blue"
        slot="right"
        @click="saveInfo">保存</span>
    </hr-header>
    <div slot="body"
      class="bg-white">
      <group label-width="4.5em"
        label-margin-right="2em"
        label-align="right">
        <div v-for="item in maps.info"
          :key="item.key"
          :class="{ 'border-t-b': ifSupport(item) }">
          <!-- input -->
          <div v-if="item.type === 'input'">
            <x-input :title="item.name"
              v-model="info[item.key]"></x-input>
          </div>
          <!-- select -->
          <div v-else-if="item.type === 'select'">
            <selector :title="item.name"
                      v-model="info[item.key]"
                      :options="maps.options[item.options].map(it => ({ key: it.value, value: it.label }))"></selector>
          </div>
          <!-- text -->
          <div v-else-if="item.type === 'text'">
            <x-input :title="item.name"
              v-model="info[item.key]"
              disabled></x-input>
          </div>
          <!-- photo -->
          <cell v-else-if="item.type === 'photo'"
            :title="item.name"
            value-align="left"
            value="点击更换头像">
            <div class="disp-flex justify-between align-center"
              @click="uploadImg(item)">
              <div class="fz-14">点击更换头像</div>
              <div>
                <img v-if="info[item.key]"
                  :src="HOST + info[item.key].path"
                  alt=""
                  class="head-photo">
                <div v-else
                  class="head-photo bg-black"></div>
              </div>
            </div>
          </cell>
          <!-- address -->
          <div v-else-if="item.type === 'address'">
            <x-address :title="item.name"
              v-model="info[item.key]"
              raw-value
              :list="ChinaAddressData"
              value-text-align="left"
              label-align="justify"></x-address>
          </div>
        </div>
      </group>
      <x-button @click.native="logout">退出登录</x-button>
    </div>
  </hr-page>
</template>

<script>
import {
  Group,
  Cell,
  ChinaAddressData,
  XAddress,
  XInput,
  PopupRadio,
  Selector,
  XButton
} from 'vux'
import { hrPage, hrHeader } from '@/plugins/uiLib'
import moment from 'moment'
export default {
  components: {
    hrPage,
    hrHeader,
    Group,
    Cell,
    XAddress,
    XInput,
    PopupRadio,
    Selector,
    XButton
  },
  data() {
    return {
      HOST: window.HOST,
      ChinaAddressData,
      maps: {
        support: ['input', 'select', 'text', 'photo', 'address'],
        options: {
          sex: [
            { value: '1', label: '男' },
            { value: '0', label: '女' }
          ],
          industry: [
            { value: 1, label: '行业一' },
            { value: 2, label: '行业二' }
          ],
          position: [
            { value: 0, label: 'CEO' },
            { value: 1, label: '创始人' },
            { value: 2, label: '企业高管' },
            { value: 3, label: '产品' },
            { value: 4, label: '研发' },
            { value: 5, label: '运营' },
            { value: 6, label: '测试' },
            { value: 7, label: '编辑' },
            { value: 8, label: '设计' },
            { value: 9, label: '市场' },
            { value: 10, label: '销售' },
            { value: 11, label: '项目管理' },
            { value: 12, label: '人力资源' },
            { value: 13, label: '政府资源' },
            { value: 14, label: '其他' },
          ],
          rank: [
            { value: 0, label: '投资人' },
            { value: 1, label: '创始人' },
            { value: 2, label: '合伙人' },
            { value: 3, label: '董事' },
            { value: 4, label: '总裁' },
            { value: 5, label: 'CEO' },
            { value: 6, label: '高层管理' },
            { value: 7, label: '中层管理' },
            { value: 8, label: '基层管理' },
            { value: 9, label: '普通员工' },
            { value: 10, label: '其他' },
          ]
        },
        info: [
          { name: '头像', type: 'photo', key: 'kkapp_user_head' },
          { name: '姓名', type: 'input', key: 'kkapp_user_username' },
          { name: '手机号', type: 'input', key: 'kkapp_user_phone' },
          { name: '微信号', type: 'text', key: 'kkapp_user_wechat' },
          { name: '性别', type: 'select', key: 'kkapp_user_sex', options: 'sex' },
          { name: '行业', type: 'select', key: 'kkapp_user_industry', options: 'industry' },
          { name: '职位', type: 'select', key: 'kkapp_user_position', options: 'position' },
          { name: '职级', type: 'select', key: 'kkapp_user_rank', options: 'rank' },
          { name: '公司名称', type: 'input', key: 'kkapp_user_company' },
          { name: '公司邮箱', type: 'input', key: 'kkapp_user_mailbox' },
          { name: '城市', type: 'address', key: 'kkapp_user_city' }
        ]
      },
      info: {}
    }
  },
  created() {
    // 获取个人资料
    axios.get('/api/client/clientInfo').then(res => {
      if (res && res.personal) {
        this.info = {
          ...res.personal,
          kkapp_user_city: res.personal.kkapp_user_city || [] // 特殊处理一下地址的
        }
        // 获取行业信息
        this.getHYOptions()
      }
    })
  },
  methods: {
    // 是否是支持的控件类型
    ifSupport(item) {
      return !!this.maps.support.includes(item.type)
    },
    // 上传图片
    uploadImg(item) {
      const input = document.createElement('input')
      input.type = 'file'
      input.onchange = even => {
        const config = {
          //添加请求头
          headers: { 'Content-Type': 'multipart/form-data' }
        }
        const params = new FormData()
        params.append('file', even.target.files[0])
        axios.post('/admin/upload', params, config).then(res => {
          if (res) {
            this.info[item.key] = {
              deal_image: window.HOST + res,
              path: res,
              thumb_image: null
            }
          }
        })
      }
      input.click()
    },
    // 获取行业选项
    getHYOptions() {
      return axios.get('/api/client/getHY').then(res => {
        console.log(res)
        if (res) {
          this.maps.options.industry = res.data.map(item => ({
            value: item.id,
            label: item.kkapp_industry_input_1
          }))
        }
      })
    },
    // 保存
    saveInfo() {
      console.log(this.info, ChinaAddressData)
      const params = {
        ...this.info,
        kkapp_user_city: this.info.kkapp_user_city.map(item => {
          const temp = ChinaAddressData.find(it => it.value === item)
          console.log(temp)
          if (temp) {
            return temp.name
          } else {
            return item
          }
        }) // 处理 城市数据
      }
      axios.post('/api/client/updateClient', { $data: params }).then(res => {
        console.log(res)
      })
    },
    logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('userInfo')
      $g.toast('退出成功')
      setTimeout(() => {
        $g.goBack(1)
      }, 200)
    }
  }
}
</script>

<style lang="less" scoped>
.head-photo {
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
}
</style>
