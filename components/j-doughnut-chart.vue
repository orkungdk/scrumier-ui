<script>
import { Doughnut } from 'vue-chartjs'

export default {
  name: 'JDoughnutChart',
  extends: Doughnut,
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: 'Time Spent On Issues'
        }
      }
    }
  },
  computed: {
    chartData() {
      return {
        labels: this.data.issueLabels,
        datasets: [
          {
            label: 'Time Spent By Seconds On This Sprint',
            backgroundColor: [
              '#3e95cd',
              '#8e5ea2',
              '#3cba9f',
              '#e8c3b9',
              '#c45850'
            ],
            data: this.data.totalTimeSpentByIssue
          }
        ]
      }
    }
  },
  mounted() {
    this.renderChart(this.chartData, this.options)
  }
}
</script>

<style scoped></style>
