<template>
  <div>
    <CurrentRewardPoint :data="point" />
  </div>
</template>

<script>
import { useStore } from 'vuex'
import CurrentRewardPoint from '@/views/Reward/CurrentRewardPoint'
export default {
  name: 'Reward',
  components: {
    CurrentRewardPoint
  },
  setup () {
    const store = useStore()
    const point = store.state.reward.point

    return {
      point
    }
  }
}
</script>

<style scoped>

</style>
