import { createApp } from 'vue'
import './style.css'

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElIconModules from "@element-plus/icons-vue";

import App from './App.vue'

import { createPinia } from "pinia"
const store = createPinia()

import router from './router'


const app = createApp(App);

for (let iconName in ElIconModules) {
    if (Reflect.has(ElIconModules, iconName)) {
        app.component(iconName, ElIconModules[iconName])
    }
}

app.use(store).use(ElementPlus).use(router).mount('#app')