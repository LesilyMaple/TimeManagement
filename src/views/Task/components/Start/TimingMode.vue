<template>
  <main>
    <el-radio
      v-model="mode"
      label="normal"
    >
      普通
    </el-radio>
    <el-radio
      v-model="mode"
      label="tomato"
    >
      番茄
      <el-popover
        trigger="hover"
        width="15em"
      >
        <template #reference>
          <i class="el-icon-question" />
        </template>
        <div id="tomato-settings">
          <div>
            专注时长：
            <el-input-number
              v-model="tomato.workTime"
              :step="5"
              :min="0"
              size="mini"
            />
          </div>
          <div>
            休息时长：
            <el-input-number
              v-model="tomato.relaxTime"
              :step="5"
              :min="0"
              size="mini"
            />
          </div>
          <div>
            轮数：
            <el-input-number
              v-model="tomato.round"
              :min="0"
              size="mini"
            />
          </div>
        </div>
      </el-popover>
    </el-radio>
  </main>
</template>

<script>
import { twoWayBinding } from '@/utils'
import { reactive } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'TimingMode',
  props: {
    modelValue: {
      type: String,
      default: 'normal'
    }
  },
  emits: ['update:modelValue'],
  setup (props, ctx) {
    const mode = twoWayBinding(props, ctx)
    let tomato = useStore().state.settings.tomato
    tomato = reactive({
      workTime: tomato.workTime,
      relaxTime: tomato.relaxTime,
      round: tomato.round
    })

    return {
      mode,
      tomato
    }
  }
}
</script>

<style lang="less" scoped>
#tomato-settings{
  div{
    display: flex;
    flex-direction: row;
    align-items: center;
  }
}

</style>
