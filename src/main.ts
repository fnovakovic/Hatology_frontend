// import { createApp } from 'vue'
// import App from './App.vue'
// import router from './router'
//
// createApp(App).use(router).mount('#app')
//
//

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import io from 'socket.io-client';

const socket = io('http://localhost:8083'); // Ensure it matches the backend server's URL and port

const app = createApp(App);
app.use(router);

// Make the socket instance available in the components
app.config.globalProperties.$socket = socket;

app.mount('#app');

