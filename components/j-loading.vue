<template>
  <v-overlay :value="show">
    <v-progress-circular
      color="primary"
      indeterminate
      size="64"
    ></v-progress-circular>
  </v-overlay>
</template>

<script>
export default {
  name: 'JLoading',
  data() {
    return {
      show: false
    }
  },
  methods: {
    start() {
      this.show = true
    },
    finish() {
      this.show = false
    }
  }
}
</script>

<style scoped></style>
