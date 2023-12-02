import { createApp } from 'vue'
import './style.css'

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElIconModules from "@element-plus/icons-vue";

import App from './App.vue'
import sild from './utils/slid'
import { createPinia } from "pinia"
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const store = createPinia()
store.use(piniaPluginPersistedstate)

import router from './router'
import './router/permission'

// import './utils/io'

const app = createApp(App);
sild(app)
for (let iconName in ElIconModules) {
    if (Reflect.has(ElIconModules, iconName)) {
        app.component(iconName, ElIconModules[iconName])
    }
}

app.use(store).use(ElementPlus).use(router).mount('#app')