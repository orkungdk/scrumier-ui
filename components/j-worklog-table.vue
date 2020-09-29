<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :single-expand="singleExpand"
    :expanded.sync="expanded"
    item-key="name"
    class="elevation-1"
    show-expand
    @item-expanded="processRawData"
  >
    <template v-slot:expanded-item="{ headers, item }">
      <td style="margin-top: 20px" :colspan="headers.length">
        <j-stacked-bar :author-key="item.authorKey" :chart-data="dataset" />
      </td>
    </template>
  </v-data-table>
</template>

<script>
import JStackedBar from '@/components/j-stacked-bar'

export default {
  name: 'JWorklogTable',
  components: { JStackedBar },
  props: {
    data: {
      type: Promise,
      default: () => {}
    },
    startDate: {
      type: String,
      default: ''
    },
    endDate: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      headers: [
        {
          text: 'User',
          align: 'start',
          sortable: false,
          value: 'name'
        },
        { text: 'Required', value: 'required' },
        { text: 'R%', value: 'requiredPercent' },
        { text: 'Logged', value: 'logged' }
      ],
      singleExpand: true,
      expanded: [],
      items: [],
      dataset: {
        labels: [],
        datasets: []
      },
      colors: ['#26547C', '#F06543', '#D9D375', '#53917E', '#C96480', '#CEFF1A']
    }
  },
  watch: {
    data() {
      this.dataset = { labels: [], datasets: [] }
      this.refreshItems()
      this.addDatasetLabels()
    }
  },
  methods: {
    addDatasetLabels() {
      const indexDate = new Date(this.startDate)
      const endDate = new Date(this.endDate)
      // eslint-disable-next-line no-unmodified-loop-condition
      while (indexDate <= endDate) {
        this.dataset.labels.push(
          indexDate.toDateString().substring(0, 3) +
            ', ' +
            indexDate.getDate() +
            '.' +
            (indexDate.getMonth() + 1)
        )
        indexDate.setDate(indexDate.getDate() + 1)
      }
    },
    refreshItems() {
      const weekDayCount = this.calculateWeekDays(
        new Date(this.startDate),
        new Date(this.endDate)
      )
      const items = []
      this.data.then((data) => {
        for (const authorKey in data) {
          const item = {
            authorKey,
            name: data[authorKey][0].author.displayName,
            required: weekDayCount * 8,
            logged: this.calculateLoggedHours(data[authorKey])
          }
          item.requiredPercent =
            Math.floor((item.logged / item.required) * 100) + '%'
          items.push(item)
        }
        this.items = items
      })
    },
    calculateLoggedHours(reportData) {
      let totalWorklog = 0
      for (const worklog of reportData) {
        totalWorklog += worklog.timeSpentSeconds
      }
      return totalWorklog / 3600
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
    },
    processRawData({ item }) {
      const authorKey = item.authorKey
      this.dataset.datasets = []
      this.data.then((data) => {
        const rawDataMap = data[authorKey].reduce((dataMap, worklog) => {
          const started = new Date(worklog.started)
          const date = started.getDate() + '.' + (started.getMonth() + 1)
          if (!(worklog.issueKey in dataMap)) {
            dataMap[worklog.issueKey] = {}
          }
          if (date in dataMap[worklog.issueKey]) {
            dataMap[worklog.issueKey][date] += worklog.timeSpentSeconds / 3600
          } else {
            dataMap[worklog.issueKey][date] = worklog.timeSpentSeconds / 3600
          }
          return dataMap
        }, {})
        this.createChartData(rawDataMap)
      })
    },
    createChartData(rawDataMap) {
      let i = 0
      for (const issueKey in rawDataMap) {
        this.dataset.datasets.push({
          label: issueKey,
          backgroundColor: this.colors[i++],
          data: this.getDataAsArray(rawDataMap[issueKey])
        })
      }
    },
    getDataAsArray(rawDataAsObject) {
      const indexDate = new Date(this.startDate)
      const endDate = new Date(this.endDate)
      const dataArray = []
      // eslint-disable-next-line no-unmodified-loop-condition
      for (let i = 0; indexDate <= endDate; i++) {
        const date = indexDate.getDate() + '.' + (indexDate.getMonth() + 1)
        dataArray.push(0)
        if (date in rawDataAsObject) dataArray[i] = rawDataAsObject[date]
        indexDate.setDate(indexDate.getDate() + 1)
      }
      return dataArray
    }
  }
}
</script>

<style scoped></style>
