import { FreezeStatus } from '../classes/containers/Deal'
import Collection, {
  collections,
  CollectionStatus,
} from '../classes/containers/DealCollection'
import { AppStore } from '../store'

function pluginDealExtension(appStore: AppStore): void {
  console.log('Loaded module: Deal Extensions')

  const refs = {
    $dealExtensionItemsList: $('[bun-ref="deal-extension-items-list"]'),
    $dealExtensionElement: $('[bun-ref="deal-extension-element"]'),
  }

  const frozenUrlParamValue = window.util.getUrlParam('frozen')

  if (frozenUrlParamValue) {
    refs.$dealExtensionElement.fadeIn()

    const extendedDealsCodes =
      decodeURIComponent(frozenUrlParamValue).split(',')

    extendedDealsCodes.forEach((code: string) => {
      // Take the first deal that matches the code
      const deals = $(`[data-airport-code=${code}]`).closest(
        '[bun-element="deal"]'
      )

      deals.parent().hide()

      const deal = deals.eq(0)
      deal.find('.freeze-button').hide()
      // Move the deal to the collection
      refs.$dealExtensionItemsList.append(deal)

      // TODO: Update time left value
    })

    collections.forEach((collection) => {
      if (collection.collectionStatus === CollectionStatus.Running) {
        collection.deals.forEach((deal) => {
          deal.freezeStatus = FreezeStatus.Enabled
        })
      }
    })
  }
}

try {
  pluginDealExtension(window.appStore)
} catch (error) {
  // If anything goes wrong, hide the share club feature.
  // Don't break the all of the javascript
  console.log(error)
}
