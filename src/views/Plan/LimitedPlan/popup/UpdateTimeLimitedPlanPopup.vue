<template>
  <el-dialog
    title="修改时间限制计划"
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
          @click="modify"
        >确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import Input from '@/components/Input'
import TaskType from '@/components/TaskType'
import SubTasks from '@/components/SubTasks'
import { twoWayBinding } from '@/utils'

export default {
  name: 'UpdateTimeLimitedPlanPopup',
  components: {
    Input,
    TaskType,
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
    const modify = () => {
    }
    return {
      show,
      modify
    }
  }
}
</script>

<style scoped>

</style>
