import Element from './Element'

export default class Container<T> extends Element {
  constructor(public elementRef: JQuery) {
    super(elementRef)
  }

  get cmsData(): T {
    const data = this.elementRef.find('[bun-data]').data() as T
    if (data === undefined) {
      throw Error(`No cms data field found for ${this.elementRef.html}.`)
    } else return data
  }
}

// allow parameter to be passed
