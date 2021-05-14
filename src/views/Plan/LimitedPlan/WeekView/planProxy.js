import { Calendar } from '@fullcalendar/core'
import zhLocale from '@fullcalendar/core/locales/zh-cn'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import dayjs from 'dayjs'
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
      initialView: 'dayGridWeek',
      editable: true,
      droppable: true,
      defaultAllDay: true,
      headerToolbar: {
        start: '',
        center: '',
        end: 'dayGridDay dayGridWeek dayGridMonth'
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
    this.state = store.state.datePlan
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
    console.log(info)
    const plan = planHandleProxy.getPlanByEventId(info.event.id)
    plan.startDate = info.event.start
    plan.endDate = info.event.end
    this.updatePlan(plan)
  },
  setDate (date) {
    date = dayjs(date).add(6, 'day')
    date = new Date(date.valueOf())
    planDrawerProxy.calendar.gotoDate(date)
    planDrawerProxy.renderEvents(date)
  },
  getData (date) {
    return new Promise(resolve => {
      this.store.dispatch('datePlan/init', date)
        .then(_ => {
          resolve(this.state.data)
        })
    })
  },
  getPlanByEventId (id) {
    console.log(this.state.data)
    const i = findElement(this.state.data, id, 'id')
    return this.state.data[i]
  },
  addPlan (plan) {
    this.store.dispatch('datePlan/add', plan)
      .then(id => {
        planDrawerProxy.addEvent(this.plan2Event({ id, ...plan }))
      })
  },
  removePlan (id) {
    this.store.dispatch('datePlan/remove', id)
      .then(_ => {
        planDrawerProxy.removeEvent(id)
      })
  },
  updatePlan (plan) {
    this.store.dispatch('datePlan/update', plan)
  }
}

export { planDrawerProxy, planHandleProxy }
