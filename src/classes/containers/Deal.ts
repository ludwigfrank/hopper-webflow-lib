import { getElementReferences } from '../../util/misc'
import Container from '../core/Container'

type DealData = {
  slug: string
  airportCode: string
  extensionDeeplink: string
}

export enum DealStatus {
  Running = 'running',
  Upcoming = 'upcoming',
  Passed = 'passed',
}

export enum FreezeStatus {
  Disabled = 'disabled',
  Enabled = 'enabled',
  Frozen = 'frozen',
}

type DealOpts = {
  isFreezeEnabled?: boolean
  isFrozen?: boolean
}

export default class Deal extends Container<DealData> {
  static elementId = 'deal'
  static $elementRefs = getElementReferences(Deal.elementId)

  private _freezeStatus: FreezeStatus

  constructor(public elementRef: JQuery, public opts: DealOpts) {
    super(elementRef)
  }

  set freezeStatus(status: FreezeStatus) {
    console.log(status)
    this.updateClasses([status], 'status-freeze')
    this._freezeStatus = status
  }

  get freezeStatus() {
    return this._freezeStatus
  }
}
