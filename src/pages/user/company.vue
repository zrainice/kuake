<template>
  <div class="user-company">
    <hr-header slot="header"
               title="企业咨询"
               :leftOptions="{backText: ''}">
      <span
      class="c-blue"
      slot="right"></span>
    </hr-header>
    <div slot="body">
      <div class="fz-14">企业咨询请联系 10086</div>
    </div>
  </div>
</template>

<script>
  import { hrPage, hrHeader } from '@/plugins/uiLib'
  export default {
    components: { hrPage, hrHeader },
    name: "company",
    data() {
      return {
        content: ''
      }
    },
    mounted() {
      this.getData()
    },
    methods: {
      getData() {
        axios.get('/api/client/consultation').then(res => {
          console.log(res)
        })
      }
    }
  }
</script>

<style scoped>

</style>
