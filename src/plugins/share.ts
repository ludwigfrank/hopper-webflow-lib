import { Writable } from 'svelte/store'
import Clipboard from 'clipboard'
import { AppStore } from '../store'
import { dispatchTrackEvent } from './events'

enum ShareStatus {
  Disabled = 'disabled',
  Enabled = 'enabled',
  Successful = 'successful',
  Unlocked = 'unlocked',
}

enum ShareSupport {
  Full = 'full',
  Clipboard = 'clipboard',
  None = 'none',
}

const updateShareToUnlock = (appStore: AppStore) => {
  console.log(`Module loaded: Share to Unlock`)
  const { getUrlParam, writable, updateClassesOfStyled, get } = window.util

  if (!appStore.modules.shareToUnlock)
    throw Error('Add module data for "Share To Unlock" feature')

  const { shareMessageText, shareMessageTitle } = appStore.modules.shareToUnlock

  const storeStatus: Writable<ShareStatus> = writable(ShareStatus.Disabled)
  const storeStatusValue: ShareStatus = get(storeStatus)

  let shareSupport: ShareSupport = ShareSupport.None

  const config = {
    shareLink: decodeURIComponent(getUrlParam('shareLink') as string),
    isRevealed: getUrlParam('reveal'),
  }

  const refs = {
    // If the user clicks on this button, the native share sheet appears
    $shareButtonNavigator: $('[bun-ref="share-button-navigator"]'),
    // This button copies the text to clipboard
    $shareButtonClipboard: $('[bun-ref="share-button-clipboard"]'),
    // Text displaying the sharable link (used for fallback.
    $shareLinkText: $('[bun-text="share-link"]'),
    // Input field displaying the sharable link (used for easy copy paste, more user friendly than just text)
    $shareLinkInputField: $('[bun-ref="share-link-input-field"]'),
  }

  // Init state
  if (config.shareLink) {
    storeStatus.set(ShareStatus.Enabled)

    // TODO: Update raffle tiles setup, should be viewed share
    if (config.isRevealed) storeStatus.set(ShareStatus.Unlocked)
  }

  if (navigator && navigator.canShare !== undefined) {
    shareSupport = ShareSupport.Full
  } else if (Clipboard.isSupported()) {
    shareSupport = ShareSupport.Clipboard
  } else {
    shareSupport = ShareSupport.None
  }

  // Share support
  updateClassesOfStyled([shareSupport], 'share-support')

  if (shareSupport === ShareSupport.Full) {
    refs.$shareButtonNavigator.click(() => {
      navigator
        .share({
          title: shareMessageTitle,
          url: config.shareLink,
        })
        .then(() => {
          storeStatus.set(ShareStatus.Successful)
        })
        .catch(console.error)
    })
  }

  if (shareSupport === ShareSupport.None || ShareSupport.Clipboard) {
    refs.$shareLinkInputField
      .val(config.shareLink)
      .attr('readonly', '')
      .click(function () {
        $(this).select()
      })
  }

  if (shareSupport === ShareSupport.Clipboard) {
    const clipboard = new Clipboard('[bun-ref="share-button-clipboard"]', {
      text: () => `${shareMessageText} ${config.shareLink}`,
    })

    clipboard.on('success', function (e) {
      storeStatus.set(ShareStatus.Successful)
    })
  }

  // Share status updates
  const onStatusUpdate = (status: ShareStatus): void => {
    const statusType = 'share-status'
    updateClassesOfStyled([status], statusType)
  }

  storeStatus.subscribe((status) => {
    onStatusUpdate(status)
  })
}

try {
  updateShareToUnlock(window.appStore)
} catch (error) {
  // If anything goes wrong, hide the share club feature.
  // Don't break the all of the javascript
  console.log(error)
}
