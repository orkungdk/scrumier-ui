<template>
  <v-alert v-if="alert.show" prominent :type="alert.type">
    <v-row align="center">
      <v-col class="grow"> {{ alert.message }} </v-col>
      <v-col class="shrink">
        <v-btn
          x-small
          class="mx-2"
          fab
          light
          color="white"
          @click="closeAlert"
          @keyup.enter="closeAlert"
        >
          <v-icon light>mdi-close</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-alert>
</template>

<script>
export default {
  name: 'JAlert',
  props: {
    alert: Object
  },
  methods: {
    closeAlert() {
      this.alert.show = false
    }
  }
}
</script>

<style scoped>
#cancel-action-button {
  width: 10%;
}
</style>
