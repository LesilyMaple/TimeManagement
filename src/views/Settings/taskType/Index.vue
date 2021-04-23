<template>
  <main id="task-type">
    <Breadcrumb />
    <Item
      v-for="item in childrenTypes"
      :key="item"
      :type="item"
      @remove="remove($event)"
    />
    <el-button
      v-if="!isAdding"
      @click="addType"
      icon="el-icon-plus"
      size="mini"
    />
    <el-input
      v-if="isAdding"
      v-model="newTypeName"
      @keydown.enter="submitAdd"
      @blur="submitAdd"
      ref="input"
      size="mini"
    />
  </main>
</template>

<script>
import Breadcrumb from './Breadcrumb'
import Item from './Item'
import { useStore } from 'vuex'
import { computed, shallowRef, provide, ref, nextTick } from 'vue'

export default {
  name: 'TaskType',
  components: {
    Breadcrumb,
    Item
  },
  setup () {
    const store = useStore()

    const parentType = shallowRef(store.state.taskType.data)
    const childrenTypes = computed(() => parentType.value.children)

    provide('parentType', parentType)

    const remove = (type) => {
      store.dispatch('taskType/removeType', {
        parent: parentType.value,
        type: type
      })
    }

    const isAdding = ref(false)
    const newTypeName = ref('')
    const input = ref(null)
    const addType = () => {
      isAdding.value = true
      nextTick(() => {
        input.value.focus()
      })
    }
    const submitAdd = () => {
      isAdding.value = false
      if (newTypeName.value === '') return
      store.dispatch('taskType/addType', {
        parent: parentType.value,
        name: newTypeName.value
      })
    }

    return {
      parentType,
      childrenTypes,
      remove,
      isAdding,
      newTypeName,
      input,
      addType,
      submitAdd
    }
  }
}
</script>

<style lang="less" scoped>
#task-type{
  width: 400px;
}
</style>
