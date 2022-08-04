import { getBun, getBunRef, getElementReferences } from '../util/misc'

export const updateModals = () => {
  console.log('Module Loaded: Modals')

  const $modalWrapper = $('[bun-ref="modal-wrapper"]')

  $('[data-modal-trigger]').each(function () {
    const { modalTrigger } = $(this).data()
    const $modal = $(`[data-modal-target="${modalTrigger}"]`).closest(
      '[bun-ref="modal"]'
    )

    $(this)
      .closest('[bun-ref="modal-trigger"]')
      .click(() => {
        console.log(`Modal trigger clicked: ${this}`)
        $modal.removeClass('hidden')
        $modalWrapper.removeClass('hidden')
      })
  })

  $('[bun-ref="modal-close-button"]').click(function () {
    $(this).closest('[bun-ref="moda]').addClass('hidden')
    $modalWrapper.addClass('hidden')
  })
}

try {
  updateModals()
} catch (error) {
  // If anything goes wrong, hide the share club feature.
  // Don't break the all of the javascript
  console.log(error)
}
