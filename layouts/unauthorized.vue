<template>
  <v-app light>
    <v-app-bar
      style="padding: 0 16px"
      color="white"
      :clipped-left="clipped"
      fixed
      app
    >
      <v-toolbar-title
        style="margin-left: 30px; color: #26547c; font-family: Archivo Black,sans-serif; font-size: 1.8em"
        v-text="title"
      />
      <v-spacer />
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'Unauthorized',
  data() {
    return {
      logoPath: require('../assets/small-logo.png'),
      clipped: true,
      fixed: false,
      title: 'Scrumier'
    }
  }
}
</script>

<style scoped></style>
