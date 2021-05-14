<template>
  <div id="start">
    <div id="task-panel">
      <div>
        <TaskType v-model="taskType" />
        <el-input
          placeholder="任务名称"
          v-model="name"
          clearable
        />
      </div>
      <div id="expected-time">
        <span>预期时间</span>
        <Input
          v-model="expectedTime"
          :disabled="subTasks.length!==0"
          validate="number"
        />
        <span>分钟</span>
      </div>
      <SubTasks :data="subTasks" />
      <el-button
        type="primary"
        @click="start"
        id="start-button"
      >
        开 始
      </el-button>
    </div>
    <Template />
  </div>
</template>

<script>
import { ref, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import Template from './Template'
import SubTasks from '@/components/SubTasks'
import TaskType from '@/components/TaskType'
import Input from '@/components/Input'

export default {
  name: 'Start',
  components: {
    TaskType,
    Template,
    SubTasks,
    Input
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
    const taskType = ref([])
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
          taskType: JSON.stringify(taskType.value),
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
@import "/src/assets/css/text.less";
@s: e('/');

#start {
  display: flex;
  flex-direction: row;
  height: 100%;

  #task-panel{
    display: flex;
    flex-direction: column;
    width: 45%;
    margin: 1em;

    >div:nth-child(1){
      display: flex;
      flex-direction: row;
      align-items: center;

      >:first-child{
        margin-right: 0.5em;
        width: 40%;

        /deep/.el-cascader{
          width: 18em;
        }
      }
    }

    #expected-time{
      margin: 1em 0;
      display: flex;
      flex-direction: row;
      >:first-child{
        margin-left: auto;
      }

      /deep/ input{
        width: 3em;
        margin-left: 0.3em;
        margin-right: 0.4em;
        text-align: center;
      }
    }

    #start-button{
      width: 6em;
      margin-bottom: 1em;
      margin-top: auto;
      align-self: center;
    }
  }

  >:nth-child(2){
    width: 60%;
  }
}
</style>
