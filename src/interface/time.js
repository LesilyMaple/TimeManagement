export class Time {
  hour
  minute

  constructor (hour, minute) {
    this.hour = hour
    this.minute = minute
  }

  static compare (time1, time2) {
    if (time1.hour > time2.hour) { return 1 }
    if (time1.hour < time2.hour) { return -1 }
    if (time1.minute > time2.minute) { return 1 }
    if (time1.minute < time2.minute) { return -1 }
    return 0
  }
}

export class Date {
  year
  month
  day
}
