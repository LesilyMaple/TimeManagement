<template>
  <div>
    <el-switch
      v-model="switchValue"
      active-text="普通"
      active-value="normal"
      active-color="#1E90FF"
      inactive-text="番茄"
      inactive-value="tomato"
      inactive-color="#FF6347"
      class="switch-style"
    />
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    const switchValue = ref('normal')
    return {
      switchValue
    }
  }
}
</script>

<style scoped>
.switch-style >>> .el-switch__label {
  position: absolute;
  display: none;
  font-weight: normal;
}

.switch-style >>> .el-switch__label * {
  user-select: none;
  font-size: 12px;
}

.switch-style >>> .el-switch__label--left {
  z-index: 9;
  left: 22px;
  color: #fff;
}

.switch-style >>> .el-switch__label--right {
  z-index: 9;
  color: #fff;
}

.switch-style >>> .el-switch__label.is-active {
  display: block;
  height: 30px;
  line-height: 30px;
}

>>> .switch-style.el-switch .el-switch__core, .el-switch .el-switch__label {
  width: 60px !important;
}

.el-switch, .el-switch__core {
  height: 30px;
  line-height: 30px;
}

.el-switch__core {
  border-radius: 15px;
}

.el-switch__core:after {
  width: 20px;
  height: 20px;
  top: 4px;
  left: 3px;
  z-index: 10;
}

.el-switch.is-checked .el-switch__core::after {
  margin-left: -23px;
}
</style>
