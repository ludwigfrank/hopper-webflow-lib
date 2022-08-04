import { AppStore } from '../../store'
import { getURLParam } from '../../util/misc'

export default function initDealExtension(state: AppStore): void {
  console.log('Loaded module: Deal Extensions')

  const refs = {
    $dealExtensionWrapper: $('[bun-ref="deal-extension--wrapper"]'),
  }

  const frozenUrlParamValue = getURLParam('frozen')
  if (frozenUrlParamValue === null)
    throw Error('Add "frozen" to the url parameters')

  const extendedDealsCodes = decodeURIComponent(frozenUrlParamValue).split(',')

  extendedDealsCodes.forEach((code: string) => {
    // Take the first deal that matches the code
    const deal = $(`[data-airport-code=${code}]`)
      .closest('[bun-element="deal"]')
      .detach()

    deal.find('.freeze-button').hide()
    // Move the deal to the collection
    refs.$dealExtensionWrapper.append(deal)
  })
}
