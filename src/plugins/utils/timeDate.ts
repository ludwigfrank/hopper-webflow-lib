import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
dayjs.extend(duration)

export type TimeDateUtils = {
  getMsFromString: (iso8601: string) => number
  msIn: {
    hour: number
    day: number
  }
}

const timeDateUtils: TimeDateUtils = {
  getMsFromString: (iso8601) => {
    return dayjs.duration(iso8601).asMilliseconds()
  },
  msIn: {
    hour: 3600000,
    day: 3600000 * 24,
  },
}

export default timeDateUtils
