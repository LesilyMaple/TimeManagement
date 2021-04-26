<template>
  <div id="frequency-rule-item">
    <TaskType
      v-model="rule.taskType"
      :readonly="!isModifying"
    />
    <div v-show="!isModifying">
      [
    </div>
    <el-input-number
      v-if="isModifying"
      v-model="rule.min"
      size="mini"
    />
    <div v-else>
      {{ rule.min }}
    </div>
    <div v-show="!isModifying">
      ,
    </div>
    <el-input-number
      v-if="isModifying"
      v-model="rule.max"
      size="mini"
    />
    <div v-else>
      {{ rule.max }}
    </div>
    <div v-show="!isModifying">
      ]
    </div>
    <el-select
      v-if="isModifying"
      v-model="rule.time"
      size="mini"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <div v-else>
      {{ showTime(rule.time) }}
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
  name: 'FrequencyRuleItem',
  components: {
    TaskType
  },
  props: {
    data: {
      type: Object,
      default: () => reactive({
        taskType: [],
        min: 0,
        max: -1,
        time: 0
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

    const options = [{
      value: 1,
      label: '每天'
    }, {
      value: 2,
      label: '每周'
    }, {
      value: 3,
      label: '每月'
    }]

    const isModifying = ref(!props.readonly)

    const modify = () => {
      isModifying.value = false
      if (rule.id === undefined) {
        store.dispatch('frequencyRule/add', rule)
        ctx.emit('added')
      } else {
        store.dispatch('frequencyRule/update', rule)
      }
    }
    const remove = () => {
      ctx.emit('remove', rule.id)
    }
    const cancel = () => {
      isModifying.value = false
      ctx.emit('cancel')
    }

    const showTime = (time) => {
      for (const option of options) {
        if (option.value === time) { return option.label }
      }
    }

    return {
      rule,
      options,
      isModifying,
      modify,
      remove,
      cancel,
      showTime
    }
  }
}
</script>

<style lang="less" scoped>
#frequency-rule-item{
  display: flex;
}
</style>
