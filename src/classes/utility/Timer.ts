export enum TimerStatus {
  Running = 'running',
  Upcoming = 'upcoming',
  Passed = 'passed',
}

type TimerCallbackProps = {
  text: string
  status: TimerStatus
  remaining: number | null
}

const msHour = 3600000

const durationToString = (duration: number): string => {
  if (duration > msHour * 24) {
    // Return date in Dd Hh left
    const days = Math.floor(duration / (msHour * 24))
    const hours = Math.floor((duration % (msHour * 24)) / msHour)
    return `${days}d ${hours}h`
  } else {
    // Return date in HH:MM:SS
    return new Date(duration)
      .toISOString()
      .replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1')
  }
}

export default class Timer {
  constructor(
    private _end: EpochTimeStamp,
    private _start?: EpochTimeStamp | undefined,
    public callback?: Function
  ) {
    this._start = _start
    this._end = _end
  }

  set end(val: EpochTimeStamp) {
    this._end = val
  }

  get status() {
    if (Date.now() > this._end) return TimerStatus.Passed
    if (this._start && Date.now() > this._start) return TimerStatus.Running
    if (this._start && Date.now() < this._start) return TimerStatus.Upcoming
    return TimerStatus.Running
  }

  get remaining() {
    if (this.status === TimerStatus.Upcoming && this._start) {
      return this._start - Date.now()
    }

    if (this.status === TimerStatus.Passed) {
      return null
    }

    return this._end - Date.now()
  }

  onUpdate = (callback: (props: TimerCallbackProps) => void) => {
    let text: string
    let props = {
      status: this.status,
      remaining: this.remaining,
    }

    if (this.status === TimerStatus.Passed || this.remaining === null) {
      // If the timer has passed ...
      text = 'Oh you missed it'
      callback({ text, ...props })
      return
    } else {
      const isLongerThanADay = msHour * 24 < this.remaining

      if (this.status === TimerStatus.Running && this.remaining) {
        // If the timer is running ...
        text = durationToString(this.remaining) + ' left'
        callback({ text, ...props })
      } else if (this.status === TimerStatus.Upcoming && this.remaining) {
        // If the timer is upcoming ...
        text = 'In ' + durationToString(this.remaining)
        callback({ text, ...props })
      }

      setTimeout(
        () => {
          this.onUpdate(callback)
        },
        isLongerThanADay ? this.remaining % 3600000 : 1000
      )
    }
  }
}
