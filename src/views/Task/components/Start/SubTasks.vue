<template>
  <div>
    <!-- Note: 不要用v-model，用list -->
    <draggable
      :list="subTasks"
      tag="transition-group"
      @start="drag=true"
      @end="drag=false"
      item-key="id"
      animation="300"
      handle=".el-icon-sort"
    >
      <template #item="{element, index}">
        <div id="sub-tasks">
          <i
            class="el-icon-sort"
          />
          <el-input
            :id="`input${index}`"
            placeholder="子任务名称"
            v-model="element.text"
            @keydown.tab.prevent
            @keyup.tab="onTab(index)"
            @keyup.enter.prevent="onEnter"
            @focus="onFocus(index)"
            clearable
          />
          <i
            class="el-icon-close"
            @click="remove(element)"
          />
        </div>
      </template>
    </draggable>
    <el-button
      type="primary"
      @click="add"
    >
      添加子任务
    </el-button>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import { nextTick } from 'vue'

export default {
  name: 'SubTasks',
  components: {
    draggable
  },
  props: ['dataSet'],
  setup (props) {
    const subTasks = props.dataSet

    let id = 0
    const createItem = () => ({
      id: id++,
      text: '',
      time: 0
    })

    const add = () => {
      subTasks.push(createItem())
    }

    const remove = (e) => {
      let i = 0
      while (subTasks[i].id !== e.id) i++
      subTasks.splice(i, 1)
    }

    /*
    * 扩展功能
    */

    /*
    * Enter：自动聚焦下一项子任务
    */
    let focusItem = 0
    const onFocus = (i) => {
      focusItem = i
    }

    const onEnter = () => {
      const i = (focusItem + 1) === subTasks.length ? focusItem : focusItem + 1
      document.getElementById(`input${i}`).focus()
    }

    /*
    * Tab：添加一个子任务
    */
    const onTab = (i) => {
      /*
      * Question
      * 这里的subTasks声明时是非代理对象，但是运行时打印结果是Proxy对象
      */
      subTasks.splice(i + 1, 0, createItem())
      nextTick(() => {
        document.getElementById(`input${i + 1}`).focus()
      })
    }

    /*
    * 子任务名重复检测
    */

    return {
      subTasks,
      add,
      remove,
      onFocus,
      onEnter,
      onTab
    }
  }
}
</script>

<style lang="less" scoped>
#sub-tasks {
  display: flex;
  flex-direction: row;
  align-items: center;

  .el-icon-sort, .el-icon-close {
    color: dimgrey;

    &:hover {
      color: aliceblue;
      cursor: pointer;
    }
  }
}

</style>
