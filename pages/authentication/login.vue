<template>
  <v-app id="background">
    <nuxt-link to="/login">Login Page</nuxt-link>
    <j-alert :alert="alert"></j-alert>
    <v-card id="application-login-card" raised>
      <v-card-title class="headline">
        <p>Welcome to Jira Time Tracker</p>
      </v-card-title>
      <j-text-field v-model="username" label="Username" required></j-text-field>
      <j-text-field
        v-model="password"
        label="Password"
        type="password"
        required
      ></j-text-field>
      <v-card-actions>
        <v-col class="text-right">
          <j-button color="primary" :action="doLogin" label="Login"></j-button>
          <j-button
            color="secondary"
            routing-path="/authentication/register"
            label="Register"
          ></j-button>
        </v-col>
      </v-card-actions>
    </v-card>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-app>
</template>

<script>
import JAlert from '~/components/j-alert'
import JTextField from '~/components/j-text-field'
import JButton from '~/components/j-button'
import AuthenticationService from '~/service/authentication/AuthenticationService'
import { ApplicationUser } from '~/model/ApplicationUser'
export default {
  name: 'Login',
  components: { JAlert, JButton, JTextField },
  data() {
    return {
      loggedInUser: ApplicationUser,
      overlay: false,
      alert: {
        type: String,
        message: String,
        show: false
      },
      username: '',
      password: ''
    }
  },
  watch: {
    overlay(val) {
      val &&
        setTimeout(() => {
          this.overlay = false
        }, 750)
    }
  },
  mounted() {
    const app = this
    window.addEventListener('keydown', function(e) {
      if (e.code === 'Escape') {
        app.doCloseAlert()
      } else if (e.code === 'Enter') {
        app.doLogin()
      }
    })
  },
  methods: {
    doCloseAlert() {
      this.alert.show = false
    },
    doLogin() {
      if (!this.username || !this.password) {
        this.showErrorMessage('Username or password cannot be empty.')
        return
      }
      this.overlay = true
      const loginPage = this
      if (this.username && this.password) {
        AuthenticationService.authenticate({
          username: loginPage.username,
          password: loginPage.password
        })
          .then((response) => {
            loginPage.initLoggedInUser(response)
          })
          .catch((e) => {
            setTimeout(
              () => loginPage.showErrorMessage(e.response.data.message),
              750
            )
          })
      }
    },
    initLoggedInUser(response) {
      this.loggedInUser.isLoggedIn = true
      this.loggedInUser.permissions = this.getPermissionsFromAuthorities(
        response.data.authorities
      )
      this.loggedInUser.isAdmin = this.loggedInUser.permissions.includes(
        'ADMIN'
      )
      this.loggedInUser.username = response.data.name
      this.loggedInUser.token = 'Bearer ' + response.data.token
      this.$store.state.loggedInUser = this.loggedInUser
    },
    getPermissionsFromAuthorities(authorities) {
      const permissions = []
      authorities.forEach((value, index) => {
        permissions.push(value.permission)
      })
      return permissions
    },
    showErrorMessage(errorMessage) {
      this.alert.show = true
      this.alert.type = 'error'
      this.alert.message = errorMessage
    }
  }
}
</script>

<style scoped>
#background {
  background-image: url('../../assets/login-background.jpg');
  background-size: cover;
  width: 100%;
}

#application-login-card {
  width: 50% !important;
  margin-left: 25% !important;
  background: #f5f5f5;
  position: absolute;
  margin-top: 12%;
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

#login-progress-circular {
  position: center;
}
</style>
