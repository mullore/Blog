import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import { registerMicroApps, start } from 'qiankun';

registerMicroApps([
  {
    name: 'graphics', // app name registered
    entry: '//localhost:3000',
    container: '#yourContainer',
    activeRule: '/graphics',
  },
  {
    name: 'three',
    entry: '//localhost:8080',
    container: '#container',
    activeRule: '/three',
  },
  {
    name: 'webgl-fundamentals',
    entry: '//localhost:8081',
    container: '#container',
    activeRule: '/webgl-fundamentals',
  },
  {
    name: 'webgl-fundamentals2',
    // entry: { scripts: ['//localhost:7100/main.js'] },
    entry: '//localhost:4200',
    container: '#container',
    activeRule: '/webgl-fundamentals2',
  },
]);

start();

createApp(App).use(router).mount('#app');
