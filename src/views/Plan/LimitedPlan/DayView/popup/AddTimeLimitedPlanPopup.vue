<template>
  <el-dialog
    title="添加时间限制计划"
    v-model="show"
    width="30%"
  >
    <div id="panel">
      <div>
        <span>开始时间</span>
        <el-time-picker
          v-model="startTime[0]"
          @change="onStartTimeChange"
          format="HH:mm"
          placeholder="无"
        />
        <el-time-picker
          v-model="startTime[1]"
          @change="onStartTimeChange"
          format="HH:mm"
          placeholder="无"
        />
        <span>{{ showTimeOrder(startTimeOrder, '开始') }}</span>
      </div>
      <div>
        <span>结束时间</span>
        <el-time-picker
          v-model="endTime[0]"
          @change="onEndTimeChange"
          format="HH:mm"
          placeholder="无"
        />
        <el-time-picker
          v-model="endTime[1]"
          @change="onEndTimeChange"
          format="HH:mm"
          placeholder="无"
        />
        <span>{{ showTimeOrder(endTimeOrder, '完成') }}</span>
      </div>
      <div>
        <span>持续时间</span>
        <Input
          v-model="time"
          validate="number"
          class="input-expected-time"
        />
        <span>分钟</span>
      </div>
      <div>
        <span>计划类型</span>
        <TaskType v-model="taskType" />
      </div>
      <div>
        <span>名称</span>
        <Input v-model="name" />
      </div>
      <div>
        <span>子任务</span>
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
import { reactive, ref } from 'vue'
import { twoWayBinding } from '@/utils'
import { planHandleProxy } from '../planProxy'
import TaskType from '@/components/TaskType'
import Input from '@/components/Input'
import SubTasks from '@/components/SubTasks'

export default {
  name: 'AddTimeLimitedPlanPopup',
  components: {
    TaskType,
    Input,
    SubTasks
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  setup (props, ctx) {
    const show = twoWayBinding(props, ctx)

    const startTime = ref([null, null])
    const endTime = ref([null, null])
    const startTimeOrder = ref(0)
    const endTimeOrder = ref(0)
    const time = ref(0)
    const name = ref('')
    const taskType = reactive([])
    const subTasks = reactive([])

    const onStartTimeChange = () => {
      setTimeOrder(startTime, startTimeOrder)
    }

    const onEndTimeChange = () => {
      setTimeOrder(endTime, endTimeOrder)
    }

    const setTimeOrder = (time, timeOrder) => {
      if (time.value[0] !== null) {
        if (time.value[1] !== null) {
          timeOrder.value = 3
        } else {
          timeOrder.value = 2
        }
      } else {
        if (time.value[1] !== null) {
          timeOrder.value = 1
        } else {
          timeOrder.value = 0
        }
      }
    }

    const showTimeOrder = (order, postfix) => {
      switch (order) {
        case 1:
          return '之前' + postfix
        case 2:
          return '之后' + postfix
        case 3:
          return '之间' + postfix
        default:
          return ''
      }
    }

    const add = () => {
      planHandleProxy.addTimeLimitedPlan({
        name: name.value,
        taskType,
        startTime: startTime.value,
        endTime: endTime.value,
        time: time.value
      })
      show.value = false
    }
    return {
      show,
      startTime,
      endTime,
      startTimeOrder,
      endTimeOrder,
      showTimeOrder,
      onStartTimeChange,
      onEndTimeChange,
      time,
      name,
      taskType,
      subTasks,
      add
    }
  }
}
</script>

<style lang="less" scoped>
#panel{
  >div{
    display: flex;
    flex-direction: row;
    align-items: center;

    span{
      width: 5em;
    }
  }

  >div:nth-last-of-type(1){
    align-items: normal;
  }
}

/deep/ .el-date-editor.el-input{
  width: 8em;
}

.input-expected-time{
  width: 3em;
  text-align: center;
}
</style>
