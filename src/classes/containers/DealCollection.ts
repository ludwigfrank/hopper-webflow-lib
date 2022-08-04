import Container from '../core/Container'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { getElementReferences } from '../../util/misc'
dayjs.extend(duration)

type DealCollectionData = {
  slug: string
  delay: string
  duration: string
}

type DealCollectionProps = {
  dealDropStartStamp: EpochTimeStamp
}

export default class Collection extends Container<DealCollectionData> {
  static elementId = 'deal-collection'
  static $elementRefs = $(`[bun-element="${this.elementId}"]`)

  private _collectionStart: number
  private _collectionEnd: number

  public elementWrapperRef: JQuery

  constructor(public elementRef: JQuery) {
    super(elementRef)

    const { duration, delay } = this.cmsData
    const { startStamp } = window.appStore.dateTime
    const { getMsFromString } = window.util

    this._collectionStart = startStamp + getMsFromString(delay)
    this._collectionEnd = this._collectionStart + getMsFromString(duration)
  }

  get collectionStart() {
    return this._collectionStart
  }

  get collectionEnd() {
    return this._collectionEnd
  }
}
