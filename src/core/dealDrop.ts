export type DateDealDropOptions = {
  startTimeStamp: number
  endTimeStamp: number
}

export type CoreDealDropState = {}

export type InitialDealDropState = Partial<CoreDealDropState>
export type InitialDealDropOptions = Partial<DateDealDropOptions>

export type DealDropFeature = {
  getDefaultOptions?: (options: InitialDealDropOptions) => any
  getInitialState?: (initialstate: InitialDealDropState) => any
}

export type RaffleState = {}

export const Raffle: DealDropFeature = {
  getDefaultOptions: () => {},
  getInitialState: () => {},
}
