<template>
  <div id="template">
    <h1>template</h1>
    <el-divider />
    <h2>常用</h2>
    <div id="common">
      <div
        v-for="item in common"
        :key="item.id"
      >
        <div id="item">
          <div>
            {{ item.icon }}
          </div>
          <div>
            {{ item.name }}
          </div>
        </div>
      </div>
      <el-button @click="addCommon">
        add
      </el-button>
    </div>
    <el-divider />
    <h2>自定义</h2>
    <div id="custom">
      <div
        v-for="item in custom"
        :key="item.id"
      >
        <div>
          <div>
            {{ item.icon }}
          </div>
          <div>
            {{ item.name }}
          </div>
        </div>
      </div>
      <el-button @click="addCustom">
        add
      </el-button>
    </div>
  </div>
</template>

<script>
import { customTaskTemplateMgr, commonTaskTemplateMgr } from '@/store/TaskTemplateMgr'

export default {
  name: 'Template',
  setup () {
    const common = commonTaskTemplateMgr.data
    const custom = customTaskTemplateMgr.data

    const addCommon = () => {
      commonTaskTemplateMgr.add({
        id: 3,
        name: 'c',
        icon: 'c'
      })
    }

    const addCustom = () => {
      customTaskTemplateMgr.add({
        id: 3,
        name: 'cc',
        icon: 'cc'
      })
    }

    return {
      common,
      custom,
      addCommon,
      addCustom
    }
  }
}
</script>

<style lang="less" scoped>
#template {

  #common, #custom {
    display: flex;
    flex-direction: row;
    overflow: auto;

    #item{
      padding: 0 50px;
    }
  }
}
</style>
