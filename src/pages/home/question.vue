<template>
  <hr-page>
    <div slot="header"
         style="border-bottom: 1px solid rgba(221, 221, 221, 0.5);">
      <hr-header :leftOptions="{backText: ''}">让夸克更懂你</hr-header>
    </div>
    <div slot="body">
      <form-component bindKey="data" :formColumn.sync="columns"></form-component>
      <div class="p-b-100">
        <x-button type="primary" @click.native="submit">提交</x-button>
        <x-button @click.native="$router.go(-1)" type="warn">跳过</x-button>
      </div>
    </div>
  </hr-page>
</template>

<script>
  import { hrHeader, hrPage } from '@/plugins/uiLib'
  import { XButton } from 'vux'
  import FormComponent from '@/components/form'
  export default {
    name: "question",
    components: { FormComponent, XButton, hrPage, hrHeader },
    data() {
      return {
        columns: [
          { title: '您的性别', key: 'sex', type: 'radio', options: [
              { key: 1, value: '男' },
              { key: 2, value: '女' }
            ] },
          { title: '您的年龄', key: 'age', type: 'radio', options: [
              { key: '1', value: '28周岁以下' },
              { key: '2', value: '28-35周岁' },
              { key: '3', value: '35-45周岁' },
              { key: '4', value: '45-55周岁' }
            ] },
          { title: '以下课程您感兴趣的是', key: 'interest', type: 'radio', options: [
              { key: '1', value: '企业教育' },
              { key: '2', value: '员工教育' },
              { key: '3', value: '人员素质' },
              { key: '4', value: '职业素质' }
            ] }
        ]
      }
    },
    mounted() {
      this.getQuestion()
    },
    methods: {
      // 获取测试题列表
      getQuestion() {
        axios.get('/api/exam/getDetail').then(res => {
          if (res) {
            this.columns = res.map(item => {
              return {
                ...item,
                title: item.kkapp_test_title,
                data: item.kkapp_test_type === 0 ? '' : [],
                key: '',
                type: item.kkapp_test_type === 0 ? 'radio' : 'checkbox',
                options: Object.entries(item.option).map((([key, it]) => ({
                  ...it,
                  key: it.id,
                  value: it.kkapp_option_answer
                }))) }
            })
          }
        })
      },
      // 表单校验空
      dealFormEmpty(item) {
        let res = false
        item.forEach(item => {
          if (typeof item.data === 'object' && !item.data.length) {
            res = true
          } else if (!item.data) {
            res = true
          }
        })
        return res
      },
      submit() {
        console.log(this.columns)
        const temp = JSON.parse(JSON.stringify(this.columns))
        if (this.dealFormEmpty(temp)) {
          this.$vux.toast.show({
            type: 'warn',
            text: '请填写完整!'
          });
          return
        }
        const params = {
          optionId: temp.reduce((a, b) => {
            console.log(a, b)
            const tempa = a.data || []
            const tempb = b.data || []
            let temp = []
            temp = [...temp, ...(typeof tempa === 'object' ? [...tempa] : [tempa])]
            temp = [...temp, ...(typeof tempb === 'object' ? [...tempb] : [tempb])]
            return { data: temp }
          }).data,
          data: temp.map(item => {
            return {
              kkapp_test_middle_subject: item.title,
              kkapp_test_middle_subject_type: item.kkapp_test_type,
              kkapp_test_middle_option: Object.entries(item.option).map(([k, it]) => it.kkapp_option_answer).join(','),
              kkapp_test_middle_answer: typeof item.data === 'object' ? item.data.join(',') : String(item.data),
              kkapp_test_middle_t_id: item.id
            }
          })
        }
        axios.post('/api/exam/saveDetail', params).then(res => {
          console.log(res)
          if (res) {
            this.$vux.toast.show({
              text: '提交成功!'
            });
            this.$router.go(-1)
          }
        })
      }
    },
    watch: {
      form: {
        deep: true,
        handler() {
          // console.log(JSON.parse(JSON.stringify(this.form)))
        }
      }
    }
  }
</script>

<style scoped>

</style>
