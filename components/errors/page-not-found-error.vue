<template>
  <v-app id="background">
    <center>
      <v-img contain :src="imagePath" max-width="50%" max-height="50%"> </v-img>
      <j-button
        color="primary"
        routing-path="/"
        label="Go To Home Page"
        style="max-width: 30%"
      ></j-button>
    </center>
  </v-app>
</template>

<script>
import JButton from '~/components/j-button'
export default {
  components: { JButton },
  layout: 'unauthorized',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      imagePath: require('../../assets/page-not-found.png')
    }
  }
}
</script>
<style>
#pageNotFoundImageDiv {
  display: inline-block;
  position: relative;
  overflow: hidden;
}
</style>
