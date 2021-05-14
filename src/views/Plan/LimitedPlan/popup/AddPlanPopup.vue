<template>
  <el-dialog
    title="添加计划"
    v-model="show"
    width="30%"
  >
    <div id="panel">
      <div>
        <span>开始时间</span>
        <el-date-picker v-model="startDate" />
      </div>
      <div>
        <span>结束时间</span>
        <el-date-picker v-model="endDate" />
      </div>
      <div>
        <span>name</span>
        <Input v-model="name" />
      </div>
      <div>
        <span>task type</span>
        <TaskType v-model="taskType" />
      </div>
      <div>
        <span>expected time</span>
        <Input v-model="expectedTime" />
      </div>
      <div>
        <span>sub tasks</span>
        <SubTasks :data="subTasks" />
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="show = false">取 消</el-button>
        <el-button
          type="primary"
          @click="add"
        >确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { twoWayBinding } from '@/utils'
import { ref, watch } from 'vue'
import Input from '@/components/Input'
import TaskType from '@/components/TaskType'
import SubTasks from '@/components/SubTasks'
import { planHandleProxy } from '@/views/Plan/LimitedPlan/WeekView/planProxy'

export default {
  name: 'AddPlanPopup',
  components: {
    Input,
    TaskType,
    SubTasks
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    date: {
      type: Object,
      required: true
    }
  },
  emits: ['update:modelValue'],
  setup (props, ctx) {
    const show = twoWayBinding(props, ctx)

    const startDate = ref(props.date)
    const endDate = ref(props.date)
    watch(() => props.date, () => {
      startDate.value = props.date
      endDate.value = props.date
    })

    const name = ref('')
    const expectedTime = ref(null)
    const taskType = ref([])
    const subTasks = ref([])

    const addOneDay = (date) => {
      const day = date.getDate() + 1
      date.setDate(day)
      date.setHours(11)
      return date
    }

    const add = () => {
      const plan = {
        name: name.value,
        taskType: taskType.value,
        expectedTime: expectedTime.value,
        subTasks: subTasks.value,
        startDate: startDate.value,
        endDate: addOneDay(endDate.value)
      }
      planHandleProxy.addPlan(plan)
      show.value = false
    }

    return {
      show,
      add,
      startDate,
      endDate,
      name,
      taskType,
      subTasks,
      expectedTime
    }
  }
}
</script>

<style scoped>

</style>
