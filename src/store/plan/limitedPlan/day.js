const state = () => ({
  orderLimitedPlanSet: [{
    id: 'o1',
    name: 'a',
    pos: {
      x: 100,
      y: 200
    }
  }, {
    id: 'o2',
    name: 'b',
    pos: {
      x: 200,
      y: 300
    }
  }, {
    id: 'o3',
    name: 'c',
    pos: {
      x: 300,
      y: 400
    }
  }, {
    id: 'o4',
    name: 'd',
    pos: {
      x: 400,
      y: 500
    }
  }, {
    id: 'o5',
    name: 'e',
    pos: {
      x: 600,
      y: 700
    }
  }, {
    id: 'o6',
    name: 'f',
    pos: {
      x: 800,
      y: 900
    }
  }],
  timeLimitedPlanSet: [{
    startTime: ['8:02'],
    startType: 0,
    endTime: ['9:00'],
    endType: 1,
    id: 't1',
    name: 'aa'
  }, {
    startTime: ['10:00', '11:30'],
    startType: 0,
    endTime: ['12:20', '13:10'],
    endType: 1,
    id: 't2',
    name: 'bb'
  }, {
    startTime: ['14:00'],
    startType: 0,
    endTime: [],
    endType: [],
    id: 't3',
    name: 'cc'
  }, {
    startTime: [],
    startType: [],
    endTime: ['15:50'],
    endType: 1,
    id: 't4',
    name: 'dd'
  }],
  unlimitedPlanSet: [{
    id: 'u1',
    name: 'aaa',
    priority: 1
  }],
  planRelation: {
    o1: ['o3', 't1'],
    o2: ['o3'],
    o3: ['o4', 'o5'],
    o4: ['o6'],
    o5: ['o6'],
    o6: [],
    t1: []
  }
})

const mutations = {

}

const actions = {
  init () {

  },
  add (context, payload) {
    // const { name, pos } = payload
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('done!')
      }, 3000)
    })
  },
  updatePosition (context, payload) {
    const { plan, x, y } = payload
    plan.pos.x = x
    plan.pos.y = y
    // axios
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
