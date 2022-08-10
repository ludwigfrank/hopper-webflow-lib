export type AppStore = {
  debug: boolean
  dateTime: {
    startStamp: number
    endStamp: number
  }
  modules: {
    replaceLinks?: { selector: string; url: string }[]
    shareToUnlock?: {
      shareMessageTitle: string
      shareMessageText: string
    }
  }
}

const appStore: AppStore = {
  debug: true,
  dateTime: {
    startStamp: new Date('08/08/2022 14:00:00 GMT').getTime(),
    endStamp: new Date('08/12/2022 07:00:00 GMT').getTime(),
  },
  modules: {
    replaceLinks: [
      {
        selector: 'san-diego',
        url: 'https://deal-drop-landing.webflow.io/destinations/san-diego?showDeals=false',
      },
      {
        selector: 'punta-cana',
        url: 'https://deal-drop-landing.webflow.io/destinations/dominican-republic?showDeals=false',
      },
      {
        selector: 'santo-domingo',
        url: 'https://deal-drop-landing.webflow.io/destinations/dominican-republic?showDeals=false',
      },
      {
        selector: 'barbados',
        url: 'https://deal-drop-landing.webflow.io/destinations/barbados-summer-savings?showDeals=false',
      },
      {
        selector: 'san-juan',
        url: 'https://deal-drop-landing.webflow.io/destinations/puerto-rico?showDeals=false&experiment=skip-landing&skip-landing=true',
      },
      {
        selector: 'fiji',
        url: 'https://deal-drop-landing.webflow.io/destinations/fiji-airways?showDeals=false',
      },
    ],
    shareToUnlock: {
      shareMessageTitle: 'August 8/8 Sale is on right now!',
      shareMessageText:
        'Hopper is the easiest and cheapest way to travel, check it out! Limited-Time Only! $75-$170 off trips to Las Vegas, Orlando, Los Angeles, NYC, and more!',
    },
  },
}

window.appStore = appStore
export default appStore
