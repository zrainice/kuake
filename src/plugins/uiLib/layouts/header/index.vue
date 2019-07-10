<template>
  <div class="hr-wrapper">
    <x-header ref="header"
      :title="title"
      :transition="transition"
      :leftOptions="innerLeftOptions"
      :rightOptions="rightOptions"
      @on-click-more="onClickMore"
      @on-click-title="onClickTitle">
      <slot name="default"
        slot="default" />
      <slot name="left"
        slot="left" />
      <slot name="overwrite-left">
        <span v-if="innerLeftOptions.showBack"
          slot="overwrite-left"
          @click="goBack">
          <a class="vux-header-back"> &nbsp;
            {{innerLeftOptions.backText}}
          </a>
        </span>
      </slot>
      <slot name="right"
        slot="right" />
      <slot name="overwrite-right"
        slot="overwrite-right" />
    </x-header>
  </div>
</template>

<script>
import { XHeader } from 'vux'
export default {
  props: {
    leftOptions: {
      type: Object,
      default() {
        return {
          backText: '返回',
          showBack: true,
          preventGoBack: false
        }
      }
    },
    title: {
      type: String,
      default: ''
    },
    transition: {
      type: String,
      default: ''
    },
    rightOptions: {
      type: Object,
      default() {
        return {
          showMore: false
        }
      }
    }
  },
  data() {
    return {
      innerLeftOptions: {
        backText: '返回',
        showBack: true,
        preventGoBack: false
      }
    }
  },
  mounted() {
    // 如果是在手机端 则进行顶部适配
    if (window.api) {
      $api.fixStatusBar(this.$refs.header.$el)
    }
    this.innerLeftOptions = { ...this.innerLeftOptions, ...this.leftOptions }
  },
  methods: {
    // 返回上一级
    goBack() {
      if (this.leftOptions.preventGoBack) {
        this.$emit('on-click-back')
      } else {
        // this.$router.go(-1)
        router.goBack()
      }
    },
    onClickMore() {
      this.$emit('on-click-more')
    },
    onClickTitle() {
      this.$emit('on-click-title')
    }
  },
  components: {
    XHeader
  }
}
</script>

<style scoped>
.hr-wrapper >>> .vux-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0;
  z-index: 1;
}

.hr-wrapper >>> .vux-header .vux-header-title {
  position: absolute;
  font-size: 0.32rem;
  left: 15%;
  width: 70% !important;
  margin: 0 !important;
  text-align: center !important;
  z-index: -1;
}

.hr-wrapper >>> .vux-header .vux-header-left,
.hr-wrapper >>> .vux-header .vux-header-right {
  display: flex !important;
  align-items: center;
  position: relative !important;
  height: 40px !important;
  top: 0 !important;
}

.hr-wrapper >>> .vux-header .vux-header-left {
  left: 0;
  padding-left: 0.25rem;
}

.hr-wrapper >>> .vux-header-back {
  position: relative;
}

.hr-wrapper >>> .vux-header-back::before {
  content: "";
  position: absolute;
  width: 0.18rem;
  height: 0.18rem;
  border: 1px solid #ccc;
  border-width: 1px 0 0 1px;
  -webkit-transform: rotate(315deg);
  -ms-transform: rotate(315deg);
  transform: rotate(315deg);
  bottom: 0.17rem;
  left: 0.07rem;
}
</style>
