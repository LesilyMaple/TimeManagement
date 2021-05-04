<template>
  <main id="statistics">
    <el-radio-group v-model="currentChartType">
      <el-radio-button
        v-for="item in chartTypes"
        :key="item.value"
        :label="item.value"
      >
        {{ item.label }}
      </el-radio-button>
    </el-radio-group>
    <Chart :chart-type="currentChartType" />
    <Filter />
    <FilterTemplate />
  </main>
</template>

<script>
import Chart from './Chart/Index'
import Filter from './Filter/Index'
import FilterTemplate from './FilterTemplate/Index'
import { ref } from 'vue'

export default {
  name: 'Statistics',
  components: {
    Chart,
    Filter,
    FilterTemplate
  },
  setup () {
    const chartTypes = [{
      value: 'list',
      label: '列表'
    }, {
      value: 'pie',
      label: '扇形图'
    }, {
      value: 'scatter',
      label: '散点图'
    }]
    const currentChartType = ref('scatter')

    return {
      chartTypes,
      currentChartType
    }
  }
}
</script>

<style lang="less" scoped>
@s:e('/');

#statistics{
  height: 100%;
  width: 100%;
  display: grid;
  grid-template: 5% 45% 50% @s 60% 40%;

  >:nth-child(1){
    grid-area: 1 @s 1 @s 2 @s 2;
  }
  >:nth-child(2){
    grid-area: 2 @s 1 @s 3 @s 2;
  }
  >:nth-child(3){
    grid-area: 1 @s 2 @s 3 @s 3;
  }
  >:nth-child(4){
    grid-area: 3 @s 2 @s 4 @s 3;
  }
}
</style>
