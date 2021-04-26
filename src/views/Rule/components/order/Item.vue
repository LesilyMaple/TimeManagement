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
import { reactive, ref } from 'vue'
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
      default: () => reactive({
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
  emits: ['remove', 'added', 'cancel'],
  setup (props, ctx) {
    const store = useStore()

    const rule = props.data
    /* question */
    // 数组类型要用对象取出来才有响应性--用reactive不好使
    // 基本类型要用ref才有响应性--用对象不好使

    const isModifying = ref(!props.readonly)

    const orderOptions = getOrderOptions()
    const showOrder = (order) => {
      for (const orderOption of orderOptions) {
        if (orderOption.value === order) return orderOption.label
      }
    }

    const modify = () => {
      isModifying.value = false
      if (rule.id === undefined) {
        store.dispatch('orderRule/add', rule)
        ctx.emit('added')
      } else {
        store.dispatch('orderRule/update', rule)
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
      orderOptions,
      isModifying,
      modify,
      showOrder,
      remove,
      cancel
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
