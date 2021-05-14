<template>
  <div
    id="unlimited-plan-item"
    @click="onClick"
  >
    <div id="task-type">
      {{ taskTypeRootName }}
    </div>
    <div>
      {{ data.planName }}
    </div>
  </div>
</template>

<script>
import { getTaskTypeRootName } from '@/utils/taskType'
import planDetails from '@/store/planDetails'
export default {
  name: 'UnlimitedPlanItem',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  setup (props) {
    const taskTypeRootName = getTaskTypeRootName(props.data.typeList)

    const onClick = () => {
      planDetails.set(props.data)
    }

    return {
      taskTypeRootName,
      onClick
    }
  }
}
</script>

<style lang="less" scoped>
#unlimited-plan-item{
  cursor: pointer;

  &:hover >:nth-child(2){
    color: blue;
  }
}
</style>
