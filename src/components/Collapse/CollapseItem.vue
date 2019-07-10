<template>
  <div class="collapse">
    <div class="collapse-header" @click="handleItem">
      <slot name="title">
        <span>{{title}}</span>
      </slot>
      <i class="weui-cell__ft collapse-animation" :class="isOpen ? 'collapse-rotate-90' : ''"></i>
    </div>
    <transition name="fade" mode="out-in">
      <div v-if="isOpen" class="collapse-content">
        <slot name="content">
          {{content}}
        </slot>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: "CollapseItem",
    props: {
      title: {
        type: [String, Number],
        default: ''
      },
      content: {
        type: [String, Number],
        default: ''
      },
      name: {
        type: [String, Number],
        default: ''
      }
    },
    data() {
      return {
        isOpen: false
      }
    },
    computed: {
    },
    methods: {
      handleItem() {
        this.isOpen = !this.isOpen;
        this.$emit('changeChoose', this.name);
      }
    }
  }
</script>

<style lang="less" scoped>
.collapse {
  border-top: 1px solid #ebeef5;
  padding: 0 0.2rem;
  &:last-of-type {
    border-bottom: 1px solid #ebeef5;
  }
  .collapse-header {
    height: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
  }
  .collapse-animation {
    transition: all 1s;
  }
  .collapse-rotate-90 {
    transform: rotate(90deg);
  }
  .collapse-content {
    padding-bottom: 0.2rem;
  }
}
</style>
