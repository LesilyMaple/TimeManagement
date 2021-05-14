<template>
  <div id="sub-tasks">
    <h3>子任务</h3>
    <draggable
      :list="data"
      tag="transition-group"
      @start="drag=true"
      @end="drag=false"
      item-key="_id"
      animation="300"
      handle=".el-icon-sort"
    >
      <template #item="{element}">
        <div id="sub-task">
          <i class="el-icon-sort" />
          <el-input
            class="input-text"
            v-model="element.name"
            placeholder="子任务名称"
            clearable
          />
          <div class="expected-time">
            <span>预期时间</span>
            <Input
              v-model="element.expectedTime"
              validate="number"
              class="input-time"
            />
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
      <i class="el-icon-sort" />
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
      _id: id++,
      name: '',
      time: 0,
      expectedTime: null
    })

    const add = () => {
      subTasks.push(createItem())
    }

    const remove = (subTask) => {
      let i = 0
      while (subTasks[i]._id !== subTask._id) i++
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
@import "/src/assets/css/text.less";

h3{
  letter-spacing: 0.1em;
}

#sub-task {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 1em 0;

  .el-icon-sort, .el-icon-close {
    color: dimgrey;

    &:hover {
      color: aliceblue;
      cursor: pointer;
    }
  }

  .input-text {
    width: 20em;
  }

  .expected-time{
    margin: 0 1em;

    .input-time{
      width: 3em;
      margin-left: 0.3em;
      margin-right: 0.4em;
      text-align: center;
    }
  }
}

#button-group{
  display: flex;
  align-items: center;

  i{
    color: transparent;
  }

  .el-button{
    width: 20em;
  }
}

</style>
