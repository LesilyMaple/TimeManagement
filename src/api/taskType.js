import transform from './base'

transform.path = 'plantype/'

export const getUrl = transform.invoke('getallplantype/')
export const updateNameUrl = transform.invoke('updateplantypename/')
export const addUrl = transform.invoke('addplantype/')
export const removeUrl = transform.invoke('deleteplantype/')
