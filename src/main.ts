import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
// import router from './router';
import { registerMicroApps, start } from 'qiankun';


/**
 * Step1 初始化应用（可选）
 */
registerMicroApps([
  {
    name: 'graphics', // app name registered
    entry: 'http://localhost:3000',
    container: '#yourContainer',
    activeRule: '/graphics',
  },
  {
    name: 'three',
    entry: 'http://localhost:8080',
    container: '#container',
    activeRule: '/three',
  },
  {
    name: 'webgl-fundamentals',
    entry: 'http://localhost:8081',
    container: '#container',
    activeRule: '/webgl-fundamentals',
  },
  {
    name: 'webgl-fundamentals2',
    entry: 'http://localhost:7108/',
    container: '#container',
    activeRule: '/webgl-fundamentals2',
  },
] );

start();

createApp(App).mount('#app');
