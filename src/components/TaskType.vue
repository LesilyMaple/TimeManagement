<template>
  <div id="task-type">
    <div v-if="readonly">
      <div
        v-for="item in getTaskTypeNameByIds(data)"
        :key="item"
      >
        {{ item }}
      </div>
    </div>
    <el-cascader
      v-else
      v-model="data"
      :options="options"
      :props="{ checkStrictly: true }"
      clearable
      size="mini"
    />
  </div>
</template>

<script>
import { twoWayBinding } from '@/utils'
import { useStore } from 'vuex'

export default {
  name: 'TaskType',
  props: {
    modelValue: {
      type: Array,
      default: () => []
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  setup (props, ctx) {
    const store = useStore()
    const options = store.state.taskType.options
    const data = twoWayBinding(props, ctx)

    const getTaskTypeNameByIds = (idArr) => {
      const nameArr = []
      let idPointer = 0

      function find (arr) {
        for (const e of arr) {
          if (e.id === idArr[idPointer]) {
            nameArr.push(e.name)
            idPointer++
            find(e.children)
            return
          }
        }
      }

      find(store.state.taskType.data.children)
      return nameArr
    }

    // const getTaskTypeNameById = (id) => {
    //   const name = []
    //
    //   const find = (node) => {
    //     name.push(node.name)
    //     if (node.id === id) {
    //       return true
    //     }
    //
    //     if (node.children.length !== 0) {
    //       for (const child of node.children) {
    //         const isFound = find(child)
    //         if (!isFound) {
    //           name.pop()
    //         } else {
    //           return isFound
    //         }
    //       }
    //     }
    //   }
    //   find(store.state.taskType.data)
    //
    //   return name.slice(1)
    // }

    return {
      options,
      data,
      getTaskTypeNameByIds
    }
  }
}
</script>

<style lang="less" scoped>
#task-type{
  >div:nth-last-of-type(1){
    display: flex;
    color: bisque;

    div::after{
      content: '/';
    }
    div:nth-last-of-type(1)::after{
      content: '';
    }
  }
}
</style>
