import Countdown from '../classes/components/Countdown'
import DealCollection from '../classes/containers/DealCollection'
import Deal, { FreezeStatus } from '../classes/containers/Deal'
import { DateStore } from '../classes/core/DateStore'

const dateStore = new DateStore({
  startDateString: '2022-07-27 12:00 GMT',
  endDateString: '202-08-01 12:00 GMT',
})

export const updateDealCollections = () => {
  DealCollection.$elementRefs.each(function () {
    const dealCollection = new DealCollection($(this))

    new Countdown(dealCollection.getChildEl(Countdown.elementId), {
      end: dealCollection.collectionEnd,
      start: dealCollection.collectionStart,
    })

    dealCollection.getChildEl(Deal.elementId, true).each(function () {
      const deal = new Deal($(this), {})

      // Make the countdown class updates available to all children
      new Countdown($(this).parent(), {
        end: dealCollection.collectionEnd,
        start: dealCollection.collectionStart,
      })

      const $linkElement = deal.getChildEl('.hp-card__link')
      const href = $linkElement.attr('href')
      console.log(deal)

      const url = new URL(window.location.origin + href)
      url.searchParams.append(
        'endtimestamp',
        dealCollection.collectionEnd.toString()
      )

      $linkElement.attr('href', url.href)
    })
  })
}

try {
  updateDealCollections()
} catch (error) {
  // If anything goes wrong, hide the share club feature.
  // Don't break the all of the javascript
  console.log(error)
}
