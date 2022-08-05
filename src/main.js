/* 

Add the following scripts to the webflow </body> tag to enable local development 
<script type="module" src="http://localhost:3000/@vite/client"></script>
<script type="module" src="http://localhost:3000/src/main.js"></script>

*/

// Import custom jquery plugins
// import './plugins/jquery/index'

// import initRaffle from './modules/raffle/initRaffle'
// import initReward from './modules/reward/initReward'
// import initDealExtension from './modules/dealExtension/initDealExtension'

// import './modules/lootbox'
// import './modules/raffle'
// import Countdown from './classes/components/Countdown'
// import InputStepper from './classes/components/InputStepper'
// import $ from 'jquery'
// import Collection from './classes/containers/Collection'
// import Countdown from './classes/components/Countdown'
// import Timer from './classes/utility/Timer'

// import './modules/raffle'
// import './modules/dealCollection'

// import './modules/loot-box/streak'
import './store/index'
import './plugins/utils'
import './plugins/modals'
import './plugins/share'
import './plugins/deals'
import './plugins/raffle'
import './plugins/hero'
import './plugins/dealExtension'

// import './plugins/loot/reward'

// initRaffle()
// initDealExtension()

/* $('[hp-ref="cms-timed-item"]').each(function () {
  const { duration, slug } = $(this).data()
  const refEl = $(this).closest($('[hp-ref="ref-el"]'))
  let startDate, endDate
  const now = Date.now()

  if (duration.includes('-')) {
    const dates = duration.split('-')
    startDate = new Date(dates[0] + ' GMT')
    endDate = new Date(dates[1] + ' GMT')
  } else {
    // TODO: allow for DD,HH to be provided as start and duration is provided
    return
  }

  if (now > startDate && now < endDate) {
    refEl.show()
  } else {
    refEl.hide()
  }
}) */

/* $('[bun-ref="collection"]').each(function () {
  const collection = new Collection(this)
  const countdown = new Countdown(
    collection.elementRef.find('[bun-ref="countdown"]'),
    { start: collection.collectionStart, end: collection.collectionEnd }
  )
})
 */
