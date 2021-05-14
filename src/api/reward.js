import transform from './base'

transform.path = 'reward/'

export const getUrl = transform.invoke('getAll/')
export const increasePointUrl = transform.invoke('increasePoint/')
export const decreasePointUrl = transform.invoke('decreasePoint/')
export const addSettingUrl = transform.invoke('addSetting/')
export const removeSettingUrl = transform.invoke('removeSetting/')
export const updateSettingUrl = transform.invoke('updateSetting/')
export const addRecordUrl = transform.invoke('addRecord/')
