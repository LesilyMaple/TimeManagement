<template>
  <div id="task-timing">
    <div>
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
      >
        <i
          class="el-icon-right"
          @click="shift(item)"
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
    <el-input
      v-model="note"
      type="textarea"
      :rows="10"
      placeholder="笔记"
    />
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

    const { name, time, expectedTime } = route.params
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

    const shift = (item) => {
      if (isWorking.value) {
        pause()
        currentTask = item
        start()
      } else {
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
        time: currentTask.time,
        startTime,
        endTime
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
      getMinute: TimeManager.second2Minute
    }
  }
}
</script>

<style lang="less" scoped>
@s: e('/');

#task-timing {
  //display: grid;
  height: 100%;

  .sub-task{
    display: flex;
    align-items: center;

    i{
      cursor: pointer;
      line-height: unset;
    }
  }
}
</style>
