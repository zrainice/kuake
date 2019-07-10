<template>
  <div v-if="show">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'hrTabItem',
  data() {
    return {
      show: false
    }
  }
}
</script>

