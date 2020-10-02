<template>
  <v-row align="center" justify="center">
    <v-col cols="2">
      <h3 style="text-align: center">Individual Reports</h3>
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
    <v-col cols="12">
      <j-worklog-table
        :data="allWorklogs"
        :start-date="startDate"
        :end-date="endDate"
      ></j-worklog-table>
    </v-col>
  </v-row>
</template>

<script>
import DatePickerMenu from '@/components/date-picker-menu'
import WorklogRetrievalService from '@/service/time-tracker/WorklogRetrievalService'
import JWorklogTable from '@/components/j-worklog-table'

export default {
  name: 'ReportsVue',
  components: { JWorklogTable, DatePickerMenu },
  data() {
    return {
      allWorklogs: null,
      weekDayCount: 0,
      startDate: '',
      endDate: ''
    }
  },
  methods: {
    refreshWorklogData({ startDate, endDate }) {
      this.startDate = startDate
      this.endDate = endDate
      this.allWorklogs = WorklogRetrievalService.retrieveAllWorklogs(
        startDate,
        endDate
      ).then((res) => {
        return res.data.worklogs.reduce((r, a) => {
          r[a.author.key] = [...(r[a.author.key] || []), a]
          return r
        }, {})
      })
    },
    setDateToDay() {
      let day
      if (this.startDate === '') {
        day = new Date().toISOString().substring(0, 10)
      } else {
        day = this.startDate
      }
      this.refreshWorklogData({ startDate: day, endDate: day })
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
