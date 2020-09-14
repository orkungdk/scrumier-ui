/* eslint-disable */
<template>
  <v-layout>
    <v-flex>
      <v-toolbar flat color="white">
        <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
          Today
        </v-btn>
        <v-btn fab text small color="grey darken-2" @click="prev">
          <v-icon small>mdi-chevron-left</v-icon>
        </v-btn>
        <v-toolbar-title v-if="$refs.calendar">
          {{ start }} - {{ end }}
        </v-toolbar-title>
        <v-btn fab text small color="grey darken-2" @click="next">
          <v-icon small>mdi-chevron-right</v-icon>
        </v-btn>
      </v-toolbar>
      <v-container>
        <v-sheet min-width="100%" height="80vh">
          <v-calendar
            ref="calendar"
            v-model="focus"
            :type="type"
            :min-weeks="minWeeks"
            :max-days="maxDays"
            :now="now"
            :dark="dark"
            :weekdays="weekdays"
            :hide-header="false"
            :interval-format="ads"
            :first-interval="intervals.first"
            :interval-minutes="intervals.minutes"
            :interval-count="intervals.count"
            :interval-height="intervals.height"
            :interval-style="intervalStyle"
            :show-interval-label="showIntervalLabel"
            :short-intervals="shortIntervals"
            :short-months="shortMonths"
            :short-weekdays="shortWeekdays"
            :color="color"
            :events="events"
            :event-overlap-mode="mode"
            :event-overlap-threshold="45"
            :event-color="getEventColor"
            @change="retrieveWorklogsUponDateChange"
          ></v-calendar>
        </v-sheet>
      </v-container>
    </v-flex>
    <!--<v-navigation-drawer
      v-if="$store.getters.isAuthenticated"
      v-model="drawer"
      :clipped="true"
      :permanent="true"
      :mini-variant="true"
      :right="true"
      fixed
      app
    >
    </v-navigation-drawer>-->
  </v-layout>
</template>

<script>
import WorklogRetrievalService from '@/service/time-tracker/WorklogRetrievalService'
// eslint-disable-next-line no-unused-vars
import calendar from '@/layouts/calendar'

const weekdaysDefault = [0, 1, 2, 3, 4, 5, 6]

const intervalsDefault = {
  first: 8,
  minutes: 60,
  count: 12,
  height: 120
}

const stylings = {
  default(interval) {
    return undefined
  },
  workday(interval) {
    const inactive =
      interval.weekday === 0 ||
      interval.weekday === 6 ||
      interval.hour < 9 ||
      interval.hour >= 17
    const startOfHour = interval.minute === 0
    const dark = this.dark
    const mid = dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'

    return {
      backgroundColor: inactive
        ? dark
          ? 'rgba(0,0,0,0.4)'
          : 'rgba(0,0,0,0.05)'
        : undefined,
      borderTop: startOfHour ? undefined : '1px dashed ' + mid
    }
  },
  past(interval) {
    return {
      backgroundColor: interval.past
        ? this.dark
          ? 'rgba(0,0,0,0.4)'
          : 'rgba(0,0,0,0.05)'
        : undefined
    }
  }
}

export default {
  data: () => ({
    dark: false,
    drawer: true,
    focus: '',
    start: '',
    end: '',
    startMenu: false,
    endMenu: false,
    nowMenu: false,
    minWeeks: 1,
    now: null,
    events: [],
    type: 'week',
    typeOptions: [
      { text: 'Day', value: 'day' },
      { text: '4 Day', value: '4day' },
      { text: 'Week', value: 'week' },
      { text: 'Month', value: 'month' },
      { text: 'Custom Daily', value: 'custom-daily' },
      { text: 'Custom Weekly', value: 'custom-weekly' }
    ],
    mode: 'stack',
    modeOptions: [
      { text: 'Stack', value: 'stack' },
      { text: 'Column', value: 'column' }
    ],
    weekdays: weekdaysDefault,
    weekdaysOptions: [
      { text: 'Sunday - Saturday', value: weekdaysDefault },
      { text: 'Mon, Wed, Fri', value: [1, 3, 5] },
      { text: 'Mon - Fri', value: [1, 2, 3, 4, 5] },
      { text: 'Mon - Sun', value: [1, 2, 3, 4, 5, 6, 0] }
    ],
    intervals: intervalsDefault,
    intervalsOptions: [
      { text: 'Default', value: intervalsDefault },
      {
        text: 'Workday',
        value: { first: 16, minutes: 30, count: 20, height: 48 }
      }
    ],
    maxDays: 7,
    maxDaysOptions: [
      { text: '7 days', value: 7 },
      { text: '5 days', value: 5 },
      { text: '4 days', value: 4 },
      { text: '3 days', value: 3 }
    ],
    styleInterval: 'default',
    styleIntervalOptions: [
      { text: 'Default', value: 'default' },
      { text: 'Workday', value: 'workday' },
      { text: 'Past', value: 'past' }
    ],
    color: 'primary',
    colorOptions: [
      { text: 'Primary', value: 'primary' },
      { text: 'Secondary', value: 'secondary' },
      { text: 'Accent', value: 'accent' },
      { text: 'Red', value: 'red' },
      { text: 'Pink', value: 'pink' },
      { text: 'Purple', value: 'purple' },
      { text: 'Deep Purple', value: 'deep-purple' },
      { text: 'Indigo', value: 'indigo' },
      { text: 'Blue', value: 'blue' },
      { text: 'Light Blue', value: 'light-blue' },
      { text: 'Cyan', value: 'cyan' },
      { text: 'Teal', value: 'teal' },
      { text: 'Green', value: 'green' },
      { text: 'Light Green', value: 'light-green' },
      { text: 'Lime', value: 'lime' },
      { text: 'Yellow', value: 'yellow' },
      { text: 'Amber', value: 'amber' },
      { text: 'Orange', value: 'orange' },
      { text: 'Deep Orange', value: 'deep-orange' },
      { text: 'Brown', value: 'brown' },
      { text: 'Blue Gray', value: 'blue-gray' },
      { text: 'Gray', value: 'gray' },
      { text: 'Black', value: 'black' }
    ],
    shortIntervals: true,
    shortMonths: false,
    shortWeekdays: false,
    startDate: '01-01-1900',
    endDate: '01-08-1900'
  }),
  computed: {
    intervalStyle() {
      return stylings[this.styleInterval].bind(this)
    },
    hasIntervals() {
      return this.type in { week: 1, day: 1, '4day': 1, 'custom-daily': 1 }
    },
    hasEnd() {
      return this.type in { 'custom-weekly': 1, 'custom-daily': 1 }
    },
    username() {
      return this.$store.getters.getLoggedInUser.username
    }
  },
  mounted() {
    this.$refs.calendar.scrollToTime('08:00')
    this.$refs.calendar.checkChange()
    // console.log(this.$refs.calendar)

    // console.log('Event: ' + this.document.getElementsByClassName('pl-1'))
  },
  created() {
    debugger
  },
  methods: {
    viewDay({ date }) {
      this.focus = date
      this.type = 'day'
    },
    getEventColor(event) {
      return event.color
    },
    showIntervalLabel(interval) {
      return false
    },
    retrieveWorklogsUponDateChange({ start, end }) {
      this.start = start.date
      this.end = end.date

      function generateEndDate(started, timeSpent) {
        const endDate = new Date(started)
        if (timeSpent.charAt(timeSpent.length - 1) === 'h') {
          endDate.setHours(
            endDate.getHours() +
              parseInt(timeSpent.substring(0, timeSpent.length - 1))
          )
        }
        return endDate
      }
      const worklogs = []
      // console.log(start.date)
      // console.log(end.date)
      WorklogRetrievalService.retrieveWorklogs(start.date, end.date).then(
        (res) => {
          const JTTWorklogs = res.data
          // console.log(JTTWorklogs)
          for (const JTTWorklog of JTTWorklogs.worklogs) {
            // console.log('IssueKey: ' + JTTWorklog.issueKey)
            worklogs.push({
              name: JTTWorklog.issueKey,
              start: new Date(JTTWorklog.started),
              end: generateEndDate(JTTWorklog.started, JTTWorklog.timeSpent),
              color: 'primary',
              timed: true,
              singleline: false,
              eventSummary: () => 'Hi, this is an event'
            })
          }
        }
      )

      this.events = worklogs
    },
    setToday() {
      this.focus = ''
    },
    prev() {
      console.log('Prev is called')
      this.$refs.calendar.prev()
    },
    next() {
      console.log('Next is called')
      this.$refs.calendar.next()
    }
  }
}
</script>

<style>
.wrapper-navbar {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
}
</style>
