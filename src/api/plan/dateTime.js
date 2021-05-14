import transform from '../base'

transform.path = 'plan/'

export const getUrl = transform.invoke('getDateTimePlan')
export const addPlanUrl = transform.invoke('addDateTimePlan')
export const addRelationUrl = transform.invoke('addRelation')
export const removePlanUrl = transform.invoke('removeDateTimePlan')
export const removeRelationUrl = transform.invoke('removeRelation')
export const updatePlanUrl = transform.invoke('updateDateTimePlan')
export const updateRelationUrl = transform.invoke('updateRelation')
export const updatePositionUrl = transform.invoke('updatePlanPos')
