import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
dayjs.extend(duration)

export type TimeDateUtils = {
  getMsFromString: (iso8601: string) => number
}

const timeDateUtils: TimeDateUtils = {
  getMsFromString: (iso8601) => {
    return dayjs.duration(iso8601).asMilliseconds()
  },
}

export default timeDateUtils
