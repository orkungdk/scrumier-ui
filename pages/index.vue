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
import ObjectUtils from '~/service/Utils/ObjectUtils'

export default {
  components: {
    // Setup
    // WelcomePage,
    // Login
  },
  layout: 'unauthorized',
  data() {
    return {
      loggedInUser: ApplicationUser,
      hostRegistered: false
    }
  },
  async beforeMount() {
    const jiraConfigs = await ConfigurationService.getJiraConfig()
    if (ObjectUtils.anyNoneNull(jiraConfigs)) {
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
