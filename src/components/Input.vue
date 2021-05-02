<template>
  <input
    ref="inputElement"
    @input="handleInput"
  >
</template>

<script>

import { ref } from 'vue'

export default {
  name: 'Input',
  emits: ['input'],
  setup (props, ctx) {
    const inputElement = ref(null)

    const handleInput = () => {
      const input = inputElement.value.value
      validate(input)
      ctx.emit('input', Number(input))
    }

    const validate = (input) => {
      const reg = /^\s*[0-9]*\s*$/
      if (reg.test(input)) {
        setDefault()
      } else {
        setError()
      }
    }

    const setDefault = () => {
      inputElement.value.style.borderColor = '#000'
      inputElement.value.style.color = '#000'
    }

    const setError = () => {
      inputElement.value.style.borderColor = 'red'
      inputElement.value.style.color = 'red'
    }

    return {
      handleInput,
      inputElement
    }
  }
}
</script>

<style lang="less" scoped>
input {
  outline: none;
  text-align: center;
  border-bottom: 1px solid #000;
  border-top: 0;
  border-left: 0;
  border-right: 0;
  background-color: transparent;
  width: 2em;
  transition: 200ms;
}
</style>
