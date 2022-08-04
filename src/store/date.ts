export type DateStore = {
  startStamp: number
  endStamp: number
}

export const dateStore: DateStore = {
  startStamp: Date.now(),
  endStamp: Date.now() + 10000,
}
