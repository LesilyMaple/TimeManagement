import transform from './base'

transform.path = 'task/'

export const addTaskUrl = transform.invoke('addTask/')
export const getTemplateUrl = transform.invoke('getAllTemplate/')
export const addCommonTemplateUrl = transform.invoke('addCommonTemplate/')
export const addCustomTemplateUrl = transform.invoke('addCustomTemplate/')
export const removeCommonTemplateUrl = transform.invoke('removeCommonTemplate/')
export const removeCustomTemplateUrl = transform.invoke('removeCustomTemplate/')
export const updateCommonTemplateUrl = transform.invoke('updateCommonTemplate/')
export const updateCustomTemplateUrl = transform.invoke('updateCustomTemplate/')
