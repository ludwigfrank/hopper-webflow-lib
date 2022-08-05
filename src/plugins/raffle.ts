import Countdown from '../classes/components/Countdown'
import { AppStore } from '../store'
import { dispatchTrackEvent } from './events'

type RaffleDraw = {
  drawDate: Date
  winners: any[]
}

type RaffleBoardOpts = {
  draws: RaffleDraw[]
  startStamp: number
}

const mockRaffleDrawings = [{}]

const mockRaffleDraws: RaffleDraw[] = [
  { drawDate: new Date('2022-08-08T10:00Z'), winners: [] },
  { drawDate: new Date('2022-08-03T10:00Z'), winners: [] },
  { drawDate: new Date('2022-08-04T10:00Z'), winners: [] },
  { drawDate: new Date('2022-08-05T10:00Z'), winners: [] },
  { drawDate: new Date('2022-08-06T10:00Z'), winners: [] },
]

const initRaffle = (state: AppStore, opts: RaffleBoardOpts) => {
  const render = () => {}

  if (window.util.getUrlParam('RaffleUS') === 'true') {
    $('[bun-ref="plugin-raffle"]').show()

    if (!window.util.getUrlParam('shareLink')) {
      $('[data-modal-trigger="ticket-share-locked"]').fadeOut()
    }

    const refs = {
      $board: $('[bun-element="raffle-board"]'),
      $timer: $('[bun-element="raffle-board"]').find(
        '[bun-element="countdown"]'
      ),
    }
    console.log('hello')
    const raffleBoardTimer = new Countdown(refs.$timer, {
      end: mockRaffleDraws[0].drawDate.getTime(),
    })

    dispatchTrackEvent('viewed_raffle_tiles')

    $('[data-modal-trigger="raffle-explainer-modal"]').click(function () {
      dispatchTrackEvent('tapped_raffle_how_does_it_work')
    })
  } else {
    $('[bun-ref="plugin-raffle"]').hide()
  }
}

try {
  initRaffle(window.appStore, {
    draws: mockRaffleDraws,
    startStamp: window.appStore.dateTime.startStamp,
  })
} catch (error) {
  // If anything goes wrong, hide the share club feature.
  // Don't break the all of the javascript
  console.log(error)
}
