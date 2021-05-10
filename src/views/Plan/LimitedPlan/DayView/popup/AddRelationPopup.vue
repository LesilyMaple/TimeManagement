<template>
  <el-dialog
    title="添加限制"
    v-model="show"
    width="30%"
  >
    <div>
      <el-radio
        v-model="planType"
        :label="0"
      >
        顺序限制
      </el-radio>
      <el-radio
        v-model="planType"
        :label="1"
      >
        时间限制
      </el-radio>
      <el-select
        v-if="planType===0"
        v-model="orderLimitedPlan"
      >
        <el-option
          v-for="item in orderLimitedPlanSet"
          :key="item"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <el-select
        v-else
        v-model="timeLimitedPlan"
      >
        <el-option
          v-for="item in timeLimitedPlanSet"
          :key="item"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <el-radio
        v-model="order"
        :label="0"
      >
        之前
      </el-radio>
      <el-radio
        v-model="order"
        :label="1"
      >
        之后
      </el-radio>
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
import { ref, watch } from 'vue'
import { useStore } from 'vuex'
import { twoWayBinding } from '@/utils'
import { planHandleProxy } from '@/views/Plan/LimitedPlan/DayView/planProxy'
import planDetails from '@/store/planDetails'

export default {
  name: 'AddRelationPopup',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  setup (props, ctx) {
    const show = twoWayBinding(props, ctx)
    const order = ref(0)
    const planType = ref(0)
    const orderLimitedPlanSet = useStore().state.limitedPlanDay.orderLimitedPlanSet
    const timeLimitedPlanSet = useStore().state.limitedPlanDay.timeLimitedPlanSet
    const orderLimitedPlan = ref('')
    const timeLimitedPlan = ref('')
    let basePlan
    watch(orderLimitedPlan, () => {
      basePlan = orderLimitedPlan.value
    })
    watch(timeLimitedPlan, () => {
      basePlan = timeLimitedPlan.value
    })
    const add = () => {
      let from
      let to
      if (order.value === 0) {
        from = basePlan
        to = planDetails.get().id
      } else {
        from = planDetails.get().id
        to = basePlan
      }
      planHandleProxy.addRelation(from, to)
      show.value = false
    }
    return {
      show,
      order,
      planType,
      orderLimitedPlanSet,
      timeLimitedPlanSet,
      orderLimitedPlan,
      timeLimitedPlan,
      add
    }
  }
}
</script>

<style scoped>

</style>
