import { createRouter, createWebHistory } from 'vue-router'
import Task from '@/views/Task/Index'
import Start from '@/views/Task/components/Start/Index'
import Timing from '@/views/Task/components/Timing/Index'
import Finish from '@/views/Task/components/Finish/Index'
import Statistics from '@/views/Statistics/Index'
import Plan from '@/views/Plan/Index'
import Reward from '@/views/Reward/Index'
import Rule from '@/views/Rule/components/Index'
import Settings from '@/views/Settings/Index'

const routes = [
  {
    path: '/task',
    name: 'Task',
    component: Task,
    alias: '/',
    children: [
      {
        path: 'start',
        name: 'Start',
        component: Start
      },
      {
        path: 'timing',
        name: 'Timing',
        component: Timing
      },
      {
        path: 'finish',
        name: 'Finish',
        component: Finish
      }
    ]
  },
  {
    path: '/statistics',
    name: 'Statistics',
    component: Statistics
  },
  {
    path: '/plan',
    name: 'Plan',
    component: Plan
  },
  {
    path: '/rule',
    name: 'Rule',
    component: Rule
  },
  {
    path: '/reward',
    name: 'Reward',
    component: Reward
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
