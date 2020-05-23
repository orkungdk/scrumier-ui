<template>
  <v-app id="background">
    <v-card id="application-login-card" raised>
      <v-card-title class="headline">
        <p>Welcome to Jira Time Tracker</p>
      </v-card-title>
      <j-text-field v-model="username" label="Username"></j-text-field>
      <j-text-field
        v-model="password"
        label="Password"
        type="password"
      ></j-text-field>
      <v-card-actions>
        <v-col class="text-right">
          <j-button
            color="primary"
            routing-path="/authentication/login"
            label="Login"
          ></j-button>
          <j-button
            color="secondary"
            routing-path="/authentication/register"
            label="Register"
          ></j-button>
        </v-col>
      </v-card-actions>
    </v-card>
  </v-app>
</template>

<script>
import JTextField from '~/components/j-text-field'
import JButton from '~/components/j-button'
export default {
  name: 'Login',
  components: { JButton, JTextField },
  data() {
    return {
      username: '',
      password: ''
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
}

#application-login-card {
  background: #f5f5f5;
  position: center;
  margin-top: 25%;
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
