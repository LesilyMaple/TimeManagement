<template>
  <div>
    <div
      v-for="item in data"
      :key="item"
    >
      <span>{{ item.name }}</span>
      <span>{{ item.expectedTime }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReadonlySubTasks',
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  setup () {

  }
}
</script>

<style scoped>

</style>
