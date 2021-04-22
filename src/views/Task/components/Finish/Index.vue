<template>
  <div>
    {{ type }}<br>
    {{ name }}<br>
    {{ startTime }}<br>
    {{ endTime }}<br>
    <el-input
      type="textarea"
      :rows="5"
      placeholder="请输入内容"
      v-model="note"
    />
    <div
      v-for="(item, index) in subTasks"
      :key="index"
      v-once
    >
      {{ item.text }} | {{ item.time }}<br>
    </div>
    投入度：<el-rate v-model="devotion" />
    满意度：<el-rate v-model="satisfaction" />
    <el-button @click="end">
      完成
    </el-button>
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { onMounted, ref } from 'vue'
import { getStateRef } from '@/utils'

export default {
  name: 'Finish',
  setup () {
    const route = useRoute()
    const router = useRouter()
    const state = useStore().state

    const mode = ref('')

    const end = () => {
      router.push({
        name: 'Start'
      })
    }

    onMounted(() => {
      mode.value = route.params.mode
    })

    return {
      type: state.type,
      name: state.name,
      subTasks: state.subTasks,
      startTime: state.startTime,
      endTime: state.endTime,
      note: getStateRef(state, 'note'),
      devotion: getStateRef(state, 'devotion'),
      satisfaction: getStateRef(state, 'satisfaction'),
      end
    }
  }
}
</script>

<style scoped>

</style>
