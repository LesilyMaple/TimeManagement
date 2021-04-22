<template>
  <main id="breadcrumb">
    <div
      v-for="item in data"
      :key="item"
      class="item"
    >
      <span @click="changeParentType(item.name)">{{ item.name }}</span>
      <i class="el-icon-arrow-right" />
    </div>
  </main>
</template>

<script>
import { inject, reactive, watch } from 'vue'

export default {
  name: 'Breadcrumb',
  setup () {
    const parentType = inject('parentType')
    const data = reactive([parentType.value])

    watch(parentType, () => {
      // 因为该组件也会更改parentType，所以要忽略本组件的更改
      if (data[data.length - 1] === parentType.value) return
      // 剩下更改parentType的情况就只有Item中的点击事件了，这也是本该响应的
      data.push(parentType.value)
    })

    const changeParentType = (name) => {
      if (data[data.length - 1].name === name) {
        return
      }
      while (true) {
        if (data[data.length - 1].name !== name) {
          data.pop()
        } else {
          parentType.value = data[data.length - 1]
          return
        }
      }
    }

    return {
      data,
      changeParentType
    }
  }
}
</script>

<style lang="less" scoped>
#breadcrumb{
  display: flex;
  align-items: center;

  .item{
    display: flex;
    align-items: center;
  }

  span{
    cursor: default;
  }
  span:hover{
    color: blue;
    cursor: pointer;
  }

  .item:last-child>span:hover{
    color: black;
    cursor: default;
  }
  .item:last-child>i{
    display: none;
  }
}
</style>
