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
import { planHandleProxy } from '../planProxy'
import planDetails from '@/store/planDetails'

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
      const plan = planDetails.get()
      planHandleProxy.removePlan(plan.id)
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
