<template>
  <div id="time-rule-item">
    <TaskType
      v-model="rule.taskType"
      :readonly="!isModifying"
    />
    <el-time-select
      v-if="isModifying"
      v-model="rule.startTime"
      start="00:00"
      end="23:50"
      step="00:10"
      placeholder="0:00"
      size="mini"
    />
    <div v-else>
      {{ rule.startTime }}
    </div>
    <el-time-select
      v-if="isModifying"
      v-model="rule.endTime"
      start="00:00"
      end="23:50"
      step="00:10"
      placeholder="23:59"
      size="mini"
    />
    <div v-else>
      {{ rule.endTime }}
    </div>
    <div>
      <el-button
        v-if="isModifying"
        @click="modify"
        size="mini"
      >
        确认
      </el-button>
      <el-button
        v-else
        @click="isModifying=true"
        size="mini"
      >
        修改
      </el-button>
      <el-button
        v-if="isModifying"
        @click="cancel"
        size="mini"
      >
        取消
      </el-button>
      <el-button
        v-else
        @click="remove"
        size="mini"
      >
        删除
      </el-button>
    </div>
  </div>
</template>

<script>
import TaskType from '@/components/TaskType'
import { useStore } from 'vuex'
import { reactive, ref } from 'vue'

export default {
  name: 'TimeRuleItem',
  components: {
    TaskType
  },
  props: {
    data: {
      type: Object,
      default: () => reactive({
        taskType: [],
        startTime: null,
        endTime: null
      })
    },
    readonly: {
      type: Boolean,
      default: true
    }
  },
  emits: ['added', 'remove', 'cancel'],
  setup (props, ctx) {
    const store = useStore()

    const rule = props.data

    const isModifying = ref(!props.readonly)

    const modify = () => {
      isModifying.value = false
      if (rule.id === undefined) {
        store.dispatch('timeRule/add', rule)
        ctx.emit('added')
      } else {
        store.dispatch('timeRule/update', rule)
      }
    }
    const remove = () => {
      ctx.emit('remove', rule.id)
    }
    const cancel = () => {
      isModifying.value = false
      ctx.emit('cancel')
    }

    return {
      rule,
      isModifying,
      modify,
      remove,
      cancel
    }
  }
}
</script>

<style lang="less" scoped>
#time-rule-item{
  display: flex;
}
</style>
