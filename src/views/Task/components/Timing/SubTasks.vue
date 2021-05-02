<template>
  <div id="timing-sub-tasks">
    <div
      v-for="item in data"
      :key="item"
    >
      <div>
        {{ item.text }}
      </div>
      <i
        class="el-icon--right"
        @click="enter(item)"
      />
      <div>

      </div>
      <div v-if="mode==='normal'">
        {{ item.time }}
      </div>
      <div v-else>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SubTasks',
  props: {
    data: {
      type: Array,
      required: true
    },
    mode: {
      type: String,
      required: true
    }
  },
  emits: ['enter'],
  setup (props, ctx) {
    const enter = (item) => {
      ctx.emit('enter', item)
    }
    return {
      enter
    }
  }
}
</script>

<style scoped>

</style>
