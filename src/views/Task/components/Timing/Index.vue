<template>
  <div id="task-timing">
    <div id="task-info">
      <TaskType
        v-model="taskType"
        :readonly="true"
      />
      <span>{{ name }}</span>
      <span>预期时间</span>
      <span>{{ expectedTime }}</span>
      <span>分钟</span>
    </div>
    <div>
      <div
        v-for="(item, index) in subTasks"
        :key="index"
        class="sub-task"
        :class="[currentSubTaskIndex===index?'selected':'']"
      >
        <i
          class="el-icon-right"
          @click="shift(item, index)"
        />
        <span>{{ item.name }}</span>
        <span>已进行</span>
        <span>{{ getMinute(item.time) }}</span>
        <span>分钟</span>
        <span>预期时间</span>
        <span>{{ item.expectedTime }}</span>
        <span>分钟</span>
      </div>
    </div>
    <Track :data="track" />
    <el-progress
      type="circle"
      :percentage="percentage"
      :status="processStatus"
      :width="400"
      :stroke-width="20"
    >
      <span class="time">
        {{ time }}
      </span>
    </el-progress>
    <div class="button-group">
      <el-button
        v-if="!isWorking"
        @click="start"
      >
        开始
      </el-button>
      <el-button
        v-else
        @click="pause"
      >
        暂停
      </el-button>
      <el-button
        @click="finish"
      >
        完成
      </el-button>
    </div>
    <!--    <el-input-->
    <!--      v-model="note"-->
    <!--      type="textarea"-->
    <!--      :rows="10"-->
    <!--      placeholder="笔记"-->
    <!--    />-->
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import { reactive, ref } from 'vue'
import TaskType from '@/components/TaskType'
import Track from '@/components/Track'
import TimeManager from '@/utils/time'

export default {
  name: 'Timing',
  components: {
    TaskType,
    Track
  },
  setup () {
    const route = useRoute()
    const router = useRouter()

    const name = route.params.name
    const time = parseInt(route.params.time)
    const expectedTime = parseInt(route.params.expectedTime)
    const taskType = JSON.parse(route.params.taskType)
    const subTasks = reactive(JSON.parse(route.params.subTasks))
    const note = ref('')

    const track = reactive([])

    const timeSegment = ref(0)
    const percentage = ref(0)
    const processStatus = ref(null)

    let timer = 0
    const isWorking = ref(false)
    let startTime = null
    let endTime = null
    let currentTask = (() => {
      if (subTasks.length === 0) {
        return { name, time, expectedTime }
      }
      return subTasks[0]
    })()

    const currentSubTaskIndex = ref(0)

    const shift = (item, index) => {
      if (isWorking.value) {
        pause()
        currentSubTaskIndex.value = index
        currentTask = item
        start()
      } else {
        currentSubTaskIndex.value = index
        currentTask = item
      }
    }

    const start = () => {
      clearInterval(timer) // 结束休息计时
      endTime = new Date() // 设置休息结束时间
      addTrack('休息')
      startTime = new Date() // 设置任务开始时间
      percentage.value = currentTask.time / (currentTask.expectedTime * 60) * 100
      timeSegment.value = 0

      const processIncrement = 100 / currentTask.expectedTime / 60

      isWorking.value = true

      timer = setInterval(() => {
        timeSegment.value++
        currentTask.time += 1
        percentage.value += processIncrement
        if (percentage.value >= 100) {
          percentage.value = 100
          processStatus.value = 'success'
        }
      }, 1000)
    }

    const pause = () => {
      clearInterval(timer) // 结束任务计时
      endTime = new Date() // 设置任务结束时间
      addTrack()
      startTime = new Date() // 设置休息开始时间
      percentage.value = 0
      timeSegment.value = 0

      isWorking.value = false

      timer = setInterval(() => {
        timeSegment.value++
      }, 1000)
    }

    // 有两种情形会addTrack
    // 1. 任务暂停时
    // 2. 任务开始时
    const addTrack = (name = currentTask.name) => {
      // 第一次开始不计入
      if (startTime === null) return
      // 休息时间小于1分钟不计入
      if (!isWorking.value && timeSegment.value < 60) return
      track.push({
        name,
        time: timeSegment.value,
        startTime: startTime,
        endTime: endTime
      })
    }

    const finish = () => {
      clearInterval(timer)
      if (isWorking.value) {
        endTime = new Date()
        addTrack()
        isWorking.value = false
      }
      router.push({
        name: 'Finish',
        params: {
          name,
          taskType: JSON.stringify(taskType),
          time,
          note: note.value,
          startTime: JSON.stringify(startTime),
          endTime: JSON.stringify(endTime),
          subTasks: JSON.stringify(subTasks),
          track: JSON.stringify(track)
        }
      })
    }

    return {
      name,
      expectedTime,
      taskType,
      subTasks,
      note,
      percentage,
      processStatus,
      time: timeSegment,
      isWorking,
      track,
      start,
      pause,
      finish,
      shift,
      getMinute: TimeManager.second2Minute,
      currentSubTaskIndex
    }
  }
}
</script>

<style lang="less" scoped>
@import "/src/assets/css/text.less";

#task-timing {
  //display: flex;
  //flex-direction: column;
  //width: 100%;
  //height: 100%;
  margin: 1em;

  #task-info{
    display: flex;
    flex-direction: row;
    margin: 1em 0;
    align-items: center;

    >:nth-child(1){
      margin-right: 1em;
    }
    >:nth-child(2){
      margin-right: 1em;
    }
    >:nth-child(4){
      margin: 0 0.3em;
    }
  }

  .sub-task{
    display: flex;
    align-items: center;
    transition: 200ms;
    margin: 1em 0;
    font-weight: bold;

    i{
      cursor: pointer;
      line-height: unset;
    }

    >:nth-child(2){
      margin: 0 1em;
    }

    >:nth-child(4){
      margin: 0 0.3em;
    }

    >:nth-child(5){
      margin-right: 1em;
    }

    >:nth-child(7){
      margin: 0 0.3em;
    }
  }
}

.selected{
  color: #409EFF;
}
</style>
