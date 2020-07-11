<template>
  <v-app light>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-btn icon style="margin-right: 5px" to="/" @click.stop="fixed = !fixed">
        <v-avatar size="45">
          <v-img :src="logoPath" height="50px" width="50px"> </v-img>
        </v-avatar>
      </v-btn>
      <v-toolbar-title style="color: #0151cc" v-text="title" />
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
      clipped: false,
      fixed: false,
      title: 'Jira Time Tracking'
    }
  }
}
</script>

<style scoped></style>
