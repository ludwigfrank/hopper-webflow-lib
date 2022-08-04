import { getURLParam } from '../util'

const lootboxVersParam = getURLParam('LootBoxMVP')

$(document).ready(function () {
  if (lootboxVersParam) {
    if (lootboxVersParam.includes('v1')) {
      $('[data-ref="cms-loot-box"]').each(function () {
        const { slug } = $(this).data()
        if (slug.includes('v2')) $(this).closest('[hp-ref="loot-box"]').hide()

        if (slug.includes('v1')) {
          $(document).trigger(window.events.TRACK_EVENT, {
            event: 'viewed_lootbox_tile',
            properties: { offer_name: slug },
          })
        }
      })
    }

    if (lootboxVersParam.includes('v2')) {
      $('[data-ref="cms-loot-box"]').each(function () {
        const { slug } = $(this).data()
        if (slug.includes('v1')) $(this).closest('[hp-ref="loot-box"]').hide()

        if (slug.includes('v2')) {
          $(document).trigger(window.events.TRACK_EVENT, {
            event: 'viewed_lootbox_tile',
            properties: { offer_name: slug },
          })
        }
      })
    }
  } else {
    $('.hp-deal-collection__loot-boxes').hide()
  }
})
