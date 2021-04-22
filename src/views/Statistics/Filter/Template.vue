<script>
import { resolveComponent, h, provide } from 'vue'
import Name from './Name'
import Type from './Type'
import Rate from './Rate'
import Time from './Time'

export default {
  name: 'TemplateFilter',
  components: {
    Name,
    Type,
    Rate,
    Time
  },
  props: {
    name: {
      type: String,
      default: ''
    },
    data: {
      type: Object,
      default: () => { return {} }
    }
  },
  setup (props) {
    provide('data', props.data)
    return () => h(resolveComponent(props.name))
  }
}
</script>

<style scoped>

</style>
