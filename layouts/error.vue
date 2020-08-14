<template>
  <v-app>
    <page-not-found-error v-if="error.statusCode === 404" :error="this.error" />
  </v-app>
</template>

<script>
import PageNotFoundError from '~/components/errors/page-not-found-error'
export default {
  components: { PageNotFoundError },
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
