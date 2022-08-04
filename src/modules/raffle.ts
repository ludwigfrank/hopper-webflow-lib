/* import InputStepper from '../classes/components/InputStepper'
;(function raffle() {
  const updateModalValues = (value: number, $element: JQuery) => {
    if (isNaN(value)) value = 1

    // Update the header carrot cash value
    $element.find('[bun-ref="carrot-cash-value"]').text(value + '.00')
    $element
      .find('[bun-ref="submit-button"]')
      .attr('value', `Buy for $ ${(value * 0.99).toFixed(2)}`)
    $element
      .find('.hpm-reward-item__rich-text strong')
      .first()
      .text(value + 'x ')
  }

  $('[bun-element="raffle-ticket-modal"]').each(function (index, element) {
    const stepperRef = $(this).find('[bun-element="bun-input-stepper"]')

    const stepper = new InputStepper(stepperRef, {
      onUpdate: (value) => {
        updateModalValues(value, $(this))
      },
    })
  })
})() */

import { RaffleTicketModal } from '../classes/containers/RaffleTicket'

RaffleTicketModal.$elementRefs.each(function () {
  const raffleTicketModal = new RaffleTicketModal($(this))

  console.log(RaffleTicketModal)
})
