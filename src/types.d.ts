import { EVENTS, TrackEventParams } from './plugins/events'
import { Utils } from './plugins/utils'
import { AppStore } from './store'

interface CustomEventMap {
  [EVENTS.Track]: CustomEvent<TrackEventParams>
}

type DealDropOptions = {
  startDate?: Date
  endDate?: Date
}

declare global {
  interface Window {
    opts: DealDropOptions
    appStore: AppStore
    util: Utils
    webkit?: any
  }

  interface Document {
    //adds definition to Document, but you can do the same with HTMLElement
    addEventListener<K extends keyof CustomEventMap>(
      type: K,
      listener: (this: Document, event: CustomEventMap[K]) => void
    ): void
  }
}

interface JQuery {
  closestBunRef(ref: string): JQuery
  closestBunElement(ref: string): JQuery
  updateClasses(mutations: string[], type: string): JQuery
}
