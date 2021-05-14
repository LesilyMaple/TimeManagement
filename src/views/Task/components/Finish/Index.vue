<template>
  <div id="finish">
    <div>
      <TaskType
        v-model="taskType"
        :readonly="true"
      />
      <span>{{ name }}</span>
      <span>有效时间 {{ time }} 分钟</span>
    </div>
    <div>
      <span>{{ formatTime(startTime) }} - {{ formatTime(endTime) }}</span>
    </div>
    <div>
      <div
        v-for="(item, index) in subTasks"
        :key="index"
        v-once
      >
        <span>{{ item.name }}</span>
        <span>进行 {{ getMinute(item.time) }} 分钟</span>
      </div>
    </div>
    <Track :data="track" />
    <div id="devotion">
      <span> 投入度：</span>
      <el-rate v-model="devotion" />
    </div>
    <div id="satisfaction">
      <span>满意度：</span>
      <el-rate v-model="satisfaction" />
    </div>

    <el-input
      type="textarea"
      :rows="10"
      placeholder="请输入内容"
      v-model="note"
    />

    <el-button @click="finish">
      完成
    </el-button>
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
import Track from '@/components/Track'
import TaskType from '@/components/TaskType'
import dayjs from 'dayjs'
import TimeManager from '@/utils/time'

export default {
  name: 'Finish',
  components: {
    Track,
    TaskType
  },
  setup () {
    const route = useRoute()
    const router = useRouter()

    const name = route.params.name
    let time = parseInt(route.params.time)
    let startTime = JSON.parse(route.params.startTime)
    let endTime = JSON.parse(route.params.endTime)
    const note = ref(route.params.note)
    const taskType = JSON.parse(route.params.taskType)
    const subTasks = JSON.parse(route.params.subTasks)
    const track = JSON.parse(route.params.track)

    const devotion = ref(0)
    const satisfaction = ref(0)

    if (subTasks.length !== 0) {
      time = subTasks.reduce((sum, cur) => {
        return sum + cur.time
      }, 0)
      startTime = dayjs(track[0].startTime)
      endTime = dayjs(track[track.length - 1].endTime)
    }

    const finish = () => {
      router.push({
        name: 'Start'
      })
    }

    const formatTime = (time) => {
      time = dayjs(time)
      return time.format('YYYY/MM/DD HH:mm')
    }

    return {
      name,
      taskType,
      time,
      subTasks,
      startTime,
      endTime,
      track,
      note,
      devotion,
      satisfaction,
      finish,
      getMinute: TimeManager.second2Minute,
      formatTime
    }
  }
}
</script>

<style lang="less" scoped>
@import "/src/assets/css/text.less";

#finish{
  >:first-child{
    display: flex;
    flex-direction: row;
    align-items: center;

    >:nth-child(2){
      margin: 0 1em;
    }
  }

  #devotion{
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  #satisfaction{
    display: flex;
    flex-direction: row;
    align-items: center;
  }
}
</style>
