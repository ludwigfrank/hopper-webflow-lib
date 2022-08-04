import Element from '../core/Element'
import Timer from '../utility/Timer'
import { getTimeStamp } from '../../util/date'
import { getElementReferences } from '../../util/misc'

type CountdownOpts = {
  start?: number | string
  end: number | string
}

const _elementId = 'countdown'
export default class Countdown extends Element {
  static elementId: string = _elementId
  static $elementRefs = getElementReferences(_elementId)
  static instances: Map<string, Countdown> = new Map()

  public timer: Timer

  refs: { [key: string]: JQuery }
  key: string

  constructor(public elementRef: JQuery, public opts: CountdownOpts) {
    super(elementRef)

    this.initializeTimer(opts)

    this.refs = {
      text: this.elementRef.find('[bun-text="countdown"]'),
      styled: this.elementRef
        .find('[bun-styled="status"]')
        .add(this.elementRef),
    }

    Countdown.instances.set(this.key, this)

    // Initialize the timer
    $(document).ready(() => {
      this.update()
    })
  }

  initializeTimer(props: CountdownOpts) {
    if (props.start && props.end) {
      this.timer = new Timer(getTimeStamp(props.end), getTimeStamp(props.start))
    } else {
      this.timer = new Timer(getTimeStamp(props.end))
    }
  }

  set(props: CountdownOpts) {
    this.timer.end = parseInt(props.end as string)
  }

  update() {
    this.timer.onUpdate(({ text, status }) => {
      // Set the timer text to the value (e.g. "1d left")
      this.refs.text.text(text)
      // Set the classes of all elements with the custom attribute bun-ref="styled"
      this.updateClasses([status], 'status')
    })
  }
}
