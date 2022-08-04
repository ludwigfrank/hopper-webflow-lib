import { DateStore, dateStore } from './date'

export type AppStore = {
  debug: boolean
  dateTime: DateStore
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
    startStamp: Date.now() - 10000000,
    endStamp: Date.now() + 100000000,
  },
  modules: {
    shareToUnlock: {
      shareMessageTitle: '',
      shareMessageText: '',
    },
  },
}

window.appStore = appStore
export default appStore
