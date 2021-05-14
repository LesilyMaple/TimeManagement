<template>
  <el-dialog
    title="添加限制"
    v-model="show"
    width="30%"
  >
    <div>
      <div v-if="planDetails.get().id[0]==='o'">
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
            :disabled="item.id===planDetails.get().id"
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
      </div>
      <div v-else-if="planDetails.get().id[0]==='t'">
        <el-select v-model="orderLimitedPlan">
          <el-option
            v-for="item in orderLimitedPlanSet"
            :key="item"
            :label="item.name"
            :value="item.id"
            :disabled="item.id===planDetails.get().id"
          />
        </el-select>
      </div>
      <div>
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
import limitedPlanDrawer from '@/views/Plan/LimitedPlan/DayView/limitedPlanDrawer'
import _ from 'lodash'

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
    const data = useStore().state.dateTimePlan

    const show = twoWayBinding(props, ctx)
    const order = ref(0)
    const planType = ref(0)
    const orderLimitedPlanSet = ref([])
    const timeLimitedPlanSet = ref([])
    const orderLimitedPlan = ref('')
    const timeLimitedPlan = ref('')

    let basePlan

    watch(show, () => {
      if (show.value) {
        orderLimitedPlanSet.value = data.orderLimitedPlanSet
        timeLimitedPlanSet.value = data.timeLimitedPlanSet
      }
    })

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
        from = limitedPlanDrawer.getPlanIdByNodeId(planDetails.get().id)
        to = limitedPlanDrawer.getPlanIdByNodeId(basePlan)
      } else {
        from = limitedPlanDrawer.getPlanIdByNodeId(basePlan)
        to = limitedPlanDrawer.getPlanIdByNodeId(planDetails.get().id)
      }
      switch (validate(from, to)) {
        case 1:
          alert('已存在限制')
          break
        case 2:
          alert('已存在相反的限制')
          break
        case 3:
          alert('冗余')
          break
        case 4:
          alert('循环')
          break
        case 0:
          planHandleProxy.addRelation(from, to)
          show.value = false
      }
    }

    const validate = (from, to) => {
      if (limitedPlanDrawer.hasRelation(from, to)) {
        // 已存在关系
        return 1
      } else if (limitedPlanDrawer.hasRelation(to, from)) {
        // 已存在相反的关系
        return 2
      } else if (!validateRedundancyItem(from, to)) {
        // 冗余
        return 3
      } else if (!validateLoop(from, to)) {
        // 循环
        return 4
      } else {
        // 正常
        return 0
      }
    }

    const validateRedundancyItem = (start, end) => {
      const relation = data.planRelation
      if (start === end) return false

      let flag = true
      const set = relation[start]
      if (set) {
        for (const x of set) {
          flag &= validateRedundancyItem(x, end)
        }
      }
      if (start[0] === 't') {
        const next = getNextTimePlanId(start)
        if (next !== -1) {
          flag &= validateRedundancyItem(next, end)
        }
      }

      return flag
    }

    const validateLoop = (start, end) => {
      const cloneRelation = _.cloneDeep(data.planRelation)
      if (!cloneRelation[start]) {
        cloneRelation[start] = [end]
      } else {
        cloneRelation[start].push(end)
      }

      const validateLoopItem = (current, begin, time) => {
        if (current === begin) {
          if (++time === 2) {
            return false
          }
        }
        let flag = true
        const set = cloneRelation[current]
        if (set) {
          for (const next of set) {
            flag &= validateLoopItem(next, begin, time)
          }
        }
        if (current[0] === 't') {
          const next = getNextTimePlanId(current)
          if (next !== -1) {
            flag &= validateLoopItem(next, begin, time)
          }
        }

        return flag
      }

      return validateLoopItem(start, start, 0)
    }

    const getNextTimePlanId = (id) => {
      const currentPlanNodes = limitedPlanDrawer.layer.find('.' + id)
      const currentPos = Math.max(currentPlanNodes[0].x(), currentPlanNodes[1].x())
      const timeNodes = limitedPlanDrawer.layer.find('Rect')
      let resultNode = {
        name: () => -1,
        x: () => Number.MAX_SAFE_INTEGER
      }
      for (const timeNode of timeNodes) {
        if (timeNode.x() > currentPos && timeNode.x() < resultNode.x()) {
          resultNode = timeNode
        }
      }
      return resultNode.name()
    }

    return {
      show,
      order,
      planType,
      orderLimitedPlanSet,
      timeLimitedPlanSet,
      orderLimitedPlan,
      timeLimitedPlan,
      add,
      planDetails
    }
  }
}
</script>

<style scoped>

</style>
