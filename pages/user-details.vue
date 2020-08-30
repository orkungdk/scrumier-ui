<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card class="mx-auto" width="500">
        <v-img
          class="white--text align-end"
          :src="user.avatarUrl"
          height="500px"
        />
        <v-card-title>{{ user.username }}</v-card-title>
        <v-card-subtitle class="pb-0">{{ user.email }}</v-card-subtitle>

        <v-card-text class="text--primary">
          <div>{{ user.team }}</div>

          <div>Created At :{{ user.metaInformation.createdAt }}</div>
        </v-card-text>

        <v-card-actions>
          <v-btn color="orange" text>
            My Work
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { ApplicationUser } from '~/model/ApplicationUser'

export default {
  data() {
    return {
      user: {
        type: ApplicationUser,
        default: null
      }
    }
  },
  created() {
    this.user = this.$store.getters.getLoggedInUser
  }
}
</script>
<style>
@import 'style/index.css';
</style>
