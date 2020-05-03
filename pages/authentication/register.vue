<template>
  <v-app id="background">
    <j-alert :alert="alert"></j-alert>
    <v-card id="application-login-card" raised>
      <v-card-title class="headline">
        <p>Register to Jira Time Tracker</p>
      </v-card-title>
      <j-text-field v-model="username" label="Username"></j-text-field>
      <j-text-field v-model="team" label="Team"></j-text-field>
      <j-text-field
        v-model="password"
        label="Password"
        type="password"
      ></j-text-field>
      <j-text-field
        v-model="rePassword"
        label="Re-Password"
        type="password"
      ></j-text-field>
      <v-card-actions>
        <v-col class="text-right">
          <j-button
            color="secondary"
            label="Register"
            :action="register"
          ></j-button>
        </v-col>
      </v-card-actions>
    </v-card>
  </v-app>
</template>

<script>
import JTextField from '~/components/j-text-field'
import JButton from '~/components/j-button'
import JAlert from '~/components/j-alert'
export default {
  name: 'Login',
  components: { JAlert, JButton, JTextField },
  data() {
    return {
      username: '',
      team: '',
      password: '',
      rePassword: '',
      isRegistered: false,
      alert: {
        type: String,
        message: String,
        show: false
      }
    }
  },
  methods: {
    register() {
      if (
        this.username &&
        this.team &&
        this.password &&
        this.rePassword &&
        this.password === this.rePassword
      ) {
        this.alert.show = true
        this.alert.type = 'success'
        this.alert.message = 'Registered!'
      } else {
        this.alert.show = true
        this.alert.type = 'error'
        this.alert.message = 'Please fill required information!'
      }
    }
  }
}
</script>

<style scoped>
#background {
  background-image: url('../../assets/login-background.jpg');
  background-size: cover;
}

#application-login-card {
  width: 50% !important;
  margin-left: 25% !important;
}

#application-login-card {
  background: #f5f5f5;
  position: center;
  margin-top: 10%;
}

.v-application p {
  color: #205081;
}

.j-text-field {
  margin-left: 10% !important;
  width: 82% !important;
}

.jira-time-tracker-button {
  float: right !important;
  margin-right: 3.5% !important;
}
</style>
