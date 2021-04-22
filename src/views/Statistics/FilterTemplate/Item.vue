<template>
  <main>
    {{ data.name }}
  </main>
</template>

<script>
import { useStore } from 'vuex'
export default {
  name: 'FilterTemplateItem',
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  setup (props) {
    const store = useStore()
    return {
      store
    }
  }
}
</script>

<style scoped>

</style>
