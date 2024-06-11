// import { createApp } from 'vue'
// import router from './router'
// import App from './App.vue'

// createApp(App)
//   .use(router)
//   .mount('#app')

import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@fortawesome/fontawesome-free/css/all.css'

const vuetify = createVuetify({
    components,
    directives,
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi,
      },
    },
  })

createApp(App).use(vuetify).use(router).mount('#app')