<template>
  <main id="filter">
    <TemplateGroup
      title="时间"
      name="Time"
      :data="times"
    />
    <TemplateGroup
      title="名称"
      name="Name"
      :data="names"
    />
    <TemplateGroup
      title="类型"
      name="Type"
      :data="types"
    />
    <TemplateGroup
      title="投入度"
      name="Rate"
      :data="devotions"
    />
    <TemplateGroup
      title="满意度"
      name="Rate"
      :data="satisfactions"
    />
    <el-button
      @click="apply"
      type="primary"
      size="mini"
    >
      应用
    </el-button>
    <el-button
      @click="inputNamePopup=true"
      type="primary"
      size="mini"
    >
      保存
    </el-button>
    <el-dialog
      title="提示"
      v-model="inputNamePopup"
      width="30%"
    >
      <div>模板名称：</div>
      <el-input v-model="name" />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="inputNamePopup = false">取 消</el-button>
          <el-button
            type="primary"
            @click="addFilterTemplate"
          >确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </main>
</template>

<script>
import TemplateGroup from './TemplateGroup'
import { OPERATOR } from '@/interface/enum'
import { useStore } from 'vuex'
import { reactive, ref } from 'vue'

export default {
  name: 'Filter',
  components: {
    TemplateGroup
  },
  setup () {
    const store = useStore()

    const names = reactive([{ name: 'a' }, { name: 'b' }])
    const types = reactive([{ not: false, type: 'study' }])
    const devotions = reactive([{ operator: OPERATOR.EQ, rate: 0 }])
    const satisfactions = reactive([{ operator: OPERATOR.EQ, rate: 0 }])
    const times = reactive([{ notDate: false, notTime: false }])

    const remove = () => {
      console.log('remove')
    }

    const add = () => {
      console.log('add')
    }

    const apply = () => {
      console.log('apply')
    }

    const name = ref('')
    const inputNamePopup = ref(false)

    const addFilterTemplate = () => {
      console.log(name.value)
      store.commit('statistics/addFilterTemplate', {
        name: name.value,
        names: names,
        types: types,
        devotions: devotions,
        satisfactions: satisfactions,
        times: times
      })
      inputNamePopup.value = false
    }

    return {
      names,
      types,
      devotions,
      satisfactions,
      times,
      remove,
      add,
      name,
      apply,
      inputNamePopup,
      addFilterTemplate
    }
  }
}
</script>

<style scoped>

</style>
