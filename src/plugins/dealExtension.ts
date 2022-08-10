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

  const extendedParamVal = window.util.getUrlParam('extendedSales')
  const experimentEnabled =
    window.util.getUrlParam('SaleExtension') === 'Available'

  const newDealExpirationStamp =
    appStore.dateTime.endStamp + window.util.msIn.day

  if (experimentEnabled) {
    if (extendedParamVal) {
      refs.$dealExtensionElement.fadeIn()

      const extendedDealsCodes = decodeURIComponent(extendedParamVal).split(',')

      extendedDealsCodes.forEach((code: string) => {
        const deals = $(`[data-city-code=${code}]`).closest(
          '[bun-element="deal"]'
        )
        // Since we have collection item that need to be hidden too...
        deals.parent().hide()

        // Take on e of the deals and attach it to the collection of extended deals
        const deal = deals.eq(0)
        deal.find('.freeze-button').remove()

        function replaceQueryParam(param, newval, search) {
          var regex = new RegExp('([?;&])' + param + '[^&;]*[;&]?')
          var query = search.replace(regex, '$1').replace(/&$/, '')

          return (
            (query.length > 2 ? query + '&' : '?') +
            (newval ? param + '=' + newval : '')
          )
        }

        // Update the link with new time
        const aEl = deal.find('[bun-ref="card-link"]')
        const newHref = replaceQueryParam(
          'endtimestamp',
          newDealExpirationStamp,
          aEl.attr('href')
        )
        aEl.attr('href', newHref)

        // Move the deal to the collection
        refs.$dealExtensionItemsList.append(deal)

        // TODO: Update time left value
      })
    }

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
