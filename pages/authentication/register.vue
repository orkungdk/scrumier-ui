<template>
  <v-app id="background">
    <j-alert :alert="alert"></j-alert>
    <v-card id="application-login-card" raised>
      <v-card-title class="headline">
        <p>Register to Jira Time Tracker</p>
      </v-card-title>
      <j-text-field
        v-model="user.username"
        label="Username"
        required
      ></j-text-field>
      <j-text-field
        v-model="user.email"
        label="Email"
        required
        is-email
      ></j-text-field>
      <j-text-field v-model="user.team" label="Team" required></j-text-field>
      <j-text-field
        v-model="user.password"
        label="Password"
        type="password"
        required
      ></j-text-field>
      <j-text-field
        v-model="rePassword"
        label="Re-Password"
        type="password"
        required
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
import { ApplicationUser } from '~/model/ApplicationUser'
import UserService from '~/service/authentication/UserService'
export default {
  name: 'Login',
  components: { JAlert, JButton, JTextField },
  data() {
    return {
      user: ApplicationUser,
      rePassword: '',
      alert: {
        type: String,
        message: String,
        show: false
      }
    }
  },
  methods: {
    register() {
      if (this.isRegistrationValidated()) {
        const response = this.doCallRegistration()

        if (response) {
          this.alert.show = true
          this.alert.type = 'success'
          this.alert.message = 'Registered!'
        }
      } else {
        this.alert.show = true
        this.alert.type = 'error'
        this.alert.message = 'Please fill required information!'
      }
    },
    isRegistrationValidated() {
      return (
        this.user.username &&
        this.user.team &&
        this.user.password &&
        this.rePassword &&
        this.user.password === this.rePassword
      )
    },
    async doCallRegistration() {
      const response = await UserService.register(this.user)
      return response.status
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
  position: absolute;
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
