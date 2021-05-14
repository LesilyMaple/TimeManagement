<template>
  <div id="limited-plan">
    <div
      id="day"
      v-if="mode==='day'"
    >
      <div
        id="day-select"
        class="time-nav"
      >
        <el-button
          icon="el-icon-arrow-left"
          size="medium"
        />
        <el-date-picker
          v-model="date"
          format="YYYY 年  M 月  D 日"
          size="medium"
        />
        <el-button
          icon="el-icon-arrow-right"
          size="medium"
        />
      </div>
      <Day :date="date" />
    </div>
    <div
      id="week"
      v-else-if="mode==='week'"
    >
      <div
        id="week-select"
        class="time-nav"
      >
        <el-button
          icon="el-icon-arrow-left"
          size="medium"
        />
        <el-date-picker
          v-model="date"
          type="week"
          format="gggg 年  第 ww 周"
          placeholder="选择周"
          size="medium"
        />
        <el-button
          icon="el-icon-arrow-right"
          size="medium"
        />
      </div>
      <Week :date="date" />
    </div>
    <div
      id="month"
      v-else-if="mode==='month'"
    >
      <div
        id="month-select"
        class="time-nav"
      >
        <el-button
          icon="el-icon-arrow-left"
          size="medium"
        />
        <el-date-picker
          v-model="date"
          type="month"
          format="YYYY 年  M 月"
          size="medium"
        />
        <el-button
          icon="el-icon-arrow-right"
          size="medium"
        />
      </div>
      <div>
        month
      </div>
    </div>
    <div id="mode-select">
      <el-radio-group
        v-model="mode"
        size="medium"
      >
        <el-radio-button label="day">
          日
        </el-radio-button>
        <el-radio-button label="week">
          周
        </el-radio-button>
        <el-radio-button label="month">
          月
        </el-radio-button>
      </el-radio-group>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import Day from './DayView/Index'
import Week from './WeekView/Index'

export default {
  name: 'LimitedPlan',
  components: {
    Day,
    Week
  },
  setup () {
    const mode = ref('day')
    const date = ref(new Date())

    return {
      mode,
      date
    }
  }
}
</script>

<style lang="less" scoped>
#limited-plan{
  width: 100%;
  height: 100%;
}

.time-nav{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  z-index: 999;
  width: 100%;
  height: 7%;
}

#day, #week, #month{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

#mode-select{
  position: absolute;
  top: 0;
  right: 20%;
  height: 7%;
  z-index: 999;
  display: flex;
  align-items: center;
  margin-right: 17px;
}

.el-button{
  padding: 10px;
  margin: 10px 5px;
}
</style>
