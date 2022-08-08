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
  { drawDate: new Date('2022-08-08T15:00Z'), winners: [] },
  { drawDate: new Date('2022-08-09T15:00Z'), winners: [] },
  { drawDate: new Date('2022-08-10T15:00Z'), winners: [] },
  { drawDate: new Date('2022-08-11T15:00Z'), winners: [] },
  { drawDate: new Date('2022-08-12T15:00Z'), winners: [] },
]

const initRaffle = (state: AppStore, opts: RaffleBoardOpts) => {
  const render = () => {}

  if (window.util.getUrlParam('RaffleUS') === 'Available') {
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

    const getUpcomingDrawDate = () => {
      const upcomingStamp = mockRaffleDraws
        .find((draw) => draw.drawDate.getTime() > Date.now())
        ?.drawDate.getTime()
      return upcomingStamp
        ? upcomingStamp
        : mockRaffleDraws[mockRaffleDraws.length - 1].drawDate.getTime()
    }

    const raffleBoardTimer = new Countdown(refs.$timer, {
      end: getUpcomingDrawDate(),
    })

    dispatchTrackEvent('viewed_raffle_tiles')

    $('[data-modal-trigger="ticket-share-locked"]').click(function () {
      dispatchTrackEvent('opened_sharing_view', {
        screen: 'DealDropsWebflow',
      })
    })

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
