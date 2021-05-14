<template>
  <el-dialog
    title="修改顺序限制计划"
    v-model="show"
    width="30%"
  >
    <div>
      <div>
        <span>名称</span>
        <Input v-model="data.name" />
      </div>
      <div>
        <span>任务类型</span>
        <TaskType v-model="data.taskType" />
      </div>
      <div>
        <span>子任务</span>
        <SubTasks :data="data.subTasks" />
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="show = false">取 消</el-button>
        <el-button
          type="primary"
          @click="update"
        >确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { twoWayBinding } from '@/utils'
import TaskType from '@/components/TaskType'
import SubTasks from '@/components/SubTasks'
import Input from '@/components/Input'
import planDetails from '@/store/planDetails'
import { watch, ref } from 'vue'
import { planHandleProxy } from '@/views/Plan/LimitedPlan/DayView/planProxy'
export default {
  name: 'UpdateOrderLimitedPlanPopup',
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
    const data = ref({})

    watch(show, () => {
      data.value = planDetails.get()
    })
    const update = () => {
      planHandleProxy.updateOrderLimitedPlan(data.value)
      show.value = false
    }
    return {
      data,
      show,
      update
    }
  }
}
</script>

<style scoped>

</style>
