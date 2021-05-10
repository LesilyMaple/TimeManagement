import { Time } from '@/interface/time'
import dayjs from 'dayjs'

class TimeManager {
  static string2time (str) {
    const tmp = str.split(':')
    const hour = parseInt(tmp[0])
    const minute = parseInt(tmp[1])
    return new Time(hour, minute)
  }

  static in (time, startTime, endTime) {
    return (Time.compare(time, startTime) === 1) && (Time.compare(endTime, time) === 1)
  }

  static second2Minute (second) {
    return Math.floor(second / 60)
  }

  static clearDate (dayjsTime) {
    return dayjsTime.year(1970).month(0).date(1)
  }

  static timestamp2time (timestamp) {
    return dayjs(timestamp).format('HH:mm')
  }

  static timestamp2date (timestamp) {
    return dayjs(timestamp).format('YYYY/MM/DD')
  }
}

export default TimeManager
