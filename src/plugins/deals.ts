import { AppStore } from '../store'
import Countdown from '../classes/components/Countdown'
import DealCollection from '../classes/containers/DealCollection'
import Deal from '../classes/containers/Deal'

const pluginDeals = (appStore: AppStore) => {
  const { startStamp, endStamp } = appStore.dateTime

  DealCollection.$elementRefs.each(function () {
    const dealCollection = new DealCollection($(this))
    const $dealCollectionWrapper = dealCollection.$ref.closest(
      '.hp-deal-collection-wrapper'
    )

    // Countdown to show remaining time
    new Countdown(dealCollection.getChildEl(Countdown.elementId), {
      end: dealCollection.collectionEnd,
      start: dealCollection.collectionStart,
    })

    // Countdown to update all classes of collection children
    new Countdown($dealCollectionWrapper, {
      end: dealCollection.collectionEnd,
      start: dealCollection.collectionStart,
    })

    // Move deal collection to the end of list if expired
    if (dealCollection.collectionEnd < Date.now()) {
      $dealCollectionWrapper.parent().append($dealCollectionWrapper)
    }

    $dealCollectionWrapper
      .find(`[bun-element="${Deal.elementId}"]`)
      .each(function () {
        const deal = new Deal($(this), {})

        const $linkElement = deal.$ref.find('[bun-ref="card-link"]').eq(0)
        const href = $linkElement.attr('href')

        const url = new URL(window.location.origin + href)
        url.searchParams.append(
          'endtimestamp',
          dealCollection.collectionEnd.toString()
        )

        // If we replace the link
        if (appStore.modules.replaceLinks) {
          const replaceLink = appStore.modules.replaceLinks.find((obj) => {
            return deal.cmsData.slug.includes(obj.selector)
          })
          if (replaceLink) {
            url.href = replaceLink.url
          }
        }

        $linkElement.attr('href', url.href)
      })
  })
}

try {
  pluginDeals(window.appStore)
} catch (error) {
  // If anything goes wrong, hide the share club feature.
  // Don't break the all of the javascript
  console.log(error)
}
