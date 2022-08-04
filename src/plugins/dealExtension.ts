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

    console.log(extendedDealsCodes)

    extendedDealsCodes.forEach((code: string) => {
      // Take the first deal that matches the code
      const deal = $(`[data-airport-code=${code}]`)
        .eq(0)
        .closest('[bun-element="deal"]')
        .detach()

      deal.find('.freeze-button').hide()
      // Move the deal to the collection
      refs.$dealExtensionItemsList.append(deal)
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
