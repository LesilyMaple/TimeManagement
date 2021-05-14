<template>
  <div>
    <span>当前奖罚值</span>
    <span>{{ data }}</span>
  </div>
</template>

<script>
export default {
  name: 'CurrentRewardPoint',
  props: {
    data: {
      type: Number,
      required: true
    }
  },
  setup () {

  }
}
</script>

<style scoped>

</style>
