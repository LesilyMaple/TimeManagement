<template>
  <el-container>
    <el-aside>
      <Nav />
    </el-aside>
    <el-main>
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </el-main>
  </el-container>
</template>

<script>
import Nav from '@/components/Nav'
import { useStore } from 'vuex'
import { init } from '@/utils/taskType'

export default {
  components: {
    Nav
  },
  setup () {
    const store = useStore()
    init(store.state.taskType.data)
  }
}

</script>

<style lang="less">
*{
  margin: 0;
  padding: 0;
}

html {
  height: 100%;
  background-color: whitesmoke;
}

body {
  height: 100%;
  margin: 0;
}

@side-width: 150px;

.el-container{
  height: 100%;
}

.el-aside {
  height: 100%;
  width: @side-width!important;
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
}

.el-main {
  height: 100%;
  position: absolute;
  left: @side-width;
  right: 0;
  top: 0;
  bottom: 0;
  padding: 0 !important;
  overflow-y: auto;
}
</style>
