export type AppStore = {
  debug: boolean
  dateTime: {
    startStamp: number
    endStamp: number
  }
  modules: {
    shareToUnlock?: {
      shareMessageTitle: string
      shareMessageText: string
    }
  }
}

const appStore: AppStore = {
  debug: true,
  dateTime: {
    startStamp: new Date('8-8-22 14:00Z').getTime(),
    endStamp: new Date('8-11-22 11:59 PST').getTime(),
  },
  modules: {
    shareToUnlock: {
      shareMessageTitle: 'August 8/8 Sale is on right now!',
      shareMessageText:
        'Hopper is the easiest and cheapest way to travel, check it out! Limited-Time Only! $75-$170 off trips to Las Vegas, Orlando, Los Angeles, NYC, and more!',
    },
  },
}

window.appStore = appStore
export default appStore
