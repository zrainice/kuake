<template>
  <div>
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  mounted() {
    this.$children[this.value].show = true
  },
  methods: {
    setIndex(index) {
      this.$children[this.currentIndex].show = false
      this.$children[index].show = true
      this.currentIndex = index
      this.$emit('input', index)
    }
  },
  watch: {
    value(val, oldVal) {
      if (val != oldVal) {
        this.setIndex(val)
      }
    }
  }
}
</script>