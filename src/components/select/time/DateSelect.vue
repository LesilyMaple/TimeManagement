<template>
  <el-button
    @click="showPopup=!showPopup"
    size="mini"
  >
    {{ 1 }}
  </el-button>
  <div
    :class="[showPopup?'down':'up']"
    id="date-select"
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
        <DatePicker
          v-show="repeatType===0"
          v-model="dates"
          @input="onDateChange"
          class="absolute"
          is-range
        />
      </transition>
      <transition name="fade">
        <div
          v-show="repeatType===2"
          class="absolute"
        >
          <span
            v-for="index in 7"
            :key="index"
            class="date"
          >
            {{ index }}
          </span>
        </div>
      </transition>
      <transition name="fade">
        <div
          v-show="repeatType===3"
          class="absolute"
        >
          <span
            v-for="index in 31"
            :key="index"
            class="date"
          >
            {{ index }}
          </span>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
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

    return {
      dates,
      showPopup,
      onClickDate,
      repeatType,
      onChangeRepeatType,
      onDateChange
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

#date-select {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 20px;
  z-index: 99;
  overflow: hidden;
  width: 252px;

  > div {
    display: flex;
    flex-direction: row;
    width: 100%;

    > :first-child {
      margin-right: auto;
    }
  }

  .transition {
    position: absolute;
    top: 30px;
    left: 0;
  }
}

.absolute{
  position: absolute;
  top: 30px;
  left: 0;
}

.date{
  padding: 0.5em;
  border: solid 2px #646464;
  border-radius: 2px;
  margin: 0.2em;

  &:hover{
    background-color: blue;
  }
}

.down {
  height: 500px;
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
