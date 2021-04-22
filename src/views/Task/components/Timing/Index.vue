<template>
  <div>
    <div>
      {{ mode }}
    </div>
    <el-progress
      v-if="mode==='normal'"
      type="circle"
      :percentage="0"
    >
      <div class="time">
        {{ time }}
      </div>
    </el-progress>
    <el-progress
      v-else
      type="circle"
      :percentage="percentage"
    >
      <div class="time">
        {{ time }}<br>
        {{ currentRound }}
      </div>
    </el-progress>
    <div
      v-once
      id="task"
    >
      <div
        v-for="(item, index) in type"
        :key="index"
      >
        {{ item }}
      </div>
      |{{ name }}
    </div>
    <div
      v-for="(item, index) in subTasks"
      :key="index"
      id="sub-tasks"
      :class="{currentSubTask: (index===currentItem)}"
    >
      <div>{{ item.text }}</div>
      <el-button
        icon="el-icon-bottom-right"
        v-if="mode==='normal'"
        @click="switchSubTask(index)"
      />
      <div v-if="currentItem===index">
        {{ item.time+time }}
      </div>
      <div v-else-if="itemCache===index&&isRelax">
        {{ item.time+timeCache }}
      </div>
      <div v-else>
        {{ item.time }}
      </div>
    </div>
    <div>
      开始时间：{{ startTime }}
    </div>
    <el-input
      type="textarea"
      :rows="5"
      placeholder="请输入内容"
      v-model="note"
    />
    <div
      id="tomato-settings"
      v-if="mode==='tomato'"
    >
      <div>专注时长{{ tomato.workTime }}分钟</div>
      <div>休息时长{{ tomato.relaxTime }}分钟</div>
      <div>轮数{{ tomato.round }}</div>
    </div>
    <div id="finish-group">
      <div v-if="mode==='normal'">
        <el-button
          v-if="!isRelax"
          @click="relax"
        >
          休息
        </el-button>
        <el-button
          v-else
          @click="resume"
        >
          恢复
        </el-button>
        <el-button @click="normalFinish">
          完成
        </el-button>
      </div>
      <div v-else>
        <el-button
          v-if="isAllTasksDone"
          @click="tomatoFinish"
        >
          完成
        </el-button>
        <el-button
          v-else-if="isRelax"
          @click="skipRelaxing"
        >
          跳过休息
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { getStateRef } from '@/utils'

export default {
  name: 'Timing',
  setup () {
    const route = useRoute()
    const router = useRouter()
    const state = useStore().state.currentTask

    const { name, type, subTasks, startTime } = route.params
    const mode = ref(route.params.mode)

    const track = []

    const hasSubTasks = subTasks.length !== 0
    const time = ref(0)
    const currentItem = ref(0) // 当前的计时器id，因为该模型的计时方式是单线程的，所以同一时间只能有一个计时器
    let currentTimer = 0
    let relaxTime = null

    let addTrack // 追踪轨迹函数

    const finish = () => {
      state.endTime = new Date()

      router.push({
        name: 'Finish',
        params: {
          mode: mode.value
        }
      })
    }
    // region 普通计时模块
    const NormalTiming = () => {
      currentTimer = setInterval(() => {
        time.value++
      }, 1000)
    }

    // region 子任务模块

    addTrack = (_item = currentItem.value, _time = time.value) => {
      track.push({
        item: _item,
        time: _time,
        mode: 'normal'
      })
    }

    const isRelax = ref(false)

    const __item = ref(0) // 只在休息中切换任务时使用，暂存当前任务的索引
    const __time = ref(0) // 只在休息中切换任务时使用，暂存当前任务的进度

    /*
    * 切换子任务（有三种行为）
    * 1. 点击自身：无事发生
    * 2. 点击其他且不在休息时：
    *   a. 停止计时
    *   b. 更新当前子任务的时间
    *   c. 追踪当前子任务的轨迹
    *   d. 进度条时间清零
    *   e. 切换为下一子任务
    *   f. 开始计时
    * 3. 点击其他且在休息时：
    *   a. 切换为下一子任务
    *   b. 如果下一子任务为休息前进行的任务，则进度条时间设置为之前的进度
    *   c. 如果不是，则将进度条时间设置为0
    */
    const switchSubTask = (_index) => {
      if (currentItem.value === _index) return
      if (isRelax.value) {
        currentItem.value = _index
        if (_index === __item.value) time.value = __time.value
        else time.value = 0
        return
      }
      clearInterval(currentTimer)
      subTasks[currentItem.value].time += time.value
      addTrack()
      time.value = 0
      currentItem.value = _index
      NormalTiming()
    }
    // endregion

    // region 休息

    /*
    * 休息
    * 1. 清除计时器，置isRelax为真
    * 2. 追踪当前子任务的轨迹
    * 3. 缓存当前子任务及进度条时间
    * 4. 初始化休息时间然后开始计时
    */
    const relax = () => {
      clearInterval(currentTimer)
      isRelax.value = true
      addTrack()
      __item.value = currentItem.value
      __time.value = time.value
      relaxTime = 0
      currentTimer = setInterval(() => {
        relaxTime++
      }, 1000)
    }

    const addTrackRelax = () => {
      addTrack(-1, relaxTime)
    }

    /*
    * 恢复
    * 1. 清空计时器
    * 2. 追踪休息时间轨迹
    * 3. 如果选择了其他子任务，则将上次的时间加到上次的子任务中去
    * 3. 休息时间置null，isRelax置假
    * 4. 开始计时
    */
    const resume = () => {
      clearInterval(currentTimer)
      addTrackRelax()
      if (currentItem.value !== __item.value) subTasks[__item.value].time += __time.value
      relaxTime = null
      isRelax.value = false
      NormalTiming()
    }
    // endregion

    // region 完成
    const normalFinish = () => {
      clearInterval(currentTimer)

      if (relaxTime !== null) addTrackRelax()
      else addTrack()

      if (hasSubTasks) {
        subTasks[currentItem.value].time = time.value
      } else {
        state.time = time.value
      }

      finish()
    }
    // endregion
    // endregion

    // region 番茄计时模块
    const tomato = JSON.parse(route.params.tomato)

    const percentage = ref(0)
    const currentRound = ref(1)

    isRelax.value = false

    if (mode.value === 'tomato') {
      addTrack = (_relaxTime) => {
        track.push({
          item: currentItem.value,
          workTime: tomato.workTime,
          relaxTime: _relaxTime,
          mode: 'tomato'
        })
      }
    }

    const tomatoTiming = (_seconds) => {
      const increment = (1 / _seconds) * 100
      currentTimer = setInterval(() => {
        time.value++
        percentage.value += increment
      }, 1000)
    }

    const tomatoWorking = () => {
      isRelax.value = false
      tomatoTiming(3)
    }

    const tomatoRelaxing = () => {
      isRelax.value = true
      tomatoTiming(2)
    }

    /*
    * 进度条满了触发，即专注时间／休息时间结束
    * 执行休息函数／轮数+1
    */
    watch(percentage, () => {
      if (percentage.value > 100) {
        clearInterval(currentTimer)
        percentage.value = 0
        time.value = 0
        if (isRelax.value) currentRound.value++
        else tomatoRelaxing()
      }
    })

    const isAllRoundDone = ref(false)
    const isAllTasksDone = ref(false)

    relaxTime = null // 中断休息时的实际休息时间，为空则表示按照设定休息

    /*
    * 1. 轮数满了，即子任务／任务完成
    *   a. 如果子任务没执行完，继续下一个子任务
    *   b. 如果子任务执行完了，则置完成flag为真
    * 2. 轮数不满，就开始下一轮
    */
    watch(currentRound, () => {
      if (currentRound.value > tomato.round) {
        isAllRoundDone.value = true
        if (hasSubTasks) {
          addTrack(relaxTime === null ? tomato.relaxTime : relaxTime)
          relaxTime = null
          if (currentItem.value < subTasks.length - 1) {
            // 子任务没执行完
            currentItem.value++
            currentRound.value = 1
          } else {
            isAllTasksDone.value = true
          }
        } else {
          console.log('记录任务的过程')
        }
      } else {
        isAllRoundDone.value = false
        tomatoWorking()
      }
    })

    const skipRelaxing = () => {
      clearInterval(currentTimer)
      relaxTime = time.value
      time.value = 0
      percentage.value = 0
      currentRound.value++
    }

    const tomatoFinish = () => {
      finish()
    }
    // endregion

    onMounted(() => {
      if (mode.value === 'normal') NormalTiming()
      else tomatoWorking()
    })

    return {
      name,
      type,
      startTime,
      note: getStateRef(state, 'note'),
      mode,
      subTasks,
      time,
      currentItem,
      switchSubTask,
      isRelax,
      relax,
      resume,
      itemCache: __item,
      timeCache: __time,
      tomato,
      percentage,
      currentRound,
      isAllRoundDone,
      isAllTasksDone,
      skipRelaxing,
      normalFinish,
      tomatoFinish
    }
  }
}
</script>

<style lang="less" scoped>
.normal {
}

.tomato {
  color: darkred;
}

#task, #sub-tasks {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.currentSubTask {
  div {
    color: greenyellow;
  }
}

</style>
