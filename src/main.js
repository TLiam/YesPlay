import {createApp} from 'vue'
import App from './App.vue'
import route from './router/index'  // 路由

import "//at.alicdn.com/t/c/font_3916180_j72z2mz2qtp.js"  // 图标
import "./assets/css/global.css"  // 全局样式

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

let app = createApp(App)
app.use(route)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.mount('#app')
