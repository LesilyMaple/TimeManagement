<template>
  <el-dialog
    title="删除计划"
    v-model="show"
    width="30%"
  >
    <div>
      确定要删除该计划么？
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="show = false">取 消</el-button>
        <el-button
          type="primary"
          @click="remove"
        >确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { twoWayBinding } from '@/utils'
import { planHandleProxy as dayProxy } from '../DayView/planProxy'
import { planHandleProxy as weekProxy } from '@/views/Plan/LimitedPlan/WeekView/planProxy'
import planDetails from '@/store/planDetails'
import limitedPlanDrawer from '@/views/Plan/LimitedPlan/DayView/limitedPlanDrawer'

export default {
  name: 'RemovePlanPopup',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  setup (props, ctx) {
    const show = twoWayBinding(props, ctx)
    const remove = () => {
      let planId = planDetails.get().id
      switch (planId[0]) {
        case 't':
        case 'o':
          planId = limitedPlanDrawer.getPlanIdByNodeId(planId)
          dayProxy.removePlan(planId)
          break
        case 'w':
          weekProxy.removePlan(planId)
          break
      }
      show.value = false
    }
    return {
      show,
      remove
    }
  }
}
</script>

<style scoped>

</style>
