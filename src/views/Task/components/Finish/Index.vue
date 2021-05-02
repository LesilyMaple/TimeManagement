<template>
  <div>
    {{ taskType }}<br>
    {{ name }}<br>
    {{ startTime }}<br>
    {{ endTime }}<br>
    <el-input
      type="textarea"
      :rows="10"
      placeholder="请输入内容"
      v-model="note"
    />
    <div
      v-for="(item, index) in subTasks"
      :key="index"
      v-once
    >
      {{ item.name }} | {{ item.time }}<br>
    </div>
    <Track :data="track" />
    投入度：<el-rate v-model="devotion" />
    满意度：<el-rate v-model="satisfaction" />
    <el-button @click="finish">
      完成
    </el-button>
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
import Track from '@/components/Track'

export default {
  name: 'Finish',
  components: {
    Track
  },
  setup () {
    const route = useRoute()
    const router = useRouter()

    const name = route.params
    let time = route.params.time
    const note = ref(route.params.note)
    const taskType = JSON.parse(route.params.taskType)
    let startTime = JSON.parse(route.params.startTime)
    let endTime = JSON.parse(route.params.endTime)
    const subTasks = JSON.parse(route.params.subTasks)
    const track = JSON.parse(route.params.track)

    const devotion = ref(0)
    const satisfaction = ref(0)

    if (subTasks.length !== 0) {
      time = subTasks.reduce((sum, cur) => {
        return sum + cur.time
      }, 0)
      startTime = subTasks[0].startTime
      endTime = subTasks[subTasks.length - 1].endTime
    }

    const finish = () => {
      router.push({
        name: 'Start'
      })
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
      finish
    }
  }
}
</script>

<style scoped>

</style>
