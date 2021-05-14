<template>
  <div id="unlimited-plan">
    <div>
      <Item
        v-for="item in noPriorityPlanSet"
        :key="item"
        :data="item"
      />
    </div>
    <div>
      <Item
        v-for="item in lowPriorityPlanSet"
        :key="item"
        :data="item"
      />
    </div>
    <div>
      <Item
        v-for="item in mediumPriorityPlanSet"
        :key="item"
        :data="item"
      />
    </div>
    <div>
      <Item
        v-for="item in highPriorityPlanSet"
        :key="item"
        :data="item"
      />
    </div>
  </div>
</template>

<script>
import Item from './Item'
import { useStore } from 'vuex'

export default {
  name: 'UnlimitedPlan',
  components: {
    Item
  },
  setup () {
    const state = useStore().state.unlimitedPlan
    const noPriorityPlanSet = state.no
    const lowPriorityPlanSet = state.low
    const mediumPriorityPlanSet = state.medium
    const highPriorityPlanSet = state.high

    return {
      noPriorityPlanSet,
      lowPriorityPlanSet,
      mediumPriorityPlanSet,
      highPriorityPlanSet
    }
  }
}
</script>

<style lang="less" scoped>
#unlimited-plan{
  display: flex;
  flex-direction: row;

  >div{
    display: flex;
    flex-direction: column;
  }
}
</style>
