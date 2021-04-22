<template>
  <main>
    <div id="content">
      <slot />
    </div>
    <el-button
      size="mini"
      id="and"
      @click="$emit('add')"
    >
      and
    </el-button>
    <i
      id="remove"
      @click="$emit('remove')"
      class="el-icon-close"
    />
  </main>
</template>

<script>
export default {
  name: 'BaseFilter',
  emits: ['add', 'remove'],
  setup () {
    return {
    }
  }
}
</script>

<style lang="less" scoped>
main {
  display: flex;
  flex-direction: row;
  align-items: center;

  #content {
    display: flex;
    flex-direction: row;
  }

  #and {

  }

  #remove:hover{
    color: dodgerblue;
    cursor: pointer;
  }
}
</style>
