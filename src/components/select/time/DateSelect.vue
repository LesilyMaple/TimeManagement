<template>
  <el-button
    @click="showPopup=!showPopup"
    size="mini"
  >
    {{ 1 }}
  </el-button>
  <div
    :class="[showPopup?'down':'up']"
    id="panel"
  >
    <div>
      <el-radio-group
        v-model="repeatType"
        @change="onChangeRepeatType($event)"
        size="mini"
      >
        <el-radio-button :label="0">
          <i class="el-icon-date" />
        </el-radio-button>
      </el-radio-group>
      <el-radio-group
        v-model="repeatType"
        @change="onChangeRepeatType($event)"
        size="mini"
      >
        <el-radio-button :label="1">
          每天
        </el-radio-button>
        <el-radio-button :label="2">
          每周
        </el-radio-button>
        <el-radio-button :label="3">
          每月
        </el-radio-button>
      </el-radio-group>
    </div>
    <div>
      <transition name="fade">
        <div id="date">
          <DatePicker
            v-show="repeatType===0"
            v-model="dates"
            @input="onDateChange"
            is-range
          />
        </div>
      </transition>
      <transition name="fade">
        <div
          v-show="repeatType===2"
          id="week"
        >
          <span
            v-for="(item, index) in ['一','二','三','四','五','六','日']"
            :key="index"
            @click="onClickWeekDay(index)"
            class="week-day"
            :class="[weekDay[index]?'active':'default']"
          >
            {{ item }}
          </span>
        </div>
      </transition>
      <transition name="fade">
        <div
          v-show="repeatType===3"
          id="month"
        >
          <span
            v-for="index in 31"
            :key="index"
            @click="onClickMonthDay(index)"
            class="month-day"
          >
            {{ index }}
          </span>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { DatePicker } from 'v-calendar'

export default {
  name: 'DateSelect',
  components: {
    DatePicker
  },
  setup () {
    // NOTE: 必须用ref，reactive没有反应
    const dates = ref({
      start: null,
      end: null
    })

    const showPopup = ref(false)

    const repeatType = ref(0)
    const onClickDate = () => {
      repeatType.value = 0
    }

    const onChangeRepeatType = (type) => {
      switch (type) {
        case 0:
          break
        case 1:
          dates.value = {
            start: null,
            end: null
          }
          break
        case 2:
          break
        case 3:
          break
      }
    }

    const onDateChange = () => {
      switch (repeatType.value) {
        case 0:
          break
        case 1:
          dates.value = {
            start: null,
            end: null
          }
          break
        case 2:
          break
        case 3:
          break
      }
    }

    const weekDay = reactive(new Array(7))
    for (let i = 0; i < weekDay.length; i++) {
      weekDay[i] = false
    }
    const onClickWeekDay = (i) => {
      weekDay[i] = !weekDay[i]
    }

    const monthDay = reactive(new Array(31))
    for (let i = 0; i < monthDay.length; i++) {
      monthDay[i] = false
    }
    const onClickMonthDay = (i) => {
      monthDay[i] = !monthDay[i]
    }

    return {
      dates,
      showPopup,
      onClickDate,
      repeatType,
      onChangeRepeatType,
      onDateChange,
      weekDay,
      monthDay,
      onClickWeekDay,
      onClickMonthDay
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .el-range-editor--mini.el-input__inner {
  width: 15em;
}

/deep/ .el-date-editor .el-range-input {
  width: 7em;
}

/deep/ .vc-container{
  border: solid 0 transparent;
  border-radius: 0.4em;
}

#panel {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 30px;
  z-index: 99;
  overflow: hidden;
  width: 250px;

  > div {
    display: flex;
    flex-direction: row;
    width: 100%;

    > :first-child {
      margin-right: auto;
    }
  }

  >:first-child{
    background-color: white;
    border-radius: 0.4em;
  }

  .transition {
    position: absolute;
    top: 30px;
    left: 0;
  }

  #date, #week, #month{
    display: flex;
  }

  .week-day, .month-day{
    cursor: pointer;
    transition: 200ms;
  }

  #week{
    border-radius: 0.4em;
    background-color: white;

    >:first-child{
      margin-left: 0;
    }
    >:last-child{
      margin-right: 0;
    }
  }

  .week-day{
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    width: 28px;
    height: 28px;
    margin: 0 4.5px;
    font-size: small;
    border-radius: 0.4em;

    &::selection{
      background-color: transparent;
    }
  }
}

.default{
  background-color: white;
  color: #606266;
  box-shadow: 0 0 3px rgba(100, 100, 100, 0.42);
}

.active{
  background-color: #409EFF;
  color: white;
  box-shadow: 0 0 3px rgba(64, 158, 255, 0.68);
}

.down {
  height: 300px;
  transition: height 0.3s ease-in 0s;
}

.up {
  height: 0;
  transition: height 0.3s ease-out 0s;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
