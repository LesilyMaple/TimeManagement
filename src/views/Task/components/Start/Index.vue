<template>
  <div id="start">
    <div>
      <TaskType v-model="taskType" />
      <el-input
        placeholder="任务名称"
        v-model="name"
        clearable
      />
      <div>
        <span>预期时间</span>
        <input
          v-model="expectedTime"
          :disabled="subTasks.length!==0"
        >
        <span>分钟</span>
      </div>
      <SubTasks :data="subTasks" />
      <el-button
        type="primary"
        @click="start"
      >
        开始
      </el-button>
    </div>
    <div>
      <Template />
    </div>
    <div>
      Recent Plan
    </div>
  </div>
</template>

<script>
import { ref, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import Template from './Template'
import SubTasks from '@/components/SubTasks'
import TaskType from '@/components/TaskType'

export default {
  name: 'Start',
  components: {
    TaskType,
    Template,
    SubTasks
  },
  setup () {
    const router = useRouter()

    /*
    *  Note:
    *  基本类型用ref，指针类型用reactive
    *  ref类型传到组件中是解构后的基本类型，没有响应性
    *  reactive类型传到组件中是proxy，具备响应性
    */
    const name = ref('')
    const time = ref(0)
    const taskType = reactive([])
    const subTasks = reactive([])
    const expectedTime = ref(null)

    watch(subTasks, () => {
      expectedTime.value = 0
      if (subTasks.length === 0) return
      for (const subTask of subTasks) {
        if (subTask.expectedTime !== null) {
          expectedTime.value += subTask.expectedTime
        }
      }
    })

    const start = () => {
      router.push({
        name: 'Timing',
        params: {
          name: name.value,
          time: time.value,
          expectedTime: expectedTime.value,
          taskType: JSON.stringify(taskType),
          subTasks: JSON.stringify(subTasks)
        }
      })
    }

    return {
      taskType,
      name,
      subTasks,
      expectedTime,
      start
    }
  }
}
</script>

<style lang="less" scoped>
@s: e('/');

#start {
  display: grid;
  grid-template: 70% 30% @s 30% 70%;
  height: 100%;

  &>:first-child{
    grid-area: 1 @s 1 @s 3 @s 2;

    .el-button{
      position: absolute;
      bottom: 10px;
      left: 15%;
      transform: translate(-50%);
    }
  }

  &>:nth-child(2){
    grid-area: 1 @s 2 @s 2 @s 3;
  }

  &>:last-child{
    grid-area: 2 @s 2 @s 3 @s 3;
  }
}
</style>
