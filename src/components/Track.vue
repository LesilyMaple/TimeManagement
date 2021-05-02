<template>
  <div id="track">
    <el-timeline>
      <el-timeline-item
        v-for="(item, index) in data"
        :key="index"
        hide-timestamp
      >
        <span>{{ item.name }}</span>
        <span>{{ getMinute(item.time) }}</span>
        <span>{{ item.startTime }}</span>
        <span>{{ item.endTime }}</span>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
import TimeManager from '@/utils/time'

export default {
  name: 'Track',
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  setup () {
    return {
      getMinute: TimeManager.second2Minute
    }
  }
}
</script>

<style scoped>

</style>
