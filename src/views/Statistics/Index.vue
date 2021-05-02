<template>
  <main id="statistics">
    <ChartType />
    <Chart />
    <Filter />
    <FilterTemplate />
  </main>
</template>

<script>
import Chart from './Chart/Index'
import Filter from './Filter/Index'
import ChartType from './ChartType/Index'
import FilterTemplate from './FilterTemplate/Index'

export default {
  name: 'Statistics',
  components: {
    Chart,
    Filter,
    ChartType,
    FilterTemplate
  },
  setup () {

  }
}
</script>

<style lang="less" scoped>
@s:e('/');

#statistics{
  height: 100%;
  width: 100%;
  display: grid;
  grid-template: 5% 45% 50% @s 60% 40%;

  >:nth-child(1){
    grid-area: 1 @s 1 @s 2 @s 2;
  }
  >:nth-child(2){
    grid-area: 2 @s 1 @s 3 @s 2;
  }
  >:nth-child(3){
    grid-area: 1 @s 2 @s 3 @s 3;
  }
  >:nth-child(4){
    grid-area: 3 @s 2 @s 4 @s 3;
  }
}
</style>
