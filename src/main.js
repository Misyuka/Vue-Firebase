import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/css/Home.css'
import '@/assets/css/Activity.css'

createApp(App).use(router).mount('#app')
