import transform from '../base'

transform.path = 'plan/'

export const getUrl = transform.invoke('getAllUnlimitedPlan')
export const addUrl = transform.invoke('addPlan')
export const removeUrl = transform.invoke('removePlan')
export const updateUrl = transform.invoke('updatePlan')
