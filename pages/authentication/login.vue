<template>
  <v-app id="background">
    <j-alert :alert="alert"></j-alert>
    <v-card id="application-login-card" raised>
      <v-card-title class="headline">
        <p>Welcome to Scrumier</p>
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
            color="#B0C4DE"
            routing-path="/authentication/register"
            label="Register"
          ></j-button>
        </v-col>
      </v-card-actions>
    </v-card>
  </v-app>
</template>

<script>
import JAlert from '~/components/j-alert'
import JTextField from '~/components/j-text-field'
import JButton from '~/components/j-button'
import AuthenticationService from '~/service/authentication/AuthenticationService'
import { ApplicationUser } from '~/model/ApplicationUser'
import UserUtils from '~/service/Utils/UserUtils'
import ObjectUtils from '~/service/Utils/ObjectUtils'

export default {
  name: 'Login',
  components: { JAlert, JButton, JTextField },
  layout: 'unauthorized',
  data() {
    return {
      loggedInUser: ApplicationUser,
      showOverlay: false,
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
    const this_ = this
    window.addEventListener('keydown', function(e) {
      if (e.code === 'Escape') {
        this_.doCloseAlert()
      } else if (e.code === 'Enter') {
        this_.doLogin()
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
      this.$nuxt.$loading.start()
      const _this = this
      if (this.username && this.password) {
        AuthenticationService.authenticate({
          username: _this.username,
          password: _this.password
        })
          .then((response) => {
            _this.storeLoggedInUser(response)
            _this.$router.push('/home/dashboard')
          })
          .catch((e) => {
            setTimeout(
              () =>
                _this.showErrorMessage(
                  ObjectUtils.parseErrorMessage(e.response.data)
                ),
              750
            )
          })
      }
      this.$nuxt.$loading.finish()
    },
    storeLoggedInUser(response) {
      this.loggedInUser = response.data.details
      this.loggedInUser.token = response.data.token
      this.loggedInUser.isLoggedIn = true
      this.loggedInUser.permissions = UserUtils.parsePermissions(response)
      this.loggedInUser.isAdmin = UserUtils.isAdmin(this.loggedInUser)

      this.$store.dispatch('login', this.loggedInUser)
    },

    showErrorMessage(errorMessage) {
      this.alert.show = true
      this.alert.type = 'error'
      this.alert.message = errorMessage
    }
  },
  head() {
    return {
      title: 'Login | Jira Time Tracker'
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
