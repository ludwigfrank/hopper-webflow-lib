import Container from '../core/Container'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { getElementReferences } from '../../util/misc'
import Deal from './Deal'
dayjs.extend(duration)

type DealCollectionData = {
  slug: string
  delay: string
  duration: string
}

export enum CollectionStatus {
  Running = 'running',
  Upcoming = 'upcoming',
  Passed = 'passed',
}

type DealCollectionProps = {
  dealDropStartStamp: EpochTimeStamp
}
export default class Collection extends Container<DealCollectionData> {
  static elementId = 'deal-collection'
  static $elementRefs = $(`[bun-element="${this.elementId}"]`)

  private _collectionStart: number
  private _collectionEnd: number

  public deals: Deal[]

  public elementWrapperRef: JQuery

  constructor(public elementRef: JQuery) {
    super(elementRef)

    const { duration, delay } = this.cmsData
    const { startStamp } = window.appStore.dateTime
    const { getMsFromString } = window.util

    this._collectionStart = startStamp + getMsFromString(delay)
    this._collectionEnd = this._collectionStart + getMsFromString(duration)

    this.deals = this.elementRef
      .closest('.hp-deal-collection-wrapper')
      .find('[bun-element="deal"]')
      .toArray()
      .map((element) => new Deal($(element), {}))
  }

  get collectionStart() {
    return this._collectionStart
  }

  get collectionEnd() {
    return this._collectionEnd
  }

  get collectionStatus(): CollectionStatus {
    if (this.collectionStart > Date.now()) return CollectionStatus.Upcoming
    if (this.collectionStart < Date.now() && this.collectionEnd > Date.now())
      return CollectionStatus.Running
    return CollectionStatus.Passed
  }
}

export const collections = Collection.$elementRefs.toArray().map((element) => {
  return new Collection($(element))
})
