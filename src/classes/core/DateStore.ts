import { getURLParam } from '../../util'

const parseURIDateString = (dateString: string): Date =>
  new Date(decodeURIComponent(dateString))

const dateFromString = (d: string): Date => {
  return new Date(d)
}

export class DateStore {
  public startDateStamp: number
  public endDateStamp: number

  constructor(opts: {
    startDateString?: string
    endDateString?: string
    durationISOString?: string
  }) {
    if (opts.startDateString && opts.endDateString) {
      this.startDateStamp = dateFromString(opts.startDateString).getTime()
      this.endDateStamp = dateFromString(opts.endDateString).getTime()
    }
  }
}
