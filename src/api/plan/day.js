import transform from '../base'

transform.path = 'plan/'

export const getUrl = transform.invoke('getPlanByDate')
export const addPlanUrl = transform.invoke('addPlan')
export const addRelationUrl = transform.invoke('addRelation')
export const removePlanUrl = transform.invoke('removePlan')
export const removeRelationUrl = transform.invoke('removeRelation')
export const updateOrderPlanUrl = transform.invoke('updateOrderPlan')
export const updateTimePlanUrl = transform.invoke('updateTimePlan')
export const updateRelationUrl = transform.invoke('updateRelation')
