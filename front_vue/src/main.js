import {createApp} from 'vue'
import App from './App.vue'
import {createVuetify} from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'
import router from '@/router'
import {createPinia} from 'pinia'
import {aliases, mdi} from 'vuetify/iconsets/mdi'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import axios from 'axios'
// axios.defaults.baseURL = 'http://localhost:8085/order/api/orders';
// axios.defaults.withCredentials = true


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

const pinia = createPinia();

pinia.use(piniaPluginPersistedstate);

createApp(App)
    .use(pinia)
    .use(router)
    .use(vuetify)
    .mount('#app')