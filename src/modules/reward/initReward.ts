import { bindURLPramTexts } from '../../util/misc'
import gsap from 'gsap'

const animateInEasing = 'back.out(1.7)'
const animateOutEasing = 'ease.in'
const easeAnimateIn = 'circ.out'
const easeOut = 'circ.in'
const easeStandard = 'power1.inOut'

const animateCardIn = (selector: string | JQuery) => {
  gsap.set(selector, { opacity: 1, display: 'block' })

  gsap.fromTo(
    selector,
    {
      scale: 0.2,
      y: '20vh',
      duration: 1,
      rotateZ: 60 - Math.floor(Math.random() * 120),
      rotateX: 120,
      rotateY: 10,
      ease: easeAnimateIn,
      stagger: 0.2,
    },
    {
      scale: 1,
      y: 0,
      rotateZ: 0,
      rotateX: 0,
      rotateY: 0,
      ease: easeAnimateIn,
    }
  )
}
const animateCardOut = (selector: string | JQuery) => {
  gsap.to(selector, {
    scale: 1,
    opacity: 0.8,
    y: 40,
    rotateZ: 20 - Math.floor(Math.random() * 40),
    position: 'absolute',
    rotateX: 0,
    rotateY: 20 - Math.floor(Math.random() * 40),
  })
}

const fadeIn = (selector: JQuery) => {
  selector.show()

  gsap.fromTo(
    selector,
    {
      y: 20,
      position: 'absolute',
      opacity: 0,
      ease: easeAnimateIn,
    },
    {
      y: 0,
      position: 'relative',
      opacity: 1,
      ease: easeAnimateIn,
    }
  )
}

const fadeOut = (selector: JQuery) => {
  gsap.to(selector, {
    opacity: 0,
    y: -20,
    onComplete: () => {
      selector.hide()
    },
  })
}

function initReward() {
  let currentRewardIndex = 0

  bindURLPramTexts()

  // Dom bindings
  const $rewardWrapper = $('[bun-ref="reward-item-list"]')
  const $rewards = $rewardWrapper.children()
  const $buttonContinue = $('[bun-ref="continue-button"]')
  const $tagClickTag = $('[bun-ref="click-hint-tag"]')

  // Hide initially
  $rewards.hide()
  $buttonContinue.hide()

  $('.reward-view').css({ background: 'white' })

  $('.reward-view').append(
    '<div id="circle" style="width: 0; height: 0; background-color: #9166c5; border-radius: 50%; position: absolute;"> <div/>'
  )

  gsap.to('#circle', {
    width: '120vh',
    height: '120vh',
  })

  const animateFinalView = () => {
    fadeOut($tagClickTag)
    fadeIn($buttonContinue)
  }

  $(document).on('click', function () {
    if ($tagClickTag.is(':visible')) fadeOut($tagClickTag)

    if (currentRewardIndex < $rewards.length) {
      animateCardOut($rewards.eq(currentRewardIndex - 1))
      animateCardIn($rewards.eq(currentRewardIndex))

      currentRewardIndex++

      if (currentRewardIndex === $rewardWrapper.length + 1) {
        animateFinalView()
      }
    }
  })
}

export default initReward
