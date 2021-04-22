// 模拟后台数据
const planSet = {
  orderLimitedPlanSet: [{
    id: '1',
    name: 'a',
    pos: {
      x: 100,
      y: 200
    }
  }, {
    id: '2',
    name: 'b',
    pos: {
      x: 200,
      y: 300
    }
  }, {
    id: '3',
    name: 'c',
    pos: {
      x: 300,
      y: 400
    }
  }, {
    id: '4',
    name: 'd',
    pos: {
      x: 400,
      y: 500
    }
  }, {
    id: '5',
    name: 'e',
    pos: {
      x: 600,
      y: 700
    }
  }, {
    id: '6',
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
    id: 111,
    name: 'aaa',
    priority: 1
  }]
}

// const planId = ['1', '2', '3', '4', '5', '6', 't1']
// const planRelation = [
//   [0, 0, 1, 0, 0, 0, 1],
//   [0, 0, 1, 0, 0, 0, 0],
//   [0, 0, 0, 1, 1, 0, 0],
//   [0, 0, 0, 0, 0, 1, 0],
//   [0, 0, 0, 0, 0, 1, 0],
//   [0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0]
// ]

const planRelation2 = {
  1: ['3', 't1'],
  2: ['3'],
  3: ['4', '5'],
  4: ['6'],
  5: ['6'],
  6: [],
  t1: []
}

export { planSet, planRelation2 }
