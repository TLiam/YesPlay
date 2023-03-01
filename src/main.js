import {createApp} from 'vue'
import App from './App.vue'
import route from './router/index'  // 路由

import "//at.alicdn.com/t/c/font_3916180_u9rmkk6tpdc.js"  // 图标
import "./assets/css/global.css"  // 全局样式


let app = createApp(App)
app.use(route)
app.mount('#app')
