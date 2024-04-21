import { createSSRApp } from "vue"
import App from "./App.vue"
import "./styles/fonts.css"
import "./styles/index.css"
export function createApp() {
  const app = createSSRApp(App)
  return {
    app,
  }
}
