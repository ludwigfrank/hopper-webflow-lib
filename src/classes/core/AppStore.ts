import { getURLParam } from '../../util/misc'

const parseURIDate = (dateString: string): Date =>
  new Date(decodeURIComponent(dateString))

/* function getStartDate(props: { duration?: string; startdate: string }) {
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
  } else {
    throw Error('No valid date supplied.')
  }
}

function getEndDate(props: { enddate?: string }) {
  const { enddate } = props
  const endDateString = getURLParam('enddate')

  if (endDateString) {
    return new Date(decodeURIComponent(endDateString))
  } else if (enddate) {
    return new Date(enddate)
  } else {
    throw Error('No valid date supplied.')
  }
}

export default class AppStore {
  constructor() {}
} */
