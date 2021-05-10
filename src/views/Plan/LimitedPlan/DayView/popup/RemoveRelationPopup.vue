<template>
  <el-dialog
    title="删除关系"
    v-model="show"
    width="30%"
  >
    <div>
      a
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="show = false">取 消</el-button>
        <el-button
          type="primary"
          @click="remove"
        >确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { twoWayBinding } from '@/utils'

export default {
  name: 'RemoveRelationPopup',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  setup (props, ctx) {
    const show = twoWayBinding(props, ctx)
    const remove = () => {

    }
    return {
      show,
      remove
    }
  }
}
</script>

<style scoped>

</style>
