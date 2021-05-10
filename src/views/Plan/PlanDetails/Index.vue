<template>
  <div v-if="type===-1">
    无
  </div>
  <!-- 时间限制计划 -->
  <div
    v-else-if="type===0"
    class="plan-details"
  >
    <h3>计划详情</h3>
    <div>{{ planDetails.get().id }}</div>
    <div>{{ planDetails.get().name }}</div>
    <div>
      <span>开始时间</span>
      <span>{{ showTime(planDetails.get().startTime[0]) }}</span>
      <span>-</span>
      <span>{{ showTime(planDetails.get().startTime[1]) }}</span>
    </div>
    <div>
      <span>结束时间</span>
      <span>{{ showTime(planDetails.get().endTime[0]) }}</span>
      <span>-</span>
      <span>{{ showTime(planDetails.get().endTime[1]) }}</span>
    </div>
    <div>
      时间限制
    </div>
    <el-button-group>
      <el-button
        @click="showAddOrderLimitedPlanPopup=true"
        size="mini"
      >
        添加计划
      </el-button>
      <el-button
        @click="showAddRelationPopup=true"
        size="mini"
      >
        添加限制
      </el-button>
      <el-button
        @click="showRemovePlanPopup=true"
        size="mini"
      >
        删除计划
      </el-button>
      <el-button
        @click="showUpdateTimeLimitedPlanPopup=true"
        size="mini"
      >
        修改计划
      </el-button>
    </el-button-group>
  </div>
  <!-- 顺序限制计划 -->
  <div
    v-else-if="type===1"
    class="plan-details"
  >
    <h3>计划详情</h3>
    <div>
      {{ planDetails.get().id }}
    </div>
    <div>
      {{ planDetails.get().name }}
    </div>
    <div>
      顺序限制
    </div>
    <el-button-group>
      <el-button
        @click="showAddOrderLimitedPlanPopup=true"
        size="mini"
      >
        添加计划
      </el-button>
      <el-button
        @click="showAddRelationPopup=true"
        size="mini"
      >
        添加限制
      </el-button>
      <el-button
        @click="showRemovePlanPopup=true"
        size="mini"
      >
        删除计划
      </el-button>
      <el-button
        @click="showUpdateOrderLimitedPlanPopup=true"
        size="mini"
      >
        修改计划
      </el-button>
    </el-button-group>
  </div>
  <!-- 关系 -->
  <div
    v-else
    class="plan-details"
  >
    <div>{{ planDetails.get().fromId }}</div>
    <div>{{ planDetails.get().toId }}</div>
    <el-button-group>
      <el-button
        @click="showRemoveRelationPopup=true"
        size="mini"
      >
        删除限制
      </el-button>
      <el-button
        @click="showUpdateRelationPopup=true"
        size="mini"
      >
        修改限制
      </el-button>
    </el-button-group>
  </div>
  <AddOrderLimitedPlanPopup v-model="showAddOrderLimitedPlanPopup" />
  <AddTimeLimitedPlanPopup v-model="showAddTimeLimitedPlanPopup" />
  <AddRelationPopup v-model="showAddRelationPopup" />
  <RemovePlanPopup v-model="showRemovePlanPopup" />
  <RemoveRelationPopup v-model="showRemoveRelationPopup" />
  <UpdateOrderLimitedPlanPopup v-model="showUpdateOrderLimitedPlanPopup" />
  <UpdateRelationPopup v-model="showUpdateRelationPopup" />
  <UpdateTimeLimitedPlanPopup v-model="showUpdateTimeLimitedPlanPopup" />
</template>

<script>
import { ref } from 'vue'
import planDetails from '@/store/planDetails'
import AddOrderLimitedPlanPopup from '../LimitedPlan/DayView/popup/AddOrderLimitedPlanPopup'
import AddTimeLimitedPlanPopup from '@/views/Plan/LimitedPlan/DayView/popup/AddTimeLimitedPlanPopup'
import AddRelationPopup from '../LimitedPlan/DayView/popup/AddRelationPopup'
import RemovePlanPopup from '../LimitedPlan/DayView/popup/RemovePlanPopup'
import RemoveRelationPopup from '../LimitedPlan/DayView/popup/RemoveRelationPopup'
import UpdateOrderLimitedPlanPopup from '../LimitedPlan/DayView/popup/UpdateOrderLimitedPlanPopup'
import UpdateTimeLimitedPlanPopup from '@/views/Plan/LimitedPlan/DayView/popup/UpdateTimeLimitedPlanPopup'
import UpdateRelationPopup from '@/views/Plan/LimitedPlan/DayView/popup/UpdateRelationPopup'
import TimeManager from '@/utils/time'

export default {
  name: 'PlanDetails',
  components: {
    AddOrderLimitedPlanPopup,
    AddTimeLimitedPlanPopup,
    AddRelationPopup,
    RemovePlanPopup,
    RemoveRelationPopup,
    UpdateOrderLimitedPlanPopup,
    UpdateRelationPopup,
    UpdateTimeLimitedPlanPopup
  },
  setup () {
    const showAddOrderLimitedPlanPopup = ref(false)
    const showAddTimeLimitedPlanPopup = ref(false)
    const showAddRelationPopup = ref(false)
    const showRemovePlanPopup = ref(false)
    const showRemoveRelationPopup = ref(false)
    const showUpdateOrderLimitedPlanPopup = ref(false)
    const showUpdateRelationPopup = ref(false)
    const showUpdateTimeLimitedPlanPopup = ref(false)

    const type = ref(-1)
    const updateType = (id) => {
      const i = id[0]
      switch (i) {
        case 't': // 时间限制计划
          type.value = 0
          return
        case 'o': // 顺序限制计划
          type.value = 1
          return
        case 'r': // 关系
          type.value = 2
          return
        default: // 默认值
          type.value = -1
      }
    }
    planDetails.onChange = id => {
      updateType(id)
    }

    const showTime = (time) => {
      if (time) {
        return TimeManager.timestamp2time(time)
      } else {
        return '无'
      }
    }

    return {
      type,
      planDetails,
      showAddOrderLimitedPlanPopup,
      showAddTimeLimitedPlanPopup,
      showAddRelationPopup,
      showRemovePlanPopup,
      showRemoveRelationPopup,
      showUpdateOrderLimitedPlanPopup,
      showUpdateRelationPopup,
      showUpdateTimeLimitedPlanPopup,
      showTime
    }
  }
}
</script>

<style lang="less" scoped>
.plan-details{
  display: flex;
  flex-direction: column;

  .el-button-group{
    margin-top: auto;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
