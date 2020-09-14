<template>
  <div class="box">
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
              <h2>{{ $store.getters.getLoggedInUser.username }}</h2>
            </div>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <v-sheet class="calendar" min-width="100%" height="568.4px">
      <vue-cal
        ref="calendar"
        :disable-views="['years', 'year', 'month']"
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
      </vue-cal>
    </v-sheet>
  </div>
</template>

<script>
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import 'vue-cal/dist/drag-and-drop.js'
import WorklogRetrievalService from '@/service/time-tracker/WorklogRetrievalService'

export default {
  name: 'AdminView',
  components: { VueCal },
  data() {
    return {
      hideWeekends: true,
      events: [],
      test: 'test'
    }
  },
  methods: {
    retrieveWorklogsUponDateChange({ view, startDate, endDate }) {
      // eslint-disable-next-line no-unused-vars
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

      function parseSimpleDate(date) {
        return (
          date.getFullYear() +
          '-' +
          (date.getMonth() + 1) +
          '-' +
          date.getDate()
        )
      }

      function parseSimpleDateFromString(date) {
        return date.split('T')[0]
      }

      const worklogs = []

      WorklogRetrievalService.retrieveWorklogs(
        parseSimpleDate(startDate),
        parseSimpleDate(endDate)
      ).then((res) => {
        const JTTWorklogs = res.data
        // console.log(JTTWorklogs)
        for (const JTTWorklog of JTTWorklogs.worklogs) {
          // console.log('IssueKey: ' + JTTWorklog.issueKey)
          worklogs.push({
            title: JTTWorklog.issueSummary,
            start: parseSimpleDateFromString(JTTWorklog.started),
            end: parseSimpleDateFromString(JTTWorklog.started),
            explanation: JTTWorklog.worklogExplanation,
            issueKey: JTTWorklog.issueKey,
            timeSpent: JTTWorklog.timeSpent,
            class: 'worklog'
          })
        }
      })

      this.events = worklogs
    },
    username() {
      return this.$store.getters.getLoggedInUser.username
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
}

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

@media all {
  .container {
    max-width: 100%;
    padding: 12px 0px;
  }
}

.calendar_header .toolbar {
  padding: 0px 30px;
}

.vuecal__body {
  overflow-y: scroll;
}

.vuecal__event.worklog {
  padding: 4px 8px;
  background-color: white;
  border: 1px solid rgb(188, 216, 224);
  box-shadow: rgba(0, 0, 0, 0.08) 0 1px 3px 0;
  border-radius: 2px;
  color: black;
  transition: box-shadow 0.3s ease-in-out 0s;
  width: 95%;
  margin: 5px auto;
  max-height: 80px;
  text-overflow: ellipsis;
}

.vuecal__event.worklog:hover {
  border: 1px solid rgb(0, 73, 118);
  box-shadow: rgba(18, 72, 90, 0.35) 0 1px 6px 0;
}

.vuecal__event-title {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, 'Fira Sans', 'Helvetica Neue', sans-serif, 'Apple Color Emoji',
    'Segoe UI Emoji', 'Segoe UI Symbol';
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
  color: rgb(75, 118, 130);
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

.issueKey {
  display: flex;
  align-items: center;
  font-size: 12px;
  margin-left: 3px;
}

.wrapper-navbar {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
}
</style>
