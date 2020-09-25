<template>
  <v-row>
    <v-spacer />
    <v-col cols="6">
      <date-picker-menu @dateChanged="refreshWorklogData"></date-picker-menu>
    </v-col>
    <v-spacer />
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
import DatePickerMenu from '@/components/j-datepicker'
import WorklogRetrievalService from '@/service/time-tracker/WorklogRetrievalService'
import JWorklogTable from '@/components/j-worklog-table'

export default {
  name: 'ReportsVue',
  components: { JWorklogTable, DatePickerMenu },
  data() {
    return {
      items: [],
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
    }
  }
}
</script>

<style scoped></style>
