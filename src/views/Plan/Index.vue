<template>
  <main id="plan-limited-plan">
    <LimitedPlan />
    <PlanDetails />
    <UnlimitedPlan />
  </main>
</template>

<script>
import LimitedPlan from './LimitedPlan/Index'
import PlanDetails from './PlanDetails/Index'
import UnlimitedPlan from './UnlimitedPlan/Index'

export default {
  name: 'Plan',
  components: {
    LimitedPlan,
    PlanDetails,
    UnlimitedPlan
  }
}
</script>

<style lang="less" scoped>
@s:e('/');

#plan-limited-plan{
  height: 100%;
  width: 100%;
  display: grid;
  grid-template:40% 60% @s 80% 20%;

  >:nth-child(1){
    grid-area: 1 @s 1 @s 3 @s 2;
  }

  >:nth-child(2){
    grid-area: 1 @s 2 @s 2 @s 3;
  }

  >:nth-child(3){
    grid-area: 2 @s 2 @s 3 @s 3;
  }
}
</style>
