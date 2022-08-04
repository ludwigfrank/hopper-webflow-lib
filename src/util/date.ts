export function getTimeStamp(date: number | string): number {
  if (typeof date === 'string') {
    // Only allow GMT timezone
    if (!date.includes('GMT') || !date.includes('Z')) {
      throw Error('Please provide the date in GMT.')
    }

    return Date.parse(date)
  }

  return date
}

/* import { getURLParam } from './misc'
import dayjs, { duration } from 'dayjs'
dayjs.extend(duration)


export function getStartDate(props: { duration?: string; startdate?: string }) {
  const { duration, startdate } = props
  const startDateString = getURLParam('startdate')
  const endDateString = getURLParam('enddate')

  if (startDateString !== null) {
    return new Date(decodeURIComponent(startDateString))
  } else if (duration && endDateString) {
    const endDate = new Date(decodeURIComponent(endDateString)).getTime()
    return new Date(endDate - dayjs.duration(duration).asMilliseconds())
  } else if (startdate) {
    return new Date(startdate)
  }
}

const getEndDate = ({ enddate }) => {
  if (getURLParam('enddate')) {
    return new Date(decodeURIComponent(getURLParam('enddate')))
  } else {
    return new Date(enddate)
  }
}
 */
