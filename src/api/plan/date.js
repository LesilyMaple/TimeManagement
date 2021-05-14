import transform from '../base'

transform.path = 'plan/'

export const getUrl = transform.invoke('getDatePlan')
export const addUrl = transform.invoke('addDatePlan')
export const removeUrl = transform.invoke('removeDatePlan')
export const updateUrl = transform.invoke('updateDatePlan')
