<template>
  <div
    id="chart-pie"
    ref="containerElement"
  >
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>
        <a
          href="javascript:void(0)"
          @click="gotoRoot()"
        >
          root
        </a>
      </el-breadcrumb-item>
      <el-breadcrumb-item
        v-for="(item, index) in breadcrumb"
        :key="index"
      >
        <a
          href="javascript:void(0)"
          @click="goBack(index)"
        >
          {{ item.name }}
        </a>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <el-select
      v-model="axisType"
      size="mini"
    >
      <el-option
        v-for="item in axisTypeOption"
        :key="item"
        :value="item.value"
        :label="item.label"
      />
    </el-select>
    <div
      ref="chartElement"
      style="width: 600px;height:400px;"
    />
  </div>
</template>

<script>
import { init } from 'echarts'
import { onMounted, reactive, ref, watch } from 'vue'
import { getTaskTypeName } from '@/utils/taskType'

export default {
  name: 'ChartPie',
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  setup (props) {
    const chartOption = {
      title: {
        text: '任务统计',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: '',
          type: 'pie',
          radius: '50%',
          data: [],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }

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

    let selectedData
    const mountClickEvent = () => {
      chart.on('click', params => {
        if (selectedData === params.data) {
          if (hasType(params.data)) { // 如果选中的是类型，展开该类型
            enterNext(params.data.type)
          }
        } else {
          selectedData = params.data // 更新选中任务
        }
      })
    }

    const mountChartData = () => {
      chartOption.series[0].data = chartData
    }

    const chartData = []
    const currentTasks = []
    const currentTypes = new Map()

    const breadcrumb = reactive([])

    // 1. 设置currentTasks、currentTypes
    // 2. 根据breadcrumb返回数据
    const updateChartData = () => {
      // 重置chartData和当前任务和类型
      chartData.splice(0)
      currentTasks.splice(0)
      currentTypes.clear()

      // 遍历data寻找符合当前面包屑的数据
      // 把具体任务写入currentTasks中和chartData中
      // 把任务类型写入currentTypes中
      for (const item of props.data) {
        if (!isEqualType(item.type)) continue
        const type = item.type[breadcrumb.length]
        // 具体任务
        if (type === undefined) {
          currentTasks.push(item)
          // 不设置type属性，代指具体任务
          chartData.push({
            name: item.name,
            value: getTaskValueByAxisType(item)
          })
          continue
        }
        // 任务类型
        if (currentTypes.has(type)) {
          currentTypes.get(type).push(item)
        } else {
          currentTypes.set(type, [item])
        }
      }

      // 解析任务类型的数据并写入chartData中
      for (const type of currentTypes) {
        chartData.push({
          type: type[0],
          name: getTaskTypeName(type[0]),
          value: getTypeValueByAxisType(type[1])
        })
      }
    }

    const draw = () => {
      chart.setOption(chartOption, true)
    }

    const renderChart = () => {
      setChartContainerSize()
      initChart()
      mountClickEvent()
      mountChartData()
      updateChartData()
      draw()
    }

    const hasType = (data) => data.type !== undefined

    const isEqualType = (type) => {
      for (let i = 0; i < breadcrumb.length; i++) {
        if (breadcrumb[i].type !== type[i]) {
          return false
        }
      }
      return true
    }

    const axisType = ref(0)
    watch(axisType, () => {
      updateChartData()
      draw()
    })
    const axisTypeOption = [{
      value: 0,
      label: '时长'
    }, {
      value: 1,
      label: '任务数量'
    }]

    const getTaskValueByAxisType = (task) => {
      switch (axisType.value) {
        case 0:
          return task.time
        case 1:
          return 1
      }
    }

    const getTypeValueByAxisType = (type) => {
      switch (axisType.value) {
        case 0:
          return type.reduce((time, item) => (time += item.time), 0)
        case 1:
          return type.length
      }
    }

    const enterNext = (type) => {
      breadcrumb.push({
        type,
        name: getTaskTypeName(type)
      })
      updateChartData()
      draw()
    }

    const goBack = (index) => {
      breadcrumb.splice(index + 1)
      updateChartData()
      draw()
    }

    const gotoRoot = () => {
      breadcrumb.splice(0)
      updateChartData()
      draw()
    }

    onMounted(() => {
      renderChart()
    })

    return {
      chartElement,
      containerElement,
      breadcrumb,
      axisType,
      axisTypeOption,
      gotoRoot,
      goBack
    }
  }
}
</script>

<style scoped>

</style>
