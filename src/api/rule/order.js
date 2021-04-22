import transform from '../base'

transform.path = 'rule/order/'

export const getUrl = transform.invoke('getAllRule')
export const addUrl = transform.invoke('add')
export const removeUrl = transform.invoke('remove')
export const updateUrl = transform.invoke('update')
