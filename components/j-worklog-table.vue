<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :single-expand="singleExpand"
    :expanded.sync="expanded"
    item-key="name"
    class="elevation-1"
    show-expand
  >
    <template v-slot:expanded-item="{ headers }">
      <td style="margin-top: 20px" :colspan="headers.length">
        <j-stacked-bar :dataset="dataset" />
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
      type: Object,
      default: () => {}
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
      dataset: {
        labels: {},
        datasets: {}
      }
    }
  },
  methods: {
    refreshItems({ startDate, endDate }) {
      const items = []
      this.refreshWorklogData({ startDate, endDate }).then((data) => {
        for (const authorKey in data) {
          const item = {
            authorKey,
            name: data[authorKey][0].author.displayName,
            required:
              this.calculateWeekDays(new Date(startDate), new Date(endDate)) *
              8,
            logged: this.calculateLoggedHours(data[authorKey])
          }
          item.requiredPercent =
            Math.floor((item.logged / item.required) * 100) + '%'
          items.push(item)
        }
        this.items = items
      })
    }
  }
}
</script>

<style scoped></style>
