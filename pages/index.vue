<template>
  <welcome-page v-if="$store.state.loggedInUser.isLoggedIn"></welcome-page>
  <login v-else></login>
</template>

<script>
import Login from '~/pages/authentication/login'
import WelcomePage from '~/pages/welcome-page'

export default {
  components: {
    WelcomePage,
    Login
  }
}
</script>
