<template>
  <div id="task-template">
    <h1>模板</h1>
    <el-divider />
    <h2>常用</h2>
    <div
      id="common"
      class="card-container"
    >
      <div
        v-for="item in common"
        :key="item.id"
        class="card"
        @click="showDetail(item)"
      >
        <div>{{ getTaskTypeFullName(item.taskType) }}</div>
        <i class="el-icon-food" />
        <div>{{ item.name }}</div>
      </div>
      <el-button @click="addCommon">
        add
      </el-button>
    </div>
    <el-divider />
    <h2>自定义</h2>
    <div
      id="custom"
      class="card-container"
    >
      <div
        v-for="item in custom"
        :key="item.id"
        class="card"
        @click="showDetail(item)"
      >
        <div>
          {{ item.icon }}
        </div>
        <div>
          {{ item.name }}
        </div>
        <i
          class="el-icon-close"
          @click="removeCustom(item.id)"
        />
      </div>
      <el-button @click="addCustom">
        add
      </el-button>
    </div>
    <el-dialog
      title="任务模板"
      v-model="detailVisible"
      width="30%"
    >
      <div id="detail-panel">
        <div id="detail-name">
          <span>名称：</span>
          <el-input
            v-model="detail.name"
            size="mini"
          />
        </div>
        <div id="detail-time">
          <span>预期时间：</span>
          <el-input-number
            v-model="detail.time"
            size="mini"
          />
        </div>
        <div id="detail-sub-tasks">
          <SubTasks :data="detail.subTasks" />
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="detailVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="modify"
          >确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { reactive, ref } from 'vue'
import SubTasks from '@/components/SubTasks'
import { getTaskTypeFullName } from '@/utils/taskType'

export default {
  name: 'TaskTemplate',
  components: {
    SubTasks
  },
  setup () {
    const store = useStore()

    const common = store.state.task.common
    const custom = store.state.task.custom

    const addCommon = () => {

    }

    const addCustom = () => {

    }

    const removeCommon = (id) => {

    }

    const removeCustom = (id) => {

    }

    const detailVisible = ref(false)
    const detail = reactive({
      name: '',
      time: 0,
      subTasks: []
    })

    const showDetail = (item) => {
      detailVisible.value = true
      detail.name = item.name
      detail.time = item.time
      detail.subTasks = item.subTasks
    }

    const modify = () => {
      detailVisible.value = false
    }

    return {
      common,
      custom,
      addCommon,
      addCustom,
      removeCommon,
      removeCustom,
      detailVisible,
      detail,
      showDetail,
      modify,
      getTaskTypeFullName
    }
  }
}
</script>

<style lang="less" scoped>
#task-template {

  #common, #custom {
  }

  #detail-panel{
    >div{
      display: flex;
      align-items: center;
    }

    [id^='detail-']{
      span:nth-child(1){
        width: 15%;
      }
      .el-input{
        width: 85%;
      }
    }
  }

  .card-container{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    transition: 200ms;
  }

  .card{
    display: flex;
    flex-direction: column;
    width: 7em;
    border-radius: 1em;
    border: solid 2px #646464;
    padding: 0.5em;
    margin: 0.5em;
    cursor: pointer;

    >:nth-child(1){
      font-size: 0.8em;
    }
    >:nth-child(2){
      align-self: center;
    }
    >:nth-child(3){
      align-self: center;
    }
    i{
      font-size: 3em;
    }
  }
}
</style>
