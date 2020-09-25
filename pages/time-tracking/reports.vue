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
        :week-day-count="weekDayCount"
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
      weekDayCount: 0
    }
  },
  methods: {
    refreshWorklogData({ startDate, endDate }) {
      this.weekDayCount = this.calculateWeekDays(
        new Date(startDate),
        new Date(endDate)
      )
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
    calculateWeekDays(startDate, endDate) {
      if (endDate < startDate) return 0

      // Calculate days between dates
      const millisecondsPerDay = 86400 * 1000 // Day in milliseconds
      startDate.setHours(0, 0, 0, 1) // Start just after midnight
      endDate.setHours(23, 59, 59, 999) // End just before midnight
      const diff = endDate - startDate // Milliseconds between datetime objects
      let days = Math.ceil(diff / millisecondsPerDay)

      // Subtract two weekend days for every week in between
      const weeks = Math.floor(days / 7)
      days = days - weeks * 2

      // Handle special cases
      const startDay = startDate.getDay()
      const endDay = endDate.getDay()

      // Remove weekend not previously removed.
      if (startDay - endDay > 1) days = days - 2

      // Remove start day if span starts on Sunday but ends before Saturday
      if (startDay === 0 && endDay !== 6) days = days - 1

      // Remove end day if span ends on Saturday but starts after Sunday
      if (endDay === 6 && startDay !== 0) days = days - 1

      return days
    }
  }
}
</script>

<style scoped></style>
