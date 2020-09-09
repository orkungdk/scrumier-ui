<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-center">
        <logo />
      </div>
      <v-card id="application_description">
        <v-card-title class="headline">
          <p>
            <b>Welcome to Jira Time Tracker</b>
          </p>
        </v-card-title>
        <v-card-text>
          <p>
            Jira Time Tracking is an application that allows to track logged
            works on the jira issues in a proper calendar format. Furthermore,
            you can follow each team members' work-logs on a calendar as well.
            Thanks to Jira Time Tracking, now it is much more easy to figure out
            the missing work-log on everyday.
          </p>
          <p>
            For more information on <b>Jira Time Tracking</b>, check out the
            <a href="https://vuetifyjs.com" target="_blank"> documentation </a>.
          </p>
          <p>
            Find a bug? Report it on the github
            <a
              href="https://github.com/orkungdk/jira-time-tracker-ui/issues"
              target="_blank"
              title="contribute"
            >
              issue bo^ard </a
            >.
          </p>

          <div class="text-xs-right">
            <em><small>Orkun Gedik - Enes Erciyes</small></em>
          </div>
          <hr class="my-3" />
          <br />
          <a href="https://github.com/orkungdk" target="_blank">
            GitHub
          </a>
          <br />
          <a
            href="https://bitbucket.org/worklogtrackers/ui/src/master/"
            target="_blank"
          >
            Bitbucket
          </a>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" nuxt to="/time-tracking/timesheet">
            Continue
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  }
}
</script>
<style>
@import 'style/index.css';
</style>
