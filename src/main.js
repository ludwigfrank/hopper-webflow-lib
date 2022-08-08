/* 

Add the following scripts to the webflow </body> tag to enable local development 
<script type="module" src="http://localhost:3000/@vite/client"></script>
<script type="module" src="http://localhost:3000/src/main.js"></script>

*/

import './store/index'
import './plugins/utils'
import './plugins/share'
import './plugins/modals'
import './plugins/deals'
import './plugins/raffle'
import './plugins/hero'
import './plugins/dealExtension'

console.log('loaded')
