<template>
  <div id="chart-list">
    <el-table
      :data="data"
      style="width: 100%"
      :default-sort="{prop: 'date', order: 'descending'}"
    >
      <el-table-column
        prop="name"
        label="名称"
        sortable
        width="180"
      />
      <el-table-column
        prop="type"
        label="类型"
        sortable
        width="180"
        :formatter="format"
      />
      <el-table-column
        prop="time"
        label="时间"
        sortable
      />
    </el-table>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { getTaskTypeFullName } from '@/utils/taskType'

export default {
  name: 'ChartList',
  setup () {
    const store = useStore()
    const data = store.state.statistics.data
    const format = (row, column, cellValue, index) => {
      return getTaskTypeFullName(cellValue)
    }
    return {
      data,
      format
    }
  }
}
</script>

<style scoped>
#chart-list{
}
</style>
