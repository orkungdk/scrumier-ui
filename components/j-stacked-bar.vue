<script>
import { Bar } from 'vue-chartjs'

const horizonalLinePlugin = {
  id: 'horizontalLine',
  afterDraw(chartInstance) {
    let yValue
    const yScale = chartInstance.scales['y-axis-0']
    const canvas = chartInstance.chart
    const ctx = canvas.ctx
    let index
    let line
    let style

    if (chartInstance.options.horizontalLine) {
      for (
        index = 0;
        index < chartInstance.options.horizontalLine.length;
        index++
      ) {
        line = chartInstance.options.horizontalLine[index]

        if (!line.style) {
          style = '#080808'
        } else {
          style = line.style
        }

        if (line.y) {
          yValue = yScale.getPixelForValue(line.y)
        } else {
          yValue = 0
        }
        ctx.lineWidth = 3

        if (yValue) {
          window.chart = chartInstance
          ctx.beginPath()
          ctx.moveTo(0, yValue)
          ctx.lineTo(canvas.width, yValue)
          ctx.strokeStyle = style
          ctx.stroke()
        }

        if (line.text) {
          ctx.fillStyle = style
          ctx.fillText(line.text, 0, yValue + ctx.lineWidth)
        }
      }
    }
  }
}

export default {
  name: 'JStackedBar',
  extends: Bar,
  props: {
    dataset: {
      type: Object,
      default: () => {}
    },
    key: {
      type: String,
      default: ''
    }
  },
  beforeMount() {
    this.addPlugin(horizonalLinePlugin)
  },
  mounted() {
    this.$emit('onChartRender', { itemKey: this.key })
    this.renderChart(this.dataset, {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [
          {
            stacked: true,
            categoryPercentage: 0.5,
            barPercentage: 1
          }
        ],
        yAxes: [
          {
            stacked: true
          }
        ]
      }
    })
  }
}
</script>

<style scoped></style>
