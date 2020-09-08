<template>
  <div class="container">
    <div class="row">
      <div v-for: (date,i) in dates></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JCalendar'
}
</script>

<style scoped>
.row {
  display: flex;
  flex-direction: column;
}
</style>

