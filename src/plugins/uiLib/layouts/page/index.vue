<template>
  <div style="height: 100%">
    <div ref="header" class="hr-page-header">
      <slot name="header"></slot>
    </div>
    <div class="hr-page-body"
      ref="body"
      :style="{backgroundColor: bgColor}">
      <view-box>
        <slot name="body"></slot>
      </view-box>
    </div>
    <div ref="bottom" class="hr-page-bottom">
      <slot name="bottom"></slot>
    </div>
  </div>
</template>

<script>
import { ViewBox } from 'vux'
export default {
  props: {
    // 上边距
    paddingTop: {
      type: Number,
      default: 0
    },
    // 下边距
    paddingBottom: {
      type: Number,
      default: 0
    },
    bgColor: {
      type: String,
      default: ''
    }
  },
  mounted() {
    // !todo 获取高度
    setTimeout(async () => {
      // 获取上一级page的可用高度 或者是html的高度
      let el = this.$el.parentNode
      let hasContainer = false
      let container
      // 寻找父容器节点
      while (el && el.classList) {
        if (el.className.indexOf('hr-page-body') > -1) {
          hasContainer = true
          container = el
          break
        } else {
          el = el.parentNode
        }
      }
      let height
      if (!hasContainer) {
        height = document.documentElement.offsetHeight
      } else {
        // container.dataset.hrheight 此处不能直接获取
        await this.sleep(() => {
          height = Number(container.dataset.hrheight)
        })
      }
      let body = this.$refs.body || {}
      let header = this.$refs.header || {}
      let bottom = this.$refs.bottom || {}
      // 获取当前布局高度
      let headerHeight = header.offsetHeight
      let bottomHeight = bottom.offsetHeight
      if (bottomHeight == 0) {
        bottomHeight = this.getChildHeight(bottom)
      }
      if (headerHeight == 0) {
        headerHeight = this.getChildHeight(header)
      }
      // 计算当前body部分可用高度
      height -= (headerHeight + bottomHeight + this.paddingTop + this.paddingBottom)
      body.style.height = height + 'px'
      body.dataset['hrheight'] = height
      body.className += ' hr-page-body'
    }, 400)
  },
  methods: {
    sleep(fn) {
      return new Promise(resolve => {
        setTimeout(() => {
          fn()
          resolve()
        })
      })
    },
    getChildHeight(el) {
      if (el && el.children && el.children.length) {
        let dom = el.children[0]
        if (dom.offsetHeight > 0) {
          return dom.offsetHeight
        } else {
          return this.getChildHeight(dom)
        }
      } else {
        return 0
      }
    }
  },
  components: {
    ViewBox
  },
}
</script>
