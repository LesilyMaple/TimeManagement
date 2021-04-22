<template>
  <main>
    <div
      v-once
      id="title"
    >
      {{ title }}
    </div>
    <div id="content">
      <div
        v-for="(item, index) in filterData"
        :key="item"
        id="for"
      >
        <Template
          :name="name"
          :data="filterData[index]"
          @add="add"
          @remove="remove(index)"
        />
      </div>
    </div>
  </main>
</template>

<script>
import Template from './Template'
import { OPERATOR } from '@/interface/enum'

export default {
  name: 'TemplateFilterGroup',
  components: {
    Template
  },
  props: {
    title: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    data: {
      type: Array,
      default: () => { return [{}] }
    }
  },
  setup (props) {
    const filterData = props.data

    let createNullData
    switch (props.name) {
      case 'Time':
        createNullData = () => {
          return {
            notDate: false,
            notTime: false
          }
        }
        break
      case 'Type':
        createNullData = () => {
          return {
            not: false,
            type: 'study'
          }
        }
        break
      case 'Name':
        createNullData = () => {
          return {
            name: ''
          }
        }
        break
      case 'Rate':
        createNullData = () => {
          return {
            operator: OPERATOR.EQ,
            rate: 3
          }
        }
        break
      default:
        createNullData = () => {}
    }

    const add = () => {
      filterData.push(createNullData())
    }
    const remove = (index) => {
      filterData.splice(index, 1)
      if (filterData.length === 0) {
        add()
      }
    }

    return {
      filterData,
      add,
      remove
    }
  }
}
</script>

<style scoped>
main{
  display: flex;
  flex-direction: row;
}

#title{
  margin: 0 0.5em;
}

#content{
  display: inline;
}
</style>
