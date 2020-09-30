<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="2">
        <h3 style="text-align: center">Team Reports</h3>
      </v-col>
      <v-spacer />
      <v-col cols="2">
        <v-row class="fill-height" no-gutters justify="center" align="center">
          <v-autocomplete
            auto-select-first
            deletable-chips
            small-chips
            label="Sprint"
          ></v-autocomplete>
        </v-row>
      </v-col>
      <v-col cols="4">
        <v-row class="fill-height" no-gutters justify="center" align="center">
          <date-picker-menu
            style="display: inline-block"
            @dateChanged="refreshWorklogData"
          ></date-picker-menu>
        </v-row>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-tabs v-model="tab">
      <v-tabs-slider color="yellow"></v-tabs-slider>
      <v-tab v-for="item in items" :key="item">
        {{ item }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in items" :key="item">
        <j-time-spent-on-issues-tab> </j-time-spent-on-issues-tab>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import DatePickerMenu from '@/components/date-picker-menu'
import JTimeSpentOnIssuesTab from '@/components/j-time-spent-on-issues-tab'

export default {
  name: 'TeamReports',
  components: { JTimeSpentOnIssuesTab, DatePickerMenu },
  data() {
    return {
      tab: null,
      items: ['Time Spent On Issues', 'Team Velocity', 'Export Report'],
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
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

.reportButton {
  margin: auto 10px;
}
</style>
