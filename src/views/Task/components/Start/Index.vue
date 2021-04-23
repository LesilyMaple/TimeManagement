<template>
  <div id="start">
    <div>
      <TaskType v-model="taskType" />
      <el-input
        placeholder="任务名称"
        v-model="name"
        clearable
      />
      <SubTasks :data-set="subTasks" />
      <el-time-picker
        v-model="startTime"
        placeholder="现在"
        format="HH:mm"
      />
      <TimingMode
        v-model="timingMode"
        :tomato-settings="tomatoSettings"
      />
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
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import Template from './Template'
import SubTasks from './SubTasks'
import TimingMode from './TimingMode'
import TaskType from '@/components/TaskType'

export default {
  name: 'Start',
  components: {
    TaskType,
    Template,
    SubTasks,
    TimingMode
  },
  setup () {
    const router = useRouter()

    const taskType = ref([])

    /*
    *  Note:
    *  基本类型用ref，指针类型用reactive
    *  ref类型传到组件中是解构后的基本类型，没有响应性
    *  reactive类型传到组件中是proxy，具备响应性
    */
    const name = ref('')
    const type = reactive([])
    const subTasks = reactive([])
    const startTime = ref(null)
    const timingMode = ref('normal')
    const tomatoSettings = reactive({
      workTime: 3,
      relaxTime: 2,
      round: 2
    })

    const start = () => {
      router.push({
        name: 'Timing',
        params: {
          name: name.value,
          type: type,
          subTasks: subTasks,
          startTime: startTime.value === null ? new Date() : startTime.value,
          mode: timingMode.value,
          tomato: JSON.stringify(tomatoSettings)
        }
      })
    }

    return {
      taskType,
      name,
      type,
      subTasks,
      startTime,
      timingMode,
      tomatoSettings,
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
