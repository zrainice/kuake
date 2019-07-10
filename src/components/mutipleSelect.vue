<template>
  <div>
    <div></div>
    <cell :title="title"
      isLink
      @click.native="optionsShow = true">
      <div class="multiple-value">{{showList}}</div>
    </cell>
    <popup v-model="optionsShow"
      :hide-on-blur="false"
      height="100%">
      <div class="tx-c popup-title">
        <div>
          <span class="c-666 tx-c f-l"
            @click="handleCancel">取消</span>
          <span>{{popupTitle}}</span>
          <span class="c-blue f-r"
            @click="handelConfirm">确认</span>
        </div>
      </div>
      <div claas="hr-popup-container"
        style="padding-top: 1.88rem;">
        <checklist v-model="innerVal"
          @on-change="handleValChange"
          :options="options"></checklist>
      </div>
    </popup>
  </div>
</template>

<script>
import { Cell, Popup, Checklist } from 'vux'
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    value: {
      type: Array,
      default: []
    },
    /**
     * options: {
     *  key: String | Number , 键值
     *  value: String 显示值
     * }
     */
    options: {
      type: Array,
      default: []
    }
  },
  computed: {
    showList() {
      if (this.innerVal.length == 0) {
        return this.placeholder
      } else {
        let _temp = []
        this.options.forEach(item => {
          let ret = this.innerVal.find(k => k == item.key)
          if (ret) {
            _temp.push(item)
          }
        })
        return _temp.map(i => i.value).join(',')
      }
    },
    popupTitle() {
      return this.title.replace('*', '')
    }
  },
  data() {
    return {
      oldVal: [],
      innerVal: [],
      optionsShow: false
    }
  },
  created() {
    this.oldVal = this.value
    this.innerVal = this.value
  },
  methods: {
    handleValChange() {
      this.$emit('input', this.innerVal)
    },
    handleCancel() {
      this.innerVal = JSON.parse(JSON.stringify(this.oldVal))
      this.optionsShow = false
    },
    handelConfirm() {
      this.optionsShow = false
      this.handleValChange()
    }
  },
  watch: {
    value(val, oldVal) {
      if (val != oldVal) {
        this.innerVal = val
      }
    }
  },
  components: {
    Popup,
    Cell,
    Checklist
  }
}
</script>

<style lang="less" scoped>
.popup-title {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  height: 0.88rem;
  padding: 1rem 0.2rem 0;
  & > div {
    background: #eee;
    line-height: 0.88rem;
  }
}

.multiple-value {
  display: inline-block;
  width: 3.5rem;
  color: #333;
}
// 不生效 todo
.hr-popup-container {
  padding-top: 1.88rem !important;
  overflow-y: scroll;
}
</style>