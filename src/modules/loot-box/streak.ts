import { getURLParam, getBun } from '../../util/misc'

const initStreak = () => {
  const paramCredit = getURLParam('credit')

  if (paramCredit === null) {
    throw Error(
      `No "credit" URL parameter provided. Please add "&credit=0.99".`
    )
  }

  getBun.element('loot-box-card').find('[bun-text="credit"]').text(paramCredit)
}

initStreak()
