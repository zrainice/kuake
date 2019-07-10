<template>
  <div style="background:#fff;">
    <div class="list-item">
      {{item[defaultLevel.name]}}
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      item: {
        type: Object,
        default: {}
      },
      defaultLevel: {
        type: Object,
        default: {
          name: 'name'
        } 
      }
    }
  }
</script>
<style>

</style>
