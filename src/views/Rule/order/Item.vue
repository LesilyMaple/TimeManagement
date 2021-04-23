<template>
  <div id="order-rule-item">
    <div>
      <div>
        <TaskType
          v-model="rule.bannedTaskType"
          :readonly="!isModifying"
        />
        <span>禁止在</span>
      </div>
      <div>
        <TaskType
          v-model="rule.basedTaskType"
          :readonly="!isModifying"
        />
        <el-select
          v-if="isModifying"
          v-model="rule.order"
          size="mini"
        >
          <el-option
            v-for="item in orderOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <div v-else>
          {{ showOrder(rule.order) }}
        </div>
      </div>
    </div>
    <div>
      <el-button
        v-if="isModifying"
        size="mini"
        @click="modify"
      >
        确认
      </el-button>
      <el-button
        v-else
        size="mini"
        @click="isModifying=true"
      >
        修改
      </el-button>
      <el-button
        v-if="!isModifying"
        size="mini"
        @click="remove"
      >
        删除
      </el-button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import TaskType from '@/components/TaskType'
import { getOrderOptions } from '@/utils'

export default {
  name: 'OrderRuleItem',
  components: {
    TaskType
  },
  props: {
    data: {
      type: Object,
      default: () => ({
        bannedTaskType: [],
        basedTaskType: [],
        order: 0
      })
    },
    readonly: {
      type: Boolean,
      default: true
    }
  },
  emits: ['remove', 'added'],
  setup (props, ctx) {
    const store = useStore()

    // 可以绕过禁止修改属性的机制
    const rule = props.data

    const isModifying = ref(!props.readonly)

    const modify = () => {
      isModifying.value = false
      if (rule.id === undefined) {
        store.dispatch('orderRule/add', rule)
        ctx.emit('added')
      } else {
        store.dispatch('orderRule/update', rule)
      }
    }

    const orderOptions = getOrderOptions()
    const showOrder = (order) => {
      for (const orderOption of orderOptions) {
        if (orderOption.value === order) return orderOption.label
      }
    }

    const remove = () => {
      ctx.emit('remove', rule.id)
    }

    return {
      rule,
      orderOptions,
      isModifying,
      modify,
      showOrder,
      remove
    }
  }
}
</script>

<style lang="less" scoped>
#order-rule-item{
  display: flex;
  align-items: center;

  >div:nth-child(1){
    margin-right: auto;

    >div:nth-child(1){
      display: flex;
      align-items: center;
    }

    >div:nth-child(2){
      display: flex;
      align-items: center;
    }
  }

  >div:nth-child(2){
  }
}
</style>
