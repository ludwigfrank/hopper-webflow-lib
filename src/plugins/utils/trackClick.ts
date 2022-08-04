import { dispatchTrackEvent } from '../events'

$('[track-click]').each(function () {
  const trackEventName = $(this).attr('track-click') as string

  $(this)
    .closest('[bun-ref]')
    .click(function () {
      dispatchTrackEvent('tapped_' + trackEventName)
    })
})
