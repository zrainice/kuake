<template>
  <div>
    <div v-for="item in formColumn" class="bg-white m-b-10">
      <div v-if="item.type === 'radio'">
        <group :title="item.title">
          <radio v-if="bindKey" :options="item.options" v-model="item[bindKey]" @on-change="radioChange"></radio>
          <radio v-else v-model="dataSource[item.key]" :options="item.options" @on-change="radioChange"></radio>
        </group>
      </div>
      <div v-else-if="item.type === 'checkbox'">
        <checklist v-if="bindKey" :title="item.title" :options="item.options" v-model="item[bindKey]"></checklist>
        <checklist v-else :title="item.title" :options="item.options" v-model="dataSource[item.key]"></checklist>
      </div>
    </div>
  </div>
</template>

<script>
  import { Radio, Group, Checklist } from 'vux'

  export default {
    name: "formComponent",
    components: {
      Radio,
      Group,
      Checklist
    },
    props: {
      dataSource: {
        type: Object,
        default() { return {} }
      },
      formColumn: {
        type: Array,
        default() { return [] }
      },
      bindKey: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
      }
    },
    methods: {
      radioChange(value, label) {
        console.log(value, label)
      }
    }
  }
</script>

<style scoped>

</style>
