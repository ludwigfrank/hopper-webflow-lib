import Countdown from '../classes/components/Countdown'
import { AppStore } from '../store'

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

  const refs = {
    $board: $('[bun-element="raffle-board"]'),
    $timer: $('[bun-element="raffle-board"]').find('[bun-element="countdown"]'),
  }

  const raffleBoardTimer = new Countdown(refs.$timer, {
    end: mockRaffleDraws[0].drawDate.getTime(),
  })
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
