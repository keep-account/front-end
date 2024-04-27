import { createSSRApp } from 'vue'
import * as Pinia from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import App from './App.vue'
import './styles/fonts.css'
import './styles/index.css'
export function createApp() {
  const app = createSSRApp(App)
  const pinia = Pinia.createPinia()
  pinia.use(
    createPersistedState({
      storage: {
        getItem(key: string) {
          return uni.getStorageSync(key)
        },
        setItem(key: string, value: string) {
          uni.setStorageSync(key, value)
        },
      },
    }),
  )
  app.use(pinia)
  return {
    app,
  }
}
