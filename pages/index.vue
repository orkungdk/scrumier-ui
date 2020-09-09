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
  data() {
    return {
      loggedInUser: ApplicationUser,
      hostRegistered: false
    }
  },
  async beforeMount() {
    const jiraConfigs = await ConfigurationService.getJiraConfig()
    if (ObjectUtils.anyNoneNull(jiraConfigs.data)) {
      if (this.$store.getters.isAuthenticated) {
        await this.$router.push('time-tracking/timesheet')
      } else {
        await this.$router.push('authentication/login')
      }
    } else {
      await this.$router.push('setup')
    }
  },
  layout: 'unauthorized'
}
</script>
