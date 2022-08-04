import { getMsFromString } from '../../plugins/utils/timeDate'
import sortBy from 'lodash/sortBy'

type Draw = {
  delay: string
  startTimeStamp?: number
}

type Winner = {
  firstName: string
  lastName: string
  price: 1 | 2 | 3
}

enum Status {
  UPCOMING = 'upcoming',
  RUNNING = 'running',
  PASSED = 'passed',
}

class Model {
  constructor(
    private _startTimeReference: EpochTimeStamp,
    private _draws: Draw[],
    private _winners: Winner[]
  ) {
    this._draws = _draws
    this._winners = _winners
    this._startTimeReference = _startTimeReference
  }

  get upcomingDraw(): Draw | undefined {
    return this.draws.find((draw) => {
      if (draw.startTimeStamp === undefined) return undefined
      return draw.startTimeStamp > Date.now()
    })
  }

  get status(): Status {
    const now = Date.now()
    if (this.draws[0].startTimeStamp! > Date.now()) return Status.UPCOMING

    if (
      this.draws[0].startTimeStamp! > Date.now() &&
      this.draws[this.draws.length - 1].startTimeStamp! > Date.now()
    ) {
      return Status.RUNNING
    }

    return Status.PASSED
  }

  get draws(): Draw[] {
    const draws = this._draws.map((draw: Draw): Draw => {
      return {
        ...draw,
        startTimeStamp: this._startTimeReference + getMsFromString(draw.delay),
      }
    })

    return sortBy(draws, function (d: Draw) {
      return d.startTimeStamp
    })
  }
}

class View extends Element {
  constructor() {
    super()
  }
}

class Controller {
  private _onStatusUpdatePromise: Promise<any>

  constructor(private model, private view) {
    this.model = model
    this.view = view
  }

  onStatusUpdate() {}
}

const raffleApp = new Controller(new Model(10, [], []), new View())

const p = new Model(10, [], [])

p.draws
