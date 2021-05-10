<template>
  <div ref="container">
    <div
      ref="scatter"
      style="width: 600px;height:400px;"
    />
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { init } from 'echarts'
import dayjs from 'dayjs'
import TimeManager from '@/utils/time'

export default {
  name: 'Index',
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  setup (props) {
    const clearDate = TimeManager.clearDate

    const chartOption = {
      xAxis: {
        type: 'category'
      },
      yAxis: {
        type: 'time',
        min: clearDate(dayjs()).hour(0).minute(0).second(0).valueOf(),
        max: clearDate(dayjs()).hour(24).minute(0).second(0).valueOf(),
        axisLabel: {
          formatter: '{HH}:{mm}'
        }
      },
      tooltip: {
        formatter: (params) => {
          const startTime = dayjs(params.data[2]).format('HH:mm')
          const endTime = dayjs(params.data[3]).format('HH:mm')
          const time = params.data[4]

          const startTimeDiv = document.createElement('div')
          const endTimeDiv = document.createElement('div')
          const timeDiv = document.createElement('div')

          startTimeDiv.innerText = `开始时间：${startTime}`
          endTimeDiv.innerText = `结束时间：${endTime}`
          timeDiv.innerText = `有效时间：${time}分钟`

          const div = document.createElement('div')
          div.append(startTimeDiv, endTimeDiv, timeDiv)
          return div
        }
      },
      series: [{
        type: 'scatter',
        data: [],
        symbolSize: 15
      }]
    }
    const chartData = props.data.map(item => [
      dayjs(item.startTime).format('YYYY/MM/DD'),
      clearDate(dayjs((item.startTime + item.endTime) / 2)).valueOf(),
      clearDate(dayjs(item.startTime)).valueOf(),
      clearDate(dayjs(item.endTime)).valueOf(),
      item.time
    ])

    const containerElement = ref(null)
    const chartElement = ref(null)
    let chart

    const setChartContainerSize = () => {
      chartElement.value.style.width = `${containerElement.value.offsetWidth}px`
      chartElement.value.style.height = `${containerElement.value.offsetHeight}px`
    }

    const initChart = () => {
      chart = init(chartElement.value)
    }

    const mountChartData = () => {
      chartOption.series[0].data = chartData
    }

    const setSymbolSize = () => {
      const chartWidth = Number(chartElement.value.style.width.slice(0, -2))
      const dateSet = new Set()
      props.data.forEach(item => {
        dateSet.add(new Date(item.startTime).toDateString())
      })
      const calculatedSize = chartWidth / (dateSet.size * 1.5)
      const defaultSize = chartOption.series[0].symbolSize
      chartOption.series[0].symbolSize = calculatedSize > defaultSize ? defaultSize : calculatedSize
    }

    const draw = () => {
      chart.setOption(chartOption, true)
    }

    const renderChart = () => {
      setChartContainerSize()
      initChart()
      mountChartData()
      setSymbolSize()
      draw()
    }

    onMounted(() => {
      renderChart()
    })

    return {
      container: containerElement,
      scatter: chartElement
    }
  }
}
</script>

<style scoped>

</style>
