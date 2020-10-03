<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="2">
        <h3 style="text-align: center">Team Reports</h3>
      </v-col>
      <v-spacer />
      <v-col cols="3">
        <v-row class="fill-height" no-gutters justify="center" align="center">
          <j-board-search-autocomplete @boardSelected="updateBoardId" />
        </v-row>
      </v-col>
      <v-col cols="3">
        <v-row class="fill-height" no-gutters justify="center" align="center">
          <j-sprint-search-autocomplete
            :placeholder="sprintPlaceholder"
            :board-id="boardId"
            @sprintSelected="getSprintData"
          ></j-sprint-search-autocomplete>
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
        <j-time-spent-on-issues-tab
          v-if="issues"
          :issues="issues"
          :doughnut-data="doughnutData"
        />
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import JTimeSpentOnIssuesTab from '@/components/j-time-spent-on-issues-tab'
import JBoardSearchAutocomplete from '@/components/autocomplete/j-boards-search-autocomplete'
import JSprintSearchAutocomplete from '@/components/autocomplete/j-sprint-search-autocomplete'
import GetTeamReportsData from '@/service/time-tracker/GetTeamReportsData'

export default {
  name: 'TeamReports',
  components: {
    JSprintSearchAutocomplete,
    JBoardSearchAutocomplete,
    JTimeSpentOnIssuesTab
  },
  data() {
    return {
      tab: null,
      items: ['Time Spent On Issues', 'Team Velocity', 'Export Report'],
      issues: null,
      doughnutData: null,
      sprintPlaceholder: 'Select board to view sprints',
      boardId: -1
    }
  },
  methods: {
    updateBoardId({ selectedItem }) {
      console.log(selectedItem)
      if (selectedItem !== null) this.boardId = selectedItem
    },
    getSprintData({ selectedItem }) {
      GetTeamReportsData.getTeamReportsDataForSprint(selectedItem)
        .then((res) => res.data)
        .then((data) => {
          this.issues = data.issues
          this.doughnutData = data.data
        })
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
