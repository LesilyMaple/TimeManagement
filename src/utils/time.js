import { Time } from '@/interface/time'

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
}

export default TimeManager
