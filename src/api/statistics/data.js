import transform from '../base'

transform.path = 'statistics/data/'

export const getDataUrl = transform.invoke('getAllData')
