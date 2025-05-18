import 'maz-ui/styles'
import './style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import VueGoogleMaps from '@fawmi/vue-google-maps'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// app.use(VueGoogleMaps, {
//     load: {
//         key: "", // Load API key from .env file
//         // language: 'de', // Uncomment and set your desired language if needed
//     },
// })

// Mount the app once
app.mount('#app')
