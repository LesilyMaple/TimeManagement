class Task {
  constructor ({
    taskType,
    name,
    startTime,
    endTime,
    workTime,
    note,
    devotion,
    satisfaction
  }) {
    this.taskType = taskType
    this.name = name
    this.startTime = startTime
    this.endTime = endTime
    this.workTime = workTime
    this.note = note
    this.devotion = devotion
    this.satisfaction = satisfaction
  }
}

export default Task
