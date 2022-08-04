import Container from '../core/Container'
import { getElementReferences } from '../../util/misc'
import InputStepper from '../components/InputStepper'

type RaffleTicketData = {
  slug: string
  price: string
  credit: string
  quantity: string
}

enum ElementType {
  Modal = 'MODAL',
  Card = 'TRIGGER',
}

const referenceTimeStamp = 0

function financial(x) {
  return Number.parseFloat(x).toFixed(2)
}

export class RaffleTicketModal extends Container<RaffleTicketData> {
  static elementId = 'raffle-ticket-modal'

  // Select all elements with [bun-element="ELEMNT_ID"]
  static $elementRefs = getElementReferences(RaffleTicketModal.elementId)

  private _selectedQuantity: number = 1
  private _selectQuantityElement: InputStepper
  private _richTextContentHTML: string = ''

  constructor(public $elementRef: JQuery) {
    super($elementRef)

    this._selectQuantityElement = new InputStepper(
      this.getChildEl('bun-input-stepper'),
      {
        onUpdate: (selectedQuantity) => {
          this.selectedQuantity = selectedQuantity
        },
      }
    )

    this._richTextContentHTML = $elementRef.find('.hpm-modal__rich-text').html()
    this._update()
  }

  set selectedQuantity(quantity) {
    this._selectedQuantity = quantity
    this._update()
  }

  get selectedQuantity() {
    return this._selectedQuantity
  }

  private _update() {
    this.getChildRef('carrot-cash-value').text(this.selectedQuantity + '.00')

    const quantityRegex = new RegExp(`{quantity}`, 'g')
    const creditRegex = new RegExp(`{credit}`, 'g')

    const selectedQuantity =
      this.selectedQuantity > 1 ? this.selectedQuantity : 1

    this.$elementRef.find('.hpm-modal__rich-text').html(
      this._richTextContentHTML
        .replace(
          // Replace the original price with the one updated by quantity increments
          this.cmsData.credit,
          selectedQuantity.toString()
        )
        .replace(
          // Replace the credit a user gets
          creditRegex,
          financial(parseInt(this.cmsData.credit) * selectedQuantity).toString()
        )
        .replace(
          // Replace the qunatity of tickets
          quantityRegex,
          (selectedQuantity * Number(this.cmsData.quantity)).toString()
        )
    )
  }
}
