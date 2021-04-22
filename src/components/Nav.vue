<template>
  <div id="root">
    <div id="avatar">
      avatar
    </div>
    <el-menu
      default-active="/task/start"
      router
    >
      <div>
        <el-menu-item
          index="/task/start"
          :disabled="currentRoute.path==='/task/timing'||currentRoute.path==='/task/finish'"
        >
          <i class="el-icon-s-order" />
          <template #title>
            任务
          </template>
        </el-menu-item>
        <el-menu-item index="/plan">
          <i class="el-icon-date" />
          <template #title>
            计划
          </template>
        </el-menu-item>
        <el-menu-item index="/statistics">
          <i class="el-icon-pie-chart" />
          <template #title>
            统计
          </template>
        </el-menu-item>
        <el-menu-item index="/rule">
          <i class="el-icon-document-delete" />
          <template #title>
            规则
          </template>
        </el-menu-item>
        <el-menu-item index="/reward">
          <i class="el-icon-s-shop" />
          <template #title>
            奖罚
          </template>
        </el-menu-item>
      </div>
      <div>
        <el-menu-item index="Settings">
          <i class="el-icon-setting" />
          <template #title>
            设置
          </template>
        </el-menu-item>
      </div>
    </el-menu>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  name: 'Nav',
  setup () {
    return {
      currentRoute: useRouter().currentRoute
    }
  }
}
</script>

<style lang="less" scoped>
*{
  width: 100%;
}

@avatar-height: 20%;

#root {
  height: 100%;
  position: relative;

  #avatar{
    position: absolute;
    left: 0;
    top: 0;
    height: @avatar-height;
  }

  .el-menu{
    height: 100%;
    box-sizing: border-box;
    position: relative;

    &:before{
      content: "avatar";
      height: @avatar-height;
    }

    &>div:nth-child(1) {
      display: flex;
      flex-direction: column;
    }

    &>div:nth-child(2) {
      display: flex;
      flex-direction: column-reverse;
      position: absolute;
      bottom: 0;
      left: 0;
    }
  }
}

.el-menu-item{
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
