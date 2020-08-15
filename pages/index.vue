<template>
  <v-overlay :value="true">
    <v-progress-circular
      indeterminate
      size="64"
    ></v-progress-circular> </v-overlay
></template>

<script>
import { ApplicationUser } from '~/model/ApplicationUser'
import ConfigurationService from '~/service/Configuration/ConfigurationService'

export default {
  components: {
    // Setup
    // WelcomePage,
    // Login
  },
  data() {
    return {
      loggedInUser: ApplicationUser,
      hostRegistered: false
    }
  },
  async beforeMount() {
    const jiraConfigs = await ConfigurationService.getJiraConfig()
    if (
      jiraConfigs.data.apiVersion &&
      jiraConfigs.data.baseURL &&
      jiraConfigs.data.password &&
      jiraConfigs.data.username
    ) {
      if (this.$store.state.loggedInUser.isLoggedIn) {
        await this.$router.push('welcome-page')
      } else {
        await this.$router.push('authentication/login')
      }
    } else {
      await this.$router.push('setup')
    }
  }
}
</script>
