<template>
  <input
    :value="modelValue"
    ref="inputElement"
    :class="[inputClass]"
    @input="handleInput"
  >
</template>

<script>
import { ref } from 'vue'
import { twoWayBinding } from '@/utils'
export default {
  name: 'Input',
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    validate: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue'],
  setup (props, ctx) {
    const inputElement = ref(null)
    const inputClass = ref('')
    const inputText = twoWayBinding(props, ctx)

    const handleInput = () => {
      const input = inputElement.value.value
      inputText.value = validate(input)
    }

    const validateNumber = (input) => {
      const reg = /^\s*[0-9]*\s*$/
      if (reg.test(input)) {
        setDefault()
        return isNaN(parseInt(input)) ? null : parseInt(input)
      } else {
        setError()
        return input
      }
    }

    let validate = (input) => input
    switch (props.validate) {
      case '':
        break
      case 'number':
        validate = validateNumber
        break
      default:
        break
    }

    const setDefault = () => {
      inputClass.value = 'default'
    }

    const setError = () => {
      inputClass.value = 'error'
    }

    return {
      handleInput,
      inputClass,
      inputElement
    }
  }
}
</script>

<style lang="less" scoped>
input {
  outline: none;
  border-bottom: 1px solid black;
  border-top: 0;
  border-left: 0;
  border-right: 0;
  background-color: transparent;
  caret-color: #646464;
  box-shadow: 0 1px transparent;
  transition: 200ms;

  &:focus{
    border-color: rgb(64, 158, 255);
    box-shadow: 0 1px rgb(64, 158, 255);
  }
}
.error{
  border-color: red;

  &:focus{
    border-color: red;
    box-shadow: 0 1px red;
  }
}

.default{
  border-color: black;

  &:focus{
    border-color: rgb(64, 158, 255);
    box-shadow: 0 1px rgb(64, 158, 255);
  }
}
</style>
