import { Calendar } from '@fullcalendar/core'
import zhLocale from '@fullcalendar/core/locales/zh-cn'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import planDetails from '@/store/planDetails'
import { findElement } from '@/utils/array'

const planDrawerProxy = {
  calendar: null,
  init (calendarEl) {
    this.calendar = this.initCalendar(calendarEl)
    this.calendar.render()
  },
  initCalendar (calendarEl) {
    return new Calendar(calendarEl, {
      locale: zhLocale,
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      editable: true,
      droppable: true,
      defaultAllDay: true,
      headerToolbar: {
        start: '',
        center: '',
        end: ''
      },
      eventClick (info) {
        planHandleProxy.onEventClick(info)
      },
      eventDrop (info) {
        planHandleProxy.onEventChange(info)
      },
      eventResize (info) {
        planHandleProxy.onEventChange(info)
      }
    })
  },
  renderEvents (date) {
    planHandleProxy.getData(date)
      .then(plans => {
        plans.forEach(plan => {
          this.calendar.addEvent(planHandleProxy.plan2Event(plan))
        })
      })
  },
  addEvent (event) {
    this.calendar.addEvent(event)
  },
  removeEvent (id) {
    this.calendar.getEventById(id).remove()
  }
}

const planHandleProxy = {
  store: null,
  state: null,
  init (store) {
    this.store = store
    this.state = store.state.limitedPlanWeek
  },
  plan2Event (plan) {
    return {
      id: plan.id,
      title: plan.name,
      start: plan.startDate,
      end: plan.endDate
    }
  },
  onDateClick (cb) {
    planDrawerProxy.calendar.setOption('dateClick', cb)
  },
  onEventClick (info) {
    const plan = planHandleProxy.getPlanByEventId(info.event.id)
    planDetails.set(plan)
  },
  onEventChange (info) {
    const plan = planHandleProxy.getPlanByEventId(info.event.id)
    this.updatePlan(plan)
  },
  setDate (date) {
    const day = date.getDate() + 6
    date = date.setDate(day)
    planDrawerProxy.calendar.gotoDate(date)
    planDrawerProxy.renderEvents(date)
  },
  getData (date) {
    return new Promise(resolve => {
      this.store.dispatch('limitedPlanWeek/init', date)
        .then(_ => {
          resolve(this.state.data)
        })
    })
  },
  getPlanByEventId (id) {
    const i = findElement(this.state.data, id, 'id')
    return this.state.data[i]
  },
  addPlan (plan) {
    this.store.dispatch('limitedPlanWeek/add', plan)
      .then(id => {
        planDrawerProxy.addEvent(this.plan2Event({ id, ...plan }))
      })
  },
  removePlan (id) {
    this.store.dispatch('limitedPlanWeek/remove', id)
      .then(_ => {
        planDrawerProxy.removeEvent(id)
      })
  },
  updatePlan (plan) {
    this.store.dispatch('limitedPlanWeek/update', plan)
  }
}

export { planDrawerProxy, planHandleProxy }
