<template>
  <main>
    <div>
      plan details <br>
      {{ planDetails.get().id }} <br>
      {{ planDetails.get().name }}
    </div>
    <el-button
      size="mini"
      @click="showAddPlanPopup=true"
    >
      添加计划
    </el-button>
    <el-button size="mini">
      添加限制
    </el-button>
    <el-button size="mini">
      删除计划
    </el-button>
    <el-button size="mini">
      删除限制
    </el-button>
    <el-button size="mini">
      修改计划
    </el-button>
    <el-button size="mini">
      修改限制
    </el-button>
    <el-dialog
      title="添加"
      v-model="showAddPlanPopup"
      width="30%"
    >
      <div>
        <div>
          在此计划
        </div>
        <el-radio
          v-model="addOrder"
          :label="0"
        >
          之前
        </el-radio>
        <el-radio
          v-model="addOrder"
          :label="1"
        >
          之后
        </el-radio>
        <el-input
          size="mini"
          v-model="name"
        />
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showAddPlanPopup = false">取 消</el-button>
          <el-button
            type="primary"
            @click="addOrderLimitedPlan"
          >确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </main>
</template>

<script>
import planDetails from '@/store/planDetails'
import { ref } from 'vue'
import { planHandleProxy as dayPlanProxy } from '@/views/Plan/LimitedPlan/DayView/planProxy'
import { useStore } from 'vuex'

export default {
  name: 'PlanDetails',
  setup () {
    const store = useStore()
    store.dispatch('limitedPlanDay/init')

    const showAddPlanPopup = ref(false)
    const addOrder = ref(0)

    const name = ref('')
    const addOrderLimitedPlan = () => {
      showAddPlanPopup.value = false
      if (name.value !== '') {
        dayPlanProxy.addOrderLimitedPlan({
          name: name.value,
          order: addOrder.value
        }, planDetails.get().id)
      }
    }

    const addRelation = () => {

    }

    return {
      planDetails,
      showAddPlanPopup,
      addOrder,
      name,
      addOrderLimitedPlan,
      addRelation
    }
  }
}
</script>

<style scoped>

</style>
