<template>
  <div id="track">
    <el-timeline>
      <el-timeline-item
        v-for="(item, index) in data"
        :key="index"
        hide-timestamp
      >
        <div class="track-item">
          <span>{{ item.name }}</span>
          <span>进行 {{ getMinute(item.time) }} 分钟</span>
          <span>{{ formatTime(item.startTime) }} - {{ formatTime(item.endTime) }}</span>
        </div>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
import TimeManager from '@/utils/time'
import dayjs from 'dayjs'

export default {
  name: 'Track',
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  setup () {
    const formatTime = (time) => {
      time = dayjs(time)
      return time.format('YYYY/MM/DD HH:mm')
    }

    return {
      formatTime,
      getMinute: TimeManager.second2Minute
    }
  }
}
</script>

<style lang="less" scoped>
@import "/src/assets/css/text.less";

.track-item{
  >span:nth-of-type(1){
    margin-right: 2em;
  }
  >span:nth-of-type(2){
    margin-right: 2em;
  }
}
</style>
