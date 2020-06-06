<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <j-alert :alert="alert"></j-alert>
      <v-card id="setupCard">
        <v-progress-linear :value="progress"></v-progress-linear>
        <v-card-title class="headline">
          <p>
            <b>Integration with JIRA instance</b>
          </p>
        </v-card-title>
        <v-card-text>
          <p>
            Jira Time Tracking is an application that allows to track logged
            works on the Jira issues in a proper calendar format. Please fill in
            the details of the Jira instance you wish to retrieve user, group
            and work-log information. You will also need an administration that
            that application.
            <a href="https://vuetifyjs.com" target="_blank">
              Learn more about configuring Jira integration.
            </a>
          </p>
          <hr class="my-3" />
          <br />
          <j-text-field
            id="jiraUrlTextField"
            v-model="baseUrl"
            label="JIRA Base URL"
            hint="JIRA Base URL to be integrated."
            required
          ></j-text-field>
          <j-text-field
            id="jiraUserKey"
            v-model="username"
            label="JIRA Integration User Key"
            hint="The integration user key. (User should have admin or server admin permissions)"
            required
          ></j-text-field>
          <j-text-field
            id="jiraUserSecret"
            v-model="password"
            label="JIRA Integration User Secret"
            hint="The integration user password. (Password should be updated after it is expired)"
            required
            password
          ></j-text-field>
          <j-text-field
            id="jiraApiVersion"
            v-model="apiVersion"
            label="JIRA API Version"
            hint="Please check to documentation to make sure that api version is supported by Jira Time Tracker"
            required
          ></j-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <j-button
            color="secondary"
            :disabled="this.progress != 100"
            label="Test Connection"
            :action="testConnection"
          ></j-button>
          <j-button
            color="primary"
            to="/"
            :disabled="!this.connectionTestSuccessful"
            label="Finish"
            :action="finishSetup"
          ></j-button>
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-layout>
</template>

<script>
import JTextField from '~/components/j-text-field'
import JButton from '~/components/j-button'
import JAlert from '~/components/j-alert'
import ConfigurationService from '~/service/Configuration/ConfigurationService'
export default {
  name: 'SetupVue',
  components: { JAlert, JButton, JTextField },
  data() {
    return {
      baseUrl: '',
      username: '',
      password: '',
      apiVersion: '',
      progress: 0,
      connectionTestSuccessful: false,
      overlay: false,
      alert: {
        type: '',
        message: '',
        show: false
      }
    }
  },
  watch: {
    baseUrl(newVal, oldVal) {
      debugger
      this.updateProgress(newVal, oldVal)
    },
    username(newVal, oldVal) {
      this.updateProgress(newVal, oldVal)
    },
    password(newVal, oldVal) {
      this.updateProgress(newVal, oldVal)
    },
    apiVersion(newVal, oldVal) {
      this.updateProgress(newVal, oldVal)
    }
  },
  mounted() {
    const app = this
    window.addEventListener('keydown', function(e) {
      if (e.code === 'Escape') {
        app.alert.show = false
      } else if (e.code === 'Enter') {
        if (app.connectionTestSuccessful) {
          app.setUp()
        }
      }
    })
  },
  methods: {
    setUp() {
      alert('setup')
    },
    updateProgress(newVal, oldVal) {
      this.connectionTestSuccessful = false
      if (newVal && !oldVal) {
        this.increaseProgress()
      } else if (!newVal && oldVal) {
        this.decreaseProgress()
      }
    },
    increaseProgress() {
      this.progress = this.progress + 25
    },
    decreaseProgress() {
      this.progress = this.progress - 25
    },
    testConnection() {
      this.overlay = true
      const setup = this
      debugger
      ConfigurationService.testConnection({
        baseUrl: setup.baseUrl,
        username: setup.username,
        password: setup.password
      })
        .then((response) => {
          debugger
          this.overlay = false
          if (response.status === 200) {
            setup.alert.show = true
            setup.alert.message = 'Connection is successfully verified.'
            setup.alert.type = 'success'
            setup.connectionTestSuccessful = true
          }
        })
        .catch((e) => {
          debugger
          setup.alert.show = true
          setup.alert.type = 'error'
          setup.alert.message = 'Connection failed.'
          setup.overlay = false
          console.log(e)
        })
    }
  }
}
</script>

<style scoped></style>
