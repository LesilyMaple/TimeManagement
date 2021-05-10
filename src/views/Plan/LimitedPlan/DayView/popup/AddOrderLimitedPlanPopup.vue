<template>
  <el-dialog
    title="添加计划"
    v-model="show"
    width="30%"
  >
    <div id="panel">
      <div>
        <span>
          在此计划
        </span>
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
      <div>
        <span>名称</span>
        <Input v-model="name" />
      </div>
      <div>
        <span>任务类型</span>
        <TaskType v-model="taskType" />
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
import { planHandleProxy } from '@/views/Plan/LimitedPlan/DayView/planProxy'
import Input from '@/components/Input'
import TaskType from '@/components/TaskType'
import SubTasks from '@/components/SubTasks'
export default {
  name: 'AddOrderLimitedPlanPopup',
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
    const order = ref(0)
    const name = ref('')
    const taskType = reactive([])
    const subTasks = reactive([])

    const add = () => {
      if (name.value !== '') {
        console.log(name.value)
        planHandleProxy.addOrderLimitedPlan({
          name: name.value,
          order: order.value,
          taskType,
          subTasks
        })
        show.value = false
      } else {
        alert('请输入计划名称')
      }
    }

    return {
      show,
      order,
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
    align-items: center;

    span{
      width: 5em;
    }
  }

  >div:nth-of-type(4){
    display: flex;
    align-items: normal;
  }
}
</style>
