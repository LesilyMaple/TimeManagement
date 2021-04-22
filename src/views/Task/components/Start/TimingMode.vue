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
        width="200px"
      >
        <template #reference>
          <i class="el-icon-question" />
        </template>
        <div id="tomato-settings">
          <div>
            专注时长：
            <el-input-number
              size="mini"
              v-model="tomato.workTime"
              :step="5"
              :min="0"
            />
          </div>
          <div>
            休息时长：
            <el-input-number
              size="mini"
              v-model="tomato.relaxTime"
              :step="5"
              :min="0"
            />
          </div>
          <div>
            轮数：
            <el-input-number
              size="mini"
              v-model="tomato.round"
              :min="0"
            />
          </div>
        </div>
      </el-popover>
    </el-radio>
  </main>
</template>

<script>
import { twoWayBinding } from '@/utils'

export default {
  name: 'TimingMode',
  props: {
    modelValue: {
      type: String,
      default: 'normal'
    },
    tomatoSettings: {
      type: Object,
      required: true
    }
  },
  emits: ['update:modelValue'],
  setup (props, ctx) {
    const mode = twoWayBinding(props, ctx)

    return {
      mode,
      tomato: props.tomatoSettings
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
