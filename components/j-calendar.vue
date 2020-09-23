<template>
  <v-sheet class="calendar" min-width="100%" height="568.4px">
    <vue-cal
      ref="calendar"
      :disable-views="['years', 'year', 'month', 'week', 'day']"
      :time="false"
      active-view="week"
      :hide-weekends="hideWeekends"
      :events="events"
      :snap-to-time="0"
      editable-events
      @ready="retrieveWorklogsUponDateChange"
      @view-change="retrieveWorklogsUponDateChange"
    >
      <template v-slot:event="{ event: worklog }">
        <div class="vuecal__event-container">
          <div class="vuecal__event-title">{{ worklog.title }}</div>
          <div class="vuecal__event-explanation">
            {{ worklog.explanation }}
          </div>
          <div class="vuecal__event-footer">
            <v-icon small> mdi-check-outline </v-icon>
            <div class="issueKey">{{ worklog.issueKey }}</div>
            <strong class="timeSpent"> {{ worklog.timeSpent }}</strong>
          </div>
        </div>
        <!-- Or if your events are editable: -->
      </template>
      <template v-slot:title="{ title, view }">
        <span v-if="view.id === 'week'">
          <div style="display: flex; flex-direction: column">
            <span style="font-weight: bold; font-size: medium">
              {{ formatDate(view.startDate) }} -
              {{ formatDate(view.endDate) }}
            </span>
            <span style="font-weight: bold; font-size: small">
              {{ worklogValues.reduce((a, b) => a + b, 0) }}h / 40h
            </span>
          </div>
        </span>
      </template>
      <template v-slot:cell-content="{ cell }">
        <j-worklog-add-button
          :date="parseSimpleDate(cell.startDate)"
          @addedWorklog="retrieveWorklogsUponDateChange({ startDate, endDate })"
        />
      </template>
      <template v-slot:weekday-heading="{ view, heading }">
        <v-row justify="center" no-gutters>
          <v-col cols="6">
            <span>{{ heading.label.substring(0, 3) }}</span>
          </v-col>
          <v-col cols="6">
            <span>{{ getWorkedHoursFromDate(heading) }}h / 8h</span>
          </v-col>
          <v-col style="margin-top: 3px" cols="10">
            <v-progress-linear
              :value="(getWorkedHoursFromDate(heading) / 8) * 100"
              color="accent"
            ></v-progress-linear>
          </v-col>
        </v-row>
      </template>
    </vue-cal>
  </v-sheet>
</template>

<script>
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import 'vue-cal/dist/drag-and-drop.js'
import JWorklogAddButton from '@/components/j-worklog-add-button'
import WorklogRetrievalService from '@/service/time-tracker/WorklogRetrievalService'

export default {
  name: 'JCalendar',
  components: { JWorklogAddButton, VueCal },
  data() {
    return {
      hideWeekends: true,
      startDate: null,
      endDate: null,
      events: [],
      worklogValues: [0, 0, 0, 0, 0, 0, 0] // array of total hours of worklogs in each day
    }
  },
  methods: {
    parseSimpleDate(date) {
      return (
        date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
      )
    },
    retrieveWorklogsUponDateChange({ startDate, endDate }) {
      this.startDate = startDate
      this.endDate = endDate

      this.refreshWorklogHours()
      const worklogs = []
      WorklogRetrievalService.retrieveUserOnlyWorklogs(
        this.parseSimpleDate(startDate),
        this.parseSimpleDate(endDate)
      ).then((res) => {
        const JTTWorklogs = res.data
        // console.log(JTTWorklogs)
        for (const JTTWorklog of JTTWorklogs.worklogs) {
          // console.log('IssueKey: ' + JTTWorklog.issueKey)
          worklogs.push({
            title: JTTWorklog.issueSummary,
            start: this.parseSimpleDate(new Date(JTTWorklog.started)),
            end: this.parseSimpleDate(new Date(JTTWorklog.started)),
            explanation: JTTWorklog.worklogExplanation,
            issueKey: JTTWorklog.issueKey,
            timeSpent: JTTWorklog.timeSpent,
            class: 'worklog'
          })
          this.calculateWorklogHours(
            new Date(JTTWorklog.started),
            JTTWorklog.timeSpentSeconds
          )
        }
      })

      this.events = worklogs
    },
    username() {
      return this.$store.getters.getLoggedInUser.username
    },
    formatDate(date) {
      return (
        date.toDateString().substring(4, 10) +
        ', ' +
        date.toDateString().substring(10)
      )
    },
    calculateWorklogHours(date, workedSeconds) {
      this.worklogValues[date.getDay()] += workedSeconds / 3600
    },
    getWorkedHoursFromDate(heading) {
      return this.worklogValues[new Date(heading.date).getDay()]
    },
    refreshWorklogHours() {
      this.worklogValues.fill(0)
    }
  }
}
</script>

<style>
.box {
  display: flex;
  flex-flow: column;
  height: 100%;
}

.box .calendar_header {
  flex: 0 1 auto;
  padding: 7px 10px;
}

.box .calendar {
  flex: 1 1 auto;
}

.calendar_header .toolbar {
  padding: 0px 30px;
}

.vuecal__body {
  overflow-y: scroll;
}

.vuecal__cell-content {
  background-color: rgba(224, 236, 245, 0.35);
}

.vuecal__cell-content:hover .addWorklogButton {
  opacity: 1;
}

.vuecal__event.worklog {
  padding: 4px 8px;
  background-color: white;
  border: 1px solid rgba(116, 169, 210, 0.35);
  box-shadow: rgba(80, 21, 55, 0.08) 0 1px 3px 0;
  border-radius: 2px;
  color: black;
  transition: box-shadow 0.3s ease-in-out 0s;
  width: 95%;
  margin: 5px auto;
  margin-top: 10px;
  max-height: 80px;
  text-overflow: ellipsis;
}

.vuecal__event.worklog:hover {
  border: 1px solid #501537;
  box-shadow: rgba(80, 21, 55, 0.35) 0 1px 6px 0;
}

.vuecal__event-title {
  font-weight: bold;
  font-size: 14px;
  display: flex;
  text-overflow: ellipsis;
  justify-content: left;
}

.vuecal__event-container {
  display: flex;
  flex-direction: column;
}

.vuecal__event-explanation {
  color: #142c3e;
  text-overflow: ellipsis;
  word-break: normal;
  display: flex;
  justify-content: left;
}

.vuecal__event-footer {
  display: flex;
  flex-direction: row;
  align-content: center;
  margin-top: 7px;
}

.vuecal__event-footer .timeSpent {
  margin-left: auto;
}

.vuecal__weekdays-headings {
  border-top: 1px solid rgba(145, 129, 138, 0.32);
  background-color: rgba(224, 236, 245, 0.35);
}

.vuecal__title-bar {
  background-color: white;
}

.issueKey {
  display: flex;
  align-items: center;
  font-size: 12px;
  margin-left: 3px;
}
</style>
