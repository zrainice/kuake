<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "Collapse",
    props: {
      value: {
        type: String,
        default: ''
      },
      accordion: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        choose: ''
      }
    },
    mounted() {
      const children = this.$children.filter(item => item.$options && item.$options.name === 'CollapseItem')
      console.log(this)
      children.forEach(item => {
        // 手风琴模式要更改组件的开合状态
        if (this.accordion) {
          item.$set(item, 'isOpen', this.choose === item.name);
        }
        // 给子组件添加方法
        item.$on('changeChoose', this.changeChoose)
      })
    },
    methods: {
      changeChildrenValue() {
        if (this.accordion) {
          const children = this.$children.filter(item => item.$options && item.$options.name === 'CollapseItem')
          children.forEach(item => {
            // 手风琴模式要更改组件的开合状态
            item.$set(item, 'isOpen', this.choose === item.name);
          })
        }
      },
      changeChoose(name) {
        this.choose = name;
        this.changeChildrenValue()
      }
    }
  }
</script>

<style scoped>

</style>
