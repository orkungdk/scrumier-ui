<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card class="mx-auto" width="500">
        <v-img
          class="white--text align-end"
          :src="$store.state.loggedInUser.avatarUrl"
          height="500px"
        />
        <v-card-title>{{ $store.state.loggedInUser.username }}</v-card-title>
        <v-card-subtitle class="pb-0">{{
          $store.state.loggedInUser.email
        }}</v-card-subtitle>

        <v-card-text class="text--primary">
          <div>{{ $store.state.loggedInUser.team }}</div>

          <div>
            Created At :{{
              $store.state.loggedInUser.metaInformation.createdAt
            }}
          </div>
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
export default {}
</script>
<style>
@import 'style/index.css';
</style>
