<template>
  <el-table
    :data="data"
    :default-sort="{prop: 'date', order: 'descending'}"
    :row-class-name="getRowClassName"
    ref="tableElement"
    stripe
  >
    <el-table-column
      type="expand"
    >
      <template #default="props">
        <el-radio-group
          v-model="radioGroup[props.$index]"
          size="mini"
        >
          <el-radio-button label="subTasks">
            子任务
          </el-radio-button>
          <el-radio-button label="track">
            轨迹
          </el-radio-button>
        </el-radio-group>
        <div v-if="radioGroup[props.$index]==='subTasks'">
          {{ props.row.subTasks }}
        </div>
        <div v-if="radioGroup[props.$index]==='track'">
          {{ props.row.track }}
        </div>
      </template>
    </el-table-column>
    <el-table-column
      v-for="item in columnOption"
      :key="item.prop"
      :prop="item.prop"
      :label="item.label"
      :formatter="item.formatter"
      :sortable="true"
    />
  </el-table>
</template>

<script>
import { getTaskTypeFullName } from '@/utils/taskType'
import { reactive, ref } from 'vue'

export default {
  name: 'ChartList',
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  setup (props) {
    const tableElement = ref(null)

    const columnOption = [{
      prop: 'name',
      label: '名称',
      width: 180,
      formatter: null
    }, {
      prop: 'type',
      label: '类型',
      width: 180,
      formatter: (row, column, cellValue, index) => {
        return getTaskTypeFullName(cellValue)
      }
    }, {
      prop: 'time',
      label: '时间',
      width: 180,
      formatter: null
    }]

    const getRowClassName = ({ row }) => {
      if (row.subTasks.length === 0) {
        return 'hide'
      }
      return ''
    }

    const radioGroup = (() => {
      const arr = new Array(props.data.length)
      for (let i = 0; i < arr.length; i++) {
        arr[i] = 'subTasks'
      }
      return reactive(arr)
    })()
    return {
      tableElement,
      columnOption,
      getRowClassName,
      radioGroup
    }
  }
}
</script>

<style scoped>
/deep/ .hide .el-table__expand-column .el-icon {
  visibility: hidden;
}
</style>
