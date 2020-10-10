<template>
  <v-row class="box">
    <v-container class="calendar_header">
      <v-row class="toolbar" no-gutters>
        <v-col>
          <v-row justify="start">
            <v-avatar>
              <img
                :src="$store.getters.getLoggedInUser.avatarUrl"
                alt="avatar"
              />
            </v-avatar>
            <div class="wrapper-navbar">
              <h2 style="font-family: Comfortaa,cursive; font-size: 1.9em">
                {{ $store.getters.getLoggedInUser.displayName }}
              </h2>
            </div>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <v-divider style="margin: 5px 0; color: #91818A"></v-divider>
    <j-calendar></j-calendar>
  </v-row>
</template>

<script>
import JCalendar from '@/components/j-calendar'

export default {
  name: 'AdminView',
  components: { JCalendar },
  data() {
    return {
      test: 'test'
    }
  }
}
</script>

<style>
html,
body {
  height: 100%;
  margin: 0;
  overflow: hidden;
  font-family: 'Open Sans', sans-serif;
}

@media all {
  .container {
    max-width: 98%;
    padding: 12px 0px;
  }
}
.wrapper-navbar {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
}
</style>
