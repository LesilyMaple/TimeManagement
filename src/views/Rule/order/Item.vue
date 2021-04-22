<template>
  <div id="order-rule-item">
    <div>
      <div>
        <TaskType
          v-if="isModifying"
          v-model="rule.bannedTaskType"
        />
        <div v-else>
          {{ rule.bannedTaskType }}
        </div>
        <span>禁止在</span>
      </div>
      <div>
        <TaskType
          v-if="isModifying"
          v-model="rule.basedTaskType"
        />
        <div v-else>
          {{ rule.basedTaskType }}
        </div>
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
          {{ showOrder(order) }}
        </div>
      </div>
    </div>
    <div>
      <el-button
        v-if="isModifying"
        size="mini"
        @click="confirmModify"
      >
        确认
      </el-button>
      <el-button
        v-else
        size="mini"
        @click="modify"
      >
        修改
      </el-button>
      <el-button
        size="mini"
        @click="remove"
      >
        删除
      </el-button>
    </div>
  </div>
</template>

<script>
import { ORDER } from '@/interface/enum'
import { ref } from 'vue'
import { useStore } from 'vuex'
import TaskType from '@/components/TaskType'

export default {
  name: 'OrderRuleItem',
  components: {
    TaskType
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  emits: ['remove'],
  setup (props, ctx) {
    const store = useStore()

    // 可以绕过禁止修改属性的机制
    const rule = props.data

    const orderOptions = [{
      value: ORDER.BEFORE,
      label: '之前'
    }, {
      value: ORDER.AFTER,
      label: '之后'
    }]

    const isModifying = ref(false)

    const modify = () => {
      isModifying.value = true
    }

    const confirmModify = () => {
      isModifying.value = false
      store.dispatch('orderRule/update', rule)
    }

    const showOrder = (order) => {
      for (const orderOption of orderOptions) {
        if (orderOption.value === order) return orderOption.label
      }
    }

    const remove = () => {
      ctx.emit('remove')
    }

    return {
      rule,
      orderOptions,
      isModifying,
      modify,
      confirmModify,
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
