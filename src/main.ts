import { createSSRApp } from 'vue'
import * as Pinia from 'pinia'
import App from './App.vue'
import './styles/fonts.css'
import './styles/index.css'
export function createApp() {
  const app = createSSRApp(App)
  app.use(Pinia.createPinia())
  return {
    app,
    Pinia,
  }
}
