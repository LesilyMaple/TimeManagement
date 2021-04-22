<template>
  <main id="task-type-item">
    <i class="el-icon-sort" />
    <el-input
      v-if="isModifying"
      v-model="name"
      @blur="submit"
      @keydown.enter="submit"
      ref="input"
      size="mini"
    />
    <span
      v-else
      @click="enterNextLayer"
    >{{ name }}</span>
    <i
      class="el-icon-edit"
      @click="modify"
    />
    <i
      class="el-icon-close"
      @click="remove"
    />
  </main>
</template>

<script>
import { inject, nextTick, ref } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'TaskTypeItem',
  props: {
    type: {
      type: Object,
      required: true
    }
  },
  emits: ['remove'],
  setup (props, ctx) {
    const store = useStore()
    // 绕过子组件不能修改属性的机制
    const type = props.type

    const parentType = inject('parentType')
    const name = ref(type.name)
    const isModifying = ref(false)

    const input = ref(null)

    const modify = () => {
      isModifying.value = true
      nextTick(() => {
        input.value.focus()
      })
    }
    const submit = () => {
      isModifying.value = false
      store.dispatch('taskType/updateName', {
        type: type,
        name: name.value
      })
    }

    const enterNextLayer = () => {
      parentType.value = type
    }

    const remove = () => {
      ctx.emit('remove', type)
    }

    return {
      name,
      isModifying,
      input,
      modify,
      submit,
      enterNextLayer,
      remove
    }
  }
}
</script>

<style lang="less" scoped>
#task-type-item{
  display: flex;
  align-items: center;

  span:hover{
    color: blue;
  }

  >:nth-child(1){
    cursor: pointer;
  }

  >:nth-child(2){
    cursor: pointer;
    margin-right: auto;
  }

  >:nth-child(3){
    cursor: pointer;
  }

  >:nth-child(4){
    cursor: pointer;
  }
}
</style>
