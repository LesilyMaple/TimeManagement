<template>
  <div id="task-main">
    <el-breadcrumb id="breadcrumb">
      <el-breadcrumb-item
        to="/task/start"
        replace
      >
        Start
      </el-breadcrumb-item>
      <el-breadcrumb-item
        v-if="$router.currentRoute.value.path==='/task/timing'||$router.currentRoute.value.path==='/task/finish'"
        to="/task/timing"
        replace
      >
        Timing
      </el-breadcrumb-item>
      <el-breadcrumb-item
        v-if="$router.currentRoute.value.path==='/task/finish'"
        replace
      >
        Finish
      </el-breadcrumb-item>
    </el-breadcrumb>
    <router-view />
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: 'Task',
  setup () {
    useRouter().push({
      name: 'Start'
    })
  }
}
</script>

<style lang="less" scoped>
#task-main{
  height: 100%;
}
#breadcrumb{
  position: absolute;
  top: 0;
  left: 0;
}
</style>
