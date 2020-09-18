<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <j-alert :alert="alert"></j-alert>
      <v-stepper :value="stepperValue" class="mt-12">
        <v-stepper-header>
          <v-stepper-step step="1" :complete="this.stepperValue > 1"
            >Integrate Jira Instance</v-stepper-step
          >

          <v-divider></v-divider>

          <v-stepper-step step="2" :complete="this.stepperValue > 2"
            >Integrate Mail Server</v-stepper-step
          >

          <v-divider></v-divider>

          <v-stepper-step step="3" :complete="this.stepperValue > 3"
            >Create Administrator User</v-stepper-step
          >
        </v-stepper-header>
      </v-stepper>
      <!--  JIRA SETUP    -->
      <v-card v-if="this.stepperValue == 1" id="jiraSetUpCard">
        <v-progress-linear :value="fieldProgress"></v-progress-linear>
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
            and work-log information. The user needs to be have administrator
            permissions.
            <a href="https://vuetifyjs.com" target="_blank">
              Learn more about configuring Jira integration.
            </a>
          </p>
          <hr class="my-3" />
          <br />
          <j-text-field
            id="jiraUrlTextField"
            v-model="baseURL"
            label="JIRA Base URL"
            hint="JIRA Base URL to be integrated."
            required
          ></j-text-field>
          <j-text-field
            id="jiraUserKey"
            v-model="jiraUsername"
            label="JIRA Integration User Key"
            hint="The integration user key. (User should have admin or server admin permissions)"
            required
          ></j-text-field>
          <j-text-field
            id="jiraUserSecret"
            v-model="jiraPassword"
            label="JIRA Integration User Secret"
            hint="The integration user password. (Password should be updated after it is expired)"
            required
            type="password"
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
            :disabled="this.fieldProgress != 100"
            label="Test Connection"
            :action="testJiraConnection"
          ></j-button>
          <j-button
            color="primary"
            to="/"
            :disabled="!this.connectionTestSuccessful"
            label="Next"
            :action="doNext"
          ></j-button>
        </v-card-actions>
      </v-card>
      <!--  MAIL SETUP    -->
      <v-card v-if="this.stepperValue == 2" id="mailSetUpCard">
        <v-progress-linear :value="fieldProgress"></v-progress-linear>
        <v-card-title class="headline">
          <p>
            <b>Integration with Mail Server</b>
          </p>
        </v-card-title>
        <v-card-text>
          <p>
            Jira Time Tracking is an application that allows to schedule
            notification as a reminder. Please make sure that the given Mail
            Server SMTP details are valid. You may skip the mail server
            integration for now. Administrator users can be configure the SMTP
            Mail Server later on.
            <a href="https://vuetifyjs.com" target="_blank">
              Learn more about integration SMTP Mail Server.
            </a>
          </p>
          <hr class="my-3" />
          <br />
          <j-text-field
            id="mailHost"
            v-model="host"
            label="Host"
            hint="Mail Server Host Name to be integrated."
            required
          ></j-text-field>
          <j-text-field
            id="mailPort"
            v-model="port"
            label="Port"
            hint="Mail Port"
            required
          ></j-text-field>
          <j-text-field
            id="mailUsername"
            v-model="mailUsername"
            label="Username"
            hint="Mail Server Username"
            required
          ></j-text-field>
          <j-text-field
            id="mailPassword"
            v-model="mailPassword"
            label="Password"
            hint="Mail Server Password. (Password should be updated after it is expired)"
            required
            type="password"
          ></j-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <j-button
            color="secondary"
            :disabled="this.fieldProgress != 100"
            label="Test Connection"
            :action="testMailConnection"
          ></j-button>
          <j-button
            v-if="this.fieldProgress > 0"
            color="primary"
            to="/"
            :disabled="!this.connectionTestSuccessful"
            label="Next"
            :action="doNext"
          ></j-button>
          <j-button
            v-else
            color="primary"
            to="/"
            label="Skip"
            :action="skipEmailServerIntegration"
          ></j-button>
        </v-card-actions>
      </v-card>
      <!--  ADMINISTRATOR SETUP    -->
      <v-card v-if="this.stepperValue == 3" id="adminCreateCard">
        <v-progress-linear :value="fieldProgress"></v-progress-linear>
        <v-card-title class="headline">
          <p>
            <b>Create Administrator User</b>
          </p>
        </v-card-title>
        <v-card-text>
          <p>
            Jira Time Tracking is an application requires an administrator
            account. After the setup is successfully completed, administrator
            user will be able to update Jira Server and Mail Server
            configuration. Administrator user can also assign users to groups
            including administrator group.
            <a href="https://vuetifyjs.com" target="_blank">
              Learn more about Administrator User.
            </a>
          </p>
          <hr class="my-3" />
          <br />
          <j-text-field
            id="adminUsername"
            v-model="adminUsername"
            label="Username"
            hint="Administrator User Username"
            required
          ></j-text-field>
          <j-text-field
            id="adminEmail"
            v-model="adminEmail"
            label="Email"
            hint="Administrator User Email"
            password
            is-email
            required
          ></j-text-field>
          <j-text-field
            id="adminPassword"
            v-model="adminPassword"
            label="Password"
            hint="Administrator User Password"
            type="password"
            required
          ></j-text-field>
          <j-text-field
            id="adminRePassword"
            v-model="adminRePassword"
            label="Re-Password"
            hint="Administrator User Password"
            required
            type="password"
          ></j-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <j-button
            color="primary"
            to="/"
            label="Finish Setup"
            :disabled="this.fieldProgress != 100"
            :action="finishSetup"
          ></j-button>
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-overlay absolute opacity="0.9" :value="setupCompletedOverlay">
      <center>
        <v-icon size="150" color="green darken-2"
          >mdi-checkbox-marked-circle</v-icon
        >
      </center>
      <center>
        <p><b>Jira Time Tracker is ready!</b></p>
      </center>
    </v-overlay>
  </v-layout>
</template>

<script>
import JTextField from '~/components/j-text-field'
import JButton from '~/components/j-button'
import JAlert from '~/components/j-alert'
import ConfigurationService from '~/service/Configuration/ConfigurationService'
import UserService from '~/service/authentication/UserService'
import IntegrationService from '@/service/integration/IntegrationService'
export default {
  name: 'SetupVue',
  components: { JAlert, JButton, JTextField },
  data() {
    return {
      // page details
      connectionTestSuccessful: false,
      stepperValue: 1,
      fieldProgress: 0,
      alert: {
        type: '',
        message: '',
        show: false
      },
      setupCompletedOverlay: false,
      // jira details
      baseURL: '',
      jiraUsername: '',
      jiraPassword: '',
      apiVersion: '',
      // mail details
      isEmailServerIntegrationSkipped: false,
      host: '',
      port: '',
      mailUsername: '',
      mailPassword: '',
      // admin details
      adminUsername: '',
      adminEmail: '',
      adminPassword: '',
      adminRePassword: ''
    }
  },
  watch: {
    baseURL(newVal, oldVal) {
      this.updateProgress(newVal, oldVal)
    },
    jiraUsername(newVal, oldVal) {
      this.updateProgress(newVal, oldVal)
    },
    jiraPassword(newVal, oldVal) {
      this.updateProgress(newVal, oldVal)
    },
    apiVersion(newVal, oldVal) {
      this.updateProgress(newVal, oldVal)
    },
    host(newVal, oldVal) {
      this.updateProgress(newVal, oldVal)
    },
    port(newVal, oldVal) {
      this.updateProgress(newVal, oldVal)
    },
    mailUsername(newVal, oldVal) {
      this.updateProgress(newVal, oldVal)
    },
    mailPassword(newVal, oldVal) {
      this.updateProgress(newVal, oldVal)
    },
    adminUsername(newVal, oldVal) {
      this.updateProgress(newVal, oldVal)
    },
    adminEmail(newVal, oldVal) {
      this.updateProgress(newVal, oldVal)
    },
    adminPassword(newVal, oldVal) {
      this.updateProgress(newVal, oldVal)
    },
    adminRePassword(newVal, oldVal) {
      this.updateProgress(newVal, oldVal)
    },
    setupCompletedOverlay(val) {
      val && setTimeout(() => {}, 7500)
    }
  },
  mounted() {
    const this_ = this
    window.addEventListener('keydown', function(e) {
      if (e.code === 'Escape') {
        this_.alert.show = false
      }
    })
  },
  methods: {
    updateProgress(newVal, oldVal) {
      this.connectionTestSuccessful = false
      if (newVal && !oldVal) {
        this.increaseProgress()
      } else if (!newVal && oldVal) {
        this.decreaseProgress()
      }
    },
    increaseProgress() {
      this.fieldProgress = this.fieldProgress + 25
    },
    decreaseProgress() {
      this.fieldProgress = this.fieldProgress - 25
    },
    testJiraConnection() {
      const this_ = this
      IntegrationService.testConnection({
        baseURL: this_.baseURL,
        username: this_.jiraUsername,
        password: this_.jiraPassword
      })
        .then((response) => {
          if (response.status === 200) {
            this_.alert.show = true
            this_.alert.message = 'Connection is successfully verified.'
            this_.alert.type = 'success'
            this_.connectionTestSuccessful = true
          }
        })
        .catch((e) => {
          this_.alert.show = true
          this_.alert.type = 'error'
          this_.alert.message = 'Connection failed.'
        })
    },
    testMailConnection() {
      // TODO
      alert('test mail')
    },
    doNext() {
      this.connectionTestSuccessful = false
      this.alert.show = false
      this.fieldProgress = 0
      if (this.stepperValue < 3) {
        this.stepperValue++
      }
    },
    finishSetup() {
      if (this.adminPassword !== this.adminRePassword) {
        this.alert.show = true
        this.alert.message = 'Passwords are not matching.'
        this.alert.type = 'error'

        return
      }
      this.configureProperties()
      this.createAdmin()
      this.route()
    },
    createAdmin() {
      UserService.register({
        username: this.adminUsername,
        password: this.adminPassword,
        email: this.adminEmail,
        team: 'jira-time-tracker-admins'
      })
    },
    configureProperties() {
      const this_ = this
      const configProperties = []
      if (!this.isEmailServerIntegrationSkipped) {
        configProperties.push(
          { propertyKey: 'SMTP_HOST', propertyValue: this_.host },
          { propertyKey: 'SMTP_PORT', propertyValue: this_.port },
          { propertyKey: 'SMTP_USERNAME', propertyValue: this_.mailUsername },
          { propertyKey: 'SMTP_PASSWORD', propertyValue: this_.mailPassword }
        )
      }
      configProperties.push(
        {
          propertyKey: 'JIRA_BASE_URL',
          propertyValue: this_.baseURL
        },
        {
          propertyKey: 'JIRA_USERNAME',
          propertyValue: this_.jiraUsername
        },
        {
          propertyKey: 'JIRA_PASSWORD',
          propertyValue: this_.jiraPassword
        },
        {
          propertyKey: 'JIRA_REST_API_VERSION',
          propertyValue: this_.apiVersion
        }
      )
      ConfigurationService.setup(JSON.stringify(configProperties))
    },
    route() {
      const _this = this
      _this.setupCompletedOverlay = true
      setTimeout(function() {
        _this.$router.push('authentication/login')
      }, 2500)
    },
    skipEmailServerIntegration() {
      this.isEmailServerIntegrationSkipped = true
      this.doNext()
    }
  },
  head() {
    return {
      title: 'Setup Jira Time Tracker'
    }
  },
  layout: 'unauthorized',
  beforeRouteEnter(to, from, next) {
    if (from.name !== 'index') {
      next('/invalid-page')
    } else {
      next(async (component) => await component.getData(to))
    }
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
