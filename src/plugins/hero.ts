import Countdown from '../classes/components/Countdown'

const pluginHero = () => {
  const now = Date.now()

  // If the deal is over, redirect to deal over page
  if (now > window.appStore.dateTime.endStamp) {
  } else {
    // Hide all heros
    $('div[data-ref="cms-hero"]').closest('div[data-ref="ref"]').hide()

    const { startStamp, endStamp } = window.appStore.dateTime
    const { getMsFromString } = window.util

    const activeHero = $('div[data-ref="cms-hero"]')
      .toArray()
      .reduce((aElement, bElement, ind) => {
        const aStart = startStamp + getMsFromString($(aElement).data().delayiso)
        const bStart = startStamp + getMsFromString($(bElement).data().delayiso)

        // Both values a valid
        if (aStart < now && bStart < now)
          return aStart > bStart ? aElement : bElement

        // Return the smaller value if one of them is larger
        return aStart < bStart ? aElement : bElement
      })

    $(activeHero).closest('div[data-ref="ref"]').show()

    $('.hp-page-hero-item').each(function () {
      new Countdown($(this).find('[bun-element="countdown"]'), {
        start: startStamp,
        end: endStamp,
      })
    })
  }
}
pluginHero()
