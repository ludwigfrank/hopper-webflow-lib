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
      y: -60,
      x: -10,
      rotateX: 0,
      rotateZ: -20,
      rotateY: 0,
      ease: easeAnimateIn,
    }
  )
}

const animateCardOut = (selector: string | JQuery) => {
  gsap.to(selector, {
    scale: 1,
    opacity: 0.9,
    x: 20,
    y: 10,
    rotateZ: 20,
    position: 'absolute',
    rotateX: 0,
    rotateY: 20 - Math.floor(Math.random() * 40),
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

  animateCardIn($rewards.eq(0))
  setTimeout(() => {
    animateCardIn($rewards.eq(1))
    animateCardOut($rewards.eq(0))
  }, 500)
}

initReward()
