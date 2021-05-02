<template>
  <div id="sub-tasks">
    <draggable
      :list="data"
      tag="transition-group"
      @start="drag=true"
      @end="drag=false"
      item-key="id"
      animation="300"
      handle=".el-icon-sort"
    >
      <template #item="{element}">
        <div id="sub-task">
          <i class="el-icon-sort" />
          <el-input
            class="text-input"
            v-model="element.name"
            placeholder="子任务名称"
            clearable
          />
          <div>
            <span class="expected-time">预期时间</span>
            <Input @input="element.expectedTime=$event" />
            <span>分钟</span>
          </div>
          <i
            class="el-icon-close"
            @click="remove(element)"
          />
        </div>
      </template>
    </draggable>
    <div id="button-group">
      <el-button
        type="primary"
        @click="add"
        class="el-icon-plus"
      />
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import Input from '@/components/Input'

export default {
  name: 'SubTasks',
  components: {
    draggable,
    Input
  },
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  setup (props) {
    const subTasks = props.data

    let id = 0
    const createItem = () => ({
      id: id++,
      name: '',
      time: 0,
      expectedTime: null
    })

    const add = () => {
      subTasks.push(createItem())
    }

    const remove = (subTask) => {
      let i = 0
      while (subTasks[i].id !== subTask.id) i++
      subTasks.splice(i, 1)
    }

    return {
      add,
      remove
    }
  }
}
</script>

<style lang="less" scoped>

#sub-task {
  display: flex;
  flex-direction: row;
  align-items: center;

  > :nth-last-child(2) {
    margin-right: auto;
  }

  .el-icon-sort, .el-icon-close {
    color: dimgrey;

    &:hover {
      color: aliceblue;
      cursor: pointer;
    }
  }

  .text-input {
    width: 20em;
  }
}

#button-group{
  display: flex;
  align-items: center;

  .el-button{
    width: 20em;
  }
}

</style>
