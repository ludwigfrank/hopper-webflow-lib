import { getElementReferences } from '../../util/misc'
import Element from '../core/Element'

const _elementId = 'bun-input-stepper'
export default class InputStepper extends Element {
  static elementId = _elementId
  static $elementRefs = getElementReferences(_elementId)

  public key: string
  public refs: { [key: string]: JQuery }

  private _value: number = 1

  constructor(
    public $ref: JQuery,
    public opts: {
      onUpdate?: Function
      startValue?: number
      key?: string
    } = {}
  ) {
    super($ref)

    if (this.opts.startValue) {
      this.value = this.opts.startValue
    }

    this.refs = {
      $incrementButton: this.getChildRef('button-increment'),
      $decrementButton: this.getChildRef('button-decrement'),
      $inputField: this.getChildRef('input-field'),
    }

    this.refs.$inputField.val(this.value)

    this.refs.$incrementButton.click(() => {
      this.value = this.value += 1
    })

    this.refs.$decrementButton.click(() => {
      this.value = this.value -= 1
    })

    this.refs.$inputField.on('input', (event, element) => {
      const inputValue = $(event.target).val()

      if (inputValue !== undefined && typeof inputValue === 'string') {
        this.value = parseInt(inputValue)
      }
    })
  }

  get value() {
    return this._value
  }

  set value(newValue: number) {
    if (newValue < 1) newValue = 1

    this._value = newValue
    this.refs.$inputField.val(this._value)

    this.opts.onUpdate?.(this.value)
  }
}
