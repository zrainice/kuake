<template>
  <div>
    <div v-for="(item, index) in listData"
      :key="index">
      <list-item :item="item"
        :defaultLevel="defaultLevel">
      </list-item>
    </div>
  </div>
</template>
<script>
import listItem from '../listItem/index.vue'
export default {
  props: {
    listData: {
      type: Array,
      default: []
    },
    defaultLevel: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
    }
  },
  created() {
  },
  watch: {
  },
  created() {
  },
  methods: {
  },
  components: {
    //   empty,
    listItem
  },
  mounted: function () {
  },
}
</script>
<style>
.refreshing-box {
  line-height: 40px;
  height: 40px;
  text-align: center;
  margin-top: -40px;
}
</style>