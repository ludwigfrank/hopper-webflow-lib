export enum EVENTS {
  Track = 'track',
}

export type TrackEventParams = {
  event: string
  properties: string
}

function onTrackEvent(e: CustomEvent<TrackEventParams>) {
  const { event, properties } = e.detail

  if (window.appStore.debug)
    console.log(`New event: ${EVENTS.Track}, ${e.detail.event}`)

  if (event && properties && window.webkit) {
    try {
      window.webkit.messageHandlers.track.postMessage({
        event,
        properties,
      })
    } catch (error) {
      console.log(error)
    }
  }
}

document.addEventListener(EVENTS.Track, onTrackEvent)

export function dispatchTrackEvent(event: string, properties?: Object) {
  if (!properties) properties = {}
  document.dispatchEvent(
    new CustomEvent(EVENTS.Track, {
      detail: {
        event: event,
        properties: properties,
      },
    })
  )
}
