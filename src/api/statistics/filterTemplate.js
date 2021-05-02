import transform from '../base'

transform.path = 'statistics/filterTemplate/'

export const getFilterUrl = transform.invoke('getAllFilter')
export const addUrl = transform.invoke('add')
export const removeUrl = transform.invoke('remove')
export const updateUrl = transform.invoke('update')
